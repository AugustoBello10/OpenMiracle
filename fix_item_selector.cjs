const fs = require('fs');
let content = fs.readFileSync('src/components/BuildMaker/ItemSelector.tsx', 'utf8');

const replacement = `
          <div 
            key={item.id} 
            onClick={() => onSelectItem(item)}
            className="medieval-card p-3 cursor-pointer hover:border-medieval-gold/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black/40 border border-medieval-gold/20 rounded flex items-center justify-center shrink-0">
                {item.img ? (
                  <img src={item.img} alt={item.name} className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <div className="text-medieval-gold text-[8px] uppercase tracking-tighter truncate w-full text-center px-1">
                    {item.name.substring(0,6)}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-medieval-gold group-hover:tracking-wider transition-all">{item.name}</span>
                {getItemEffectsString(item) && (
                  <span className="text-[10px] text-amber-500/85 font-sans italic my-0.5 max-w-xs truncate" title={getItemEffectsString(item)}>
                    {getItemEffectsString(item)}
                  </span>
                )}
                <div className="flex items-center gap-3 mt-1">
                  {item.armor !== undefined && (
                    <div className="flex items-center gap-1 text-[10px] text-medieval-muted">
                      <Shield size={10} /> {item.armor}
                    </div>
                  )}
                  {item.attack !== undefined && (
                    <div className="flex items-center gap-1 text-[10px] text-medieval-muted">
                      <Sword size={10} /> {item.attack}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-[10px] text-medieval-muted">
                    <Weight size={10} /> {item.weight}
                  </div>
                </div>
              </div>
            </div>
`;

content = content.replace(/<div \s*key=\{item\.id\}\s*onClick=\{\(\) => onSelectItem\(item\)\}\s*className="medieval-card p-3 cursor-pointer hover:border-medieval-gold\/50 transition-all flex items-center justify-between group"\s*>\s*<div className="flex flex-col">[\s\S]*?<div className="flex items-center gap-1 text-\[10px\] text-medieval-muted">\s*<Weight size=\{10\} \/> \{item\.weight\}\s*<\/div>\s*<\/div>\s*<\/div>/, replacement.trim());

fs.writeFileSync('src/components/BuildMaker/ItemSelector.tsx', content);
console.log('Fixed ItemSelector');
