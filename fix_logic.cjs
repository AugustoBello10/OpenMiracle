const fs = require('fs');

let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

// We need to add:
/*
  const selectedRuneData = VOC_SPELLS[vocation]?.find(r => r.name === selectedRune) || VOC_SPELLS[vocation][0];
  const runeMana = selectedRuneData?.mana || 1;
  const isRuneType = selectedRuneData?.isRune ?? true;
*/

const newLogic = `
  const selectedRuneData = VOC_SPELLS[vocation]?.find(r => r.name === selectedRune) || VOC_SPELLS[vocation][0];
  const runeMana = selectedRuneData?.mana || 1;
  const isRuneType = selectedRuneData?.isRune ?? true;
`;

// Insert it somewhere around `const baseMana = baseMps * totalTimeSeconds;`
content = content.replace(/const baseMana = baseMps \* totalTimeSeconds;/, newLogic + '\n  const baseMana = baseMps * totalTimeSeconds;');

// Now replace usages of selectedRune with runeMana where it implies math:
content = content.replace(/selectedRune > 0 \? Math\.floor\(generatedMana \/ selectedRune\) : 0/g, 'runeMana > 0 ? Math.floor(generatedMana / runeMana) : 0');
content = content.replace(/const neededMana = targetRunesCount \* selectedRune;/g, 'const neededMana = targetRunesCount * runeMana;');

// Replace mfNeededOrUsed with:
content = content.replace(/runesAmount = selectedRune > 0 \? Math\.floor\(generatedMana \/ selectedRune\) : 0;/g, 'runesAmount = runeMana > 0 ? Math.floor(generatedMana / runeMana) : 0;'); // Wait, I already did this with the global replace.
fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
