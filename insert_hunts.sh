#!/bin/bash
FILE="src/App.tsx"

cat << 'INNER_EOF' > hunts_tab.tsx
            {activeTab === 'hunts' && (
              <motion.div
                key="hunts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 py-10"
              >
                <header className="text-center mb-16">
                  <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-medieval-gold to-medieval-gold/50 uppercase tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                    {language === 'pt' ? 'Agenda de Hunts' : 'Hunts Agenda'}
                  </h1>
                  <p className="text-medieval-gold/70 font-mono text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                    {language === 'pt' 
                      ? 'Cole aqui o código do componente da Agenda de Hunts (ou o importe).' 
                      : 'Paste the Hunts Agenda component code here (or import it).'}
                  </p>
                </header>
                <div className="flex justify-center">
                    <div className="p-16 border-2 border-dashed border-medieval-gold/30 rounded-3xl text-center">
                        <Map className="w-16 h-16 text-medieval-gold/40 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-medieval-gold/60">Em Breve / Coming Soon</h2>
                        <p className="text-medieval-gold/40 mt-2">Placeholder para o componente Agenda de Hunts.</p>
                    </div>
                </div>
              </motion.div>
            )}
INNER_EOF

sed -i '2694r hunts_tab.tsx' $FILE

