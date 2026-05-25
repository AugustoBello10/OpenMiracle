import { useState, useMemo } from 'react';
import { Pickaxe, Info, TrendingUp, AlertTriangle, Hammer } from 'lucide-react';

interface MiningCalculatorProps {
  t: any;
}

const PICKS = [
  { name: 'Pick', minSkill: 10, mineBonus: 0, dropMultiplier: 1.0, fragility: 0.5 },
  { name: 'Modified Pick', minSkill: 20, mineBonus: 2.5, dropMultiplier: 1.5, fragility: 1.0 },
  { name: 'Advanced Pick', minSkill: 30, mineBonus: 5.0, dropMultiplier: 2.0, fragility: 2.0 },
  { name: 'Enhanced Pick', minSkill: 40, mineBonus: 7.5, dropMultiplier: 2.5, fragility: 3.0 },
];

export function MiningCalculator({ t }: MiningCalculatorProps) {
  const [skill, setSkill] = useState<number | string>(10);
  const [selectedPickName, setSelectedPickName] = useState<string>(PICKS[0].name);
  const [rareProportion, setRareProportion] = useState<number>(15);
  const [pickPrice, setPickPrice] = useState<number | string>(0);

  // Calculadora reativada com as novas fórmulas
  const isOutdated = false;

  const selectedPick = useMemo(() => {
    return PICKS.find(p => p.name === selectedPickName) || PICKS[0];
  }, [selectedPickName]);

  const stats = useMemo(() => {
    const skillNum = Number(skill) || 0;
    const priceNum = Number(pickPrice) || 0;

    // Clamping skill between 10 and 77
    const clampedSkill = Math.min(77, Math.max(10, skillNum));

    // Passo A: Chance de Quebra da Mina (MBC)
    // Fórmula: 10 + ((Skill - 10) * 0.597) + Bônus de Quebra da Picareta
    const mbc = Math.min(100, 10 + ((clampedSkill - 10) * 0.597) + selectedPick.mineBonus);

    // Passo B: Chance de Quebra da Picareta (PBC)
    // Fórmula: (Fator de Fragilidade da Picareta / 100) * Chance de Quebra da Mina (MBC)
    const pbc = (selectedPick.fragility / 100) * mbc;

    // Passo C: Estimativa de Usos
    // Fórmula: 100 / Chance de Quebra da Picareta (PBC)
    const estimatedUses = pbc > 0 ? 100 / pbc : Infinity;

    // Passo D: Chance Global de Drop (OAC)
    // Fórmula: ((Skill - 10) * 0.2) * Multiplicador de Drop da Picareta
    const oac = Math.min(100, ((clampedSkill - 10) * 0.2) * selectedPick.dropMultiplier);

    // Passo E: Rendimento Total Médio (Yield)
    // Fórmula: Usos Estimados * (Chance de Quebra da Mina / 100) * (Chance Global de Drop / 100)
    const totalYield = estimatedUses * (mbc / 100) * (oac / 100);

    // Passo F: Simulação Comum vs. Raro
    const raresExpected = totalYield * (rareProportion / 100);
    const commonsExpected = totalYield - raresExpected;

    const totalCost = priceNum; // Custo por picareta

    return {
      mbc,
      pbc,
      estimatedUses,
      oac,
      totalYield,
      raresExpected,
      commonsExpected,
      totalCost,
      dropMultiplier: selectedPick.dropMultiplier,
      fragility: selectedPick.fragility
    };
  }, [skill, selectedPick, rareProportion, pickPrice]);

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
                  onChange={(e) => setSkill(e.target.value)}
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
                    +{selectedPick.mineBonus}% MBC Bonus
                  </span>
                  <span className="text-[9px] px-2 py-0.5 bg-medieval-gold/10 border border-medieval-gold/20 text-medieval-gold rounded font-bold uppercase">
                    {stats.dropMultiplier}x Drop Mult.
                  </span>
                  <span className="text-[9px] px-2 py-0.5 bg-medieval-gold/10 border border-medieval-gold/20 text-medieval-gold rounded font-bold uppercase">
                    {stats.fragility}% Fragility
                  </span>
                </div>
              </div>

              {/* Proporção de Raros */}
              <div className="flex flex-col gap-2 sm:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                    {t('rareProportion')}
                  </label>
                  <span className="text-medieval-gold font-mono text-xs font-bold">{rareProportion}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={rareProportion}
                  onChange={(e) => setRareProportion(Number(e.target.value))}
                  className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-medieval-gold"
                />
                <div className="flex justify-between text-[8px] text-medieval-gold/40 uppercase font-bold">
                  <span>{t('common')}</span>
                  <span>{t('rare')}</span>
                </div>
              </div>
            </div>

            {/* Resultados de Probabilidade */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-medieval-gold/20">
              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('mineBreakChance')}</p>
                <div className="text-xl font-black text-medieval-gold">{stats.mbc.toFixed(2)}%</div>
              </div>
              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('pickBreakChance')}</p>
                <div className="text-xl font-black text-medieval-gold">{stats.pbc.toFixed(4)}%</div>
              </div>
              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('globalDropChance')}</p>
                <div className="text-xl font-black text-medieval-gold">{stats.oac.toFixed(2)}%</div>
              </div>
            </div>

            {/* Novo Visual de Resultados Estilo Imagem */}
            <div className="mt-8 pt-8 border-t border-medieval-gold/20 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-medieval-gold font-black uppercase text-xs tracking-widest">{t('estimatedUsesPerPick')}</h3>
                <span className="text-medieval-gold font-black text-2xl">{stats.estimatedUses === Infinity ? '∞' : Math.floor(stats.estimatedUses).toLocaleString()}</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-medieval-gold font-black uppercase text-[10px] tracking-widest opacity-60">{t('yieldPerPick')}</h3>
                
                <div className="bg-black/40 p-4 rounded border border-medieval-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-medieval-text font-bold uppercase text-sm tracking-wider">{selectedPick.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-medieval-gold font-black text-xl">
                        {stats.totalYield.toFixed(2)}
                      </span>
                      <span className="text-[8px] text-medieval-gold/40 uppercase font-bold">{t('totalItems')}</span>
                    </div>
                    
                    <div className="h-8 w-px bg-medieval-gold/20 hidden sm:block"></div>
                    
                    <div className="flex items-center gap-3">
                      <label className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest whitespace-nowrap">
                        {t('unitPrice')} (GP)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={pickPrice}
                        onChange={(e) => setPickPrice(e.target.value)}
                        className="medieval-input w-24 text-right py-1 px-2 text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Detalhamento Raro vs Comum */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 p-3 rounded border border-medieval-gold/5 text-center">
                    <p className="text-medieval-gold/40 uppercase text-[8px] font-black tracking-widest mb-1">{t('commonsExpected')}</p>
                    <div className="text-lg font-black text-medieval-text/80">{stats.commonsExpected.toFixed(2)}</div>
                  </div>
                  <div className="bg-medieval-gold/5 p-3 rounded border border-medieval-gold/10 text-center">
                    <p className="text-medieval-gold/60 uppercase text-[8px] font-black tracking-widest mb-1">{t('raresExpected')}</p>
                    <div className="text-lg font-black text-medieval-gold">{stats.raresExpected.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center pt-4 border-t border-medieval-gold/10">
                <div className="text-right">
                  <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('costPerItem')}</p>
                  <div className="text-3xl font-black text-medieval-gold">
                    {stats.totalYield > 0 ? (pickPrice / stats.totalYield).toFixed(2) : '0.00'} <span className="text-sm">GP</span>
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
              <p>• <span className="text-medieval-gold">MBC (Mine Break Chance):</span> Chance da pedra sumir após uma batida. Cap de 100%.</p>
              <p>• <span className="text-medieval-gold">PBC (Pick Break Chance):</span> Taxa de desgaste da picareta, proporcional à MBC e fragilidade.</p>
              <p>• <span className="text-medieval-gold">OAC (Global Drop Chance):</span> Chance de qualquer item vir para a mochila ao bater.</p>
              <p>• <span className="text-medieval-gold">Sistema de Prioridade:</span> O servidor faz um único sorteio. Se a chance de um item raro e um comum baterem, o sistema **sempre prioriza o mais raro**. Não é possível ganhar dois itens no mesmo hit.</p>
              <p>• <span className="text-medieval-gold">Yield:</span> Rendimento total médio de itens por picareta.</p>
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
