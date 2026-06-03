
import React, { useState, useMemo } from 'react';
import { Hammer, Gem, Sword, Info, AlertTriangle, Table as TableIcon, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SalvageGuide } from './SalvageGuide';

interface CraftingCalculatorProps {
  t: (key: string) => string;
  CRAFT_ITEMS: any[];
  BREAKING_DATA: any[];
  initialCategory?: string;
  initialItemName?: string;
}

export const CraftingCalculator: React.FC<CraftingCalculatorProps> = ({ t, CRAFT_ITEMS, BREAKING_DATA, initialCategory, initialItemName }) => {
  const [activeMode, setActiveMode] = useState<'forge' | 'salvage'>('forge');
  const [skill, setSkill] = useState<number | string>(10);
  const [quantity, setQuantity] = useState<number | string>(1);
  const [materialPrices, setMaterialPrices] = useState<Record<string, number | string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>(CRAFT_ITEMS[0].category);
  const [selectedItemName, setSelectedItemName] = useState<string>(CRAFT_ITEMS[0].items[0].name);

  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
    if (initialItemName) {
      setSelectedItemName(initialItemName);
    }
  }, [initialCategory, initialItemName]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    [BREAKING_DATA[0].category]: true
  });

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const selectedItem = useMemo(() => {
    const category = CRAFT_ITEMS.find(c => c.category === selectedCategory);
    return category?.items.find((i: any) => i.name === selectedItemName) || category?.items[0];
  }, [selectedCategory, selectedItemName, CRAFT_ITEMS]);

  const chance = useMemo(() => {
    if (!selectedItem) return 0;
    const skillNum = Number(skill) || 0;
    // Formula original restaurada: 10 + (skill - 10) * multiplier
    const baseChance = 10 + (skillNum - 10) * selectedItem.multiplier;
    return Math.min(100, Math.max(0, parseFloat(baseChance.toFixed(1))));
  }, [skill, selectedItem]);

  const materialsCalculation = useMemo(() => {
    if (!selectedItem || !selectedItem.materials) return null;
    
    const quantityNum = Number(quantity) || 0;
    const successRate = chance / 100;
    const expectedAttempts = successRate > 0 ? Math.ceil(quantityNum / successRate) : 0;

    let totalCost = 0;
    const materials = selectedItem.materials.map((mat: any) => {
      const totalNeeded = mat.amount * expectedAttempts;
      const unitPrice = Number(materialPrices[mat.name]) || 0;
      totalCost += totalNeeded * unitPrice;
      
      return {
        name: mat.name,
        total: totalNeeded,
        unitPrice
      };
    });

    return {
      expectedAttempts,
      materials,
      totalCost
    };
  }, [selectedItem, quantity, chance, materialPrices]);

  const handlePriceChange = (name: string, price: string) => {
    setMaterialPrices(prev => ({
      ...prev,
      [name]: price
    }));
  };

  const language = t('currentSkill') === 'Skill Atual' ? 'pt' : 'en';

  return (
    <div className="space-y-12">
      {/* Cabeçalho Crafting */}
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
          {t('crafting')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm max-w-2xl mx-auto">
          {activeMode === 'forge'
            ? (language === 'pt' ? 'Forja, chances de sucesso, materiais necessários e custos esperados.' : 'Forge equipment, success odds & materials required.')
            : (language === 'pt' ? 'Tabela avançada de quebra de itens com cálculo em tempo real de lucros.' : 'Advanced item salvaging table with real-time profits analysis.')}
        </p>
      </header>

      {/* Mode Sub-tabs */}
      <div className="flex border-b border-medieval-gold/15 pb-4 justify-center md:justify-start gap-4">
        <button
          onClick={() => setActiveMode('forge')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded border text-xs font-black uppercase tracking-wider transition-all duration-300 ${
            activeMode === 'forge'
              ? 'bg-medieval-gold/15 text-medieval-gold border-medieval-gold/60 shadow-lg scale-[1.02]'
              : 'bg-black/25 text-medieval-text/50 border-transparent hover:border-medieval-gold/30 hover:text-medieval-text/80'
          }`}
        >
          <Hammer className="w-4 h-4" />
          {language === 'pt' ? 'Forjar Itens (Forge)' : 'Forge & Craft'}
        </button>
        <button
          onClick={() => setActiveMode('salvage')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded border text-xs font-black uppercase tracking-wider transition-all duration-300 ${
            activeMode === 'salvage'
              ? 'bg-medieval-gold/15 text-medieval-gold border-medieval-gold/60 shadow-lg scale-[1.02]'
              : 'bg-black/25 text-medieval-text/50 border-transparent hover:border-medieval-gold/30 hover:text-medieval-text/80'
          }`}
        >
          <TableIcon className="w-4 h-4" />
          {language === 'pt' ? 'Guia de Quebra & Salvamento' : 'Salvage & Break Guide'}
        </button>
      </div>

      {activeMode === 'salvage' ? (
        <SalvageGuide language={language} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8">
            {/* Calculadora */}
            <div className="space-y-6">
              <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                        <Zap className="w-4 h-4" /> {t('currentSkill')}
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="200"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        className="medieval-input text-xl font-bold"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                        <Hammer className="w-4 h-4" /> {t('quantityToCraft')}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="medieval-input text-xl font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                        <Gem className="w-4 h-4" /> {t('category')}
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          const cat = CRAFT_ITEMS.find(c => c.category === e.target.value);
                          if (cat) setSelectedItemName(cat.items[0].name);
                        }}
                        className="medieval-input cursor-pointer appearance-none text-sm"
                      >
                        {CRAFT_ITEMS.map(cat => (
                          <option key={cat.category} value={cat.category}>{t(cat.category as any)}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                        <Sword className="w-4 h-4" /> {t('item')}
                      </label>
                      <select
                        value={selectedItemName}
                        onChange={(e) => setSelectedItemName(e.target.value)}
                        className="medieval-input cursor-pointer appearance-none text-sm"
                      >
                        {CRAFT_ITEMS.find(c => c.category === selectedCategory)?.items.map((item: any) => (
                          <option key={item.name} value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {selectedItem?.req && (
                    <div className="bg-black/40 p-4 rounded border border-medieval-gold/20 flex items-start gap-3">
                      <Info className="w-5 h-5 text-medieval-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs uppercase text-medieval-gold/60 font-bold tracking-tighter">{t('requirements')}:</p>
                        <p className="text-sm text-medieval-text italic">{selectedItem.req}</p>
                      </div>
                    </div>
                  )}

                  {materialsCalculation && (
                    <div className="bg-medieval-gold/5 p-4 rounded border border-medieval-gold/30 space-y-4">
                      <div className="flex justify-between items-center border-b border-medieval-gold/20 pb-2">
                        <span className="text-xs uppercase font-black text-medieval-gold tracking-widest">{t('expectedAttempts')}</span>
                        <span className="text-xl font-black text-medieval-gold">{materialsCalculation.expectedAttempts}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-[10px] uppercase font-bold text-medieval-gold/60 tracking-widest">{t('totalMaterialsNeeded')}</p>
                        <div className="grid grid-cols-1 gap-3">
                          {materialsCalculation.materials.map((mat: any, idx: number) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3 bg-black/20 p-3 rounded border border-medieval-gold/10">
                              <div className="flex-1 flex justify-between items-center">
                                <span className="text-xs text-medieval-text">{mat.name}</span>
                                <span className="text-sm font-black text-medieval-gold">{mat.total}x</span>
                              </div>
                              <div className="flex items-center gap-2 sm:border-l sm:border-medieval-gold/20 sm:pl-3">
                                <label className="text-[9px] uppercase text-medieval-gold/40 font-bold whitespace-nowrap">{t('unitPrice')}</label>
                                <input
                                  type="number"
                                  min="0"
                                  placeholder="0"
                                  value={materialPrices[mat.name] || ''}
                                  onChange={(e) => handlePriceChange(mat.name, e.target.value)}
                                  className="bg-black/40 border border-medieval-gold/20 rounded px-2 py-1 text-xs text-medieval-gold w-24 focus:border-medieval-gold outline-none transition-colors"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {materialsCalculation.totalCost > 0 && (
                        <div className="pt-3 border-t border-medieval-gold/20 flex justify-between items-center">
                          <span className="text-xs uppercase font-black text-medieval-gold tracking-widest">{t('totalCost')}</span>
                          <span className="text-2xl font-black text-medieval-gold">{materialsCalculation.totalCost.toLocaleString()} GP</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-6 border-t border-medieval-gold/20">
                    <div className="text-center space-y-2">
                      <p className="text-medieval-gold/60 uppercase text-xs font-bold tracking-[0.2em]">{t('successChance')}</p>
                      <div className={`text-5xl sm:text-6xl font-black ${chance >= 70 ? 'text-green-500' : chance >= 40 ? 'text-medieval-gold' : 'text-medieval-red'}`}>
                        {chance}%
                      </div>
                      <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-medieval-gold/30 mt-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${chance}%` }}
                          className={`h-full ${chance >= 70 ? 'bg-green-500' : chance >= 40 ? 'bg-medieval-gold' : 'bg-medieval-red'}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de Quebra */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <TableIcon className="text-medieval-gold w-6 h-6" />
              <h2 className="text-2xl font-black text-medieval-gold uppercase tracking-tight">{t('breakingGuide')}</h2>
            </div>
            
            <div className="space-y-4">
              {BREAKING_DATA.map((catGroup, catIdx) => (
                <div key={catIdx} className="medieval-border rounded-lg overflow-hidden bg-medieval-card">
                  <button 
                    onClick={() => toggleCategory(catGroup.category)}
                    className="w-full flex items-center justify-between p-4 bg-black/60 hover:bg-black/80 transition-colors border-b border-medieval-gold/20"
                  >
                    <div className="flex items-center gap-3">
                      {expandedCategories[catGroup.category] ? <ChevronDown className="w-5 h-5 text-medieval-gold" /> : <ChevronRight className="w-5 h-5 text-medieval-gold" />}
                      <h3 className="text-lg font-black text-medieval-gold uppercase tracking-widest">{t(catGroup.category)}</h3>
                    </div>
                    <span className="text-[10px] font-bold text-medieval-gold/40 uppercase">{catGroup.items.length} {t('item')}(s)</span>
                  </button>

                  <AnimatePresence>
                    {expandedCategories[catGroup.category] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-x-auto"
                      >
                        <table className="w-full text-left border-collapse min-w-[800px]">
                          <thead>
                            <tr className="bg-black/40 text-medieval-gold uppercase text-[10px] tracking-widest border-b border-medieval-gold/30">
                              <th className="p-4 font-black">{t('item')}</th>
                              <th className="p-4 text-center">{t('max')}</th>
                              <th className="p-4 text-center">{t('min')}</th>
                              <th className="p-4 text-center">{t('minSkill')}</th>
                              <th className="p-4">{t('mathAvg')}</th>
                              <th className="p-4">{t('practicalAvg')}</th>
                              <th className="p-4">{t('verdict')}</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs">
                            {catGroup.items.map((row: any, idx: number) => (
                              <tr key={idx} className={`border-b border-medieval-gold/10 hover:bg-white/5 ${idx % 2 === 0 ? 'bg-black/10' : ''}`}>
                                <td className="p-4 font-bold text-medieval-gold">{row.item}</td>
                                <td className="p-4 text-center text-medieval-text/80">{row.max}</td>
                                <td className="p-4 text-center text-medieval-text/80">{row.min}</td>
                                <td className="p-4 text-center font-mono text-medieval-gold/60">{row.minSkill || '-'}</td>
                                <td className="p-4 text-medieval-text/80">{row.mathAvg}</td>
                                <td className="p-4 font-mono text-medieval-text/80">{row.practicalAvg}</td>
                                <td className="p-4">
                                  <span className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase ${
                                    row.verdict.includes('QUEBRAR') ? 'text-green-400 border-green-500/30' :
                                    row.verdict.includes('UPAR') ? 'text-blue-400 border-blue-500/30' : 
                                    row.verdict === 'Em testes' ? 'text-medieval-gold/60 border-medieval-gold/20' :
                                    'text-medieval-red border-medieval-red/30'
                                  } border bg-black/40`}>
                                    {
                                      row.verdict === "Vender NPC ou UPAR SKILL" ? t('sellNpcOrUpgrade') :
                                      row.verdict === "Vender NPC" ? t('sellNpc') :
                                      row.verdict === "QUEBRAR PARA MATERIAL" ? t('breakForMaterial') :
                                      row.verdict === "UPAR SKILL" ? t('upgradeSkill') :
                                      row.verdict === "Vender NPC OU COLETAR MAT RAPIDO" ? t('sellNpcOrCollectFast') :
                                      row.verdict === "QUEBRAR" ? t('break') :
                                      row.verdict === "Em testes" ? t('underTesting') :
                                      row.verdict
                                    }
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
