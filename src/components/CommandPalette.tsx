import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  Compass, 
  Hammer, 
  MapPin, 
  Sparkles, 
  Calculator, 
  BookOpen, 
  Shield, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useMap } from '../context/MapContext';

export interface SearchItem {
  id: string;
  title: string;
  category: 'systems' | 'calculators' | 'npcs' | 'items' | 'quests';
  description?: string;
  keywords?: string[];
  action?: () => void;
  coords?: { x: number; y: number; z: number };
  badge?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'pt' | 'en';
  onNavigateTab: (tabId: string, subTab?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const { openMap } = useMap();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Lista mestre indexada do Miracle Wiki
  const searchDatabase: SearchItem[] = useMemo(() => [
    // --- SISTEMAS & PROFISSÕES ---
    {
      id: 'sys-crafting',
      title: language === 'pt' ? 'Blacksmith & Forja (Crafting)' : 'Blacksmith & Crafting',
      category: 'systems',
      description: language === 'pt' ? 'Como se tornar ferreiro, ferramentas, quebra de itens e receitas' : 'Forge profession, tools, salvaging and recipes',
      keywords: ['forja', 'craft', 'blacksmith', 'quebrar', 'steel', 'ferreiro', 'sweaty cyclops'],
      action: () => onNavigateTab('profissoes', 'crafting'),
    },
    {
      id: 'sys-mining',
      title: language === 'pt' ? 'Minerador (Mining)' : 'Mining Guide',
      category: 'systems',
      description: language === 'pt' ? 'Picaretas, fragilidade, chances de drop de solos, fragmentos e gemas' : 'Picks, fragility, drop chances of soils, fragments, and gems',
      keywords: ['minerar', 'mining', 'pick', 'picareta', 'advanced pick', 'natural soil', 'frozen ore'],
      action: () => onNavigateTab('profissoes', 'mining'),
    },
    {
      id: 'sys-alchemy',
      title: language === 'pt' ? 'Alquimia (Alchemy)' : 'Alchemy Guide',
      category: 'systems',
      description: language === 'pt' ? 'Runas exclusivas, Cristais Elementais (Spark, Lightning, Inferno)' : 'Exclusive runes, Elemental Crystals',
      keywords: ['alquimia', 'alchemy', 'cristal', 'spark', 'inferno', 'lightning', 'runas'],
      action: () => onNavigateTab('profissoes', 'alchemy'),
    },
    {
      id: 'sys-skinning',
      title: language === 'pt' ? 'Esfolador (Skinning)' : 'Skinning Guide',
      category: 'systems',
      description: language === 'pt' ? 'Combat Knife, Diamond Knife e extração de couros e peles raras' : 'Combat Knife, Diamond Knife, leathers and furs',
      keywords: ['skinning', 'esfolar', 'faca', 'diamond knife', 'leather', 'couro'],
      action: () => onNavigateTab('profissoes', 'skinning'),
    },
    {
      id: 'sys-fishing',
      title: language === 'pt' ? 'Pescador (Fishing)' : 'Fishing Guide',
      category: 'systems',
      description: language === 'pt' ? 'Varas especiais (Reinforced, Engineered, Volcanic, Golden Rod)' : 'Special rods and fishing mechanics',
      keywords: ['pesca', 'fishing', 'rod', 'vara', 'golden rod', 'volcanic rod'],
      action: () => onNavigateTab('profissoes', 'fishing'),
    },
    {
      id: 'sys-cooking',
      title: language === 'pt' ? 'Culinária (Cooking)' : 'Cooking Guide',
      category: 'systems',
      description: language === 'pt' ? 'Receitas para o forno e fogão que concedem buffs de regeneração e velocidade' : 'Dishes with regeneration and haste buffs',
      keywords: ['cooking', 'culinaria', 'comida', 'forno', 'stove', 'buffs'],
      action: () => onNavigateTab('profissoes', 'cooking'),
    },
    {
      id: 'sys-relic-box',
      title: language === 'pt' ? 'Sistema de Relic Box' : 'Relic Box System',
      category: 'systems',
      description: language === 'pt' ? 'Como destravar os 4 slots, custos em gold, Djinn Magic e timer de 48h' : 'Unlocking 4 slots, gold costs, Djinn Magic and 48h timer',
      keywords: ['relic', 'reliquia', 'relic box', 'djinn magic', 'melchior', 'slot'],
      action: () => onNavigateTab('wiki', 'sistemas-custom'),
    },
    {
      id: 'sys-essences',
      title: language === 'pt' ? 'Spawn & Demonic Essences' : 'Spawn & Demonic Essences',
      category: 'systems',
      description: language === 'pt' ? 'Field roxo de aceleração de respawn e field vermelho de bônus de XP/Loot' : 'Respawn reduction field and XP/Loot booster field',
      keywords: ['spawn essence', 'demonic essence', 'field', 'respawn', 'boost', 'defeated whispers'],
      action: () => onNavigateTab('wiki', 'sistemas-custom'),
    },
    {
      id: 'sys-bless',
      title: language === 'pt' ? 'Blessings & The Arcane Guardian' : 'Blessings & The Arcane Guardian',
      category: 'systems',
      description: language === 'pt' ? 'Redução de penalidade de morte e proteção de atributos de itens' : 'Death penalty reduction and attribute protection',
      keywords: ['bless', 'morte', 'arcane guardian', 'eremo', 'norf', 'humphrey', 'aol'],
      action: () => onNavigateTab('calculadoras', 'bless'),
    },

    // --- FERRAMENTAS & CALCULADORAS ---
    {
      id: 'calc-buildmaker',
      title: 'Build Maker',
      category: 'calculators',
      description: language === 'pt' ? 'Simulador completo de equipamentos, slots, gemas e atributos' : 'Complete character equipment and stats simulator',
      keywords: ['build', 'buildmaker', 'simulador', 'equipamentos', 'set', 'atributos'],
      action: () => onNavigateTab('buildmaker'),
    },
    {
      id: 'calc-mapa',
      title: language === 'pt' ? 'Mapa Interativo de Tibia 7.4' : 'Interactive World Map 7.4',
      category: 'calculators',
      description: language === 'pt' ? 'Explore o mapa mundi, NPCs, respawns e rotas em alta resolução' : 'Explore world map, spawns, NPCs and floors',
      keywords: ['mapa', 'map', 'interactive map', 'rotas', 'respawns', 'coords'],
      action: () => onNavigateTab('mapa'),
    },
    {
      id: 'calc-skills',
      title: language === 'pt' ? 'Calculadora de Treino & Skills' : 'Skill Training Calculator',
      category: 'calculators',
      description: language === 'pt' ? 'Calcule tempo e mana necessários para avançar de skill e magic level' : 'Calculate time and mana needed to advance skill',
      keywords: ['skill', 'treino', 'magic level', 'training weapons', 'tempo'],
      action: () => onNavigateTab('calculadoras', 'skills'),
    },
    {
      id: 'calc-loot',
      title: language === 'pt' ? 'Otimizador de Loot' : 'Loot Optimizer',
      category: 'calculators',
      description: language === 'pt' ? 'Analise seus lucros de caça e divisão com o time' : 'Analyze hunt profits and split with party',
      keywords: ['loot', 'lucro', 'waste', 'hunt', 'otimizador'],
      action: () => onNavigateTab('loot'),
    },

    // --- NPCS & LOCAIS CHAVE (COM APONTAMENTO NO MAPA) ---
    {
      id: 'npc-cyclops',
      title: 'A Sweaty Cyclops (Ferreiro Mestre)',
      category: 'npcs',
      description: language === 'pt' ? "Ab'Dendriel — Forjador e mestre da profissão de Crafting" : "Ab'Dendriel — Master of Crafting profession",
      keywords: ['sweaty cyclops', 'ferreiro', 'ab dendriel', 'crafting', 'bigorna'],
      coords: { x: 32698, y: 31677, z: 2 },
      badge: 'Ab\'Dendriel',
    },
    {
      id: 'npc-eremo',
      title: 'Eremo (Sábio de Edron)',
      category: 'npcs',
      description: language === 'pt' ? 'Ilha de Eremo — Vende The Wisdom of Solitude, Bless Tome e Arcane Guardian' : 'Eremo Isle — Sells Wisdom bless, Bless Tome and Arcane Guardian',
      keywords: ['eremo', 'edron', 'solitude', 'bless tome', 'arcane guardian'],
      coords: { x: 33322, y: 31883, z: 7 },
      badge: 'Edron (Ilha)',
    },
    {
      id: 'npc-norf',
      title: 'Norf (The Spiritual Shielding)',
      category: 'npcs',
      description: language === 'pt' ? 'White Stone Temple (Norte de Thais) — Bless Spiritual' : 'White Stone Temple (North of Thais) — Spiritual bless',
      keywords: ['norf', 'thais', 'spiritual', 'white stone'],
      coords: { x: 32346, y: 32361, z: 6 },
      badge: 'Thais',
    },
    {
      id: 'npc-humphrey',
      title: 'Humphrey (The Embrace of Tibia)',
      category: 'npcs',
      description: language === 'pt' ? 'Carlin (Norte) — Bless Embrace e Arcane Guardian' : 'Carlin (North) — Embrace bless and Arcane Guardian',
      keywords: ['humphrey', 'carlin', 'embrace', 'arcane guardian'],
      coords: { x: 32359, y: 31683, z: 6 },
      badge: 'Carlin',
    },
    {
      id: 'npc-edala',
      title: 'Edala (The Fire of the Suns)',
      category: 'npcs',
      description: language === 'pt' ? "Ab'Dendriel (Cúpula) — Bless Fire of the Suns" : "Ab'Dendriel (Treetop) — Fire bless",
      keywords: ['edala', 'ab dendriel', 'fire of the suns'],
      coords: { x: 32697, y: 31718, z: 2 },
      badge: 'Ab\'Dendriel',
    },
    {
      id: 'npc-kawill',
      title: 'Kawill (The Spark of the Phoenix)',
      category: 'npcs',
      description: language === 'pt' ? 'Kazordoon (Templo) — Bless Spark of the Phoenix' : 'Kazordoon (Temple) — Spark bless',
      keywords: ['kawill', 'kazordoon', 'spark', 'phoenix'],
      coords: { x: 32644, y: 31967, z: 12 },
      badge: 'Kazordoon',
    },
    {
      id: 'npc-defeated-whispers',
      title: 'Defeated Whispers (Vendedor de Essências)',
      category: 'npcs',
      description: language === 'pt' ? 'Shadowport (Próximo à bless de Thais) — Vende Spawn Essences por 1k' : 'Shadowport — Sells Spawn Essences for 1k',
      keywords: ['defeated whispers', 'shadowport', 'spawn essence', 'essencia', 'thais'],
      coords: { x: 32346, y: 32361, z: 6 },
      badge: 'Shadowport',
    },

    // --- ITENS ESSENCIAIS ---
    {
      id: 'item-iron-hammer',
      title: 'Iron Hammer (Martelo de Forja)',
      category: 'items',
      description: language === 'pt' ? 'Ferramenta obrigatória de ferreiro. Recompensa da Quest de Kazordoon' : 'Mandatory blacksmith tool from Kazordoon Quest',
      keywords: ['iron hammer', 'martelo', 'forja', 'kazordoon quest'],
      coords: { x: 32644, y: 31967, z: 12 },
      badge: 'Item de Quest',
    },
    {
      id: 'item-diamond-knife',
      title: 'Diamond Knife (Faca de Esfolar)',
      category: 'items',
      description: language === 'pt' ? 'Faca avançada forjada com 10 Small Diamonds + 5 Hell Steels' : 'Advanced skinning knife crafted with diamonds and hell steel',
      keywords: ['diamond knife', 'faca', 'skinning', 'hell steel'],
      action: () => onNavigateTab('profissoes', 'skinning'),
    },
    {
      id: 'item-golden-rod',
      title: 'Golden Rod (Vara Dourada)',
      category: 'items',
      description: language === 'pt' ? 'Vara de pesca lendária forjada com Gold Ingots e Hell Steels' : 'Legendary fishing rod crafted with gold ingots',
      keywords: ['golden rod', 'pesca', 'gold ingot', 'vara'],
      action: () => onNavigateTab('profissoes', 'fishing'),
    },
  ], [language, onNavigateTab]);

  // Filtragem inteligente da busca
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      if (selectedFilter === 'all') return searchDatabase.slice(0, 8);
      return searchDatabase.filter((i) => i.category === selectedFilter).slice(0, 8);
    }

