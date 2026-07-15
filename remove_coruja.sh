#!/bin/bash
FILE="src/App.tsx"

# Top bar logo
sed -i 's|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783885908/coruja.png" className="w-8 h-8 object-contain drop-shadow-\[0_0_8px_rgba(197,160,89,0.5)\]" alt="Logo" />|<Hammer className="text-medieval-gold w-6 h-6" />|g' $FILE

# Footer logo
sed -i 's|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783885908/coruja.png" className="w-6 h-6 object-contain opacity-80" alt="Logo" />|<Hammer className="w-5 h-5" />|g' $FILE

# Remove the hero image block (12 lines)
sed -i '2627,2638d' $FILE

