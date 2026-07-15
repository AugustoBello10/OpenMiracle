#!/bin/bash
FILE="src/App.tsx"

# We'll insert it right after the 'Mapa Interativo' button.
sed -i '/<img src="https:\/\/res.cloudinary.com\/dc4nkbnkg\/image\/upload\/v1783849033\/mapainterativo.gif" className="w-5 h-5 object-contain" alt="Mapa" \/>/!b;n;n;a\
                <button \
                  onClick={() => { setActiveTab('\''eventos'\''); if(isMobile) setIsMenuOpen(false); }}\
                  className={activeTab === '\''eventos'\'' ? activeSubmenuClass : inactiveSubmenuClass}\
                >\
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849035/lobbyquest.gif" className="w-5 h-5 object-contain" alt="Lobby Quest" />\
                  {language === '\''pt'\'' ? '\''Lobby de Quests'\'' : '\''Quests \& Events'\''}\
                </button>
' $FILE

