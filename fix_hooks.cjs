const fs = require('fs');
let code = fs.readFileSync('src/components/MapViewer.tsx', 'utf8');

code = code.replace(
  /  if \(zoom < 0\) \{\s*return null;\s*\}/,
  ""
);

code = code.replace(
  /  return \(\s*<>\s*\{respawnsGrouped\.map/,
  `  if (zoom < 0) {
    return null;
  }

  return (
    <>
      {respawnsGrouped.map`
);

fs.writeFileSync('src/components/MapViewer.tsx', code);
console.log("Fixed hooks order");
