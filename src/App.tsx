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
  ChevronRight, Menu, X, Map, Youtube, Fish, FlaskConical, Utensils, Sprout, Scissors, Users 
} from 'lucide-react';

// --- Dados do Banco de Dados Embutido ---
const CRAFT_ITEMS = [
  {
    category: "Gemas Gigantes",
    icon: <Gem className="w-5 h-5" />,
    items: [
      { name: "Giant Ruby", multiplier: 2, req: "10 Small Rubys" },
      { name: "Giant Emerald", multiplier: 2, req: "10 Small Emeralds" },
      { name: "Giant Sapphire", multiplier: 2, req: "10 Small Sapphires" },
      { name: "Giant Amethyst", multiplier: 2, req: "10 Small Amethysts" },
    ]
  },
  {
    category: "Ferramentas & Picks",
    icon: <Pickaxe className="w-5 h-5" />,
    items: [
      { name: "Modified Pick", multiplier: 2, req: "1 Pick + 5 Steels" },
      { name: "Advanced Pick", multiplier: 1.5, req: "1 Pick + 10 Steels" },
      { name: "Enhanced Pick", multiplier: 1, req: "1 Pick + 20 Steels" },
      { name: "Diamon Knife", multiplier: 1, req: "10 small diamonds + 5 Hell Steels + 1 Combat Knife" },
    ]
  },
  {
    category: "Rods",
    icon: <Wand2 className="w-5 h-5" />,
    items: [
      { name: "Reinforced Rod", multiplier: 2, req: "1 fishing rod + 5 steels" },
      { name: "Engineered Rod", multiplier: 1.5, req: "1 fishing rod + 10 steels + 1 draconian steel" },
      { name: "Volcanic Rod", multiplier: 1, req: "1 fishing rod + 20 steels + 10 glimmering soils + 5 draconian steels + 3 hell steels" },
      { name: "Golden Rod", multiplier: 0.5, req: "1 fishing rod + 40 steels + 10 draconian steels + 3 gold ingot + 3 hell steels" },
    ]
  },
  {
    category: "Runas de Crafting",
    icon: <Zap className="w-5 h-5" />,
    items: [
      { name: "Ember Rune", multiplier: 1, req: "5 Ember Fragments + 3 Pulverized Ores + 1 Onyx" },
      { name: "Protector Rune", multiplier: 1, req: "5 Protector Fragments + 3 Pulverized Ores + 1 Onyx" },
      { name: "Obsidian Rune", multiplier: 1, req: "5 Protector Fragments + 3 Pulverized Ores + 1 Onyx" },
      { name: "Astral Rune", multiplier: 1, req: "5 Astral Fragments + 3 Pulverized Ores + 1 Onyx" },
      { name: "Aegis Rune", multiplier: 1, req: "5 Aegis Fragments + 3 Pulverized Ores + 1 Onyx" },
      { name: "Molten Rune", multiplier: 1, req: "5 Molten Fragments + 3 Pulverized Ores + 1 Onyx" },
    ]
  },
  {
    category: "Outros",
    icon: <Sword className="w-5 h-5" />,
    items: [
      { name: "Fiery Stone", multiplier: 0.5, req: "5 Glimmering Soils" },
      { name: "10x Steel Bolts", multiplier: 1.2, req: "10 bolt + 1 steel + 1x Natural Soil" },
    ]
  }
];

