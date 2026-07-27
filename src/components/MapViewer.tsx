import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, ImageOverlay, useMap, useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { ChevronUp, ChevronDown, Layers, Filter, BookOpen, Search, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { RESPAWNS, Respawn, PREDEFINED_MONSTERS, fixCategories } from '../data/respawns';
import MapEditorPanel, { MapClickHandler } from './MapEditorPanel';
import BestiaryModal from './BestiaryModal';
import { BESTIARY_DB } from '../data/bestiaryDb';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Fix for default Leaflet icon paths not resolving in React

// @ts-ignore
import iconUrl from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const createMonsterIcon = (image: string, count: number) => {
  return L.divIcon({
    html: `
      <div style="position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 0 2px rgba(0,0,0,0.8));">
        <div style="position: relative; display: inline-flex;">
          <img src="${image}" style="max-width: 48px; max-height: 48px; object-fit: contain;" />
          <div style="position: absolute; bottom: -6px; right: -6px; background: rgba(0,0,0,0.9); border: 1px solid #c8aa6e; color: #c8aa6e; font-size: 11px; font-weight: bold; border-radius: 4px; padding: 1px 4px; line-height: 1.2; box-shadow: 0 0 4px rgba(0,0,0,1); font-family: monospace; z-index: 10;">
            ${count}
          </div>
        </div>
      </div>
    `,
    className: 'custom-monster-icon',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
  });
};

const createClusterCustomIcon = (cluster: any) => {
  const markers = cluster.getAllChildMarkers();
  let totalCount = 0;
  let image = '';

  markers.forEach((marker: any) => {
    totalCount += marker.options.monsterCount || 0;
    if (!image) image = marker.options.monsterImage;
  });

  return L.divIcon({
    html: `
      <div style="position: relative; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.4); border-radius: 50%; border: 1px solid rgba(200,170,110,0.5); backdrop-filter: blur(2px);">
        <img src="${image}" style="max-width: 75%; max-height: 75%; object-fit: contain; filter: drop-shadow(0 0 2px rgba(0,0,0,0.8));" />
        <div style="position: absolute; bottom: -4px; right: -4px; background: rgba(0,0,0,0.9); border: 1px solid #c8aa6e; color: #c8aa6e; font-size: 12px; font-weight: bold; border-radius: 4px; padding: 1px 5px; line-height: 1.2; box-shadow: 0 0 4px rgba(0,0,0,1); font-family: monospace; z-index: 10;">
          ${totalCount}
        </div>
      </div>
    `,
    className: 'custom-monster-cluster-icon',
    iconSize: [56, 56],
    iconAnchor: [28, 28],
  });
};

interface Bounds {
  min_x: number;
  max_x: number;
  min_y: number;
  max_y: number;
}

// Limites (bounds) globais exportados pelo OTMMConverter
const GLOBAL_BOUNDS: Bounds = {
  min_x: 31680,
  max_x: 33984,
  min_y: 30848,
  max_y: 33024
};

function UrlSync({ floor }: { floor: number }) {
  const map = useMapEvents({
    moveend: updateUrl,
    zoomend: updateUrl,
  });

  function updateUrl() {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const x = Math.round(center.lng);
    const y = Math.round(-center.lat);
    
    const params = new URLSearchParams(window.location.search);
    params.set('floor', floor.toString());
    params.set('x', x.toString());
    params.set('y', y.toString());
    params.set('zoom', zoom.toString());
    
    window.history.replaceState(null, '', '?' + params.toString());
  }

  useEffect(() => {
    updateUrl();
  }, [floor]);

  return null;
}


function MapFlyTo({ center, zoom }: { center: [number, number] | null, zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 0.5 });
    }
  }, [center, zoom, map]);
  return null;
}

interface MapViewerProps {
  initialX?: number;
  initialY?: number;
  initialZ?: number;
  initialZoom?: number;
  markers?: { x: number; y: number; title: string }[];
  isModal?: boolean;
  language?: 'pt' | 'en';
}

