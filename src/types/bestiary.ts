export type MonsterStage = 'Normal' | '1 Star' | '2 Stars' | '3 Stars';

export interface MonsterResistances {
  physical: number;
  earth: number;
  fire: number;
  death: number;
  energy: number;
  holy: number;
  ice: number;
  healing: number;
}

export interface MonsterLoot {
  common: string[];
  uncommon: string[];
  semiRare: string[];
  rare: string[];
}

export interface BestiaryEntry {
  id: string; // usually the monster name
  baseHp: number;
  baseXp: number;
  baseSpeed: number;
  baseArmor: number;
  baseCharmPoints: number; // The points given at Normal stage
  resistances: MonsterResistances;
  loot: MonsterLoot;
  locations?: string[]; // map coordinates or descriptions
}

// Utility functions to calculate stats based on the observed mathematical patterns
export function calculateMonsterStats(entry: BestiaryEntry, stage: MonsterStage) {
  const stageMultiplier = stage === 'Normal' ? 1 : stage === '1 Star' ? 2 : stage === '2 Stars' ? 3 : 4;
  const starCount = stage === 'Normal' ? 0 : stage === '1 Star' ? 1 : stage === '2 Stars' ? 2 : 3;

  return {
    hp: entry.baseHp * stageMultiplier,
    xp: entry.baseXp * stageMultiplier,
    armor: Math.ceil(entry.baseArmor * (1 + starCount * 0.5)),
    // Speed seems to have a custom slight increase per star
    speed: Math.floor(entry.baseSpeed + (starCount * (entry.baseSpeed * 0.05))), 
    // Charm points rule: Normal gives X. 1 star: X-10, 2 star: X-5, 3 star: X
    charmPoints: stage === 'Normal' ? entry.baseCharmPoints : entry.baseCharmPoints - ((3 - starCount) * 5)
  };
}
