const fs = require('fs');

let buildItems = fs.readFileSync('src/data/buildItems.ts', 'utf8');

// We can map over ALL_BUILD_ITEMS at the end of the file and mutate it before export?
// Wait, ALL_BUILD_ITEMS is exported as a const array literal.
// We can just add a loop at the bottom of the file:
const patch = `
// Enrich ALL_BUILD_ITEMS with images from ALL_ITEM_IMAGES
ALL_BUILD_ITEMS.forEach(item => {
  const lowerName = item.name.toLowerCase();
  if (ALL_ITEM_IMAGES[lowerName]) {
    item.img = ALL_ITEM_IMAGES[lowerName];
  }
});
`;

if (!buildItems.includes("Enrich ALL_BUILD_ITEMS")) {
  fs.writeFileSync('src/data/buildItems.ts', buildItems + patch);
}
console.log('Enriched ALL_BUILD_ITEMS');
