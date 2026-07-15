const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// I will just locate "    return (\n          const isFerramentas"
const target = "    return (\n          const isFerramentas";
const idx = content.indexOf(target);
if (idx !== -1) {
    const endLogic = content.indexOf("{isWiki && (<div className=\"flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']\">");
    if (endLogic !== -1) {
        const fullBad = content.substring(idx, endLogic + "{isWiki && (<div className=\"flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']\">".length);
        const logicStr = "    const isFerramentas = ['calculadoras', 'buildmaker', 'loot', 'profissoes'].includes(activeTab);\n    const isWiki = ['wiki', 'mapa', 'eventos'].includes(activeTab);\n    const isHunts = ['hunts'].includes(activeTab);\n";
        const goodStr = logicStr + "    return (\n      <div className=\"flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']\">\n";
        content = content.replace(fullBad, goodStr);
        fs.writeFileSync('src/App.tsx', content);
    }
}
