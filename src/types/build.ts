
export type VocationType = 'Knight' | 'Paladin' | 'Sorcerer' | 'Druid';

export type StanceType = 'Full Attack' | 'Balanced' | 'Full Defense';

export type SlotId = 
  | 'head' | 'necklace' | 'armor' | 'right-hand' | 'left-hand' | 'legs' 
  | 'feet' | 'ring' | 'ammo' | 'backpack' 
  | 'relic-1' | 'relic-2' | 'relic-3' | 'relic-4'
  | 'food-1' | 'food-2' | 'food-3' | 'food-4';

export interface Attribute {
  id: string;
  name: string;
  type: 'simple' | 'compound';
  valueType: 'armor' | 'magic-level' | 'skill' | 'hp' | 'mp' | 'speed' | 'regen' | 'leech' | 'crit' | 'protection';
  category?: string;
}

export interface EnchantmentValue {
  type: string;
  level: number; // 0-4
  amount: number;
  chance?: number;
}

export interface GameItem {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  armor?: number;
  attack?: number;
  defense?: number;
  weight: number;
  attributeClass: number; // 0-5
  allowedAttributes: string[];
  bonuses?: Record<string, number>;
  protections?: Record<string, number>;
  img?: string;
}

export interface Skills {
  melee: number;
  distance: number;
  magic: number;
  shielding: number;
}

export interface BuildState {
  vocation: VocationType;
  level: number;
  skills: Skills;
  stance: StanceType;
  equipment: Partial<Record<SlotId, GameItem>>;
  selectedAttributes: Record<string, EnchantmentValue[]>; // slotId -> enchantments
}
