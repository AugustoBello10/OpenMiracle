const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const strToFind = "{isWiki && (<div className=\"flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']\">";
content = content.replace(strToFind, "return (\n      <div className=\"flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']\">\n");

fs.writeFileSync('src/App.tsx', content);
