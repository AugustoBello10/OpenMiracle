const fs = require('fs');
let code = fs.readFileSync('src/lib/firebase.ts', 'utf8');
code = code.replace(
  "import.meta.env",
  "(import.meta as any).env"
);
fs.writeFileSync('src/lib/firebase.ts', code);
