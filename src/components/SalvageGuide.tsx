import React, { useState, useMemo } from 'react';
import { Hammer, Coins, Search, ArrowUpDown, Info, TrendingUp, Sparkles, Filter, Settings, HelpCircle, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SALVAGE_ITEMS, SalvageItem } from '../data/salvageDb';

interface SalvageGuideProps {
  language: 'pt' | 'en';
}

export const SalvageGuide: React.FC<SalvageGuideProps> = ({ language }) => {
  const [search, setSearch] = useState('');
  const [materialFilter, setMaterialFilter] = useState<string>('all');
  const [verdictFilter, setVerdictFilter] = useState<string>('all');
  const [comparisonMode, setComparisonMode] = useState<'npc' | 'player'>('npc');
  
  // Custom prices for materials
  const [npcPrices, setNpcPrices] = useState({
    steel: 11,
    'draconian steel': 44,
    'hell steel': 108,
  });

  const [playerPrices, setPlayerPrices] = useState({
    steel: 25,
    'draconian steel': 150,
    'hell steel': 550,
  });

  // Sorting
  const [sortBy, setSortBy] = useState<keyof SalvageItem | 'npcValue' | 'playerValue' | 'profit'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc'); // default to descending for numbers
    }
  };

  const handlePriceChange = (material: 'steel' | 'draconian steel' | 'hell steel', type: 'npc' | 'player', val: string) => {
    const numeric = parseInt(val) || 0;
    if (type === 'npc') {
      setNpcPrices(prev => ({ ...prev, [material]: numeric }));
    } else {
      setPlayerPrices(prev => ({ ...prev, [material]: numeric }));
    }
  };

  const processedItems = useMemo(() => {
    return SALVAGE_ITEMS.map(item => {
      // Calculate broken values
      let brokenNpcVal = 0;
      let brokenPlayerVal = 0;

      item.materials.forEach(mat => {
        const avgCount = (mat.min + mat.max) / 2;
        const npcUnit = npcPrices[mat.name] || 0;
        const playerUnit = playerPrices[mat.name] || 0;

        brokenNpcVal += avgCount * npcUnit;
        brokenPlayerVal += avgCount * playerUnit;
      });

      const isDwarvenAxe = item.name === 'Dwarven Axe';

      // Decide verdict strictly based on chosen comparisonMode values
      const currentBrokenVal = comparisonMode === 'npc' ? brokenNpcVal : brokenPlayerVal;
      let verdict: 'sell' | 'break' = 'sell';
      if (isDwarvenAxe) {
        verdict = 'break';
      } else if (currentBrokenVal > item.npcSellPrice) {
        verdict = 'break';
      }

      return {
        ...item,
        brokenNpcVal: parseFloat(brokenNpcVal.toFixed(1)),
        brokenPlayerVal: parseFloat(brokenPlayerVal.toFixed(1)),
        verdict,
        profitNpc: parseFloat((brokenNpcVal - item.npcSellPrice).toFixed(1)),
        profitPlayer: parseFloat((brokenPlayerVal - item.npcSellPrice).toFixed(1)),
        profit: parseFloat((currentBrokenVal - item.npcSellPrice).toFixed(1))
      };
    });
  }, [npcPrices, playerPrices, comparisonMode]);

  const filteredItems = useMemo(() => {
    return processedItems
      .filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        
        const matchesMaterial = materialFilter === 'all' 
          ? true 
          : item.materials.some(m => m.name === materialFilter);
        
        let matchesVerdict = true;
        if (verdictFilter === 'break') {
          matchesVerdict = item.verdict === 'break';
        } else if (verdictFilter === 'sell') {
          matchesVerdict = item.verdict === 'sell';
        }

        return matchesSearch && matchesMaterial && matchesVerdict;
      })
      .sort((a, b) => {
        let valA: any = a[sortBy as keyof typeof a];
        let valB: any = b[sortBy as keyof typeof b];

        if (sortBy === 'npcValue') {
          valA = a.brokenNpcVal;
          valB = b.brokenNpcVal;
        } else if (sortBy === 'playerValue') {
          valA = a.brokenPlayerVal;
          valB = b.brokenPlayerVal;
        } else if (sortBy === 'profit') {
          valA = a.profit;
          valB = b.profit;
        }

        if (typeof valA === 'string') {
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
      });
  }, [processedItems, search, materialFilter, verdictFilter, sortBy, sortOrder]);

  return (
    <div className="space-y-8 font-sans">
      {/* Intro Header */}
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-medieval-gold uppercase tracking-tight flex items-center justify-center md:justify-start gap-2.5">
          <Hammer className="w-7 h-7 text-medieval-gold animate-pulse" />
          {language === 'pt' ? 'Guia de Quebra & Salvamento de Itens' : 'Item Breakdown & Salvage Guide'}
        </h2>
        <p className="text-sm text-medieval-text/80 max-w-3xl leading-relaxed">
          {language === 'pt' 
            ? 'Compare se é melhor quebrar seus itens para conseguir materiais valiosos ou vendê-los diretamente nos compradores NPCs. Calcule os ganhos baseados nos materiais que cada item gera de acordo com os preços atuais do mercado com juízo de valor em tempo real!' 
            : 'Find out whether it is better to smash your items into valuable crafting materials or sell them directly to NPCs. Calculate yields based on breaking drops under current market prices with real-time verdicts!'}
        </p>
      </div>

      {/* Real-time Material Price Configuration panel */}
      <div className="medieval-border bg-black/45 rounded-lg p-5 border-medieval-gold/20 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-medieval-gold/15 pb-2.5">
          <Settings className="w-4 h-4 text-medieval-gold" />
          <h3 className="text-xs font-black text-medieval-gold uppercase tracking-wider">
            {language === 'pt' ? 'Ajustar Preços de Materiais (Modificar Valores)' : 'Configure Material Prices (Real-time updates)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(['steel', 'draconian steel', 'hell steel'] as const).map((mat) => {
            const label = mat.charAt(0).toUpperCase() + mat.slice(1);
            const colorClass = mat === 'hell steel' ? 'text-red-400' : mat === 'draconian steel' ? 'text-blue-400' : 'text-slate-200';
            
            return (
              <div key={mat} className="bg-black/40 p-3.5 rounded-lg border border-medieval-gold/10 space-y-3 hover:border-medieval-gold/20 transition-colors">
                <span className={`text-xs font-mono font-black uppercase ${colorClass}`}>{label}</span>
                
                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] text-medieval-text/50 uppercase font-bold block">NPC Venda</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={npcPrices[mat]}
                        onChange={(e) => handlePriceChange(mat, 'npc', e.target.value)}
                        className="w-full bg-black/50 text-xs text-medieval-gold font-mono p-1.5 pl-2.5 rounded border border-medieval-gold/15 focus:border-medieval-gold outline-none"
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-medieval-gold/40">gp</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-medieval-text/50 uppercase font-bold block">Players</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={playerPrices[mat]}
                        onChange={(e) => handlePriceChange(mat, 'player', e.target.value)}
                        className="w-full bg-black/50 text-xs text-medieval-gold font-mono p-1.5 pl-2.5 rounded border border-medieval-gold/15 focus:border-medieval-gold outline-none"
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-medieval-gold/40">gp</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control filters bar */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-stretch xl:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-medieval-gold/40" />
          <input
            type="text"
            placeholder={language === 'pt' ? 'Buscar item por nome...' : 'Search items...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/55 text-xs text-medieval-gold border border-medieval-gold/10 hover:border-medieval-gold/20 focus:border-medieval-gold/50 p-2.5 pl-9 rounded outline-none font-mono"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap gap-2.5">
          {/* Compare Type Toggle */}
          <div className="bg-black/55 border border-medieval-gold/15 rounded flex items-center p-1 gap-1">
            <span className="text-[9px] uppercase font-bold text-medieval-gold/50 px-2 flex items-center gap-1"><Coins className="w-2.5 h-2.5" /> {language === 'pt' ? 'Comparar com:' : 'Compare using:'}</span>
            {[
              { id: 'npc', label: language === 'pt' ? 'Preço de NPC' : 'NPC Price' },
              { id: 'player', label: language === 'pt' ? 'Preço de Players' : 'Player Price' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setComparisonMode(f.id as 'npc' | 'player')}
                className={`py-1 px-2 text-[9.5px] font-bold uppercase transition-colors rounded ${
                  comparisonMode === f.id ? 'bg-medieval-gold text-black font-black' : 'text-medieval-text/60 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="bg-black/55 border border-medieval-gold/10 rounded flex items-center p-1 gap-1">
            <span className="text-[9px] uppercase font-bold text-medieval-gold/50 px-2 flex items-center gap-1"><Filter className="w-2.5 h-2.5" /> {language === 'pt' ? 'Materiais:' : 'Materials:'}</span>
            {[
              { id: 'all', label: language === 'pt' ? 'Todos' : 'All' },
              { id: 'steel', label: 'Steel' },
              { id: 'draconian steel', label: 'Draconian' },
              { id: 'hell steel', label: 'Hell' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setMaterialFilter(f.id)}
                className={`py-1 px-2 text-[9.5px] font-bold uppercase transition-colors rounded ${
                  materialFilter === f.id ? 'bg-medieval-gold text-black font-black' : 'text-medieval-text/60 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="bg-black/55 border border-medieval-gold/10 rounded flex items-center p-1 gap-1">
            <span className="text-[9px] uppercase font-bold text-medieval-gold/50 px-2 flex items-center gap-1"><TrendingUp className="w-2.5 h-2.5" /> {language === 'pt' ? 'Decisão:' : 'Verdict:'}</span>
            {[
              { id: 'all', label: language === 'pt' ? 'Qualquer' : 'Any' },
              { id: 'break', label: language === 'pt' ? 'Sugerido Quebrar' : 'Break Recommended' },
              { id: 'sell', label: language === 'pt' ? 'Melhor Vender NPC' : 'Sell NPC' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setVerdictFilter(f.id)}
                className={`py-1 px-2 text-[9.5px] font-bold uppercase transition-colors rounded ${
                  verdictFilter === f.id ? 'bg-medieval-gold text-black font-black' : 'text-medieval-text/60 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main interactive Table list */}
      <div className="medieval-border rounded-lg bg-medieval-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-black/60 text-medieval-gold uppercase text-[10px] tracking-widest border-b border-medieval-gold/20 select-none">
                <th 
                  onClick={() => handleSort('name')}
                  className="p-4 font-black hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    {language === 'pt' ? 'Item' : 'Item Name'} <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('npcSellPrice')}
                  className="p-4 text-center font-black hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    {language === 'pt' ? 'Comprador NPC' : 'Raw NPC Price'} <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </th>
                <th className="p-4 font-black">
                  {language === 'pt' ? 'Rendimento Estimado da Quebra' : 'Estimated Materials Yield'}
                </th>
                <th 
                  onClick={() => handleSort('npcValue')}
                  className="p-4 text-center font-black hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    {language === 'pt' ? 'Break Para NPC' : 'Broken NPC Value'} <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('playerValue')}
                  className="p-4 text-center font-black hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    {language === 'pt' ? 'Break Para Player' : 'Broken Player Value'} <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('profit')}
                  className="p-4 text-right font-black hover:bg-white/5 cursor-pointer transition-colors pr-6"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    {language === 'pt' ? 'Juízo & Margem' : 'Verdict & Margin'} <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center font-mono text-medieval-text/40 italic">
                    {language === 'pt' ? 'Nenhum item quebravel corresponde aos filtros selecionados.' : 'No breakable items matched selected filters.'}
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => {
                  const isDwarvenAxe = item.name === 'Dwarven Axe';

                  return (
                    <tr 
                      key={item.name} 
                      className={`border-b border-medieval-gold/10 hover:bg-white/[0.03] transition-colors ${
                        item.verdict === 'break' ? 'bg-emerald-950/15 border-l-2 border-l-emerald-500' : ''
                      }`}
                    >
                      {/* Name of item */}
                      <td className="p-4 font-bold text-white tracking-tight">
                        <span className="flex flex-col">
                          <span>{item.name}</span>
                          {isDwarvenAxe && (
                            <span className="text-[10px] text-yellow-500 font-mono italic">
                              *Sem preço fixo no NPC no server
                            </span>
                          )}
                        </span>
                      </td>

                      {/* Raw NPC price */}
                      <td className="p-4 text-center font-mono font-bold text-medieval-gold">
                        {isDwarvenAxe ? '-' : `${item.npcSellPrice.toLocaleString()} gp`}
                      </td>

                      {/* Yield info */}
                      <td className="p-4 space-y-1">
                        {item.materials.map(mat => {
                          const avg = (mat.min + mat.max) / 2;
                          const matLabel = mat.name.toUpperCase();
                          const matColor = mat.name === 'hell steel' ? 'text-red-400 font-black' : mat.name === 'draconian steel' ? 'text-blue-400 font-bold' : 'text-slate-300';
                          return (
                            <div key={mat.name} className="flex justify-between items-center text-[11px] bg-black/40 px-2 py-1 rounded border border-white/[0.02]">
                              <span className={matColor}>{matLabel}</span>
                              <span className="font-mono text-medieval-text/80">
                                Min: <strong className="text-white font-black">{mat.min}</strong> | Max: <strong className="text-white font-black">{mat.max}</strong> | Média: <strong className="text-medieval-gold font-black">{avg}x</strong>
                              </span>
                            </div>
                          );
                        })}
                      </td>

                      {/* Calculated NPC broken value */}
                      <td className="p-4 text-center font-mono">
                        <div className="flex flex-col">
                          <span className={`font-bold ${comparisonMode === 'npc' ? 'text-medieval-gold text-[13px]' : 'text-slate-500'}`}>{item.brokenNpcVal} gp</span>
                          <span className="text-[9px] text-medieval-text/40">
                            {language === 'pt' ? 'Média base' : 'Avg yield based'}
                          </span>
                        </div>
                      </td>

                      {/* Calculated Player broken value */}
                      <td className="p-4 text-center font-mono">
                        <div className="flex flex-col">
                          <span className={`font-bold ${comparisonMode === 'player' ? 'text-emerald-400 text-[13px]' : 'text-slate-500'}`}>{item.brokenPlayerVal} gp</span>
                          <span className="text-[9px] text-medieval-text/40">
                            {language === 'pt' ? 'Média base' : 'Avg yield based'}
                          </span>
                        </div>
                      </td>

                      {/* Verdict of value */}
                      <td className="p-4 text-right pr-6">
                        <div className="flex flex-col items-end gap-1.5">
                          {item.verdict === 'break' ? (
                            <div className="flex flex-col items-end">
                              <span className="px-2 py-1 text-[9.5px] font-black uppercase text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded-sm flex items-center gap-1 animate-pulse">
                                <Sparkles className="w-3 h-3 text-emerald-400" /> QUEBRAR
                              </span>
                              <span className="text-[10px] text-emerald-400 font-mono font-bold mt-1">
                                {comparisonMode === 'npc' ? (language === 'pt' ? 'Lucro NPC:' : 'NPC Profit:') : (language === 'pt' ? 'Lucro Player:' : 'Player Profit:')} +{comparisonMode === 'npc' ? item.profitNpc : item.profitPlayer} gp
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-end">
                              <span className="px-2 py-1 text-[9.5px] font-bold uppercase text-red-400 bg-red-950/15 border border-red-900/20 rounded-sm flex items-center gap-1">
                                <Coins className="w-3 h-3 text-red-400/80" /> VENDER NPC
                              </span>
                              <span className="text-[10px] text-medieval-text/50 font-mono mt-1">
                                Quebrando Perde: {isDwarvenAxe ? '-' : `${Math.abs(comparisonMode === 'npc' ? item.profitNpc : item.profitPlayer)} gp`}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Helpful educational tips block */}
      <div className="bg-medieval-gold/5 border border-medieval-gold/15 p-4 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-medieval-gold shrink-0 mt-0.5" />
        <div className="text-xs text-medieval-text/80 space-y-2 leading-relaxed">
          <p className="font-bold text-white uppercase tracking-wide">
            {language === 'pt' ? '💡 Dicas Práticas de Salvamento (Juízo de Valor)' : '💡 Practical Salvaging Tips (Judgment Guidelines)'}
          </p>
          <ul className="list-disc pl-4 space-y-1">
            {language === 'pt' ? (
              <>
                <li>
                  <strong>Mercado Dinâmico:</strong> Se o valor dos materiais estiver em alta nos players, itens que normalmente seriam vendidos de imediato para NPCs passam a compensar mais sendo quebrados! Use as configurações de preços acima para simular a situação atual de sua Comarca.
                </li>
                <li>
                  <strong>Custo de Oportunidade:</strong> Lembre-se que vender para players exige anunciar e esperar compradores, enquanto vender os itens prontos ou materiais de NPC dá liquidez imediata.
                </li>
                <li>
                  <strong>Equipamentos de Rank Alto:</strong> Itens como <em>Crown Armor</em>, <em>Royal Helmet</em> ou <em>Frozen Mail</em> dão muitos steels refinados (hell e draconian), compensando grandemente na quebra em relação ao seu valor em GP bruto.
                </li>
              </>
            ) : (
              <>
                <li>
                  <strong>Dynamic Markets:</strong> When player prices of steels peak, items that usually go straight to the NPC become lucrative breakdowns instead! Adjust the prices config above to match your world state.
                </li>
                <li>
                  <strong>Opportunity Costs:</strong> Finding buyers for materials takes time, whereas NPC sales are instant. Factor in transaction speeds when deciding to break.
                </li>
                <li>
                  <strong>High Rank Gear:</strong> Items like <em>Crown Armor</em>, <em>Royal Helmet</em>, or <em>Frozen Mail</em> are incredibly rich in refined steels, making them prime breakdown candidates.
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
