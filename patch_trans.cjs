const fs = require('fs');

let code = fs.readFileSync('src/lib/translations.ts', 'utf8');

code = code.replace(
  /weaponReduction:\s*'Redução de Intervalo de Ataque da Arma'/,
  "weaponReduction: 'Redução (Atk Interval)'"
);

code = code.replace(
  /weaponReduction:\s*'Weapon Attack Interval Reduction'/,
  "weaponReduction: 'Reduction (Atk Interval)'"
);

code = code.replace(
  /weaponReduction:\s*'Reducción del Intervalo de Ataque del Arma'/,
  "weaponReduction: 'Reducción (Atk Interval)'"
);

fs.writeFileSync('src/lib/translations.ts', code);
