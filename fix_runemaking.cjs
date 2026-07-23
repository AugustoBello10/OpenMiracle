const fs = require('fs');
let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

// Helper to remove generic icons
content = content.replace(/<FlaskConical className="w-8 h-8 text-medieval-gold opacity-80" \/>/g, '');
content = content.replace(/<FlaskConical className="w-3.5 h-3.5" \/>/g, '');
content = content.replace(/<Shield className="w-3.5 h-3.5" \/> /g, '');
content = content.replace(/<Zap className="w-3.5 h-3.5" \/> /g, '');
content = content.replace(/<Clock className="w-3.5 h-3.5" \/> /g, '');

const getSpellImage = `
const getSpellImage = (spellName: string) => {
  const name = spellName.toLowerCase();
  let img = 'blank_rune.gif';
  if (name.includes('animate dead')) img = 'animate_dead.gif';
  else if (name.includes('antidote')) img = 'antidote_rune.gif';
  else if (name.includes('chameleon')) img = 'chameleon_rune.gif';
  else if (name.includes('convince')) img = 'convince_creature.gif';
  else if (name.includes('desintegrate')) img = 'desintegrate.gif';
  else if (name.includes('destroy field')) img = 'destroy_field.gif';
  else if (name.includes('energy field')) img = 'energy_field.gif';
  else if (name.includes('energy wall')) img = 'energy_wall.gif';
  else if (name.includes('energybomb')) img = 'energy_bomb.gif';
  else if (name.includes('explosion')) img = 'explosion.gif';
  else if (name.includes('fire field')) img = 'fire_field.gif';
  else if (name.includes('fire wall')) img = 'fire_wall.gif';
  else if (name.includes('firebomb')) img = 'firebomb.gif';
  else if (name.includes('fireball')) img = 'fireball.gif';
  else if (name.includes('frost magic missile')) img = 'frost_magic_missile.gif';
  else if (name.includes('great fireball')) img = 'great_fireball.gif';
  else if (name.includes('heavy magic missile')) img = 'heavy_magic_missile.gif';
  else if (name.includes('intense healing')) img = 'Intense_healing.gif';
  else if (name.includes('light magic missile')) img = 'Light_magic_missile.gif';
  else if (name.includes('magic wall')) img = 'Magic_wall.gif';
  else if (name.includes('paralyze')) img = 'paralyze.gif';
  else if (name.includes('poison field')) img = 'poison_field.gif';
  else if (name.includes('poison wall')) img = 'poison_wall.gif';
  else if (name.includes('poisonbomb')) img = 'poison_bomb.gif';
  else if (name.includes('soulfire')) img = 'soulfire.gif';
  else if (name.includes('sudden death')) img = 'Sudden_death.gif';
  else if (name.includes('ultimate healing')) img = 'ultimate_healing.gif';
  else if (name.includes('envenom')) img = 'envenom.gif';
  else if (name.includes('enchant staff')) img = 'enchant_staff.gif';
  else if (name.includes('arrow')) img = 'arrow.gif';
  else if (name.includes('bolt')) img = 'bolt.gif';
  else if (name.includes('spear')) img = 'spear.gif';
  
  return \`https://res.cloudinary.com/dc4nkbnkg/image/upload/\${img}\`;
};
`;

if (!content.includes('getSpellImage')) {
  content = content.replace(/export const RuneMakingCalculator =/, getSpellImage + '\nexport const RuneMakingCalculator =');
}

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
