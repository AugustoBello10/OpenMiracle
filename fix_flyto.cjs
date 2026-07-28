const fs = require('fs');
let code = fs.readFileSync('src/components/MapViewer.tsx', 'utf8');

code = code.replace(
  /const \[flyToPos, setFlyToPos\] = useState<\[number, number\] \| null>\(null\);/,
  `const [flyToPos, setFlyToPos] = useState<[number, number] | null>(null);
  const [flyToZoom, setFlyToZoom] = useState<number>(hasInitialPos ? initialZoom : 2);`
);

code = code.replace(
  /setFlyToPos\(\[-reg\.center\.y, reg\.center\.x\]\);/g,
  `setFlyToPos([-reg.center.y, reg.center.x]);
      setFlyToZoom(3);`
);

code = code.replace(
  /<MapFlyTo center=\{flyToPos\} zoom=\{hasInitialPos \? initialZoom : 0\} \/>/,
  `<MapFlyTo center={flyToPos} zoom={flyToZoom} />`
);

fs.writeFileSync('src/components/MapViewer.tsx', code);
console.log("Fixed fly to zoom.");
