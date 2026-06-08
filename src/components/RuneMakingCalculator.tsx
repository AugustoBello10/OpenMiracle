import React, { useState, useMemo, useEffect, useRef } from "react";
import { Clock, Calculator, Zap, Shield, FlaskConical, Bed, Volume2, VolumeX, Play, Square, Bell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Using known data
const VOC_SPELLS: Record<string, { name: string; mana: number }[]> = {
  Sorcerer: [
    { name: "Heavy Magic Missile (HMM) - 70 mp", mana: 70 },
    { name: "Great Fireball (GFB) - 120 mp", mana: 120 },
    { name: "Sudden Death (SD) - 220 mp", mana: 220 },
  ],
  Druid: [
    { name: "Intense Healing (IH) - 60 mp", mana: 60 },
    { name: "Heavy Magic Missile (HMM) - 70 mp", mana: 70 },
    { name: "Ultimate Healing (UH) - 100 mp", mana: 100 },
    { name: "Envenom (Poison Bomb) - 100 mp", mana: 100 },
  ],
  Paladin: [{ name: "Heavy Magic Missile (HMM) - 70 mp", mana: 70 }],
};

const MANA_REGEN_TIME_PER_MP: Record<
  string,
  { normal: number; promoted: number }
> = {
  Sorcerer: { normal: 6, promoted: 4 },
  Druid: { normal: 6, promoted: 4 },
  Paladin: { normal: 8, promoted: 6 },
};

const RINGS = [
  { name: "Nenhum", mps: 0, durationSecs: null },
  { name: "Life Ring (20m)", mps: 1 / 3, durationSecs: 20 * 60 },
  { name: "Ring of Healing (7.5m)", mps: 1, durationSecs: 7.5 * 60 },
];

const RELICS = [
  { name: "Nenhuma", mps: 0, durationSecs: null },
  { name: "Ancestral / Cobra / Eternal (Infinito)", mps: 1 / 36, durationSecs: null },
  { name: "Giant Sapphire (1h 30m)", mps: 1 / 3, durationSecs: 90 * 60 },
];

const FORJA_TIERS = [
  { name: "Nenhuma", mps: 0 },
  { name: "Tier 1 (+1 mp/24s)", mps: 1 / 24 },
  { name: "Tier 2 (+1 mp/22s)", mps: 1 / 22 },
  { name: "Tier 3 (+1 mp/20s)", mps: 1 / 20 },
  { name: "Tier 4 (+1 mp/18s)", mps: 1 / 18 },
  { name: "Tier 5 (+1 mp/16s)", mps: 1 / 16 },
];

const playBeep = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch(e) {
    console.error('Audio beep failed', e);
  }
};

