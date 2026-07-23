const fs = require('fs');

let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

// Update VOC_SPELLS
const newVocSpells = `
const VOC_SPELLS: Record<string, { name: string; mana: number; isRune: boolean }[]> = {
  Sorcerer: [
    { name: "Animate Dead (300 mp)", mana: 300, isRune: true },
    { name: "Desintegrate (100 mp)", mana: 100, isRune: true },
    { name: "Destroy Field (60 mp)", mana: 60, isRune: true },
    { name: "Enchant Staff (80 mp)", mana: 80, isRune: true },
    { name: "Energy Field (80 mp)", mana: 80, isRune: true },
    { name: "Energy Wall (250 mp)", mana: 250, isRune: true },
    { name: "Energybomb (220 mp)", mana: 220, isRune: true },
    { name: "Explosion (180 mp)", mana: 180, isRune: true },
    { name: "Fire Field (60 mp)", mana: 60, isRune: true },
    { name: "Fire Wall (200 mp)", mana: 200, isRune: true },
    { name: "Fireball (60 mp)", mana: 60, isRune: true },
    { name: "Firebomb (150 mp)", mana: 150, isRune: true },
    { name: "Frost Magic Missile (90 mp)", mana: 90, isRune: true },
    { name: "Great Fireball (120 mp)", mana: 120, isRune: true },
    { name: "Heavy Magic Missile (70 mp)", mana: 70, isRune: true },
    { name: "Light Magic Missile (40 mp)", mana: 40, isRune: true },
    { name: "Magic Wall (250 mp)", mana: 250, isRune: true },
    { name: "Poison Field (50 mp)", mana: 50, isRune: true },
    { name: "Poison Wall (160 mp)", mana: 160, isRune: true },
    { name: "Soulfire (150 mp)", mana: 150, isRune: true },
    { name: "Sudden Death (220 mp)", mana: 220, isRune: true },
  ],
  Druid: [
    { name: "Animate Dead (300 mp)", mana: 300, isRune: true },
    { name: "Antidote Rune (50 mp)", mana: 50, isRune: true },
    { name: "Chameleon (150 mp)", mana: 150, isRune: true },
    { name: "Convince Creature (100 mp)", mana: 100, isRune: true },
    { name: "Desintegrate (100 mp)", mana: 100, isRune: true },
    { name: "Destroy Field (60 mp)", mana: 60, isRune: true },
    { name: "Energy Field (80 mp)", mana: 80, isRune: true },
    { name: "Energy Wall (250 mp)", mana: 250, isRune: true },
    { name: "Envenom (100 mp)", mana: 100, isRune: true },
    { name: "Explosion (180 mp)", mana: 180, isRune: true },
    { name: "Fire Field (60 mp)", mana: 60, isRune: true },
    { name: "Fire Wall (200 mp)", mana: 200, isRune: true },
    { name: "Fireball (60 mp)", mana: 60, isRune: true },
    { name: "Firebomb (150 mp)", mana: 150, isRune: true },
    { name: "Frost Magic Missile (90 mp)", mana: 90, isRune: true },
    { name: "Great Fireball (120 mp)", mana: 120, isRune: true },
    { name: "Heavy Magic Missile (70 mp)", mana: 70, isRune: true },
    { name: "Intense Healing Rune (60 mp)", mana: 60, isRune: true },
    { name: "Light Magic Missile (40 mp)", mana: 40, isRune: true },
    { name: "Paralyze (600 mp)", mana: 600, isRune: true },
    { name: "Poison Field (50 mp)", mana: 50, isRune: true },
    { name: "Poison Wall (160 mp)", mana: 160, isRune: true },
    { name: "Poisonbomb (130 mp)", mana: 130, isRune: true },
    { name: "Soulfire (150 mp)", mana: 150, isRune: true },
    { name: "Ultimate Healing Rune (100 mp)", mana: 100, isRune: true },
  ],
  Paladin: [
    { name: "Conjure Arrow (40 mp)", mana: 40, isRune: false },
    { name: "Conjure Bolt (70 mp)", mana: 70, isRune: false },
    { name: "Desintegrate (100 mp)", mana: 100, isRune: true },
    { name: "Destroy Field (60 mp)", mana: 60, isRune: true },
    { name: "Enchant Spear (120 mp)", mana: 120, isRune: false },
    { name: "Explosive Arrow (120 mp)", mana: 120, isRune: false },
    { name: "Fireball (60 mp)", mana: 60, isRune: true },
    { name: "Heavy Magic Missile (70 mp)", mana: 70, isRune: true },
    { name: "Light Magic Missile (40 mp)", mana: 40, isRune: true },
    { name: "Poisoned Arrow (70 mp)", mana: 70, isRune: false },
    { name: "Power Bolt (200 mp)", mana: 200, isRune: false },
  ]
};
`;

content = content.replace(/const VOC_SPELLS: Record<string, \{ name: string; mana: number \}\[\]> = \{[\s\S]*?Paladin: \[\{ name: "Heavy Magic Missile \(HMM\) - 70 mp", mana: 70 \}\],\n\};/, newVocSpells.trim());

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
