const fs = require('fs');
let code = fs.readFileSync('src/components/MapViewer.tsx', 'utf8');

code = code.replace(
  /if \(zoom <= 1\) \{/g,
  `if (zoom <= 2) {`
);

code = code.replace(
  /setFlyToZoom\(3\);/g,
  `setFlyToZoom(4);`
);

fs.writeFileSync('src/components/MapViewer.tsx', code);
console.log("Fixed zoom.");
