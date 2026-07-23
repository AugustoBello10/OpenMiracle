import React, { useState, useMemo, useEffect } from 'react';
import { Brush, Copy, Plus, Save } from 'lucide-react';
import { Respawn } from '../data/respawns';
import { useMapEvents } from 'react-leaflet';

export function MapClickHandler({ isActive, onMapClick }: { isActive: boolean, onMapClick: (x: number, y: number) => void }) {
  useMapEvents({
    click(e) {
      if (isActive) {
        const x = Math.round(e.latlng.lng);
        const y = Math.round(-e.latlng.lat);
        onMapClick(x, y);
      }
    }
  });
  return null;
}

interface MapEditorPanelProps {
  floor: number;
  localRespawns: Respawn[];
  setLocalRespawns: React.Dispatch<React.SetStateAction<Respawn[]>>;
  brushMode: boolean;
  setBrushMode: (active: boolean) => void;
  activeMonster: { name: string; image: string };
  setActiveMonster: (monster: { name: string; image: string }) => void;
  spawnCount: number;
  setSpawnCount: (count: number) => void;
}

export default function MapEditorPanel({ 
  floor, 
  localRespawns, 
  setLocalRespawns, 
  brushMode, 
  setBrushMode,
  activeMonster,
  setActiveMonster,
  spawnCount,
  setSpawnCount
}: MapEditorPanelProps) {
  const [newMonsterName, setNewMonsterName] = useState('');
  const [newMonsterImage, setNewMonsterImage] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [copied, setCopied] = useState(false);

  const uniqueMonsters = useMemo(() => {
    const map = new Map<string, { name: string; image: string }>();
    localRespawns.forEach(r => {
      if (!map.has(r.name)) {
        map.set(r.name, { name: r.name, image: r.image });
      }
    });
    return Array.from(map.values());
  }, [localRespawns]);

  // Set default selection when unique monsters changes if nothing is selected
  useEffect(() => {
    if (uniqueMonsters.length > 0 && !activeMonster.name && !isAddingNew) {
      setActiveMonster(uniqueMonsters[0]);
    }
  }, [uniqueMonsters, activeMonster, isAddingNew, setActiveMonster]);

  const handleAddNewMonster = () => {
    if (newMonsterName && newMonsterImage) {
      setActiveMonster({ name: newMonsterName, image: newMonsterImage });
      setIsAddingNew(false);
    }
  };

  const generateExportCode = () => {
    const code = `export interface Respawn {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  count: number;
  image: string;
}

export const RESPAWNS: Respawn[] = [\n` + 
    localRespawns.map((r, i) => `  {
    id: '${r.name.toLowerCase().replace(/ /g, '-')}-${i + 1}',
    name: '${r.name}',
    x: ${r.x},
    y: ${r.y},
    z: ${r.z},
    count: ${r.count},
    image: '${r.image}'
  }`).join(',\n') + `\n];\n`;
    
    return code;
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateExportCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  // @ts-ignore
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2 w-72">
      <div className="bg-black/90 p-4 rounded-lg border border-red-500/50 flex flex-col gap-4 backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,0,0.2)]">
        <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
          <span className="text-red-400 font-bold text-sm tracking-widest uppercase">Editor de Mapa</span>
          <button
            onClick={() => setBrushMode(!brushMode)}
            className={`p-2 rounded transition-colors flex items-center gap-2 text-xs font-bold ${brushMode ? 'bg-red-500 text-white' : 'bg-red-500/20 text-red-400 hover:bg-red-500/40'}`}
          >
            <Brush className="w-4 h-4" />
            {brushMode ? 'Pincel ON' : 'Pincel OFF'}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Monster Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-semibold uppercase">Monstro</label>
            {!isAddingNew ? (
              <div className="flex gap-2">
                <select 
                  className="flex-1 bg-zinc-800 border border-zinc-700 text-white text-sm rounded px-2 py-1 outline-none focus:border-red-500"
                  value={activeMonster.name}
                  onChange={(e) => {
                    const found = uniqueMonsters.find(m => m.name === e.target.value);
                    if (found) setActiveMonster(found);
                  }}
                >
                  {uniqueMonsters.map(m => (
                    <option key={m.name} value={m.name}>{m.name}</option>
                  ))}
                </select>
                <button 
                  onClick={() => setIsAddingNew(true)}
                  className="bg-zinc-800 border border-zinc-700 text-gray-400 hover:text-white hover:border-zinc-500 rounded p-1"
                  title="Adicionar novo"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-2 bg-zinc-800/50 rounded border border-zinc-700">
                <input 
                  type="text" 
                  placeholder="Nome do monstro" 
                  className="bg-zinc-900 border border-zinc-700 text-white text-xs rounded px-2 py-1 outline-none focus:border-red-500"
                  value={newMonsterName}
                  onChange={(e) => setNewMonsterName(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="URL da Imagem" 
                  className="bg-zinc-900 border border-zinc-700 text-white text-xs rounded px-2 py-1 outline-none focus:border-red-500"
                  value={newMonsterImage}
                  onChange={(e) => setNewMonsterImage(e.target.value)}
                />
                <div className="flex gap-2">
                  <button 
                    onClick={handleAddNewMonster}
                    className="flex-1 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors text-xs py-1 rounded border border-red-500/30"
                  >
                    Usar Este
                  </button>
                  <button 
                    onClick={() => setIsAddingNew(false)}
                    className="flex-1 bg-zinc-700/50 text-gray-300 hover:bg-zinc-600 transition-colors text-xs py-1 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Spawn Count */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-semibold uppercase">Quantidade por Clique</label>
            <input 
              type="number" 
              min="1"
              value={spawnCount}
              onChange={(e) => setSpawnCount(parseInt(e.target.value) || 1)}
              className="bg-zinc-800 border border-zinc-700 text-white text-sm rounded px-2 py-1 outline-none focus:border-red-500 w-full"
            />
          </div>

          {/* Current Selection Preview */}
          {activeMonster.name && (
            <div className="flex items-center gap-3 p-2 bg-zinc-800/80 rounded border border-zinc-700">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                {activeMonster.image ? (
                  <img src={activeMonster.image} alt="Preview" className="max-w-full max-h-full object-contain drop-shadow-md" />
                ) : (
                  <div className="w-full h-full bg-zinc-900 rounded" />
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-white truncate">{activeMonster.name}</span>
                <span className="text-xs text-red-400">Clicar adiciona: {spawnCount}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-2 pt-3 border-t border-red-500/30">
            <button 
              onClick={handleCopyCode}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded text-sm font-bold transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 border border-zinc-600'}`}
            >
              {copied ? (
                <>
                  <Save className="w-4 h-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar src/data/respawns.ts
                </>
              )}
            </button>
            <p className="text-[10px] text-gray-500 mt-2 text-center">
              (Apenas em ambiente de desenvolvimento)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
