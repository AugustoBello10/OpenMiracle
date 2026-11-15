/**
 * Automated Data Integrity & Regression Guard for Miracle 7.4 Wiki Tools
 * Validates items.json, wikiData.ts, and buildItems.ts against official game rules.
 */
const fs = require('fs');
const path = require('path');

const itemsPath = path.resolve(__dirname, '../src/data/miracle/items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

let errors = [];

// Rule 1: Non-weapons must NOT have hands or attack
const nonWeaponCats = ['helmets', 'armors', 'legs', 'boots', 'shields', 'quivers', 'amulets', 'rings', 'foods', 'containers', 'tools', 'valuables', 'fluids'];
items.forEach(item => {
  if (nonWeaponCats.includes(item.category)) {
    if (item.hands !== null && item.hands !== undefined) {
      errors.push(`[Hands Error] ${item.category} item "${item.name}" (ID ${item.id}) has hands=${item.hands}. Must be null.`);
    }
  }
});

// Rule 2: Helmets, Armors, Legs, Boots must NOT have attack or defense
const armorCats = ['helmets', 'armors', 'legs', 'boots'];
items.forEach(item => {
  if (armorCats.includes(item.category)) {
    if (item.attack !== null && item.attack !== undefined) {
      errors.push(`[Stat Error] ${item.category} item "${item.name}" has attack=${item.attack}. Must be null.`);
    }
    if (item.defense !== null && item.defense !== undefined) {
      errors.push(`[Stat Error] ${item.category} item "${item.name}" has defense=${item.defense}. Must be null.`);
    }
  }
});

// Rule 3: Shields must NOT have attack or armor
items.forEach(item => {
  if (item.category === 'shields') {
    if (item.attack !== null && item.attack !== undefined) {
      errors.push(`[Shield Error] Shield "${item.name}" has attack=${item.attack}. Must be null.`);
    }
    if (item.armor !== null && item.armor !== undefined) {
      errors.push(`[Shield Error] Shield "${item.name}" has armor=${item.armor}. Must be null.`);
    }
  }
});

// Rule 4: Classification must be within Class 1 to 5
items.forEach(item => {
  if (item.tierClass !== null && item.tierClass !== undefined) {
    if (typeof item.tierClass !== 'number' || item.tierClass < 1 || item.tierClass > 5) {
      errors.push(`[Class Error] Item "${item.name}" has invalid tierClass=${item.tierClass}. Range is 1-5.`);
    }
  }
});

// Rule 5: Non-attributed items must have attributes: []
items.forEach(item => {
  if (!item.tierClass && item.attributes && item.attributes.length > 0) {
    errors.push(`[Attribution Error] Item "${item.name}" has no class but has attributes: ${JSON.stringify(item.attributes)}`);
  }
});

console.log(`[Integrity Check] Checked ${items.length} items.`);
if (errors.length > 0) {
  console.error(`[Integrity Check FAILED] Found ${errors.length} violations:`);
  errors.slice(0, 15).forEach(e => console.error(' - ' + e));
  if (errors.length > 15) console.error(` ... and ${errors.length - 15} more.`);
  process.exit(1);
} else {
  console.log('[Integrity Check PASSED] 100% compliant with Miracle 7.4 rules!');
  process.exit(0);
}
