const fs = require('fs');
let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

const runeSelectionHTML = `
            {/* Rune Selection & Time */}
            <div className="pt-4 border-t border-medieval-gold/10 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                   Runa a Fabricar
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-10 gap-2">
                  {VOC_SPELLS[vocation]?.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedRune(s.name)}
                      title={s.name}
                      className={\`relative aspect-square flex items-center justify-center p-1 rounded transition-all \${
                        selectedRune === s.name 
                          ? 'bg-[#3b82f6]/20 border border-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                          : 'bg-black/40 border border-medieval-gold/10 hover:border-medieval-gold/40'
                      }\`}
                    >
                      <img src={getSpellImage(s.name)} alt={s.name} className="w-8 h-8 object-contain select-none" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
`;

// Wait, the original code had:
// {/* Rune Selection & Time */}
// <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-medieval-gold/10">
//   <div className="flex flex-col gap-2">
// ...
//   </div>
// 
//   <div className="flex flex-col gap-2">
// ...
//   </div>
// </div>

content = content.replace(/\{\/\* Rune Selection & Time \*\/\}[\s\S]*?(?=\{\/\* Profit & Price Settings \*\/\}|\{\/\* Unified Timer \/ Alarme)/, runeSelectionHTML.trim() + '\n\n' + `              <div className="flex flex-col gap-2 max-w-xs mt-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                   Tempo Gastando Mana
                </label>
                <div className="flex bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/20 backdrop-blur-sm rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors">
                  <input
                    type="number"
                    min="0"
                    value={hours}
                    onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                  />
                  <div className="px-3 py-2 bg-medieval-gold/10 text-medieval-gold text-xs font-bold border-l border-r border-medieval-gold/20 flex items-center">h</div>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                  />
                  <div className="px-3 py-2 bg-medieval-gold/10 text-medieval-gold text-xs font-bold border-l border-medieval-gold/20 flex items-center">m</div>
                </div>
              </div>
            </div>
`);

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
