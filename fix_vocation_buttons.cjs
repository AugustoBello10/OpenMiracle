const fs = require('fs');

let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

const vocationButtons = `
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" /> Vocação
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Sorcerer', 'Druid', 'Paladin'].map(voc => (
                    <button
                      key={voc}
                      onClick={() => setVocation(voc as "Sorcerer" | "Druid" | "Paladin")}
                      className={\`flex-1 px-4 py-2 h-[42px] rounded font-black text-xs uppercase tracking-wider transition-colors \${
                        vocation === voc ? 'bg-[#3b82f6] text-white border-none shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-black/40 text-white/50 border border-medieval-gold/10 hover:border-medieval-gold/30 hover:text-white'
                      }\`}
                    >
                      {voc}
                    </button>
                  ))}
                </div>
              </div>
`;

content = content.replace(/<div className="flex flex-col gap-2">\s*<label className="text-medieval-gold font-bold uppercase text-\[10px\] tracking-widest flex items-center gap-2">\s*<Shield className="w-3\.5 h-3\.5" \/> Vocação\s*<\/label>\s*<select[\s\S]*?<\/select>\s*<\/div>/, vocationButtons.trim());

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
