/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, Sword, Gem, Pickaxe, Wand2, Zap, Twitch, 
  MessageSquare, ExternalLink, Info, Table as TableIcon, 
  TrendingUp, AlertTriangle, Book, Sparkles, Briefcase, 
  ChevronRight, Menu, X, Map, Youtube, Fish, FlaskConical, Utensils, Sprout, Scissors, Users,
  History, Plus, Minus, Check, RefreshCw, Clock, Calendar, Download
} from 'lucide-react';
import { calculateTrainingTime, Vocation, SkillType, TRAINING_WEAPONS_DATA, TrainingWeapon, calculateBlessCosts } from './lib/formulas';
import { Language, translations } from './lib/translations';
import { PROJECT_PATCH_NOTES, SERVER_PATCH_NOTES } from './data/patchNotes';
import { LIBRARY_DATA, LibraryEntry } from './data/library';
import { AlchemyCalculator } from './components/AlchemyCalculator';
import { FarmingCalculator } from './components/FarmingCalculator';
import { CraftingCalculator } from './components/CraftingCalculator';
import { MiningCalculator } from './components/MiningCalculator';

// --- Dados do Banco de Dados Embutido ---
const CRAFT_ITEMS = [
  {
    category: "giantGemsRelics",
    icon: <Gem className="w-5 h-5" />,
    items: [
      { name: "Giant Ruby", multiplier: 2, req: "10 Small Rubys", materials: [{ name: "Small Ruby", amount: 10 }] },
      { name: "Giant Emerald", multiplier: 2, req: "10 Small Emeralds", materials: [{ name: "Small Emerald", amount: 10 }] },
      { name: "Giant Sapphire", multiplier: 2, req: "10 Small Sapphires", materials: [{ name: "Small Sapphire", amount: 10 }] },
      { name: "Giant Amethyst", multiplier: 2, req: "10 Small Amethysts", materials: [{ name: "Small Amethyst", amount: 10 }] },
      { name: "Spiritualist Gem", multiplier: 2, req: "10 Small Spiritualist Gems", materials: [{ name: "Small Spiritualist Gem", amount: 10 }] },
      { name: "Marksman Gem", multiplier: 2, req: "10 Small Marksman Gems", materials: [{ name: "Small Marksman Gem", amount: 10 }] },
      { name: "Sage Gem", multiplier: 2, req: "10 Small Sage Gems", materials: [{ name: "Small Sage Gem", amount: 10 }] },
      { name: "Guardian Gem", multiplier: 2, req: "10 Small Guardian Gems", materials: [{ name: "Small Guardian Gem", amount: 10 }] },
    ]
  },
  {
    category: "toolsPicks",
    icon: <Pickaxe className="w-5 h-5" />,
    items: [
      { name: "Modified Pick", multiplier: 2, req: "1 Pick + 5 Steels", materials: [{ name: "Pick", amount: 1 }, { name: "Steel", amount: 5 }] },
      { name: "Advanced Pick", multiplier: 1.5, req: "1 Pick + 1 Draconian Steel + 10 Steels", materials: [{ name: "Pick", amount: 1 }, { name: "Draconian Steel", amount: 1 }, { name: "Steel", amount: 10 }] },
      { name: "Enhanced Pick", multiplier: 1, req: "1 Pick + 5 Draconian Steels + 20 Steels", materials: [{ name: "Pick", amount: 1 }, { name: "Draconian Steel", amount: 5 }, { name: "Steel", amount: 20 }] },
      { name: "Diamon Knife", multiplier: 1, req: "10 small diamonds + 5 Hell Steels + 1 Combat Knife", materials: [{ name: "Small Diamond", amount: 10 }, { name: "Hell Steel", amount: 5 }, { name: "Combat Knife", amount: 1 }] },
    ]
  },
  {
    category: "rods",
    icon: <Wand2 className="w-5 h-5" />,
    items: [
      { name: "Reinforced Rod", multiplier: 2, req: "1 fishing rod + 5 steels", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 5 }] },
      { name: "Engineered Rod", multiplier: 1.5, req: "1 fishing rod + 10 steels + 1 draconian steel", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 10 }, { name: "Draconian Steel", amount: 1 }] },
      { name: "Volcanic Rod", multiplier: 1, req: "1 fishing rod + 20 steels + 10 glimmering soils + 5 draconian steels + 3 hell steels", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 20 }, { name: "Glimmering Soil", amount: 10 }, { name: "Draconian Steel", amount: 5 }, { name: "Hell Steel", amount: 3 }] },
      { name: "Golden Rod", multiplier: 0.5, req: "1 fishing rod + 40 steels + 10 draconian steels + 3 gold ingot + 3 hell steels", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 40 }, { name: "Draconian Steel", amount: 10 }, { name: "Gold Ingot", amount: 3 }, { name: "Hell Steel", amount: 3 }] },
    ]
  },
  {
    category: "mysticRunes",
    icon: <Zap className="w-5 h-5" />,
    items: [
      { name: "Ember Rune", multiplier: 1, req: "5 Ember Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Ember Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1 }] },
      { name: "Protector Rune", multiplier: 1, req: "5 Protector Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Protector Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1 }] },
      { name: "Obsidian Rune", multiplier: 1, req: "5 Protector Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Protector Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1 }] },
      { name: "Astral Rune", multiplier: 1, req: "5 Astral Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Astral Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1 }] },
      { name: "Aegis Rune", multiplier: 1, req: "5 Aegis Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Aegis Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1 }] },
      { name: "Molten Rune", multiplier: 1, req: "5 Molten Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Molten Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1 }] },
    ]
  },
  {
    category: "ammunition",
    icon: <Sword className="w-5 h-5" />,
    items: [
      { name: "10x Steel Bolts", multiplier: 2, req: "10 bolt + 1 steel", materials: [{ name: "Bolt", amount: 10 }, { name: "Steel", amount: 1 }] },
    ]
  },
  {
    category: "others",
    icon: <Sword className="w-5 h-5" />,
    items: [
      { name: "Fiery Stone", multiplier: 0.5, req: "5 Glimmering Soils", materials: [{ name: "Glimmering Soil", amount: 5 }] },
    ]
  }
];

const BREAKING_DATA = [
  {
    category: "swords",
    items: [
      { item: "Short Sword", max: 1, min: 0, mathAvg: "0.5 Steels", practicalAvg: "0.27 Steels", verdict: "Vender NPC ou UPAR SKILL", minSkill: 10 },
      { item: "Sword", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "Vender NPC", minSkill: 10 },
      { item: "Longsword", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
    ]
  },
  {
    category: "axes",
    items: [
      { item: "Hand Axe", max: 1, min: 0, mathAvg: "0.33 Steels", practicalAvg: "33% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Axe", max: 1, min: 0, mathAvg: "0.58 Steels", practicalAvg: "58% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Hatchet", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "-", verdict: "Em testes", minSkill: 10 },
      { item: "Golden Sickle", max: "2 Steels, 1 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 10 },
      { item: "Battle Axe", max: 8, min: 0, mathAvg: "4 Steels", practicalAvg: "-", verdict: "Em testes", minSkill: 10 },
      { item: "Orcish Axe", max: "2 Steels, 3 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Barbarian Axe", max: "2 Steels, 3 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Obsidian Lance", max: "4 Steels, 7 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Double Axe", max: "12 Steels, 2 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Daramanian Waraxe", max: "12 Steels, 8 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Halberd", max: "7 Steels, 5 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Naginata", max: "10 Steels, 12 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Dwarven Axe", max: "5 Steels, 4 Drac, 6 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
      { item: "Knight Axe", max: "8 Drac, 12 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
      { item: "Fire Axe", max: "30 Drac, 50 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
      { item: "Twin Axe", max: "100 Drac, 80 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
      { item: "Guardian Halberd", max: "30 Drac, 40 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
      { item: "Dragon Lance", max: "40 Drac, 50 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
      { item: "Ravager Axe", max: "100 Drac, 90 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
      { item: "Stonecutter Axe", max: "150 Drac, 150 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
    ]
  },
  {
    category: "clubs",
    items: [
      { item: "Mace", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.10 Steels", verdict: "Vender NPC", minSkill: 10 },
    ]
  },
  {
    category: "shields",
    items: [
      { item: "Plate Shield", max: 3, min: 0, mathAvg: "1.5 Steels", practicalAvg: "1.52 Steels", verdict: "Vender NPC", minSkill: 10 },
      { item: "Dwarven Shield", max: 8, min: 0, mathAvg: "4 Steels", practicalAvg: "4.35 Steels", verdict: "QUEBRAR PARA MATERIAL", minSkill: 20 },
      { item: "Steel Shield", max: 6, min: 0, mathAvg: "3 Steels", practicalAvg: "2.90 Steels", verdict: "Vender NPC OU COLETAR MAT RAPIDO", minSkill: 20 },
      { item: "Wooden Shield", max: 1, min: 0, mathAvg: "0.41 Steels", practicalAvg: "41% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Cooper Shield", max: 1, min: 0, mathAvg: "0.83 Steels", practicalAvg: "83% chance", verdict: "Vender NPC", minSkill: 10 },
      { item: "Dark Shield", max: 5, min: 5, mathAvg: "5 Steels", practicalAvg: "5.00 Steels", verdict: "QUEBRAR", minSkill: 20 },
    ]
  },
  {
    category: "armors",
    items: [
      { item: "Studded Armor", max: 1, min: 0, mathAvg: "1 Steel", practicalAvg: "0.47 Steels", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Chain Armor", max: 5, min: 0, mathAvg: "2.5 Steels", practicalAvg: "2.60 Steels", verdict: "Vender NPC OU COLETAR MAT RAPIDO", minSkill: 10 },
      { item: "Scale Armor", max: 6, min: 6, mathAvg: "6 Steels", practicalAvg: "6.00 Steels", verdict: "QUEBRAR", minSkill: 10 },
      { item: "Chain Legs", max: 2, min: 2, mathAvg: "2 Steels", practicalAvg: "2.00 Steels", verdict: "QUEBRAR", minSkill: 10 },
    ]
  },
  {
    category: "helmets",
    items: [
      { item: "Chain Helmet", max: 1, min: 0, mathAvg: "0.5 Steel", practicalAvg: "0.50 Steels", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Soldier Helmet", max: 1, min: 1, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "QUEBRAR", minSkill: 10 },
      { item: "Studded Helmet", max: 1, min: 0, mathAvg: "0.16 Steels", practicalAvg: "16% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Legion Helmet", max: 1, min: 0, mathAvg: "0.66 Steels", practicalAvg: "66% chance", verdict: "QUEBRAR", minSkill: 10 },
      { item: "Scythe", max: 1, min: 1, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "QUEBRAR", minSkill: 10 },
      { item: "Knife", max: 1, min: 0, mathAvg: "0.083 Steels", practicalAvg: "8.3% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Combat Knife", max: 1, min: 0, mathAvg: "0.083 Steels", practicalAvg: "8.3% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Dagger", max: 1, min: 0, mathAvg: "0.16 Steels", practicalAvg: "16% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Machete", max: 1, min: 0, mathAvg: "0.5 Steels", practicalAvg: "50% chance", verdict: "QUEBRAR", minSkill: 10 },
    ]
  }
];

const ATTRIBUTE_CHANCES: Record<string, number[]> = {
  "Armor": [10, 8, 6, 4, 2],
  "Weight": [10, 8, 6, 4, 2],
  "Max Health": [10, 8, 6, 4, 2],
  "Max Mana": [10, 8, 6, 4, 2],
  "Axe Fighting": [8, 6, 4, 2, 1],
  "Club Fighting": [8, 6, 4, 2, 1],
  "Sword Fighting": [8, 6, 4, 2, 1],
  "Distance Fighting": [8, 6, 4, 2, 1],
  "Shielding": [8, 6, 4, 2, 1],
  "Magic Level": [8, 6, 4, 2],
  "Speed": [6, 4, 2, 1],
  "Healing": [6, 4, 2, 1],
  "Mana Healing": [6, 4, 2],
  "Health Regen": [6, 4, 2, 1, 0.5],
  "Mana Regen": [6, 4, 2, 1],
  "Protect Fire": [6, 4, 2, 1, 0.5],
  "Protect Ice": [6, 4, 2, 1, 0.5],
  "Protect Energy": [6, 4, 2, 1, 0.5],
  "Protect Poison": [6, 4],
  "Protect Physical": [6, 4, 2, 1, 0.5],
  "Protect Mana Drain": [6, 4, 2],
  "Protect Elements": [6, 4, 2, 1, 0.5],
  "Momentum": [6, 4, 2, 1],
  "Attack Interval": [6, 4, 2],
  "Absorb Mana": [6, 4, 2, 1],
  "Dodge": [6, 4],
  "Vibrancy": [6, 4, 2, 1],
  "Defense": [10, 8, 6, 4, 2],
  "Arrow Guard": [8, 6, 4, 2, 1],
  "Mitigation": [6, 4, 2, 1, 0.5],
  "Reflect Physical": [6, 4, 2, 1, 0.5],
  "Reflect Elements": [6, 4, 2, 1, 0.5],
  "Reflect Fire": [6, 4, 2, 1, 0.5],
  "Absorb Health": [6, 4, 2],
  "Attack": [10, 8, 6, 4, 2],
  "Hitchance": [10, 8, 6, 4, 2],
  "Critical Hit": [6, 4, 2],
  "Burning": [6, 4, 2],
  "Life Leech": [6, 4, 2],
  "Perfuration": [10, 8, 6, 4, 2],
  "Bleeding": [6, 4],
  "Freeze": [6, 4, 2],
  "Berserk": [6, 4, 2, 1, 0.5],
  "Double Bash": [6, 4, 2, 1, 0.5],
  "Poison": [6, 4],
  "Mana Leech": [6, 4, 2, 1, 0.5],
  "Critical Spell": [6, 4, 2, 1, 0.5],
  "Crushing Blow": [10, 8, 6, 4, 2],
  "Electrify": [6, 4, 2, 1, 0.5]
};

interface AttributeItem {
  name: string;
  class: number;
  attributes: string[];
}

// Banco de Dados de Atributos
const ATTRIBUTE_DATA: Record<string, AttributeItem[]> = {
  "Helmets": [
    { "name": "Mystic Turban", "class": 1, "attributes": ["Max Mana", "Magic Level", "Mana Healing"] },
    { "name": "Legion Helmet", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Viking Helmet", "class": 1, "attributes": ["Armor", "Weight", "Axe Fighting", "Club Fighting", "Distance Fighting", "Sword Fighting"] },
    { "name": "Iron Helmet", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Soldier Helmet", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Hat Of The Mad", "class": 2, "attributes": ["Max Mana", "Mana Regen", "Magic Level", "Mana Healing"] },
    { "name": "Wood Cape", "class": 2, "attributes": ["Speed", "Max Health", "Distance Fighting", "Protect Poison", "Attack Interval"] },
    { "name": "Dwarven Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire", "Protect Physical"] },
    { "name": "Dark Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Mana", "Protect Physical"] },
    { "name": "Steel Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Strange Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Mana", "Magic Level"] },
    { "name": "Amazon Helmet", "class": 2, "attributes": ["Armor", "Speed", "Weight", "Healing", "Max Health", "Distance Fighting", "Protect Energy", "Protect Physical"] },
    { "name": "Crown Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Health Regen", "Protect Physical"] },
    { "name": "Beholder Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Mana", "Mana Regen", "Magic Level", "Protect Mana Drain"] },
    { "name": "Devil Helmet", "class": 2, "attributes": ["Armor", "Speed", "Weight", "Max Health", "Magic Level", "Protect Mana Drain"] },
    { "name": "Ancient Tiara", "class": 3, "attributes": ["Armor", "Healing", "Max Mana", "Momentum", "Mana Regen", "Magic Level", "Health Regen", "Protect Fire", "Protect Mana Drain"] },
    { "name": "Magician Hat", "class": 3, "attributes": ["Max Mana", "Momentum", "Mana Regen", "Magic Level", "Mana Healing", "Protect Energy", "Protect Mana Drain"] },
    { "name": "Ceremonial Mask", "class": 3, "attributes": ["Speed", "Max Health", "Distance Fighting", "Magic Level", "Protect Fire", "Attack Interval"] },
    { "name": "Crusader Helmet", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Protect Physical"] },
    { "name": "Warrior Helmet", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Sword Fighting", "Shielding", "Protect Physical"] },
    { "name": "Frozen Helmet", "class": 3, "attributes": ["Armor", "Speed", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Protect Ice", "Sword Fighting", "Health Regen"] },
    { "name": "Royal Helmet", "class": 3, "attributes": ["Armor", "Speed", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Physical"] },
    { "name": "Winged Helmet", "class": 4, "attributes": ["Armor", "Speed", "Weight", "Healing", "Max Health", "Distance Fighting", "Health Regen", "Shielding", "Protect Energy", "Protect Physical"] },
    { "name": "Demon Helmet", "class": 4, "attributes": ["Armor", "Speed", "Weight", "Max Mana", "Momentum", "Axe Fighting", "Mana Regen", "Max Health", "Club Fighting", "Distance Fighting", "Magic Level", "Sword Fighting", "Health Regen", "Protect Fire", "Protect Energy"] },
    { "name": "Dragon Scale Helmet", "class": 4, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Fire", "Shielding", "Protect Physical"] },
    { "name": "Helmet Of The Ancients", "class": 5, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Fire", "Shielding", "Protect Physical"] },
    { "name": "Horned Helmet", "class": 5, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Fire", "Shielding", "Protect Physical"] },
    { "name": "Golden Helmet", "class": 5, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Shielding", "Protect Elements", "Protect Physical"] }
  ],
  "Armors": [
    { "name": "Brass Armor", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Red Robe", "class": 2, "attributes": ["Max Mana", "Magic Level", "Health Regen", "Protect Fire"] },
    { "name": "Scale Armor", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Elven Mail", "class": 2, "attributes": ["Armor", "Weight", "Max Mana", "Mana Regen", "Magic Level", "Protect Mana Drain"] },
    { "name": "Plate Armor", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Dwarven Armor", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire", "Protect Physical"] },
    { "name": "Dark Armor", "class": 2, "attributes": ["Armor", "Weight", "Max Mana", "Protect Physical"] },
    { "name": "Noble Armor", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Blue Robe", "class": 3, "attributes": ["Speed", "Max Mana", "Mana Regen", "Absorb Mana", "Magic Level"] },
    { "name": "Knight Armor", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Sword Fighting", "Shielding", "Protect Physical"] },
    { "name": "Crown Armor", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Shielding", "Protect Physical"] },
    { "name": "Amazon Armor", "class": 3, "attributes": ["Armor", "Speed", "Weight", "Healing", "Max Health", "Distance Fighting", "Protect Energy", "Protect Physical"] },
    { "name": "Golden Armor", "class": 4, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Shielding", "Protect Elements", "Protect Physical"] },
    { "name": "Spectral Robe", "class": 4, "attributes": ["Speed", "Max Mana", "Mana Regen", "Absorb Mana", "Magic Level", "Protect Physical"] },
    { "name": "Dragon Scale Mail", "class": 4, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Fire", "Shielding", "Protect Physical"] },
    { "name": "Demon Armor", "class": 5, "attributes": ["Armor", "Speed", "Weight", "Max Mana", "Axe Fighting", "Mana Regen", "Max Health", "Club Fighting", "Distance Fighting", "Magic Level", "Sword Fighting", "Health Regen", "Protect Fire", "Protect Energy", "Protect Mana Drain"] },
    { "name": "Magic Plate Armor", "class": 5, "attributes": ["Armor", "Weight", "Healing", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Shielding", "Protect Physical"] }
  ],
  "Legs": [
    { "name": "Elven Legs", "class": 1, "attributes": ["Armor", "Weight", "Max Mana", "Mana Regen", "Magic Level", "Protect Mana Drain"] },
    { "name": "Brass Legs", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Dwarven Legs", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire", "Protect Physical"] },
    { "name": "Plate Legs", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Knight Legs", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Sword Fighting", "Protect Physical"] },
    { "name": "Crown Legs", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Physical"] },
    { "name": "Golden Legs", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Energy", "Protect Physical"] },
    { "name": "Frozen Legs", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Protect Ice", "Sword Fighting", "Health Regen", "Protect Physical"] },
    { "name": "Dragon Scale Legs", "class": 4, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Fire", "Protect Physical"] },
    { "name": "Demon Legs", "class": 3, "attributes": ["Armor", "Speed", "Weight", "Max Mana", "Axe Fighting", "Mana Regen", "Max Health", "Club Fighting", "Distance Fighting", "Magic Level", "Sword Fighting", "Health Regen", "Protect Fire", "Protect Energy", "Protect Mana Drain"] }
  ],
  "Boots": [
    { "name": "Boots Of Haste", "class": 2, "attributes": ["Armor", "Dodge", "Speed", "Vibrancy"] },
    { "name": "Bunnyslippers", "class": 2, "attributes": ["Armor", "Mana Regen", "Magic Level", "Protect Ice", "Health Regen"] },
    { "name": "Leather Boots", "class": 1, "attributes": ["Armor", "Speed", "Vibrancy"] },
    { "name": "Patched Boots", "class": 2, "attributes": ["Armor", "Speed", "Vibrancy"] },
    { "name": "Steel Boots", "class": 3, "attributes": ["Armor", "Vibrancy", "Protect Fire", "Protect Physical"] },
    { "name": "Frozen Boots", "class": 3, "attributes": ["Armor", "Vibrancy", "Protect Ice", "Protect Physical"] },
    { "name": "Golden Boots", "class": 4, "attributes": ["Armor", "Healing", "Vibrancy", "Health Regen", "Protect Energy", "Protect Physical"] }
  ],
  "Shields": [
    { "name": "Wooden Shield", "class": 1, "attributes": ["Weight", "Defense", "Arrow Guard"] },
    { "name": "Studded Shield", "class": 1, "attributes": ["Weight", "Defense", "Arrow Guard"] },
    { "name": "Brass Shield", "class": 1, "attributes": ["Weight", "Defense", "Arrow Guard"] },
    { "name": "Plate Shield", "class": 1, "attributes": ["Weight", "Defense", "Arrow Guard"] },
    { "name": "Black Shield", "class": 1, "attributes": ["Weight", "Defense", "Arrow Guard"] },
    { "name": "Copper Shield", "class": 1, "attributes": ["Weight", "Defense", "Arrow Guard"] },
    { "name": "Bone Shield", "class": 2, "attributes": ["Weight", "Defense", "Arrow Guard", "Shielding"] },
    { "name": "Steel Shield", "class": 2, "attributes": ["Weight", "Defense", "Arrow Guard", "Shielding"] },
    { "name": "Viking Shield", "class": 2, "attributes": ["Weight", "Defense", "Axe Fighting", "Club Fighting", "Sword Fighting"] },
    { "name": "Ornamented Shield", "class": 2, "attributes": ["Weight", "Defense", "Arrow Guard", "Shielding"] },
    { "name": "Battle Shield", "class": 2, "attributes": ["Weight", "Defense", "Axe Fighting", "Club Fighting", "Sword Fighting"] },
    { "name": "Scarab Shield", "class": 2, "attributes": ["Weight", "Defense", "Arrow Guard"] },
    { "name": "Dark Shield", "class": 2, "attributes": ["Weight", "Defense", "Arrow Guard", "Shielding"] },
    { "name": "Dwarven Shield", "class": 2, "attributes": ["Weight", "Defense", "Arrow Guard", "Shielding"] },
    { "name": "Rose Shield", "class": 2, "attributes": ["Weight", "Defense", "Healing", "Arrow Guard", "Shielding"] },
    { "name": "Ancient Shield", "class": 2, "attributes": ["Weight", "Defense", "Arrow Guard", "Shielding"] },
    { "name": "Castle Shield", "class": 2, "attributes": ["Weight", "Defense", "Arrow Guard", "Shielding"] },
    { "name": "Beholder Shield", "class": 2, "attributes": ["Weight", "Defense", "Magic Level", "Protect Poison", "Protect Mana Drain"] },
    { "name": "Griffin Shield", "class": 2, "attributes": ["Weight", "Defense", "Distance Fighting"] },
    { "name": "Guardian Shield", "class": 3, "attributes": ["Weight", "Defense", "Arrow Guard", "Mitigation", "Shielding", "Protect Physical"] },
    { "name": "Eagle Shield", "class": 3, "attributes": ["Weight", "Defense", "Distance Fighting", "Arrow Guard", "Mitigation", "Shielding"] },
    { "name": "Dragon Shield", "class": 3, "attributes": ["Weight", "Defense", "Arrow Guard", "Mitigation", "Protect Fire", "Shielding", "Protect Physical"] },
    { "name": "Frozen Shield", "class": 3, "attributes": ["Weight", "Defense", "Axe Fighting", "Club Fighting", "Distance Fighting", "Arrow Guard", "Mitigation", "Protect Ice", "Sword Fighting", "Shielding", "Protect Physical"] },
    { "name": "Amazon Shield", "class": 3, "attributes": ["Weight", "Defense", "Healing", "Distance Fighting", "Arrow Guard", "Mitigation", "Shielding", "Protect Energy", "Protect Physical"] },
    { "name": "Crown Shield", "class": 3, "attributes": ["Weight", "Defense", "Axe Fighting", "Club Fighting", "Distance Fighting", "Arrow Guard", "Mitigation", "Sword Fighting", "Shielding", "Protect Physical"] },
    { "name": "Tower Shield", "class": 3, "attributes": ["Weight", "Defense", "Arrow Guard", "Mitigation", "Shielding", "Protect Physical"] },
    { "name": "Shield Of Honour", "class": 3, "attributes": ["Weight", "Defense", "Arrow Guard", "Mitigation", "Shielding", "Protect Physical"] },
    { "name": "Medusa Shield", "class": 3, "attributes": ["Weight", "Defense", "Arrow Guard", "Magic Level", "Mitigation", "Shielding", "Protect Mana Drain"] },
    { "name": "Vampire Shield", "class": 3, "attributes": ["Weight", "Defense", "Arrow Guard", "Mitigation", "Shielding", "Absorb Health"] },
    { "name": "Phoenix Shield", "class": 3, "attributes": ["Weight", "Defense", "Arrow Guard", "Mitigation", "Protect Fire", "Reflect Fire", "Shielding"] },
    { "name": "Demon Shield", "class": 4, "attributes": ["Weight", "Defense", "Absorb Mana", "Arrow Guard", "Magic Level", "Protect Fire", "Shielding", "Protect Mana Drain"] },
    { "name": "Tempest Shield", "class": 4, "attributes": ["Weight", "Defense", "Arrow Guard", "Mitigation", "Shielding", "Protect Energy", "Reflect Energy"] },
    { "name": "Mastermind Shield", "class": 4, "attributes": ["Weight", "Defense", "Axe Fighting", "Club Fighting", "Distance Fighting", "Arrow Guard", "Mitigation", "Sword Fighting", "Shielding", "Protect Physical"] },
    { "name": "Great Shield", "class": 4, "attributes": ["Weight", "Defense", "Axe Fighting", "Club Fighting", "Distance Fighting", "Arrow Guard", "Mitigation", "Sword Fighting", "Protect Fire", "Shielding", "Protect Physical", "Reflect Physical"] },
    { "name": "Blessed Shield", "class": 5, "attributes": ["Weight", "Defense", "Axe Fighting", "Club Fighting", "Distance Fighting", "Arrow Guard", "Mitigation", "Sword Fighting", "Shielding", "Protect Elements", "Protect Physical", "Reflect Elements", "Reflect Physical"] }
  ],
  "Quivers": [
    { "name": "Quiver", "class": 1, "attributes": ["Distance Fighting", "Attack Interval"] },
    { "name": "Iron Quiver", "class": 1, "attributes": ["Armor", "Distance Fighting", "Attack Interval"] },
    { "name": "Dragon Quiver", "class": 2, "attributes": ["Armor", "Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Imperial Quiver", "class": 2, "attributes": ["Armor", "Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval", "Protect Physical"] },
    { "name": "Blazing Quiver", "class": 3, "attributes": ["Attack", "Burning", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Deadly Quiver", "class": 3, "attributes": ["Attack", "Hitchance", "Life Leech", "Distance Fighting", "Magic Level", "Critical Hit", "Attack Interval"] },
    { "name": "Quiver Of Valor", "class": 3, "attributes": ["Armor", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval", "Protect Physical"] }
  ],
  "Axes": [
    { "name": "Sickle", "class": 1, "attributes": ["Attack", "Perfuration", "Attack Interval"] },
    { "name": "Hand Axe", "class": 1, "attributes": ["Attack", "Perfuration", "Attack Interval"] },
    { "name": "Axe", "class": 1, "attributes": ["Attack", "Perfuration", "Attack Interval"] },
    { "name": "Golden Sickle", "class": 1, "attributes": ["Attack", "Perfuration", "Attack Interval"] },
    { "name": "Hatchet", "class": 1, "attributes": ["Attack", "Perfuration", "Attack Interval"] },
    { "name": "Daramanian Axe", "class": 1, "attributes": ["Attack", "Perfuration", "Attack Interval"] },
    { "name": "Orcish Axe", "class": 2, "attributes": ["Attack", "Axe Fighting", "Perfuration", "Attack Interval"] },
    { "name": "Battle Axe", "class": 1, "attributes": ["Attack", "Weight", "Critical Hit", "Perfuration"] },
    { "name": "Barbarian Axe", "class": 2, "attributes": ["Attack", "Axe Fighting", "Perfuration", "Attack Interval"] },
    { "name": "Dwarven Axe", "class": 3, "attributes": ["Attack", "Axe Fighting", "Perfuration", "Attack Interval"] },
    { "name": "Knight Axe", "class": 3, "attributes": ["Attack", "Berserk", "Axe Fighting", "Life Leech", "Perfuration", "Attack Interval"] },
    { "name": "Obsidian Lance", "class": 2, "attributes": ["Attack", "Weight", "Bleeding", "Axe Fighting", "Critical Hit", "Perfuration"] },
    { "name": "Double Axe", "class": 2, "attributes": ["Attack", "Weight", "Axe Fighting", "Critical Hit", "Perfuration"] },
    { "name": "Halberd", "class": 2, "attributes": ["Attack", "Weight", "Axe Fighting", "Critical Hit", "Perfuration"] },
    { "name": "Crystal Axe", "class": 3, "attributes": ["Attack", "Freeze", "Berserk", "Axe Fighting", "Life Leech", "Perfuration", "Attack Interval"] },
    { "name": "Fire Axe", "class": 3, "attributes": ["Attack", "Berserk", "Burning", "Axe Fighting", "Life Leech", "Perfuration", "Attack Interval"] },
    { "name": "Daramanian Waraxe", "class": 2, "attributes": ["Attack", "Weight", "Axe Fighting", "Critical Hit", "Perfuration"] },
    { "name": "Naginata", "class": 2, "attributes": ["Attack", "Weight", "Bleeding", "Axe Fighting", "Critical Hit", "Perfuration"] },
    { "name": "Twin Axe", "class": 3, "attributes": ["Attack", "Weight", "Berserk", "Axe Fighting", "Life Leech", "Critical Hit", "Perfuration"] },
    { "name": "Guardian Halberd", "class": 3, "attributes": ["Attack", "Weight", "Berserk", "Defense", "Axe Fighting", "Life Leech", "Critical Hit", "Perfuration"] },
    { "name": "Dragon Lance", "class": 3, "attributes": ["Attack", "Weight", "Berserk", "Bleeding", "Axe Fighting", "Life Leech", "Critical Hit", "Perfuration"] },
    { "name": "War Axe", "class": 3, "attributes": ["Attack", "Weight", "Berserk", "Axe Fighting", "Life Leech", "Critical Hit", "Perfuration"] },
    { "name": "Ravager's Axe", "class": 3, "attributes": ["Attack", "Weight", "Berserk", "Axe Fighting", "Life Leech", "Critical Hit", "Perfuration"] },
    { "name": "Stonecutter Axe", "class": 5, "attributes": ["Attack", "Berserk", "Axe Fighting", "Life Leech", "Perfuration", "Attack Interval"] },
    { "name": "Great Axe", "class": 4, "attributes": ["Attack", "Weight", "Berserk", "Axe Fighting", "Life Leech", "Critical Hit", "Perfuration"] }
  ],
  "Swords": [
    { "name": "Knife", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Dagger", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Combat Knife", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Silver Dagger", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Rapier", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Short Sword", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Sabre", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Sword", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Bone Sword", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Carlin Sword", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Heavy Machete", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Katana", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Longsword", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Poison Dagger", "class": 1, "attributes": ["Attack", "Poison", "Defense", "Attack Interval"] },
    { "name": "Scimitar", "class": 1, "attributes": ["Attack", "Defense", "Attack Interval"] },
    { "name": "Spike Sword", "class": 2, "attributes": ["Attack", "Defense", "Sword Fighting", "Perfuration", "Attack Interval"] },
    { "name": "Broadsword", "class": 1, "attributes": ["Attack", "Weight", "Defense", "Critical Hit"] },
    { "name": "Serpent Sword", "class": 2, "attributes": ["Attack", "Poison", "Defense", "Sword Fighting", "Attack Interval"] },
    { "name": "Two Handed Sword", "class": 2, "attributes": ["Attack", "Weight", "Defense", "Sword Fighting", "Critical Hit"] },
    { "name": "Fire Sword", "class": 3, "attributes": ["Attack", "Burning", "Defense", "Life Leech", "Double Bash", "Sword Fighting", "Attack Interval"] },
    { "name": "Bright Sword", "class": 3, "attributes": ["Attack", "Defense", "Life Leech", "Double Bash", "Sword Fighting", "Attack Interval"] },
    { "name": "Crystal Sword", "class": 3, "attributes": ["Attack", "Defense", "Life Leech", "Double Bash", "Sword Fighting", "Attack Interval"] },
    { "name": "Djinn Blade", "class": 4, "attributes": ["Attack", "Defense", "Life Leech", "Double Bash", "Sword Fighting", "Attack Interval"] },
    { "name": "Pharaoh Sword", "class": 4, "attributes": ["Attack", "Defense", "Life Leech", "Double Bash", "Sword Fighting", "Attack Interval"] },
    { "name": "Giant Sword", "class": 3, "attributes": ["Attack", "Weight", "Defense", "Life Leech", "Sword Fighting", "Critical Hit"] },
    { "name": "Magic Sword", "class": 5, "attributes": ["Attack", "Defense", "Life Leech", "Mana Leech", "Double Bash", "Magic Level", "Sword Fighting", "Attack Interval"] },
    { "name": "Warlord Sword", "class": 4, "attributes": ["Attack", "Weight", "Defense", "Life Leech", "Sword Fighting", "Critical Hit"] },
    { "name": "Magic Longsword", "class": 5, "attributes": ["Attack", "Weight", "Defense", "Life Leech", "Mana Leech", "Magic Level", "Sword Fighting", "Critical Hit", "Perfuration", "Critical Spell"] }
  ],
  "Clubs": [
    { "name": "Club", "class": 1, "attributes": ["Attack", "Crushing Blow", "Attack Interval"] },
    { "name": "Studded Club", "class": 1, "attributes": ["Attack", "Crushing Blow", "Attack Interval"] },
    { "name": "Bone Club", "class": 1, "attributes": ["Attack", "Crushing Blow", "Attack Interval"] },
    { "name": "Golden Mace", "class": 1, "attributes": ["Attack", "Crushing Blow", "Attack Interval"] },
    { "name": "Mace", "class": 1, "attributes": ["Attack", "Crushing Blow", "Attack Interval"] },
    { "name": "Iron Hammer", "class": 1, "attributes": ["Attack", "Crushing Blow", "Attack Interval"] },
    { "name": "Daramanian Mace", "class": 2, "attributes": ["Attack", "Club Fighting", "Crushing Blow", "Attack Interval"] },
    { "name": "Battle Hammer", "class": 2, "attributes": ["Attack", "Club Fighting", "Crushing Blow", "Attack Interval"] },
    { "name": "Giant Smithhammer", "class": 2, "attributes": ["Attack", "Club Fighting", "Crushing Blow", "Attack Interval"] },
    { "name": "Morning Star", "class": 2, "attributes": ["Attack", "Club Fighting", "Crushing Blow", "Attack Interval"] },
    { "name": "Clerical Mace", "class": 2, "attributes": ["Attack", "Club Fighting", "Crushing Blow", "Attack Interval"] },
    { "name": "Dragon Hammer", "class": 3, "attributes": ["Attack", "Life Leech", "Club Fighting", "Crushing Blow", "Attack Interval"] },
    { "name": "Skull Staff", "class": 3, "attributes": ["Attack", "Mana Leech", "Club Fighting", "Magic Level", "Attack Interval"] },
    { "name": "Silver Mace", "class": 4, "attributes": ["Attack", "Life Leech", "Club Fighting", "Crushing Blow", "Attack Interval"] },
    { "name": "Crystal Mace", "class": 4, "attributes": ["Attack", "Life Leech", "Club Fighting", "Crushing Blow", "Attack Interval"] },
    { "name": "War Hammer", "class": 3, "attributes": ["Attack", "Weight", "Life Leech", "Club Fighting", "Critical Hit", "Crushing Blow"] },
    { "name": "Hammer Of Wrath", "class": 3, "attributes": ["Attack", "Weight", "Life Leech", "Club Fighting", "Critical Hit", "Crushing Blow"] },
    { "name": "Thunder Hammer", "class": 5, "attributes": ["Attack", "Electrify", "Life Leech", "Mana Leech", "Club Fighting", "Magic Level", "Crushing Blow", "Attack Interval"] },
    { "name": "Arcane Staff", "class": 4, "attributes": ["Attack", "Mana Leech", "Club Fighting", "Magic Level", "Critical Spell"] }
  ],
  "Distance": [
    { "name": "Bow", "class": 1, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Elvish Bow", "class": 1, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "War Bow", "class": 2, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Frozen Bow", "class": 2, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Armored War Bow", "class": 2, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Sapphire Bow", "class": 3, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Crossbow", "class": 1, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Steel Crossbow", "class": 1, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Bone Crossbow", "class": 2, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Crystallized Crossbow", "class": 2, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Royal Crossbow", "class": 2, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] },
    { "name": "Evil Crossbow", "class": 3, "attributes": ["Attack", "Hitchance", "Distance Fighting", "Critical Hit", "Attack Interval"] }
  ]
};

type Tab = 'home' | 'calculadoras' | 'profissoes' | 'mapa' | 'eventos' | 'wiki';

// --- Componente Calculadora de Skills ---
function SkillCalculator({ 
  vocation, setVocation, 
  skillType, setSkillType, 
  currentSkill, setCurrentSkill, 
  targetSkill, setTargetSkill, 
  skillPercentage, setSkillPercentage,
  t
}: any) {
  const [weaponType, setWeaponType] = useState<'normal' | 'training'>('normal');
  const [selectedTrainingWeapon, setSelectedTrainingWeapon] = useState<string>('Normal');
  const [weaponReduction, setWeaponReduction] = useState<number>(0);
  const [equipReductions, setEquipReductions] = useState<number[]>([0, 0, 0]);

  const weaponCategory = useMemo(() => {
    if (skillType === 'Magic Level') return 'Magic';
    if (skillType === 'Shielding') return 'Shielding';
    return 'Melee/Distance';
  }, [skillType]);

  const trainingWeapon = useMemo(() => {
    return TRAINING_WEAPONS_DATA[weaponCategory].find(w => w.name === selectedTrainingWeapon) || TRAINING_WEAPONS_DATA[weaponCategory][4];
  }, [weaponCategory, selectedTrainingWeapon]);

  const reductions = useMemo(() => {
    const reds: number[] = [];
    if (weaponType === 'training') {
      if (trainingWeapon.reduction > 0) reds.push(trainingWeapon.reduction);
    } else {
      if (weaponReduction > 0) reds.push(weaponReduction);
    }
    equipReductions.forEach(r => {
      if (r > 0) reds.push(r);
    });
    return reds;
  }, [weaponType, trainingWeapon, weaponReduction, equipReductions]);

  const result = useMemo(() => {
    return calculateTrainingTime(vocation, skillType, currentSkill, targetSkill, skillPercentage, reductions);
  }, [vocation, skillType, currentSkill, targetSkill, skillPercentage, reductions]);

  const weaponsNeeded = useMemo(() => {
    if (weaponType !== 'training' || trainingWeapon.charges <= 0) return 0;
    return Math.ceil(result.points / trainingWeapon.charges);
  }, [result.points, trainingWeapon.charges, weaponType]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    let str = "";
    if (hours > 0) str += `${hours}h `;
    if (minutes > 0) str += `${minutes}m `;
    str += `${remainingSeconds}s`;
    return str;
  };

  const formatDaysTime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    
    if (d === 0) return null;
    
    return `${d} ${t('days')}, ${h} ${t('hours')} ${t('and')} ${m} ${t('minutes')}`;
  };

  const handleEquipReductionChange = (index: number, value: number) => {
    const newReds = [...equipReductions];
    newReds[index] = value;
    setEquipReductions(newReds);
  };

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
          {t('skills')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm">
          {t('heroSubtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Vocação */}
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  {t('vocation')}
                </label>
                <select
                  value={vocation}
                  onChange={(e) => setVocation(e.target.value as Vocation)}
                  className="medieval-input cursor-pointer appearance-none"
                >
                  <option value="Knight">Knight</option>
                  <option value="Paladin">Paladin</option>
                  <option value="Sorcerer">Sorcerer / Rookstayer</option>
                  <option value="Druid">Druid</option>
                </select>
              </div>

              {/* Tipo de Skill */}
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  {t('skillType')}
                </label>
                <select
                  value={skillType}
                  onChange={(e) => setSkillType(e.target.value as SkillType)}
                  className="medieval-input cursor-pointer appearance-none"
                >
                  <option value="Melee">Melee (Sword/Axe/Club)</option>
                  <option value="Distance">Distance</option>
                  <option value="Shielding">Shielding</option>
                  <option value="Magic Level">Magic Level</option>
                </select>
              </div>

              {skillType === 'Magic Level' ? (
                <div className="sm:col-span-2 py-12 flex flex-col items-center justify-center text-center space-y-4 border-t border-medieval-gold/10 mt-4">
                  <Hammer className="w-12 h-12 text-medieval-gold animate-bounce" />
                  <h2 className="text-xl font-black text-medieval-gold uppercase tracking-widest">{t('underConstructionCalc')}</h2>
                  <p className="text-medieval-text/60 max-w-md italic text-xs">
                    Estamos trabalhando nas fórmulas para o Magic Level. Em breve estará disponível!
                  </p>
                </div>
              ) : (
                <>
                  {/* Skill Atual */}
                  <div className="flex flex-col gap-2">
                    <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                      {t('currentSkill')}
                    </label>
                    <input
                      type="number"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(Number(e.target.value))}
                      className="medieval-input"
                    />
                  </div>

                  {/* Skill Alvo */}
                  <div className="flex flex-col gap-2">
                    <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                      {t('targetSkill')}
                    </label>
                    <input
                      type="number"
                      value={targetSkill}
                      onChange={(e) => setTargetSkill(Number(e.target.value))}
                      className="medieval-input"
                    />
                  </div>

                  {/* % Restante */}
                  <div className="flex flex-col gap-2">
                    <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                      {t('remainingPercent')}
                    </label>
                    <input
                      type="number"
                      value={skillPercentage}
                      onChange={(e) => setSkillPercentage(Number(e.target.value))}
                      className="medieval-input"
                    />
                  </div>

                  {/* Tipo de Arma */}
                  <div className="flex flex-col gap-2">
                    <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                      {t('trainingMode')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setWeaponType('normal')}
                        className={`text-[10px] font-bold py-2 px-3 border rounded transition-all ${
                          weaponType === 'normal' 
                            ? 'bg-medieval-gold text-black border-medieval-gold' 
                            : 'bg-black/40 text-medieval-gold/60 border-medieval-gold/20 hover:border-medieval-gold/40'
                        }`}
                      >
                        {t('normalWeapon').toUpperCase()}
                      </button>
                      <button
                        onClick={() => setWeaponType('training')}
                        className={`text-[10px] font-bold py-2 px-3 border rounded transition-all ${
                          weaponType === 'training' 
                            ? 'bg-medieval-gold text-black border-medieval-gold' 
                            : 'bg-black/40 text-medieval-gold/60 border-medieval-gold/20 hover:border-medieval-gold/40'
                        }`}
                      >
                        {t('trainingWeapon').toUpperCase()}
                      </button>
                    </div>
                  </div>

                  {/* Slot Arma */}
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                      {weaponType === 'training' ? t('trainingWeaponSelect') : t('weaponReduction')}
                    </label>
                    {weaponType === 'training' ? (
                      <select
                        value={selectedTrainingWeapon}
                        onChange={(e) => setSelectedTrainingWeapon(e.target.value)}
                        className="medieval-input cursor-pointer appearance-none"
                      >
                        {TRAINING_WEAPONS_DATA[weaponCategory].map(w => (
                          <option key={w.name} value={w.name}>
                            {w.name} {w.reduction > 0 ? `(-${w.reduction}%)` : ''}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        value={weaponReduction}
                        onChange={(e) => setWeaponReduction(Number(e.target.value))}
                        className="medieval-input cursor-pointer appearance-none"
                      >
                        <option value="0">Nenhum Atributo</option>
                        <option value="1">-1% atack interval</option>
                        <option value="2">-2% atack interval</option>
                        <option value="3">-3% atack interval</option>
                        <option value="4">-4% atack interval</option>
                        <option value="5">-5% atack interval</option>
                        <option value="6">-6% atack interval</option>
                        <option value="7">-7% atack interval</option>
                        <option value="8">-8% atack interval</option>
                        <option value="9">-9% atack interval</option>
                      </select>
                    )}
                  </div>

                  {/* Slots de Equipamento */}
                  <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {equipReductions.map((red, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <label className="text-medieval-gold/60 font-bold uppercase text-[9px] tracking-widest">
                          {t('extraEquip')} {idx + 1}
                        </label>
                        <select
                          value={red}
                          onChange={(e) => handleEquipReductionChange(idx, Number(e.target.value))}
                          className="medieval-input text-sm cursor-pointer appearance-none"
                        >
                          <option value="0">{t('none')}</option>
                          <option value="1">-1% atack interval</option>
                          <option value="2">-2% atack interval</option>
                          <option value="3">-3% atack interval</option>
                          <option value="4">-4% atack interval</option>
                          <option value="5">-5% atack interval</option>
                          <option value="6">-6% atack interval</option>
                          <option value="7">-7% atack interval</option>
                          <option value="8">-8% atack interval</option>
                          <option value="9">-9% atack interval</option>
                        </select>
                      </div>
                    ))}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <p className="text-[9px] text-medieval-gold/40 italic text-center">
                      * Reduções são multiplicativas para evitar que o intervalo chegue a 0ms.
                    </p>
                  </div>
                </>
              )}
            </div>

            {skillType !== 'Magic Level' && (
              <div className="mt-8 pt-8 border-t border-medieval-gold/20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                    <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('totalHits')}</p>
                    <div className="text-2xl font-black text-medieval-gold">{result.points.toLocaleString()}</div>
                  </div>
                  <div className="text-center p-4 bg-medieval-gold/5 rounded border border-medieval-gold/30">
                    <p className="text-medieval-gold uppercase text-[9px] font-black tracking-widest mb-1">{t('estimatedTime')}</p>
                    <div className="text-2xl font-black text-medieval-gold">{formatTime(result.seconds)}</div>
                    {formatDaysTime(result.seconds) && (
                      <div className="text-[10px] font-bold text-medieval-gold/60 mt-1">
                        {formatDaysTime(result.seconds)}
                      </div>
                    )}
                  </div>
                  <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                    <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('neededWeapons')}</p>
                    <div className="text-2xl font-black text-medieval-gold">
                      {weaponsNeeded > 0 ? `${weaponsNeeded}x` : 'N/A'}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-[10px] text-medieval-gold/40 font-mono">
                    {t('finalInterval')}: <span className="text-medieval-gold">{(result.interval / 1000).toFixed(3)}s</span> ({result.interval.toFixed(0)}ms)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="medieval-border rounded-lg bg-medieval-card p-6 space-y-4">
            <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4" /> {t('trainingInfo')}
            </h3>
            <div className="space-y-4 text-xs text-medieval-text/70 leading-relaxed font-mono">
              <p>• <span className="text-medieval-gold">{t('meleeInfo').split(':')[0]}:</span> {t('meleeInfo').split(':')[1]}</p>
              <p>• <span className="text-medieval-gold">{t('distanceInfo').split(':')[0]}:</span> {t('distanceInfo').split(':')[1]}</p>
              <p>• <span className="text-medieval-gold">{t('shieldingInfo').split(':')[0]}:</span> {t('shieldingInfo').split(':')[1]}</p>
              <p>• <span className="text-medieval-gold">{t('atkIntervalInfo').split(':')[0]}:</span> {t('atkIntervalInfo').split(':')[1]}</p>
              <p>• <span className="text-medieval-gold">{t('trainingWeaponInfo').split(':')[0]}:</span> {t('trainingWeaponInfo').split(':')[1]}</p>
            </div>
          </div>
          
          <div className="p-4 bg-medieval-gold/10 border border-medieval-gold/20 rounded-lg">
            <p className="text-[10px] text-medieval-gold/60 italic uppercase tracking-tighter text-center leading-relaxed">
              Fórmulas baseadas no guia clássico de Tibia 7.4 por <a href="https://tibiantis.online/?page=viewtopic&id=109" target="_blank" rel="noopener noreferrer" className="text-medieval-gold underline hover:text-white transition-colors">Dratini</a> e mecânicas exclusivas do Miracle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Componente Calculadora de Bless ---
function BlessCalculator({ t }: { t: any }) {
  const [level, setLevel] = useState<number>(100);
  
  const costs = useMemo(() => calculateBlessCosts(level), [level]);

  const formatK = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toLocaleString()}k`;
    }
    return `${value.toLocaleString()}gps`;
  };

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
          {t('blessDeath')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm">
          {t('heroSubtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> {t('characterLevel')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="medieval-input text-2xl font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-black/40 rounded border border-medieval-gold/10">
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('standardBless')}</p>
                  <p className="text-xs text-medieval-text/50 mb-2 italic">{t('standardBlessList')}</p>
                  <div className="text-xl font-black text-medieval-gold">
                    {costs.standardTotal.toLocaleString()} gps <span className="text-sm text-medieval-gold/60">({formatK(costs.standardTotal)})</span>
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded border border-medieval-gold/10">
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('tomeBless')}</p>
                  <p className="text-xs text-medieval-text/50 mb-2 italic">{t('tomeBlessDesc')}</p>
                  <div className="text-xl font-black text-medieval-gold">
                    {costs.blessTomePrice.toLocaleString()} gps <span className="text-sm text-medieval-gold/60">({formatK(costs.blessTomePrice)})</span>
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded border border-medieval-gold/10">
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('arcaneBless')}</p>
                  <p className="text-xs text-medieval-text/50 mb-2 italic">{t('arcaneBlessDesc')}</p>
                  <div className="text-xl font-black text-medieval-gold">
                    {costs.arcaneGuardianPrice.toLocaleString()} gps <span className="text-sm text-medieval-gold/60">({formatK(costs.arcaneGuardianPrice)})</span>
                  </div>
                </div>
                <div className="p-4 bg-black/40 rounded border border-medieval-gold/10">
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('aolCost')}</p>
                  <p className="text-xs text-medieval-text/50 mb-2 italic">{t('aolDesc')}</p>
                  <div className="text-xl font-black text-medieval-gold">
                    {costs.aolPrice.toLocaleString()} gps <span className="text-sm text-medieval-gold/60">({formatK(costs.aolPrice)})</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-medieval-gold/20 space-y-4">
                <div className="flex justify-between items-center p-4 bg-medieval-gold/5 rounded border border-medieval-gold/20">
                  <span className="text-medieval-gold font-black uppercase text-xs tracking-widest">{t('totalInBless')}</span>
                  <div className="text-right">
                    <div className="text-2xl font-black text-medieval-gold">{costs.totalBlesses.toLocaleString()} gps</div>
                    <div className="text-sm font-mono text-medieval-gold/60">{formatK(costs.totalBlesses)}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-6 bg-medieval-gold/10 rounded border border-medieval-gold/40">
                  <span className="text-medieval-gold font-black uppercase text-sm tracking-widest">{t('totalDeathCost')}</span>
                  <div className="text-right">
                    <div className="text-4xl font-black text-medieval-gold">{costs.grandTotal.toLocaleString()} gps</div>
                    <div className="text-lg font-mono text-medieval-gold/80">{formatK(costs.grandTotal)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="medieval-border rounded-lg bg-medieval-card p-6 space-y-4">
            <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4" /> {t('blessDetails')}
            </h3>
            <div className="space-y-4 text-xs text-medieval-text/70 leading-relaxed font-mono">
              <p>• <span className="text-medieval-gold">{t('standardBless')}:</span> 10k fixo até o lvl 100. Após isso, +100gp por level cada.</p>
              <p>• <span className="text-medieval-gold">{t('tomeBless')}:</span> Custo fixo de 25k no NPC Eremo.</p>
              <p>• <span className="text-medieval-gold">{t('arcaneBless')}:</span> Protege seus atributos. Custo: 200gp x Level.</p>
              <p>• <span className="text-medieval-gold">Amulet of Loss:</span> Protege seus itens. Custo fixo de 50k.</p>
              <p>• <span className="text-medieval-gold">Redução de XP:</span> Cada uma das 5 blesses padrão reduz a perda em 0.8%.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [calcSubTab, setCalcSubTab] = useState<'skills' | 'bless' | 'atributos' | 'professions'>('skills');
  const [profSubTab, setProfSubTab] = useState<'crafting' | 'alchemy' | 'farming' | 'mining'>('crafting');
  const [wikiSubTab, setWikiSubTab] = useState<'server' | 'project'>('server');
  const [wikiMainTab, setWikiMainTab] = useState<'updates' | 'library'>('library');
  const [selectedBookId, setSelectedBookId] = useState<string>(LIBRARY_DATA[0]?.id || '');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [selectedPatchVersion, setSelectedPatchVersion] = useState(SERVER_PATCH_NOTES[0].version);
  const [language, setLanguage] = useState<Language>('pt');
  const [skill, setSkill] = useState<number>(10);
  const [homeProfMenuOpen, setHomeProfMenuOpen] = useState(false);
  const [homeSkillsMenuOpen, setHomeSkillsMenuOpen] = useState(false);
  const [homeBlessMenuOpen, setHomeBlessMenuOpen] = useState(false);
  const [homeAttrMenuOpen, setHomeAttrMenuOpen] = useState(false);

  const t = (key: keyof typeof translations['pt']) => translations[language][key] || key;

  // Estados para Calculadora de Skills
  const [vocation, setVocation] = useState<Vocation>('Knight');
  const [skillType, setSkillType] = useState<SkillType>('Melee');
  const [currentSkill, setCurrentSkill] = useState<number>(10);
  const [targetSkill, setTargetSkill] = useState<number>(80);
  const [skillPercentage, setSkillPercentage] = useState<number>(100);
  const [selectedItemName, setSelectedItemName] = useState<string>(CRAFT_ITEMS[0].items[0].name);
  const [chance, setChance] = useState<number>(10);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Encontra o item selecionado para pegar o multiplicador e requisitos
  const selectedItem = useMemo(() => {
    for (const cat of CRAFT_ITEMS) {
      const item = cat.items.find(i => i.name === selectedItemName);
      if (item) return item;
    }
    return CRAFT_ITEMS[0].items[0];
  }, [selectedItemName]);

  // Lógica Matemática: Chance = 10% + ((Skill - 10) * Multiplicador)
  useEffect(() => {
    const calcChance = 10 + ((skill - 10) * selectedItem.multiplier);
    setChance(Math.min(100, Math.max(0, calcChance)));
  }, [skill, selectedItem]);

  // Estados para Calculadora de Atributos
  const [attrCategory, setAttrCategory] = useState<string>("Helmets");
  const [attrItemName, setAttrItemName] = useState<string>(ATTRIBUTE_DATA["Helmets"][0].name);

  // Lógica de Cálculo de Atributos
  const attrResult = useMemo(() => {
    const item = ATTRIBUTE_DATA[attrCategory]?.find(i => i.name === attrItemName);
    if (!item) return { base: 0, grand: 0 };

    let totalSum = 0;
    let totalLevels = 0;

    item.attributes.forEach(attr => {
      const chances = ATTRIBUTE_CHANCES[attr];
      if (chances) {
        // Pega os níveis baseados na classe do item, respeitando o limite do atributo
        const levelsToTake = Math.min(item.class, chances.length);
        for (let i = 0; i < levelsToTake; i++) {
          totalSum += chances[i];
          totalLevels++;
        }
      }
    });

    const base = totalLevels > 0 ? totalSum / totalLevels : 0;
    return {
      base: Number(base.toFixed(2)),
      grand: Number((base * 1.5).toFixed(2))
    };
  }, [attrCategory, attrItemName]);

  const tabs = [
    { id: 'home', label: t('home'), icon: <Book className="w-4 h-4" /> },
    { id: 'calculadoras', label: t('calculators'), icon: <Hammer className="w-4 h-4" /> },
    { id: 'profissoes', label: t('professions'), icon: <Briefcase className="w-4 h-4" /> },
    { id: 'mapa', label: t('map'), icon: <Map className="w-4 h-4" /> },
    { id: 'eventos', label: t('events'), icon: <Users className="w-4 h-4" /> },
    { id: 'wiki', label: t('wiki'), icon: <Book className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-medieval-dark/95 backdrop-blur-md border-b border-medieval-gold/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Hammer className="text-medieval-gold w-6 h-6" />
            <span className="text-medieval-gold font-black uppercase tracking-tighter text-lg hidden sm:inline">
              Miracle Wiki Tools
            </span>
          </button>

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-medieval-gold text-black shadow-[0_2px_0_#8b7326]' 
                    : 'text-medieval-gold/60 hover:text-medieval-gold hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
            
            {/* Language Switcher Desktop */}
            <div className="ml-4 flex items-center gap-2 border-l border-medieval-gold/20 pl-4">
              <button 
                onClick={() => setLanguage('pt')}
                className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${language === 'pt' ? 'bg-medieval-gold text-black' : 'text-medieval-gold/40 hover:text-medieval-gold'}`}
              >
                PT
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-medieval-gold text-black' : 'text-medieval-gold/40 hover:text-medieval-gold'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex items-center gap-1 mr-2">
              <button 
                onClick={() => setLanguage('pt')}
                className={`text-[10px] font-bold px-2 py-1 rounded ${language === 'pt' ? 'bg-medieval-gold text-black' : 'text-medieval-gold/40'}`}
              >
                PT
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`text-[10px] font-bold px-2 py-1 rounded ${language === 'en' ? 'bg-medieval-gold text-black' : 'text-medieval-gold/40'}`}
              >
                EN
              </button>
            </div>
            <button 
              className="text-medieval-gold p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-medieval-dark border-t border-medieval-gold/20 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as Tab);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-sm text-sm font-black uppercase tracking-widest ${
                      activeTab === tab.id 
                        ? 'bg-medieval-gold text-black' 
                        : 'text-medieval-gold/60'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex-1 overflow-y-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-12 py-10"
              >
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-5xl sm:text-7xl font-black text-medieval-gold uppercase tracking-tighter leading-none">
                      {t('welcome')} <br /> Miracle Wiki Tools
                    </h1>
                    <p className="text-medieval-gold/60 font-mono text-lg mt-4 max-w-2xl mx-auto">
                      {t('heroSubtitle')}
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                  {/* Card Calculadoras */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Hammer className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-xl font-black text-medieval-gold uppercase">{t('toolsTitle')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed flex-1">
                      {t('toolsDesc')}
                    </p>
                    <div className="grid grid-cols-1 gap-3 pt-4">
                      {/* Skills */}
                      <div className="space-y-2">
                        <button 
                          onClick={() => setHomeSkillsMenuOpen(!homeSkillsMenuOpen)}
                          className={`flex items-center justify-between w-full p-4 bg-black/40 border border-medieval-gold/20 rounded hover:border-medieval-gold hover:bg-medieval-gold/5 transition-all group ${homeSkillsMenuOpen ? 'border-medieval-gold bg-medieval-gold/5' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <Zap className="text-medieval-gold w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-xs">{t('skills')}</span>
                          </div>
                          <ChevronRight className={`text-medieval-gold w-4 h-4 transition-transform ${homeSkillsMenuOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </button>
                        <AnimatePresence>
                          {homeSkillsMenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden space-y-2 pl-4"
                            >
                              <button 
                                onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('skills'); setSkillType('Melee'); }}
                                className="flex items-center justify-between w-full p-3 bg-black/20 border border-medieval-gold/10 rounded hover:border-medieval-gold/40 hover:bg-medieval-gold/5 transition-all group"
                              >
                                <span className="font-bold uppercase tracking-wider text-[10px] text-medieval-text/80">Melee</span>
                                <ChevronRight className="text-medieval-gold/40 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                              <button 
                                onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('skills'); setSkillType('Distance'); }}
                                className="flex items-center justify-between w-full p-3 bg-black/20 border border-medieval-gold/10 rounded hover:border-medieval-gold/40 hover:bg-medieval-gold/5 transition-all group"
                              >
                                <span className="font-bold uppercase tracking-wider text-[10px] text-medieval-text/80">Distance</span>
                                <ChevronRight className="text-medieval-gold/40 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                              <button 
                                onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('skills'); setSkillType('Magic Level'); }}
                                className="flex items-center justify-between w-full p-3 bg-black/20 border border-medieval-gold/10 rounded hover:border-medieval-gold/40 hover:bg-medieval-gold/5 transition-all group"
                              >
                                <span className="font-bold uppercase tracking-wider text-[10px] text-medieval-text/80">Magic Level</span>
                                <ChevronRight className="text-medieval-gold/40 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Bless */}
                      <div className="space-y-2">
                        <button 
                          onClick={() => setHomeBlessMenuOpen(!homeBlessMenuOpen)}
                          className={`flex items-center justify-between w-full p-4 bg-black/40 border border-medieval-gold/20 rounded hover:border-medieval-gold hover:bg-medieval-gold/5 transition-all group ${homeBlessMenuOpen ? 'border-medieval-gold bg-medieval-gold/5' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <TrendingUp className="text-medieval-gold w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-xs">{t('blessDeath')}</span>
                          </div>
                          <ChevronRight className={`text-medieval-gold w-4 h-4 transition-transform ${homeBlessMenuOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </button>
                        <AnimatePresence>
                          {homeBlessMenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden space-y-2 pl-4"
                            >
                              <button 
                                onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('bless'); }}
                                className="flex items-center justify-between w-full p-3 bg-black/20 border border-medieval-gold/10 rounded hover:border-medieval-gold/40 hover:bg-medieval-gold/5 transition-all group"
                              >
                                <span className="font-bold uppercase tracking-wider text-[10px] text-medieval-text/80">{t('blessDeath')}</span>
                                <ChevronRight className="text-medieval-gold/40 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Attributes */}
                      <div className="space-y-2">
                        <button 
                          onClick={() => setHomeAttrMenuOpen(!homeAttrMenuOpen)}
                          className={`flex items-center justify-between w-full p-4 bg-black/40 border border-medieval-gold/20 rounded hover:border-medieval-gold hover:bg-medieval-gold/5 transition-all group ${homeAttrMenuOpen ? 'border-medieval-gold bg-medieval-gold/5' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <Sparkles className="text-medieval-gold w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-xs">{t('attributes')}</span>
                          </div>
                          <ChevronRight className={`text-medieval-gold w-4 h-4 transition-transform ${homeAttrMenuOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </button>
                        <AnimatePresence>
                          {homeAttrMenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden space-y-2 pl-4"
                            >
                              <button 
                                onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('atributos'); }}
                                className="flex items-center justify-between w-full p-3 bg-black/20 border border-medieval-gold/10 rounded hover:border-medieval-gold/40 hover:bg-medieval-gold/5 transition-all group"
                              >
                                <span className="font-bold uppercase tracking-wider text-[10px] text-medieval-text/80">{t('attributes')}</span>
                                <ChevronRight className="text-medieval-gold/40 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Professions */}
                      <div className="space-y-2">
                        <button 
                          onClick={() => setHomeProfMenuOpen(!homeProfMenuOpen)}
                          className={`flex items-center justify-between w-full p-4 bg-black/40 border border-medieval-gold/20 rounded hover:border-medieval-gold hover:bg-medieval-gold/5 transition-all group ${homeProfMenuOpen ? 'border-medieval-gold bg-medieval-gold/5' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <Briefcase className="text-medieval-gold w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-xs">{t('professions')}</span>
                          </div>
                          <ChevronRight className={`text-medieval-gold w-4 h-4 transition-transform ${homeProfMenuOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </button>
                        
                        <AnimatePresence>
                          {homeProfMenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden space-y-2 pl-4"
                            >
                              <button 
                                onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('professions'); setProfSubTab('crafting'); }}
                                className="flex items-center justify-between w-full p-3 bg-black/20 border border-medieval-gold/10 rounded hover:border-medieval-gold/40 hover:bg-medieval-gold/5 transition-all group"
                              >
                                <div className="flex items-center gap-3">
                                  <Hammer className="text-medieval-gold/60 w-4 h-4" />
                                  <span className="font-bold uppercase tracking-wider text-[10px] text-medieval-text/80">{t('crafting')}</span>
                                </div>
                                <ChevronRight className="text-medieval-gold/40 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                              <button 
                                onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('professions'); setProfSubTab('alchemy'); }}
                                className="flex items-center justify-between w-full p-3 bg-black/20 border border-medieval-gold/10 rounded hover:border-medieval-gold/40 hover:bg-medieval-gold/5 transition-all group"
                              >
                                <div className="flex items-center gap-3">
                                  <FlaskConical className="text-medieval-gold/60 w-4 h-4" />
                                  <span className="font-bold uppercase tracking-wider text-[10px] text-medieval-text/80">{t('alchemy')}</span>
                                </div>
                                <ChevronRight className="text-medieval-gold/40 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                              <button 
                                onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('professions'); setProfSubTab('farming'); }}
                                className="flex items-center justify-between w-full p-3 bg-black/20 border border-medieval-gold/10 rounded hover:border-medieval-gold/40 hover:bg-medieval-gold/5 transition-all group"
                              >
                                <div className="flex items-center gap-3">
                                  <Sprout className="text-medieval-gold/60 w-4 h-4" />
                                  <span className="font-bold uppercase tracking-wider text-[10px] text-medieval-text/80">{t('farming')}</span>
                                </div>
                                <ChevronRight className="text-medieval-gold/40 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                              <button 
                                onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('professions'); setProfSubTab('mining'); }}
                                className="flex items-center justify-between w-full p-3 bg-black/20 border border-medieval-gold/10 rounded hover:border-medieval-gold/40 hover:bg-medieval-gold/5 transition-all group"
                              >
                                <div className="flex items-center gap-3">
                                  <Pickaxe className="text-medieval-gold/60 w-4 h-4" />
                                  <span className="font-bold uppercase tracking-wider text-[10px] text-medieval-text/80">{t('mining')}</span>
                                </div>
                                <ChevronRight className="text-medieval-gold/40 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Card Profissões */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Briefcase className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-xl font-black text-medieval-gold uppercase">{t('professionsTitle')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed flex-1">
                      {t('professionsDesc')}
                    </p>
                    <button 
                      onClick={() => setActiveTab('profissoes')}
                      className="medieval-button w-full flex items-center justify-center gap-3"
                    >
                      <Briefcase className="w-5 h-5" /> {t('viewProfessions')}
                    </button>
                  </div>

                  {/* Card Mapa */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Map className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-xl font-black text-medieval-gold uppercase">{t('mapTitle')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed flex-1">
                      {t('mapDesc')}
                    </p>
                    <button 
                      onClick={() => setActiveTab('mapa')}
                      className="medieval-button w-full flex items-center justify-center gap-3"
                    >
                      <Map className="w-5 h-5" /> {t('openMap')}
                    </button>
                  </div>

                  {/* Card Eventos */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Users className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-xl font-black text-medieval-gold uppercase">{t('eventsTitle')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed flex-1">
                      {t('eventsDesc')}
                    </p>
                    <button 
                      onClick={() => setActiveTab('eventos')}
                      className="medieval-button w-full flex items-center justify-center gap-3"
                    >
                      <Users className="w-5 h-5" /> {t('accessLobby')}
                    </button>
                  </div>

                  {/* Card Comunidade */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Twitch className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-xl font-black text-medieval-gold uppercase">{t('community')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed flex-1">
                      {t('footerDesc')}
                    </p>
                    <div className="grid grid-cols-1 gap-3 pt-4">
                      <a href="https://www.twitch.tv/obellao_" target="_blank" rel="noopener noreferrer" className="medieval-button flex items-center justify-center gap-3">
                        <Twitch className="w-5 h-5" /> {t('twitchChannel')}
                      </a>
                      <a href="https://discord.gg/nacCypRkqQ" target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] text-white font-bold py-3 px-6 rounded-sm flex items-center justify-center gap-3 hover:bg-[#4752C4] transition-colors">
                        <MessageSquare className="w-5 h-5" /> {t('ourDiscord')}
                      </a>
                    </div>
                  </div>

                  {/* Twitch Camera Card */}
                  <div className="medieval-card bg-medieval-card p-4 medieval-border rounded-lg flex flex-col overflow-hidden">
                    <div className="medieval-border rounded-sm overflow-hidden bg-black aspect-video h-full">
                      <iframe
                        src={`https://player.twitch.tv/?channel=obellao_&parent=${window.location.hostname}`}
                        height="100%" width="100%" allowFullScreen title="Twitch Player"
                      />
                    </div>
                  </div>
                </div>

                {/* Seção de Destaque Wiki */}
                <div className="medieval-border rounded-lg bg-black/40 p-8 text-center space-y-4">
                  <Book className="w-12 h-12 text-medieval-gold/40 mx-auto" />
                  <h3 className="text-xl font-black text-medieval-gold uppercase tracking-widest">{t('wikiSoon')}</h3>
                  <p className="text-medieval-text/50 text-sm max-w-xl mx-auto">
                    {t('wikiSoonDesc')}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'calculadoras' && (
              <motion.div
                key="calculadoras"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Sub-navegação Calculadoras */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <button
                    onClick={() => setCalcSubTab('skills')}
                    className={`px-6 py-3 rounded-sm font-black uppercase tracking-widest text-xs transition-all ${
                      calcSubTab === 'skills'
                        ? 'bg-medieval-gold text-black shadow-[0_4px_0_#8b7326]'
                        : 'bg-medieval-card text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" /> {t('skills')}
                    </div>
                  </button>
                  <button
                    onClick={() => setCalcSubTab('bless')}
                    className={`px-6 py-3 rounded-sm font-black uppercase tracking-widest text-xs transition-all ${
                      calcSubTab === 'bless'
                        ? 'bg-medieval-gold text-black shadow-[0_4px_0_#8b7326]'
                        : 'bg-medieval-card text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> {t('blessDeath')}
                    </div>
                  </button>
                  <button
                    onClick={() => setCalcSubTab('atributos')}
                    className={`px-6 py-3 rounded-sm font-black uppercase tracking-widest text-xs transition-all ${
                      calcSubTab === 'atributos'
                        ? 'bg-medieval-gold text-black shadow-[0_4px_0_#8b7326]'
                        : 'bg-medieval-card text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> {t('attributes')}
                    </div>
                  </button>
                  <button
                    onClick={() => setCalcSubTab('professions')}
                    className={`px-6 py-3 rounded-sm font-black uppercase tracking-widest text-xs transition-all ${
                      calcSubTab === 'professions'
                        ? 'bg-medieval-gold text-black shadow-[0_4px_0_#8b7326]'
                        : 'bg-medieval-card text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> {t('professions')}
                    </div>
                  </button>
                </div>

                {calcSubTab === 'professions' ? (
                  <div className="space-y-8">
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => setProfSubTab('crafting')}
                        className={`px-4 py-2 rounded-sm font-bold uppercase text-[10px] tracking-widest transition-all ${
                          profSubTab === 'crafting'
                            ? 'bg-medieval-gold/20 text-medieval-gold border border-medieval-gold'
                            : 'bg-black/40 text-medieval-gold/40 border border-medieval-gold/10 hover:border-medieval-gold/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Hammer className="w-3 h-3" /> {t('crafting')}
                        </div>
                      </button>
                      <button
                        onClick={() => setProfSubTab('alchemy')}
                        className={`px-4 py-2 rounded-sm font-bold uppercase text-[10px] tracking-widest transition-all ${
                          profSubTab === 'alchemy'
                            ? 'bg-medieval-gold/20 text-medieval-gold border border-medieval-gold'
                            : 'bg-black/40 text-medieval-gold/40 border border-medieval-gold/10 hover:border-medieval-gold/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FlaskConical className="w-3 h-3" /> {t('alchemy')}
                        </div>
                      </button>
                      <button
                        onClick={() => setProfSubTab('farming')}
                        className={`px-4 py-2 rounded-sm font-bold uppercase text-[10px] tracking-widest transition-all ${
                          profSubTab === 'farming'
                            ? 'bg-medieval-gold/20 text-medieval-gold border border-medieval-gold'
                            : 'bg-black/40 text-medieval-gold/40 border border-medieval-gold/10 hover:border-medieval-gold/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Sprout className="w-3 h-3" /> {t('farming')}
                        </div>
                      </button>
                      <button
                        onClick={() => setProfSubTab('mining')}
                        className={`px-4 py-2 rounded-sm font-bold uppercase text-[10px] tracking-widest transition-all ${
                          profSubTab === 'mining'
                            ? 'bg-medieval-gold/20 text-medieval-gold border border-medieval-gold'
                            : 'bg-black/40 text-medieval-gold/40 border border-medieval-gold/10 hover:border-medieval-gold/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Pickaxe className="w-3 h-3" /> {t('mining')}
                        </div>
                      </button>
                    </div>

                    {profSubTab === 'crafting' ? (
                      <CraftingCalculator t={t} CRAFT_ITEMS={CRAFT_ITEMS} BREAKING_DATA={BREAKING_DATA} />
                    ) : profSubTab === 'alchemy' ? (
                      <AlchemyCalculator t={t} />
                    ) : profSubTab === 'farming' ? (
                      <FarmingCalculator t={t} />
                    ) : (
                      <MiningCalculator t={t} />
                    )}
                  </div>
                ) : calcSubTab === 'skills' ? (
                  <SkillCalculator 
                    vocation={vocation} setVocation={setVocation}
                    skillType={skillType} setSkillType={setSkillType}
                    currentSkill={currentSkill} setCurrentSkill={setCurrentSkill}
                    targetSkill={targetSkill} setTargetSkill={setTargetSkill}
                    skillPercentage={skillPercentage} setSkillPercentage={setSkillPercentage}
                    t={t}
                  />
                ) : calcSubTab === 'bless' ? (
                  <BlessCalculator t={t} />
                ) : (
                  <div className="space-y-8">
                    <header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
                        {t('attributes')}
                      </h1>
                      <p className="text-medieval-gold/80 font-mono text-sm">
                        {t('attributeSubtitle')}
                      </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-7 space-y-6">
                        <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg">
                          <div className="space-y-6">
                            {/* Seleção de Categoria */}
                            <div className="flex flex-col gap-2">
                              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                                <TableIcon className="w-4 h-4" /> {t('category')}
                              </label>
                              <select
                                value={attrCategory}
                                onChange={(e) => {
                                  setAttrCategory(e.target.value);
                                  setAttrItemName(ATTRIBUTE_DATA[e.target.value][0].name);
                                }}
                                className="medieval-input cursor-pointer appearance-none"
                              >
                                {Object.keys(ATTRIBUTE_DATA).map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            </div>

                            {/* Seleção de Item */}
                            <div className="flex flex-col gap-2">
                              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                                <Sword className="w-4 h-4" /> {t('equipment')}
                              </label>
                              <select
                                value={attrItemName}
                                onChange={(e) => setAttrItemName(e.target.value)}
                                className="medieval-input cursor-pointer appearance-none"
                              >
                                {ATTRIBUTE_DATA[attrCategory]?.map(item => (
                                  <option key={item.name} value={item.name}>
                                    {item.name} (Classe {item.class})
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Atributos Permitidos */}
                            <div className="bg-black/40 p-4 rounded border border-medieval-gold/20">
                              <p className="text-xs uppercase text-medieval-gold/60 font-bold tracking-tighter mb-3 flex items-center gap-2">
                                <Info className="w-4 h-4" /> {t('allowedAttributes')}:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {ATTRIBUTE_DATA[attrCategory]?.find(i => i.name === attrItemName)?.attributes.map(attr => (
                                  <span key={attr} className="px-2 py-1 bg-medieval-gold/10 border border-medieval-gold/30 rounded text-[10px] text-medieval-gold font-bold uppercase">
                                    {attr}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Resultados de Atributos */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-medieval-gold/20">
                              <div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                                <p className="text-medieval-gold/60 uppercase text-[10px] font-bold tracking-widest mb-1">Normal Orb</p>
                                <div className="text-4xl font-black text-medieval-gold">{attrResult.base}%</div>
                              </div>
                              <div className="text-center p-4 bg-medieval-gold/5 rounded border border-medieval-gold/30">
                                <p className="text-medieval-gold uppercase text-[10px] font-bold tracking-widest mb-1">Grand Arcane Orb</p>
                                <div className="text-4xl font-black text-medieval-gold shadow-medieval-gold">{attrResult.grand}%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 space-y-6">
                        {/* Twitch/Social */}
                        <div className="medieval-border rounded-lg overflow-hidden bg-black aspect-video">
                          <iframe
                            src={`https://player.twitch.tv/?channel=obellao_&parent=${window.location.hostname}`}
                            height="100%" width="100%" allowFullScreen title="Twitch Player"
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <a href="https://www.twitch.tv/obellao_" target="_blank" rel="noopener noreferrer" className="medieval-button flex items-center justify-center gap-3">
                            <Twitch className="w-6 h-6" /> Twitch
                          </a>
                          <a href="https://discord.gg/nacCypRkqQ" target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] text-white font-bold py-3 px-6 rounded-sm flex items-center justify-center gap-3 hover:bg-[#4752C4] transition-colors">
                            <MessageSquare className="w-6 h-6" /> Discord
                          </a>
                        </div>

                        <div className="medieval-border rounded-lg bg-medieval-card p-6 space-y-4">
                          <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> {t('understandFormula')}
                          </h3>
                          <div className="space-y-3 text-xs text-medieval-text/70 leading-relaxed font-mono">
                            <p>1. {t('formulaStep1')}</p>
                            <p>2. {t('formulaStep2')}</p>
                            <p>3. {t('formulaStep3')}</p>
                            <p>4. {t('formulaStep4')}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-medieval-red/10 border border-medieval-red/20 rounded-lg flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-medieval-red shrink-0 mt-0.5" />
                          <p className="text-[10px] text-medieval-text/60 italic uppercase tracking-tighter">
                            Atenção: Atributos com menos níveis que a classe do item (ex: ML) usam apenas seus níveis disponíveis no cálculo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'mapa' && (
              <motion.div
                key="mapa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <header className="relative flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
                      {t('mapTitle')}
                    </h1>
                    <p className="text-medieval-gold/80 font-mono text-sm mb-4">
                      {t('mapSubtitle')}
                    </p>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-medieval-gold/10 border border-medieval-gold/30 rounded-full">
                      <AlertTriangle className="w-4 h-4 text-medieval-gold animate-pulse" />
                      <span className="text-[10px] uppercase font-black tracking-widest text-medieval-gold">
                        {t('underConstruction')}
                      </span>
                    </div>
                  </div>

                  <div className="medieval-card bg-medieval-gold/5 p-3 medieval-border rounded-lg flex items-center gap-3 shrink-0 max-w-xs mx-auto md:mx-0">
                    <div className="p-2 bg-medieval-gold/10 rounded-full">
                      <Download className="w-4 h-4 text-medieval-gold" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-medieval-gold font-bold text-[10px] uppercase tracking-widest mb-0.5">
                        {t('downloadMinimap')}
                      </h4>
                      <p className="text-[9px] text-medieval-text/60 mb-1 leading-tight">
                        {t('minimapDownloadDesc')}
                      </p>
                      <p className="text-[8px] text-medieval-gold/50 mb-1 font-mono">
                        {t('minimapUpdated')}
                      </p>
                      <a 
                        href="https://drive.google.com/u/0/uc?id=1Nf7CHYGN39nRhGhq8x8X49rCbKyBzdZE&export=download" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-black text-medieval-gold hover:underline uppercase tracking-tighter"
                      >
                        Download (.zip)
                      </a>
                    </div>
                  </div>
                </header>

                <div className="medieval-border rounded-lg overflow-hidden bg-black shadow-2xl" style={{ height: '70vh' }}>
                  <iframe 
                    src="/mapa.html" 
                    className="w-full h-full border-none"
                    title={t('mapTitle')}
                  />
                </div>

                <div className="text-center">
                  <a 
                    href="/mapa.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="medieval-button inline-flex items-center gap-3"
                  >
                    <ExternalLink className="w-5 h-5" /> {t('fullScreenMap')}
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'profissoes' && (
              <motion.div
                key="profissoes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <header className="text-center mb-12">
                  <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
                    {t('professionsTitle')}
                  </h1>
                  <p className="text-medieval-gold/80 font-mono text-sm">
                    {t('professionsSubtitle')}
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Card Crafting */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Hammer className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">{t('crafting')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed flex-1">
                      {t('craftingDesc')}
                    </p>
                    <div className="pt-4">
                      <a 
                        href="https://www.youtube.com/watch?v=keb5CtwOwBI" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-[#FF0000] text-white font-bold py-3 px-6 rounded-sm flex items-center justify-center gap-3 hover:bg-[#CC0000] transition-colors w-full"
                      >
                        <Youtube className="w-5 h-5" /> {t('craftingTutorial')}
                      </a>
                    </div>
                  </div>

                  {/* Mineração */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Pickaxe className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">{t('mining')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      {t('miningGuideSoon')}
                    </p>
                  </div>

                  {/* Farming */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Sprout className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">{t('farmer')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      {t('farmingDesc')}
                    </p>
                  </div>

                  {/* Cooking */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Utensils className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">{t('cook')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      {t('cookingDesc')}
                    </p>
                  </div>

                  {/* Skinning */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Scissors className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">Skinning</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      {t('skinningDesc')}
                    </p>
                  </div>

                  {/* Fishing */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Fish className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">{t('fisherman')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      {t('fishingDesc')}
                    </p>
                  </div>

                  {/* Alchemy */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <FlaskConical className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">{t('alchemist')}</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      {t('alchemyDesc')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'eventos' && (
              <motion.div
                key="eventos"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                <header className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
                    {t('eventsLobbyTitle')}
                  </h1>
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-medieval-gold/10 border border-medieval-gold/30 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-[10px] font-black text-medieval-gold uppercase tracking-widest">V3.2 - {t('realTimeSystem')}</p>
                  </div>
                </header>

                <div className="medieval-border rounded-lg overflow-hidden bg-black h-[800px] relative">
                  <iframe 
                    src="/lobby.html?v=3.2" 
                    className="w-full h-full border-none"
                    title="Lobby de Quests"
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'wiki' && (
              <motion.div
                key="wiki"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Wiki Main Navigation */}
                <div className="flex justify-center gap-4 mb-12">
                  <button
                    onClick={() => setWikiMainTab('updates')}
                    className={`px-8 py-3 rounded-sm font-black uppercase text-sm tracking-[0.2em] transition-all border-b-2 ${
                      wikiMainTab === 'updates'
                        ? 'text-medieval-gold border-medieval-gold bg-medieval-gold/5'
                        : 'text-medieval-gold/40 border-transparent hover:text-medieval-gold/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4" /> {t('updates')}
                    </div>
                  </button>
                  <button
                    onClick={() => setWikiMainTab('library')}
                    className={`px-8 py-3 rounded-sm font-black uppercase text-sm tracking-[0.2em] transition-all border-b-2 ${
                      wikiMainTab === 'library'
                        ? 'text-medieval-gold border-medieval-gold bg-medieval-gold/5'
                        : 'text-medieval-gold/40 border-transparent hover:text-medieval-gold/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4" /> {t('library')}
                    </div>
                  </button>
                </div>

                {wikiMainTab === 'updates' ? (
                  <div className="space-y-8">
                    <header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
                        {t('patchNotes')}
                      </h1>
                      <p className="text-medieval-gold/80 font-mono text-sm">
                        {t('patchNotesSubtitle')}
                      </p>
                    </header>

                    {/* Wiki Sub-Tabs */}
                    <div className="flex justify-center gap-4 mb-8">
                      <button
                        onClick={() => {
                          setWikiSubTab('server');
                          setSelectedPatchVersion(SERVER_PATCH_NOTES[0].version);
                        }}
                        className={`px-6 py-2 rounded-sm font-black uppercase text-xs tracking-widest transition-all border ${
                          wikiSubTab === 'server'
                            ? 'bg-medieval-gold text-black border-medieval-gold shadow-medieval-gold'
                            : 'bg-black/40 text-medieval-gold/60 border-medieval-gold/20 hover:border-medieval-gold/40'
                        }`}
                      >
                        {t('serverUpdates')}
                      </button>
                      <button
                        onClick={() => {
                          setWikiSubTab('project');
                          setSelectedPatchVersion(PROJECT_PATCH_NOTES[0].version);
                        }}
                        className={`px-6 py-2 rounded-sm font-black uppercase text-xs tracking-widest transition-all border ${
                          wikiSubTab === 'project'
                            ? 'bg-medieval-gold text-black border-medieval-gold shadow-medieval-gold'
                            : 'bg-black/40 text-medieval-gold/60 border-medieval-gold/20 hover:border-medieval-gold/40'
                        }`}
                      >
                        {t('projectUpdates')}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Sidebar - Version List */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="medieval-card bg-medieval-card p-4 medieval-border rounded-lg">
                          <h3 className="text-medieval-gold font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                            <History className="w-4 h-4" /> Histórico de Versões
                          </h3>
                          <div className="space-y-2">
                            {(wikiSubTab === 'server' ? SERVER_PATCH_NOTES : PROJECT_PATCH_NOTES).map((patch) => (
                              <button
                                key={patch.version}
                                onClick={() => setSelectedPatchVersion(patch.version)}
                                className={`w-full text-left p-3 rounded border transition-all flex items-center justify-between group ${
                                  selectedPatchVersion === patch.version
                                    ? 'bg-medieval-gold/20 border-medieval-gold text-medieval-gold'
                                    : 'bg-black/40 border-medieval-gold/10 text-medieval-gold/60 hover:border-medieval-gold/30'
                                }`}
                              >
                                <div className="flex flex-col">
                                  <span className="font-black text-sm">v{patch.version}</span>
                                  <span className="text-[10px] opacity-60 font-mono">{patch.date}</span>
                                </div>
                                {selectedPatchVersion === patch.version && <ChevronRight className="w-4 h-4" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="medieval-card bg-medieval-gold/5 p-6 medieval-border rounded-lg border-dashed">
                          <div className="flex items-center gap-3 mb-3">
                            <MessageSquare className="w-5 h-5 text-medieval-gold" />
                            <h4 className="text-medieval-gold font-bold text-sm uppercase">{t('social')}</h4>
                          </div>
                          <p className="text-xs text-medieval-text/70 mb-4 leading-relaxed">
                            {t('helpImprove')}
                          </p>
                          <a 
                            href="https://discord.gg/nacCypRkqQ" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="medieval-button w-full text-center py-2 text-xs"
                          >
                            Discord
                          </a>
                        </div>
                      </div>

                      {/* Main Content - Patch Details */}
                      <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                          {(wikiSubTab === 'server' ? SERVER_PATCH_NOTES : PROJECT_PATCH_NOTES)
                            .filter(p => p.version === selectedPatchVersion).map((patch) => (
                            <motion.div
                              key={patch.version}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg space-y-8"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-medieval-gold/20 pb-6">
                                <div>
                                  <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-tighter">
                                      {patch.title[language]}
                                    </h2>
                                    {patch.version === (wikiSubTab === 'server' ? SERVER_PATCH_NOTES : PROJECT_PATCH_NOTES)[0].version && (
                                      <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-black uppercase rounded">
                                        {t('latestVersion')}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-4 text-medieval-gold/60 font-mono text-xs">
                                    <span className="flex items-center gap-1.5">
                                      <Calendar className="w-3 h-3" /> {patch.date}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 gap-8">
                                {patch.changes.added?.[language] && patch.changes.added[language].length > 0 && (
                                  <div className="space-y-3">
                                    <h4 className="text-green-400 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                      <Plus className="w-4 h-4" /> {t('added')}
                                    </h4>
                                    <ul className="space-y-2">
                                      {patch.changes.added[language].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-medieval-text/80 leading-relaxed group">
                                          <Check className="w-4 h-4 text-green-500/40 mt-0.5 shrink-0 group-hover:text-green-500 transition-colors" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {patch.changes.changed?.[language] && patch.changes.changed[language].length > 0 && (
                                  <div className="space-y-3">
                                    <h4 className="text-medieval-gold font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                      <RefreshCw className="w-4 h-4" /> {t('changed')}
                                    </h4>
                                    <ul className="space-y-2">
                                      {patch.changes.changed[language].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-medieval-text/80 leading-relaxed group">
                                          <div className="w-1.5 h-1.5 rounded-full bg-medieval-gold/40 mt-2 shrink-0 group-hover:bg-medieval-gold transition-colors" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {patch.changes.fixed?.[language] && patch.changes.fixed[language].length > 0 && (
                                  <div className="space-y-3">
                                    <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                      <Zap className="w-4 h-4" /> {t('fixed')}
                                    </h4>
                                    <ul className="space-y-2">
                                      {patch.changes.fixed[language].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-medieval-text/80 leading-relaxed group">
                                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 mt-2 shrink-0 group-hover:bg-blue-500 transition-colors" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {patch.changes.removed?.[language] && patch.changes.removed[language].length > 0 && (
                                  <div className="space-y-3">
                                    <h4 className="text-medieval-red font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                      <Minus className="w-4 h-4" /> {t('removed')}
                                    </h4>
                                    <ul className="space-y-2">
                                      {patch.changes.removed[language].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-medieval-text/80 leading-relaxed group">
                                          <X className="w-4 h-4 text-medieval-red/40 mt-0.5 shrink-0 group-hover:text-medieval-red transition-colors" />
                                          <span className="line-through opacity-60">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
                        {t('library')}
                      </h1>
                      <p className="text-medieval-gold/80 font-mono text-sm italic">
                        "Mysteriando: Desvendando os segredos de Miracle 7.4"
                      </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Sidebar - Book List */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="medieval-card bg-medieval-card p-4 medieval-border rounded-lg">
                          <h3 className="text-medieval-gold font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                            <Book className="w-4 h-4" /> Documentos Encontrados
                          </h3>
                          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {LIBRARY_DATA.map((doc) => (
                              <button
                                key={doc.id}
                                onClick={() => {
                                  setSelectedBookId(doc.id);
                                  setActiveGalleryIndex(0);
                                }}
                                className={`w-full text-left p-3 rounded border transition-all flex items-center gap-3 group ${
                                  selectedBookId === doc.id
                                    ? 'bg-medieval-gold/20 border-medieval-gold text-medieval-gold'
                                    : 'bg-black/40 border-medieval-gold/10 text-medieval-gold/60 hover:border-medieval-gold/30'
                                }`}
                              >
                                <img 
                                  src={doc.spriteImage} 
                                  alt={doc.type} 
                                  className="w-6 h-6 object-contain"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="flex flex-col min-w-0">
                                  <span className="font-black text-sm truncate">{doc.title[language]}</span>
                                  <span className="text-[10px] opacity-60 font-mono truncate">{doc.region[language]}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Main Content - Book Details */}
                      <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                          {LIBRARY_DATA.filter(b => b.id === selectedBookId).map((book) => (
                            <motion.div
                              key={book.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-6"
                            >
                              {/* Header Info */}
                              <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg">
                                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                  <div className="w-20 h-20 bg-black/40 rounded-lg border border-medieval-gold/20 flex items-center justify-center shrink-0">
                                    <img 
                                      src={book.spriteImage} 
                                      alt={book.title[language]} 
                                      className="w-12 h-12 object-contain"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <h2 className="text-2xl font-black text-medieval-gold uppercase tracking-tight">
                                      {book.title[language]}
                                    </h2>
                                    <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-widest font-mono text-medieval-gold/60">
                                      <span className="flex items-center gap-1.5">
                                        <Map className="w-3 h-3" /> {book.region[language]}
                                      </span>
                                      <span className="flex items-center gap-1.5">
                                        <Info className="w-3 h-3" /> {t(book.type)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Location & Map */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg space-y-4">
                                  <h4 className="text-medieval-gold font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                    <Map className="w-4 h-4" /> {t('location')}
                                  </h4>
                                  <p className="text-sm text-medieval-text/80 font-mono bg-black/20 p-3 rounded border border-medieval-gold/10">
                                    {book.location[language]}
                                  </p>
                                  
                                  {book.gallery && book.gallery.length > 0 ? (
                                    <div className="space-y-3">
                                      <div className="aspect-square bg-black/40 rounded border border-medieval-gold/20 overflow-hidden relative group">
                                        <AnimatePresence mode="wait">
                                          <motion.img 
                                            key={book.gallery[activeGalleryIndex].url}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            src={book.gallery[activeGalleryIndex].url} 
                                            alt={book.gallery[activeGalleryIndex].label[language]} 
                                            className="w-full h-full object-cover"
                                            referrerPolicy="no-referrer"
                                          />
                                        </AnimatePresence>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-[10px] text-medieval-gold font-mono uppercase text-center border-t border-medieval-gold/20">
                                          {book.gallery[activeGalleryIndex].label[language]}
                                        </div>
                                      </div>
                                      
                                      {/* Gallery Nav */}
                                      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                        {book.gallery.map((img, idx) => (
                                          <button
                                            key={idx}
                                            onClick={() => setActiveGalleryIndex(idx)}
                                            className={`w-12 h-12 rounded border shrink-0 transition-all overflow-hidden ${
                                              activeGalleryIndex === idx 
                                                ? 'border-medieval-gold scale-110' 
                                                : 'border-medieval-gold/10 opacity-40 hover:opacity-100'
                                            }`}
                                          >
                                            <img src={img.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="aspect-video bg-black/40 rounded border border-medieval-gold/10 flex flex-col items-center justify-center text-medieval-gold/20">
                                      <Map className="w-8 h-8 mb-2" />
                                      <span className="text-[10px] uppercase tracking-widest">Mapa em breve</span>
                                    </div>
                                  )}
                                </div>

                                <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg space-y-4">
                                  <h4 className="text-medieval-gold font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                    <Book className="w-4 h-4" /> {t('transcription')}
                                  </h4>
                                  <div className="relative p-6 sm:p-10 bg-[#f4e4bc] text-[#2c1810] rounded shadow-inner min-h-[300px] font-serif leading-relaxed italic text-lg overflow-hidden">
                                    {/* Parchment texture effect */}
                                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                                    <div className="relative z-10 whitespace-pre-wrap space-y-4">
                                      {book.content[language]}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-medieval-gold/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-mono text-medieval-gold/40">
          <p>© 2024 Miracle 7.4 Wiki Project</p>
          <div className="flex gap-6">
            <span>{t('createdBy')}</span>
            <span>{t('developedWithIA')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
