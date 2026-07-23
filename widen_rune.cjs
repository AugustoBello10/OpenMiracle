const fs = require('fs');
let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');
content = content.replace(/lg:col-span-7/g, 'lg:col-span-8');
content = content.replace(/lg:col-span-5/g, 'lg:col-span-4');
fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
