import { GameItem } from '../types/build';
import { HELMETS_DATA } from './items';
import { LOCAL_ITEM_IMAGES } from './localItemImages';

export const ALL_ITEM_IMAGES: Record<string, string> = {
  "amazon armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Amazon_Armor.gif",
  "amazon helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Amazon_Helmet.gif",
  "amazon shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/amazon_shield.gif",
  "amulet of loss": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Amulet_Of_Loss.gif",
  "ancient shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ancient_shield.gif",
  "ancient tiara": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ancient_Tiara.gif",
  "anubis armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Anubis_Armor.gif",
  "anubis helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Anubis_Helmet.gif",
  "anubis legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Anubis_Legs.gif",
  "arcane staff": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Arcane_Staff.gif",
  "armored war bow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Armored_War_Bow.gif",
  "arrow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Arrow.gif",
  "battle hammer": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Battle_Hammer.gif",
  "battle shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/battle_shield.gif",
  "beholder helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Beholder_Helmet.gif",
  "beholder shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/beholder_shield.gif",
  "black hat": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Black_Hat.gif",
  "black shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/black_shield.gif",
  "blazing quiver": "https://res.cloudinary.com/dc4nkbnkg/image/upload/blazing_quiver.gif",
  "blessed shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/blessed_shield.gif",
  "blue robe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Blue_Robe.gif",
  "bolt": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Bolt.gif",
  "bone club": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Bone_Club.gif",
  "bone crossbow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Bone_Crossbow.gif",
  "bone shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/bone_shield.gif",
  "boots of haste": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Boots_Of_Haste.gif",
  "bow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Bow.gif",
  "brass armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Brass_Armor.gif",
  "brass helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Brass_Helmet.gif",
  "brass legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Brass_Legs.gif",
  "brass shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/brass_shield.gif",
  "bright sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Bright_Sword.gif",
  "bunnyslippers": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Bunnyslippers.gif",
  "burst arrow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Burst_Arrow.gif",
  "castle shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/castle_shield.gif",
  "ceremonial mask": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ceremonial_Mask.gif",
  "chain helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Chain_Helmet.gif",
  "chain legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Chain_Legs.gif",
  "clerical mace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Clerical_Mace.gif",
  "club": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Club.gif",
  "club ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Club_Ring.gif",
  "cooper shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/cooper_shield.gif",
  "crossbow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crossbow.gif",
  "crown armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crown_Armor.gif",
  "crown helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crown_Helmet.gif",
  "crown legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crown_Legs.gif",
  "crown shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/crown_shield.gif",
  "crusader helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crusader_Helmet.gif",
  "crystal mace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crystal_Mace.gif",
  "crystal necklace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crystal_Necklace.gif",
  "crystal ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crystal_Ring.gif",
  "crystal sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crystal_Sword.gif",
  "crystallized crossbow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Crystallized_Crossbow.gif",
  "daramanian mace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Daramanian_Mace.gif",
  "daramanian waraxe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Daramanian_Waraxe.gif",
  "dark armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dark_Armor.gif",
  "dark helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dark_Helmet.gif",
  "dark shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/dark_shield.gif",
  "darksteel axe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Darksteel_Axe.gif",
  "deadly quiver": "https://res.cloudinary.com/dc4nkbnkg/image/upload/deadly_quiver.gif",
  "demon armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Demon_Armor.gif",
  "demon helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Demon_Helmet.gif",
  "demon legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Demon_Legs.gif",
  "demon shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/demon_shield.gif",
  "demonbone amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Demonbone_Amulet.gif",
  "demonwing axe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Demonwing_Axe.gif",
  "devil helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Devil_Helmet.gif",
  "djinn blade": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Djinn_Blade.gif",
  "dragon hammer": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dragon_Hammer.gif",
  "dragon lance": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dragon_Lance.gif",
  "dragon necklace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dragon_Necklace.gif",
  "dragon quiver": "https://res.cloudinary.com/dc4nkbnkg/image/upload/dragon_quiver.gif",
  "dragon scale helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dragon_Scale_Helmet.gif",
  "dragon scale legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dragon_Scale_Legs.gif",
  "dragon scale mail": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dragon_Scale_Mail.gif",
  "dragon shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/dragon_shield.gif",
  "dragonbone hammer": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dragonbone_Hammer.gif",
  "dwarven armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dwarven_Armor.gif",
  "dwarven helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dwarven_Helmet.gif",
  "dwarven legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dwarven_Legs.gif",
  "dwarven ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Dwarven_Ring.gif",
  "dwarven shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/dwarven_shield.gif",
  "eagle shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/eagle_shield.gif",
  "elven amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Elven_Amulet.gif",
  "elven legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Elven_Legs.gif",
  "elven mail": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Elven_Mail.gif",
  "elvish bow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Elvish_Bow.gif",
  "emerald bangle": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Emerald_Bangle.gif",
  "enchanted spear": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Enchanted_Spear.gif",
  "enchanted staff": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Enchanted_Staff.gif",
  "energy ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Energy_Ring.gif",
  "evil crossbow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Evil_Crossbow.gif",
  "fire axe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Fire_Axe.gif",
  "fire sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Fire_Sword.gif",
  "frozen amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Frozen_Amulet.gif",
  "frozen arrow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Frozen_Arrow.gif",
  "frozen boots": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Frozen_Boots.gif",
  "frozen bow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Frozen_Bow.gif",
  "frozen helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Frozen_Helmet.gif",
  "frozen legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Frozen_Legs.gif",
  "frozen mail": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Frozen_Mail.gif",
  "frozen shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/frozen_shield.gif",
  "garlic necklace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Garlic_Necklace.gif",
  "giant smithhammer": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Giant_Smithhammer.gif",
  "giant sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Giant_Sword.gif",
  "glacial spear": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Glacial_Spear.gif",
  "gold ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Gold_Ring.gif",
  "golden amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_Amulet.gif",
  "golden armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_Armor.gif",
  "golden boots": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_Boots.gif",
  "golden helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_Helmet.gif",
  "golden legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_Legs.gif",
  "golden mace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_Mace.gif",
  "great axe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Great_Axe.gif",
  "great shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/great_shield.gif",
  "griffin shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Griffin_shield.gif",
  "guardian halberd": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Guardian_Halberd.gif",
  "guardian shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/guardian_shield.gif",
  "halberd": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Halberd.gif",
  "hammer of wrath": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Hammer_Of_Wrath.gif",
  "hat of the mad": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Hat_Of_The_Mad.gif",
  "heavy mace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Heavy_Mace.gif",
  "hellforged bow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Hellforged_Bow.gif",
  "hellforged crossbow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Hellforged_Crossbow.gif",
  "helmet of the ancients": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Helmet_Of_The_Ancients.gif",
  "helmet of the ancients ruby": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Helmet_of_the_ancients_ruby.gif",
  "helmet of the frozen soul": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Helmet_Of_The_Frozen_Soul.gif",
  "horned helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Horned_Helmet.gif",
  "hunting arrow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Hunting_Arrow.gif",
  "hunting spear": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Hunting_Spear.gif",
  "ice rapier": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ice_Rapier.gif",
  "imperial quiver": "https://res.cloudinary.com/dc4nkbnkg/image/upload/imperial_quiver.gif",
  "infernal bolt": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Infernal_Bolt.gif",
  "iron hammer": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Iron_Hammer.gif",
  "iron helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Iron_Helmet.gif",
  "iron quiver": "https://res.cloudinary.com/dc4nkbnkg/image/upload/iron_quiver.gif",
  "knight armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Knight_Armor.gif",
  "knight legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Knight_Legs.gif",
  "leather armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Leather_Armor.gif",
  "leather boots": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Leather_Boots.gif",
  "leather helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Leather_Helmet.gif",
  "leather legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Leather_Legs.gif",
  "legion helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Legion_Helmet.gif",
  "life ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Life_Ring.gif",
  "mace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Mace.gif",
  "magic longsword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Magic_Longsword.gif",
  "magic plate armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Magic_Plate_Armor.gif",
  "magic sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Magic_Sword.gif",
  "magician hat": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Magician_Hat.gif",
  "mastermind shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/mastermind_shield.gif",
  "medusa shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/medusa_shield.gif",
  "might ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Might_Ring.gif",
  "miracle sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Miracle_Sword.gif",
  "morning star": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Morning_Star.gif",
  "mystic turban": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Mystic_Turban.gif",
  "mythic hammer": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Mythic_Hammer.gif",
  "naginata": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Naginata.gif",
  "noble armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Noble_Armor.gif",
  "onyx arrow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Onyx_Arrow.gif",
  "ornamented shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ornamented_shield.gif",
  "patched boots": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Patched_Boots.gif",
  "pharaoh armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Pharaoh_Armor.gif",
  "pharaoh helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Pharaoh_Helmet.gif",
  "pharaoh legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Pharaoh_Legs.gif",
  "pharaoh sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Pharaoh_Sword.gif",
  "phoenix shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/phoenix_shield.gif",
  "piercing arrow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Piercing_Arrow.gif",
  "plate armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Plate_Armor.gif",
  "plate legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Plate_Legs.gif",
  "plate shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/plate_shield.gif",
  "platinum amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Platinum_Amulet.gif",
  "poison arrow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Poison_Arrow.gif",
  "poison dagger": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Poison_Dagger.gif",
  "post officers hat": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Post_Officers_Hat.gif",
  "power bolt": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Power_Bolt.gif",
  "power ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Power_Ring.gif",
  "protection amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Protection_Amulet.gif",
  "quiver": "https://res.cloudinary.com/dc4nkbnkg/image/upload/quiver.gif",
  "quiver of valor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/quiver_of_valor.gif",
  "ranger's cloak": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ranger's_Cloak.gif",
  "ravager's axe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ravager's_Axe.gif",
  "red robe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Red_Robe.gif",
  "ring of healing": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ring_Of_Healing.gif",
  "ring of light": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ring_Of_Light.gif",
  "ring of the sky": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ring_Of_The_Sky.gif",
  "ring of wishes": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ring_Of_Wishes.gif",
  "rose shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/rose_shield.gif",
  "royal crossbow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Royal_Crossbow.gif",
  "royal helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Royal_Helmet.gif",
  "royal spear": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Royal_Spear.gif",
  "ruby necklace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Ruby_Necklace.gif",
  "sandals": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Sandals.gif",
  "sapphire amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Sapphire_Amulet.gif",
  "sapphire bow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Sapphire_Bow.gif",
  "sapphire hammer": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Sapphire_Hammer.gif",
  "scale armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Scale_Armor.gif",
  "scarab amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Scarab_Amulet.gif",
  "scarab shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/scarab_shield.gif",
  "scarf": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Scarf.gif",
  "shieldof honour": "https://res.cloudinary.com/dc4nkbnkg/image/upload/shieldof_honour.gif",
  "silver amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Silver_Amulet.gif",
  "silver mace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Silver_Mace.gif",
  "silver necklace": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Silver_Necklace.gif",
  "skull amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Skull_Amulet.gif",
  "skull staff": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Skull_Staff.gif",
  "snow boots": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Snow_Boots.gif",
  "soldier helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Soldier_Helmet.gif",
  "spear": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Spear.gif",
  "spectral armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Spectral_Armor.gif",
  "spectral helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Spectral_Helmet.gif",
  "spectral legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Spectral_Legs.gif",
  "spectral robe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Spectral_Robe.gif",
  "spectral shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/spectral_shield.gif",
  "spike sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Spike_Sword.gif",
  "staff": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Staff.gif",
  "star amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Star_Amulet.gif",
  "stealth ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Stealth_Ring.gif",
  "steel bolt": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Steel_Bolt.gif",
  "steel boots": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Steel_Boots.gif",
  "steel crossbow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Steel_Crossbow.gif",
  "steel helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Steel_Helmet.gif",
  "steel shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/steel_shield.gif",
  "stone skin amulet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Stone_Skin_Amulet.gif",
  "stonecutter axe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Stonecutter_Axe.gif",
  "strange helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Strange_Helmet.gif",
  "strange talisman": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Strange_Talisman.gif",
  "studded armor": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Studded_Armor.gif",
  "studded club": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Studded_Club.gif",
  "studded helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Studded_Helmet.gif",
  "studded legs": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Studded_Legs.gif",
  "studded shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/studded_shield.gif",
  "sword ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Sword_Ring.gif",
  "tempest shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/tempest_shield.gif",
  "thunder hammer": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Thunder_Hammer.gif",
  "time ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Time_Ring.gif",
  "tower shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/tower_shield.gif",
  "twin axe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Twin_Axe.gif",
  "two handed sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Two_Handed_Sword.gif",
  "vampire shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/vampire_shield.gif",
  "viking helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Viking_Helmet.gif",
  "viking shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/viking_shield.gif",
  "war axe": "https://res.cloudinary.com/dc4nkbnkg/image/upload/War_Axe.gif",
  "war bow": "https://res.cloudinary.com/dc4nkbnkg/image/upload/War_Bow.gif",
  "war hammer": "https://res.cloudinary.com/dc4nkbnkg/image/upload/War_Hammer.gif",
  "warlord sword": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Warlord_Sword.gif",
  "warrior helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Warrior_Helmet.gif",
  "wedding ring": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Wedding_Ring.gif",
  "winged helmet": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Winged_Helmet.gif",
  "wolf tooth chain": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Wolf_Tooth_Chain.gif",
  "wood cape": "https://res.cloudinary.com/dc4nkbnkg/image/upload/Wood_Cape.gif",
  "wooden shield": "https://res.cloudinary.com/dc4nkbnkg/image/upload/wooden_shield.gif",
};


