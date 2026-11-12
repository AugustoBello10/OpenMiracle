const list = "Amazon, Ancient_Frozen_Dragon, Ancient_Scarab, Armored_Fire_Devil, Assassin, Azra'Gorath, Badger, Bandit, Banshee, Barbarian, Barbarian_Berserker, Barbarian_Brute, Barbarian_Dothraki, Barbarian_Guard, Bat, Bear, Behemoth, Beholder, Black_Crystal, Black_Knight, Black_Sheep, Blue_Djinn, Bonebeast, Bug, Cave_Rat, Centipede, Cobra, Corrupted_Ice_Spider, Crypt_Shambler, Cyclops, Cyclops_Warrior, Dark_Frozen_Monk, Dark_Magician, Dark_Monk, Dark_Wraith, Death_Beholder, Deathslicer, Deer, Demon, Demon_Skeleton, Demongoblin, Dog, Dragon, Dragon_Lord, Dwarf, Dwarf_Cavebomb, Dwarf_Geomancer, Dwarf_Guard, Dwarf_Lord, Dwarf_Miner, Dwarf_Reaver, Dwarf_Smith, Dwarf_Soldier, Dwarf_Tyrant, Efreet, Elder_Beholder, Elf, Elf_Arcanist, Elf_Scout, Enslaved_Dwarf, Fire_Devil, Fire_Elemental, Flamethrower, Frost_Bug, Frost_Elf_Assassin, Frost_Elf_Sorcerer, Frost_Elf_Strider, Frost_Elf_Warrior, Frost_Spider, Frost_Troll, Frost_Walk_er_Reaper, Frost_Walker_Savage, Frost_Walker_Shaman, Frost_Walk_er_Wraith, Frozen_Behemoth, Frozen_Overlord, Gargoyle, Gazer, Ghost, Ghoul, Giant_Crystal_Spider, Giant_Spider, Glacial_Dragon, Goblin, Green_Djinn, Hero, Hunter, Hyaena, Hydra, Ice_Colossus, Ice_Demon_Spider, Ice_Elemental, Ice_Golem, Ice_Witch, Infernalist, Kraglin, Kraglin_Archer, Kraglin_Berserker, Kraglin_Shaman, Larva, Lava_Golem, Lich, Lion, Lost_Berserker, Magicthrower, Marid, Mimic, Minotaur, Minotaur_Archer, Minotaur_Champion, Minotaur_Executioner, Minotaur_Guard, Minotaur_Mage, Monk, Morgrothuar, Mummy, Necromancer, Orc, Orc_Beastmaster, Orc_Berserker, Orc_Dragon_Rider, Orc_Leader, Orc_Pyromancer, Orc_Rider, Orc_Shaman, Orc_Spearman, Orc_Warlord, Orc_Warrior, Pig, Plaguethrower, Poison_Spider, Polar_Bear, Priestess, Rabbit, Rat, Rotworm, Scarab, Scorpion, Sealed_Golem, Sheep, Shredderthrower, Skeleton, Skeleton_Archmage, Skeleton_Guard, Skunk, Slime, Smuggler, Snake, Snow_Hunter, Spider, Spiked_Hero, Stalker, Stone_Golem, Swamp_Troll, Tarantula, Troll, Valkyrie, Valkyrie_Warden, Vampire, War_Wolf, Warlock, Wasp, White_Knight, White_Lion, Wild_Warrior, Winter_Dragon, Winter_War_Wolf, Winter_Wolf, Witch, Wolf, Yeti";

const monsters = list.split(',').map(m => m.trim());
const animTraps = ['Black_Crystal', 'Flamethrower', 'Magicthrower', 'Plaguethrower', 'Shredderthrower'];

const output = [];

for (const m of monsters) {
    let filename = m;
    let ext = '.png';
    if (filename.includes('.')) {
        ext = '';
    } else if (animTraps.includes(filename)) {
        ext = '.gif';
    }
    const name = m.replace(/_/g, ' ');
    const url = `https://res.cloudinary.com/dc4nkbnkg/image/upload/${filename}${ext}`;
    
    output.push({ name, image: url, categories: ['Monstros'] });
}

console.log(JSON.stringify(output, null, 2));
