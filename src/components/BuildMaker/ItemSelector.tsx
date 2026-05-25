
import React, { useState, useMemo } from 'react';
import { GameItem, SlotId } from '../../types/build';
import { ALL_BUILD_ITEMS } from '../../data/buildItems';
import { Search, Shield, Sword, Weight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Language, translations } from '../../lib/translations';

interface ItemSelectorProps {
  slotId: SlotId;
  onSelectItem: (item: GameItem) => void;
  onRemoveItem: () => void;
  language: Language;
}

export const ItemSelector: React.FC<ItemSelectorProps> = ({ slotId, onSelectItem, onRemoveItem, language }) => {
  const t = (key: keyof typeof translations['pt']) => translations[language][key] || key;
  const [search, setSearch] = useState('');
  
  const [activeSubCategory, setActiveSubCategory] = useState<string>(() => {
    if (slotId === 'left-hand') return 'Shields';
    if (slotId === 'right-hand') return 'Swords';
    return '';
  });
  
  const filteredItems = useMemo(() => {
    // Basic slot category matching
    const slotCategory = slotId.split('-')[0]; // simple map
    const categoryMap: Record<string, string> = {
      'head': 'head',
      'armor': 'armor',
      'legs': 'legs',
      'feet': 'feet',
      'right': 'right-hand',
      'left': 'left-hand',
      'necklace': 'necklace',
      'ring': 'ring',
      'relic': 'relic',
      'food': 'food',
      'ammo': 'ammo',
      'backpack': 'backpack'
    };
    
    let items = ALL_BUILD_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = item.category === categoryMap[slotCategory] || !categoryMap[slotCategory];
      
      if (slotId === 'left-hand') {
        const matchesSub = item.subCategory === activeSubCategory;
        return matchesSearch && matchesCategory && matchesSub;
      }
      
      if (slotId === 'right-hand') {
        const matchesSub = item.subCategory === activeSubCategory;
        return matchesSearch && matchesCategory && matchesSub;
      }
      
      return matchesSearch && matchesCategory;
    });

    if (slotId === 'right-hand' || slotId === 'ammo') {
      items = [...items].sort((a, b) => {
        const atkA = a.attack ?? 0;
        const atkB = b.attack ?? 0;
        if (atkA !== atkB) {
          return atkA - atkB;
        }
        return a.name.localeCompare(b.name);
      });
    }

    return items;
  }, [search, slotId, activeSubCategory]);

  const getItemEffectsString = (item: GameItem) => {
    const parts: string[] = [];
    if (item.bonuses) {
      Object.entries(item.bonuses).forEach(([key, val]) => {
        if (key === 'magic') parts.push(`Magic Level +${val}`);
        else if (key === 'speed') parts.push(`Speed +${val}`);
        else if (key === 'melee') parts.push(`Melee +${val}`);
        else if (key === 'sword') parts.push(`Sword +${val}`);
        else if (key === 'axe') parts.push(`Axe +${val}`);
        else if (key === 'club') parts.push(`Club +${val}`);
        else if (key === 'distance') parts.push(`Distance +${val}`);
        else if (key === 'regen') parts.push(`Regen +${val}/s`);
        else if (key === 'health-regen') {
          const rateSec = val > 0 ? (1 / val) : 0;
          parts.push(`HP +1/${rateSec.toFixed(1).replace('.0', '')}s`);
        }
        else if (key === 'mana-regen') {
          const rateSec = val > 0 ? (1 / val) : 0;
          parts.push(`MP +1/${rateSec.toFixed(1).replace('.0', '')}s`);
        }
        else if (key === 'invisibility') parts.push('Invisible');
        else if (key === 'magic-shield') parts.push('Mana Shield');
        else if (key === 'healing') parts.push(`Healing +${val}%`);
        else if (key === 'life-leech-chance') parts.push(`Life Leech ${val}%`);
        else if (key === 'life-leech-amount') parts.push(`Leech Amt +${val}%`);
        else if (key === 'mana-leech-chance') parts.push(`Mana Leech ${val}%`);
        else if (key === 'mana-leech-amount') parts.push(`Leech Amt +${val}%`);
        else if (key === 'reflect-phys-chance') parts.push(`Reflect Phys ${val}%`);
        else if (key === 'reflect-phys-amount') parts.push(`Reflected +${val}%`);
        else if (key.startsWith('dmg-')) {
          const element = key.split('-')[1];
          parts.push(`Dmg ${element.charAt(0).toUpperCase() + element.slice(1)} +${val}%`);
        }
      });
    }
    if (item.protections) {
      Object.entries(item.protections).forEach(([key, val]) => {
        const percent = Math.round(val * 100);
        if (key === 'elements') parts.push(`Prot Elements +${percent}%`);
        else parts.push(`Prot ${key.charAt(0).toUpperCase() + key.slice(1)} +${percent}%`);
      });
    }
    return parts.length > 0 ? parts.join(', ') : '';
  };

  return (
    <div className="flex flex-col gap-4">
      {slotId === 'left-hand' && (
        <div className="flex gap-2 p-1 bg-black/40 border border-medieval-gold/15 rounded">
          <button
            onClick={() => setActiveSubCategory('Shields')}
            className={cn(
              "flex-1 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded",
              activeSubCategory === 'Shields'
                ? "bg-medieval-gold text-black shadow-[0_0_8px_rgba(197,160,89,0.3)]"
                : "text-medieval-muted hover:text-white"
            )}
          >
            {language === 'pt' ? 'Escudos' : 'Shields'}
          </button>
          <button
            onClick={() => setActiveSubCategory('Quivers')}
            className={cn(
              "flex-1 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded",
              activeSubCategory === 'Quivers'
                ? "bg-medieval-gold text-black shadow-[0_0_8px_rgba(197,160,89,0.3)]"
                : "text-medieval-muted hover:text-white"
            )}
          >
            {language === 'pt' ? 'Quivers' : 'Quivers'}
          </button>
        </div>
      )}

      {slotId === 'right-hand' && (
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 border border-medieval-gold/15 rounded">
          <button
            onClick={() => setActiveSubCategory('Swords')}
            className={cn(
              "py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded text-center whitespace-nowrap",
              activeSubCategory === 'Swords'
                ? "bg-medieval-gold text-black shadow-[0_0_8px_rgba(197,160,89,0.3)]"
                : "text-medieval-muted hover:text-white"
            )}
          >
            {language === 'pt' ? 'Espadas' : 'Swords'}
          </button>
          <button
            onClick={() => setActiveSubCategory('Axes')}
            className={cn(
              "py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded text-center whitespace-nowrap",
              activeSubCategory === 'Axes'
                ? "bg-medieval-gold text-black shadow-[0_0_8px_rgba(197,160,89,0.3)]"
                : "text-medieval-muted hover:text-white"
            )}
          >
            {language === 'pt' ? 'Machados' : 'Axes'}
          </button>
          <button
            onClick={() => setActiveSubCategory('Clubs')}
            className={cn(
              "py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded text-center whitespace-nowrap",
              activeSubCategory === 'Clubs'
                ? "bg-medieval-gold text-black shadow-[0_0_8px_rgba(197,160,89,0.3)]"
                : "text-medieval-muted hover:text-white"
            )}
          >
            {language === 'pt' ? 'Clavas' : 'Clubs'}
          </button>
          <button
            onClick={() => setActiveSubCategory('Distance')}
            className={cn(
              "py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded text-center whitespace-nowrap",
              activeSubCategory === 'Distance'
                ? "bg-medieval-gold text-black shadow-[0_0_8px_rgba(197,160,89,0.3)]"
                : "text-medieval-muted hover:text-white"
            )}
          >
            {language === 'pt' ? 'Distância' : 'Distance'}
          </button>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-medieval-gold/40" size={16} />
        <input 
          autoFocus
          placeholder={t('bm_searchLegendaryItems')} 
          className="medieval-input pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button 
          onClick={onRemoveItem}
          className="w-full py-3 px-4 rounded border border-dashed border-red-900/30 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all text-xs uppercase font-bold tracking-widest"
        >
          {t('bm_removeEquipmentSelector') || t('bm_removeEquipment')}
        </button>
        
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            onClick={() => onSelectItem(item)}
            className="medieval-card p-3 cursor-pointer hover:border-medieval-gold/50 transition-all flex items-center justify-between group"
          >
            <div className="flex flex-col">
              <span className="text-sm font-bold text-medieval-gold group-hover:tracking-wider transition-all">{item.name}</span>
              {getItemEffectsString(item) && (
                <span className="text-[10px] text-amber-500/85 font-sans italic my-0.5 max-w-xs truncate" title={getItemEffectsString(item)}>
                  {getItemEffectsString(item)}
                </span>
              )}
              <div className="flex items-center gap-3 mt-1">
                {item.armor !== undefined && (
                  <div className="flex items-center gap-1 text-[10px] text-medieval-muted">
                    <Shield size={10} /> {item.armor}
                  </div>
                )}
                {item.attack !== undefined && (
                  <div className="flex items-center gap-1 text-[10px] text-medieval-muted">
                    <Sword size={10} /> {item.attack}
                  </div>
                )}
                <div className="flex items-center gap-1 text-[10px] text-medieval-muted">
                  <Weight size={10} /> {item.weight}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-medieval-gold/50 font-mono">Class {item.attributeClass}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: item.attributeClass }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-medieval-gold/30" />
                ))}
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-medieval-muted/40 italic text-sm">
            {t('bm_noItemsFound')}
          </div>
        )}
      </div>
    </div>
  );
};
