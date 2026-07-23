const fs = require('fs');

let code = fs.readFileSync('src/components/SkillCalculator.tsx', 'utf8');

// 1. Fix Knight mana regen
code = code.replace(
  "Knight: { normal: 12, promoted: 12 }",
  "Knight: { normal: 12, promoted: 10 }"
);

// 2. Remove fillSuggestedPrices
code = code.replace(
  /const fillSuggestedPrices = \(\) => \{\s*setPrices\(\{ spark: '50000', lightning: '150000', inferno: '350000' \}\);\s*\};\s*/,
  ""
);

code = code.replace(
  /<button\s*onClick=\{fillSuggestedPrices\}[\s\S]*?<\/button>/,
  ""
);

// 3. Update instructions to check the Market
code = code.replace(
  "Insira os preços (em Gold) para calcular a melhor combinação.",
  "Insira os preços (em Gold) para calcular a melhor combinação. Dica: Verifique o Market do jogo para cotações atualizadas."
);

// 4. Update formatGoldToK and renderCostCoins
code = code.replace(
  /const formatGoldToK = [\s\S]*?const renderCostCoins =/m,
  `const formatGoldToK = (gold: number) => {
    if (gold >= 1000000) {
      return \`\${(gold / 1000000).toFixed(1).replace('.0', '')}kk\`;
    }
    if (gold >= 1000) {
      return \`\${(gold / 1000).toFixed(1).replace('.0', '')}k\`;
    }
    return \`\${gold}\`;
  };

  const renderCostCoins =`
);

code = code.replace(
  /const renderCostCoins = \([\s\S]*?return \(\s*<div className="flex flex-col gap-1">[\s\S]*?<\/div>\s*\);\s*\};/m,
  `const renderCostCoins = (totalGold: number) => {
    if (totalGold <= 0) return <span className="text-xs text-white">0</span>;
    const cc = Math.floor(totalGold / 10000);
    const pc = Math.floor((totalGold % 10000) / 100);
    const gc = totalGold % 100;
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {cc > 0 && <span className="flex items-center gap-1.5 text-base font-black text-white"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/crystalcoin.gif" alt="CC" className="w-6 h-6 drop-shadow-md"/> {cc.toLocaleString('pt-BR')}</span>}
          {pc > 0 && <span className="flex items-center gap-1.5 text-base font-black text-white"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/platinumcoin.gif" alt="PC" className="w-6 h-6 drop-shadow-md"/> {pc.toLocaleString('pt-BR')}</span>}
          {gc > 0 && <span className="flex items-center gap-1.5 text-base font-black text-white"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/goldcoin.gif" alt="GC" className="w-6 h-6 drop-shadow-md"/> {gc.toLocaleString('pt-BR')}</span>}
        </div>
        <div className="text-xs font-black text-orange-400/90 tracking-wide">({formatGoldToK(totalGold)})</div>
      </div>
    );
  };`
);

// 5. Update renderCombo to use grid
code = code.replace(
  /const renderCombo = \([\s\S]*?return \([\s\S]*?\{formatDaysTime\(stats\.time\)\}\s*<\/p>\s*\)\}\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\};/m,
  `const renderCombo = (title: string, combo: any) => {
    if (!combo) return null;
    const stats = getComboStats(combo);
    
    return (
      <div className="bg-black/30 border border-orange-500/20 rounded-xl p-5 relative overflow-hidden transition-all hover:bg-black/40 hover:border-orange-500/40">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
        
        <div className="flex flex-col gap-5">
          <h5 className="text-orange-400 font-black uppercase text-[11px] tracking-widest flex items-center gap-2">
            <Coins className="w-4 h-4" /> {title}
          </h5>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Weapons */}
            <div className="flex flex-wrap items-center justify-center gap-4 h-full">
              {combo.Inferno > 0 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <img src={getWeaponImage('inferno')} className="w-14 h-14 object-contain drop-shadow-lg" alt="Inferno" />
                    <div className="absolute -top-1 -right-2 bg-black border border-orange-500 text-white font-black text-[11px] px-1.5 rounded">
                      x{combo.Inferno.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="text-[10px] text-orange-200/70 font-bold uppercase tracking-wider mt-1">Inferno</div>
                </div>
              )}
              {combo.Lightning > 0 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <img src={getWeaponImage('lightning')} className="w-14 h-14 object-contain drop-shadow-lg" alt="Lightning" />
                    <div className="absolute -top-1 -right-2 bg-black border border-orange-500 text-white font-black text-[11px] px-1.5 rounded">
                      x{combo.Lightning.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="text-[10px] text-orange-200/70 font-bold uppercase tracking-wider mt-1">Lightning</div>
                </div>
              )}
              {combo.Spark > 0 && (
                <div className="flex flex-col items-center gap-1">
                  <div className="relative">
                    <img src={getWeaponImage('spark')} className="w-14 h-14 object-contain drop-shadow-lg" alt="Spark" />
                    <div className="absolute -top-1 -right-2 bg-black border border-orange-500 text-white font-black text-[11px] px-1.5 rounded">
                      x{combo.Spark.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="text-[10px] text-orange-200/70 font-bold uppercase tracking-wider mt-1">Spark</div>
                </div>
              )}
            </div>
            
            {/* Cost */}
            <div className="bg-black/50 p-4 rounded-xl border border-medieval-gold/10 flex flex-col items-center justify-center text-center min-h-[100px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-medieval-gold/50 mb-3">Custo Total</p>
              {renderCostCoins(stats.cost)}
            </div>
            
            {/* Time */}
            <div className="bg-black/50 p-4 rounded-xl border border-medieval-gold/10 flex flex-col items-center justify-center text-center min-h-[100px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-medieval-gold/50 mb-3">Tempo p/ Meta</p>
              <p className="text-2xl font-black text-white leading-none">{formatTime(stats.time)}</p>
              {formatDaysTime(stats.time) && (
                <p className="text-[10px] font-bold text-medieval-gold/40 mt-3 uppercase">{formatDaysTime(stats.time)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };`
);

// 6. Fix normal weapon grid layout so the text wraps nicely without breaking the input boxes
code = code.replace(
  /<label className="text-medieval-gold\/60 font-bold uppercase text-\[9px\] tracking-widest">/g,
  '<label className="text-medieval-gold/60 font-bold uppercase text-[9px] tracking-widest leading-tight min-h-[28px] flex items-end">'
);

fs.writeFileSync('src/components/SkillCalculator.tsx', code);
