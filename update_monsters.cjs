const fs = require('fs');

const monstersOut = JSON.parse(fs.readFileSync('monsters_out.json', 'utf8'));

const content = fs.readFileSync('src/data/respawns.ts', 'utf8');

const predefinedStr = `export interface PredefinedMonster {
  name: string;
  image: string;
  categories?: string[];
}

export const PREDEFINED_MONSTERS: PredefinedMonster[] = ${JSON.stringify(monstersOut, null, 2)};
`;

fs.writeFileSync('src/data/respawns.ts', predefinedStr + '\n' + content);
