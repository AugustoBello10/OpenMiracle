import React, { useState, useMemo, useEffect } from 'react';
import { Brush, Copy, Plus, Save, Edit2, Trash2, X } from 'lucide-react';
import { Respawn, PREDEFINED_MONSTERS } from '../data/respawns';
import { useMapEvents } from 'react-leaflet';

import OTMMConverter from './OTMMConverter';

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
  activeMonster: { name: string; image: string; categories?: string[] };
  setActiveMonster: (monster: { name: string; image: string; categories?: string[] }) => void;
  spawnCount: number;
  setSpawnCount: (count: number) => void;
  allCategories: string[];
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
  setSpawnCount,
  allCategories
}: MapEditorPanelProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [newMonsterName, setNewMonsterName] = useState('');
  const [newMonsterImage, setNewMonsterImage] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditingCategories, setIsEditingCategories] = useState(false);

  const uniqueMonsters = useMemo(() => {
    const map = new Map<string, { name: string; image: string; categories?: string[] }>();
    PREDEFINED_MONSTERS.forEach(r => {
      map.set(r.name, { name: r.name, image: r.image, categories: r.categories || ['Monstros'] });
    });
    localRespawns.forEach(r => {
      if (!map.has(r.name)) {
        map.set(r.name, { name: r.name, image: r.image, categories: r.categories || ['Monstros'] });
      } else {
        // Update categories if it exists in localRespawns to reflect custom edits
        map.set(r.name, { name: r.name, image: r.image, categories: r.categories || map.get(r.name)?.categories || ['Monstros'] });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [localRespawns]);

  const handleRenameCategory = (oldName: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === oldName) return;
    setLocalRespawns(prev => prev.map(r => {
      if (r.categories?.includes(oldName)) {
        return { 
          ...r, 
          categories: r.categories.map(c => c === oldName ? trimmed : c) 
        };
      }
      return r;
    }));
    // Update activeMonster
    if (activeMonster.categories?.includes(oldName)) {
      setActiveMonster({
        ...activeMonster,
        categories: activeMonster.categories.map(c => c === oldName ? trimmed : c)
      });
    }
  };

  const handleDeleteCategory = (name: string) => {
    setLocalRespawns(prev => prev.map(r => {
      if (r.categories?.includes(name)) {
        const newCats = r.categories.filter(c => c !== name);
        return { ...r, categories: newCats.length ? newCats : ['Monstros'] };
      }
      return r;
    }));
    if (activeMonster.categories?.includes(name)) {
      const newCats = activeMonster.categories.filter(c => c !== name);
      setActiveMonster({
        ...activeMonster,
        categories: newCats.length ? newCats : ['Monstros']
      });
    }
  };

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
  categories?: string[];
}

export const RESPAWNS: Respawn[] = [\n` + 
    localRespawns.map((r, i) => `  {
    id: '${r.name.toLowerCase().replace(/ /g, '-')}-${i + 1}',
    name: '${r.name}',
    x: ${r.x},
    y: ${r.y},
    z: ${r.z},
    count: ${r.count},
    image: '${r.image}',
    categories: ${JSON.stringify(r.categories || ['Monstros'])}
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

  if (!isPanelOpen) {
    return (
      <div className="absolute top-4 left-4 z-[400]">
        <button 
          onClick={() => setIsPanelOpen(true)}
          className="bg-black/90 p-3 rounded-lg border border-red-500/50 flex items-center gap-2 backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:bg-black text-red-400 hover:text-red-300 transition-colors"
          title="Abrir Editor de Mapa"
        >
          <Edit2 className="w-5 h-5" />
          <span className="font-bold text-xs uppercase tracking-widest hidden sm:inline">Editor</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2 w-72 max-h-[90vh]">
      <div className="bg-black/90 p-4 rounded-lg border border-red-500/50 flex flex-col gap-4 backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,0,0.2)] overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
          <span className="text-red-400 font-bold text-sm tracking-widest uppercase">Editor de Mapa</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBrushMode(!brushMode)}
              className={`p-1.5 rounded transition-colors flex items-center gap-1.5 text-[10px] font-bold ${brushMode ? 'bg-red-500 text-white' : 'bg-red-500/20 text-red-400 hover:bg-red-500/40'}`}
            >
              <Brush className="w-3 h-3" />
              {brushMode ? 'Pincel ON' : 'Pincel OFF'}
            </button>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
              title="Minimizar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
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

          {/* Categories */}
          {activeMonster.name && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-xs text-gray-400 font-semibold uppercase">Categorias</label>
                <button 
                  onClick={() => setIsEditingCategories(!isEditingCategories)}
                  className="text-gray-500 hover:text-white"
                  title="Gerenciar Categorias"
                >
                  {isEditingCategories ? <X className="w-3 h-3" /> : <Edit2 className="w-3 h-3" />}
                </button>
              </div>

              {isEditingCategories ? (
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto custom-scrollbar p-1">
                  {allCategories.map(cat => (
                    <div key={cat} className="flex items-center gap-1">
                      <input 
                        type="text"
                        defaultValue={cat}
                        onBlur={(e) => handleRenameCategory(cat, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleRenameCategory(cat, e.currentTarget.value);
                            e.currentTarget.blur();
                          }
                        }}
                        className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-[10px] rounded px-2 py-1 outline-none focus:border-red-500"
                      />
                      <button 
                        onClick={() => handleDeleteCategory(cat)}
                        className="p-1 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors"
                        title="Excluir categoria"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar p-1">
                  {allCategories.map(cat => {
                    const isChecked = activeMonster.categories?.includes(cat);
                    return (
                      <label key={cat} className="flex items-center gap-1.5 text-xs text-zinc-300 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const cats = activeMonster.categories || [];
                            if (e.target.checked) {
                              setActiveMonster({ ...activeMonster, categories: [...cats, cat] });
                            } else {
                              setActiveMonster({ ...activeMonster, categories: cats.filter(c => c !== cat) });
                            }
                          }}
                          className="accent-red-500 rounded-sm"
                        />
                        <span className="truncate max-w-[100px]" title={cat}>{cat}</span>
                      </label>
                    );
                  })}
                </div>
              )}
              
              {!isEditingCategories && (
                <div className="flex gap-2 mt-1">
                  <input 
                    type="text"
                    placeholder="Nova categoria + Enter"
                    className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-[10px] rounded px-2 py-1 outline-none focus:border-red-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        const newCat = e.currentTarget.value.trim();
                        if (newCat && !activeMonster.categories?.includes(newCat)) {
                          setActiveMonster({ 
                            ...activeMonster, 
                            categories: [...(activeMonster.categories || []), newCat]
                          });
                        }
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          )}

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
          
          <div className="mt-4 pt-4 border-t border-zinc-800">
             <OTMMConverter />
          </div>
        </div>
      </div>
    </div>
  );
}
