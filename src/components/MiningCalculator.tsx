import { useState, useMemo } from 'react';
import { Pickaxe, Info, TrendingUp, AlertTriangle, Hammer, Target, Gem, Coins, Sparkles } from 'lucide-react';

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
  const [pickPrice, setPickPrice] = useState<number | string>(0);
  const [targetCategory, setTargetCategory] = useState<'soils' | 'fragments' | 'gems'>('soils');
  const [targetAmount, setTargetAmount] = useState<number>(10);

  // Calculadora reativada com as novas fórmulas
  const isOutdated = false;

  const selectedPick = useMemo(() => {
    return PICKS.find(p => p.name === selectedPickName) || PICKS[0];
  }, [selectedPickName]);

  const stats = useMemo(() => {
    const skillNum = Number(skill) || 0;
    const priceNum = Number(pickPrice) || 0;

    // Clamping skill between 10 and 77 (effective cap)
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

    // NOVAS FÓRMULAS DA ATUALIZAÇÃO SUTIL:
    // "Now you have a chance to mine anything on every attempt of mining even if it not break the stone entirely."
    // 1. Solos e Minérios (Natural Soil, Frozen Ore, Glimmering Soils) -> 0.2 multiplicador
    const oacSoils = Math.min(100, Math.max(0, ((clampedSkill - 10) * 0.2) * selectedPick.dropMultiplier));
    const yieldSoils = estimatedUses !== Infinity ? estimatedUses * (oacSoils / 100) : 0;

    // 2. Todos os tipos de fragmentos (All kind of fragments) -> 0.15 multiplicador
    const oacFragments = Math.min(100, Math.max(0, ((clampedSkill - 10) * 0.15) * selectedPick.dropMultiplier));
    const yieldFragments = estimatedUses !== Infinity ? estimatedUses * (oacFragments / 100) : 0;

    // 3. Gemas de Valor / Joias (Small Diamond, Sapphire, Ruby, Emerald, Amethyst) -> 0.08 multiplicador
    const oacGems = Math.min(100, Math.max(0, ((clampedSkill - 10) * 0.08) * selectedPick.dropMultiplier));
    const yieldGems = estimatedUses !== Infinity ? estimatedUses * (oacGems / 100) : 0;

    // Rendimento Total Médio (Total Yield) = soma dos rendimentos de cada grupo por picareta
    const totalYield = yieldSoils + yieldFragments + yieldGems;
    const totalCost = priceNum; // Custo por picareta

    return {
      mbc,
      pbc,
      estimatedUses,
      oacSoils,
      oacFragments,
      oacGems,
      yieldSoils,
      yieldFragments,
      yieldGems,
      totalYield,
      totalCost,
      dropMultiplier: selectedPick.dropMultiplier,
      fragility: selectedPick.fragility
    };
  }, [skill, selectedPick, pickPrice]);

  const targetSimulation = useMemo(() => {
    let itemsPerPick = 0;
    let label = '';
    if (targetCategory === 'soils') {
      itemsPerPick = stats.yieldSoils;
      label = 'Solos & Minérios';
    } else if (targetCategory === 'fragments') {
      itemsPerPick = stats.yieldFragments;
      label = 'Fragmentos';
    } else {
      itemsPerPick = stats.yieldGems;
      label = 'Gemas & Joias';
    }

    const avgPicks = itemsPerPick > 0 ? targetAmount / itemsPerPick : 0;
    
    // Para garantir contra má sorte (Utilizando a aproximação de Poisson para 95% de confiança de obter pelo menos K itens)
    // lambda >= K + 1.64 * sqrt(K) + 0.82
    const lambda95 = targetAmount + 1.64 * Math.sqrt(targetAmount) + 0.82;
    const safePicks = itemsPerPick > 0 ? lambda95 / itemsPerPick : 0;

    const priceNum = Number(pickPrice) || 0;
    const avgCost = avgPicks * priceNum;
    const safeCost = safePicks * priceNum;

    return {
      itemsPerPick,
      label,
      avgPicks,
      safePicks,
      avgCost,
      safeCost
    };
  }, [targetCategory, targetAmount, stats, pickPrice]);

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

              {/* Info da Atualização de Mineração */}
              <div className="sm:col-span-2 p-3.5 bg-medieval-gold/5 border border-medieval-gold/15 rounded-md flex flex-col gap-1.5 animate-fade-in">
                <div className="flex items-center gap-2 text-medieval-gold font-bold uppercase text-[10px] tracking-wider font-sans">
                  <Info className="w-4 h-4 text-medieval-gold shrink-0" />
                  <span>Atualização de Mineração (Chance por Tentativa)</span>
                </div>
                <p className="text-[10.5px] text-medieval-text/80 leading-relaxed font-mono font-sans">
                  Agora, cada batida (tentativa) na rocha tem uma chance independente de extrair itens, mesmo sem quebrar a rocha por inteiro. O rendimento médio saltou de <span className="text-medieval-gold font-bold">6.6</span> para cerca de <span className="text-emerald-400 font-bold">16 itens</span> por picareta (com 50 skill & Enhanced Pick).
                </p>
              </div>
            </div>

            {/* Resultados de Probabilidade */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-medieval-gold/20">
              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10 font-mono">
                <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1 font-sans">{t('mineBreakChance')}</p>
                <div className="text-xl font-black text-medieval-gold">{stats.mbc.toFixed(2)}%</div>
              </div>
              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10 font-mono">
                <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1 font-sans">{t('pickBreakChance')}</p>
                <div className="text-xl font-black text-medieval-gold">{stats.pbc.toFixed(4)}%</div>
              </div>
              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10 font-mono">
                <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1 font-sans">Usos Médios por Picareta</p>
                <div className="text-xl font-black text-medieval-gold">
                  {stats.estimatedUses === Infinity ? '∞' : Math.floor(stats.estimatedUses).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Novo Visual de Resultados Estilo Imagem */}
            <div className="mt-8 pt-8 border-t border-medieval-gold/20 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-medieval-gold font-black uppercase text-xs tracking-widest">{t('estimatedUsesPerPick')}</h3>
                <span className="text-medieval-gold font-black text-2xl">{stats.estimatedUses === Infinity ? '∞' : Math.floor(stats.estimatedUses).toLocaleString()}</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-medieval-gold font-black uppercase text-[10px] tracking-widest opacity-60 font-sans">Rendimento Esperado por Picareta</h3>
                
                <div className="bg-black/40 p-4 rounded border border-medieval-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-medieval-text font-bold uppercase text-sm tracking-wider font-sans">{selectedPick.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex flex-col items-end font-sans">
                      <span className="text-medieval-gold font-black text-xl font-mono">
                        {stats.totalYield.toFixed(2)}
                      </span>
                      <span className="text-[8px] text-medieval-gold/40 uppercase font-bold">{t('totalItems')}</span>
                    </div>
                    
                    <div className="h-8 w-px bg-medieval-gold/20 hidden sm:block"></div>
                    
                    <div className="flex items-center gap-3">
                      <label className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest whitespace-nowrap font-sans">
                        {t('unitPrice')} (GP)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={pickPrice}
                        onChange={(e) => setPickPrice(e.target.value)}
                        className="medieval-input w-24 text-right py-1 px-2 text-sm font-mono"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Detalhamento das 3 Categorias */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-black/25 p-3 rounded border border-medieval-gold/10 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-300 font-bold text-[10.5px] font-sans">Solos & Minérios</span>
                        <span className="text-[8px] bg-white/5 px-1 py-0.5 rounded text-medieval-text/50 font-mono">Mult: 0.20</span>
                      </div>
                      <div className="text-[9.5px] text-medieval-text/60 leading-tight mb-2">Natural Soil, Frozen Ore, Glimmering Soils</div>
                    </div>
                    <div className="flex justify-between items-end pt-1 border-t border-white/5">
                      <div>
                        <div className="text-[8px] text-medieval-muted/40 uppercase font-mono mt-1">Chance / Hit</div>
                        <div className="text-[10px] font-bold text-stone-300 font-mono">{stats.oacSoils.toFixed(2)}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] text-medieval-muted/40 uppercase font-mono">Esperado</div>
                        <div className="text-xs font-black text-stone-300 font-mono">{stats.yieldSoils.toFixed(2)} un</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/25 p-3 rounded border border-medieval-gold/10 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-orange-300 font-bold text-[10.5px] font-sans font-bold">Fragmentos</span>
                        <span className="text-[8px] bg-white/5 px-1 py-0.5 rounded text-medieval-text/50 font-mono">Mult: 0.15</span>
                      </div>
                      <div className="text-[9.5px] text-medieval-text/60 leading-tight mb-2">Todos os tipos de fragmentos de ferro, cobre...</div>
                    </div>
                    <div className="flex justify-between items-end pt-1 border-t border-white/5">
                      <div>
                        <div className="text-[8px] text-medieval-muted/40 uppercase font-mono mt-1">Chance / Hit</div>
                        <div className="text-[10px] font-bold text-orange-300 font-mono">{stats.oacFragments.toFixed(2)}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] text-medieval-muted/40 uppercase font-mono">Esperado</div>
                        <div className="text-xs font-black text-orange-300 font-mono">{stats.yieldFragments.toFixed(2)} un</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-medieval-gold/5 p-3 rounded border border-medieval-gold/25 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1 font-sans">
                        <span className="text-medieval-gold font-bold text-[10.5px]">Gemas & Joias</span>
                        <span className="text-[8px] bg-medieval-gold/15 px-1 py-0.5 rounded text-medieval-gold/80 font-mono font-bold">Mult: 0.08</span>
                      </div>
                      <div className="text-[9.5px] text-medieval-gold/75 leading-tight mb-2">Small Diamond, Sapphire, Ruby, Emerald, Amethyst</div>
                    </div>
                    <div className="flex justify-between items-end pt-1 border-t border-medieval-gold/15">
                      <div>
                        <div className="text-[8px] text-medieval-gold/40 uppercase font-mono mt-1">Chance / Hit</div>
                        <div className="text-[10px] font-bold text-medieval-gold font-mono">{stats.oacGems.toFixed(2)}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] text-medieval-gold/40 uppercase font-mono">Esperado</div>
                        <div className="text-xs font-black text-medieval-gold font-mono">{stats.yieldGems.toFixed(2)} un</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center pt-4 border-t border-medieval-gold/10 font-sans">
                <div className="text-right">
                  <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('costPerItem')}</p>
                  <div className="text-3xl font-black text-medieval-gold font-mono font-bold font-sans">
                    {stats.totalYield > 0 ? (Number(pickPrice) / stats.totalYield).toFixed(2) : '0.00'} <span className="text-sm">GP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Planejador de Metas Interativo */}
          <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg space-y-6 animate-fade-in hover:border-medieval-gold/30 transition-all duration-300">
            <div className="flex items-center gap-3 border-b border-medieval-gold/20 pb-4">
              <Target className="w-5 h-5 text-medieval-gold animate-bounce" />
              <div>
                <h3 className="text-medieval-gold font-bold uppercase text-xs tracking-wider font-sans">
                  🎯 Simulador de Metas de Caça (Facilitador)
                </h3>
                <p className="text-[10px] text-medieval-text/50 font-mono">
                  Defina o que você quer obter para descobrir quantas picaretas comprar!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Escolha a categoria e quantidade */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-medieval-gold font-bold uppercase tracking-wider font-sans">
                    1. O que você quer coletar?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'soils', label: 'Solos', icon: '🌍' },
                      { id: 'fragments', label: 'Fragmentos', icon: '⛓️' },
                      { id: 'gems', label: 'Joias / Gemas', icon: '💎' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setTargetCategory(cat.id as any)}
                        className={`p-2 rounded border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          targetCategory === cat.id
                            ? 'bg-medieval-gold/15 border-medieval-gold text-medieval-gold font-bold scale-[1.02]'
                            : 'bg-black/25 border-medieval-gold/10 text-medieval-text/60 hover:border-medieval-gold/35'
                        }`}
                      >
                        <span className="text-sm">{cat.icon}</span>
                        <span className="text-[9.5px] whitespace-nowrap font-sans font-semibold">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] text-medieval-gold font-bold uppercase tracking-wider font-sans">
                      2. Quantidade que deseja
                    </label>
                    <span className="text-xs font-mono font-bold text-medieval-gold bg-medieval-gold/10 px-1.5 py-0.5 rounded border border-medieval-gold/15">{targetAmount} un</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="1"
                      max="150"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(Number(e.target.value))}
                      className="flex-1 h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-medieval-gold self-center"
                    />
                    <input
                      type="number"
                      min="1"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(Math.max(1, Number(e.target.value) || 1))}
                      className="medieval-input w-16 text-center py-0.5 px-1 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Presets Rápidos */}
                <div className="space-y-1.5">
                  <span className="text-[9px] text-medieval-text/40 uppercase font-bold block font-sans">Atalhos de Metas de Farm:</span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { label: 'Solo Inicial (10 un)', cat: 'soils', qty: 10 },
                      { label: 'Solo Pro (30 un)', cat: 'soils', qty: 30 },
                      { label: 'Arma Básica (15 Frag)', cat: 'fragments', qty: 15 },
                      { label: 'Equipa de Metal (50 Frag)', cat: 'fragments', qty: 50 },
                      { label: 'Gemas Rápidas (5 un)', cat: 'gems', qty: 5 }
                    ].map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setTargetCategory(p.cat as any);
                          setTargetAmount(p.qty);
                        }}
                        className="text-[8.5px] bg-white/5 hover:bg-medieval-gold/10 border border-white/10 hover:border-medieval-gold/30 text-medieval-text/80 px-2 py-1 rounded cursor-pointer transition-all font-sans"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resultados do Planejamento */}
              <div className="bg-black/35 p-4 rounded border border-medieval-gold/15 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-[9.5px] text-medieval-gold/60 uppercase font-bold tracking-wider mb-2.5 font-sans border-b border-medieval-gold/10 pb-1.5">
                    Seu Plano Simplificado
                  </h4>
                  
                  {targetSimulation.itemsPerPick === 0 ? (
                    <p className="text-[10px] text-red-400 font-mono italic">
                      Sua skill é muito baixa ou o rendimento é insignificante para este grupo. Aumente o nível de Skill de Mineração primeiro!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] text-medieval-muted/60 block font-sans uppercase">Em média, 1 picareta te dá:</span>
                        <div className="text-xs font-bold text-medieval-text flex items-center gap-1.5">
                          <span className="text-medieval-gold font-black font-mono text-sm">{targetSimulation.itemsPerPick.toFixed(2)}</span>
                          <span className="text-[10.5px] font-sans">itens de {targetSimulation.label}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pb-0.5">
                        <div className="space-y-1 p-2 bg-black/40 rounded border border-white/5">
                          <span className="text-[9px] text-medieval-text/50 block font-sans font-bold uppercase leading-tight">Média Esperada:</span>
                          <div className="text-lg font-black text-medieval-gold font-mono flex items-baseline gap-1">
                            {Math.ceil(targetSimulation.avgPicks)}
                            <span className="text-[8px] text-medieval-text/50 font-normal uppercase">Picks</span>
                          </div>
                          <span className="text-[8px] text-medieval-text/40 block leading-tight">Para sorte normal</span>
                        </div>

                        <div className="space-y-1 bg-emerald-500/5 p-2 rounded border border-emerald-500/15">
                          <span className="text-[9px] text-emerald-400 font-bold block font-sans uppercase leading-tight">
                            🛡️ Antiazar (95%):
                          </span>
                          <div className="text-lg font-black text-emerald-400 font-mono flex items-baseline gap-1">
                            {Math.ceil(targetSimulation.safePicks)}
                            <span className="text-[8px] text-emerald-400/60 font-normal uppercase">Picks</span>
                          </div>
                          <span className="text-[8px] text-emerald-400/50 block leading-tight">Garante mesmo se der azar</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-medieval-gold/10 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[8px] text-medieval-text/40 block uppercase font-bold font-sans">Custo Médio</span>
                    <span className="text-xs font-black text-medieval-gold font-mono">
                      {targetSimulation.avgCost > 0 ? `${Math.ceil(targetSimulation.avgCost).toLocaleString()} GP` : 'Defina o preço'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] text-emerald-400/70 block uppercase font-bold font-sans">Custo Antiazar</span>
                    <span className="text-xs font-black text-emerald-400 font-mono">
                      {targetSimulation.safeCost > 0 ? `${Math.ceil(targetSimulation.safeCost).toLocaleString()} GP` : 'Defina o preço'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="medieval-border rounded-lg bg-medieval-card p-6 space-y-4">
            <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 font-sans">
              <Info className="w-4 h-4" /> {t('miningInfo')}
            </h3>
            <div className="space-y-4 text-xs text-medieval-text/70 leading-relaxed font-mono">
              <p>• <span className="text-medieval-gold font-sans font-bold">MBC (Mine Break Chance):</span> Chance da pedra sumir após uma batida. Cap de 100%.</p>
              <p>• <span className="text-medieval-gold font-sans font-bold">PBC (Pick Break Chance):</span> Taxa de desgaste da picareta, proporcional à MBC e fragilidade.</p>
              <p>• <span className="text-medieval-gold font-sans font-bold">OAC (On-Attempt Chance):</span> Chance individual por batida (tentativa) de extrair itens, mesmo se a pedra não quebrar inteira.</p>
              <p>• <span className="text-medieval-gold font-sans font-bold">Multiplicadores da Skill:</span> Solos e minérios usam multiplicador de 0.20; Fragmentos de metal usam 0.15; Joias/Gemas raras usam o multiplicador balanceado de 0.08.</p>
              <p>• <span className="text-medieval-gold font-sans font-bold">Sistema de Prioridade:</span> O servidor faz um sorteio único por clique. Se a chance de um item raro e outro comum baterem, o sistema **sempre prioriza o mais raro**.</p>
              <p>• <span className="text-medieval-gold font-sans font-bold">Yield:</span> Rendimento total médio de itens somando todas as categorias por picareta.</p>
              <p>• <span className="text-medieval-gold font-sans font-bold">Restrição:</span> Picaretas normais podem minerar apenas Lava Holes e Ice Lava Holes.</p>
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
