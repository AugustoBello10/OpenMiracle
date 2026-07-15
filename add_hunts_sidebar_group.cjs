const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const divStart = content.indexOf('<div className="flex flex-col gap-4 text-left select-none pb-12 font-[\'DotGothic16\']">');

const huntsGroup = `
        {/* HUNTS SECTION */}
        {isHunts && (
        <div className="space-y-1.5">
          <button 
            onClick={() => toggleGroup('guias')}
            className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-gradient-to-b from-black/80 to-[#0a0a0a] border border-medieval-gold/20 shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-medieval-gold/50 hover:shadow-[0_4px_20px_rgba(197,160,89,0.15)] transition-all text-xs font-black text-medieval-gold uppercase tracking-widest relative overflow-hidden group"
          >
            <span className="flex items-center gap-2.5 relative z-10">
              <Map className="w-6 h-6 object-contain text-medieval-gold drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" />
              {language === 'pt' ? 'Hunts' : 'Hunts'}
            </span>
          </button>
          <div className="overflow-hidden flex flex-col gap-1 pl-1 pt-0.5">
            <button 
              onClick={() => { setActiveTab('hunts'); if(isMobile) setIsMenuOpen(false); }}
              className={activeTab === 'hunts' ? activeSubmenuClass : inactiveSubmenuClass}
            >
              <Map className="w-6 h-6 object-contain opacity-70" />
              {language === 'pt' ? 'Agenda de Hunts' : 'Hunts Agenda'}
            </button>
          </div>
        </div>
        )}
`;

content = content.slice(0, divStart + 86) + "\n" + huntsGroup + content.slice(divStart + 86);
fs.writeFileSync('src/App.tsx', content);

