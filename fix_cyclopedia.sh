#!/bin/bash
FILE="src/App.tsx"

sed -i "s|{ id: 'helmets'.*|{ id: 'helmets', labelPt: 'Capacetes', labelEn: 'Helmets', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/capacetes.gif\" className=\"w-5 h-5 object-contain\" alt=\"Helmets\" /> },|" $FILE
sed -i "s|{ id: 'armors'.*|{ id: 'armors', labelPt: 'Armaduras', labelEn: 'Armor Sets', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/armaduras.gif\" className=\"w-5 h-5 object-contain\" alt=\"Armors\" /> },|" $FILE
sed -i "s|{ id: 'legs'.*|{ id: 'legs', labelPt: 'Calças', labelEn: 'Legs', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/cal%C3%A7as.gif\" className=\"w-5 h-5 object-contain\" alt=\"Legs\" /> },|" $FILE
sed -i "s|{ id: 'boots'.*|{ id: 'boots', labelPt: 'Botas', labelEn: 'Boots', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/botas.gif\" className=\"w-5 h-5 object-contain\" alt=\"Boots\" /> },|" $FILE
sed -i "s|{ id: 'shields'.*|{ id: 'shields', labelPt: 'Escudos', labelEn: 'Shields', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849030/escudos.gif\" className=\"w-5 h-5 object-contain\" alt=\"Shields\" /> },|" $FILE
sed -i "s|{ id: 'swords'.*|{ id: 'swords', labelPt: 'Espadas', labelEn: 'Swords', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/espadas.gif\" className=\"w-5 h-5 object-contain\" alt=\"Swords\" /> },|" $FILE
sed -i "s|{ id: 'clubs'.*|{ id: 'clubs', labelPt: 'Maças', labelEn: 'Clubs', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/clavas.gif\" className=\"w-5 h-5 object-contain\" alt=\"Clubs\" /> },|" $FILE
sed -i "s|{ id: 'axes'.*|{ id: 'axes', labelPt: 'Machados', labelEn: 'Axes', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849032/machados.gif\" className=\"w-5 h-5 object-contain\" alt=\"Axes\" /> },|" $FILE
sed -i "s|{ id: 'distance'.*|{ id: 'distance', labelPt: 'Distância', labelEn: 'Distance', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849030/distance.gif\" className=\"w-5 h-5 object-contain\" alt=\"Distance\" /> },|" $FILE
sed -i "s|{ id: 'rings'.*|{ id: 'rings', labelPt: 'Anéis', labelEn: 'Magic Rings', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/aneis_magicos.gif\" className=\"w-5 h-5 object-contain\" alt=\"Rings\" /> },|" $FILE
sed -i "s|{ id: 'amulets'.*|{ id: 'amulets', labelPt: 'Amuletos', labelEn: 'Amulets', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849026/amuletos.gif\" className=\"w-5 h-5 object-contain\" alt=\"Amulets\" /> },|" $FILE
sed -i "s|{ id: 'relics'.*|{ id: 'relics', labelPt: 'Relíquias', labelEn: 'Holy Relics', icon: <img src=\"https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/reliquias.gif\" className=\"w-5 h-5 object-contain\" alt=\"Relics\" /> }|" $FILE