export const RuneMakingCalculator = ({ t, language }: any) => {
  const [calcMode, setCalcMode] = useState<'online' | 'offline'>('online');
  const [vocation, setVocation] = useState<"Sorcerer" | "Druid" | "Paladin">("Sorcerer");
  const [isPromoted, setIsPromoted] = useState(true);
  const [selectedRune, setSelectedRune] = useState<number>(VOC_SPELLS["Sorcerer"][2].mana);
  
  // Timer & Duration settings
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  // Timer states
  const [timerDurationMinutes, setTimerDurationMinutes] = useState(200); // default 200m
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(200 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [selectedRing, setSelectedRing] = useState(0);
  const [ringAmount, setRingAmount] = useState(1);
  const [selectedRelic, setSelectedRelic] = useState(0);
  const [relicAmount, setRelicAmount] = useState(1);

  // Forjas
  const [forja1, setForja1] = useState(0);
  const [forja2, setForja2] = useState(0);
  const [forja3, setForja3] = useState(0);
  const [forja4, setForja4] = useState(0);

  // Update selected rune if vocation changes to keep it valid
  useEffect(() => {
    const defaultMana = VOC_SPELLS[vocation]?.[0]?.mana || 100;
    setSelectedRune(defaultMana);
  }, [vocation]);

  const [timerEndTime, setTimerEndTime] = useState<number | null>(null);

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerEndTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const left = Math.max(0, Math.floor((timerEndTime - now) / 1000));
        setTimerSecondsLeft(left);
        
        if (left <= 0) {
          setIsTimerRunning(false);
          setTimerEndTime(null);
          if (soundEnabled) {
            playBeep();
            setTimeout(playBeep, 500);
            setTimeout(playBeep, 1000);
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Bedmaker Finalizado!", {
                body: "Seus 200 minutos (máximos) de descanso terminaram. Logue para comer novamente e gastar as manas!",
              });
            }
          }
        }
      }, 1000); // Update roughly every second
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerEndTime, soundEnabled]);

  const handleStartStopTimer = async () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      setTimerEndTime(null);
    } else {
      let seconds = timerSecondsLeft;
      if (seconds <= 0) {
        seconds = timerDurationMinutes * 60;
        setTimerSecondsLeft(seconds);
      }
      
      if (soundEnabled && "Notification" in window && Notification.permission !== "granted") {
        await Notification.requestPermission();
      }
      
      setTimerEndTime(Date.now() + seconds * 1000);
      setIsTimerRunning(true);
    }
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerEndTime(null);
    setTimerSecondsLeft(timerDurationMinutes * 60);
  };

  const formatTimerClock = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalTimeSeconds = calcMode === 'online' 
    ? (hours * 3600 + minutes * 60) 
    : (timerDurationMinutes * 60);

  const baseMps = calcMode === 'online'
    ? (isPromoted
        ? 1 / MANA_REGEN_TIME_PER_MP[vocation].promoted
        : 1 / MANA_REGEN_TIME_PER_MP[vocation].normal)
    : (1 / 60); // Bedmaker is 1 mp/min

  const ringDur = RINGS[selectedRing].durationSecs;
  const ringMps = calcMode === 'online' ? RINGS[selectedRing].mps : 0;
  const effectiveRingTime = ringDur && calcMode === 'online' 
    ? Math.min(ringDur * ringAmount, totalTimeSeconds) 
    : totalTimeSeconds;

  const relicDur = RELICS[selectedRelic].durationSecs;
  const relicMps = calcMode === 'online' ? RELICS[selectedRelic].mps : 0;
  const effectiveRelicTime = relicDur && calcMode === 'online' 
    ? Math.min(relicDur * relicAmount, totalTimeSeconds) 
    : totalTimeSeconds;

  const forjaMps = calcMode === 'online' 
    ? (FORJA_TIERS[forja1].mps +
       FORJA_TIERS[forja2].mps +
       FORJA_TIERS[forja3].mps +
       FORJA_TIERS[forja4].mps)
    : 0;

  const baseMana = baseMps * totalTimeSeconds;
  const forjaMana = forjaMps * totalTimeSeconds;
  const ringMana = calcMode === 'online' ? ringMps * effectiveRingTime : 0;
  const relicMana = calcMode === 'online' ? relicMps * effectiveRelicTime : 0;

  const generatedMana = Math.floor(baseMana + forjaMana + ringMana + relicMana);
  const runesAmount = selectedRune > 0 ? Math.floor(generatedMana / selectedRune) : 0;

  const avgMps = totalTimeSeconds > 0 ? generatedMana / totalTimeSeconds : 0;

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
          <FlaskConical className="w-8 h-8 text-medieval-gold opacity-80" />
          {language === "pt" ? "Fabricação de Runas" : "Rune Making"}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          {language === "pt"
            ? "Calcule a regeneração e custo da criação de runas. Alterne para o modo Bedmaker para planejar treinos AFK (Offline)."
            : "Calculate regeneration and rune creation costs. Switch to Bedmaker mode to plan AFK (Offline) training."}
        </p>
      </header>

      {/* Mode Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-black/60 p-1.5 rounded-lg border border-medieval-gold/20 flex shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => setCalcMode('online')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded text-xs font-black uppercase tracking-widest transition-all ${calcMode === 'online' ? 'bg-medieval-gold text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'text-medieval-gold/40 hover:text-medieval-gold/80'}`}
          >
            <Zap className="w-4 h-4" /> {language === 'pt' ? 'Online (Ativo)' : 'Online (Active)'}
          </button>
          <button
            onClick={() => setCalcMode('offline')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded text-xs font-black uppercase tracking-widest transition-all ${calcMode === 'offline' ? 'bg-medieval-gold text-black shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'text-medieval-gold/40 hover:text-medieval-gold/80'}`}
          >
            <Bed className="w-4 h-4" /> {language === 'pt' ? 'Bedmaker (Offline)' : 'Bedmaker (Offline)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg space-y-6">
            
            {/* Vocation & Promoted */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" /> Vocação
                </label>
                <select
                  value={vocation}
                  onChange={(e) => setVocation(e.target.value as any)}
                  className="medieval-input bg-black/60 border border-medieval-gold/20 flex items-center px-3 h-[42px] text-xs font-bold uppercase tracking-wider text-medieval-gold cursor-pointer"
                >
                  <option value="Sorcerer">Sorcerer</option>
                  <option value="Druid">Druid</option>
                  <option value="Paladin">Paladin</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> Promotion
                </label>
                <div className="flex gap-2">
                  <button
                    disabled={calcMode === 'offline'}
                    onClick={() => setIsPromoted(true)}
                    className={`flex-1 p-2 rounded text-xs font-bold uppercase tracking-wider transition-all h-[42px] flex items-center justify-center ${isPromoted ? "bg-medieval-gold text-black shadow-[0_0_10px_rgba(197,160,89,0.3)] disabled:opacity-50" : "bg-black/40 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50"}`}
                  >
                    Promovido
                  </button>
                  <button
                    disabled={calcMode === 'offline'}
                    onClick={() => setIsPromoted(false)}
                    className={`flex-1 p-2 rounded text-xs font-bold uppercase tracking-wider transition-all h-[42px] flex items-center justify-center ${!isPromoted ? "bg-medieval-gold text-black shadow-[0_0_10px_rgba(197,160,89,0.3)] disabled:opacity-50" : "bg-black/40 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50"}`}
                  >
                    Normal
                  </button>
                </div>
              </div>
            </div>

            {/* Rune Selection & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-medieval-gold/10">
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <FlaskConical className="w-3.5 h-3.5" /> Runa a fabricar
                </label>
                <select
                  value={selectedRune}
                  onChange={(e) => setSelectedRune(Number(e.target.value))}
                  className="medieval-input bg-black/60 border border-medieval-gold/20 flex items-center px-3 h-[42px] text-xs uppercase tracking-wider text-medieval-gold cursor-pointer w-full truncate"
                >
                  {VOC_SPELLS[vocation]?.map((s) => (
                    <option key={s.name} value={s.mana}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> {calcMode === 'online' ? 'Tempo Gastando Mana' : 'Tempo de Cama (Max 200m)'}
                </label>
                
                {calcMode === 'online' ? (
                  <div className="flex gap-2 h-[42px]">
                    <div className="flex bg-black/40 border border-medieval-gold/20 rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors w-1/2">
                      <input
                        type="number"
                        min="0"
                        value={hours}
                        onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                      />
                      <div className="px-2 py-2 bg-medieval-gold/10 text-medieval-gold text-xs font-bold border-l border-medieval-gold/20 flex items-center">h</div>
                    </div>
                    <div className="flex bg-black/40 border border-medieval-gold/20 rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors w-1/2">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={minutes}
                        onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                        className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                      />
                      <div className="px-2 py-2 bg-medieval-gold/10 text-medieval-gold text-xs font-bold border-l border-medieval-gold/20 flex items-center">m</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 h-[42px]">
                    <div className="flex bg-black/40 border border-medieval-gold/20 rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors w-full">
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={timerDurationMinutes}
                        onChange={(e) => {
                          const val = Math.max(1, Math.min(200, parseInt(e.target.value) || 0));
                          setTimerDurationMinutes(val);
                          if (!isTimerRunning) setTimerSecondsLeft(val * 60);
                        }}
                        className="w-full bg-transparent px-3 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                      />
                      <div className="px-3 py-2 bg-medieval-gold/10 text-medieval-gold text-xs font-bold border-l border-medieval-gold/20 flex items-center">minutos</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Offline Timer Controls */}
            {calcMode === 'offline' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-medieval-gold/20"
              >
                <div className="bg-black/50 border border-medieval-gold/20 rounded-lg p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-medieval-gold font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <Bell className="w-4 h-4" /> Alarme de Login (Bedmaker)
                      </h3>
                      <p className="text-medieval-gold/50 text-[10px] mt-1 pr-4 max-w-sm">
                        O regen offline produz 1 mana por minuto e dura até no máximo tempo de food logado (200 min = 200 mana). Ative o timer para ser avisado a logar, comer e gastar a mana.
                      </p>
                    </div>
                    <button 
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`p-2 rounded-full border transition-all ${soundEnabled ? 'border-medieval-gold text-medieval-gold bg-medieval-gold/10' : 'border-medieval-gold/30 text-medieval-gold/30 hover:border-medieval-gold/50'}`}
                      title="Ativar/Desativar Som"
                    >
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex items-center justify-between">
                      <div className="text-4xl font-mono font-black text-medieval-gold tracking-tight drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                        {formatTimerClock(timerSecondsLeft)}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleStartStopTimer}
                          className={`flex items-center gap-2 px-4 py-2 ${isTimerRunning ? 'bg-red-900/40 hover:bg-red-900/60 text-red-400 border border-red-500/30' : 'bg-green-900/40 hover:bg-green-900/60 text-green-400 border border-green-500/30'} rounded text-xs font-bold uppercase tracking-wider transition-all`}
                        >
                          {isTimerRunning ? <><Square className="w-3.5 h-3.5" /> Parar</> : <><Play className="w-3.5 h-3.5" /> Iniciar</>}
                        </button>
                        <button 
                          onClick={handleResetTimer}
                          className="px-4 py-2 bg-black/40 hover:bg-black/60 text-medieval-gold/70 border border-medieval-gold/20 hover:border-medieval-gold/40 rounded text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          Resetar
                        </button>
                      </div>
                    </div>
                    
                    {/* Barra de Progresso */}
                    <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-medieval-gold/10">
                      <div 
                        className="h-full bg-medieval-gold transition-all duration-1000 ease-linear shadow-[0_0_5px_rgba(212,175,55,0.5)]"
                        style={{ width: `${(timerSecondsLeft / (timerDurationMinutes * 60)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Equipments Extra Regen (ONLY Online) */}
            {calcMode === 'online' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-4 border-t border-medieval-gold/10 space-y-4"
              >
                <h3 className="text-medieval-gold font-black uppercase text-[10px] tracking-widest mb-2 flex items-center gap-2">
                  <Calculator className="w-4 h-4" /> Bônus de Regeneração de Mana
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end">
                      <label className="text-medieval-gold/70 font-bold uppercase text-[9px] tracking-wider">
                        Anel Equipada (Ring)
                      </label>
                      {RINGS[selectedRing].durationSecs && (
                        <span className="text-[9px] text-medieval-gold/50">
                          {language === 'pt' ? 'Necessários: ' : 'Needed: '}
                          {Math.ceil(totalTimeSeconds / RINGS[selectedRing].durationSecs!)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={selectedRing}
                        onChange={(e) => setSelectedRing(Number(e.target.value))}
                        className="medieval-input h-[42px] px-3 flex-1 text-xs text-medieval-gold/80 bg-black/60 outline-none truncate"
                      >
                        {RINGS.map((r, i) => (
                          <option key={i} value={i}>{r.name}</option>
                        ))}
                      </select>
                      {RINGS[selectedRing].durationSecs && (
                        <div className="flex bg-black/40 border border-medieval-gold/20 rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors w-20">
                          <input
                            type="number"
                            min="1"
                            value={ringAmount}
                            onChange={(e) => setRingAmount(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full bg-transparent px-2 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                            title="Quantidade de Anéis que possui"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end">
                      <label className="text-medieval-gold/70 font-bold uppercase text-[9px] tracking-wider">
                        Relíquia Equipada (Relic)
                      </label>
                      {RELICS[selectedRelic].durationSecs && (
                        <span className="text-[9px] text-medieval-gold/50">
                          {language === 'pt' ? 'Necessários: ' : 'Needed: '}
                          {Math.ceil(totalTimeSeconds / RELICS[selectedRelic].durationSecs!)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={selectedRelic}
                        onChange={(e) => setSelectedRelic(Number(e.target.value))}
                        className="medieval-input h-[42px] px-3 flex-1 text-xs text-medieval-gold/80 bg-black/60 outline-none truncate"
                      >
                        {RELICS.map((r, i) => (
                          <option key={i} value={i}>{r.name}</option>
                        ))}
                      </select>
                      {RELICS[selectedRelic].durationSecs && (
                        <div className="flex bg-black/40 border border-medieval-gold/20 rounded-sm overflow-hidden focus-within:border-medieval-gold/60 transition-colors w-20">
                          <input
                            type="number"
                            min="1"
                            value={relicAmount}
                            onChange={(e) => setRelicAmount(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full bg-transparent px-2 py-2 text-sm text-medieval-gold font-bold text-center outline-none"
                            title="Quantidade de Relíquias que possui"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-medieval-gold/70 font-bold uppercase text-[9px] tracking-wider block mb-1.5">
                    Equipamentos Forjados (Atributo Regen. Mana)
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <select value={forja1} onChange={(e) => setForja1(Number(e.target.value))} className="medieval-input h-[42px] px-2 text-[10px] sm:text-xs text-medieval-gold/80 bg-black/60 outline-none">
                      {FORJA_TIERS.map((f, i) => <option key={i} value={i}>{i === 0 ? "Vazio" : `Slot 1: ${f.name}`}</option>)}
                    </select>
                    <select value={forja2} onChange={(e) => setForja2(Number(e.target.value))} className="medieval-input h-[42px] px-2 text-[10px] sm:text-xs text-medieval-gold/80 bg-black/60 outline-none">
                      {FORJA_TIERS.map((f, i) => <option key={i} value={i}>{i === 0 ? "Vazio" : `Slot 2: ${f.name}`}</option>)}
                    </select>
                    <select value={forja3} onChange={(e) => setForja3(Number(e.target.value))} className="medieval-input h-[42px] px-2 text-[10px] sm:text-xs text-medieval-gold/80 bg-black/60 outline-none">
                      {FORJA_TIERS.map((f, i) => <option key={i} value={i}>{i === 0 ? "Vazio" : `Slot 3: ${f.name}`}</option>)}
                    </select>
                    <select value={forja4} onChange={(e) => setForja4(Number(e.target.value))} className="medieval-input h-[42px] px-2 text-[10px] sm:text-xs text-medieval-gold/80 bg-black/60 outline-none">
                      {FORJA_TIERS.map((f, i) => <option key={i} value={i}>{i === 0 ? "Vazio" : `Slot 4: ${f.name}`}</option>)}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-24">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-b from-black/80 to-medieval-dark border border-medieval-gold/30 rounded-xl p-8 relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-medieval-gold/[0.02] group-hover:bg-medieval-gold/[0.04] transition-colors"></div>

              <h2 className="text-xl font-black text-medieval-gold uppercase tracking-tighter border-b border-medieval-gold/10 pb-4 mb-6 flex justify-between items-end">
                <span>{language === "pt" ? "Resultado" : "Result"}</span>
                {calcMode === 'offline' && <span className="text-[10px] bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-500/20 font-sans tracking-widest">+ DEBUFF OFFLINE</span>}
              </h2>

              <div className="space-y-6 relative z-10">
                <div className="bg-black/40 border border-medieval-gold/10 rounded-lg p-5">
                  <div className="text-[10px] text-medieval-gold/40 uppercase tracking-widest mb-1">
                    Mana Total Gerada
                  </div>
                  <div className="text-3xl font-black text-[#5ba2ff] drop-shadow-[0_0_8px_rgba(91,162,255,0.4)]">
                    {generatedMana.toLocaleString()}{" "}
                    <span className="text-sm font-bold text-[#5ba2ff]/60">
                      MP
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-medieval-muted">
                    <span>
                      Regen {calcMode === 'online' ? 'Média' : 'Configurada'}: <span className="text-medieval-gold/80">{avgMps.toFixed(3)} MP/s</span>
                    </span>
                    {calcMode === 'offline' && (
                      <span className="text-medieval-gold/40">1 MP / Minuto</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-medieval-gold/10 rounded-lg p-4 text-center">
                    <div className="text-[10px] text-medieval-gold/40 uppercase tracking-widest mb-1 leading-tight flex justify-center items-center gap-1">
                      <FlaskConical className="w-3 h-3 text-medieval-gold" />{" "}
                      Runas (Cargas)
                    </div>
                    <div className="text-2xl font-black text-medieval-gold">
                      {runesAmount.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-black/40 border border-medieval-gold/10 rounded-lg p-4 text-center relative overflow-hidden">
                    <div className="text-[10px] text-medieval-gold/40 uppercase tracking-widest mb-1 leading-tight">
                      Custo (Blank Runes)
                    </div>
                    <div className="text-xl font-black text-yellow-500">
                      {(runesAmount * 10).toLocaleString()}{" "}
                      <span className="text-[10px] text-yellow-500/70">gp</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

