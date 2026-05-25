
export interface AlchemyRune {
  name: string;
  minSkill: number;
  baseChance: number;
  alchemistOnly: boolean;
}

export const ALCHEMY_RUNES: AlchemyRune[] = [
  { name: "Poison Field", minSkill: 10, baseChance: 100, alchemistOnly: false },
  { name: "Poison Bomb", minSkill: 22, baseChance: 38.46, alchemistOnly: false },
  { name: "Poison Wall", minSkill: 25, baseChance: 31.25, alchemistOnly: false },
  { name: "Fire Field", minSkill: 13, baseChance: 83.33, alchemistOnly: false },
  { name: "Fire Bomb", minSkill: 25, baseChance: 33.33, alchemistOnly: false },
  { name: "Fire Wall", minSkill: 28, baseChance: 25, alchemistOnly: false },
  { name: "Energy Field", minSkill: 19, baseChance: 62.5, alchemistOnly: false },
  { name: "Energy Bomb", minSkill: 40, baseChance: 22.72, alchemistOnly: false },
  { name: "Energy Wall", minSkill: 37, baseChance: 20, alchemistOnly: false },
  { name: "Soulfire", minSkill: 31, baseChance: 33.33, alchemistOnly: false },
  { name: "Envenom", minSkill: 22, baseChance: 50, alchemistOnly: false },
  { name: "Fireball", minSkill: 16, baseChance: 83.33, alchemistOnly: false },
  { name: "Great Fireball", minSkill: 22, baseChance: 41.66, alchemistOnly: false },
  { name: "Light Magic Missile", minSkill: 10, baseChance: 100, alchemistOnly: false },
  { name: "Heavy Magic Missile", minSkill: 13, baseChance: 71.42, alchemistOnly: false },
  { name: "Explosion", minSkill: 28, baseChance: 27.77, alchemistOnly: true },
  { name: "Sudden Death", minSkill: 55, baseChance: 22.72, alchemistOnly: true },
  { name: "Antidote Rune", minSkill: 10, baseChance: 100, alchemistOnly: false },
  { name: "Intense Healing Rune", minSkill: 13, baseChance: 83.33, alchemistOnly: false },
  { name: "Ultimate Healing Rune", minSkill: 22, baseChance: 50, alchemistOnly: true },
  { name: "Convince Creature", minSkill: 25, baseChance: 50, alchemistOnly: false },
  { name: "Animate Dead", minSkill: 22, baseChance: 16.66, alchemistOnly: false },
  { name: "Desintegrate", minSkill: 22, baseChance: 50, alchemistOnly: false },
  { name: "Destroy Field", minSkill: 19, baseChance: 83.33, alchemistOnly: false },
  { name: "Chameleon", minSkill: 22, baseChance: 33.33, alchemistOnly: false },
  { name: "Magic Wall", minSkill: 37, baseChance: 20, alchemistOnly: true },
  { name: "Paralyze", minSkill: 64, baseChance: 8.33, alchemistOnly: true },
];

export const ALCHEMY_CRYSTALS = [
  { name: "Spark Crystal", baseChance: 20, key: "spark" },
  { name: "Lightning Crystal", baseChance: 15, key: "lightning" },
  { name: "Inferno Crystal", baseChance: 10, key: "inferno" },
];
