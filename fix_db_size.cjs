const fs = require('fs');
let viewer = fs.readFileSync('src/components/MapViewer.tsx', 'utf-8');

viewer = viewer.replace(
  /const unsub = onSnapshot\(doc\(db, 'map_config', 'respawns'\), \(docSnap\) => \{\s*if \(docSnap\.exists\(\)\) \{\s*const data = docSnap\.data\(\)\.data;\s*if \(Array\.isArray\(data\) && data\.length > 0\) \{\s*const processed = data\.map\(\(item: any\) => \(\{\s*\.\.\.item,\s*categories: fixCategories\(item\.categories, item\.name \|\| ''\)\s*\}\)\);\s*setLocalRespawns\(processed\);\s*\}\s*\}\s*\}\);/m,
  `const unsub = onSnapshot(doc(db, 'map_config', 'respawns'), (docSnap) => {
      if (docSnap.exists()) {
        const rawData = docSnap.data().dataStr;
        if (rawData) {
          try {
            const data = JSON.parse(rawData);
            if (Array.isArray(data) && data.length > 0) {
              const processed = data.map((item: any) => ({
                ...item,
                categories: fixCategories(item.categories, item.name || '')
              }));
              setLocalRespawns(processed);
            }
          } catch (e) {
            console.error("Failed to parse respawns string from DB:", e);
          }
        }
      }
    });`
);
fs.writeFileSync('src/components/MapViewer.tsx', viewer);

let editor = fs.readFileSync('src/components/MapEditorPanel.tsx', 'utf-8');

editor = editor.replace(
  /await setDoc\(doc\(db, 'map_config', 'respawns'\), \{ data: localRespawns \}\);/m,
  `await setDoc(doc(db, 'map_config', 'respawns'), { dataStr: JSON.stringify(localRespawns) });`
);

fs.writeFileSync('src/components/MapEditorPanel.tsx', editor);

