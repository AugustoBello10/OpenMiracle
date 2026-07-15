#!/bin/bash
FILE="src/App.tsx"

# For BUILD MAKER in sidebar
sed -i '/BUILD MAKER/{
  x
  s|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/ferramentas.gif" className="w-7 h-7 object-contain drop-shadow-\[0_0_8px_rgba(0,0,0,0.8)\]" alt="Ferramentas" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850373/buildmaker.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Build Maker" />|
  x
}' $FILE

# The above won't work well because it's multiline. Let's just edit line 2091
sed -i '2091s|https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/ferramentas.gif|https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850373/buildmaker.gif|' $FILE
sed -i '2091s|alt="Ferramentas"|alt="Build Maker"|' $FILE

