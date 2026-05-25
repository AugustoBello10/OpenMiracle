
import { VocationType, StanceType } from '../types/build';

export const VOCATIONS_DATA: Record<VocationType, { hpGain: number; mpGain: number; capGain: number }> = {
  'Knight': { hpGain: 15, mpGain: 5, capGain: 25 },
  'Paladin': { hpGain: 10, mpGain: 15, capGain: 20 },
  'Sorcerer': { hpGain: 5, mpGain: 30, capGain: 10 },
  'Druid': { hpGain: 5, mpGain: 30, capGain: 10 },
};

export const STANCES_MULTIPLIERS: Record<StanceType, { atk: number; def: number }> = {
  'Full Attack': { atk: 1.2, def: 0.6 },
  'Balanced': { atk: 1.0, def: 1.0 },
  'Full Defense': { atk: 0.6, def: 1.8 },
};

export const ENCHANTMENT_SLOTS_BY_CLASS = [0, 1, 2, 3, 4, 5];

export const ATTRIBUTE_TYPES = [
  { id: 'hp', name: 'Max Health', type: 'simple', valueType: 'hp' },
  { id: 'mp', name: 'Max Mana', type: 'simple', valueType: 'mp' },
  { id: 'armor', name: 'Armor', type: 'simple', valueType: 'armor' },
  { id: 'attack', name: 'Attack', type: 'simple', valueType: 'skill' },
  { id: 'magic', name: 'Magic Level', type: 'simple', valueType: 'magic-level' },
  { id: 'melee', name: 'Melee Skill', type: 'simple', valueType: 'skill' },
  { id: 'sword', name: 'Sword Fighting', type: 'simple', valueType: 'skill' },
  { id: 'club', name: 'Club Fighting', type: 'simple', valueType: 'skill' },
  { id: 'axe', name: 'Axe Fighting', type: 'simple', valueType: 'skill' },
  { id: 'distance', name: 'Distance Fighting', type: 'simple', valueType: 'skill' },
  { id: 'shielding', name: 'Shielding Skill', type: 'simple', valueType: 'skill' },
  { id: 'speed', name: 'Speed', type: 'simple', valueType: 'speed' },
  { id: 'weight', name: 'Weight', type: 'simple', valueType: 'weight' },
  { id: 'healing', name: 'Healing', type: 'simple', valueType: 'healing' },
  { id: 'health-regen', name: 'Health Regen', type: 'simple', valueType: 'regen' },
  { id: 'mana-regen', name: 'Mana Regen', type: 'simple', valueType: 'regen' },
  { id: 'mana-healing', name: 'Mana Healing', type: 'simple', valueType: 'mana-healing' },
  { id: 'momentum', name: 'Momentum', type: 'simple', valueType: 'momentum' },
  { id: 'attack-interval', name: 'Attack Interval', type: 'simple', valueType: 'attack-interval' },
  { id: 'life-leech', name: 'Life Leech', type: 'compound', valueType: 'leech' },
  { id: 'mana-leech', name: 'Mana Leech', type: 'compound', valueType: 'leech' },
  { id: 'crit-hit', name: 'Crit Hit', type: 'compound', valueType: 'crit' },
  { id: 'fire-prot', name: 'Fire Protection', type: 'simple', valueType: 'protection' },
  { id: 'ice-prot', name: 'Ice Protection', type: 'simple', valueType: 'protection' },
  { id: 'energy-prot', name: 'Energy Protection', type: 'simple', valueType: 'protection' },
  { id: 'earth-prot', name: 'Earth Protection (Poison)', type: 'simple', valueType: 'protection' },
  { id: 'phys-prot', name: 'Physical Protection', type: 'simple', valueType: 'protection' },
  { id: 'mana-drain-prot', name: 'Mana Drain Protection', type: 'simple', valueType: 'protection' },
  { id: 'elements-prot', name: 'Elements Protection', type: 'simple', valueType: 'protection' },
  { id: 'vibrancy', name: 'Vibrancy', type: 'simple', valueType: 'vibrancy' },
  { id: 'dodge', name: 'Dodge', type: 'simple', valueType: 'dodge' },
  { id: 'absorb-mana', name: 'Absorb Mana', type: 'simple', valueType: 'absorb-mana' },
  { id: 'arrow-guard', name: 'Arrow Guard', type: 'simple', valueType: 'protection' },
  { id: 'defense', name: 'Defense', type: 'simple', valueType: 'skill' },
  { id: 'mitigation', name: 'Mitigation', type: 'simple', valueType: 'protection' },
  { id: 'reflect-fire', name: 'Reflect Fire', type: 'simple', valueType: 'protection' },
  { id: 'reflect-energy', name: 'Reflect Energy', type: 'simple', valueType: 'protection' },
  { id: 'reflect-phys', name: 'Reflect Physical', type: 'simple', valueType: 'protection' },
  { id: 'reflect-elements', name: 'Reflect Elements', type: 'simple', valueType: 'protection' },
  { id: 'absorb-health', name: 'Absorb Health', type: 'simple', valueType: 'leech' },
  { id: 'hitchance', name: 'Hitchance', type: 'simple', valueType: 'skill' },
  { id: 'burning', name: 'Burning', type: 'compound', valueType: 'leech' },
  { id: 'crushing-blow', name: 'Crushing Blow', type: 'simple', valueType: 'skill' },
  { id: 'perforation', name: 'Perfuration', type: 'simple', valueType: 'skill' },
  { id: 'bleeding', name: 'Bleeding', type: 'compound', valueType: 'leech' },
  { id: 'double-bash', name: 'Double Bash', type: 'simple', valueType: 'skill' },
  { id: 'berserk', name: 'Berserk', type: 'simple', valueType: 'skill' },
  { id: 'freeze', name: 'Freeze', type: 'compound', valueType: 'leech' },
  { id: 'electrify', name: 'Electrify', type: 'compound', valueType: 'leech' },
  { id: 'poison', name: 'Poison', type: 'compound', valueType: 'leech' },
  { id: 'crit-spell', name: 'Critical Spell', type: 'compound', valueType: 'crit' },
];

export const DEFAULT_ENCHANT_VALUES = [20, 40, 60, 80, 100]; // HP example
export const DEFAULT_ENCHANT_CHANCES = [5, 10, 15, 20, 25]; // Percentage example
