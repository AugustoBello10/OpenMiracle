import { useState, useMemo } from 'react';
import { Pickaxe, Info, TrendingUp, AlertTriangle, Hammer } from 'lucide-react';

interface MiningCalculatorProps {
  t: any;
}

const PICKS = [
  { name: 'Pick', minSkill: 10, breakChance: 0, mineBonus: 0, collectBonus: 0 },
  { name: 'Modified Pick', minSkill: 20, breakChance: 1, mineBonus: 2, collectBonus: 25 },
  { name: 'Advanced Pick', minSkill: 30, breakChance: 2, mineBonus: 4, collectBonus: 50 },
  { name: 'Enhanced Pick', minSkill: 40, breakChance: 3, mineBonus: 6, collectBonus: 100 },
];

export function MiningCalculator({ t }: MiningCalculatorProps) {
  const [skill, setSkill] = useState<number>(10);
  const [selectedPickName, setSelectedPickName] = useState<string>(PICKS[0].name);
  const [targetMinerals, setTargetMinerals] = useState<number>(100);
  const [targetFragments, setTargetFragments] = useState<number>(10);

  const selectedPick = useMemo(() => {
    return PICKS.find(p => p.name === selectedPickName) || PICKS[0];
  }, [selectedPickName]);

  const stats = useMemo(() => {
    // Chance de quebrar o spot (Sucesso na mineração)
    // base 10% + 0.597% por skill acima de 10, max 50%
    const skillBonusSpot = Math.min(40, (skill - 10) * 0.597);
    const baseSpotChance = 10 + skillBonusSpot;
    const finalSpotChance = (baseSpotChance + selectedPick.mineBonus) / 100;

    // Chance de coletar Minerais
    // base 2% + 0.1% * skill
    const baseMineralChance = (2 + (0.1 * skill)) / 100;
    const finalMineralChance = baseMineralChance * (1 + selectedPick.collectBonus / 100);

    // Chance de coletar Fragmentos
    // base 0.5% + 0.025% * skill
    const baseFragmentChance = (0.5 + (0.025 * skill)) / 100;
    const finalFragmentChance = baseFragmentChance * (1 + selectedPick.collectBonus / 100);

    // Probabilidades por clique
    const probMineralPerClick = finalSpotChance * finalMineralChance;
    const probFragmentPerClick = finalSpotChance * finalFragmentChance;

    // Cliques necessários
    const clicksForMinerals = targetMinerals > 0 ? targetMinerals / probMineralPerClick : 0;
    const clicksForFragments = targetFragments > 0 ? targetFragments / probFragmentPerClick : 0;
    const totalClicks = Math.max(clicksForMinerals, clicksForFragments);

    // Picaretas necessárias
    const pickBreakProb = selectedPick.breakChance / 100;
    const expectedPicks = totalClicks * pickBreakProb;

    return {
      spotChance: finalSpotChance * 100,
      mineralChance: finalMineralChance * 100,
      fragmentChance: finalFragmentChance * 100,
      totalClicks: Math.ceil(totalClicks),
      expectedPicks: Math.ceil(expectedPicks),
      pickBreakChance: selectedPick.breakChance
    };
  }, [skill, selectedPick, targetMinerals, targetFragments]);

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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

            {/* Resultados Finais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="text-center p-6 bg-medieval-gold/5 rounded border border-medieval-gold/30">
                <p className="text-medieval-gold uppercase text-[10px] font-black tracking-widest mb-1">{t('estimatedClicks')}</p>
                <div className="text-3xl font-black text-medieval-gold">{stats.totalClicks.toLocaleString()}</div>
              </div>
              <div className="text-center p-6 bg-medieval-gold/10 rounded border border-medieval-gold/40">
                <p className="text-medieval-gold uppercase text-[10px] font-black tracking-widest mb-1">{t('picksNeeded')}</p>
                <div className="text-3xl font-black text-medieval-gold">
                  {stats.pickBreakChance > 0 ? `${stats.expectedPicks.toLocaleString()}x` : '∞'}
                </div>
                {stats.pickBreakChance > 0 && (
                  <p className="text-[9px] text-medieval-gold/60 mt-1 uppercase font-bold">
                    {t('pickBreakChance')}: {stats.pickBreakChance}%
                  </p>
                )}
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
  );
}
