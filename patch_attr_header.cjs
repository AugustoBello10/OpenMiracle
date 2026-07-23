const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /<h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">\s*<Zap className="w-8 h-8 text-medieval-gold opacity-80" \/> \{t\('attributes'\)\}\s*<\/h1>/;

const newHeader = `<h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                        {t('attributes')}
                      </h1>`;

if (regex.test(code)) {
  code = code.replace(regex, newHeader);
  fs.writeFileSync('src/App.tsx', code);
  console.log("REPLACED HEADER USING REGEX");
} else {
  console.log("REGEX HEADER MATCH NOT FOUND");
}
