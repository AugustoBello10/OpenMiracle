import { GameItem, SlotId, EnchantmentValue, Skills, VocationType } from '../types/build';
import { ALL_BUILD_ITEMS } from '../data/buildItems';

export interface ParsedBuildResult {
  vocation?: VocationType;
  level?: number;
  skills: Partial<Skills>;
  equipment: Partial<Record<SlotId, GameItem>>;
  attributes: Record<string, EnchantmentValue[]>;
  summary: {
    itemsFound: number;
    attributesFound: number;
    skillsFound: number;
    unrecognizedLines: string[];
  };
}

// Map attribute names from in-game look strings to internal attribute types
const ATTR_NAME_MAP: Record<string, string> = {
  'sword fighting': 'sword',
  'axe fighting': 'axe',
  'club fighting': 'club',
  'distance fighting': 'distance',
  'shielding': 'shielding',
  'magic level': 'magic',
  'speed': 'speed',
  'arm': 'armor',
  'armor': 'armor',
  'attack': 'attack',
  'defense': 'defense',
  'max health': 'hp',
  'max mana': 'mp',
  'health regen': 'health-regen',
  'mana regen': 'mana-regen',
  'faster regeneration': 'health-regen',
  'protection physical': 'phys-prot',
  'protection fire': 'fire-prot',
  'protection ice': 'ice-prot',
  'protection energy': 'energy-prot',
  'protection earth': 'earth-prot',
  'protection death': 'death-prot',
  'protection life drain': 'life-drain-prot',
  'protection mana drain': 'mana-drain-prot',
  'protection elements': 'elements-prot',
  'mitigation chance': 'mitigation',
  'mitigation amount': 'mitigation',
  'arrow guard': 'arrow-guard',
  'mana leech chance': 'mana-leech',
  'mana leech amount': 'mana-leech',
  'life leech chance': 'life-leech',
  'life leech amount': 'life-leech',
  'crit hit chance': 'crit-hit',
  'crit hit amount': 'crit-hit',
  'critical hit': 'crit-hit',
  'destruction': 'destruction',
  'dodge': 'dodge',
  'vibrancy': 'vibrancy',
  'healing': 'healing',
  'lootseeker': 'lootseeker'
};

/**
 * Normaliza strings para busca insensível a maiúsculas/minúsculas e pontuações
 */
