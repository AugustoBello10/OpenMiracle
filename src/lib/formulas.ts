
/**
 * Fórmulas de Tibia 7.4 para Skill e Build Maker
 */

export type Vocation = 'Knight' | 'Paladin' | 'Sorcerer' | 'Druid';
export type SkillType = 'Melee' | 'Distance' | 'Shielding' | 'Magic Level';

interface SkillConstants {
  base: number;
  multiplier: number;
}

const SKILL_CONSTANTS: Record<Vocation, Record<SkillType, SkillConstants>> = {
  Knight: {
    Melee: { base: 50, multiplier: 1.1 },
    Distance: { base: 30, multiplier: 1.4 },
    Shielding: { base: 100, multiplier: 1.1 },
    'Magic Level': { base: 1600, multiplier: 3.0 },
  },
  Paladin: {
    Melee: { base: 50, multiplier: 1.2 },
    Distance: { base: 30, multiplier: 1.1 },
    Shielding: { base: 100, multiplier: 1.1 },
    'Magic Level': { base: 1600, multiplier: 1.4 },
  },
  Sorcerer: {
    Melee: { base: 50, multiplier: 1.5 },
    Distance: { base: 30, multiplier: 2.0 },
    Shielding: { base: 100, multiplier: 1.5 },
    'Magic Level': { base: 1600, multiplier: 1.1 },
  },
  Druid: {
    Melee: { base: 50, multiplier: 1.5 },
    Distance: { base: 30, multiplier: 2.0 },
    Shielding: { base: 100, multiplier: 1.5 },
    'Magic Level': { base: 1600, multiplier: 1.1 },
  },
};

/**
 * Calcula o total de pontos (hits ou mana) necessários para atingir um determinado skill vindo do 10 (ou 0 para ML).
 */
export function calculateTotalPoints(vocation: Vocation, type: SkillType, targetSkill: number): number {
  const { base, multiplier } = SKILL_CONSTANTS[vocation][type];
  
  if (type === 'Magic Level') {
    // Para ML, a fórmula é base * multiplier^skill
    // Mas o total é a soma de todos os níveis anteriores
    let totalMana = 0;
    for (let i = 0; i < targetSkill; i++) {
      totalMana += Math.floor(base * Math.pow(multiplier, i));
    }
    return totalMana;
  } else {
    // Para Skills, a fórmula é base * multiplier^(skill - 10)
    // O total é a soma de todos os pontos de 10 até targetSkill - 1
    let totalHits = 0;
    for (let i = 10; i < targetSkill; i++) {
      totalHits += Math.floor(base * Math.pow(multiplier, i - 10));
    }
    return totalHits;
  }
}

export interface TrainingWeapon {
  name: string;
  reduction: number; // em percentual, ex: 20 para 20%
  charges: number;
}

export const TRAINING_WEAPONS_DATA: Record<string, TrainingWeapon[]> = {
  'Melee/Distance': [
    { name: 'Shadow', reduction: 20, charges: 21600 },
    { name: 'Inferno', reduction: 20, charges: 10800 },
    { name: 'Lightning', reduction: 15, charges: 7200 },
    { name: 'Spark', reduction: 10, charges: 3600 },
    { name: 'Normal', reduction: 0, charges: 0 },
  ],
  'Magic': [
    { name: 'Shadow', reduction: 20, charges: 14400 },
    { name: 'Inferno', reduction: 20, charges: 7200 },
    { name: 'Lightning', reduction: 15, charges: 5400 },
    { name: 'Spark', reduction: 10, charges: 3600 },
    { name: 'Normal', reduction: 0, charges: 0 },
  ],
  'Shielding': [
    { name: 'Shadow', reduction: 0, charges: 43200 },
    { name: 'Inferno', reduction: 0, charges: 21600 },
    { name: 'Lightning', reduction: 0, charges: 14400 },
    { name: 'Spark', reduction: 0, charges: 7200 },
    { name: 'Normal', reduction: 0, charges: 0 },
  ]
};

/**
 * Calcula o tempo necessário para treinar
 * @param reductions Lista de percentuais de redução (ex: [20, 10] para -20% e -10%)
 */
