export interface SalvageItem {
  name: string;
  npcSellPrice: number;
  materials: {
    name: 'steel' | 'draconian steel' | 'hell steel';
    min: number;
    max: number;
  }[];
}

export const SALVAGE_ITEMS: SalvageItem[] = [
  {
    name: 'Ancient Shield',
    npcSellPrice: 855,
    materials: [
      { name: 'draconian steel', min: 0, max: 12 },
      { name: 'steel', min: 0, max: 25 }
    ]
  },
  {
    name: 'Axe',
    npcSellPrice: 6,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Barbarian Axe',
    npcSellPrice: 167,
    materials: [
      { name: 'draconian steel', min: 0, max: 2 },
      { name: 'steel', min: 0, max: 7 }
    ]
  },
  {
    name: 'Battle Axe',
    npcSellPrice: 72,
    materials: [
      { name: 'steel', min: 0, max: 6 }
    ]
  },
  {
    name: 'Battle Shield',
    npcSellPrice: 86,
    materials: [
      { name: 'steel', min: 0, max: 7 }
    ]
  },
  {
    name: 'Beholder Shield',
    npcSellPrice: 1080,
    materials: [
      { name: 'draconian steel', min: 0, max: 16 },
      { name: 'steel', min: 0, max: 33 }
    ]
  },
  {
    name: 'Black Shield',
    npcSellPrice: 760,
    materials: [
      { name: 'steel', min: 0, max: 66 }
    ]
  },
  {
    name: 'Brass Armor',
    npcSellPrice: 135,
    materials: [
      { name: 'steel', min: 0, max: 12 }
    ]
  },
  {
    name: 'Brass Helmet',
    npcSellPrice: 27,
    materials: [
      { name: 'steel', min: 0, max: 2 }
    ]
  },
  {
    name: 'Brass Legs',
    npcSellPrice: 45,
    materials: [
      { name: 'steel', min: 0, max: 4 }
    ]
  },
  {
    name: 'Brass Shield',
    npcSellPrice: 23,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Bright Sword',
    npcSellPrice: 252,
    materials: [
      { name: 'hell steel', min: 0, max: 25 },
      { name: 'draconian steel', min: 0, max: 47 },
      { name: 'steel', min: 0, max: 60 }
    ]
  },
  {
    name: 'Broadsword',
    npcSellPrice: 450,
    materials: [
      { name: 'steel', min: 0, max: 41 }
    ]
  },
  {
    name: 'Carlin Sword',
    npcSellPrice: 107,
    materials: [
      { name: 'steel', min: 0, max: 9 }
    ]
  },
  {
    name: 'Castle Shield',
    npcSellPrice: 4750,
    materials: [
      { name: 'steel', min: 0, max: 16 },
      { name: 'draconian steel', min: 0, max: 20 }
    ]
  },
  {
    name: 'Chain Armor',
    npcSellPrice: 36,
    materials: [
      { name: 'steel', min: 0, max: 5 }
    ]
  },
  {
    name: 'Chain Helmet',
    npcSellPrice: 4,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Chain Legs',
    npcSellPrice: 18,
    materials: [
      { name: 'steel', min: 0, max: 2 }
    ]
  },
  {
    name: 'Clerical Mace',
    npcSellPrice: 153,
    materials: [
      { name: 'draconian steel', min: 0, max: 2 },
      { name: 'steel', min: 0, max: 6 }
    ]
  },
  {
    name: 'Combat Knife',
    npcSellPrice: 1,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Copper Shield',
    npcSellPrice: 45,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Crown Armor',
    npcSellPrice: 10800,
    materials: [
      { name: 'hell steel', min: 0, max: 58 },
      { name: 'draconian steel', min: 0, max: 62 },
      { name: 'steel', min: 0, max: 166 }
    ]
  },
  {
    name: 'Crown Helmet',
    npcSellPrice: 2250,
    materials: [
      { name: 'draconian steel', min: 0, max: 41 },
      { name: 'steel', min: 0, max: 41 }
    ]
  },
  {
    name: 'Crown Legs',
    npcSellPrice: 10800,
    materials: [
      { name: 'hell steel', min: 0, max: 58 },
      { name: 'draconian steel', min: 0, max: 62 },
      { name: 'steel', min: 0, max: 166 }
    ]
  },
  {
    name: 'Crown Shield',
    npcSellPrice: 7200,
    materials: [
      { name: 'hell steel', min: 0, max: 33 },
      { name: 'draconian steel', min: 0, max: 62 },
      { name: 'steel', min: 0, max: 83 }
    ]
  },
  {
    name: 'Crusader Helmet',
    npcSellPrice: 5400,
    materials: [
      { name: 'hell steel', min: 0, max: 25 },
      { name: 'draconian steel', min: 0, max: 41 },
      { name: 'steel', min: 0, max: 83 }
    ]
  },
  {
    name: 'Crystal Axe',
    npcSellPrice: 3800,
    materials: [
      { name: 'hell steel', min: 0, max: 13 },
      { name: 'draconian steel', min: 0, max: 37 },
      { name: 'steel', min: 0, max: 50 }
    ]
  },
  {
    name: 'Crystal Mace',
    npcSellPrice: 11400,
    materials: [
      { name: 'hell steel', min: 0, max: 58 },
      { name: 'draconian steel', min: 0, max: 72 },
      { name: 'steel', min: 0, max: 125 }
    ]
  },
  {
    name: 'Crystal Sword',
    npcSellPrice: 7600,
    materials: [
      { name: 'hell steel', min: 0, max: 33 },
      { name: 'draconian steel', min: 0, max: 66 },
      { name: 'steel', min: 0, max: 66 }
    ]
  },
  {
    name: 'Dagger',
    npcSellPrice: 1,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Daramanian Axe',
    npcSellPrice: 54,
    materials: [
      { name: 'steel', min: 0, max: 5 }
    ]
  },
  {
    name: 'Daramanian Mace',
    npcSellPrice: 105,
    materials: [
      { name: 'steel', min: 0, max: 4 }
    ]
  },
  {
    name: 'Daramanian Waraxe',
    npcSellPrice: 950,
    materials: [
      { name: 'draconian steel', min: 0, max: 8 },
      { name: 'steel', min: 0, max: 20 }
    ]
  },
  {
    name: 'Dark Armor',
    npcSellPrice: 380,
    materials: [
      { name: 'draconian steel', min: 0, max: 5 },
      { name: 'steel', min: 0, max: 12 }
    ]
  },
  {
    name: 'Dark Helmet',
    npcSellPrice: 238,
    materials: [
      { name: 'draconian steel', min: 0, max: 3 },
      { name: 'steel', min: 0, max: 8 }
    ]
  },
  {
    name: 'Dark Shield',
    npcSellPrice: 380,
    materials: [
      { name: 'steel', min: 0, max: 5 }
    ]
  },
  {
    name: 'Devil Helmet',
    npcSellPrice: 950,
    materials: [
      { name: 'draconian steel', min: 0, max: 7 },
      { name: 'steel', min: 0, max: 8 }
    ]
  },
  {
    name: 'Double Axe',
    npcSellPrice: 234,
    materials: [
      { name: 'draconian steel', min: 0, max: 2 },
      { name: 'steel', min: 0, max: 13 }
    ]
  },
  {
    name: 'Dragon Hammer',
    npcSellPrice: 1900,
    materials: [
      { name: 'hell steel', min: 0, max: 8 },
      { name: 'draconian steel', min: 0, max: 14 },
      { name: 'steel', min: 0, max: 25 }
    ]
  },
  {
    name: 'Dragon Lance',
    npcSellPrice: 8100,
    materials: [
      { name: 'hell steel', min: 0, max: 33 },
      { name: 'draconian steel', min: 0, max: 71 },
      { name: 'steel', min: 0, max: 125 }
    ]
  },
  {
    name: 'Dragon Scale Mail',
    npcSellPrice: 38000,
    materials: [
      { name: 'hell steel', min: 0, max: 166 },
      { name: 'draconian steel', min: 0, max: 291 },
      { name: 'steel', min: 0, max: 500 }
    ]
  },
  {
    name: 'Dragon Shield',
    npcSellPrice: 3600,
    materials: [
      { name: 'draconian steel', min: 0, max: 20 },
      { name: 'hell steel', min: 0, max: 20 },
      { name: 'steel', min: 0, max: 41 }
    ]
  },
  {
    name: 'Dwarven Axe',
    npcSellPrice: 1000,
    materials: [
      { name: 'hell steel', min: 0, max: 5 },
      { name: 'draconian steel', min: 0, max: 12 },
      { name: 'steel', min: 0, max: 25 }
    ]
  },
  {
    name: 'Dwarven Shield',
    npcSellPrice: 90,
    materials: [
      { name: 'steel', min: 0, max: 8 }
    ]
  },
  {
    name: 'Fire Axe',
    npcSellPrice: 7200,
    materials: [
      { name: 'hell steel', min: 0, max: 33 },
      { name: 'draconian steel', min: 0, max: 66 },
      { name: 'steel', min: 0, max: 66 }
    ]
  },
  {
    name: 'Fire Sword',
    npcSellPrice: 3600,
    materials: [
      { name: 'hell steel', min: 0, max: 13 },
      { name: 'draconian steel', min: 0, max: 37 },
      { name: 'steel', min: 0, max: 50 }
    ]
  },
  {
    name: 'Frozen Boots',
    npcSellPrice: 28500,
    materials: [
      { name: 'hell steel', min: 0, max: 150 },
      { name: 'steel', min: 0, max: 166 },
      { name: 'draconian steel', min: 0, max: 208 }
    ]
  },
  {
    name: 'Frozen Helmet',
    npcSellPrice: 27000,
    materials: [
      { name: 'hell steel', min: 0, max: 100 },
      { name: 'steel', min: 0, max: 166 },
      { name: 'draconian steel', min: 0, max: 333 }
    ]
  },
  {
    name: 'Frozen Legs',
    npcSellPrice: 28500,
    materials: [
      { name: 'hell steel', min: 0, max: 150 },
      { name: 'steel', min: 0, max: 166 },
      { name: 'draconian steel', min: 0, max: 208 }
    ]
  },
  {
    name: 'Frozen Mail',
    npcSellPrice: 38000,
    materials: [
      { name: 'hell steel', min: 0, max: 166 },
      { name: 'steel', min: 0, max: 250 },
      { name: 'draconian steel', min: 0, max: 354 }
    ]
  },
  {
    name: 'Frozen Shield',
    npcSellPrice: 7200,
    materials: [
      { name: 'hell steel', min: 0, max: 30 },
      { name: 'steel', min: 0, max: 33 },
      { name: 'draconian steel', min: 0, max: 83 }
    ]
  },
  {
    name: 'Giant Sword',
    npcSellPrice: 16150,
    materials: [
      { name: 'hell steel', min: 0, max: 70 },
      { name: 'draconian steel', min: 0, max: 123 },
      { name: 'steel', min: 0, max: 212 }
    ]
  },
  {
    name: 'Golden Armor',
    npcSellPrice: 19000,
    materials: [
      { name: 'hell steel', min: 0, max: 83 },
      { name: 'draconian steel', min: 0, max: 145 },
      { name: 'steel', min: 0, max: 250 }
    ]
  },
  {
    name: 'Golden Legs',
    npcSellPrice: 28500,
    materials: [
      { name: 'hell steel', min: 0, max: 150 },
      { name: 'draconian steel', min: 0, max: 187 },
      { name: 'steel', min: 0, max: 250 }
    ]
  },
  {
    name: 'Golden Sickle',
    npcSellPrice: 9,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Guardian Halberd',
    npcSellPrice: 10450,
    materials: [
      { name: 'hell steel', min: 0, max: 25 },
      { name: 'draconian steel', min: 0, max: 62 },
      { name: 'steel', min: 0, max: 166 }
    ]
  },
  {
    name: 'Guardian Shield',
    npcSellPrice: 1800,
    materials: [
      { name: 'hell steel', min: 0, max: 8 },
      { name: 'draconian steel', min: 0, max: 14 },
      { name: 'steel', min: 0, max: 25 }
    ]
  },
  {
    name: 'Halberd',
    npcSellPrice: 360,
    materials: [
      { name: 'draconian steel', min: 0, max: 5 },
      { name: 'steel', min: 0, max: 13 }
    ]
  },
  {
    name: 'Hand Axe',
    npcSellPrice: 5,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Hatchet',
    npcSellPrice: 23,
    materials: [
      { name: 'steel', min: 0, max: 2 }
    ]
  },
  {
    name: 'Heavy Machete',
    npcSellPrice: 86,
    materials: [
      { name: 'steel', min: 0, max: 2 }
    ]
  },
  {
    name: 'Iron Helmet',
    npcSellPrice: 135,
    materials: [
      { name: 'steel', min: 0, max: 12 }
    ]
  },
  {
    name: 'Katana',
    npcSellPrice: 8,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Knife',
    npcSellPrice: 1,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Knight Armor',
    npcSellPrice: 4750,
    materials: [
      { name: 'hell steel', min: 0, max: 25 },
      { name: 'draconian steel', min: 0, max: 41 },
      { name: 'steel', min: 0, max: 83 }
    ]
  },
  {
    name: 'Knight Axe',
    npcSellPrice: 1900,
    materials: [
      { name: 'hell steel', min: 0, max: 8 },
      { name: 'draconian steel', min: 0, max: 14 },
      { name: 'steel', min: 0, max: 25 }
    ]
  },
  {
    name: 'Knight Legs',
    npcSellPrice: 4750,
    materials: [
      { name: 'hell steel', min: 0, max: 25 },
      { name: 'draconian steel', min: 0, max: 41 },
      { name: 'steel', min: 0, max: 83 }
    ]
  },
  {
    name: 'Legion Helmet',
    npcSellPrice: 8,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Longsword',
    npcSellPrice: 46,
    materials: [
      { name: 'steel', min: 0, max: 4 }
    ]
  },
  {
    name: 'Mace',
    npcSellPrice: 27,
    materials: [
      { name: 'steel', min: 0, max: 2 }
    ]
  },
  {
    name: 'Medusa Shield',
    npcSellPrice: 8550,
    materials: [
      { name: 'draconian steel', min: 0, max: 41 },
      { name: 'hell steel', min: 0, max: 50 },
      { name: 'steel', min: 0, max: 83 }
    ]
  },
  {
    name: 'Morning Star',
    npcSellPrice: 90,
    materials: [
      { name: 'steel', min: 0, max: 8 }
    ]
  },
  {
    name: 'Naginata',
    npcSellPrice: 1900,
    materials: [
      { name: 'draconian steel', min: 0, max: 12 },
      { name: 'steel', min: 0, max: 18 }
    ]
  },
  {
    name: 'Noble Armor',
    npcSellPrice: 810,
    materials: [
      { name: 'draconian steel', min: 0, max: 12 },
      { name: 'steel', min: 0, max: 25 }
    ]
  },
  {
    name: 'Obsidian Lance',
    npcSellPrice: 450,
    materials: [
      { name: 'draconian steel', min: 0, max: 7 },
      { name: 'steel', min: 0, max: 13 }
    ]
  },
  {
    name: 'Orcish Axe',
    npcSellPrice: 11,
    materials: [
      { name: 'draconian steel', min: 0, max: 2 },
      { name: 'steel', min: 0, max: 4 }
    ]
  },
  {
    name: 'Plate Armor',
    npcSellPrice: 360,
    materials: [
      { name: 'draconian steel', min: 0, max: 4 },
      { name: 'steel', min: 0, max: 16 }
    ]
  },
  {
    name: 'Plate Legs',
    npcSellPrice: 104,
    materials: [
      { name: 'draconian steel', min: 0, max: 1 },
      { name: 'steel', min: 0, max: 5 }
    ]
  },
  {
    name: 'Plate Shield',
    npcSellPrice: 36,
    materials: [
      { name: 'steel', min: 0, max: 3 }
    ]
  },
  {
    name: 'Poison Dagger',
    npcSellPrice: 48,
    materials: [
      { name: 'steel', min: 0, max: 4 }
    ]
  },
  {
    name: 'Rapier',
    npcSellPrice: 5,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Royal Helmet',
    npcSellPrice: 27000,
    materials: [
      { name: 'hell steel', min: 0, max: 125 },
      { name: 'draconian steel', min: 0, max: 208 },
      { name: 'steel', min: 0, max: 416 }
    ]
  },
  {
    name: 'Sabre',
    npcSellPrice: 6,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Scale Armor',
    npcSellPrice: 68,
    materials: [
      { name: 'steel', min: 0, max: 6 }
    ]
  },
  {
    name: 'Scarab Shield',
    npcSellPrice: 1900,
    materials: [
      { name: 'draconian steel', min: 0, max: 6 },
      { name: 'steel', min: 0, max: 8 }
    ]
  },
  {
    name: 'Scimitar',
    npcSellPrice: 143,
    materials: [
      { name: 'steel', min: 0, max: 12 }
    ]
  },
  {
    name: 'Serpent Sword',
    npcSellPrice: 855,
    materials: [
      { name: 'steel', min: 0, max: 8 },
      { name: 'draconian steel', min: 0, max: 16 }
    ]
  },
  {
    name: 'Short Sword',
    npcSellPrice: 9,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Sickle',
    npcSellPrice: 3,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Silver Dagger',
    npcSellPrice: 475,
    materials: [
      { name: 'hell steel', min: 0, max: 1 },
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Silver Mace',
    npcSellPrice: 9500,
    materials: [
      { name: 'hell steel', min: 0, max: 50 },
      { name: 'draconian steel', min: 0, max: 62 },
      { name: 'steel', min: 0, max: 83 }
    ]
  },
  {
    name: 'Soldier Helmet',
    npcSellPrice: 15,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Spike Sword',
    npcSellPrice: 900,
    materials: [
      { name: 'draconian steel', min: 0, max: 16 },
      { name: 'steel', min: 0, max: 16 }
    ]
  },
  {
    name: 'Steel Boots',
    npcSellPrice: 28500,
    materials: [
      { name: 'hell steel', min: 0, max: 150 },
      { name: 'draconian steel', min: 0, max: 187 },
      { name: 'steel', min: 0, max: 250 }
    ]
  },
  {
    name: 'Steel Helmet',
    npcSellPrice: 264,
    materials: [
      { name: 'draconian steel', min: 0, max: 3 },
      { name: 'steel', min: 0, max: 12 }
    ]
  },
  {
    name: 'Steel Shield',
    npcSellPrice: 72,
    materials: [
      { name: 'steel', min: 0, max: 6 }
    ]
  },
  {
    name: 'Strange Helmet',
    npcSellPrice: 475,
    materials: [
      { name: 'draconian steel', min: 0, max: 7 },
      { name: 'steel', min: 0, max: 12 }
    ]
  },
  {
    name: 'Studded Armor',
    npcSellPrice: 23,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Studded Helmet',
    npcSellPrice: 2,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Studded Legs',
    npcSellPrice: 14,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Studded Shield',
    npcSellPrice: 2,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  },
  {
    name: 'Sword',
    npcSellPrice: 23,
    materials: [
      { name: 'steel', min: 0, max: 2 }
    ]
  },
  {
    name: 'Tower Shield',
    npcSellPrice: 7600,
    materials: [
      { name: 'draconian steel', min: 0, max: 20 },
      { name: 'hell steel', min: 0, max: 50 },
      { name: 'steel', min: 0, max: 83 }
    ]
  },
  {
    name: 'Two Handed Sword',
    npcSellPrice: 405,
    materials: [
      { name: 'draconian steel', min: 0, max: 4 },
      { name: 'steel', min: 0, max: 20 }
    ]
  },
  {
    name: 'Vampire Shield',
    npcSellPrice: 14250,
    materials: [
      { name: 'hell steel', min: 0, max: 66 },
      { name: 'draconian steel', min: 0, max: 104 },
      { name: 'steel', min: 0, max: 166 }
    ]
  },
  {
    name: 'Viking Helmet',
    npcSellPrice: 60,
    materials: [
      { name: 'steel', min: 0, max: 5 }
    ]
  },
  {
    name: 'Viking Shield',
    npcSellPrice: 77,
    materials: [
      { name: 'steel', min: 0, max: 7 }
    ]
  },
  {
    name: 'War Axe',
    npcSellPrice: 11400,
    materials: [
      { name: 'hell steel', min: 0, max: 50 },
      { name: 'steel', min: 0, max: 83 },
      { name: 'draconian steel', min: 0, max: 104 }
    ]
  },
  {
    name: 'War Hammer',
    npcSellPrice: 1080,
    materials: [
      { name: 'hell steel', min: 0, max: 5 },
      { name: 'draconian steel', min: 0, max: 8 },
      { name: 'steel', min: 0, max: 16 }
    ]
  },
  {
    name: 'Warrior Helmet',
    npcSellPrice: 4750,
    materials: [
      { name: 'hell steel', min: 0, max: 25 },
      { name: 'draconian steel', min: 0, max: 31 },
      { name: 'steel', min: 0, max: 41 }
    ]
  },
  {
    name: 'Wooden Shield',
    npcSellPrice: 3,
    materials: [
      { name: 'steel', min: 0, max: 1 }
    ]
  }
];
