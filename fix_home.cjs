const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetHeader = `<h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-medieval-gold to-medieval-gold/50 uppercase tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                    Miracle Wiki
                  </h1>`;

const newHeader = `<div className="flex flex-col items-center justify-center gap-6 mb-6">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783885908/coruja.png" alt="Miracle Wiki Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:scale-105 transition-transform duration-500" />
                    <h1 className="text-4xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-medieval-gold to-medieval-gold/30 uppercase tracking-tighter drop-shadow-[0_0_25px_rgba(197,160,89,0.4)]">
                      Miracle Wiki
                    </h1>
                  </div>`;

content = content.replace(targetHeader, newHeader);

// In the sidebar and top nav, does it say Miracle Wiki?
// Let's check where the logo might be used in the top nav.
// The top nav has "Rashid Top Bar" and "Desktop Tabs" and "Mobile Menu Button"

fs.writeFileSync('src/App.tsx', content);
