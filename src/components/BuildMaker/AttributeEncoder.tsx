import React, { useState } from 'react';
import { GameItem, EnchantmentValue } from '../../types/build';
import { ATTRIBUTE_TYPES } from '../../data/constants';
import { cn } from '../../lib/utils';
import { Sparkles, CheckCircle2, ShieldAlert, BadgeInfo } from 'lucide-react';
import { Language, translations } from '../../lib/translations';

interface AttributeEncoderProps {
  item: GameItem;
  currentEnchants: EnchantmentValue[];
  onSave: (enchants: EnchantmentValue[]) => void;
  language: Language;
}

const HEAVY_WEAPONS = [
  "Broadsword", "Two Handed Sword", "Giant Sword", "Warlord Sword", "Magic Longsword",
  "War Hammer", "Hammer Of Wrath", "Heavy Mace", "Arcane Staff",
  "Battle Axe", "Double Axe", "Halberd", "Daramanian Waraxe", "Naginata", "Twin Axe", "Guardian Halberd", "Dragon Lance", "War Axe", "Ravager's Axe", "Great Axe", "Obsidian Lance"
];

// 1-indexed helper for exact amounts and string previews
export function getAttributeValueAndDescription(attrId: string, level: number, item?: GameItem): { amount: number; chance?: number; text: string } {
  const lvlZero = Math.max(0, level - 1);
  switch (attrId) {
    case 'hp':
      return { amount: level * 20, text: `+${level * 20} Max Health` };
    case 'mp':
      return { amount: level * 10, text: `+${level * 10} Max Mana` };
    case 'armor':
      return { amount: level, text: `+${level} Armor` };
    case 'attack': {
      const isHeavy = item ? HEAVY_WEAPONS.includes(item.name) : false;
      const amt = isHeavy ? level * 2 : level;
      return { amount: amt, text: `+${amt} Attack` };
    }
    case 'magic':
      return { amount: level, text: `+${level} Magic Level` };
    case 'sword':
      return { amount: level, text: `+${level} Sword Fighting` };
    case 'club':
      return { amount: level, text: `+${level} Club Fighting` };
    case 'axe':
      return { amount: level, text: `+${level} Axe Fighting` };
    case 'distance':
      return { amount: level, text: `+${level} Distance Fighting` };
    case 'shielding':
      return { amount: level, text: `+${level} Shielding` };
    case 'speed':
      return { amount: 10 + lvlZero * 5, text: `+${10 + lvlZero * 5} Speed` };
    case 'weight':
      return { amount: 25 + lvlZero * 15, text: `-${25 + lvlZero * 15}% Weight` };
    case 'healing':
      return { amount: 4 + lvlZero * 2, text: `+${4 + lvlZero * 2}% Healing` };
    case 'health-regen': {
      const regStrings = ['+1 HP / 8s', '+1 HP / 7.5s', '+1 HP / 7s', '+2 HP / 6.5s', '+2 HP / 6s'];
      return { amount: level, text: regStrings[lvlZero] || regStrings[0] };
    }
    case 'mana-regen': {
      const regStrings = ['+1 MP / 24s', '+1 MP / 22s', '+1 MP / 20s', '+1 MP / 18s', '+1 MP / 16s'];
      return { amount: level, text: regStrings[lvlZero] || regStrings[0] };
    }
    case 'mana-healing':
      return { amount: 3 + lvlZero, text: `+${3 + lvlZero}% Mana Healing` };
    case 'momentum':
      return { amount: 5 + lvlZero, text: `+${5 + lvlZero}% chance Momentum` };
    case 'attack-interval':
      return { amount: 4 + level, text: `-${4 + level}% Attack Interval` };
    case 'life-leech': {
      const amounts = [5, 7, 9, 11, 13];
      const chances = [5, 10, 15, 20, 25];
      const amt = amounts[lvlZero] || (level * 2);
      const ch = chances[lvlZero] || level;
      return { amount: amt, chance: ch, text: `Life Leech (Amount: +${amt}% / Chance: +${ch}%)` };
    }
    case 'mana-leech': {
      const amounts = [3, 4, 5, 6, 7];
      const chances = [5, 10, 15, 20, 25];
      const amt = amounts[lvlZero] || level;
      const ch = chances[lvlZero] || (level * 5);
      return { amount: amt, chance: ch, text: `Mana Leech (Amount: +${amt}% / Chance: +${ch}%)` };
    }
    case 'crit-hit': {
      const isRanged = item ? (item.subCategory === 'Distance' || item.name.toLowerCase().includes('bow') || item.name.toLowerCase().includes('crossbow')) : false;
      const amt = isRanged ? level * 10 : level * 20;
      const ch = level + 4;
      return { amount: amt, chance: ch, text: `Critical Hit (Amount: +${amt}% / Chance: +${ch}%)` };
    }
    case 'burning': {
      const amt = level;
      const ch = level + 4;
      return { amount: amt, chance: ch, text: `Burning (Amount: +${amt} / Chance: +${ch}%)` };
    }
    case 'crushing-blow': {
      const isHeavy = item ? (item.name === "War Hammer" || item.name === "Hammer Of Wrath" || item.name === "Heavy Mace") : false;
      const amt = isHeavy ? (level * 4 + 4) : (level * 2 + 2);
      return { amount: amt, text: `+${amt}% Crushing Blow` };
    }
    case 'perforation': {
      const isHeavy = item ? HEAVY_WEAPONS.includes(item.name) : false;
      const amt = isHeavy ? (level * 4 + 4) : (level * 2 + 2);
      return { amount: amt, text: `+${amt}% Perfuration` };
    }
    case 'double-bash':
      return { amount: 4 + level, text: `+${4 + level}% Double Bash` };
    case 'berserk': {
      const isHeavy = item ? ["Twin Axe", "Guardian Halberd", "Dragon Lance", "War Axe", "Ravager's Axe", "Great Axe"].includes(item.name) : false;
      const amt = isHeavy ? level * 2 : level;
      return { amount: amt, text: `+${amt}% Berserk` };
    }
    case 'bleeding': {
      const amt = level;
      const ch = level + 4;
      return { amount: amt, chance: ch, text: `Bleeding (Amount: +${amt} / Chance: +${ch}%)` };
    }
    case 'freeze': {
      const amt = level;
      const ch = level + 4;
      return { amount: amt, chance: ch, text: `Freeze (Amount: +${amt} / Chance: +${ch}%)` };
    }
    case 'electrify': {
      const amt = level;
      const ch = level + 4;
      return { amount: amt, chance: ch, text: `Electrify (Amount: +${amt} / Chance: +${ch}%)` };
    }
    case 'poison': {
      const amt = level;
      const ch = level + 4;
      return { amount: amt, chance: ch, text: `Poison (Amount: +${amt} / Chance: +${ch}%)` };
    }
    case 'crit-spell': {
      const amt = level * 20;
      const ch = level + 4;
      return { amount: amt, chance: ch, text: `Critical Spell (Amount: +${amt}% / Chance: +${ch}%)` };
    }
    case 'hitchance':
      return { amount: level, text: `+${level}% Hitchance` };
    case 'fire-prot':
      return { amount: level, text: `+${level}% Protect Fire` };
    case 'ice-prot':
      return { amount: level, text: `+${level}% Protect Ice` };
    case 'energy-prot':
      return { amount: level, text: `+${level}% Protect Energy` };
    case 'earth-prot':
      return { amount: level, text: `+${level}% Protect Poison` };
    case 'phys-prot':
      return { amount: level, text: `+${level}% Protect Physical` };
    case 'mana-drain-prot':
      return { amount: level, text: `+${level}% Protect Mana Drain` };
    case 'elements-prot':
      return { amount: level, text: `+${level}% Protect Elements` };
    case 'vibrancy':
      return { amount: level * 5, text: `+${level * 5}% Vibrancy` };
    case 'dodge':
      return { amount: level, text: `+${level}% Dodge` };
    case 'absorb-mana':
      return { amount: level, text: `+${level}% Absorb Mana` };
    case 'arrow-guard':
      return { amount: level, text: `+${level}% Arrow Guard` };
    case 'defense':
      return { amount: level, text: `+${level} Defense` };
    case 'mitigation':
      return { amount: level * 10, text: `+${level * 10}% Mitigation` };
    case 'reflect-fire':
      return { amount: level * 10, text: `+${level * 10}% Reflect Fire` };
    case 'reflect-energy':
      return { amount: level * 10, text: `+${level * 10}% Reflect Energy` };
    case 'reflect-phys':
      return { amount: level * 10, text: `+${level * 10}% Reflect Physical` };
    case 'reflect-elements':
      return { amount: level * 10, text: `+${level * 10}% Reflect Elements` };
    case 'absorb-health':
      return { amount: level, text: `+${level}% Absorb Health` };
    default: {
      const name = ATTRIBUTE_TYPES.find(a => a.id === attrId)?.name || attrId;
      return { amount: level, text: `+${level} ${name}` };
    }
  }
}

