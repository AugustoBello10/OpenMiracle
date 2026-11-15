// Static wiki data and configuration tables extracted from App.tsx

export const CRAFT_ITEMS = [
  {
    category: "toolsPicks",
    items: [
      { name: "Modified Pick", multiplier: 2, req: "1x Pick (consumed on success) + 5 Steels", materials: [{ name: "Pick", amount: 1 }, { name: "Steel", amount: 5, img: "/images/miracle/items/steel_2422.gif" }], img: "/images/miracle/features/8448.gif" },
      { name: "Advanced Pick", multiplier: 1.5, req: "1x Modified Pick (consumed on success) + 1 Draconian Steel + 10 Steels", materials: [{ name: "Modified Pick", amount: 1, img: "/images/miracle/features/8448.gif" }, { name: "Draconian Steel", amount: 1 }, { name: "Steel", amount: 10, img: "/images/miracle/items/steel_2422.gif" }], img: "/images/miracle/features/8449.gif" },
      { name: "Enhanced Pick", multiplier: 1, req: "1x Advanced Pick (consumed on success) + 5 Draconian Steels + 20 Steels", materials: [{ name: "Advanced Pick", amount: 1, img: "/images/miracle/features/8449.gif" }, { name: "Draconian Steel", amount: 5 }, { name: "Steel", amount: 20, img: "/images/miracle/items/steel_2422.gif" }], img: "/images/miracle/features/8450.gif" },
      { name: "Golden Pick", multiplier: 0.5, req: "1x Enhanced Pick (consumed on success) + 40 Steels + 10 Draconian Steels + 3 Hell Steels + 3 Gold Bars", materials: [{ name: "Enhanced Pick", amount: 1, img: "/images/miracle/features/8450.gif" }, { name: "Steel", amount: 40, img: "/images/miracle/items/steel_2422.gif" }, { name: "Draconian Steel", amount: 10 }, { name: "Hell Steel", amount: 3 }, { name: "Gold Bar", amount: 3, img: "/images/miracle/items/gold_bar_11754.gif" }], img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_pick.gif" }
    ]
  },
  {
    category: "rods",
    items: [
      { name: "Reinforced Rod", multiplier: 2, req: "1 fishing rod + 5 steels", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 5 }], img: "/images/miracle/features/8478.gif" },
      { name: "Engineered Rod", multiplier: 1.5, req: "1 fishing rod + 10 steels + 1 draconian steel", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 10 }, { name: "Draconian Steel", amount: 1 }], img: "/images/miracle/features/8479.gif" },
      { name: "Volcanic Rod", multiplier: 1, req: "1 fishing rod + 20 steels + 10 glimmering soils + 5 draconian steels + 3 hell steels", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 20 }, { name: "Glimmering Soil", amount: 10 }, { name: "Draconian Steel", amount: 5 }, { name: "Hell Steel", amount: 3 }], img: "/images/miracle/features/10332.gif" },
      { name: "Golden Rod", multiplier: 0.5, req: "1 fishing rod + 40 steels + 10 draconian steels + 3 gold ingot + 3 hell steels", materials: [{ name: "Fishing Rod", amount: 1 }, { name: "Steel", amount: 40 }, { name: "Draconian Steel", amount: 10 }, { name: "Gold Ingot", amount: 3 }, { name: "Hell Steel", amount: 3 }], img: "/images/miracle/features/10331.gif" },
    ]
  },
  {
    category: "weaponsDistance",
    items: [
      { name: "Armored War Bow", multiplier: 0.08, minChance: 0, req: "1x War Bow (consumed on success) + 300 Steels + 200 Draconian Steels + 100 Hell Steels", materials: [{ name: "War Bow", amount: 1 }, { name: "Steel", amount: 300 }, { name: "Draconian Steel", amount: 200 }, { name: "Hell Steel", amount: 100 }], img: "/images/miracle/features/8215.gif" }
    ]
  },
  {
    category: "skinningKnives",
    items: [
      { name: "Diamond Knife", multiplier: 1, req: "10 small diamonds + 5 Hell Steels + 1 Combat Knife", materials: [{ name: "Small Diamond", amount: 10 }, { name: "Hell Steel", amount: 5 }, { name: "Combat Knife", amount: 1 }], img: "/images/miracle/features/10437.gif" },
    ]
  },
  {
    category: "cuttingAxes",
    items: [
      { name: "Refined Axe", multiplier: 2.0, req: "1x Rough Axe (consumed on success) + 5x Steels", materials: [{ name: "Rough Axe", amount: 1 }, { name: "Steel", amount: 5 }], img: "/images/miracle/features/8454.gif" },
      { name: "Superior Axe", multiplier: 1.5, req: "1x Refined Axe (consumed on success) + 10x Steels + 1x Draconian Steel", materials: [{ name: "Refined Axe", amount: 1 }, { name: "Steel", amount: 10 }, { name: "Draconian Steel", amount: 1 }], img: "/images/miracle/features/8455.gif" },
      { name: "Masterwork Axe", multiplier: 1.0, req: "1x Superior Axe (consumed on success) + 20x Steels + 5x Draconian Steels", materials: [{ name: "Superior Axe", amount: 1 }, { name: "Steel", amount: 20 }, { name: "Draconian Steel", amount: 5 }], img: "/images/miracle/features/8456.gif" },
      { name: "Grandmaster Axe", multiplier: 0.8, req: "1x Masterwork Axe (consumed on success) + 40x Steels + 10x Draconian Steels + 3x Gold Bar", materials: [{ name: "Masterwork Axe", amount: 1 }, { name: "Steel", amount: 40 }, { name: "Draconian Steel", amount: 10 }, { name: "Gold Bar", amount: 3, img: "/images/miracle/items/gold_bar_11754.gif" }], img: "/images/miracle/features/8457.gif" },
    ]
  },
  {
    category: "mysticRunes",
    items: [
      { name: "Ember Rune", multiplier: 1, req: "5 Ember Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Ember Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1, img: "/images/miracle/features/8350.gif" }], img: "/images/miracle/features/7611.gif" },
      { name: "Protector Rune", multiplier: 1, req: "5 Protector Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Protector Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1, img: "/images/miracle/features/8350.gif" }], img: "/images/miracle/features/8157.gif" },
      { name: "Obsidian Rune", multiplier: 1, req: "5 Obsidian Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Obsidian Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1, img: "/images/miracle/features/8350.gif" }], img: "/images/miracle/features/8158.gif" },
      { name: "Astral Rune", multiplier: 1, req: "5 Astral Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Astral Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1, img: "/images/miracle/features/8350.gif" }], img: "/images/miracle/features/8161.gif" },
      { name: "Aegis Rune", multiplier: 1, req: "5 Aegis Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Aegis Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1, img: "/images/miracle/features/8350.gif" }], img: "/images/miracle/features/8160.gif" },
      { name: "Molten Rune", multiplier: 1, req: "5 Molten Fragments + 3 Pulverized Ores + 1 Onyx", materials: [{ name: "Molten Fragment", amount: 5 }, { name: "Pulverized Ore", amount: 3 }, { name: "Onyx", amount: 1, img: "/images/miracle/features/8350.gif" }], img: "/images/miracle/features/8159.gif" },
    ]
  },
  {
    category: "stonesCrystals",
    items: [
      { name: "Fiery Stone", multiplier: 1.0, req: "5 Glimmering Soils", materials: [{ name: "Glimmering Soil", amount: 5 }], img: "/images/miracle/features/7511.gif" },
      { name: "Earth Stone", multiplier: 1.0, req: "5 Natural Soils", materials: [{ name: "Natural Soil", amount: 5 }], img: "/images/miracle/features/7601.gif" },
      { name: "Frozen Stone", multiplier: 1.0, req: "5 Frozen Ores", materials: [{ name: "Frozen Ore", amount: 5, img: "/images/miracle/items/frozen_ore_8353.gif" }], img: "/images/miracle/features/7602.gif" },
      { name: "Onyx", multiplier: 0.5, req: "10 Onyx Fragments", materials: [{ name: "Onyx Fragment", amount: 10 }], img: "/images/miracle/features/8350.gif" },
      { name: "Convergence Crystal", multiplier: 1.0, req: "1 Rare Crystal + 5 Shiny Stones", materials: [{ name: "Rare Crystal", amount: 1 }, { name: "Shiny Stone", amount: 5 }], img: "/images/miracle/features/8181.gif" },
      { name: "Prismatic Crystal", multiplier: 1.0, req: "1 Rare Crystal + 5 Prismatic Stones", materials: [{ name: "Rare Crystal", amount: 1 }, { name: "Prismatic Stone", amount: 5 }], img: "/images/miracle/features/8180.gif" },
    ]
  },
  {
    category: "crests",
    items: [
      { name: "Copper Crest", multiplier: 1.0, req: "5 Copper Bars", materials: [{ name: "Copper Bar", amount: 5, img: "/images/miracle/items/copper_bar_11752.gif" }], img: "/images/miracle/features/8294.gif" },
      { name: "Iron Crest", multiplier: 1.0, req: "5 Iron Bars", materials: [{ name: "Iron Bar", amount: 5, img: "/images/miracle/items/iron_bar_11753.gif" }], img: "/images/miracle/features/8293.gif" },
      { name: "Gold Crest", multiplier: 1.0, req: "5 Gold Bars", materials: [{ name: "Gold Bar", amount: 5, img: "/images/miracle/items/gold_bar_11754.gif" }], img: "/images/miracle/features/8296.gif" },
      { name: "Mythan Crest", multiplier: 1.0, req: "5 Mythan Bars", materials: [{ name: "Mythan Bar", amount: 5, img: "/images/miracle/items/mythan_bar_11755.gif" }], img: "/images/miracle/features/8367.gif" },
      { name: "Mystic Crest", multiplier: 1.0, req: "5 Mystic Bars", materials: [{ name: "Mystic Bar", amount: 5, img: "/images/miracle/items/mystic_bar_11756.gif" }], img: "/images/miracle/features/8368.gif" },
    ]
  },
  {
    category: "smelting",
    items: [
      { name: "Copper Bar", multiplier: 3.0, req: "5 Copper Ores (fundidos em Coal Basin)", materials: [{ name: "Copper Ore", amount: 5 }], img: "/images/miracle/items/copper_bar_11752.gif" },
      { name: "Iron Bar", multiplier: 2.5, req: "5 Iron Ores (fundidos em Coal Basin)", materials: [{ name: "Iron Ore", amount: 5 }], img: "/images/miracle/items/iron_bar_11753.gif" },
      { name: "Gold Bar", multiplier: 2.0, req: "5 Gold Ores (fundidos em Coal Basin)", materials: [{ name: "Gold Ore", amount: 5 }], img: "/images/miracle/items/gold_bar_11754.gif" },
      { name: "Mythan Bar", multiplier: 1.5, req: "5 Mythan Ores (fundidos em Coal Basin)", materials: [{ name: "Mythan Ore", amount: 5 }], img: "/images/miracle/items/mythan_bar_11755.gif" },
      { name: "Mystic Bar", multiplier: 1.0, req: "5 Mystic Ores (fundidos em Coal Basin)", materials: [{ name: "Mystic Ore", amount: 5 }], img: "/images/miracle/items/mystic_bar_11756.gif" },
    ]
  },
  {
    category: "giantGemsRelics",
    items: [
      { name: "Giant Ruby", multiplier: 2, req: "10 Small Rubys", materials: [{ name: "Small Ruby", amount: 10 }], img: "/images/miracle/features/7512.gif" },
      { name: "Giant Emerald", multiplier: 2, req: "10 Small Emeralds", materials: [{ name: "Small Emerald", amount: 10 }], img: "/images/miracle/features/7515.gif" },
      { name: "Giant Sapphire", multiplier: 2, req: "10 Small Sapphires", materials: [{ name: "Small Sapphire", amount: 10 }], img: "/images/miracle/features/7513.gif" },
      { name: "Giant Amethyst", multiplier: 2, req: "10 Small Amethysts", materials: [{ name: "Small Amethyst", amount: 10 }], img: "/images/miracle/features/7514.gif" },
      { name: "Spiritualist Gem", multiplier: 2, req: "10 Small Spiritualist Gems", materials: [{ name: "Small Spiritualist Gem", amount: 10 }], img: "/images/miracle/features/10319.gif" },
      { name: "Marksman Gem", multiplier: 2, req: "10 Small Marksman Gems", materials: [{ name: "Small Marksman Gem", amount: 10 }], img: "/images/miracle/features/8982.gif" },
      { name: "Sage Gem", multiplier: 2, req: "10 Small Sage Gems", materials: [{ name: "Small Sage Gem", amount: 10 }], img: "/images/miracle/features/8984.gif" },
      { name: "Guardian Gem", multiplier: 2, req: "10 Small Guardian Gems", materials: [{ name: "Small Guardian Gem", amount: 10 }], img: "/images/miracle/features/8980.gif" },
    ]
  },
  {
    category: "ammunition",
    items: [
      { name: "10x Steel Bolts", multiplier: 2.0, req: "10 bolt + 1 steel", materials: [{ name: "Bolt", amount: 10 }, { name: "Steel", amount: 1, img: "/images/miracle/items/steel_2422.gif" }], img: "/images/miracle/features/10010.gif" },
      { name: "10x Onyx Arrows", multiplier: 2.0, req: "10 arrows + 1 onyx fragment", materials: [{ name: "Arrow", amount: 10 }, { name: "Onyx Fragment", amount: 1 }], img: "/images/miracle/features/10222.gif" },
    ]
  }
];

export const BREAKING_DATA = [
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
    ]
  },
  {
    category: "clubs",
    items: [
      { item: "Club", max: 1, min: 0, mathAvg: "0.2 Steels", practicalAvg: "20% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Mace", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "Vender NPC", minSkill: 10 },
      { item: "Morning Star", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
      { item: "Battle Hammer", max: 8, min: 0, mathAvg: "4 Steels", practicalAvg: "3.75 Steels", verdict: "Em testes", minSkill: 10 },
      { item: "Clerical Mace", max: "2 Steels, 3 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Crystal Mace", max: "2 Steels, 3 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Dragon Hammer", max: "4 Steels, 7 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Skull Staff", max: "12 Steels, 2 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "War Hammer", max: "12 Steels, 8 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Iron Hammer", max: "7 Steels, 5 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Thunder Hammer", max: "10 Steels, 12 Drac", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 20 },
      { item: "Silver Mace", max: "5 Steels, 4 Drac, 6 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
      { item: "Heavy Mace", max: "8 Drac, 12 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
      { item: "Arcane Staff", max: "30 Drac, 50 Hell", min: 0, mathAvg: "-", practicalAvg: "-", verdict: "Em testes", minSkill: 30 },
    ]
  },
  {
    category: "distance",
    items: [
      { item: "Bow", max: 1, min: 0, mathAvg: "0.5 Steels", practicalAvg: "50% chance", verdict: "Vender NPC", minSkill: 10 },
      { item: "Crossbow", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "Vender NPC", minSkill: 10 },
    ]
  },
  {
    category: "helmets",
    items: [
      { item: "Leather Helmet", max: 1, min: 0, mathAvg: "0.2 Steels", practicalAvg: "20% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Studded Helmet", max: 1, min: 0, mathAvg: "0.16 Steels", practicalAvg: "16% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Legion Helmet", max: 1, min: 0, mathAvg: "0.66 Steels", practicalAvg: "66% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Soldier Helmet", max: 1, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel (was 6)", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Chain Helmet", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "Vender NPC", minSkill: 10 },
      { item: "Brass Helmet", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "Vender NPC", minSkill: 10 },
      { item: "Iron Helmet", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "2.00 Steels", verdict: "Vender NPC", minSkill: 10 },
      { item: "Steel Helmet", max: 8, min: 0, mathAvg: "4 Steels", practicalAvg: "4.00 Steels", verdict: "Vender NPC", minSkill: 10 },
    ]
  },
  {
    category: "armors",
    items: [
      { item: "Leather Armor", max: 1, min: 0, mathAvg: "0.2 Steels", practicalAvg: "20% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Chain Armor", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
      { item: "Brass Armor", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
      { item: "Scale Armor", max: 6, min: 0, mathAvg: "3 Steels", practicalAvg: "6 Steels (was 8)", verdict: "Vender NPC", minSkill: 10 },
      { item: "Plate Armor", max: 8, min: 0, mathAvg: "4 Steels", practicalAvg: "3.75 Steels", verdict: "Vender NPC", minSkill: 10 },
    ]
  },
  {
    category: "legs",
    items: [
      { item: "Leather Legs", max: 1, min: 0, mathAvg: "0.2 Steels", practicalAvg: "20% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Chain Legs", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "2 Steels (was 1)", verdict: "Vender NPC", minSkill: 10 },
      { item: "Brass Legs", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "Vender NPC", minSkill: 10 },
      { item: "Plate Legs", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
    ]
  },
  {
    category: "shields",
    items: [
      { item: "Wooden Shield", max: 1, min: 0, mathAvg: "0.41 Steels", practicalAvg: "41% chance (was 82%)", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Copper Shield", max: 1, min: 0, mathAvg: "0.83 Steels", practicalAvg: "83% chance (was 4)", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Steel Shield", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
      { item: "Battle Shield", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
      { item: "Dark Shield", max: 5, min: 0, mathAvg: "2.5 Steels", practicalAvg: "5 Steels", verdict: "QUEBRAR", minSkill: 20 },
    ]
  },
  {
    category: "smallBlades",
    items: [
      { item: "Knife", max: 1, min: 0, mathAvg: "0.083 Steels", practicalAvg: "8.3% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Combat Knife", max: 1, min: 0, mathAvg: "0.083 Steels", practicalAvg: "8.3% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Dagger", max: 1, min: 0, mathAvg: "0.16 Steels", practicalAvg: "16% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Machete", max: 1, min: 0, mathAvg: "0.5 Steels", practicalAvg: "50% chance", verdict: "QUEBRAR", minSkill: 10 },
      { item: "Scythe", max: 1, min: 0, mathAvg: "1 Steel", practicalAvg: "100% chance", verdict: "QUEBRAR", minSkill: 10 },
    ]
  }
];

export const ATTRIBUTE_CHANCES: Record<string, number[]> = {
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
  "Destruction": [6, 4, 2, 1],
  "Protect Death": [6, 4, 2, 1, 0.5],
  "Protect Life Drain": [6, 4, 2, 1, 0.5],
  "Crushing Blow": [10, 8, 6, 4, 2],
  "Electrify": [6, 4, 2, 1, 0.5]
};

export interface AttributeItem {
  name: string;
  class: number;
  attributes: string[];
}

export const ATTRIBUTE_DATA: Record<string, AttributeItem[]> = {
  "Helmets": [
    {
      "name": "Mystic Turban",
      "class": 1,
      "attributes": [
        "Max Mana",
        "Magic Level",
        "Mana Healing"
      ]
    },
    {
      "name": "Legion Helmet",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Viking Helmet",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Distance Fighting",
        "Sword Fighting"
      ]
    },
    {
      "name": "Iron Helmet",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Soldier Helmet",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Hat Of The Mad",
      "class": 2,
      "attributes": [
        "Max Mana",
        "Mana Regen",
        "Magic Level"
      ]
    },
    {
      "name": "Wood Cape",
      "class": 2,
      "attributes": [
        "Speed",
        "Max Health",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Dwarven Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical"
      ]
    },
    {
      "name": "Dark Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Mana"
      ]
    },
    {
      "name": "Steel Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Strange Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Mana"
      ]
    },
    {
      "name": "Amazon Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Speed",
        "Weight",
        "Max Health",
        "Distance Fighting",
        "Protect Physical"
      ]
    },
    {
      "name": "Crown Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical"
      ]
    },
    {
      "name": "Beholder Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Mana",
        "Magic Level",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Devil Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Speed",
        "Weight",
        "Magic Level",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Ancient Tiara",
      "class": 3,
      "attributes": [
        "Armor",
        "Healing",
        "Max Mana",
        "Mana Regen",
        "Magic Level",
        "Protect Fire",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Magician Hat",
      "class": 3,
      "attributes": [
        "Max Mana",
        "Momentum",
        "Mana Regen",
        "Mana Healing",
        "Protect Energy"
      ]
    },
    {
      "name": "Ceremonial Mask",
      "class": 3,
      "attributes": [
        "Speed",
        "Max Health",
        "Distance Fighting",
        "Protect Fire",
        "Attack Interval"
      ]
    },
    {
      "name": "Black Hat",
      "class": 3,
      "attributes": [
        "Speed",
        "Max Mana",
        "Momentum",
        "Magic Level",
        "Destruction",
        "Protect Fire",
        "Protect Death",
        "Protect Life Drain",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Crusader Helmet",
      "class": 3,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Protect Physical"
      ]
    },
    {
      "name": "Warrior Helmet",
      "class": 3,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Sword Fighting",
        "Protect Physical"
      ]
    },
    {
      "name": "Frozen Helmet",
      "class": 3,
      "attributes": [
        "Armor",
        "Speed",
        "Weight",
        "Max Health",
        "Club Fighting",
        "Protect Ice",
        "Sword Fighting"
      ]
    },
    {
      "name": "Royal Helmet",
      "class": 3,
      "attributes": [
        "Armor",
        "Speed",
        "Weight",
        "Max Health",
        "Club Fighting",
        "Sword Fighting",
        "Health Regen"
      ]
    },
    {
      "name": "Winged Helmet",
      "class": 4,
      "attributes": [
        "Armor",
        "Speed",
        "Weight",
        "Max Health",
        "Distance Fighting",
        "Shielding",
        "Protect Energy"
      ]
    },
    {
      "name": "Demon Helmet",
      "class": 4,
      "attributes": [
        "Armor",
        "Speed",
        "Weight",
        "Momentum",
        "Axe Fighting",
        "Max Health",
        "Club Fighting",
        "Magic Level",
        "Sword Fighting",
        "Protect Fire",
        "Protect Energy"
      ]
    },
    {
      "name": "Dragon Scale Helmet",
      "class": 4,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Protect Fire",
        "Protect Physical"
      ]
    },
    {
      "name": "Helmet Of The Ancients",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Protect Fire",
        "Protect Physical"
      ]
    },
    {
      "name": "Helmet Of The Frozen Soul",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements",
        "Mitigation"
      ]
    },
    {
      "name": "Golden Helmet",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Shielding",
        "Protect Physical"
      ]
    },
    {
      "name": "Horned Helmet",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Shielding",
        "Protect Physical"
      ]
    },
    {
      "name": "Anubis Helmet",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements",
        "Mitigation"
      ]
    },
    {
      "name": "Spectral Helmet",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements",
        "Mitigation"
      ]
    },
    {
      "name": "Pharaoh Helmet",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements",
        "Mitigation"
      ]
    }
  ],
  "Armors": [
    {
      "name": "Ranger's Cloak",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements",
        "Mitigation"
      ]
    },
    {
      "name": "Brass Armor",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Red Robe",
      "class": 2,
      "attributes": [
        "Max Mana",
        "Magic Level",
        "Health Regen"
      ]
    },
    {
      "name": "Scale Armor",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Elven Mail",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Mana",
        "Magic Level",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Plate Armor",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Dwarven Armor",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical"
      ]
    },
    {
      "name": "Dark Armor",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Mana"
      ]
    },
    {
      "name": "Noble Armor",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Blue Robe",
      "class": 3,
      "attributes": [
        "Speed",
        "Max Mana",
        "Mana Regen",
        "Magic Level"
      ]
    },
    {
      "name": "Knight Armor",
      "class": 3,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Sword Fighting",
        "Protect Physical"
      ]
    },
    {
      "name": "Crown Armor",
      "class": 3,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Shielding"
      ]
    },
    {
      "name": "Amazon Armor",
      "class": 3,
      "attributes": [
        "Armor",
        "Speed",
        "Weight",
        "Max Health",
        "Distance Fighting",
        "Protect Physical"
      ]
    },
    {
      "name": "Golden Armor",
      "class": 4,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Shielding",
        "Protect Physical"
      ]
    },
    {
      "name": "Spectral Robe",
      "class": 4,
      "attributes": [
        "Speed",
        "Max Mana",
        "Mana Regen",
        "Magic Level",
        "Protect Physical"
      ]
    },
    {
      "name": "Dragon Scale Mail",
      "class": 4,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Protect Fire",
        "Protect Physical"
      ]
    },
    {
      "name": "Frozen Mail",
      "class": 4,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Sword Fighting",
        "Health Regen",
        "Protect Physical"
      ]
    },
    {
      "name": "Demon Armor",
      "class": 5,
      "attributes": [
        "Armor",
        "Speed",
        "Weight",
        "Axe Fighting",
        "Mana Regen",
        "Club Fighting",
        "Distance Fighting",
        "Sword Fighting",
        "Health Regen",
        "Protect Energy",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Magic Plate Armor",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Healing",
        "Max Health",
        "Club Fighting",
        "Sword Fighting",
        "Health Regen",
        "Protect Elements",
        "Protect Physical"
      ]
    },
    {
      "name": "Spectral Armor",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements",
        "Mitigation"
      ]
    },
    {
      "name": "Anubis Armor",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements",
        "Mitigation"
      ]
    },
    {
      "name": "Pharaoh Armor",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements",
        "Mitigation"
      ]
    }
  ],
  "Legs": [
    {
      "name": "Chain Legs",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Elven Legs",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Max Mana",
        "Magic Level",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Brass Legs",
      "class": 1,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Dwarven Legs",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical"
      ]
    },
    {
      "name": "Plate Legs",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health"
      ]
    },
    {
      "name": "Knight Legs",
      "class": 3,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Sword Fighting"
      ]
    },
    {
      "name": "Crown Legs",
      "class": 3,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Protect Physical"
      ]
    },
    {
      "name": "Golden Legs",
      "class": 3,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Protect Energy"
      ]
    },
    {
      "name": "Demon Legs",
      "class": 4,
      "attributes": [
        "Armor",
        "Speed",
        "Weight",
        "Axe Fighting",
        "Mana Regen",
        "Club Fighting",
        "Distance Fighting",
        "Sword Fighting",
        "Health Regen",
        "Protect Energy",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Frozen Legs",
      "class": 3,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Sword Fighting",
        "Health Regen"
      ]
    },
    {
      "name": "Dragon Scale Legs",
      "class": 4,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Club Fighting",
        "Distance Fighting",
        "Health Regen",
        "Protect Fire"
      ]
    },
    {
      "name": "Spectral Legs",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements"
      ]
    },
    {
      "name": "Anubis Legs",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements"
      ]
    },
    {
      "name": "Pharaoh Legs",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Elements"
      ]
    }
  ],
  "Boots": [
    {
      "name": "Boots Of Haste",
      "class": 2,
      "attributes": [
        "Armor",
        "Dodge",
        "Speed"
      ]
    },
    {
      "name": "Bunnyslippers",
      "class": 2,
      "attributes": [
        "Armor",
        "Mana Regen",
        "Magic Level",
        "Health Regen"
      ]
    },
    {
      "name": "Leather Boots",
      "class": 1,
      "attributes": [
        "Armor",
        "Speed",
        "Vibrancy"
      ]
    },
    {
      "name": "Patched Boots",
      "class": 2,
      "attributes": [
        "Armor",
        "Speed",
        "Vibrancy"
      ]
    },
    {
      "name": "Snow Boots",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Speed",
        "Protect Physical",
        "Mitigation"
      ]
    },
    {
      "name": "Steel Boots",
      "class": 3,
      "attributes": [
        "Armor",
        "Vibrancy",
        "Protect Fire"
      ]
    },
    {
      "name": "Frozen Boots",
      "class": 3,
      "attributes": [
        "Armor",
        "Vibrancy",
        "Protect Ice"
      ]
    },
    {
      "name": "Golden Boots",
      "class": 4,
      "attributes": [
        "Armor",
        "Healing",
        "Vibrancy",
        "Protect Energy",
        "Protect Physical"
      ]
    }
  ],
  "Shields": [
    {
      "name": "Wooden Shield",
      "class": 1,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Studded Shield",
      "class": 1,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Brass Shield",
      "class": 1,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Plate Shield",
      "class": 1,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Black Shield",
      "class": 1,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Copper Shield",
      "class": 1,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Bone Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Steel Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Viking Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Axe Fighting",
        "Sword Fighting"
      ]
    },
    {
      "name": "Ornamented Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Battle Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Axe Fighting",
        "Sword Fighting"
      ]
    },
    {
      "name": "Scarab Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Dark Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Dwarven Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Rose Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Healing",
        "Shielding"
      ]
    },
    {
      "name": "Ancient Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Castle Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard"
      ]
    },
    {
      "name": "Beholder Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Magic Level",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Griffin Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Distance Fighting"
      ]
    },
    {
      "name": "Guardian Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding",
        "Protect Physical"
      ]
    },
    {
      "name": "Eagle Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Distance Fighting",
        "Mitigation",
        "Shielding"
      ]
    },
    {
      "name": "Dragon Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Protect Fire",
        "Shielding"
      ]
    },
    {
      "name": "Frozen Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Axe Fighting",
        "Distance Fighting",
        "Arrow Guard",
        "Protect Ice",
        "Sword Fighting",
        "Protect Physical"
      ]
    },
    {
      "name": "Amazon Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Healing",
        "Arrow Guard",
        "Mitigation",
        "Protect Energy",
        "Protect Physical"
      ]
    },
    {
      "name": "Crown Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Axe Fighting",
        "Distance Fighting",
        "Arrow Guard",
        "Sword Fighting",
        "Shielding"
      ]
    },
    {
      "name": "Tower Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding",
        "Protect Physical"
      ]
    },
    {
      "name": "Shield Of Honour",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding",
        "Protect Physical"
      ]
    },
    {
      "name": "Medusa Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Mitigation",
        "Shielding"
      ]
    },
    {
      "name": "Vampire Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding",
        "Absorb Health"
      ]
    },
    {
      "name": "Phoenix Shield",
      "class": 3,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Protect Fire",
        "Reflect Fire"
      ]
    },
    {
      "name": "Demon Shield",
      "class": 4,
      "attributes": [
        "Weight",
        "Defense",
        "Absorb Mana",
        "Magic Level",
        "Protect Fire",
        "Protect Mana Drain"
      ]
    },
    {
      "name": "Tempest Shield",
      "class": 4,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding",
        "Protect Energy"
      ]
    },
    {
      "name": "Mastermind Shield",
      "class": 4,
      "attributes": [
        "Weight",
        "Defense",
        "Axe Fighting",
        "Distance Fighting",
        "Arrow Guard",
        "Sword Fighting",
        "Shielding"
      ]
    },
    {
      "name": "Great Shield",
      "class": 4,
      "attributes": [
        "Weight",
        "Defense",
        "Axe Fighting",
        "Distance Fighting",
        "Arrow Guard",
        "Sword Fighting",
        "Protect Fire",
        "Protect Physical",
        "Reflect Physical"
      ]
    },
    {
      "name": "Spectral Shield",
      "class": 4,
      "attributes": [
        "Defense",
        "Weight",
        "Shielding",
        "Mitigation",
        "Protect Physical",
        "Protect Elements"
      ]
    },
    {
      "name": "Blessed Shield",
      "class": 5,
      "attributes": [
        "Weight",
        "Defense",
        "Axe Fighting",
        "Distance Fighting",
        "Arrow Guard",
        "Sword Fighting",
        "Shielding",
        "Protect Physical",
        "Reflect Elements"
      ]
    }
  ],
  "Swords": [
    {
      "name": "Knife",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Dagger",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Combat Knife",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Silver Dagger",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Foil",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Sword Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Rapier",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Short Sword",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Sabre",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Sword",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Bone Sword",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Carlin Sword",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Heavy Machete",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Katana",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Longsword",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Poison Dagger",
      "class": 1,
      "attributes": [
        "Attack",
        "Poison",
        "Defense"
      ]
    },
    {
      "name": "Scimitar",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Spike Sword",
      "class": 2,
      "attributes": [
        "Attack",
        "Defense",
        "Sword Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Broadsword",
      "class": 1,
      "attributes": [
        "Attack",
        "Weight",
        "Defense"
      ]
    },
    {
      "name": "Serpent Sword",
      "class": 2,
      "attributes": [
        "Attack",
        "Poison",
        "Defense",
        "Attack Interval"
      ]
    },
    {
      "name": "Two Handed Sword",
      "class": 2,
      "attributes": [
        "Attack",
        "Weight",
        "Defense",
        "Critical Hit"
      ]
    },
    {
      "name": "Fire Sword",
      "class": 3,
      "attributes": [
        "Burning",
        "Attack",
        "Defense",
        "Double Bash",
        "Sword Fighting"
      ]
    },
    {
      "name": "Bright Sword",
      "class": 3,
      "attributes": [
        "Attack",
        "Defense",
        "Life Leech",
        "Sword Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Crystal Sword",
      "class": 3,
      "attributes": [
        "Attack",
        "Defense",
        "Life Leech",
        "Sword Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Djinn Blade",
      "class": 4,
      "attributes": [
        "Attack",
        "Defense",
        "Life Leech",
        "Sword Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Pharaoh Sword",
      "class": 4,
      "attributes": [
        "Attack",
        "Defense",
        "Life Leech",
        "Sword Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Giant Sword",
      "class": 3,
      "attributes": [
        "Attack",
        "Weight",
        "Defense",
        "Sword Fighting",
        "Critical Hit"
      ]
    },
    {
      "name": "Magic Sword",
      "class": 5,
      "attributes": [
        "Attack",
        "Defense",
        "Life Leech",
        "Double Bash",
        "Magic Level",
        "Attack Interval"
      ]
    },
    {
      "name": "Miracle Sword",
      "class": 5,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Sword Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Warlord Sword",
      "class": 4,
      "attributes": [
        "Attack",
        "Weight",
        "Defense",
        "Sword Fighting",
        "Critical Hit"
      ]
    },
    {
      "name": "Magic Longsword",
      "class": 5,
      "attributes": [
        "Attack",
        "Weight",
        "Defense",
        "Mana Leech",
        "Magic Level",
        "Critical Hit",
        "Perfuration"
      ]
    }
  ],
  "Axes": [
    {
      "name": "Sickle",
      "class": 1,
      "attributes": [
        "Attack",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Hand Axe",
      "class": 1,
      "attributes": [
        "Attack",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Axe",
      "class": 1,
      "attributes": [
        "Attack",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Golden Sickle",
      "class": 1,
      "attributes": [
        "Attack",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Rough Axe",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Axe Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Hatchet",
      "class": 1,
      "attributes": [
        "Attack",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Daramanian Axe",
      "class": 1,
      "attributes": [
        "Attack",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Refined Axe",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Axe Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Superior Axe",
      "class": 1,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Axe Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Masterwork Axe",
      "class": 2,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Axe Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Orcish Axe",
      "class": 2,
      "attributes": [
        "Attack",
        "Axe Fighting",
        "Perfuration"
      ]
    },
    {
      "name": "Battle Axe",
      "class": 1,
      "attributes": [
        "Attack",
        "Weight",
        "Critical Hit"
      ]
    },
    {
      "name": "Grandmaster Axe",
      "class": 2,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Axe Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Barbarian Axe",
      "class": 2,
      "attributes": [
        "Attack",
        "Axe Fighting",
        "Perfuration"
      ]
    },
    {
      "name": "Dwarven Axe",
      "class": 3,
      "attributes": [
        "Attack",
        "Axe Fighting",
        "Perfuration"
      ]
    },
    {
      "name": "Knight Axe",
      "class": 3,
      "attributes": [
        "Attack",
        "Berserk",
        "Axe Fighting",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Obsidian Lance",
      "class": 2,
      "attributes": [
        "Bleeding",
        "Attack",
        "Weight",
        "Critical Hit",
        "Perfuration"
      ]
    },
    {
      "name": "Double Axe",
      "class": 2,
      "attributes": [
        "Attack",
        "Weight",
        "Axe Fighting",
        "Perfuration"
      ]
    },
    {
      "name": "Halberd",
      "class": 2,
      "attributes": [
        "Attack",
        "Weight",
        "Axe Fighting",
        "Perfuration"
      ]
    },
    {
      "name": "Crystal Axe",
      "class": 3,
      "attributes": [
        "Attack",
        "Freeze",
        "Berserk",
        "Life Leech",
        "Perfuration"
      ]
    },
    {
      "name": "Fire Axe",
      "class": 3,
      "attributes": [
        "Burning",
        "Attack",
        "Berserk",
        "Life Leech",
        "Perfuration"
      ]
    },
    {
      "name": "Daramanian Waraxe",
      "class": 2,
      "attributes": [
        "Attack",
        "Weight",
        "Axe Fighting",
        "Perfuration"
      ]
    },
    {
      "name": "Naginata",
      "class": 2,
      "attributes": [
        "Bleeding",
        "Attack",
        "Weight",
        "Critical Hit",
        "Perfuration"
      ]
    },
    {
      "name": "Twin Axe",
      "class": 3,
      "attributes": [
        "Attack",
        "Weight",
        "Berserk",
        "Life Leech",
        "Critical Hit"
      ]
    },
    {
      "name": "Guardian Halberd",
      "class": 3,
      "attributes": [
        "Attack",
        "Weight",
        "Berserk",
        "Axe Fighting",
        "Life Leech",
        "Perfuration"
      ]
    },
    {
      "name": "Dragon Lance",
      "class": 3,
      "attributes": [
        "Bleeding",
        "Attack",
        "Weight",
        "Axe Fighting",
        "Life Leech",
        "Perfuration"
      ]
    },
    {
      "name": "War Axe",
      "class": 3,
      "attributes": [
        "Attack",
        "Weight",
        "Berserk",
        "Life Leech",
        "Critical Hit"
      ]
    },
    {
      "name": "Ravager's Axe",
      "class": 3,
      "attributes": [
        "Attack",
        "Weight",
        "Berserk",
        "Life Leech",
        "Critical Hit"
      ]
    },
    {
      "name": "Stonecutter Axe",
      "class": 5,
      "attributes": [
        "Attack",
        "Berserk",
        "Axe Fighting",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Darksteel Axe",
      "class": 5,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Axe Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Great Axe",
      "class": 4,
      "attributes": [
        "Attack",
        "Weight",
        "Berserk",
        "Life Leech",
        "Critical Hit"
      ]
    },
    {
      "name": "Demonwing Axe",
      "class": 4,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Axe Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    }
  ],
  "Clubs": [
    {
      "name": "Club",
      "class": 1,
      "attributes": [
        "Attack",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Studded Club",
      "class": 1,
      "attributes": [
        "Attack",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Bone Club",
      "class": 1,
      "attributes": [
        "Attack",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Golden Mace",
      "class": 1,
      "attributes": [
        "Attack",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Mace",
      "class": 1,
      "attributes": [
        "Attack",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Iron Hammer",
      "class": 1,
      "attributes": [
        "Attack",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Daramanian Mace",
      "class": 2,
      "attributes": [
        "Attack",
        "Club Fighting",
        "Crushing Blow"
      ]
    },
    {
      "name": "Battle Hammer",
      "class": 2,
      "attributes": [
        "Attack",
        "Club Fighting",
        "Crushing Blow"
      ]
    },
    {
      "name": "Giant Smithhammer",
      "class": 2,
      "attributes": [
        "Attack",
        "Club Fighting",
        "Crushing Blow"
      ]
    },
    {
      "name": "Morning Star",
      "class": 2,
      "attributes": [
        "Attack",
        "Club Fighting",
        "Crushing Blow"
      ]
    },
    {
      "name": "Clerical Mace",
      "class": 2,
      "attributes": [
        "Attack",
        "Club Fighting",
        "Crushing Blow"
      ]
    },
    {
      "name": "Dragon Hammer",
      "class": 3,
      "attributes": [
        "Attack",
        "Life Leech",
        "Club Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Skull Staff",
      "class": 3,
      "attributes": [
        "Attack",
        "Mana Leech",
        "Club Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Silver Mace",
      "class": 4,
      "attributes": [
        "Attack",
        "Life Leech",
        "Club Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Crystal Mace",
      "class": 4,
      "attributes": [
        "Attack",
        "Life Leech",
        "Club Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "War Hammer",
      "class": 3,
      "attributes": [
        "Attack",
        "Weight",
        "Life Leech",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Dragonbone Hammer",
      "class": 5,
      "attributes": [
        "Attack",
        "Life Leech",
        "Club Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Hammer Of Wrath",
      "class": 3,
      "attributes": [
        "Attack",
        "Weight",
        "Life Leech",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Sapphire Hammer",
      "class": 5,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Club Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    },
    {
      "name": "Thunder Hammer",
      "class": 5,
      "attributes": [
        "Attack",
        "Electrify",
        "Life Leech",
        "Club Fighting",
        "Magic Level",
        "Attack Interval"
      ]
    },
    {
      "name": "Heavy Mace",
      "class": 4,
      "attributes": [
        "Attack",
        "Weight",
        "Life Leech",
        "Critical Hit",
        "Perfuration"
      ]
    },
    {
      "name": "Arcane Staff",
      "class": 4,
      "attributes": [
        "Attack",
        "Mana Leech",
        "Club Fighting",
        "Critical Spell"
      ]
    },
    {
      "name": "Mythic Hammer",
      "class": 4,
      "attributes": [
        "Attack",
        "Defense",
        "Weight",
        "Club Fighting",
        "Critical Hit",
        "Crushing Blow"
      ]
    }
  ],
  "Distance": [
    {
      "name": "Bow",
      "class": 1,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Elvish Bow",
      "class": 1,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "War Bow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Frozen Bow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Armored War Bow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Sapphire Bow",
      "class": 3,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Hellforged Bow",
      "class": 3,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Crossbow",
      "class": 1,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Steel Crossbow",
      "class": 1,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Bone Crossbow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Crystallized Crossbow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Royal Crossbow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Evil Crossbow",
      "class": 3,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Hellforged Crossbow",
      "class": 3,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval"
      ]
    }
  ],
  "Quivers": [
    {
      "name": "Quiver",
      "class": 1,
      "attributes": [
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Iron Quiver",
      "class": 1,
      "attributes": [
        "Armor",
        "Distance Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Dragon Quiver",
      "class": 2,
      "attributes": [
        "Armor",
        "Attack",
        "Hitchance",
        "Critical Hit",
        "Attack Interval"
      ]
    },
    {
      "name": "Imperial Quiver",
      "class": 2,
      "attributes": [
        "Armor",
        "Attack",
        "Hitchance",
        "Critical Hit",
        "Attack Interval"
      ]
    },
    {
      "name": "Blazing Quiver",
      "class": 3,
      "attributes": [
        "Burning",
        "Attack",
        "Hitchance",
        "Critical Hit",
        "Attack Interval"
      ]
    },
    {
      "name": "Deadly Quiver",
      "class": 3,
      "attributes": [
        "Attack",
        "Hitchance",
        "Life Leech",
        "Magic Level",
        "Critical Hit"
      ]
    },
    {
      "name": "Quiver Of Valor",
      "class": 3,
      "attributes": [
        "Armor",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Protect Physical"
      ]
    }
  ]
};

export const VOC_SPELLS: Record<string, { name: string; mana: number }[]> = {
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

export const MANA_REGEN_TIME_PER_MP: Record<string, { normal: number; promoted: number }> = {
  Sorcerer: { normal: 6, promoted: 4 },
  Druid: { normal: 6, promoted: 4 },
  Paladin: { normal: 8, promoted: 6 },
  Knight: { normal: 12, promoted: 12 }
};

export const BLESS_LOCATIONS = [
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
