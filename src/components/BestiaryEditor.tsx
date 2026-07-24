import React, { useState } from 'react';
import { Save, Plus, Trash2, Box } from 'lucide-react';
import { BestiaryEntry } from '../types/bestiary';
import { BESTIARY_DB } from '../data/bestiaryDb';

export default function BestiaryEditor() {
  const [db, setDb] = useState<Record<string, BestiaryEntry>>(BESTIARY_DB);
  const [selectedMonster, setSelectedMonster] = useState<string | null>(null);

  const handleSave = () => {
    // In a real scenario, this would write to a backend or copy to clipboard
    const jsonStr = JSON.stringify(db, null, 2);
    navigator.clipboard.writeText(`export const BESTIARY_DB: Record<string, BestiaryEntry> = ${jsonStr};`);
    alert('Base de dados copiada para a área de transferência! Cole em src/data/bestiaryDb.ts');
  };

  const handleAddMonster = () => {
    const name = prompt("Nome do Monstro:");
    if (!name) return;
    
    setDb(prev => ({
      ...prev,
      [name]: {
        id: name,
        baseHp: 100,
        baseXp: 100,
        baseSpeed: 100,
        baseArmor: 10,
        baseCharmPoints: 10,
        resistances: {
          physical: 0, earth: 0, fire: 0, death: 0, energy: 0, holy: 0, ice: 0, healing: 0
        },
        loot: { common: [], uncommon: [], semiRare: [], rare: [] }
      }
    }));
    setSelectedMonster(name);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-zinc-300 p-4 gap-4">
      <div className="w-64 bg-zinc-900 border border-medieval-gold/20 rounded-lg p-4 flex flex-col gap-4">
        <h2 className="text-medieval-gold font-bold uppercase tracking-widest text-sm flex justify-between items-center">
          Bestiário 
          <button onClick={handleAddMonster} className="p-1 hover:bg-medieval-gold/10 rounded"><Plus className="w-4 h-4" /></button>
        </h2>
        <div className="flex-1 overflow-y-auto flex flex-col gap-1 custom-scrollbar">
          {Object.keys(db).map(id => (
            <button 
              key={id} 
              onClick={() => setSelectedMonster(id)}
              className={`text-left px-2 py-1.5 rounded text-sm ${selectedMonster === id ? 'bg-medieval-gold text-black font-bold' : 'hover:bg-zinc-800'}`}
            >
              {id}
            </button>
          ))}
        </div>
        <button onClick={handleSave} className="flex items-center justify-center gap-2 bg-medieval-gold/10 hover:bg-medieval-gold/20 text-medieval-gold border border-medieval-gold/30 rounded py-2 text-xs uppercase tracking-widest font-bold">
          <Save className="w-4 h-4" /> Exportar TS
        </button>
      </div>

      <div className="flex-1 bg-zinc-900 border border-medieval-gold/20 rounded-lg p-6 overflow-y-auto">
        {selectedMonster && db[selectedMonster] ? (
           <div className="space-y-6">
             <h3 className="text-2xl font-black text-medieval-gold uppercase">{db[selectedMonster].id}</h3>
             
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               <div><label className="text-[10px] uppercase text-zinc-500">Base HP</label><input type="number" className="w-full bg-black border border-zinc-700 rounded px-2 py-1" value={db[selectedMonster].baseHp} onChange={e => setDb(prev => ({ ...prev, [selectedMonster]: { ...prev[selectedMonster], baseHp: Number(e.target.value) } }))} /></div>
               <div><label className="text-[10px] uppercase text-zinc-500">Base XP</label><input type="number" className="w-full bg-black border border-zinc-700 rounded px-2 py-1" value={db[selectedMonster].baseXp} onChange={e => setDb(prev => ({ ...prev, [selectedMonster]: { ...prev[selectedMonster], baseXp: Number(e.target.value) } }))} /></div>
               <div><label className="text-[10px] uppercase text-zinc-500">Base Armor</label><input type="number" className="w-full bg-black border border-zinc-700 rounded px-2 py-1" value={db[selectedMonster].baseArmor} onChange={e => setDb(prev => ({ ...prev, [selectedMonster]: { ...prev[selectedMonster], baseArmor: Number(e.target.value) } }))} /></div>
               <div><label className="text-[10px] uppercase text-zinc-500">Base Speed</label><input type="number" className="w-full bg-black border border-zinc-700 rounded px-2 py-1" value={db[selectedMonster].baseSpeed} onChange={e => setDb(prev => ({ ...prev, [selectedMonster]: { ...prev[selectedMonster], baseSpeed: Number(e.target.value) } }))} /></div>
               <div><label className="text-[10px] uppercase text-zinc-500">Charm Pts</label><input type="number" className="w-full bg-black border border-zinc-700 rounded px-2 py-1" value={db[selectedMonster].baseCharmPoints} onChange={e => setDb(prev => ({ ...prev, [selectedMonster]: { ...prev[selectedMonster], baseCharmPoints: Number(e.target.value) } }))} /></div>
             </div>

             <div className="space-y-2">
                <h4 className="text-medieval-gold font-bold uppercase text-xs">Loot (Strings)</h4>
                {['common', 'uncommon', 'semiRare', 'rare'].map(tier => (
                  <div key={tier}>
                    <label className="text-[10px] uppercase text-zinc-500">{tier}</label>
                    <input type="text" className="w-full bg-black border border-zinc-700 rounded px-2 py-1" 
                           placeholder="Item 1, Item 2..." 
                           value={db[selectedMonster].loot[tier as keyof typeof db[string]['loot']].join(', ')} 
                           onChange={e => {
                             const vals = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                             setDb(prev => ({ ...prev, [selectedMonster]: { ...prev[selectedMonster], loot: { ...prev[selectedMonster].loot, [tier]: vals } } }));
                           }} 
                    />
                  </div>
                ))}
             </div>
           </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600">
            <Box className="w-16 h-16 opacity-20 mb-4" />
            <p>Selecione ou crie um monstro ao lado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
