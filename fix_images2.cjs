const fs = require('fs');

let buildItems = fs.readFileSync('src/data/buildItems.ts', 'utf8');

buildItems = buildItems.replace(
  /imgPath = \`https:\/\/res\.cloudinary\.com\/dc4nkbnkg\/image\/upload\/v[0-9]+\/\$\{match\.img\}\`;/g,
  'imgPath = match.img;'
);

fs.writeFileSync('src/data/buildItems.ts', buildItems);

console.log('Fixed double urls for armor and legs');
