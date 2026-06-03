
import { BuildState, GameItem, EnchantmentValue } from '../types/build';
import { VOCATIONS_DATA, STANCES_MULTIPLIERS } from '../data/constants';

export interface SkillDetail {
  base: number;
  gear: number;
  total: number;
}

export interface RegenDetail {
  itemName: string;
  source: string;
  text: string;
  valPerSec: number;
}

export interface CalculatedRune {
  name: string;
  min: number;
  max: number;
  avg: number;
  stylePt: string;
  styleEn: string;
  baseFormula: string;
}

export interface CalculatedStats {
  hp: number;
  mp: number;
  cap: number;
  speed: number;
  armor: number;
  attack: number;
  defense: number;
  minReduction: number;
  maxReduction: number;
  maxMelee: number;
  maxDist: number;
  protections: Record<string, number>;
  bonuses: Record<string, number>;
  skillsBreakdown: {
    magic: SkillDetail;
    sword: SkillDetail;
    club: SkillDetail;
    axe: SkillDetail;
    distance: SkillDetail;
    shielding: SkillDetail;
  };
  healthRegenList: RegenDetail[];
  manaRegenList: RegenDetail[];
  totalHpRegenPerSec: number;
  totalMpRegenPerSec: number;
  critChance: number;
  critAmount: number;
  lifeLeech: number;
  lifeLeechChance: number;
  lifeLeechAmount: number;
  burningChance: number;
  burningAmount: number;
  manaLeech: number;
  dodge: number;
  vibrancy: number;
  absorbMana: number;
  arrowGuard: number;
  mitigation: number;
  reflectFire: number;
  reflectEnergy: number;
  reflectPhys: number;
  reflectElements: number;
  absorbHealth: number;
  totalAttack: number;
  maxBlock: number;
  minBlock: number;
  avgBlock: number;
  runes: CalculatedRune[];
  minMelee: number;
  avgMelee: number;
  minDist: number;
  avgDist: number;
  defenseActiveSkill: string;
  defenseSkillValue: number;
  defenseSource: string;
  weaponDef: number;
  shieldDef: number;
  destructionChance?: number;
  destructionBonusAmount?: number;
  destructionSkillName?: string;
}