export default function MapViewer({ initialX: propX, initialY: propY, initialZ: propZ, initialZoom: propZoom, markers, isModal, language = 'pt' }: MapViewerProps) {
  const initialParams = useMemo(() => typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams(), []);
  const initialFloor = propZ !== undefined ? propZ : parseInt(initialParams.get('floor') || '7', 10);
  const [floor, setFloor] = useState(isNaN(initialFloor) ? 7 : initialFloor);
  const [selectedBestiaryMonster, setSelectedBestiaryMonster] = useState<string | null>(null);
  const [imageVersion, setImageVersion] = useState<string>('2');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'map_config', 'images'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data.version) {
          setImageVersion(data.version);
        }
      }
    }, (error) => {
      console.error("Error fetching map_config/images from Firestore:", error);
    });
    return () => unsub();
  }, []);

  const currentBounds = useMemo(() => {
    const b = GLOBAL_BOUNDS;
    return [
      [-b.max_y, b.min_x],
      [-b.min_y, b.max_x]
    ] as [[number, number], [number, number]];
  }, []);

  // Utilizando o imageVersion que vem do Firestore
  const mapImageUrl = `https://res.cloudinary.com/dc4nkbnkg/image/upload/floor_${floor}.png?v=${imageVersion}`;
  
  const initialX = propX !== undefined ? propX : parseFloat(initialParams.get('x') || '');
  const initialY = propY !== undefined ? propY : parseFloat(initialParams.get('y') || '');
  const initialZoom = propZoom !== undefined ? propZoom : parseFloat(initialParams.get('zoom') || '');
  
  const hasInitialPos = !isNaN(initialX) && !isNaN(initialY) && !isNaN(initialZoom);

  const initialCenter = hasInitialPos ? 
    [-initialY, initialX] as [number, number] : 
    [
        (currentBounds[0][0] + currentBounds[1][0]) / 2, 
        (currentBounds[0][1] + currentBounds[1][1]) / 2
    ] as [number, number];

  const [localRespawns, setLocalRespawns] = useState<Respawn[]>(() => {
    try {
      const saved = localStorage.getItem('miracle-wiki-respawns');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const mergedMap = new Map<string, Respawn>();
          // Carrega os do código base primeiro
          RESPAWNS.forEach(r => mergedMap.set(r.id, r));
          
          // Sobrescreve/adiciona os locais (mantém os que o usuário adicionou que não estão no código)
          parsed.forEach((item: any) => {
            mergedMap.set(item.id, {
              ...item,
              categories: fixCategories(item.categories, item.name || '')
            });
          });
          
          return Array.from(mergedMap.values());
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved respawns:', e);
    }
    return RESPAWNS;
  });

  useEffect(() => {
    localStorage.setItem('miracle-wiki-respawns', JSON.stringify(localRespawns));
  }, [localRespawns]);
  const [brushMode, setBrushMode] = useState(false);
  const [activeMonster, setActiveMonster] = useState<{ name: string; image: string; categories?: string[] }>({ name: '', image: '', categories: ['Monstros'] });
  const [spawnCount, setSpawnCount] = useState(1);
  const [filterType, setFilterType] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search logic
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
            id: `reg-${regions.length}`,
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


  const DEFAULT_CATEGORIES = useMemo(() => ['Monstros', 'Mineração', 'Cooking', 'Chaves', 'Farming', 'Woodcutting', 'Fishing', 'NPC', 'Pick Holes', 'Interação no Mapa'], []);
  
  const allCategories = useMemo(() => {
    const cats = new Set(DEFAULT_CATEGORIES);
    localRespawns.forEach(r => r.categories?.forEach(c => cats.add(c)));
    return Array.from(cats).sort();
  }, [localRespawns, DEFAULT_CATEGORIES]);

  // Filter respawns for current floor
  const currentRespawns = useMemo(() => localRespawns.filter(r => {
    if (r.z !== floor) return false;
    
    if (activeSearchMonster) {
      if (r.name.toLowerCase() !== activeSearchMonster.toLowerCase()) return false;
    } else if (filterType !== 'all') {
      const cats = r.categories && r.categories.length > 0 ? r.categories : ['Monstros'];
      if (!cats.includes(filterType)) return false;
    }
    return true;
  }), [floor, localRespawns, filterType, activeSearchMonster]);

  // Group by monster name or image
  const respawnsGrouped = useMemo(() => {
    const groups: Record<string, typeof currentRespawns> = {};
    currentRespawns.forEach(r => {
      if (!groups[r.name]) groups[r.name] = [];
      groups[r.name].push(r);
    });
    return Object.values(groups);
  }, [currentRespawns]);

  const handleMapClick = (x: number, y: number) => {
    if (!brushMode || !activeMonster.name || !activeMonster.image) return;
    
    const newSpawn: Respawn = {
      id: `${activeMonster.name.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
      name: activeMonster.name,
      image: activeMonster.image,
      categories: activeMonster.categories || ['Monstros'],
      count: spawnCount,
      x,
      y,
      z: floor
    };
    
    setLocalRespawns(prev => [...prev, newSpawn]);
  };

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden border border-medieval-gold/30 rounded-xl shadow-2xl flex flex-col">
       <MapEditorPanel 
          floor={floor}
          localRespawns={localRespawns}
          setLocalRespawns={setLocalRespawns}
          brushMode={brushMode}
          setBrushMode={setBrushMode}
          activeMonster={activeMonster}
          setActiveMonster={setActiveMonster}
          spawnCount={spawnCount}
          setSpawnCount={setSpawnCount}
          allCategories={allCategories}
       />
       <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2 max-h-[calc(100%-2rem)]">
         
         {/* Search Controls */}
         <div className="bg-black/80 rounded-lg border border-medieval-gold/30 flex flex-col backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] w-48 relative z-50">
           {activeSearchMonster ? (
             <div className="flex flex-col p-2 gap-2">
               <div className="flex items-center justify-between">
                 <span className="text-medieval-gold font-bold text-xs uppercase truncate max-w-[120px]" title={activeSearchMonster}>{activeSearchMonster}</span>
                 <button onClick={() => setActiveSearchMonster(null)} className="text-gray-400 hover:text-red-400"><X className="w-4 h-4" /></button>
               </div>
               
               {searchRegions.length > 0 ? (
                 <div className="flex items-center justify-between bg-black/40 p-1 rounded border border-white/5">
                   <button onClick={handlePrevRegion} className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="w-4 h-4 text-medieval-gold" /></button>
                   <div className="text-xs text-gray-300 font-mono">
                     Região {currentRegionIndex + 1}/{searchRegions.length}
                   </div>
                   <button onClick={handleNextRegion} className="p-1 hover:bg-white/10 rounded"><ChevronRight className="w-4 h-4 text-medieval-gold" /></button>
                 </div>
               ) : (
                 <div className="text-xs text-red-400 text-center py-1">Nenhum encontrado</div>
               )}
             </div>
           ) : (
             <div className="p-2 flex flex-col gap-2">
               <div 
                 className="flex items-center gap-2 cursor-pointer group"
                 onClick={() => setIsSearchOpen(!isSearchOpen)}
               >
                 <Search className="w-4 h-4 text-medieval-gold/70 group-hover:text-medieval-gold transition-colors" />
                 <span className="text-xs text-medieval-gold/70 group-hover:text-medieval-gold transition-colors font-bold uppercase">{language === 'pt' ? 'Buscar' : 'Search'}</span>
               </div>
               
               {isSearchOpen && (
                 <div className="relative border-t border-medieval-gold/20 pt-2">
                   <input
                     type="text"
                     value={searchQuery}
                     onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                     onFocus={() => setShowSuggestions(true)}
                     onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                     placeholder="Monstro..."
                     className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-medieval-gold"
                   />
                   
                   {showSuggestions && searchSuggestions.length > 0 && (
                     <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-medieval-gold/30 rounded-lg max-h-40 overflow-y-auto z-[500] shadow-xl">
                       {searchSuggestions.map(name => (
                         <div 
                           key={name} 
                           className="px-2 py-1.5 text-xs text-gray-300 hover:text-medieval-gold hover:bg-white/5 cursor-pointer truncate"
                           onClick={() => {
                             setActiveSearchMonster(name);
                             setSearchQuery('');
                             setIsSearchOpen(false);
                             setShowSuggestions(false);
                           }}
                         >
                           {name}
                         </div>
                       ))}
                     </div>
                   )}
                 </div>
               )}
             </div>
           )}
         </div>

         {/* Filter Controls */}
         <div className="bg-black/80 p-2 rounded-lg border border-medieval-gold/30 flex flex-col gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] mb-2 overflow-y-auto custom-scrollbar w-32">
           <div 
             className="flex items-center justify-between cursor-pointer group"
             onClick={() => setIsFilterOpen(!isFilterOpen)}
           >
             <Filter className="w-4 h-4 text-medieval-gold/70 group-hover:text-medieval-gold transition-colors" title={language === 'pt' ? "Filtros" : "Filters"} />
             <div className="text-medieval-gold/70 group-hover:text-medieval-gold transition-colors">
               {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
             </div>
           </div>
           
           {isFilterOpen && (
             <div className="flex flex-col gap-1.5 w-full text-xs mt-1 border-t border-medieval-gold/20 pt-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
               <label className="flex items-center gap-2 text-zinc-300 hover:text-white cursor-pointer select-none">
                 <input 
                   type="radio" 
                   name="mapFilter" 
                   value="all"
                   checked={filterType === 'all'}
                   onChange={() => setFilterType('all')}
                   className="accent-medieval-gold w-3 h-3 shrink-0"
                 />
                 <span className={`truncate ${filterType === 'all' ? 'text-medieval-gold font-bold' : ''}`}>{language === 'pt' ? 'Todos' : 'All'}</span>
               </label>
               {allCategories.map(cat => (
                 <label key={cat} className="flex items-center gap-2 text-zinc-300 hover:text-white cursor-pointer select-none">
                   <input 
                     type="radio" 
                     name="mapFilter" 
                     value={cat}
                     checked={filterType === cat}
                     onChange={() => setFilterType(cat)}
                     className="accent-medieval-gold w-3 h-3 shrink-0"
                   />
                   <span className={`truncate ${filterType === cat ? 'text-medieval-gold font-bold' : ''}`} title={cat}>{cat}</span>
                 </label>
               ))}
             </div>
           )}
         </div>

         {/* Floor Controls */}
         <div className="bg-black/80 p-2 rounded-lg border border-medieval-gold/30 flex flex-col items-center gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] w-24">
           <div className="flex flex-col items-center">
             <span className="text-medieval-gold text-[10px] font-bold uppercase tracking-widest">{language === 'pt' ? 'Andar' : 'Floor'} {floor}</span>
           </div>
           
           <div className="flex flex-col gap-1 w-full">
             <button 
               onClick={() => setFloor(f => Math.max(0, f - 1))}
               disabled={floor <= 0}
               className="p-1 text-medieval-gold/80 hover:text-white disabled:opacity-30 bg-medieval-gold/10 rounded border border-medieval-gold/20 hover:bg-medieval-gold/30 transition-all flex justify-center"
               title={language === 'pt' ? "Sobe um andar (Z menor)" : "Up one floor (lower Z)"}
             >
               <ChevronUp className="w-4 h-4" />
             </button>
             <button 
               onClick={() => setFloor(f => Math.min(16, f + 1))}
               disabled={floor >= 16}
               className="p-1 text-medieval-gold/80 hover:text-white disabled:opacity-30 bg-medieval-gold/10 rounded border border-medieval-gold/20 hover:bg-medieval-gold/30 transition-all flex justify-center"
               title={language === 'pt' ? "Desce um andar (Z maior)" : "Down one floor (higher Z)"}
             >
               <ChevronDown className="w-4 h-4" />
             </button>
           </div>
           
           {floor === 7 && <span className="text-[8px] text-medieval-gold/50 font-mono">({language === 'pt' ? 'Superfície' : 'Surface'})</span>}
         </div>
       </div>

       <div className="flex-1 w-full h-full relative z-0">
          <MapContainer
            center={initialCenter}
            zoom={hasInitialPos ? initialZoom : 0}
            minZoom={-3}
            maxZoom={5}
            crs={L.CRS.Simple}
            className={`w-full h-full ${brushMode ? 'cursor-crosshair' : ''}`}
            style={{ background: '#18181b' }} // zinc-900
          >
            
            {!isModal && <UrlSync floor={floor} />}
            <MapFlyTo center={flyToPos} zoom={hasInitialPos ? initialZoom : 0} />

            {/* @ts-ignore */}
            {import.meta.env.DEV && <MapClickHandler isActive={brushMode} onMapClick={handleMapClick} />}
            <ImageOverlay
              key={mapImageUrl} // force re-render on url change
              url={mapImageUrl}
              bounds={currentBounds}
              className="pixelated"
            />
            {markers && markers.map((m, i) => (
              <Marker key={i} position={[-m.y, m.x]}>
                <Popup className="font-sans font-bold text-gray-800">{m.title}</Popup>
              </Marker>
            ))}
            
            {respawnsGrouped.map((group, groupIdx) => (
              <MarkerClusterGroup
                key={groupIdx}
                iconCreateFunction={createClusterCustomIcon}
                maxClusterRadius={80}
              >
                {group.map((respawn) => (
                  /* @ts-ignore */
                  <Marker
                    key={respawn.id}
                    position={[-respawn.y, respawn.x]}
                    icon={createMonsterIcon(respawn.image, respawn.count)}
                    monsterCount={respawn.count}
                    monsterImage={respawn.image}
                  >
                    <Popup className="font-sans font-bold text-gray-800">
                      <div className="text-center min-w-[100px] flex flex-col gap-2">
                        <div className="font-bold text-sm">{respawn.name}</div>
                        <div className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-1 inline-block">Quantidade: {respawn.count}</div>

                        {/* Bestiary Button */}
                        {(() => {
                          const predefined = PREDEFINED_MONSTERS.find(m => m.name.toLowerCase() === respawn.name.toLowerCase());
                          const isMonster = predefined?.categories?.includes('Monstros') || predefined?.categories?.includes("Monstros") || respawn.categories?.includes('Monstros') || respawn.categories?.includes("Monstros") || Object.keys(BESTIARY_DB).some(k => k.toLowerCase() === respawn.name.toLowerCase());
                          
                          if (!isMonster) return null;
                          
                          return (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBestiaryMonster(respawn.name);
                              }}
                              className="bg-[#2c2c2c] hover:bg-[#3a3a3a] text-[#a0a0a0] hover:text-white text-xs py-1.5 px-2 rounded font-bold cursor-pointer transition-colors flex items-center justify-center gap-1 border border-[#4a4a4a] mt-1"
                            >
                              Cyclopedia
                            </button>
                          );
                        })()}

                        {/* @ts-ignore */}
                        {import.meta.env.DEV && (
                          <div className="flex flex-col gap-1 mt-1 border-t pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocalRespawns(prev => prev.filter(r => r.id !== respawn.id));
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded font-bold cursor-pointer transition-colors"
                            >
                              Excluir
                            </button>
                            <div className="flex gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLocalRespawns(prev => prev.map(r => r.id === respawn.id ? {...r, count: Math.max(1, r.count - 1)} : r));
                                  }}
                                  className="bg-zinc-200 hover:bg-zinc-300 text-black font-bold text-xs py-1 px-2 rounded flex-1 cursor-pointer transition-colors"
                                >
                                  -1
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLocalRespawns(prev => prev.map(r => r.id === respawn.id ? {...r, count: r.count + 1} : r));
                                  }}
                                  className="bg-zinc-200 hover:bg-zinc-300 text-black font-bold text-xs py-1 px-2 rounded flex-1 cursor-pointer transition-colors"
                                >
                                  +1
                                </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            ))}
          </MapContainer>
       </div>
       
       {selectedBestiaryMonster && (
         <BestiaryModal 
           initialMonster={selectedBestiaryMonster} 
           onClose={() => setSelectedBestiaryMonster(null)} 
         />
       )}
    </div>
  );
}
