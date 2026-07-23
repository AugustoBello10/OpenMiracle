const fs = require('fs');
let content = fs.readFileSync('src/components/BuildMakerView.tsx', 'utf8');

if (!content.includes("ItemImage")) {
  content = content.replace("import { InventorySlot } from './BuildMaker/InventorySlot';", "import { InventorySlot } from './BuildMaker/InventorySlot';\nimport { ItemImage } from './ItemImage';");
}

const replacement = `
                  {item.img ? (
                    <ItemImage item={item} className="w-12 h-12 object-contain select-none" />
                  ) : (
`;

content = content.replace(/\{\s*item\.img \? \(\s*<img src=\{item\.img\} alt=\{item\.name\} className="w-12 h-12 object-contain select-none" referrerPolicy="no-referrer" \/>\s*\) : \(/g, replacement.trim());

fs.writeFileSync('src/components/BuildMakerView.tsx', content);
console.log('Fixed BuildMakerView.tsx');
