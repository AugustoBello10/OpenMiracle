
import { GameItem } from '../types/build';


export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  armor?: number;
  attack?: number;
  defense?: number;
  weight: number;
  attributeClass: number;
  allowedAttributes: string[];
  image?: string;
  class?: number;
  properties?: string[];
}

export const HELMETS_DATA: EquipmentItem[] = [
  { id: '1', name: "Post Officers Hat", armor: 1, weight: 7.00, class: 0, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Post_Officers_Hat.gif", category: "head", attributeClass: 0, allowedAttributes: [] },
  { id: '2', name: "Leather Helmet", armor: 1, weight: 22.00, class: 0, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Leather_Helmet.gif", category: "head", attributeClass: 0, allowedAttributes: [] },
  { id: '3', name: "Studded Helmet", armor: 2, weight: 24.50, class: 0, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Studded_Helmet.gif", category: "head", attributeClass: 0, allowedAttributes: [] },
  { id: '4', name: "Chain Helmet", armor: 2, weight: 42.00, class: 0, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Chain_Helmet.gif", category: "head", attributeClass: 0, allowedAttributes: [] },
  { id: '5', name: "Brass Helmet", armor: 3, weight: 27.00, class: 0, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Brass_Helmet.gif", category: "head", attributeClass: 0, allowedAttributes: [] },
  { id: '6', name: "Mystic Turban", armor: 2, weight: 8.50, class: 1, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Mystic_Turban.gif", category: "head", attributeClass: 1, allowedAttributes: [] },
  { id: '7', name: "Legion Helmet", armor: 4, weight: 31.00, class: 1, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Legion_Helmet.gif", category: "head", attributeClass: 1, allowedAttributes: [] },
  { id: '8', name: "Viking Helmet", armor: 4, weight: 39.00, class: 1, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Viking_Helmet.gif", category: "head", attributeClass: 1, allowedAttributes: [] },
  { id: '9', name: "Iron Helmet", armor: 5, weight: 30.00, class: 1, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Iron_Helmet.gif", category: "head", attributeClass: 1, allowedAttributes: [] },
  { id: '10', name: "Soldier Helmet", armor: 5, weight: 32.00, class: 1, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Soldier_Helmet.gif", category: "head", attributeClass: 1, allowedAttributes: [] },
  { id: '11', name: "Hat Of The Mad", armor: 4, weight: 7.00, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Hat_Of_The_Mad.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '12', name: "Wood Cape", armor: 4, weight: 11.00, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Wood_Cape.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '13', name: "Dwarven Helmet", armor: 6, weight: 42.00, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dwarven_Helmet.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '14', name: "Dark Helmet", armor: 6, weight: 46.00, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dark_Helmet.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '15', name: "Steel Helmet", armor: 6, weight: 46.00, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Steel_Helmet.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '16', name: "Strange Helmet", armor: 6, weight: 46.00, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Strange_Helmet.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '17', name: "Amazon Helmet", armor: 7, weight: 29.50, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Amazon_Helmet.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '18', name: "Crown Helmet", armor: 7, weight: 29.50, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crown_Helmet.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '19', name: "Beholder Helmet", armor: 7, weight: 46.00, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Beholder_Helmet.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '20', name: "Devil Helmet", armor: 7, weight: 50.00, class: 2, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Devil_Helmet.gif", category: "head", attributeClass: 2, allowedAttributes: [] },
  { id: '21', name: "Ancient Tiara", armor: 6, weight: 4.50, class: 3, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ancient_Tiara.gif", category: "head", attributeClass: 3, allowedAttributes: [] },
  { id: '22', name: "Magician Hat", armor: 6, weight: 7.50, class: 3, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Magician_Hat.gif", category: "head", attributeClass: 3, allowedAttributes: [] },
  { id: '23', name: "Ceremonial Mask", armor: 6, weight: 12.00, class: 3, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ceremonial_Mask.gif", category: "head", attributeClass: 3, allowedAttributes: [] },
  { id: '24', name: "Black Hat", armor: 7, weight: 7.50, class: 3, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Black_Hat.gif", category: "head", attributeClass: 3, allowedAttributes: ["speed", "mp", "momentum", "mana-regen", "magic", "destruction", "mana-healing", "fire-prot", "death-prot", "crit-spell", "life-drain-prot", "mana-drain-prot"] },
  { id: '25', name: "Crusader Helmet", armor: 8, weight: 52.00, class: 3, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crusader_Helmet.gif", category: "head", attributeClass: 3, allowedAttributes: [] },
  { id: '26', name: "Warrior Helmet", armor: 8, weight: 68.00, class: 3, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Warrior_Helmet.gif", category: "head", attributeClass: 3, allowedAttributes: [] },
  { id: '27', name: "Frozen Helmet", armor: 9, weight: 46.00, class: 3, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Frozen_Helmet.gif", category: "head", attributeClass: 3, allowedAttributes: [] },
  { id: '28', name: "Royal Helmet", armor: 9, weight: 48.00, class: 3, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Royal_Helmet.gif", category: "head", attributeClass: 3, allowedAttributes: [] },
  { id: '29', name: "Winged Helmet", armor: 10, weight: 12.00, class: 4, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Winged_Helmet.gif", category: "head", attributeClass: 4, allowedAttributes: [] },
  { id: '30', name: "Demon Helmet", armor: 10, weight: 29.50, class: 4, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Demon_Helmet.gif", category: "head", attributeClass: 4, allowedAttributes: [] },
  { id: '31', name: "Dragon Scale Helmet", armor: 10, weight: 60.00, class: 4, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dragon_Scale_Helmet.gif", category: "head", attributeClass: 4, allowedAttributes: [] },
  { id: '32', name: "Helmet Of The Ancients (Empty)", armor: 8, weight: 27.60, class: 5, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Helmet_Of_The_Ancients_(Empty).gif", category: "head", attributeClass: 5, allowedAttributes: ["armor", "weight", "axe", "hp", "club", "distance", "sword", "health-regen", "fire-prot", "shielding", "phys-prot"] },
  { id: '33', name: "Helmet Of The Ancients (Full)", armor: 12, weight: 27.60, class: 5, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Helmet_Of_The_Ancients_(Full).gif", category: "head", attributeClass: 5, allowedAttributes: ["armor", "weight", "axe", "hp", "club", "distance", "sword", "health-regen", "fire-prot", "shielding", "phys-prot"] },
  { id: '34', name: "Helmet Of The Frozen Soul", armor: 12, weight: 30.00, class: 5, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Helmet_Of_The_Frozen_Soul.gif", category: "head", attributeClass: 5, allowedAttributes: [] },
  { id: '35', name: "Golden Helmet", armor: 12, weight: 32.00, class: 5, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_Helmet.gif", category: "head", attributeClass: 5, allowedAttributes: [] },
  { id: '36', name: "Horned Helmet", armor: 12, weight: 51.00, class: 5, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Horned_Helmet.gif", category: "head", attributeClass: 5, allowedAttributes: [] },
  { id: '37', name: "Anubis Helmet", armor: 13, weight: 43.50, class: 5, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Anubis_Helmet.gif", category: "head", attributeClass: 5, allowedAttributes: [] },
  { id: '38', name: "Spectral Helmet", armor: 13, weight: 65.00, class: 5, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Spectral_Helmet.gif", category: "head", attributeClass: 5, allowedAttributes: [] },
  { id: '39', name: "Pharaoh Helmet", armor: 14, weight: 43.50, class: 5, image: "https://res.cloudinary.com/dc4nkbnkg/image/upload/Pharaoh_Helmet.gif", category: "head", attributeClass: 5, allowedAttributes: [] },
];

export const MOCK_ITEMS: GameItem[] = [
  {
    id: 'demon-helmet',
    name: 'Demon Helmet',
    category: 'head',
    armor: 10,
    weight: 29.5,
    attributeClass: 3,
    allowedAttributes: ['hp', 'mp', 'phys-prot', 'mana-leech'],
  },
  {
    id: 'magic-plate-armor',
    name: 'Magic Plate Armor',
    category: 'armor',
    armor: 17,
    weight: 85.0,
    attributeClass: 4,
    allowedAttributes: ['hp', 'mp', 'phys-prot', 'life-leech'],
  },
  {
    id: 'golden-legs',
    name: 'Golden Legs',
    category: 'legs',
    armor: 9,
    weight: 56.0,
    attributeClass: 3,
    allowedAttributes: ['hp', 'mp', 'speed'],
  },
  {
    id: 'soft-boots',
    name: 'Soft Boots',
    category: 'feet',
    armor: 0,
    weight: 8.0,
    attributeClass: 1,
    allowedAttributes: ['regen', 'speed'],
    bonuses: { regen: 12 },
  },
  {
    id: 'sov',
    name: 'Sword of Valor',
    category: 'right-hand',
    attack: 48,
    defense: 35,
    weight: 50.0,
    attributeClass: 5,
    allowedAttributes: ['melee', 'crit-hit', 'life-leech', 'mana-leech'],
  },
  {
    id: 'mastermind-shield',
    name: 'Mastermind Shield',
    category: 'left-hand',
    defense: 37,
    weight: 57.0,
    attributeClass: 4,
    allowedAttributes: ['shielding', 'fire-prot', 'ice-prot', 'energy-prot'],
  },
  {
    id: 'amulet-of-loss',
    name: 'Amulet of Loss',
    category: 'necklace',
    weight: 4.2,
    attributeClass: 0,
    allowedAttributes: [],
  },
  {
    id: 'might-ring',
    name: 'Might Ring',
    category: 'ring',
    weight: 1.0,
    attributeClass: 0,
    allowedAttributes: [],
    protections: { physical: 0.2, fire: 0.1, energy: 0.1 },
  }
];
