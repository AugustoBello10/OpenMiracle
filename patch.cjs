const fs = require('fs');
let code = fs.readFileSync('src/components/MapViewer.tsx', 'utf8');

// 1. imports
code = code.replace(
  "import { ChevronUp, ChevronDown, Layers, Filter, BookOpen } from 'lucide-react';",
  "import { ChevronUp, ChevronDown, Layers, Filter, BookOpen, Search, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';"
);

// 2. MapFlyTo
const flyToCode = `
function MapFlyTo({ center, zoom }: { center: [number, number] | null, zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 0.5 });
    }
  }, [center, zoom, map]);
  return null;
}

interface MapViewerProps {`;

code = code.replace("interface MapViewerProps {", flyToCode);

// 3. States
const stateCode = `  const [spawnCount, setSpawnCount] = useState(1);
  const [filterType, setFilterType] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search logic
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSearchMonster, setActiveSearchMonster] = useState<string | null>(null);
  const [searchRegions, setSearchRegions] = useState<any[]>([]);
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);
  const [flyToPos, setFlyToPos] = useState<[number, number] | null>(null);

  const uniqueMonsterNames = useMemo(() => {
    const names = new Set<string>();
    localRespawns.forEach(r => names.add(r.name));
    return Array.from(names).sort();
  }, [localRespawns]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return uniqueMonsterNames.filter(n => n.toLowerCase().includes(q)).slice(0, 5);
  }, [searchQuery, uniqueMonsterNames]);

  useEffect(() => {
    if (activeSearchMonster) {
      const monsterRespawns = localRespawns.filter(r => r.name.toLowerCase() === activeSearchMonster.toLowerCase());
      
      const regions: any[] = [];
      monsterRespawns.forEach(respawn => {
        let foundRegion = regions.find(reg => 
          reg.floor === respawn.z && 
          Math.sqrt(Math.pow(reg.center.x - respawn.x, 2) + Math.pow(reg.center.y - respawn.y, 2)) < 150
        );

        if (foundRegion) {
          foundRegion.respawns.push(respawn);
          foundRegion.center.x = foundRegion.respawns.reduce((sum: number, r: any) => sum + r.x, 0) / foundRegion.respawns.length;
          foundRegion.center.y = foundRegion.respawns.reduce((sum: number, r: any) => sum + r.y, 0) / foundRegion.respawns.length;
        } else {
          regions.push({
            id: \`reg-\${regions.length}\`,
            floor: respawn.z,
            center: { x: respawn.x, y: respawn.y },
            respawns: [respawn]
          });
        }
      });
      
      regions.sort((a, b) => b.respawns.length - a.respawns.length);
      setSearchRegions(regions);
      setCurrentRegionIndex(0);
      
      if (regions.length > 0) {
        const reg = regions[0];
        setFloor(reg.floor);
        setFlyToPos([-reg.center.y, reg.center.x]);
      }
    } else {
      setSearchRegions([]);
    }
  }, [activeSearchMonster, localRespawns]);

  const handleNextRegion = () => {
    if (searchRegions.length > 0) {
      const nextIdx = (currentRegionIndex + 1) % searchRegions.length;
      setCurrentRegionIndex(nextIdx);
      const reg = searchRegions[nextIdx];
      setFloor(reg.floor);
      setFlyToPos([-reg.center.y, reg.center.x]);
    }
  };

  const handlePrevRegion = () => {
    if (searchRegions.length > 0) {
      const prevIdx = (currentRegionIndex - 1 + searchRegions.length) % searchRegions.length;
      setCurrentRegionIndex(prevIdx);
      const reg = searchRegions[prevIdx];
      setFloor(reg.floor);
      setFlyToPos([-reg.center.y, reg.center.x]);
    }
  };
`;

code = code.replace(
  "  const [spawnCount, setSpawnCount] = useState(1);\n  const [filterType, setFilterType] = useState<string>('all');\n  const [isFilterOpen, setIsFilterOpen] = useState(false);",
  stateCode
);

// 4. Current Respawns filter logic
const currentRespawnsCode = `  // Filter respawns for current floor
  const currentRespawns = useMemo(() => localRespawns.filter(r => {
    if (r.z !== floor) return false;
    
    if (activeSearchMonster) {
      if (r.name.toLowerCase() !== activeSearchMonster.toLowerCase()) return false;
    } else if (filterType !== 'all') {
      const cats = r.categories && r.categories.length > 0 ? r.categories : ['Monstros'];
      if (!cats.includes(filterType)) return false;
    }
    return true;
  }), [floor, localRespawns, filterType, activeSearchMonster]);`;

code = code.replace(
  `  // Filter respawns for current floor
  const currentRespawns = useMemo(() => localRespawns.filter(r => {
    if (r.z !== floor) return false;
    if (filterType === 'all') return true;
    
    const cats = r.categories && r.categories.length > 0 ? r.categories : ['Monstros'];
    return cats.includes(filterType);
  }), [floor, localRespawns, filterType]);`,
  currentRespawnsCode
);


fs.writeFileSync('src/components/MapViewer.tsx', code);
