import React, { useState } from 'react';
import { CalculatedStats, simulateDamageTaken } from '../../utils/formulas';
import { cn } from '../../lib/utils';
import { VocationType } from '../../types/build';
import { 
  Shield, Sword, Heart, Zap, Weight, Move, Flame, Snowflake, 
  Sparkles, Activity, Award, HelpCircle, ArrowRight,
  Calculator, CheckCircle2, ChevronRight
} from 'lucide-react';
import { translations, Language } from '../../lib/translations';
import { Modal } from '../Modal';

interface StatsSidebarProps {
  title?: string;
  stats: CalculatedStats;
  compareStats?: CalculatedStats;
  showCompare: boolean;
  vocation: VocationType;
  language: Language;
}

export const StatsSidebar: React.FC<StatsSidebarProps> = ({
  title,
  stats,
  compareStats,
  showCompare,
  vocation,
  language
}) => {
  const t = (key: keyof typeof translations['pt']) => translations[language]?.[key] || key;
  const isPt = language === 'pt';

  // State for interactive incoming damage simulator
  const [simDamage, setSimDamage] = useState<number>(200);
  const [showFormulasModal, setShowFormulasModal] = useState<boolean>(false);

  const simulation = simulateDamageTaken(simDamage, stats);
  const compareSimulation = showCompare && compareStats ? simulateDamageTaken(simDamage, compareStats) : null;

  // Helper for difference badge in compare mode
  const renderDelta = (current: number, previous?: number, unit: string = '', inverse: boolean = false) => {
    if (!showCompare || previous === undefined) return null;
    const diff = current - previous;
    if (diff === 0) return null;

    const isPositive = inverse ? diff < 0 : diff > 0;
    return (
      <span className={cn(
        "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
        isPositive ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30" : "bg-red-950/80 text-red-400 border border-red-500/30"
      )}>
        {diff > 0 ? `+${diff.toFixed(1).replace('.0', '')}` : diff.toFixed(1).replace('.0', '')}{unit}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full bg-black/40 border border-medieval-gold/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md">
      
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-black/80 via-black/60 to-black/80 border-b border-medieval-gold/20 shrink-0">
        <div>
          <h2 className="text-sm sm:text-base font-black text-medieval-gold uppercase tracking-wider">
            {title || (isPt ? 'Estatísticas da Build' : 'Build Statistics')}
          </h2>
          <p className="text-[11px] text-stone-400 font-sans">
            {isPt ? 'Resultados consolidados de combate, sobrevivência e vitais.' : 'Consolidated combat, survival, and vital statistics.'}
          </p>
        </div>

        <button
          onClick={() => setShowFormulasModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-medieval-gold/10 hover:bg-medieval-gold/20 border border-medieval-gold/30 hover:border-medieval-gold/50 text-medieval-gold text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          title={isPt ? 'Ver Fórmulas Detalhadas (Modo Avançado)' : 'View Detailed Formulas (Advanced Mode)'}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isPt ? 'Fórmulas & Detalhes' : 'Formulas & Details'}</span>
          <span className="sm:hidden">{isPt ? 'Fórmulas' : 'Math'}</span>
        </button>
      </div>

      {/* Main Content Area: Clean Structured Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        
        {/* ROW 1: ATRIBUTOS VITAIS & PODER OFENSIVO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* CARD 1: VITAIS & REGEN */}
          <div className="bg-black/60 border border-medieval-gold/20 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-400" />
                {isPt ? 'Atributos Vitais' : 'Vital Attributes'}
              </span>
              <span className="text-[10px] font-mono text-stone-400">{vocation}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 flex flex-col justify-between">
                <span className="text-stone-400 text-[11px] flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-500" /> {isPt ? 'Vida (HP):' : 'Health (HP):'}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-base font-black font-mono text-red-400">{stats.hp}</span>
                  {renderDelta(stats.hp, compareStats?.hp)}
                </div>
              </div>

              <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 flex flex-col justify-between">
                <span className="text-stone-400 text-[11px] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-blue-400" /> {isPt ? 'Mana (MP):' : 'Mana (MP):'}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-base font-black font-mono text-blue-400">{stats.mp}</span>
                  {renderDelta(stats.mp, compareStats?.mp)}
                </div>
              </div>

              <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 flex flex-col justify-between">
                <span className="text-stone-400 text-[11px] flex items-center gap-1">
                  <Weight className="w-3 h-3 text-stone-300" /> {isPt ? 'Capacidade:' : 'Capacity:'}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-base font-black font-mono text-stone-200">{stats.cap} oz</span>
                  {renderDelta(stats.cap, compareStats?.cap, ' oz')}
                </div>
              </div>

              <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 flex flex-col justify-between">
                <span className="text-stone-400 text-[11px] flex items-center gap-1">
                  <Move className="w-3 h-3 text-emerald-400" /> {isPt ? 'Velocidade:' : 'Speed:'}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-base font-black font-mono text-emerald-300">{stats.speed}</span>
                  {renderDelta(stats.speed, compareStats?.speed)}
                </div>
              </div>
            </div>

            {/* Regen Summary */}
            <div className="flex items-center justify-between bg-black/50 p-2 rounded-lg border border-emerald-500/20 text-xs">
              <span className="text-[11px] text-stone-300 flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" /> {isPt ? 'Regeneração Total:' : 'Total Regen:'}
              </span>
              <div className="flex items-center gap-3 font-mono font-bold text-[11px]">
                <span className="text-red-400">+{stats.totalHpRegenPerSec.toFixed(2)} HP/s</span>
                <span className="text-blue-400">+{stats.totalMpRegenPerSec.toFixed(2)} MP/s</span>
              </div>
            </div>
          </div>

          {/* CARD 2: PODER OFENSIVO (ATAQUE) */}
          <div className="bg-black/60 border border-medieval-gold/20 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold flex items-center gap-1.5">
                <Sword className="w-3.5 h-3.5 text-amber-400" />
                {isPt ? 'Poder Ofensivo (Ataque)' : 'Offensive Combat (Attack)'}
              </span>
              <span className="text-[10px] font-mono text-medieval-gold/80 bg-medieval-gold/10 px-2 py-0.5 rounded border border-medieval-gold/20">
                Atk {stats.attack}
              </span>
            </div>

            {/* Main Damage Range */}
            <div className="bg-black/50 p-3 rounded-lg border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-300 font-bold">
                  {vocation === 'Paladin' ? (isPt ? 'Dano à Distância:' : 'Distance Damage:') : (isPt ? 'Dano Corpo-a-Corpo:' : 'Melee Damage:')}
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  {isPt ? 'Fórmula Oficial 7.4' : 'Official 7.4 Formula'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-black/60 p-2 rounded border border-white/5">
                  <span className="text-[9px] text-stone-400 uppercase block">{isPt ? 'Mínimo' : 'Min'}</span>
                  <span className="text-sm font-bold text-stone-300">
                    {vocation === 'Paladin' ? stats.minDist : stats.minMelee}
                  </span>
                </div>
                <div className="bg-black/60 p-2 rounded border border-medieval-gold/30">
                  <span className="text-[9px] text-medieval-gold uppercase block">{isPt ? 'Médio' : 'Avg'}</span>
                  <span className="text-base font-black text-medieval-gold">
                    {vocation === 'Paladin' ? stats.avgDist : stats.avgMelee}
                  </span>
                </div>
                <div className="bg-black/60 p-2 rounded border border-amber-500/40">
                  <span className="text-[9px] text-amber-400 uppercase block">{isPt ? 'Máximo' : 'Max'}</span>
                  <span className="text-base font-black text-amber-300">
                    {vocation === 'Paladin' ? stats.maxDist : stats.maxMelee}
                  </span>
                </div>
              </div>

              {showCompare && compareStats && (
                <div className="flex justify-between items-center text-[10px] pt-1 text-stone-400">
                  <span>{isPt ? 'Diferença vs Build 2:' : 'Diff vs Build 2:'}</span>
                  {renderDelta(
                    vocation === 'Paladin' ? stats.avgDist : stats.avgMelee,
                    vocation === 'Paladin' ? compareStats.avgDist : compareStats.avgMelee
                  )}
                </div>
              )}
            </div>

            {/* Special offensive modifiers */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/40 p-2 rounded border border-white/5 flex items-center justify-between">
                <span className="text-stone-400 text-[11px]">{isPt ? 'Golpe Crítico:' : 'Critical Hit:'}</span>
                <span className="font-mono font-bold text-yellow-300">
                  {stats.critChance > 0 ? `${stats.critChance}% (+${stats.critAmount})` : '0%'}
                </span>
              </div>

              <div className="bg-black/40 p-2 rounded border border-white/5 flex items-center justify-between">
                <span className="text-stone-400 text-[11px]">{isPt ? 'Life Leech:' : 'Life Leech:'}</span>
                <span className="font-mono font-bold text-red-400">
                  {stats.lifeLeechChance > 0 ? `${stats.lifeLeechChance}% (${stats.lifeLeechAmount}%)` : '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: SOBREVIVÊNCIA & DEFESA (FLUXO EXATO EM 3 PASSOS) */}
        <div className="bg-black/60 border border-medieval-gold/30 rounded-xl p-4 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-medieval-gold/20 pb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-sky-400" />
                {isPt ? 'Sobrevivência & Redução de Dano (Ordem de Resolução)' : 'Survival & Damage Reduction Pipeline'}
              </span>
              <p className="text-[11px] text-stone-400">
                {isPt ? 'A ordem exata em que o dano físico recebido é mitigado pelo seu personagem.' : 'Exact hierarchical sequence in which incoming physical damage is absorbed.'}
              </p>
            </div>
            <span className="text-[11px] font-mono text-sky-300 bg-sky-950/60 px-2 py-1 rounded border border-sky-500/30">
              Arm {stats.armor} | Def {stats.defense}
            </span>
          </div>

          {/* 3 Step Visual Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* PASSO 1: BLOQUEIO DO ESCUDO */}
            <div className="bg-black/50 p-3 rounded-lg border border-sky-500/30 flex flex-col justify-between space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-400 uppercase tracking-wide">
                  {isPt ? '1º Bloqueio do Escudo' : '1st Shield Block'}
                </span>
                <span className="text-[9px] font-mono text-stone-400 bg-black/60 px-1.5 py-0.5 rounded">
                  {stats.defenseSource}
                </span>
              </div>

              <p className="text-[11px] text-stone-300 leading-tight">
                {isPt 
                  ? `Redução bruta baseada em ${stats.defenseActiveSkill} (${stats.defenseSkillValue}) e Def ${stats.defense}.`
                  : `Flat reduction based on ${stats.defenseActiveSkill} (${stats.defenseSkillValue}) and Def ${stats.defense}.`}
              </p>

              <div className="bg-black/70 p-2 rounded border border-white/5 text-center font-mono">
                <span className="text-[9px] text-stone-400 uppercase block">{isPt ? 'Bloqueio Médio / Máx' : 'Avg / Max Block'}</span>
                <span className="text-base font-black text-sky-300">
                  -{stats.avgBlock} HP <span className="text-xs font-normal text-stone-400">(até -{stats.maxBlock})</span>
                </span>
              </div>
            </div>

            {/* PASSO 2: REDUÇÃO DA ARMADURA */}
            <div className="bg-black/50 p-3 rounded-lg border border-amber-500/30 flex flex-col justify-between space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wide">
                  {isPt ? '2º Redução da Armadura' : '2nd Armor Reduction'}
                </span>
                <span className="text-[9px] font-mono text-stone-400 bg-black/60 px-1.5 py-0.5 rounded">
                  Total Arm: {stats.armor}
                </span>
              </div>

              <p className="text-[11px] text-stone-300 leading-tight">
                {isPt 
                  ? `Fórmula: Min = Arm × 0.475 | Max = (Arm × 0.95) - 1`
                  : `Formula: Min = Arm × 0.475 | Max = (Arm × 0.95) - 1`}
              </p>

              <div className="bg-black/70 p-2 rounded border border-white/5 text-center font-mono">
                <span className="text-[9px] text-stone-400 uppercase block">{isPt ? 'Absorção Média da Armadura' : 'Average Armor Absorption'}</span>
                <span className="text-base font-black text-amber-300">
                  -{stats.avgReduction} HP <span className="text-xs font-normal text-stone-400">({stats.minReduction} a {stats.maxReduction})</span>
                </span>
              </div>
            </div>

            {/* PASSO 3: MITIGAÇÃO & PROTEÇÃO % */}
            <div className="bg-black/50 p-3 rounded-lg border border-emerald-500/30 flex flex-col justify-between space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wide">
                  {isPt ? '3º Proteções & Mitigação' : '3rd % Protections'}
                </span>
                <span className="text-[9px] font-mono text-stone-400 bg-black/60 px-1.5 py-0.5 rounded">
                  {isPt ? 'Percentual Residual' : 'Residual %'}
                </span>
              </div>

              <p className="text-[11px] text-stone-300 leading-tight">
                {isPt 
                  ? `Proteção Física: ${((stats.protections['physical'] || 0) * 100).toFixed(1)}% | Mitigação: ${stats.mitigation || 0}%`
                  : `Physical Prot: ${((stats.protections['physical'] || 0) * 100).toFixed(1)}% | Mitigation: ${stats.mitigation || 0}%`}
              </p>

              <div className="bg-black/70 p-2 rounded border border-white/5 text-center font-mono">
                <span className="text-[9px] text-stone-400 uppercase block">{isPt ? 'Redução Residual Total' : 'Total Residual Reduction'}</span>
                <span className="text-base font-black text-emerald-400">
                  -{simulation.totalPercentReduction}% {isPt ? 'do dano restante' : 'of leftover damage'}
                </span>
              </div>
            </div>
          </div>

          {/* SIMULADOR INTERATIVO DE DANO RECEBIDO */}
          <div className="bg-black/70 p-4 rounded-xl border border-medieval-gold/25 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-medieval-gold" />
                {isPt ? 'Simulador de Golpe Físico Recebido:' : 'Simulated Incoming Physical Hit:'}
              </span>

              {/* Preset buttons */}
              <div className="flex items-center gap-1.5">
                {[100, 200, 350, 500].map(val => (
                  <button
                    key={val}
                    onClick={() => setSimDamage(val)}
                    className={cn(
                      "px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all cursor-pointer border",
                      simDamage === val
                        ? "bg-medieval-gold text-black border-medieval-gold shadow"
                        : "bg-black/60 text-stone-300 border-white/10 hover:border-medieval-gold/40"
                    )}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Resolution Steps Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-center font-mono">
              <div className="bg-black/80 p-2 rounded border border-red-500/30">
                <span className="text-[9px] text-stone-400 block uppercase">{isPt ? 'Golpe Bruto' : 'Incoming'}</span>
                <span className="text-sm font-bold text-red-400">{simulation.incomingDamage} HP</span>
              </div>

              <div className="bg-black/80 p-2 rounded border border-sky-500/30">
                <span className="text-[9px] text-stone-400 block uppercase">{isPt ? '1º Bloqueado' : '1st Blocked'}</span>
                <span className="text-sm font-bold text-sky-300">-{simulation.blockedByShield} HP</span>
              </div>

              <div className="bg-black/80 p-2 rounded border border-amber-500/30">
                <span className="text-[9px] text-stone-400 block uppercase">{isPt ? '2º Armadura' : '2nd Armor'}</span>
                <span className="text-sm font-bold text-amber-300">-{simulation.reducedByArmor} HP</span>
              </div>

              <div className="bg-emerald-950/40 p-2 rounded border border-emerald-500/40 shadow-inner">
                <span className="text-[9px] text-emerald-400 block uppercase font-bold">{isPt ? 'Dano Real Sofrido' : 'Final Damage Taken'}</span>
                <span className="text-base font-black text-emerald-300">{simulation.finalDamageTaken} HP</span>
              </div>
            </div>
          </div>

          {/* Elemental Protections Pills */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              {isPt ? 'Resistências Elementais Ativas (%):' : 'Active Elemental Resistances (%):'}
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { key: 'fire', label: isPt ? 'Fogo' : 'Fire', icon: Flame, color: 'text-orange-400 border-orange-500/30 bg-orange-950/30' },
                { key: 'ice', label: isPt ? 'Gelo' : 'Ice', icon: Snowflake, color: 'text-sky-400 border-sky-500/30 bg-sky-950/30' },
                { key: 'energy', label: isPt ? 'Energia' : 'Energy', icon: Zap, color: 'text-yellow-400 border-yellow-500/30 bg-yellow-950/30' },
                { key: 'earth', label: isPt ? 'Terra' : 'Earth', icon: Shield, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30' },
                { key: 'physical', label: isPt ? 'Físico' : 'Physical', icon: Shield, color: 'text-stone-300 border-stone-500/30 bg-stone-900/30' },
              ].map(el => {
                const val = (stats.protections[el.key] || 0) * 100;
                return (
                  <div key={el.key} className={cn("px-2.5 py-1 rounded-md border flex items-center gap-1.5", el.color)}>
                    <el.icon className="w-3 h-3" />
                    <span>{el.label}:</span>
                    <span className="font-bold">{val > 0 ? `+${val.toFixed(1)}%` : '0%'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ROW 3: MAGIAS E RUNAS CALCULADAS */}
        {stats.runes.length > 0 && (
          <div className="bg-black/60 border border-medieval-gold/20 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                {isPt ? 'Magias & Runas Principais' : 'Key Spells & Runes'}
              </span>
              <span className="text-[10px] font-mono text-purple-300">
                Magic Level {stats.skillsBreakdown.magic.total}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {stats.runes.slice(0, 6).map((rune, idx) => (
                <div key={idx} className="bg-black/50 p-2.5 rounded-lg border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-200 truncate">{rune.name}</span>
                    <span className="text-[9px] font-mono text-stone-400 bg-black/60 px-1 py-0.5 rounded">
                      {rune.baseFormula}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-2 font-mono">
                    <span className="text-[10px] text-stone-400">{rune.min} - {rune.max}</span>
                    <span className="text-sm font-black text-medieval-gold">{rune.avg}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL DE FÓRMULAS & MODO AVANÇADO (PARA OS NERDS) */}
      <Modal
        isOpen={showFormulasModal}
        onClose={() => setShowFormulasModal(false)}
        title={isPt ? 'Fórmulas Oficiais & Auditoria Matemática' : 'Official Formulas & Math Audit'}
      >
        <div className="space-y-5 text-stone-300 text-xs sm:text-sm font-sans max-h-[75vh] overflow-y-auto pr-1">
          
          <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/30 space-y-2">
            <h4 className="font-bold text-medieval-gold uppercase tracking-wider text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              {isPt ? '1. Hierarquia de Dano Recebido' : '1. Incoming Damage Hierarchy'}
            </h4>
            <p className="leading-relaxed">
              {isPt 
                ? 'Em Miracle 7.4, todo ataque físico passa obrigatoriamente por 3 etapas consecutivas antes de subtrair a vida do seu personagem:'
                : 'In Miracle 7.4, every physical attack strictly traverses 3 sequential reduction phases:'}
            </p>
            <ol className="list-decimal list-inside space-y-1.5 pl-2 font-mono text-xs text-stone-200">
              <li><strong>1º Bloqueio do Escudo:</strong> Reduz o ataque bruto com base no Defense do escudo, skill de Shielding e Stance.</li>
              <li><strong>2º Redução da Armadura:</strong> O restante sofre redução de absorção da armadura total equipada.</li>
              <li><strong>3º Mitigações & Proteções:</strong> Resistências percentuais (% físico de itens, relíquias e bênçãos) aplicadas sobre o valor residual.</li>
            </ol>
          </div>

          <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/30 space-y-2">
            <h4 className="font-bold text-medieval-gold uppercase tracking-wider text-sm flex items-center gap-2">
              <Sword className="w-4 h-4 text-amber-400" />
              {isPt ? '2. Fórmulas de Ataque e Bloqueio de Defesa' : '2. Attack & Defense Block Formulas'}
            </h4>
            <div className="bg-black/80 p-3 rounded font-mono text-xs text-yellow-300/90 space-y-2 border border-white/5">
              <p><strong>Ataque Físico:</strong> MaxHit = Math.floor(((5 × Skill + 50) × Atk × Stance × 0.0099) × 1.1)</p>
              <p><strong>Bloqueio de Defesa:</strong> MaxBlock = Math.floor(((5 × Skill + 50) × Def × Stance × 0.0099) × 1.1)</p>
              <p className="text-stone-400 text-[11px] pt-1 border-t border-white/5">
                *Multiplicadores de Postura (Stance): Full Attack (1.2 Atk / 0.6 Def) | Balanced (1.0 Atk / 1.0 Def) | Full Defense (0.6 Atk / 1.8 Def).
              </p>
            </div>
          </div>

          <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/30 space-y-2">
            <h4 className="font-bold text-medieval-gold uppercase tracking-wider text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              {isPt ? '3. Fórmulas Oficiais da Armadura (Armor)' : '3. Official Armor Formulas'}
            </h4>
            <div className="bg-black/80 p-3 rounded font-mono text-xs text-yellow-300/90 space-y-1.5 border border-white/5">
              <p><strong>Redução Mínima:</strong> MinRed = Math.floor(TotalArmor × 0.475)</p>
              <p><strong>Redução Máxima:</strong> MaxRed = Math.floor((TotalArmor × 0.95) - 1)</p>
              <p><strong>Redução Média:</strong> AvgRed = Math.floor((MinRed + MaxRed) / 2)</p>
            </div>
          </div>

          <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/30 space-y-2">
            <h4 className="font-bold text-medieval-gold uppercase tracking-wider text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              {isPt ? '4. Fórmulas de Magias e Runas' : '4. Spells & Runes Formulas'}
            </h4>
            <div className="bg-black/80 p-3 rounded font-mono text-xs text-yellow-300/90 space-y-1.5 border border-white/5">
              <p><strong>Base Padrão:</strong> Base = (2 × Level) + (3 × MagicLevel)</p>
              <p><strong>Ultimate Healing (UH):</strong> Base × 2.50 (Cura fixa)</p>
              <p><strong>Sudden Death (SD):</strong> Min = Base × 1.39 | Max = Base × 1.55</p>
              <p><strong>Explosion (Físico):</strong> Min = Base × 0.20 | Max = Base × 1.00</p>
            </div>
          </div>

        </div>
      </Modal>

    </div>
  );
};
