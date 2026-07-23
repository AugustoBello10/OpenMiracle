const fs = require('fs');
let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');
content = content.replace(/<Calculator className="w-4 h-4" \/> /g, '');
content = content.replace(/<Bell className="w-4 h-4" \/> /g, '');
fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
