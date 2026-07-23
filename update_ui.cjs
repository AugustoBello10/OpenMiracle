const fs = require('fs');

let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

// The Vocation block is around:
/*
            {/* Vocation & Promoted *\/}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" /> Vocação
                </label>
                <select
                  value={vocation}
...
                  <option value="Paladin">Paladin</option>
                </select>
              </div>
*/

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
                      className={\`px-4 py-2 h-[42px] rounded font-black text-xs uppercase tracking-wider transition-colors \${
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

// Update Rune list select to have isRune info (we can get from VOC_SPELLS)
// Wait, currently selectedRune is just a number (mana cost). If multiple spells have same mana cost, it won't distinguish!
// e.g. Sorcerer has Light Healing (20) and... Wait, I replaced VOC_SPELLS for RuneMakingCalculator, I didn't include Light Healing there.
// But some spells might have same mana cost. E.g. Fire Field (60) and Fireball (60).
// If `selectedRune` is mana, it will pick the first one with 60 mana. And we need to know if it's `isRune` or not!
// So let's change `selectedRune` to store the name instead of mana?
