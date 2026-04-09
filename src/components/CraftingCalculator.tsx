
import React, { useState, useMemo } from 'react';
import { Hammer, Gem, Sword, Info, AlertTriangle, Table as TableIcon, Twitch, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface CraftingCalculatorProps {
  t: (key: string) => string;
  CRAFT_ITEMS: any[];
  BREAKING_DATA: any[];
}

export const CraftingCalculator: React.FC<CraftingCalculatorProps> = ({ t, CRAFT_ITEMS, BREAKING_DATA }) => {
  const [skill, setSkill] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<string>(CRAFT_ITEMS[0].category);
  const [selectedItemName, setSelectedItemName] = useState<string>(CRAFT_ITEMS[0].items[0].name);

  const selectedItem = useMemo(() => {
    const category = CRAFT_ITEMS.find(c => c.category === selectedCategory);
    return category?.items.find((i: any) => i.name === selectedItemName) || category?.items[0];
  }, [selectedCategory, selectedItemName, CRAFT_ITEMS]);

  const chance = useMemo(() => {
    if (!selectedItem) return 0;
    // Formula: (skill * multiplier)
    const baseChance = skill * selectedItem.multiplier;
    return Math.min(100, Math.max(0, parseFloat(baseChance.toFixed(1))));
  }, [skill, selectedItem]);

  return (
    <div className="space-y-12">
      {/* Cabeçalho Crafting */}
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
          {t('crafting')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm">
          Cálculos de chance e guia de materiais
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calculadora */}
        <div className="lg:col-span-7 space-y-6">
          <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Sua Skill Atual
                </label>
                <input
                  type="number"
                  min="10"
                  max="200"
                  value={skill}
                  onChange={(e) => setSkill(Number(e.target.value))}
                  className="medieval-input text-2xl font-bold"
                />
              </div>

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
                  className="medieval-input cursor-pointer appearance-none"
                >
                  {CRAFT_ITEMS.map(cat => (
                    <option key={cat.category} value={cat.category}>{cat.category}</option>
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
                  className="medieval-input cursor-pointer appearance-none"
                >
                  {CRAFT_ITEMS.find(c => c.category === selectedCategory)?.items.map((item: any) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>

              {selectedItem?.req && (
                <div className="bg-black/40 p-4 rounded border border-medieval-gold/20 flex items-start gap-3">
                  <Info className="w-5 h-5 text-medieval-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase text-medieval-gold/60 font-bold tracking-tighter">Requisitos:</p>
                    <p className="text-sm text-medieval-text italic">{selectedItem.req}</p>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-medieval-gold/20">
                <div className="text-center space-y-2">
                  <p className="text-medieval-gold/60 uppercase text-xs font-bold tracking-[0.2em]">{t('successChance')}</p>
                  <div className={`text-6xl sm:text-7xl font-black ${chance >= 70 ? 'text-green-500' : chance >= 40 ? 'text-medieval-gold' : 'text-medieval-red'}`}>
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

        {/* Twitch/Social */}
        <div className="lg:col-span-5 space-y-6">
          <div className="medieval-border rounded-lg overflow-hidden bg-black aspect-video">
            <iframe
              src={`https://player.twitch.tv/?channel=obellao_&parent=${window.location.hostname}`}
              height="100%" width="100%" allowFullScreen title="Twitch Player"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <a href="https://www.twitch.tv/obellao_" target="_blank" rel="noopener noreferrer" className="medieval-button flex items-center justify-center gap-3">
              <Twitch className="w-6 h-6" /> Twitch
            </a>
            <a href="https://discord.gg/nacCypRkqQ" target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] text-white font-bold py-3 px-6 rounded-sm flex items-center justify-center gap-3 hover:bg-[#4752C4] transition-colors">
              <MessageSquare className="w-6 h-6" /> Discord
            </a>
          </div>
        </div>
      </div>

      {/* Tabela de Quebra */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <TableIcon className="text-medieval-gold w-6 h-6" />
          <h2 className="text-2xl font-black text-medieval-gold uppercase tracking-tight">{t('breakingGuide')}</h2>
        </div>
        <div className="medieval-border rounded-lg overflow-hidden bg-medieval-card overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/60 text-medieval-gold uppercase text-xs tracking-widest border-b border-medieval-gold/30">
                <th className="p-4 font-black">{t('item')}</th>
                <th className="p-4 text-center">{t('max')}</th>
                <th className="p-4 text-center">{t('min')}</th>
                <th className="p-4">{t('mathAvg')}</th>
                <th className="p-4">{t('practicalAvg')}</th>
                <th className="p-4">{t('verdict')}</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {BREAKING_DATA.map((row, idx) => (
                <tr key={idx} className={`border-b border-medieval-gold/10 hover:bg-white/5 ${idx % 2 === 0 ? 'bg-black/20' : ''}`}>
                  <td className="p-4 font-bold text-medieval-gold">{row.item}</td>
                  <td className="p-4 text-center">{row.max}</td>
                  <td className="p-4 text-center">{row.min}</td>
                  <td className="p-4">{row.mathAvg}</td>
                  <td className="p-4 font-mono">{row.practicalAvg}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-sm text-[10px] font-black uppercase ${
                      row.verdict.includes('QUEBRAR') ? 'text-green-400 border-green-500/30' :
                      row.verdict.includes('UPAR') ? 'text-blue-400 border-blue-500/30' : 'text-medieval-red border-medieval-red/30'
                    } border bg-black/40`}>
                      {
                        row.verdict === "Vender NPC ou UPAR SKILL" ? t('sellNpcOrUpgrade') :
                        row.verdict === "Vender NPC" ? t('sellNpc') :
                        row.verdict === "QUEBRAR PARA MATERIAL" ? t('breakForMaterial') :
                        row.verdict === "UPAR SKILL" ? t('upgradeSkill') :
                        row.verdict === "Vender NPC OU COLETAR MAT RAPIDO" ? t('sellNpcOrCollectFast') :
                        row.verdict === "QUEBRAR" ? t('break') :
                        row.verdict
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

import { Zap } from 'lucide-react';
