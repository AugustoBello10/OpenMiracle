const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(
  /className=\{`mx-auto w-full \$\{activeTab === 'buildmaker' \? 'max-w-\[1600px\] px-2 xl:px-6' : 'max-w-5xl'\}`\}/,
  "className={`mx-auto w-full ${activeTab === 'buildmaker' ? 'max-w-[1600px] px-2 xl:px-6' : (activeTab === 'calculators' ? 'max-w-7xl px-4' : 'max-w-5xl px-4')}`}"
);
fs.writeFileSync('src/App.tsx', content);
