const fs = require('fs');

// 1. Remove the double prefix in App.tsx
let appTsx = fs.readFileSync('src/App.tsx', 'utf8');
appTsx = appTsx.replace(
  /src=\{\`https:\/\/res\.cloudinary\.com\/dc4nkbnkg\/image\/upload\/\$\{HELMETS_DATA\.find\(h => h\.name === attrItemName\)\?\.image\}\`\}/g,
  'src={HELMETS_DATA.find(h => h.name === attrItemName)?.image}'
);
appTsx = appTsx.replace(
  /src=\{\`https:\/\/res\.cloudinary\.com\/dc4nkbnkg\/image\/upload\/\$\{helmet\.image\}\`\}/g,
  'src={helmet.image}'
);
fs.writeFileSync('src/App.tsx', appTsx);

// 2. Remove the double prefix in buildItems.ts
let buildItems = fs.readFileSync('src/data/buildItems.ts', 'utf8');
buildItems = buildItems.replace(
  /imgPath = \`https:\/\/res\.cloudinary\.com\/dc4nkbnkg\/image\/upload\/\$\{match\.image\}\`;/g,
  'imgPath = match.image;'
);
fs.writeFileSync('src/data/buildItems.ts', buildItems);

console.log('Fixed double urls');