function normalizeName(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Analisador sintático de logs do jogo (Shift + Right Click / Look e janela de Skills)
 */
export function parseBuildFromText(rawText: string): ParsedBuildResult {
  const result: ParsedBuildResult = {
    skills: {},
    equipment: {},
    attributes: {},
    summary: {
      itemsFound: 0,
      attributesFound: 0,
      skillsFound: 0,
      unrecognizedLines: []
    }
  };

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  let currentItem: GameItem | null = null;
  let currentSlot: SlotId | null = null;
  let relicSlotCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 1. CHECAGEM DE SKILLS E LEVEL (Ex: "Level 153" ou "Level: 153", "Sword Fighting: 109")
    const lvlMatch = line.match(/(?:level|nível)[:\s]+(\d+)/i);
    if (lvlMatch && !line.toLowerCase().includes('magic')) {
      result.level = parseInt(lvlMatch[1], 10);
      result.summary.skillsFound++;
      continue;
    }

    const mlMatch = line.match(/(?:magic level|ml)[:\s]+(\d+)/i);
    if (mlMatch) {
      result.skills.magic = parseInt(mlMatch[1], 10);
      result.summary.skillsFound++;
      continue;
    }

    const swordMatch = line.match(/(?:sword fighting|sword)[:\s]+(\d+)/i);
    if (swordMatch) {
      result.skills.melee = parseInt(swordMatch[1], 10);
      result.summary.skillsFound++;
      continue;
    }

    const axeMatch = line.match(/(?:axe fighting|axe)[:\s]+(\d+)/i);
    if (axeMatch) {
      result.skills.melee = parseInt(axeMatch[1], 10);
      result.summary.skillsFound++;
      continue;
    }

    const clubMatch = line.match(/(?:club fighting|club)[:\s]+(\d+)/i);
    if (clubMatch) {
      result.skills.melee = parseInt(clubMatch[1], 10);
      result.summary.skillsFound++;
      continue;
    }

    const distMatch = line.match(/(?:distance fighting|distance)[:\s]+(\d+)/i);
    if (distMatch) {
      result.skills.distance = parseInt(distMatch[1], 10);
      result.summary.skillsFound++;
      continue;
    }

    const shieldMatch = line.match(/(?:shielding)[:\s]+(\d+)/i);
    if (shieldMatch) {
      result.skills.shielding = parseInt(shieldMatch[1], 10);
      result.summary.skillsFound++;
      continue;
    }

    // 2. CHECAGEM DE LOOK DO ITEM (Ex: "18:46 You see a royal helmet (Arm:9)." ou "You see a magic sword (Atk:48, Def:35).")
    const lookMatch = line.match(/(?:you see|você vê)\s+(?:an?|the|um|uma)?\s*([^(.]+)/i);
    if (lookMatch) {
      const rawItemName = lookMatch[1].trim();
      const normName = normalizeName(rawItemName);

      // Procura o item no catálogo oficial ALL_BUILD_ITEMS priorizando correspondência exata e nomes mais específicos
      const foundItem = ALL_BUILD_ITEMS
        .filter(it => {
          const itNorm = normalizeName(it.name);
          return itNorm === normName || itNorm.includes(normName) || normName.includes(itNorm);
        })
        .sort((a, b) => {
          const aNorm = normalizeName(a.name);
          const bNorm = normalizeName(b.name);
          if (aNorm === normName) return -1;
          if (bNorm === normName) return 1;
          return bNorm.length - aNorm.length;
        })[0];

      if (foundItem) {
        currentItem = foundItem;

        // Determina o slot correto
        let targetSlot: SlotId | null = null;
        if (foundItem.category === 'head') targetSlot = 'head';
        else if (foundItem.category === 'armor') targetSlot = 'armor';
        else if (foundItem.category === 'legs') targetSlot = 'legs';
        else if (foundItem.category === 'feet') targetSlot = 'feet';
        else if (foundItem.category === 'necklace') targetSlot = 'necklace';
        else if (foundItem.category === 'ring') targetSlot = 'ring';
        else if (foundItem.category === 'ammo') targetSlot = 'ammo';
        else if (foundItem.category === 'backpack') targetSlot = 'backpack';
        else if (foundItem.category === 'left-hand') targetSlot = 'left-hand';
        else if (foundItem.category === 'right-hand') targetSlot = 'right-hand';
        else if (foundItem.category === 'relic') {
          if (relicSlotCounter <= 4) {
            targetSlot = `relic-${relicSlotCounter}` as SlotId;
            relicSlotCounter++;
          }
        }

        if (targetSlot) {
          currentSlot = targetSlot;
          result.equipment[targetSlot] = foundItem;
          result.attributes[targetSlot] = [];
          result.summary.itemsFound++;
        }
      }
      continue;
    }

    // 3. CHECAGEM DE ATRIBUTOS ENCANTADOS (Ex: "Attributes: (sword fighting: +3, speed: +20)." ou "Attributes: (protection physical: +2%, mitigation chance: +7%...)")
    const attrMatch = line.match(/Attributes:\s*\((.*?)\)/i);
    if (attrMatch && currentSlot) {
      const attrContent = attrMatch[1];
      const attrParts = attrContent.split(',');

      for (const part of attrParts) {
        const trimmed = part.trim();
        // Regex para capturar: "nome do atributo: +valor" ou "nome: +2/6s" ou "nome: +valor%"
        const kvMatch = trimmed.match(/^([^:+]+)[:\s]+\+?([0-9/.]+)(?:%|\s*s)?/i);
        if (kvMatch) {
          const rawKey = kvMatch[1].trim().toLowerCase();
          const rawVal = kvMatch[2].trim();

          const mappedType = ATTR_NAME_MAP[rawKey] || rawKey.replace(/\s+/g, '-');
          let amount = 0;
          let level = 0;

          // Se for no formato +2/6s (regen)
          if (rawVal.includes('/')) {
            const parts = rawVal.split('/');
            amount = parseInt(parts[0], 10) || 1;
            level = 4; // Top tier
          } else {
            amount = parseFloat(rawVal) || 0;
            level = Math.min(4, Math.max(0, Math.floor(amount / 2)));
          }

          const enchant: EnchantmentValue = {
            type: mappedType,
            amount,
            level
          };

          if (!result.attributes[currentSlot]) {
            result.attributes[currentSlot] = [];
          }

          // Merge compound attributes (mitigation, leech, crit)
          const isCompound = mappedType === 'mitigation' || mappedType === 'mana-leech' || mappedType === 'life-leech' || mappedType === 'crit-hit';
          const existing = isCompound ? result.attributes[currentSlot].find(e => e.type === mappedType) : null;

          if (existing) {
            if (rawKey.includes('chance')) {
              existing.chance = amount;
            } else {
              existing.amount = amount;
            }
          } else {
            if (rawKey.includes('chance')) {
              enchant.chance = amount;
              enchant.amount = 0;
            }
            result.attributes[currentSlot].push(enchant);
            result.summary.attributesFound++;
          }
        }
      }
      continue;
    }

    // Linha não reconhecida (guarda para depuração amigável)
    if (!line.includes('Classification:') && !line.includes('It weighs') && !line.includes('An excellent') && !line.includes('It is the') && !line.includes('An enchanted')) {
      result.summary.unrecognizedLines.push(line);
    }
  }

  return result;
}
