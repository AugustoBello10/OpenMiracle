#!/bin/bash
FILE="src/components/BuildMakerView.tsx"

sed -i '/<div className="flex items-center gap-4">/a\
          <div className="flex items-center gap-2 hidden sm:flex">\
            <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850373/buildmaker.gif" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Build Maker" />\
            <span className="text-sm font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]">Build Maker</span>\
          </div>\
' $FILE

