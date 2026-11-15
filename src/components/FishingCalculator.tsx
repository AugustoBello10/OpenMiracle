import React, { useState, useMemo } from 'react';

interface FishingCalculatorProps {
  language: 'pt' | 'en';
}

export const FishingCalculator: React.FC<FishingCalculatorProps> = ({ language }) => {
  const [skill, setSkill] = useState<number>(30);
  const [fishTarget, setFishTarget] = useState<number>(100);
  const [hasFishingNet, setHasFishingNet] = useState<boolean>(true);
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  // Fórmula Oficial do Miracle 7.4:
  // Chance = 10% + ((Skill - 10) * 0.597)%
  // Teto máximo (Cap): 50%
  const { rawChance, cappedChance, isCapped, attemptsPerFish, totalAttempts, estimatedBait } = useMemo(() => {
    const s = Math.max(10, Math.min(150, Number(skill) || 10));
    const raw = 10 + ((s - 10) * 0.597);
    const capped = Math.min(50, Math.max(10, raw));
    const isAtCap = raw >= 50;

    const attempts = 1 / (capped / 100);
    const target = Math.max(1, Number(fishTarget) || 1);
    const totalAtt = Math.round(target * attempts);

    return {
      rawChance: raw,
      cappedChance: capped,
      isCapped: isAtCap,
      attemptsPerFish: attempts,
      totalAttempts: totalAtt,
      estimatedBait: target, // 1 fish bait consumido por peixe fisgado
    };
  }, [skill, fishTarget]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 animate-fade-in text-left">
      
      {/* Header Limpo & Editorial */}
      <header className="relative text-center mb-6 p-6 rounded-2xl bg-gradient-to-b from-sky-950/20 via-black/80 to-black/90 border border-medieval-gold/30 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-b from-sky-500/20 via-black to-black border border-medieval-gold/40 shadow-[0_0_20px_rgba(56,189,248,0.2)] mb-3">
          <img 
            src="/images/miracle/items/mechanical_fishing_rod_7515.gif" 
            alt="Fishing Rod" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/miracle/items/ceremonial_ankh.gif';
            }}
          />
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
          {language === 'pt' ? 'Calculadora de Pesca (Fishing)' : 'Fishing Calculator'}
        </h1>

        <p className="text-stone-300 font-sans text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          {language === 'pt' 
            ? 'Calcule sua chance real de captura por puxada, tentativas médias por peixe e rendimento com Fish Bait e Fishing Net.'
            : 'Calculate your capture chance per pull, average attempts per fish, and yields with Fish Bait and Fishing Net.'}
        </p>
      </header>

      {/* Grid de Configurações e Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Painel Esquerdo: Entradas */}
        <div className="lg:col-span-7 space-y-5">
          <div className="medieval-card p-5 sm:p-6 space-y-5 border border-medieval-gold/30 bg-black/85 shadow-lg">
            
            {/* Input 1: Fishing Skill */}
            <div className="space-y-3 pb-5 border-b border-medieval-gold/20">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-medieval-gold">
                  {language === 'pt' ? 'Fishing Skill Atual' : 'Current Fishing Skill'}
                </label>

                <div className="flex items-center gap-1.5 bg-black/80 p-1 rounded-lg border border-sky-500/40">
                  <button
                    type="button"
                    onClick={() => setSkill(Math.max(10, skill - 1))}
                    disabled={skill <= 10}
                    className="w-7 h-7 flex items-center justify-center rounded bg-zinc-800 hover:bg-sky-600 disabled:opacity-30 disabled:hover:bg-zinc-800 text-white font-bold cursor-pointer transition-colors"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="10"
                    max="150"
                    value={skill}
                    onChange={(e) => setSkill(Math.max(10, Math.min(150, parseInt(e.target.value) || 10)))}
                    className="w-16 h-7 bg-zinc-900 border border-sky-500/50 text-sky-400 font-mono font-black text-base text-center rounded outline-none focus:ring-1 focus:ring-sky-500"
                  />

                  <button
                    type="button"
                    onClick={() => setSkill(Math.min(150, skill + 1))}
                    disabled={skill >= 150}
                    className="w-7 h-7 flex items-center justify-center rounded bg-zinc-800 hover:bg-sky-600 disabled:opacity-30 disabled:hover:bg-zinc-800 text-white font-bold cursor-pointer transition-colors"
                  >
                    +
                  </button>

                  <span className="text-[11px] text-zinc-400 font-mono uppercase px-1.5">
                    skill
                  </span>
                </div>
              </div>

              {/* Slider de Skill */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="1"
                  value={Math.min(100, skill)}
                  onChange={(e) => setSkill(parseInt(e.target.value) || 10)}
                  className="w-full accent-sky-500 cursor-pointer h-2 bg-zinc-900 rounded-lg appearance-none border border-medieval-gold/30 hover:border-sky-400 transition-colors"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>10 (Inicial)</span>
                  <span>30</span>
                  <span>50</span>
                  <span>77 (Teto 50%)</span>
                  <span>100</span>
                </div>
              </div>

              {/* Atalhos Rápidos */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[10, 20, 30, 40, 50, 60, 70, 77, 80, 90, 100].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setSkill(val)}
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                      skill === val
                        ? 'bg-sky-500 text-black shadow-sm font-black border border-sky-300'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Meta de Peixes */}
            <div className="space-y-2 pb-5 border-b border-medieval-gold/20">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-medieval-gold">
                  {language === 'pt' ? 'Meta de Peixes para Pescar' : 'Fish Target Amount'}
                </label>
                <div className="flex items-center gap-1.5">
                  {[50, 100, 250, 500].map(qty => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setFishTarget(qty)}
                      className={`text-xs font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${
                        fishTarget === qty
                          ? 'bg-medieval-gold text-black font-bold'
                          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="number"
                min="1"
                max="10000"
                value={fishTarget}
                onChange={(e) => setFishTarget(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-black/80 border border-zinc-700 text-white font-mono font-bold text-sm rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                placeholder="Ex: 100"
              />
            </div>

            {/* Input 3: Fishing Net Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-black/60 rounded-xl border border-medieval-gold/20">
              <div>
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  {language === 'pt' ? 'Possui Fishing Net?' : 'Owns Fishing Net?'}
                </div>
                <div className="text-[11px] text-stone-400 font-sans mt-0.5">
                  {language === 'pt' 
                    ? 'Guarda peixes automaticamente e reduz 20% do peso (cap).' 
                    : 'Auto-stacks fish in BP and reduces weight by 20%.'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasFishingNet(!hasFishingNet)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  hasFishingNet
                    ? 'bg-emerald-500 text-black border border-emerald-300 font-black'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}
              >
                {hasFishingNet 
                  ? (language === 'pt' ? 'Sim (Ativa)' : 'Yes (Active)') 
                  : (language === 'pt' ? 'Não' : 'No')}
              </button>
            </div>

            {/* Aviso da Loja sobre Fishing Net */}
            <div className="p-3 bg-sky-950/20 border border-sky-800/30 rounded-lg text-xs text-stone-300">
              <strong className="text-sky-300 block mb-0.5 font-bold">
                {language === 'pt' ? 'Onde Obter a Fishing Net:' : 'Where to Get Fishing Net:'}
              </strong>
              {language === 'pt'
                ? 'Vendida na loja do jogo (Store) por 120 Miracle Points = 12 Miracle Coins.'
                : 'Available in the in-game Store for 120 Miracle Points = 12 Miracle Coins.'}
            </div>

          </div>
        </div>

        {/* Painel Direito: Resultados */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="medieval-card p-6 relative overflow-hidden bg-gradient-to-b from-black/95 via-zinc-950 to-black border-2 border-medieval-gold/50 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
            <div className="flex items-center justify-between pb-3 border-b border-medieval-gold/20">
              <span className="text-xs font-black uppercase tracking-wider text-medieval-gold">
                {language === 'pt' ? 'Chance por Puxada' : 'Catch Chance per Pull'}
              </span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${isCapped ? 'text-amber-400 bg-amber-950/80 border border-amber-600/50' : 'text-sky-400 bg-sky-950/80 border border-sky-600/50'}`}>
                {isCapped ? (language === 'pt' ? 'Teto Máximo (50%)' : 'Cap Reached (50%)') : `${cappedChance.toFixed(2)}%`}
              </span>
            </div>

            {/* Mostrador Principal de Chance */}
            <div className="my-5 text-center">
              <div className="text-5xl font-black text-medieval-gold font-mono tracking-tight">
                {cappedChance.toFixed(2)}%
              </div>
              <div className="text-xs text-stone-400 font-mono mt-2">
                {language === 'pt' ? '1 peixe a cada' : '1 fish every'} <span className="text-sky-300 font-bold">{attemptsPerFish.toFixed(1)}</span> {language === 'pt' ? 'puxadas médias' : 'average pulls'}
              </div>
            </div>

            {/* Métricas Estimadas */}
            <div className="space-y-2 pt-3 border-t border-medieval-gold/20">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">{language === 'pt' ? 'Puxadas Estimadas (Total):' : 'Estimated Total Pulls:'}</span>
                <span className="font-mono font-bold text-white text-sm">~{totalAttempts.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">{language === 'pt' ? 'Fish Baits Consumidas:' : 'Fish Baits Consumed:'}</span>
                <span className="font-mono font-bold text-amber-300 text-sm">~{estimatedBait.toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">{language === 'pt' ? 'Tempo Estimado (Puxada 1s):' : 'Estimated Time (1s pull):'}</span>
                <span className="font-mono font-bold text-sky-300 text-sm">
                  {Math.floor(totalAttempts / 60)}m {totalAttempts % 60}s
                </span>
              </div>
              {hasFishingNet && (
                <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-800">
                  <span className="text-emerald-400 font-bold">{language === 'pt' ? 'Bônus Fishing Net:' : 'Fishing Net Bonus:'}</span>
                  <span className="font-mono text-emerald-300 font-bold">-20% Cap / Auto-stack</span>
                </div>
              )}
            </div>

          </div>

          {/* Botão de Fórmulas */}
          <button
            type="button"
            onClick={() => setShowFormulaDetails(!showFormulaDetails)}
            className="w-full py-2.5 px-4 rounded-xl border border-medieval-gold/40 bg-black/70 hover:bg-medieval-gold/10 text-medieval-gold font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
          >
            {showFormulaDetails
              ? (language === 'pt' ? 'Ocultar Detalhes da Fórmula' : 'Hide Formula Details')
              : (language === 'pt' ? 'Ver Detalhes da Fórmula Oficial' : 'View Official Formula Details')}
          </button>

        </div>

      </div>

      {/* Detalhes da Fórmula Expansível */}
      {showFormulaDetails && (
        <div className="p-5 bg-black/70 rounded-xl border border-medieval-gold/20 space-y-3 animate-fade-in">
          <h4 className="text-xs font-black uppercase tracking-wider text-medieval-gold">
            {language === 'pt' ? 'Fórmula Oficial de Fishing no Miracle 7.4' : 'Official Fishing Formula in Miracle 7.4'}
          </h4>
          <div className="space-y-2 text-xs text-stone-300 leading-relaxed font-sans">
            <p className="font-mono bg-black/80 p-3 rounded border border-medieval-gold/20 text-amber-300">
              Chance (%) = 10% + ((Fishing Skill - 10) × 0.597)% [Máximo 50%]
            </p>
            <p>
              • <strong className="text-white">{language === 'pt' ? 'Skill Base (10):' : 'Base Skill (10):'}</strong> {language === 'pt' ? 'Todo personagem começa com 10% de chance básica de sucesso.' : 'Every character starts with a base 10% success chance.'}
            </p>
            <p>
              • <strong className="text-white">{language === 'pt' ? 'Progressão:' : 'Progression:'}</strong> {language === 'pt' ? 'A cada ponto de fishing acima de 10, sua chance aumenta em aproximadamente +0.597%.' : 'Each point above 10 grants +0.597% success chance.'}
            </p>
            <p>
              • <strong className="text-white">{language === 'pt' ? 'Teto no Skill 77:' : 'Cap at Skill 77:'}</strong> {language === 'pt' ? 'No skill 77, você atinge o teto oficial de 50% de chance (1 captura a cada 2 puxadas). Acima do 77 a chance permanece travada em 50%.' : 'At skill 77, you reach the official 50% cap (1 catch every 2 pulls). Levels above 77 remain capped at 50%.'}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
