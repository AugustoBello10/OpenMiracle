import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import itemsData from '../data/miracle/items.json';
import { ATTRIBUTE_DATA } from '../data/wikiData';

interface ItemsWikiViewProps {
  language: 'pt' | 'en';
  initialCategory?: string;
  onCategoryChange?: (category: string) => void;
}

interface ItemRecord {
  id: number;
  name: string;
  slug: string;
  category: string;
  image: string;
  attack?: number | null;
  defense?: number | null;
  armor?: number | null;
  hands?: number | null;
  range?: number | null;
  hitPercent?: string | null;
  breakChance?: string | null;
  size?: number | null;
  weight?: number;
  tierClass?: number | null;
  attributes?: string[] | Array<{ name: string; value: string }>;
}

export function ItemsWikiView({ language, initialCategory, onCategoryChange }: ItemsWikiViewProps) {
  const BLOCKS = [
    {
      id: 'weapons',
      label: language === 'pt' ? 'Bloco 1: Armas' : 'Block 1: Weapons',
      categories: [
        { id: 'swords', label: language === 'pt' ? 'Espadas' : 'Swords', icon: '/images/miracle/items/magic_sword_2400.gif' },
        { id: 'axes', label: language === 'pt' ? 'Machados' : 'Axes', icon: '/images/miracle/items/stonecutter_axe_2431.gif' },
        { id: 'clubs', label: language === 'pt' ? 'Clavas / Maças' : 'Clubs', icon: '/images/miracle/items/thunder_hammer_2421.gif' },
        { id: 'distance', label: language === 'pt' ? 'Distância' : 'Distance', icon: '/images/miracle/items/royal_crossbow_8209.gif' },
        { id: 'quivers', label: language === 'pt' ? 'Aljavas' : 'Quivers', icon: '/images/miracle/items/quiver_7577.gif' },
        { id: 'ammunition', label: language === 'pt' ? 'Munições' : 'Ammunition', icon: '/images/miracle/items/power_bolt_2547.gif' },
      ],
    },
    {
      id: 'equipment',
      label: language === 'pt' ? 'Bloco 2: Equipamentos' : 'Block 2: Equipment',
      categories: [
        { id: 'helmets', label: language === 'pt' ? 'Capacetes' : 'Helmets', icon: '/images/miracle/items/demon_helmet_2493.gif' },
        { id: 'armors', label: language === 'pt' ? 'Armaduras' : 'Armors', icon: '/images/miracle/items/magic_plate_armor_2472.gif' },
        { id: 'legs', label: language === 'pt' ? 'Calças' : 'Legs', icon: '/images/miracle/items/golden_legs_2470.gif' },
        { id: 'boots', label: language === 'pt' ? 'Botas' : 'Boots', icon: '/images/miracle/items/boots_of_haste_2195.gif' },
        { id: 'shields', label: language === 'pt' ? 'Escudos' : 'Shields', icon: '/images/miracle/items/mastermind_shield_2514.gif' },
      ],
    },
    {
      id: 'accessories',
      label: language === 'pt' ? 'Bloco 3: Acessórios & Treino' : 'Block 3: Accessories & Training',
      categories: [
        { id: 'amulets', label: language === 'pt' ? 'Amuletos' : 'Amulets', icon: '/images/miracle/items/platinum_amulet_2171.gif' },
        { id: 'rings', label: language === 'pt' ? 'Anéis' : 'Rings', icon: '/images/miracle/items/ring_of_the_sky_2123.gif' },
        { id: 'relics', label: language === 'pt' ? 'Relíquias' : 'Relics', icon: '/images/miracle/items/ancient_whisper_7518.gif' },
        { id: 'training', label: language === 'pt' ? 'Armas de Treino' : 'Training Weapons', icon: '/images/miracle/items/training_sword_7481.gif' },
      ],
    },
    {
      id: 'utilities',
      label: language === 'pt' ? 'Bloco 4: Utilitários & Outros' : 'Block 4: Utilities & Others',
      categories: [
        { id: 'runes', label: language === 'pt' ? 'Runas' : 'Runes', icon: '/images/miracle/items/sudden_death_rune_2268.gif' },
        { id: 'tools', label: language === 'pt' ? 'Ferramentas' : 'Tools', icon: '/images/miracle/items/rope_2120.gif' },
        { id: 'foods', label: language === 'pt' ? 'Comidas' : 'Foods', icon: '/images/miracle/items/meat_2666.gif' },
        { id: 'containers', label: language === 'pt' ? 'Mochilas' : 'Containers', icon: '/images/miracle/items/backpack_1988.gif' },
        { id: 'valuables', label: language === 'pt' ? 'Valiosos' : 'Valuables', icon: '/images/miracle/items/crystal_coin_2160.gif' },
      ],
    },
  ];

  // Helper para identificar o bloco pertencente a uma categoria
  const findBlockForCat = (catId?: string) => {
    if (!catId) return { blockId: 'weapons' as const, catId: 'swords' };
    for (const b of BLOCKS) {
      if (b.categories.some(c => c.id === catId)) {
        return { blockId: b.id as 'weapons' | 'equipment' | 'accessories' | 'utilities', catId };
      }
    }
    return { blockId: 'weapons' as const, catId: 'swords' };
  };

  const initialResolved = findBlockForCat(initialCategory);

  const [selectedBlock, setSelectedBlock] = useState<'weapons' | 'equipment' | 'accessories' | 'utilities'>(initialResolved.blockId);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialResolved.catId);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<number | 'all'>('all');

  // Sincroniza se o initialCategory mudar via URL / props externas
  useEffect(() => {
    if (initialCategory) {
      for (const b of BLOCKS) {
        if (b.categories.some(c => c.id === initialCategory)) {
          setSelectedBlock(b.id as any);
          setSelectedCategory(initialCategory);
          break;
        }
      }
    }
  }, [initialCategory]);

  // When block changes, auto-select first category of that block if current not in it
  const currentBlockObj = BLOCKS.find(b => b.id === selectedBlock) || BLOCKS[0];
  const isCategoryInBlock = currentBlockObj.categories.some(c => c.id === selectedCategory);
  const activeCategory = isCategoryInBlock ? selectedCategory : currentBlockObj.categories[0].id;

  const WEAPON_CATEGORIES = ['swords', 'axes', 'clubs', 'distance', 'training'];
  const showHands = WEAPON_CATEGORIES.includes(activeCategory);

  // Resolve attributes from item record or ATTRIBUTE_DATA
  const getAttributesForItem = (item: ItemRecord): string[] => {
    if (Array.isArray(item.attributes) && item.attributes.length > 0) {
      if (typeof item.attributes[0] === 'string') {
        return item.attributes as string[];
      }
    }
    for (const group of Object.values(ATTRIBUTE_DATA)) {
      const found = group.find((i: any) => i.name.toLowerCase() === item.name.toLowerCase());
      if (found && found.attributes) return found.attributes;
    }
    return [];
  };

  // Resolve item class from item or ATTRIBUTE_DATA
  const getItemClass = (item: ItemRecord): number | null => {
    if (item.tierClass !== null && item.tierClass !== undefined && item.tierClass >= 1 && item.tierClass <= 5) {
      return item.tierClass;
    }
    for (const group of Object.values(ATTRIBUTE_DATA)) {
      const found = group.find((i: any) => i.name.toLowerCase() === item.name.toLowerCase());
      if (found && typeof found.class === 'number' && found.class >= 1 && found.class <= 5) return found.class;
    }
    return null;
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return (itemsData as ItemRecord[]).filter((item) => {
      // Category match
      if (item.category !== activeCategory) return false;

      // Class match
      const itemClass = getItemClass(item);
      if (selectedClass !== 'all' && itemClass !== selectedClass) return false;

      // Search match (name or attribute)
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const attrs = getAttributesForItem(item);
        const matchesAttr = attrs.some(a => a.toLowerCase().includes(query));
        if (!matchesName && !matchesAttr) return false;
      }

      return true;
    });
  }, [activeCategory, selectedClass, search]);

  return (
    <div className="space-y-8 text-left">
      <header className="text-center relative py-6">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 text-center">
          {language === 'pt' ? 'Catálogo Oficial de Itens' : 'Official Items Encyclopedia'}
        </h1>
        <p className="text-stone-300 font-sans text-xs max-w-2xl mx-auto tracking-wide">
          {language === 'pt' 
            ? 'Enciclopédia com 627 itens oficiais do Miracle 7.4 divididos em 4 blocos organizados com imagens locais e atributos.'
            : 'Encyclopedia with 627 official Miracle 7.4 items partitioned into 4 structured blocks with local sprites and attributes.'}
        </p>
      </header>

      {/* 4 MAIN BLOCKS SELECTOR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {BLOCKS.map((block) => {
          const isSelected = selectedBlock === block.id;
          return (
            <button
              key={block.id}
              onClick={() => {
                setSelectedBlock(block.id as any);
                const firstCat = block.categories[0].id;
                setSelectedCategory(firstCat);
                onCategoryChange?.(firstCat);
              }}
              className={`p-3.5 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-medieval-gold to-yellow-600 text-black border-medieval-gold shadow-[0_0_15px_rgba(197,160,89,0.3)] font-black scale-102'
                  : 'bg-black/60 text-stone-300 border-medieval-gold/20 hover:border-medieval-gold/50 hover:bg-black/80'
              }`}
            >
              <span className="text-xs uppercase tracking-wider font-bold text-center line-clamp-1">{block.label}</span>
            </button>
          );
        })}
      </div>

      {/* CATEGORIES PILLS FOR CURRENT BLOCK */}
      <div className="flex flex-wrap gap-2 items-center bg-black/40 p-3 rounded-xl border border-medieval-gold/10">
        <span className="text-[10px] font-mono text-medieval-gold/50 uppercase tracking-widest pl-1 mr-2">
          {language === 'pt' ? 'Categorias:' : 'Categories:'}
        </span>
        {currentBlockObj.categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const count = (itemsData as ItemRecord[]).filter(i => i.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                onCategoryChange?.(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-medieval-gold/20 border-medieval-gold text-yellow-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                  : 'bg-black/40 border-white/10 text-stone-400 hover:text-white hover:border-white/30'
              }`}
            >
              <img src={cat.icon} alt={cat.label} className="w-4 h-4 object-contain pixelated" />
              <span>{cat.label}</span>
              <span className="text-[10px] font-mono text-stone-500 font-normal">({count})</span>
            </button>
          );
        })}
      </div>

      {/* SEARCH AND FILTERS BAR */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-black/60 p-4 rounded-xl border border-medieval-gold/20">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder={language === 'pt' ? 'Buscar item ou atributo...' : 'Search item or attribute...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/80 border border-medieval-gold/30 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-medieval-gold"
          />
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
        </div>

        {/* CLASS FILTER */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[10px] font-mono uppercase text-stone-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> {language === 'pt' ? 'Classe:' : 'Class:'}
          </span>
          {(['all', 1, 2, 3, 4, 5] as const).map((cls) => {
            const isSel = selectedClass === cls;
            return (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase cursor-pointer border transition-all ${
                  isSel
                    ? cls === 'all'
                      ? 'bg-medieval-gold text-black border-medieval-gold font-black'
                      : cls === 1
                      ? 'bg-white text-black border-white font-black shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                      : cls === 2
                      ? 'bg-emerald-500 text-black border-emerald-400 font-black shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                      : cls === 3
                      ? 'bg-sky-500 text-black border-sky-400 font-black shadow-[0_0_8px_rgba(14,165,233,0.4)]'
                      : cls === 4
                      ? 'bg-purple-600 text-white border-purple-400 font-black shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                      : 'bg-amber-400 text-black border-amber-300 font-black shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                    : cls === 1
                    ? 'bg-black/40 text-stone-200 border-white/20 hover:border-white/50'
                    : cls === 2
                    ? 'bg-black/40 text-emerald-400/80 border-emerald-500/20 hover:border-emerald-500/50'
                    : cls === 3
                    ? 'bg-black/40 text-sky-400/80 border-sky-500/20 hover:border-sky-500/50'
                    : cls === 4
                    ? 'bg-black/40 text-purple-400/80 border-purple-500/20 hover:border-purple-500/50'
                    : cls === 5
                    ? 'bg-black/40 text-amber-300/80 border-amber-400/20 hover:border-amber-400/50'
                    : 'bg-black/40 text-stone-400 border-white/10 hover:border-white/30'
                }`}
              >
                {cls === 'all' ? (language === 'pt' ? 'Todas' : 'All') : `Cl. ${cls}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* ITEMS TABLE */}
      <div className="bg-black/80 border border-medieval-gold/20 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/90 border-b border-medieval-gold/20 text-[10px] font-black uppercase tracking-widest text-medieval-gold">
                <th className="p-3.5">{language === 'pt' ? 'Item' : 'Item'}</th>
                <th className="p-3.5 text-center">{language === 'pt' ? 'Atributos Base' : 'Base Stats'}</th>
                {showHands && (
                  <th className="p-3.5 text-center whitespace-nowrap min-w-[90px]">{language === 'pt' ? 'Mãos' : 'Hands'}</th>
                )}
                <th className="p-3.5 text-center whitespace-nowrap min-w-[85px]">{language === 'pt' ? 'Peso' : 'Weight'}</th>
                <th className="p-3.5 text-center whitespace-nowrap min-w-[105px]">{language === 'pt' ? 'Classe' : 'Class'}</th>
                <th className="p-3.5">{language === 'pt' ? 'Atributos Místicos (Mystic Runes)' : 'Mystic Attributes'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-stone-300">
              {filteredItems.map((item) => {
                const itemClass = getItemClass(item);
                const attrs = getAttributesForItem(item);

                return (
                  <tr key={`${item.category}-${item.id}-${item.slug}`} className="hover:bg-white/5 transition-colors group">
                    {/* ICON + NAME */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded bg-black/80 flex items-center justify-center p-1 transition-all shadow-inner shrink-0 ${
                          itemClass === 1 ? 'border border-white/40' :
                          itemClass === 2 ? 'border border-emerald-500/50' :
                          itemClass === 3 ? 'border border-sky-500/50' :
                          itemClass === 4 ? 'border border-purple-500/50' :
                          itemClass === 5 ? 'border border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.3)]' :
                          'border border-medieval-gold/20 group-hover:border-medieval-gold/50'
                        }`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain pixelated"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <span className="font-bold text-sm text-stone-200 group-hover:text-medieval-gold transition-colors block">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono text-stone-500 uppercase">
                            ID: {item.id} • {item.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* BASE STATS (ATK, DEF, ARM) */}
                    <td className="p-3.5 text-center font-mono">
                      <div className="flex flex-col items-center gap-0.5 text-xs">
                        {['helmets', 'armors', 'legs', 'boots'].includes(item.category) ? (
                          item.armor !== null && item.armor !== undefined ? (
                            <span className="text-amber-400 font-bold">Arm: {item.armor}</span>
                          ) : (
                            <span className="text-stone-600">-</span>
                          )
                        ) : item.category === 'shields' ? (
                          item.defense !== null && item.defense !== undefined ? (
                            <span className="text-sky-400 font-bold">Def: {item.defense}</span>
                          ) : (
                            <span className="text-stone-600">-</span>
                          )
                        ) : item.category === 'distance' ? (
                          <div className="flex flex-col items-center gap-0.5 text-xs">
                            {item.attack !== null && item.attack !== undefined && (
                              <span className="text-red-400 font-bold">
                                Atk: {(item.name.toLowerCase().includes('bow') || item.name.toLowerCase().includes('crossbow')) ? `+${item.attack}` : item.attack}
                              </span>
                            )}
                            {item.range !== null && item.range !== undefined && (
                              <span className="text-emerald-400 font-bold">
                                {language === 'pt' ? 'Alcance' : 'Range'}: {item.range}
                              </span>
                            )}
                            {item.hitPercent && item.hitPercent !== '0%' && (
                              <span className="text-sky-400 font-bold">
                                {language === 'pt' ? 'Acerto' : 'Hit'}: +{item.hitPercent}
                              </span>
                            )}
                            {item.breakChance && item.breakChance !== '0%' && (
                              <span className="text-stone-400 text-[10px]">
                                {language === 'pt' ? 'Quebra' : 'Break'}: {item.breakChance}
                              </span>
                            )}
                            {item.armor !== null && item.armor !== undefined && item.armor > 0 && (
                              <span className="text-amber-400 font-bold">Arm: {item.armor}</span>
                            )}
                          </div>
                        ) : item.category === 'quivers' ? (
                          <div className="flex flex-col items-center gap-0.5 text-xs">
                            <span className="text-red-400 font-bold">
                              Atk: {item.attack && item.attack > 0 ? `+${item.attack}` : '0'}
                            </span>
                            {item.armor !== null && item.armor !== undefined && item.armor > 0 && (
                              <span className="text-amber-400 font-bold">Arm: {item.armor}</span>
                            )}
                            {item.hitPercent && item.hitPercent !== '-' && item.hitPercent !== '0%' && (
                              <span className="text-sky-400 font-bold">
                                {language === 'pt' ? 'Acerto' : 'Hit'}: +{item.hitPercent}
                              </span>
                            )}
                            {item.size !== null && item.size !== undefined && item.size > 0 && (
                              <span className="text-purple-400 text-[10px] font-bold">
                                {language === 'pt' ? 'Slots' : 'Cap'}: {item.size}
                              </span>
                            )}
                          </div>
                        ) : (
                          <>
                            {item.attack !== null && item.attack !== undefined && item.attack > 0 && (
                              <span className="text-red-400 font-bold">
                                Atk: {item.attack}
                              </span>
                            )}
                            {item.defense !== null && item.defense !== undefined && item.defense > 0 && (
                              <span className="text-sky-400 font-bold">Def: {item.defense}</span>
                            )}
                            {item.armor !== null && item.armor !== undefined && item.armor > 0 && (
                              <span className="text-amber-400 font-bold">Arm: {item.armor}</span>
                            )}
                            {(!item.attack && !item.defense && !item.armor) && (
                              <span className="text-stone-600">-</span>
                            )}
                          </>
                        )}
                      </div>
                    </td>

                    {/* HANDS (ONLY FOR WEAPONS) */}
                    {showHands && (
                      <td className="p-3.5 text-center font-mono text-[11px] text-stone-400 whitespace-nowrap min-w-[90px]">
                        {item.hands === 2 ? (
                          <span className="inline-block px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-500/20 whitespace-nowrap">2-handed</span>
                        ) : item.hands === 1 ? (
                          <span className="inline-block px-2 py-0.5 rounded bg-zinc-800 text-stone-400 whitespace-nowrap">1-handed</span>
                        ) : (
                          <span className="text-stone-600">-</span>
                        )}
                      </td>
                    )}

                    {/* WEIGHT */}
                    <td className="p-3.5 text-center font-mono text-xs text-stone-400 whitespace-nowrap min-w-[85px]">
                      {item.weight ? `${item.weight.toFixed(1)} oz` : '-'}
                    </td>

                    {/* CLASS */}
                    <td className="p-3.5 text-center whitespace-nowrap min-w-[105px]">
                      {itemClass !== null && itemClass >= 1 ? (
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap ${
                          itemClass === 1 ? 'bg-white/10 text-white border border-white/50 shadow-[0_0_6px_rgba(255,255,255,0.2)]' :
                          itemClass === 2 ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/50 shadow-[0_0_6px_rgba(16,185,129,0.2)]' :
                          itemClass === 3 ? 'bg-sky-950/60 text-sky-400 border border-sky-500/50 shadow-[0_0_6px_rgba(14,165,233,0.2)]' :
                          itemClass === 4 ? 'bg-purple-950/60 text-purple-400 border border-purple-500/50 shadow-[0_0_6px_rgba(168,85,247,0.2)]' :
                          'bg-amber-500/20 text-amber-300 border border-amber-400/80 shadow-[0_0_10px_rgba(251,191,36,0.35)]'
                        }`}>
                          {language === 'pt' ? 'Classe' : 'Class'} {itemClass}
                        </span>
                      ) : (
                        <span className="text-stone-600 font-mono text-[10px]">-</span>
                      )}
                    </td>

                    {/* ATTRIBUTES */}
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1 max-w-md">
                        {attrs.length > 0 ? (
                          attrs.map((attr, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-medieval-gold/20 text-yellow-200/80 uppercase"
                            >
                              {attr}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-stone-400 font-mono italic">
                            {language === 'pt' ? 'Sem atributos místicos' : 'No mystic attributes'}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-stone-500 text-xs">
            {language === 'pt' ? 'Nenhum item encontrado com os filtros atuais.' : 'No items found matching the current filters.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemsWikiView;
