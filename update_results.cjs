const fs = require('fs');

let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

const replacement = `
  const avgMps = totalTimeSeconds > 0 ? generatedMana / totalTimeSeconds : 0;
  const mlProgress = calculateMagicLevelProgress(vocation, currentML, mlPercent, generatedMana);

  const bpsProduced = runesAmount / 20;
  const totalRevenue = bpsProduced * runeBpPrice;
  const blankCost = isRuneType ? (bpsProduced * blankRuneBpPrice) : 0;
  const mfCost = calcMode === 'manafluids' ? mfNeededOrUsed * 100 : 0;
  const totalCost = blankCost + mfCost;
  const profit = totalRevenue - totalCost;
  const goldPerMp = generatedMana > 0 ? profit / generatedMana : 0;
`;

content = content.replace(/const avgMps = totalTimeSeconds > 0 \? generatedMana \/ totalTimeSeconds : 0;\s*const mlProgress = calculateMagicLevelProgress\(vocation, currentML, mlPercent, generatedMana\);/, replacement.trim());

// Update the result panel HTML.
const resultPanel = `
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-[10px] text-medieval-gold/40 uppercase tracking-widest mb-1 leading-tight flex justify-center items-center gap-1">
                      <FlaskConical className="w-3 h-3 text-medieval-gold" />
                      Runas (Unidades)
                    </div>
                    <div className="text-2xl font-black text-medieval-gold">
                      {runesAmount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-medieval-gold/60 mt-1">
                      (~{bpsProduced.toFixed(1)} BP{bpsProduced !== 1 ? 's' : ''})
                    </div>
                  </div>

                  {calcMode === 'manafluids' ? (
                    <div className="bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div className="text-[10px] text-[#5ba2ff]/40 uppercase tracking-widest mb-1 leading-tight flex justify-center items-center gap-1">
                        <FlaskConical className="w-3 h-3 text-[#5ba2ff]" />
                        Mana Fluids
                      </div>
                      <div className="text-2xl font-black text-[#5ba2ff]">
                        {mfNeededOrUsed.toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div className="text-[10px] text-medieval-gold/40 uppercase tracking-widest mb-1 leading-tight flex justify-center items-center gap-1">
                        Custo
                      </div>
                      <div className="text-2xl font-black text-red-400">
                        {totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs text-red-400/70">gp</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-[10px] text-medieval-gold/40 uppercase tracking-widest mb-1 leading-tight flex justify-center items-center gap-1">
                      Lucro Líquido
                    </div>
                    <div className={\`text-2xl font-black \${profit >= 0 ? 'text-green-400' : 'text-red-400'}\`}>
                      {profit >= 0 ? '+' : ''}{profit.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs opacity-70">gp</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-[10px] text-medieval-gold/40 uppercase tracking-widest mb-1 leading-tight flex justify-center items-center gap-1">
                      Gold por MP (Lucro)
                    </div>
                    <div className={\`text-2xl font-black \${goldPerMp >= 0 ? 'text-green-400' : 'text-red-400'}\`}>
                      {goldPerMp.toFixed(2)} <span className="text-xs opacity-70">gp/MP</span>
                    </div>
                  </div>
                </div>
`;

// Replace from `<div className="grid grid-cols-2 gap-4">` to `</div>\n                {/* Seção Analisador de Magic Level */}`
content = content.replace(/<div className="grid grid-cols-2 gap-4">[\s\S]*?\{\/\* Seção Analisador de Magic Level \*\/\}/, resultPanel.trim() + '\n\n                {/* Seção Analisador de Magic Level */}');

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
