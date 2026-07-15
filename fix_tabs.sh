#!/bin/bash
FILE="src/App.tsx"

# For tabs array in App.tsx
sed -i '2026,2035s|ferramentas.gif" className="w-7 h-7 object-contain drop-shadow-\[0_0_8px_rgba(0,0,0,0.8)\]" alt="Ferramentas" />|buildmaker.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Build Maker" />|' $FILE
sed -i 's|{ id: '\''buildmaker'\'', label: '\''Build Maker'\'', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/ferramentas.gif" className="w-7 h-7 object-contain drop-shadow-\[0_0_8px_rgba(0,0,0,0.8)\]" alt="Ferramentas" /> },|{ id: '\''buildmaker'\'', label: '\''Build Maker'\'', icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850373/buildmaker.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Build Maker" /> },|g' $FILE

sed -i 's|{ id: '\''calculadoras'\'', label: t('\''calculators'\''), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/ferramentas.gif" className="w-7 h-7 object-contain drop-shadow-\[0_0_8px_rgba(0,0,0,0.8)\]" alt="Ferramentas" /> },|{ id: '\''calculadoras'\'', label: t('\''calculators'\''), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Calculadoras" /> },|g' $FILE

sed -i 's|{ id: '\''profissoes'\'', label: t('\''professions'\''), icon: <Briefcase className="w-4 h-4" /> },|{ id: '\''profissoes'\'', label: t('\''professions'\''), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/guiadeprofissoes.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Profissoes" /> },|g' $FILE

sed -i 's|{ id: '\''mapa'\'', label: t('\''map'\''), icon: <Map className="w-4 h-4" /> },|{ id: '\''mapa'\'', label: t('\''map'\''), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/mapainterativo.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Mapa" /> },|g' $FILE

sed -i 's|{ id: '\''wiki'\'', label: t('\''wiki'\''), icon: <Book className="w-4 h-4" /> },|{ id: '\''wiki'\'', label: t('\''wiki'\''), icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850372/wiki.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Wiki" /> },|g' $FILE

