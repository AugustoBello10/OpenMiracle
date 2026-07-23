const fs = require('fs');
let content = fs.readFileSync('src/components/BuildMaker/InventorySlot.tsx', 'utf8');

if (!content.includes("ItemImage")) {
  content = content.replace("import { LucideIcon } from 'lucide-react';", "import { LucideIcon } from 'lucide-react';\nimport { ItemImage } from '../ItemImage';");
}

const replacement = `
          {item.img ? (
            <ItemImage item={item} className="w-10 h-10 object-contain select-none scale-105" />
          ) : (
`;

content = content.replace(/\{\s*item\.img \? \(\s*<img src=\{item\.img\} alt=\{item\.name\} className="w-10 h-10 object-contain select-none scale-105" referrerPolicy="no-referrer" \/>\s*\) : \(/g, replacement.trim());

fs.writeFileSync('src/components/BuildMaker/InventorySlot.tsx', content);
console.log('Fixed InventorySlot.tsx');
