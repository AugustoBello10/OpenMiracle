import React, { useState, useEffect } from 'react';
import { CRAFT_ITEMS } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Fish, Hammer, FlaskConical, Scissors, Pickaxe, 
  Utensils, Sprout, Axe, Book, ArrowLeft, Image as ImageIcon, ChevronDown, ChevronLeft, ChevronRight, Info, ArrowRight 
} from 'lucide-react';

interface ProfessionsGuideViewProps {
  language: 'pt' | 'en';
  onNavigateToCalculator?: (calc: 'crafting' | 'alchemy' | 'mining' | 'farming') => void;
  selectedProf: string | null;
  onSelectProf: (prof: string | null) => void;
}

type ProfessionId = 'fishing' | 'crafting' | 'alchemy' | 'skinning' | 'mining' | 'cooking' | 'farming' | 'carpentry' | 'woodcutting';

interface ProfessionInfo {
  id: ProfessionId;
  name: { pt: string; en: string };
  icon: React.ReactNode;
  isImplemented: boolean;
  color: string;
}

export function ProfessionsGuideView({ language, onNavigateToCalculator, selectedProf, onSelectProf }: ProfessionsGuideViewProps) {
  const [expandedRecipeCat, setExpandedRecipeCat] = useState<string | null>(null);
  const [cookingRecipeIndex, setCookingRecipeIndex] = useState(0);

  const toggleRecipeCat = (cat: string) => setExpandedRecipeCat(prev => prev === cat ? null : cat);

  const getCatName = (cat: string) => {
    const names = {
      giantGemsRelics: { pt: "Gemas Gigantes (Relíquias)", en: "Giant Gems (Relics)" },
      toolsPicks: { pt: "Ferramentas & Picks", en: "Tools & Picks" },
      rods: { pt: "Rods", en: "Rods" },
      skinningKnives: { pt: "Skinning Knives", en: "Skinning Knives" },
      cuttingAxes: { pt: "Machados de Corte (Cutting Axes)", en: "Cutting Axes" },
      mysticRunes: { pt: "Mystic Runes", en: "Mystic Runes" },
      ammunition: { pt: "Munições", en: "Ammunition" },
      others: { pt: "Outros", en: "Others" }
    };
    return (names as any)[cat] ? (names as any)[cat][language] : cat;
  };


  const professions: ProfessionInfo[] = [
    { id: 'fishing', name: { pt: 'PESCADOR (FISHING)', en: 'FISHERMAN (FISHING)' }, icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/fisherman_outfit.gif" className="w-20 h-20 object-contain scale-[1.3]" alt="Fishing" />, isImplemented: true, color: 'from-blue-900 to-blue-600' },
    { id: 'crafting', name: { pt: 'BLACKSMITH (CRAFTING)', en: 'BLACKSMITH (CRAFTING)' }, icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784733736/blacksmith_outfit.png" className="w-20 h-20 object-contain" alt="Crafting" />, isImplemented: true, color: 'from-orange-900 to-orange-600' },
    { id: 'alchemy', name: { pt: 'ALQUIMISTA (ALCHEMY)', en: 'ALCHEMIST (ALCHEMY)' }, icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784733738/alchemist_outfit.png" className="w-20 h-20 object-contain" alt="Alchemy" />, isImplemented: true, color: 'from-purple-900 to-purple-600' },
    { id: 'skinning', name: { pt: 'ESFOLADOR (SKINNING)', en: 'SKINNER (SKINNING)' }, icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784733738/skinning_outfit.png" className="w-20 h-20 object-contain" alt="Skinning" onError={(e) => { e.currentTarget.style.display = 'none'; }} />, isImplemented: true, color: 'from-amber-900 to-amber-700' },
    { id: 'mining', name: { pt: 'MINERADOR (MINING)', en: 'MINER (MINING)' }, icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/miner_outfit.gif" className="w-20 h-20 object-contain scale-[1.3]" alt="Mining" />, isImplemented: true, color: 'from-stone-700 to-stone-500' },
    { id: 'cooking', name: { pt: 'Culinária (Cooking)', en: 'Cooking' }, icon: <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/chef_outfit.gif" className="w-20 h-20 object-contain scale-[1.3]" alt="Cooking" onError={(e) => { e.currentTarget.style.display = 'none'; }} />, isImplemented: true, color: 'from-red-900 to-red-600' },
    { id: 'farming', name: { pt: 'Fazenda (Farming)', en: 'Farming' }, icon: <Sprout className="w-8 h-8" />, isImplemented: false, color: 'from-emerald-900 to-emerald-600' },
    { id: 'carpentry', name: { pt: 'Carpintaria (Carpentry)', en: 'Carpentry' }, icon: <Hammer className="w-8 h-8" />, isImplemented: true, color: 'from-yellow-900 to-yellow-600' }, // using hammer again or something else
    { id: 'woodcutting', name: { pt: 'Lenhador (Woodcutting)', en: 'Woodcutting' }, icon: <Axe className="w-8 h-8" />, isImplemented: false, color: 'from-green-900 to-green-700' },
  ];

  const t = (pt: string, en: string) => language === 'pt' ? pt : en;

  const renderContent = () => {
    if (!selectedProf) return null;
    
    switch (selectedProf) {
      case 'crafting':
        return (
          <div className="space-y-8 text-left text-stone-300 font-sans text-base leading-relaxed">
            <h3 className="text-2xl font-black text-medieval-gold uppercase mb-4" id="crafting-intro">{t('Mecânicas Principais', 'Core Mechanics')}</h3>
            
            {/* Table of Contents */}
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 mb-8">
              <h4 className="text-medieval-gold font-bold mb-2 uppercase text-sm tracking-wider">{t('Índice', 'Table of Contents')}</h4>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                <li><button onClick={() => document.getElementById('crafting-intro')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">1. {t('Apresentação', 'Introduction')}</button></li>
                <li><button onClick={() => document.getElementById('crafting-acquire')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">2. {t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</button></li>
                <li><button onClick={() => document.getElementById('crafting-tools')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">3. {t('Ferramentas Básicas', 'Basic Tools')}</button></li>
                <li><button onClick={() => document.getElementById('crafting-breaking')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">4. {t('Quebra de Equipamentos', 'Breaking Equipment')}</button></li>
                <li><button onClick={() => document.getElementById('crafting-blacksmith')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">5. {t('Processo de Forja', 'Forging Process')}</button></li>
                <li><button onClick={() => document.getElementById('crafting-recipes')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">6. {t('Receitas e Itens', 'Recipes & Items')}</button></li>
                <li><button onClick={() => document.getElementById('crafting-tips')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">7. {t('Dicas de Evolução', 'Evolution Tips')}</button></li>
              </ul>
            </div>

            <p>
              {t('O sistema de Crafting (Forja) em Miracle 7.4 oferece uma camada de progressão adicional, permitindo que os jogadores criem seus próprios itens e ferramentas para uso ou comércio.', 'The Crafting (Forge) system in Miracle 7.4 offers an additional progression layer, allowing players to create their own items and tools for use or trade.')}
            </p>
            <p>
              {t('Este guia detalha o processo de funcionamento da forja, desde as ferramentas básicas até as mecânicas de quebra e criação.', 'This guide details the functioning of the forge, from basic tools to breaking and crafting mechanics.')}
            </p>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="crafting-acquire">{t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Para se tornar um mestre forjador e adquirir a profissão oficialmente, você precisa atender aos seguintes requisitos:', 'To become a master forger and acquire the profession officially, you must meet the following requirements:')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-300">
                <li><strong className="text-medieval-gold">{t('Nível de Skill:', 'Skill Level:')}</strong> {t('Alcançar o nível 20 de skill (quebrando itens).', 'Reach skill level 20 (by breaking items).')}</li>
                <li><strong className="text-medieval-gold">{t('Taxa de Inscrição:', 'Enrollment Fee:')}</strong> {t('Pagar 20.000 gps ao NPC chefe da profissão, o', 'Pay 20,000 gps to the profession master NPC,')} <a href="https://www.tibiawiki.com.br/wiki/A_Sweaty_Cyclops#32698,31677,2:2" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">A Sweaty Cyclops</a>.</li>
              </ul>
              
              <div className="mt-4 border-t border-medieval-gold/20 pt-4">
                <h5 className="font-bold text-medieval-gold mb-3">{t('Vantagens da Profissão:', 'Advantages of the Profession:')}</h5>
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <ul className="list-disc pl-5 space-y-2 flex-1">
                    <li>{t('Aumento de skill mais rápido.', 'Faster skill increase.')}</li>
                    <li>{t('Possibilidade de craftar (criar) itens. Sem a profissão, você só pode quebrar equipamentos.', 'Ability to craft (create) items. Without the profession, you can only break equipment.')}</li>
                    <li>{t('Acesso a um outfit exclusivo de forjador.', 'Access to an exclusive forger outfit.')}</li>
                  </ul>
                  <div className="flex-shrink-0 text-center">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784733736/blacksmith_outfit.png" alt="Crafting Outfit" className="w-24 h-auto object-contain mx-auto border border-medieval-gold/20 rounded bg-black/50 p-2" />
                    <span className="text-xs text-medieval-gold/60 mt-1 block uppercase tracking-widest">{t('Outfit', 'Outfit')}</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="crafting-tools">{t('O Ponto de Partida: O Martelo e a Bigorna', 'The Starting Point: Hammer and Anvil')}</h4>
            <p>{t('A prática da forja exige ferramentas específicas. Sem o equipamento adequado, o processo de criação não pode ser iniciado:', 'The practice of forging requires specific tools. Without the proper equipment, the creation process cannot be initiated:')}</p>
            <ul className="list-disc pl-5 space-y-3 mt-2">
              <li className="flex items-start gap-3">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784726106/IRON_HAMMER.gif" alt="Iron Hammer" className="w-8 h-8 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]" />
                <div>
                  <strong className="text-medieval-gold">Iron Hammer:</strong> {t('Ferramenta indispensável. Pode ser obtida na', 'Indispensable tool. Can be obtained in the')}{' '}
                  <a href="https://www.tibiawiki.com.br/wiki/Iron_Hammer_Quest" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">
                    {t('quest do Iron Hammer', 'Iron Hammer quest')}
                  </a>{' '}
                  {t('em Minotaur Mountain (Kazordoon).', 'in Minotaur Mountain (Kazordoon).')}
                  <br />
                  <span className="text-red-400/80 text-sm mt-1 block">
                    {t('Atenção: É possível adquirir apenas um por personagem. Em caso de perda, será necessário negociar com outros jogadores ou realizar a quest com um personagem secundário.', 'Attention: Only one can be acquired per character. In case of loss, it will be necessary to trade with other players or complete the quest with a secondary character.')}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784726106/Anvil__Small.gif" alt="Anvil" className="w-8 h-8 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]" />
                <div>
                  <strong className="text-medieval-gold">{t('Bigorna (Anvil):', 'Anvil:')}</strong> {t('O jogador pode utilizar as bigornas públicas distribuídas pelo mapa ou adquirir uma pessoal através do NPC', 'The player can use public anvils distributed across the map or purchase a personal one through the NPC')}{' '}
                  <a href="https://www.tibiawiki.com.br/wiki/A_Sweaty_Cyclops#32698,31677,2:2" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">
                    A Sweaty Cyclops
                  </a>{' '}
                  {t('pelo valor de 5.000 gold, permitindo a instalação em sua própria casa.', 'for the value of 5,000 gold, allowing installation in their own house.')}
                </div>
              </li>
            </ul>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="crafting-breaking">{t('♻️ Quebrando Equipamentos (Breaking)', '♻️ Breaking Equipment')}</h4>
            <p>{t('A matéria-prima essencial para a forja provém do desmonte (salvaging) de equipamentos dropados.', 'The essential raw material for forging comes from dismantling (salvaging) dropped equipment.')}</p>
            <ul className="list-disc pl-5 space-y-4 mt-4">
              <li>
                <div className="flex flex-col gap-2">
                  <div>
                    <strong className="text-medieval-gold">{t('Materiais Resultantes:', 'Resulting Materials:')}</strong> {t('O processo gera Steel, Hell Steel ou Draconian Steel. Itens de menor complexidade rendem steels comuns, enquanto itens mais raros produzem os materiais especiais.', 'The process yields Steel, Hell Steel or Draconian Steel. Items of lower complexity yield common steels, while rarer items produce special materials.')}
                  </div>
                  <div className="flex items-center justify-center gap-4 bg-black/30 p-4 rounded-lg border border-white/5 mx-auto my-2 w-full sm:w-auto">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784726107/Piece_of_Steel.gif" alt="Steel" title="Steel" />
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784726107/Piece_of_Draconian_Steel.gif" alt="Draconian Steel" title="Draconian Steel" />
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784726106/hell_steel.gif" alt="Hell Steel" title="Hell Steel" />
                  </div>
                </div>
              </li>
              <li>
                <div className="flex flex-col gap-4 text-center sm:text-left">
                  <div>
                    <strong className="text-medieval-gold">{t('Procedimento:', 'Procedure:')}</strong> {t('Posicione o item sobre a bigorna e utilize o martelo sobre ele.', 'Place the item on the anvil and use the hammer on it.')}
                  </div>
                  <div className="flex justify-center">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784726914/quebrando_item.gif" alt="Quebrando item" className="rounded-lg border border-medieval-gold/20 max-w-xs mx-auto" />
                  </div>
                </div>
              </li>
              <li>
                <strong className="text-medieval-gold">{t('Restrição de Itens:', 'Item Restriction:')}</strong> {t('Equipamentos comprados de NPCs possuem proteção no código do jogo e não podem ser desmontados. Evite tentativas para economizar tempo.', 'Equipment purchased from NPCs has protection in the game code and cannot be dismantled. Avoid attempts to save time.')}
              </li>
              <li>
                <strong className="text-medieval-gold">{t('Mecânica de Sucesso:', 'Success Mechanics:')}</strong> {t('Sua skill de crafting determina a taxa de êxito. Caso o personagem não possua o nível mínimo exigido para aquele tier de item, a ação resultará apenas em uma faísca.', 'Your crafting skill determines the success rate. If the character does not have the minimum level required for that item tier, the action will only result in a spark.')}
              </li>
            </ul>

            <div className="mt-4 p-4 bg-black/40 border border-medieval-gold/30 rounded-lg">
              <a href="/calculadoras/profissoes/crafting?mode=salvage" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-bold uppercase tracking-wider text-sm">
                
                {t('Acessar Tabela de Itens Quebráveis', 'Access Breakable Items Table')}
              </a>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="crafting-blacksmith">{t('⚒️ Processo de Forja (Blacksmith)', '⚒️ Forging Process (Blacksmith)')}</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-medieval-gold">{t('A Execução:', 'The Execution:')}</strong> {t('Disponha os materiais requeridos na quantidade exata sobre a bigorna e acione o martelo.', 'Arrange the required materials in the exact quantity on the anvil and activate the hammer.')}
              </li>
              <li>
                <strong className="text-medieval-gold">{t('Fórmula de Êxito:', 'Success Formula:')}</strong> {t('A proficiência em Crafting reduz o tempo de criação e escala diretamente as chances de sucesso. A probabilidade base inicia em 10%, progredindo com o avanço da skill conforme a seguinte fórmula:', 'Crafting proficiency reduces creation time and directly scales success chances. The base probability starts at 10%, progressing with skill advancement according to the following formula:')}
              </li>
            </ul>
            <div className="bg-stone-800/60 p-4 border border-medieval-gold/20 rounded-lg mt-3 text-center flex flex-col items-center gap-4">
              <code className="text-medieval-gold font-bold text-sm sm:text-base">10% + ((crafting skill - 10) * item skill multiplier)</code>
              <button 
                onClick={() => onNavigateToCalculator && onNavigateToCalculator('crafting')}
                className="px-4 py-2 bg-gradient-to-r from-medieval-gold to-yellow-600 text-black font-black uppercase tracking-widest text-xs rounded hover:scale-105 transition-transform shadow-[0_0_15px_rgba(197,160,89,0.3)]"
              >
                {t('Acessar Calculadora de Crafting', 'Access Crafting Calculator')}
              </button>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="crafting-recipes">{t('Receitas e Aprimoramentos', 'Recipes and Enhancements')}</h4>
            <div className="space-y-4">
              {CRAFT_ITEMS.map((cat, idx) => (
                <div key={idx} className="bg-black/40 border border-white/5 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => toggleRecipeCat(cat.category)}
                    className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-medieval-gold uppercase tracking-widest">{getCatName(cat.category)}</span>
                    </div>
                    {expandedRecipeCat === cat.category ? <ChevronDown className="w-5 h-5 text-medieval-gold/60" /> : <ChevronRight className="w-5 h-5 text-medieval-gold/60" />}
                  </button>
                  <AnimatePresence>
                    {expandedRecipeCat === cat.category && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cat.items.map((item, iIdx) => (
                            <div key={iIdx} className="bg-black/60 p-3 rounded border border-white/5 flex gap-4">
                              {item.img && (
                                <img src={item.img} alt={item.name} className="w-12 h-12 object-contain rounded drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] border border-medieval-gold/20" />
                              )}
                              <div>
                                <strong className="text-white block mb-1">{item.name} <span className="text-medieval-gold font-normal text-xs">(Mult: {item.multiplier})</span></strong>
                                <span className="text-stone-300 text-sm block">{item.req}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-black/80 to-stone-900/80 border-l-4 border-medieval-gold rounded-r-xl" id="crafting-tips">
              <h4 className="text-xl font-black text-medieval-gold mb-3 flex items-center gap-2">
                <span className="text-2xl">📈</span> {t('Táticas de Evolução', "Evolution Tactics")}
              </h4>
              <p className="text-sm text-stone-300 leading-relaxed">
                {t('Para maximizar o ganho de experiência em Crafting, priorize o desmonte de equipamentos de baixo custo (como Hand Axe, Axe e Hatchet), pois o ganho de skill rate é constante. Otimize a retenção de Steels; as receitas de alto nível exigem reservas massivas deste recurso fundamental.', 'To maximize Crafting experience gain, prioritize dismantling low-cost equipment (like Hand Axe, Axe, and Hatchet), as the skill rate gain is constant. Optimize Steel retention; high-level recipes require massive reserves of this fundamental resource.')}
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <h4 className="text-xl font-bold text-medieval-gold mb-4 text-center">{t('Demonstração', 'Demonstration')}</h4>
              <div className="flex justify-center w-full">
                <iframe
                  width="100%"
                  height="450"
                  src="https://www.youtube.com/embed/keb5CtwOwBI"
                  title="Crafting Guide Demonstration"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg border border-medieval-gold/20 shadow-[0_0_15px_rgba(197,160,89,0.2)] max-w-3xl aspect-video"
                ></iframe>
              </div>
            </div>
            
          </div>
        );
      case 'alchemy':
        return (
          <div className="space-y-8 text-left text-stone-300 font-sans text-base leading-relaxed">
            <h3 className="text-2xl font-black text-medieval-gold uppercase mb-4" id="alchemy-intro">{t('Mecânicas Principais', 'Core Mechanics')}</h3>
            
            {/* Table of Contents */}
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 mb-8">
              <h4 className="text-medieval-gold font-bold mb-2 uppercase text-sm tracking-wider">{t('Índice', 'Table of Contents')}</h4>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                <li><button onClick={() => document.getElementById('alchemy-intro')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">1. {t('Apresentação', 'Introduction')}</button></li>
                <li><button onClick={() => document.getElementById('alchemy-acquire')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">2. {t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</button></li>
                <li><button onClick={() => document.getElementById('alchemy-gold')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">3. {t('Convertendo Gold', 'Converting Gold')}</button></li>
                <li><button onClick={() => document.getElementById('alchemy-crystals')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">4. {t('Encantamentos com Cristais', 'Crystal Enchantments')}</button></li>
                <li><button onClick={() => document.getElementById('alchemy-weapons')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">5. {t('Armas de Treino', 'Training Weapons')}</button></li>
                <li><button onClick={() => document.getElementById('alchemy-overcharge')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">6. {t('Rune Overcharging', 'Rune Overcharging')}</button></li>
                <li><button onClick={() => document.getElementById('alchemy-tips')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">7. {t('Dicas de Evolução', 'Evolution Tips')}</button></li>
              </ul>
            </div>

            <p>
              {t('No Miracle 7.4, ser um Alquimista significa poder criar armas de treino mais rápidas, invocar summons de Elite e duplicar a carga de runas exclusivas.', 'In Miracle 7.4, being an Alchemist means being able to create faster training weapons, summon Elite creatures, and duplicate the charge of exclusive runes.')}
            </p>
            

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="alchemy-acquire">{t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Para se tornar um mestre alquimista e adquirir a profissão oficialmente, você precisa atender aos seguintes requisitos:', 'To become a master alchemist and acquire the profession officially, you must meet the following requirements:')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-stone-300">
                <li><strong className="text-medieval-gold">{t('Nível de Skill:', 'Skill Level:')}</strong> {t('Alcançar o nível 20 de skill (convertendo golds).', 'Reach skill level 20 (by converting golds).')}</li>
                <li><strong className="text-medieval-gold">{t('Taxa de Inscrição:', 'Enrollment Fee:')}</strong> {t('Pagar 20.000 gps ao NPC chefe da profissão, o', 'Pay 20,000 gps to the profession master NPC,')} <a href="https://www.tibiawiki.com.br/wiki/Alexander" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">Alexander</a> {t('em Edron.', 'in Edron.')}</li>
              </ul>
              
              <div className="mt-4 border-t border-medieval-gold/20 pt-4">
                <h5 className="font-bold text-medieval-gold mb-3">{t('Vantagens da Profissão:', 'Advantages of the Profession:')}</h5>
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <ul className="list-disc pl-5 space-y-2 flex-1">
                    <li>{t('Aumento de skill mais rápido.', 'Faster skill increase.')}</li>
                    <li>{t('Possibilidade de criar armas de treino encantadas.', 'Ability to create enchanted training weapons.')}</li>
                    <li>{t('Possibilidade de sobrecarregar (overcharge) runas exclusivas da profissão para dobrar cargas.', 'Ability to overcharge exclusive runes from the profession to double charges.')}</li>
                    <li>{t('Acesso a um outfit exclusivo de alquimista.', 'Access to an exclusive alchemist outfit.')}</li>
                  </ul>
                  <div className="flex-shrink-0 text-center">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784733738/alchemist_outfit.png" alt="Alchemy Outfit" className="w-24 h-auto object-contain mx-auto border border-medieval-gold/20 rounded bg-black/50 p-2" />
                    <span className="text-xs text-medieval-gold/60 mt-1 block uppercase tracking-widest">{t('Outfit', 'Outfit')}</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="alchemy-gold">{t('💰 O Início: Convertendo Gold', '💰 The Beginning: Converting Gold')}</h4>
            <p>{t('A forma mais simples de começar a treinar sua skill é usando o Gold Converter.', 'The simplest way to start training your skill is by using the Gold Converter.')}</p>
            <ul className="list-disc pl-5 space-y-3 mt-2">
              <li>
                <strong className="text-medieval-gold">{t('Como funciona:', 'How it works:')}</strong> {t('Você compra o conversor com o NPC', 'You buy the converter from the NPC')} <a href="https://www.tibiawiki.com.br/wiki/Alexander" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">Alexander</a> {t('em Edron por 500gp (vem com 100 cargas).', 'in Edron for 500gp (comes with 100 charges).')}
              </li>
              <li>
                <strong className="text-medieval-gold">{t('Ação:', 'Action:')}</strong> {t('Ele converte Gold para Platinum ou Platinum para Crystal. Não tem volta!', 'It converts Gold to Platinum or Platinum to Crystal. There is no going back!')}
              </li>
              <li>
                <strong className="text-medieval-gold">{t('Sucesso:', 'Success:')}</strong> {t('Começa em 10% e sobe 0.2% a cada ponto de skill.', 'Starts at 10% and increases 0.2% for each skill point.')}
              </li>
              <li>
                {t('Caçar com alguns desses ainda vai liberando sua cap!', 'Hunting with some of these will also free up your cap!')}
              </li>
            </ul>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="alchemy-crystals">{t('💎 Encantamentos com Cristais', '💎 Crystal Enchantments')}</h4>
            <p>{t('Os cristais são usados para dar bônus às suas armas de treino, que podem ser compradas no NPC', 'Crystals are used to give bonuses to your training weapons, which can be purchased from NPC')} <a href="https://www.tibiawiki.com.br/wiki/Sam#32361,32197,7:2" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">Sam</a> {t('em Thais ou para transformar seus summons em criaturas Elite.', 'in Thais or to transform your summons into Elite creatures.')}</p>
            
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>
                <strong className="text-medieval-gold">{t('Fórmula de Encantamento (Armas de Treino):', 'Enchantment Formula (Training Weapons):')}</strong>
                <div className="bg-stone-800/60 p-4 border border-medieval-gold/20 rounded-lg mt-2 mb-4 text-center">
                  <code className="text-medieval-gold font-bold text-sm sm:text-base">X% base + (0.75% x Skill de Alquimia)</code>
                </div>
              </li>
            </ul>
            
            <p className="mb-4 text-sm text-yellow-500/80 italic">{t('Nota: Cristais não falham ao encantar summons!', 'Note: Crystals do not fail when enchanting summons!')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/spark.gif" alt="Spark Crystal" className="w-10 h-10 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" />
                <h5 className="font-bold text-blue-400 mb-2">Spark Crystal</h5>
                <p className="text-sm">
                  <strong className="text-medieval-gold">20% base</strong> {t('para Encantar armas', 'to Enchant weapons')}<br/><br/>
                  {t('Summons Elite Nível 1 por 75min', 'Elite Summons Level 1 for 75min')}<br/>
                  <span className="text-emerald-400 text-xs">(+10% HP, ATK, DEF, Speed)</span>
                </p>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/lightining.gif" alt="Lightning Crystal" className="w-10 h-10 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" />
                <h5 className="font-bold text-purple-400 mb-2">Lightning Crystal</h5>
                <p className="text-sm">
                  <strong className="text-medieval-gold">15% base</strong> {t('para Encantar armas', 'to Enchant weapons')}<br/><br/>
                  {t('Summons Elite Nível 2 por 60min', 'Elite Summons Level 2 for 60min')}<br/>
                  <span className="text-emerald-400 text-xs">(+20% HP, DEF, 10% ATK, Speed)</span>
                </p>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/inferno.gif" alt="Inferno Crystal" className="w-10 h-10 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" />
                <h5 className="font-bold text-red-500 mb-2">Inferno Crystal</h5>
                <p className="text-sm">
                  <strong className="text-medieval-gold">10% base</strong> {t('para Encantar armas', 'to Enchant weapons')}<br/><br/>
                  {t('Summons Elite Nível 3 por 45min', 'Elite Summons Level 3 for 45min')}<br/>
                  <span className="text-emerald-400 text-xs">(+30% HP, DEF, 15% ATK, Speed)</span>
                </p>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="alchemy-weapons">{t('⚔️ Armas de Treino (Training Weapons)', '⚔️ Training Weapons')}</h4>
            <div className="flex gap-4 justify-center mb-6">
               <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/training_sword.gif" alt="Training Sword" className="w-8 h-8 object-contain" />
               <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/training_spear.gif" alt="Training Spear" className="w-8 h-8 object-contain" />
               <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/training_shield.gif" alt="Training Shield" className="w-8 h-8 object-contain" />
            </div>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong className="text-blue-400">Spark:</strong> {t('Intervalo de ataque -10% | Shielding +10%.', 'Attack interval -10% | Shielding +10%.')}</li>
              <li><strong className="text-purple-400">Lightning:</strong> {t('Intervalo de ataque -15% | Shielding +15%.', 'Attack interval -15% | Shielding +15%.')}</li>
              <li><strong className="text-red-500">Inferno:</strong> {t('Intervalo de ataque -20% | Shielding +20%.', 'Attack interval -20% | Shielding +20%.')}</li>
            </ul>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="alchemy-overcharge">{t('🧙‍♂️ Rune Overcharging (Cargas em Dobro)', '🧙‍♂️ Rune Overcharging (Double Charges)')}</h4>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-1 space-y-4">
                <p>
                  {t('Usando', 'Using')} <strong className="text-purple-400">Pure Energy</strong> {t('(dropa de qualquer monstro elite e tem duração de 5min), você pode tentar dobrar as cargas de uma runa.', '(drops from any elite monster and lasts 5min), you can try to double the charges of a rune.')}
                </p>
                <div className="bg-red-900/20 p-4 border border-red-500/30 rounded-lg text-sm">
                  <strong className="text-red-400 block mb-1">{t('Atenção:', 'Attention:')}</strong> 
                  {t('A Pure Energy perde 20% de força a cada minuto. Tem que ser rápido!', 'Pure Energy loses 20% of its strength every minute. You have to be fast!')}
                </div>
                <ul className="list-disc pl-5 space-y-2 mt-2 text-sm">
                  <li><strong className="text-medieval-gold">{t('Regra:', 'Rule:')}</strong> {t('Uma runa só pode ser "overcharged" uma vez. Nada de fazer pilhas infinitas.', 'A rune can only be "overcharged" once. No infinite stacking.')}</li>
                  <li><strong className="text-medieval-gold">{t('Especialização:', 'Specialization:')}</strong> {t('Runas como Sudden Death, Ultimate Healing e Paralyze exigem a profissão de Alquimista.', 'Runes like Sudden Death, Ultimate Healing, and Paralyze require the Alchemist profession.')}</li>
                </ul>
              </div>
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/pure_energy.gif" alt="Pure Energy" className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              </div>
            </div>

            <div className="bg-purple-900/20 p-4 border border-purple-500/30 rounded-lg mt-6 text-center flex flex-col items-center gap-4">
              <span className="block text-medieval-gold text-sm uppercase tracking-widest">{t('Critério de duplicação com Pure Energy:', 'Duplication criteria with Pure Energy:')}</span>
              <code className="text-white font-bold text-sm sm:text-base">{t('Skill Necessária = (Magic Level da runa × 2) + 10', 'Required Skill = (Rune Magic Level × 2) + 10')}</code>
              
              <button 
                onClick={() => onNavigateToCalculator && onNavigateToCalculator('alchemy')}
                className="px-4 py-2 bg-gradient-to-r from-medieval-gold to-yellow-600 text-black font-black uppercase tracking-widest text-xs rounded hover:scale-105 transition-transform shadow-[0_0_15px_rgba(197,160,89,0.3)] mt-2"
              >
                {t('Acessar Calculadora de Alchemy', 'Access Alchemy Calculator')}
              </button>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="alchemy-tips">{t('📈 Dica para Evoluir', '📈 Evolution Tip')}</h4>
            <div className="bg-black/30 p-5 rounded-lg border border-medieval-gold/20 space-y-4 text-sm leading-relaxed">
              <p>
                {t('Para começar, deve-se usar o Gold Converter, pois é a forma mais simples e barata de upar os primeiros níveis de skill.', 'To begin, one should use the Gold Converter, as it is the simplest and cheapest way to level up the first skill levels.')}
              </p>
              <p className="text-medieval-gold font-bold">
                {t('Lembre-se também que tudo o que você faz relacionado à alquimia aumenta sua skill: converter gold, duplicar runas com Pure Energy e encantar armas de treino!', 'Also remember that everything you do related to alchemy increases your skill: converting gold, duplicating runes with Pure Energy, and enchanting training weapons!')}
              </p>
            </div>
          </div>
        );
      case 'mining':
        return (
          <div className="space-y-8 text-left text-stone-300 font-sans text-base leading-relaxed">
            <h3 className="text-2xl font-black text-medieval-gold uppercase mb-4" id="mining-intro">{t('Mecânicas Principais', 'Core Mechanics')}</h3>
            
            {/* Table of Contents */}
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="text-medieval-gold font-bold mb-2 uppercase text-sm tracking-wider">{t('Índice', 'Table of Contents')}</h4>
                <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                  <li><button onClick={() => document.getElementById('mining-intro')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">1. {t('Apresentação', 'Introduction')}</button></li>
                  <li><button onClick={() => document.getElementById('mining-acquire')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">2. {t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</button></li>
                  <li><button onClick={() => document.getElementById('mining-mechanics')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">3. {t('Mecânicas de Mineração', 'Mining Mechanics')}</button></li>
                  <li><button onClick={() => document.getElementById('mining-tools')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">4. {t('Ferramentas (Pickaxes)', 'Tools (Pickaxes)')}</button></li>
                  <li><button onClick={() => document.getElementById('mining-locations')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">5. {t('Tipos de Minas', 'Types of Mines')}</button></li>
                </ul>
              </div>
              <button 
                onClick={() => onNavigateToCalculator && onNavigateToCalculator('mining')}
                className="px-4 py-2 bg-gradient-to-r from-medieval-gold to-yellow-600 text-black font-black uppercase tracking-widest text-xs rounded hover:scale-105 transition-transform shadow-[0_0_15px_rgba(197,160,89,0.3)] whitespace-nowrap"
              >
                {t('Calculadora de Mineração', 'Mining Calculator')}
              </button>
            </div>

            <p>
              {t('A Mineração (Mining) desempenha um papel crucial na cadeia de produção. Aventureiros podem explorar áreas abertas, cavernas e montanhas para extrair minérios valiosos e minerais raros. Estes recursos servem como base para a forja (crafting), permitindo que os jogadores criem equipamentos melhores.', 'Mining plays a crucial role in the production chain. Adventurers can explore open areas, caves and mountains to extract valuable ores and rare minerals. These resources serve as the foundation for crafting, allowing players to forge better equipments.')}
            </p>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="mining-acquire">{t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Para usar todas as picaretas e avançar a habilidade mais rápido, você precisa adquirir a profissão de minerador. Visite o NPC:', 'To be able to use all the picks and advance the skill faster, you also need to acquire the miner profession. Visit the NPC:')}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                   <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/budrik.gif" alt="NPC Budrik" className="w-16 h-16 object-contain rounded border border-medieval-gold/20 bg-black/50 p-1" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <ul className="list-disc pl-5 space-y-2 text-stone-300">
                  <li><strong className="text-medieval-gold">{t('NPC:', 'NPC:')}</strong> <a href="https://www.tibiawiki.com.br/wiki/Budrik" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline hover:text-blue-300">Budrik</a></li>
                  <li><strong className="text-medieval-gold">{t('Localização:', 'Location:')}</strong> {t('Dwarf Mines - perto de Kazordoon.', 'Dwarf Mines - near Kazordoon.')}</li>
                </ul>
              </div>

              <div className="mt-4 border-t border-medieval-gold/20 pt-4">
                <h5 className="font-bold text-medieval-gold mb-3">{t('Vantagens da Profissão:', 'Advantages of the Profession:')}</h5>
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <ul className="list-disc pl-5 space-y-2 flex-1">
                    <li>{t('Aumento de skill mais rápido.', 'Faster skill increase.')}</li>
                    <li>{t('Permite utilizar picaretas avançadas e forjadas.', 'Allows using advanced and forged pickaxes.')}</li>
                    <li>{t('Acesso a um outfit exclusivo de minerador.', 'Access to an exclusive miner outfit.')}</li>
                  </ul>
                  <div className="flex-shrink-0 text-center">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/miner_outfit.gif" alt="Miner Outfit" className="w-24 h-auto object-contain mx-auto border border-medieval-gold/20 rounded bg-black/50 p-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <span className="text-xs text-medieval-gold/60 mt-1 block uppercase tracking-widest">{t('Outfit', 'Outfit')}</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="mining-mechanics">{t('⛏️ Mecânicas de Mineração', '⛏️ Mining Mechanics')}</h4>
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg mb-4 mt-2">
              <p className="text-sm text-red-200">
                <strong>{t('Atenção - Exhaust ao Logar:', 'Attention - Login Exhaust:')}</strong> {t('Ao entrar no jogo (logar), o seu personagem sofrerá um "exhaust" de 15 minutos para mineração. Durante esse período, não será possível extrair minérios. Essa medida serve para evitar abusos.', 'Upon entering the game (logging in), your character will suffer a 15-minute mining "exhaust". During this period, it will not be possible to extract ores. This measure serves to prevent abuse.')}
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-3 mt-2">
              <li>
                <strong className="text-medieval-gold">{t('Iniciando:', 'Getting Started:')}</strong> {t('Para começar, você precisa de uma picareta (pickaxe). Com a picareta regular (Pick), você já poderá minerar lava holes, ice lava holes e mossy stones.', 'To start with mining, first you need a pickaxe. With a regular pick, you\'ll already be able to mine lava holes, ice lava holes, and mossy stones.')}
              </li>
              <li>
                <strong className="text-medieval-gold">{t('Experiência (Skill Tries):', 'Experience (Skill Tries):')}</strong> {t('Como em qualquer outra habilidade, você recebe experiência de mineração para cada tentativa. Com habilidades mais avançadas, você poderá usar picaretas melhores e minerar outros tipos de pedras.', 'As with any other skill, you may receive mining experience for each attempt to advance in mining. With more advanced skills, you will be able to use more advanced picks and mine other types of stones.')}
              </li>
              <li>
                <strong className="text-medieval-gold">{t('Quebra da Picareta:', 'Pickaxe Breakage:')}</strong> {t('Picaretas modificadas, avançadas e aprimoradas aumentam muito as chances de mineração, mas também podem quebrar. A chance de quebra varia dependendo da velocidade em que a mina é quebrada. Com uma skill baixa, a picareta terá uma chance muito menor de quebrar.', 'Modified, advanced and enhanced picks greatly improve the chances of mining, but they also could break. Note, however, that the chance to break the pick varies depending on the speed at which the mine is broken. With a low mining skill the pickaxe will have a much lower chance of being broken.')}
              </li>
              <li>
                <strong className="text-blue-400">{t('Respawn de Minas:', 'Mines Respawn:')}</strong> {t('Todas as minas têm um tempo de respawn aleatório que varia de 30m a 2h. Semelhante ao respawn de criaturas, as minas só dão respawn se não houver jogadores na tela.', 'All mines has a random respawn time and could vary from 30m to 2h. Similar to creature\'s spawns, mines only spawns if there are no players on screen.')}
              </li>
            </ul>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="mining-tools">{t('🛠️ Ferramentas de Mineração (Pickaxes)', '🛠️ Mining Tools (Pickaxes)')}</h4>
            <p className="mb-4 text-sm">{t('Diferentes picaretas oferecem bônus na extração, dependendo da sua skill de Mining.', 'Different pickaxes offer extraction bonuses, depending on your Mining skill.')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/pick.gif" alt="Pick" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <h5 className="font-bold text-gray-300 mb-2">Pick</h5>
                <ul className="text-sm space-y-1 text-left inline-block w-full">
                  <li><strong className="text-medieval-gold">{t('Mining Skill:', 'Mining Skill:')}</strong> 10</li>
                  <li><strong className="text-red-400">{t('Break Rate:', 'Break Rate:')}</strong> 0</li>
                  <li><strong className="text-blue-300">{t('Properties:', 'Properties:')}</strong> -</li>
                </ul>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/modified_pick.gif" alt="Modified Pick" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <h5 className="font-bold text-green-300 mb-2">Modified Pick</h5>
                <ul className="text-sm space-y-1 text-left inline-block w-full">
                  <li><strong className="text-medieval-gold">{t('Mining Skill:', 'Mining Skill:')}</strong> 20</li>
                  <li><strong className="text-red-400">{t('Break Rate:', 'Break Rate:')}</strong> 0</li>
                  <li><strong className="text-blue-300">{t('Properties:', 'Properties:')}</strong> <br/>- mine drop multiplier: 1.5 <br/>- mine break bonus: +2.5%</li>
                </ul>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/advanced_pick.gif" alt="Advanced Pick" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <h5 className="font-bold text-purple-300 mb-2">Advanced Pick</h5>
                <ul className="text-sm space-y-1 text-left inline-block w-full">
                  <li><strong className="text-medieval-gold">{t('Mining Skill:', 'Mining Skill:')}</strong> 30</li>
                  <li><strong className="text-red-400">{t('Break Rate:', 'Break Rate:')}</strong> 0</li>
                  <li><strong className="text-blue-300">{t('Properties:', 'Properties:')}</strong> <br/>- mine drop multiplier: 2 <br/>- mine break bonus: +5%</li>
                </ul>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Enchanted_Pick.gif" alt="Enhanced Pick" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <h5 className="font-bold text-yellow-300 mb-2">Enhanced Pick</h5>
                <ul className="text-sm space-y-1 text-left inline-block w-full">
                  <li><strong className="text-medieval-gold">{t('Mining Skill:', 'Mining Skill:')}</strong> 40</li>
                  <li><strong className="text-red-400">{t('Break Rate:', 'Break Rate:')}</strong> 0</li>
                  <li><strong className="text-blue-300">{t('Properties:', 'Properties:')}</strong> <br/>- mine drop multiplier: 2.5 <br/>- mine break bonus: +7.5%</li>
                </ul>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="mining-locations">{t('💎 Tipos de Minas e Recursos', '💎 Types of Mines and Resources')}</h4>
            <div className="bg-black/40 border border-white/5 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-medieval-gold uppercase bg-black/60 border-b border-medieval-gold/20">
                    <tr>
                      <th scope="col" className="px-4 py-3">{t('Mina (Mine)', 'Mine')}</th>
                      <th scope="col" className="px-4 py-3">{t('Recursos Extraídos', 'Extracted Resources')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-bold text-red-400 flex items-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/lava_hole.gif" alt="Lava Hole" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        Lava Hole
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2 text-stone-400 items-center">
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/glmeringsoil.gif" className="w-4 h-4 object-contain" /> glimmering soil</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/emberfrag.gif" className="w-4 h-4 object-contain" /> ember fragment</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/moltenfrag.gif" className="w-4 h-4 object-contain" /> molten fragment</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/obsidianfrag.gif" className="w-4 h-4 object-contain" /> obsidian fragment</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors bg-black/20">
                      <td className="px-4 py-3 font-bold text-cyan-400 flex items-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/ice_lava_hole.gif" alt="Ice Lava Hole" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        Ice Lava Hole
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2 text-stone-400 items-center">
                          <span className="flex items-center gap-1">frozen ore</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/astralfrag.gif" className="w-4 h-4 object-contain" /> astral fragment</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/protectorfrag.gif" className="w-4 h-4 object-contain" /> protector fragment</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/obsidianfrag.gif" className="w-4 h-4 object-contain" /> obsidian fragment</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-bold text-green-500 flex items-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/mossy_stone.gif" alt="Mossy Stone" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        Mossy Stone
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2 text-stone-400 items-center">
                          <span className="flex items-center gap-1">natural soil</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/aegisfrag.gif" className="w-4 h-4 object-contain" /> aegis fragment</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/protectorfrag.gif" className="w-4 h-4 object-contain" /> protector fragment</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors bg-black/20">
                      <td className="px-4 py-3 font-bold text-blue-500 flex items-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/blue_shrine_stone.gif" alt="Blue Shrine Stone" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        Blue Shrine Stone
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2 text-stone-400 items-center">
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/smallsaphire.gif" className="w-4 h-4 object-contain" /> small sapphire</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/smalldiamond.gif" className="w-4 h-4 object-contain" /> small diamond</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/guardianfrag.gif" className="w-4 h-4 object-contain" /> guardian fragment</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-bold text-red-500 flex items-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/red_shrine_stone.gif" alt="Red Shrine Stone" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        Red Shrine Stone
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2 text-stone-400 items-center">
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/smallruby.gif" className="w-4 h-4 object-contain" /> small ruby</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/sagefrag.gif" className="w-4 h-4 object-contain" /> sage fragment</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors bg-black/20">
                      <td className="px-4 py-3 font-bold text-purple-400 flex items-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/violet_shrine_stone.gif" alt="Violet Shrine Stone" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        Violet Shrine Stone
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2 text-stone-400 items-center">
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/smallamethyst.gif" className="w-4 h-4 object-contain" /> small amethyst</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/guardianfrag.gif" className="w-4 h-4 object-contain" /> guardian fragment</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-bold text-emerald-400 flex items-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Green_Shrine_stone.gif" alt="Green Shrine Stone" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        Green Shrine Stone
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2 text-stone-400 items-center">
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/smallemerald.gif" className="w-4 h-4 object-contain" /> small emerald</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/spiritualistfrag.gif" className="w-4 h-4 object-contain" /> spiritualist fragment</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors bg-black/20">
                      <td className="px-4 py-3 font-bold text-yellow-400 flex items-center gap-3">
                        <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Yellow_shrine_stone.gif" alt="Yellow Shrine Stone" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        Yellow Shrine Stone
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2 text-stone-400 items-center">
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/smalltopaz.gif" className="w-4 h-4 object-contain" /> small topaz</span>, 
                          <span className="flex items-center gap-1"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/marksmanfrag.gif" className="w-4 h-4 object-contain" /> marksman fragment</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        );
            case 'carpentry':
        return (
          <div className="space-y-8 text-left text-stone-300 font-sans text-base leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-black text-medieval-gold uppercase mb-4" id="carpentry-intro">{t('Mecânicas Principais', 'Core Mechanics')}</h3>
            
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 mb-8">
              <h4 className="text-medieval-gold font-bold mb-2 uppercase text-sm tracking-wider">{t('Índice', 'Table of Contents')}</h4>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                <li><button onClick={() => document.getElementById('carpentry-intro')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">1. {t('Apresentação', 'Introduction')}</button></li>
                <li><button onClick={() => document.getElementById('carpentry-acquire')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">2. {t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</button></li>
                <li><button onClick={() => document.getElementById('carpentry-tools')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">3. {t('Ferramentas Necessárias', 'Necessary Tools')}</button></li>
                <li><button onClick={() => document.getElementById('carpentry-beds')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">4. {t('Camas e Upgrades', 'Beds and Upgrades')}</button></li>
                <li><button onClick={() => document.getElementById('carpentry-recipes')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">5. {t('Receitas (Construções)', 'Recipes (Constructions)')}</button></li>
              </ul>
            </div>

            <p>
              {t('A carpintaria é a arte de moldar a madeira para criar estruturas, decorações e aprimorar o conforto do seu personagem. Com esta profissão, você poderá construir vários tipos de estruturas para suas terras, além de fabricar camas móveis e kits de melhoria de camas tanto para casas quanto para terrenos.', 'Carpentry is the art of shaping wood to create structures, decorations, and improve your character\'s comfort. With this profession, you can build various types of structures for your lands, as well as craft movable beds and bed upgrade kits for both houses and terrains.')}
            </p>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="carpentry-acquire">{t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Para se tornar um carpinteiro, converse com o NPC Aldren:', 'To become a carpenter, talk to the NPC Aldren:')}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                   <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/aldren.gif" alt="NPC Aldren" className="w-16 h-16 object-contain rounded border border-medieval-gold/20 bg-black/50 p-1" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <ul className="list-disc pl-5 space-y-2 text-stone-300">
                  <li><strong className="text-medieval-gold">{t('NPC:', 'NPC:')}</strong> <a href="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784741330/localizacaoNPCcarpintaria.png" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline hover:text-blue-300">Aldren</a></li>
                  <li><strong className="text-medieval-gold">{t('Localização:', 'Location:')}</strong> {t('Nivandria Lands.', 'Nivandria Lands.')}</li>
                  <li><strong className="text-medieval-gold">{t('Preço:', 'Price:')}</strong> {t('20.000 moedas de ouro', '20,000 gold coins')}</li>
                </ul>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="carpentry-tools">{t('Ferramentas Necessárias', 'Necessary Tools')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Para exercer a carpintaria e evoluir suas habilidades, você precisará das seguintes ferramentas:', 'To practice carpentry and evolve your skills, you will need the following tools:')}
              </p>
              <ul className="list-disc pl-5 space-y-6 text-stone-300">
                <li className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784741464/Hammer.gif" alt="Hammer" className="w-12 h-12 object-contain bg-black/40 border border-white/10 rounded p-1" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div>
                    <strong className="text-medieval-gold block mb-1">{t('Hammer (Martelo):', 'Hammer:')}</strong> 
                    <p className="mb-2">{t('Ferramenta básica para construir e também destruir. O martelo é usado para quebrar paredes, chãos e qualquer tipo de construção caso você precise limpar seu terreno.', 'Basic tool for building and destroying. The hammer is used to break walls, floors, and any kind of construction in case you need to clean your land.')}</p>
                    <p className="text-emerald-400/90 text-sm italic">{t('Dica: Ao quebrar as cercas (fences) das suas lands utilizando o martelo, o seu skill de carpintaria também sobe, baseado no seu nível de habilidade!', 'Tip: When breaking fences on your lands using the hammer, your carpentry skill also increases, based on your skill level!')}</p>
                  </div>
                </li>
                <li className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784741479/square.gif" alt="Square" className="w-12 h-12 object-contain bg-black/40 border border-white/10 rounded p-1" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div>
                    <strong className="text-medieval-gold block mb-1">{t('Square (Esquadro):', 'Square:')}</strong> 
                    <p>{t('Fundamental para alinhar suas construções. Use o esquadro para construir paredes, portas e bordas em vários ângulos (horizontal, vertical...) girando o ângulo da própria ferramenta.', 'Fundamental to align your constructions. Use the square to build walls, doors, and borders at various angles (horizontal, vertical...) by rotating the tool\'s angle.')}</p>
                  </div>
                </li>
                <li className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1785081340/Counter.gif" alt="Counter" className="w-12 h-12 object-contain bg-black/40 border border-white/10 rounded p-1" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <div>
                    <strong className="text-medieval-gold block mb-1">{t('Counter (Bancada):', 'Counter:')}</strong> 
                    <p className="mb-2">{t('A bancada de trabalho é onde a mágica acontece. É nela que você irá fabricar a maioria dos itens de carpintaria.', 'The workbench is where the magic happens. It is where you will craft most carpentry items.')}</p>
                    <div className="bg-black/50 p-3 rounded border border-medieval-gold/10 text-sm space-y-1">
                      <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-medieval-gold inline-block"></span>{t('Você pode utilizar as bancadas disponíveis gratuitamente na loja do NPC Aldren.', 'You can use the workbenches available for free at NPC Aldren\'s shop.')}</p>
                      <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-medieval-gold inline-block"></span>{t('Também é possível adquirir a sua própria bancada na Store do jogo por 25 Miracle Points.', 'It is also possible to purchase your own workbench in the game Store for 25 Miracle Points.')}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="carpentry-beds">{t('Camas e Upgrades', 'Beds and Upgrades')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Novos kits de melhoria de cama (Bed Modification) foram introduzidos, permitindo que você aprimore o descanso do seu personagem e regenere atributos mais rapidamente:', 'New bed upgrade kits (Bed Modification) have been introduced, allowing you to improve your character\'s rest and regenerate stats faster:')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-black/40 border border-purple-500/30 rounded-lg p-4">
                  <h5 className="font-bold text-purple-400 mb-2">Bed Modification (Purple)</h5>
                  <p className="text-sm text-stone-400 mb-2">{t('Melhora camas normais para cama roxa.', 'Upgrade normal beds to purple bed.')}</p>
                  <ul className="text-sm space-y-1">
                    <li><strong className="text-medieval-gold">Max Regen Time:</strong> 210</li>
                    <li><strong className="text-medieval-gold">Skill Multiplier:</strong> 0.1</li>
                    <li><strong className="text-medieval-gold">Materials:</strong> 1x purple blanket, 4x wooden planks, 6x dark wooden planks, 4x wooden beams, 6x dark wooden beams, 6x metal sheets, 12x nails.</li>
                  </ul>
                </div>
                
                <div className="bg-black/40 border border-red-500/30 rounded-lg p-4">
                  <h5 className="font-bold text-red-400 mb-2">Bed Modification (Red)</h5>
                  <p className="text-sm text-stone-400 mb-2">{t('Melhora camas roxas para cama vermelha.', 'Upgrade purple beds to red bed.')}</p>
                  <ul className="text-sm space-y-1">
                    <li><strong className="text-medieval-gold">Max Regen Time:</strong> 240</li>
                    <li><strong className="text-medieval-gold">Skill Multiplier:</strong> 0.05</li>
                    <li><strong className="text-medieval-gold">Materials:</strong> 1x red blanket, 4x wooden planks, 8x dark wooden planks, 6x death wooden planks, 4x wooden beams, 8x dark wooden beams, 6x death wooden beams, 7x metal sheets, 14x nails.</li>
                  </ul>
                </div>
                <div className="bg-black/40 border border-stone-400/30 rounded-lg p-4">
                  <h5 className="font-bold text-stone-300 mb-2">Bed Modification (Gray)</h5>
                  <p className="text-sm text-stone-400 mb-2">{t('Melhora camas vermelhas para cama cinza.', 'Upgrade red bed to gray bed.')}</p>
                  <ul className="text-sm space-y-1">
                    <li><strong className="text-medieval-gold">Max Regen Time:</strong> 290</li>
                    <li><strong className="text-medieval-gold">Skill Multiplier:</strong> 0.025</li>
                    <li><strong className="text-medieval-gold">Materials:</strong> 1x gray blanket, 10x dark wooden planks, 10x death wooden planks, 10x dark wooden beams, 10x death wooden beams, 8x metal sheets, 16x nails.</li>
                  </ul>
                </div>
                <div className="bg-black/40 border border-stone-600/50 rounded-lg p-4">
                  <h5 className="font-bold text-stone-500 mb-2">Bed Modification (Black)</h5>
                  <p className="text-sm text-stone-400 mb-2">{t('Melhora camas cinzas para cama preta.', 'Upgrade gray beds to black beds.')}</p>
                  <ul className="text-sm space-y-1">
                    <li><strong className="text-medieval-gold">Max Regen Time:</strong> 360</li>
                    <li><strong className="text-medieval-gold">Skill Multiplier:</strong> 0.0125</li>
                    <li><strong className="text-medieval-gold">Materials:</strong> 1x black blanket, 15x death wooden planks, 5x elder wooden planks, 15x death wooden beams, 5x elder wooden beams, 9x metal sheets, 18x nails.</li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="carpentry-recipes">{t('Receitas (Construções)', 'Recipes (Constructions)')}</h4>
            <div className="space-y-6">
              {/* Grounds */}
              <div className="bg-black/40 border border-white/5 rounded-lg overflow-hidden">
                <div className="bg-black/60 px-4 py-2 border-b border-white/5">
                  <h5 className="font-bold text-medieval-gold">Grounds</h5>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-medieval-gold uppercase bg-black/60 border-b border-medieval-gold/20">
                      <tr>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Materials</th>
                        <th scope="col" className="px-4 py-3">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Wooden Floor</td>
                        <td className="px-4 py-3 text-stone-400">4x wooden planks, 4x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5 bg-black/20">
                        <td className="px-4 py-3 font-bold text-stone-300">Wooden Floor</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 1x wooden planks, 2x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Wooden Floor</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 2x wooden planks, 3x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5 bg-black/20">
                        <td className="px-4 py-3 font-bold text-stone-300">Wooden Floor</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 1x wooden planks, 1x nail</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Walls */}
              <div className="bg-black/40 border border-white/5 rounded-lg overflow-hidden">
                <div className="bg-black/60 px-4 py-2 border-b border-white/5">
                  <h5 className="font-bold text-medieval-gold">Walls</h5>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-medieval-gold uppercase bg-black/60 border-b border-medieval-gold/20">
                      <tr>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Materials</th>
                        <th scope="col" className="px-4 py-3">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Brick Wall</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 16x bricks, 8x metal sheets, 16x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5 bg-black/20">
                        <td className="px-4 py-3 font-bold text-stone-300">Brick Wall</td>
                        <td className="px-4 py-3 text-stone-400">8x bricks, 2x metal sheets, 4x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Brick Wall</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 32x bricks, 16x metal sheets, 32x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5 bg-black/20">
                        <td className="px-4 py-3 font-bold text-stone-300">Framework Wall</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 8x wooden boards, 8x metal sheets, 4x wooden planks, 16x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Framework Wall</td>
                        <td className="px-4 py-3 text-stone-400">2x metal sheets, 4x wooden planks, 4x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5 bg-black/20">
                        <td className="px-4 py-3 font-bold text-stone-300">Framework Wall</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 16x wooden boards, 16x metal sheets, 8x wooden planks, 32x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Doors */}
              <div className="bg-black/40 border border-white/5 rounded-lg overflow-hidden">
                <div className="bg-black/60 px-4 py-2 border-b border-white/5">
                  <h5 className="font-bold text-medieval-gold">Doors</h5>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-medieval-gold uppercase bg-black/60 border-b border-medieval-gold/20">
                      <tr>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Materials</th>
                        <th scope="col" className="px-4 py-3">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Closed Door</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 1x lock, 8x wooden boards, 8x metal sheets, 4x wooden planks, 16x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stairs */}
              <div className="bg-black/40 border border-white/5 rounded-lg overflow-hidden">
                <div className="bg-black/60 px-4 py-2 border-b border-white/5">
                  <h5 className="font-bold text-medieval-gold">Stairs</h5>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-medieval-gold uppercase bg-black/60 border-b border-medieval-gold/20">
                      <tr>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Materials</th>
                        <th scope="col" className="px-4 py-3">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Stairs</td>
                        <td className="px-4 py-3 text-stone-400">6x wooden boards, 6x metal sheets, 16x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ladders */}
              <div className="bg-black/40 border border-white/5 rounded-lg overflow-hidden">
                <div className="bg-black/60 px-4 py-2 border-b border-white/5">
                  <h5 className="font-bold text-medieval-gold">Ladders</h5>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-medieval-gold uppercase bg-black/60 border-b border-medieval-gold/20">
                      <tr>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Materials</th>
                        <th scope="col" className="px-4 py-3">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Ladder</td>
                        <td className="px-4 py-3 text-stone-400">3x wooden planks, 3x wooden beams, 16x nails</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Roofs */}
              <div className="bg-black/40 border border-white/5 rounded-lg overflow-hidden">
                <div className="bg-black/60 px-4 py-2 border-b border-white/5">
                  <h5 className="font-bold text-medieval-gold">Roofs</h5>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-medieval-gold uppercase bg-black/60 border-b border-medieval-gold/20">
                      <tr>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Materials</th>
                        <th scope="col" className="px-4 py-3">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Flat Roof</td>
                        <td className="px-4 py-3 text-stone-400">6x roof tiles, 4x nails, 2x wooden beams, 2x metal sheets</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5 bg-black/20">
                        <td className="px-4 py-3 font-bold text-stone-300">Flat Roof</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 2x roof tiles, 1x wooden beams, 1x metal sheets</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">Flat Roof</td>
                        <td className="px-4 py-3 text-stone-400">1x square, 1x roof tiles, 1x wooden beams, 1x metal sheets</td>
                        <td className="px-4 py-3 text-stone-400">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Beds */}
              <div className="bg-black/40 border border-white/5 rounded-lg overflow-hidden">
                <div className="bg-black/60 px-4 py-2 border-b border-white/5">
                  <h5 className="font-bold text-medieval-gold">Beds</h5>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-medieval-gold uppercase bg-black/60 border-b border-medieval-gold/20">
                      <tr>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Materials</th>
                        <th scope="col" className="px-4 py-3">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-stone-300">2x Beds</td>
                        <td className="px-4 py-3 text-stone-400">1x blue blanket, 10x wooden planks, 10x wooden beams, 5x metal sheets, 10x nails</td>
                        <td className="px-4 py-3 text-stone-400">0.2</td>
                      </tr>
                      <tr className="hover:bg-white/5 bg-black/20">
                        <td className="px-4 py-3 font-bold text-stone-300">2x Cots</td>
                        <td className="px-4 py-3 text-stone-400">1x yellow blanket, 10x wooden planks, 10x wooden beams, 5x metal sheets, 10x nails</td>
                        <td className="px-4 py-3 text-stone-400">0.2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        );

                  case 'cooking':
        const cookingRecipesList = [
          {
            name: "Fishburger",
            effect: "Health Regen +1/6 seconds",
            duration: "20 minutes",
            ingredients: [
              { name: "1x Fish", desc: "(Fishing)" },
              { name: "3x Shrimp", desc: "(Loot/Buying)" },
              { name: "2x Rolls", desc: "(Baking/Buying)" },
              { name: "1x Fern", desc: "(Foraging)" },
              { name: "Salt, Pepper, Lemon", desc: "(Seasoning)" },
              { name: "1x Pan", desc: "(Consumível / Consumed!)", isRed: true },
              { name: "1x Wooden Spoon", desc: "(Tool)" }
            ]
          },
          {
            name: "White Fishburger",
            effect: "Sword, Axe and Club +1",
            duration: "20 minutes",
            ingredients: [
              { name: "1x White Fish", desc: "(Fishing - Icy Islands)" },
              { name: "3x Shrimp", desc: "(Loot/Buying)" },
              { name: "2x Rolls", desc: "(Baking/Buying)" },
              { name: "1x Fern", desc: "(Foraging)" },
              { name: "Salt, Pepper, Lemon", desc: "(Seasoning)" },
              { name: "1x Pan", desc: "(Consumível / Consumed!)", isRed: true },
              { name: "1x Wooden Spoon", desc: "(Tool)" }
            ]
          },
          {
            name: "Swamp Fishburger",
            effect: "Distance +1",
            duration: "20 minutes",
            ingredients: [
              { name: "1x Swamp Fish", desc: "(Fishing - Venore)" },
              { name: "3x Shrimp", desc: "(Loot/Buying)" },
              { name: "2x Rolls", desc: "(Baking/Buying)" },
              { name: "1x Fern", desc: "(Foraging)" },
              { name: "Salt, Pepper, Lemon", desc: "(Seasoning)" },
              { name: "1x Pan", desc: "(Consumível / Consumed!)", isRed: true },
              { name: "1x Wooden Spoon", desc: "(Tool)" }
            ]
          },
          {
            name: "Sand Fishburger",
            effect: "Shielding +1",
            duration: "20 minutes",
            ingredients: [
              { name: "1x Sand Fish", desc: "(Fishing)" },
              { name: "3x Shrimp", desc: "(Loot/Buying)" },
              { name: "2x Rolls", desc: "(Baking/Buying)" },
              { name: "1x Fern", desc: "(Foraging)" },
              { name: "Salt, Pepper, Lemon", desc: "(Seasoning)" },
              { name: "1x Pan", desc: "(Consumível / Consumed!)", isRed: true },
              { name: "1x Wooden Spoon", desc: "(Tool)" }
            ]
          }
        ];

        const prevRecipe = () => {
          setCookingRecipeIndex((prev) => (prev > 0 ? prev - 1 : cookingRecipesList.length - 1));
        };
        const nextRecipe = () => {
          setCookingRecipeIndex((prev) => (prev < cookingRecipesList.length - 1 ? prev + 1 : 0));
        };

        const currentCookingRecipe = cookingRecipesList[cookingRecipeIndex];

        return (
          <div className="space-y-8 text-left text-stone-300 font-sans text-base leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-2xl font-black text-medieval-gold uppercase mb-4" id="cooking-intro">{t('Mecânicas Principais', 'Core Mechanics')}</h3>
            
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 mb-8">
              <h4 className="text-medieval-gold font-bold mb-2 uppercase text-sm tracking-wider">{t('Índice', 'Table of Contents')}</h4>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                <li><button onClick={() => document.getElementById('cooking-intro')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">1. {t('Apresentação', 'Introduction')}</button></li>
                <li><button onClick={() => document.getElementById('cooking-acquire')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">2. {t('Como Adquirir', 'How to Acquire')}</button></li>
                <li><button onClick={() => document.getElementById('cooking-bread')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">3. {t('Fazendo Pão', 'Baking Bread')}</button></li>
                <li><button onClick={() => document.getElementById('cooking-special')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">4. {t('Comidas Especiais', 'Special Foods')}</button></li>
                <li><button onClick={() => document.getElementById('cooking-recipes')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">5. {t('Receitas', 'Recipes')}</button></li>
              </ul>
            </div>

            <p>
              {t('A profissão de culinária (Cooking) permite criar alimentos que oferecem bônus especiais aos personagens. Além disso, cozinheiros evoluem sua skill de culinária mais rapidamente. Introduzimos o avanço do skill ao criar pães e hambúrgueres.', 'The cooking profession allows you to create foods that provide special bonuses to characters. In addition, cooks level up their cooking skill faster. We introduced the advancement of the skill when baking bread and burgers.')}
            </p>

            <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg mb-4 mt-4">
              <p className="text-sm text-orange-200">
                <strong>{t('Atenção - Regra de Consumo:', 'Attention - Consumption Rule:')}</strong> {t('Os buffs (efeitos) gerados pela mesma comida não se acumulam (não stacam). Ou seja, comer vários pães de mana não somará a regeneração, apenas renovará a duração. No entanto, é possível estar sob o efeito de dois buffs distintos simultaneamente ao consumir duas comidas diferentes (ex: buff de cura + buff de velocidade).', 'The buffs (effects) generated by the same food do not stack. That is, eating multiple mana breads will not stack the regeneration, it will only renew the duration. However, it is possible to be under the effect of two different buffs simultaneously by consuming two different foods (e.g., healing buff + speed buff).')}
              </p>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="cooking-acquire">{t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1 space-y-4">
                  <p>
                    {t('Para se tornar um cozinheiro, adquirir os benefícios da profissão e suas primeiras receitas, converse com o NPC Bjorn:', 'To become a cook, acquire the profession benefits and your first recipes, talk to the NPC Bjorn:')}
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-stone-300">
                    <li><strong className="text-medieval-gold">{t('NPC:', 'NPC:')}</strong> <a href="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784746380/localizacaoNPCcooking.png" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline">Bjorn</a></li>
                    <li><strong className="text-medieval-gold">{t('Localização:', 'Location:')}</strong> {t('Thais Castle (Castelo de Thais).', 'Thais Castle.')}</li>
                    <li><strong className="text-medieval-gold">{t('Custo:', 'Cost:')}</strong> {t('20.000 Gold Coins.', '20,000 Gold Coins.')}</li>
                  </ul>
                  <p className="text-sm text-stone-400">
                    {t('Ele também vende Cookbooks (livros de receitas) que podem ser usados para verificar todas as receitas que você já aprendeu.', 'He also sells Cookbooks that can be used to check all the recipes you have learned so far.')}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-medieval-gold/20 pt-4">
                <h5 className="font-bold text-medieval-gold mb-3">{t('Vantagens da Profissão:', 'Advantages of the Profession:')}</h5>
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <ul className="list-disc pl-5 space-y-2 flex-1 text-stone-300">
                    <li>{t('Aumento de skill mais rápido.', 'Faster skill increase.')}</li>
                    <li>{t('Permite produzir comidas especiais que oferecem bônus.', 'Allows producing special foods that offer bonuses.')}</li>
                    <li>{t('Acesso a um outfit exclusivo de cozinheiro.', 'Access to an exclusive cook outfit.')}</li>
                  </ul>
                  <div className="flex-shrink-0 text-center">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/chef_outfit.gif" alt="Chef Outfit" className="w-24 h-auto object-contain mx-auto border border-medieval-gold/20 rounded bg-black/50 p-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <span className="text-xs text-medieval-gold/60 mt-1 block uppercase tracking-widest">{t('Outfit', 'Outfit')}</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="cooking-bread">{t('Fazendo Pão (Upando Cooking)', 'Baking Bread (Leveling Cooking)')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Fazer pão é a forma mais simples e barata de subir o nível de Cooking.', 'Baking bread is the simplest and cheapest way to level up Cooking.')}
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 py-6 overflow-x-auto min-w-max md:min-w-0">
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/scythe.gif" alt="Scythe" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Scythe</span>
                </div>
                <span className="text-stone-500 font-bold">+</span>
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Wheat.gif" alt="Wheat" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Wheat</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-medieval-gold/50 mx-1 md:mx-2 hidden md:block" />
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Bunch_of_Wheat.gif" alt="Bunch of Wheat" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1 text-center max-w-[50px] leading-tight">Bunch of Wheat</span>
                </div>
                <span className="text-stone-500 font-bold">+</span>
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Millstone.gif" alt="Millstone" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Millstone</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-medieval-gold/50 mx-1 md:mx-2 hidden md:block" />
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Flour.gif" alt="Flour" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Flour</span>
                </div>
                <span className="text-stone-500 font-bold">+</span>
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784746572/water.png" alt="Water" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Water</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-medieval-gold/50 mx-1 md:mx-2 hidden md:block" />
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784746567/Lump_of_Dough.gif" alt="Lump of Dough" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1 text-center max-w-[50px] leading-tight">Lump of Dough</span>
                </div>
                <span className="text-stone-500 font-bold">+</span>
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Oven.gif" alt="Oven" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Oven</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-medieval-gold/50 mx-1 md:mx-2 hidden md:block" />
                <div className="flex flex-col items-center">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Bread.gif" alt="Bread" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                  <span className="text-[10px] md:text-xs text-medieval-gold mt-1">Bread</span>
                </div>
              </div>

              <div className="space-y-2 mt-4 text-sm text-stone-300 bg-black/40 p-4 rounded-lg border border-white/5">
                <p><strong>1.</strong> {t('Corte o Wheat (trigo) com uma Scythe para obter um Bunch of Wheat.', 'Cut Wheat using a Scythe to get a Bunch of Wheat.')}</p>
                <p><strong>2.</strong> {t('Use o Bunch of Wheat no Millstone (Moinho) para produzir Flour (farinha).', 'Use the Bunch of Wheat on a Millstone to produce Flour.')}</p>
                <p><strong>3.</strong> {t('Misture a Flour (farinha) com água (Water) para criar um Lump of Dough (massa).', 'Mix the Flour with Water to create a Lump of Dough.')}</p>
                <p><strong>4.</strong> {t('Asse um Lump of Dough por vez no Oven (Forno) para criar Bread (pão) e upar sua skill.', 'Bake one Lump of Dough at a time in an Oven to create Bread and level up your skill.')}</p>
              </div>

              <div className="mt-4 text-sm space-y-2">
                <p>
                  <strong className="text-medieval-gold">{t('Dica de Compra:', 'Buying Tip:')}</strong> {t('Você pode comprar trigo por 1gp cada no NPC ', 'You can buy wheat for 1gp each from NPC ')}
                  <a href="https://www.tibiawiki.com.br/wiki/Donald_McRonald" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline">Donald McRonald</a>.
                </p>
                <p>
                  <strong className="text-medieval-gold">{t('Dica de Venda:', 'Selling Tip:')}</strong> {t('Venda os pães prontos por 2gp cada para o NPC ', 'Sell the baked bread for 2gp each to NPC ')}
                  <a href="https://www.tibiawiki.com.br/wiki/Sherry_McRonald" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline">Sherry McRonald</a>.
                </p>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="cooking-special">{t('Comidas Especiais & Food Time', 'Special Foods & Food Time')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('No momento o jogo conta com 4 comidas especiais (Burgers). Cada uma fornece um bônus específico para o personagem por 20 minutos, mas também preenche o seu "Food Time". Isso significa que você precisará escolher cuidadosamente qual tipo de comida usar, pois assim que o tempo de comida estiver cheio, você não poderá comer novamente até ficar com fome (hungry)! O bônus dura exatamente o mesmo tempo que preenche de Food Time.', 'Currently the game features 4 special foods (Burgers). Each provides a specific bonus to the character for 20 minutes, but also fills your "Food Time". This means you will need to carefully choose which type of food to use, since once the food time is full, you will no longer be able to eat until you are hungry again! The bonus lasts exactly the same amount of time it fills the Food Time.')}
              </p>
              <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                <h5 className="font-bold text-medieval-gold mb-2">{t('Exemplo de Combinação:', 'Combination Example:')}</h5>
                <ul className="list-disc pl-5 mb-2 text-sm text-stone-300">
                  <li><strong>White Fish Burger</strong>: sword, axe, club +1 (20 min)</li>
                  <li><strong>Swamp Fish Burger</strong>: distance +1 (20 min)</li>
                </ul>
                <p className="text-sm">
                  {t('Ao comer ambos, seu personagem terá bônus de melee e de distance. A duração de cada bônus será de 20 minutos, mas seu "Food Time" aumentará em 40 minutos (20 de cada)! Assim, você demorará mais para ter fome e usar outras comidas.', 'By using a white fish burger and a swamp fish burger, your character will have melee skill bonuses + distance bonuses. The duration of each bonus will last for 20 minutes, but your food time will increase by 40 minutes! So you will be less hungry to use other types of food!')}
                </p>
              </div>
              
              <div className="bg-black/40 border border-white/10 rounded-lg p-4 mt-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784746879/Reverse_Pepper.png" alt="Reverse Pepper" className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h5 className="font-bold text-red-400 mb-1">{t('Reverse Pepper (Reset de Food Time)', 'Reverse Pepper (Food Time Reset)')}</h5>
                  <p className="text-sm text-stone-300">
                    {t('A loja do jogo (Store) oferece o item "Reverse Pepper". Uma dose dessa pimenta reseta o "Food Time" instantaneamente. Atenção: todas as condições de comidas especiais ativas também serão removidas.', 'The game Store offers the "Reverse Pepper" item. One dose of this pepper resets the "Food Time" instantly. Attention: all active special food conditions will also be removed.')}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="cooking-recipes">{t('Preparando Receitas', 'Cooking Recipes')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Para começar a cozinhar, você precisa usar a receita (recipe) no seu personagem. As primeiras receitas são vendidas pelo NPC Bjorn, mas em breve teremos receitas raras em loots de criaturas e quests.', 'To start cooking, you need to use the recipe item on your character. The first recipes are sold by NPC Bjorn, but soon we will have rare recipes in creature loots and quests.')}
              </p>
              <p>
                {t('A mecânica de culinária está diretamente ligada à pesca, esfolamento (skinning) e outras. Para fazer os hambúrgueres de peixe, por exemplo, você precisará coletar diferentes tipos de peixes em variadas regiões do mapa. No momento a profissão de skinning não tem interação com as receitas disponíveis, mas futuramente será necessária e as profissões serão interligadas.', 'The cooking mechanic is directly linked to fishing, skinning, and others. To make the fishburgers, for example, you will need to collect different types of fish in various regions of the map. Currently, the skinning profession has no interaction with the available recipes, but in the future it will be necessary and the professions will be interconnected.')}
              </p>

              <div className="bg-black/40 border border-white/10 rounded-lg p-4 mt-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784747252/Wooden_Spoon.gif" alt="Wooden Spoon" className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h5 className="font-bold text-medieval-gold mb-1">{t('Wooden Spoon (Ferramenta)', 'Wooden Spoon (Tool)')}</h5>
                  <p className="text-sm text-stone-300">
                    {t('A colher de pau é uma ferramenta essencial na culinária. Ela é usada em praticamente todas as receitas para misturar os ingredientes na panela (Pan) e produzir a comida.', 'The wooden spoon is an essential tool in cooking. It is used in almost all recipes to mix the ingredients in the Pan and produce the food.')}
                  </p>
                </div>
              </div>

              <div className="bg-stone-800/60 p-1 border border-medieval-gold/20 rounded-lg max-w-3xl mx-auto relative overflow-hidden">
                <div className="flex items-center justify-between bg-black/60 p-3 border-b border-medieval-gold/20">
                  <button onClick={prevRecipe} className="p-2 bg-white/5 hover:bg-medieval-gold/20 rounded text-medieval-gold transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="text-center">
                    <h5 className="font-bold text-medieval-gold text-xl tracking-wider">{currentCookingRecipe.name}</h5>
                    <span className="text-xs text-blue-300 block">{currentCookingRecipe.effect} | {currentCookingRecipe.duration}</span>
                  </div>
                  <button onClick={nextRecipe} className="p-2 bg-white/5 hover:bg-medieval-gold/20 rounded text-medieval-gold transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
                  <div>
                    <h6 className="font-bold text-stone-300 mb-3 uppercase text-xs tracking-widest border-b border-white/10 pb-1">{t('Ingredientes:', 'Ingredients:')}</h6>
                    <ul className="list-disc pl-5 text-sm text-stone-300 space-y-1">
                      {currentCookingRecipe.ingredients.map((ing, idx) => (
                        <li key={idx}>
                          {ing.name} <span className={`text-xs ${ing.isRed ? 'text-red-400 font-bold' : 'text-stone-500'}`}>{ing.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-bold text-stone-300 mb-3 uppercase text-xs tracking-widest border-b border-white/10 pb-1">{t('Modo de Preparo:', 'Preparation:')}</h6>
                    <ol className="list-decimal pl-5 text-sm text-stone-300 space-y-2">
                      <li>{t('Coloque óleo na Pan (frigideira).', 'Put oil in the Pan.')}</li>
                      <li>{t('Tempere os peixes e camarões com sal, pimenta e limão.', 'Season the fish and shrimp with salt, pepper, and lemon.')}</li>
                      <li>{t('Adicione os ingredientes temperados e o resto na Pan.', 'Add the seasoned ingredients and the rest to the Pan.')}</li>
                      <li>{t('Use sua Wooden Spoon e misture. O sucesso do prato dependerá da sua skill!', 'Use your wooden spoon and mix it. The success of the dish will depend on your cooking skill!')}</li>
                    </ol>
                    <p className="mt-6 text-xs text-red-400 font-bold bg-red-900/20 p-3 rounded border border-red-500/30 text-center">
                      {t('Atenção: Todos os ingredientes usados na frigideira (incluindo a própria Pan) são consumidos no processo!', 'Attention: All ingredients used in the pan (including the Pan itself) are consumed in the process!')}
                    </p>
                  </div>
                </div>
                
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {cookingRecipesList.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === cookingRecipeIndex ? 'bg-medieval-gold' : 'bg-white/20'}`}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <h4 className="text-xl font-bold text-medieval-gold mb-4 text-center">{t('Demonstração', 'Demonstration')}</h4>
              <div className="flex justify-center w-full">
                <video 
                  controls 
                  className="rounded-lg border border-medieval-gold/20 shadow-[0_0_15px_rgba(197,160,89,0.2)] w-full max-w-3xl"
                >
                  <source src="https://res.cloudinary.com/dc4nkbnkg/video/upload/v1784745933/teaser-cooking.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

          </div>
        );

      case 'farming':
        return (
          <div className="space-y-8 text-left text-stone-300 font-sans text-base leading-relaxed">
            <h3 className="text-2xl font-black text-medieval-gold uppercase mb-4" id="farming-intro">{t('Mecânicas Principais', 'Core Mechanics')}</h3>
            
            {/* Table of Contents */}
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 mb-8">
              <h4 className="text-medieval-gold font-bold mb-2 uppercase text-sm tracking-wider">{t('Índice', 'Table of Contents')}</h4>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                <li><button onClick={() => document.getElementById('farming-intro')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">1. {t('Apresentação', 'Introduction')}</button></li>
                <li><button onClick={() => document.getElementById('farming-stages')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">2. {t('Estágios e Tempo', 'Stages and Time')}</button></li>
              </ul>
            </div>

            <p>{t('Fazenda (Farming) envolve o plantio, cultivo e colheita de sementes para gerar ervas mágicas, grãos e ingredientes vitais.', 'Farming involves planting, growing, and harvesting seeds to generate magical herbs, grains, and vital ingredients.')}</p>

            <div className="flex items-center justify-center p-8 bg-black/40 border border-medieval-gold/20 rounded-xl my-6">
               <div className="text-center space-y-3">
                  <Sprout className="w-12 h-12 mx-auto text-medieval-gold/40" />
                  <p className="text-xs text-medieval-gold/60 uppercase">[{t('Imagem: Plantação e Estágios de Crescimento', 'Image: Plantation and Growth Stages')}]</p>
               </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="farming-stages">{t('Estágios e Tempo', 'Stages and Time')}</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('Sementes têm tempos de crescimento que variam de horas a dias reais.', 'Seeds have growth times ranging from real hours to days.')}</li>
              <li>{t('É necessário regar e proteger as plantas para maximizar o rendimento da colheita.', 'Watering and protecting the plants is required to maximize harvest yield.')}</li>
              <li>{t('Sua skill de Farming aumenta a chance de obter sementes de volta e multiplicar a colheita.', 'Your Farming skill increases the chance of getting seeds back and multiplying the harvest.')}</li>
            </ul>
          </div>
        );
      
      case 'skinning':
        return (
          <div className="space-y-8 text-left text-stone-300 font-sans text-base leading-relaxed">
            <h3 className="text-2xl font-black text-medieval-gold uppercase mb-4" id="skinning-intro">{t('Mecânicas Principais', 'Core Mechanics')}</h3>
            
            {/* Table of Contents */}
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 mb-8">
              <h4 className="text-medieval-gold font-bold mb-2 uppercase text-sm tracking-wider">{t('Índice', 'Table of Contents')}</h4>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                <li><button onClick={() => document.getElementById('skinning-intro')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">1. {t('Apresentação', 'Introduction')}</button></li>
                <li><button onClick={() => document.getElementById('skinning-acquire')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">2. {t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</button></li>
                <li><button onClick={() => document.getElementById('skinning-mechanics')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">3. {t('Mecânicas de Esfola e Fórmulas', 'Skinning Mechanics and Formulas')}</button></li>
                <li><button onClick={() => document.getElementById('skinning-tools')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">4. {t('Ferramentas de Skinning (Knives)', 'Skinning Tools (Knives)')}</button></li>
                <li><button onClick={() => document.getElementById('skinning-pouch')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">5. {t('Utilitário: Skinning Pouch', 'Utility: Skinning Pouch')}</button></li>
                <li><button onClick={() => document.getElementById('skinning-addons')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">6. {t('Addons e Outfits', 'Addons and Outfits')}</button></li>
              </ul>
            </div>

            <p>
              {t('A profissão de Esfolador (Skinning) permite que você extraia materiais valiosos (skins e creature products) de criaturas recém-derrotadas. Atualmente, estes itens são utilizados exclusivamente para a criação de addons de outfits. Futuramente, eles também serão usados na profissão de Cooking e poderão ser comercializados para venda em NPCs, caso você possua um determinado rank.', 'The Skinner (Skinning) profession allows you to extract valuable materials (skins and creature products) from recently defeated creatures. Currently, these items are used exclusively to craft outfit addons. In the future, they will also be used in Cooking and can be sold to NPCs if you have a certain rank.')}
            </p>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="skinning-acquire">{t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Para se tornar um Esfolador e adquirir a profissão oficialmente, visite o NPC:', 'To become a Skinner and acquire the profession officially, visit the NPC:')}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                   <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/kael.gif" alt="NPC Kael" className="w-16 h-16 object-contain rounded border border-medieval-gold/20 bg-black/50 p-1" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <ul className="list-disc pl-5 space-y-2 text-stone-300">
                  <li><strong className="text-medieval-gold">{t('NPC Mentor:', 'Mentor NPC:')}</strong> <a href="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784736131/localizacaoNPC.png" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold hover:underline hover:text-blue-300">Kael</a></li>
                  <li><strong className="text-medieval-gold">{t('Localização:', 'Location:')}</strong> {t('Norte da cidade de Thais.', 'North of Thais city.')}</li>
                </ul>
              </div>

              <div className="mt-4 border-t border-medieval-gold/20 pt-4">
                <h5 className="font-bold text-medieval-gold mb-3">{t('Vantagens da Profissão:', 'Advantages of the Profession:')}</h5>
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <ul className="list-disc pl-5 space-y-2 flex-1">
                    <li>{t('Aumento de skill mais rápido.', 'Faster skill increase.')}</li>
                    <li>{t('Acesso a um outfit exclusivo de esfolador (Skinner Outfit).', 'Access to an exclusive skinner outfit.')}</li>
                  </ul>
                  <div className="flex-shrink-0 text-center">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784733738/skinning_outfit.png" alt="Skinner Outfit" className="w-24 h-auto object-contain mx-auto border border-medieval-gold/20 rounded bg-black/50 p-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <span className="text-xs text-medieval-gold/60 mt-1 block uppercase tracking-widest">{t('Outfit', 'Outfit')}</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="skinning-mechanics">{t('⚙️ Mecânicas de Esfola e Fórmulas', '⚙️ Skinning Mechanics and Formulas')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('A maioria dos corpos de criaturas pode ser esfolada para obter produtos e avançar na sua skill de Skinning. A chance de sucesso é influenciada diretamente pelo nível da sua skill.', 'Many creature corpses can be skinned to obtain products and advance your Skinning skill. The success chance is directly influenced by your skill level.')}
              </p>
              
              <div className="bg-stone-800/60 p-4 border border-medieval-gold/20 rounded-lg mt-4 text-center">
                <span className="block text-medieval-gold text-sm uppercase tracking-widest mb-2">{t('Fórmula de Sucesso (Skinning):', 'Success Formula (Skinning):')}</span>
                <code className="text-white font-bold text-sm sm:text-base">1% + (0.0149 * skinning skill)</code>
              </div>

              <div className="flex items-start gap-3 mt-4 text-red-400 bg-red-900/10 p-3 rounded border border-red-900/30">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  <strong className="text-red-300">{t('Restrições:', 'Restrictions:')}</strong> {t('Não é possível esfolar corpos humanos ou de anões (Dwarvens). Isso é intencional.', 'You cannot skin human corpses or dwarvens. This is intended.')}
                </p>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="skinning-tools">{t('🗡️ Ferramentas de Skinning (Knives)', '🗡️ Skinning Tools (Knives)')}</h4>
            <p className="mb-4">
              {t('Para realizar a esfola, você precisará de uma faca apropriada. Foram adicionadas 2 novas facas ao jogo:', 'To perform skinning, you will need an appropriate knife. 2 new knives have been added to the game:')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Hunter_knife.gif" alt="Hunter's Knife" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <h5 className="font-bold text-gray-300 mb-2">Hunter's Knife</h5>
                <p className="text-sm text-stone-400 mb-2">{t('Esfola criaturas até a Classe 2.', 'Skins up to class 2 creatures.')}</p>
                <p className="text-xs text-medieval-gold/80 italic">{t('Obtida como recompensa da Naginata Quest ou comprando no NPC Kael (Norte de Thais).', 'Acquired through Naginata Quest reward or by purchasing from NPC Kael (North of Thais).')}</p>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784736439/diamong_knife.gif" alt="Diamond Knife" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <h5 className="font-bold text-cyan-300 mb-2">Diamond Knife</h5>
                <p className="text-sm text-stone-400 mb-2">{t('Esfola criaturas até a Classe 5.', 'Skins up to class 5 creatures.')}</p>
                <p className="text-xs text-red-400 font-bold mb-1">{t('Chance de Quebra: 0.05%', 'Break chance: 0.05%')}</p>
                <p className="text-xs text-medieval-gold/80 italic">{t('Adquirida exclusivamente através de Crafting.', 'Acquired only through crafting.')}</p>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="skinning-pouch">{t('🧰 Utilitário: Skinning Pouch', '🧰 Utility: Skinning Pouch')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <div className="flex-shrink-0">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1784736783/skinning_pouch.png" alt="Skinning Pouch" className="w-16 h-16 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <div>
                <p className="mb-2">
                  {t('Sempre ande com sua Skinning Pouch! Ao esfolar criaturas, as skins obtidas vão automaticamente para dentro desta bolsa e se acumulam (stack) sozinhas.', 'Always carry your Skinning Pouch! As you skin creatures, the skins obtained automatically go inside this bag and stack themselves.')}
                </p>
                <p className="text-medieval-gold/90 font-bold text-sm">
                  {t('Benefício Principal: Reduz o peso de todas as skins guardadas nela em 20%.', 'Main Benefit: Reduces the weight of all skins stored inside it by 20%.')}
                </p>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="skinning-addons">{t('👕 Addons e Outfits', '👕 Addons and Outfits')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Addons para os novos outfits de classe (incluindo o Outfit de Esfolador) podem ser fabricados utilizando itens obtidos através da esfola (skinning), da quebra de equipamentos e ouro.', 'Addons for the new outfits (including the Skinner Outfit) can be crafted using items acquired through skinning, breaking equipments, and gold.')}
              </p>
              <div className="flex items-start gap-4 bg-black/40 p-3 rounded border border-white/5 mt-4">
                <Info className="w-6 h-6 text-medieval-gold flex-shrink-0 mt-1" />
                <p className="text-sm">
                  {t('Encontre o respectivo mentor de cada profissão para mais informações de como fazer seus addons.', 'Find the respective mentor of each profession for more information on how to make your addons.')}
                </p>
              </div>
            </div>
            
          </div>
        );

      case 'fishing':
        return (
          <div className="space-y-8 text-left text-stone-300 font-sans text-base leading-relaxed">
            <h3 className="text-2xl font-black text-medieval-gold uppercase mb-4" id="fishing-intro">{t('Mecânicas Principais', 'Core Mechanics')}</h3>
            
            {/* Table of Contents */}
            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 mb-8">
              <h4 className="text-medieval-gold font-bold mb-2 uppercase text-sm tracking-wider">{t('Índice', 'Table of Contents')}</h4>
              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                <li><button onClick={() => document.getElementById('fishing-intro')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">1. {t('Apresentação', 'Introduction')}</button></li>
                <li><button onClick={() => document.getElementById('fishing-acquire')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">2. {t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</button></li>
                <li><button onClick={() => document.getElementById('fishing-mechanics')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">3. {t('Mecânicas de Pesca e Fórmulas', 'Fishing Mechanics and Formulas')}</button></li>
                <li><button onClick={() => document.getElementById('fishing-rods')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">4. {t('Varas de Pesca e Crafting', 'Fishing Rods and Crafting')}</button></li>
                <li><button onClick={() => document.getElementById('fishing-biomes')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">5. {t('Biomas e Variedade de Peixes', 'Biomes and Fish Variety')}</button></li>
                <li><button onClick={() => document.getElementById('fishing-net')?.scrollIntoView({ behavior: 'smooth' })} className="text-medieval-gold/70 hover:text-medieval-gold hover:underline">6. {t('Utilitário: Fishing Net', 'Utility: Fishing Net')}</button></li>
              </ul>
            </div>

            <p>
              {t('A pesca no Miracle 7.4 vai muito além de ficar parado clicando na água. Com a nova mecânica, existem biomas específicos, dezenas de novos peixes (alguns muito raros!) e até a possibilidade de pescar na lava com varas forjadas.', 'Fishing in Miracle 7.4 goes far beyond standing still clicking on the water. With the new mechanics, there are specific biomes, dozens of new fishes (some very rare!) and even the possibility to fish in lava with forged rods.')}
            </p>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="fishing-acquire">{t('Como Adquirir a Profissão', 'How to Acquire the Profession')}</h4>
            <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-4">
              <p>
                {t('Para se tornar um Pescador e adquirir a profissão oficialmente, visite o NPC:', 'To become a Fisherman and acquire the profession officially, visit the NPC:')}
              </p>
              <div className="flex items-center gap-4">
                <ul className="list-disc pl-5 space-y-2 text-stone-300">
                  <li><strong className="text-medieval-gold">{t('NPC:', 'NPC:')}</strong> <a href="https://www.tibiawiki.com.br/wiki/Hoggle" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline font-bold">Hoggle</a></li>
                  <li><strong className="text-medieval-gold">{t('Localização:', 'Location:')}</strong> {t('A leste (direita) da cidade de Thais.', 'East (right) of Thais city.')}</li>
                  <li><strong className="text-medieval-gold">{t('Custo:', 'Cost:')}</strong> {t('20.000 Gold (20k)', '20,000 Gold (20k)')}</li>
                  <li><strong className="text-medieval-gold">{t('Requisito:', 'Requirement:')}</strong> {t('Fishing Skill 20', 'Fishing Skill 20')}</li>
                </ul>
              </div>
              
              <div className="mt-4 border-t border-medieval-gold/20 pt-4">
                <h5 className="font-bold text-medieval-gold mb-3">{t('Vantagens da Profissão:', 'Advantages of the Profession:')}</h5>
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <ul className="list-disc pl-5 space-y-2 flex-1">
                    <li>{t('Aumento de skill mais rápido.', 'Faster skill increase.')}</li>
                    <li>{t('Acesso a um outfit exclusivo de pescador.', 'Access to an exclusive fisherman outfit.')}</li>
                  </ul>
                  <div className="flex-shrink-0 text-center">
                    <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/fisherman_outfit.gif" alt="Fisherman Outfit" className="w-24 h-auto object-contain mx-auto border border-medieval-gold/20 rounded bg-black/50 p-2" />
                    <span className="text-xs text-medieval-gold/60 mt-1 block uppercase tracking-widest">{t('Outfit', 'Outfit')}</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="fishing-mechanics">{t('🎣 Mecânicas de Pesca e Fórmulas', '🎣 Fishing Mechanics and Formulas')}</h4>
            <ul className="list-disc pl-5 space-y-3 mt-2">
              <li>
                <strong className="text-medieval-gold">{t('Chance de Pesca:', 'Fishing Chance:')}</strong> {t('A chance de pegar um peixe começa com 10% (base) e tem limite máximo de 50% (atingido aproximadamente no skill 77).', 'The chance to catch a fish starts at 10% (base) and has a maximum limit of 50% (reached around skill 77).')}
              </li>
              <li>
                <strong className="text-medieval-gold">{t('Skill Tries (Tentativas de Skill):', 'Skill Tries:')}</strong> {t('Você ganha 1 avanço/tentativa de skill sempre que pesca em um tile de água que contém peixes. Quando o peixe é pego, o tile muda para um estado sem peixe e não concede mais avanços até o peixe dar respawn (embora o efeito visual de "splash" continue aparecendo).', 'You gain 1 skill try whenever you fish on a water tile that contains fish. When a fish is caught, the tile changes to a state without fish and grants no more skill tries until the fish respawns (although the "splash" visual effect still appears).')}
              </li>
              <li>
                <strong className="text-blue-400">Fish Bait (Iscas):</strong> {t('O uso de Fish Baits reduz drasticamente o tempo de respawn do peixe em um tile, passando de 10 minutos para apenas 2 minutos!', 'Using Fish Baits drastically reduces the fish respawn time on a tile, going from 10 minutes to just 2 minutes!')}
              </li>
            </ul>

            <div className="bg-stone-800/60 p-4 border border-medieval-gold/20 rounded-lg mt-4 text-center">
              <span className="block text-medieval-gold text-sm uppercase tracking-widest mb-2">{t('Fórmula de Chance de Sucesso:', 'Success Chance Formula:')}</span>
              <code className="text-white font-bold text-sm sm:text-base">10% + ((Fishing Skill - 10) * 0.597)%</code>
              <p className="text-xs text-stone-400 mt-2">{t('Limitado ao máximo de 50%.', 'Capped at a maximum of 50%.')}</p>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="fishing-rods">{t('🛠️ Varas de Pesca Craftáveis (Craftable Rods)', '🛠️ Craftable Fishing Rods')}</h4>
            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-200">
                <strong>{t('Importante:', 'Important:')}</strong> {t('Não é necessário possuir uma profissão ou ter um skill de Fishing específico para usar os diversos tipos de varas. Com as novas varas, é possível pescar tipos exclusivos de peixes. Além disso, algumas varas permitem pescar em tiles específicos, como a Volcanic Fishing Rod em Lava e a Golden Fishing Rod em Shiny Water.', 'It is not necessary to have a profession or a specific Fishing skill to use the different types of rods. With the new rods, it is possible to catch exclusive types of fish. In addition, some rods allow you to fish in specific tiles, such as the Volcanic Fishing Rod in Lava and the Golden Fishing Rod in Shiny Water.')}
              </p>
            </div>
            <p className="mb-4 text-sm">{t('Existem varas raras, necessárias para pegar certos peixes ou pescar em outros tipos de terreno. Veja as receitas (craftadas na bigorna):', 'There are rare rods required to catch certain fishes or fish in other types of terrain. See the recipes (crafted on the anvil):')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Reinforced_rod.gif" alt="Reinforced Fishing Rod" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" />
                <h5 className="font-bold text-gray-300 mb-2">Reinforced Fishing Rod</h5>
                <ul className="text-sm space-y-1 text-left inline-block w-full">
                  <li><strong className="text-medieval-gold">Tile:</strong> Water</li>
                  <li><strong className="text-medieval-gold">Material:</strong> 1x Fishing Rod + 5x Steels</li>
                  <li><strong className="text-medieval-gold">Multiplicador Craft:</strong> 2</li>
                  <li><strong className="text-red-400">Chance de Quebra:</strong> 1.2%</li>
                </ul>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Engenired_rod.gif" alt="Engineered Fishing Rod" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" />
                <h5 className="font-bold text-blue-300 mb-2">Engineered Fishing Rod</h5>
                <ul className="text-sm space-y-1 text-left inline-block w-full">
                  <li><strong className="text-medieval-gold">Tile:</strong> Water</li>
                  <li><strong className="text-medieval-gold">Material:</strong> 1x Fishing Rod + 10x Steels + 1x Draconian Steel</li>
                  <li><strong className="text-medieval-gold">Multiplicador Craft:</strong> 1.5</li>
                  <li><strong className="text-red-400">Chance de Quebra:</strong> 0.6%</li>
                </ul>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Volcanic_rod.gif" alt="Volcanic Fishing Rod" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" />
                <h5 className="font-bold text-red-500 mb-2">Volcanic Fishing Rod</h5>
                <ul className="text-sm space-y-1 text-left inline-block w-full">
                  <li><strong className="text-medieval-gold">Tile:</strong> Lava</li>
                  <li><strong className="text-medieval-gold">Material:</strong> 1x Fishing Rod + 20x Steels + 10x Glimmering Soils + 5x Drac. Steels + 3x Hell Steels</li>
                  <li><strong className="text-medieval-gold">Multiplicador Craft:</strong> 1</li>
                  <li><strong className="text-red-400">Chance de Quebra:</strong> 0.24%</li>
                </ul>
              </div>

              <div className="bg-black/40 border border-white/5 rounded-lg p-4 flex flex-col items-center text-center">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/Golden_rod.gif" alt="Golden Fishing Rod" className="w-12 h-12 object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] mb-2" />
                <h5 className="font-bold text-yellow-400 mb-2">Golden Fishing Rod</h5>
                <ul className="text-sm space-y-1 text-left inline-block w-full">
                  <li><strong className="text-medieval-gold">Tile:</strong> Water, Cold Water, Shiny Water</li>
                  <li><strong className="text-medieval-gold">Material:</strong> 1x Fishing Rod + 40x Steels + 10x Drac. Steels + 3x Gold Ingot + 3x Hell Steels</li>
                  <li><strong className="text-medieval-gold">Multiplicador Craft:</strong> 0.5</li>
                  <li><strong className="text-red-400">Chance de Quebra:</strong> 0.15%</li>
                </ul>
                <p className="text-[10px] text-stone-400 mt-2 text-left w-full">*Gold ingots can be purchased from Briasol (Ab'Dendriel).</p>
              </div>
            </div>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="fishing-biomes">{t('🌍 Biomas e Variedade de Peixes', '🌍 Biomes and Fish Variety')}</h4>
            <p>{t('Dezenas de novos peixes foram introduzidos, mas a localização (e o tipo de vara) importam muito!', 'Dozens of new fishes were introduced, but location (and rod type) matter a lot!')}</p>
            
            <div className="flex flex-wrap gap-4 justify-center my-6">
               <div className="flex flex-col items-center bg-black/30 p-2 rounded border border-white/5"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/white_fish.gif" alt="White Fish" className="w-10 h-10 object-contain" /><span className="text-xs text-blue-200 mt-1">White Fish</span></div>
               <div className="flex flex-col items-center bg-black/30 p-2 rounded border border-white/5"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/swamp_fish.gif" alt="Swamp Fish" className="w-10 h-10 object-contain" /><span className="text-xs text-green-300 mt-1">Swamp Fish</span></div>
               <div className="flex flex-col items-center bg-black/30 p-2 rounded border border-white/5"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/lava_fish.gif" alt="Lava Fish" className="w-10 h-10 object-contain" /><span className="text-xs text-red-400 mt-1">Lava Fish</span></div>
               <div className="flex flex-col items-center bg-black/30 p-2 rounded border border-white/5"><img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/gold_fish.gif" alt="Gold Fish" className="w-10 h-10 object-contain" /><span className="text-xs text-yellow-400 mt-1">Gold Fish</span></div>
            </div>

            <ul className="list-disc pl-5 space-y-2 mt-4 text-sm">
              <li><strong className="text-medieval-gold">{t('Lista de Novos Peixes:', 'List of New Fishes:')}</strong> White fish, sand fish, swamp fish, northern pike, shrimps, trout, yellow perch, bass, coral fish, barbel, blob fish, murk fish, skyfin, firemouth fish, stone fish, lava fish e golden fish.</li>
              <li><strong className="text-medieval-gold">{t('White Fish:', 'White Fish:')}</strong> {t('Encontrado somente em águas frias (Icy Islands).', 'Found only in cold waters (Icy Islands).')}</li>
              <li><strong className="text-medieval-gold">{t('Swamp Fish:', 'Swamp Fish:')}</strong> {t('Encontrado somente nas águas dos pântanos (Venore).', 'Found only in swamp waters (Venore).')}</li>
              <li><strong className="text-medieval-gold">{t('Lava e Stone Fish:', 'Lava and Stone Fish:')}</strong> {t('Requer varas específicas de lava (como a Volcanic Fishing Rod).', 'Require specific lava rods (such as the Volcanic Fishing Rod).')}</li>
            </ul>

            <h4 className="text-xl font-bold text-medieval-gold mt-8 mb-4" id="fishing-net">{t('🎒 Utilitário Indispensável: Fishing Net', '🎒 Indispensable Utility: Fishing Net')}</h4>
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-blue-900/10 p-5 rounded-lg border border-blue-500/20">
              <div className="flex-shrink-0">
                <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/fishing_net.gif" alt="Fishing Net" className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
              <div className="flex-1 space-y-2">
                <p>
                  {t('A', 'The')} <strong className="text-blue-400">Fishing Net</strong> {t('é um item fundamental para longas jornadas de pesca.', 'is a fundamental item for long fishing journeys.')}
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2 text-sm">
                  <li><strong className="text-medieval-gold">{t('Organização Automática:', 'Automatic Organization:')}</strong> {t('Ao mantê-la em sua backpack (BP), todos os peixes pescados são guardados automaticamente dentro da rede (auto-stack).', 'By keeping it in your backpack (BP), all caught fishes are automatically stored inside the net (auto-stack).')}</li>
                  <li><strong className="text-medieval-gold">{t('Redução de Peso:', 'Weight Reduction:')}</strong> {t('Enquanto os peixes estiverem dentro da rede, o peso (cap) deles é reduzido em 20%!', 'While the fishes are inside the net, their weight (cap) is reduced by 20%!')}</li>
                </ul>
              </div>
            </div>

            <div className="bg-black/30 p-5 rounded-lg border border-medieval-gold/20 space-y-4 text-sm leading-relaxed mt-8">
              <h4 className="text-xl font-bold text-medieval-gold mt-2 mb-2">{t('📈 Dica para Pescadores', '📈 Tip for Fishermen')}</h4>
              <p>
                {t('Sempre ande com sua Fishing Net e Fish Baits. A redução de 10 min para 2 min de respawn com a isca acelera significativamente o processo de pesca.', 'Always carry your Fishing Net and Fish Baits. The reduction from 10 min to 2 min respawn with bait significantly speeds up the fishing process.')}
              </p>
            </div>
          </div>
        );
      default:
        return (
           <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
             <div className="w-24 h-24 rounded-full bg-black/50 border border-medieval-gold/20 flex items-center justify-center animate-pulse">
                <Hammer className="w-10 h-10 text-medieval-gold/40" />
             </div>
             <div>
                <h3 className="text-2xl font-black text-medieval-gold uppercase mb-2">
                  {t('Em Construção', 'Under Construction')}
                </h3>
                <p className="text-stone-400 font-sans max-w-md mx-auto">
                  {t('A Guilda de Miracle ainda está catalogando os tomos desta profissão. Retorne em breve para mais detalhes.', 'The Miracle Guild is still cataloging the tomes of this profession. Return soon for more details.')}
                </p>
             </div>
           </div>
        );
    }
  };

  return (
    <div className="space-y-8 w-full">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-2 flex items-center justify-center gap-3">
           {t('Guias de Profissão', 'Profession Guides')}
        </h1>
        <p className="text-stone-300 font-sans text-base max-w-2xl mx-auto">
          {t('Explore os ofícios de Miracle. Escolha uma profissão abaixo para ver detalhes, fórmulas e mecânicas completas.', 'Explore the crafts of Miracle. Choose a profession below to see details, formulas, and complete mechanics.')}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {!selectedProf ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {professions.map((prof) => (
              <button
                key={prof.id}
                onClick={() => prof.isImplemented && onSelectProf(prof.id)}
                disabled={!prof.isImplemented}
                className={`relative overflow-hidden group rounded-xl bg-black/60 border ${prof.isImplemented ? 'border-medieval-gold/30 hover:border-medieval-gold hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'border-white/5 opacity-60 grayscale cursor-not-allowed'} transition-all duration-300 h-32 lg:h-40 flex flex-col items-center justify-center shadow-lg`}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${prof.color} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                <div className="text-medieval-gold mb-3 transform group-hover:scale-110 transition-transform">
                  {prof.icon}
                </div>
                <span className="font-black text-sm lg:text-base uppercase tracking-wider text-medieval-gold/90 group-hover:text-white transition-colors">
                  {prof.name[language]}
                </span>
                {!prof.isImplemented && (
                  <span className="absolute bottom-2 text-[10px] font-mono text-medieval-gold/40 uppercase">
                    {t('Em breve', 'Soon')}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-black/60 border border-medieval-gold/20 rounded-2xl p-6 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              {professions.find(p => p.id === selectedProf)?.icon}
            </div>
            
            <button 
              onClick={() => onSelectProf(null)}
              className="flex items-center gap-2 text-medieval-gold/60 hover:text-medieval-gold transition-colors font-bold uppercase text-xs tracking-wider mb-8 bg-black/40 px-4 py-2 rounded-lg border border-medieval-gold/10 hover:border-medieval-gold/30 w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> {t('Voltar para o Menu', 'Back to Menu')}
            </button>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-medieval-gold/10">
               <div className="p-4 bg-black border border-medieval-gold/30 rounded-xl">
                 {professions.find(p => p.id === selectedProf)?.icon}
               </div>
               <div>
                  <h2 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-medieval-gold to-white uppercase tracking-tight">
                    {professions.find(p => p.id === selectedProf)?.name[language]}
                  </h2>
               </div>
            </div>

            {renderContent()}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
