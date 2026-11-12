// Static wiki data and configuration tables extracted from App.tsx

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
      { item: "Scale Armor", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
      { item: "Plate Armor", max: 8, min: 0, mathAvg: "4 Steels", practicalAvg: "3.75 Steels", verdict: "Vender NPC", minSkill: 10 },
    ]
  },
  {
    category: "legs",
    items: [
      { item: "Leather Legs", max: 1, min: 0, mathAvg: "0.2 Steels", practicalAvg: "20% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Chain Legs", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "Vender NPC", minSkill: 10 },
      { item: "Brass Legs", max: 2, min: 0, mathAvg: "1 Steel", practicalAvg: "1.00 Steel", verdict: "Vender NPC", minSkill: 10 },
      { item: "Plate Legs", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
    ]
  },
  {
    category: "shields",
    items: [
      { item: "Wooden Shield", max: 1, min: 0, mathAvg: "0.2 Steels", practicalAvg: "20% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Steel Shield", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
      { item: "Battle Shield", max: 4, min: 0, mathAvg: "2 Steels", practicalAvg: "1.85 Steels", verdict: "Vender NPC", minSkill: 10 },
    ]
  },
  {
    category: "smallBlades",
    items: [
      { item: "Combat Knife", max: 1, min: 0, mathAvg: "0.083 Steels", practicalAvg: "8.3% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Dagger", max: 1, min: 0, mathAvg: "0.16 Steels", practicalAvg: "16% chance", verdict: "UPAR SKILL", minSkill: 10 },
      { item: "Machete", max: 1, min: 0, mathAvg: "0.5 Steels", practicalAvg: "50% chance", verdict: "QUEBRAR", minSkill: 10 },
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
    { "name": "Mystic Turban", "class": 1, "attributes": ["Max Mana", "Magic Level", "Mana Healing"] },
    { "name": "Legion Helmet", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Viking Helmet", "class": 1, "attributes": ["Armor", "Weight", "Axe Fighting", "Club Fighting", "Distance Fighting", "Sword Fighting"] },
    { "name": "Iron Helmet", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Soldier Helmet", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Hat Of The Mad", "class": 2, "attributes": ["Max Mana", "Magic Level", "Mana Healing"] },
    { "name": "Wood Cape", "class": 2, "attributes": ["Armor", "Weight", "Axe Fighting", "Club Fighting", "Distance Fighting", "Sword Fighting", "Max Health"] },
    { "name": "Dwarven Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Dark Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire"] },
    { "name": "Steel Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Strange Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Elements"] },
    { "name": "Amazon Helmet", "class": 2, "attributes": ["Armor", "Weight", "Distance Fighting", "Protect Elements"] },
    { "name": "Crown Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Health Regen"] },
    { "name": "Beholder Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Mana", "Protect Elements"] },
    { "name": "Devil Helmet", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire"] },
    { "name": "Crusader Helmet", "class": 3, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Warrior Helmet", "class": 3, "attributes": ["Armor", "Weight", "Axe Fighting", "Club Fighting", "Sword Fighting", "Max Health"] },
    { "name": "Royal Helmet", "class": 3, "attributes": ["Armor", "Weight", "Max Health", "Health Regen"] },
    { "name": "Demon Helmet", "class": 4, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire", "Protect Physical"] },
    { "name": "Winged Helmet", "class": 4, "attributes": ["Armor", "Weight", "Speed"] },
    { "name": "Golden Helmet", "class": 4, "attributes": ["Armor", "Weight", "Max Health", "Health Regen", "Protect Physical"] },
    { "name": "Horned Helmet", "class": 4, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Helmet Of The Ancients", "class": 4, "attributes": ["Armor", "Weight", "Max Health", "Max Mana", "Protect Elements"] }
  ],
  "Armors": [
    { "name": "Scale Armor", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Brass Armor", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Plate Armor", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Dark Armor", "class": 1, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire"] },
    { "name": "Chain Armor", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Noble Armor", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Health Regen"] },
    { "name": "Knight Armor", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Crown Armor", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Health Regen"] },
    { "name": "Lady Armor", "class": 2, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Amazon Armor", "class": 2, "attributes": ["Armor", "Weight", "Distance Fighting", "Protect Elements"] },
    { "name": "Blue Robe", "class": 2, "attributes": ["Max Mana", "Magic Level", "Mana Healing"] },
    { "name": "Dragon Scale Mail", "class": 3, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire"] },
    { "name": "Golden Armor", "class": 3, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Magic Plate Armor", "class": 4, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical", "Protect Elements"] },
    { "name": "Demon Armor", "class": 4, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire", "Protect Physical"] },
    { "name": "Green Tunic", "class": 1, "attributes": ["Armor", "Weight", "Speed"] },
    { "name": "Ranger's Cloak", "class": 2, "attributes": ["Armor", "Weight", "Distance Fighting", "Speed"] }
  ],
  "Legs": [
    { "name": "Chain Legs", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Brass Legs", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Plate Legs", "class": 1, "attributes": ["Armor", "Weight", "Max Health"] },
    { "name": "Knight Legs", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Crown Legs", "class": 2, "attributes": ["Armor", "Weight", "Max Health", "Health Regen"] },
    { "name": "Golden Legs", "class": 3, "attributes": ["Armor", "Weight", "Max Health", "Protect Physical"] },
    { "name": "Dragon Scale Legs", "class": 4, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire"] },
    { "name": "Demon Legs", "class": 4, "attributes": ["Armor", "Weight", "Max Health", "Protect Fire", "Protect Physical"] }
  ],
  "Boots": [
    { "name": "Leather Boots", "class": 1, "attributes": ["Armor", "Weight", "Speed"] },
    { "name": "Steel Boots", "class": 3, "attributes": ["Armor", "Weight", "Protect Physical"] },
    { "name": "Boots Of Haste", "class": 3, "attributes": ["Speed"] },
    { "name": "Golden Boots", "class": 4, "attributes": ["Armor", "Weight", "Speed", "Protect Physical"] },
    { "name": "Soft Boots", "class": 4, "attributes": ["Health Regen", "Mana Regen"] }
  ],
  "Shields": [
    { "name": "Wooden Shield", "class": 1, "attributes": ["Defense", "Weight", "Shielding"] },
    { "name": "Steel Shield", "class": 1, "attributes": ["Defense", "Weight", "Shielding"] },
    { "name": "Battle Shield", "class": 1, "attributes": ["Defense", "Weight", "Shielding"] },
    { "name": "Dwarven Shield", "class": 2, "attributes": ["Defense", "Weight", "Shielding", "Mitigation"] },
    { "name": "Beholder Shield", "class": 2, "attributes": ["Defense", "Weight", "Shielding", "Protect Elements"] },
    { "name": "Crown Shield", "class": 2, "attributes": ["Defense", "Weight", "Shielding", "Health Regen"] },
    { "name": "Dragon Shield", "class": 2, "attributes": ["Defense", "Weight", "Shielding", "Protect Fire"] },
    { "name": "Tower Shield", "class": 2, "attributes": ["Defense", "Weight", "Shielding", "Arrow Guard"] },
    { "name": "Black Shield", "class": 2, "attributes": ["Defense", "Weight", "Shielding"] },
    { "name": "Amazon Shield", "class": 2, "attributes": ["Defense", "Weight", "Shielding", "Protect Elements"] },
    { "name": "Guardian Shield", "class": 2, "attributes": ["Defense", "Weight", "Shielding", "Mitigation"] },
    { "name": "Medusa Shield", "class": 3, "attributes": ["Defense", "Weight", "Shielding", "Protect Poison"] },
    { "name": "Vampire Shield", "class": 3, "attributes": ["Defense", "Weight", "Shielding", "Absorb Health"] },
    { "name": "Demon Shield", "class": 3, "attributes": ["Defense", "Weight", "Shielding", "Protect Fire"] },
    { "name": "Mastermind Shield", "class": 4, "attributes": ["Defense", "Weight", "Shielding", "Magic Level", "Protect Elements"] },
    { "name": "Great Shield", "class": 4, "attributes": ["Defense", "Weight", "Shielding", "Mitigation", "Protect Physical"] },
    { "name": "Blessed Shield", "class": 4, "attributes": ["Defense", "Weight", "Shielding", "Mitigation", "Protect Elements"] }
  ],
  "Weapons": [
    { "name": "Sword", "class": 1, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting"] },
    { "name": "Longsword", "class": 1, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting"] },
    { "name": "Broadsword", "class": 1, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting"] },
    { "name": "Spike Sword", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting", "Critical Hit"] },
    { "name": "Two-Handed Sword", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting", "Crushing Blow"] },
    { "name": "Fire Sword", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting", "Burning"] },
    { "name": "Bright Sword", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting", "Critical Hit"] },
    { "name": "Giant Sword", "class": 3, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting", "Crushing Blow", "Berserk"] },
    { "name": "Ice Rapier", "class": 3, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting", "Freeze", "Critical Hit"] },
    { "name": "Magic Longsword", "class": 4, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting", "Critical Hit", "Life Leech"] },
    { "name": "Warlord Sword", "class": 4, "attributes": ["Attack", "Defense", "Weight", "Sword Fighting", "Crushing Blow", "Berserk"] },
    { "name": "Axe", "class": 1, "attributes": ["Attack", "Defense", "Weight", "Axe Fighting"] },
    { "name": "Battle Axe", "class": 1, "attributes": ["Attack", "Defense", "Weight", "Axe Fighting"] },
    { "name": "Barbarian Axe", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Axe Fighting", "Bleeding"] },
    { "name": "Knight Axe", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Axe Fighting", "Critical Hit"] },
    { "name": "Fire Axe", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Axe Fighting", "Burning"] },
    { "name": "Dragon Lance", "class": 3, "attributes": ["Attack", "Defense", "Weight", "Axe Fighting", "Burning", "Crushing Blow"] },
    { "name": "Stonecutter Axe", "class": 4, "attributes": ["Attack", "Defense", "Weight", "Axe Fighting", "Critical Hit", "Crushing Blow"] },
    { "name": "Great Axe", "class": 4, "attributes": ["Attack", "Defense", "Weight", "Axe Fighting", "Crushing Blow", "Berserk"] },
    { "name": "Mace", "class": 1, "attributes": ["Attack", "Defense", "Weight", "Club Fighting"] },
    { "name": "Morning Star", "class": 1, "attributes": ["Attack", "Defense", "Weight", "Club Fighting"] },
    { "name": "Battle Hammer", "class": 1, "attributes": ["Attack", "Defense", "Weight", "Club Fighting"] },
    { "name": "Clerical Mace", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Club Fighting", "Mana Healing"] },
    { "name": "Dragon Hammer", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Club Fighting", "Burning"] },
    { "name": "Skull Staff", "class": 2, "attributes": ["Attack", "Defense", "Weight", "Club Fighting", "Magic Level"] },
    { "name": "War Hammer", "class": 3, "attributes": ["Attack", "Defense", "Weight", "Club Fighting", "Crushing Blow", "Double Bash"] },
    { "name": "Thunder Hammer", "class": 4, "attributes": ["Attack", "Defense", "Weight", "Club Fighting", "Electrify", "Crushing Blow"] },
    { "name": "Bow", "class": 1, "attributes": ["Attack", "Hitchance", "Weight", "Distance Fighting"] },
    { "name": "Crossbow", "class": 1, "attributes": ["Attack", "Hitchance", "Weight", "Distance Fighting", "Perfuration"] }
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
