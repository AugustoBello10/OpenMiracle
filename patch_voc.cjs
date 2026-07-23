const fs = require('fs');
let code = fs.readFileSync('src/components/SkillCalculator.tsx', 'utf8');

code = code.replace(
  "import { VOC_SPELLS } from '../data/constants';",
  `const VOC_SPELLS: Record<string, { name: string; mana: number }[]> = {
  Sorcerer: [
    { name: 'Light Healing (exura)', mana: 20 },
    { name: 'Intense Healing (exura gran)', mana: 70 },
    { name: 'Great Fireball (adori gran flam)', mana: 120 },
    { name: 'Heavy Magic Missile (adori gran)', mana: 70 },
    { name: 'Sudden Death (adori vita vis)', mana: 220 },
    { name: 'Ultimate Healing (exura vita)', mana: 160 }
  ],
  Druid: [
    { name: 'Light Healing (exura)', mana: 20 },
    { name: 'Intense Healing (exura gran)', mana: 70 },
    { name: 'Ultimate Healing Rune (adura vita)', mana: 400 },
    { name: 'Heavy Magic Missile (adori gran)', mana: 70 },
    { name: 'Ultimate Healing (exura vita)', mana: 160 }
  ],
  Paladin: [
    { name: 'Light Healing (exura)', mana: 20 },
    { name: 'Intense Healing (exura gran)', mana: 70 },
    { name: 'Ultimate Healing (exura vita)', mana: 160 }
  ],
  Knight: []
};`
);

fs.writeFileSync('src/components/SkillCalculator.tsx', code);
