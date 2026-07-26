/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, Sword, Gem, Pickaxe, Wand2, Zap, Tv, Wheat, 
  MessageSquare, ExternalLink, Info, Table as TableIcon, 
  TrendingUp, AlertTriangle, Book, BookOpen, Sparkles, Briefcase, 
  ChevronRight, ChevronUp, ChevronDown, Menu, X, Map, MonitorPlay, Fish, FlaskConical, Utensils, Sprout, Scissors, Users,
  History, Plus, Minus, Check, RefreshCw, Clock, Calendar, Download, Shield, Circle, Heart, Target, Axe, Coins, Eye,
  Search, Skull, Settings
} from 'lucide-react';
import { calculateTrainingTime, Vocation, SkillType, TRAINING_WEAPONS_DATA, TrainingWeapon, calculateBlessCosts } from './lib/formulas';
import { Language, translations } from './lib/translations';
import { PROJECT_PATCH_NOTES, SERVER_PATCH_NOTES } from './data/patchNotes';
import { LIBRARY_DATA, LibraryEntry } from './data/library';
import { HELMETS_DATA, EquipmentItem } from './data/items';
import { ItemImage } from './components/ItemImage';
import { ALL_BUILD_ITEMS } from './data/buildItems';
import { ALCHEMY_RUNES } from './data/alchemy';
import { FARMING_TREES } from './data/farming';
import SkillCalculator from "./components/SkillCalculator";
import { AlchemyCalculator } from './components/AlchemyCalculator';
import { FarmingCalculator } from './components/FarmingCalculator';
import { CraftingCalculator } from './components/CraftingCalculator';
import { MiningCalculator } from './components/MiningCalculator';
import { RuneMakingCalculator } from './components/RuneMakingCalculator';
import { MapModal } from './components/MapModal';
import MapViewer from './components/MapViewer';
import { LootOptimizer } from './components/LootOptimizer';
import { supabase } from './lib/supabase';
import { Analytics } from '@vercel/analytics/react';

