import React from 'react';
import { CalculatedStats } from '../../utils/formulas';
import { SidebarLiveSettings, StatRow, SkillRow } from './StatsSidebar';
import { Language } from '../../lib/translations';
import { cn } from '../../lib/utils';
import { 
  Shield, Sword, Heart, Zap, Weight, Move, Flame, Snowflake, 
  Zap as Energy, Mountain, User, Sparkles, Activity, ShieldAlert, Award
} from 'lucide-react';

interface CardProps {
  stats: CalculatedStats;
  compareStats?: CalculatedStats;
  settings: SidebarLiveSettings;
  showCompare: boolean;
  language: Language;
  t: (key: string) => string;
}

export const VitalsCard: React.FC<CardProps> = ({ 
  stats, compareStats, settings, showCompare, language, t 
}) => {
  const getDelta = (key: keyof CalculatedStats) => {
    if (!showCompare || !compareStats) return 0;
    const v1 = stats[key];
    const v2 = compareStats[key];
    if (typeof v1 === 'number' && typeof v2 === 'number') {
      return v1 - v2;
    }
    return 0;
  };

  return (
    <div className="space-y-1">
      {settings.showHp && <StatRow label={t('bm_maximumHealth')} value={stats.hp} delta={getDelta('hp')} showDelta={showCompare} icon={Heart} />}
      {settings.showMp && <StatRow label={t('bm_maximumMana')} value={stats.mp} delta={getDelta('mp')} showDelta={showCompare} icon={Zap} />}
      {settings.showCap && <StatRow label={t('bm_capacity')} value={stats.cap} delta={getDelta('cap')} showDelta={showCompare} icon={Weight} />}
      {settings.showSpeed && <StatRow label={t('bm_speed')} value={stats.speed} delta={getDelta('speed')} showDelta={showCompare} icon={Move} />}
    </div>
  );
};

export const SkillsCard: React.FC<Omit<CardProps, 't'>> = ({ 
  stats, compareStats, settings, showCompare, language 
}) => {
  return (
    <div className="space-y-0.5 bg-black/35 p-2 border border-medieval-gold/10 rounded">
      {settings.showMagic && (
        <SkillRow 
          label="Magic Level" 
          base={stats.skillsBreakdown.magic.base} 
          gear={stats.skillsBreakdown.magic.gear} 
          total={stats.skillsBreakdown.magic.total} 
          compareTotal={compareStats?.skillsBreakdown.magic.total}
          showCompare={showCompare}
          icon={Zap}
        />
      )}
      {settings.showSword && (
        <SkillRow 
          label="Sword Fighting" 
          base={stats.skillsBreakdown.sword.base} 
          gear={stats.skillsBreakdown.sword.gear} 
          total={stats.skillsBreakdown.sword.total} 
          compareTotal={compareStats?.skillsBreakdown.sword.total}
          showCompare={showCompare}
          icon={Sword}
        />
      )}
      {settings.showAxe && (
        <SkillRow 
          label="Axe Fighting" 
          base={stats.skillsBreakdown.axe.base} 
          gear={stats.skillsBreakdown.axe.gear} 
          total={stats.skillsBreakdown.axe.total} 
          compareTotal={compareStats?.skillsBreakdown.axe.total}
          showCompare={showCompare}
          icon={Sword}
        />
      )}
      {settings.showClub && (
        <SkillRow 
          label="Club Fighting" 
          base={stats.skillsBreakdown.club.base} 
          gear={stats.skillsBreakdown.club.gear} 
          total={stats.skillsBreakdown.club.total} 
          compareTotal={compareStats?.skillsBreakdown.club.total}
          showCompare={showCompare}
          icon={Sword}
        />
      )}
      {settings.showDistance && (
        <SkillRow 
          label="Distance" 
          base={stats.skillsBreakdown.distance.base} 
          gear={stats.skillsBreakdown.distance.gear} 
          total={stats.skillsBreakdown.distance.total} 
          compareTotal={compareStats?.skillsBreakdown.distance.total}
          showCompare={showCompare}
          icon={Sword}
        />
      )}
      {settings.showShielding && (
        <SkillRow 
          label="Shielding" 
          base={stats.skillsBreakdown.shielding.base} 
          gear={stats.skillsBreakdown.shielding.gear} 
          total={stats.skillsBreakdown.shielding.total} 
          compareTotal={compareStats?.skillsBreakdown.shielding.total}
          showCompare={showCompare}
          icon={Shield}
        />
      )}
    </div>
  );
};

