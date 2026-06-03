
export interface AlchemyRune {
  name: string;
  magicLevel: number;
  minSkill: number;
  baseChance: number;
  alchemistOnly: boolean;
}

export const ALCHEMY_RUNES: AlchemyRune[] = [
  { name: "Poison Field", magicLevel: 0, minSkill: 10, baseChance: 100, alchemistOnly: false },
  { name: "Poison Bomb", magicLevel: 6, minSkill: 22, baseChance: 38.46, alchemistOnly: false },
  { name: "Poison Wall", magicLevel: 11, minSkill: 32, baseChance: 31.25, alchemistOnly: false },
  { name: "Fire Field", magicLevel: 2, minSkill: 14, baseChance: 83.33, alchemistOnly: false },
  { name: "Fire Bomb", magicLevel: 9, minSkill: 28, baseChance: 33.33, alchemistOnly: false },
  { name: "Fire Wall", magicLevel: 11, minSkill: 32, baseChance: 25, alchemistOnly: false },
  { name: "Energy Field", magicLevel: 5, minSkill: 20, baseChance: 62.5, alchemistOnly: false },
  { name: "Energy Bomb", magicLevel: 18, minSkill: 46, baseChance: 22.72, alchemistOnly: false },
  { name: "Energy Wall", magicLevel: 14, minSkill: 38, baseChance: 20, alchemistOnly: false },
  { name: "Soulfire", magicLevel: 13, minSkill: 36, baseChance: 33.33, alchemistOnly: false },
  { name: "Envenom", magicLevel: 11, minSkill: 32, baseChance: 50, alchemistOnly: false },
  { name: "Fireball", magicLevel: 3, minSkill: 16, baseChance: 83.33, alchemistOnly: false },
  { name: "Great Fireball", magicLevel: 9, minSkill: 28, baseChance: 41.66, alchemistOnly: false },
  { name: "Light Magic Missile", magicLevel: 1, minSkill: 12, baseChance: 100, alchemistOnly: false },
  { name: "Heavy Magic Missile", magicLevel: 7, minSkill: 24, baseChance: 71.42, alchemistOnly: false },
  { name: "Explosion", magicLevel: 12, minSkill: 34, baseChance: 27.77, alchemistOnly: true },
  { name: "Sudden Death", magicLevel: 25, minSkill: 60, baseChance: 22.72, alchemistOnly: true },
  { name: "Antidote Rune", magicLevel: 2, minSkill: 14, baseChance: 100, alchemistOnly: false },
  { name: "Intense Healing Rune", magicLevel: 4, minSkill: 18, baseChance: 83.33, alchemistOnly: false },
  { name: "Ultimate Healing Rune", magicLevel: 11, minSkill: 32, baseChance: 50, alchemistOnly: true },
  { name: "Convince Creature", magicLevel: 10, minSkill: 30, baseChance: 50, alchemistOnly: false },
  { name: "Animate Dead", magicLevel: 11, minSkill: 32, baseChance: 16.66, alchemistOnly: false },
  { name: "Desintegrate", magicLevel: 8, minSkill: 26, baseChance: 50, alchemistOnly: false },
  { name: "Destroy Field", magicLevel: 3, minSkill: 16, baseChance: 83.33, alchemistOnly: false },
  { name: "Chameleon", magicLevel: 11, minSkill: 32, baseChance: 33.33, alchemistOnly: false },
  { name: "Magic Wall", magicLevel: 14, minSkill: 38, baseChance: 20, alchemistOnly: true },
  { name: "Paralyze", magicLevel: 27, minSkill: 64, baseChance: 8.33, alchemistOnly: true },
];

export const ALCHEMY_CRYSTALS = [
  { name: "Spark Crystal", baseChance: 20, key: "spark" },
  { name: "Lightning Crystal", baseChance: 15, key: "lightning" },
  { name: "Inferno Crystal", baseChance: 10, key: "inferno" },
];