// Attribute translation map from human string to ID in constants.ts
const ATTRIBUTE_MAP: Record<string, string> = {
  "Max Health": "hp",
  "Max Mana": "mp",
  "Armor": "armor",
  "Attack": "attack",
  "Magic Level": "magic",
  "Shielding": "shielding",
  "Life Leech": "life-leech",
  "Mana Leech": "mana-leech",
  "Critical Hit": "crit-hit",
  "Protect Fire": "fire-prot",
  "Protect Ice": "ice-prot",
  "Protect Energy": "energy-prot",
  "Protect Poison": "earth-prot",
  "Protect Physical": "phys-prot",
  "Protect Elements": "elements-prot",
  "Protect Mana Drain": "mana-drain-prot",
  "Protect Death": "death-prot",
  "Protect Life Drain": "life-drain-prot",
  "Destruction": "destruction",
  "Sword Fighting": "sword",
  "Club Fighting": "club",
  "Axe Fighting": "axe",
  "Distance Fighting": "distance",
  "Speed": "speed",
  "Weight": "weight",
  "Healing": "healing",
  "Health Regen": "health-regen",
  "Mana Regen": "mana-regen",
  "Mana Healing": "mana-healing",
  "Momentum": "momentum",
  "Attack Interval": "attack-interval",
  "Vibrancy": "vibrancy",
  "Dodge": "dodge",
  "Absorb Mana": "absorb-mana",
  "Arrow Guard": "arrow-guard",
  "Defense": "defense",
  "Mitigation": "mitigation",
  "Reflect Fire": "reflect-fire",
  "Reflect Energy": "reflect-energy",
  "Reflect Physical": "reflect-phys",
  "Reflect Elements": "reflect-elements",
  "Absorb Health": "absorb-health",
  "Hitchance": "hitchance",
  "Burning": "burning",
  "Crushing Blow": "crushing-blow",
  "Double Bash": "double-bash",
  "Berserk": "berserk",
  "Bleeding": "bleeding",
  "Freeze": "freeze",
  "Electrify": "electrify",
  "Poison": "poison",
  "Critical Spell": "crit-spell",
  "Perfuration": "perforation"
};

