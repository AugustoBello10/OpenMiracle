const fs = require('fs');

const rawList = `Amazon_Armor, Amazon_Helmet, amazon_shield, Amulet_Of_Loss, Ancient_shield, Ancient_Tiara, Anubis_Armor, Anubis_Helmet, Anubis_Legs, Arcane_Staff, Armored_War_Bow, Arrow, Battle_Hammer, battle_shield, Beholder_Helmet, beholder_shield, Black_Hat, black_shield, blazing_quiver, blessed_shield, Blue_Robe, Bolt, Bone_Club, Bone_Crossbow, bone_shield, Boots_Of_Haste, Bow, Brass_Armor, Brass_Helmet, Brass_Legs, brass_shield, Bright_Sword, Bunnyslippers, Burst_Arrow, castle_shield, Ceremonial_Mask, Chain_Helmet, Chain_Legs, Clerical_Mace, Club, Club_Ring, cooper_shield, Crossbow, Crown_Armor, Crown_Helmet, Crown_Legs, crown_shield, Crusader_Helmet, Crystal_Mace, Crystal_Necklace, Crystal_Ring, Crystal_Sword, Crystallized_Crossbow, Daramanian_Mace, Daramanian_Waraxe, Dark_Armor, Dark_Helmet, dark_shield, Darksteel_Axe, deadly_quiver, Demon_Armor, Demon_Helmet, Demon_Legs, demon_shield, Demonbone_Amulet, Demonwing_Axe, Devil_Helmet, Djinn_Blade, Dragon_Hammer, Dragon_Lance, Dragon_Necklace, dragon_quiver, Dragon_Scale_Helmet, Dragon_Scale_Legs, Dragon_Scale_Mail, dragon_shield, Dragonbone_Hammer, Dwarven_Armor, Dwarven_Helmet, Dwarven_Legs, Dwarven_Ring, dwarven_shield, eagle_shield, Elven_Amulet, Elven_Legs, Elven_Mail, Elvish_Bow, Emerald_Bangle, Enchanted_Spear, Enchanted_Staff, Energy_Ring, Evil_Crossbow, Fire_Axe, Fire_Sword, Frozen_Amulet, Frozen_Arrow, Frozen_Boots, Frozen_Bow, Frozen_Helmet, Frozen_Legs, Frozen_Mail, frozen_shield, Garlic_Necklace, Giant_Smithhammer, Giant_Sword, Glacial_Spear, Gold_Ring, Golden_Amulet, Golden_Armor, Golden_Boots, Golden_Helmet, Golden_Legs, Golden_Mace, Great_Axe, great_shield, Griffin_shield, Guardian_Halberd, guardian_shield, Halberd, Hammer_Of_Wrath, Hat_Of_The_Mad, Heavy_Mace, Hellforged_Bow, Hellforged_Crossbow, Helmet_Of_The_Ancients, Helmet_of_the_ancients_ruby, Helmet_Of_The_Frozen_Soul, Horned_Helmet, Hunting_Arrow, Hunting_Spear, Ice_Rapier, imperial_quiver, Infernal_Bolt, Iron_Hammer, Iron_Helmet, iron_quiver, Knight_Armor, Knight_Legs, Leather_Armor, Leather_Boots, Leather_Helmet, Leather_Legs, Legion_Helmet, Life_Ring, Mace, Magic_Longsword, Magic_Plate_Armor, Magic_Sword, Magician_Hat, mastermind_shield, medusa_shield, Might_Ring, Miracle_Sword, Morning_Star, Mystic_Turban, Mythic_Hammer, Naginata, Noble_Armor, Onyx_Arrow, Ornamented_shield, Patched_Boots, Pharaoh_Armor, Pharaoh_Helmet, Pharaoh_Legs, Pharaoh_Sword, phoenix_shield, Piercing_Arrow, Plate_Armor, Plate_Legs, plate_shield, Platinum_Amulet, Poison_Arrow, Poison_Dagger, Post_Officers_Hat, Power_Bolt, Power_Ring, Protection_Amulet, quiver, quiver_of_valor, Ranger's_Cloak, Ravager's_Axe, Red_Robe, Ring_Of_Healing, Ring_Of_Light, Ring_Of_The_Sky, Ring_Of_Wishes, rose_shield, Royal_Crossbow, Royal_Helmet, Royal_Spear, Ruby_Necklace, Sandals, Sapphire_Amulet, Sapphire_Bow, Sapphire_Hammer, Scale_Armor, Scarab_Amulet, scarab_shield, Scarf, shieldof_honour, Silver_Amulet, Silver_Mace, Silver_Necklace, Skull_Amulet, Skull_Staff, Snow_Boots, Soldier_Helmet, Spear, Spectral_Armor, Spectral_Helmet, Spectral_Legs, Spectral_Robe, spectral_shield, Spike_Sword, Staff, Star_Amulet, Stealth_Ring, Steel_Bolt, Steel_Boots, Steel_Crossbow, Steel_Helmet, steel_shield, Stone_Skin_Amulet, Stonecutter_Axe, Strange_Helmet, Strange_Talisman, Studded_Armor, Studded_Club, Studded_Helmet, Studded_Legs, studded_shield, Sword_Ring, tempest_shield, Thunder_Hammer, Time_Ring, tower_shield, Twin_Axe, Two_Handed_Sword, vampire_shield, Viking_Helmet, viking_shield, War_Axe, War_Bow, War_Hammer, Warlord_Sword, Warrior_Helmet, Wedding_Ring, Winged_Helmet, Wolf_Tooth_Chain, Wood_Cape, wooden_shield`;

