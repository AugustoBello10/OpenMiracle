#!/bin/bash
FILE="src/App.tsx"

cat << 'INNER_EOF' > hunts_sidebar_btn.tsx
                <button 
                  onClick={() => { setActiveTab('hunts'); if(isMobile) setIsMenuOpen(false); }}
                  className={activeTab === 'hunts' ? activeSubmenuClass : inactiveSubmenuClass}
                >
                  <Map className="w-6 h-6 object-contain opacity-70" />
                  {language === 'pt' ? 'Agenda de Hunts' : 'Hunts Agenda'}
                </button>
INNER_EOF

sed -i '2166r hunts_sidebar_btn.tsx' $FILE

