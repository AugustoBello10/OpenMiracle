#!/bin/bash
FILE="src/App.tsx"

# H1 class updates to include flex justify-center gap-3
sed -i 's/<h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">/<h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">/g' $FILE
sed -i 's/<h1 className="text-4xl sm:text-5xl font-black text-medieval-gold uppercase tracking-tighter mb-3 relative drop-shadow-\[0_2px_10px_rgba(0,0,0,0.8)\]">/<h1 className="text-4xl sm:text-5xl font-black text-medieval-gold uppercase tracking-tighter mb-3 relative drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex items-center justify-center gap-3">/g' $FILE

