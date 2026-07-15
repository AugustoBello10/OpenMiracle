#!/bin/bash
FILE="src/App.tsx"

sed -i 's|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/ferramentas.gif" className="w-7 h-7 object-contain drop-shadow-\[0_0_8px_rgba(0,0,0,0.8)\]" alt="Ferramentas" />              BUILD MAKER|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850373/buildmaker.gif" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Build Maker" />              BUILD MAKER|g' $FILE

# For Wiki icon inside the tab list (if I replaced Book with ferramentas by mistake)
# Wait, I didn't replace Book with ferramentas, I commented it out in the previous step. Wait, let me check what tabs array has.

