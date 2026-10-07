import React, { useState } from 'react';
import { Route, Play, Plus, Trash2, Edit2, Check, X, Save, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useMapEvents } from 'react-leaflet';
import { mapAnalyzer } from '../lib/mapAnalyzer';
import { MapRoute, MapRouteWaypoint } from '../types/mapRoute';

interface RouteManagerProps {
  floor: number;
  routes: MapRoute[];
  setRoutes: React.Dispatch<React.SetStateAction<MapRoute[]>>;
  activeRouteId: string | null;
  setActiveRouteId: (id: string | null) => void;
  isRouteMode: boolean;
  setIsRouteMode: (active: boolean) => void;
  onObstacleWarning: (msg: string, confirmCallback: () => void) => void;
}

export function RouteClickHandler({ 
  isActive, 
  floor,
  activeRouteId,
  routes,
  setRoutes,
  onObstacleWarning
}: { 
  isActive: boolean, 
  floor: number,
  activeRouteId: string | null,
  routes: MapRoute[],
  setRoutes: React.Dispatch<React.SetStateAction<MapRoute[]>>,
  onObstacleWarning: (msg: string, confirmCallback: () => void) => void
}) {
  useMapEvents({
    click(e) {
      if (!isActive || !activeRouteId) return;
      
      const x = Math.round(e.latlng.lng);
      const y = Math.round(-e.latlng.lat);
      
      const route = routes.find(r => r.id === activeRouteId);
      if (!route) return;

      const newWaypoint: MapRouteWaypoint = {
        id: `wp-${Date.now()}`,
        x, y, z: floor
      };

      const addWaypoint = () => {
        setRoutes(prev => prev.map(r => 
          r.id === activeRouteId 
            ? { ...r, waypoints: [...r.waypoints, newWaypoint] }
            : r
        ));
      };

      const waypointsOnFloor = route.waypoints.filter(wp => wp.z === floor);
      const lastWp = waypointsOnFloor.length > 0 ? waypointsOnFloor[waypointsOnFloor.length - 1] : null;

      if (lastWp) {
        const path = mapAnalyzer.findPath(lastWp.x, lastWp.y, x, y);
        if (path) {
            newWaypoint.path = path;
            addWaypoint();
        } else {
            const hasObstacle = mapAnalyzer.checkLineForObstacles(lastWp.x, lastWp.y, x, y);
            if (hasObstacle) {
              onObstacleWarning("Não foi possível encontrar um caminho livre de obstáculos automaticamente. Deseja adicionar o ponto ignorando os obstáculos?", () => {
                  newWaypoint.path = [{x: lastWp.x, y: lastWp.y}, {x, y}]; // Just connect them directly
                  addWaypoint();
              });
            } else {
              newWaypoint.path = [{x: lastWp.x, y: lastWp.y}, {x, y}];
              addWaypoint();
            }
        }
      } else {
        addWaypoint();
      }
    }
  });
  return null;
}

export default function MapRouteManager({
  floor, routes, setRoutes, activeRouteId, setActiveRouteId, isRouteMode, setIsRouteMode, onObstacleWarning
}: RouteManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleCreateRoute = () => {
    const newRoute: MapRoute = {
      id: `route-${Date.now()}`,
      name: `Nova Rota ${routes.length + 1}`,
      color: '#3b82f6', // blue
      visible: true,
      waypoints: []
    };
    setRoutes(prev => [...prev, newRoute]);
    setActiveRouteId(newRoute.id);
    setIsRouteMode(true);
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="absolute top-20 left-4 z-[400] bg-black/90 p-3 rounded-lg border border-blue-500/50 flex items-center gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-black text-blue-400 hover:text-blue-300 transition-colors"
        title="Gerenciador de Rotas"
      >
        <Route className="w-5 h-5" />
        <span className="font-bold text-xs uppercase tracking-widest hidden sm:inline">Rotas</span>
      </button>
    );
  }

  return (
    <div className="absolute top-20 left-4 z-[400] flex flex-col gap-2 w-72 max-h-[calc(100%-6rem)]">
      <div className="bg-black/90 p-4 rounded-lg border border-blue-500/50 flex flex-col gap-4 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between border-b border-blue-500/30 pb-2">
          <span className="text-blue-400 font-bold text-sm tracking-widest uppercase">Minhas Rotas</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleCreateRoute}
          className="w-full flex items-center justify-center gap-2 py-2 rounded text-xs font-bold transition-colors bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30"
        >
          <Plus className="w-4 h-4" />
          Nova Rota
        </button>

        <div className="flex flex-col gap-3 mt-2">
          {routes.map(route => {
            const isActive = activeRouteId === route.id;
            return (
              <div key={route.id} className={`flex flex-col gap-2 p-2 rounded border ${isActive ? 'border-blue-500 bg-blue-900/20' : 'border-zinc-700 bg-zinc-800/50'}`}>
                <div className="flex items-center justify-between">
                  <input 
                    type="text" 
                    value={route.name}
                    onChange={(e) => setRoutes(prev => prev.map(r => r.id === route.id ? { ...r, name: e.target.value } : r))}
                    className="bg-transparent text-sm font-bold text-white outline-none w-32 border-b border-transparent focus:border-blue-500"
                  />
                  <div className="flex items-center gap-1">
                    <input 
                      type="color" 
                      value={route.color}
                      onChange={(e) => setRoutes(prev => prev.map(r => r.id === route.id ? { ...r, color: e.target.value } : r))}
                      className="w-5 h-5 rounded cursor-pointer border-none p-0 bg-transparent"
                    />
                    <button 
                      onClick={() => setRoutes(prev => prev.map(r => r.id === route.id ? { ...r, visible: !r.visible } : r))}
                      className="p-1 text-gray-400 hover:text-white"
                    >
                      {route.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => {
                        if (isActive) {
                          setActiveRouteId(null);
                          setIsRouteMode(false);
                        }
                        setRoutes(prev => prev.filter(r => r.id !== route.id));
                      }}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                  <span>Pontos: {route.waypoints.length}</span>
                  <button
                    onClick={() => {
                      if (isActive) {
                        setActiveRouteId(null);
                        setIsRouteMode(false);
                      } else {
                        setActiveRouteId(route.id);
                        setIsRouteMode(true);
                      }
                    }}
                    className={`px-2 py-1 rounded font-bold transition-colors ${isActive ? 'bg-blue-500 text-white' : 'bg-zinc-700 hover:bg-zinc-600 text-gray-300'}`}
                  >
                    {isActive ? 'Desativar Edição' : 'Editar Rota'}
                  </button>
                </div>
                
                {isActive && (
                  <div className="text-[10px] text-blue-300 bg-blue-900/30 p-1.5 rounded mt-1 border border-blue-500/20">
                    Clique no mapa para adicionar pontos nesta rota.
                  </div>
                )}
                
                {route.waypoints.length > 0 && (
                  <div className="flex justify-end mt-1">
                    <button 
                      onClick={() => setRoutes(prev => prev.map(r => r.id === route.id ? { ...r, waypoints: r.waypoints.slice(0, -1) } : r))}
                      className="text-[10px] text-gray-400 hover:text-red-400"
                    >
                      Desfazer Último Ponto
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          
          {routes.length === 0 && (
            <div className="text-center text-xs text-gray-500 py-4">
              Nenhuma rota criada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
