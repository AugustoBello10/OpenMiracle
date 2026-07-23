const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// We need to import ItemImage at the top
if (!content.includes("ItemImage")) {
  content = content.replace("import { ATTRIBUTE_DATA, HELMETS_DATA, EquipmentItem } from './data/items';", "import { ATTRIBUTE_DATA, HELMETS_DATA, EquipmentItem } from './data/items';\nimport { ItemImage } from './components/ItemImage';");
  if (!content.includes("ItemImage")) {
    // fallback if first replace fails
    content = content.replace("import { ALL_BUILD_ITEMS", "import { ItemImage } from './components/ItemImage';\nimport { ALL_BUILD_ITEMS");
  }
}

// In App.tsx, the structure is always:
// {item.img ? (
//   <img src={item.img} alt={item.name} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
// ) : (
//   <Icon className="w-5 h-5 text-medieval-gold/40 group-hover:text-medieval-gold/80 transition-colors" />
// )}

content = content.replace(/\{item\.img \? \(\s*<img src=\{item\.img\}[^>]*>\s*\) : \(\s*<[A-Za-z]+ className="w-5 h-5 text-medieval-gold\/40 group-hover:text-medieval-gold\/80 transition-colors" \/>\s*\)\}/g, '<ItemImage item={item} />');

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed App.tsx images');
