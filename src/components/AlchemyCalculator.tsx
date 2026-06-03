
import React, { useState } from 'react';
import { FlaskConical, Coins, Sparkles, Zap, Info, AlertTriangle, Check, X } from 'lucide-react';
import { ALCHEMY_RUNES, ALCHEMY_CRYSTALS } from '../data/alchemy';

interface AlchemyCalculatorProps {
  t: (key: string) => string;
  initialRuneName?: string;
}

export const AlchemyCalculator: React.FC<AlchemyCalculatorProps> = ({ t, initialRuneName }) => {
  const [alchemySkill, setAlchemySkill] = useState<number | string>(10);
  const [decayMinutes, setDecayMinutes] = useState<number | string>(0);
  const [isAlchemist, setIsAlchemist] = useState<boolean>(false);

  const skillNum = Number(alchemySkill) || 0;
  const decayNum = Number(decayMinutes) || 0;

  // Gold Conversion
  const goldSuccessChance = Math.min(100, 10 + (0.2 * skillNum));

  // Crystals
  const getCrystalChance = (baseChance: number) => {
    return Math.min(100, baseChance + (0.75 * skillNum));
  };

  // Runes
  const getRuneChance = (baseChance: number) => {
    const skillBonus = 0.2 * skillNum;
    const totalBase = baseChance + skillBonus;
    // Decay: loses 20% of its TOTAL chance per minute
    const decayFactor = Math.max(0, 1 - (0.2 * decayNum));
    return Math.min(100, totalBase * decayFactor);
  };

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
          {t('alchemy')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm">
          {t('alchemySubtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Skill Input */}
        <div className="lg:col-span-4 space-y-6">
          <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                <FlaskConical className="w-4 h-4" /> {t('alchemySkill')}
              </label>
              <input
                type="number"
                value={alchemySkill}
                onChange={(e) => setAlchemySkill(e.target.value)}
                className="medieval-input"
                min="10"
                max="200"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded border border-medieval-gold/20">
              <span className="text-xs font-bold uppercase text-medieval-gold/60">{t('alchemistOnly')}?</span>
              <button
                onClick={() => setIsAlchemist(!isAlchemist)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${isAlchemist ? 'bg-medieval-gold' : 'bg-medieval-card border border-medieval-gold/30'}`}
              >
                <div className={`w-4 h-4 rounded-full transition-transform ${isAlchemist ? 'translate-x-6 bg-black' : 'translate-x-0 bg-medieval-gold/40'}`} />
              </button>
            </div>

            <div className="p-4 bg-medieval-gold/5 border border-medieval-gold/20 rounded-lg space-y-2">
              <h4 className="text-[10px] font-black uppercase text-medieval-gold tracking-widest flex items-center gap-2">
                <Info className="w-3 h-3" /> Info
              </h4>
              <p className="text-[10px] text-medieval-text/60 leading-relaxed italic">
                {t('goldConverterDesc')}
              </p>
            </div>
          </div>

          {/* Gold Conversion Card */}
          <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-medieval-gold/10 rounded">
                <Coins className="text-medieval-gold w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-medieval-gold uppercase tracking-widest">{t('goldConversion')}</h3>
            </div>
            <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
              <p className="text-medieval-gold/60 uppercase text-[10px] font-bold tracking-widest mb-1">{t('successChance')}</p>
              <div className="text-3xl font-black text-medieval-gold">{goldSuccessChance.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        {/* Main Content: Crystals & Runes */}
        <div className="lg:col-span-8 space-y-8">
          {/* Crystals Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="text-medieval-gold w-6 h-6" />
              <h2 className="text-xl font-black text-medieval-gold uppercase tracking-widest">{t('crystalEnchantment')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ALCHEMY_CRYSTALS.map(crystal => (
                <div key={crystal.key} className="medieval-card bg-medieval-card p-4 medieval-border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase text-medieval-gold tracking-tighter">{crystal.name}</span>
                    <span className="text-xs font-mono text-medieval-gold/60">{crystal.baseChance}% Base</span>
                  </div>
                  <div className="text-2xl font-black text-medieval-gold">{getCrystalChance(crystal.baseChance).toFixed(1)}%</div>
                  <p className="text-[9px] text-medieval-text/50 leading-tight italic">
                    {t(`${crystal.key}Desc`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Runes Section */}
          <section className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Zap className="text-medieval-gold w-6 h-6" />
                <h2 className="text-xl font-black text-medieval-gold uppercase tracking-widest">{t('runeOvercharging')}</h2>
              </div>
              <div className="flex items-center gap-3 bg-black/40 p-2 rounded border border-medieval-gold/20">
                <label className="text-[10px] font-bold uppercase text-medieval-gold/60">{t('decayTime')}:</label>
                <input
                  type="number"
                  value={decayMinutes}
                  onChange={(e) => setDecayMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-16 bg-transparent border-b border-medieval-gold/30 text-medieval-gold font-mono text-xs focus:outline-none text-center"
                  min="0"
                  max="5"
                />
              </div>
            </div>

            <div className="p-3.5 bg-medieval-gold/5 border border-medieval-gold/20 rounded-lg flex items-start sm:items-center gap-2.5">
              <Info className="w-4 h-4 text-medieval-gold shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-[10.5px] sm:text-xs text-medieval-text/85 leading-relaxed font-mono">
                {t('alchemyFormulaNote')}
              </p>
            </div>

            <div className="medieval-border rounded-lg overflow-hidden bg-medieval-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/60 border-b border-medieval-gold/20">
                      <th className="p-4 text-[10px] font-black text-medieval-gold uppercase tracking-widest">Rune</th>
                      <th className="p-4 text-[10px] font-black text-medieval-gold uppercase tracking-widest">{t('magicLevelConjure')}</th>
                      <th className="p-4 text-[10px] font-black text-medieval-gold uppercase tracking-widest">{t('minSkill')}</th>
                      <th className="p-4 text-[10px] font-black text-medieval-gold uppercase tracking-widest">{t('baseChance')}</th>
                      <th className="p-4 text-[10px] font-black text-medieval-gold uppercase tracking-widest">{t('finalChance')}</th>
                      <th className="p-4 text-[10px] font-black text-medieval-gold uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-medieval-gold/10">
                    {ALCHEMY_RUNES.map(rune => {
                      const finalChance = getRuneChance(rune.baseChance);
                      const hasSkill = alchemySkill >= rune.minSkill;
                      const canUse = !rune.alchemistOnly || isAlchemist;
                      const isPossible = hasSkill && canUse;
                      const isHighlighted = initialRuneName && rune.name.toLowerCase().includes(initialRuneName.toLowerCase());

                      return (
                        <tr key={rune.name} className={`hover:bg-medieval-gold/5 transition-colors ${!isPossible ? 'opacity-40' : ''} ${isHighlighted ? 'bg-medieval-gold/10 border-l-2 border-medieval-gold ring-1 ring-medieval-gold/30' : ''}`}>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-medieval-text uppercase tracking-tighter">{rune.name}</span>
                              {rune.alchemistOnly && (
                                <span className="text-[8px] text-medieval-gold font-black uppercase tracking-widest">{t('exclusiveRune')}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 font-mono text-xs text-medieval-gold/80">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-200">ML {rune.magicLevel}</span>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-xs text-medieval-gold/80">
                            <div className="flex flex-col">
                              <span className="font-bold text-medieval-gold">{rune.minSkill} Alchemy</span>
                              <span className="text-[8.5px] text-medieval-text/40">({rune.magicLevel} × 2 + 10)</span>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-xs text-medieval-gold/60">{rune.baseChance}%</td>
                          <td className="p-4">
                            <span className={`font-mono text-sm font-black ${isPossible ? 'text-medieval-gold' : 'text-medieval-red'}`}>
                              {finalChance.toFixed(2)}%
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {isPossible ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <div className="flex items-center gap-1">
                                  <X className="w-4 h-4 text-medieval-red" />
                                  {!hasSkill && <span className="text-[8px] text-medieval-red font-bold uppercase">Low Skill</span>}
                                  {!canUse && <span className="text-[8px] text-medieval-red font-bold uppercase">Not Alchemist</span>}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <div className="p-4 bg-medieval-red/10 border border-medieval-red/20 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-medieval-red shrink-0 mt-0.5" />
            <p className="text-[10px] text-medieval-text/60 italic uppercase tracking-tighter leading-relaxed">
              {t('runeOverchargeDesc')} • {t('communityWarning')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
