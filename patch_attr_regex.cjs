const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">[\s\S]*?<div className="p-4 bg-medieval-red\/10 border border-medieval-red\/20 rounded-lg flex items-start gap-3">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

const newSection = `<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-12 space-y-6">
                        <div className="medieval-card p-6 sm:p-8">
                          <div className="space-y-8">
                            
                            {/* Grid de Categorias */}
                            <div>
                              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2 mb-4">
                                <TableIcon className="w-4 h-4" /> {t('category')}
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {Object.keys(ATTRIBUTE_DATA).map(cat => (
                                  <button 
                                    key={cat} 
                                    onClick={() => {
                                      setAttrCategory(cat);
                                      setAttrItemName(ATTRIBUTE_DATA[cat][0].name);
                                    }}
                                    className={\`py-3 px-4 rounded-lg font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all border \${attrCategory === cat ? 'bg-medieval-gold/20 border-medieval-gold text-medieval-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'bg-black/40 border-medieval-gold/20 text-medieval-gold/60 hover:bg-medieval-gold/10 hover:border-medieval-gold/40'}\`}
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>
                            </div>

                             {/* Seleção de Item */}
                             <div className="flex flex-col gap-2">
                               <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                                 <Sword className="w-4 h-4" /> {t('equipment')}
                               </label>
                               <div className="flex gap-4">
                                 <div className="w-16 h-16 bg-black/60 rounded border border-medieval-gold/30 flex items-center justify-center shrink-0 shadow-inner">
                                   {attrCategory === 'Helmets' ? (
                                     <img
                                        src={\`https://res.cloudinary.com/dc4nkbnkg/image/upload/\${HELMETS_DATA.find(h => h.name === attrItemName)?.image}\`}
                                        alt={attrItemName}
                                       className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                                       referrerPolicy="no-referrer"
                                     />
                                   ) : (
                                     <Sword className="w-8 h-8 text-medieval-gold/20" />
                                   )}
                                 </div>
                                 <select
                                   value={attrItemName}
                                   onChange={(e) => setAttrItemName(e.target.value)}
                                   className="medieval-input cursor-pointer appearance-none flex-1"
                                 >
                                   {ATTRIBUTE_DATA[attrCategory]?.map(item => (
                                     <option key={item.name} value={item.name}>
                                       {item.name} (Classe {item.class})
                                     </option>
                                   ))}
                                 </select>
                               </div>
                             </div>

                            {/* Atributos Permitidos */}
                            <div className="bg-black/40 p-4 rounded border border-medieval-gold/20">
                              <p className="text-xs uppercase text-medieval-gold/60 font-bold tracking-tighter mb-3 flex items-center gap-2">
                                <Info className="w-4 h-4" /> {t('allowedAttributes')}:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {ATTRIBUTE_DATA[attrCategory]?.find(i => i.name === attrItemName)?.attributes.map(attr => (
                                  <span key={attr} className="px-2 py-1 bg-medieval-gold/10 border border-medieval-gold/30 rounded text-[10px] text-medieval-gold font-bold uppercase">
                                    {attr}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Resultados de Atributos */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-medieval-gold/20">
                              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                                <p className="text-medieval-gold/60 uppercase text-[10px] font-bold tracking-widest mb-1">Normal Orb</p>
                                <div className="text-4xl font-black text-medieval-gold">{attrResult.base}%</div>
                              </div>
                              <div className="text-center p-4 bg-medieval-gold/5 rounded border border-medieval-gold/30">
                                <p className="text-medieval-gold uppercase text-[10px] font-bold tracking-widest mb-1">Grand Arcane Orb</p>
                                <div className="text-4xl font-black text-medieval-gold shadow-medieval-gold">{attrResult.grand}%</div>
                              </div>
                            </div>

                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <div className="medieval-card p-6 space-y-4 h-full">
                            <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" /> {t('understandFormula')}
                            </h3>
                            <div className="space-y-3 text-xs text-medieval-text/70 leading-relaxed font-mono">
                              <p>1. {t('formulaStep1')}</p>
                              <p>2. {t('formulaStep2')}</p>
                              <p>3. {t('formulaStep3')}</p>
                              <p>4. {t('formulaStep4')}</p>
                            </div>
                            <div className="mt-4 p-4 bg-medieval-red/10 border border-medieval-red/20 rounded-lg flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-medieval-red shrink-0 mt-0.5" />
                              <p className="text-[10px] text-medieval-text/60 italic uppercase tracking-tighter">
                                Atenção: Atributos com menos níveis que a classe do item (ex: ML) usam apenas seus níveis disponíveis no cálculo.
                              </p>
                            </div>
                          </div>

                          <div className="medieval-card p-6 space-y-4 h-full flex flex-col justify-between">
                            <div>
                              <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4" /> Onde adquirir Orbs?
                              </h3>
                              <p className="text-xs text-medieval-text/70 leading-relaxed font-mono">
                                Normal Orbs e Grand Arcane Orbs podem ser obtidos derrotando criaturas <strong className="text-medieval-gold">Bosses</strong>, completando <strong className="text-medieval-gold">Tasks</strong> ou através do sistema de <strong className="text-medieval-gold">Alchemy</strong> craftando Mystic Runes.
                              </p>
                            </div>
                            
                            <div className="mt-6">
                              <button 
                                onClick={() => {
                                  setCalcSubTab('professions');
                                  setProfSubTab('alchemy');
                                }}
                                className="w-full bg-medieval-gold/10 hover:bg-medieval-gold/20 text-medieval-gold font-bold py-3 px-4 rounded border border-medieval-gold/30 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                              >
                                <FlaskConical className="w-5 h-5" />
                                Receitas de Mystic Runes (Alchemy)
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>`;

if (regex.test(code)) {
  code = code.replace(regex, newSection);
  fs.writeFileSync('src/App.tsx', code);
  console.log("REPLACED USING REGEX");
} else {
  console.log("REGEX MATCH NOT FOUND");
}
