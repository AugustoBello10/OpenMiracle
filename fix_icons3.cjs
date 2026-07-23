const fs = require('fs');
let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');
content = content.replace(/<FlaskConical className="w-3 h-3 text-medieval-gold" \/>/g, '');
content = content.replace(/<FlaskConical className="w-3 h-3 text-\[#5ba2ff\]" \/>/g, '');
fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