const BREAKING_DATA = [
  { item: "Short Sword", max: 1, min: 0, mathAvg: "0.5 Steels", practicalAvg: "0.27 Steels", verdict: "Vender NPC ou UPAR SKILL" },
  { item: "Sword", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "Vender NPC" },
  { item: "Plate Shield", max: 3, min: 0, mathAvg: "1.5 Steels", practicalAvg: "1.52 Steels", verdict: "Vender NPC" },
  { item: "Dwarven Shield", max: 8, min: 0, mathAvg: "4 Steels", practicalAvg: "4.35 Steels", verdict: "QUEBRAR PARA MATERIAL" },
  { item: "Studded Armor", max: 1, min: 0, mathAvg: "1 Steel", practicalAvg: "0.47 Steels", verdict: "UPAR SKILL" },
  { item: "Chain Armor", max: 5, min: 0, mathAvg: "2.5 Steels", practicalAvg: "2.60 Steels", verdict: "Vender NPC OU COLETAR MAT RAPIDO" },
  { item: "Mace", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.10 Steels", verdict: "Vender NPC" },
  { item: "Longsword", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC" },
  { item: "Chain Helmet", max: 1, min: 0, mathAvg: "0.5 Steel", practicalAvg: "0.50 Steels", verdict: "UPAR SKILL" },
  { item: "Steel Shield", max: 6, min: 0, mathAvg: "3 Steels", practicalAvg: "2.90 Steels", verdict: "Vender NPC OU COLETAR MAT RAPIDO" },
  { item: "Scale Armor", max: 8, min: 0, mathAvg: "4 Steels", practicalAvg: "3.57 Steels", verdict: "QUEBRAR" },
  { item: "Wooden Shield", max: 1, min: 0, mathAvg: "0.5 Steels", practicalAvg: "0.30 Steels", verdict: "UPAR SKILL" },
  { item: "Hand Axe", max: 1, min: 0, mathAvg: "0.5 Steels", practicalAvg: "0.30 Steels", verdict: "UPAR SKILL" },
  { item: "Axe", max: 1, min: 0, mathAvg: "0.5 Steels", practicalAvg: "0.32 Steels", verdict: "UPAR SKILL" },
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

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [calcSubTab, setCalcSubTab] = useState<'crafting' | 'atributos'>('crafting');
  const [skill, setSkill] = useState<number>(10);
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
    { id: 'home', label: 'Início', icon: <Book className="w-4 h-4" /> },
    { id: 'calculadoras', label: 'Calculadoras', icon: <Hammer className="w-4 h-4" /> },
    { id: 'profissoes', label: 'Profissões', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'mapa', label: 'Mapa', icon: <Map className="w-4 h-4" /> },
    { id: 'eventos', label: 'Eventos', icon: <Users className="w-4 h-4" /> },
    { id: 'wiki', label: 'Wiki Geral', icon: <Book className="w-4 h-4" /> },
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
              Miracle 7.4 Wiki
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
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-medieval-gold p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
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
                      Bem-vindo ao <br /> Miracle 7.4 Wiki
                    </h1>
                    <p className="text-medieval-gold/60 font-mono text-lg mt-4 max-w-2xl mx-auto">
                      O guia definitivo para mestres artesãos e aventureiros. Ferramentas, dados e conhecimento em um só lugar.
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                  {/* Card Calculadoras */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Hammer className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">Ferramentas & Calculadoras</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      Acesse nossas ferramentas de precisão para otimizar seus recursos e garantir o sucesso em suas empreitadas.
                    </p>
                      <div className="grid grid-cols-1 gap-3 pt-4">
                        <button 
                          onClick={() => {
                            setActiveTab('calculadoras');
                            setCalcSubTab('crafting');
                          }}
                          className="flex items-center justify-between p-4 bg-black/40 border border-medieval-gold/20 rounded hover:border-medieval-gold hover:bg-medieval-gold/5 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <Hammer className="text-medieval-gold w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-sm">Calculadora de Crafting</span>
                          </div>
                          <ChevronRight className="text-medieval-gold w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('calculadoras');
                            setCalcSubTab('atributos');
                          }}
                          className="flex items-center justify-between p-4 bg-black/40 border border-medieval-gold/20 rounded hover:border-medieval-gold hover:bg-medieval-gold/5 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <Sparkles className="text-medieval-gold w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-sm">Chance de Atributos</span>
                          </div>
                          <ChevronRight className="text-medieval-gold w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                  </div>

                  {/* Card Twitch/Discord */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Twitch className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">Comunidade</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed flex-1">
                      Fique por dentro das novidades, participe de sorteios e tire suas dúvidas diretamente com o criador e outros jogadores.
                    </p>
                    <div className="grid grid-cols-1 gap-3 pt-4">
                      <a href="https://www.twitch.tv/obellao_" target="_blank" rel="noopener noreferrer" className="medieval-button flex items-center justify-center gap-3">
                        <Twitch className="w-5 h-5" /> Twitch do obellao_
                      </a>
                      <a href="https://discord.gg/nacCypRkqQ" target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] text-white font-bold py-3 px-6 rounded-sm flex items-center justify-center gap-3 hover:bg-[#4752C4] transition-colors">
                        <MessageSquare className="w-5 h-5" /> Nosso Discord
                      </a>
                    </div>
                  </div>
                </div>

                {/* Seção de Destaque Wiki */}
                <div className="medieval-border rounded-lg bg-black/40 p-8 text-center space-y-4">
                  <Book className="w-12 h-12 text-medieval-gold/40 mx-auto" />
                  <h3 className="text-xl font-black text-medieval-gold uppercase tracking-widest">Em breve: Wiki de Profissões</h3>
                  <p className="text-medieval-text/50 text-sm max-w-xl mx-auto">
                    Estamos catalogando todas as profissões, drops e segredos do Miracle 7.4. Fique atento às atualizações!
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
                <div className="flex justify-center gap-4 mb-8">
                  <button
                    onClick={() => setCalcSubTab('crafting')}
                    className={`px-6 py-3 rounded-sm font-black uppercase tracking-widest text-xs transition-all ${
                      calcSubTab === 'crafting'
                        ? 'bg-medieval-gold text-black shadow-[0_4px_0_#8b7326]'
                        : 'bg-medieval-card text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Hammer className="w-4 h-4" /> Crafting
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
                      <Sparkles className="w-4 h-4" /> Atributos
                    </div>
                  </button>
                </div>

                {calcSubTab === 'crafting' ? (
                  <div className="space-y-12">
                    {/* Cabeçalho Crafting */}
                    <header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
                        Sistema de Crafting
                      </h1>
                      <p className="text-medieval-gold/80 font-mono text-sm">
                        Cálculos de chance e guia de materiais
                      </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Calculadora */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg">
                          <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Sua Skill Atual
                              </label>
                              <input
                                type="number"
                                min="10"
                                max="200"
                                value={skill}
                                onChange={(e) => setSkill(Number(e.target.value))}
                                className="medieval-input text-2xl font-bold"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                                <Hammer className="w-4 h-4" /> Item a ser Craftado
                              </label>
                              <select
                                value={selectedItemName}
                                onChange={(e) => setSelectedItemName(e.target.value)}
                                className="medieval-input cursor-pointer appearance-none"
                              >
                                {CRAFT_ITEMS.map((category) => (
                                  <optgroup key={category.category} label={category.category} className="bg-medieval-dark text-medieval-gold">
                                    {category.items.map((item) => (
                                      <option key={item.name} value={item.name}>
                                        {item.name} (Mult: {item.multiplier})
                                      </option>
                                    ))}
                                  </optgroup>
                                ))}
                              </select>
                            </div>

                            {selectedItem.req && (
                              <div className="bg-black/40 p-4 rounded border border-medieval-gold/20 flex items-start gap-3">
                                <Info className="w-5 h-5 text-medieval-gold shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs uppercase text-medieval-gold/60 font-bold tracking-tighter">Requisitos:</p>
                                  <p className="text-sm text-medieval-text italic">{selectedItem.req}</p>
                                </div>
                              </div>
                            )}

                            <div className="pt-6 border-t border-medieval-gold/20">
                              <div className="text-center space-y-2">
                                <p className="text-medieval-gold/60 uppercase text-xs font-bold tracking-[0.2em]">Chance de Sucesso</p>
                                <div className={`text-6xl sm:text-7xl font-black ${chance >= 70 ? 'text-green-500' : chance >= 40 ? 'text-medieval-gold' : 'text-medieval-red'}`}>
                                  {chance}%
                                </div>
                                <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-medieval-gold/30 mt-4">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${chance}%` }}
                                    className={`h-full ${chance >= 70 ? 'bg-green-500' : chance >= 40 ? 'bg-medieval-gold' : 'bg-medieval-red'}`}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Twitch/Social */}
                      <div className="lg:col-span-5 space-y-6">
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
                          <a href="https://discord.gg/nacCypRkqQ" target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] text-white font-bold py-3 px-6 rounded-sm flex items-center justify-center gap-3">
                            <MessageSquare className="w-6 h-6" /> Discord
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Tabela de Quebra */}
                    <section className="space-y-6">
                      <div className="flex items-center gap-3">
                        <TableIcon className="text-medieval-gold w-6 h-6" />
                        <h2 className="text-2xl font-black text-medieval-gold uppercase tracking-tight">Guia de Quebra de Itens</h2>
                      </div>
                      <div className="medieval-border rounded-lg overflow-hidden bg-medieval-card overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-black/60 text-medieval-gold uppercase text-xs tracking-widest border-b border-medieval-gold/30">
                              <th className="p-4 font-black">Item</th>
                              <th className="p-4 text-center">Máx</th>
                              <th className="p-4 text-center">Mín</th>
                              <th className="p-4">Média Mat.</th>
                              <th className="p-4">Média Prática</th>
                              <th className="p-4">Veredito</th>
                            </tr>
                          </thead>
                          <tbody className="text-sm">
                            {BREAKING_DATA.map((row, idx) => (
                              <tr key={idx} className={`border-b border-medieval-gold/10 hover:bg-white/5 ${idx % 2 === 0 ? 'bg-black/20' : ''}`}>
                                <td className="p-4 font-bold text-medieval-gold">{row.item}</td>
                                <td className="p-4 text-center">{row.max}</td>
                                <td className="p-4 text-center">{row.min}</td>
                                <td className="p-4">{row.mathAvg}</td>
                                <td className="p-4 font-mono">{row.practicalAvg}</td>
                                <td className="p-4">
                                  <span className={`px-2 py-1 rounded-sm text-[10px] font-black uppercase ${
                                    row.verdict.includes('QUEBRAR') ? 'text-green-400 border-green-500/30' :
                                    row.verdict.includes('UPAR') ? 'text-blue-400 border-blue-500/30' : 'text-medieval-red border-medieval-red/30'
                                  } border bg-black/40`}>
                                    {row.verdict}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
                        Calculadora de Atributos
                      </h1>
                      <p className="text-medieval-gold/80 font-mono text-sm">
                        Chance de encantar itens com Mystic Rune & Orbs
                      </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-7 space-y-6">
                        <div className="medieval-card bg-medieval-card p-6 sm:p-8 medieval-border rounded-lg">
                          <div className="space-y-6">
                            {/* Seleção de Categoria */}
                            <div className="flex flex-col gap-2">
                              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                                <TableIcon className="w-4 h-4" /> Categoria
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
                                <Sword className="w-4 h-4" /> Equipamento
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
                                <Info className="w-4 h-4" /> Atributos Permitidos:
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
                            <TrendingUp className="w-4 h-4" /> Entenda a Fórmula
                          </h3>
                          <div className="space-y-3 text-xs text-medieval-text/70 leading-relaxed font-mono">
                            <p>1. A <span className="text-medieval-gold">Classe</span> do item define quantos níveis de cada atributo ele pode receber.</p>
                            <p>2. Somamos as chances de todos os níveis permitidos para este item.</p>
                            <p>3. Dividimos pelo total de níveis lidos.</p>
                            <p>4. <span className="text-medieval-gold">Grand Orb</span> aplica um bônus multiplicador de 1.5x no resultado final.</p>
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
                <header className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
                    Mapa Interativo
                  </h1>
                  <p className="text-medieval-gold/80 font-mono text-sm mb-4">
                    Explore o mundo de Miracle 7.4 em tempo real
                  </p>
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-medieval-gold/10 border border-medieval-gold/30 rounded-full">
                    <AlertTriangle className="w-4 h-4 text-medieval-gold animate-pulse" />
                    <span className="text-[10px] uppercase font-black tracking-widest text-medieval-gold">
                      Projeto em Construção • Estudos em Andamento • Ajuda é bem-vinda
                    </span>
                  </div>
                </header>

                <div className="medieval-border rounded-lg overflow-hidden bg-black shadow-2xl" style={{ height: '70vh' }}>
                  <iframe 
                    src="/mapa.html" 
                    className="w-full h-full border-none"
                    title="Mapa Interativo Miracle 7.4"
                  />
                </div>

                <div className="text-center">
                  <a 
                    href="/mapa.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="medieval-button inline-flex items-center gap-3"
                  >
                    <ExternalLink className="w-5 h-5" /> Abrir Mapa em Tela Cheia
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
                    Guia de Profissões
                  </h1>
                  <p className="text-medieval-gold/80 font-mono text-sm">
                    Aprenda as artes e ofícios do Miracle 7.4
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Card Crafting */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Hammer className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">Crafting</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed flex-1">
                      A arte de criar equipamentos, ferramentas e itens valiosos. Essencial para qualquer aventureiro que busca independência.
                    </p>
                    <div className="pt-4">
                      <a 
                        href="https://www.youtube.com/watch?v=keb5CtwOwBI" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-[#FF0000] text-white font-bold py-3 px-6 rounded-sm flex items-center justify-center gap-3 hover:bg-[#CC0000] transition-colors w-full"
                      >
                        <Youtube className="w-5 h-5" /> Tutorial de Crafting
                      </a>
                    </div>
                  </div>

                  {/* Mineração */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Pickaxe className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">Mineração</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      Em breve: Guia completo sobre extração de minérios e gemas.
                    </p>
                  </div>

                  {/* Farming */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Sprout className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">Farming</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      Em breve: Guia sobre cultivo e colheita de recursos.
                    </p>
                  </div>

                  {/* Cooking */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Utensils className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">Cooking</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      Em breve: Receitas e benefícios das comidas preparadas.
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
                      Em breve: Como extrair couros e materiais de criaturas.
                    </p>
                  </div>

                  {/* Fishing */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <Fish className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">Fishing</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      Em breve: Guia de pesca e tesouros subaquáticos.
                    </p>
                  </div>

                  {/* Alchemy */}
                  <div className="medieval-card bg-medieval-card p-8 medieval-border rounded-lg space-y-6 opacity-50 grayscale">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-medieval-gold/10 rounded-lg">
                        <FlaskConical className="text-medieval-gold w-8 h-8" />
                      </div>
                      <h2 className="text-2xl font-black text-medieval-gold uppercase">Alchemy</h2>
                    </div>
                    <p className="text-medieval-text/70 text-sm leading-relaxed">
                      Em breve: Criação de poções e elixires mágicos.
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
                    Lobby de Quests & Eventos
                  </h1>
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-medieval-gold/10 border border-medieval-gold/30 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-[10px] font-black text-medieval-gold uppercase tracking-widest">Sistema em Tempo Real (Supabase)</p>
                  </div>
                </header>

                <div className="medieval-border rounded-lg overflow-hidden bg-black h-[800px] relative">
                  <iframe 
                    src="/lobby.html" 
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
                className="text-center py-20"
              >
                <Book className="w-16 h-16 text-medieval-gold/20 mx-auto mb-4" />
                <h2 className="text-medieval-gold/40 uppercase font-black tracking-widest">Wiki Geral em breve</h2>
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
            <span>Criado por obellao_</span>
            <span>Desenvolvido com IA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
