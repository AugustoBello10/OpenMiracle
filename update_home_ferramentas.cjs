const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform" alt="Ferramentas" />`;
const newStr = `<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/guiadeprofissoes.gif" className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform" alt="Ferramentas" />`;

content = content.replace(targetStr, newStr);

fs.writeFileSync('src/App.tsx', content);

