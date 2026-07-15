const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const logic = `    const isFerramentas = ['calculadoras', 'buildmaker', 'loot', 'profissoes'].includes(activeTab);
    const isWiki = ['wiki', 'mapa', 'eventos'].includes(activeTab);
    const isHunts = ['hunts'].includes(activeTab);`;

// remove the injected logic from inside return
content = content.replace(`    return (\n      ${logic}`, `    ${logic}\n\n    return (\n      <div className="flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']">\n`);

// Ah wait, it was:
// return (
//     const isFerramentas...
// {isWiki && (<div className="flex flex-col...

// Let's just do a string replace
const badText = `    return (\n      ${logic}\n{isWiki && (<div className="flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']">`;
const goodText = `${logic}\n    return (\n      <div className="flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']">\n`;

content = content.replace(badText, goodText);

fs.writeFileSync('src/App.tsx', content);

