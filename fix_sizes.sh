#!/bin/bash
FILE="src/App.tsx"

# Sidebar class text sizes
sed -i 's/text-\[10px\] uppercase tracking-wider font-black/text-xs uppercase tracking-wider font-black/g' $FILE
sed -i 's/text-\[10px\] uppercase tracking-wider font-bold/text-xs uppercase tracking-wider font-bold/g' $FILE
sed -i 's/text-\[10px\] font-black text-medieval-gold uppercase/text-xs font-black text-medieval-gold uppercase/g' $FILE

# Update images in sidebar to w-7 h-7 or w-6 h-6
sed -i 's/className="w-5 h-5 object-contain"/className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"/g' $FILE