export const CombatCard: React.FC<CardProps> = ({ 
  stats, compareStats, settings, showCompare, language, t 
}) => {
  const getDelta = (key: keyof CalculatedStats) => {
    if (!showCompare || !compareStats) return 0;
    const v1 = stats[key];
    const v2 = compareStats[key];
    if (typeof v1 === 'number' && typeof v2 === 'number') {
      return v1 - v2;
    }
    return 0;
  };

  const reductionText = `${stats.minReduction} - ${stats.maxReduction}`;
  const getReductionDelta = () => {
    if (!showCompare || !compareStats) return '';
    const minD = stats.minReduction - compareStats.minReduction;
    const maxD = stats.maxReduction - compareStats.maxReduction;
    if (minD === 0 && maxD === 0) return '0';
    return `${minD >= 0 ? '+' : ''}${minD} à ${maxD >= 0 ? '+' : ''}${maxD}`;
  };

  return (
    <div className="space-y-1.5">
      {settings.showWeaponAtk && <StatRow label={t('bm_weaponAttack')} value={stats.attack} delta={getDelta('attack')} showDelta={showCompare} />}
      
      {settings.showMaxMelee && (
        <div className="bg-black/45 p-2 rounded border border-medieval-gold/10 space-y-1">
          <div className="flex justify-between items-center text-[10.5px] tracking-tight text-medieval-muted/90">
            <span className="font-bold">🗡️ {t('bm_meleeAttackFormula')}</span>
            <div className="flex items-center gap-1">
              <span className="text-medieval-gold font-mono font-bold">{stats.maxMelee} HP</span>
              {showCompare && compareStats && (
                <span className={cn(
                  "text-[9px] font-bold px-1 rounded-sm",
                  stats.maxMelee - compareStats.maxMelee > 0 
                    ? "text-green-500 bg-green-500/10" 
                    : stats.maxMelee - compareStats.maxMelee < 0 
                      ? "text-red-500 bg-red-500/10" 
                      : "text-gray-500"
                )}>
                  {stats.maxMelee - compareStats.maxMelee > 0 
                    ? `+${stats.maxMelee - compareStats.maxMelee}` 
                    : stats.maxMelee - compareStats.maxMelee < 0 
                      ? stats.maxMelee - compareStats.maxMelee 
                      : ''}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[9.5px] text-center font-mono bg-black/60 p-1 border border-medieval-gold/10 rounded">
            <div>
              <div className="text-[8px] text-medieval-muted/50 uppercase">{language === 'pt' ? 'Mín (0%)' : 'Min (0%)'}</div>
              <div className="text-stone-300 font-bold">{stats.minMelee} HP</div>
            </div>
            <div>
              <div className="text-[8px] text-medieval-gold/50 uppercase">{language === 'pt' ? 'Méd (50%)' : 'Avg (50%)'}</div>
              <div className="text-medieval-gold font-bold">{stats.avgMelee} HP</div>
            </div>
            <div>
              <div className="text-[8px] text-emerald-400/50 uppercase">{language === 'pt' ? 'Máx (99%)' : 'Max (99%)'}</div>
              <div className="text-emerald-400 font-bold">{stats.maxMelee} HP</div>
            </div>
          </div>
        </div>
      )}

      {settings.showMaxDist && (
        <div className="bg-black/45 p-2 rounded border border-medieval-gold/10 space-y-1">
          <div className="flex justify-between items-center text-[10.5px] tracking-tight text-medieval-muted/90">
            <span className="font-bold">🏹 {t('bm_distanceAttackFormula')}</span>
            <div className="flex items-center gap-1">
              <span className="text-medieval-gold font-mono font-bold">{stats.maxDist} HP</span>
              {showCompare && compareStats && (
                <span className={cn(
                  "text-[9px] font-bold px-1 rounded-sm",
                  stats.maxDist - compareStats.maxDist > 0 
                    ? "text-green-500 bg-green-500/10" 
                    : stats.maxDist - compareStats.maxDist < 0 
                      ? "text-red-500 bg-red-500/10" 
                      : "text-gray-500"
                )}>
                  {stats.maxDist - compareStats.maxDist > 0 
                    ? `+${stats.maxDist - compareStats.maxDist}` 
                    : stats.maxDist - compareStats.maxDist < 0 
                      ? stats.maxDist - compareStats.maxDist 
                      : ''}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[9.5px] text-center font-mono bg-black/60 p-1 border border-medieval-gold/10 rounded">
            <div>
              <div className="text-[8px] text-medieval-muted/50 uppercase">{language === 'pt' ? 'Mín (0%)' : 'Min (0%)'}</div>
              <div className="text-stone-300 font-bold">{stats.minDist} HP</div>
            </div>
            <div>
              <div className="text-[8px] text-medieval-gold/50 uppercase">{language === 'pt' ? 'Méd (50%)' : 'Avg (50%)'}</div>
              <div className="text-medieval-gold font-bold">{stats.avgDist} HP</div>
            </div>
            <div>
              <div className="text-[8px] text-emerald-400/50 uppercase">{language === 'pt' ? 'Máx (99%)' : 'Max (99%)'}</div>
              <div className="text-emerald-400 font-bold">{stats.maxDist} HP</div>
            </div>
          </div>
        </div>
      )}
      
      {settings.showMaxDef && (
        <>
          <StatRow label={t('bm_defenseEquipment')} value={stats.defense} delta={getDelta('defense')} showDelta={showCompare} icon={Shield} />
          <div className="bg-black/45 p-2.5 border border-medieval-gold/10 rounded-sm space-y-1.5 my-1.5 font-bold">
            <div className="flex justify-between text-[10.5px] tracking-tight text-medieval-muted/90 font-normal">
              <span>{t('bm_defenseSource')}:</span>
              <span className="text-medieval-gold font-bold">
                {stats.defenseSource === "Nenhum" 
                  ? (language === 'pt' ? 'Nenhum' : 'None') 
                  : (stats.defenseSource === "Escudo" 
                    ? (language === 'pt' ? 'Escudo' : 'Shield') 
                    : (stats.defenseSource === "Arma" 
                      ? (language === 'pt' ? 'Arma' : 'Weapon') 
                      : stats.defenseSource))}
              </span>
            </div>
            <div className="flex justify-between text-[10.5px] tracking-tight text-medieval-muted/90 font-normal">
              <span>{t('bm_blockingSkill') || (language === 'pt' ? 'Skill de Bloqueio:' : 'Blocking Skill:')}:</span>
              <div className="flex items-center gap-1 font-normal">
                <span className="text-medieval-muted font-bold text-[10px]">{stats.defenseActiveSkill}</span>
                <span className="text-emerald-400 font-mono font-bold">({stats.defenseSkillValue})</span>
              </div>
            </div>
            
            <div className="border-t border-medieval-gold/10 pt-1.5 mt-1 space-y-1 font-normal">
              <div className="flex justify-between text-[11px] font-bold tracking-tight text-medieval-white font-normal">
                <span className="text-medieval-gold/85 max-w-[50%] truncate">{t('bm_blockedDamageFormula') || (language === 'pt' ? 'Dano Bloqueado (Fórmula):' : 'Blocked Damage (Formula):')}:</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-emerald-400 font-mono font-bold">-{stats.maxBlock} HP</span>
                  {showCompare && compareStats && (
                    <span className={cn(
                      "text-[9px] font-bold px-1 rounded-sm whitespace-nowrap",
                      stats.maxBlock - compareStats.maxBlock > 0 
                        ? "text-green-500 bg-green-500/10" 
                        : stats.maxBlock - compareStats.maxBlock < 0 
                          ? "text-red-500 bg-red-500/10" 
                          : "text-gray-500"
                    )}>
                      {stats.maxBlock - compareStats.maxBlock > 0 
                        ? `+${stats.maxBlock - compareStats.maxBlock}` 
                        : stats.maxBlock - compareStats.maxBlock < 0 
                          ? stats.maxBlock - compareStats.maxBlock 
                          : ''}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-1 text-[9px] text-center font-mono bg-black/60 p-1 border border-medieval-gold/10 rounded font-bold col-span-1">
                <div>
                  <div className="text-[8px] text-medieval-muted/50 uppercase font-normal">{language === 'pt' ? 'Mín (0%)' : 'Min (0%)'}</div>
                  <div className="text-stone-300">-{stats.minBlock} HP</div>
                </div>
                <div>
                  <div className="text-[8px] text-medieval-gold/50 uppercase font-normal">{language === 'pt' ? 'Méd (50%)' : 'Avg (50%)'}</div>
                  <div className="text-medieval-gold">-{stats.avgBlock} HP</div>
                </div>
                <div>
                  <div className="text-[8px] text-emerald-400/50 uppercase font-normal">{language === 'pt' ? 'Máx (99%)' : 'Max (99%)'}</div>
                  <div className="text-emerald-400 font-bold">-{stats.maxBlock} HP</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {settings.showArmor && <StatRow label={t('bm_armorTotal')} value={stats.armor} delta={getDelta('armor')} showDelta={showCompare} icon={Shield} />}
      {settings.showPhysReduction && <StatRow label={t('bm_physicalReduction')} value={reductionText} delta={getReductionDelta()} showDelta={showCompare} deltaType={stats.minReduction - (compareStats?.minReduction || 0) > 0 ? 'positive' : 'negative'} unit=" HP" />}
    </div>
  );
};

export const RegenCard: React.FC<CardProps> = ({ 
  stats, compareStats, showCompare, language, t 
}) => {
  const hpRegenDelta = stats.totalHpRegenPerSec - (compareStats?.totalHpRegenPerSec || 0);
  const mpRegenDelta = stats.totalMpRegenPerSec - (compareStats?.totalMpRegenPerSec || 0);

  return (
    <div className="space-y-3 bg-black/45 p-3.5 border border-medieval-gold/15 rounded relative overflow-hidden">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] font-bold text-emerald-400">{t('bm_totalRegenHp')}:</span>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-xs font-bold text-emerald-300">+{stats.totalHpRegenPerSec.toFixed(3)}/s</span>
            {showCompare && hpRegenDelta !== 0 && (
              <span className={cn(
                "text-[9px] font-bold px-1 rounded-sm",
                hpRegenDelta > 0 ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
              )}>
                {hpRegenDelta > 0 ? `+${hpRegenDelta.toFixed(3)}` : hpRegenDelta.toFixed(3)}
              </span>
            )}
          </div>
        </div>
        
        {stats.healthRegenList.length > 0 ? (
          <div className="space-y-1 pl-1 border-l border-emerald-500/20 py-1">
            {stats.healthRegenList.map((item, index) => {
              const srcDisplay = item.source === 'Comida' 
                ? (language === 'pt' ? 'Comida' : 'Food') 
                : (item.source === 'Equipamento' 
                  ? (language === 'pt' ? 'Equipamento' : 'Equipment') 
                  : item.source);
              return (
                <div key={index} className="text-[10px] flex justify-between tracking-tight text-medieval-muted/90 group/item hover:bg-white/5 px-1 py-0.5 rounded">
                  <span>• {item.itemName} <span className="text-[8px] opacity-50">({srcDisplay})</span></span>
                  <span className="font-mono text-emerald-400 font-bold">{item.text} <span className="text-[9px] text-emerald-500/50">(~{item.valPerSec.toFixed(3)}/s)</span></span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[9px] text-medieval-muted/40 italic pl-1">{t('bm_noHpRegenActive')}</p>
        )}
      </div>

      <div className="border-t border-medieval-gold/10 pt-2 font-sans font-normal">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[11px] font-bold text-blue-400">{t('bm_totalRegenMp')}:</span>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-xs font-bold text-blue-300">+{stats.totalMpRegenPerSec.toFixed(3)}/s</span>
            {showCompare && mpRegenDelta !== 0 && (
              <span className={cn(
                "text-[9px] font-bold px-1 rounded-sm",
                mpRegenDelta > 0 ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
              )}>
                {mpRegenDelta > 0 ? `+${mpRegenDelta.toFixed(3)}` : mpRegenDelta.toFixed(3)}
              </span>
            )}
          </div>
        </div>

        {stats.manaRegenList.length > 0 ? (
          <div className="space-y-1 pl-1 border-l border-blue-500/20 py-1">
            {stats.manaRegenList.map((item, index) => {
              const srcDisplay = item.source === 'Comida' 
                ? (language === 'pt' ? 'Comida' : 'Food') 
                : (item.source === 'Equipamento' 
                  ? (language === 'pt' ? 'Equipamento' : 'Equipment') 
                  : item.source);
              return (
                <div key={index} className="text-[10px] flex justify-between tracking-tight text-medieval-muted/90 group/item hover:bg-white/5 px-1 py-0.5 rounded">
                  <span>• {item.itemName} <span className="text-[8px] opacity-50">({srcDisplay})</span></span>
                  <span className="font-mono text-blue-400 font-bold">{item.text} <span className="text-[9px] text-blue-500/50">(~{item.valPerSec.toFixed(3)}/s)</span></span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-[9px] text-medieval-muted/40 italic pl-1">{t('bm_noMpRegenActive')}</p>
        )}
      </div>
    </div>
  );
};

export const ProtectionsCard: React.FC<CardProps> = ({ 
  stats, compareStats, settings, showCompare, language 
}) => {
  const getDelta = (key: keyof CalculatedStats) => {
    if (!showCompare || !compareStats) return 0;
    const v1 = stats[key];
    const v2 = compareStats[key];
    if (typeof v1 === 'number' && typeof v2 === 'number') {
      return v1 - v2;
    }
    return 0;
  };

  const getProtDelta = (key: string) => {
    if (!showCompare || !compareStats) return 0;
    return (stats.protections[key] || 0) - (compareStats.protections[key] || 0);
  };

  return (
    <div className="space-y-1">
      {settings.showPhysProt && <StatRow label={language === 'pt' ? 'Física' : 'Physical'} value={Math.floor((stats.protections['physical'] || 0) * 100)} unit="%" delta={Math.floor(getProtDelta('physical') * 100)} showDelta={showCompare} icon={Shield} />}
      {settings.showFireProt && <StatRow label={language === 'pt' ? 'Fogo' : 'Fire'} value={Math.floor((stats.protections['fire'] || 0) * 100)} unit="%" delta={Math.floor(getProtDelta('fire') * 100)} showDelta={showCompare} icon={Flame} />}
      {settings.showIceProt && <StatRow label={language === 'pt' ? 'Gelo' : 'Ice'} value={Math.floor((stats.protections['ice'] || 0) * 100)} unit="%" delta={Math.floor(getProtDelta('ice') * 100)} showDelta={showCompare} icon={Snowflake} />}
      {settings.showEnergyProt && <StatRow label={language === 'pt' ? 'Energia' : 'Energy'} value={Math.floor((stats.protections['energy'] || 0) * 100)} unit="%" delta={Math.floor(getProtDelta('energy') * 100)} showDelta={showCompare} icon={Energy} />}
      {settings.showEarthProt && <StatRow label={language === 'pt' ? 'Terra/Poison' : 'Earth/Poison'} value={Math.floor((stats.protections['earth'] || 0) * 100)} unit="%" delta={Math.floor(getProtDelta('earth') * 100)} showDelta={showCompare} icon={Mountain} />}
      {settings.showManaDrainProt && <StatRow label="Mana Drain" value={Math.floor((stats.protections['mana-drain'] || 0) * 100)} unit="%" delta={Math.floor(getProtDelta('mana-drain') * 100)} showDelta={showCompare} icon={ShieldAlert} />}
      {settings.showAllElementsProt && <StatRow label={language === 'pt' ? 'Todos Elementos' : 'All Elements'} value={Math.floor((stats.protections['elements'] || 0) * 100)} unit="%" delta={Math.floor(getProtDelta('elements') * 100)} showDelta={showCompare} icon={Sparkles} />}
      {settings.showArrowGuard && stats.arrowGuard > 0 && (
        <StatRow label="Arrow Guard" value={stats.arrowGuard} unit="%" delta={getDelta('arrowGuard')} showDelta={showCompare} icon={Shield} />
      )}
      {settings.showMitigation && stats.mitigation > 0 && (
        <StatRow label="Mitigation" value={stats.mitigation} unit="%" delta={getDelta('mitigation')} showDelta={showCompare} icon={Shield} />
      )}
    </div>
  );
};

export const SpecialsCard: React.FC<CardProps> = ({ 
  stats, compareStats, settings, showCompare, language, t 
}) => {
  const getDelta = (key: keyof CalculatedStats) => {
    if (!showCompare || !compareStats) return 0;
    const v1 = stats[key];
    const v2 = compareStats[key];
    if (typeof v1 === 'number' && typeof v2 === 'number') {
      return v1 - v2;
    }
    return 0;
  };

  return (
    <div className="space-y-2">
      {settings.showCrit && (
        <div className="bg-black/25 p-1.5 rounded border border-medieval-gold/5 space-y-1">
          <div className="text-[10px] text-medieval-gold uppercase font-sans font-normal tracking-wider">{language === 'pt' ? 'Acerto Crítico' : 'Critical Hit'}</div>
          <StatRow label={language === 'pt' ? "Chance de Crítico" : "Crit Chance"} value={stats.critChance} unit="%" delta={getDelta('critChance')} showDelta={showCompare} />
          <StatRow label={language === 'pt' ? "Dano Adicional" : "Crit Amount"} value={stats.critAmount} unit="%" delta={getDelta('critAmount')} showDelta={showCompare} />
        </div>
      )}
      {settings.showLifeLeech && (
        <div className="bg-black/25 p-1.5 rounded border border-medieval-gold/5 space-y-1">
          <div className="text-[10px] text-red-500 uppercase font-sans font-normal tracking-wider">{language === 'pt' ? 'Roubo de Vida' : 'Life Leech'}</div>
          <StatRow label={language === 'pt' ? "Chance de Roubo" : "Leech Chance"} value={stats.lifeLeechChance} unit="%" delta={getDelta('lifeLeechChance')} showDelta={showCompare} />
          <StatRow label={language === 'pt' ? "Quantidade do Roubo" : "Leech Amount"} value={stats.lifeLeechAmount} unit="%" delta={getDelta('lifeLeechAmount')} showDelta={showCompare} />
        </div>
      )}
      {settings.showBurning && (
        <div className="bg-black/25 p-1.5 rounded border border-medieval-gold/5 space-y-1">
          <div className="text-[10px] text-orange-500 uppercase font-sans font-normal tracking-wider">{language === 'pt' ? 'Incêndio' : 'Burning'}</div>
          <StatRow label={language === 'pt' ? "Chance de Queima" : "Burning Chance"} value={stats.burningChance} unit="%" delta={getDelta('burningChance')} showDelta={showCompare} />
          <StatRow label={language === 'pt' ? "Dano por Turno" : "Burning Amount"} value={stats.burningAmount} unit="" delta={getDelta('burningAmount')} showDelta={showCompare} />
        </div>
      )}
      {settings.showManaLeech && (
        stats.bonuses['mana-leech-amount'] ? (
          <div className="bg-black/25 p-1.5 rounded border border-medieval-gold/5 space-y-1">
            <div className="text-[10px] text-sky-400 uppercase font-sans font-normal tracking-wider">{language === 'pt' ? 'Roubo de Mana' : 'Mana Leech'}</div>
            <StatRow label={language === 'pt' ? "Chance de Roubo" : "Leech Chance"} value={stats.manaLeech} unit="%" delta={getDelta('manaLeech')} showDelta={showCompare} />
            <StatRow label={language === 'pt' ? "Quantidade do Roubo" : "Leech Amount"} value={stats.bonuses['mana-leech-amount'] || 0} unit="%" delta={(stats.bonuses['mana-leech-amount'] || 0) - (compareStats?.bonuses?.['mana-leech-amount'] || 0)} showDelta={showCompare} />
          </div>
        ) : (
          <StatRow label="Mana Leech" value={stats.manaLeech} unit="%" delta={getDelta('manaLeech')} showDelta={showCompare} />
        )
      )}
      {settings.showDodge && <StatRow label="Dodge Chance" value={stats.dodge} unit="%" delta={getDelta('dodge')} showDelta={showCompare} />}
      {settings.showVibrancy && <StatRow label="Vibrancy" value={stats.vibrancy} unit="%" delta={getDelta('vibrancy')} showDelta={showCompare} />}
      {settings.showAbsorbMana && <StatRow label="Absorb Mana" value={stats.absorbMana} unit="%" delta={getDelta('absorbMana')} showDelta={showCompare} />}
      {settings.showReflectFire && stats.reflectFire > 0 && (
        <StatRow label="Reflect Fire" value={stats.reflectFire} unit="%" delta={getDelta('reflectFire')} showDelta={showCompare} />
      )}
      {settings.showReflectEnergy && stats.reflectEnergy > 0 && (
        <StatRow label="Reflect Energy" value={stats.reflectEnergy} unit="%" delta={getDelta('reflectEnergy')} showDelta={showCompare} />
      )}
      {settings.showReflectPhys && stats.reflectPhys > 0 && (
        stats.bonuses['reflect-phys-amount'] ? (
          <div className="bg-black/25 p-1.5 rounded border border-medieval-gold/5 space-y-1">
            <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">{language === 'pt' ? 'Refletir Físico' : 'Reflect Physical'}</div>
            <StatRow label={language === 'pt' ? "Chance de Refletir" : "Reflect Chance"} value={stats.reflectPhys} unit="%" delta={getDelta('reflectPhys')} showDelta={showCompare} />
            <StatRow label={language === 'pt' ? "Valor Refletido" : "Reflected Value"} value={stats.bonuses['reflect-phys-amount'] || 0} unit="%" delta={(stats.bonuses['reflect-phys-amount'] || 0) - (compareStats?.bonuses?.['reflect-phys-amount'] || 0)} showDelta={showCompare} />
          </div>
        ) : (
          <StatRow label="Reflect Physical" value={stats.reflectPhys} unit="%" delta={getDelta('reflectPhys')} showDelta={showCompare} />
        )
      )}
      {/* Element Damage Bonuses from Relics/Items */}
      {Object.keys(stats.bonuses).some(k => k.startsWith('dmg-')) && (
        <div className="bg-black/25 p-1.5 rounded border border-medieval-gold/5 space-y-1 mt-2">
          <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
            {language === 'pt' ? 'Bônus de Dano de Relíquia' : 'Relic Damage Bonuses'}
          </div>
          {['dmg-physical', 'dmg-poison', 'dmg-ice', 'dmg-holy', 'dmg-death'].map(key => {
            const value = stats.bonuses[key] || 0;
            const compareValue = compareStats?.bonuses?.[key] || 0;
            const delta = value - compareValue;
            if (value === 0 && compareValue === 0) return null;

            let label = '';
            if (key === 'dmg-physical') label = language === 'pt' ? 'Dano Físico' : 'Physical Damage';
            if (key === 'dmg-poison') label = language === 'pt' ? 'Dano Veneno' : 'Poison Damage';
            if (key === 'dmg-ice') label = language === 'pt' ? 'Dano Gelo' : 'Ice Damage';
            if (key === 'dmg-holy') label = language === 'pt' ? 'Dano Sagrado' : 'Holy Damage';
            if (key === 'dmg-death') label = language === 'pt' ? 'Dano Morte' : 'Death Damage';

            return (
              <StatRow
                key={key}
                label={label}
                value={value}
                unit="%"
                delta={delta}
                showDelta={showCompare}
              />
            );
          })}
        </div>
      )}
      {settings.showReflectElements && stats.reflectElements > 0 && (
        <StatRow label="Reflect Elements" value={stats.reflectElements} unit="%" delta={getDelta('reflectElements')} showDelta={showCompare} />
      )}
      {settings.showAbsorbHealth && stats.absorbHealth > 0 && (
        <StatRow label="Absorb Health" value={stats.absorbHealth} unit="%" delta={getDelta('absorbHealth')} showDelta={showCompare} />
      )}
      {settings.showDestruction && stats.destructionChance && stats.destructionChance > 0 ? (
        <div className="bg-black/25 p-2 rounded border border-amber-500/20 space-y-1.5 mt-2 animate-fadeIn font-sans font-normal">
          <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1">⚡ Destruction</span>
            <span className="text-medieval-gold font-mono font-bold">{stats.destructionChance}%</span>
          </div>
          <div className="text-[10px] text-medieval-muted/80 leading-relaxed font-sans font-medium animate-fadeIn">
            {language === 'pt' 
              ? `Chance de ativação de 3%. Ao ativar, concede +10% de skill base treinado (+${stats.destructionBonusAmount} no ${stats.destructionSkillName === 'Melee Skill' ? 'Melee' : stats.destructionSkillName === 'Distance Fighting' ? 'Distance' : 'Magic Level'}).` 
              : `3% chance of activation. On trigger, grants +10% trained base skill (+${stats.destructionBonusAmount} on ${stats.destructionSkillName === 'Melee Skill' ? 'Melee' : stats.destructionSkillName === 'Distance Fighting' ? 'Distance' : 'Magic Level'}).`}
          </div>
        </div>
      ) : null}
    </div>
  );
};