// --- Dados do Banco de Dados Embutido ---
export const CRAFT_ITEMS = [
  {
    category: "toolsPicks",
    items: [
      { name: "Modified Pick", multiplier: 2, req: "1 Pick + 5 Steels", materials: [{ name: "Pick", amount: 1 }, { name: "Steel", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Modified_pick.gif" },
      { name: "Advanced Pick", multiplier: 1.5, req: "1 Pick + 1 Draconian Steel + 10 Steels", materials: [{ name: "Pick", amount: 1 }, { name: "Draconian Steel", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Draconian_Steel.gif" }, { name: "Steel", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Advanced_pick.gif" },
      { name: "Enhanced Pick", multiplier: 1, req: "1 Pick + 5 Draconian Steels + 20 Steels", materials: [{ name: "Pick", amount: 1 }, { name: "Draconian Steel", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Draconian_Steel.gif" }, { name: "Steel", amount: 20, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Enchanced_Pick.gif" },
    ]
  },
  {
    category: "rods",
    items: [
      { name: "Reinforced Rod", multiplier: 2, req: "1 fishing rod + 5 steels", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Reinforced_rod.gif" },
      { name: "Engineered Rod", multiplier: 1.5, req: "1 fishing rod + 10 steels + 1 draconian steel", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }, { name: "Draconian Steel", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Draconian_Steel.gif" }] },
      { name: "Volcanic Rod", multiplier: 1, req: "1 fishing rod + 20 steels + 10 glimmering soils + 5 draconian steels + 3 hell steels", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 20, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }, { name: "Glimmering Soil", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/glmeringsoil.gif" }, { name: "Draconian Steel", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Draconian_Steel.gif" }, { name: "Hell Steel", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/hell_steel.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Volcanic_rod.gif" },
      { name: "Golden Rod", multiplier: 0.5, req: "1 fishing rod + 40 steels + 10 draconian steels + 3 gold ingot + 3 hell steels", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 40, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }, { name: "Draconian Steel", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Draconian_Steel.gif" }, { name: "Gold Ingot", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/goldingot.gif" }, { name: "Hell Steel", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/hell_steel.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_rod.gif" },
    ]
  },
  {
    category: "skinningKnives",
    items: [
      { name: "Diamond Knife", multiplier: 1, req: "10 small diamonds + 5 Hell Steels + 1 Combat Knife", materials: [{ name: "Small Diamond", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/smalldiamond.gif" }, { name: "Hell Steel", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/hell_steel.gif" }, { name: "Combat Knife", amount: 1 }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784736439/diamong_knife.gif" },
    ]
  },
  {
    category: "cuttingAxes",
    items: [
      { name: "Refined Axe", multiplier: 1, req: "1x rough axe (consumed on success), 10x steels, 1x draconian steel", materials: [{ name: "Rough Axe", amount: 1 }, { name: "Steel", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }, { name: "Draconian Steel", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Draconian_Steel.gif" }] },
      { name: "Superior Axe", multiplier: 0.8, req: "1x refined axe (consumed on success), 20x steels, 5x draconian steels", materials: [{ name: "Refined Axe", amount: 1 }, { name: "Steel", amount: 20, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }, { name: "Draconian Steel", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Draconian_Steel.gif" }] },
      { name: "Masterwork Axe", multiplier: 0.6, req: "1x superior axe (consumed on success), 40x steels, 10x draconian steels", materials: [{ name: "Superior Axe", amount: 1 }, { name: "Steel", amount: 40, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }, { name: "Draconian Steel", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Draconian_Steel.gif" }] },
      { name: "Grandmaster Axe", multiplier: 0.4, req: "1x masterwork axe (consumed on success), 80x steels, 20x draconian steels, 3x hell steel, 5x small topaz", materials: [{ name: "Masterwork Axe", amount: 1 }, { name: "Steel", amount: 80, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }, { name: "Draconian Steel", amount: 20, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Draconian_Steel.gif" }, { name: "Hell Steel", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/hell_steel.gif" }, { name: "Small Topaz", amount: 5 }] },
    ]
  },
  {
    category: "mysticRunes",
    items: [
      { name: "Ember Rune", multiplier: 1, req: "5 Ember Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Ember Fragment", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/emberfrag.gif" }, { name: "Pulverized Ore", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/pulverizedore.gif" }, { name: "Onyx", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/onyx.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/ember.gif" },
      { name: "Protector Rune", multiplier: 1, req: "5 Protector Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Protector Fragment", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/protectorfrag.gif" }, { name: "Pulverized Ore", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/pulverizedore.gif" }, { name: "Onyx", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/onyx.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/protector.gif" },
      { name: "Obsidian Rune", multiplier: 1, req: "5 Obsidian Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Obsidian Fragment", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/obsidianfrag.gif" }, { name: "Pulverized Ore", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/pulverizedore.gif" }, { name: "Onyx", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/onyx.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/obsidian.gif" },
      { name: "Astral Rune", multiplier: 1, req: "5 Astral Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Astral Fragment", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/astralfrag.gif" }, { name: "Pulverized Ore", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/pulverizedore.gif" }, { name: "Onyx", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/onyx.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/astral.gif" },
      { name: "Aegis Rune", multiplier: 1, req: "5 Aegis Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Aegis Fragment", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/aegisfrag.gif" }, { name: "Pulverized Ore", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/pulverizedore.gif" }, { name: "Onyx", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/onyx.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/aegis.gif" },
      { name: "Molten Rune", multiplier: 1, req: "5 Molten Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Molten Fragment", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/moltenfrag.gif" }, { name: "Pulverized Ore", amount: 3, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/pulverizedore.gif" }, { name: "Onyx", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/onyx.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/molten.gif" },
    ]
  },
  {
    category: "others",
    items: [
      { name: "Fiery Stone", multiplier: 0.5, req: "5 Glimmering Soils", materials: [{ name: "Glimmering Soil", amount: 5, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/glmeringsoil.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/fiery.gif" },
    ]
  },
  {
    category: "giantGemsRelics",
    items: [
      { name: "Giant Ruby", multiplier: 2, req: "10 Small Rubys", materials: [{ name: "Small Ruby", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/smallruby.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/giant_ruby.gif" },
      { name: "Giant Emerald", multiplier: 2, req: "10 Small Emeralds", materials: [{ name: "Small Emerald", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/smallemerald.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/giant_emerald.gif" },
      { name: "Giant Sapphire", multiplier: 2, req: "10 Small Sapphires", materials: [{ name: "Small Sapphire", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/smallsaphire.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/giant_saphire.gif" },
      { name: "Giant Amethyst", multiplier: 2, req: "10 Small Amethysts", materials: [{ name: "Small Amethyst", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/smallamethyst.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/giant_amethyst.gif" },
      { name: "Spiritualist Gem", multiplier: 2, req: "10 Small Spiritualist Gems", materials: [{ name: "Small Spiritualist Gem", amount: 10 }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/spiritualist_gem.gif" },
      { name: "Marksman Gem", multiplier: 2, req: "10 Small Marksman Gems", materials: [{ name: "Small Marksman Gem", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/marksmanfrag.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/marksman_gem.gif" },
      { name: "Sage Gem", multiplier: 2, req: "10 Small Sage Gems", materials: [{ name: "Small Sage Gem", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/sagefrag.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Sage_gem.gif" },
      { name: "Guardian Gem", multiplier: 2, req: "10 Small Guardian Gems", materials: [{ name: "Small Guardian Gem", amount: 10, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/guardianfrag.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/guardian_gem.gif" },
    ]
  },
  {
    category: "ammunition",
    items: [
      { name: "10x Steel Bolts", multiplier: 2, req: "10 bolt + 1 steel", materials: [{ name: "Bolt", amount: 10 }, { name: "Steel", amount: 1, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piece_of_Steel.gif" }] },
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
    { "name": "Black Hat", "class": 3, "attributes": ["Speed", "Max Mana", "Momentum", "Mana Regen", "Magic Level", "Destruction", "Mana Healing", "Protect Fire", "Protect Death", "Critical Spell", "Protect Life Drain", "Protect Mana Drain"] },
    { "name": "Crusader Helmet", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Protect Physical"] },
    { "name": "Warrior Helmet", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Sword Fighting", "Shielding", "Protect Physical"] },
    { "name": "Frozen Helmet", "class": 3, "attributes": ["Armor", "Speed", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Protect Ice", "Sword Fighting", "Health Regen"] },
    { "name": "Royal Helmet", "class": 3, "attributes": ["Armor", "Speed", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Physical"] },
    { "name": "Winged Helmet", "class": 4, "attributes": ["Armor", "Speed", "Weight", "Healing", "Max Health", "Distance Fighting", "Health Regen", "Shielding", "Protect Energy", "Protect Physical"] },
    { "name": "Demon Helmet", "class": 4, "attributes": ["Armor", "Speed", "Weight", "Max Mana", "Momentum", "Axe Fighting", "Mana Regen", "Max Health", "Club Fighting", "Distance Fighting", "Magic Level", "Sword Fighting", "Health Regen", "Protect Fire", "Protect Energy"] },
    { "name": "Dragon Scale Helmet", "class": 4, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Fire", "Shielding", "Protect Physical"] },
    { "name": "Helmet Of The Ancients (Empty)", "class": 5, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Fire", "Shielding", "Protect Physical"] },
    { "name": "Helmet Of The Ancients (Full)", "class": 5, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Fire", "Shielding", "Protect Physical"] },
    { "name": "Horned Helmet", "class": 5, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Fire", "Shielding", "Protect Physical"] },
    { "name": "Golden Helmet", "class": 5, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Shielding", "Protect Elements", "Protect Physical"] }
  ],
  "Armors": [
    { "name": "Spectral Dress", "class": 0, "attributes": [] },
    { "name": "Ball Gown", "class": 0, "attributes": [] },
    { "name": "White Dress", "class": 0, "attributes": [] },
    { "name": "Simple Dress", "class": 0, "attributes": [] },
    { "name": "Cape", "class": 0, "attributes": [] },
    { "name": "Green Tunic", "class": 0, "attributes": [] },
    { "name": "Coat", "class": 0, "attributes": [] },
    { "name": "Jacket", "class": 0, "attributes": [] },
    { "name": "Doublet", "class": 0, "attributes": [] },
    { "name": "Red Tunic", "class": 0, "attributes": [] },
    { "name": "Pirate Shirt", "class": 0, "attributes": [] },
    { "name": "Leather Armor", "class": 0, "attributes": [] },
    { "name": "Studded Armor", "class": 0, "attributes": [] },
    { "name": "Chain Armor", "class": 0, "attributes": [] },
    { "name": "Ranger's Cloak", "class": 1, "attributes": [] },
    { "name": "Native Armor", "class": 0, "attributes": [] },
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
    { "name": "Golden Armor", "class": 4, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Shielding", "Protect Energy", "Protect Physical"] },
    { "name": "Spectral Robe", "class": 4, "attributes": ["Speed", "Max Mana", "Mana Regen", "Absorb Mana", "Magic Level", "Protect Physical"] },
    { "name": "Dragon Scale Mail", "class": 4, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Shielding", "Protect Fire", "Protect Physical"] },
    { "name": "Frozen Mail", "class": 4, "attributes": [] },
    { "name": "Demon Armor", "class": 5, "attributes": ["Armor", "Speed", "Weight", "Max Mana", "Axe Fighting", "Mana Regen", "Max Health", "Club Fighting", "Distance Fighting", "Magic Level", "Sword Fighting", "Health Regen", "Protect Fire", "Protect Energy", "Protect Mana Drain"] },
    { "name": "Magic Plate Armor", "class": 5, "attributes": ["Armor", "Weight", "Healing", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Shielding", "Protect Physical"] },
    { "name": "Spectral Armor", "class": 5, "attributes": [] },
    { "name": "Anubis Armor", "class": 5, "attributes": [] },
    { "name": "Pharaoh Armor", "class": 5, "attributes": [] }
  ],
  "Legs": [
    { "name": "Leather Legs", "class": 0, "attributes": [] },
    { "name": "Studded Legs", "class": 1, "attributes": [] },
    { "name": "Chain Legs", "class": 0, "attributes": [] },
    { "name": "Elven Legs", "class": 1, "attributes": ["Armor", "Weight", "Max Mana", "Mana Regen", "Magic Level", "Protect Mana Drain"] },
    { "name": "Brass Legs", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Dwarven Legs", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire", "Protect Physical"] },
    { "name": "Plate Legs", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Knight Legs", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Sword Fighting", "Protect Physical"] },
    { "name": "Crown Legs", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Physical"] },
    { "name": "Golden Legs", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Health Regen", "Protect Energy", "Protect Physical"] },
    { "name": "Demon Legs", "class": 4, "attributes": ["Armor", "Speed", "Weight", "Max Mana", "Axe Fighting", "Mana Regen", "Max Health", "Club Fighting", "Distance Fighting", "Sword Fighting", "Magic Level", "Protect Physical"] },
    { "name": "Frozen Legs", "class": 3, "attributes": [] },
    { "name": "Dragon Scale Legs", "class": 4, "attributes": [] },
    { "name": "Spectral Legs", "class": 5, "attributes": [] },
    { "name": "Anubis Legs", "class": 5, "attributes": [] },
    { "name": "Pharaoh Legs", "class": 5, "attributes": [] }
  ],
  "Boots": [
    { "name": "Leather Boots", "class": 1, "attributes": ["Armor", "Speed", "Vibrancy"] },
    { "name": "Boots Of Haste", "class": 2, "attributes": ["Armor", "Dodge", "Speed", "Vibrancy"] },
    { "name": "Bunnyslippers", "class": 2, "attributes": ["Armor", "Mana Regen", "Magic Level", "Protect Ice", "Health Regen"] },
    { "name": "Patched Boots", "class": 2, "attributes": ["Armor", "Speed", "Vibrancy"] },
    { "name": "Steel Boots", "class": 3, "attributes": ["Armor", "Vibrancy", "Protect Fire", "Protect Physical"] },
    { "name": "Frozen Boots", "class": 3, "attributes": ["Armor", "Speed", "Magic Level", "Protect Ice"] }
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
    { "name": "Spectral Shield", "class": 4, "attributes": [] },
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

import { BuildMakerView } from './components/BuildMakerView';
import { ProfessionsGuideView } from "./components/ProfessionsGuideView";
import { FeedbackBoard } from './components/FeedbackBoard';
import BestiaryEditor from './components/BestiaryEditor';
import CyclopediaView from './components/CyclopediaView';

type Tab = 'home' | 'calculadoras' | 'profissoes' | 'mapa' | 'eventos' | 'wiki' | 'buildmaker' | 'loot' | 'feedback' | 'hunts' | 'bestiary-editor';

const VOC_SPELLS: Record<string, { name: string; mana: number }[]> = {
  Sorcerer: [
    { name: "Heavy Magic Missile (adori gran)", mana: 70 },
    { name: "Sudden Death (adori vita vis)", mana: 220 },
    { name: "Great Fireball (adori gran flam)", mana: 120 }
  ],
  Druid: [
    { name: "Ultimate Healing (adura vita)", mana: 100 },
    { name: "Intense Healing (adura gran)", mana: 60 },
    { name: "Envenom (adevo res pox)", mana: 100 },
    { name: "Heavy Magic Missile (adori gran)", mana: 70 }
  ],
  Paladin: [
    { name: "Heavy Magic Missile (adori gran)", mana: 70 }
  ],
  Knight: []
};

const MANA_REGEN_TIME_PER_MP: Record<string, { normal: number; promoted: number }> = {
  Sorcerer: { normal: 6, promoted: 4 },
  Druid: { normal: 6, promoted: 4 },
  Paladin: { normal: 8, promoted: 6 },
  Knight: { normal: 12, promoted: 12 } // 12 seconds per mana to match the prints exactly
};

// --- Componente Calculadora de Bless ---

const BLESS_LOCATIONS = [
  { 
    id: 'spiritual', 
    name: 'The Spiritual Shielding', 
    locations: [{ label: 'Thais (Norf)', x: 32346, y: 32361, z: 6 }] 
  },
  { 
    id: 'embrace', 
    name: 'The Embrace of Tibia', 
    locations: [{ label: 'Carlin (Humphrey)', x: 32359, y: 31683, z: 6 }] 
  },
  { 
    id: 'fire', 
    name: 'The Fire of the Suns', 
    locations: [{ label: "Ab'Dendriel (Edala)", x: 32697, y: 31718, z: 2 }] 
  },
  { 
    id: 'spark', 
    name: 'The Spark of the Phoenix', 
    locations: [
      { label: 'Kazordoon (Kawill)', x: 32644, y: 31967, z: 12 },
      { label: 'Kazordoon (Pydar)', x: 32651, y: 31892, z: 11 }
    ] 
  },
  { 
    id: 'wisdom', 
    name: 'The Wisdom of Solitude', 
    locations: [{ label: 'Edron (Eremo)', x: 33322, y: 31883, z: 7 }] 
  },
  {
    id: 'arcane',
    name: 'The Arcane Guardian',
    locations: [
      { label: 'Carlin (Humphrey)', x: 32359, y: 31683, z: 6 },
      { label: 'Edron (Eremo)', x: 33322, y: 31883, z: 7 }
    ]
  },
  { 
    id: 'tome', 
    name: 'Bless Tome', 
    locations: [{ label: 'Edron (Eremo)', x: 33322, y: 31883, z: 7 }] 
  },
];

function BlessCalculator({ t }: { t: any }) {
  const [level, setLevel] = useState<number>(100);
  const [activeMap, setActiveMap] = useState<{name: string; city: string; x: number; y: number; z: number} | null>(null);
  const costs = useMemo(() => calculateBlessCosts(level), [level]);


  const renderCostCoins = (totalGold: number, rightAlign: boolean = false, isLarge: boolean = false) => {
    if (totalGold <= 0) return <span className="text-medieval-gold font-bold">0</span>;
    const cc = Math.floor(totalGold / 10000);
    const pc = Math.floor((totalGold % 10000) / 100);
    const gc = totalGold % 100;
    
    return (
      <div className={`flex flex-col ${rightAlign ? 'items-end' : 'items-start'} gap-1 mt-1`}>
        <div className={`flex flex-wrap items-center ${rightAlign ? 'justify-end' : 'justify-start'} gap-3`}>
          {cc > 0 && <span className={`flex items-center gap-1.5 font-black text-white ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'}`}><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/crystalcoin.gif" alt="CC" className={`${isLarge ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-5 h-5'} drop-shadow-md`}/> {cc.toLocaleString('pt-BR')}</span>}
          {pc > 0 && <span className={`flex items-center gap-1.5 font-black text-white ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'}`}><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/platinumcoin.gif" alt="PC" className={`${isLarge ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-5 h-5'} drop-shadow-md`}/> {pc.toLocaleString('pt-BR')}</span>}
          {gc > 0 && <span className={`flex items-center gap-1.5 font-black text-white ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'}`}><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/goldcoin.gif" alt="GC" className={`${isLarge ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-5 h-5'} drop-shadow-md`}/> {gc.toLocaleString('pt-BR')}</span>}
        </div>
        <div className={`font-mono font-bold text-medieval-gold/60 ${isLarge ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}`}>({totalGold.toLocaleString('pt-BR')} gps)</div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
          {t('blessDeath')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm">
          {t('heroSubtitle')}
        </p>
      </header>

      <div className="space-y-8">
        <div className="medieval-card p-6 sm:p-8">
          <div className="space-y-8">
            <div className="flex flex-col gap-2 max-w-xs">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-black/40 rounded border border-medieval-gold/10 flex flex-col justify-between">
                <div>
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('standardBless')}</p>
                  <p className="text-xs text-medieval-text/50 mb-3 italic">{t('standardBlessList')}</p>
                </div>
                {renderCostCoins(costs.standardTotal)}
              </div>
              <div className="p-5 bg-black/40 rounded border border-medieval-gold/10 flex flex-col justify-between">
                <div>
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('tomeBless')}</p>
                  <p className="text-xs text-medieval-text/50 mb-3 italic">{t('tomeBlessDesc')}</p>
                </div>
                {renderCostCoins(costs.blessTomePrice)}
              </div>
              <div className="p-5 bg-black/40 rounded border border-medieval-gold/10 flex flex-col justify-between">
                <div>
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('arcaneBless')}</p>
                  <p className="text-xs text-medieval-text/50 mb-3 italic">{t('arcaneBlessDesc')}</p>
                </div>
                {renderCostCoins(costs.arcaneGuardianPrice)}
              </div>
              <div className="p-5 bg-black/40 rounded border border-medieval-gold/10 flex flex-col justify-between">
                <div>
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('aolCost')}</p>
                  <p className="text-xs text-medieval-text/50 mb-3 italic">{t('aolDesc')}</p>
                </div>
                {renderCostCoins(costs.aolPrice)}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-medieval-gold/20 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 bg-medieval-gold/5 rounded border border-medieval-gold/20">
                <span className="text-medieval-gold font-black uppercase text-xs tracking-widest">{t('totalInBless')}</span>
                {renderCostCoins(costs.totalBlesses, true, false)}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 sm:p-8 bg-medieval-gold/10 rounded border border-medieval-gold/40">
                <span className="text-medieval-gold font-black uppercase text-sm tracking-widest">{t('totalDeathCost')}</span>
                {renderCostCoins(costs.grandTotal, true, true)}
              </div>
            </div>
          </div>
        </div>

        
        <div className="medieval-card p-6 sm:p-8">
          <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-6">
            <Info className="w-5 h-5" /> {t('blessDetails')}
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-xs sm:text-sm text-medieval-text/70 leading-relaxed font-mono">
            <p>• <span className="text-red-400 font-bold">Penalidade Padrão:</span> A penalidade padrão ao morrer no Miracle é de <span className="text-white font-bold">10%</span> na experiência e skills/magic level.</p>
            <p>• <span className="text-medieval-gold">Redução de XP/Skill:</span> Cada bless protege <span className="text-green-400 font-bold">0.8%</span> e a Promotion protege <span className="text-green-400 font-bold">3%</span>.</p>
            <p>• <span className="text-medieval-gold">{t('standardBless')}:</span> 10k fixo até o lvl 100. Após isso, +100gp por level cada.</p>
            <p>• <span className="text-medieval-gold">{t('tomeBless')}:</span> Custo fixo de 25k no NPC Eremo. (Também protege XP/Skills)</p>
            <p>• <span className="text-blue-400 font-bold">{t('arcaneBless')}:</span> É a única bless que <span className="text-red-400">não protege XP/Skills</span>. Ela protege seus itens de perderem <span className="text-blue-300 font-bold">atributos</span> e tem duração de 10 dias. <i>Atenção: A cada atributo adicional que você possua equipado, o tempo total de 10 dias é reduzido em 10%.</i> Custo: 200gp x Level.</p>
            <p>• <span className="text-medieval-gold">Amulet of Loss:</span> Protege a queda da mochila (backpack) e equipamentos base. Custo fixo de 50k.</p>
          </div>
        </div>

        {/* Seção de Localizações */}
        <div className="medieval-card p-6 sm:p-8">
          <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-6">
            <Map className="w-5 h-5" /> Localização das Blessings
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLESS_LOCATIONS.map((bless) => (
              <div key={bless.id} className="bg-black/30 border border-medieval-gold/10 p-4 rounded-xl flex flex-col gap-3">
                <div>
                  <h4 className="text-medieval-gold font-bold text-sm">{bless.name}</h4>
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  {bless.locations.map((loc, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMap({ name: bless.name, city: loc.label, x: loc.x, y: loc.y, z: loc.z })}
                      className="flex items-center justify-between gap-2 bg-medieval-gold/10 hover:bg-medieval-gold/20 text-medieval-gold text-xs font-bold py-2 px-3 rounded-lg border border-medieval-gold/20 transition-all w-full"
                    >
                      <span className="text-medieval-text/70">{loc.label}</span>
                      <span>Ver no Mapa</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MapModal 
        isOpen={!!activeMap}
        onClose={() => setActiveMap(null)}
        targetCoords={activeMap ? { x: activeMap.x, y: activeMap.y, z: activeMap.z } : null}
        title={activeMap ? `${activeMap.name} - ${activeMap.city}` : ''}
      />
    </div>
  );
}

// --- Componentes Auxiliares ---

const DrumMenu = ({ 
  items, 
  onSelect, 
  activeId, 
  label 
}: { 
  items: { id: string; label: string; icon?: ReactNode }[]; 
  onSelect: (id: string) => void; 
  activeId: string | null;
  label: string;
}) => {
  const activeIndex = items.findIndex(item => item.id === activeId);

  const handleWheel = (e: any) => {
    if (e.deltaY > 0 || e.deltaX > 0) {
      if (activeIndex < items.length - 1) {
        onSelect(items[activeIndex + 1].id);
      }
    } else {
      if (activeIndex > 0) {
        onSelect(items[activeIndex - 1].id);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-medieval-gold font-black uppercase text-[9px] tracking-[0.4em] opacity-40">{label}</h3>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => activeIndex > 0 && onSelect(items[activeIndex - 1].id)}
          disabled={activeIndex <= 0}
          className="p-1 text-medieval-gold/40 hover:text-medieval-gold disabled:opacity-5 transition-colors"
        >
          <ChevronUp className="w-4 h-4 -rotate-90" />
        </button>

        <div 
          onWheel={handleWheel}
          className="relative h-16 w-[200px] sm:w-[280px] flex items-center justify-center cursor-ew-resize select-none overflow-hidden" 
          style={{ perspective: '1000px' }}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => {
              const offset = index - (activeIndex === -1 ? 0 : activeIndex);
              if (Math.abs(offset) > 1) return null;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  initial={{ opacity: 0, rotateY: offset * -45, translateZ: -100, x: offset * 100 }}
                  animate={{ 
                    opacity: offset === 0 ? 1 : 0.3,
                    rotateY: offset * 45, 
                    translateZ: offset === 0 ? 50 : -100, 
                    x: offset * 120, 
                    scale: offset === 0 ? 1 : 0.8,
                    filter: offset === 0 ? 'brightness(1.2)' : 'brightness(0.4) blur(1px)',
                  }}
                  exit={{ opacity: 0, scale: 0.5, translateZ: -150 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className={`absolute w-full h-10 flex items-center justify-center gap-2 px-4 rounded border transition-colors ${
                    offset === 0 
                      ? 'bg-medieval-gold/10 border-medieval-gold text-medieval-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                      : 'bg-black/40 border-medieval-gold/10 text-medieval-gold/40 hover:border-medieval-gold/30'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div style={{ transform: 'translateZ(20px)' }} className="shrink-0 scale-75">
                    {item.icon}
                  </div>
                  <span 
                    className="uppercase tracking-[0.15em] text-[10px] font-black truncate max-w-[120px]"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <button 
          onClick={() => activeIndex < items.length - 1 && onSelect(items[activeIndex + 1].id)}
          disabled={activeIndex >= items.length - 1 || activeIndex === -1}
          className="p-1 text-medieval-gold/40 hover:text-medieval-gold disabled:opacity-5 transition-colors"
        >
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </button>
      </div>
      
      <div className="text-[8px] font-mono text-medieval-gold/30 uppercase tracking-widest">
        {activeIndex + 1} / {items.length}
      </div>
    </div>
  );
};

const getItemEffects = (item: any) => {
  const effects: string[] = [];
  if (item.bonuses) {
    Object.entries(item.bonuses).forEach(([key, val]: [string, any]) => {
      if (key === 'magic') effects.push(`Magic Level +${val}`);
      else if (key === 'speed') effects.push(`Speed +${val}`);
      else if (key === 'melee') effects.push(`Melee +${val}`);
      else if (key === 'sword') effects.push(`Sword +${val}`);
      else if (key === 'axe') effects.push(`Axe +${val}`);
      else if (key === 'club') effects.push(`Club +${val}`);
      else if (key === 'distance') effects.push(`Distance +${val}`);
      else if (key === 'shielding') effects.push(`Shielding +${val}`);
      else if (key === 'regen') effects.push(`Regen +${val}/s`);
      else if (key === 'health-regen') {
        const s = val > 0 ? (1 / val) : 0;
        effects.push(`HP Reg. +1/${s.toFixed(1).replace('.0', '')}s`);
      }
      else if (key === 'mana-regen') {
        const s = val > 0 ? (1 / val) : 0;
        effects.push(`MP Reg. +1/${s.toFixed(1).replace('.0', '')}s`);
      }
      else if (key === 'invisibility') effects.push('Invisible');
      else if (key === 'magic-shield') effects.push('Mana Shield');
      else if (key === 'healing') effects.push(`Healing +${val}%`);
      else if (key === 'life-leech-chance') effects.push(`Life Leech ${val}%`);
      else if (key === 'life-leech-amount') effects.push(`Leech Amt +${val}%`);
      else if (key === 'mana-leech-chance') effects.push(`Mana Leech ${val}%`);
      else if (key === 'mana-leech-amount') effects.push(`Leech Amt +${val}%`);
      else if (key === 'crit-hit-chance') effects.push(`Critical Hit ${val}%`);
      else if (key === 'crit-hit') effects.push(`Crit Dmg +${val}%`);
      else if (key === 'crit-spell-chance') effects.push(`Spell Critical ${val}%`);
      else if (key === 'crit-spell-amount') effects.push(`Spell Crit Dmg +${val}%`);
      else if (key === 'attack') effects.push(`Attack +${val}`);
      else if (key === 'dmg-fire') effects.push(`Fire Dmg +${val}%`);
      else if (key === 'dmg-ice') effects.push(`Ice Dmg +${val}%`);
      else if (key === 'dmg-poison') effects.push(`Poison Dmg +${val}%`);
      else if (key === 'momentum') effects.push(`Momentum +${val}%`);
      else if (key === 'attack-interval') {
        effects.push(`Attack Interval ${val}%`);
      }
      else if (key === 'dodge') effects.push(`Dodge +${val}%`);
      else if (key === 'destruction') effects.push(`Destruction +${val}%`);
    });
  }
  if (item.protections) {
    Object.entries(item.protections).forEach(([key, val]: [string, any]) => {
      const pct = Math.round(val * 100);
      effects.push(`Protect ${key.charAt(0).toUpperCase() + key.slice(1)} +${pct}%`);
    });
  }
  return effects;
};

export default function App() {
  const getInitialTab = (): Tab => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path.startsWith('/buildmaker')) return 'buildmaker';
    if (path.startsWith('/calculadoras')) return 'calculadoras';
    if (path.startsWith('/profissoes')) return 'profissoes';
    if (path.startsWith('/mapa')) return 'mapa';
    if (path.startsWith('/eventos')) return 'eventos';

    if (path.startsWith('/wiki')) return 'wiki';
    if (path.startsWith('/loot')) return 'loot';
    if (path.startsWith('/feedback')) return 'feedback';
    return 'home';
  };

  const getInitialCalcSubTab = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path.includes('/runas')) return 'runemaking';
    if (path.includes('/bless')) return 'bless';
    if (path.includes('/atributos')) return 'atributos';
    if (path.includes('/profissoes')) return 'professions';
    return 'skills';
  };

  const getInitialProfSubTab = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path.includes('/alquimia')) return 'alchemy';
    if (path.includes('/fazenda')) return 'farming';
    if (path.includes('/mineracao')) return 'mining';
    return 'crafting';
  };

  const getInitialWikiSubTab = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path.includes('/projeto')) return 'project';
    return 'server';
  };

  const getInitialWikiMainTab = () => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path.includes('/updates')) return 'updates';
    if (path.includes('/biblioteca')) return 'library';
    if (path.includes('/itens')) return 'items';
    if (path.includes('/cyclopedia')) return 'cyclopedia';
    if (path.includes('/profissoes')) return 'profissoes';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab);
  const [calcSubTab, setCalcSubTab] = useState<'skills' | 'bless' | 'atributos' | 'professions' | 'runemaking'>(getInitialCalcSubTab);
  const [profSubTab, setProfSubTab] = useState<'crafting' | 'alchemy' | 'farming' | 'mining'>(getInitialProfSubTab);
  const [wikiSubTab, setWikiSubTab] = useState<'server' | 'project'>(getInitialWikiSubTab);
  const [wikiMainTab, setWikiMainTab] = useState<'home' | 'updates' | 'library' | 'items' | 'profissoes' | 'cyclopedia' | 'custom_systems'>(getInitialWikiMainTab);
  
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Sync URL to State (initial load & browser nav)
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/' || path === '') {
      setActiveTab('home');
    } else if (path.startsWith('/buildmaker')) {
      setActiveTab('buildmaker');
    } else if (path.startsWith('/calculadoras')) {
      setActiveTab('calculadoras');
      if (path.includes('/runas')) setCalcSubTab('runemaking');
      else if (path.includes('/skills')) setCalcSubTab('skills');
      else if (path.includes('/bless')) setCalcSubTab('bless');
      else if (path.includes('/atributos')) setCalcSubTab('atributos');
      else if (path.includes('/profissoes')) {
        setCalcSubTab('professions');
        if (path.includes('/crafting')) setProfSubTab('crafting');
        else if (path.includes('/alquimia')) setProfSubTab('alchemy');
        else if (path.includes('/fazenda')) setProfSubTab('farming');
        else if (path.includes('/mineracao')) setProfSubTab('mining');
      }
    } else if (path.startsWith('/profissoes')) {
      setActiveTab('profissoes');
    } else if (path.startsWith('/mapa')) {
      setActiveTab('mapa');
    } else if (path.startsWith('/eventos')) {
      setActiveTab('eventos');
    } else if (path.startsWith('/hunts')) {
      setActiveTab('hunts');

    } else if (path.startsWith('/wiki')) {
      setActiveTab('wiki');
      if (path.includes('/projeto')) setWikiSubTab('project');
      else setWikiSubTab('server');
      
      if (path.includes('/updates')) setWikiMainTab('updates');
      else if (path.includes('/biblioteca')) setWikiMainTab('library');
      else if (path.includes('/itens')) setWikiMainTab('items');
      else if (path.includes('/sistemas')) setWikiMainTab('custom_systems');
      else setWikiMainTab('home');
    } else if (path.startsWith('/loot')) {
      setActiveTab('loot');
    } else if (path.startsWith('/feedback')) {
      setActiveTab('feedback');
    }
  }, [location.pathname]);

  // 2. Sync State to URL
  useEffect(() => {
    let newPath = '/';
    if (activeTab === 'home') newPath = '/';
    else if (activeTab === 'hunts') newPath = '/hunts';
    else if (activeTab === 'buildmaker') newPath = '/buildmaker';
    else if (activeTab === 'calculadoras') {
      if (calcSubTab === 'runemaking') newPath = '/calculadoras/runas';
      else if (calcSubTab === 'skills') newPath = '/calculadoras/skills';
      else if (calcSubTab === 'bless') newPath = '/calculadoras/bless';
      else if (calcSubTab === 'atributos') newPath = '/calculadoras/atributos';
      else if (calcSubTab === 'professions') {
         if (profSubTab === 'crafting') newPath = '/calculadoras/profissoes/crafting';
         else if (profSubTab === 'alchemy') newPath = '/calculadoras/profissoes/alquimia';
         else if (profSubTab === 'farming') newPath = '/calculadoras/profissoes/fazenda';
         else if (profSubTab === 'mining') newPath = '/calculadoras/profissoes/mineracao';
         else newPath = '/calculadoras/profissoes/crafting';
      } else {
        newPath = '/calculadoras/skills';
      }
    } else if (activeTab === 'profissoes') newPath = '/profissoes';
    else if (activeTab === 'mapa') newPath = '/mapa';
    else if (activeTab === 'eventos') newPath = '/eventos';

    else if (activeTab === 'wiki') {
      let wikiPath = '/wiki';
      if (wikiSubTab === 'project') wikiPath += '/projeto';
      else wikiPath += '/server';
      
      if (wikiMainTab === 'updates') wikiPath += '/updates';
      else if (wikiMainTab === 'library') wikiPath += '/biblioteca';
      else if (wikiMainTab === 'items') wikiPath += '/itens';
      else if (wikiMainTab === 'cyclopedia') wikiPath += '/cyclopedia';
      else if (wikiMainTab === 'custom_systems') wikiPath += '/sistemas';
      
      newPath = wikiPath;
    } else if (activeTab === 'loot') newPath = '/loot';
    else if (activeTab === 'feedback') newPath = '/feedback';

    if (location.pathname !== newPath) {
      navigate(newPath);
    }
  }, [activeTab, calcSubTab, profSubTab, wikiSubTab, wikiMainTab]);

  const [itemsSubTab, setItemsSubTab] = useState<'helmets' | 'armors' | 'legs' | 'boots' | 'shields' | 'swords' | 'clubs' | 'axes' | 'distance' | 'ammo' | 'rings' | 'amulets' | 'relics'>('helmets');
  const [distanceFilter, setDistanceFilter] = useState<'all' | 'bow' | 'crossbow' | 'throwing'>('all');
  const [selectedBookId, setSelectedBookId] = useState<string>(LIBRARY_DATA[0]?.id || '');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [selectedPatchVersion, setSelectedPatchVersion] = useState(SERVER_PATCH_NOTES[0].version);
  const [language, setLanguage] = useState<Language>('pt');
  const [skill, setSkill] = useState<number>(10);
  const [homeProfMenuOpen, setHomeProfMenuOpen] = useState(false);
  const [homeSkillsMenuOpen, setHomeSkillsMenuOpen] = useState(false);
  const [homeBlessMenuOpen, setHomeBlessMenuOpen] = useState(false);
  const [homeAttrMenuOpen, setHomeAttrMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: string; label: string; type: string; action: () => void }[]>([]);

  // Deep-link States for Global Search Navigation & Highlighting
  const [searchCraftCategory, setSearchCraftCategory] = useState<string | undefined>(undefined);
  const [searchCraftItemName, setSearchCraftItemName] = useState<string | undefined>(undefined);
  const [searchFarmingTree, setSearchFarmingTree] = useState<string | undefined>(undefined);
  const [searchAlchemyRune, setSearchAlchemyRune] = useState<string | undefined>(undefined);

  // Sidebar accordion groups state
  const [sidebarOpenGroups, setSidebarOpenGroups] = useState({
    inicio: true,
    guias: true,
    calculadores: true,
    profissoes: true,
    equipamentos: true,
    cyclopedia: true,
    biblioteca: false,
    utilitarios: true,
    comunidade: true
  });

  // Secret Admin Tracking State
  const [showAdmin, setShowAdmin] = useState(false);
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    // Registra a visita ao abrir o app
    const trackVisit = async () => {
      try {
        await supabase.from('site_visits').insert([{ 
          path: window.location.pathname,
          user_agent: navigator.userAgent
        }]);
      } catch (e) {
        console.error("Falha ao registrar visita");
      }
    };
    trackVisit();
  }, []);

  useEffect(() => {
    // Atalho secreto: Ctrl + Shift + V
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        setShowAdmin(prev => {
          if (!prev) {
            // Ao abrir, atualiza a contagem
            supabase
              .from('site_visits')
              .select('*', { count: 'exact', head: true })
              .then(({ count }) => setVisitCount(count));
          }
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleGroup = (group: keyof typeof sidebarOpenGroups) => {
    setSidebarOpenGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const t = (key: keyof typeof translations['pt']) => translations[language][key] || key;

  const armorsList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.category === 'armor' || item.subCategory === 'Armors');
    return [...list].sort((a, b) => {
      const armA = a.armor ?? 0;
      const armB = b.armor ?? 0;
      if (armA !== armB) return armA - armB;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const legsList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.category === 'legs' || item.subCategory === 'Legs');
    return [...list].sort((a, b) => {
      const armA = a.armor ?? 0;
      const armB = b.armor ?? 0;
      if (armA !== armB) return armA - armB;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const bootsList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.category === 'feet' || item.subCategory === 'Boots');
    return [...list].sort((a, b) => {
      const armA = a.armor ?? 0;
      const armB = b.armor ?? 0;
      if (armA !== armB) return armA - armB;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const shieldsList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.subCategory === 'Shields');
    return [...list].sort((a, b) => {
      const defA = a.defense ?? 0;
      const defB = b.defense ?? 0;
      if (defA !== defB) return defA - defB;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const swordsList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.subCategory === 'Swords');
    return [...list].sort((a, b) => {
      const atkA = a.attack ?? 0;
      const atkB = b.attack ?? 0;
      if (atkA !== atkB) return atkA - atkB;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const clubsList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.subCategory === 'Clubs');
    return [...list].sort((a, b) => {
      const atkA = a.attack ?? 0;
      const atkB = b.attack ?? 0;
      if (atkA !== atkB) return atkA - atkB;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const axesList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.subCategory === 'Axes');
    return [...list].sort((a, b) => {
      const atkA = a.attack ?? 0;
      const atkB = b.attack ?? 0;
      if (atkA !== atkB) return atkA - atkB;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const distanceList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.subCategory === 'Distance');
    return [...list].sort((a, b) => {
      const atkA = a.attack ?? 0;
      const atkB = b.attack ?? 0;
      if (atkA !== atkB) return atkA - atkB;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const ammoList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.subCategory === 'Ammo' || item.category === 'ammo');
    return [...list].sort((a, b) => {
      const atkA = a.attack ?? 0;
      const atkB = b.attack ?? 0;
      if (atkA !== atkB) return atkA - atkB;
      return a.name.localeCompare(b.name);
    });
  }, []);

  const ringsList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.category === 'ring');
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const amuletsList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.category === 'necklace');
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const relicsList = useMemo(() => {
    const list = ALL_BUILD_ITEMS.filter(item => item.category === 'relic');
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Global Search Logic - Redesigned to act as a complete Multi-Resource Wiki Index
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const normalize = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
    const q = normalize(query);

    const results: { id: string; label: string; type: string; action: () => void }[] = [];

    // Helper to get matching wiki tab and attribute categories
    const getSubTabAndAttrCat = (item: any): { subTab: any; attrCat?: string } => {
      const cat = item.category?.toLowerCase() || '';
      const subCat = item.subCategory?.toLowerCase() || '';
      
      if (cat === 'head' || cat === 'helmet') return { subTab: 'helmets', attrCat: 'Helmets' };
      if (cat === 'armor') return { subTab: 'armors', attrCat: 'Armors' };
      if (cat === 'legs') return { subTab: 'legs', attrCat: 'Legs' };
      if (cat === 'feet' || cat === 'boots' || cat === 'boot') return { subTab: 'boots', attrCat: 'Boots' };
      if (cat === 'shield') return { subTab: 'shields', attrCat: 'Shields' };
      if (cat === 'sword') return { subTab: 'swords', attrCat: 'Swords' };
      if (cat === 'club') return { subTab: 'clubs', attrCat: 'Clubs' };
      if (cat === 'axe') return { subTab: 'axes', attrCat: 'Axes' };
      if (cat === 'distance') return { subTab: 'distance', attrCat: 'Distance' };
      if (cat === 'ammo' || cat === 'ammunition' || subCat === 'ammo') return { subTab: 'ammo', attrCat: 'Ammo' };
      if (cat === 'ring') return { subTab: 'rings' };
      if (cat === 'necklace') return { subTab: 'amulets' };
      if (cat === 'relic') return { subTab: 'relics' };
      return { subTab: 'helmets' };
    };

    // Keep track of added items to prevent exact duplicates in list
    const addedIds = new Set<string>();

    const addResult = (id: string, label: string, type: string, action: () => void) => {
      if (addedIds.has(id)) return;
      addedIds.add(id);
      results.push({ id, label, type, action });
    };

    // 1. Search in Equipment & Items (HELMETS_DATA & ALL_BUILD_ITEMS)
    const allEquipItems = [...HELMETS_DATA, ...ALL_BUILD_ITEMS];
    allEquipItems.forEach(item => {
      if (normalize(item.name).includes(q)) {
        const { subTab, attrCat } = getSubTabAndAttrCat(item);
        
        // Match 1a: Wiki detailed database card
        addResult(
          `equip-wiki-${item.name}`,
          `Wiki: ${item.name}`,
          `Equipamento (${subTab.toUpperCase()})`,
          () => {
            setActiveTab('wiki');
            setWikiMainTab('items');
            setItemsSubTab(subTab);
            setSearchQuery('');
            setSearchResults([]);
          }
        );

        // Match 1b: Attribute Calculator link
        if (attrCat) {
          addResult(
            `equip-attr-${item.name}`,
            `${item.name} (Calculadora de Atributos)`,
            'Calculadora de Atributos',
            () => {
              setActiveTab('calculadoras');
              setCalcSubTab('atributos');
              setAttrCategory(attrCat);
              setAttrItemName(item.name);
              setSearchQuery('');
              setSearchResults([]);
            }
          );
        }

        // Match 1c: Build Maker link ("seja build maker")
        addResult(
          `equip-bm-${item.name}`,
          `Build Maker: Equipar ${item.name}`,
          'Build Maker (Simulador)',
          () => {
            setActiveTab('buildmaker');
            setSearchQuery('');
            setSearchResults([]);
          }
        );
      }
    });

    // 2. Search in Crafting Formulas & Blueprints (CRAFT_ITEMS & materials used)
    CRAFT_ITEMS.forEach(cat => {
      cat.items.forEach(item => {
        // Match 2a: Recipe Name matching
        if (normalize(item.name).includes(q)) {
          addResult(
            `craft-recipe-${item.name}`,
            `Forjar: ${item.name}`,
            `Calculadora de Crafting (${cat.category === 'giantGemsRelics' ? 'Gemas & Relíquias' : cat.category === 'toolsPicks' ? 'Ferramentas' : cat.category === 'mysticRunes' ? 'Runas Místicas' : 'Geral'})`,
            () => {
              setActiveTab('calculadoras');
              setCalcSubTab('professions');
              setProfSubTab('crafting');
              setSearchCraftCategory(cat.category);
              setSearchCraftItemName(item.name);
              setSearchQuery('');
              setSearchResults([]);
            }
          );
        }

        // Match 2b: Material Ingredient matching (What items use Onyx, Draconian Steel, etc.)
        if (item.materials) {
          const matchingMat = item.materials.find((mat: any) => normalize(mat.name).includes(q));
          if (matchingMat) {
            addResult(
              `craft-material-${item.name}-${matchingMat.name}`,
              `Forjar ${item.name} (Utiliza ${matchingMat.name})`,
              `Ingrediente de Crafting`,
              () => {
                setActiveTab('calculadoras');
                setCalcSubTab('professions');
                setProfSubTab('crafting');
                setSearchCraftCategory(cat.category);
                setSearchCraftItemName(item.name);
                setSearchQuery('');
                setSearchResults([]);
              }
            );
          }
        }
      });
    });

    // 3. Search in Alchemy Runes & Crystals (ALCHEMY_RUNES)
    ALCHEMY_RUNES.forEach(rune => {
      if (normalize(rune.name).includes(q)) {
        addResult(
          `alchemy-rune-${rune.name}`,
          `Alquimia: Runa ${rune.name}`,
          'Profissão: Alquimia',
          () => {
            setActiveTab('calculadoras');
            setCalcSubTab('professions');
            setProfSubTab('alchemy');
            setSearchAlchemyRune(rune.name);
            setSearchQuery('');
            setSearchResults([]);
          }
        );
      }
    });

    FARMING_TREES.forEach(tree => {
      if (normalize(tree.name).includes(q) || normalize(tree.fruit).includes(q)) {
        addResult(
          `farming-tree-${tree.name}`,
          `Farming: ${tree.name} (${tree.fruit})`,
          'Profissão: Farming',
          () => {
            setActiveTab('calculadoras');
            setCalcSubTab('professions');
            setProfSubTab('farming');
            setSearchFarmingTree(tree.name);
            setSearchQuery('');
            setSearchResults([]);
          }
        );
      }
    });

    // 4. Search in Lore Books & Library (LIBRARY_DATA)
    LIBRARY_DATA.forEach(book => {
      const titleMatch = normalize(book.title[language] || '').includes(q);
      const contentStr = book.content[language] || '';
      const contentMatch = normalize(contentStr).includes(q);
      if (titleMatch || contentMatch) {
         addResult(
           `book-${book.id}`,
           `Livro: ${book.title[language]}`,
           `Lore: Biblioteca (${book.region[language]})`,
           () => {
             setActiveTab('wiki');
             setWikiMainTab('library');
             setSelectedRegion(book.region[language]);
             setSelectedBookId(book.id);
             setSearchQuery('');
             setSearchResults([]);
           }
         );
      }
    });

    // 5. Intelligent Profession Keyword matching (suggests calculators and video tutorials directly)
    const profKeywords = [
      {
        keys: ['pick', 'mining', 'mineracao', 'picareta', 'ore', 'miner', 'minerar'],
        labelCalc: 'Calculadora de Mineração (Antiazar & Ganhos)',
        labelVid: 'Vídeo Tutorial: Guia de Mineração',
        sub: 'mining'
      },
      {
        keys: ['pick', 'crafting', 'forja', 'craft', 'ferreiro', 'forjar', 'recipe', 'receita', 'onyx'],
        labelCalc: 'Calculadora de Crafting (Fórmulas & Custos)',
        labelVid: 'Vídeo Tutorial: Guia de Crafting / Forja',
        sub: 'crafting'
      },
      {
        keys: ['alchemy', 'alquimia', 'potion', 'pocao', 'runa', 'runas', 'duplicacao', 'onyx'],
        labelCalc: 'Calculadora de Alquimia (Duplicação de Runas)',
        labelVid: 'Vídeo Tutorial: Guia de Alquimia',
        sub: 'alchemy'
      },
      {
        keys: ['farming', 'seed', 'fazenda', 'plantio', 'agricultura', 'cultivo', 'colheita', 'arvore'],
        labelCalc: 'Calculadora de Farming (Cultivo de Árvores)',
        labelVid: 'Vídeo Tutorial: Guia de Farming / Fazenda',
        sub: 'farming'
      }
    ];

    profKeywords.forEach(kw => {
      if (kw.keys.some(k => normalize(k).includes(q))) {
        // Direct Calculator Shortcut
        addResult(
          `prof-calc-${kw.sub}`,
          kw.labelCalc,
          'Calculadora de Profissão',
          () => {
            setActiveTab('calculadoras');
            setCalcSubTab('professions');
            setProfSubTab(kw.sub as any);
            setSearchQuery('');
            setSearchResults([]);
          }
        );
        // Video Guide Shortcut ("seja vídeo de profissão")
        addResult(
          `prof-vid-${kw.sub}`,
          kw.labelVid,
          'Guia de Profissão (Vídeo)',
          () => {
            setActiveTab('profissoes');
            setSearchQuery('');
            setSearchResults([]);
          }
        );
      }
    });

    // 6. Other General Tools / Guides
    const generalKeywords = [
      { keys: ['bless', 'morte', 'death', 'bencao'], tab: 'calculadoras', sub: 'bless', label: 'Calculadora de Bless & Penalidade de Morte', type: 'Utilitário' },
      { keys: ['skill', 'treino', 'training', 'vocation', 'druid', 'sorcerer', 'knight', 'paladin'], tab: 'calculadoras', sub: 'skills', label: 'Calculadora de Skills & Tempo de Treino', type: 'Utilitário' },
      { keys: ['build', 'maker', 'set', 'equipar', 'atributos', 'simulador'], tab: 'buildmaker', sub: '', label: 'Build Maker (Criador & Simulador de Sets)', type: 'Build Maker' },
      { keys: ['map', 'mapa', 'interativo', 'quest', 'comarca'], tab: 'mapa', sub: '', label: 'Mapa Interativo de Comarca / Quests', type: 'Ferramenta' },
      { keys: ['patch', 'notes', 'notas', 'update', 'atualizacao', 'versao', 'mudancas'], tab: 'wiki', sub: 'updates', label: 'Histórico de Patch Notes & Atualizações', type: 'Wiki' },
    ];

    generalKeywords.forEach(kw => {
      if (kw.keys.some(k => normalize(k).includes(q))) {
        addResult(
          `gen-kw-${kw.label}`,
          kw.label,
          kw.type,
          () => {
            setActiveTab(kw.tab as Tab);
            if (kw.tab === 'calculadoras' && kw.sub) setCalcSubTab(kw.sub as any);
            if (kw.tab === 'wiki' && kw.sub === 'updates') {
              setWikiMainTab('updates');
            }
            setSearchQuery('');
            setSearchResults([]);
          }
        );
      }
    });

    setSearchResults(results.slice(0, 15));
  };

  // Estados para Calculadora de Skills
  const [vocation, setVocation] = useState<Vocation>('Knight');
  const [skillType, setSkillType] = useState<SkillType>('Melee');
  const [currentSkill, setCurrentSkill] = useState<number>(10);
  const [targetSkill, setTargetSkill] = useState<number>(80);
  const [skillPercentage, setSkillPercentage] = useState<number>(100);
  const [selectedItemName, setSelectedItemName] = useState<string>(CRAFT_ITEMS[0].items[0].name);
  const [chance, setChance] = useState<number>(10);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rashidCity, setRashidCity] = useState('');

  useEffect(() => {
    const updateRashid = () => {
      const now = new Date();
      // Brasília is UTC-3
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const brTime = new Date(utc + (3600000 * -3));
      
      const day = brTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = brTime.getHours();
      const minutes = brTime.getMinutes();
      
      // Server save is at 05:08 AM
      const isAfterServerSave = (hours > 5) || (hours === 5 && minutes >= 8);
      
      // If before server save, it's effectively the previous day
      let effectiveDay = isAfterServerSave ? day : (day === 0 ? 6 : day - 1);
      
      const locations = [
        "Carlin",      // 0 - Sunday
        "Thais",       // 1 - Monday
        "Venore",      // 2 - Tuesday
        "Ab'Dendriel", // 3 - Wednesday
        "Ankhramun",   // 4 - Thursday
        "Darashia",    // 5 - Friday
        "Edron"        // 6 - Saturday
      ];
      
      setRashidCity(locations[effectiveDay]);
    };

    updateRashid();
    const interval = setInterval(updateRashid, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Encontra o item selecionado para pegar o multiplicador e requisitos
  const selectedItem = useMemo(() => {
    for (const cat of CRAFT_ITEMS) {
      const item = cat.items.find(i => i.name === selectedItemName);
      if (item) return item;
    }
    return CRAFT_ITEMS[0].items[0];
  }, [selectedItemName]);

  const regions = useMemo(() => {
    const unique = Array.from(new Set(LIBRARY_DATA.map(b => b.region[language])));
    return unique.map(r => ({ id: r, label: r }));
  }, [language]);

  const filteredBooks = useMemo(() => {
    if (!selectedRegion) return [];
    return LIBRARY_DATA.filter(b => b.region[language] === selectedRegion).map(b => ({
      id: b.id,
      label: b.title[language],
      icon: <img src={b.spriteImage} alt="" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" referrerPolicy="no-referrer" />
    }));
  }, [selectedRegion, language]);

  useEffect(() => {
    if (wikiMainTab === 'library' && !selectedRegion && regions.length > 0) {
      setSelectedRegion(regions[0].id);
    }
  }, [wikiMainTab, regions, selectedRegion]);

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
    { id: 'home', label: t('home'), icon: null },
    { id: 'buildmaker', label: 'Build Maker', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/buildmaker.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Build Maker" /> },
    { id: 'calculadoras', label: t('calculators'), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Calculadoras" /> },
    { id: 'profissoes', label: language === 'pt' ? 'Profissões' : 'Professions', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/guiadeprofissoes.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Profissoes" /> },
    { id: 'mapa', label: t('map'), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/mapainterativo.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Mapa" /> },
    { id: 'wiki', label: t('wiki'), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850372/wiki.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Wiki" /> },
  ];

  const renderSidebarContent = (isMobile = false) => {
    const activeSubmenuClass = "w-full text-left py-2 px-3 rounded-lg text-xs uppercase tracking-wider font-black transition-all duration-300 bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_15px_rgba(197,160,89,0.4)] flex items-center gap-3 scale-[1.02] ml-1";
    const inactiveSubmenuClass = "w-full text-left py-2 px-3 rounded-lg text-xs uppercase tracking-wider font-bold transition-all duration-300 text-medieval-gold/60 hover:text-medieval-gold hover:bg-gradient-to-r hover:from-white/[0.05] hover:to-transparent flex items-center gap-3 hover:translate-x-1 group";

    const isFerramentas = ['calculadoras', 'buildmaker', 'loot'].includes(activeTab);
    const isWiki = ['wiki', 'mapa', 'eventos', 'profissoes'].includes(activeTab);

    const WIKI_SECTIONS = [
      { id: 'helmets', label: language === 'pt' ? 'Capacetes' : 'Helmets', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/capacetes.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Helmets" /> },
      { id: 'armors', label: language === 'pt' ? 'Armaduras' : 'Armors', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/armaduras.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Armors" /> },
      { id: 'legs', label: language === 'pt' ? 'Pernas' : 'Legs', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/cal%C3%A7as.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Legs" /> },
      { id: 'boots', label: language === 'pt' ? 'Botas' : 'Boots', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/botas.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Boots" /> },
      { id: 'shields', label: language === 'pt' ? 'Escudos' : 'Shields', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849030/escudos.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Shields" /> },
      { id: 'swords', label: language === 'pt' ? 'Espadas' : 'Swords', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/espadas.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Swords" /> },
      { id: 'clubs', label: language === 'pt' ? 'Clavas' : 'Clubs', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/clavas.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Clubs" /> },
      { id: 'axes', label: language === 'pt' ? 'Machados' : 'Axes', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849032/machados.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Axes" /> },
      { id: 'distance', label: language === 'pt' ? 'Distância' : 'Distance', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849030/distance.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Distance" /> },
      { id: 'ammo', label: language === 'pt' ? 'Munição' : 'Ammo', icon: null },
      { id: 'rings', label: language === 'pt' ? 'Anéis' : 'Rings', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/aneis_magicos.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Rings" /> },
      { id: 'amulets', label: language === 'pt' ? 'Amuletos' : 'Amulets', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849026/amuletos.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Amulets" /> },
      { id: 'relics', label: language === 'pt' ? 'Relíquias' : 'Relics', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/reliquias.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Relics" /> },
    ];


    return (
      <div className="flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']">
        
        {/* WIKI GROUP */}
        {isWiki && (
          <>
            <div className="space-y-1.5">
              <button 
                onClick={() => toggleGroup('inicio')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-b from-black/80 to-[#0a0a0a] border border-medieval-gold/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-medieval-gold/50 hover:shadow-[0_4px_20px_rgba(197,160,89,0.15)] transition-all text-xs font-black text-medieval-gold uppercase tracking-widest relative overflow-hidden group"
              >
                <span className="flex items-center gap-2.5 relative z-10">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/inicio_updates.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Inicio" />
                  {language === 'pt' ? 'Início & Updates' : 'Home & Updates'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 text-medieval-gold/45 transition-transform duration-300 ${sidebarOpenGroups.inicio ? 'rotate-90 text-medieval-gold' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {sidebarOpenGroups.inicio && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1 pl-1 pt-0.5"
                  >
                    <button 
                      onClick={() => { setActiveTab('home'); if (wikiMainTab !== 'home') setWikiMainTab('home'); if(isMobile) setIsMenuOpen(false); }}
                      className={activeTab === 'home' ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/paginaprincipal.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Home" />
                      {language === 'pt' ? 'Página Principal' : 'Front Page'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('wiki'); setWikiMainTab('updates'); if(isMobile) setIsMenuOpen(false); }}
                      className={(activeTab === 'wiki' && wikiMainTab === 'updates') ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/inicio_updates.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Updates" />
                      {language === 'pt' ? 'Patch Notes' : 'Recent Updates'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5">
              <button 
                onClick={() => toggleGroup('equipamentos')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-b from-black/80 to-[#0a0a0a] border border-medieval-gold/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-medieval-gold/50 hover:shadow-[0_4px_20px_rgba(197,160,89,0.15)] transition-all text-xs font-black text-medieval-gold uppercase tracking-widest relative overflow-hidden group"
              >
                <span className="flex items-center gap-2.5 relative z-10">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849030/cyclopedia.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Equipamentos" />
                  {language === 'pt' ? 'Equipamentos' : 'Equipment'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 text-medieval-gold/45 transition-transform duration-300 ${sidebarOpenGroups.equipamentos ? 'rotate-90 text-medieval-gold' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {sidebarOpenGroups.equipamentos && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1 pl-1 pt-0.5"
                  >
                    {WIKI_SECTIONS.map((sub) => {
                      const isSelected = activeTab === 'wiki' && wikiMainTab === 'items' && itemsSubTab === sub.id;
                      return (
                        <button 
                          key={sub.id}
                          onClick={() => {
                            setActiveTab('wiki');
                            setWikiMainTab('items');
                            setItemsSubTab(sub.id as any);
                            if(isMobile) setIsMenuOpen(false);
                          }}
                          className={isSelected ? activeSubmenuClass : inactiveSubmenuClass}
                        >
                          {sub.icon}
                          {sub.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5">
              <button 
                onClick={() => toggleGroup('cyclopedia')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-b from-black/80 to-[#0a0a0a] border border-medieval-gold/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-medieval-gold/50 hover:shadow-[0_4px_20px_rgba(197,160,89,0.15)] transition-all text-xs font-black text-medieval-gold uppercase tracking-widest relative overflow-hidden group"
              >
                <span className="flex items-center gap-2.5 relative z-10">
                  
                  Cyclopedia
                </span>
                <ChevronRight className={`w-3.5 h-3.5 text-medieval-gold/45 transition-transform duration-300 ${sidebarOpenGroups.cyclopedia ? 'rotate-90 text-medieval-gold' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {sidebarOpenGroups.cyclopedia && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1 pl-1 pt-0.5"
                  >
                    <button 
                      onClick={() => {
                        setActiveTab('wiki');
                        setWikiMainTab('cyclopedia');
                        if(isMobile) setIsMenuOpen(false);
                      }}
                      className={activeTab === 'wiki' && wikiMainTab === 'cyclopedia' ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      
                      {language === 'pt' ? 'Bestiário' : 'Bestiary'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5">
              <button 
                onClick={() => toggleGroup('biblioteca')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-b from-black/80 to-[#0a0a0a] border border-medieval-gold/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-medieval-gold/50 hover:shadow-[0_4px_20px_rgba(197,160,89,0.15)] transition-all text-xs font-black text-medieval-gold uppercase tracking-widest relative overflow-hidden group"
              >
                <span className="flex items-center gap-2.5 relative z-10">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1775658826/Blue_Book_wstv3r.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Biblioteca" />
                  {language === 'pt' ? 'Livros & Lore' : 'Library & Lore'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 text-medieval-gold/45 transition-transform duration-300 ${sidebarOpenGroups.biblioteca ? 'rotate-90 text-medieval-gold' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {sidebarOpenGroups.biblioteca && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1 pl-1 pt-0.5"
                  >
                    <button 
                      onClick={() => {
                        setActiveTab('wiki');
                        setWikiMainTab('library');
                        setSelectedRegion(null);
                        if(isMobile) setIsMenuOpen(false);
                      }}
                      className={(activeTab === 'wiki' && wikiMainTab === 'library' && !selectedRegion) ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      
                      {language === 'pt' ? '[Tudo do Mapa]' : '[All Regions]'}
                    </button>
                    {regions.map(r => {
                      const isSelected = activeTab === 'wiki' && wikiMainTab === 'library' && selectedRegion === r.id;
                      return (
                        <button 
                          key={r.id}
                          onClick={() => {
                            setActiveTab('wiki');
                            setWikiMainTab('library');
                            setSelectedRegion(r.id);
                            if(isMobile) setIsMenuOpen(false);
                          }}
                          className={isSelected ? activeSubmenuClass : inactiveSubmenuClass}
                        >
                          
                          {r.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5">
              <button 
                onClick={() => toggleGroup('guias')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-b from-black/80 to-[#0a0a0a] border border-medieval-gold/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-medieval-gold/50 hover:shadow-[0_4px_20px_rgba(197,160,89,0.15)] transition-all text-xs font-black text-medieval-gold uppercase tracking-widest relative overflow-hidden group"
              >
                <span className="flex items-center gap-2.5 relative z-10">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849026/A_Helpful_Fairy.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Guias" />
                  {language === 'pt' ? 'Tutoriais & Guias' : 'Guides & Tutorials'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 text-medieval-gold/45 transition-transform duration-300 ${sidebarOpenGroups.guias ? 'rotate-90 text-medieval-gold' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {sidebarOpenGroups.guias && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1 pl-1 pt-0.5"
                  >
                    <button 
                      onClick={() => { setActiveTab('profissoes'); if(isMobile) setIsMenuOpen(false); }}
                      className={activeTab === 'profissoes' ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/guiadeprofissoes.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Guia Profissoes" />
                      {language === 'pt' ? 'Guia de Profissões' : 'Professions Video'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('mapa'); if(isMobile) setIsMenuOpen(false); }}
                      className={activeTab === 'mapa' ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/mapainterativo.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Mapa" />
                      {language === 'pt' ? 'Mapa Interativo' : 'Interactive Map'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('eventos'); if(isMobile) setIsMenuOpen(false); }}
                      className={activeTab === 'eventos' ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849035/lobbyquest.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Lobby Quest" />
                      {language === 'pt' ? 'Lobby de Quests' : 'Quests & Events'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* TOOLS GROUP */}
        {isFerramentas && (
          <>
            <div className="space-y-1.5">
              <button 
                onClick={() => toggleGroup('calculadores')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-b from-black/80 to-[#0a0a0a] border border-medieval-gold/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-medieval-gold/50 hover:shadow-[0_4px_20px_rgba(197,160,89,0.15)] transition-all text-xs font-black text-medieval-gold uppercase tracking-widest relative overflow-hidden group"
              >
                <span className="flex items-center gap-2.5 relative z-10">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Calculadoras" />
                  {language === 'pt' ? 'Ferramentas' : 'Tools'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 text-medieval-gold/45 transition-transform duration-300 ${sidebarOpenGroups.calculadores ? 'rotate-90 text-medieval-gold' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {sidebarOpenGroups.calculadores && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1 pl-1 pt-0.5"
                  >
                    <button 
                      onClick={() => { setActiveTab('buildmaker'); if(isMobile) setIsMenuOpen(false); }}
                      className={activeTab === 'buildmaker' ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/buildmaker.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Build Maker" />
                      {language === 'pt' ? 'Build Maker' : 'Build Maker'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('bestiary-editor'); if(isMobile) setIsMenuOpen(false); }}
                      className={activeTab === 'bestiary-editor' ? activeSubmenuClass : inactiveSubmenuClass}
                      style={{display: 'none'}}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784748006/logowiki.png" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Bestiary" />
                      {language === 'pt' ? 'Bestiary Editor' : 'Bestiary Editor'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('skills'); if(isMobile) setIsMenuOpen(false); }}
                      className={(activeTab === 'calculadoras' && calcSubTab === 'skills') ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849036/treinodeskils.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Skills" />
                      {language === 'pt' ? 'Skills & Magic Level' : 'Skills & Magic Level'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('bless'); if(isMobile) setIsMenuOpen(false); }}
                      className={(activeTab === 'calculadoras' && calcSubTab === 'bless') ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784153774/Skull__Item.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Bless" />
                      {language === 'pt' ? 'Bless & Morte' : 'Bless & Death'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('atributos'); if(isMobile) setIsMenuOpen(false); }}
                      className={(activeTab === 'calculadoras' && calcSubTab === 'atributos') ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784153978/emberrune.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Atributos" />
                      {language === 'pt' ? 'Atributos' : 'Attributes'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('runemaking'); if(isMobile) setIsMenuOpen(false); }}
                      className={(activeTab === 'calculadoras' && calcSubTab === 'runemaking') ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849035/runemaking.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Runas" />
                      {language === 'pt' ? 'Runemaking' : 'Runemaking'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-1.5">
              <button 
                onClick={() => toggleGroup('profissoes')}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-b from-black/80 to-[#0a0a0a] border border-medieval-gold/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-medieval-gold/50 hover:shadow-[0_4px_20px_rgba(197,160,89,0.15)] transition-all text-xs font-black text-medieval-gold uppercase tracking-widest relative overflow-hidden group"
              >
                <span className="flex items-center gap-2.5 relative z-10">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/guiadeprofissoes.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Profissoes" />
                  {language === 'pt' ? 'Profissões' : 'Professions'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 text-medieval-gold/45 transition-transform duration-300 ${sidebarOpenGroups.profissoes ? 'rotate-90 text-medieval-gold' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {sidebarOpenGroups.profissoes && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden flex flex-col gap-1 pl-1 pt-0.5"
                  >
                    <button 
                      onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('professions'); setProfSubTab('crafting'); if(isMobile) setIsMenuOpen(false); }}
                      className={(activeTab === 'calculadoras' && calcSubTab === 'professions' && profSubTab === 'crafting') ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784154515/crafting.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Crafting" />
                      {language === 'pt' ? 'Crafting' : 'Crafting'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('professions'); setProfSubTab('alchemy'); if(isMobile) setIsMenuOpen(false); }}
                      className={(activeTab === 'calculadoras' && calcSubTab === 'professions' && profSubTab === 'alchemy') ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784154515/Alchemistic_Table.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Alquimia" />
                      {language === 'pt' ? 'Alquimia' : 'Alchemy'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('professions'); setProfSubTab('farming'); if(isMobile) setIsMenuOpen(false); }}
                      className={(activeTab === 'calculadoras' && calcSubTab === 'professions' && profSubTab === 'farming') ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784154514/Orange_Tree.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Fazenda" />
                      {language === 'pt' ? 'Fazenda' : 'Farming'}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('calculadoras'); setCalcSubTab('professions'); setProfSubTab('mining'); if(isMobile) setIsMenuOpen(false); }}
                      className={(activeTab === 'calculadoras' && calcSubTab === 'professions' && profSubTab === 'mining') ? activeSubmenuClass : inactiveSubmenuClass}
                    >
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784154515/mining.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Mineração" />
                      {language === 'pt' ? 'Mineração' : 'Mining'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* FEEDBACK (Always visible when in feedback, or we can just keep it independent) */}
        {activeTab === 'feedback' && (
          <div className="space-y-1.5">
            <button 
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-b from-black/80 to-[#0a0a0a] border border-medieval-gold/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] transition-all text-xs font-black text-medieval-gold uppercase tracking-widest relative overflow-hidden group"
            >
              <span className="flex items-center gap-2.5 relative z-10">
                <MessageSquare className="w-6 h-6 object-contain text-medieval-gold drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" />
                {language === 'pt' ? 'Comunidade' : 'Community'}
              </span>
            </button>
            <div className="overflow-hidden flex flex-col gap-1 pl-1 pt-0.5">
              <button 
                onClick={() => { setActiveTab('feedback'); if(isMobile) setIsMenuOpen(false); }}
                className={activeTab === 'feedback' ? activeSubmenuClass : inactiveSubmenuClass}
              >
                <MessageSquare className="w-6 h-6 object-contain opacity-70" />
                {language === 'pt' ? 'Feedback Board' : 'Feedback Board'}
              </button>
            </div>
          </div>
        )}

      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f]">
      {/* Navigation Bar */}
      {activeTab !== "home" && (
      <nav className="sticky top-0 z-50 bg-medieval-dark/95 backdrop-blur-md border-b border-medieval-gold/30">
        {/* Rashid Top Bar */}
        <div className="bg-black/40 border-b border-medieval-gold/5 py-1 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 flex justify-end items-center">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1776190181/Rashid_rlsxu1.gif" 
                  alt="Rashid" 
                  className="w-14 h-14 object-contain -my-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-medieval-gold/40 font-bold uppercase tracking-tighter leading-none mb-1">Rashid is in</span>
                <span className="text-sm text-medieval-gold font-black uppercase tracking-widest leading-none">{rashidCity}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0"
          >
            <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784748006/logowiki.png" alt="Wiki Logo" className="h-12 w-auto object-contain" />
            <span className="text-medieval-gold font-black uppercase tracking-tighter text-lg hidden sm:inline">
              Miracle Wiki Tools
            </span>
          </button>

          {/* Desktop Global Search Bar */}
          <div className="hidden lg:flex relative max-w-sm w-full mx-6 items-center gap-2">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="text-medieval-gold/40 w-4 h-4" />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  if (activeTab !== 'home') setActiveTab('home');
                  handleSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    searchResults[0].action();
                  }
                }}
                placeholder={language === 'pt' ? 'Buscar no site...' : 'Search wiki...'}
                className="w-full bg-gradient-to-br from-black/60 to-black/90 border border-medieval-gold/20 backdrop-blur-sm rounded-full py-1.5 pl-9 pr-4 text-medieval-gold placeholder:text-medieval-gold/30 focus:outline-none focus:border-medieval-gold/50 focus:bg-black/60 transition-all text-xs font-mono tracking-wider"
              />
            </div>
            <button 
              onClick={() => {
                if (searchResults.length > 0) searchResults[0].action();
              }}
              className="shrink-0 bg-medieval-gold/10 text-medieval-gold border border-medieval-gold/20 hover:bg-medieval-gold hover:text-black hover:border-medieval-gold px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
            >
              {language === 'pt' ? 'Buscar' : 'Search'}
            </button>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-medieval-gold text-black shadow-[0_2px_0_#8b7326] font-black' 
                    : 'text-medieval-gold/60 hover:text-medieval-gold hover:bg-white/5 font-semibold'
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
            {/* Rashid Location Mobile */}
            <div className="flex items-center gap-2 px-2 py-1 bg-black/20 border border-medieval-gold/10 rounded-sm">
              <img 
                src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1776190181/Rashid_rlsxu1.gif" 
                alt="Rashid" 
                className="w-10 h-10 object-contain -my-2"
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] text-medieval-gold font-black leading-tight uppercase">{rashidCity}</span>
            </div>

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
              className="text-medieval-gold p-2 flex items-center gap-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : (
                <>
                  <Menu className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{language === 'pt' ? 'Menu' : 'Menu'}</span>
                </>
              )}
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
              <div className="flex flex-col p-4 max-h-[75vh] overflow-y-auto">
                {renderSidebarContent(true)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      )}
      <div className="flex-grow flex flex-row overflow-hidden max-w-[1920px] w-full mx-auto relative">

      {/* Main Workspace with sidebar + responsive layout */}
        {/* Left Sidebar Menu */}
        {activeTab !== "home" && (
        <aside className="w-64 lg:w-72 hidden md:block shrink-0 border-r border-medieval-gold/15 bg-black/55 py-6 px-4 overflow-y-auto custom-scrollbar select-none self-stretch">
          {renderSidebarContent(false)}
        </aside>
        )}
        {/* Dynamic Content Panel */}
        <div className="flex-grow overflow-y-auto py-8 px-4 sm:px-6 lg:px-8 custom-scrollbar pt-[12px] sm:pt-[12px]">
          <div className={`mx-auto w-full ${activeTab === 'buildmaker' ? 'max-w-[1600px] px-2 xl:px-6' : (activeTab === 'calculators' ? 'max-w-7xl px-4' : 'max-w-5xl px-4')}`}>
            <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 py-10 relative"
              >
                {/* Language Switcher for Home Page */}
                <div className="absolute top-0 right-0 flex items-center gap-1 border border-medieval-gold/20 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <button 
                    onClick={() => setLanguage('pt')}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all ${language === 'pt' ? 'bg-medieval-gold text-black shadow-[0_0_10px_rgba(197,160,89,0.3)]' : 'text-medieval-gold/50 hover:text-medieval-gold'}`}
                  >
                    PT
                  </button>
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all ${language === 'en' ? 'bg-medieval-gold text-black shadow-[0_0_10px_rgba(197,160,89,0.3)]' : 'text-medieval-gold/50 hover:text-medieval-gold'}`}
                  >
                    EN
                  </button>
                </div>

                <header className="text-center mb-16">
                  <div className="flex flex-col items-center justify-center gap-6 mb-6">
                    <h1 className="text-4xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-medieval-gold to-medieval-gold/30 uppercase tracking-tighter drop-shadow-[0_0_25px_rgba(197,160,89,0.4)]">
                      Miracle Wiki
                    </h1>
                  </div>
                  <p className="text-medieval-gold/70 font-mono text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    {language === 'pt' 
                      ? 'Escolha a sua jornada. Encontre guias completos e ferramentas avançadas em Miracle 7.4.' 
                      : 'Choose your journey. Find complete guides and advanced tools in Miracle 7.4.'}
                  </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* Mapa Interativo */}
                  <motion.button 
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => { setActiveTab('mapa'); window.scrollTo(0,0); }}
                    className="relative group p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#111] to-black border border-medieval-gold/20 hover:border-medieval-gold/60 transition-all text-left flex flex-col justify-between min-h-[300px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(197,160,89,0.2)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-medieval-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <div className="p-4 bg-black/60 border border-medieval-gold/30 rounded-2xl group-hover:bg-medieval-gold/20 group-hover:border-medieval-gold shadow-inner transition-all duration-300">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/mapainterativo.gif" className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform" alt="Mapa" />
                      </div>
                      <ChevronRight className="text-medieval-gold/30 group-hover:text-medieval-gold group-hover:translate-x-2 transition-all w-8 h-8" />
                    </div>
                    <div className="relative z-10 mt-8">
                      <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-medieval-gold to-medieval-gold/70 uppercase tracking-tight mb-3 group-hover:from-white group-hover:to-medieval-gold transition-colors">
                        {language === 'pt' ? 'Mapa Interativo' : 'Interactive Map'}
                      </h2>
                      <p className="text-medieval-gold/60 text-sm leading-relaxed font-mono">
                        {language === 'pt' ? 'Explore o mapa mundi, encontre NPCs, respawns e rotas secretas em alta resolução.' : 'Explore the world map, find NPCs, respawns and secret routes in high resolution.'}
                      </p>
                    </div>
                  </motion.button>

                  {/* Ferramentas */}
                  <motion.button 
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => { setActiveTab('calculadoras'); window.scrollTo(0,0); }}
                    className="relative group p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#111] to-black border border-medieval-gold/20 hover:border-medieval-gold/60 transition-all text-left flex flex-col justify-between min-h-[300px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(197,160,89,0.2)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-medieval-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <div className="p-4 bg-black/60 border border-medieval-gold/30 rounded-2xl group-hover:bg-medieval-gold/20 group-hover:border-medieval-gold shadow-inner transition-all duration-300">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform" alt="Ferramentas" />
                      </div>
                      <ChevronRight className="text-medieval-gold/30 group-hover:text-medieval-gold group-hover:translate-x-2 transition-all w-8 h-8" />
                    </div>
                    <div className="relative z-10 mt-8">
                      <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-medieval-gold to-medieval-gold/70 uppercase tracking-tight mb-3 group-hover:from-white group-hover:to-medieval-gold transition-colors">
                        {language === 'pt' ? 'Ferramentas' : 'Tools'}
                      </h2>
                      <p className="text-medieval-gold/60 text-sm leading-relaxed font-mono">
                        {language === 'pt' ? 'Calculadoras de skills, Rune Making, chance de atributar itens e Build Maker para maximizar seus ganhos.' : 'Skill calculators, Rune Making, attribute chance and Build Maker to maximize your gains.'}
                      </p>
                    </div>
                  </motion.button>

                  {/* Wiki & Quests */}
                  <motion.button 
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => { setActiveTab('wiki'); window.scrollTo(0,0); }}
                    className="relative group p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#111] to-black border border-medieval-gold/20 hover:border-medieval-gold/60 transition-all text-left flex flex-col justify-between min-h-[300px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(197,160,89,0.2)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-medieval-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <div className="p-4 bg-black/60 border border-medieval-gold/30 rounded-2xl group-hover:bg-medieval-gold/20 group-hover:border-medieval-gold shadow-inner transition-all duration-300">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850372/wiki.gif" className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform" alt="Wiki" />
                      </div>
                      <ChevronRight className="text-medieval-gold/30 group-hover:text-medieval-gold group-hover:translate-x-2 transition-all w-8 h-8" />
                    </div>
                    <div className="relative z-10 mt-8">
                      <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-medieval-gold to-medieval-gold/70 uppercase tracking-tight mb-3 group-hover:from-white group-hover:to-medieval-gold transition-colors">
                        Wiki & Quests
                      </h2>
                      <p className="text-medieval-gold/60 text-sm leading-relaxed font-mono">
                        {language === 'pt' ? '[Em Construção] Explore o guia de profissões, enciclopédia de itens, equipamentos, bestiário e missões.' : '[Under Construction] Explore the professions guide, encyclopedia of items, equipment, bestiary and quests.'}
                      </p>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}
            {activeTab === 'buildmaker' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full"
            >
              <BuildMakerView language={language} />
            </motion.div>
          )}

          {activeTab === 'feedback' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <FeedbackBoard language={language} />
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
                <header className="text-center mb-12 mt-4">
                  <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Calculadoras" />
                    {language === 'pt' ? 'Calculadoras' : 'Calculators'}
                  </h1>
                  <p className="text-medieval-gold/80 font-mono text-sm">
                    {language === 'pt' ? 'Ferramentas essenciais para calcular seus ganhos e atributos' : 'Essential tools to calculate your gains and attributes'}
                  </p>
                </header>
                {/* Sub-navegação Calculadoras */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <button
                    onClick={() => setCalcSubTab('skills')}
                    className={`relative overflow-hidden px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 group ${
                      calcSubTab === 'skills'
                        ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                        : 'bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      {t('skills')}
                    </div>
                  </button>
                  <button
                    onClick={() => setCalcSubTab('bless')}
                    className={`relative overflow-hidden px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 group ${
                      calcSubTab === 'bless'
                        ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                        : 'bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      {t('blessDeath')}
                    </div>
                  </button>
                  <button
                    onClick={() => setCalcSubTab('atributos')}
                    className={`relative overflow-hidden px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 group ${
                      calcSubTab === 'atributos'
                        ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                        : 'bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      {t('attributes')}
                    </div>
                  </button>
                  <button
                    onClick={() => setCalcSubTab('runemaking')}
                    className={`relative overflow-hidden px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 group ${
                      calcSubTab === 'runemaking'
                        ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                        : 'bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      {language === 'pt' ? 'Rune Making' : 'Rune Making'}
                    </div>
                  </button>
                  <button
                    onClick={() => setCalcSubTab('professions')}
                    className={`relative overflow-hidden px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 group ${
                      calcSubTab === 'professions'
                        ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                        : 'bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      {t('professions')}
                    </div>
                  </button>
                </div>

                {calcSubTab === 'professions' ? (
                  <div className="space-y-8">
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        onClick={() => setProfSubTab('crafting')}
                        className={`relative overflow-hidden px-5 py-2.5 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-300 group ${
                          profSubTab === 'crafting'
                            ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-105'
                            : 'bg-black/40 text-medieval-gold/40 border border-medieval-gold/10 hover:border-medieval-gold/30 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-2 relative z-10">
                          {t('crafting')}
                        </div>
                      </button>
                      <button
                        onClick={() => setProfSubTab('alchemy')}
                        className={`relative overflow-hidden px-5 py-2.5 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-300 group ${
                          profSubTab === 'alchemy'
                            ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-105'
                            : 'bg-black/40 text-medieval-gold/40 border border-medieval-gold/10 hover:border-medieval-gold/30 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-2 relative z-10">
                          {t('alchemy')}
                        </div>
                      </button>
                      <button
                        onClick={() => setProfSubTab('farming')}
                        className={`relative overflow-hidden px-5 py-2.5 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-300 group ${
                          profSubTab === 'farming'
                            ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-105'
                            : 'bg-black/40 text-medieval-gold/40 border border-medieval-gold/10 hover:border-medieval-gold/30 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-2 relative z-10">
                          {t('farming')}
                        </div>
                      </button>
                      <button
                        onClick={() => setProfSubTab('mining')}
                        className={`relative overflow-hidden px-5 py-2.5 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-300 group ${
                          profSubTab === 'mining'
                            ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-105'
                            : 'bg-black/40 text-medieval-gold/40 border border-medieval-gold/10 hover:border-medieval-gold/30 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-2 relative z-10">
                          {t('mining')}
                        </div>
                      </button>
                    </div>

                    {profSubTab === 'crafting' ? (
                      <CraftingCalculator 
                        t={t} 
                        CRAFT_ITEMS={CRAFT_ITEMS} 
                        BREAKING_DATA={BREAKING_DATA} 
                        initialCategory={searchCraftCategory}
                        initialItemName={searchCraftItemName}
                      />
                    ) : profSubTab === 'alchemy' ? (
                      <AlchemyCalculator t={t} initialRuneName={searchAlchemyRune} />
                    ) : profSubTab === 'farming' ? (
                      <FarmingCalculator t={t} initialTreeName={searchFarmingTree} />
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
                ) : calcSubTab === 'runemaking' ? (
                  <RuneMakingCalculator t={t} language={language} />
                ) : (
                  <div className="space-y-8">
                    <header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                        {t('attributes')}
                      </h1>
                      <p className="text-medieval-gold/80 font-mono text-sm">
                        {t('attributeSubtitle')}
                      </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-12 space-y-6">
                        <div className="medieval-card p-6 sm:p-8">
                          <div className="space-y-8">
                            
                            {/* Grid de Categorias */}
                            <div>
                              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2 mb-4">
                                <TableIcon className="w-4 h-4" /> {t('category')}
                              </label>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                {Object.keys(ATTRIBUTE_DATA).map(cat => (
                                  <button 
                                    key={cat} 
                                    onClick={() => {
                                      setAttrCategory(cat);
                                      setAttrItemName(ATTRIBUTE_DATA[cat][0].name);
                                    }}
                                    className={`py-3 px-4 rounded-lg font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all border ${attrCategory === cat ? 'bg-medieval-gold/20 border-medieval-gold text-medieval-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'bg-black/40 border-medieval-gold/20 text-medieval-gold/60 hover:bg-medieval-gold/10 hover:border-medieval-gold/40'}`}
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>
                            </div>

                             {/* Seleção de Item */}
                             <div className="flex flex-col gap-2">
                               <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                                 <Sword className="w-4 h-4" /> {t('equipment')}
                               </label>
                               <div className="flex gap-4">
                                 <div className="w-16 h-16 bg-black/60 rounded border border-medieval-gold/30 flex items-center justify-center shrink-0 shadow-inner">
                                   {attrCategory === 'Helmets' ? (
                                     <img
                                        src={HELMETS_DATA.find(h => h.name === attrItemName)?.image}
                                        alt={attrItemName}
                                       className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                                       referrerPolicy="no-referrer"
                                     />
                                   ) : (
                                     <Sword className="w-8 h-8 text-medieval-gold/20" />
                                   )}
                                 </div>
                                 <select
                                   value={attrItemName}
                                   onChange={(e) => setAttrItemName(e.target.value)}
                                   className="medieval-input cursor-pointer appearance-none flex-1"
                                 >
                                   {ATTRIBUTE_DATA[attrCategory]?.map(item => (
                                     <option key={item.name} value={item.name}>
                                       {item.name} (Classe {item.class})
                                     </option>
                                   ))}
                                 </select>
                               </div>
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <div className="medieval-card p-6 space-y-4 h-full">
                            <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" /> {t('understandFormula')}
                            </h3>
                            <div className="space-y-3 text-xs text-medieval-text/70 leading-relaxed font-mono">
                              <p>1. {t('formulaStep1')}</p>
                              <p>2. {t('formulaStep2')}</p>
                              <p>3. {t('formulaStep3')}</p>
                              <p>4. {t('formulaStep4')}</p>
                            </div>
                            <div className="mt-4 p-4 bg-medieval-red/10 border border-medieval-red/20 rounded-lg flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-medieval-red shrink-0 mt-0.5" />
                              <p className="text-[10px] text-medieval-text/60 italic uppercase tracking-tighter">
                                Atenção: Atributos com menos níveis que a classe do item (ex: ML) usam apenas seus níveis disponíveis no cálculo.
                              </p>
                            </div>
                          </div>

                          <div className="medieval-card p-6 space-y-4 h-full flex flex-col justify-between">
                            <div>
                              <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-4">
                                Onde adquirir Orbs?
                              </h3>
                              <p className="text-xs text-medieval-text/70 leading-relaxed font-mono">
                                Normal Orbs e Grand Arcane Orbs podem ser obtidos derrotando criaturas <strong className="text-medieval-gold">Bosses</strong>, completando <strong className="text-medieval-gold">Tasks</strong> ou através do sistema de <strong className="text-medieval-gold">Alchemy</strong> craftando Mystic Runes.
                              </p>
                            </div>
                            
                            <div className="mt-6">
                              <button 
                                onClick={() => {
                                  setCalcSubTab('professions');
                                  setProfSubTab('alchemy');
                                }}
                                className="w-full bg-medieval-gold/10 hover:bg-medieval-gold/20 text-medieval-gold font-bold py-3 px-4 rounded border border-medieval-gold/30 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                              >
                                <FlaskConical className="w-5 h-5" />
                                Receitas de Mystic Runes (Alchemy)
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
</div>
                )}
              </motion.div>
            )}

            {activeTab === 'loot' && (
              <motion.div
                key="loot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <LootOptimizer language={language} rashidCity={rashidCity} />
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
                    <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/mapainterativo.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Mapa" /> {t('mapTitle')}
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

                  <div className="medieval-card bg-medieval-gold/5 p-3 flex items-center gap-3 shrink-0 max-w-xs mx-auto md:mx-0">
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
                        href="https://drive.google.com/uc?export=download&id=1LC7gzYWQLKHD2VOTy3h5zxQp5cmlATko" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-black text-medieval-gold hover:underline uppercase tracking-tighter"
                      >
                        Download (.zip)
                      </a>
                    </div>
                  </div>
                </header>

                <div className="h-[85vh] w-full">
                  <MapViewer language={language} />
                </div>
              </motion.div>
            )}
            {activeTab === 'profissoes' && (
              <motion.div
                key="profissoes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-full"
              >
                <ProfessionsGuideView 
                  language={language} 
                  onNavigateToCalculator={(calc) => {
                    setActiveTab('calculadoras');
                    setCalcSubTab('professions');
                    setProfSubTab(calc);
                    window.scrollTo(0, 0);
                  }}
                />
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
                  <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849035/lobbyquest.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Eventos" /> {t('eventsLobbyTitle')}
                  </h1>
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-medieval-gold/10 border border-medieval-gold/30 rounded-full">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <p className="text-xs font-black text-medieval-gold uppercase tracking-widest">V3.2 - {t('realTimeSystem')}</p>
                  </div>
                </header>

                <div className="medieval-card rounded-lg overflow-hidden bg-black h-[800px] relative">
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
                    onClick={() => setWikiMainTab('home')}
                    className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-widest transition-all duration-300 group ${
                      wikiMainTab === 'home'
                        ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                        : 'bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      {t('home')}
                    </div>
                  </button>
                  <button
                    onClick={() => setWikiMainTab('items')}
                    className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-widest transition-all duration-300 group ${
                      wikiMainTab === 'items'
                        ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                        : 'bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850372/wiki.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Itens" /> {t('items')}
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('profissoes')}
                    className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-widest transition-all duration-300 group bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/guiadeprofissoes.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Profissoes" /> {language === 'pt' ? 'Profissões' : 'Professions'}
                    </div>
                  </button>
                  <button
                    onClick={() => setWikiMainTab('library')}
                    className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-widest transition-all duration-300 group ${
                      wikiMainTab === 'library'
                        ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                        : 'bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850372/wiki.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Library" /> {t('library')}
                    </div>
                  </button>
                  <button
                    onClick={() => setWikiMainTab('updates')}
                    className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-widest transition-all duration-300 group ${
                      wikiMainTab === 'updates'
                        ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105'
                        : 'bg-black/60 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-2 relative z-10">
                      {t('updates')}
                    </div>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {wikiMainTab === 'home' && (
                    <motion.div
                      key="wiki-home"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-12 text-left"
                    >
                      {/* Hero Header Banner */}
                      <header className="text-center relative py-6">
                        <div className="absolute inset-0 bg-gradient-to-b from-medieval-gold/5 via-transparent to-transparent blur-3xl rounded-full"></div>
                        <h1 className="text-4xl sm:text-5xl font-black text-medieval-gold uppercase tracking-tighter mb-3 relative drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex items-center justify-center gap-3">
                          <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850372/wiki.gif" className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Wiki" /> Wiki Miracle 7.4
                        </h1>
                        <p className="text-medieval-gold/70 font-mono text-xs max-w-2xl mx-auto italic tracking-wide">
                          "O conhecimento é a chave para a sobrevivência e para o topo das tabelas nas terras de Miracle."
                        </p>
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-medieval-gold/40 to-transparent mx-auto mt-6"></div>
                      </header>

                      {/* Main Navigation Chapters */}
                      <div className="space-y-4">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-medieval-gold/50 mb-6 text-center">
                          — {language === 'pt' ? 'Capítulos Principais da Enciclopédia' : 'Main Encyclopedia Chapters'} —
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[
                            { 
                              id: 'mapa', 
                              title: language === 'pt' ? 'Mapa Interativo' : 'Interactive Map', 
                              desc: language === 'pt' ? 'Explore o mapa mundi, encontre NPCs, respawns de monstros e rotas secretas.' : 'Explore the world map, find NPCs, monster respawns, and secret routes.', 
                              icon: null,
                              meta: language === 'pt' ? 'Abrir Mapa' : 'Open Map'
                            },
                            { 
                              id: 'profissoes', 
                              title: language === 'pt' ? 'Guia de Profissões' : 'Professions Guide', 
                              desc: language === 'pt' ? 'Guia completo e em vídeo sobre as profissões de Miracle 7.4.' : 'Complete video guide covering the professions in Miracle 7.4.', 
                              icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/guiadeprofissoes.gif" className="w-6 h-6 object-contain" alt="Profissoes" />,
                              meta: language === 'pt' ? 'Abrir Guia' : 'Open Guide'
                            },
                            { 
                              id: 'items', 
                              title: t('items'), 
                              desc: language === 'pt' ? 'Database completo de equipamentos, armas, armaduras e atributos adicionais de Miracle 7.4.' : 'Complete database of weapons, armor, shields, and additional attributes of Miracle 7.4.', 
                              icon: null,
                              meta: language === 'pt' ? 'Explorar Equipamentos' : 'Explore Equipment'
                            },
                            { 
                              id: 'library', 
                              title: t('library'), 
                              desc: language === 'pt' ? 'Livros históricos e diários lendários espalhados pelas misteriosas regiões do mapa.' : 'Historical documentation and ancient diaries found across the regions.', 
                              icon: null,
                              meta: language === 'pt' ? 'Abrir Biblioteca' : 'Open Library'
                            },
                            { 
                              id: 'updates', 
                              title: t('updates'), 
                              desc: language === 'pt' ? 'Histórico completo de patches de servidores, atualizações e balanceamento de Miracle.' : 'Full server patch history, balancing logs, and development progress.', 
                              icon: null,
                              meta: language === 'pt' ? 'Notas de Patches' : 'Patch Notes'
                            },
                            { 
                              id: 'cyclopedia', 
                              title: language === 'pt' ? 'Cyclopedia' : 'Cyclopedia', 
                              desc: language === 'pt' ? 'Catálogo de todas as criaturas do mundo de Miracle. Explore seus atributos, fraquezas e recompensas.' : 'Catalog of all creatures in the world of Miracle. Explore their attributes, weaknesses, and rewards.', 
                              icon: null,
                              meta: language === 'pt' ? 'Abrir Cyclopedia' : 'Open Cyclopedia'
                            },
                            {
                               id: 'custom_systems',
                               title: language === 'pt' ? 'Sistemas Custom' : 'Custom Systems',
                               desc: language === 'pt' ? 'Conheça todos os sistemas customizados e exclusivos do Miracle.' : 'Discover all customized and exclusive systems of Miracle.',
                               icon: null,
                               meta: language === 'pt' ? 'Explorar Sistemas' : 'Explore Systems'
                            },
                          ].map((card) => (
                            <button
                              key={card.id}
                              onClick={() => {
                                if (card.id === 'profissoes') setActiveTab('profissoes');
                                else if (card.id === 'mapa') setActiveTab('mapa');
                                else {
                                  setActiveTab('wiki');
                                  setWikiMainTab(card.id as any);
                                }
                                window.scrollTo(0, 0);
                              }}
                              className="medieval-card p-6 text-left group hover:border-medieval-gold transition-all relative overflow-hidden flex flex-col justify-between h-48 hover:shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                            >
                              <div>
                                <h3 className="text-lg font-black text-medieval-gold uppercase mb-1">{card.title}</h3>
                                <p className="text-xs text-medieval-text/60 leading-relaxed line-clamp-2 md:line-clamp-3">{card.desc}</p>
                              </div>
                              <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-medieval-gold/40 group-hover:text-medieval-gold transition-colors pt-4 mt-auto">
                                {card.meta} <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Interactive FAQ and Direct Multi-Tab Routing Widget */}
                      <div className="space-y-6 pt-4 border-t border-medieval-gold/10">
                        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-medieval-gold/50 mb-2">
                            — {language === 'pt' ? 'Guia Rápido & Atalhos de Dúvidas' : 'Quick Guide & Common Questions'} —
                          </h2>
                          <p className="text-[11px] text-medieval-text/50 leading-relaxed font-mono">
                            {language === 'pt' 
                              ? 'Mais procurados pela comunidade e tirados diretamente de dúvidas frequentes em lives.' 
                              : 'Most requested by the community and extracted directly from stream questions.'}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* FAQ 1: Crafting Recipe Lookup */}
                          <div className="bg-black/40 border border-medieval-gold/15 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-medieval-gold/35 transition-all">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-red-500/10 text-red-400 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-red-500/20">Receitas & Ingredientes</span>
                                <h4 className="text-xs font-black text-medieval-gold uppercase">{language === 'pt' ? 'Onde vejo a lista de materiais para forjar?' : 'Where do I find item crafting costs?'}</h4>
                              </div>
                              <p className="text-xs text-medieval-text/60 leading-relaxed">
                                {language === 'pt'
                                  ? 'No Simulador de Forja sob a aba Profissões. Lá você pode selecionar qualquer item criável para ver ingredientes e simular custos de skills de fabricação.'
                                  : 'Inside Crafting Simulator under Professions. Select any forgeable weapon, armor, or tool to inspect lists of ingredients directly.'}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setActiveTab('calculadoras');
                                setCalcSubTab('professions');
                                setProfSubTab('crafting');
                              }}
                              className="text-[10px] uppercase font-black tracking-widest text-medieval-gold/70 hover:text-medieval-gold flex items-center gap-1.5 w-fit hover:underline"
                            >
                              <Hammer className="w-3.5 h-3.5 text-medieval-gold" />
                              {language === 'pt' ? 'Ir para Calculadora de Crafting' : 'Go to Crafting Calculator'}
                            </button>
                          </div>

                          {/* FAQ 2: Alchemy Duping Runes */}
                          <div className="bg-black/40 border border-medieval-gold/15 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-medieval-gold/35 transition-all">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-blue-500/10 text-blue-400 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-blue-500/20">Alquimia & Duplicação</span>
                                <h4 className="text-xs font-black text-medieval-gold uppercase">{language === 'pt' ? 'Onde vejo as Runas que Duplicam (Alquimia)?' : 'Which Runes can be duplicated during use?'}</h4>
                              </div>
                              <p className="text-xs text-medieval-text/60 leading-relaxed">
                                {language === 'pt'
                                  ? 'Na nossa Calculadora de Alquimia. É possível listar todas as runas recriáveis, saber as chances percentuais de duplicação e as skills desejadas.'
                                  : 'Under Alchemy Profession. It lists every rune, highlighting double duplication chances and required alchemy skill levels.'}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setActiveTab('calculadoras');
                                setCalcSubTab('professions');
                                setProfSubTab('alchemy');
                              }}
                              className="text-[10px] uppercase font-black tracking-widest text-medieval-gold/70 hover:text-medieval-gold flex items-center gap-1.5 w-fit hover:underline"
                            >
                              <FlaskConical className="w-3.5 h-3.5 text-medieval-gold" />
                              {language === 'pt' ? 'Ir para Calculadora de Alquimia' : 'Go to Alchemy Calculator'}
                            </button>
                          </div>

                          {/* FAQ 3: Equip Attribute Calculator */}
                          <div className="bg-black/40 border border-medieval-gold/15 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-medieval-gold/35 transition-all">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-orange-500/10 text-orange-400 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-orange-500/20">Atributos & Sorte</span>
                                <h4 className="text-xs font-black text-medieval-gold uppercase">{language === 'pt' ? 'Como simular rolagens secundárias de itens?' : 'How do I simulate secondary item stats?'}</h4>
                              </div>
                              <p className="text-xs text-medieval-text/60 leading-relaxed">
                                {language === 'pt'
                                  ? 'Abra a Calculadora de Atributos ou clique direto abaixo para simular os bônus possíveis de cada equipamento (como HP, Leech ou Atividades).'
                                  : 'Select any weapon or armor in our Attributes simulator to check roll counts and rates based on item rarity grades.'}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setActiveTab('calculadoras');
                                setCalcSubTab('atributos');
                              }}
                              className="text-[10px] uppercase font-black tracking-widest text-medieval-gold/70 hover:text-medieval-gold flex items-center gap-1.5 w-fit hover:underline"
                            >
                              <Gem className="w-3.5 h-3.5 text-medieval-gold" />
                              {language === 'pt' ? 'Ir para Simulador de Atributos' : 'Go to Attributes Simulator'}
                            </button>
                          </div>

                          {/* FAQ 4: Bless Costs & Death Losses */}
                          <div className="bg-black/40 border border-medieval-gold/15 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-medieval-gold/35 transition-all">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="bg-green-500/10 text-green-400 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border border-green-500/20">Morte & Blessings</span>
                                <h4 className="text-xs font-black text-medieval-gold uppercase">{language === 'pt' ? 'Qual é o preço e efeito de mortes com Bless?' : 'What is the exact death penalty with Bless?'}</h4>
                              </div>
                              <p className="text-xs text-medieval-text/60 leading-relaxed">
                                {language === 'pt'
                                  ? 'A morte sem bênçãos custa caro! Acesse a Calculadora de Bless para calcular o custo percentual conforme seu level e quantidade de bônus protetivos.'
                                  : 'Calculate progress/experience losses and get exact wallet prices for up to 5 protect blessings according to level.'}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setActiveTab('calculadoras');
                                setCalcSubTab('bless');
                              }}
                              className="text-[10px] uppercase font-black tracking-widest text-medieval-gold/70 hover:text-medieval-gold flex items-center gap-1.5 w-fit hover:underline"
                            >
                              
                              {language === 'pt' ? 'Abrir Calculadora de Bless' : 'Open Bless Calculator'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}


                  {wikiMainTab === 'items' && (
                    <motion.div
                      key="wiki-items"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-8"
                    >
                      <header className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                          <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850372/wiki.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Itens" /> {t('items')}
                        </h1>
                        <p className="text-medieval-gold/80 font-mono text-sm">
                          Enciclopédia de Equipamentos e Tesouros de Miracle 7.4
                        </p>
                      </header>

                      {/* Items Sub-Navigation */}
                      <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {[
                          { id: 'helmets', labelPt: 'Capacetes', labelEn: 'Helmets', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/capacetes.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Helmets" /> },
                          { id: 'armors', labelPt: 'Armaduras', labelEn: 'Armor Sets', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/armaduras.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Armors" /> },
                          { id: 'legs', labelPt: 'Calças', labelEn: 'Legs', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/cal%C3%A7as.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Legs" /> },
                          { id: 'boots', labelPt: 'Botas', labelEn: 'Boots', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/botas.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Boots" /> },
                          { id: 'shields', labelPt: 'Escudos', labelEn: 'Shields', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849030/escudos.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Shields" /> },
                          { id: 'swords', labelPt: 'Espadas', labelEn: 'Swords', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/espadas.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Swords" /> },
                          { id: 'clubs', labelPt: 'Maças', labelEn: 'Clubs', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/clavas.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Clubs" /> },
                          { id: 'axes', labelPt: 'Machados', labelEn: 'Axes', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849032/machados.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Axes" /> },
                          { id: 'distance', labelPt: 'Distância', labelEn: 'Distance', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849030/distance.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Distance" /> },
                          { id: 'ammo', label: language === 'pt' ? 'Munições' : 'Ammo', icon: null },
                          { id: 'rings', labelPt: 'Anéis', labelEn: 'Magic Rings', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/aneis_magicos.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Rings" /> },
                          { id: 'amulets', labelPt: 'Amuletos', labelEn: 'Amulets', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849026/amuletos.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Amulets" /> },
                          { id: 'relics', labelPt: 'Relíquias', labelEn: 'Holy Relics', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/reliquias.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Relics" /> }
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setItemsSubTab(sub.id as any)}
                            className={`relative overflow-hidden px-4 py-2 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-300 group flex items-center gap-2 border ${
                              itemsSubTab === sub.id
                                ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black border-medieval-gold shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-105'
                                : 'bg-black/40 text-medieval-gold/60 border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                            }`}
                          >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 flex items-center gap-2">
                              {sub.icon} {sub.label}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Helmets Table */}
                      {itemsSubTab === 'helmets' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('arm')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {HELMETS_DATA.map((helmet, idx) => {
                                  const attrs = ATTRIBUTE_DATA["Helmets"]?.find(i => i.name === helmet.name)?.attributes || [];
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <img 
                                              src={helmet.image} 
                                              alt={helmet.name} 
                                              className="w-8 h-8 object-contain"
                                              referrerPolicy="no-referrer"
                                            />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{helmet.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{helmet.armor}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{helmet.weight.toFixed(2)}</td>
                                      <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                          helmet.class === 0 ? 'bg-gray-500/20 text-gray-400' :
                                          helmet.class === 1 ? 'bg-green-500/20 text-green-400' :
                                          helmet.class === 2 ? 'bg-blue-500/20 text-blue-400' :
                                          helmet.class === 3 ? 'bg-purple-500/20 text-purple-400' :
                                          helmet.class === 4 ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}>
                                          Class {helmet.class}
                                        </span>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {attrs.length > 0 ? attrs.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Armors Table */}
                      {itemsSubTab === 'armors' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('arm')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {armorsList.map((item, idx) => {
                                  const attrs = ATTRIBUTE_DATA["Armors"]?.find(i => i.name === item.name)?.attributes || [];
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.armor ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                          item.attributeClass === 0 ? 'bg-gray-500/20 text-gray-400' :
                                          item.attributeClass === 1 ? 'bg-green-500/20 text-green-400' :
                                          item.attributeClass === 2 ? 'bg-blue-500/20 text-blue-400' :
                                          item.attributeClass === 3 ? 'bg-purple-500/20 text-purple-400' :
                                          item.attributeClass === 4 ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}>
                                          Class {item.attributeClass}
                                        </span>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {attrs.length > 0 ? attrs.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Legs Table */}
                      {itemsSubTab === 'legs' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('arm')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {legsList.map((item, idx) => {
                                  const attrs = ATTRIBUTE_DATA["Legs"]?.find(i => i.name === item.name)?.attributes || [];
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.armor ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                          item.attributeClass === 0 ? 'bg-gray-500/20 text-gray-400' :
                                          item.attributeClass === 1 ? 'bg-green-500/20 text-green-400' :
                                          item.attributeClass === 2 ? 'bg-blue-500/20 text-blue-400' :
                                          item.attributeClass === 3 ? 'bg-purple-500/20 text-purple-400' :
                                          item.attributeClass === 4 ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}>
                                          Class {item.attributeClass}
                                        </span>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {attrs.length > 0 ? attrs.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Boots Table */}
                      {itemsSubTab === 'boots' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('arm')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {bootsList.map((item, idx) => {
                                  const attrs = ATTRIBUTE_DATA["Boots"]?.find(i => i.name === item.name)?.attributes || [];
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.armor ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                          item.attributeClass === 0 ? 'bg-gray-500/20 text-gray-400' :
                                          item.attributeClass === 1 ? 'bg-green-500/20 text-green-400' :
                                          item.attributeClass === 2 ? 'bg-blue-500/20 text-blue-400' :
                                          item.attributeClass === 3 ? 'bg-purple-500/20 text-purple-400' :
                                          item.attributeClass === 4 ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}>
                                          Class {item.attributeClass}
                                        </span>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {attrs.length > 0 ? attrs.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Shields Table */}
                      {itemsSubTab === 'shields' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">DEF</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {shieldsList.map((item, idx) => {
                                  const attrs = ATTRIBUTE_DATA["Shields"]?.find(i => i.name === item.name)?.attributes || [];
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.defense ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                          item.attributeClass === 0 ? 'bg-gray-500/20 text-gray-400' :
                                          item.attributeClass === 1 ? 'bg-green-500/20 text-green-400' :
                                          item.attributeClass === 2 ? 'bg-blue-500/20 text-blue-400' :
                                          item.attributeClass === 3 ? 'bg-purple-500/20 text-purple-400' :
                                          item.attributeClass === 4 ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}>
                                          Class {item.attributeClass}
                                        </span>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {attrs.length > 0 ? attrs.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Swords Table */}
                      {itemsSubTab === 'swords' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">ATK</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">DEF</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {swordsList.map((item, idx) => {
                                  const attrs = ATTRIBUTE_DATA["Swords"]?.find(i => i.name === item.name)?.attributes || [];
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.attack ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/50">{item.defense ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                          item.attributeClass === 0 ? 'bg-gray-500/20 text-gray-400' :
                                          item.attributeClass === 1 ? 'bg-green-500/20 text-green-400' :
                                          item.attributeClass === 2 ? 'bg-blue-500/20 text-blue-400' :
                                          item.attributeClass === 3 ? 'bg-purple-500/20 text-purple-400' :
                                          item.attributeClass === 4 ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}>
                                          Class {item.attributeClass}
                                        </span>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {attrs.length > 0 ? attrs.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Clubs Table */}
                      {itemsSubTab === 'clubs' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">ATK</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">DEF</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {clubsList.map((item, idx) => {
                                  const attrs = ATTRIBUTE_DATA["Clubs"]?.find(i => i.name === item.name)?.attributes || [];
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.attack ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/50">{item.defense ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                          item.attributeClass === 0 ? 'bg-gray-500/20 text-gray-400' :
                                          item.attributeClass === 1 ? 'bg-green-500/20 text-green-400' :
                                          item.attributeClass === 2 ? 'bg-blue-500/20 text-blue-400' :
                                          item.attributeClass === 3 ? 'bg-purple-500/20 text-purple-400' :
                                          item.attributeClass === 4 ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}>
                                          Class {item.attributeClass}
                                        </span>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {attrs.length > 0 ? attrs.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Axes Table */}
                      {itemsSubTab === 'axes' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">ATK</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">DEF</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {axesList.map((item, idx) => {
                                  const attrs = ATTRIBUTE_DATA["Axes"]?.find(i => i.name === item.name)?.attributes || [];
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.attack ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/50">{item.defense ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                          item.attributeClass === 0 ? 'bg-gray-500/20 text-gray-400' :
                                          item.attributeClass === 1 ? 'bg-green-500/20 text-green-400' :
                                          item.attributeClass === 2 ? 'bg-blue-500/20 text-blue-400' :
                                          item.attributeClass === 3 ? 'bg-purple-500/20 text-purple-400' :
                                          item.attributeClass === 4 ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}>
                                          Class {item.attributeClass}
                                        </span>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {attrs.length > 0 ? attrs.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Distance Table */}
                      {itemsSubTab === 'distance' && (
                        <div className="space-y-4">
                          {/* Inner Distance Filters */}
                          <div className="flex flex-wrap justify-center gap-1.5 pb-2 border-b border-medieval-gold/10">
                            {[
                              { id: 'all', label: language === 'pt' ? 'Todos' : 'All' },
                              { id: 'bow', label: language === 'pt' ? 'Arcos (Bows)' : 'Bows' },
                              { id: 'crossbow', label: language === 'pt' ? 'Bestas (Crossbows)' : 'Crossbows' },
                              { id: 'throwing', label: language === 'pt' ? 'Arremesso' : 'Throwing' },
                            ].map((pill) => (
                              <button
                                key={pill.id}
                                onClick={() => setDistanceFilter(pill.id as any)}
                                className={`px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all border ${
                                  distanceFilter === pill.id
                                    ? 'bg-medieval-gold/20 text-medieval-gold border-medieval-gold shadow-sm'
                                    : 'bg-black/20 text-medieval-gold/40 border-transparent hover:border-medieval-gold/20 hover:text-medieval-gold/60'
                                }`}
                              >
                                {pill.label}
                              </button>
                            ))}
                          </div>

                          <div className="medieval-card overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-black/60 border-b border-medieval-gold/20">
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{language === 'pt' ? 'TIPO' : 'TYPE'}</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">ATK</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-medieval-gold/5">
                                  {distanceList
                                    .filter(item => {
                                      const isBow = item.name.toLowerCase().includes('bow');
                                      const isXbow = item.name.toLowerCase().includes('crossbow');
                                      if (distanceFilter === 'bow') return isBow;
                                      if (distanceFilter === 'crossbow') return isXbow;
                                      if (distanceFilter === 'throwing') return !isBow && !isXbow;
                                      return true;
                                    })
                                    .map((item, idx) => {
                                      const isBow = item.name.toLowerCase().includes('bow');
                                      const isXbow = item.name.toLowerCase().includes('crossbow');
                                      const typeLabel = isBow 
                                        ? (language === 'pt' ? 'Arco (Bow)' : 'Bow')
                                        : isXbow 
                                          ? (language === 'pt' ? 'Besta (Crossbow)' : 'Crossbow')
                                          : (language === 'pt' ? 'Arremesso' : 'Throwing');

                                      const attrs = ATTRIBUTE_DATA["Distance"]?.find(i => i.name === item.name)?.attributes || [];
                                      return (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                          <td className="p-4">
                                            <div className="flex items-center gap-4">
                                              <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                                <ItemImage item={item} />
                                              </div>
                                              <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                            </div>
                                          </td>
                                          <td className="p-4 text-center">
                                            <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-black uppercase tracking-tighter text-medieval-gold/60 font-mono">
                                              {typeLabel}
                                            </span>
                                          </td>
                                          <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.attack ?? 0}</td>
                                          <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                          <td className="p-4 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                              item.attributeClass === 0 ? 'bg-gray-500/20 text-gray-400' :
                                              item.attributeClass === 1 ? 'bg-green-500/20 text-green-400' :
                                              item.attributeClass === 2 ? 'bg-blue-500/20 text-blue-400' :
                                              item.attributeClass === 3 ? 'bg-purple-500/20 text-purple-400' :
                                              item.attributeClass === 4 ? 'bg-orange-500/20 text-orange-400' :
                                              'bg-red-500/20 text-red-400'
                                            }`}>
                                              Class {item.attributeClass}
                                            </span>
                                          </td>
                                          <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                              {attrs.length > 0 ? attrs.map((p, i) => (
                                                <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                                  {p}
                                                </span>
                                              )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Ammo Table */}
                      {itemsSubTab === 'ammo' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">ATK</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('class')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('properties')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {ammoList.map((item, idx) => {
                                  const attrs = ATTRIBUTE_DATA["Ammo"]?.find(i => i.name === item.name)?.attributes || [];
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.attack ?? 0}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                          item.attributeClass === 0 ? 'bg-gray-500/20 text-gray-400' :
                                          item.attributeClass === 1 ? 'bg-green-500/20 text-green-400' :
                                          item.attributeClass === 2 ? 'bg-blue-500/20 text-blue-400' :
                                          item.attributeClass === 3 ? 'bg-purple-500/20 text-purple-400' :
                                          item.attributeClass === 4 ? 'bg-orange-500/20 text-orange-400' :
                                          'bg-red-500/20 text-red-400'
                                        }`}>
                                          Class {item.attributeClass}
                                        </span>
                                      </td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {attrs.length > 0 ? attrs.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Rings Table */}
                      {itemsSubTab === 'rings' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{language === 'pt' ? 'PROPRIEDADES / EFEITOS' : 'PROPERTIES / EFFECTS'}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {ringsList.map((item, idx) => {
                                  const effects = getItemEffects(item);
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {effects.length > 0 ? effects.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Amulets Table */}
                      {itemsSubTab === 'amulets' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('arm')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{language === 'pt' ? 'PROPRIEDADES / EFEITOS' : 'PROPERTIES / EFFECTS'}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {amuletsList.map((item, idx) => {
                                  const effects = getItemEffects(item);
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.armor ?? '-'}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {effects.length > 0 ? effects.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Relics Table */}
                      {itemsSubTab === 'relics' && (
                        <div className="medieval-card overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-black/60 border-b border-medieval-gold/20">
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{t('item')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('arm')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold text-center">{t('weight')}</th>
                                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-medieval-gold">{language === 'pt' ? 'PROPRIEDADES / EFEITOS' : 'PROPERTIES / EFFECTS'}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-medieval-gold/5">
                                {relicsList.map((item, idx) => {
                                  const effects = getItemEffects(item);
                                  return (
                                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                      <td className="p-4">
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-black/40 rounded border border-medieval-gold/10 flex items-center justify-center group-hover:border-medieval-gold/30 transition-all">
                                            <ItemImage item={item} />
                                          </div>
                                          <span className="font-bold text-sm text-medieval-text group-hover:text-medieval-gold transition-colors">{item.name}</span>
                                        </div>
                                      </td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-gold">{item.armor ?? '-'}</td>
                                      <td className="p-4 text-center font-mono text-sm text-medieval-text/60">{item.weight.toFixed(2)}</td>
                                      <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                          {effects.length > 0 ? effects.map((p, i) => (
                                            <span key={i} className="text-[9px] border border-medieval-gold/10 bg-white/5 px-1.5 py-0.5 rounded text-medieval-gold/80 uppercase font-mono">
                                              {p}
                                            </span>
                                          )) : <span className="text-[9px] text-white/10 uppercase font-mono">-</span>}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {wikiMainTab === 'updates' && (
                    <motion.div
                      key="wiki-updates"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-8"
                    >
                      <header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/inicio_updates.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Updates" /> {t('patchNotes')}
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
                        className={`relative overflow-hidden px-6 py-2.5 rounded-lg font-bold uppercase text-xs tracking-widest transition-all duration-300 group ${
                          wikiSubTab === 'server'
                            ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-105'
                            : 'bg-black/40 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10">{t('serverUpdates')}</span>
                      </button>
                      <button
                        onClick={() => {
                          setWikiSubTab('project');
                          setSelectedPatchVersion(PROJECT_PATCH_NOTES[0].version);
                        }}
                        className={`relative overflow-hidden px-6 py-2.5 rounded-lg font-bold uppercase text-xs tracking-widest transition-all duration-300 group ${
                          wikiSubTab === 'project'
                            ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-105'
                            : 'bg-black/40 text-medieval-gold/60 border border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-medieval-gold/10 hover:text-medieval-gold'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10">{t('projectUpdates')}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Sidebar - Version List */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="medieval-card p-4">
                          <h3 className="text-medieval-gold font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                            Histórico de Versões
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

                        <div className="medieval-card bg-medieval-gold/5 p-6 border-dashed">
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
                              className="medieval-card p-6 sm:p-8 space-y-8"
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
                                       {t('fixed')}
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
                  </motion.div>
                )}

                {wikiMainTab === 'cyclopedia' && (
                  <motion.div
                    key="wiki-cyclopedia"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full"
                  >
                    <CyclopediaView />
                  </motion.div>
                )}

                {wikiMainTab === 'custom_systems' && (
                  <motion.div
                    key="wiki-custom-systems"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <header className="text-center relative py-6">
                      <div className="absolute inset-0 bg-gradient-to-b from-medieval-gold/5 via-transparent to-transparent blur-3xl rounded-full"></div>
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-3 relative drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex items-center justify-center gap-3">
                        {language === 'pt' ? 'Sistemas Custom' : 'Custom Systems'}
                      </h1>
                      <p className="text-medieval-gold/70 font-mono text-xs max-w-2xl mx-auto italic tracking-wide">
                        {language === 'pt' ? 'Guia completo de todas as mecânicas exclusivas do servidor Miracle 7.4.' : 'Complete guide of all exclusive mechanics in Miracle 7.4 server.'}
                      </p>
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-medieval-gold/40 to-transparent mx-auto mt-6"></div>
                    </header>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { id: 'relic_box', name: 'Relic Box' },
                        { id: 'reliquias', name: 'Relíquias' },
                        { id: 'atributos', name: 'Atributos' },
                        { id: 'armas_treino', name: 'Armas de Treino' },
                        { id: 'bed_making', name: 'Bed Making Runes' },
                        { id: 'houses_lands', name: 'Houses & Lands' },
                        { id: 'spawn_demonic', name: 'Spawn & Demonic Essences' },
                        { id: 'shop_idle', name: 'Shop Idle' },
                        { id: 'cam_system', name: 'Cam System' },
                      ].map((sys) => (
                        <div key={sys.id} className="medieval-card p-6 text-center group border border-white/5 relative overflow-hidden flex flex-col justify-center min-h-[140px]">
                          <h3 className="text-lg font-black text-medieval-gold uppercase mb-2">{sys.name}</h3>
                          <p className="text-xs text-medieval-text/50 uppercase tracking-widest">{language === 'pt' ? 'Em construção' : 'Under construction'}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {wikiMainTab === 'library' && (
                  <motion.div
                    key="wiki-library"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    <header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850372/wiki.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Library" /> {t('library')}
                      </h1>
                      <p className="text-medieval-gold/80 font-mono text-sm italic">
                        "Mysteriando: Desvendando os segredos de Miracle 7.4"
                      </p>
                    </header>

                    <div className="flex flex-col space-y-8">
                      {/* Minimalist Horizontal Drum Navigation */}
                      <div className="medieval-card p-4">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                          <DrumMenu 
                            label="1. Região"
                            items={regions}
                            activeId={selectedRegion}
                            onSelect={(id) => {
                              setSelectedRegion(id);
                              setSelectedBookId('');
                            }}
                          />
                          
                          {selectedRegion && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <DrumMenu 
                                label="2. Documento"
                                items={filteredBooks}
                                activeId={selectedBookId}
                                onSelect={(id) => {
                                  setSelectedBookId(id);
                                  setActiveGalleryIndex(0);
                                }}
                              />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Main Content - Full Width */}
                      <div className="w-full">
                        <AnimatePresence mode="wait">
                          {selectedBookId ? (
                            LIBRARY_DATA.filter(b => b.id === selectedBookId).map((book) => (
                              <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                              >
                                {/* Header Info */}
                                <div className="medieval-card p-6">
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

                                {/* Location & Map & Transcription Layout */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div className="space-y-6">
                                    <div className="medieval-card p-6 space-y-4">
                                      <h4 className="text-medieval-gold font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                        <Map className="w-4 h-4" /> {t('location')}
                                      </h4>
                                      <p className="text-sm text-medieval-text/80 font-mono bg-black/20 p-3 rounded border border-medieval-gold/10">
                                        {book.location[language]}
                                      </p>
                                      
                                      {book.gallery && book.gallery.length > 0 ? (
                                        <div className="space-y-3">
                                          <div className="aspect-video bg-black/40 rounded border border-medieval-gold/20 overflow-hidden relative group">
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
                                  </div>

                                  <div className="medieval-card p-6 space-y-4">
                                    <h4 className="text-medieval-gold font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784748006/logowiki.png" className="w-5 h-5 object-contain opacity-70" alt="Inicio" /> {t('transcription')}
                                    </h4>
                                    <div className="relative p-6 sm:p-10 bg-[#f4e4bc] text-[#2c1810] rounded shadow-inner min-h-[400px] font-serif leading-relaxed italic text-lg overflow-hidden">
                                      {/* Parchment texture effect */}
                                      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                                      <div className="relative z-10 whitespace-pre-wrap space-y-4">
                                        {book.content[language]}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center text-medieval-gold/20 space-y-4 py-20">
                              
                              <p className="uppercase tracking-[0.3em] text-xs">Selecione um documento no tambor acima</p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Global Floating Feedback Button */}
      {activeTab !== 'feedback' && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setActiveTab('feedback')}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-medieval-gold to-yellow-600 text-black font-black uppercase tracking-widest text-[10px] rounded-full shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] hover:scale-105 transition-all duration-300"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">{language === 'pt' ? 'Deixe seu Feedback' : 'Leave Feedback'}</span>
          <span className="sm:hidden">Feedback</span>
        </motion.button>
      )}

      {activeTab !== 'home' && (
      <footer className="bg-black/80 border-t border-medieval-gold/10 pt-12 pb-6 px-4 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-[11px] font-mono tracking-wider">
          {/* Section 1: About */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-medieval-gold font-black uppercase text-sm tracking-tighter mb-2">
              <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784748006/logowiki.png" alt="Wiki Logo" className="h-8 w-auto object-contain" />
              Miracle Wiki Tools
            </div>
            <p className="text-medieval-gold/40 leading-relaxed max-w-xs">
              {language === 'pt' 
                ? 'Ferramentas, calculadoras e biblioteca completas para aprimorar sua jornada em Miracle 7.4.' 
                : 'Complete tools, calculators, and library to enhance your journey in Miracle 7.4.'}
            </p>
          </div>

          {/* Section 2: Navigation Layer */}
          <div className="flex flex-col gap-3">
            <h4 className="text-medieval-gold font-bold uppercase mb-2">Navigation</h4>
            <button onClick={() => { setActiveTab('home'); window.scrollTo(0,0); }} className="text-medieval-gold/50 hover:text-medieval-gold text-left transition-colors">Home</button>
            <button onClick={() => { setActiveTab('buildmaker'); window.scrollTo(0,0); }} className="text-medieval-gold/50 hover:text-medieval-gold text-left transition-colors">Build Maker</button>
            <button onClick={() => { setActiveTab('calculadoras'); window.scrollTo(0,0); }} className="text-medieval-gold/50 hover:text-medieval-gold text-left transition-colors">Calculators</button>
            <button onClick={() => { setActiveTab('profissoes'); window.scrollTo(0,0); }} className="text-medieval-gold/50 hover:text-medieval-gold text-left transition-colors">Professions</button>
          </div>

          {/* Section 3: Resources Layer */}
          <div className="flex flex-col gap-3">
            <h4 className="text-medieval-gold font-bold uppercase mb-2">Resources</h4>
            <button onClick={() => { setActiveTab('wiki'); window.scrollTo(0,0); }} className="text-medieval-gold/50 hover:text-medieval-gold text-left transition-colors">Wiki & Lore</button>
            <button onClick={() => { setActiveTab('mapa'); window.scrollTo(0,0); }} className="text-medieval-gold/50 hover:text-medieval-gold text-left transition-colors">Interactive Map</button>
          </div>

          {/* Section 4: Community Layer */}
          <div className="flex flex-col gap-3">
            <h4 className="text-medieval-gold font-bold uppercase mb-2">Community</h4>
            <button onClick={() => { setActiveTab('feedback'); window.scrollTo(0,0); }} className="text-medieval-gold/50 hover:text-medieval-gold text-left transition-colors flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" />
              {language === 'pt' ? 'Sugestões / Feedback' : 'Suggestions / Feedback'}
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-mono text-medieval-gold/30 pt-6 border-t border-medieval-gold/10">
          <p>© 2024 Miracle 7.4 Wiki Project</p>
          <div className="flex gap-6">
            <span>{t('createdBy')}</span>
            <span>{t('developedWithIA')}</span>
          </div>
        </div>
      </footer>
      )}

      {/* Secret Admin Modal */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-6 z-50 bg-black/90 border border-medieval-gold/30 p-6 rounded shadow-[0_0_40px_rgba(197,160,89,0.15)] flex flex-col gap-4 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center gap-8">
              <h3 className="text-medieval-gold font-black uppercase text-xs tracking-widest flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Acessos ao Site
              </h3>
              <button onClick={() => setShowAdmin(false)} className="text-medieval-gold/40 hover:text-medieval-gold">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-3xl font-mono text-white tracking-widest text-center py-2 bg-black/50 border border-medieval-gold/10 rounded">
              {visitCount !== null ? visitCount : '...'}
            </div>
            <p className="text-[10px] text-medieval-gold/40 text-center uppercase tracking-widest font-mono">
              Via Supabase Realtime
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}
