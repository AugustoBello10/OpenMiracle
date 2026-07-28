const fs = require('fs');

let code = fs.readFileSync('src/components/MapViewer.tsx', 'utf8');

// Remove existing respawnsGrouped useMemo from MapViewer body
code = code.replace(
  /  \/\/ Group by monster name or image\s*const respawnsGrouped = useMemo\(\(\) => \{\s*const groups: Record<string, typeof currentRespawns> = \{\};\s*currentRespawns\.forEach\(r => \{\s*if \(\!groups\[r\.name\]\) groups\[r\.name\] = \[\];\s*groups\[r\.name\]\.push\(r\);\s*\}\);\s*return Object\.values\(groups\);\s*\}, \[currentRespawns\]\);/g,
  ''
);

// We need to extract the JSX from the MapViewer component body and replace it with <RespawnsLayer ... />
const respawnsJSXRegex = /\{respawnsGrouped\.map\(\(group, groupIdx\) => \([\s\S]*?<\/MarkerClusterGroup>\s*\)\)\}/;
code = code.replace(respawnsJSXRegex, `<RespawnsLayer currentRespawns={currentRespawns} setSelectedBestiaryMonster={setSelectedBestiaryMonster} setLocalRespawns={setLocalRespawns} />`);

// Add the RespawnsLayer component before MapViewer
const layerCode = `
function RespawnsLayer({ 
  currentRespawns, 
  setSelectedBestiaryMonster, 
  setLocalRespawns 
}: { 
  currentRespawns: Respawn[];
  setSelectedBestiaryMonster: (name: string) => void;
  setLocalRespawns: any;
}) {
  const map = useMapEvents({
    moveend: () => setBounds(map.getBounds()),
    zoomend: () => {
      setZoom(map.getZoom());
      setBounds(map.getBounds());
    }
  });

  const [zoom, setZoom] = useState(map.getZoom());
  const [bounds, setBounds] = useState(map.getBounds());

  if (zoom < 0) {
    return null;
  }

  const bufferedBounds = bounds.pad(0.5);
  const visibleRespawns = useMemo(() => {
    return currentRespawns.filter(r => bufferedBounds.contains([-r.y, r.x]));
  }, [currentRespawns, bounds]);

  const respawnsGrouped = useMemo(() => {
    const groups: Record<string, typeof visibleRespawns> = {};
    visibleRespawns.forEach(r => {
      if (!groups[r.name]) groups[r.name] = [];
      groups[r.name].push(r);
    });
    return Object.values(groups);
  }, [visibleRespawns]);

  return (
    <>
      {respawnsGrouped.map((group, groupIdx) => (
        <MarkerClusterGroup
          key={\`\${group[0].name}-\${groupIdx}\`}
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
    </>
  );
}
`;

code = code.replace(/export default function MapViewer/, layerCode + '\nexport default function MapViewer');

fs.writeFileSync('src/components/MapViewer.tsx', code);
console.log("Applied culling patch.");
