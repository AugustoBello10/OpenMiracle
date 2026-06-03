export interface NpcBuyer {
  npc: string;
  city: string;
  price: number;
}

export interface LootItem {
  id: string;
  name: string;
  weight: number; // in oz
  category: 'weapons' | 'armors' | 'shields' | 'helmets' | 'legs' | 'boots' | 'jewelry' | 'others';
  buyers: NpcBuyer[];
  iconUrl?: string; // We can generate or use standard placeholder gifs if available
}

// Full database of Tibia loot items based on the spreadsheets and classic items
export const LOOT_DATABASE: LootItem[] = [
  // --- RASHID ITEMS (Best sold to Rashid) ---
  {
    id: 'magic-plate-armor',
    name: 'Magic Plate Armor',
    weight: 85.0,
    category: 'armors',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 85500 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 640 }
    ]
  },
  {
    id: 'mastermind-shield',
    name: 'Mastermind Shield',
    weight: 57.0,
    category: 'shields',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 47500 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 230 }
    ]
  },
  {
    id: 'heavy-mace',
    name: 'Heavy Mace',
    weight: 120.0,
    category: 'weapons',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 47500 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 180 }
    ],
  },
  {
    id: 'dragon-scale-mail',
    name: 'Dragon Scale Mail',
    weight: 114.0,
    category: 'armors',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 38000 },
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 14250 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 180 }
    ],
  },
  {
    id: 'tempest-shield',
    name: 'Tempest Shield',
    weight: 51.0,
    category: 'shields',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 33250 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 150 }
    ],
  },
  {
    id: 'demonbone-amulet',
    name: 'Demonbone Amulet',
    weight: 8.5,
    category: 'jewelry',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 30400 }
    ],
  },
  {
    id: 'dwarven-armor',
    name: 'Dwarven Armor',
    weight: 75.0,
    category: 'armors',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 28500 }
    ],
  },
  {
    id: 'steel-boots',
    name: 'Steel Boots',
    weight: 29.0,
    category: 'boots',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 28500 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 120 }
    ],
  },
  {
    id: 'golden-legs',
    name: 'Golden Legs',
    weight: 56.0,
    category: 'legs',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 28500 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 120 }
    ],
  },
  {
    id: 'hammer-of-wrath',
    name: 'Hammer of Wrath',
    weight: 80.0,
    category: 'weapons',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 28500 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 120 }
    ],
  },
  {
    id: 'ring-of-the-sky',
    name: 'Ring of the Sky',
    weight: 0.8,
    category: 'jewelry',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 28500 }
    ],
  },
  {
    id: 'demon-shield',
    name: 'Demon Shield',
    weight: 26.0,
    category: 'shields',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 28500 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 54 }
    ],
  },
  {
    id: 'pharaoh-sword',
    name: 'Pharaoh Sword',
    weight: 44.0,
    category: 'weapons',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 21850 }
    ],
  },
  {
    id: 'golden-armor',
    name: 'Golden Armor',
    weight: 80.0,
    category: 'armors',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 19000 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 58 }
    ],
  },
  {
    id: 'djinn-blade',
    name: 'Djinn Blade',
    weight: 53.0,
    category: 'weapons',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 14250 }
    ],
  },
  {
    id: 'crystal-mace',
    name: 'Crystal Mace',
    weight: 31.0,
    category: 'weapons',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 11400 }
    ],
  },
  {
    id: 'war-axe',
    name: 'War Axe',
    weight: 90.0,
    category: 'weapons',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 11400 },
      { npc: 'Rowenna', city: 'Carlin', price: 90 },
      { npc: 'Willard', city: 'Edron', price: 90 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'guardian-halberd',
    name: 'Guardian Halberd',
    weight: 110.0,
    category: 'weapons',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 10450 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 11 }
    ],
  },
  {
    id: 'medusa-shield',
    name: 'Medusa Shield',
    weight: 58.0,
    category: 'shields',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 8550 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'gold-ring',
    name: 'Gold Ring',
    weight: 1.0,
    category: 'jewelry',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 7600 }
    ],
  },
  {
    id: 'epee',
    name: 'Epee',
    weight: 15.0,
    category: 'weapons',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 7600 }
    ],
  },
  {
    id: 'beholder-helmet',
    name: 'Beholder Helmet',
    weight: 46.0,
    category: 'helmets',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 7125 }
    ],
  },
  {
    id: 'castle-shield',
    name: 'Castle Shield',
    weight: 49.0,
    category: 'shields',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 4750 }
    ],
  },
  {
    id: 'griffin-shield',
    name: 'Griffin Shield',
    weight: 62.0,
    category: 'shields',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 2850 }
    ],
  },
  {
    id: 'platinum-amulet',
    name: 'Platinum Amulet',
    weight: 6.0,
    category: 'jewelry',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 2375 }
    ],
  },
  {
    id: 'silver-brooch',
    name: 'Silver Brooch',
    weight: 2.0,
    category: 'jewelry',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 143 }
    ],
  },
  {
    id: 'bone-shield',
    name: 'Bone Shield',
    weight: 39.0,
    category: 'shields',
    buyers: [
      { npc: 'Rashid', city: 'Rashid', price: 76 },
      { npc: 'Uzgod', city: 'Kazordoon', price: 68 }
    ],
  },

  // --- BLUE DJINN (Nah'Bob & Haroun) ---
  {
    id: 'boots-of-haste',
    name: 'Boots of Haste',
    weight: 7.5,
    category: 'boots',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 28500 }
    ],
  },
  {
    id: 'royal-helmet',
    name: 'Royal Helmet',
    weight: 48.0,
    category: 'helmets',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 28500 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 120 }
    ],
  },
  {
    id: 'frozen-helmet',
    name: 'Frozen Helmet',
    weight: 46.0,
    category: 'helmets',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 27000 }
    ],
  },
  {
    id: 'phoenix-shield',
    name: 'Phoenix Shield',
    weight: 49.0,
    category: 'shields',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 15200 }
    ],
  },
  {
    id: 'crown-armor',
    name: 'Crown Armor',
    weight: 99.0,
    category: 'armors',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 11400 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 26 }
    ],
  },
  {
    id: 'crown-legs',
    name: 'Crown Legs',
    weight: 65.0,
    category: 'legs',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 11400 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 26 }
    ],
  },
  {
    id: 'blue-robe',
    name: 'Blue Robe',
    weight: 35.0,
    category: 'armors',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 9500 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 26 }
    ],
  },
  {
    id: 'dragon-lance',
    name: 'Dragon Lance',
    weight: 120.0,
    category: 'weapons',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 8550 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 15 }
    ],
  },
  {
    id: 'fire-axe',
    name: 'Fire Axe',
    weight: 40.0,
    category: 'weapons',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 7600 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 18 }
    ],
  },
  {
    id: 'crown-shield',
    name: 'Crown Shield',
    weight: 62.0,
    category: 'shields',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 7600 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 23 }
    ],
  },
  {
    id: 'crusader-helmet',
    name: 'Crusader Helmet',
    weight: 52.0,
    category: 'helmets',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 5700 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 15 }
    ],
  },
  {
    id: 'fire-sword',
    name: 'Fire Sword',
    weight: 23.0,
    category: 'weapons',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 3800 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'dragon-shield',
    name: 'Dragon Shield',
    weight: 60.0,
    category: 'shields',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 3800 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'crown-helmet',
    name: 'Crown Helmet',
    weight: 29.5,
    category: 'helmets',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 2375 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 4 }
    ],
  },
  {
    id: 'guardian-shield',
    name: 'Guardian Shield',
    weight: 68.0,
    category: 'shields',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 1900 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'war-hammer',
    name: 'War Hammer',
    weight: 85.0,
    category: 'weapons',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 1140 },
      { npc: 'Willard', city: 'Edron', price: 45 },
      { npc: 'Rowenna', city: 'Carlin', price: 45 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 8 }
    ],
  },
  {
    id: 'beholder-shield',
    name: 'Beholder Shield',
    weight: 46.0,
    category: 'shields',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 1140 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'spike-sword',
    name: 'Spike Sword',
    weight: 50.0,
    category: 'weapons',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 950 },
      { npc: 'Sam', city: 'Thais', price: 25 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 8 }
    ],
  },
  {
    id: 'ice-rapier',
    name: 'Ice Rapier',
    weight: 15.0,
    category: 'weapons',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 950 }
    ],
  },
  {
    id: 'noble-armor',
    name: 'Noble Armor',
    weight: 120.0,
    category: 'armors',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 855 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 23 }
    ],
  },
  {
    id: 'broad-sword',
    name: 'Broad Sword',
    weight: 52.5,
    category: 'weapons',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 475 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 3 }
    ],
  },
  {
    id: 'obsidian-lance',
    name: 'Obsidian Lance',
    weight: 110.0,
    category: 'weapons',
    buyers: [
      { npc: 'Nah\'Bob', city: 'Djinns (Ankrahmun)', price: 475 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },

  // --- HAROUN ITEMS (Blue Djinn magical jewelry / wands) ---
  {
    id: 'orb',
    name: 'Orb',
    weight: 4.5,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 713 }
    ],
  },
  {
    id: 'stone-skin-amulet',
    name: 'Stone Skin Amulet',
    weight: 7.0,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 475 }
    ],
  },
  {
    id: 'might-ring',
    name: 'Might Ring',
    weight: 1.0,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 238 },
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 238 }
    ],
  },
  {
    id: 'stealth-ring',
    name: 'Stealth Ring',
    weight: 1.0,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 190 }
    ],
  },
  {
    id: 'elven-amulet',
    name: 'Elven Amulet',
    weight: 2.7,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'ring-of-healing',
    name: 'Ring of Healing',
    weight: 0.8,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 95 },
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'sword-ring',
    name: 'Sword Ring',
    weight: 0.9,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'axe-ring',
    name: 'Axe Ring',
    weight: 0.9,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'club-ring',
    name: 'Club Ring',
    weight: 0.9,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'mind-stone',
    name: 'Mind Stone',
    weight: 1.2,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'life-crystal',
    name: 'Life Crystal',
    weight: 1.5,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 48 }
    ],
  },
  {
    id: 'garlic-necklace',
    name: 'Garlic Necklace',
    weight: 3.8,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 48 }
    ],
  },
  {
    id: 'bronze-amulet',
    name: 'Bronze Amulet',
    weight: 5.0,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 48 }
    ],
  },
  {
    id: 'power-ring',
    name: 'Power Ring',
    weight: 0.8,
    category: 'jewelry',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 48 }
    ],
  },
  {
    id: 'magic-light-wand',
    name: 'Magic Light Wand',
    weight: 7.2,
    category: 'others',
    buyers: [
      { npc: 'Haroun', city: 'Djinns (Ankrahmun)', price: 33 }
    ],
  },

  // --- GREEN DJINN (Alesar) ---
  {
    id: 'giant-sword',
    name: 'Giant Sword',
    weight: 180.0,
    category: 'weapons',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 16150 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 100 }
    ],
  },
  {
    id: 'tower-shield',
    name: 'Tower Shield',
    weight: 130.0,
    category: 'shields',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 7600 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 23 }
    ],
  },
  {
    id: 'skull-staff',
    name: 'Skull Staff',
    weight: 18.5,
    category: 'weapons',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 5700 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 13 }
    ],
  },
  {
    id: 'knight-armor',
    name: 'Knight Armor',
    weight: 120.0,
    category: 'armors',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 4750 },
      { npc: 'Kroox', city: 'Kazordoon', price: 101 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'knight-legs',
    name: 'Knight Legs',
    weight: 70.0,
    category: 'legs',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 4750 },
      { npc: 'Kroox', city: 'Kazordoon', price: 104 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'warrior-helmet',
    name: 'Warrior Helmet',
    weight: 68.0,
    category: 'helmets',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 4750 },
      { npc: 'Kroox', city: 'Kazordoon', price: 101 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'knight-axe',
    name: 'Knight Axe',
    weight: 81.0,
    category: 'weapons',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 1900 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 11 }
    ],
  },
  {
    id: 'dragon-hammer',
    name: 'Dragon Hammer',
    weight: 97.0,
    category: 'weapons',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 1900 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'serpent-sword',
    name: 'Serpent Sword',
    weight: 41.0,
    category: 'weapons',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 855 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'ancient-shield',
    name: 'Ancient Shield',
    weight: 64.0,
    category: 'shields',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 855 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'black-shield',
    name: 'Black Shield',
    weight: 49.0,
    category: 'shields',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 760 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'strange-helmet',
    name: 'Strange Helmet',
    weight: 46.0,
    category: 'helmets',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 475 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'dark-armor',
    name: 'Dark Armor',
    weight: 80.0,
    category: 'armors',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 380 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 16 }
    ],
  },
  {
    id: 'dark-helmet',
    name: 'Dark Helmet',
    weight: 46.0,
    category: 'helmets',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 238 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'scimitar',
    name: 'Scimitar',
    weight: 29.0,
    category: 'weapons',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 143 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'mystic-turban',
    name: 'Mystic Turban',
    weight: 8.5,
    category: 'helmets',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 143 }
    ],
  },
  {
    id: 'poison-dagger',
    name: 'Poison Dagger',
    weight: 13.0,
    category: 'weapons',
    buyers: [
      { npc: 'Alesar', city: 'Djinns (Ankrahmun)', price: 48 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },

  // --- GREEN DJINN YAMAN (Rings and Talismans) ---
  {
    id: 'time-ring',
    name: 'Time Ring',
    weight: 0.9,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'dwarven-ring',
    name: 'Dwarven Ring',
    weight: 1.1,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'energy-ring',
    name: 'Energy Ring',
    weight: 0.8,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'protection-amulet',
    name: 'Protection Amulet',
    weight: 3.5,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'dragon-necklace',
    name: 'Dragon Necklace',
    weight: 4.0,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'ankh',
    name: 'Ankh',
    weight: 3.2,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 95 }
    ],
  },
  {
    id: 'mysterious-fetish',
    name: 'Mysterious Fetish',
    weight: 2.8,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 48 }
    ],
  },
  {
    id: 'silver-amulet',
    name: 'Silver Amulet',
    weight: 5.0,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 48 }
    ],
  },
  {
    id: 'life-ring',
    name: 'Life Ring',
    weight: 0.8,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 48 }
    ],
  },
  {
    id: 'strange-talisman',
    name: 'Strange Talisman',
    weight: 2.9,
    category: 'jewelry',
    buyers: [
      { npc: 'Yaman', city: 'Djinns (Ankrahmun)', price: 29 }
    ],
  },

  // --- TRASH & COMMONS (Sam, Hardek, Willard, Kroox, Cornelia, H.L.) ---
  {
    id: 'plate-armor',
    name: 'Plate Armor',
    weight: 120.0,
    category: 'armors',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 360 },
      { npc: 'Romella', city: 'Venore', price: 360 },
      { npc: 'Sam', city: 'Thais', price: 240 },
      { npc: 'Kroox', city: 'Kazordoon', price: 216 },
      { npc: 'Cornelia', city: 'Carlin', price: 216 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 16 }
    ],
  },
  {
    id: 'plate-legs',
    name: 'Plate Legs',
    weight: 50.0,
    category: 'legs',
    buyers: [
      { npc: 'Sam', city: 'Thais', price: 115 },
      { npc: 'Willard', city: 'Edron', price: 115 },
      { npc: 'Cornelia', city: 'Carlin', price: 104 },
      { npc: 'Kroox', city: 'Kazordoon', price: 104 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'steel-helmet',
    name: 'Steel Helmet',
    weight: 46.0,
    category: 'helmets',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 171 },
      { npc: 'Kroox', city: 'Kazordoon', price: 171 },
      { npc: 'Cornelia', city: 'Carlin', price: 171 },
      { npc: 'Sam', city: 'Thais', price: 156 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 13 }
    ],
  },
  {
    id: 'halberd',
    name: 'Halberd',
    weight: 90.0,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 360 },
      { npc: 'Romella', city: 'Venore', price: 279 },
      { npc: 'Rowenna', city: 'Carlin', price: 279 },
      { npc: 'Uzgod', city: 'Kazordoon', price: 279 },
      { npc: 'Hardek', city: 'Thais', price: 120 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 11 }
    ],
  },
  {
    id: 'two-handed-sword',
    name: 'Two Handed Sword',
    weight: 70.0,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 405 },
      { npc: 'Rowenna', city: 'Carlin', price: 405 },
      { npc: 'Uzgod', city: 'Kazordoon', price: 171 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ]
  },
  {
    id: 'brass-armor',
    name: 'Brass Armor',
    weight: 80.0,
    category: 'armors',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 135 },
      { npc: 'Yanni', city: 'Venore', price: 135 },
      { npc: 'Kroox', city: 'Kazordoon', price: 101 },
      { npc: 'Cornelia', city: 'Carlin', price: 101 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 11 }
    ],
  },
  {
    id: 'steel-shield',
    name: 'Steel Shield',
    weight: 64.0,
    category: 'shields',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 72 },
      { npc: 'Romella', city: 'Venore', price: 72 },
      { npc: 'Kroox', city: 'Kazordoon', price: 72 },
      { npc: 'Cornelia', city: 'Carlin', price: 72 },
      { npc: 'Sam', city: 'Thais', price: 72 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'double-axe',
    name: 'Double Axe',
    weight: 70.0,
    category: 'weapons',
    buyers: [
      { npc: 'Yanni', city: 'Venore', price: 234 },
      { npc: 'Rowenna', city: 'Carlin', price: 234 },
      { npc: 'Uzgod', city: 'Kazordoon', price: 234 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 3 }
    ],
  },
  {
    id: 'battle-shield',
    name: 'Battle Shield',
    weight: 62.0,
    category: 'shields',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 86 },
      { npc: 'Yanni', city: 'Venore', price: 86 },
      { npc: 'Kroox', city: 'Kazordoon', price: 54 },
      { npc: 'Cornelia', city: 'Carlin', price: 54 },
      { npc: 'Sam', city: 'Thais', price: 54 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 4 }
    ],
  },
  {
    id: 'morning-star',
    name: 'Morning Star',
    weight: 54.0,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 81 },
      { npc: 'Romella', city: 'Venore', price: 81 },
      { npc: 'Uzgod', city: 'Kazordoon', price: 90 },
      { npc: 'Hardek', city: 'Thais', price: 90 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 4 }
    ],
  },
  {
    id: 'battle-axe',
    name: 'Battle Axe',
    weight: 50.0,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 72 },
      { npc: 'Yanni', city: 'Venore', price: 72 },
      { npc: 'Uzgod', city: 'Kazordoon', price: 68 },
      { npc: 'Rowenna', city: 'Carlin', price: 68 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 3 }
    ],
  },
  {
    id: 'clerical-mace',
    name: 'Clerical Mace',
    weight: 58.0,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 153 },
      { npc: 'Rowenna', city: 'Carlin', price: 131 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'viking-helmet',
    name: 'Viking Helmet',
    weight: 39.0,
    category: 'helmets',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 59 },
      { npc: 'Kroox', city: 'Kazordoon', price: 59 },
      { npc: 'Cornelia', city: 'Carlin', price: 59 },
      { npc: 'Sam', city: 'Thais', price: 59 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 2 }
    ],
  },
  {
    id: 'barbarian-axe',
    name: 'Barbarian Axe',
    weight: 51.0,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 167 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 4 }
    ],
  },
  {
    id: 'mace',
    name: 'Mace',
    weight: 43.0,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 27 },
      { npc: 'Uzgod', city: 'Kazordoon', price: 21 },
      { npc: 'Rowenna', city: 'Carlin', price: 21 },
      { npc: 'Hardek', city: 'Thais', price: 21 },
      { npc: 'Romella', city: 'Venore', price: 27 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 1 }
    ],
  },
  {
    id: 'sabre',
    name: 'Sabre',
    weight: 25.0,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 11 },
      { npc: 'Rowenna', city: 'Carlin', price: 5 },
      { npc: 'Hardek', city: 'Thais', price: 11 },
      { npc: 'Romella', city: 'Venore', price: 11 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'sword',
    name: 'Sword',
    weight: 35.0,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 23 },
      { npc: 'Uzgod', city: 'Kazordoon', price: 14 },
      { npc: 'Rowenna', city: 'Carlin', price: 23 },
      { npc: 'Hardek', city: 'Thais', price: 23 },
      { npc: 'Romella', city: 'Venore', price: 23 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 5 }
    ],
  },
  {
    id: 'wooden-shield',
    name: 'Wooden Shield',
    weight: 40.0,
    category: 'shields',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 5 },
      { npc: 'Kroox', city: 'Kazordoon', price: 3 },
      { npc: 'Cornelia', city: 'Carlin', price: 3 },
      { npc: 'Sam', city: 'Thais', price: 5 },
      { npc: 'Romella', city: 'Venore', price: 5 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 2 }
    ],
  },
  {
    id: 'chain-armor',
    name: 'Chain Armor',
    weight: 100.0,
    category: 'armors',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 63 },
      { npc: 'Kroox', city: 'Kazordoon', price: 36 },
      { npc: 'Cornelia', city: 'Carlin', price: 36 },
      { npc: 'Sam', city: 'Thais', price: 63 },
      { npc: 'Romella', city: 'Venore', price: 63 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 11 }
    ],
  },
  {
    id: 'chain-legs',
    name: 'Chain Legs',
    weight: 50.0,
    category: 'legs',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 23 },
      { npc: 'Kroox', city: 'Kazordoon', price: 18 },
      { npc: 'Cornelia', city: 'Carlin', price: 18 },
      { npc: 'Sam', city: 'Thais', price: 23 },
      { npc: 'Romella', city: 'Venore', price: 23 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 14 }
    ],
  },
  {
    id: 'chain-helmet',
    name: 'Chain Helmet',
    weight: 42.0,
    category: 'helmets',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 15 },
      { npc: 'Kroox', city: 'Kazordoon', price: 11 },
      { npc: 'Cornelia', city: 'Carlin', price: 11 },
      { npc: 'Sam', city: 'Thais', price: 15 },
      { npc: 'Romella', city: 'Venore', price: 11 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 4 }
    ],
  },
  {
    id: 'dagger',
    name: 'Dagger',
    weight: 9.5,
    category: 'weapons',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 2 },
      { npc: 'Uzgod', city: 'Kazordoon', price: 1 },
      { npc: 'Rowenna', city: 'Carlin', price: 1 },
      { npc: 'Hardek', city: 'Thais', price: 1 },
      { npc: 'Romella', city: 'Venore', price: 3 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 1 }
    ],
  },
  {
    id: 'leather-helmet',
    name: 'Leather Helmet',
    weight: 22.0,
    category: 'helmets',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 4 },
      { npc: 'Kroox', city: 'Kazordoon', price: 3 },
      { npc: 'Cornelia', city: 'Carlin', price: 3 },
      { npc: 'Sam', city: 'Thais', price: 4 },
      { npc: 'Romella', city: 'Venore', price: 4 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 2 }
    ],
  },
  {
    id: 'leather-armor',
    name: 'Leather Armor',
    weight: 60.0,
    category: 'armors',
    buyers: [
      { npc: 'Willard', city: 'Edron', price: 11 },
      { npc: 'Kroox', city: 'Kazordoon', price: 5 },
      { npc: 'Cornelia', city: 'Carlin', price: 5 },
      { npc: 'Sam', city: 'Thais', price: 11 },
      { npc: 'Romella', city: 'Venore', price: 11 },
      { npc: 'H.L.', city: 'Outlaw Camp', price: 2 }
    ],
  }
];
