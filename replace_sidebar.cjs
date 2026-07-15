const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
const newSidebar = fs.readFileSync('sidebar.tsx', 'utf-8');

const start = content.indexOf('  const renderSidebarContent = (isMobile = false) => {');
const end = content.indexOf('  return (\n    <div className="min-h-screen flex flex-col bg-[#0f0f0f]">');

content = content.slice(0, start) + newSidebar + '\n' + content.slice(end);
fs.writeFileSync('src/App.tsx', content);

