#!/bin/bash
FILE="src/App.tsx"

# Revert globally
sed -i 's|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849036/treinodeskils.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-\[0_0_8px_rgba(0,0,0,0.8)\]" alt="Skills" /> ||g' $FILE

sed -i 's|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/bencaoemorte.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-\[0_0_8px_rgba(0,0,0,0.8)\]" alt="Bless" /> ||g' $FILE

# Apply ONLY to the header lines
# Line 628
sed -i '628s|{t('\''skills'\'')}|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849036/treinodeskils.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Skills" /> {t('\''skills'\'')}|' $FILE

# Line 1055 approx (let's find Bless header line)
