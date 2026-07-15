#!/bin/bash
FILE="src/App.tsx"

sed -i '/{activeTab === '\''wiki'\'' && (/i\
            {activeTab === '\''eventos'\'' && (\
              <motion.div\
                key="eventos"\
                initial={{ opacity: 0, scale: 0.95 }}\
                animate={{ opacity: 1, scale: 1 }}\
                exit={{ opacity: 0, scale: 0.95 }}\
                className="space-y-8"\
              >\
                <header className="text-center mb-8">\
                  <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">\
                    {t('\''eventsLobbyTitle'\'')}\
                  </h1>\
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-medieval-gold/10 border border-medieval-gold/30 rounded-full">\
                    <span className="relative flex h-2 w-2">\
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>\
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>\
                    </span>\
                    <p className="text-[10px] font-black text-medieval-gold uppercase tracking-widest">V3.2 - {t('\''realTimeSystem'\'')}</p>\
                  </div>\
                </header>\
\
                <div className="medieval-card rounded-lg overflow-hidden bg-black h-[800px] relative">\
                  <iframe \
                    src="/lobby.html?v=3.2" \
                    className="w-full h-full border-none"\
                    title="Lobby de Quests"\
                  />\
                </div>\
              </motion.div>\
            )}\
' $FILE

