const fs = require('fs');
let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

const inputsHtml = `
            {/* Profit & Price Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-medieval-gold/10">
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                   Preço de Venda da BP (20x)
                </label>
                <div className="flex bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/20 backdrop-blur-sm rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors w-full">
                  <input
                    type="number"
                    min="0"
                    value={runeBpPrice}
                    onChange={(e) => setRuneBpPrice(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none h-[42px]"
                  />
                  <div className="px-3 py-2 bg-medieval-gold/10 text-medieval-gold text-xs font-bold border-l border-medieval-gold/20 flex items-center">gp</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                   Custo da BP de Blanks
                </label>
                <div className="flex bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/20 backdrop-blur-sm rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors w-full">
                  <input
                    type="number"
                    min="0"
                    value={blankRuneBpPrice}
                    onChange={(e) => setBlankRuneBpPrice(Math.max(0, parseInt(e.target.value) || 0))}
                    disabled={!isRuneType}
                    className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none h-[42px] disabled:opacity-50"
                  />
                  <div className="px-3 py-2 bg-medieval-gold/10 text-medieval-gold text-xs font-bold border-l border-medieval-gold/20 flex items-center">gp</div>
                </div>
              </div>
            </div>
`;

// Insert it right after the {calcMode !== 'manafluids' && ( <motion.div ... Alarme / Timer ... )}
// Or rather, insert it before "Bônus de Regeneração de Mana" section.
content = content.replace(/\{\/\* Equipments Extra Regen \(ONLY Online\) \*\/\}/, inputsHtml + '\n            {/* Equipments Extra Regen (ONLY Online) */}');

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
