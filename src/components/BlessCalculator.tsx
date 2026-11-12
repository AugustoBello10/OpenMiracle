import React, { useState, useMemo } from 'react';
import { TrendingUp, Info, Map } from 'lucide-react';
import { calculateBlessCosts } from '../lib/formulas';
import { BLESS_LOCATIONS } from '../data/wikiData';
import { MapModal } from './MapModal';

interface BlessCalculatorProps {
  t: (key: string) => string;
}

export function BlessCalculator({ t }: BlessCalculatorProps) {
  const [level, setLevel] = useState<number>(100);
  const [activeMap, setActiveMap] = useState<{ name: string; city: string; x: number; y: number; z: number } | null>(null);
  const costs = useMemo(() => calculateBlessCosts(level), [level]);

  const renderCostCoins = (totalGold: number, rightAlign: boolean = false, isLarge: boolean = false) => {
    if (totalGold <= 0) return <span className="text-medieval-gold font-bold">0</span>;
    const cc = Math.floor(totalGold / 10000);
    const pc = Math.floor((totalGold % 10000) / 100);
    const gc = totalGold % 100;

    return (
      <div className={`flex flex-col ${rightAlign ? 'items-end' : 'items-start'} gap-1 mt-1`}>
        <div className={`flex flex-wrap items-center ${rightAlign ? 'justify-end' : 'justify-start'} gap-3`}>
          {cc > 0 && (
            <span className={`flex items-center gap-1.5 font-black text-white ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
              <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/crystalcoin.gif" alt="CC" className={`${isLarge ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-5 h-5'} drop-shadow-md`} />
              {' '}{cc.toLocaleString('pt-BR')}
            </span>
          )}
          {pc > 0 && (
            <span className={`flex items-center gap-1.5 font-black text-white ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
              <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/platinumcoin.gif" alt="PC" className={`${isLarge ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-5 h-5'} drop-shadow-md`} />
              {' '}{pc.toLocaleString('pt-BR')}
            </span>
          )}
          {gc > 0 && (
            <span className={`flex items-center gap-1.5 font-black text-white ${isLarge ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
              <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/goldcoin.gif" alt="GC" className={`${isLarge ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-5 h-5'} drop-shadow-md`} />
              {' '}{gc.toLocaleString('pt-BR')}
            </span>
          )}
        </div>
        <div className={`font-mono font-bold text-medieval-gold/60 ${isLarge ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}`}>
          ({totalGold.toLocaleString('pt-BR')} gps)
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
          {t('blessDeath')}
        </h1>
        <p className="text-medieval-gold/80 font-mono text-sm">
          {t('heroSubtitle')}
        </p>
      </header>

      <div className="space-y-8">
        <div className="medieval-card p-6 sm:p-8">
          <div className="space-y-8">
            <div className="flex flex-col gap-2 max-w-xs">
              <label className="text-medieval-gold font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> {t('characterLevel')}
              </label>
              <input
                type="number"
                min="1"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="medieval-input text-2xl font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-black/40 rounded border border-medieval-gold/10 flex flex-col justify-between">
                <div>
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('standardBless')}</p>
                  <p className="text-xs text-medieval-text/50 mb-3 italic">{t('standardBlessList')}</p>
                </div>
                {renderCostCoins(costs.standardTotal)}
              </div>
              <div className="p-5 bg-black/40 rounded border border-medieval-gold/10 flex flex-col justify-between">
                <div>
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('tomeBless')}</p>
                  <p className="text-xs text-medieval-text/50 mb-3 italic">{t('tomeBlessDesc')}</p>
                </div>
                {renderCostCoins(costs.blessTomePrice)}
              </div>
              <div className="p-5 bg-black/40 rounded border border-medieval-gold/10 flex flex-col justify-between">
                <div>
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('arcaneBless')}</p>
                  <p className="text-xs text-medieval-text/50 mb-3 italic">{t('arcaneBlessDesc')}</p>
                </div>
                {renderCostCoins(costs.arcaneGuardianPrice)}
              </div>
              <div className="p-5 bg-black/40 rounded border border-medieval-gold/10 flex flex-col justify-between">
                <div>
                  <p className="text-medieval-gold/60 uppercase text-[10px] font-black tracking-widest mb-1">{t('aolCost')}</p>
                  <p className="text-xs text-medieval-text/50 mb-3 italic">{t('aolDesc')}</p>
                </div>
                {renderCostCoins(costs.aolPrice)}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-medieval-gold/20 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 bg-medieval-gold/5 rounded border border-medieval-gold/20">
                <span className="text-medieval-gold font-black uppercase text-xs tracking-widest">{t('totalInBless')}</span>
                {renderCostCoins(costs.totalBlesses, true, false)}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 sm:p-8 bg-medieval-gold/10 rounded border border-medieval-gold/40">
                <span className="text-medieval-gold font-black uppercase text-sm tracking-widest">{t('totalDeathCost')}</span>
                {renderCostCoins(costs.grandTotal, true, true)}
              </div>
            </div>
          </div>
        </div>

        <div className="medieval-card p-6 sm:p-8">
          <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-6">
            <Info className="w-5 h-5" /> {t('blessDetails')}
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-xs sm:text-sm text-medieval-text/70 leading-relaxed font-mono">
            <p>• <span className="text-red-400 font-bold">Penalidade Padrão:</span> A penalidade padrão ao morrer no Miracle é de <span className="text-white font-bold">10%</span> na experiência e skills/magic level.</p>
            <p>• <span className="text-medieval-gold">Redução de XP/Skill:</span> Cada bless protege <span className="text-green-400 font-bold">0.8%</span> e a Promotion protege <span className="text-green-400 font-bold">3%</span>.</p>
            <p>• <span className="text-medieval-gold">{t('standardBless')}:</span> 10k fixo até o lvl 100. Após isso, +100gp por level cada.</p>
            <p>• <span className="text-medieval-gold">{t('tomeBless')}:</span> Custo fixo de 25k no NPC Eremo. (Também protege XP/Skills)</p>
            <p>• <span className="text-blue-400 font-bold">{t('arcaneBless')}:</span> É a única bless que <span className="text-red-400">não protege XP/Skills</span>. Ela protege seus itens de perderem <span className="text-blue-300 font-bold">atributos</span> e tem duração de 10 dias. <i>Atenção: A cada atributo adicional que você possua equipado, o tempo total de 10 dias é reduzido em 10%.</i> Custo: 200gp x Level.</p>
            <p>• <span className="text-medieval-gold">Amulet of Loss:</span> Protege a queda da mochila (backpack) e equipamentos base. Custo fixo de 50k.</p>
          </div>
        </div>

        {/* Seção de Localizações */}
        <div className="medieval-card p-6 sm:p-8">
          <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-6">
            <Map className="w-5 h-5" /> Localização das Blessings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLESS_LOCATIONS.map((bless) => (
              <div key={bless.id} className="bg-black/30 border border-medieval-gold/10 p-4 rounded-xl flex flex-col gap-3">
                <div>
                  <h4 className="text-medieval-gold font-bold text-sm">{bless.name}</h4>
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  {bless.locations.map((loc, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMap({ name: bless.name, city: loc.label, x: loc.x, y: loc.y, z: loc.z })}
                      className="flex items-center justify-between gap-2 bg-medieval-gold/10 hover:bg-medieval-gold/20 text-medieval-gold text-xs font-bold py-2 px-3 rounded-lg border border-medieval-gold/20 transition-all w-full"
                    >
                      <span className="text-medieval-text/70">{loc.label}</span>
                      <span>Ver no Mapa</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MapModal
        isOpen={!!activeMap}
        onClose={() => setActiveMap(null)}
        targetCoords={activeMap ? { x: activeMap.x, y: activeMap.y, z: activeMap.z } : null}
        title={activeMap ? `${activeMap.name} - ${activeMap.city}` : ''}
      />
    </div>
  );
}
export default BlessCalculator;