export function calculateStats(build: BuildState): CalculatedStats {
  const { vocation, level, skills, stance, equipment, selectedAttributes } = build;
  const vocData = VOCATIONS_DATA[vocation];
  const stanceMult = STANCES_MULTIPLIERS[stance];

  // 1. Base Stats
  const baseHp = 185 + (level - 8) * vocData.hpGain;
  const baseMp = 35 + (level - 8) * vocData.mpGain;
  const baseCap = 400 + (level - 8) * vocData.capGain;
  const baseSpeed = 220 + (level - 1) * 2;

  let totalHp = baseHp;
  let totalMp = baseMp;
  let totalCap = baseCap;
  let totalSpeed = baseSpeed;
  let totalArmor = 0;
  let weaponAtk = 0;
  let weaponDef = 0;
  let shieldDef = 0;

  const protections: Record<string, number> = {};
  const bonuses: Record<string, number> = {};
  const healthRegenList: RegenDetail[] = [];
  const manaRegenList: RegenDetail[] = [];

  // Aggregate stats from items and enchantments
  Object.entries(equipment).forEach(([slotId, item]) => {
    if (!item) return;

    // Item Base Stats
    if (item.armor) totalArmor += item.armor;
    if (slotId === 'right-hand') {
      weaponAtk = item.attack || 0;
      if (item.subCategory === 'Distance' && equipment['ammo']) {
        weaponAtk += equipment['ammo'].attack || 0;
      }
    }
    if (slotId === 'right-hand' && item.defense) weaponDef = item.defense;
    if (slotId === 'left-hand' && item.defense) shieldDef = item.defense;

    // Fixed Bonuses
    if (item.bonuses) {
      Object.entries(item.bonuses).forEach(([key, val]) => {
        bonuses[key] = (bonuses[key] || 0) + val;
      });

      // Ring or Food custom regeneration (regen: X)
      if (item.bonuses.regen) {
        const isFood = item.category === 'food';
        const source = isFood ? 'Alimento' : 'Anel';
        healthRegenList.push({
          itemName: item.name,
          source,
          text: `+${item.bonuses.regen} HP/s`,
          valPerSec: item.bonuses.regen
        });
        manaRegenList.push({
          itemName: item.name,
          source,
          text: `+${item.bonuses.regen} MP/s`,
          valPerSec: item.bonuses.regen
        });
      }

      // Explicit granula health-regen parsing
      if (item.bonuses['health-regen'] !== undefined) {
        const isRelic = item.category === 'relic';
        const isRing = item.category === 'ring';
        const source = isRelic ? 'Relíquia' : (isRing ? 'Anel' : 'Item');
        const hVal = item.bonuses['health-regen'];
        const rateSec = hVal > 0 ? (1 / hVal) : 0;
        const text = rateSec > 0 ? `+1 HP / ${rateSec.toFixed(1).replace('.0', '')}s` : `+0 HP/s`;
        healthRegenList.push({
          itemName: item.name,
          source,
          text: hVal === 1 ? '+1 HP / 1s' : text,
          valPerSec: hVal
        });
      }

      // Explicit granula mana-regen parsing
      if (item.bonuses['mana-regen'] !== undefined) {
        const isRelic = item.category === 'relic';
        const isRing = item.category === 'ring';
        const source = isRelic ? 'Relíquia' : (isRing ? 'Anel' : 'Item');
        const mVal = item.bonuses['mana-regen'];
        const rateSec = mVal > 0 ? (1 / mVal) : 0;
        let text = ``;
        if (mVal >= 4) {
          const rateSec4 = 4 / mVal;
          text = `+4 MP / ${rateSec4.toFixed(1).replace('.0', '')}s`;
        } else {
          text = `+1 MP / ${rateSec.toFixed(1).replace('.0', '')}s`;
        }
        manaRegenList.push({
          itemName: item.name,
          source,
          text: mVal === 4 ? '+4 MP / 1s' : (mVal === 1 ? '+1 MP / 1s' : text),
          valPerSec: mVal
        });
      }
    }

    // Fixed Protections (Multiplicative: p_total = 1 - (1-p1)*(1-p2)...)
    if (item.protections) {
      Object.entries(item.protections).forEach(([key, val]) => {
        // Handle 'elements' key which means all basic elements
        if (key === 'elements') {
          ['fire', 'ice', 'energy', 'earth'].forEach(elemKey => {
            protections[elemKey] = 1 - (1 - (protections[elemKey] || 0)) * (1 - val);
          });
          protections['elements'] = 1 - (1 - (protections['elements'] || 0)) * (1 - val);
        } else {
          protections[key] = 1 - (1 - (protections[key] || 0)) * (1 - val);
        }
      });
    }

    // Enchantments
    const enchants = selectedAttributes[slotId] || [];
    enchants.forEach(enchant => {
      switch (enchant.type) {
        case 'hp': totalHp += enchant.amount; break;
        case 'mp': totalMp += enchant.amount; break;
        case 'armor': totalArmor += enchant.amount; break;
        case 'speed': totalSpeed += enchant.amount; break;
        case 'fire-prot':
        case 'ice-prot':
        case 'energy-prot':
        case 'earth-prot':
        case 'phys-prot':
        case 'mana-drain-prot':
        case 'elements-prot': {
          let protKey = enchant.type.replace('-prot', '');
          if (protKey === 'phys') protKey = 'physical';
          if (protKey === 'mana-drain') protKey = 'mana-drain';
          if (protKey === 'elements') protKey = 'elements';
          const protVal = enchant.amount / 100;
          protections[protKey] = 1 - (1 - (protections[protKey] || 0)) * (1 - protVal);
          break;
        }
        case 'health-regen': {
          const regStrings = ['+1 HP / 8s', '+1 HP / 7.5s', '+1 HP / 7s', '+2 HP / 6.5s', '+2 HP / 6s'];
          const text = regStrings[enchant.level] || '+1 HP / 8s';
          let valPerSec = 0;
          if (enchant.level === 0) valPerSec = 1 / 8;
          else if (enchant.level === 1) valPerSec = 1 / 7.5;
          else if (enchant.level === 2) valPerSec = 1 / 7;
          else if (enchant.level === 3) valPerSec = 2 / 6.5;
          else if (enchant.level === 4) valPerSec = 2 / 6;

          healthRegenList.push({
            itemName: item.name,
            source: 'Encantamento',
            text,
            valPerSec
          });
          // Still register in bonuses for legacy compatibility if needed
          bonuses[enchant.type] = (bonuses[enchant.type] || 0) + enchant.amount;
          break;
        }
        case 'mana-regen': {
          const regStrings = ['+1 MP / 24s', '+1 MP / 22s', '+1 MP / 20s', '+1 MP / 18s', '+1 MP / 16s'];
          const text = regStrings[enchant.level] || '+1 MP / 24s';
          let valPerSec = 0;
          if (enchant.level === 0) valPerSec = 1 / 24;
          else if (enchant.level === 1) valPerSec = 1 / 22;
          else if (enchant.level === 2) valPerSec = 1 / 20;
          else if (enchant.level === 3) valPerSec = 1 / 18;
          else if (enchant.level === 4) valPerSec = 1 / 16;

          manaRegenList.push({
            itemName: item.name,
            source: 'Encantamento',
            text,
            valPerSec
          });
          // Still register in bonuses for legacy compatibility if needed
          bonuses[enchant.type] = (bonuses[enchant.type] || 0) + enchant.amount;
          break;
        }
        case 'defense': {
          if (slotId === 'left-hand') shieldDef += enchant.amount;
          else if (slotId === 'right-hand') weaponDef += enchant.amount;
          bonuses[enchant.type] = (bonuses[enchant.type] || 0) + enchant.amount;
          break;
        }
        case 'attack': {
          if (slotId === 'right-hand') weaponAtk += enchant.amount;
          bonuses[enchant.type] = (bonuses[enchant.type] || 0) + enchant.amount;
          break;
        }
        default:
          bonuses[enchant.type] = (bonuses[enchant.type] || 0) + enchant.amount;
          if (enchant.chance) bonuses[`${enchant.type}-chance`] = (bonuses[`${enchant.type}-chance`] || 0) + enchant.chance;
      }
    });
  });

  // Add item-based attack skill bonus to weaponAtk (from Strength Bracelet, etc.)
  const itemAttackBonuses = Object.values(equipment).reduce((acc, idItem) => {
    if (idItem && idItem.bonuses && idItem.bonuses.attack) {
      return acc + idItem.bonuses.attack;
    }
    return acc;
  }, 0);
  weaponAtk += itemAttackBonuses;

  const destructionChance = bonuses['destruction'] || 0;
  let destructionBonusAmount = 0;
  let destructionSkillName = 'Magic Level';

  if (vocation === 'Knight') {
    destructionBonusAmount = Math.floor(skills.melee * 0.1);
    destructionSkillName = 'Melee Skill';
  } else if (vocation === 'Paladin') {
    destructionBonusAmount = Math.floor(skills.distance * 0.1);
    destructionSkillName = 'Distance Fighting';
  } else {
    destructionBonusAmount = Math.floor(skills.magic * 0.1);
    destructionSkillName = 'Magic Level';
  }

  // Calculate skill details
  const magicGear = bonuses['magic'] || 0;
  const swordGear = (bonuses['sword'] || 0) + (bonuses['melee'] || 0);
  const clubGear = (bonuses['club'] || 0) + (bonuses['melee'] || 0);
  const axeGear = (bonuses['axe'] || 0) + (bonuses['melee'] || 0);
  const distanceGear = bonuses['distance'] || 0;
  const shieldingGear = bonuses['shielding'] || 0;

  const skillsBreakdown = {
    magic: { base: skills.magic, gear: magicGear, total: skills.magic + magicGear },
    sword: { base: skills.melee, gear: swordGear, total: skills.melee + swordGear },
    club: { base: skills.melee, gear: clubGear, total: skills.melee + clubGear },
    axe: { base: skills.melee, gear: axeGear, total: skills.melee + axeGear },
    distance: { base: skills.distance, gear: distanceGear, total: skills.distance + distanceGear },
    shielding: { base: skills.shielding, gear: shieldingGear, total: skills.shielding + shieldingGear },
  };

  // 2. Combat Formulas
  const effectiveMelee = skills.melee + (bonuses['melee'] || 0) + (bonuses['sword'] || 0) + (bonuses['axe'] || 0) + (bonuses['club'] || 0);
  const effectiveDist = skills.distance + (bonuses['distance'] || 0);
  const effectiveShield = skills.shielding + (bonuses['shielding'] || 0);

  const weaponItem = equipment['right-hand'];
  const shieldItem = equipment['left-hand'];

  // Determine which melee weapon skill to use for Melee Attack based on equipped weapon
  let activeMeleeSkillValue = skillsBreakdown.sword.total;
  if (weaponItem) {
    const subCat = weaponItem.subCategory;
    if (subCat === 'Axes') {
      activeMeleeSkillValue = skillsBreakdown.axe.total;
    } else if (subCat === 'Clubs') {
      activeMeleeSkillValue = skillsBreakdown.club.total;
    } else if (subCat === 'Swords') {
      activeMeleeSkillValue = skillsBreakdown.sword.total;
    } else {
      activeMeleeSkillValue = Math.max(skillsBreakdown.sword.total, skillsBreakdown.axe.total, skillsBreakdown.club.total);
    }
  } else {
    activeMeleeSkillValue = Math.max(skillsBreakdown.sword.total, skillsBreakdown.axe.total, skillsBreakdown.club.total);
  }

  // Formula for Attack/Ataque: ((5 * skill + 50) * atk * stance * 99 / 10000) * 1.1
  const minMelee = Math.floor(((5 * activeMeleeSkillValue + 50) * weaponAtk * stanceMult.atk * 99 / 10000) * 1.0);
  const avgMelee = Math.floor(((5 * activeMeleeSkillValue + 50) * weaponAtk * stanceMult.atk * 99 / 10000) * 1.05);
  const maxMelee = Math.floor(((5 * activeMeleeSkillValue + 50) * weaponAtk * stanceMult.atk * 99 / 10000) * 1.1);

  const minDist = Math.floor(((5 * skillsBreakdown.distance.total + 50) * weaponAtk * stanceMult.atk * 99 / 10000) * 1.0);
  const avgDist = Math.floor(((5 * skillsBreakdown.distance.total + 50) * weaponAtk * stanceMult.atk * 99 / 10000) * 1.05);
  const maxDist = Math.floor(((5 * skillsBreakdown.distance.total + 50) * weaponAtk * stanceMult.atk * 99 / 10000) * 1.1);
  
  // Rule: choose the highest of weapon defense or shield defense.
  // If weapon is higher, we use weapon's skill. Else, shield/shielding skill.
  let defenseValueUsed = 0;
  let defenseSkillUsed = 0;
  let defenseActiveSkill = "Shielding";
  let defenseSource = "Nenhum";

  if (weaponDef > shieldDef) {
    defenseValueUsed = weaponDef;
    defenseSource = weaponItem ? weaponItem.name : "Arma";
    const subCat = weaponItem?.subCategory;
    if (subCat === 'Swords') {
      defenseActiveSkill = "Sword Fighting";
      defenseSkillUsed = skillsBreakdown.sword.total;
    } else if (subCat === 'Axes') {
      defenseActiveSkill = "Axe Fighting";
      defenseSkillUsed = skillsBreakdown.axe.total;
    } else if (subCat === 'Clubs') {
      defenseActiveSkill = "Club Fighting";
      defenseSkillUsed = skillsBreakdown.club.total;
    } else if (subCat === 'Distance') {
      defenseActiveSkill = "Distance";
      defenseSkillUsed = skillsBreakdown.distance.total;
    } else {
      // Fallback: use highest weapon skill configuration
      const maxWeaponSkill = Math.max(skillsBreakdown.sword.total, skillsBreakdown.axe.total, skillsBreakdown.club.total);
      if (maxWeaponSkill === skillsBreakdown.axe.total) {
        defenseActiveSkill = "Axe Fighting";
        defenseSkillUsed = skillsBreakdown.axe.total;
      } else if (maxWeaponSkill === skillsBreakdown.club.total) {
        defenseActiveSkill = "Club Fighting";
        defenseSkillUsed = skillsBreakdown.club.total;
      } else {
        defenseActiveSkill = "Sword Fighting";
        defenseSkillUsed = skillsBreakdown.sword.total;
      }
    }
  } else {
    defenseValueUsed = shieldDef;
    defenseSource = shieldItem ? shieldItem.name : (shieldDef > 0 ? "Escudo" : "Nenhum");
    defenseActiveSkill = "Shielding";
    defenseSkillUsed = skillsBreakdown.shielding.total;
  }

  // Formula for Defense/Defesa (Block): ((5 * skill + 50) * def * stance * 99 / 10000) * 1.1
  const minBlock = Math.floor(((5 * defenseSkillUsed + 50) * defenseValueUsed * stanceMult.def * 99 / 10000) * 1.0);
  const avgBlock = Math.floor(((5 * defenseSkillUsed + 50) * defenseValueUsed * stanceMult.def * 99 / 10000) * 1.05);
  const maxBlock = Math.floor(((5 * defenseSkillUsed + 50) * defenseValueUsed * stanceMult.def * 99 / 10000) * 1.1);

  const minReduction = Math.floor(Math.max(0, totalArmor * 0.47));
  const maxReduction = Math.floor(Math.max(0, totalArmor * 0.94 - 1));

  const totalHpRegenPerSec = healthRegenList.reduce((acc, current) => acc + current.valPerSec, 0);
  const totalMpRegenPerSec = manaRegenList.reduce((acc, current) => acc + current.valPerSec, 0);

  const mlTotal = skillsBreakdown.magic.total;
  const standardBase = (2 * level) + (3 * mlTotal);
  const fmmBase = level + (4 * mlTotal);

  const runesListRaw: CalculatedRune[] = [
    {
      name: "Ultimate Healing (UH)",
      min: Math.floor(standardBase * 2.50),
      max: Math.floor(standardBase * 2.50),
      avg: Math.floor(standardBase * 2.50),
      stylePt: "Cura Estável / Fixa",
      styleEn: "Stable / Fixed Healing",
      baseFormula: "(2×Level)+(3×ML)"
    },
    {
      name: "Sudden Death (SD)",
      min: Math.floor(standardBase * 1.39),
      max: Math.floor(standardBase * 1.55),
      avg: Math.floor((Math.floor(standardBase * 1.39) + Math.floor(standardBase * 1.55)) / 2),
      stylePt: "Alto Dano Estável",
      styleEn: "High Stable Damage",
      baseFormula: "(2×Level)+(3×ML)"
    },
    {
      name: "Explosion",
      min: Math.floor(standardBase * 0.20),
      max: Math.floor(standardBase * 1.00),
      avg: Math.floor((Math.floor(standardBase * 0.20) + Math.floor(standardBase * 1.00)) / 2),
      stylePt: "Volátil (Físico)",
      styleEn: "Volatile (Physical)",
      baseFormula: "(2×Level)+(3×ML)"
    },
    {
      name: "Great Fireball (GFB)",
      min: Math.floor(standardBase * 0.45),
      max: Math.floor(standardBase * 0.70),
      avg: Math.floor((Math.floor(standardBase * 0.45) + Math.floor(standardBase * 0.70)) / 2),
      stylePt: "Dano em Área (AoE)",
      styleEn: "Area Damage (AoE)",
      baseFormula: "(2×Level)+(3×ML)"
    },
    {
      name: "Heavy Magic Missile (HMM)",
      min: Math.floor(standardBase * 0.40),
      max: Math.floor(standardBase * 0.60),
      avg: Math.floor((Math.floor(standardBase * 0.40) + Math.floor(standardBase * 0.60)) / 2),
      stylePt: "Dano de Alvo Único",
      styleEn: "Single Target Damage",
      baseFormula: "(2×Level)+(3×ML)"
    },
    {
      name: "Fireball",
      min: Math.floor(standardBase * 0.35),
      max: Math.floor(standardBase * 0.55),
      avg: Math.floor((Math.floor(standardBase * 0.35) + Math.floor(standardBase * 0.55)) / 2),
      stylePt: "Progressão Inicial",
      styleEn: "Early Progression",
      baseFormula: "(2×Level)+(3×ML)"
    },
    {
      name: "Frost Magic Missile (FMM)",
      min: Math.floor(fmmBase * 0.20),
      max: Math.floor(fmmBase * 0.40),
      avg: Math.floor((Math.floor(fmmBase * 0.20) + Math.floor(fmmBase * 0.40)) / 2),
      stylePt: "Foco total em ML (Gelo)",
      styleEn: "Full ML Focus (Ice)",
      baseFormula: "Level+(4×ML)"
    }
  ];

  const runesList = runesListRaw.filter(rune => {
    if (vocation === 'Knight' && rune.name === 'Sudden Death (SD)') {
      return false;
    }
    return true;
  });

  return {
    hp: Math.floor(totalHp),
    mp: Math.floor(totalMp),
    cap: Math.floor(totalCap),
    speed: Math.floor(totalSpeed),
    armor: totalArmor,
    attack: weaponAtk,
    defense: defenseValueUsed,
    minReduction,
    maxReduction,
    maxMelee: Math.floor(maxMelee),
    minMelee,
    avgMelee,
    maxDist: Math.floor(maxDist),
    minDist,
    avgDist,
    protections,
    bonuses,
    skillsBreakdown,
    healthRegenList,
    manaRegenList,
    totalHpRegenPerSec,
    totalMpRegenPerSec,
    runes: runesList,
    critChance: bonuses['crit-hit-chance'] || 0,
    critAmount: bonuses['crit-hit'] || 0,
    lifeLeech: bonuses['life-leech-chance'] || bonuses['life-leech'] || 0,
    lifeLeechChance: bonuses['life-leech-chance'] || bonuses['life-leech'] || 0,
    lifeLeechAmount: bonuses['life-leech-amount'] || bonuses['life-leech'] || 0,
    burningChance: bonuses['burning-chance'] || 0,
    burningAmount: bonuses['burning'] || 0,
    manaLeech: bonuses['mana-leech-chance'] || bonuses['mana-leech'] || 0,
    dodge: bonuses['dodge'] || 0,
    vibrancy: bonuses['vibrancy'] || 0,
    absorbMana: bonuses['absorb-mana'] || 0,
    arrowGuard: bonuses['arrow-guard'] || 0,
    mitigation: bonuses['mitigation'] || 0,
    reflectFire: bonuses['reflect-fire'] || 0,
    reflectEnergy: bonuses['reflect-energy'] || 0,
    reflectPhys: bonuses['reflect-phys-chance'] || bonuses['reflect-phys'] || 0,
    reflectElements: bonuses['reflect-elements'] || 0,
    absorbHealth: bonuses['absorb-health'] || 0,
    totalAttack: weaponAtk,
    maxBlock,
    minBlock,
    avgBlock,
    defenseActiveSkill,
    defenseSkillValue: defenseSkillUsed,
    defenseSource,
    weaponDef,
    shieldDef,
    destructionChance,
    destructionBonusAmount,
    destructionSkillName
  };
}