export function calculateTrainingTime(
  vocation: Vocation,
  type: SkillType,
  currentSkill: number,
  targetSkill: number,
  percentage: number, // % restante para o próximo level (0-100)
  reductions: number[] = []
) {
  const { base, multiplier } = SKILL_CONSTANTS[vocation][type];
  
  // Cálculo do multiplicador de intervalo (multiplicativo)
  // Ex: 20% e 10% -> 1 * 0.8 * 0.9 = 0.72
  const intervalMultiplier = reductions.reduce((acc, red) => acc * (1 - red / 100), 1);
  const baseInterval = 2000; // 2 segundos padrão
  const finalInterval = baseInterval * intervalMultiplier;

  let pointsNeeded = 0;
  
  if (type === 'Magic Level') {
    // Mana para o nível atual
    const manaForCurrent = Math.floor(base * Math.pow(multiplier, currentSkill));
    // Mana restante no nível atual
    pointsNeeded += Math.floor(manaForCurrent * (percentage / 100));
    
    // Mana para os níveis subsequentes
    for (let i = currentSkill + 1; i < targetSkill; i++) {
      pointsNeeded += Math.floor(base * Math.pow(multiplier, i));
    }
    
    return {
      points: pointsNeeded,
      seconds: pointsNeeded * intervalMultiplier, // ML também é afetado pelo intervalo de ataque no Miracle? 
      // Geralmente ML depende de mana spent, mas se a arma de treino gasta mana por hit, o intervalo importa.
      // Se for mana real, o intervalo não importa. 
      // No Miracle, armas de treino de ML costumam gastar cargas por hit.
      interval: finalInterval
    };
  } else {
    // Hits para o nível atual
    const hitsForCurrent = Math.floor(base * Math.pow(multiplier, currentSkill - 10));
    pointsNeeded += Math.floor(hitsForCurrent * (percentage / 100));
    
    for (let i = currentSkill + 1; i < targetSkill; i++) {
      pointsNeeded += Math.floor(base * Math.pow(multiplier, i - 10));
    }
    
    // Tempo = Pontos * (Intervalo / 1000)
    // Para Shielding, assumimos que o player está bloqueando 2 monstros (otimização padrão)
    // Isso significa que ele recebe 2 hits por turno de ataque.
    const effectivePoints = type === 'Shielding' ? pointsNeeded / 2 : pointsNeeded;
    const totalSeconds = effectivePoints * (finalInterval / 1000);
    
    return {
      points: pointsNeeded,
      seconds: totalSeconds,
      interval: finalInterval
    };
  }
}

/**
 * Fórmulas para o Build Maker (Futuro)
 */

export function calculateMinDamage(level: number, skill: number, attack: number): number {
  // Fórmula aproximada Tibia 7.4
  return Math.floor(level / 5); 
}

export function calculateMaxDamage(skill: number, attack: number): number {
  // Max Damage = 0.085 * d * skill * attack (aproximado)
  return Math.floor(0.085 * skill * attack);
}

export function calculateDefense(shielding: number, defense: number): number {
  // Defesa = (Shielding * Defense) / 100 (aproximado)
  return Math.floor((shielding * defense) / 100);
}

/**
 * Calcula os custos de Bless e Morte
 */
export function calculateBlessCosts(level: number) {
  // 5 Blesses Padrão
  const standardBlessPrice = level <= 100 ? 10000 : 10000 + (level - 100) * 100;
  const standardTotal = standardBlessPrice * 5;

  // 6ª Bless (Bless Tome)
  const blessTomePrice = 25000;

  // 7ª Bless (Arcane Guardian)
  const arcaneGuardianPrice = 200 * level;

  // Amulet of Loss
  const aolPrice = 50000;

  const totalBlesses = standardTotal + blessTomePrice + arcaneGuardianPrice;
  const grandTotal = totalBlesses + aolPrice;

  return {
    standardPrice: standardBlessPrice,
    standardTotal,
    blessTomePrice,
    arcaneGuardianPrice,
    aolPrice,
    totalBlesses,
    grandTotal
  };
}
