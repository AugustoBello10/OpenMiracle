
import React, { useState, useMemo } from 'react';
import { Sprout, Clock, Coins, TrendingUp, Info, AlertTriangle, Droplets } from 'lucide-react';
import { FARMING_TREES, FarmingTree } from '../data/farming';

interface FarmingCalculatorProps {
  t: (key: string) => string;
  initialTreeName?: string;
}

export const FarmingCalculator: React.FC<FarmingCalculatorProps> = ({ t, initialTreeName }) => {
  const [farmingSkill, setFarmingSkill] = useState<number | string>(10);
  const [miracleCoinPrice, setMiracleCoinPrice] = useState<number | string>(5000);
  const [selectedTreeName, setSelectedTreeName] = useState<string>(FARMING_TREES[0].name);

  React.useEffect(() => {
    if (initialTreeName) {
      setSelectedTreeName(initialTreeName);
    }
  }, [initialTreeName]);
  const [fruitPrice, setFruitPrice] = useState<number | string>(50);
  const [treeQuantity, setTreeQuantity] = useState<number | string>(1);

  const skillNum = Number(farmingSkill) || 0;
  const coinPriceNum = Number(miracleCoinPrice) || 0;
  const fruitPriceNum = Number(fruitPrice) || 0;
  const quantityNum = Number(treeQuantity) || 0;

  const selectedTree = useMemo(() => 
    FARMING_TREES.find(tree => tree.name === selectedTreeName) || FARMING_TREES[0]
  , [selectedTreeName]);

  const currentYield = useMemo(() => {
    const yieldData = [...selectedTree.yields].reverse().find(y => skillNum >= y.level) || selectedTree.yields[0];
    return yieldData;
  }, [selectedTree, skillNum]);

  const stats = useMemo(() => {
    const avgYield = (currentYield.min + currentYield.max) / 2;
    const totalMinutes = selectedTree.lifetimeDays * 24 * 60;
    const totalHarvests = Math.floor(totalMinutes / selectedTree.intervalMinutes);
    const totalYieldPerTree = totalHarvests * avgYield;
    
    let totalTreeCostGp = 0;
    let totalCoinsNeeded = 0;
    let totalPointsNeeded = 0;

    if (selectedTree.cost.type === 'point') {
      totalPointsNeeded = selectedTree.cost.value * quantityNum;
      // 1 Coin = 10 Points, cannot buy fractions
      totalCoinsNeeded = Math.ceil(totalPointsNeeded / 10);
      totalTreeCostGp = totalCoinsNeeded * coinPriceNum;
    } else {
      totalTreeCostGp = selectedTree.cost.value * quantityNum;
    }
      
    const totalTotalYield = totalYieldPerTree * quantityNum;
    const totalTotalRevenue = totalTotalYield * fruitPriceNum;
    const totalProfit = totalTotalRevenue - totalTreeCostGp;
    const roi = totalTreeCostGp > 0 ? (totalProfit / totalTreeCostGp) * 100 : 0;

    // BP Metrics
    const bpPrice = fruitPriceNum * 2000;
    const totalBps = totalTotalYield / 2000;

    // Break-even (calculated per tree basis but considering the coin rounding if applicable)
    // If points, we use the effective cost per tree considering the total coins bought
    const effectiveCostPerTree = totalTreeCostGp / quantityNum;
    const fruitsToPayOneTree = fruitPriceNum > 0 ? effectiveCostPerTree / fruitPriceNum : 0;
    const harvestsToPay = avgYield > 0 ? fruitsToPayOneTree / avgYield : 0;

    // Watering bonus: Farming * 1min * Multiplier
    const extraMinutesPerWatering = skillNum * 1 * selectedTree.multiplier;
    
    return {
      avgYield,
      totalHarvests,
      totalYieldPerTree,
      totalTotalYield,
      totalTreeCostGp,
      totalTotalRevenue,
      totalProfit,
      roi,
      extraMinutesPerWatering,
      bpPrice,
      totalBps,
      fruitsToPayOneTree,
      harvestsToPay,
      totalCoinsNeeded,
      totalPointsNeeded
    };
  }, [selectedTree, currentYield, skillNum, coinPriceNum, fruitPriceNum, quantityNum]);

  return (
    <div className="space-y-8">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2">
          {t('farming')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm">
          {t('farmingSubtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar: Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                <Sprout className="w-4 h-4" /> {t('currentSkill')}
              </label>
              <input
                type="number"
                value={farmingSkill}
                onChange={(e) => setFarmingSkill(e.target.value)}
                className="medieval-input"
                min="1"
                max="200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> {t('treeQuantity')}
              </label>
              <input
                type="number"
                value={treeQuantity}
                onChange={(e) => setTreeQuantity(e.target.value)}
                className="medieval-input"
                min="1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                <Coins className="w-4 h-4" /> {t('miracleCoinPrice')}
              </label>
              <input
                type="number"
                value={miracleCoinPrice}
                onChange={(e) => setMiracleCoinPrice(e.target.value)}
                className="medieval-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> {t('fruitPrice')}
              </label>
              <input
                type="number"
                step="0.01"
                value={fruitPrice}
                onChange={(e) => setFruitPrice(e.target.value)}
                className="medieval-input"
              />
            </div>

            <div className="p-4 bg-medieval-gold/5 border border-medieval-gold/20 rounded-lg space-y-2">
              <h4 className="text-[10px] font-black uppercase text-medieval-gold tracking-widest flex items-center gap-2">
                <Info className="w-3 h-3" /> Info
              </h4>
              <p className="text-[10px] text-medieval-text/60 leading-relaxed italic">
                {t('organicStatusDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content: Tree Selection & Results */}
        <div className="lg:col-span-8 space-y-8">
          {/* Tree Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FARMING_TREES.map(tree => (
              <button
                key={tree.name}
                onClick={() => setSelectedTreeName(tree.name)}
                className={`medieval-card p-4 medieval-border rounded-lg text-left transition-all ${
                  selectedTreeName === tree.name 
                    ? 'bg-medieval-gold/10 border-medieval-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                    : 'bg-medieval-card border-medieval-gold/20 hover:border-medieval-gold/50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-black uppercase text-medieval-gold tracking-tighter">{tree.name}</span>
                  {tree.profession && (
                    <span className="text-[8px] bg-medieval-gold/20 text-medieval-gold px-1.5 py-0.5 rounded uppercase font-bold">
                      {tree.profession}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-medieval-text/60 space-y-1">
                  <p>{t('lifetime')}: {tree.lifetimeDays}d</p>
                  <p>{t('harvestInterval')}: {tree.intervalMinutes}m</p>
                  <p className="font-bold text-medieval-gold/80">
                    {t('cost')}: {tree.cost.value} {tree.cost.type === 'point' ? t('miraclePoints') : 'GP'}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg space-y-6">
              <h3 className="text-sm font-black text-medieval-gold uppercase tracking-widest flex items-center gap-2">
                <Sprout className="w-4 h-4" /> {t('yieldPerHarvest')}
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-black/40 rounded border border-medieval-gold/10">
                  <p className="text-[9px] uppercase text-medieval-gold/40 font-bold mb-1">Min</p>
                  <p className="text-xl font-black text-medieval-gold">{currentYield.min}</p>
                </div>
                <div className="p-3 bg-medieval-gold/5 rounded border border-medieval-gold/30">
                  <p className="text-[9px] uppercase text-medieval-gold/60 font-bold mb-1">Avg</p>
                  <p className="text-xl font-black text-medieval-gold">{stats.avgYield.toFixed(1)}</p>
                </div>
                <div className="p-3 bg-black/40 rounded border border-medieval-gold/10">
                  <p className="text-[9px] uppercase text-medieval-gold/40 font-bold mb-1">Max</p>
                  <p className="text-xl font-black text-medieval-gold">{currentYield.max}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-medieval-gold/10">
                <div className="flex justify-between text-xs">
                  <span className="text-medieval-text/60">{t('totalHarvests')}</span>
                  <span className="font-mono text-medieval-gold">{stats.totalHarvests}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-medieval-text/60">{t('totalYield')}</span>
                  <span className="font-mono text-medieval-gold">{stats.totalTotalYield.toLocaleString()} {selectedTree.fruit}s</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-medieval-gold/5">
                  <span className="text-medieval-text/60">{t('totalBps')}</span>
                  <span className="font-mono text-medieval-gold">{stats.totalBps.toFixed(2)} BP</span>
                </div>
              </div>
            </div>

            <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg space-y-6">
              <h3 className="text-sm font-black text-medieval-gold uppercase tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> {t('estimatedProfit')}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded border border-medieval-gold/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase text-medieval-gold/60 font-bold">{t('cost')} (GP)</span>
                    <span className="text-lg font-black text-medieval-text">{stats.totalTreeCostGp.toLocaleString()} gp</span>
                  </div>
                  {selectedTree.cost.type === 'point' && (
                    <div className="flex justify-between items-center pt-2 border-t border-medieval-gold/5">
                      <span className="text-[9px] text-medieval-text/40 uppercase">{t('totalCoinsNeeded')}</span>
                      <span className="text-[10px] font-mono text-medieval-gold">{stats.totalCoinsNeeded} Coins ({stats.totalPointsNeeded} pts)</span>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-medieval-gold/5 rounded border border-medieval-gold/30 flex justify-between items-center">
                  <span className="text-[10px] uppercase text-medieval-gold/60 font-bold">{t('estimatedProfit')}</span>
                  <span className={`text-lg font-black ${stats.totalProfit >= 0 ? 'text-green-500' : 'text-medieval-red'}`}>
                    {stats.totalProfit.toLocaleString()} gp
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-[9px] uppercase text-medieval-gold/40 font-bold mb-1">{t('roi')}</p>
                    <p className={`text-xl font-black ${stats.roi >= 0 ? 'text-medieval-gold' : 'text-medieval-red'}`}>
                      {stats.roi.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] uppercase text-medieval-gold/40 font-bold mb-1">BP Price</p>
                    <p className="text-xl font-black text-medieval-gold">
                      {(stats.bpPrice / 1000).toFixed(1)}k
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Break-even Section */}
          <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg space-y-4">
            <h3 className="text-sm font-black text-medieval-gold uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> {t('breakEven')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/40 rounded border border-medieval-gold/10">
                <p className="text-[9px] uppercase text-medieval-gold/40 font-bold mb-1">{t('fruitsToPay')}</p>
                <p className="text-xl font-black text-medieval-gold">{Math.ceil(stats.fruitsToPayOneTree).toLocaleString()} {selectedTree.fruit}s</p>
                <p className="text-[8px] text-medieval-text/40 uppercase mt-1">~{(stats.fruitsToPayOneTree / 2000).toFixed(2)} BPs</p>
              </div>
              <div className="p-4 bg-black/40 rounded border border-medieval-gold/10">
                <p className="text-[9px] uppercase text-medieval-gold/40 font-bold mb-1">{t('harvestsToPay')}</p>
                <p className="text-xl font-black text-medieval-gold">{Math.ceil(stats.harvestsToPay)} {t('harvests')}</p>
                <p className="text-[8px] text-medieval-text/40 uppercase mt-1">~{((Math.ceil(stats.harvestsToPay) * selectedTree.intervalMinutes) / 60).toFixed(1)}h de cultivo</p>
              </div>
            </div>
          </div>

          {/* Watering Section */}
          <div className="medieval-card bg-medieval-card p-6 medieval-border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded">
                  <Droplets className="text-blue-400 w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-medieval-gold uppercase tracking-widest">{t('wateringBonus')}</h3>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase text-medieval-gold/40 font-bold mb-1">{t('extraLifetime')}</p>
                <p className="text-xl font-black text-blue-400">+{stats.extraMinutesPerWatering} min</p>
              </div>
            </div>
            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <p className="text-[10px] text-medieval-text/70 leading-relaxed italic">
                {t('wateringBonusDesc')}
              </p>
            </div>
          </div>

          <div className="p-4 bg-medieval-red/10 border border-medieval-red/20 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-medieval-red shrink-0 mt-0.5" />
            <p className="text-[10px] text-medieval-text/60 italic uppercase tracking-tighter leading-relaxed">
              {t('communityWarning')} • {t('organicStatusDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
