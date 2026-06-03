import React, { useState, useMemo } from 'react';
import { 
  Coins, Trash2, Scale, Search, Plus, Minus, MapPin, Check, 
  AlertCircle, Sparkles, TrendingUp, HelpCircle, Info, Sliders, 
  Navigation, ArrowRight, Clipboard, RefreshCw, FileText, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOOT_DATABASE, LootItem, NpcBuyer } from '../data/lootDb';

const LOCAL_LOOT_DATABASE: LootItem[] = LOOT_DATABASE.map(item => ({
  ...item,
  buyers: item.buyers.map(buyer => {
    let finalCity = buyer.city;
    if (buyer.city === 'Djinns (Ankrahmun)') {
      const npcLower = buyer.npc.toLowerCase();
      if (npcLower.includes('bob') || npcLower.includes('haroun')) {
        finalCity = 'Blue Djinn (Ankrahmun)';
      } else if (npcLower.includes('alesar') || npcLower.includes('yaman')) {
        finalCity = 'Green Djinn (Ankrahmun)';
      }
    }
    return {
      ...buyer,
      city: finalCity
    };
  })
}));

interface LootOptimizerProps {
  language: 'pt' | 'en';
  rashidCity?: string;
}

interface SelectedLootItem {
  item: LootItem;
  quantity: number;
}

export interface ParseLog {
  id: string;
  type: 'success' | 'corrected' | 'warning';
  originalText: string;
  processedText?: string;
  confidence?: number;
  quantity: number;
  suggestion?: string;
}

// Dice's Coefficient function for robust and fast phonetic spelling corrections
function getSimilarity(s1: string, s2: string): number {
  const norm1 = s1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const norm2 = s2.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (norm1 === norm2) return 1.0;
  if (norm1.length < 2 || norm2.length < 2) return 0;
  
  const s1Bigrams = new Set<string>();
  for (let i = 0; i < norm1.length - 1; i++) {
    s1Bigrams.add(norm1.substring(i, i + 2));
  }
  
  let intersection = 0;
  for (let i = 0; i < norm2.length - 1; i++) {
    const bigram = norm2.substring(i, i + 2);
    if (s1Bigrams.has(bigram)) {
      intersection++;
    }
  }
  
  return (2.0 * intersection) / (norm1.length + norm2.length - 2);
}

