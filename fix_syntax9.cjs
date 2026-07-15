const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `{isWiki && (\n<div className="flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']">`;
const replacement = `return (\n<div className="flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']">`;

content = content.replace(target, replacement);

fs.writeFileSync('src/App.tsx', content);
