#!/bin/bash
# We will create a node script to patch App.tsx
cat << 'NODE_EOF' > patch.js
const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add weaponPrice state
code = code.replace(
  "const [selectedSpell, setSelectedSpell] = useState<string>('');",
  "const [selectedSpell, setSelectedSpell] = useState<string>('');\n  const [weaponPrice, setWeaponPrice] = useState<number>('');"
);

// 2. Change min="1" to min="0" and logic for current/target skill
code = code.replace(
  "setCurrentSkill(val < 1 ? 1 : val);",
  "setCurrentSkill(val < 0 ? 0 : val);"
);
code = code.replace(
  /min="1"\s+max="150"/g,
  'min="0"\n                  max="150"'
);
code = code.replace(
  "setTargetSkill(val < 1 ? 1 : val);",
  "setTargetSkill(val < 0 ? 0 : val);"
);

// 3. Add getWeaponImage and renderWeaponCost functions right after weaponsNeeded calculation
const functionsToAdd = `
  const getWeaponImage = () => {
    if (skillType !== 'Magic Level' && weaponType !== 'training') return null;
    if (selectedTrainingWeapon === 'Normal') return null;
    
    const w = selectedTrainingWeapon.toLowerCase();
    
    if (skillType === 'Magic Level') {
      if (w === 'spark') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Spark_Training_wand.gif';
      if (w === 'lightning') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Lightining_training_wand.gif';
      if (w === 'inferno') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Inferno_training_wand.gif';
      if (w === 'shadow') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Shadow_Training_wand.gif';
    } else if (skillType === 'Distance') {
      if (w === 'spark') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Spark_Training_spear.gif';
      if (w === 'lightning') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Lightning_Training_spear.gif';
      if (w === 'inferno') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Inferno_training_spear.gif';
      if (w === 'shadow') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Shadow_Training_spear.gif';
    } else if (skillType === 'Shielding') {
      if (w === 'spark') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Spark_Training_shield.gif';
      if (w === 'lightning') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Lightning_Training_shield.gif';
      if (w === 'inferno') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Inferno_training_shield.gif';
      if (w === 'shadow') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Shadow_Training_shield.gif';
    } else {
      if (w === 'spark') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Spark_Training_Sword.gif';
      if (w === 'lightning') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Lightning_Training_Club.gif';
      if (w === 'inferno') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Inferno_training_axe.gif';
      if (w === 'shadow') return 'https://res.cloudinary.com/dc4nkbnkg/image/upload/Shadow_Training_Axe.gif'; // Just using axe for shadow as well
    }
    return null;
  };

  const renderWeaponCost = (needed) => {
    if (!weaponPrice || weaponPrice <= 0 || needed <= 0) return null;
    const totalGold = needed * weaponPrice;
    const cc = Math.floor(totalGold / 10000);
    const pc = Math.floor((totalGold % 10000) / 100);
    const gc = totalGold % 100;
  
    return (
      <div className="mt-3 p-2 bg-black/40 rounded border border-medieval-gold/20 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-white shadow-inner">
        <span className="text-medieval-gold/70 uppercase text-[9px] tracking-widest w-full mb-1 text-center">Custo Estimado</span>
        {cc > 0 && <span className="flex items-center gap-1.5"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/crystalcoin.gif" alt="CC" className="w-5 h-5"/> {cc.toLocaleString()}</span>}
        {pc > 0 && <span className="flex items-center gap-1.5"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/platinumcoin.gif" alt="PC" className="w-5 h-5"/> {pc.toLocaleString()}</span>}
        {gc > 0 && <span className="flex items-center gap-1.5"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/goldcoin.gif" alt="GC" className="w-5 h-5"/> {gc.toLocaleString()}</span>}
      </div>
    );
  };
`;

code = code.replace(
  "const weaponsNeeded = useMemo(() => {",
  functionsToAdd + "\n  const weaponsNeeded = useMemo(() => {"
);