export const LootOptimizer: React.FC<LootOptimizerProps> = ({ language, rashidCity }) => {
  const [selectedItems, setSelectedItems] = useState<SelectedLootItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pasteText, setPasteText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Custom Optimization Parameters
  const [optimizerMode, setOptimizerMode] = useState<'profit' | 'trips'>('trips');
  const [tripProfitThreshold, setTripProfitThreshold] = useState<number>(500); // gp
  
  // States for Autocomplete Search & Add Component
  const [autocompleteInput, setAutocompleteInput] = useState('');
  const [selectedAutoItem, setSelectedAutoItem] = useState<LootItem | null>(null);
  const [autoQuantity, setAutoQuantity] = useState<number>(1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // States for Parser Logs
  const [parseLogs, setParseLogs] = useState<ParseLog[]>([]);

  // Translations
  const t = {
    pt: {
      title: "Otimizador de Loot & Vendas",
      subtitle: "Organize sua mochila de loot automágicamente! Agrupe por NPC e Cidade para lucrar ao máximo fazendo o mínimo de viagens.",
      mode: "Estratégia de Venda",
      modeProfit: "Lucro Máximo Absoluto",
      modeProfitDesc: "Sempre viaja para o NPC que paga mais, independente do valor total do item.",
      modeTrips: "Rota Inteligente Otimizada",
      modeTripsDesc: "Agrupa itens na mesma cidade para evitar viagens chatas se a perda for menor que o limite definido.",
      thresholdLabel: "Desvio mínimo para novas viagens",
      thresholdDesc: "Se a diferença de preço para viajar a outra cidade for menor que isso, o item será vendido no local atual.",
      rashidDayLabel: "Onde o Rashid está hoje?",
      pastePlaceholder: "Cole seu log de loot do Tibia aqui...\nExemplo:\n14:15 Loot of a Demon: mastermind shield, gold ring, 25 gold coins\nOu digite:\n2 dragon scale mail\n3 dsm, 5 crown armor",
      pasteBtn: "Analisar & Importar",
      clearAll: "Limpar Tudo",
      searchPlaceholder: "Buscar item para adicionar...",
      itemsTitle: "Itens na Mochila",
      emptyLoot: "Sua mochila de vendas está vazia! Busque itens na lista abaixo, clique neles para adicionar ou cole um log do jogo acima para importar instantaneamente.",
      statsTitle: "Resumo do Planejamento",
      totalProfit: "Retorno Total Estimado",
      totalWeight: "Peso do Saque (Cap)",
      efficiencyScore: "Eficiência de Viagens",
      routesTitle: "Passo a Passo das Entregas (Instruções)",
      noRoutes: "Adicione itens para gerar a rota otimizada de viagem.",
      sellAllAt: "Venda tudo para",
      sellToNpc: "Venda para",
      gpEach: "gp cada",
      totalValue: "Valor Total",
      savingsLoss: "Diferença poupada/perdida",
      saveLossDesc: "Em comparação ao lucro absoluto teórico",
      bestAlternative: "Alternativa local",
      tableTitle: "Enciclopédia de Preços (NPC Matrix)",
      tableItem: "Item",
      tableWeight: "Peso",
      tableBest: "Melhor Comprador",
      addBtn: "Adicionar",
      capWarning: "Atenção: O peso total excede a capacidade padrão de um backpack. Lembre-se de mandar por parcel ou fazer em etapas!",
      abbreviationsInfo: "Dica: Suportamos siglas como BOH, DSM, MPA, MMS, GS, RH, etc.",
      rashidDaySelect: {
        Monday: "Segunda-feira (Svargrond)",
        Tuesday: "Terça-feira (Liberty Bay)",
        Wednesday: "Quarta-feira (Port Hope)",
        Thursday: "Quinta-feira (Ankrahmun)",
        Friday: "Sexta-feira (Darashia)",
        Saturday: "Sábado (Edron)",
        Sunday: "Domingo (Carlin)"
      },
      parsedSuccess: "Sucesso! Detectamos e adicionamos {{count}} itens do seu texto.",
      parsedFail: "Não conseguimos extrair nenhum item conhecido do texto. Verifique as siglas ou nomes.",
      itemsSelected: "Selecionados",
      searchManualTitle: "Buscador de Itens",
      searchManualSub: "Selecione e defina a quantidade desejada",
      quickPresets: "Atalhos de Loot Comum (+1)",
      autoAddConfirm: "Confirmar Ajuste",
      warningHeader: "Alertas de Importação",
      successHeader: "Importações com Sucesso"
    },
    en: {
      title: "Loot Seller & Route Optimizer",
      subtitle: "Organize your loot backpack automagically! Group items by NPC and City to maximize your gold with the least travel hassle.",
      mode: "Selling Strategy",
      modeProfit: "Max Profit (Absolute)",
      modeProfitDesc: "Always travel to the NPC that pays the most, no matter the individual profit margin.",
      modeTrips: "Smart Travel Path (Time Saver)",
      modeTripsDesc: "Group items in cities you are already visiting to save travel time if the gold loss is safe.",
      thresholdLabel: "Min gold to justify a new city trip",
      thresholdDesc: "If the price gain from travelling to another city is lower than this, the item will be sold locally.",
      rashidDayLabel: "Where is Rashid located today?",
      pastePlaceholder: "Paste your Tibia loot log here...\nExample:\n14:15 Loot of a Demon: mastermind shield, gold ring, 25 gold coins\nOr write:\n2 dragon scale mail\n3 dsm, 5 crown armor",
      pasteBtn: "Parse & Import Loot",
      clearAll: "Clear Backpack",
      searchPlaceholder: "Search item to add...",
      itemsTitle: "Items in Loot Sack",
      emptyLoot: "Your sales backpack is empty! Search items in the catalog below, click to add them, or paste a chat log above to auto-detect.",
      statsTitle: "Planning Summary",
      totalProfit: "Estimated Total Return",
      totalWeight: "Loot Weight (Cap)",
      efficiencyScore: "Route Efficiency",
      routesTitle: "Step-by-Step Sale Route (Instructions)",
      noRoutes: "Add items to generate your optimized travel instructions.",
      sellAllAt: "Sell everything to",
      sellToNpc: "Sell to",
      gpEach: "gp each",
      totalValue: "Total Value",
      savingsLoss: "Profit difference",
      saveLossDesc: "Compared to theoretical maximum profit",
      bestAlternative: "Local alternative",
      tableTitle: "Price Encyclopedia (NPC Matrix)",
      tableItem: "Item",
      tableWeight: "Weight",
      tableBest: "Best Buyer",
      addBtn: "Add",
      capWarning: "Notice: Total weight exceeds a standard backpack's capacity. Consider mailing via parcel or making trips!",
      abbreviationsInfo: "Tip: We support acronyms like BOH, DSM, MPA, MMS, GS, RH, etc.",
      rashidDaySelect: {
        Monday: "Monday (Svargrond)",
        Tuesday: "Tuesday (Liberty Bay)",
        Wednesday: "Wednesday (Port Hope)",
        Thursday: "Thursday (Ankrahmun)",
        Friday: "Friday (Darashia)",
        Saturday: "Saturday (Edron)",
        Sunday: "Sunday (Carlin)"
      },
      parsedSuccess: "Success! Detected and added {{count}} items from your text.",
      parsedFail: "No known loot items were detected in your text. Check names or spellings.",
      itemsSelected: "Selected",
      searchManualTitle: "Manual Item Finder",
      searchManualSub: "Select item and configure quantity",
      quickPresets: "Common Loot Shortcuts (+1 Qty)",
      autoAddConfirm: "Confirm Add",
      warningHeader: "Import Warnings & Fixes",
      successHeader: "Successfully Imported"
    }
  }[language];

  // Helper dictionary to expand abbreviations used by players
  const ABBREVIATIONS: Record<string, string> = {
    'dsm': 'dragon scale mail',
    'mpa': 'magic plate-armor',
    'mms': 'mastermind shield',
    'boh': 'boots of haste',
    'gs': 'giant sword',
    'rh': 'royal helmet',
    'garmor': 'golden armor',
    'glegs': 'golden legs',
    'dshield': 'dragon shield',
    'cshield': 'crown shield',
    'clegs': 'crown legs',
    'carmor': 'crown armor',
    'karmor': 'knight armor',
    'klegs': 'knight legs',
    'whelmet': 'warrior helmet',
    'chelmet': 'crusader helmet',
    'fsword': 'fire sword',
    'faxe': 'fire axe',
    'dlance': 'dragon lance',
    'bshield': 'beholder shield',
    'whammer': 'war-hammer',
    'gsword': 'giant sword',
    'ss': 'skull staff'
  };

  const parseLootText = () => {
    if (!pasteText.trim()) return;

    let itemsFoundCount = 0;
    const addedItemsMap = new Map<string, number>();
    const logs: ParseLog[] = [];

    // Process line by line
    const lines = pasteText.split('\n');
    lines.forEach(line => {
      let cleanLine = line.toLowerCase().trim();
      if (!cleanLine) return;

      // Extract "Loot of..." header details
      if (cleanLine.includes('loot of')) {
        const colonIndex = cleanLine.indexOf(':');
        if (colonIndex !== -1) {
          cleanLine = cleanLine.substring(colonIndex + 1);
        }
      }

      // Check for Look description patterns
      if (cleanLine.startsWith('you see')) {
        cleanLine = cleanLine.replace(/\([^)]*\)/g, '');
        cleanLine = cleanLine.replace(/it weighs.*/g, '');
        cleanLine = cleanLine.replace('you see a ', '').replace('you see an ', '').replace('you see ', '');
      }

      // Split elements by comma
      const segments = cleanLine.split(',');
      segments.forEach(segment => {
        let text = segment.trim();
        if (!text) return;

        text = text.replace(/^(and|a|an|some)\s+/, '');

        // Extract quantity
        let quantity = 1;
        const qtyMatch = text.match(/^(\d+)(x|\s+)/);
        if (qtyMatch) {
          quantity = parseInt(qtyMatch[1], 10);
          text = text.substring(qtyMatch[0].length).trim();
        }

        // Handle simple singular/plural fallbacks (eg: "dragon scale mails" -> "dragon scale mail")
        if (text.endsWith('s') && !text.endsWith('boots') && !text.endsWith('legs') && !text.endsWith('amulets') && !text.endsWith('relics')) {
          const singularText = text.slice(0, -1);
          const resolvedSingular = ABBREVIATIONS[singularText] || singularText;
          const matchInput = LOCAL_LOOT_DATABASE.find(item => item.name.toLowerCase() === resolvedSingular);
          if (matchInput) {
            addedItemsMap.set(matchInput.id, (addedItemsMap.get(matchInput.id) || 0) + quantity);
            itemsFoundCount += quantity;
            logs.push({
              id: Math.random().toString(),
              type: 'success',
              originalText: segment.trim(),
              processedText: matchInput.name,
              quantity
            });
            return;
          }
        }

        const expandedName = ABBREVIATIONS[text] || text;

        // Try direct lookup
        const foundItem = LOCAL_LOOT_DATABASE.find(
          item => item.name.toLowerCase() === expandedName || 
                  item.id === expandedName ||
                  item.name.toLowerCase().replace(/[\s-]/g, '') === expandedName.replace(/[\s-]/g, '')
        );

        if (foundItem) {
          addedItemsMap.set(foundItem.id, (addedItemsMap.get(foundItem.id) || 0) + quantity);
          itemsFoundCount += quantity;
          logs.push({
            id: Math.random().toString(),
            type: 'success',
            originalText: segment.trim(),
            processedText: foundItem.name,
            quantity
          });
        } else {
          // If direct match failed, perform phonetic fuzzy match lookup
          let bestMatch: LootItem | null = null;
          let highestScore = 0;

          LOCAL_LOOT_DATABASE.forEach(item => {
            const scoreName = getSimilarity(expandedName, item.name);
            const scoreId = getSimilarity(expandedName, item.id);
            const score = Math.max(scoreName, scoreId);
            if (score > highestScore) {
              highestScore = score;
              bestMatch = item;
            }
          });

          if (bestMatch && highestScore >= 0.70) {
            // High confidence - Auto correct and add!
            const matchedItem: LootItem = bestMatch;
            addedItemsMap.set(matchedItem.id, (addedItemsMap.get(matchedItem.id) || 0) + quantity);
            itemsFoundCount += quantity;
            logs.push({
              id: Math.random().toString(),
              type: 'corrected',
              originalText: segment.trim(),
              processedText: matchedItem.name,
              confidence: Math.round(highestScore * 100),
              quantity
            });
          } else {
            // Low confidence or completely unrecognized item
            // Check if there is any candidate we can suggest as "Did you mean?" (similarity >= 0.40)
            const suggestion = (bestMatch && highestScore >= 0.40) ? (bestMatch as LootItem).name : undefined;
            logs.push({
              id: Math.random().toString(),
              type: 'warning',
              originalText: segment.trim(),
              quantity,
              suggestion
            });
          }
        }
      });
    });

    setParseLogs(logs);

    if (itemsFoundCount > 0) {
      // Merge into current selectedItems
      setSelectedItems(prev => {
        const workingMap = new Map<string, number>();
        prev.forEach(p => workingMap.set(p.item.id, p.quantity));
        
        addedItemsMap.forEach((qty, id) => {
          workingMap.set(id, (workingMap.get(id) || 0) + qty);
        });

        const updated: SelectedLootItem[] = [];
        workingMap.forEach((qty, id) => {
          const item = LOCAL_LOOT_DATABASE.find(i => i.id === id);
          if (item) updated.push({ item, quantity: qty });
        });
        return updated;
      });
      setPasteText('');
    }
  };

  const handleAddItem = (item: LootItem) => {
    setSelectedItems(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) {
        return prev.map(p => p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveItem = (itemId: string, all = false) => {
    setSelectedItems(prev => {
      const existing = prev.find(p => p.item.id === itemId);
      if (!existing) return prev;
      if (all || existing.quantity <= 1) {
        return prev.filter(p => p.item.id !== itemId);
      }
      return prev.map(p => p.item.id === itemId ? { ...p, quantity: p.quantity - 1 } : p);
    });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId, true);
      return;
    }
    setSelectedItems(prev => prev.map(p => p.item.id === itemId ? { ...p, quantity } : p));
  };

  // --- REVOLUTIONARY OPTIMIZER LOGIC ---
  const optimizationResult = useMemo(() => {
    if (selectedItems.length === 0) {
      return {
        routes: [],
        totalProfit: 0,
        absoluteMaxProfit: 0,
        weight: 0,
        efficiency: 100,
        tripsSaved: 0
      };
    }

    let absoluteMaxProfit = 0;
    let weight = 0;

    // First, let's pre-evaluate the absolute highest seller for each item
    const itemsWithBestSeller = selectedItems.map(loaded => {
      const { item, quantity } = loaded;
      weight += item.weight * quantity;

      // Find best overall buyer
      let bestBuyer: NpcBuyer | null = null;
      let highestPrice = 0;

      item.buyers.forEach(buyer => {
        let actualPrice = buyer.price;
        // If buyer is Rashid, adjust if needed/or just use standard. (Rashid is always highest for his items anyway)
        if (actualPrice > highestPrice) {
          highestPrice = actualPrice;
          bestBuyer = buyer;
        }
      });

      const maxGps = highestPrice * quantity;
      absoluteMaxProfit += maxGps;

      return {
        item,
        quantity,
        bestBuyer: bestBuyer as unknown as NpcBuyer,
        maxSinglePrice: highestPrice
      };
    });

    if (optimizerMode === 'profit') {
      // Strat: Max Profit. Group purely by the best buyer.
      const groups: Record<string, { city: string; npc: string; items: { item: LootItem; qty: number; price: number }[]; total: number }> = {};
      
      itemsWithBestSeller.forEach(row => {
        const buyerKey = `${row.bestBuyer.npc}-${row.bestBuyer.city}`;
        if (!groups[buyerKey]) {
          groups[buyerKey] = {
            city: row.bestBuyer.city,
            npc: row.bestBuyer.npc,
            items: [],
            total: 0
          };
        }
        groups[buyerKey].items.push({
          item: row.item,
          qty: row.quantity,
          price: row.maxSinglePrice
        });
        groups[buyerKey].total += row.maxSinglePrice * row.quantity;
      });

      const routes = Object.values(groups).sort((a,b) => b.total - a.total);

      return {
        routes,
        totalProfit: absoluteMaxProfit,
        absoluteMaxProfit,
        weight,
        efficiency: 100,
        tripsSaved: 0
      };
    } else {
      // Strat: Trip-optimized Route Planner.
      // We want to group items by city, and redirect minor items to already-visited cities if possible to save traveling.
      
      // Let's count how much gold we would theoretically retrieve from each NPC/location under Max Profit
      const initialNpcTolls: Record<string, number> = {};
      itemsWithBestSeller.forEach(row => {
        const buyerKey = `${row.bestBuyer.npc}@${row.bestBuyer.city}`;
        initialNpcTolls[buyerKey] = (initialNpcTolls[buyerKey] || 0) + (row.maxSinglePrice * row.quantity);
      });

      // Let's designate "Visited Cities" as those where we have a major cargo to deliver (e.g. Total sale value > threshold)
      const majorVisitedCities = new Set<string>();
      Object.entries(initialNpcTolls).forEach(([key, totalValue]) => {
        const city = key.split('@')[1];
        // Rashid is always visited (usually worth a trip) and if price is huge, mark as visited
        if (city === 'Rashid' || totalValue >= 1000) {
          majorVisitedCities.add(city);
        }
      });

      // Now determine the final sell location of EVERY item
      const finalItemsDistribution: {
        item: LootItem;
        qty: number;
        bestBuyer: NpcBuyer; // actual best
        chosenBuyer: NpcBuyer; // optimized choice
        loss: number;
      }[] = [];

      itemsWithBestSeller.forEach(row => {
        const { item, quantity, bestBuyer, maxSinglePrice } = row;
        
        // If the best buyer's city is already visited, keep it there! No loss!
        if (majorVisitedCities.has(bestBuyer.city) || bestBuyer.city === 'Rashid') {
          finalItemsDistribution.push({
            item,
            qty: quantity,
            bestBuyer,
            chosenBuyer: bestBuyer,
            loss: 0
          });
          return;
        }

        // If the best buyer's city is unvisited, check if we can sell it to someone else in a city we ARE already visiting.
        const alternativeBuyersInVisited = item.buyers
          .filter(b => majorVisitedCities.has(b.city) || b.city === 'Rashid')
          .sort((a, b) => b.price - a.price); // buy price descending

        if (alternativeBuyersInVisited.length > 0) {
          const bestAlt = alternativeBuyersInVisited[0];
          // Check if difference we lose is less than the threshold (total loss for all quantity)
          const singleLoss = bestBuyer.price - bestAlt.price;
          const totalLoss = singleLoss * quantity;

          if (totalLoss <= tripProfitThreshold) {
            // Yes! Redirect to this local buyer to save traveling!
            finalItemsDistribution.push({
              item,
              qty: quantity,
              bestBuyer,
              chosenBuyer: bestAlt,
              loss: totalLoss
            });
            return;
          }
        }

        // If no alternative exists in visited cities, or the loss is too high to justify staying local,
        // we must travel to the best buyer's city anyway (making it now a visited city!).
        majorVisitedCities.add(bestBuyer.city);
        finalItemsDistribution.push({
          item,
          qty: quantity,
          bestBuyer,
          chosenBuyer: bestBuyer,
          loss: 0
        });
      });

      // Recalculate results since redirected items might have added new cities or changed routes
      const groups: Record<string, { city: string; npc: string; items: { item: LootItem; qty: number; price: number; originalBest: NpcBuyer; isRedirected: boolean; loss: number }[]; total: number }> = {};
      let totalOptimizedProfit = 0;
      let totalLoss = 0;
      let totalTripsTheoretical = Object.keys(initialNpcTolls).length;

      finalItemsDistribution.forEach(row => {
        const buyerKey = `${row.chosenBuyer.npc}-${row.chosenBuyer.city}`;
        if (!groups[buyerKey]) {
          groups[buyerKey] = {
            city: row.chosenBuyer.city,
            npc: row.chosenBuyer.npc,
            items: [],
            total: 0
          };
        }
        
        const isRedirected = row.bestBuyer.npc !== row.chosenBuyer.npc || row.bestBuyer.city !== row.chosenBuyer.city;
        groups[buyerKey].items.push({
          item: row.item,
          qty: row.qty,
          price: row.chosenBuyer.price,
          originalBest: row.bestBuyer,
          isRedirected,
          loss: row.loss
        });

        groups[buyerKey].total += row.chosenBuyer.price * row.qty;
        totalOptimizedProfit += row.chosenBuyer.price * row.qty;
        totalLoss += row.loss;
      });

      const routes = Object.values(groups).sort((a,b) => b.total - a.total);
      const totalTripsFinal = routes.length;
      const tripsSaved = Math.max(0, totalTripsTheoretical - totalTripsFinal);
      const efficiency = Math.max(1, Math.round((totalOptimizedProfit / absoluteMaxProfit) * 100));

      return {
        routes,
        totalProfit: totalOptimizedProfit,
        absoluteMaxProfit,
        weight,
        efficiency,
        tripsSaved
      };
    }
  }, [selectedItems, optimizerMode, tripProfitThreshold, rashidCity]);

  // Handle auto-complete/search filter for items to add manually
  const filteredCatalog = useMemo(() => {
    return LOCAL_LOOT_DATABASE.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, categoryFilter]);

  const categories = [
    { id: 'all', labelPt: 'Todos', labelEn: 'All' },
    { id: 'weapons', labelPt: 'Armas', labelEn: 'Weapons' },
    { id: 'armors', labelPt: 'Armaduras', labelEn: 'Armors' },
    { id: 'shields', labelPt: 'Escudos', labelEn: 'Shields' },
    { id: 'helmets', labelPt: 'Capacetes', labelEn: 'Helmets' },
    { id: 'legs', labelPt: 'Calças', labelEn: 'Legs' },
    { id: 'boots', labelPt: 'Botas', labelEn: 'Boots' },
    { id: 'jewelry', labelPt: 'Magias & Joias', labelEn: 'Jewelry' }
  ];

  const formatGp = (num: number) => {
    return num.toLocaleString() + " gp";
  };

  const formatWeight = (oz: number) => {
    return oz.toFixed(1) + " oz";
  };

  return (
    <div className="space-y-8 font-sans text-left">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center gap-3">
          <Coins className="w-10 h-10 text-medieval-gold animate-pulse" />
          {t.title}
        </h1>
        <p className="text-sm text-medieval-text/80 leading-relaxed max-w-3xl">
          {t.subtitle}
        </p>
      </div>

      {/* 3-COLUMN CONTROL DECK: WRITING PARSER, MANUAL AUTO-ADD & CONFIG */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: TIBIA PARSER & IMPORT FLOW */}
        <div className="medieval-card bg-black/45 border-medieval-gold/15 p-5 rounded-lg flex flex-col justify-between gap-4">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-black text-medieval-gold uppercase tracking-wider">
                <FileText className="w-4 h-4 text-medieval-gold" />
                Tibia Parser Log
              </span>
              <span className="text-[9px] bg-emerald-950/40 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/10 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 animate-pulse" /> Auto-Correct
              </span>
            </div>

            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder={t.pastePlaceholder}
              className="w-full h-28 bg-black/55 text-emerald-400 font-mono text-[11px] p-2.5 rounded border border-medieval-gold/10 hover:border-medieval-gold/20 focus:border-medieval-gold/50 outline-none scrollbar-thin resize-none placeholder:text-medieval-text/25"
            />

            <div className="flex gap-2">
              <button
                onClick={parseLootText}
                className="flex-1 py-1.5 bg-medieval-gold hover:bg-[#D4AF37] text-black rounded font-black text-[10px] uppercase cursor-pointer tracking-wider transition-colors flex items-center justify-center gap-1"
              >
                <Clipboard className="w-3.5 h-3.5" />
                {t.pasteBtn}
              </button>
              <button
                onClick={() => {
                  setSelectedItems([]);
                  setParseLogs([]);
                }}
                disabled={selectedItems.length === 0}
                className="py-1.5 px-3 bg-red-950/15 border border-red-900/25 text-red-400 rounded font-bold text-[10px] uppercase tracking-wider hover:bg-red-950/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {t.clearAll}
              </button>
            </div>
          </div>

          {/* PARSER RECON FILE REPORTS */}
          {parseLogs.length > 0 && (
            <div className="border-t border-medieval-gold/10 pt-3 flex flex-col gap-1.5 max-h-[140px] overflow-y-auto scrollbar-thin pr-1">
              <span className="text-[9px] font-bold text-medieval-gold/60 uppercase tracking-wide flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {language === 'pt' ? 'Relatório de Importação' : 'Import Report'}
              </span>
              <div className="space-y-1">
                {parseLogs.map((log) => {
                  if (log.type === 'success') {
                    return (
                      <div key={log.id} className="text-[10px] font-mono text-emerald-400/90 flex justify-between gap-1 items-center bg-emerald-950/10 px-1.5 py-0.5 rounded border border-emerald-500/5">
                        <span className="truncate max-w-[150px]">✔️ {log.processedText}</span>
                        <span className="shrink-0">{log.quantity}x</span>
                      </div>
                    );
                  }
                  if (log.type === 'corrected') {
                    return (
                      <div key={log.id} className="text-[10px] font-mono text-yellow-400/95 flex justify-between gap-1 items-center bg-yellow-950/10 px-1.5 py-0.5 rounded border border-yellow-500/5">
                        <span className="truncate max-w-[130px] italic">🪄 "{log.originalText}" → <strong className="font-bold underline">{log.processedText}</strong></span>
                        <span className="shrink-0">({log.confidence}%) {log.quantity}x</span>
                      </div>
                    );
                  }
                  return (
                    <div key={log.id} className="text-[10px] font-mono text-red-400 flex flex-col bg-red-950/10 px-1.5 py-1 rounded border border-red-500/5">
                      <div className="flex justify-between">
                        <span className="truncate max-w-[140px]">❌ {log.originalText}</span>
                        <span>{log.quantity}x</span>
                      </div>
                      {log.suggestion && (
                        <span className="text-[9px] text-yellow-500/80 font-bold mt-0.5 ml-3 italic">
                          {language === 'pt' ? `Não seria "${log.suggestion}"?` : `Did you mean "${log.suggestion}"?`}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* COLUMN 2: SEARCH MANUAL & QUANTITY AUTOCOMPLETE ADDER */}
        <div className="medieval-card bg-black/45 border-medieval-gold/15 p-5 rounded-lg flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <span className="flex items-center gap-2 text-xs font-black text-medieval-gold uppercase tracking-wider">
              <Search className="w-4 h-4 text-medieval-gold" />
              {t.searchManualTitle}
            </span>

            {/* Simulated Search input autocomplete suggestions */}
            <div className="relative">
              <input
                type="text"
                value={autocompleteInput}
                onChange={(e) => {
                  setAutocompleteInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-black/60 text-xs text-medieval-gold border border-medieval-gold/10 p-2.5 rounded outline-none font-mono placeholder:text-medieval-gold/30"
              />

              {/* Suggestions Dropdown overlay */}
              <AnimatePresence>
                {showSuggestions && autocompleteInput.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-10 top-full left-0 right-0 mt-1 bg-black border border-medieval-gold/25 rounded-md shadow-2xl max-h-48 overflow-y-auto scrollbar-thin divide-y divide-white/[0.03]"
                  >
                    {/* Compute matches */}
                    {(() => {
                      const queryClean = autocompleteInput.toLowerCase().trim();
                      const matches = LOCAL_LOOT_DATABASE.filter(item => {
                        const nameMatch = item.name.toLowerCase().includes(queryClean);
                        const idMatch = item.id.toLowerCase().includes(queryClean);
                        // abbreviating matches
                        const abbrMatch = Object.entries(ABBREVIATIONS).some(([abbr, expanded]) => {
                          return abbr.includes(queryClean) && item.name.toLowerCase() === expanded;
                        });
                        return nameMatch || idMatch || abbrMatch;
                      }).slice(0, 6);

                      if (matches.length === 0) {
                        return (
                          <div className="p-3 text-[10px] font-mono text-medieval-text/40 text-center italic">
                            {language === 'pt' ? 'Nenhum item detectado' : 'No items matched'}
                          </div>
                        );
                      }

                      return matches.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedAutoItem(item);
                            setAutoQuantity(1);
                            setAutocompleteInput('');
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left p-2.5 hover:bg-medieval-gold/5 text-xs text-white font-mono flex justify-between items-center transition-colors hover:text-medieval-gold cursor-pointer"
                        >
                          <span>{item.name}</span>
                          <span className="text-[9px] text-medieval-gold/50 bg-medieval-gold/5 px-1 rounded truncate max-w-[120px]">
                            {item.buyers.reduce((acc, curr) => curr.price > acc.price ? curr : acc, item.buyers[0]).npc}
                          </span>
                        </button>
                      ));
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Selected item configuration panel */}
            <AnimatePresence mode="wait">
              {selectedAutoItem ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-black/45 border border-medieval-gold/20 p-3 rounded-lg space-y-2.5"
                >
                  <div className="flex justify-between items-start">
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold text-medieval-gold uppercase tracking-wider">{selectedAutoItem.category}</span>
                      <h4 className="text-[11px] font-black text-white truncate max-w-[150px]">{selectedAutoItem.name}</h4>
                      <p className="text-[9px] text-medieval-text/50 font-mono">{formatWeight(selectedAutoItem.weight)}</p>
                    </div>
                    <button
                      onClick={() => setSelectedAutoItem(null)}
                      className="text-[11px] text-medieval-text/40 hover:text-red-400 font-bold p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-black/60 border border-medieval-gold/15 rounded flex items-center h-8">
                      <button
                        onClick={() => setAutoQuantity(q => Math.max(1, q - 1))}
                        className="px-2.5 h-full text-medieval-gold hover:bg-medieval-gold/10 transition-colors"
                      >
                        <Minus className="w-3" />
                      </button>
                      <input
                        type="number"
                        value={autoQuantity}
                        onChange={(e) => setAutoQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-10 bg-transparent text-center font-mono text-xs font-bold text-medieval-gold outline-none h-full"
                      />
                      <button
                        onClick={() => setAutoQuantity(q => q + 1)}
                        className="px-2.5 h-full text-medieval-gold hover:bg-medieval-gold/10 transition-colors"
                      >
                        <Plus className="w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedItems(prev => {
                          const existing = prev.find(p => p.item.id === selectedAutoItem.id);
                          if (existing) {
                            return prev.map(p => p.item.id === selectedAutoItem.id ? { ...p, quantity: p.quantity + autoQuantity } : p);
                          }
                          return [...prev, { item: selectedAutoItem, quantity: autoQuantity }];
                        });
                        setSelectedAutoItem(null);
                        setAutoQuantity(1);
                      }}
                      className="flex-1 h-8 bg-medieval-gold hover:bg-[#D4AF37] text-black font-black text-[10px] uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1 pointer-events-auto cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      {t.autoAddConfirm}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="text-[10px] text-medieval-text/45 p-3 italic bg-black/15 rounded border border-dashed border-medieval-gold/5 text-center font-mono">
                  {t.searchManualSub}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* QUICK COMMON PRESET SHORTCUTS */}
          <div className="border-t border-medieval-gold/10 pt-3">
            <span className="block text-[9px] font-black text-medieval-gold/70 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-medieval-gold" />
              {t.quickPresets}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'boots_of_haste', label: 'BOH' },
                { id: 'giant_sword', label: 'GS' },
                { id: 'mastermind_shield', label: 'MMS' },
                { id: 'royal_helmet', label: 'RH' },
                { id: 'dragon_scale_mail', label: 'DSM' }
              ].map(preset => (
                <button
                  key={preset.id}
                  onClick={() => {
                    const matchedItem = LOCAL_LOOT_DATABASE.find(item => item.id === preset.id);
                    if (matchedItem) {
                      handleAddItem(matchedItem);
                      // Add parser success report log for nice feedback
                      setParseLogs(prev => [
                        {
                          id: Math.random().toString(),
                          type: 'success',
                          originalText: preset.label,
                          processedText: matchedItem.name,
                          quantity: 1
                        },
                        ...prev.slice(0, 4) // cap logs size
                      ]);
                    }
                  }}
                  className="py-1 px-2.5 bg-black/40 hover:bg-medieval-gold/15 hover:text-white border border-medieval-gold/10 hover:border-medieval-gold rounded text-[9.5px] font-mono text-medieval-gold/80 transition-all cursor-pointer shadow-md"
                >
                  + {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 3: STRATEGY CONFIG & RASHID SYNC */}
        <div className="medieval-card bg-black/45 border-medieval-gold/15 p-5 rounded-lg flex flex-col justify-between gap-4">
          <div className="space-y-3.5">
            <h3 className="text-xs font-black text-medieval-gold uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-medieval-gold" />
              {t.mode}
            </h3>

            {/* Mode Strategy Select Toggle */}
            <div className="grid grid-cols-2 gap-2 bg-black/55 p-1 rounded border border-medieval-gold/10">
              <button
                onClick={() => setOptimizerMode('trips')}
                className={`py-1.5 px-2 text-[10px] font-black uppercase tracking-tighter rounded transition-colors cursor-pointer ${
                  optimizerMode === 'trips' 
                    ? 'bg-medieval-gold text-black' 
                    : 'text-medieval-text/50 hover:text-medieval-gold hover:bg-white/[0.02]'
                }`}
              >
                🚀 {language === 'pt' ? 'Otimizar Rotas' : 'Optimize Trips'}
              </button>
              <button
                onClick={() => setOptimizerMode('profit')}
                className={`py-1.5 px-2 text-[10px] font-black uppercase tracking-tighter rounded transition-colors cursor-pointer ${
                  optimizerMode === 'profit' 
                    ? 'bg-medieval-gold text-black' 
                    : 'text-medieval-text/50 hover:text-medieval-gold hover:bg-white/[0.02]'
                }`}
              >
                💰 {language === 'pt' ? 'Lucro Máximo' : 'Max Profit'}
              </button>
            </div>

            <p className="text-[10px] text-medieval-text/60 italic leading-snug">
              {optimizerMode === 'trips' ? t.modeTripsDesc : t.modeProfitDesc}
            </p>

            <hr className="border-medieval-gold/10" />

            {/* Trip Profit Threshold slider */}
            {optimizerMode === 'trips' && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10.5px]">
                  <span className="font-bold text-medieval-gold/80">{t.thresholdLabel}</span>
                  <span className="font-mono text-emerald-400 font-bold bg-black/30 px-1.5 rounded">{tripProfitThreshold} gp</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="4000"
                  step="50"
                  value={tripProfitThreshold}
                  onChange={(e) => setTripProfitThreshold(parseInt(e.target.value))}
                  className="w-full accent-medieval-gold bg-black/40 h-1 rounded cursor-pointer"
                />
                <span className="block text-[8.5px] text-medieval-text/40 leading-tight">
                  {t.thresholdDesc}
                </span>
              </div>
            )}
          </div>

          {/* HELPFUL FRACTION INFO */}
          <div className="bg-medieval-gold/5 border border-medieval-gold/10 p-2.5 rounded-lg flex items-start gap-2.5">
            <Info className="w-4 h-4 text-medieval-gold shrink-0 mt-0.5" />
            <div className="text-[10px] text-medieval-text/75 leading-tight">
              {language === 'pt' ? (
                <span>
                  O Rashid viaja diariamente (confira a cidade ativa de hoje no topo do site).
                  Os itens de Djinn foram separados estritamente entre as facções <strong className="text-blue-400">Blue Djinn</strong> e <strong className="text-emerald-500">Green Djinn</strong> para que você saiba exatamente onde vender de acordo com seu acesso!
                </span>
              ) : (
                <span>
                  Rashid travels daily (check today's active city at the top of the site).
                  Djinn items are strictly separated between <strong className="text-blue-400">Blue Djinn</strong> and <strong className="text-emerald-500">Green Djinn</strong> factions so you know exactly where to sell based on your quest access!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE BAG AND SUMMARY STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Loot Sack Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-medieval-gold/15 pb-2">
            <h2 className="text-xl font-black text-medieval-gold uppercase tracking-tighter flex items-center gap-2">
              <Clipboard className="w-5 h-5 text-medieval-gold" />
              {t.itemsTitle} ({selectedItems.reduce((acc, curr) => acc + curr.quantity, 0)})
            </h2>
            {selectedItems.length > 0 && (
              <span className="text-[10px] text-medieval-text/50 font-mono">
                {selectedItems.length} unique types
              </span>
            )}
          </div>

          {selectedItems.length === 0 ? (
            <div className="bg-black/20 rounded border border-dashed border-medieval-gold/10 p-10 text-center text-sm font-mono text-medieval-text/40">
              {t.emptyLoot}
            </div>
          ) : (
            <div className="space-y-2 max-h-[360px] overflow-y-auto custom-scrollbar pr-1 select-none">
              {selectedItems.map(({ item, quantity }) => {
                const bestBuyer = item.buyers.reduce((acc, curr) => curr.price > acc.price ? curr : acc, item.buyers[0]);
                const totalVal = bestBuyer.price * quantity;
                return (
                  <motion.div
                    key={item.id}
                    layoutId={`bag-${item.id}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between bg-medieval-card/40 hover:bg-medieval-card/60 border border-medieval-gold/10 p-3 rounded-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      {/* Placeholder or standard item label */}
                      <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-black/60 rounded border border-medieval-gold/20 font-mono text-[9px] font-black text-medieval-gold/70">
                        {item.name.substring(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white">{item.name}</h4>
                        <p className="text-[10px] text-medieval-text/40 font-mono flex items-center gap-2">
                          <span>{formatWeight(item.weight)}</span>
                          <span className="text-medieval-gold/40">•</span>
                          <span>Max: <strong className="text-emerald-400">{formatGp(bestBuyer.price)}</strong> ({bestBuyer.npc})</span>
                        </p>
                      </div>
                    </div>

                    {/* Quantity Adjustment Controls */}
                    <div className="flex items-center gap-4">
                      <div className="bg-black/50 border border-medieval-gold/10 rounded flex items-center h-8">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="px-2 h-full text-medieval-gold hover:bg-medieval-gold/10 transition-colors cursor-pointer text-sm"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-10 bg-transparent text-center font-mono text-xs font-bold text-medieval-gold outline-none h-full border-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:margin-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:margin-0 [&::-webkit-inner-spin-button]:appearance-none focus:ring-0"
                        />
                        <button
                          onClick={() => handleAddItem(item)}
                          className="px-2 h-full text-medieval-gold hover:bg-medieval-gold/10 transition-colors cursor-pointer text-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right shrink-0 w-24">
                        <p className="text-xs font-mono font-black text-emerald-400">{formatGp(totalVal)}</p>
                        <button 
                          onClick={() => handleRemoveItem(item.id, true)} 
                          className="text-[10px] text-red-400/50 hover:text-red-400 uppercase tracking-tighter"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Route / Trip Planner Results Card */}
        <div className="medieval-card bg-black/40 border-medieval-gold/20 p-6 rounded-lg flex flex-col gap-5">
          <span className="flex items-center gap-2 text-sm font-black text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/15 pb-2">
            <TrendingUp className="w-4 h-4 animate-bounce" />
            {t.statsTitle}
          </span>

          <div className="space-y-4">
            {/* Total Gold Profit Estimator */}
            <div>
              <p className="text-[10px] text-[#8b7326] tracking-widest uppercase font-mono">{t.totalProfit}</p>
              <h2 className="text-3xl font-black text-emerald-400 font-mono tracking-tighter shadow-sm">
                {formatGp(optimizationResult.totalProfit)}
              </h2>
              {optimizerMode === 'trips' && optimizationResult.totalProfit < optimizationResult.absoluteMaxProfit && (
                <p className="text-[10px] text-red-400 font-bold font-mono mt-0.5 flex items-center gap-1">
                  <span>-{formatGp(optimizationResult.absoluteMaxProfit - optimizationResult.totalProfit)}</span>
                  <span className="text-medieval-text/40 font-normal">({language === 'pt' ? 'perda para economizar rotas' : 'loss from regrouping'})</span>
                </p>
              )}
            </div>

            {/* Total Weight Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 p-2.5 rounded border border-medieval-gold/10">
                <p className="text-[9px] text-medieval-text/50 uppercase">{t.totalWeight}</p>
                <p className="text-sm font-mono font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Scale className="w-3.5 h-3.5 text-medieval-gold/60" />
                  {formatWeight(optimizationResult.weight)}
                </p>
              </div>
              <div className="bg-black/30 p-2.5 rounded border border-medieval-gold/10">
                <p className="text-[9px] text-medieval-text/50 uppercase">{t.efficiencyScore}</p>
                <p className={`text-sm font-mono font-bold flex items-center gap-1.5 mt-0.5 ${
                  optimizationResult.efficiency >= 95 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  <Check className="w-3.5 h-3.5" />
                  {optimizationResult.efficiency}%
                </p>
              </div>
            </div>

            {/* Special Notice triggers if Cap is high */}
            {optimizationResult.weight > 2000 && (
              <div className="bg-yellow-900/10 border border-yellow-500/20 text-yellow-400 rounded-md p-3 text-[10px] flex gap-2 font-mono leading-relaxed">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{t.capWarning}</span>
              </div>
            )}

            {/* Trips details */}
            {optimizerMode === 'trips' && optimizationResult.tripsSaved > 0 && (
              <div className="bg-gradient-to-r from-emerald-950/20 to-black/30 border border-emerald-500/20 text-emerald-300 rounded p-3 text-[11px] font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'pt' 
                    ? `Economizou ${optimizationResult.tripsSaved} viagens de barco agrupando itens!` 
                    : `Saved ${optimizationResult.tripsSaved} boat trips by grouping local items!`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DETAILED TRIP BY TRIP DELIVERIES */}
      <div className="medieval-card bg-black/40 border-medieval-gold/15 p-6 rounded-lg space-y-4">
        <h3 className="text-base font-black text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/15 pb-2 flex items-center gap-2.5">
          <Navigation className="w-5 h-5 text-medieval-gold" />
          {t.routesTitle}
        </h3>

        {optimizationResult.routes.length === 0 ? (
          <p className="text-sm text-medieval-text/40 font-mono italic">{t.noRoutes}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {optimizationResult.routes.map((route: any, idx: number) => {
              const isRashid = route.city.toLowerCase().includes('rashid');
              const cityName = isRashid ? `Svargrond / Liberty Bay ... (Rashid)` : route.city;

              return (
                <div 
                  key={idx} 
                  className="bg-black/50 rounded-lg p-4 border border-medieval-gold/10 hover:border-medieval-gold/30 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    {/* Step indicator */}
                    <div className="flex items-center justify-between border-b border-medieval-gold/10 pb-2">
                      <span className="text-[10px] font-mono font-black text-medieval-gold bg-medieval-gold/15 px-2 py-0.5 rounded uppercase">
                        {language === 'pt' ? `Destino ${idx+1}` : `Destination ${idx+1}`}
                      </span>
                      <span className="text-xs font-mono font-black text-emerald-400">
                        {formatGp(route.total)}
                      </span>
                    </div>

                    {/* NPC Name + Location info */}
                    <div>
                      <h4 className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-medieval-gold" />
                        {cityName}
                      </h4>
                      <p className="text-[10px] text-medieval-text/50 font-mono">
                        {t.sellToNpc} <strong className="text-medieval-gold">{route.npc}</strong>
                      </p>
                    </div>

                    {/* Cargo delivered */}
                    <div className="space-y-1 bg-black/35 p-2 rounded-md border border-white/[0.02]">
                      {route.items.map((cargo: any, cidx: number) => (
                        <div key={cidx} className="flex justify-between items-center text-[11px] font-mono">
                          <span className="text-medieval-text/80 truncate max-w-[130px]">
                            {cargo.qty}x {cargo.item.name}
                          </span>
                          <span className="text-emerald-400/90 text-right shrink-0">
                            {formatGp(cargo.price * cargo.qty)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Redirected details tooltip info */}
                  {route.items.some((i: any) => i.isRedirected) && (
                    <div className="bg-yellow-950/10 border border-yellow-500/10 rounded-md p-2 text-[9px] text-[#A67C00] font-mono leading-tight">
                      {language === 'pt' 
                        ? "* Contém itens redirecionados localmente para poupar custos de transporte adicionais!" 
                        : "* Includes items redirected locally to avoid redundant sailing expenses!"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ALL PRICE MATRIX SEARCH AND BROWSE TABLE */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-medieval-gold/15 pb-2">
          <h2 className="text-xl font-black text-medieval-gold uppercase tracking-tighter flex items-center gap-2">
            <Coins className="w-5 h-5 text-medieval-gold" />
            {t.tableTitle}
          </h2>

          <div className="flex gap-2">
            {/* Direct auto search input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-medieval-gold/45" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 h-9 bg-black/60 border border-medieval-gold/10 hover:border-medieval-gold/25 focus:border-medieval-gold rounded text-xs text-medieval-gold placeholder:text-medieval-gold/40 outline-none w-56 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`py-1.5 px-3 rounded-full text-[10px] font-bold uppercase cursor-pointer tracking-wider transition-all border ${
                categoryFilter === cat.id
                  ? 'bg-medieval-gold text-black border-medieval-gold'
                  : 'bg-black/30 border-medieval-gold/15 text-medieval-gold/60 hover:text-medieval-gold hover:bg-medieval-gold/5'
              }`}
            >
              {language === 'pt' ? cat.labelPt : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Beautiful Modern Grid scroll view. NOT looking like 1980! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCatalog.map((item) => {
            // Find best buyer price
            const sortedBuyers = [...item.buyers].sort((a,b) => b.price - a.price);
            const best = sortedBuyers[0];

            return (
              <div 
                key={item.id}
                className="bg-black/40 border border-medieval-gold/10 hover:border-medieval-gold/30 rounded-lg p-4 transition-all duration-200 flex flex-col justify-between gap-4 select-none"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 shrink-0 bg-black/60 border border-medieval-gold/20 rounded flex items-center justify-center font-mono text-[10px] font-black text-medieval-gold/80">
                    {item.name.substring(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white leading-snug">{item.name}</h4>
                    <p className="text-[10px] text-medieval-text/50 font-mono mt-0.5">
                      {language === 'pt' ? 'Peso' : 'Weight'}: {formatWeight(item.weight)}
                    </p>
                  </div>
                </div>

                <div className="bg-black/50 p-2.5 rounded-lg border border-medieval-gold/5 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[11px] items-center text-medieval-gold font-bold">
                    <span>{t.tableBest}:</span>
                    <span className="text-emerald-400 font-black">{formatGp(best.price)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-medieval-text/50">
                    <span>Cidade / NPC:</span>
                    <span className="text-right truncate max-w-[140px]">{best.city} ({best.npc})</span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddItem(item)}
                  className="w-full py-2 bg-medieval-gold/10 hover:bg-medieval-gold/15 text-medieval-gold rounded font-bold text-[10px] uppercase tracking-wider border border-medieval-gold/25 cursor-pointer hover:border-medieval-gold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {language === 'pt' ? 'Adicionar ao Loot' : 'Add to Backpack'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