    const normalize = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

    const q = normalize(query);

    return searchDatabase
      .filter((item) => {
        if (selectedFilter !== 'all' && item.category !== selectedFilter) return false;

        const matchTitle = normalize(item.title).includes(q);
        const matchDesc = item.description ? normalize(item.description).includes(q) : false;
        const matchKeywords = item.keywords?.some((k) => normalize(k).includes(q)) || false;

        return matchTitle || matchDesc || matchKeywords;
      })
      .slice(0, 10);
  }, [searchDatabase, query, selectedFilter]);

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredResults[selectedIndex];
      if (current) {
        handleSelectItem(current);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    if (item.coords) {
      openMap(item.coords, item.title);
      onClose();
    } else if (item.action) {
      item.action();
      onClose();
    }
  };

  if (!isOpen) return null;

  const filterTabs = [
    { id: 'all', label: language === 'pt' ? 'Tudo' : 'All' },
    { id: 'systems', label: language === 'pt' ? 'Sistemas & Profissões' : 'Systems' },
    { id: 'npcs', label: 'NPCs & Locais' },
    { id: 'calculators', label: language === 'pt' ? 'Ferramentas' : 'Tools' },
    { id: 'items', label: language === 'pt' ? 'Itens' : 'Items' },
  ];

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-start justify-center p-4 sm:p-6 md:p-20 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#141210] border-2 border-medieval-gold/40 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Barra de entrada de texto */}
        <div className="relative border-b border-medieval-gold/20 p-4 flex items-center gap-3 bg-black/60">
          <Search className="w-5 h-5 text-medieval-gold/70 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              language === 'pt'
                ? 'Buscar por sistema, NPC, item, rota ou fórmula...'
                : 'Search systems, NPCs, items, routes or formulas...'
            }
            className="w-full bg-transparent text-white placeholder:text-stone-500 text-sm sm:text-base font-sans focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-stone-400 bg-white/10 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-black/30 border-b border-white/5 overflow-x-auto text-xs font-mono">
          {filterTabs.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-medieval-gold/20 text-medieval-gold font-bold border border-medieval-gold/40'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Lista de Resultados */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-white/5">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-stone-500 font-mono text-xs">
              {language === 'pt'
                ? 'Nenhum resultado encontrado para "' + query + '"'
                : 'No results found for "' + query + '"'}
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-medieval-gold/15 border border-medieval-gold/40 shadow-sm'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 pr-2">
                    <div className="p-2 rounded-lg bg-black/60 border border-white/10 text-medieval-gold mt-0.5 shrink-0">
                      {item.coords ? (
                        <Compass className="w-4 h-4 text-sky-400" />
                      ) : item.category === 'systems' ? (
                        <Hammer className="w-4 h-4 text-orange-400" />
                      ) : item.category === 'calculators' ? (
                        <Calculator className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-medieval-gold" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 border border-white/10 text-stone-400 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-stone-400 truncate font-sans mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {item.coords ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 bg-sky-950/40 border border-sky-500/30 px-2 py-1 rounded-md">
                        <Compass className="w-3 h-3" />
                        Ver no Mapa
                      </span>
                    ) : (
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-medieval-gold' : 'text-stone-600'}`} />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Rodapé com dicas de atalho */}
        <div className="bg-black/60 px-4 py-2 border-t border-medieval-gold/15 flex items-center justify-between text-[11px] font-mono text-stone-500">
          <div className="flex items-center gap-3">
            <span>↑↓ para navegar</span>
            <span>↵ para abrir</span>
            <span>ESC para sair</span>
          </div>
          <span className="text-medieval-gold/60 font-semibold">Miracle Spotlight</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
