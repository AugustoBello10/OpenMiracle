const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Find the start of renderSidebarContent
const funcStart = content.indexOf('const renderSidebarContent = (isMobile = false) => {');

// Find where the first div of the sidebar content starts: <div className="flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']">
const divStart = content.indexOf('<div className="flex flex-col gap-4 text-left select-none pb-12 font-[\'DotGothic16\']">', funcStart);

const logic = `
    const isFerramentas = ['calculadoras', 'buildmaker', 'loot', 'profissoes'].includes(activeTab);
    const isWiki = ['wiki', 'mapa', 'eventos'].includes(activeTab);
    const isHunts = ['hunts'].includes(activeTab);
`;

content = content.slice(0, divStart) + logic + content.slice(divStart);

fs.writeFileSync('src/App.tsx', content);

