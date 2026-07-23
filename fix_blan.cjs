const fs = require('fs');
let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');
content = content.replace("let img = 'blank_rune.gif';", "let img = 'blan_rune.gif';");
fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
