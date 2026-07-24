import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BESTIARY_DB } from '../data/bestiaryDb';
import { PREDEFINED_MONSTERS } from '../data/respawns';
import { Search, PenTool } from 'lucide-react';
import BestiaryModal from './BestiaryModal';
import BestiaryEditor from './BestiaryEditor';

export default function CyclopediaView() {
  const [search, setSearch] = useState('');
  const [selectedMonster, setSelectedMonster] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  // @ts-ignore
  if (showEditor && import.meta.env.DEV) {
    return (
      <div className="relative">
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={() => setShowEditor(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold text-sm"
          >
            Sair do Editor
          </button>
        </div>
        <div className="h-[80vh] overflow-hidden rounded-lg border border-medieval-gold/30">
          <BestiaryEditor />
        </div>
      </div>
    );
  }

  // Combine monsters from BESTIARY_DB and PREDEFINED_MONSTERS (that are Monstros)
  const allMonsterNames = Array.from(new Set([
    ...Object.keys(BESTIARY_DB),
    ...PREDEFINED_MONSTERS
      .filter(m => m.categories?.includes('Monstros') || m.categories?.includes("Monstros"))
      .map(m => m.name)
  ])).sort((a, b) => a.localeCompare(b));

  const allMonsters = allMonsterNames.filter(m => 
    m.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
          Cyclopedia
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Catálogo de todas as criaturas do mundo de Miracle. Explore seus atributos, fraquezas e recompensas.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/40 p-4 rounded-xl border border-medieval-gold/10">
        <div className="relative w-full sm:w-96">
          <input 
            type="text" 
            placeholder="Buscar criatura..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-black/60 border border-medieval-gold/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-medieval-gold/50"
          />
          <Search className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
        </div>

        {/* @ts-ignore */}
        {import.meta.env.DEV && (
          <button 
            onClick={() => setShowEditor(true)}
            className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg transition-colors font-bold text-sm"
          >
            <PenTool className="w-4 h-4" />
            Bestiary Editor (Dev)
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {allMonsters.map(id => {
          const entry = BESTIARY_DB[id];
          const imgUrl = PREDEFINED_MONSTERS.find(m => m.name.toLowerCase() === id.toLowerCase())?.image;

          return (
            <motion.button
              key={id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMonster(id)}
              className="bg-black/60 border border-medieval-gold/20 hover:border-medieval-gold/50 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-colors group aspect-square relative overflow-hidden"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                {imgUrl ? (
                  <img src={imgUrl} alt={id} className="max-w-full max-h-full pixelated drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" />
                ) : (
                  <div className="text-4xl">?</div>
                )}
              </div>
              <span className="font-bold text-sm text-gray-300 group-hover:text-medieval-gold transition-colors line-clamp-1">{id}</span>
              
              {/* Optional: HP indicator or something small */}
              {entry && entry.baseHp > 0 && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-gray-500">
                  ❤️ {entry.baseHp}
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      {allMonsters.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <p>Nenhuma criatura encontrada.</p>
        </div>
      )}

      {selectedMonster && (
        <BestiaryModal 
          initialMonster={selectedMonster}
          onClose={() => setSelectedMonster(null)}
        />
      )}
    </div>
  );
}
