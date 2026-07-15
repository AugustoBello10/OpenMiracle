#!/bin/bash
FILE="src/App.tsx"

# Update logo in the top bar
sed -i 's|<Hammer className="text-medieval-gold w-6 h-6" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783885908/coruja.png" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]" alt="Logo" />|g' $FILE

# Update logo in the footer (line 5220 approx)
sed -i 's|<Hammer className="w-5 h-5" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783885908/coruja.png" className="w-6 h-6 object-contain opacity-80" alt="Logo" />|g' $FILE