// 4. Add the input for the weapon price
const priceInputCode = `
              {(skillType === 'Magic Level' || weaponType === 'training') && selectedTrainingWeapon !== 'Normal' && (
                <div className="sm:col-span-2 flex flex-col gap-2 mt-4">
                  <label className="text-medieval-gold font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                    Preço da Arma de Treino Selecionada (Opcional - em Gold)
                  </label>
                  <input
                    type="number"
                    value={weaponPrice}
                    onChange={(e) => setWeaponPrice(Number(e.target.value))}
                    className="medieval-input"
                    min="0"
                    placeholder="Ex: 50000"
                  />
                </div>
              )}
`;

code = code.replace(
  "              {skillType !== 'Magic Level' && (",
  priceInputCode + "\n              {skillType !== 'Magic Level' && ("
);

// 5. Update text "Tempo Ativo nos Dummies"
code = code.replace(
  "Tempo Ativo nos Dummies",
  "Tempo Ativo na Arma de Treino"
);
code = code.replace(
  "Com base no intervalo do dummy",
  "Com base no intervalo da arma"
);
code = code.replace(
  "(Para Dummies)",
  ""
);
code = code.replace(
  "Alternativa com Armas de Treino (Active Dummy Training)",
  "Alternativa com Armas de Treino"
);

// 6. Inject weapon image and cost to ML training result
code = code.replace(
  /<p className="text-\[17px\] font-black text-medieval-gold">\s*\{weaponsNeeded > 0 \? \`\$\{weaponsNeeded\}x\` : 'N\/A'\}\s*<\/p>/g,
  `<div className="flex items-center justify-center gap-2 mt-1">
                          {weaponsNeeded > 0 && getWeaponImage() && (
                            <img src={getWeaponImage() || ''} alt="Weapon" className="w-6 h-6 object-contain drop-shadow-md" />
                          )}
                          <p className="text-[17px] font-black text-medieval-gold">
                            {weaponsNeeded > 0 ? \`\${weaponsNeeded}x\` : 'N/A'}
                          </p>
                        </div>`
);

// We need to render weapon cost below the active dummy grid for ML
code = code.replace(
  "                  </div>\n                </div>\n                <div className=\"mt-6",
  "                  </div>\n                </div>\n                {renderWeaponCost(weaponsNeeded)}\n                <div className=\"mt-6"
);

// 7. Inject weapon image and cost to regular training result
code = code.replace(
  /<div className="text-center p-4 bg-black\/40 rounded border border-medieval-gold\/10">\s*<p className="text-medieval-gold\/60 uppercase text-\[9px\] font-black tracking-widest mb-1">\{t\('neededWeapons'\)\}<\/p>\s*<div className="text-2xl font-black text-medieval-gold">\s*\{weaponsNeeded > 0 \? \`\$\{weaponsNeeded\}x\` : 'N\/A'\}\s*<\/div>\s*<\/div>/g,
  `<div className="text-center p-4 bg-black/40 rounded border border-medieval-gold/10">
                    <p className="text-medieval-gold/60 uppercase text-[9px] font-black tracking-widest mb-1">{t('neededWeapons')}</p>
                    <div className="text-2xl font-black text-medieval-gold flex items-center justify-center gap-2">
                      {weaponsNeeded > 0 && getWeaponImage() && (
                        <img src={getWeaponImage() || ''} alt="Weapon" className="w-8 h-8 object-contain drop-shadow-md" />
                      )}
                      {weaponsNeeded > 0 ? \`\${weaponsNeeded}x\` : 'N/A'}
                    </div>
                  </div>`
);

// And we need to add the weapon cost under the grid for regular training
code = code.replace(
  "                  </div>\n                </div>\n                \n                <div className=\"mt-4",
  "                  </div>\n                </div>\n                {renderWeaponCost(weaponsNeeded)}\n                <div className=\"mt-4"
);

fs.writeFileSync('src/App.tsx', code);
NODE_EOF
node patch.js
