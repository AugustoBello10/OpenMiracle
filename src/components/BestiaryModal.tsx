import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Search } from 'lucide-react';
import { BESTIARY_DB } from '../data/bestiaryDb';
import { MonsterStage, calculateMonsterStats } from '../types/bestiary';
import { PREDEFINED_MONSTERS } from '../data/respawns';
// import { ITEMS_DB } from '../data/buildItems'; // We could use this to find item images

interface BestiaryModalProps {
  initialMonster?: string;
  onClose: () => void;
}

export default function BestiaryModal({ initialMonster, onClose }: BestiaryModalProps) {
  const [selectedMonster, setSelectedMonster] = useState<string>(initialMonster || Object.keys(BESTIARY_DB)[0]);
  const [stage, setStage] = useState<MonsterStage>('Normal');
  const [search, setSearch] = useState('');

  // Encontrar o monstro ignorando case e espaços extras
  const entryKey = Object.keys(BESTIARY_DB).find(k => k.toLowerCase() === selectedMonster?.trim().toLowerCase());
  const entry = entryKey ? BESTIARY_DB[entryKey] : undefined;
  
  const monsterImage = useMemo(() => {
    const found = PREDEFINED_MONSTERS.find(m => m.name.toLowerCase() === selectedMonster?.trim().toLowerCase());
    return found?.image || '';
  }, [selectedMonster]);

  const stats = useMemo(() => {
    if (!entry) return null;
    return calculateMonsterStats(entry, stage);
  }, [entry, stage]);

  const allMonsterNames = Array.from(new Set([
    ...Object.keys(BESTIARY_DB),
    ...PREDEFINED_MONSTERS
      .filter(m => m.categories?.includes('Monstros') || m.categories?.includes("Monstros"))
      .map(m => m.name)
  ])).sort((a, b) => a.localeCompare(b));

  const allMonsters = allMonsterNames.filter(m => m.toLowerCase().includes(search.toLowerCase()));

  // Get image for item
  const getItemImage = (itemName: string) => {
    return `https://res.cloudinary.com/dc4nkbnkg/image/upload/${itemName.replace(/\s+/g, '_')}.gif`;
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#2c2c2c] border-[3px] border-[#4a4a4a] rounded shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col font-sans relative" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b-[3px] border-[#4a4a4a]">
          <h2 className="text-[#a0a0a0] font-bold text-sm tracking-wide">Cyclopedia</h2>
          <button onClick={onClose} className="text-[#a0a0a0] hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Monster List */}
          <div className="w-48 bg-[#222] border-r-[3px] border-[#4a4a4a] flex flex-col">
            <div className="p-2 border-b-[3px] border-[#4a4a4a]">
              <div className="flex items-center bg-black border border-[#555] rounded px-2">
                <Search className="w-3 h-3 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..." 
                  className="bg-transparent text-xs text-white outline-none w-full py-1"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {allMonsters.map(m => (
                <button 
                  key={m}
                  onClick={() => { setSelectedMonster(m); setStage('Normal'); }}
                  className={`w-full text-left px-3 py-1.5 text-xs border-b border-[#333] flex items-center justify-between ${selectedMonster === m ? 'bg-[#3a3a3a] text-white font-bold' : 'text-[#a0a0a0] hover:bg-[#2a2a2a]'}`}
                >
                  <span className="truncate">{m}</span>
                  {!BESTIARY_DB[m] && <span className="text-[9px] text-medieval-gold/50 ml-1 opacity-50" title="Not cataloged">?</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col p-4 overflow-y-auto bg-[#363636] custom-scrollbar relative">
             <div className="flex justify-center mb-2">
                <span className="text-[#a0a0a0] font-bold tracking-wide uppercase text-sm">{entry?.id || selectedMonster}</span>
             </div>

             <div className="flex gap-4">
              {/* Left Col: Image & Controls */}
              <div className="flex flex-col items-center gap-4 w-40">
                 <div className="w-32 h-32 flex items-center justify-center bg-black/20 rounded-lg border border-medieval-gold/10">
                   {monsterImage ? <img src={monsterImage} alt={entry?.id || selectedMonster} className="max-w-full max-h-full object-contain pixelated drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" /> : <div className="text-xs text-gray-500">No Image</div>}
                 </div>
                 
                 <div className="flex items-center gap-2 text-xs text-[#a0a0a0]">
                    <input type="checkbox" id="track-kills" />
                    <label htmlFor="track-kills">Track Kills</label>
                 </div>

                 <div className="flex items-center gap-2">
                    <span className="text-xs text-[#a0a0a0]">Stage:</span>
                    <select 
                      value={stage}
                      onChange={e => setStage(e.target.value as MonsterStage)}
                      className="bg-[#1a1a1a] text-[#a0a0a0] border border-[#555] text-xs py-1 px-2 rounded"
                      disabled={!entry}
                    >
                      <option value="Normal">Normal</option>
                      <option value="1 Star">1 Star</option>
                      <option value="2 Stars">2 Stars</option>
                      <option value="3 Stars">3 Stars</option>
                    </select>
                 </div>
              </div>

              {/* Right Col: Stats */}
              <div className="flex-1 flex flex-col gap-4">
                 {!entry || !stats || entry.baseHp === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-[#a0a0a0] bg-black/20 rounded-lg border border-medieval-gold/10 p-6">
                       <h3 className="text-xl font-bold mb-2 text-medieval-gold">Monstro Não Catalogado</h3>
                       <p className="text-sm max-w-md">As informações (loot, hp, xp) para "{selectedMonster}" ainda não foram preenchidas na Cyclopedia.</p>
                       <p className="text-xs max-w-md mt-2 text-medieval-gold/50">Este monstro precisa ser adicionado ao database.</p>
                       {/* @ts-ignore */}
                       {import.meta.env.DEV && (
                          <p className="text-xs mt-4 opacity-50">Você pode adicionar/editar este monstro usando o Bestiary Editor.</p>
                       )}
                    </div>
                 ) : (
                 <>
                   {/* Stats Grid */}
                   <div className="flex gap-4">
                      {/* Sub-left: charms, hp, xp */}
                      <div className="flex flex-col gap-1 w-24">
                         <div className="text-xs text-white flex items-center gap-1" title="HP">❤️ {stats.hp}</div>
                         <div className="text-xs text-white flex items-center gap-1" title="Experiência">✨ {stats.xp}</div>
                         <div className="text-xs text-white flex items-center gap-1" title="Armor">🛡️ {stats.armor}</div>
                         <div className="text-xs text-white flex items-center gap-1" title="Speed">👞 {stats.speed}</div>
                         <div className="text-xs text-purple-400 font-bold mt-2 flex items-center gap-1" title="Charm Points">✡️ {stats.charmPoints}</div>
                      </div>

                      {/* Sub-right: Resistances */}
                      <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-1">
                          <div className="text-[10px] text-[#a0a0a0] flex items-center gap-1"><span>👊</span> Physical: {entry.resistances.physical}%</div>
                          <div className="text-[10px] text-[#a0a0a0] flex items-center gap-1"><span>🌿</span> Earth: {entry.resistances.earth}%</div>
                          <div className="text-[10px] text-[#a0a0a0] flex items-center gap-1"><span>🔥</span> Fire: {entry.resistances.fire}%</div>
                          <div className="text-[10px] text-[#a0a0a0] flex items-center gap-1"><span>💀</span> Death: {entry.resistances.death}%</div>
                          <div className="text-[10px] text-[#a0a0a0] flex items-center gap-1"><span>⚡</span> Energy: {entry.resistances.energy}%</div>
                          <div className="text-[10px] text-[#a0a0a0] flex items-center gap-1"><span>✨</span> Holy: {entry.resistances.holy}%</div>
                          <div className="text-[10px] text-[#a0a0a0] flex items-center gap-1"><span>❄️</span> Ice: {entry.resistances.ice}%</div>
                          <div className="text-[10px] text-[#a0a0a0] flex items-center gap-1"><span>💖</span> Healing: {entry.resistances.healing}%</div>
                      </div>
                   </div>

              {/* Loot Section */}
              <div className="mt-4 border-t-2 border-[#2a2a2a] pt-4">
                <div className="grid grid-cols-[100px_1fr] gap-2 items-center mb-2">
                   <span className="text-xs text-[#a0a0a0] font-bold">Common:</span>
                   <div className="flex gap-1 flex-wrap">
                      {entry.loot.common.map(l => (
                        <div key={l} className="w-8 h-8 bg-[#222] border border-[#111] flex items-center justify-center p-0.5 group relative" title={l}>
                          <img src={getItemImage(l)} alt={l} className="max-w-full max-h-full pixelated" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[8px] text-gray-600 text-center leading-none">?</span>'; }} />
                        </div>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-[100px_1fr] gap-2 items-center mb-2">
                   <span className="text-xs text-[#a0a0a0] font-bold">Uncommon:</span>
                   <div className="flex gap-1 flex-wrap">
                      {entry.loot.uncommon.map(l => (
                        <div key={l} className="w-8 h-8 bg-[#222] border border-[#111] flex items-center justify-center p-0.5 group relative" title={l}>
                          <img src={getItemImage(l)} alt={l} className="max-w-full max-h-full pixelated" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[8px] text-gray-600 text-center leading-none">?</span>'; }} />
                        </div>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-[100px_1fr] gap-2 items-center mb-2">
                   <span className="text-xs text-[#a0a0a0] font-bold">Semi-Rare:</span>
                   <div className="flex gap-1 flex-wrap">
                      {entry.loot.semiRare.map(l => (
                        <div key={l} className="w-8 h-8 bg-[#222] border border-[#111] flex items-center justify-center p-0.5 group relative" title={l}>
                          <img src={getItemImage(l)} alt={l} className="max-w-full max-h-full pixelated" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[8px] text-gray-600 text-center leading-none">?</span>'; }} />
                        </div>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                   <span className="text-xs text-[#a0a0a0] font-bold">Rare:</span>
                   <div className="flex gap-1 flex-wrap">
                      {entry.loot.rare.map(l => (
                        <div key={l} className="w-8 h-8 bg-[#222] border border-[#111] flex items-center justify-center p-0.5 group relative" title={l}>
                          <img src={getItemImage(l)} alt={l} className="max-w-full max-h-full pixelated" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[8px] text-gray-600 text-center leading-none">?</span>'; }} />
                        </div>
                      ))}
                   </div>
                </div>
             </div>
             </>
             )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return null;
}
