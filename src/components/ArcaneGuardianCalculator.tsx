import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Clock, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  Info, 
  RefreshCw, 
  Award, 
  Plus, 
  Minus, 
  Flame
} from 'lucide-react';

interface ArcaneGuardianCalculatorProps {
  language: 'pt' | 'en';
  t?: (key: string) => string;
}

export const ArcaneGuardianCalculator: React.FC<ArcaneGuardianCalculatorProps> = ({ language }) => {
  // Constantes base da bless travada em 7 dias (168 horas = 10080 minutos)
  const BASE_DAYS = 7;
  const BASE_HOURS = BASE_DAYS * 24; // 168 horas

  // Tempo nominal restante do item mostrado no jogo
  const [daysRemaining, setDaysRemaining] = useState<number>(BASE_DAYS);
  const [hoursRemaining, setHoursRemaining] = useState<number>(0);
  const [minutesRemaining, setMinutesRemaining] = useState<number>(0);

  // Atributos totais encantados no set equipado
  const [attributesCount, setAttributesCount] = useState<number>(10);

  // Nível do personagem para cálculo de custo (200 gp * level)
  const [characterLevel, setCharacterLevel] = useState<number>(100);

  // Horas de caça com battle ativo por dia (para estimativa do calendário real)
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);

  // Resetar tempo para o item novo/completo (7 dias)
  const handleResetToFull = () => {
    setDaysRemaining(BASE_DAYS);
    setHoursRemaining(0);
    setMinutesRemaining(0);
  };

  // Ajuste do contador de atributos com validação min/max
  const handleAttributesChange = (val: number) => {
    const clamped = Math.max(0, Math.min(60, isNaN(val) ? 0 : val));
    setAttributesCount(clamped);
  };

  // Minutos nominais totais restantes indicados no item
  const nominalMinutes = useMemo(() => {
    const d = Math.max(0, Math.min(BASE_DAYS, Number(daysRemaining) || 0));
    const h = Math.max(0, Math.min(23, Number(hoursRemaining) || 0));
    const m = Math.max(0, Math.min(59, Number(minutesRemaining) || 0));
    return (d * 24 * 60) + (h * 60) + m;
  }, [daysRemaining, hoursRemaining, minutesRemaining]);

  // Taxa de aceleração da velocidade: +10% por atributo encantado (somatório linear de taxa)
  // Taxa = 1 + (atributos * 0.10)
  const speedMultiplier = useMemo(() => {
    const attrs = Math.max(0, Number(attributesCount) || 0);
    return 1 + (attrs * 0.10);
  }, [attributesCount]);

  // Tempo real líquido de batalha (em minutos)
  const realBattleMinutes = useMemo(() => {
    if (speedMultiplier <= 0) return 0;
    return nominalMinutes / speedMultiplier;
  }, [nominalMinutes, speedMultiplier]);

  // Quebra do tempo real ativo em dias, horas e minutos
  const realTimeBreakdown = useMemo(() => {
    const totalMinutes = Math.round(realBattleMinutes);
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;
    const totalHours = (totalMinutes / 60).toFixed(1);

    return { days, hours, minutes, totalHours, totalMinutes };
  }, [realBattleMinutes]);

  // Dias de calendário real com base na rotina de caça diária
  const calendarDays = useMemo(() => {
    if (hoursPerDay <= 0) return '0.0';
    const realHours = realBattleMinutes / 60;
    return (realHours / hoursPerDay).toFixed(1);
  }, [realBattleMinutes, hoursPerDay]);

  // Custo da bless: 200 gp * level
  const blessCost = useMemo(() => {
    const lvl = Math.max(1, Number(characterLevel) || 1);
    return 200 * lvl;
  }, [characterLevel]);

  // Custo por hora real de hunt líquida
  const costPerHour = useMemo(() => {
    const realHours = realBattleMinutes / 60;
    if (realHours <= 0) return 0;
    return Math.round(blessCost / realHours);
  }, [blessCost, realBattleMinutes]);

  // Nível de intensidade da queima para o Burn Meter visual
  const burnIntensity = useMemo(() => {
    if (attributesCount === 0) return { label: language === 'pt' ? 'Normal (1.0x)' : 'Standard (1.0x)', color: 'text-emerald-400', barColor: 'bg-emerald-500', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' };
    if (attributesCount <= 6) return { label: language === 'pt' ? 'Leve' : 'Low', color: 'text-amber-300', barColor: 'bg-amber-400', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.3)]' };
    if (attributesCount <= 14) return { label: language === 'pt' ? 'Moderada (2x+)' : 'Moderate (2x+)', color: 'text-amber-500', barColor: 'bg-amber-500', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.4)]' };
    if (attributesCount <= 24) return { label: language === 'pt' ? 'Intensa (3x+)' : 'High (3x+)', color: 'text-orange-500', barColor: 'bg-orange-500', glow: 'shadow-[0_0_20px_rgba(249,115,22,0.5)]' };
    return { label: language === 'pt' ? 'Sobrecarga Arcana (>4x)' : 'Arcane Overload (>4x)', color: 'text-rose-500', barColor: 'bg-rose-500', glow: 'shadow-[0_0_25px_rgba(244,63,94,0.6)]' };
  }, [attributesCount, language]);

  // Formatador de moedas do Tibia
  const renderCoins = (gold: number) => {
    if (gold <= 0) return <span className="text-medieval-gold font-bold">0 gp</span>;
    const cc = Math.floor(gold / 10000);
    const pc = Math.floor((gold % 10000) / 100);
    const gc = gold % 100;

    return (
      <div className="flex flex-wrap items-center gap-2">
        {cc > 0 && (
          <span className="flex items-center gap-1 font-bold text-white text-xs sm:text-sm bg-black/50 px-1.5 py-0.5 rounded border border-cyan-500/30">
            <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/crystalcoin.gif" alt="CC" className="w-3.5 h-3.5 inline" />
            {cc.toLocaleString('pt-BR')}
          </span>
        )}
        {pc > 0 && (
          <span className="flex items-center gap-1 font-bold text-white text-xs sm:text-sm bg-black/50 px-1.5 py-0.5 rounded border border-slate-400/30">
            <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/platinumcoin.gif" alt="PC" className="w-3.5 h-3.5 inline" />
            {pc.toLocaleString('pt-BR')}
          </span>
        )}
        {gc > 0 && (
          <span className="flex items-center gap-1 font-bold text-white text-xs sm:text-sm bg-black/50 px-1.5 py-0.5 rounded border border-amber-500/30">
            <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/goldcoin.gif" alt="GC" className="w-3.5 h-3.5 inline" />
            {gc.toLocaleString('pt-BR')}
          </span>
        )}
        <span className="text-[11px] font-mono text-medieval-gold/70">({gold.toLocaleString('pt-BR')} gps)</span>
      </div>
    );
  };

  // Comparação para a régua / tabela
  const comparisonList = useMemo(() => {
    const steps = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40];
    return steps.map(attrs => {
      const speed = 1 + (attrs * 0.10);
      const realMins = nominalMinutes / speed;
      const realHours = (realMins / 60).toFixed(1);
      const calDays = hoursPerDay > 0 ? (realMins / 60 / hoursPerDay).toFixed(1) : '0';
      const pct = ((realMins / nominalMinutes) * 100).toFixed(1);
      const cpHour = realMins > 0 ? Math.round(blessCost / (realMins / 60)) : 0;

      return {
        attrs,
        speed: speed.toFixed(1) + 'x',
        speedPercent: `+${(attrs * 10)}%`,
        realHours,
        calDays,
        pct: `${pct}%`,
        cpHour,
        isSelected: attrs === attributesCount
      };
    });
  }, [nominalMinutes, hoursPerDay, blessCost, attributesCount]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 animate-fade-in">
      
      {/* Header Estilizado */}
      <header className="relative text-center mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-amber-950/30 via-black/80 to-black/90 border border-medieval-gold/30 shadow-[0_0_35px_rgba(245,158,11,0.12)]">
        <div className="inline-flex items-center justify-center p-3.5 rounded-full bg-gradient-to-b from-amber-500/25 via-amber-700/10 to-black border-2 border-medieval-gold/50 shadow-[0_0_25px_rgba(245,158,11,0.35)] mb-4">
          <img 
            src="https://res.cloudinary.com/dc4nkbnkg/image/upload/guardian_gem.gif" 
            alt="The Arcane Guardian" 
            className="w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(245,158,11,0.9)] animate-pulse"
          />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-medieval-gold to-yellow-500 uppercase tracking-tighter mb-3 flex items-center justify-center gap-3">
          {language === 'pt' ? 'Duração: The Arcane Guardian' : 'Duration: The Arcane Guardian'}
        </h1>

        <p className="text-medieval-gold/90 font-mono text-xs sm:text-sm max-w-3xl mx-auto leading-relaxed">
          {language === 'pt' 
            ? 'Calcule o tempo líquido real de caça em batalha (battle ativo) da sua bless protetora de atributos, considerando a taxa de aceleração de 10% por atributo encantado.'
            : 'Calculate the true net hunt duration (active battle) of your attribute protection bless, considering the 10% acceleration rate per enchanted attribute.'}
        </p>

        {/* Badges Rápidas */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 pt-4 border-t border-medieval-gold/20 text-[11px] font-mono">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5 font-bold">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {language === 'pt' ? 'Base: 7 Dias (168h nominais)' : 'Base: 7 Days (168h nominal)'}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5 font-bold">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            {language === 'pt' ? 'Acelera 10% por Atributo (+10%/attr)' : 'Burns 10% Faster per Attribute'}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5 font-bold">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            {language === 'pt' ? 'Consumo Apenas em Battle' : 'Drains Only in Battle'}
          </span>
        </div>
      </header>

      {/* Grid de Configurações / Entradas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Painel Esquerdo: Controles Principais */}
        <div className="lg:col-span-7 space-y-6">
          <div className="medieval-card p-6 sm:p-7 space-y-6 border-2 border-medieval-gold/30 bg-black/85 shadow-[0_0_25px_rgba(0,0,0,0.8)]">
            
            {/* Seção 1: Quantidade de Atributos com Digitação Direta + Steppers + Slider */}
            <div className="space-y-4 pb-6 border-b border-medieval-gold/20">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-xs font-black uppercase tracking-wider text-medieval-gold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {language === 'pt' ? 'Total de Atributos no Set' : 'Total Set Attributes'}
                </label>

                {/* Caixa de Digitação Direta com Botões + e - */}
                <div className="flex items-center gap-1.5 bg-black/80 p-1 rounded-lg border border-amber-500/40 shadow-inner">
                  <button
                    type="button"
                    onClick={() => handleAttributesChange(attributesCount - 1)}
                    disabled={attributesCount <= 0}
                    className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-amber-600 disabled:opacity-30 disabled:hover:bg-zinc-800 text-white font-bold cursor-pointer transition-colors"
                    title="Diminuir 1 atributo"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <div className="relative flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={attributesCount}
                      onChange={(e) => handleAttributesChange(parseInt(e.target.value) || 0)}
                      className="w-16 h-8 bg-zinc-900 border border-amber-500/50 text-amber-400 font-mono font-black text-lg text-center rounded outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAttributesChange(attributesCount + 1)}
                    disabled={attributesCount >= 60}
                    className="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-amber-600 disabled:opacity-30 disabled:hover:bg-zinc-800 text-white font-bold cursor-pointer transition-colors"
                    title="Aumentar 1 atributo"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] text-zinc-400 font-mono uppercase px-2">
                    {language === 'pt' ? 'attrs' : 'attrs'}
                  </span>
                </div>
              </div>

              {/* Slider de Precisão com visual estilizado */}
              <div className="space-y-1.5 pt-1">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={attributesCount}
                    onChange={(e) => handleAttributesChange(parseInt(e.target.value) || 0)}
                    className="w-full accent-amber-500 cursor-pointer h-2.5 bg-zinc-900 rounded-lg appearance-none border border-medieval-gold/30 hover:border-amber-400 transition-colors"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>0 (Sem atributos)</span>
                  <span>10 (Média)</span>
                  <span>20 (Intermediário)</span>
                  <span>30 (Avançado)</span>
                  <span>40+ (Endgame)</span>
                </div>
              </div>

              {/* Chips Rápidos de Seleção */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  {language === 'pt' ? 'Atalhos Rápidos:' : 'Quick Shortcuts:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[0, 2, 5, 8, 10, 12, 15, 20, 25, 30, 35, 40].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleAttributesChange(val)}
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        attributesCount === val
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.6)] scale-105 border border-yellow-300'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/70 hover:border-amber-500/50'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Burn Meter Visual: Intensidade de Queima */}
              <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Flame className={`w-5 h-5 ${burnIntensity.color} animate-pulse`} />
                  <div>
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                      {language === 'pt' ? 'Intensidade de Queima' : 'Burn Intensity'}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono">
                      {speedMultiplier.toFixed(1)}x {language === 'pt' ? 'velocidade de consumo' : 'consumption speed'} (+{attributesCount * 10}%)
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-black font-mono px-2.5 py-1 rounded border border-current/30 ${burnIntensity.color} bg-black/60 ${burnIntensity.glow}`}>
                  {burnIntensity.label}
                </span>
              </div>
            </div>

            {/* Seção 2: Tempo Mostrado no Jogo (Travado em 7 dias base com ajuste fino) */}
            <div className="space-y-3 pb-6 border-b border-medieval-gold/20">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-medieval-gold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  {language === 'pt' ? 'Tempo Restante no Item (Mostrado no Jogo)' : 'Time Remaining on Item (Shown in Game)'}
                </label>
                <button
                  type="button"
                  onClick={handleResetToFull}
                  className="text-[11px] font-bold text-amber-400/90 hover:text-amber-300 flex items-center gap-1 cursor-pointer bg-amber-950/40 hover:bg-amber-900/50 px-2.5 py-1 rounded-md border border-amber-600/30 transition-all hover:scale-105"
                  title="Restaurar para 7 dias inteiros"
                >
                  <RefreshCw className="w-3 h-3" />
                  {language === 'pt' ? 'Resetar (7 Dias)' : 'Reset (7 Days)'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-400 uppercase font-mono">{language === 'pt' ? 'Dias' : 'Days'}</span>
                  <input
                    type="number"
                    min="0"
                    max={BASE_DAYS}
                    value={daysRemaining}
                    onChange={(e) => setDaysRemaining(Math.max(0, Math.min(BASE_DAYS, parseInt(e.target.value) || 0)))}
                    className="bg-black/80 border border-zinc-700 text-white font-mono font-bold text-base rounded-lg px-3 py-2 outline-none focus:border-amber-500 text-center"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-400 uppercase font-mono">{language === 'pt' ? 'Horas' : 'Hours'}</span>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hoursRemaining}
                    onChange={(e) => setHoursRemaining(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                    className="bg-black/80 border border-zinc-700 text-white font-mono font-bold text-base rounded-lg px-3 py-2 outline-none focus:border-amber-500 text-center"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-400 uppercase font-mono">{language === 'pt' ? 'Minutos' : 'Minutes'}</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutesRemaining}
                    onChange={(e) => setMinutesRemaining(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="bg-black/80 border border-zinc-700 text-white font-mono font-bold text-base rounded-lg px-3 py-2 outline-none focus:border-amber-500 text-center"
                  />
                </div>
              </div>

              <div className="text-right text-[11px] font-mono text-zinc-400">
                {language === 'pt' ? 'Tempo nominal restante:' : 'Nominal time left:'} <span className="text-medieval-gold font-bold">{(nominalMinutes / 60).toFixed(1)} horas</span> ({nominalMinutes.toLocaleString('pt-BR')} min)
              </div>
            </div>

            {/* Seção 3: Informações do Personagem e Rotina de Jogo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-medieval-gold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'pt' ? 'Level do Personagem' : 'Character Level'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={characterLevel}
                  onChange={(e) => setCharacterLevel(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-black/80 border border-zinc-700 text-white font-mono font-bold text-sm rounded-lg px-3 py-2 outline-none focus:border-amber-500"
                  placeholder="Ex: 100"
                />
                <span className="text-[10px] text-zinc-500 font-mono">
                  {language === 'pt' ? 'Fórmula oficial: 200 gp × Level' : 'Official formula: 200 gp × Level'}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-medieval-gold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'pt' ? 'Horas de Hunt / Dia' : 'Hunt Hours / Day'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.5"
                    max="24"
                    step="0.5"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className="bg-black/80 border border-zinc-700 text-white font-mono font-bold text-sm rounded-lg px-3 py-2 outline-none focus:border-amber-500 w-24 text-center"
                  />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(h => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHoursPerDay(h)}
                        className={`text-[11px] font-mono px-2 py-1.5 rounded transition-all cursor-pointer ${
                          hoursPerDay === h ? 'bg-amber-500 text-black font-bold' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        {h}h
                      </button>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {language === 'pt' ? 'Tempo ativo com battle aceso' : 'Active time with battle sign'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Painel Direito: Card Épico de Resultados */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card Principal: Tempo Real */}
          <div className="medieval-card p-6 sm:p-7 relative overflow-hidden bg-gradient-to-b from-black/95 via-zinc-950 to-black border-2 border-medieval-gold/50 shadow-[0_0_35px_rgba(245,158,11,0.2)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-medieval-gold/20">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏱️</span>
                <span className="text-xs font-black uppercase tracking-wider text-medieval-gold">
                  {language === 'pt' ? 'Tempo Líquido de Batalha' : 'True Battle Duration'}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 border border-amber-600/50 px-2.5 py-0.5 rounded-full shadow-sm">
                {speedMultiplier.toFixed(1)}x {language === 'pt' ? 'Velocidade' : 'Speed'}
              </span>
            </div>

            {/* Grande Mostrador do Tempo Real */}
            <div className="my-6 text-center">
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-mono tracking-tight drop-shadow-[0_4px_12px_rgba(245,158,11,0.3)]">
                {realTimeBreakdown.days > 0 && <span>{realTimeBreakdown.days}d </span>}
                <span>{realTimeBreakdown.hours}h {realTimeBreakdown.minutes}m</span>
              </div>
              <div className="text-sm font-mono text-zinc-300 mt-2 font-bold flex items-center justify-center gap-2">
                <span>{realTimeBreakdown.totalHours} {language === 'pt' ? 'horas de caça pura (battle ativo)' : 'hours of pure hunt (battle active)'}</span>
              </div>
              <div className="text-xs text-zinc-400 font-mono mt-1">
                {((nominalMinutes > 0 ? (realBattleMinutes / nominalMinutes) * 100 : 0)).toFixed(1)}% {language === 'pt' ? 'do tempo nominal total' : 'of nominal total time'}
              </div>
            </div>

            {/* Duração no Calendário Real */}
            <div className="p-3.5 bg-black/80 rounded-xl border border-medieval-gold/30 flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wide">
                    {language === 'pt' ? 'Duração no Calendário' : 'Calendar Duration'}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">
                    {language === 'pt' ? `Jogando ${hoursPerDay}h de battle por dia` : `Playing ${hoursPerDay}h battle/day`}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black font-mono text-amber-300">
                  ~{calendarDays} {language === 'pt' ? 'dias' : 'days'}
                </div>
              </div>
            </div>

            {/* Custo da Bless & Custo por Hora de Hunt */}
            <div className="mt-4 pt-4 border-t border-medieval-gold/20 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">{language === 'pt' ? 'Custo da Bless (Level ' + characterLevel + '):' : 'Bless Cost (Level ' + characterLevel + '):'}</span>
                <div>{renderCoins(blessCost)}</div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">{language === 'pt' ? 'Custo por hora real de hunt:' : 'Cost per true hunt hour:'}</span>
                <span className="font-mono font-bold text-amber-300 text-sm">
                  {costPerHour.toLocaleString('pt-BR')} gp/h
                </span>
              </div>
            </div>

          </div>

          {/* Dica Prática de Jogo */}
          <div className="p-4 bg-amber-950/30 border border-amber-600/40 rounded-xl flex items-start gap-3 shadow-md">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-300 leading-relaxed space-y-1">
              <strong className="text-amber-300 block">{language === 'pt' ? 'Dica de Economia:' : 'Saving Tip:'}</strong>
              <p>
                {language === 'pt'
                  ? 'Como o tempo da bless só queima enquanto você tiver o símbolo de combate (swords/pzk), desequipar anéis, amuletos e itens com atributos enquanto estiver treinando skills ou em Protection Zone (PZ) evita o desgaste acelerado da sua proteção!'
                  : 'Since the bless timer only drains while combat swords are active, unequipping rings, amulets and gear with attributes while skill training or in PZ prevents burning your protection quickly!'}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Régua / Tabela Comparativa de Atributos */}
      <div className="medieval-card p-6 sm:p-7 space-y-4 border-2 border-medieval-gold/30 bg-black/85">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-medieval-gold" />
            <h3 className="text-sm font-black uppercase tracking-wider text-medieval-gold">
              {language === 'pt' ? 'Tabela Comparativa de Consumo por Atributos' : 'Attribute Consumption Comparison Table'}
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {language === 'pt' ? `Base: ${(nominalMinutes / 60).toFixed(0)}h nominais | ${hoursPerDay}h hunt/dia` : `Base: ${(nominalMinutes / 60).toFixed(0)}h nominal | ${hoursPerDay}h hunt/day`}
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-medieval-gold/30 bg-black/60 text-medieval-gold font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">{language === 'pt' ? 'Atributos' : 'Attributes'}</th>
                <th className="py-2.5 px-3">{language === 'pt' ? 'Velocidade' : 'Speed'}</th>
                <th className="py-2.5 px-3">{language === 'pt' ? 'Tempo Real (Hunt)' : 'True Time (Hunt)'}</th>
                <th className="py-2.5 px-3">{language === 'pt' ? '% Duração' : '% Duration'}</th>
                <th className="py-2.5 px-3">{language === 'pt' ? `Dias no Calendário (${hoursPerDay}h/d)` : `Calendar Days (${hoursPerDay}h/d)`}</th>
                <th className="py-2.5 px-3 text-right">{language === 'pt' ? 'Custo / Hora' : 'Cost / Hour'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono">
              {comparisonList.map((row) => (
                <tr
                  key={row.attrs}
                  onClick={() => handleAttributesChange(row.attrs)}
                  className={`transition-colors cursor-pointer ${
                    row.isSelected 
                      ? 'bg-amber-500/20 text-white font-bold border-l-4 border-l-amber-500' 
                      : 'hover:bg-zinc-800/50 text-zinc-300'
                  }`}
                >
                  <td className="py-2 px-3 flex items-center gap-1.5">
                    {row.isSelected && <span className="text-amber-400">▶</span>}
                    <span className={row.isSelected ? 'text-amber-300 font-bold' : ''}>{row.attrs} {language === 'pt' ? 'atributos' : 'attrs'}</span>
                  </td>
                  <td className="py-2 px-3 text-amber-300 font-bold">
                    {row.speed} <span className="text-[10px] text-zinc-500">({row.speedPercent})</span>
                  </td>
                  <td className="py-2 px-3 font-bold text-white">
                    {row.realHours}h
                  </td>
                  <td className="py-2 px-3 text-zinc-400">
                    {row.pct}
                  </td>
                  <td className="py-2 px-3 text-amber-200">
                    ~{row.calDays} {language === 'pt' ? 'dias' : 'days'}
                  </td>
                  <td className="py-2 px-3 text-right text-zinc-300">
                    {row.cpHour.toLocaleString('pt-BR')} gp/h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-zinc-500 text-center italic">
          {language === 'pt' 
            ? '💡 Clique em qualquer linha da tabela para selecionar instantaneamente aquela quantidade de atributos.' 
            : '💡 Click on any row in the table to instantly select that amount of attributes.'}
        </p>
      </div>

      {/* Regras e Informações Oficiais do Jogo */}
      <div className="p-6 bg-black/70 rounded-xl border border-medieval-gold/20 space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-medieval-gold flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-400" />
          {language === 'pt' ? 'Como Funciona o Arcane Guardian' : 'How The Arcane Guardian Works'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-300 leading-relaxed">
          <div className="space-y-2">
            <p>
              • <strong className="text-amber-300">{language === 'pt' ? 'Proteção Exclusiva de Atributos:' : 'Exclusive Attribute Protection:'}</strong> {language === 'pt' ? 'Diferente das outras 5 blesses tradicionais que protegem experiência e skills, o Arcane Guardian impede que seus itens percam os atributos encantados em caso de morte.' : 'Unlike traditional blesses that protect XP and skills, Arcane Guardian prevents your items from losing enchanted attributes upon death.'}
            </p>
            <p>
              • <strong className="text-amber-300">{language === 'pt' ? 'Contagem Apenas em Batalha:' : 'Countdown in Battle Only:'}</strong> {language === 'pt' ? 'O tempo do item é consumido exclusivamente enquanto você estiver em combate com o símbolo de batalha ativo (swords/pzk). Em Protection Zone (PZ) ou parado sem battle, o tempo fica pausado.' : 'The item timer only decreases while in combat with active battle sign (swords/pzk). Inside PZ or idling without battle, the timer is paused.'}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              • <strong className="text-amber-300">{language === 'pt' ? 'Regra de 10% por Atributo:' : '10% Faster per Attribute:'}</strong> {language === 'pt' ? 'A cada atributo que você tiver nos equipamentos do inventário, o consumo fica 10% mais rápido (+10% na taxa de queima). 10 atributos dobram a velocidade de consumo (2x).' : 'For each enchanted attribute on your equipped gear, consumption is 10% faster. 10 attributes doubles the burn rate (2x).'}
            </p>
            <p>
              • <strong className="text-amber-300">{language === 'pt' ? 'Onde Comprar:' : 'Where to Buy:'}</strong> {language === 'pt' ? 'Disponível com Humphrey em Carlin ou com Eremo em Edron pelo custo de 200 gp × Level do seu personagem.' : 'Available from Humphrey in Carlin or Eremo in Edron for 200 gp × Character Level.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