const fileNames = rawList.split(',').map(s => s.trim()).filter(Boolean);

let masterMap = `\nexport const ALL_ITEM_IMAGES: Record<string, string> = {\n`;
fileNames.forEach(f => {
  // Try to create the clean name from the filename
  // For example: "Demon_Armor" -> "Demon Armor"
  // "amulet_of_loss" -> "Amulet Of Loss" or whatever.
  // Actually, we should just match case-insensitively, so let's lower case everything in the map
  let cleanName = f.replace(/_/g, ' ').toLowerCase();
  masterMap += `  "${cleanName}": "https://res.cloudinary.com/dc4nkbnkg/image/upload/${f}.gif",\n`;
});
masterMap += `};\n`;

let buildItems = fs.readFileSync('src/data/buildItems.ts', 'utf8');

// Insert master map at the top after imports
buildItems = buildItems.replace("import { HELMETS_DATA } from './items';", "import { HELMETS_DATA } from './items';\n" + masterMap);

// Replace the fallback logic
const oldFallback = `} else {
      // General item sprite mapping if we define standard ones, or fallback to name
      // Beautiful default icon mappings can also be used if needed
    }`;

const newFallback = `}
    
    // Fallback for everything else using the master dictionary (case insensitive)
    if (!imgPath) {
      const lowerName = item.name.toLowerCase();
      if (ALL_ITEM_IMAGES[lowerName]) {
        imgPath = ALL_ITEM_IMAGES[lowerName];
      }
    }`;

buildItems = buildItems.replace(oldFallback, newFallback);

fs.writeFileSync('src/data/buildItems.ts', buildItems);

// We should also patch ALL_BUILD_ITEMS mapping in App.tsx!
// Because the library tab reads directly from ALL_BUILD_ITEMS and HELMETS_DATA!
// Oh wait, HELMETS_DATA has .image, but what about ALL_BUILD_ITEMS?
// In App.tsx, ALL_BUILD_ITEMS is used but they don't have .image on the objects. 
// They get rendered with item.img. Wait! Did ALL_BUILD_ITEMS have .img? NO!
// Only the enriched items in BuildMakerView had .img!

// Let's modify App.tsx where they render item.img:
// We need App.tsx to use ALL_ITEM_IMAGES too!
console.log('Fixed buildItems.ts');
