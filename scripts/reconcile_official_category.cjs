/**
 * Reconciles a category's official JSON snapshot against:
 * 1. src/data/miracle/items.json
 * 2. src/data/wikiData.ts
 * 3. src/data/buildItems.ts
 */
const fs = require('fs');
const path = require('path');

const category = process.argv[2];
if (!category) {
  console.error("Usage: node reconcile_official_category.cjs <category>");
  process.exit(1);
}

const officialPath = path.resolve(__dirname, `../src/data/miracle/official/${category}.json`);
if (!fs.existsSync(officialPath)) {
  console.error(`Official file not found: ${officialPath}`);
  process.exit(1);
}

const officialItems = JSON.parse(fs.readFileSync(officialPath, 'utf8'));
const officialMap = new Map();
officialItems.forEach(item => {
  officialMap.set(item.name.toLowerCase().trim(), item);
});

console.log(`Loaded ${officialItems.length} official items for category "${category}".`);

// 1. UPDATE src/data/miracle/items.json
const itemsPath = path.resolve(__dirname, '../src/data/miracle/items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

let updatedCount = 0;
let strippedAttributionCount = 0;

items.forEach(item => {
  if (item.category === category) {
    const off = officialMap.get(item.name.toLowerCase().trim());
    if (off) {
      if (off.armor !== undefined) item.armor = off.armor;
      if (off.weight !== undefined) item.weight = off.weight;
      if (off.class !== undefined) item.tierClass = off.class === 0 ? null : off.class;
      if (off.attack !== undefined) item.attack = off.attack;
      if (off.defense !== undefined) item.defense = off.defense;
      if (off.hands !== undefined) item.hands = off.hands;
      if (off.range !== undefined) item.range = off.range;
      if (off.hitPercent !== undefined) item.hitPercent = off.hitPercent;
      if (off.breakChance !== undefined) item.breakChance = off.breakChance;

      // ATTRIBUTION CHECK
      if (off.hasEmberRune === false) {
        if (item.attributes && item.attributes.length > 0) {
          console.log(`[Attribution Stripped] ${item.name} has no Ember Rune on official site. Stripping ${item.attributes.length} attributes.`);
          item.attributes = [];
          strippedAttributionCount++;
        }
      }
      updatedCount++;
    }
  }
});

fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf8');
console.log(`Updated ${updatedCount} items in items.json (Stripped ${strippedAttributionCount} non-attributed items).`);

// 2. UPDATE src/data/wikiData.ts (ATTRIBUTE_DATA)
const nonAttributedNames = officialItems.filter(i => !i.hasEmberRune).map(i => i.name.toLowerCase().trim());
const wikiDataPath = path.resolve(__dirname, '../src/data/wikiData.ts');
let wikiData = fs.readFileSync(wikiDataPath, 'utf8');

let removedFromWiki = 0;
nonAttributedNames.forEach(name => {
  // Regex to remove the item object from ATTRIBUTE_DATA
  const regex = new RegExp(`\\s*\\{\\s*\\n?\\s*\"name\":\\s*\"${name}\"[\\s\\S]*?\\},?`, 'gi');
  if (regex.test(wikiData)) {
    wikiData = wikiData.replace(regex, '');
    removedFromWiki++;
    console.log(`[WikiData Cleaned] Removed non-attributed item "${name}" from ATTRIBUTE_DATA.`);
  }
});
fs.writeFileSync(wikiDataPath, wikiData, 'utf8');

// 3. UPDATE src/data/buildItems.ts
const buildItemsPath = path.resolve(__dirname, '../src/data/buildItems.ts');
let buildItems = fs.readFileSync(buildItemsPath, 'utf8');

let removedFromBuild = 0;
nonAttributedNames.forEach(name => {
  const regex = new RegExp(`\\s*\\{\\s*\\n?\\s*\"name\":\\s*\"${name}\"[\\s\\S]*?\\},?`, 'gi');
  if (regex.test(buildItems)) {
    buildItems = buildItems.replace(regex, '');
    removedFromBuild++;
    console.log(`[BuildItems Cleaned] Removed non-attributed item "${name}" from ATTRIBUTE_DATA_STUB.`);
  }
});

// Update ITEM_BASE_STATS in buildItems.ts
officialItems.forEach(off => {
  const statRegex = new RegExp(`\"${off.name}\":\\s*\\{[^\\}]*\\}`, 'g');
  let statBlock = `"${off.name}": {\n`;
  if (off.armor !== undefined && off.armor !== null) statBlock += `    "armor": ${off.armor},\n`;
  if (off.attack !== undefined && off.attack !== null) statBlock += `    "attack": ${off.attack},\n`;
  if (off.defense !== undefined && off.defense !== null) statBlock += `    "defense": ${off.defense},\n`;
  if (off.weight !== undefined && off.weight !== null) statBlock += `    "weight": ${off.weight}\n`;
  statBlock = statBlock.replace(/,\n$/, '\n') + `  }`;

  if (buildItems.match(statRegex)) {
    buildItems = buildItems.replace(statRegex, statBlock);
  }
});

fs.writeFileSync(buildItemsPath, buildItems, 'utf8');
console.log(`[Reconcile Complete] Cleaned ${removedFromWiki} from wikiData.ts and ${removedFromBuild} from buildItems.ts.`);