export interface RarityStyle {
  borderClassName: string;
  badgeColor: string;
  textClassName: string;
  bgClassName: string;
  glow: string;
  label: string;
}

export function getRarityStyles(count: number): RarityStyle {
  switch (count) {
    case 1:
      return {
        borderClassName: "border-stone-100/60 shadow-[0_0_8px_rgba(255,255,255,0.15)]",
        badgeColor: "bg-white/15 text-white border border-white/30",
        textClassName: "text-white font-medium",
        bgClassName: "bg-stone-500/10",
        glow: "rgba(255, 255, 255, 0.15)",
        label: "Raro Comum"
      };
    case 2:
      return {
        borderClassName: "border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.25)]",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        textClassName: "text-emerald-400 font-semibold",
        bgClassName: "bg-emerald-950/20",
        glow: "rgba(16, 185, 129, 0.25)",
        label: "Incomum"
      };
    case 3:
      return {
        borderClassName: "border-blue-500/50 shadow-[0_0_8px_rgba(59,130,246,0.25)]",
        badgeColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        textClassName: "text-blue-400 font-semibold",
        bgClassName: "bg-blue-950/20",
        glow: "rgba(59, 130, 246, 0.25)",
        label: "Raro"
      };
    case 4:
      return {
        borderClassName: "border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.25)]",
        badgeColor: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
        textClassName: "text-purple-400 font-semibold",
        bgClassName: "bg-purple-950/20",
        glow: "rgba(168, 85, 247, 0.25)",
        label: "Épico"
      };
    case 5:
      return {
        borderClassName: "border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]",
        badgeColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        textClassName: "text-amber-400 font-bold",
        bgClassName: "bg-amber-950/20",
        glow: "rgba(245, 158, 11, 0.4)",
        label: "Lendário"
      };
    default:
      return {
        borderClassName: "border-medieval-gold/10",
        badgeColor: "bg-medieval-gold/5 text-medieval-muted border border-medieval-gold/10",
        textClassName: "text-medieval-muted",
        bgClassName: "bg-black/40",
        glow: "none",
        label: "Comum"
      };
  }
}

