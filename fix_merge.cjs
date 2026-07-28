const fs = require('fs');
let text = fs.readFileSync('src/components/MapViewer.tsx', 'utf-8');

text = text.replace(
  /const mergedMap = new Map<string, Respawn>\(\);\s*RESPAWNS\.forEach\(r => mergedMap\.set\(r\.id, r\)\);\s*data\.forEach\(\(item: any\) => \{\s*mergedMap\.set\(item\.id, \{\s*\.\.\.item,\s*categories: fixCategories\(item\.categories, item\.name \|\| ''\)\s*\}\);\s*\}\);\s*setLocalRespawns\(Array\.from\(mergedMap\.values\(\)\)\);/m,
  `const processed = data.map((item: any) => ({
            ...item,
            categories: fixCategories(item.categories, item.name || '')
          }));
          setLocalRespawns(processed);`
);

fs.writeFileSync('src/components/MapViewer.tsx', text);
