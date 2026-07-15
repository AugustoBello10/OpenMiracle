const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// I will just use regex to remove "return (" and "{" ...
content = content.replace(/return \(\s*const isFerramentas/g, 'const isFerramentas');
content = content.replace(/\{isWiki && \(\<div className="flex flex-col gap-4 text-left select-none pb-12 font-\['DotGothic16'\]"\>/g, 'return (\n      <div className="flex flex-col gap-4 text-left select-none pb-12 font-[\'DotGothic16\']">\n');

fs.writeFileSync('src/App.tsx', content);

