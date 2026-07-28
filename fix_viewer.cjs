const fs = require('fs');
let text = fs.readFileSync('src/components/MapViewer.tsx', 'utf-8');

// The corrupted block starts from `const [localRespawns, setLocalRespawns] = useState<Respawn[]>(RESPAWNS);`
// down to `  });`
text = text.replace(
  /const \[localRespawns, setLocalRespawns\] = useState<Respawn\[\]>\(RESPAWNS\);[\s\S]*?    return RESPAWNS;\s*\}\);/m,
  `const [localRespawns, setLocalRespawns] = useState<Respawn[]>(RESPAWNS);`
);

fs.writeFileSync('src/components/MapViewer.tsx', text);
