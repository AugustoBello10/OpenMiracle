#!/bin/bash
FILE="src/App.tsx"

# Add treinodeskils.gif to the Skills header (line 628)
sed -i 's|{t('\''skills'\'')}|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849036/treinodeskils.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Skills" /> {t('\''skills'\'')}|' $FILE

# For Bless (line 1045 approx)
sed -i 's|{t('\''blessDeath'\'')}|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/bencaoemorte.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Bless" /> {t('\''blessDeath'\'')}|' $FILE