export const AttributeEncoder: React.FC<AttributeEncoderProps> = ({ item, currentEnchants, onSave, language }) => {
  const t = (key: keyof typeof translations['pt']) => translations[language][key] || key;

  // Initialize with exactly item.attributeClass enchantment slots
  const [enchants, setEnchants] = useState<EnchantmentValue[]>(() => {
    const slotsCount = item.attributeClass;
    const baseAr = Array.from({ length: slotsCount }).map(() => ({ type: '', level: 0, amount: 0 }));
    currentEnchants.forEach((e, i) => {
      if (i < slotsCount) {
        baseAr[i] = { ...e };
      }
    });
    return baseAr;
  });

  const availableAttributes = ATTRIBUTE_TYPES.filter(attr => 
    item.allowedAttributes.includes(attr.id)
  );

  const isSkillOrMagicObj = (id: string) => 
    ['sword', 'club', 'axe', 'distance', 'magic'].includes(id);

  const activeCount = enchants.filter(e => e.type !== '').length;

  const handleEnchantChange = (index: number, field: keyof EnchantmentValue, value: any) => {
    const newEnchants = [...enchants];
    newEnchants[index] = { ...newEnchants[index], [field]: value };
    
    // Auto scale amount
    if (field === 'type' || field === 'level') {
      const type = field === 'type' ? value : newEnchants[index].type;
      const level = field === 'level' ? value : newEnchants[index].level;
      
      if (type) {
        // level comes 0-indexed (0 to item.attributeClass-1), so we pass level + 1
        const info = getAttributeValueAndDescription(type, level + 1, item);
        newEnchants[index].amount = info.amount;
        if (info.chance !== undefined) {
          newEnchants[index].chance = info.chance;
        } else {
          delete newEnchants[index].chance;
        }
      } else {
        newEnchants[index].amount = 0;
        delete newEnchants[index].chance;
      }
    }
    
    setEnchants(newEnchants);
  };

  const handleClearSlot = (index: number) => {
    const newEnchants = [...enchants];
    newEnchants[index] = { type: '', level: 0, amount: 0 };
    setEnchants(newEnchants);
  };

  const hasSkillsOrMagicSelected = enchants.some(e => e.type !== '' && isSkillOrMagicObj(e.type));

  return (
    <div className="flex flex-col gap-5 max-h-[80vh] overflow-y-auto scrollbar-medieval pr-1">
      <div className="flex items-center gap-4 p-4 bg-medieval-gold/5 border border-medieval-gold/15 rounded-md relative overflow-hidden">
        <div className="absolute right-[-10px] top-[-10px] opacity-10">
          <Sparkles size={80} className="text-medieval-gold animate-pulse" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-medieval-gold uppercase tracking-wider leading-none mb-1">{item.name}</h4>
          <p className="text-[10px] text-medieval-muted">
            {t('bm_classLevelNotice_1')} <span className="text-medieval-gold font-bold">Class {item.attributeClass}</span>
            {t('bm_classLevelNotice_2')} {item.attributeClass} {item.attributeClass === 1 ? t('bm_classLevelNotice_singular') : t('bm_classLevelNotice_3')}
          </p>
        </div>
      </div>

      {hasSkillsOrMagicSelected && (
        <div className="flex items-center gap-2.5 p-2.5 bg-amber-950/20 border border-amber-500/30 text-amber-300 rounded text-[10px] leading-relaxed">
          <ShieldAlert size={14} className="shrink-0 text-amber-400" />
          <span>
            {t('bm_exclusiveNotice')}
          </span>
        </div>
      )}

      <div className="space-y-4">
        {enchants.map((enchant, idx) => {
          // List of allowed attributes for this slot
          const otherSlotsOccupied = enchants
            .map((e, index) => (index !== idx ? e.type : ''))
            .filter(t => t !== '');

          const hasSkillOrMagicInOtherSlots = enchants.some((e, index) => 
            index !== idx && e.type !== '' && isSkillOrMagicObj(e.type)
          );

          // Filtering
          const filteredOptions = availableAttributes.filter(attr => {
            if (otherSlotsOccupied.includes(attr.id)) return false;
            if (isSkillOrMagicObj(attr.id) && hasSkillOrMagicInOtherSlots) return false;
            return true;
          });

          const isSlotActive = enchant.type !== '';
          const currentInfo = isSlotActive ? getAttributeValueAndDescription(enchant.type, enchant.level + 1, item) : null;

          return (
            <div 
              key={idx} 
              className={cn(
                "p-3.5 border rounded-md transition-all duration-300",
                isSlotActive 
                  ? "bg-black/40 border-medieval-gold/20 shadow-[inset_0_0_10px_rgba(197,160,89,0.05)]" 
                  : "bg-black/15 border-medieval-gold/5"
              )}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-medieval-gold/70 uppercase tracking-widest font-mono">
                  {language === 'pt' ? 'Atributo' : 'Attribute'} {idx + 1}
                </span>
                {isSlotActive && (
                  <button 
                    onClick={() => handleClearSlot(idx)}
                    className="text-[9px] text-red-500/80 hover:text-red-400 hover:underline uppercase tracking-wider transition-all"
                  >
                    {t('bm_resetSlot')}
                  </button>
                )}
              </div>

              <div className="space-y-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-medieval-muted">{t('bm_attributeType')}</label>
                  <select 
                    value={enchant.type}
                    onChange={(e) => handleEnchantChange(idx, 'type', e.target.value)}
                    className="medieval-input py-1.5 text-xs bg-black/60 border-medieval-gold/20"
                  >
                    <option value="">{t('bm_noAttributeSelected')}</option>
                    {filteredOptions.map(attr => (
                      <option key={attr.id} value={attr.id}>
                        {attr.name} {isSkillOrMagicObj(attr.id) ? '🛡️' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {isSlotActive && (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] uppercase tracking-wider text-medieval-muted">{t('bm_magnitudeClassLuck')}</label>
                      <span className="text-[9px] text-medieval-gold font-bold font-mono">Lvl {enchant.level + 1} / {item.attributeClass}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {Array.from({ length: item.attributeClass }).map((_, lvlIdx) => (
                        <button
                          key={lvlIdx}
                          onClick={() => handleEnchantChange(idx, 'level', lvlIdx)}
                          className={cn(
                            "flex-1 py-1 px-2 text-[10px] font-bold rounded border transition-all duration-250 font-mono",
                            enchant.level === lvlIdx 
                              ? "bg-medieval-gold text-black border-medieval-gold shadow-[0_0_8px_rgba(197,160,89,0.3)]" 
                              : "bg-black/50 text-medieval-muted border-medieval-gold/15 hover:border-medieval-gold/30 hover:text-white"
                          )}
                        >
                          +{lvlIdx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isSlotActive && currentInfo && (
                  <div className="flex items-center gap-2.5 p-2 bg-medieval-gold/5 rounded border border-medieval-gold/10">
                    <BadgeInfo size={14} className="text-medieval-gold/80" />
                    <span className="text-[11px] font-mono font-bold text-medieval-gold">
                      Preview: {currentInfo.text}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 border-t border-medieval-gold/10 pt-4 flex flex-col gap-2">
        <div className="flex justify-between items-center text-[10px] text-medieval-muted px-1.5">
          <span>{t('bm_activeAttributes')}:</span>
          <span className="font-bold text-medieval-gold font-mono">{activeCount} de {item.attributeClass}</span>
        </div>
        <button 
          onClick={() => onSave(enchants.filter(e => e.type !== ''))}
          className="medieval-button w-full flex items-center justify-center gap-2 py-2.5 font-bold uppercase text-xs tracking-widest shadow-md"
        >
          <CheckCircle2 size={16} /> {t('bm_applyAttributes')}
        </button>
      </div>
    </div>
  );
};
