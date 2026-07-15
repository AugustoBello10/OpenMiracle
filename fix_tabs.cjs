const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetTab = `{ id: 'calculadoras', label: t('calculators'), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/buildmaker.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Build Maker" /> },`;
const newTab = `{ id: 'calculadoras', label: t('calculators'), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Calculadoras" /> },`;

content = content.replace(targetTab, newTab);

fs.writeFileSync('src/App.tsx', content);

