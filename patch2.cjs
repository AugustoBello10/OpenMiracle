const fs = require('fs');
let code = fs.readFileSync('src/components/MapViewer.tsx', 'utf8');

const searchUI = `
         {/* Search Controls */}
         <div className="bg-black/80 rounded-lg border border-medieval-gold/30 flex flex-col backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] w-48 relative">
           {activeSearchMonster ? (
             <div className="flex flex-col p-2 gap-2">
               <div className="flex items-center justify-between">
                 <span className="text-medieval-gold font-bold text-xs uppercase truncate max-w-[120px]" title={activeSearchMonster}>{activeSearchMonster}</span>
                 <button onClick={() => setActiveSearchMonster(null)} className="text-gray-400 hover:text-red-400"><X className="w-4 h-4" /></button>
               </div>
               
               {searchRegions.length > 0 ? (
                 <div className="flex items-center justify-between bg-black/40 p-1 rounded border border-white/5">
                   <button onClick={handlePrevRegion} className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="w-4 h-4 text-medieval-gold" /></button>
                   <div className="text-xs text-gray-300 font-mono">
                     Região {currentRegionIndex + 1}/{searchRegions.length}
                   </div>
                   <button onClick={handleNextRegion} className="p-1 hover:bg-white/10 rounded"><ChevronRight className="w-4 h-4 text-medieval-gold" /></button>
                 </div>
               ) : (
                 <div className="text-xs text-red-400 text-center py-1">Nenhum encontrado</div>
               )}
             </div>
           ) : (
             <div className="p-2 flex flex-col gap-2">
               <div 
                 className="flex items-center gap-2 cursor-pointer group"
                 onClick={() => setIsSearchOpen(!isSearchOpen)}
               >
                 <Search className="w-4 h-4 text-medieval-gold/70 group-hover:text-medieval-gold transition-colors" />
                 <span className="text-xs text-medieval-gold/70 group-hover:text-medieval-gold transition-colors font-bold uppercase">{language === 'pt' ? 'Buscar' : 'Search'}</span>
               </div>
               
               {isSearchOpen && (
                 <div className="relative border-t border-medieval-gold/20 pt-2">
                   <input
                     type="text"
                     value={searchQuery}
                     onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                     onFocus={() => setShowSuggestions(true)}
                     onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                     placeholder="Monstro..."
                     className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-medieval-gold"
                   />
                   
                   {showSuggestions && searchSuggestions.length > 0 && (
                     <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border border-medieval-gold/30 rounded-lg max-h-40 overflow-y-auto z-[500] shadow-xl">
                       {searchSuggestions.map(name => (
                         <div 
                           key={name} 
                           className="px-2 py-1.5 text-xs text-gray-300 hover:text-medieval-gold hover:bg-white/5 cursor-pointer truncate"
                           onClick={() => {
                             setActiveSearchMonster(name);
                             setSearchQuery('');
                             setIsSearchOpen(false);
                             setShowSuggestions(false);
                           }}
                         >
                           {name}
                         </div>
                       ))}
                     </div>
                   )}
                 </div>
               )}
             </div>
           )}
         </div>

         {/* Filter Controls */}`;

code = code.replace("{/* Filter Controls */}", searchUI);

const flyToCall = `
            {!isModal && <UrlSync floor={floor} />}
            <MapFlyTo center={flyToPos} zoom={hasInitialPos ? initialZoom : 0} />
`;

code = code.replace(
  "{!isModal && <UrlSync floor={floor} />}",
  flyToCall
);

fs.writeFileSync('src/components/MapViewer.tsx', code);
