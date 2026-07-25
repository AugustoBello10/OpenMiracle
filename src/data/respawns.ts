export interface Respawn {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  count: number;
  image: string;
  categories?: string[];
}

import respawnsData from '../../public/respawns.json';
import predefinedMonstersData from '../../public/predefined_monsters.json';

export function fixCategories(categories: string[] | undefined, name: string): string[] {
  const lowerName = name.toLowerCase();
  
  if (['lava hole', 'ice lava hole', 'mossy stone', 'blue shrine stone', 'red shrine stone', 'violet shrine stone', 'green shrine stone', 'yellow shrine stone'].includes(lowerName)) {
    return ['Mineração'];
  }
  if (['red maple', 'yellow maple'].includes(lowerName)) {
    return ['Woodcutting'];
  }
  if (['lever', 'stalagmite'].includes(lowerName)) {
    return ['Interação no Mapa'];
  }
  if (['pick hole'].includes(lowerName)) {
    return ['Pick Holes'];
  }
  if (['john'].includes(lowerName)) {
    return ['NPC'];
  }
  
  return categories && categories.length > 0 ? categories : ['Monstros'];
}

export const RESPAWNS: Respawn[] = (respawnsData as Respawn[]).map(r => ({
  ...r,
  categories: fixCategories(r.categories, r.name)
}));

export interface PredefinedMonster {
  name: string;
  image: string;
  categories?: string[];
}

export const PREDEFINED_MONSTERS: PredefinedMonster[] = (predefinedMonstersData as PredefinedMonster[]).map(m => ({
  ...m,
  categories: fixCategories(m.categories, m.name)
}));
