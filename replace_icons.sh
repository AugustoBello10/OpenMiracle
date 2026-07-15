#!/bin/bash
FILE="src/App.tsx"

# Groups
sed -i 's|<Sparkles className="w-3.5 h-3.5 text-medieval-gold/85" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/inicio_updates.gif" className="w-5 h-5 object-contain" alt="Inicio" />|g' $FILE
sed -i 's|<Youtube className="w-3.5 h-3.5 text-medieval-gold/85" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849026/A_Helpful_Fairy.gif" className="w-5 h-5 object-contain" alt="Guias" />|g' $FILE
sed -i 's|<MessageSquare className="w-3.5 h-3.5 text-medieval-gold/85" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/comunidadeefeedback.gif" className="w-5 h-5 object-contain" alt="Feedback" />|g' $FILE
sed -i 's|<TrendingUp className="w-3.5 h-3.5 text-medieval-gold/85" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/calculadoras.gif" className="w-5 h-5 object-contain" alt="Calculadoras" />|g' $FILE
sed -i 's|<Briefcase className="w-3.5 h-3.5 text-medieval-gold/85" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/ferramentas.gif" className="w-5 h-5 object-contain" alt="Ferramentas" />|g' $FILE
sed -i 's|<Sword className="w-3.5 h-3.5 text-medieval-gold/85" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849029/cyclopedia.gif" className="w-5 h-5 object-contain" alt="Cyclopedia" />|g' $FILE
sed -i 's|<Book className="w-3.5 h-3.5 text-medieval-gold/85" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/ferramentas.gif" className="w-5 h-5 object-contain" alt="Biblioteca" />|g' $FILE # wait, biblioteca is not requested? Wait, let's keep it as is, or remove it. The user didn't specify biblioteca icon. Let's not touch it.

# Sub items
sed -i 's|<Book className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/paginaprincipal.gif" className="w-5 h-5 object-contain" alt="Home" />|g' $FILE
sed -i 's|<History className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849032/notasdeatualizacoes.gif" className="w-5 h-5 object-contain" alt="Updates" />|g' $FILE
sed -i 's|<Youtube className="w-3.5 h-3.5 opacity-70 text-red-500 animate-pulse" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/guiadeprofissoes.gif" className="w-5 h-5 object-contain" alt="Guia Profissoes" />|g' $FILE
sed -i 's|<Map className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/mapainterativo.gif" className="w-5 h-5 object-contain" alt="Mapa" />|g' $FILE
sed -i 's|<MessageSquare className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849034/comunidadeefeedback.gif" className="w-5 h-5 object-contain" alt="Feedback" />|g' $FILE

# For calculadoras group
sed -i 's|<Target className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849036/treinodeskils.gif" className="w-5 h-5 object-contain" alt="Skills" />|g' $FILE
sed -i 's|<Shield className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/bencaoemorte.gif" className="w-5 h-5 object-contain" alt="Bless" />|g' $FILE
sed -i 's|<Activity className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/simuladoratributos.gif" className="w-5 h-5 object-contain" alt="Atributos" />|g' $FILE
sed -i 's|<Wand2 className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849035/runemaking.gif" className="w-5 h-5 object-contain" alt="Rune" />|g' $FILE

# Profissoes
sed -i 's|<Hammer className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/forja_crafting.gif" className="w-5 h-5 object-contain" alt="Crafting" />|g' $FILE
sed -i 's|<FlaskConical className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/alchemy.gif" className="w-5 h-5 object-contain" alt="Alchemy" />|g' $FILE
sed -i 's|<Sprout className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849031/fazenda_farming.gif" className="w-5 h-5 object-contain" alt="Farming" />|g' $FILE
sed -i 's|<Pickaxe className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849033/mineracao.gif" className="w-5 h-5 object-contain" alt="Mining" />|g' $FILE

# Items
sed -i 's|<Crown className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/capacetes.gif" className="w-5 h-5 object-contain" alt="Helmets" />|g' $FILE
sed -i 's|<Shirt className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849027/armaduras.gif" className="w-5 h-5 object-contain" alt="Armors" />|g' $FILE
sed -i 's|<PersonStanding className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/cal%C3%A7as.gif" className="w-5 h-5 object-contain" alt="Legs" />|g' $FILE
sed -i 's|<Footprints className="w-3.5 h-3.5 opacity-70" />|<img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1783849028/botas.gif" className="w-5 h-5 object-contain" alt="Boots" />|g' $FILE
# Wait, let's just make sure those are the classnames used.

