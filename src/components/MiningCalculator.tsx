import { useState, useMemo } from 'react';
import { Pickaxe, Info, TrendingUp, AlertTriangle, Hammer } from 'lucide-react';

interface MiningCalculatorProps {
  t: any;
}

const PICKS = [
  { name: 'Pick', minSkill: 10, breakChance: 0, mineBonus: 0, dropMultiplier: 1 },
  { name: 'Modified Pick', minSkill: 20, breakChance: 1, mineBonus: 2.5, dropMultiplier: 1.5 },
  { name: 'Advanced Pick', minSkill: 30, breakChance: 2, mineBonus: 5, dropMultiplier: 2 },
  { name: 'Enhanced Pick', minSkill: 40, breakChance: 3, mineBonus: 7.5, dropMultiplier: 2.5 },
];

export function MiningCalculator({ t }: MiningCalculatorProps) {
  const [skill, setSkill] = useState<number>(10);
  const [selectedPickName, setSelectedPickName] = useState<string>(PICKS[0].name);
  const [targetMinerals, setTargetMinerals] = useState<number>(100);
  const [targetFragments, setTargetFragments] = useState<number>(10);
  const [pickPrice, setPickPrice] = useState<number>(0);

  // Calculadora desativada temporariamente por estar desatualizada
  const isOutdated = true;

  const selectedPick = useMemo(() => {
    return PICKS.find(p => p.name === selectedPickName) || PICKS[0];
  }, [selectedPickName]);

  const stats = useMemo(() => {
    // ... (keeping logic for when it's re-enabled)
    // Chance de quebrar o spot (Sucesso na mineração)
    const skillBonusSpot = Math.min(40, (skill - 10) * 0.597);
    const baseSpotChance = 10 + skillBonusSpot;
    const finalSpotChance = (baseSpotChance + selectedPick.mineBonus) / 100;

    const baseMineralChance = (2 + (0.2 * skill)) / 100;
    const finalMineralChance = baseMineralChance * selectedPick.dropMultiplier;

    const baseFragmentChance = (0.5 + (0.1 * skill)) / 100;
    const finalFragmentChance = baseFragmentChance * selectedPick.dropMultiplier;

    const probMineralPerClick = finalSpotChance * finalMineralChance;
    const probFragmentPerClick = finalSpotChance * finalFragmentChance;

    const clicksForMinerals = targetMinerals > 0 ? targetMinerals / probMineralPerClick : 0;
    const clicksForFragments = targetFragments > 0 ? targetFragments / probFragmentPerClick : 0;
    const totalClicks = Math.max(clicksForMinerals, clicksForFragments);

    const pickBreakProb = selectedPick.breakChance / 100;
    const expectedPicks = totalClicks * pickBreakProb;
    const totalPicksCount = Math.ceil(expectedPicks);
    const totalCost = totalPicksCount * pickPrice;

    return {
      spotChance: finalSpotChance * 100,
      mineralChance: finalMineralChance * 100,
      fragmentChance: finalFragmentChance * 100,
      totalClicks: Math.ceil(totalClicks),
      expectedPicks: totalPicksCount,
      pickBreakChance: selectedPick.breakChance,
      totalCost,
      dropMultiplier: selectedPick.dropMultiplier
    };
  }, [skill, selectedPick, targetMinerals, targetFragments, pickPrice]);

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
          {t('mining')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm">
          {t('miningSubtitle')}
        </p>
      </header>

      <div className="relative min-h-[400px]">
        {isOutdated && (
          <div className="absolute inset-0 z-10 flex items-start justify-center pt-12">
            <div className="medieval-card bg-black/95 p-8 medieval-border rounded-lg max-w-2xl w-full text-center space-y-6 shadow-2xl backdrop-blur-md border-medieval-gold/50">
              <div className="flex justify-center">
                <AlertTriangle className="w-16 h-16 text-medieval-gold animate-pulse" />
              </div>
              <h2 className="text-2xl font-black text-medieval-gold uppercase tracking-widest">
                Calculadora Temporariamente Desativada
              </h2>
              <div className="space-y-4 font-mono text-sm text-medieval-text/80 leading-relaxed">
                <p className="italic bg-medieval-gold/10 p-4 border-l-4 border-medieval-gold rounded text-left">
                  "Essa formula está desatualizada, iremos atualizar a parte de mining na wiki o quanto antes" 
                  <span className="block mt-2 font-bold text-right">— GM Kanohn</span>
                </p>
                <p>
                  A equipe do Wiki Project Miracle está trabalhando para atualizar as fórmulas de acordo com as mudanças recentes do servidor.
                </p>
                <p className="text-medieval-gold font-bold uppercase tracking-tighter">
                  Ficará disponível novamente após a atualização oficial.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-500 ${isOutdated ? 'opacity-10 grayscale blur-sm pointer-events-none select-none' : ''}`}>
          <div className="lg:col-span-7 space-y-6">
          <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Skill de Mineração */}
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> {t('miningSkill')}
                </label>
                <input
                  type="number"
                  min="10"
                  value={skill}
                  onChange={(e) => setSkill(Number(e.target.value))}
                  className="medieval-input"
                />
              </div>

              {/* Tipo de Picareta */}
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <Pickaxe className="w-4 h-4" /> {t('pickType')}
                </label>
                <select
                  value={selectedPickName}
                  onChange={(e) => setSelectedPickName(e.target.value)}
                  className="medieval-input cursor-pointer appearance-none"
                >
                  {PICKS.map(p => (
                    <option key={p.name} value={p.name} disabled={skill < p.minSkill}>
                      {p.name} (Req: {p.minSkill})
                    </option>
                  ))}
                </select>
                {/* Buffs da Picareta */}
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="text-[9px] px-2 py-0.5 bg-medieval-gold/10 border border-medieval-gold/20 text-medieval-gold rounded font-bold uppercase">
                    +{selectedPick.mineBonus}% Sucesso
                  </span>
                  <span className="text-[9px] px-2 py-0.5 bg-medieval-gold/10 border border-medieval-gold/20 text-medieval-gold rounded font-bold uppercase">
                    {stats.dropMultiplier}x Drop Multiplier
                  </span>
                </div>
              </div>

              {/* Minerais Desejados */}
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  {t('targetMinerals')}
                </label>
                <input
                  type="number"
                  min="0"
                  value={targetMinerals}
                  onChange={(e) => setTargetMinerals(Number(e.target.value))}
                  className="medieval-input"
                />
              </div>

              {/* Fragmentos Desejados */}
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  {t('targetFragments')}
                </label>
                <input
                  type="number"
                  min="0"
                  value={targetFragments}
                  onChange={(e) => setTargetFragments(Number(e.target.value))}
                  className="medieval-input"
                />
              </div>
            </div>

            {/* Resultados de Probabilidade */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-medieval-gold/20">
              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('spotBreakChance')}</p>
                <div className="text-xl font-black text-medieval-gold">{stats.spotChance.toFixed(2)}%</div>
              </div>
              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('mineralChance')}</p>
                <div className="text-xl font-black text-medieval-gold">{stats.mineralChance.toFixed(2)}%</div>
              </div>
              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('fragmentChance')}</p>
                <div className="text-xl font-black text-medieval-gold">{stats.fragmentChance.toFixed(2)}%</div>
              </div>
            </div>

            {/* Novo Visual de Resultados Estilo Imagem */}
            <div className="mt-8 pt-8 border-t border-medieval-gold/20 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-medieval-gold font-black uppercase text-xs tracking-widest">{t('estimatedClicks')}</h3>
                <span className="text-medieval-gold font-black text-2xl">{stats.totalClicks.toLocaleString()}</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-medieval-gold font-black uppercase text-[10px] tracking-widest opacity-60">{t('picksNeeded')}</h3>
                
                <div className="bg-black/40 p-4 rounded border border-medieval-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-medieval-text font-bold uppercase text-sm tracking-wider">{selectedPick.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-medieval-gold font-black text-xl">
                      {stats.pickBreakChance > 0 ? `${stats.expectedPicks.toLocaleString()}x` : '∞'}
                    </span>
                    
                    <div className="h-8 w-px bg-medieval-gold/20 hidden sm:block"></div>
                    
                    <div className="flex items-center gap-3">
                      <label className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest whitespace-nowrap">
                        {t('unitPrice')} (GP)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={pickPrice}
                        onChange={(e) => setPickPrice(Number(e.target.value))}
                        className="medieval-input w-24 text-right py-1 px-2 text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center pt-4 border-t border-medieval-gold/10">
                <div className="text-right">
                  <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('totalCost')}</p>
                  <div className="text-3xl font-black text-medieval-gold">
                    {stats.totalCost.toLocaleString()} <span className="text-sm">GP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="medieval-border rounded-lg bg-medieval-card p-6 space-y-4">
            <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4" /> {t('miningInfo')}
            </h3>
            <div className="space-y-4 text-xs text-medieval-text/70 leading-relaxed font-mono">
              <p>• <span className="text-medieval-gold">{t('spotInfo').split(':')[0]}:</span> {t('spotInfo').split(':')[1]}</p>
              <p>• <span className="text-medieval-gold">{t('collectInfo').split(':')[0]}:</span> {t('collectInfo').split(':')[1]}</p>
              <p>• <span className="text-medieval-gold">{t('durabilityInfo').split(':')[0]}:</span> {t('durabilityInfo').split(':')[1]}</p>
              <p>• <span className="text-medieval-gold">Restrição:</span> Picaretas normais podem minerar apenas Lava Holes e Ice Lava Holes.</p>
            </div>
          </div>

          <div className="p-4 bg-medieval-gold/10 border border-medieval-gold/20 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-medieval-gold shrink-0 mt-0.5" />
            <p className="text-[10px] text-medieval-gold/60 italic uppercase tracking-tighter leading-relaxed">
              {t('communityWarning')}
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
