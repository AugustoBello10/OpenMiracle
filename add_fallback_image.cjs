const fs = require('fs');
let buildItems = fs.readFileSync('src/data/buildItems.ts', 'utf8');

const replacement = `
ALL_BUILD_ITEMS.forEach(item => {
  const lowerName = item.name.toLowerCase();
  if (ALL_ITEM_IMAGES[lowerName]) {
    item.img = ALL_ITEM_IMAGES[lowerName];
  } else {
    // Construct default URL: Capitalize words, replace space with underscore
    const formatted = item.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('_');
    item.img = \`https://res.cloudinary.com/dc4nkbnkg/image/upload/\${formatted}.gif\`;
  }
});
`;

buildItems = buildItems.replace(/ALL_BUILD_ITEMS\.forEach\(item => \{[\s\S]*?\}\);/, replacement.trim());
fs.writeFileSync('src/data/buildItems.ts', buildItems);
console.log('Added default fallback');
