#!/bin/bash
FILE="src/App.tsx"

# For Calculators (has two headers maybe? One is {t('skills')} which is something else. Actually {t('calculators')} ?)
# Let's check what the h1 content is.
sed -i 's/{t('\''skills'\'')}/<img src="https:\/\/res.cloudinary.com\/dc4nkbnkg\/image\/upload\/v1783849027\/calculadoras.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Calculadoras" /> {t('\''skills'\'')}/g' $FILE

# For Professions: {t('professionsTitle')}
sed -i 's/{t('\''professionsTitle'\'')}/<img src="https:\/\/res.cloudinary.com\/dc4nkbnkg\/image\/upload\/v1783849028\/guiadeprofissoes.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Profissoes" /> {t('\''professionsTitle'\'')}/g' $FILE

# For Events: {t('eventsLobbyTitle')}
sed -i 's/{t('\''eventsLobbyTitle'\'')}/<img src="https:\/\/res.cloudinary.com\/dc4nkbnkg\/image\/upload\/v1783849035\/lobbyquest.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Eventos" /> {t('\''eventsLobbyTitle'\'')}/g' $FILE

# For Items (Wiki): {t('items')}
sed -i 's/{t('\''items'\'')}/<img src="https:\/\/res.cloudinary.com\/dc4nkbnkg\/image\/upload\/v1783850372\/wiki.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Itens" /> {t('\''items'\'')}/g' $FILE

# For Patch Notes: {t('patchNotes')}
sed -i 's/{t('\''patchNotes'\'')}/<img src="https:\/\/res.cloudinary.com\/dc4nkbnkg\/image\/upload\/v1783849034\/inicio_updates.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Updates" /> {t('\''patchNotes'\'')}/g' $FILE

# For Library: {t('library')}
sed -i 's/{t('\''library'\'')}/<img src="https:\/\/res.cloudinary.com\/dc4nkbnkg\/image\/upload\/v1783850372\/wiki.gif" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Library" /> {t('\''library'\'')}/g' $FILE

# For Main Wiki title: Wiki Miracle 7.4
sed -i 's/Wiki Miracle 7.4/<img src="https:\/\/res.cloudinary.com\/dc4nkbnkg\/image\/upload\/v1783850372\/wiki.gif" className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]" alt="Wiki" /> Wiki Miracle 7.4/g' $FILE

