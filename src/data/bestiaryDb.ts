import { BestiaryEntry } from '../types/bestiary';

// Inicializando com os dados extraídos das screenshots para os monstros
export const BESTIARY_DB: Record<string, BestiaryEntry> = {
  "Cyclops": {
    id: "Cyclops",
    baseHp: 260,
    baseXp: 150,
    baseSpeed: 190,
    baseArmor: 17,
    baseCharmPoints: 20,
    resistances: {
      physical: 0,
      earth: 0,
      fire: 0,
      death: 0,
      energy: 0,
      holy: 0,
      ice: 0,
      healing: 0
    },
    loot: {
      common: ["Meat", "Gold Coin"],
      uncommon: ["Wolf Tooth Chain", "Short Sword"],
      semiRare: ["Halberd", "Dark Shield"], // Using Dark Shield and Halberd as examples based on icons
      rare: ["Club Ring"]
    }
  },
  "Dragon": {
    id: "Dragon",
    baseHp: 1000,
    baseXp: 700,
    baseSpeed: 170,
    baseArmor: 25,
    baseCharmPoints: 30,
    resistances: {
      physical: 0,
      earth: 100, // Imune a earth? Apenas exemplos
      fire: 100, // Imune a fire?
      death: 0,
      energy: 20,
      holy: 0,
      ice: -10, // Fraco a ice
      healing: 0
    },
    loot: {
      common: ["Dragon Ham", "Gold Coin"],
      uncommon: ["Crossbow", "Dragon's Tail"],
      semiRare: ["Wand of Inferno", "Dragon Shield"],
      rare: ["Dragon Scale Mail"]
    }
  },
  "Goblin": {
    id: "Goblin",
    baseHp: 50,
    baseXp: 25,
    baseSpeed: 120,
    baseArmor: 6,
    baseCharmPoints: 15,
    resistances: {
      physical: 0,
      earth: 0,
      fire: 0,
      death: 0,
      energy: 0,
      holy: 0,
      ice: 0,
      healing: 0
    },
    loot: {
      common: ["Gold Coin", "Small Stone"],
      uncommon: ["Fish", "Bone", "Leather Armor", "Dagger"],
      semiRare: ["Bone Club"],
      rare: []
    }
  }
};
