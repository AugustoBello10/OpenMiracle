const fs = require('fs');
let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

const replacement = `
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

              <div className="flex flex-col gap-2 max-w-xs mt-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                   {calcMode === 'manafluids' ? 'Quantidade Desejada' : 'Tempo de Regeneração'}
                </label>
                
                {calcMode === 'online' ? (
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
                ) : calcMode === 'manafluids' ? (
                  <div className="flex gap-2 h-[42px]">
                    <select
                      value={mfTargetMode}
                      onChange={(e) => setMfTargetMode(e.target.value as any)}
                      className="medieval-input px-3 text-xs font-bold uppercase tracking-wider text-medieval-gold cursor-pointer"
                    >
                      <option value="fluids">Fluids</option>
                      <option value="runes">Runas</option>
                    </select>
                    <div className="flex bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/20 backdrop-blur-sm rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors w-full">
                      {mfTargetMode === 'fluids' ? (
                        <input
                          type="number"
                          min="1"
                          value={mfCount}
                          onChange={(e) => setMfCount(Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                        />
                      ) : (
                        <input
                          type="number"
                          min="1"
                          value={targetRunesCount}
                          onChange={(e) => setTargetRunesCount(Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 h-[42px]">
                    <div className="flex bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/20 backdrop-blur-sm rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors w-full">
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={offlineDurationMinutes}
                        onChange={(e) => {
                          const val = Math.max(1, Math.min(200, parseInt(e.target.value) || 0));
                          setOfflineDurationMinutes(val);
                        }}
                        className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                      />
                      <div className="px-3 py-2 bg-medieval-gold/10 text-medieval-gold text-xs font-bold border-l border-medieval-gold/20 flex items-center">minutos</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
`;

content = content.replace(/\{\/\* Rune Selection & Time \*\/\}[\s\S]*?(?=\{\/\* Unified Timer \/ Alarme)/, replacement.trim() + '\n\n            ');

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
