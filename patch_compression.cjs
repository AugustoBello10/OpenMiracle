const fs = require('fs');

let viewer = fs.readFileSync('src/components/MapViewer.tsx', 'utf-8');

if (!viewer.includes("import LZString")) {
  viewer = viewer.replace(
    /import \{ db \} from '\.\.\/lib\/firebase';/,
    `import { db } from '../lib/firebase';\nimport LZString from 'lz-string';`
  );
}

viewer = viewer.replace(
  /const unsub = onSnapshot\(doc\(db, 'map_config', 'respawns'\), \(docSnap\) => \{\s*if \(docSnap\.exists\(\)\) \{\s*const rawData = docSnap\.data\(\)\.dataStr;\s*if \(rawData\) \{\s*try \{\s*const data = JSON\.parse\(rawData\);\s*if \(Array\.isArray\(data\) && data\.length > 0\) \{\s*const processed = data\.map\(\(item: any\) => \(\{\s*\.\.\.item,\s*categories: fixCategories\(item\.categories, item\.name \|\| ''\)\s*\}\)\);\s*setLocalRespawns\(processed\);\s*\}\s*\}\s*catch \(e\) \{\s*console\.error\("Failed to parse respawns string from DB:", e\);\s*\}\s*\}\s*\}\s*\}\);/m,
  `const unsub = onSnapshot(doc(db, 'map_config', 'respawns'), (docSnap) => {
      if (docSnap.exists()) {
        const docData = docSnap.data();
        const rawData = docData.dataStr;
        const compressedData = docData.dataCompressed;
        
        let dataToParse = null;
        if (compressedData) {
          dataToParse = LZString.decompressFromUTF16(compressedData);
        } else if (rawData) {
          dataToParse = rawData;
        }

        if (dataToParse) {
          try {
            const data = JSON.parse(dataToParse);
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

if (!editor.includes("import LZString")) {
  editor = editor.replace(
    /import OTMMConverter from '\.\/OTMMConverter';/,
    `import OTMMConverter from './OTMMConverter';\nimport LZString from 'lz-string';`
  );
}

editor = editor.replace(
  /await setDoc\(doc\(db, 'map_config', 'respawns'\), \{ dataStr: JSON\.stringify\(localRespawns\) \}\);/m,
  `const jsonStr = JSON.stringify(localRespawns);
      const compressed = LZString.compressToUTF16(jsonStr);
      await setDoc(doc(db, 'map_config', 'respawns'), { dataCompressed: compressed });`
);

fs.writeFileSync('src/components/MapEditorPanel.tsx', editor);

