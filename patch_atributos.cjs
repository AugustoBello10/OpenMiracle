const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldHeader = `<header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                        <Zap className="w-8 h-8 text-medieval-gold opacity-80" /> {t('attributes')}
                      </h1>
                      <p className="text-medieval-gold/80 font-mono text-sm">
                        {t('attributeSubtitle')}
                      </p>
                    </header>`;

const newHeader = `<header className="text-center mb-12">
                      <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
                        {t('attributes')}
                      </h1>
                      <p className="text-medieval-gold/80 font-mono text-sm">
                        {t('attributeSubtitle')}
                      </p>
                    </header>`;

code = code.replace(oldHeader, newHeader);

// Now replacing the layout for Attributes
// I'll use regex to replace from <div className="grid grid-cols-1 lg:grid-cols-12 gap-8"> up to the end of the Atributos tab

const startMarker = '<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">';
// Wait, this is a bit risky. Let's find exactly the block to replace.
