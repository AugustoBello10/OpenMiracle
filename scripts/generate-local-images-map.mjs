import fs from 'fs';

const files = fs.readdirSync('public/images/miracle/items');
console.log('Total local item images:', files.length);

const content = fs.readFileSync('src/data/buildItems.ts', 'utf8');
const names = Array.from(content.matchAll(/name:\s*["']([^"']+)["']/g)).map(m => m[1]);

const localMap = {};

for (const rawName of names) {
  const name = rawName.trim();
  const lowerName = name.toLowerCase();
  
  // 1. Exact match with underscore
  const slugUnderscore = lowerName.replace(/['’]/g, '').replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_');
  let found = files.find(f => {
    const withoutExt = f.replace(/\.[^.]+$/, '');
    const withoutId = withoutExt.replace(/_\d+$/, '');
    return withoutId.toLowerCase() === slugUnderscore || withoutExt.toLowerCase() === slugUnderscore;
  });

  // 2. Exact match clean alphanumeric
  if (!found) {
    const cleanAlpha = lowerName.replace(/[^a-z0-9]/g, '');
    found = files.find(f => {
      const fClean = f.replace(/\.[^.]+$/, '').replace(/_\d+$/, '').replace(/[^a-z0-9]/g, '');
      return fClean === cleanAlpha;
    });
  }

  // 3. Fallback: starts with slug
  if (!found) {
    found = files.find(f => f.toLowerCase().startsWith(slugUnderscore + '_'));
  }

  if (found) {
    localMap[lowerName] = `/images/miracle/items/${found}`;
  } else {
    console.log('Still unmatched:', name);
  }
}

// Special fixes
if (files.includes('ham_2671.gif')) localMap['ham'] = '/images/miracle/items/ham_2671.gif';
if (files.includes('dragon_ham_2672.gif')) localMap['dragon ham'] = '/images/miracle/items/dragon_ham_2672.gif';
if (files.includes('demons_heart_7523.gif')) localMap["demon's heart"] = '/images/miracle/items/demons_heart_7523.gif';
if (files.includes('beholders_book_7526.gif')) localMap["beholder's book"] = '/images/miracle/items/beholders_book_7526.gif';
if (files.includes('dragon_lords_eye_7530.gif')) localMap["dragon lord's eye"] = '/images/miracle/items/dragon_lords_eye_7530.gif';
if (files.includes('medusas_head_7520.gif')) localMap["medusa's head"] = '/images/miracle/items/medusas_head_7520.gif';
if (files.includes('ravagers_eye_10257.gif')) localMap["ravager's eye"] = '/images/miracle/items/ravagers_eye_10257.gif';
if (files.includes('warlocks_brain_7546.gif')) localMap["warlock's brain"] = '/images/miracle/items/warlocks_brain_7546.gif';
if (files.includes('zoralurks_claw_8500.gif')) localMap["zoralurk's claw"] = '/images/miracle/items/zoralurks_claw_8500.gif';

fs.writeFileSync('src/data/localItemImages.ts', `// Auto-generated mapping of Miracle items to local scraped images
export const LOCAL_ITEM_IMAGES: Record<string, string> = ${JSON.stringify(localMap, null, 2)};
`);
console.log('Generated src/data/localItemImages.ts successfully!');
