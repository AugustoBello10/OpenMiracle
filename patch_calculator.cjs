const fs = require('fs');

let code = `import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Info, Check, Coins, Sparkles } from 'lucide-react';
import { calculateTrainingTime, Vocation, SkillType, TRAINING_WEAPONS_DATA, TrainingWeapon } from '../lib/formulas';
import { VOC_SPELLS } from '../data/constants';

const MANA_REGEN_TIME_PER_MP: Record<string, { normal: number; promoted: number }> = {
  Sorcerer: { normal: 6, promoted: 4 },
  Druid: { normal: 6, promoted: 4 },
  Paladin: { normal: 8, promoted: 6 },
  Knight: { normal: 12, promoted: 12 } 
};

export default function SkillCalculator({ 
  vocation, setVocation, 
  skillType, setSkillType, 
  currentSkill, setCurrentSkill, 
  targetSkill, setTargetSkill, 
  skillPercentage, setSkillPercentage,
  t 
}: any) {
  const [weaponType, setWeaponType] = useState<'normal' | 'training'>('normal');
  const [weaponReduction, setWeaponReduction] = useState<number>(0);
  const [equipReductions, setEquipReductions] = useState<number[]>([0, 0, 0]);
  const [isPromoted, setIsPromoted] = useState<boolean>(true);
  const [selectedSpell, setSelectedSpell] = useState<string>('');
  
  const [prices, setPrices] = useState({ spark: '', lightning: '', inferno: '' });

  const weaponCategory = useMemo(() => {
    if (skillType === 'Magic Level') return 'Magic';
    if (skillType === 'Shielding') return 'Shielding';
    return 'Melee/Distance';
  }, [skillType]);

  const weapons = useMemo(() => TRAINING_WEAPONS_DATA[weaponCategory], [weaponCategory]);

  useEffect(() => {
    const list = VOC_SPELLS[vocation] || [];
    if (list.length > 0) {
      setSelectedSpell(list[0].name);
    }
  }, [vocation]);

  const baselineResult = useMemo(() => {
    return calculateTrainingTime(vocation, skillType, currentSkill, targetSkill, skillPercentage, []);
  }, [vocation, skillType, currentSkill, targetSkill, skillPercentage]);

  const pointsNeeded = baselineResult.points;

  const fillSuggestedPrices = () => {
    setPrices({ spark: '50000', lightning: '150000', inferno: '350000' });
  };

  const combos = useMemo(() => {
    if (weaponType !== 'training') return { cheapest: null, fastest: null };

    const sparkCost = Number(prices.spark);
    const lightningCost = Number(prices.lightning);
    const infernoCost = Number(prices.inferno);

    if (!(sparkCost > 0 || lightningCost > 0 || infernoCost > 0)) return { cheapest: null, fastest: null };

    const s = weapons.find(w => w.name === 'Spark');
    const l = weapons.find(w => w.name === 'Lightning');
    const i = weapons.find(w => w.name === 'Inferno');

    if (!s || !l || !i) return { cheapest: null, fastest: null };

    const items = [
      { name: 'Spark', cost: sparkCost > 0 ? sparkCost : Infinity, size: s.charges, weapon: s, red: s.reduction },
      { name: 'Lightning', cost: lightningCost > 0 ? lightningCost : Infinity, size: l.charges, weapon: l, red: l.reduction },
      { name: 'Inferno', cost: infernoCost > 0 ? infernoCost : Infinity, size: i.charges, weapon: i, red: i.reduction }
    ].filter(item => item.cost !== Infinity);

    if (items.length === 0 || pointsNeeded <= 0) return { cheapest: null, fastest: null };

    const gcd = 1800; 
    const MAX_UNITS = Math.ceil(pointsNeeded / gcd);
    if (MAX_UNITS === 0) return { cheapest: null, fastest: null };

    const dpCost = new Array(MAX_UNITS + 20).fill(Infinity);
    const choiceCost = new Array(MAX_UNITS + 20).fill(null);
    dpCost[0] = 0;

    for (let u = 0; u < MAX_UNITS; u++) {
      if (dpCost[u] === Infinity) continue;
      for (const item of items) {
        const nextU = u + (item.size / gcd);
        if (nextU < dpCost.length) {
          if (dpCost[u] + item.cost < dpCost[nextU]) {
            dpCost[nextU] = dpCost[u] + item.cost;
            choiceCost[nextU] = { prev: u, item };
          }
        }
      }
    }

    let minCost = Infinity;
    let bestEndCost = -1;
    for (let u = MAX_UNITS; u < dpCost.length; u++) {
       if (dpCost[u] < minCost) {
          minCost = dpCost[u];
          bestEndCost = u;
       }
    }

    let cheapest = null;
    if (minCost !== Infinity) {
      cheapest = { Spark: 0, Lightning: 0, Inferno: 0, cost: minCost, weapons: items.map(i => i.weapon) };
      let curr = bestEndCost;
      while (curr > 0) {
         const step = choiceCost[curr];
         if (!step) break;
         cheapest[step.item.name as keyof typeof cheapest]++;
         curr = step.prev;
      }
    }

    const fastestItem = [...items].sort((a, b) => b.red - a.red)[0];
    let fastest = null;
    if (fastestItem) {
      const count = Math.ceil(pointsNeeded / fastestItem.size);
      fastest = { Spark: 0, Lightning: 0, Inferno: 0, cost: count * fastestItem.cost, weapons: [fastestItem.weapon] };
      fastest[fastestItem.name as keyof typeof fastest] = count;
    }
    
    return { cheapest, fastest };
  }, [weaponType, prices, weapons, pointsNeeded]);

  const getComboStats = (combo: any) => {
      if (!combo) return { time: 0, cost: 0 };
      const equipMultiplier = equipReductions.filter(r => r > 0).reduce((acc, red) => acc * (1 - red / 100), 1);
      
      let pointsLeft = pointsNeeded;
      let totalSeconds = 0;
      
      const orderedTypes = ['Inferno', 'Lightning', 'Spark'];
      
      for (const t of orderedTypes) {
        const count = combo[t];
        if (count > 0) {
          const w = combo.weapons.find((x: any) => x.name === t);
          if (w) {
            const multiplier = (1 - w.reduction / 100) * equipMultiplier;
            const finalInterval = 2000 * multiplier;
            
            const totalWeaponCharges = w.charges * count;
            const chargesUsed = Math.min(totalWeaponCharges, pointsLeft);
            
            if (chargesUsed > 0) {
              if (skillType === 'Magic Level') {
                 totalSeconds += chargesUsed * multiplier; 
              } else {
                 const effectivePoints = skillType === 'Shielding' ? chargesUsed / 2 : chargesUsed;
                 totalSeconds += effectivePoints * (finalInterval / 1000);
              }
              pointsLeft -= chargesUsed;
            }
          }
        }
      }
      return { time: totalSeconds, cost: combo.cost };
  };

  const finalResult = useMemo(() => {
    if (weaponType === 'normal') {
      const reductions = [weaponReduction, ...equipReductions.filter(r => r > 0)].filter(r => r > 0);
      return calculateTrainingTime(vocation, skillType, currentSkill, targetSkill, skillPercentage, reductions);
    } else {
      return {
        points: pointsNeeded,
        seconds: 0,
        interval: 2000
      };
    }
  }, [weaponType, vocation, skillType, currentSkill, targetSkill, skillPercentage, weaponReduction, equipReductions, pointsNeeded]);

  const secondsPerMana = useMemo(() => {
    const regen = MANA_REGEN_TIME_PER_MP[vocation] || { normal: 6, promoted: 4 };
    return isPromoted ? regen.promoted : regen.normal;
  }, [vocation, isPromoted]);

  const foodRegenSeconds = finalResult.points * secondsPerMana;

  const spellsList = VOC_SPELLS[vocation] || [];
  const currentSpellObject = spellsList.find(s => s.name === selectedSpell) || spellsList[0];
  const spellCost = currentSpellObject ? currentSpellObject.mana : 40;
  const spellCount = Math.floor(finalResult.points / spellCost);

  const formatTime = (seconds: number) => {
    if (!seconds) return '0s';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    let str = "";
    if (hours > 0) str += \`\${hours}h \`;
    if (minutes > 0) str += \`\${minutes}m \`;
    str += \`\${remainingSeconds}s\`;
    return str;
  };

  const formatDaysTime = (seconds: number) => {
    if (!seconds) return null;
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (d === 0) return null;
    return \`\${d} \${t('days')}, \${h} \${t('hours')} \${t('and')} \${m} \${t('minutes')}\`;
  };

  const formatMLTime = (secondsOfRegen: number) => {
    if (!secondsOfRegen) return '0 segundos';
    const days = Math.floor(secondsOfRegen / 86400);
    const hours = Math.floor((secondsOfRegen % 86400) / 3600);
    const minutes = Math.floor((secondsOfRegen % 3600) / 60);
    const secs = Math.floor(secondsOfRegen % 60);
    const parts: string[] = [];
    if (days > 0) parts.push(\`\${days} \${days === 1 ? 'dia' : 'dias'}\`);
    if (hours > 0) parts.push(\`\${hours} \${hours === 1 ? 'hora' : 'horas'}\`);
    if (minutes > 0) parts.push(\`\${minutes} \${minutes === 1 ? 'minuto' : 'minutos'}\`);
    if (secs > 0 || parts.length === 0) parts.push(\`\${secs} \${secs === 1 ? 'segundo' : 'segundos'}\`);
    return parts.join(', ');
  };

  const handleEquipReductionChange = (index: number, value: number) => {
    const newReds = [...equipReductions];
    newReds[index] = value;
    setEquipReductions(newReds);
  };

  const getWeaponImage = (w: string) => {
    const name = w.toLowerCase();
    if (skillType === 'Magic Level') {
      if (name === 'spark') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Spark_Training_wand.gif';
      if (name === 'lightning') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Lightining_training_wand.gif';
      if (name === 'inferno') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Inferno_training_wand.gif';
    } else if (skillType === 'Distance') {
      if (name === 'spark') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Spark_Training_spear.gif';
      if (name === 'lightning') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Lightning_Training_spear.gif';
      if (name === 'inferno') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Inferno_training_spear.gif';
    } else if (skillType === 'Shielding') {
      if (name === 'spark') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Spark_Training_shield.gif';
      if (name === 'lightning') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Lightning_Training_shield.gif';
      if (name === 'inferno') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Inferno_training_shield.gif';
    } else {
      if (name === 'spark') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Spark_Training_Sword.gif';
      if (name === 'lightning') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Lightning_Training_Club.gif';
      if (name === 'inferno') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Inferno_training_axe.gif';
    }
    return '';
  };

  const formatGoldToK = (gold: number) => {
    if (gold >= 1000000) {
      return \`\${(gold / 1000000).toFixed(1).replace('.0', '')}kk\`;
    }
    if (gold >= 1000) {
      return \`\${(gold / 1000).toFixed(1).replace('.0', '')}k\`;
    }
    return \`\${gold}\`;
  };

  const renderCostCoins = (totalGold: number) => {
    if (totalGold <= 0) return <span className="text-xs text-white">0</span>;
    const cc = Math.floor(totalGold / 10000);
    const pc = Math.floor((totalGold % 10000) / 100);
    const gc = totalGold % 100;
    return (
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-4">
          {cc > 0 && <span className="flex items-center gap-1.5 text-sm font-black text-white"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/crystalcoin.gif" alt="CC" className="w-5 h-5 drop-shadow-md"/> {cc.toLocaleString()}</span>}
          {pc > 0 && <span className="flex items-center gap-1.5 text-sm font-black text-white"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/platinumcoin.gif" alt="PC" className="w-5 h-5 drop-shadow-md"/> {pc.toLocaleString()}</span>}
          {gc > 0 && <span className="flex items-center gap-1.5 text-sm font-black text-white"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/goldcoin.gif" alt="GC" className="w-5 h-5 drop-shadow-md"/> {gc.toLocaleString()}</span>}
        </div>
        <div className="text-[11px] font-bold text-orange-400/80 tracking-wide">(\${formatGoldToK(totalGold)})</div>
      </div>
    );
  };

  const renderCombo = (title: string, combo: any) => {
    if (!combo) return null;
    const stats = getComboStats(combo);
    
    return (
      <div className="bg-black/30 border border-orange-500/20 rounded-xl p-5 flex flex-col sm:flex-row items-stretch gap-6 relative overflow-hidden transition-all hover:bg-black/40 hover:border-orange-500/40">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
        
        {/* Combo Info */}
        <div className="flex-1 space-y-4">
          <h5 className="text-orange-400 font-black uppercase text-[11px] tracking-widest flex items-center gap-2">
            <Coins className="w-4 h-4" /> {title}
          </h5>
          <div className="flex flex-wrap gap-4">
            {combo.Inferno > 0 && (
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-orange-500/15">
                <img src={getWeaponImage('inferno')} className="w-10 h-10 object-contain drop-shadow-lg" alt="Inferno" />
                <div>
                  <div className="text-[10px] text-orange-200/50 font-bold uppercase tracking-wider">Inferno</div>
                  <div className="text-lg font-black text-white leading-none mt-1">x{combo.Inferno}</div>
                </div>
              </div>
            )}
            {combo.Lightning > 0 && (
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-orange-500/15">
                <img src={getWeaponImage('lightning')} className="w-10 h-10 object-contain drop-shadow-lg" alt="Lightning" />
                <div>
                  <div className="text-[10px] text-orange-200/50 font-bold uppercase tracking-wider">Lightning</div>
                  <div className="text-lg font-black text-white leading-none mt-1">x{combo.Lightning}</div>
                </div>
              </div>
            )}
            {combo.Spark > 0 && (
              <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-orange-500/15">
                <img src={getWeaponImage('spark')} className="w-10 h-10 object-contain drop-shadow-lg" alt="Spark" />
                <div>
                  <div className="text-[10px] text-orange-200/50 font-bold uppercase tracking-wider">Spark</div>
                  <div className="text-lg font-black text-white leading-none mt-1">x{combo.Spark}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:justify-center gap-3 min-w-[200px]">
          <div className="bg-black/50 p-3 rounded-lg border border-medieval-gold/10 flex flex-col justify-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-medieval-gold/50 mb-1">Custo Total</p>
            {renderCostCoins(stats.cost)}
          </div>
          <div className="bg-black/50 p-3 rounded-lg border border-medieval-gold/10 flex flex-col justify-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-medieval-gold/50 mb-1">Tempo p/ Meta</p>
            <p className="text-lg font-black text-white leading-none">{formatTime(stats.time)}</p>
            {formatDaysTime(stats.time) && (
              <p className="text-[9px] font-bold text-medieval-gold/40 mt-1 uppercase">{formatDaysTime(stats.time)}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
          <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849036/treinodeskils.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Skills" /> 
          {t('skills')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm">
          {t('heroSubtitle')}
        </p>
      </header>
      
      <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
        <div className="w-full space-y-6">
          <div className="medieval-card p-6 sm:p-8 space-y-8">
            
            {/* Vocation & Skill Type Buttons */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-1 space-y-3">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest">{t('vocation')}</label>
                <div className="flex flex-wrap gap-2">
                  {['Knight', 'Paladin', 'Sorcerer', 'Druid'].map(voc => (
                    <button
                      key={voc}
                      onClick={() => setVocation(voc as Vocation)}
                      className={\`px-4 py-2 rounded font-black text-xs uppercase tracking-wider transition-colors \${
                        vocation === voc ? 'bg-[#3b82f6] text-white border-none shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-black/40 text-white/50 border border-medieval-gold/10 hover:border-medieval-gold/30 hover:text-white'
                      }\`}
                    >
                      {voc === 'Sorcerer' ? 'Sorcerer' : voc}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest">{t('skillType')}</label>
                <div className="flex flex-wrap gap-2">
                  {['Melee', 'Distance', 'Magic Level', 'Shielding'].map(st => (
                    <button
                      key={st}
                      onClick={() => setSkillType(st as SkillType)}
                      className={\`px-4 py-2 rounded font-black text-xs uppercase tracking-wider transition-colors \${
                        skillType === st ? 'bg-[#3b82f6] text-white border-none shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-black/40 text-white/50 border border-medieval-gold/10 hover:border-medieval-gold/30 hover:text-white'
                      }\`}
                    >
                      {st === 'Magic Level' ? 'ML' : st === 'Shielding' ? 'Shield' : st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Current, Target, % Row */}
            <div className="flex flex-wrap items-end gap-6 bg-black/20 p-5 rounded-xl border border-medieval-gold/10 shadow-inner">
              <div className="flex flex-col gap-2 w-24">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest leading-none">
                  Atual
                </label>
                <input
                  type="number"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(Math.max(0, Number(e.target.value)))}
                  className="medieval-input font-black text-center text-lg !px-2 !py-2"
                  min="0" max="150"
                />
              </div>
              <div className="flex flex-col gap-2 w-24">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest leading-none">
                  Alvo
                </label>
                <input
                  type="number"
                  value={targetSkill}
                  onChange={(e) => setTargetSkill(Math.max(0, Number(e.target.value)))}
                  className="medieval-input font-black text-center text-lg !px-2 !py-2"
                  min="0" max="150"
                />
              </div>
              <div className="flex flex-col gap-2 w-24">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest leading-none">
                  % Falta
                </label>
                <input
                  type="number"
                  value={skillPercentage}
                  onChange={(e) => setSkillPercentage(Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="medieval-input font-black text-center text-lg !px-2 !py-2"
                  min="0" max="100"
                />
              </div>
              
              {skillType === 'Magic Level' ? (
                <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
                  <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest leading-none opacity-0 hidden sm:block">Promoted</label>
                  <button
                    onClick={() => setIsPromoted(!isPromoted)}
                    className={\`flex items-center justify-center gap-2 text-xs font-bold py-3 px-4 border rounded-lg transition-all h-[46px] \${
                      isPromoted 
                        ? 'bg-medieval-gold text-black border-medieval-gold shadow-[0_0_15px_rgba(255,215,0,0.2)]' 
                        : 'bg-black/40 text-medieval-gold/60 border-medieval-gold/20 hover:border-medieval-gold/40'
                    }\`}
                  >
                    <Check className={\`w-4 h-4 transition-transform \${isPromoted ? 'scale-100' : 'scale-0'}\`} />
                    <span>{isPromoted ? t('isPromoted') : "NOT PROMOTED"}</span>
                  </button>
                </div>
              ) : null}
            </div>

            {/* Weapon & Training Config */}
            <div className="space-y-4 pt-4 border-t border-medieval-gold/10">
              <div className="flex flex-col gap-3">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest">{t('trainingMode')}</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setWeaponType('normal')}
                    className={\`px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-wider transition-colors \${
                      weaponType === 'normal' ? 'bg-[#3b82f6] text-white border-none shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-black/40 text-white/50 border border-medieval-gold/10 hover:border-medieval-gold/30 hover:text-white'
                    }\`}
                  >
                    {t('normalWeapon')}
                  </button>
                  <button
                    onClick={() => setWeaponType('training')}
                    className={\`px-5 py-2.5 rounded-lg font-black text-xs uppercase tracking-wider transition-colors \${
                      weaponType === 'training' ? 'bg-orange-600 text-white border-none shadow-[0_0_15px_rgba(234,88,12,0.3)]' : 'bg-black/40 text-white/50 border border-medieval-gold/10 hover:border-medieval-gold/30 hover:text-white'
                    }\`}
                  >
                    {t('trainingWeapon')}
                  </button>
                </div>
              </div>

              {weaponType === 'normal' ? (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-5 bg-black/20 rounded-xl border border-medieval-gold/10">
                  {skillType !== 'Magic Level' && (
                    <div className="flex flex-col gap-2">
                      <label className="text-medieval-gold/60 font-bold uppercase text-[9px] tracking-widest">
                        {t('weaponReduction')}
                      </label>
                      <select
                        value={weaponReduction}
                        onChange={(e) => setWeaponReduction(Number(e.target.value))}
                        className="medieval-input text-sm cursor-pointer appearance-none !py-2"
                      >
                        <option value="0">{t('none')}</option>
                        {[1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>-{n}% atack interval</option>)}
                      </select>
                    </div>
                  )}
                  {equipReductions.map((red, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <label className="text-medieval-gold/60 font-bold uppercase text-[9px] tracking-widest">
                        {t('extraEquip')} {idx + 1}
                      </label>
                      <select
                        value={red}
                        onChange={(e) => handleEquipReductionChange(idx, Number(e.target.value))}
                        className="medieval-input text-sm cursor-pointer appearance-none !py-2"
                      >
                        <option value="0">{t('none')}</option>
                        {[1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>-{n}% atack interval</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 bg-orange-900/10 border border-orange-500/20 rounded-xl space-y-5 shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-orange-400" />
                        <p className="text-xs text-orange-300 font-bold uppercase tracking-widest">
                          Preços do Servidor
                        </p>
                      </div>
                      <p className="text-[11px] text-medieval-text/60">
                        Insira os preços (em Gold) para calcular a melhor combinação.
                      </p>
                    </div>
                    <button 
                      onClick={fillSuggestedPrices}
                      className="text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 bg-orange-600/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-600/30 transition-colors whitespace-nowrap flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5"/> Valores Sugeridos
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-2 relative">
                      <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <img src={getWeaponImage('spark')} alt="Spark" className="w-6 h-6 object-contain" /> Spark
                      </label>
                      <input
                        type="number"
                        value={prices.spark}
                        onChange={(e) => setPrices({...prices, spark: e.target.value})}
                        className="medieval-input text-base font-bold !pl-9 !py-2.5"
                        placeholder="Ex: 50000"
                        min="0"
                      />
                      <span className="absolute bottom-[13px] left-3.5 text-medieval-gold/50 font-black text-sm">G</span>
                    </div>
                    <div className="flex flex-col gap-2 relative">
                      <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <img src={getWeaponImage('lightning')} alt="Lightning" className="w-6 h-6 object-contain" /> Lightning
                      </label>
                      <input
                        type="number"
                        value={prices.lightning}
                        onChange={(e) => setPrices({...prices, lightning: e.target.value})}
                        className="medieval-input text-base font-bold !pl-9 !py-2.5"
                        placeholder="Ex: 120000"
                        min="0"
                      />
                      <span className="absolute bottom-[13px] left-3.5 text-medieval-gold/50 font-black text-sm">G</span>
                    </div>
                    <div className="flex flex-col gap-2 relative">
                      <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <img src={getWeaponImage('inferno')} alt="Inferno" className="w-6 h-6 object-contain" /> Inferno
                      </label>
                      <input
                        type="number"
                        value={prices.inferno}
                        onChange={(e) => setPrices({...prices, inferno: e.target.value})}
                        className="medieval-input text-base font-bold !pl-9 !py-2.5"
                        placeholder="Ex: 250000"
                        min="0"
                      />
                      <span className="absolute bottom-[13px] left-3.5 text-medieval-gold/50 font-black text-sm">G</span>
                    </div>
                  </div>
                </div>
              )}

              {skillType === 'Magic Level' && vocation !== 'Knight' && (
                 <div className="flex flex-col gap-2 pt-2">
                    <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                      Runa / Magia Demonstrativa
                    </label>
                    <select
                      value={selectedSpell}
                      onChange={(e) => setSelectedSpell(e.target.value)}
                      className="medieval-input cursor-pointer appearance-none text-sm w-full sm:w-1/2 !py-2.5"
                    >
                      {VOC_SPELLS[vocation]?.map(s => (
                        <option key={s.name} value={s.name}>
                          {s.name} ({s.mana} mana)
                        </option>
                      ))}
                    </select>
                 </div>
              )}
            </div>
            
            {/* Results Section */}
            <div className="mt-8 pt-8 border-t border-medieval-gold/20">
              {skillType === 'Magic Level' ? (
                <div className="space-y-6">
                  {weaponType === 'normal' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="text-center p-6 bg-black/40 rounded-xl border border-medieval-gold/10 flex flex-col justify-center items-center shadow-lg">
                        <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-2">
                          {t('manaNeeded')}
                        </p>
                        <div className="text-3xl font-black text-medieval-gold drop-shadow-md">
                          {finalResult.points.toLocaleString()} mana
                        </div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-medieval-gold/10 to-transparent rounded-xl border border-medieval-gold/30 shadow-lg flex flex-col justify-center items-center">
                        <p className="text-medieval-gold uppercase text-[10px] font-black tracking-widest mb-2">
                          {t('estimatedTime')} (Food Regen)
                        </p>
                        <div className="text-2xl font-black text-medieval-gold drop-shadow-md">
                          {formatMLTime(foodRegenSeconds)}
                        </div>
                        <div className="text-[10px] font-bold text-medieval-gold/60 mt-2 uppercase">
                          Regen: 1 MP por {secondsPerMana}s {isPromoted ? '(Promovido)' : '(Regular)'}
                        </div>
                      </div>
                    </div>
                  )}

                  {weaponType === 'normal' && vocation !== 'Knight' && (
                    <div className="p-5 bg-black/20 border border-medieval-gold/10 rounded-xl text-center shadow-inner">
                      <p className="text-medieval-gold/85 uppercase text-[10px] font-bold tracking-widest mb-3 flex items-center justify-center gap-2">
                        <Wand2 className="w-4 h-4 text-medieval-gold" /> {t('runesCreated')}
                      </p>
                      <p className="text-lg font-black text-white">
                        {spellCount.toLocaleString()}x {currentSpellObject?.name || selectedSpell}
                      </p>
                      <p className="text-[10px] text-medieval-text/40 mt-1">
                        (Cada conjuração consome {spellCost} mana)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                weaponType === 'normal' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-6 bg-black/40 rounded-xl border border-medieval-gold/10 flex flex-col justify-center items-center shadow-lg">
                      <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-2">{t('totalHits')}</p>
                      <div className="text-3xl font-black text-medieval-gold drop-shadow-md">{finalResult.points.toLocaleString()}</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-medieval-gold/10 to-transparent rounded-xl border border-medieval-gold/30 shadow-lg flex flex-col justify-center items-center">
                      <p className="text-medieval-gold uppercase text-[10px] font-black tracking-widest mb-2">{t('estimatedTime')}</p>
                      <div className="text-3xl font-black text-medieval-gold drop-shadow-md">{formatTime(finalResult.seconds)}</div>
                      {formatDaysTime(finalResult.seconds) && (
                        <div className="text-[10px] font-bold text-medieval-gold/60 mt-2 uppercase">
                          {formatDaysTime(finalResult.seconds)}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}

              {/* Training Weapon Optimal Result */}
              {weaponType === 'training' && (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-black/40 rounded-xl border border-medieval-gold/10 flex flex-col justify-center items-center shadow-lg">
                    <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{skillType === 'Magic Level' ? 'Mana Necessária' : 'Total Hits'}</p>
                    <div className="text-xl font-black text-medieval-gold">{pointsNeeded.toLocaleString()}</div>
                  </div>
                  
                  {combos.cheapest ? (
                    <div className="space-y-4 mt-6">
                      {renderCombo("Melhor Custo-Benefício", combos.cheapest)}
                      
                      {combos.fastest && combos.fastest.cost !== combos.cheapest.cost && (
                        renderCombo("Opção Mais Rápida (Menor Tempo)", combos.fastest)
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-black/20 rounded-xl border border-orange-500/10 mt-6 shadow-inner">
                      <p className="text-sm text-orange-200/50">
                        {pointsNeeded <= 0 ? "A meta já foi atingida." : "Insira o preço de pelo menos uma arma de treino para calcular as combinações."}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Rules & Info Cards */}
        <div className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="medieval-card p-6 space-y-4 h-full">
              <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-medieval-gold" /> Regras de Magic Level
              </h3>
              <div className="space-y-4 text-xs text-medieval-text/70 leading-relaxed font-mono">
                <p>• <span className="text-medieval-gold">Sorcerer / Druid:</span> Multiplicador de 1.1x. Alto rendimento em magias e runas de ataque/cura.</p>
                <p>• <span className="text-medieval-gold">Paladin:</span> Multiplicador de 1.4x. Avanço moderado, essencial para marcas de utilidade e cura média.</p>
                <p>• <span className="text-medieval-gold">Knight:</span> Multiplicador de 3.0x. Avanço lento, utilizado para magias básicas de cura (exura) e utilidades.</p>
                <p>• <span className="text-medieval-gold">Promoted Status:</span> Melhora drasticamente o tempo de regeneração de mana (comida), acelerando o ganho de Magic Level offline das vocações mágicas de 6s para 4s e paladinos de 8s para 6s.</p>
              </div>
            </div>
            
            <div className="medieval-card p-6 space-y-4 h-full">
              <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2">
                <Info className="w-4 h-4" /> {t('trainingInfo')}
              </h3>
              <div className="space-y-4 text-xs text-medieval-text/70 leading-relaxed font-mono">
                <p>• <span className="text-medieval-gold">{t('meleeInfo').split(':')[0]}:</span> {t('meleeInfo').split(':')[1]}</p>
                <p>• <span className="text-medieval-gold">{t('shieldingInfo').split(':')[0]}:</span> {t('shieldingInfo').split(':')[1]}</p>
                <p>• <span className="text-medieval-gold">{t('atkIntervalInfo').split(':')[0]}:</span> {t('atkIntervalInfo').split(':')[1]}</p>
                <p>• <span className="text-medieval-gold">{t('trainingWeaponInfo').split(':')[0]}:</span> {t('trainingWeaponInfo').split(':')[1]}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-medieval-gold/10 border border-medieval-gold/20 rounded-lg mt-8">
            <p className="text-[10px] text-medieval-gold/60 italic uppercase tracking-tighter text-center leading-relaxed">
              Fórmulas baseadas em tabelas clássicas de Tibia 7.4 e mecânicas exclusivas do Miracle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/SkillCalculator.tsx', code);
