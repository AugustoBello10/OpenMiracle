#!/bin/bash
FILE="src/App.tsx"

sed -i 's|{t('\''mapTitle'\'')}|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/mapainterativo.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Mapa" /> {t('\''mapTitle'\'')}|g' $FILE