const ATTRIBUTE_DATA_STUB: Record<string, { name: string; class: number; attributes: string[] }[]> = {
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
        "Sword Fighting",
        "Club Fighting"
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
        "Magic Level",
        "Mana Healing"
      ]
    },
    {
      "name": "Wood Cape",
      "class": 2,
      "attributes": [
        "Speed",
        "Max Health",
        "Distance Fighting",
        "Attack Interval",
        "Protect Poison"
      ]
    },
    {
      "name": "Dwarven Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Fire"
      ]
    },
    {
      "name": "Dark Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Mana",
        "Protect Physical"
      ]
    },
    {
      "name": "Steel Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical"
      ]
    },
    {
      "name": "Strange Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Mana",
        "Magic Level"
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
        "Protect Physical",
        "Healing",
        "Protect Energy"
      ]
    },
    {
      "name": "Crown Helmet",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Health Regen"
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
        "Protect Mana Drain",
        "Mana Regen"
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
        "Protect Mana Drain",
        "Max Health"
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
        "Protect Mana Drain",
        "Momentum",
        "Health Regen"
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
        "Protect Energy",
        "Magic Level",
        "Protect Mana Drain"
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
        "Attack Interval",
        "Magic Level"
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
        "Protect Mana Drain",
        "Mana Regen",
        "Mana Healing",
        "Critical Spell"
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
        "Protect Physical",
        "Max Health",
        "Sword Fighting"
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
        "Protect Physical",
        "Max Health",
        "Shielding"
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
        "Sword Fighting",
        "Axe Fighting",
        "Distance Fighting",
        "Health Regen"
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
        "Health Regen",
        "Axe Fighting",
        "Distance Fighting",
        "Protect Physical"
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
        "Protect Energy",
        "Healing",
        "Health Regen",
        "Protect Physical"
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
        "Protect Energy",
        "Max Mana",
        "Mana Regen",
        "Distance Fighting",
        "Health Regen"
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
        "Protect Physical",
        "Max Health",
        "Sword Fighting",
        "Shielding"
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
        "Protect Physical",
        "Max Health",
        "Sword Fighting",
        "Protect Elements"
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
        "Protect Physical",
        "Max Health",
        "Sword Fighting",
        "Protect Fire"
      ]
    },
    {
      "name": "Helmet Of The Ancients (Empty)",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Max Health",
        "Club Fighting",
        "Distance Fighting",
        "Sword Fighting",
        "Health Regen",
        "Protect Fire",
        "Shielding",
        "Protect Physical"
      ]
    },
    {
      "name": "Helmet Of The Ancients (Full)",
      "class": 5,
      "attributes": [
        "Armor",
        "Weight",
        "Axe Fighting",
        "Max Health",
        "Club Fighting",
        "Distance Fighting",
        "Sword Fighting",
        "Health Regen",
        "Protect Fire",
        "Shielding",
        "Protect Physical"
      ]
    }
  ],
  "Armors": [
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
        "Health Regen",
        "Protect Fire"
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
        "Protect Mana Drain",
        "Mana Regen"
      ]
    },
    {
      "name": "Plate Armor",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical"
      ]
    },
    {
      "name": "Dwarven Armor",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical",
        "Protect Fire"
      ]
    },
    {
      "name": "Dark Armor",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Mana",
        "Protect Physical"
      ]
    },
    {
      "name": "Noble Armor",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical"
      ]
    },
    {
      "name": "Blue Robe",
      "class": 3,
      "attributes": [
        "Speed",
        "Max Mana",
        "Mana Regen",
        "Magic Level",
        "Absorb Mana"
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
        "Protect Physical",
        "Max Health",
        "Shielding"
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
        "Shielding",
        "Max Health",
        "Sword Fighting",
        "Protect Physical"
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
        "Protect Physical",
        "Healing",
        "Protect Energy"
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
        "Protect Physical",
        "Max Health",
        "Sword Fighting",
        "Protect Energy"
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
        "Protect Physical",
        "Absorb Mana"
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
        "Protect Physical",
        "Max Health",
        "Sword Fighting",
        "Shielding"
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
        "Protect Mana Drain",
        "Max Mana",
        "Max Health",
        "Magic Level",
        "Protect Fire"
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
        "Protect Physical",
        "Axe Fighting",
        "Distance Fighting",
        "Shielding"
      ]
    },
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
        "Protect Mana Drain",
        "Mana Regen"
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
        "Protect Physical",
        "Protect Fire"
      ]
    },
    {
      "name": "Plate Legs",
      "class": 2,
      "attributes": [
        "Armor",
        "Weight",
        "Max Health",
        "Protect Physical"
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
        "Sword Fighting",
        "Max Health",
        "Protect Physical"
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
        "Protect Physical",
        "Max Health",
        "Sword Fighting"
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
        "Protect Energy",
        "Max Health",
        "Sword Fighting",
        "Protect Physical"
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
        "Protect Mana Drain",
        "Max Mana",
        "Max Health",
        "Magic Level",
        "Protect Physical"
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
  ],
  "Boots": [
    {
      "name": "Boots Of Haste",
      "class": 2,
      "attributes": [
        "Armor",
        "Dodge",
        "Speed",
        "Vibrancy"
      ]
    },
    {
      "name": "Bunnyslippers",
      "class": 2,
      "attributes": [
        "Armor",
        "Mana Regen",
        "Magic Level",
        "Health Regen",
        "Protect Ice"
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
      "name": "Steel Boots",
      "class": 3,
      "attributes": [
        "Armor",
        "Vibrancy",
        "Protect Fire",
        "Protect Physical"
      ]
    },
    {
      "name": "Frozen Boots",
      "class": 3,
      "attributes": [
        "Armor",
        "Vibrancy",
        "Protect Ice",
        "Speed",
        "Magic Level"
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
        "Arrow Guard",
        "Shielding"
      ]
    },
    {
      "name": "Steel Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding"
      ]
    },
    {
      "name": "Viking Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Axe Fighting",
        "Sword Fighting",
        "Club Fighting"
      ]
    },
    {
      "name": "Ornamented Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding"
      ]
    },
    {
      "name": "Battle Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Axe Fighting",
        "Sword Fighting",
        "Club Fighting"
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
        "Arrow Guard",
        "Shielding"
      ]
    },
    {
      "name": "Dwarven Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding"
      ]
    },
    {
      "name": "Rose Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Healing",
        "Shielding",
        "Arrow Guard"
      ]
    },
    {
      "name": "Ancient Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding"
      ]
    },
    {
      "name": "Castle Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Arrow Guard",
        "Shielding"
      ]
    },
    {
      "name": "Beholder Shield",
      "class": 2,
      "attributes": [
        "Weight",
        "Defense",
        "Magic Level",
        "Protect Mana Drain",
        "Protect Poison"
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
        "Protect Physical",
        "Mitigation"
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
        "Shielding",
        "Arrow Guard"
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
        "Shielding",
        "Mitigation",
        "Protect Physical"
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
        "Protect Physical",
        "Club Fighting",
        "Mitigation",
        "Shielding"
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
        "Protect Physical",
        "Distance Fighting",
        "Shielding"
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
        "Shielding",
        "Club Fighting",
        "Mitigation",
        "Protect Physical"
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
        "Protect Physical",
        "Mitigation"
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
        "Protect Physical",
        "Mitigation"
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
        "Shielding",
        "Magic Level",
        "Protect Mana Drain"
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
        "Absorb Health",
        "Mitigation"
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
        "Reflect Fire",
        "Mitigation",
        "Shielding"
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
        "Protect Mana Drain",
        "Arrow Guard",
        "Shielding"
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
        "Protect Energy",
        "Mitigation",
        "Reflect Energy"
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
        "Shielding",
        "Club Fighting",
        "Mitigation",
        "Protect Physical"
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
        "Reflect Physical",
        "Club Fighting",
        "Mitigation",
        "Shielding"
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
        "Reflect Elements",
        "Club Fighting",
        "Mitigation",
        "Protect Elements",
        "Reflect Physical"
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
        "Crushing Blow",
        "Double Bash",
        "Attack Interval"
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
        "Defense",
        "Attack Interval"
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
        "Attack Interval",
        "Perfuration"
      ]
    },
    {
      "name": "Broadsword",
      "class": 1,
      "attributes": [
        "Attack",
        "Weight",
        "Defense",
        "Critical Hit"
      ]
    },
    {
      "name": "Serpent Sword",
      "class": 2,
      "attributes": [
        "Attack",
        "Poison",
        "Defense",
        "Attack Interval",
        "Sword Fighting"
      ]
    },
    {
      "name": "Two Handed Sword",
      "class": 2,
      "attributes": [
        "Attack",
        "Weight",
        "Defense",
        "Critical Hit",
        "Sword Fighting"
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
        "Sword Fighting",
        "Life Leech",
        "Attack Interval"
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
        "Attack Interval",
        "Double Bash"
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
        "Attack Interval",
        "Double Bash"
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
        "Attack Interval",
        "Double Bash"
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
        "Attack Interval",
        "Double Bash"
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
        "Critical Hit",
        "Life Leech"
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
        "Attack Interval",
        "Mana Leech",
        "Sword Fighting"
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
        "Crushing Blow",
        "Life Leech",
        "Mana Leech",
        "Double Bash",
        "Magic Level",
        "Attack Interval"
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
        "Critical Hit",
        "Life Leech"
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
        "Perfuration",
        "Life Leech",
        "Sword Fighting",
        "Critical Spell"
      ]
    },
    {
      "name": "Hunter's Knife",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Diamond Knife",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Ice Rapier",
      "class": 0,
      "attributes": []
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
      "name": "Orcish Axe",
      "class": 2,
      "attributes": [
        "Attack",
        "Axe Fighting",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Battle Axe",
      "class": 1,
      "attributes": [
        "Attack",
        "Weight",
        "Critical Hit",
        "Perfuration"
      ]
    },
    {
      "name": "Barbarian Axe",
      "class": 2,
      "attributes": [
        "Attack",
        "Axe Fighting",
        "Perfuration",
        "Attack Interval"
      ]
    },
    {
      "name": "Dwarven Axe",
      "class": 3,
      "attributes": [
        "Attack",
        "Axe Fighting",
        "Perfuration",
        "Attack Interval"
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
        "Attack Interval",
        "Life Leech"
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
        "Perfuration",
        "Axe Fighting"
      ]
    },
    {
      "name": "Double Axe",
      "class": 2,
      "attributes": [
        "Attack",
        "Weight",
        "Axe Fighting",
        "Perfuration",
        "Critical Hit"
      ]
    },
    {
      "name": "Halberd",
      "class": 2,
      "attributes": [
        "Attack",
        "Weight",
        "Axe Fighting",
        "Perfuration",
        "Critical Hit"
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
        "Perfuration",
        "Axe Fighting",
        "Attack Interval"
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
        "Perfuration",
        "Axe Fighting",
        "Attack Interval"
      ]
    },
    {
      "name": "Daramanian Waraxe",
      "class": 2,
      "attributes": [
        "Attack",
        "Weight",
        "Axe Fighting",
        "Perfuration",
        "Critical Hit"
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
        "Perfuration",
        "Axe Fighting"
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
        "Critical Hit",
        "Axe Fighting",
        "Perfuration"
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
        "Perfuration",
        "Defense",
        "Critical Hit"
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
        "Perfuration",
        "Berserk",
        "Critical Hit"
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
        "Critical Hit",
        "Axe Fighting",
        "Perfuration"
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
        "Critical Hit",
        "Axe Fighting",
        "Perfuration"
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
        "Attack Interval",
        "Life Leech"
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
        "Critical Hit",
        "Axe Fighting",
        "Perfuration"
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
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Battle Hammer",
      "class": 2,
      "attributes": [
        "Attack",
        "Club Fighting",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Giant Smithhammer",
      "class": 2,
      "attributes": [
        "Attack",
        "Club Fighting",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Morning Star",
      "class": 2,
      "attributes": [
        "Attack",
        "Club Fighting",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Clerical Mace",
      "class": 2,
      "attributes": [
        "Attack",
        "Club Fighting",
        "Crushing Blow",
        "Attack Interval"
      ]
    },
    {
      "name": "Dragon Hammer",
      "class": 3,
      "attributes": [
        "Attack",
        "Life Leech",
        "Club Fighting",
        "Attack Interval",
        "Crushing Blow"
      ]
    },
    {
      "name": "Skull Staff",
      "class": 3,
      "attributes": [
        "Attack",
        "Mana Leech",
        "Club Fighting",
        "Attack Interval",
        "Magic Level"
      ]
    },
    {
      "name": "Silver Mace",
      "class": 4,
      "attributes": [
        "Attack",
        "Life Leech",
        "Club Fighting",
        "Attack Interval",
        "Crushing Blow"
      ]
    },
    {
      "name": "Crystal Mace",
      "class": 4,
      "attributes": [
        "Attack",
        "Life Leech",
        "Club Fighting",
        "Attack Interval",
        "Crushing Blow"
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
        "Crushing Blow",
        "Club Fighting"
      ]
    },
    {
      "name": "Dragonbone Hammer",
      "class": 5,
      "attributes": [
        "Attack",
        "Life Leech",
        "Club Fighting",
        "Attack Interval",
        "Crushing Blow"
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
        "Crushing Blow",
        "Club Fighting"
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
        "Attack Interval",
        "Mana Leech",
        "Crushing Blow"
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
        "Perfuration",
        "Club Fighting",
        "Crushing Blow"
      ]
    },
    {
      "name": "Arcane Staff",
      "class": 4,
      "attributes": [
        "Attack",
        "Mana Leech",
        "Club Fighting",
        "Critical Spell",
        "Magic Level"
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
    },
    {
      "name": "Staff",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Enchanted Staff",
      "class": 0,
      "attributes": []
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
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "Elvish Bow",
      "class": 1,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "War Bow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "Frozen Bow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "Armored War Bow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "Sapphire Bow",
      "class": 3,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
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
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "Steel Crossbow",
      "class": 1,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "Bone Crossbow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "Crystallized Crossbow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "Royal Crossbow",
      "class": 2,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
      ]
    },
    {
      "name": "Evil Crossbow",
      "class": 3,
      "attributes": [
        "Attack",
        "Hitchance",
        "Distance Fighting",
        "Attack Interval",
        "Critical Hit"
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
    },
    {
      "name": "Snowball",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Small Stone",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Ice Small Stone",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Throwing Star",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Throwing Knife",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Spear",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Hunting Spear",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Royal Spear",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Enchanted Spear",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Glacial Spear",
      "class": 0,
      "attributes": []
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
        "Attack Interval",
        "Distance Fighting"
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
        "Attack Interval",
        "Distance Fighting",
        "Protect Physical"
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
        "Attack Interval",
        "Distance Fighting"
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
        "Critical Hit",
        "Distance Fighting",
        "Attack Interval"
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
        "Protect Physical",
        "Critical Hit"
      ]
    }
  ],
  "Ammo": [
    {
      "name": "Burst Arrow",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Poison Arrow",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Arrow",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Hunting Arrow",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Frozen Arrow",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Piercing Arrow",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Onyx Arrow",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Bolt",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Steel Bolt",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Power Bolt",
      "class": 0,
      "attributes": []
    },
    {
      "name": "Infernal Bolt",
      "class": 0,
      "attributes": []
    }
  ]
};

const ITEM_BASE_STATS: Record<string, { armor?: number; attack?: number; defense?: number; range?: number; weight: number }> = {
  "Post Officers Hat": {
    "armor": 1,
    "weight": 7
  },
  "Leather Helmet": {
    "armor": 1,
    "weight": 22
  },
  "Studded Helmet": {
    "armor": 2,
    "weight": 24.5
  },
  "Chain Helmet": {
    "armor": 2,
    "weight": 42
  },
  "Brass Helmet": {
    "armor": 3,
    "weight": 27
  },
  "Mystic Turban": {
    "armor": 2,
    "weight": 8.5
  },
  "Legion Helmet": {
    "armor": 4,
    "weight": 31
  },
  "Viking Helmet": {
    "armor": 4,
    "weight": 39
  },
  "Iron Helmet": {
    "armor": 5,
    "weight": 30
  },
  "Soldier Helmet": {
    "armor": 5,
    "weight": 32
  },
  "Hat Of The Mad": {
    "armor": 4,
    "weight": 7
  },
  "Wood Cape": {
    "armor": 4,
    "weight": 11
  },
  "Dwarven Helmet": {
    "armor": 6,
    "weight": 42
  },
  "Dark Helmet": {
    "armor": 6,
    "weight": 46
  },
  "Steel Helmet": {
    "armor": 6,
    "weight": 46
  },
  "Strange Helmet": {
    "armor": 6,
    "weight": 46
  },
  "Amazon Helmet": {
    "armor": 7,
    "weight": 29.5
  },
  "Crown Helmet": {
    "armor": 7,
    "weight": 29.5
  },
  "Beholder Helmet": {
    "armor": 7,
    "weight": 46
  },
  "Devil Helmet": {
    "armor": 7,
    "weight": 50
  },
  "Ancient Tiara": {
    "armor": 6,
    "weight": 4.5
  },
  "Magician Hat": {
    "armor": 6,
    "weight": 7.5
  },
  "Ceremonial Mask": {
    "armor": 6,
    "weight": 12
  },
  "Black Hat": {
    "armor": 7,
    "weight": 7.5
  },
  "Crusader Helmet": {
    "armor": 8,
    "weight": 52
  },
  "Warrior Helmet": {
    "armor": 8,
    "weight": 68
  },
  "Frozen Helmet": {
    "armor": 9,
    "weight": 46
  },
  "Royal Helmet": {
    "armor": 9,
    "weight": 48
  },
  "Winged Helmet": {
    "armor": 10,
    "weight": 12
  },
  "Demon Helmet": {
    "armor": 10,
    "weight": 29.5
  },
  "Dragon Scale Helmet": {
    "armor": 10,
    "weight": 60
  },
  "Helmet Of The Ancients": {
    "armor": 12,
    "weight": 27.6
  },
  "Helmet Of The Frozen Soul": {
    "armor": 12,
    "weight": 30
  },
  "Golden Helmet": {
    "armor": 12,
    "weight": 32
  },
  "Horned Helmet": {
    "armor": 12,
    "weight": 51
  },
  "Anubis Helmet": {
    "armor": 13,
    "weight": 43.5
  },
  "Spectral Helmet": {
    "armor": 13,
    "weight": 65
  },
  "Pharaoh Helmet": {
    "armor": 14,
    "weight": 43.5
  },
  "Spectral Dress": {
    "armor": 0,
    "weight": 10
  },
  "Ball Gown": {
    "armor": 0,
    "weight": 25
  },
  "White Dress": {
    "armor": 0,
    "weight": 24
  },
  "Simple Dress": {
    "armor": 1,
    "weight": 24
  },
  "Cape": {
    "armor": 1,
    "weight": 32
  },
  "Green Tunic": {
    "armor": 1,
    "weight": 9.3
  },
  "Coat": {
    "armor": 1,
    "weight": 27
  },
  "Jacket": {
    "armor": 1,
    "weight": 24
  },
  "Doublet": {
    "armor": 2,
    "weight": 25
  },
  "Red Tunic": {
    "armor": 2,
    "weight": 30
  },
  "Pirate Shirt": {
    "armor": 3,
    "weight": 20
  },
  "Leather Armor": {
    "armor": 4,
    "weight": 60
  },
  "Studded Armor": {
    "armor": 5,
    "weight": 71
  },
  "Chain Armor": {
    "armor": 6,
    "weight": 100
  },
  "Ranger's Cloak": {
    "armor": 6,
    "weight": 48
  },
  "Native Armor": {
    "armor": 7,
    "weight": 80
  },
  "Brass Armor": {
    "armor": 8,
    "weight": 80
  },
  "Red Robe": {
    "armor": 8,
    "weight": 26
  },
  "Scale Armor": {
    "armor": 9,
    "weight": 105
  },
  "Elven Mail": {
    "armor": 10,
    "weight": 90
  },
  "Plate Armor": {
    "armor": 10,
    "weight": 120
  },
  "Dwarven Armor": {
    "armor": 10,
    "weight": 130
  },
  "Dark Armor": {
    "armor": 10,
    "weight": 120
  },
  "Noble Armor": {
    "armor": 11,
    "weight": 120
  },
  "Blue Robe": {
    "armor": 11,
    "weight": 22
  },
  "Knight Armor": {
    "armor": 12,
    "weight": 120
  },
  "Crown Armor": {
    "armor": 13,
    "weight": 99
  },
  "Amazon Armor": {
    "armor": 13,
    "weight": 99
  },
  "Golden Armor": {
    "armor": 14,
    "weight": 80
  },
  "Spectral Robe": {
    "armor": 14,
    "weight": 22
  },
  "Dragon Scale Mail": {
    "armor": 15,
    "weight": 114
  },
  "Frozen Mail": {
    "armor": 15,
    "weight": 114
  },
  "Demon Armor": {
    "armor": 16,
    "weight": 80
  },
  "Magic Plate Armor": {
    "armor": 17,
    "weight": 85
  },
  "Spectral Armor": {
    "armor": 18,
    "weight": 85
  },
  "Anubis Armor": {
    "armor": 18,
    "weight": 85
  },
  "Pharaoh Armor": {
    "armor": 19,
    "weight": 85
  },
  "Leather Legs": {
    "armor": 1,
    "weight": 18
  },
  "Studded Legs": {
    "armor": 2,
    "weight": 26
  },
  "Chain Legs": {
    "armor": 3,
    "weight": 35
  },
  "Elven Legs": {
    "armor": 4,
    "weight": 33
  },
  "Brass Legs": {
    "armor": 5,
    "weight": 38
  },
  "Dwarven Legs": {
    "armor": 7,
    "weight": 49
  },
  "Plate Legs": {
    "armor": 7,
    "weight": 50
  },
  "Knight Legs": {
    "armor": 8,
    "weight": 70
  },
  "Crown Legs": {
    "armor": 8,
    "weight": 65
  },
  "Golden Legs": {
    "armor": 9,
    "weight": 54
  },
  "Demon Legs": {
    "armor": 9,
    "weight": 54
  },
  "Frozen Legs": {
    "armor": 9,
    "weight": 58
  },
  "Dragon Scale Legs": {
    "armor": 10,
    "weight": 48
  },
  "Spectral Legs": {
    "armor": 11,
    "weight": 54
  },
  "Anubis Legs": {
    "armor": 11,
    "weight": 54
  },
  "Pharaoh Legs": {
    "armor": 12,
    "weight": 54
  },
  "Boots Of Haste": {
    "armor": 0,
    "weight": 7.5
  },
  "Sandals": {
    "armor": 0,
    "weight": 6
  },
  "Bunnyslippers": {
    "armor": 0,
    "weight": 12
  },
  "Leather Boots": {
    "armor": 1,
    "weight": 9
  },
  "Patched Boots": {
    "armor": 2,
    "weight": 9
  },
  "Snow Boots": {
    "armor": 2,
    "weight": 16
  },
  "Steel Boots": {
    "armor": 3,
    "weight": 29
  },
  "Frozen Boots": {
    "armor": 3,
    "weight": 9
  },
  "Golden Boots": {
    "armor": 4,
    "weight": 32
  },
  "Wooden Shield": {
    "defense": 14,
    "weight": 40
  },
  "Studded Shield": {
    "defense": 15,
    "weight": 59
  },
  "Brass Shield": {
    "defense": 16,
    "weight": 60
  },
  "Plate Shield": {
    "defense": 17,
    "weight": 65
  },
  "Black Shield": {
    "defense": 18,
    "weight": 42
  },
  "Copper Shield": {
    "defense": 19,
    "weight": 63
  },
  "Bone Shield": {
    "defense": 20,
    "weight": 55
  },
  "Steel Shield": {
    "defense": 21,
    "weight": 69
  },
  "Viking Shield": {
    "defense": 22,
    "weight": 66
  },
  "Ornamented Shield": {
    "defense": 22,
    "weight": 67
  },
  "Battle Shield": {
    "defense": 23,
    "weight": 62
  },
  "Scarab Shield": {
    "defense": 25,
    "weight": 47
  },
  "Dark Shield": {
    "defense": 25,
    "weight": 52
  },
  "Dwarven Shield": {
    "defense": 26,
    "weight": 55
  },
  "Rose Shield": {
    "defense": 27,
    "weight": 52
  },
  "Ancient Shield": {
    "defense": 27,
    "weight": 61
  },
  "Castle Shield": {
    "defense": 28,
    "weight": 49
  },
  "Beholder Shield": {
    "defense": 28,
    "weight": 47
  },
  "Griffin Shield": {
    "defense": 29,
    "weight": 50
  },
  "Guardian Shield": {
    "defense": 30,
    "weight": 55
  },
  "Eagle Shield": {
    "defense": 30,
    "weight": 60
  },
  "Dragon Shield": {
    "defense": 31,
    "weight": 60
  },
  "Frozen Shield": {
    "defense": 32,
    "weight": 62
  },
  "Amazon Shield": {
    "defense": 32,
    "weight": 62
  },
  "Crown Shield": {
    "defense": 32,
    "weight": 62
  },
  "Tower Shield": {
    "defense": 32,
    "weight": 82
  },
  "Shield Of Honour": {
    "defense": 33,
    "weight": 54
  },
  "Medusa Shield": {
    "defense": 33,
    "weight": 58
  },
  "Vampire Shield": {
    "defense": 34,
    "weight": 38
  },
  "Phoenix Shield": {
    "defense": 34,
    "weight": 35
  },
  "Demon Shield": {
    "defense": 35,
    "weight": 26
  },
  "Tempest Shield": {
    "defense": 36,
    "weight": 51
  },
  "Mastermind Shield": {
    "defense": 37,
    "weight": 57
  },
  "Great Shield": {
    "defense": 38,
    "weight": 84
  },
  "Spectral Shield": {
    "defense": 39,
    "weight": 57
  },
  "Blessed Shield": {
    "defense": 40,
    "weight": 68
  },
  "Quiver": {
    "armor": 0,
    "attack": 0,
    "weight": 17
  },
  "Iron Quiver": {
    "armor": 1,
    "attack": 0,
    "weight": 20
  },
  "Dragon Quiver": {
    "armor": 1,
    "attack": 1,
    "weight": 22
  },
  "Imperial Quiver": {
    "armor": 2,
    "attack": 1,
    "weight": 26
  },
  "Blazing Quiver": {
    "armor": 0,
    "attack": 2,
    "weight": 24
  },
  "Deadly Quiver": {
    "armor": 0,
    "attack": 2,
    "weight": 24
  },
  "Quiver Of Valor": {
    "armor": 1,
    "attack": 2,
    "weight": 26
  },
  "Sickle": {
    "attack": 7,
    "defense": 4,
    "weight": 10.5
  },
  "Hand Axe": {
    "attack": 10,
    "defense": 5,
    "weight": 18
  },
  "Axe": {
    "attack": 12,
    "defense": 6,
    "weight": 40
  },
  "Golden Sickle": {
    "attack": 13,
    "defense": 6,
    "weight": 19.5
  },
  "Rough Axe": {
    "attack": 14,
    "defense": 9,
    "weight": 42
  },
  "Hatchet": {
    "attack": 15,
    "defense": 8,
    "weight": 35
  },
  "Daramanian Axe": {
    "attack": 16,
    "defense": 8,
    "weight": 41
  },
  "Refined Axe": {
    "attack": 18,
    "defense": 10,
    "weight": 48
  },
  "Superior Axe": {
    "attack": 22,
    "defense": 10,
    "weight": 54
  },
  "Masterwork Axe": {
    "attack": 22,
    "defense": 12,
    "weight": 58
  },
  "Orcish Axe": {
    "attack": 23,
    "defense": 12,
    "weight": 45
  },
  "Battle Axe": {
    "attack": 25,
    "defense": 10,
    "weight": 50
  },
  "Grandmaster Axe": {
    "attack": 26,
    "defense": 16,
    "weight": 62
  },
  "Barbarian Axe": {
    "attack": 28,
    "defense": 18,
    "weight": 51
  },
  "Dwarven Axe": {
    "attack": 31,
    "defense": 19,
    "weight": 82
  },
  "Knight Axe": {
    "attack": 33,
    "defense": 21,
    "weight": 59
  },
  "Obsidian Lance": {
    "attack": 34,
    "defense": 10,
    "weight": 80
  },
  "Double Axe": {
    "attack": 35,
    "defense": 12,
    "weight": 70
  },
  "Halberd": {
    "attack": 35,
    "defense": 14,
    "weight": 90
  },
  "Crystal Axe": {
    "attack": 36,
    "defense": 20,
    "weight": 64
  },
  "Fire Axe": {
    "attack": 38,
    "defense": 16,
    "weight": 40
  },
  "Daramanian Waraxe": {
    "attack": 39,
    "defense": 15,
    "weight": 52.5
  },
  "Naginata": {
    "attack": 39,
    "defense": 25,
    "weight": 78
  },
  "Twin Axe": {
    "attack": 45,
    "defense": 24,
    "weight": 64
  },
  "Guardian Halberd": {
    "attack": 46,
    "defense": 15,
    "weight": 110
  },
  "Dragon Lance": {
    "attack": 47,
    "defense": 16,
    "weight": 67
  },
  "War Axe": {
    "attack": 48,
    "defense": 10,
    "weight": 61.5
  },
  "Ravager's Axe": {
    "attack": 49,
    "defense": 14,
    "weight": 52.5
  },
  "Stonecutter Axe": {
    "attack": 50,
    "defense": 30,
    "weight": 99
  },
  "Darksteel Axe": {
    "attack": 51,
    "defense": 18,
    "weight": 110
  },
  "Great Axe": {
    "attack": 52,
    "defense": 22,
    "weight": 90
  },
  "Demonwing Axe": {
    "attack": 53,
    "defense": 20,
    "weight": 120
  },
  "Knife": {
    "attack": 7,
    "defense": 5,
    "weight": 4.2
  },
  "Dagger": {
    "attack": 8,
    "defense": 6,
    "weight": 9.5
  },
  "Combat Knife": {
    "attack": 8,
    "defense": 6,
    "weight": 8.69
  },
  "Silver Dagger": {
    "attack": 8,
    "defense": 7,
    "weight": 10.19
  },
  "Foil": {
    "attack": 9,
    "defense": 11,
    "weight": 15
  },
  "Rapier": {
    "attack": 10,
    "defense": 8,
    "weight": 15
  },
  "Hunter's Knife": {
    "attack": 11,
    "defense": 6,
    "weight": 15
  },
  "Short Sword": {
    "attack": 11,
    "defense": 11,
    "weight": 35
  },
  "Sabre": {
    "attack": 12,
    "defense": 10,
    "weight": 25
  },
  "Sword": {
    "attack": 14,
    "defense": 12,
    "weight": 35
  },
  "Bone Sword": {
    "attack": 14,
    "defense": 10,
    "weight": 19
  },
  "Diamond Knife": {
    "attack": 15,
    "defense": 7,
    "weight": 20
  },
  "Carlin Sword": {
    "attack": 15,
    "defense": 13,
    "weight": 40
  },
  "Heavy Machete": {
    "attack": 16,
    "defense": 10,
    "weight": 18.39
  },
  "Katana": {
    "attack": 16,
    "defense": 12,
    "weight": 31
  },
  "Longsword": {
    "attack": 17,
    "defense": 14,
    "weight": 42
  },
  "Poison Dagger": {
    "attack": 18,
    "defense": 8,
    "weight": 8.8
  },
  "Scimitar": {
    "attack": 19,
    "defense": 13,
    "weight": 29
  },
  "Spike Sword": {
    "attack": 24,
    "defense": 21,
    "weight": 50
  },
  "Broadsword": {
    "attack": 26,
    "defense": 23,
    "weight": 52.5
  },
  "Serpent Sword": {
    "attack": 26,
    "defense": 15,
    "weight": 41
  },
  "Two Handed Sword": {
    "attack": 30,
    "defense": 25,
    "weight": 70
  },
  "Fire Sword": {
    "attack": 35,
    "defense": 20,
    "weight": 23
  },
  "Bright Sword": {
    "attack": 36,
    "defense": 30,
    "weight": 29
  },
  "Crystal Sword": {
    "attack": 38,
    "defense": 26,
    "weight": 69
  },
  "Djinn Blade": {
    "attack": 40,
    "defense": 22,
    "weight": 24.5
  },
  "Pharaoh Sword": {
    "attack": 44,
    "defense": 23,
    "weight": 190
  },
  "Giant Sword": {
    "attack": 46,
    "defense": 22,
    "weight": 180
  },
  "Magic Sword": {
    "attack": 48,
    "defense": 35,
    "weight": 42
  },
  "Miracle Sword": {
    "attack": 50,
    "defense": 30,
    "weight": 42
  },
  "Warlord Sword": {
    "attack": 53,
    "defense": 38,
    "weight": 64
  },
  "Magic Longsword": {
    "attack": 55,
    "defense": 40,
    "weight": 43
  },
  "Ice Rapier": {
    "attack": 100,
    "defense": 1,
    "weight": 15
  },
  "Club": {
    "attack": 7,
    "defense": 7,
    "weight": 25
  },
  "Studded Club": {
    "attack": 9,
    "defense": 8,
    "weight": 35
  },
  "Staff": {
    "attack": 10,
    "defense": 25,
    "weight": 38
  },
  "Bone Club": {
    "attack": 12,
    "defense": 8,
    "weight": 39
  },
  "Golden Mace": {
    "attack": 14,
    "defense": 9,
    "weight": 50
  },
  "Mace": {
    "attack": 16,
    "defense": 11,
    "weight": 28
  },
  "Iron Hammer": {
    "attack": 18,
    "defense": 10,
    "weight": 66
  },
  "Daramanian Mace": {
    "attack": 21,
    "defense": 12,
    "weight": 68
  },
  "Battle Hammer": {
    "attack": 24,
    "defense": 14,
    "weight": 68
  },
  "Giant Smithhammer": {
    "attack": 24,
    "defense": 14,
    "weight": 68
  },
  "Morning Star": {
    "attack": 25,
    "defense": 11,
    "weight": 54
  },
  "Clerical Mace": {
    "attack": 28,
    "defense": 15,
    "weight": 58
  },
  "Dragon Hammer": {
    "attack": 32,
    "defense": 20,
    "weight": 97
  },
  "Skull Staff": {
    "attack": 36,
    "defense": 12,
    "weight": 17
  },
  "Enchanted Staff": {
    "attack": 39,
    "defense": 45,
    "weight": 38
  },
  "Silver Mace": {
    "attack": 40,
    "defense": 30,
    "weight": 67
  },
  "Crystal Mace": {
    "attack": 43,
    "defense": 16,
    "weight": 80
  },
  "War Hammer": {
    "attack": 45,
    "defense": 10,
    "weight": 85
  },
  "Dragonbone Hammer": {
    "attack": 46,
    "defense": 22,
    "weight": 110
  },
  "Hammer Of Wrath": {
    "attack": 48,
    "defense": 12,
    "weight": 70
  },
  "Sapphire Hammer": {
    "attack": 48,
    "defense": 28,
    "weight": 21
  },
  "Thunder Hammer": {
    "attack": 49,
    "defense": 35,
    "weight": 125
  },
  "Heavy Mace": {
    "attack": 50,
    "defense": 15,
    "weight": 110
  },
  "Arcane Staff": {
    "attack": 50,
    "defense": 30,
    "weight": 40
  },
  "Mythic Hammer": {
    "attack": 52,
    "defense": 22,
    "weight": 240
  },
  "Snowball": {
    "attack": 0,
    "range": 7,
    "weight": 0.8
  },
  "Small Stone": {
    "attack": 5,
    "range": 7,
    "weight": 1.8
  },
  "Ice Small Stone": {
    "attack": 5,
    "range": 7,
    "weight": 1.9
  },
  "Throwing Star": {
    "attack": 25,
    "range": 7,
    "weight": 2
  },
  "Throwing Knife": {
    "attack": 30,
    "range": 7,
    "weight": 5
  },
  "Spear": {
    "attack": 30,
    "range": 7,
    "weight": 20
  },
  "Hunting Spear": {
    "attack": 32,
    "range": 6,
    "weight": 22
  },
  "Royal Spear": {
    "attack": 34,
    "range": 5,
    "weight": 22
  },
  "Enchanted Spear": {
    "attack": 36,
    "range": 4,
    "weight": 22
  },
  "Glacial Spear": {
    "attack": 38,
    "range": 7,
    "weight": 26
  },
  "Bow": {
    "armor": 0,
    "attack": 0,
    "range": 6,
    "weight": 31
  },
  "Elvish Bow": {
    "armor": 0,
    "attack": 1,
    "range": 6,
    "weight": 27
  },
  "War Bow": {
    "armor": 0,
    "attack": 2,
    "range": 6,
    "weight": 36
  },
  "Frozen Bow": {
    "armor": 0,
    "attack": 3,
    "range": 6,
    "weight": 40
  },
  "Armored War Bow": {
    "armor": 2,
    "attack": 3,
    "range": 6,
    "weight": 60
  },
  "Sapphire Bow": {
    "armor": 0,
    "attack": 3,
    "range": 7,
    "weight": 42
  },
  "Hellforged Bow": {
    "armor": 0,
    "attack": 4,
    "range": 6,
    "weight": 46
  },
  "Crossbow": {
    "armor": 0,
    "attack": 0,
    "range": 5,
    "weight": 40
  },
  "Steel Crossbow": {
    "armor": 0,
    "attack": 1,
    "range": 5,
    "weight": 40
  },
  "Bone Crossbow": {
    "armor": 0,
    "attack": 2,
    "range": 4,
    "weight": 65
  },
  "Crystallized Crossbow": {
    "armor": 0,
    "attack": 3,
    "range": 5,
    "weight": 40
  },
  "Royal Crossbow": {
    "armor": 0,
    "attack": 3,
    "range": 5,
    "weight": 40
  },
  "Evil Crossbow": {
    "armor": 0,
    "attack": 4,
    "range": 5,
    "weight": 60
  },
  "Hellforged Crossbow": {
    "armor": 0,
    "attack": 5,
    "range": 5,
    "weight": 60
  },
  "Burst Arrow": {
    "attack": 27,
    "weight": 0.8
  },
  "Poison Arrow": {
    "attack": 22,
    "weight": 0.7
  },
  "Arrow": {
    "attack": 25,
    "weight": 0.7
  },
  "Hunting Arrow": {
    "attack": 25,
    "weight": 0.7
  },
  "Frozen Arrow": {
    "attack": 30,
    "weight": 0.7
  },
  "Piercing Arrow": {
    "attack": 33,
    "weight": 0.7
  },
  "Onyx Arrow": {
    "attack": 38,
    "weight": 0.7
  },
  "Bolt": {
    "attack": 30,
    "weight": 0.8
  },
  "Steel Bolt": {
    "attack": 35,
    "weight": 0.8
  },
  "Power Bolt": {
    "attack": 40,
    "weight": 0.85
  },
  "Infernal Bolt": {
    "attack": 55,
    "weight": 0.9
  },
  "Helmet Of The Ancients (Empty)": {
    "armor": 8,
    "weight": 27.6
  },
  "Helmet Of The Ancients (Full)": {
    "armor": 12,
    "weight": 27.6
  }
};

const CATEGORY_MAP: Record<string, string> = {
  "Helmets": "head",
  "Armors": "armor",
  "Legs": "legs",
  "Boots": "feet",
  "Shields": "left-hand",
  "Quivers": "left-hand",
  "Axes": "right-hand",
  "Swords": "right-hand",
  "Clubs": "right-hand",
  "Distance": "right-hand",
  "Ammo": "ammo"
};

const ARMOR_ID_IMAGE_MAP: Record<string, { id: number; img: string }> = {
  "Spectral Dress": {
    "armor": 0,
    "weight": 10
  },
  "Ball Gown": {
    "armor": 0,
    "weight": 25
  },
  "White Dress": {
    "armor": 0,
    "weight": 24
  },
  "Simple Dress": {
    "armor": 1,
    "weight": 24
  },
  "Cape": {
    "armor": 1,
    "weight": 32
  },
  "Green Tunic": {
    "armor": 1,
    "weight": 9.3
  },
  "Coat": {
    "armor": 1,
    "weight": 27
  },
  "Jacket": {
    "armor": 1,
    "weight": 24
  },
  "Doublet": {
    "armor": 2,
    "weight": 25
  },
  "Red Tunic": {
    "armor": 2,
    "weight": 30
  },
  "Pirate Shirt": {
    "armor": 3,
    "weight": 20
  },
  "Leather Armor": {
    "armor": 4,
    "weight": 60
  },
  "Studded Armor": {
    "armor": 5,
    "weight": 71
  },
  "Chain Armor": {
    "armor": 6,
    "weight": 100
  },
  "Ranger's Cloak": {
    "armor": 6,
    "weight": 48
  },
  "Native Armor": {
    "armor": 7,
    "weight": 80
  },
  "Brass Armor": {
    "armor": 8,
    "weight": 80
  },
  "Red Robe": {
    "armor": 8,
    "weight": 26
  },
  "Scale Armor": {
    "armor": 9,
    "weight": 105
  },
  "Elven Mail": {
    "armor": 10,
    "weight": 90
  },
  "Plate Armor": {
    "armor": 10,
    "weight": 120
  },
  "Dwarven Armor": {
    "armor": 10,
    "weight": 130
  },
  "Dark Armor": {
    "armor": 10,
    "weight": 120
  },
  "Noble Armor": {
    "armor": 11,
    "weight": 120
  },
  "Blue Robe": {
    "armor": 11,
    "weight": 22
  },
  "Knight Armor": {
    "armor": 12,
    "weight": 120
  },
  "Crown Armor": {
    "armor": 13,
    "weight": 99
  },
  "Amazon Armor": {
    "armor": 13,
    "weight": 99
  },
  "Golden Armor": {
    "armor": 14,
    "weight": 80
  },
  "Spectral Robe": {
    "armor": 14,
    "weight": 22
  },
  "Dragon Scale Mail": {
    "armor": 15,
    "weight": 114
  },
  "Frozen Mail": {
    "armor": 15,
    "weight": 114
  },
  "Demon Armor": {
    "armor": 16,
    "weight": 80
  },
  "Magic Plate Armor": {
    "armor": 17,
    "weight": 85
  },
  "Spectral Armor": {
    "armor": 18,
    "weight": 85
  },
  "Anubis Armor": {
    "armor": 18,
    "weight": 85
  },
  "Pharaoh Armor": {
    "armor": 19,
    "weight": 85
  }
};

const LEGS_ID_IMAGE_MAP: Record<string, { id: number; img: string }> = {
  "Leather Legs": {
    "armor": 1,
    "weight": 18
  },
  "Studded Legs": {
    "armor": 2,
    "weight": 26
  },
  "Chain Legs": {
    "armor": 3,
    "weight": 35
  },
  "Elven Legs": {
    "armor": 4,
    "weight": 33
  },
  "Brass Legs": {
    "armor": 5,
    "weight": 38
  },
  "Dwarven Legs": {
    "armor": 7,
    "weight": 49
  },
  "Plate Legs": {
    "armor": 7,
    "weight": 50
  },
  "Knight Legs": {
    "armor": 8,
    "weight": 70
  },
  "Crown Legs": {
    "armor": 8,
    "weight": 65
  },
  "Golden Legs": {
    "armor": 9,
    "weight": 54
  },
  "Demon Legs": {
    "armor": 9,
    "weight": 54
  },
  "Frozen Legs": {
    "armor": 9,
    "weight": 58
  },
  "Dragon Scale Legs": {
    "armor": 10,
    "weight": 48
  },
  "Spectral Legs": {
    "armor": 11,
    "weight": 54
  },
  "Anubis Legs": {
    "armor": 11,
    "weight": 54
  },
  "Pharaoh Legs": {
    "armor": 12,
    "weight": 54
  }
};

// Generate list of items from ATTRIBUTE_DATA
const GENERATED_ITEMS: GameItem[] = [];

Object.entries(ATTRIBUTE_DATA_STUB).forEach(([grpName, items]) => {
  const category = CATEGORY_MAP[grpName] || "right-hand";
  
  items.forEach(item => {
    const slugId = item.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const base = ITEM_BASE_STATS[item.name] || { weight: 1.0 };
    
    // Map human attribute list to short IDs in constants.ts
    const mappedAttrIds = item.attributes
      .map(attrName => ATTRIBUTE_MAP[attrName])
      .filter((id): id is string => !!id);

    // Look up helmet or armor image if it exists
    let imgPath = undefined;
    if (grpName === "Helmets") {
      const match = HELMETS_DATA.find(h => h.name === item.name);
      if (match?.image) {
        imgPath = match.image;
      }
    } else if (grpName === "Armors") {
      const match = ARMOR_ID_IMAGE_MAP[item.name];
      if (match) {
        imgPath = match.img;
      }
    } else if (grpName === "Legs") {
      const match = LEGS_ID_IMAGE_MAP[item.name];
      if (match) {
        imgPath = match.img;
      }
    }
    
    // Fallback for everything else using the master dictionary (case insensitive)
    if (!imgPath) {
      const lowerName = item.name.toLowerCase();
      if (ALL_ITEM_IMAGES[lowerName]) {
        imgPath = ALL_ITEM_IMAGES[lowerName];
      }
    }

    GENERATED_ITEMS.push({
      id: slugId,
      name: item.name,
      category,
      subCategory: grpName,
      weight: base.weight,
      attributeClass: item.class,
      allowedAttributes: Array.from(new Set(mappedAttrIds)), // remove duplicates
      armor: base.armor,
      attack: base.attack,
      defense: base.defense,
      img: imgPath
    });
  });
});

// Specialized lists for non-attribute-rolling or custom slots (Rings, Amulets, Backpacks, Relics, Foods)
const RINGS: GameItem[] = [
  { id: 'axe-ring', name: "Axe Ring", category: "ring", weight: 0.9, attributeClass: 0, allowedAttributes: [], bonuses: { axe: 4 } },
  { id: 'club-ring', name: "Club Ring", category: "ring", weight: 0.9, attributeClass: 0, allowedAttributes: [], bonuses: { club: 4 } },
  { id: 'crystal-ring', name: "Crystal Ring", category: "ring", weight: 0.9, attributeClass: 0, allowedAttributes: [] },
  { id: 'dwarven-ring', name: "Dwarven Ring", category: "ring", weight: 1.1, attributeClass: 0, allowedAttributes: [], bonuses: { speed: 5 }, protections: { physical: 0.02 } },
  { id: 'energy-ring', name: "Energy Ring", category: "ring", weight: 0.8, attributeClass: 0, allowedAttributes: [], bonuses: { 'magic-shield': 1 } },
  { id: 'gold-ring', name: "Gold Ring", category: "ring", weight: 1.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'life-ring', name: "Life Ring", category: "ring", weight: 0.8, attributeClass: 0, allowedAttributes: [], bonuses: { 'health-regen': 0.4, 'mana-regen': 1.6 }, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/v1776269931/life_ring.gif" },
  { id: 'might-ring', name: "Might Ring", category: "ring", weight: 1.0, attributeClass: 0, allowedAttributes: [], protections: { physical: 0.2, elements: 0.2, fire: 0.2, ice: 0.2, energy: 0.2, earth: 0.2 }, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/v1776269931/might_ring.gif" },
  { id: 'power-ring', name: "Power Ring", category: "ring", weight: 0.8, attributeClass: 0, allowedAttributes: [] },
  { id: 'ring-of-healing', name: "Ring of Healing", category: "ring", weight: 0.8, attributeClass: 0, allowedAttributes: [], bonuses: { 'health-regen': 1, 'mana-regen': 4 }, img: "https://res.cloudinary.com/dc4nkbnkg/image/upload/v1776269931/ring_of_healing.gif" },
  { id: 'ring-of-skies', name: "Ring of the Skies", category: "ring", weight: 0.4, attributeClass: 0, allowedAttributes: [] },
  { id: 'ring-of-void', name: "Ring of Void", category: "ring", weight: 0.9, attributeClass: 0, allowedAttributes: [], bonuses: { healing: 8, magic: 1 } },
  { id: 'stealth-ring', name: "Stealth Ring", category: "ring", weight: 1.0, attributeClass: 0, allowedAttributes: [], bonuses: { invisibility: 1 } },
  { id: 'sword-ring', name: "Sword Ring", category: "ring", weight: 0.9, attributeClass: 0, allowedAttributes: [], bonuses: { sword: 4 } },
  { id: 'time-ring', name: "Time Ring", category: "ring", weight: 0.9, attributeClass: 0, allowedAttributes: [], bonuses: { speed: 30 } },
  { id: 'twin-sun-ring', name: "Twin Sun Ring", category: "ring", weight: 0.4, attributeClass: 0, allowedAttributes: [], bonuses: { distance: 2, 'attack-interval': -2 } },
  { id: 'valar-ring', name: "Valar Ring", category: "ring", weight: 0.4, attributeClass: 0, allowedAttributes: [], protections: { physical: 0.03, elements: 0.03, fire: 0.03, ice: 0.03, energy: 0.03, earth: 0.03 } },
  { id: 'wedding-ring', name: "Wedding Ring", category: "ring", weight: 0.4, attributeClass: 0, allowedAttributes: [] }
];

const AMULETS: GameItem[] = [
  { id: 'amulet-of-loss', name: "Amulet of Loss", category: "necklace", weight: 4.2, attributeClass: 0, allowedAttributes: [] },
  { id: 'ancient-amulet', name: "Ancient Amulet", category: "necklace", weight: 8.4, attributeClass: 0, allowedAttributes: [] },
  { id: 'broken-amulet', name: "Broken Amulet", category: "necklace", weight: 4.2, attributeClass: 0, allowedAttributes: [] },
  { id: 'bronze-amulet', name: "Bronze Amulet", category: "necklace", weight: 5.0, attributeClass: 0, allowedAttributes: [], protections: { 'mana-drain': 0.2 } },
  { id: 'crystal-necklace', name: "Crystal Necklace", category: "necklace", weight: 4.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'demonbone-amulet', name: "Demonbone Amulet", category: "necklace", weight: 32.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'dragon-necklace', name: "Dragon Necklace", category: "necklace", weight: 6.3, attributeClass: 0, allowedAttributes: [] },
  { id: 'elven-amulet', name: "Elven Amulet", category: "necklace", weight: 2.7, attributeClass: 0, allowedAttributes: [], protections: { physical: 0.1, elements: 0.1, fire: 0.1, ice: 0.1, energy: 0.1, earth: 0.1 } },
  { id: 'garlic-necklace', name: "Garlic Necklace", category: "necklace", weight: 3.5, attributeClass: 0, allowedAttributes: [], protections: { earth: 0.2 } },
  { id: 'golden-amulet', name: "Golden Amulet", category: "necklace", weight: 5.5, attributeClass: 0, allowedAttributes: [] },
  { id: 'leviathans-amulet', name: "Leviathan's Amulet", category: "necklace", weight: 2.6, attributeClass: 0, allowedAttributes: [], protections: { ice: 0.2 } },
  { id: 'marra-ring', name: "Marra Ring", category: "necklace", weight: 2.8, attributeClass: 0, allowedAttributes: [] },
  { id: 'platinum-amulet', name: "Platinum Amulet", category: "necklace", weight: 6.0, armor: 2, attributeClass: 0, allowedAttributes: [] },
  { id: 'protection-amulet', name: "Protection Amulet", category: "necklace", weight: 5.5, attributeClass: 0, allowedAttributes: [], protections: { physical: 0.05 } },
  { id: 'ruby-necklace', name: "Ruby Necklace", category: "necklace", weight: 3.5, attributeClass: 0, allowedAttributes: [] },
  { id: 'scarf', name: "Scarf", category: "necklace", weight: 1.5, armor: 1, attributeClass: 0, allowedAttributes: [] },
  { id: 'shockwalker-amulet', name: "Shockwalker Amulet", category: "necklace", weight: 2.5, attributeClass: 0, allowedAttributes: [], protections: { energy: 0.2 } },
  { id: 'silver-amulet', name: "Silver Amulet", category: "necklace", weight: 5.0, attributeClass: 0, allowedAttributes: [], protections: { earth: 0.1 } },
  { id: 'silver-necklace', name: "Silver Necklace", category: "necklace", weight: 3.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'star-amulet', name: "Star Amulet", category: "necklace", weight: 2.5, attributeClass: 0, allowedAttributes: [] },
  { id: 'stone-skin-amulet', name: "Stone Skin Amulet", category: "necklace", weight: 5.0, attributeClass: 0, allowedAttributes: [], protections: { physical: 0.8, elements: 0.8, fire: 0.8, ice: 0.8, energy: 0.8, earth: 0.8 } },
  { id: 'strange-talisman', name: "Strange Talisman", category: "necklace", weight: 3.2, attributeClass: 0, allowedAttributes: [], protections: { energy: 0.1 } },
  { id: 'talisman-of-the-deep', name: "Talisman Of The Deep", category: "necklace", weight: 1.5, attributeClass: 0, allowedAttributes: [], bonuses: { hp: 100 } },
  { id: 'white-pearl-bed', name: "White Pearl Bed", category: "necklace", weight: 4.3, attributeClass: 0, allowedAttributes: [] },
  { id: 'wolf-tooth-chain', name: "Wolf Tooth Chain", category: "necklace", weight: 3.3, attributeClass: 0, allowedAttributes: [] }
];

const BACKPACKS: GameItem[] = [
  { id: 'backpack', name: "Backpack", category: "backpack", weight: 18.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'fur-backpack', name: "Fur Backpack", category: "backpack", weight: 18.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'golden-backpack', name: "Golden Backpack", category: "backpack", weight: 18.0, attributeClass: 1, allowedAttributes: ["speed"] },
  { id: 'demon-backpack', name: "Demon Backpack", category: "backpack", weight: 18.0, attributeClass: 2, allowedAttributes: ["speed", "phys-prot"] },
  { id: 'crown-backpack', name: "Crown Backpack", category: "backpack", weight: 18.0, attributeClass: 2, allowedAttributes: ["speed", "hp"] }
];

const RELICS: GameItem[] = [
  { id: 'abyssal-core', name: "Abyssal Core", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'ancestral-spirit-ring', name: "Ancestral Spirit Ring", category: "relic", weight: 3.0, attributeClass: 0, allowedAttributes: [], bonuses: { magic: 1, 'mana-regen': 1/36 } },
  { id: 'ancient-whisper', name: "Ancient Whisper", category: "relic", weight: 2.0, armor: 1, attributeClass: 0, allowedAttributes: [], bonuses: { speed: 10 } },
  { id: 'azure-grip', name: "Azure Grip", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'beholders-book', name: "Beholder's Book", category: "relic", weight: 4.0, attributeClass: 0, allowedAttributes: [], bonuses: { magic: 1, 'dmg-poison': 5 } },
  { id: 'blackened-charm', name: "Blackened Charm", category: "relic", weight: 2.5, attributeClass: 0, allowedAttributes: [], bonuses: { 'mana-leech-chance': 7, 'mana-leech-amount': 5 } },
  { id: 'blood-vessel', name: "Blood Vessel", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'broken-bell', name: "Broken Bell", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'cobra-spirit', name: "Cobra Spirit", category: "relic", weight: 2.0, attributeClass: 0, allowedAttributes: [], bonuses: { magic: 1, 'mana-regen': 1/36 } },
  { id: 'crescent-moon', name: "Crescent Moon", category: "relic", weight: 15.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'cryo-nexus', name: "Cryo Nexus", category: "relic", weight: 18.0, attributeClass: 0, allowedAttributes: [], bonuses: { 'dmg-ice': 5 } },
  { id: 'cursed-horn', name: "Cursed Horn", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'cyclops-hand', name: "Cyclops Hand", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [], bonuses: { 'crit-hit-chance': 5, 'crit-hit': 10 } },
  { id: 'dark-talisman', name: "Dark Talisman", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [], bonuses: { 'berserk': 1 } },
  { id: 'death-bell', name: "Death Bell", category: "relic", weight: 10.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'death-magic-book', name: "Death Magic Book", category: "relic", weight: 7.5, attributeClass: 0, allowedAttributes: [], bonuses: { 'crit-spell-chance': 3, 'crit-spell-amount': 8 } },
  { id: 'demons-heart', name: "Demon's Heart", category: "relic", weight: 5.0, attributeClass: 0, allowedAttributes: [], bonuses: { 'health-regen': 2/6, healing: 3 } },
  { id: 'demonbone-horn', name: "Demonbone Horn", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'diabolic-skull', name: "Diabolic Skull", category: "relic", weight: 10.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'diabolical-hand', name: "Diabolical Hand", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'draconian-sigil', name: "Draconian Sigil", category: "relic", weight: 18.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'dragon-claw', name: "Dragon Claw", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'dragon-lords-eye', name: "Dragon Lord's Eye", category: "relic", weight: 3.0, attributeClass: 0, allowedAttributes: [], bonuses: { 'health-regen': 1/8 }, protections: { fire: 0.02 } },
  { id: 'dragonbone-sigil', name: "Dragonbone Sigil", category: "relic", weight: 18.0, armor: 1, attributeClass: 0, allowedAttributes: [], protections: { fire: 0.02 } },
  { id: 'ectoplasmic-shield', name: "Ectoplasmic Shield", category: "relic", weight: 18.0, attributeClass: 0, allowedAttributes: [], protections: { elements: 0.02 } },
  { id: 'eternal-effigy', name: "Eternal Effigy", category: "relic", weight: 4.0, armor: 1, attributeClass: 0, allowedAttributes: [], bonuses: { 'mana-regen': 1/36 } },
  { id: 'eye-of-aurum', name: "Eye Of Aurum", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [], bonuses: { destruction: 3 } },
  { id: 'frozen-fish', name: "Frozen Fish", category: "relic", weight: 4.0, armor: 2, attributeClass: 0, allowedAttributes: [] },
  { id: 'frozen-heart', name: "Frozen Heart", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [], protections: { ice: 0.03 } },
  { id: 'giant-amethyst', name: "Giant Amethyst", category: "relic", weight: 22.0, armor: 1, attributeClass: 0, allowedAttributes: [], bonuses: { mp: 60 } },
  { id: 'giant-emerald', name: "Giant Emerald", category: "relic", weight: 22.0, armor: 1, attributeClass: 0, allowedAttributes: [], bonuses: { hp: 60 } },
  { id: 'giant-ruby', name: "Giant Ruby", category: "relic", weight: 22.0, armor: 1, attributeClass: 0, allowedAttributes: [], bonuses: { 'health-regen': 1/3 } },
  { id: 'giant-sapphire', name: "Giant Sapphire", category: "relic", weight: 22.0, armor: 1, attributeClass: 0, allowedAttributes: [], bonuses: { 'mana-regen': 1/3 } },
  { id: 'giant-topaz', name: "Giant Topaz", category: "relic", weight: 22.0, armor: 1, attributeClass: 0, allowedAttributes: [] },
  { id: 'golden-cheese', name: "Golden Cheese", category: "relic", weight: 1.5, attributeClass: 0, allowedAttributes: [] },
  { id: 'golden-falcon', name: "Golden Falcon", category: "relic", weight: 1.5, attributeClass: 0, allowedAttributes: [] },
  { id: 'golden-skull', name: "Golden Skull", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'guardian-gem', name: "Guardian Gem", category: "relic", weight: 12.0, attributeClass: 0, allowedAttributes: [], bonuses: { shielding: 2 } },
  { id: 'helm-of-the-relentless', name: "Helm Of The Relentless", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'holy-falcon', name: "Holy Falcon", category: "relic", weight: 8.4, attributeClass: 0, allowedAttributes: [], bonuses: { speed: 10, 'dmg-fire': 5 } },
  { id: 'holy-scarab', name: "Holy Scarab", category: "relic", weight: 5.0, armor: 1, attributeClass: 0, allowedAttributes: [], protections: { earth: 0.02 } },
  { id: 'horse-breaker', name: "Horse Breaker", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'hunting-horn', name: "Hunting Horn", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'imortus', name: "Imortus", category: "relic", weight: 2.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'iron-defiance', name: "Iron Defiance", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'jade-pendant', name: "Jade Pendant", category: "relic", weight: 26.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'marksman-gem', name: "Marksman Gem", category: "relic", weight: 12.0, attributeClass: 0, allowedAttributes: [], bonuses: { distance: 2 } },
  { id: 'medusas-head', name: "Medusa's Head", category: "relic", weight: 4.5, attributeClass: 0, allowedAttributes: [] },
  { id: 'minotaur-totem', name: "Minotaur Totem", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'mystic-mask', name: "Mystic Mask", category: "relic", weight: 3.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'necromancer-book', name: "Necromancer Book", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'nightmare-beast-santa', name: "Nightmare Beast Santa", category: "relic", weight: 6.5, attributeClass: 0, allowedAttributes: [] },
  { id: 'nightmare-horn', name: "Nightmare Horn", category: "relic", weight: 1.5, attributeClass: 0, allowedAttributes: [] },
  { id: 'nose-ring', name: "Nose Ring", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'percht-head', name: "Percht Head", category: "relic", weight: 2.5, attributeClass: 0, allowedAttributes: [], bonuses: { 'life-leech-chance': 5, 'life-leech-amount': 7 } },
  { id: 'phantom-visage', name: "Phantom Visage", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'radiance-lamp', name: "Radiance Lamp", category: "relic", weight: 2.5, attributeClass: 0, allowedAttributes: [] },
  { id: 'ravagers-eye', name: "Ravager's Eye", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'reins', name: "Reins", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'sage-gem', name: "Sage Gem", category: "relic", weight: 12.0, attributeClass: 0, allowedAttributes: [], bonuses: { sword: 2, axe: 2, club: 2 } },
  { id: 'scorpion-sceptre', name: "Scorpion Sceptre", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'sentinel-eye', name: "Sentinel Eye", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'shamanic-totem', name: "Shamanic Totem", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'skull-hunter', name: "Skull Hunter", category: "relic", weight: 10.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'spiritualist-gem', name: "Spiritualist Gem", category: "relic", weight: 12.0, attributeClass: 0, allowedAttributes: [], bonuses: { magic: 2 } },
  { id: 'strength-bracelet', name: "Strength Bracelet", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [], bonuses: { attack: 1 } },
  { id: 'suncaller-stone', name: "Suncaller Stone", category: "relic", weight: 15.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'tomb-mask', name: "Tomb Mask", category: "relic", weight: 2.5, attributeClass: 0, allowedAttributes: [], bonuses: { 'attack-interval': -2, dodge: 1 } },
  { id: 'triad-of-death', name: "Triad Of Death", category: "relic", weight: 22.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'triad-of-dominion', name: "Triad Of Dominion", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [], bonuses: { sword: 2, axe: 2, club: 2 } },
  { id: 'tribal-crest', name: "Tribal Crest", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'vulcanic-lion', name: "Vulcanic Lion", category: "relic", weight: 10.0, attributeClass: 0, allowedAttributes: [] },
  { id: 'warlocks-brain', name: "Warlock's Brain", category: "relic", weight: 1.8, attributeClass: 0, allowedAttributes: [], bonuses: { momentum: 3 } },
  { id: 'zoralurks-claw', name: "Zoralurk's Claw", category: "relic", weight: 20.0, attributeClass: 0, allowedAttributes: [] }
];

const FOODS: GameItem[] = [
  { id: 'dragon-ham', name: "Dragon Ham", category: "food", weight: 4.0, attributeClass: 0, allowedAttributes: [], bonuses: { regen: 6 } },
  { id: 'ham', name: "Ham", category: "food", weight: 3.0, attributeClass: 0, allowedAttributes: [], bonuses: { regen: 4 } },
  { id: 'meat', name: "Meat", category: "food", weight: 2.0, attributeClass: 0, allowedAttributes: [], bonuses: { regen: 3 } },
  { id: 'brown-mushroom', name: "Brown Mushroom", category: "food", weight: 0.2, attributeClass: 0, allowedAttributes: [], bonuses: { regen: 2 } },
  { id: 'egg', name: "Egg", category: "food", weight: 0.1, attributeClass: 0, allowedAttributes: [], bonuses: { regen: 1 } }
];

// Combine all items into a single legendary database
export const ALL_BUILD_ITEMS: GameItem[] = [
  ...GENERATED_ITEMS,
  ...RINGS,
  ...AMULETS,
  ...BACKPACKS,
  ...RELICS,
  ...FOODS
];

// Enrich ALL_BUILD_ITEMS with images from LOCAL_ITEM_IMAGES first, then ALL_ITEM_IMAGES
ALL_BUILD_ITEMS.forEach(item => {
  const lowerName = item.name.toLowerCase();
  if (LOCAL_ITEM_IMAGES[lowerName]) {
    item.img = LOCAL_ITEM_IMAGES[lowerName];
  } else if (ALL_ITEM_IMAGES[lowerName]) {
    item.img = ALL_ITEM_IMAGES[lowerName];
  } else {
    // Construct default URL: Capitalize words, replace space with underscore
    const formatted = item.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_');
    item.img = `https://res.cloudinary.com/dc4nkbnkg/image/upload/${formatted}.gif`;
  }
});
