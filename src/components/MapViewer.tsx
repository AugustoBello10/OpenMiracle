import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, ImageOverlay, useMap, useMapEvents, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { ChevronUp, ChevronDown, Layers, Filter, BookOpen, Search, MapPin, X, ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { RESPAWNS, Respawn, PREDEFINED_MONSTERS, fixCategories, TeleportTarget } from '../data/respawns';
import MapEditorPanel, { MapClickHandler } from './MapEditorPanel';
import BestiaryModal from './BestiaryModal';
import { BESTIARY_DB } from '../data/bestiaryDb';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import LZString from 'lz-string';
import MapRouteManager, { RouteClickHandler } from './MapRouteManager';
import MapRoutesLayer from './MapRoutesLayer';
import { MapRoute } from '../types/mapRoute';
import { mapAnalyzer } from '../lib/mapAnalyzer';

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

const createMonsterIcon = (image: string, count: number, hasTeleport: boolean = false, keyInfo?: string) => {
  return L.divIcon({
    html: `
      <div style="position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 0 2px rgba(0,0,0,0.8));">
        <div style="position: relative; display: inline-flex;">
          <img src="${image}" style="max-width: 48px; max-height: 48px; object-fit: contain;" />
          ${keyInfo ? `
            <div style="position: absolute; top: -6px; left: -6px; background: rgba(217, 119, 6, 0.95); border: 1.5px solid #fef08a; color: #ffffff; font-size: 10px; font-weight: bold; border-radius: 9999px; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 8px rgba(245, 158, 11, 0.9); z-index: 12;" title="Trancado - ${keyInfo.replace(/"/g, '&quot;')}">
              🔑
            </div>
          ` : ''}
          ${hasTeleport ? `
            <div style="position: absolute; top: -6px; right: -6px; background: rgba(99, 102, 241, 0.95); border: 1.5px solid #c7d2fe; color: #ffffff; font-size: 10px; font-weight: bold; border-radius: 9999px; width: 17px; height: 17px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 8px rgba(99, 102, 241, 0.9); z-index: 12;" title="Teleporte / Atalho">
              ✦
            </div>
          ` : ''}
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


function MapFlyTo({ center, zoom, trigger }: { center: [number, number] | null, zoom: number, trigger?: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 0.8 });
    }
  }, [center, zoom, trigger, map]);
  return null;
}

function TeleportTargetPickerHandler({
  isActive,
  onTargetPicked
}: {
  isActive: boolean;
  onTargetPicked: (x: number, y: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (isActive) {
        const x = Math.round(e.latlng.lng);
        const y = Math.round(-e.latlng.lat);
        onTargetPicked(x, y);
      }
    }
  });
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

function RespawnKeyInput({
  respawn,
  setLocalRespawns
}: {
  respawn: Respawn;
  setLocalRespawns: any;
}) {
  const [val, setVal] = useState(respawn.keyInfo || '');

  useEffect(() => {
    setVal(respawn.keyInfo || '');
  }, [respawn.keyInfo]);

  const handleSave = () => {
    const trimmed = val.trim();
    setLocalRespawns((prev: Respawn[]) =>
      prev.map(r => r.id === respawn.id ? { ...r, keyInfo: trimmed || undefined } : r)
    );
  };

  const handleClear = () => {
    setVal('');
    setLocalRespawns((prev: Respawn[]) =>
      prev.map(r => r.id === respawn.id ? { ...r, keyInfo: undefined } : r)
    );
  };

  return (
    <div className="flex flex-col gap-1 p-1.5 bg-amber-50 rounded border border-amber-300/80 text-left">
      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 text-center flex items-center justify-center gap-1">
        <span>🔑</span> Configurar Chave
      </div>
      <div className="flex gap-1 items-center" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          placeholder="Ex: Key 6002"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === 'Enter') handleSave();
          }}
          className="flex-1 min-w-0 bg-white border border-zinc-300 text-zinc-900 text-xs rounded px-1.5 py-1 outline-none focus:border-amber-500 font-mono"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}
          className="bg-amber-600 hover:bg-amber-500 text-white text-[10px] py-1 px-2 rounded font-bold transition-colors cursor-pointer shrink-0"
          title="Salvar Chave"
        >
          Salvar
        </button>
        {respawn.keyInfo && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="bg-zinc-200 hover:bg-zinc-300 text-red-600 text-[10px] py-1 px-1.5 rounded font-bold transition-colors cursor-pointer shrink-0"
            title="Remover Chave"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

function RespawnsLayer({ 
  currentRespawns, 
  setSelectedBestiaryMonster, 
  setLocalRespawns,
  onTeleport,
  onStartPickTarget
}: { 
  currentRespawns: Respawn[];
  setSelectedBestiaryMonster: (name: string) => void;
  setLocalRespawns: any;
  onTeleport: (target: TeleportTarget) => void;
  onStartPickTarget?: (respawn: Respawn) => void;
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

  if (zoom <= 1) {
    return null;
  }

  return (
    <>
      {respawnsGrouped.map((group, groupIdx) => (
        <MarkerClusterGroup
          key={`${group[0].name}-${groupIdx}`}
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={80}
        >
          {group.map((respawn) => (
            /* @ts-ignore */
            <Marker
              key={respawn.id}
              position={[-respawn.y, respawn.x]}
              icon={createMonsterIcon(respawn.image, respawn.count, Boolean(respawn.target), respawn.keyInfo)}
              monsterCount={respawn.count}
              monsterImage={respawn.image}
            >
              <Popup className="font-sans font-bold text-gray-800">
                <div className="text-center min-w-[140px] flex flex-col gap-2">
                  <div className="font-bold text-sm text-zinc-900">{respawn.name}</div>
                  <div className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-0.5 inline-block self-center">Quantidade: {respawn.count}</div>

                  {/* Informação da Chave Necessária (visível para todos os jogadores) */}
                  {respawn.keyInfo && (
                    <div className="flex flex-col gap-1 p-2 bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg border-2 border-amber-400 text-center shadow-xs my-0.5">
                      <div className="flex items-center justify-center gap-1.5 text-amber-800 font-extrabold text-[11px] uppercase tracking-wide">
                        <span className="text-sm">🔑</span>
                        <span>Chave Necessária</span>
                      </div>
                      <div className="font-mono font-black text-sm text-amber-950 bg-white/95 py-1 px-2 rounded border border-amber-300 shadow-xs tracking-wider">
                        {respawn.keyInfo}
                      </div>
                    </div>
                  )}

                  {/* Teleport Option A: Interactive button */}
                  {respawn.target && (
                    <div className="flex flex-col gap-1 mt-1 border-t border-zinc-200 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTeleport(respawn.target!);
                        }}
                        className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-extrabold text-xs py-2 px-2.5 rounded shadow-md flex items-center justify-center gap-1.5 transition-all transform hover:scale-[1.02] cursor-pointer"
                      >
                        <span className="text-sm">🪄</span>
                        <span>
                          {respawn.target.label ? respawn.target.label : `Viajar para Andar ${respawn.target.z}`}
                        </span>
                      </button>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        Destino: ({respawn.target.x}, {respawn.target.y}) • Andar {respawn.target.z}
                      </div>
                    </div>
                  )}

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
                    <div className="flex flex-col gap-1.5 mt-2 border-t border-zinc-200 pt-2 text-left">
                      <RespawnKeyInput respawn={respawn} setLocalRespawns={setLocalRespawns} />

                      <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5 text-center mt-1">
                        Editor de Teleporte
                      </div>
                      {respawn.target ? (
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onStartPickTarget?.(respawn);
                            }}
                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-[10px] py-1 px-1.5 rounded font-bold transition-colors text-center cursor-pointer"
                          >
                            Mudar Destino
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setLocalRespawns((prev: Respawn[]) => prev.map(r => r.id === respawn.id ? { ...r, target: undefined } : r));
                            }}
                            className="bg-zinc-200 hover:bg-zinc-300 text-red-600 text-[10px] py-1 px-1.5 rounded font-bold transition-colors cursor-pointer"
                            title="Remover teleporte"
                          >
                            Remover
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onStartPickTarget?.(respawn);
                          }}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] py-1 px-2 rounded font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>✦</span> Definir Destino no Mapa
                        </button>
                      )}

                      <div className="flex gap-1 mt-1 border-t border-zinc-100 pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocalRespawns((prev: Respawn[]) => prev.filter(r => r.id !== respawn.id));
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white text-[10px] py-1 px-2 rounded font-bold cursor-pointer transition-colors flex-1"
                        >
                          Excluir
                        </button>
                        <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocalRespawns((prev: Respawn[]) => prev.map(r => r.id === respawn.id ? {...r, count: Math.max(1, r.count - 1)} : r));
                              }}
                              className="bg-zinc-200 hover:bg-zinc-300 text-black font-bold text-[10px] py-1 px-2 rounded flex-1 cursor-pointer transition-colors"
                            >
                              -1
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocalRespawns((prev: Respawn[]) => prev.map(r => r.id === respawn.id ? {...r, count: r.count + 1} : r));
                              }}
                              className="bg-zinc-200 hover:bg-zinc-300 text-black font-bold text-[10px] py-1 px-2 rounded flex-1 cursor-pointer transition-colors"
                            >
                              +1
                            </button>
                        </div>
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

export default function MapViewer({ initialX: propX, initialY: propY, initialZ: propZ, initialZoom: propZoom, markers, isModal, language = 'pt' }: MapViewerProps) {
  const initialParams = useMemo(() => typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams(), []);
  const initialFloor = propZ !== undefined ? propZ : parseInt(initialParams.get('floor') || '7', 10);
  const [floor, setFloor] = useState(isNaN(initialFloor) ? 7 : initialFloor);
  const [selectedBestiaryMonster, setSelectedBestiaryMonster] = useState<string | null>(null);
  const [imageVersion, setImageVersion] = useState<string>('2');

  const [routes, setRoutes] = useState<MapRoute[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('miracle-routes');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch(e) {}
      }
    }
    return [];
  });
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [isRouteMode, setIsRouteMode] = useState(false);
  const [obstacleWarning, setObstacleWarning] = useState<{msg: string, confirm: () => void} | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('miracle-routes', JSON.stringify(routes));
    }
  }, [routes]);

  useEffect(() => {
    mapAnalyzer.setVersion(imageVersion);
    mapAnalyzer.loadFloor(floor);
  }, [floor, imageVersion]);

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

  const [localRespawns, setLocalRespawns] = useState<Respawn[]>(RESPAWNS);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'map_config', 'respawns'), (docSnap) => {
      if (docSnap.exists()) {
        const docData = docSnap.data();
        const rawData = docData.dataStr;
        const compressedData = docData.dataCompressed;
        
        let dataToParse = null;
        if (compressedData) {
          dataToParse = LZString.decompressFromUTF16(compressedData);
        } else if (rawData) {
          dataToParse = rawData;
        }

        if (dataToParse) {
          try {
            const data = JSON.parse(dataToParse);
            if (Array.isArray(data) && data.length > 0) {
              const processed = data.map((item: any) => ({
                ...item,
                categories: fixCategories(item.categories, item.name || '')
              }));
              setLocalRespawns(processed);
            }
          } catch (e) {
            console.error("Failed to parse respawns string from DB:", e);
          }
        }
      }
    });
    return () => unsub();
  }, []);
  const [brushMode, setBrushMode] = useState(false);
  const [activeMonster, setActiveMonster] = useState<{ name: string; image: string; categories?: string[] }>({ name: '', image: '', categories: ['Monstros'] });
  const [spawnCount, setSpawnCount] = useState(1);
  const [brushKeyInfo, setBrushKeyInfo] = useState('');
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
  const [flyToZoom, setFlyToZoom] = useState<number>(hasInitialPos ? initialZoom : 2);
  const [flyToTrigger, setFlyToTrigger] = useState(0);

  // Teleport State
  const [teleportArrival, setTeleportArrival] = useState<TeleportTarget | null>(null);
  const [pickingTargetForRespawn, setPickingTargetForRespawn] = useState<Respawn | null>(null);
  const [twoWayTeleport, setTwoWayTeleport] = useState(true);

  const handleFlyTo = (x: number, y: number, z: number) => {
    if (z !== floor) {
      setFloor(z);
    }
    setFlyToPos([-y, x]);
    setFlyToZoom(Math.max(flyToZoom, 3));
    setFlyToTrigger(prev => prev + 1);
  };

  const handleTeleport = (target: TeleportTarget) => {
    if (target.z !== floor) {
      setFloor(target.z);
    }
    setFlyToPos([-target.y, target.x]);
    setFlyToZoom(Math.max(flyToZoom, 3));
    setFlyToTrigger(prev => prev + 1);
    setTeleportArrival(target);
    setTimeout(() => {
      setTeleportArrival(null);
    }, 4000);
  };

  const handleTargetPicked = (targetX: number, targetY: number) => {
    if (!pickingTargetForRespawn) return;
    const origin = pickingTargetForRespawn;
    const targetFloor = floor;

    setLocalRespawns(prev => {
      let updated = prev.map(r => {
        if (r.id === origin.id) {
          return {
            ...r,
            target: { x: targetX, y: targetY, z: targetFloor }
          };
        }
        return r;
      });

      if (twoWayTeleport) {
        // If there is already a marker at the target position, link it back
        const existingAtDest = updated.find(r => r.x === targetX && r.y === targetY && r.z === targetFloor);
        if (existingAtDest) {
          updated = updated.map(r => r.id === existingAtDest.id ? {
            ...r,
            target: { x: origin.x, y: origin.y, z: origin.z }
          } : r);
        } else {
          // Create counterpart return marker with same name and image
          const newReturnMarker: Respawn = {
            id: `${origin.name.toLowerCase().replace(/ /g, '-')}-${Date.now()}-return`,
            name: origin.name,
            image: origin.image,
            categories: origin.categories || ['Interação no Mapa'],
            count: 1,
            x: targetX,
            y: targetY,
            z: targetFloor,
            target: { x: origin.x, y: origin.y, z: origin.z }
          };
          updated.push(newReturnMarker);
        }
      }

      return updated;
    });

    setPickingTargetForRespawn(null);
  };

  const uniqueMonsterNames = useMemo(() => {
    const names = new Set<string>();
    localRespawns.forEach(r => {
      names.add(r.name);
      if (r.keyInfo) {
        names.add(r.keyInfo);
      }
    });
    return Array.from(names).sort();
  }, [localRespawns]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return uniqueMonsterNames.filter(n => n.toLowerCase().includes(q)).slice(0, 5);
  }, [searchQuery, uniqueMonsterNames]);

  useEffect(() => {
    if (activeSearchMonster) {
      const monsterRespawns = localRespawns.filter(r => 
        r.name.toLowerCase() === activeSearchMonster.toLowerCase() ||
        (r.keyInfo && r.keyInfo.toLowerCase() === activeSearchMonster.toLowerCase())
      );
      
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
      setFlyToZoom(2);
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
      setFlyToZoom(2);
    }
  };

  const handlePrevRegion = () => {
    if (searchRegions.length > 0) {
      const prevIdx = (currentRegionIndex - 1 + searchRegions.length) % searchRegions.length;
      setCurrentRegionIndex(prevIdx);
      const reg = searchRegions[prevIdx];
      setFloor(reg.floor);
      setFlyToPos([-reg.center.y, reg.center.x]);
      setFlyToZoom(2);
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
      if (
        r.name.toLowerCase() !== activeSearchMonster.toLowerCase() &&
        (!r.keyInfo || r.keyInfo.toLowerCase() !== activeSearchMonster.toLowerCase())
      ) return false;
    } else if (filterType !== 'all') {
      const cats = r.categories && r.categories.length > 0 ? r.categories : ['Monstros'];
      if (!cats.includes(filterType)) return false;
    }
    return true;
  }), [floor, localRespawns, filterType, activeSearchMonster]);



  const handleMapClick = (x: number, y: number) => {
    if (pickingTargetForRespawn || !brushMode || !activeMonster.name || !activeMonster.image) return;
    
    const newSpawn: Respawn = {
      id: `${activeMonster.name.toLowerCase().replace(/ /g, '-')}-${Date.now()}`,
      name: activeMonster.name,
      image: activeMonster.image,
      categories: activeMonster.categories || ['Monstros'],
      count: spawnCount,
      x,
      y,
      z: floor,
      keyInfo: brushKeyInfo && brushKeyInfo.trim() ? brushKeyInfo.trim() : undefined
    };
    
    setLocalRespawns(prev => [...prev, newSpawn]);
  };

  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden border border-medieval-gold/30 rounded-xl shadow-2xl flex flex-col">
       {/* Teleport Pick Target Banner */}
       {pickingTargetForRespawn && (
         <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-black/90 border-2 border-amber-500/80 px-4 py-3 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.4)] backdrop-blur-md flex flex-wrap items-center justify-center gap-3 text-white">
           <div className="flex items-center gap-2">
             <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
             <span className="font-bold text-xs sm:text-sm text-amber-300">
               Definindo Destino para "{pickingTargetForRespawn.name}"
             </span>
           </div>
           <div className="text-[11px] sm:text-xs text-zinc-300">
             Navegue para o andar desejado e <strong>clique no mapa</strong> no ponto de chegada.
           </div>
           <label className="flex items-center gap-1.5 text-xs text-amber-200 cursor-pointer bg-zinc-800/90 px-2 py-1 rounded border border-amber-500/30 hover:border-amber-500">
             <input 
               type="checkbox" 
               checked={twoWayTeleport} 
               onChange={(e) => setTwoWayTeleport(e.target.checked)} 
               className="accent-amber-500 cursor-pointer"
             />
             <span>🔁 Ida & Volta Automático</span>
           </label>
           <button
             onClick={() => setPickingTargetForRespawn(null)}
             className="bg-red-500/80 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer"
           >
             Cancelar
           </button>
         </div>
       )}

       {/* Teleport Arrival Flash */}
       {teleportArrival && (
         <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[1000] bg-black/90 border border-amber-500/60 px-4 py-2 rounded-lg shadow-xl backdrop-blur-md flex items-center gap-2 text-amber-300 text-xs font-bold animate-pulse pointer-events-none">
           <span>🪄 Teleportado para Andar {teleportArrival.z} ({teleportArrival.x}, {teleportArrival.y})</span>
         </div>
       )}

       {obstacleWarning && (
         <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[9999] flex items-center justify-center backdrop-blur-sm">
           <div className="bg-zinc-900 border border-red-500 rounded-lg p-6 max-w-sm flex flex-col gap-4 shadow-2xl">
             <div className="text-red-400 font-bold text-lg flex items-center gap-2">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
               Aviso de Obstrução
             </div>
             <p className="text-sm text-gray-300">
               {obstacleWarning.msg}
             </p>
             <div className="flex gap-2 mt-2">
               <button 
                 onClick={() => {
                   obstacleWarning.confirm();
                   setObstacleWarning(null);
                 }}
                 className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/30 transition-colors py-2 rounded text-sm font-bold"
               >
                 Ignorar e Adicionar
               </button>
               <button 
                 onClick={() => setObstacleWarning(null)}
                 className="flex-1 bg-zinc-800 text-gray-300 hover:bg-zinc-700 transition-colors py-2 rounded text-sm font-bold"
               >
                 Cancelar
               </button>
             </div>
           </div>
         </div>
       )}

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
          onTeleport={handleTeleport}
          brushKeyInfo={brushKeyInfo}
          setBrushKeyInfo={setBrushKeyInfo}
          onFlyTo={handleFlyTo}
       />
       
       <MapRouteManager 
         floor={floor}
         routes={routes}
         setRoutes={setRoutes}
         activeRouteId={activeRouteId}
         setActiveRouteId={setActiveRouteId}
         isRouteMode={isRouteMode}
         setIsRouteMode={setIsRouteMode}
         onObstacleWarning={(msg, confirm) => setObstacleWarning({msg, confirm})}
       />

       <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2 max-h-[calc(100%-2rem)]">
         
         {/* Search Controls */}
         <div className="bg-black/80 rounded-lg border border-medieval-gold/30 flex flex-col backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] w-48 relative z-[100]">
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
         <div className="bg-black/80 p-2 rounded-lg border border-medieval-gold/30 flex flex-col gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] mb-2 overflow-y-auto custom-scrollbar w-32 relative z-10">
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
         <div className="bg-black/80 p-2 rounded-lg border border-medieval-gold/30 flex flex-col items-center gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] w-24 relative z-10">
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
            className={`w-full h-full ${pickingTargetForRespawn ? 'cursor-crosshair' : (brushMode ? 'cursor-crosshair' : '')}`}
            style={{ background: '#18181b' }} // zinc-900
          >
            
            {!isModal && <UrlSync floor={floor} />}
            <MapFlyTo center={flyToPos} zoom={flyToZoom} trigger={flyToTrigger} />

            {/* @ts-ignore */}
            {import.meta.env.DEV && <MapClickHandler isActive={brushMode && !pickingTargetForRespawn} onMapClick={handleMapClick} />}
            <TeleportTargetPickerHandler isActive={Boolean(pickingTargetForRespawn)} onTargetPicked={handleTargetPicked} />
            <RouteClickHandler 
              isActive={isRouteMode} 
              floor={floor} 
              activeRouteId={activeRouteId} 
              routes={routes} 
              setRoutes={setRoutes} 
              onObstacleWarning={(msg, confirm) => setObstacleWarning({msg, confirm})} 
            />
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
            
            {teleportArrival && teleportArrival.z === floor && (
              <Circle
                center={[-teleportArrival.y, teleportArrival.x]}
                radius={16}
                pathOptions={{
                  color: '#fbbf24',
                  fillColor: '#f59e0b',
                  fillOpacity: 0.35,
                  weight: 3,
                  dashArray: '6, 6'
                }}
              />
            )}

            <MapRoutesLayer routes={routes} currentFloor={floor} />
            
            <RespawnsLayer 
              currentRespawns={currentRespawns} 
              setSelectedBestiaryMonster={setSelectedBestiaryMonster} 
              setLocalRespawns={setLocalRespawns} 
              onTeleport={handleTeleport}
              onStartPickTarget={(r) => setPickingTargetForRespawn(r)}
            />
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
