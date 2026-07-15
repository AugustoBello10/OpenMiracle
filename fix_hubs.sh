#!/bin/bash
FILE="src/App.tsx"

# Calculators Hub
sed -i 's|<Hammer className="text-medieval-gold w-8 h-8 group-hover:scale-110 transition-transform" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Calculadoras" />|g' $FILE

# Professions Hub
sed -i 's|<Briefcase className="text-medieval-gold group-hover:text-amber-500 w-8 h-8 group-hover:scale-110 transition-transform" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/guiadeprofissoes.gif" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Profissoes" />|g' $FILE

# Map Hub
sed -i 's|<Map className="text-medieval-gold group-hover:text-blue-400 w-8 h-8 group-hover:scale-110 transition-all" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/mapainterativo.gif" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Mapa" />|g' $FILE

# Wiki/Library Hub
sed -i 's|<Book className="text-medieval-gold group-hover:text-emerald-400 w-8 h-8 group-hover:scale-110 transition-all" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783850372/wiki.gif" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Wiki" />|g' $FILE

# Community Hub
sed -i 's|<MessageSquare className="text-medieval-gold group-hover:text-\[#5865F2\] w-8 h-8 group-hover:scale-110 transition-all" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/comunidadeefeedback.gif" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Community" />|g' $FILE

