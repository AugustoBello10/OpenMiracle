import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ExternalLink, ChevronLeft, 
  Sparkles, Hammer, Flame, ShieldAlert, ShoppingBag, 
  Home, Sword, Target, Info, CheckCircle2, AlertTriangle, ShieldCheck,
  Search, Shield, Zap, Heart, RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapLink } from './MapLink';
import { PrerequisitesCard, NoticeCard, StepList } from './Guide';

interface CustomSystemsViewProps {
  language: 'pt' | 'en';
}

export function CustomSystemsView({ language }: CustomSystemsViewProps) {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [attrFilter, setAttrFilter] = useState('');
  const navigate = useNavigate();

  const renderBackBtn = () => (
    <button 
      onClick={() => setSelectedSystem(null)}
      className="flex items-center gap-2 text-medieval-gold/60 hover:text-medieval-gold transition-colors font-bold uppercase text-xs tracking-wider mb-8 bg-black/40 px-4 py-2 rounded-lg border border-medieval-gold/10 hover:border-medieval-gold/30 w-fit cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" /> {language === 'pt' ? 'Voltar para Sistemas' : 'Back to Systems'}
    </button>
  );

  // -------------------------------------------------------------
  // 1. RELIC BOX
  // -------------------------------------------------------------
  const renderRelicBox = () => (
    <motion.div
      key="relic-box-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              {language === 'pt' ? 'Sistema de Relic Box' : 'Relic Box System'}
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Container especial no inventário para equipar relíquias que concedem atributos únicos ao personagem.'
                : 'Special inventory container to equip relics granting unique attributes to your character.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              {language === 'pt'
                ? 'No Miracle, todo personagem possui uma Relic Box acoplada ao seu inventário, com 4 slots. Cada slot funciona como um slot de equipamento, mas aceita exclusivamente relíquias. Somente uma relíquia do mesmo tipo pode ser equipada por vez.'
                : 'In Miracle, every character has a Relic Box attached to their inventory with 4 slots. Each slot acts as an equipment slot, but strictly accepts relics. Only one relic of the same type can be equipped at a time.'}
            </p>
            
            <div className="flex justify-center my-6">
              <img 
                src="/images/miracle/features/relicbox.png" 
                alt="Relic Box" 
                className="rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.2)] border border-medieval-gold/30 max-w-full h-auto object-contain max-h-64" 
              />
            </div>

            <PrerequisitesCard
              language={language}
              title={language === 'pt' ? 'Requisitos para Destravar os Slots' : 'Slot Unlock Requirements'}
              items={[
                {
                  label: 'Slot 1 (1.000 gp)',
                  value: language === 'pt' ? 'Conclusão da Missão 1: The Notes of Melchior' : 'Mission 1: The Notes of Melchior completion',
                },
                {
                  label: 'Slot 2 (2.000 gp)',
                  value: language === 'pt' ? 'Conclusão da Missão 1: The Notes of Melchior' : 'Mission 1: The Notes of Melchior completion',
                },
                {
                  label: 'Slot 3 (5.000 gp)',
                  value: language === 'pt' ? 'Conclusão da Missão 2: The Djinn War Quest' : 'Mission 2: The Djinn War Quest completion',
                },
                {
                  label: 'Slot 4 (15.000 gp)',
                  value: language === 'pt' ? 'Conclusão da Missão 2: The Djinn War Quest' : 'Mission 2: The Djinn War Quest completion',
                },
              ]}
            />

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? 'Magia dos Djinns e Duração' : 'Djinn Magic & Duration'}
            </h3>
            
            <p>
              {language === 'pt'
                ? 'Os slots são mantidos abertos pela Magia dos Djinns por 48 horas de tempo ativo. O tempo só é consumido enquanto o personagem estiver online e com o ícone de batalha ativo (battle sign).'
                : 'The slots are held open by Djinn Magic for 48 active hours. Time is only consumed while the character is online and with battle sign active.'}
            </p>

            <NoticeCard type="tip" title={language === 'pt' ? 'Dica de Renovação' : 'Renewal Tip'}>
              {language === 'pt'
                ? 'Sempre que você destrava um novo slot, o timer de 48 horas de todos os slots é resetado para o valor máximo. Por exemplo: se você jogou com 1 slot por 40 horas e abrir o segundo slot, ambos voltam para 48 horas completas.'
                : 'Whenever you unlock a new slot, the 48-hour timer of all slots resets to full. For example, if you play with 1 slot for 40 hours and unlock the second, both reset to 48 hours.'}
            </NoticeCard>

            <p>
              {language === 'pt'
                ? 'Quando o tempo expira, as relíquias equipadas retornam automaticamente para a Backpack. Se não houver espaço ou capacidade (Cap), elas são enviadas direto para o Depot da sua cidade natal.'
                : 'When the timer expires, equipped relics return automatically to your Backpack. If lacking space or capacity, they are sent directly to your hometown Depot.'}
            </p>

            <div className="bg-black/60 p-4 rounded text-center border border-white/5 my-4 flex flex-col items-center">
              <span className="text-xs text-stone-400 mb-1">
                {language === 'pt' ? 'Para checar o tempo restante: Segure Shift e clique na Relic Box' : 'Check remaining time: Hold Shift and left-click the Relic Box'}
              </span>
              <code className="text-emerald-400 font-mono text-sm max-w-full text-center">
                You see a relic box. It contains 4 opened slots. It's holding additional djinn magic for X day and X hours.
              </code>
            </div>
            
            <div className="mt-8 flex justify-center border-t border-medieval-gold/20 pt-6">
              <button
                onClick={() => navigate('/wiki/server/itens/reliquias')}
                className="flex items-center gap-3 bg-gradient-to-r from-black/80 to-medieval-gold/10 hover:from-black hover:to-medieval-gold/20 border border-medieval-gold/40 hover:border-medieval-gold/80 transition-all px-8 py-3 rounded-xl cursor-pointer"
              >
                <span className="text-medieval-gold font-bold uppercase tracking-wider text-sm">
                  {language === 'pt' ? 'Explorar Catálogo de 74 Relíquias' : 'Explore 74 Relics Catalog'}
                </span>
                <ExternalLink className="w-4 h-4 text-medieval-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 2. ATRIBUTOS (ATTRIBUTION SYSTEM)
  // -------------------------------------------------------------
  const renderAtributos = () => {
    const attributesList = [
      { name: 'Attack', effect: language === 'pt' ? 'Aumenta o ataque do item' : 'Increase item attack', type: 'Offensive' },
      { name: 'Defense', effect: language === 'pt' ? 'Aumenta a defesa do item' : 'Increase item defense', type: 'Defensive' },
      { name: 'Armor', effect: language === 'pt' ? 'Aumenta a armadura do item' : 'Increase item armor', type: 'Defensive' },
      { name: 'Sword / Axe / Club Fighting', effect: language === 'pt' ? 'Aumenta o skill de combate corpo-a-corpo' : 'Increase melee fighting skill', type: 'Skill' },
      { name: 'Distance Fighting', effect: language === 'pt' ? 'Aumenta o skill de combate à distância' : 'Increase distance skill', type: 'Skill' },
      { name: 'Shielding', effect: language === 'pt' ? 'Aumenta o skill de escudo' : 'Increase shielding skill', type: 'Skill' },
      { name: 'Magic Level', effect: language === 'pt' ? 'Aumenta o Magic Level (Apenas para Magos)' : 'Increase magic level (Mages only)', type: 'Magic' },
      { name: 'Max Health', effect: language === 'pt' ? 'Aumenta HP máximo (/1 Knight, /1.5 Paladin, /3 Mage)' : 'Increase max health (/1 Knight, /1.5 Paladin, /3 Mage)', type: 'Vitals' },
      { name: 'Max Mana', effect: language === 'pt' ? 'Aumenta Mana máxima (/1 Mage, /2 Paladin, /6 Knight)' : 'Increase max mana (/1 Mage, /2 Paladin, /6 Knight)', type: 'Vitals' },
      { name: 'Health / Mana Regen', effect: language === 'pt' ? 'Aumenta a regeneração passiva de HP ou Mana' : 'Increase passive HP or Mana regeneration', type: 'Vitals' },
      { name: 'Life Leech / Mana Leech', effect: language === 'pt' ? 'Converte parte do dano causado em vida ou mana' : 'Converts damage dealt into HP or Mana', type: 'Sustain' },
      { name: 'Critical Hit', effect: language === 'pt' ? 'Chance de desferir dano físico crítico aumentado' : 'Chance to deal critical physical damage', type: 'Offensive' },
      { name: 'Critical Spell', effect: language === 'pt' ? 'Chance de desferir dano crítico com magias' : 'Chance to deal critical spell damage', type: 'Magic' },
      { name: 'Double Bash', effect: language === 'pt' ? 'Chance de atacar 2x no mesmo turno (o 2º golpe causa 50% de dano)' : 'Chance to attack twice in 1 turn (2nd hit deals 50% damage)', type: 'Offensive' },
      { name: 'Berserk', effect: language === 'pt' ? 'Chance de ativar +10% de melee skill e +18% de velocidade por 8s' : 'Chance to gain +10% melee and +18% speed for 8s', type: 'Buff' },
      { name: 'Destruction', effect: language === 'pt' ? 'Chance de ativar +10% de melee, distance e ML por 8s' : 'Chance to gain +10% melee, dist & ML for 8s', type: 'Buff' },
      { name: 'Momentum', effect: language === 'pt' ? 'Chance de reduzir seu tempo de exhaust em 1 segundo' : 'Chance to decrease exhaust time by 1s', type: 'Utility' },
      { name: 'Dodge', effect: language === 'pt' ? 'Chance de desviar completamente de um ataque' : 'Chance to dodge an attack completely', type: 'Defensive' },
      { name: 'Mitigation', effect: language === 'pt' ? 'Chance de reduzir a quantidade de dano recebido' : 'Chance to reduce incoming damage', type: 'Defensive' },
      { name: 'Perfuration / Crushing Blow', effect: language === 'pt' ? 'Chance de ignorar completamente a armadura ou defesa do alvo' : 'Chance to break target armor or defense', type: 'Offensive' },
      { name: 'Protect Physical / Elements', effect: language === 'pt' ? 'Proteção percentual contra dano físico ou elementos' : 'Percentage protection against physical or elements', type: 'Protection' },
      { name: 'Weight', effect: language === 'pt' ? 'Diminui o peso (oz) do equipamento' : 'Decreases item weight', type: 'Utility' },
    ];

    const filtered = attributesList.filter(a => 
      a.name.toLowerCase().includes(attrFilter.toLowerCase()) || 
      a.effect.toLowerCase().includes(attrFilter.toLowerCase())
    );

    return (
      <motion.div
        key="atributos-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {renderBackBtn()}

        <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-8">
            <header className="border-b border-medieval-gold/20 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 flex items-center gap-3">
                  <Sparkles className="w-7 h-7 text-yellow-400" />
                  {language === 'pt' ? 'Sistema de Atributos & Encantamento' : 'Attribution & Enchantment System'}
                </h2>
                <p className="text-sm text-medieval-muted/80 font-mono italic">
                  {language === 'pt' 
                    ? 'Regras completas de drops raros, encantamento com Mystic Runes, fórmulas e proteção de morte.'
                    : 'Complete rules for rare drops, Mystic Rune enchantments, formulas, and death protection.'}
                </p>
              </div>
              <img 
                src="/images/miracle/features/attrFrames3.jpg" 
                alt="Attribution Frame" 
                className="w-24 h-16 object-cover rounded border border-medieval-gold/30 shadow-lg self-center sm:self-auto" 
              />
            </header>

            <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
              <PrerequisitesCard
                language={language}
                title={language === 'pt' ? 'Materiais para Encantamento' : 'Enchantment Materials'}
                items={[
                  {
                    label: language === 'pt' ? 'Item Base' : 'Base Item',
                    value: language === 'pt' ? 'Equipamento com nível de classificação (Tier)' : 'Equipment with Classification Level',
                  },
                  {
                    label: language === 'pt' ? 'Mystic Rune' : 'Mystic Rune',
                    value: language === 'pt' ? 'Runa específica do tipo (Ember para armas, Molten para armaduras, etc.)' : 'Specific rune type (Ember for weapons, Molten for armors)',
                  },
                  {
                    label: language === 'pt' ? 'Arcane Orbs' : 'Arcane Orbs',
                    value: (
                      <span>
                        {language === 'pt' ? 'Compradas com o NPC ' : 'Bought from NPC '}
                        <MapLink poiId="alexander" showCoords>
                          Alexander em Edron
                        </MapLink>
                      </span>
                    ),
                  },
                  {
                    label: language === 'pt' ? 'Grand Arcane Orb (Opcional)' : 'Grand Arcane Orb (Optional)',
                    value: language === 'pt' ? 'Aumenta a chance final do encantamento em +50%' : 'Boosts final enchantment success chance by +50%',
                  },
                ]}
              />

              <StepList
                language={language}
                title={language === 'pt' ? 'Passo a Passo de Encantamento' : 'Enchantment Step-by-Step'}
                steps={[
                  {
                    step: 1,
                    title: language === 'pt' ? 'Obter a Mystic Rune e os Arcane Orbs' : 'Acquire Mystic Rune and Arcane Orbs',
                    description: language === 'pt'
                      ? 'Consiga a Mystic Rune correspondente ao tipo de item (via Crafting ou dropada por monstros Elite em Mystic Bags). Em seguida, compre os Arcane Orbs com o NPC Alexander em Edron.'
                      : 'Obtain the matching Mystic Rune for your item type (via Crafting or from Elite monsters in Mystic Bags). Then purchase Arcane Orbs from Alexander in Edron.',
                  },
                  {
                    step: 2,
                    title: language === 'pt' ? 'Encantar o Equipamento' : 'Enchant the Equipment',
                    description: language === 'pt'
                      ? 'Dê Use na Mystic Rune e clique sobre o item desejado. A taxa de sucesso é calculada pela média dos atributos disponíveis para o item. Usar o Grand Arcane Orb adiciona +50% de bônus sobre a chance final.'
                      : 'Use the Mystic Rune onto the target item. Success chance is the average of all available attributes for that item. Using a Grand Arcane Orb grants a +50% boost to the final chance.',
                  },
                  {
                    step: 3,
                    title: language === 'pt' ? 'Remoção / Reciclagem de Atributos' : 'Attribute Removal / Recycling',
                    description: language === 'pt'
                      ? 'Se quiser resetar ou trocar os atributos, utilize uma Fiery Stone no item para destruir o encantamento. O processo gera Pulverized Ores, que são matéria-prima para criar novas Mystic Runes.'
                      : 'To reset or change attributes, use a Fiery Stone on the item to destroy the enchantment. This yields Pulverized Ores, used to craft fresh Mystic Runes.',
                  },
                ]}
              />

              <NoticeCard type="warning" title={language === 'pt' ? 'Risco Crítico de Perda ao Morrer' : 'Critical Death Loss Risk'}>
                {language === 'pt' ? (
                  <>
                    Ao morrer, cada equipamento com atributo equipado possui <strong>20% de chance de quebrar permanentemente o encantamento</strong>. 
                    Para proteger seus itens contra essa quebra, adquira a bênção <strong>"The Arcane Guardian"</strong> com os NPCs{' '}
                    <MapLink poiId="eremo" showCoords>Eremo</MapLink> ou{' '}
                    <MapLink poiId="humphrey" showCoords>Humphrey</MapLink>. 
                    Essa bênção dura 10 dias de combate ativo (o tempo decai 10% mais rápido para cada atributo adicional equipado).
                  </>
                ) : (
                  <>
                    On death, each attributed item has a <strong>20% chance to completely break its enchantment</strong>. 
                    To protect your items, purchase <strong>"The Arcane Guardian"</strong> bless from NPCs{' '}
                    <MapLink poiId="eremo" showCoords>Eremo</MapLink> or{' '}
                    <MapLink poiId="humphrey" showCoords>Humphrey</MapLink>. 
                    This bless lasts for 10 days of active combat (decays 10% faster per equipped attribute).
                  </>
                )}
              </NoticeCard>

              {/* Attributes Search & Table */}
              <div className="space-y-4 pt-6 border-t border-medieval-gold/20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider">
                    {language === 'pt' ? 'Tabela Oficial de Atributos (50 Efeitos)' : 'Official Attributes Table (50 Effects)'}
                  </h3>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input 
                      type="text" 
                      placeholder={language === 'pt' ? 'Filtrar atributo...' : 'Filter attribute...'}
                      value={attrFilter}
                      onChange={(e) => setAttrFilter(e.target.value)}
                      className="w-full bg-black/60 border border-medieval-gold/20 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-medieval-gold"
                    />
                  </div>
                </div>

                <div className="bg-black/60 border border-medieval-gold/20 rounded-xl overflow-hidden shadow-xl max-h-96 overflow-y-auto custom-scrollbar">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#181818] text-medieval-gold uppercase tracking-wider sticky top-0 border-b border-medieval-gold/30">
                      <tr>
                        <th className="px-4 py-3">{language === 'pt' ? 'Nome do Atributo' : 'Attribute Name'}</th>
                        <th className="px-4 py-3">{language === 'pt' ? 'Categoria' : 'Category'}</th>
                        <th className="px-4 py-3">{language === 'pt' ? 'Efeito / Fórmula' : 'Effect / Formula'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {filtered.map((attr, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-2.5 font-bold text-white">{attr.name}</td>
                          <td className="px-4 py-2.5 text-stone-400">
                            <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10 text-[10px]">
                              {attr.type}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-emerald-300 font-mono text-[11px]">{attr.effect}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // -------------------------------------------------------------
  // 3. EXALTATION FORGE (CHANGELOG DISCORD 03/08)
  // -------------------------------------------------------------
  const renderExaltationForge = () => (
    <motion.div
      key="forge-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 flex items-center gap-3">
                <Hammer className="w-7 h-7 text-amber-500" />
                Exaltation Forge
              </h2>
              <p className="text-sm text-medieval-muted/80 font-mono italic">
                {language === 'pt' 
                  ? 'Guia oficial e completo de Tiers, Fusão, Cristais de Proteção, Convergência e Transcendência.'
                  : 'Official comprehensive guide to Tiers, Fusion, Protection Crystals, Convergence, and Transcendence.'}
              </p>
            </div>
            <img 
              src="/images/miracle/features/8354.gif" 
              alt="Exaltation Forge Core" 
              className="w-12 h-12 object-contain rounded bg-black/60 border border-amber-500/40 p-2 shadow-lg self-center sm:self-auto" 
            />
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <PrerequisitesCard
              language={language}
              title={language === 'pt' ? 'Onde Encontrar e Requisitos' : 'Location & Requirements'}
              items={[
                {
                  label: language === 'pt' ? 'Objeto da Forja' : 'Forge Object',
                  value: language === 'pt' ? 'Exaltation Chest (encontrado em Dwacatra ou comprado na Store)' : 'Exaltation Chest (found in Dwacatra or bought in Store)',
                },
                {
                  label: language === 'pt' ? 'Itens Elegíveis' : 'Eligible Items',
                  value: language === 'pt' ? 'Equipamentos com Classificação (começam no Tier 0)' : 'Classified equipment (starts at Tier 0)',
                },
                {
                  label: 'Reagent Crystal',
                  value: language === 'pt' ? 'Obtido minerando Shrine Stones (usado sobre o Exaltation Chest)' : 'Obtained by mining Shrine Stones (used on Exaltation Chest)',
                },
                {
                  label: language === 'pt' ? 'Moeda de Troca' : 'Currency',
                  value: 'Gold Coins + Crests + Exalted Cores',
                },
              ]}
            />

            {/* FUSION */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xl font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 border-b border-amber-500/20 pb-2">
                <Flame className="w-5 h-5 text-amber-400" />
                1. {language === 'pt' ? 'Fusão (Fusion) - Subir Tiers' : 'Fusion - Elevating Tiers'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                {language === 'pt'
                  ? 'A Fusão é o método para aumentar o Tier de um equipamento através do Exaltation Chest. Quando a fusão é bem-sucedida, um novo item com o próximo Tier é criado. A chance de sucesso e os custos variam conforme a classificação do item.'
                  : 'Fusion elevates equipment tiers inside the Exaltation Chest. When successful, an item of the next tier is created. Success rate and costs depend on item classification.'}
              </p>

              <StepList
                language={language}
                title={language === 'pt' ? 'Como Realizar a Fusão' : 'How to Perform Fusion'}
                steps={[
                  {
                    step: 1,
                    title: language === 'pt' ? 'Itens Idênticos' : 'Identical Items',
                    description: language === 'pt'
                      ? 'Coloque 2 itens estritamente idênticos (mesmo equipamento e mesmo Tier atual) dentro do Exaltation Chest.'
                      : 'Place 2 strictly identical items (same equipment and exact same Tier) into the Exaltation Chest.',
                  },
                  {
                    step: 2,
                    title: language === 'pt' ? 'Recursos Necessários' : 'Required Resources',
                    description: language === 'pt'
                      ? 'Junte a quantidade requerida de Gold Coins e Crests dentro do inventário/baú conforme a classe do item.'
                      : 'Include the required Gold Coins and Crests according to the item class.',
                  },
                  {
                    step: 3,
                    title: language === 'pt' ? 'Iniciar o Ritual' : 'Trigger the Ritual',
                    description: language === 'pt'
                      ? 'Dê "Use" em um Reagent Crystal (minerado em Shrine Stones) e clique diretamente sobre o Exaltation Chest.'
                      : 'Use a Reagent Crystal (mined from Shrine Stones) directly onto the Exaltation Chest.',
                  },
                ]}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div className="bg-black/60 p-3.5 rounded-lg border border-amber-500/30">
                  <h4 className="text-amber-300 font-bold text-xs uppercase mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Cristais de Chance de Sucesso
                  </h4>
                  <ul className="text-xs space-y-1 text-stone-300">
                    <li>• <strong>Rare Crystal:</strong> +30% de chance de sucesso de fusão (usar dentro do baú).</li>
                    <li>• <strong>Prismatic Crystal:</strong> +50% de chance de sucesso de fusão (usar dentro do baú).</li>
                  </ul>
                </div>

                <div className="bg-black/60 p-3.5 rounded-lg border border-sky-500/30">
                  <h4 className="text-sky-300 font-bold text-xs uppercase mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-400" /> Pedras de Proteção de Atributos e Quebra
                  </h4>
                  <ul className="text-xs space-y-1 text-stone-300">
                    <li>• <strong>Earth Stone:</strong> Encanta com <em>Earth Guard</em> (15m). Preserva os atributos já encantados do item para aplicá-los ao novo item do próximo tier.</li>
                    <li>• <strong>Frozen Stone:</strong> Encanta com <em>Frozen Guard</em> (15m). Se a fusão falhar, o item <strong>não é destruído</strong> (se for Tier 0) e a chance de rebaixar de tier (downgrade) é reduzida em <strong>-50%</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CONVERGENCE */}
            <div className="space-y-3 pt-6">
              <h3 className="text-xl font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2 border-b border-sky-500/20 pb-2">
                <RefreshCw className="w-5 h-5 text-sky-400" />
                2. {language === 'pt' ? 'Convergência (Convergence) - Transferência Segura de Tier' : 'Convergence - Tier Transfer'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                {language === 'pt'
                  ? 'Itens com Classificação 4 ou superior podem transferir seu Tier para outro item da mesma ou menor classificação através da Convergência. Esse processo tem 100% de taxa de sucesso!'
                  : 'Items of Classification 4 or higher can transfer their Tier to another item of equal or lower classification. This process has 100% success rate!'}
              </p>

              <div className="bg-black/60 p-4 rounded-lg border border-sky-500/30 space-y-2 text-xs text-stone-300">
                <p className="font-bold text-sky-300 text-sm">Regras Obrigatórias da Convergência:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>O baú deve conter <strong>exatamente 2 equipamentos</strong>: um deles deve ser <strong>Tier 0</strong> e o outro deve ter <strong>Tier 2 ou superior</strong>.</li>
                  <li>Um <strong>Convergence Crystal</strong> deve estar colocado dentro do Exaltation Chest.</li>
                  <li>Quantidade necessária de <strong>Exalted Cores</strong> e <strong>Gold Coins</strong> (varia conforme classe e tier).</li>
                  <li>Para iniciar, dê "Use" em um <strong>Reagent Crystal</strong> no Exaltation Chest.</li>
                  <li><strong>Resultado garantido (100%):</strong> O item de maior tier transfere seu nível de tier menos um (ex: um item Tier 3 transfere Tier 2 para o item de destino).</li>
                </ul>
              </div>
            </div>

            {/* TRANSCENDENCE */}
            <div className="space-y-3 pt-6">
              <h3 className="text-xl font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                3. {language === 'pt' ? 'Transcendência (Transcendence) - Quebra de Limites' : 'Transcendence - Breaking Limits'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                {language === 'pt'
                  ? 'A Transcendência é um estado supremo em que o equipamento supera seus limites, potencializando os atributos já encantados nele por um período. Quanto maior o Tier do item, mais fortes se tornam esses atributos. Cada equipamento pode ativar no máximo 3 tipos simultâneos de transcendência.'
                  : 'Transcendence boosts already-enchanted attributes on the item. Each item can activate at most 3 simultaneous types of transcendence.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    name: 'Dominion',
                    color: 'text-red-400',
                    border: 'border-red-500/30',
                    gem: 'Red Gem + Small Rubies + Exalted Cores',
                    desc: 'Aumenta Attack, Life Leech, Burning, Fire Dmg, Armor, Health Regen, Absorb Health, Protect Fire, Reflect Fire, Protect Life Drain.'
                  },
                  {
                    name: 'Bastion',
                    color: 'text-blue-400',
                    border: 'border-blue-500/30',
                    gem: 'Blue Gem + Small Sapphires + Exalted Cores',
                    desc: 'Aumenta Defense, Mana Leech, Freeze, Ice Dmg, Mana Regen, Absorb Mana, Protect Ice, Reflect Ice.'
                  },
                  {
                    name: 'Sorcery',
                    color: 'text-purple-400',
                    border: 'border-purple-500/30',
                    gem: 'Violet Gem + Small Amethyst + Exalted Cores',
                    desc: 'Aumenta Magic Level, Electrify, Energy Dmg, Max Mana, Mana Healing, Protect Energy, Reflect Energy, Protect Mana Drain.'
                  },
                  {
                    name: 'Mastery',
                    color: 'text-emerald-400',
                    border: 'border-emerald-500/30',
                    gem: 'Green Gem + Small Emeralds + Exalted Cores',
                    desc: 'Aumenta Skills (Axe, Club, Sword, Distance, Shielding), Poison, Poison Dmg, Max Health, Healing, Protect Poison, Reflect Poison.'
                  },
                  {
                    name: 'Focus',
                    color: 'text-yellow-400',
                    border: 'border-yellow-500/30',
                    gem: 'Yellow Gem + Small Topaz + Exalted Cores',
                    desc: 'Aumenta Critical Hit/Spell, Perfuration, Crushing Blow, Attack Interval, Hit Chance, Physical Dmg, Physical Protection, Reflect Physical, Momentum, Mitigation.'
                  },
                  {
                    name: 'Supremacy',
                    color: 'text-pink-400',
                    border: 'border-pink-500/30',
                    gem: 'Rainbow Gem + Small Diamond + Exalted Cores',
                    desc: 'Aumenta Speed, Dodge, Vibrancy, Double Bash, Bleeding, Berserk, Destruction, Death Dmg, Protect Death, Protect Elements, Reflect Elements.'
                  }
                ].map((trans) => (
                  <div key={trans.name} className={`bg-black/60 p-3.5 rounded-lg border ${trans.border} flex flex-col justify-between`}>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className={`font-black text-sm uppercase tracking-wider ${trans.color}`}>{trans.name}</span>
                        <Sparkles className={`w-3.5 h-3.5 ${trans.color}`} />
                      </div>
                      <p className="text-[11px] text-stone-300 leading-snug">{trans.desc}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-medieval-gold font-mono">
                      <strong>Requisitos:</strong> {trans.gem}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black/80 p-4 rounded-lg border border-red-500/30 space-y-2 mt-4 text-xs text-stone-300">
                <p className="font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" /> Como Remover ou Perder Transcendências:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Black Gem:</strong> Remove todas as transcendências do item, mantendo os atributos encantados normais 100% preservados.</li>
                  <li><strong>Fiery Stone:</strong> Destrói tanto as transcendências quanto todos os atributos encantados do item (reseta completamente).</li>
                  <li><strong>Morte sem Bless:</strong> Se o personagem morrer sem a bênção <em>The Arcane Guardian</em> e perder os atributos encantados, todas as transcendências ativas serão perdidas instantaneamente.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 4. PLAYER SHOP (MERCADO OFFLINE - COMPLETO COM PRINTS)
  // -------------------------------------------------------------
  const renderPlayerShop = () => (
    <motion.div
      key="shop-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 flex items-center gap-3">
                <ShoppingBag className="w-7 h-7 text-emerald-400" />
                {language === 'pt' ? 'Player Shop (Mercado Offline)' : 'Player Shop (Offline Market)'}
              </h2>
              <p className="text-sm text-medieval-muted/80 font-mono italic">
                {language === 'pt' 
                  ? 'Como comprar a licença, configurar a loja in-game e vender itens enquanto estiver deslogado.'
                  : 'How to buy the license, configure the in-game shop, and sell items while offline.'}
              </p>
            </div>
            <img 
              src="/images/miracle/features/playershop.png" 
              alt="Player Shop" 
              className="max-h-20 object-contain rounded border border-emerald-500/30 p-1 bg-black/60 shadow-lg self-center sm:self-auto" 
            />
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <PrerequisitesCard
              language={language}
              title={language === 'pt' ? 'Requisitos Obrigatórios' : 'Mandatory Requirements'}
              items={[
                {
                  label: language === 'pt' ? 'Item de Licença' : 'License Item',
                  value: 'Private Store Document (10 Miracle Points na Store)',
                },
                {
                  label: language === 'pt' ? 'Duração da Loja' : 'Shop Duration',
                  value: '48 horas de funcionamento por documento',
                },
                {
                  label: language === 'pt' ? 'Localização Permitida' : 'Allowed Location',
                  value: language === 'pt' ? 'Dentro de Protection Zone (PZ) com os 8 SQMs ao redor vazios' : 'Inside Protection Zone (PZ) with 8 adjacent SQMs empty',
                },
                {
                  label: language === 'pt' ? 'Taxa de Transação (Fee)' : 'Transaction Fee',
                  value: '5% retido pelo servidor sobre cada venda',
                },
              ]}
            />

            <StepList
              language={language}
              title={language === 'pt' ? 'Passo a Passo: Como Abrir sua Loja' : 'Step-by-Step: Opening Your Shop'}
              steps={[
                {
                  step: 1,
                  title: language === 'pt' ? 'Comprar o Private Store Document' : 'Purchase Private Store Document',
                  description: language === 'pt'
                    ? 'No cliente do jogo, clique no botão azul "Store" (localizado abaixo do inventário à direita). Navegue até a categoria "Utilities", selecione o item "Private Store Document" (10 Miracle Points) e clique em "Buy Now!".'
                    : 'Click the blue "Store" button in the client under inventory. Go to Utilities tab, select "Private Store Document" (10 Points) and buy it.',
                },
                {
                  step: 2,
                  title: language === 'pt' ? 'Ativar a Licença no Personagem' : 'Activate the Document',
                  description: language === 'pt'
                    ? 'Com o documento na sua backpack, clique nele com o botão direito e dê "Use" no seu próprio personagem. Seu personagem agora tem o direito de abrir uma loja de comércio pelas próximas 48 horas.'
                    : 'Right-click the document in your backpack and use it on your character. Grants the right to open a commerce store for 48 hours.',
                },
                {
                  step: 3,
                  title: language === 'pt' ? 'Posicionar o Personagem na PZ' : 'Position in Protection Zone',
                  description: language === 'pt'
                    ? 'Vá até uma área de Protection Zone (PZ) comercial. Importante: certifique-se de que não haja nenhum objeto, item ou criatura nos 8 SQMs imediatamente em volta do seu personagem.'
                    : 'Stand in a commercial Protection Zone. Ensure all 8 surrounding SQMs are strictly empty.',
                },
                {
                  step: 4,
                  title: language === 'pt' ? 'Abrir o Menu "Open Shop"' : 'Right-click Character -> Open Shop',
                  description: language === 'pt'
                    ? 'Clique com o botão direito sobre o seu próprio personagem e selecione a opção "Open Shop" no menu de contexto.'
                    : 'Right-click your own character sprite and select "Open Shop" from the context menu.',
                },
                {
                  step: 5,
                  title: language === 'pt' ? 'Configurar Itens, Preços e Descrição' : 'Setup Items, Prices and Description',
                  description: language === 'pt'
                    ? 'Arraste os itens que deseja vender (eles DEVEM estar na sua backpack, nunca equipados no corpo). Selecione o item, defina a quantidade e o preço unitário (Price un). Clique em "Edit Description" para dar um nome chamativo para sua banca.'
                    : 'Drag items from your backpack into the shop window. Set price per unit and amount. Use "Edit Description" to name your store.',
                },
                {
                  step: 6,
                  title: language === 'pt' ? 'Iniciar a Loja e Ativar Idle Shop (Offline)' : 'Start Shop & Idle Mode',
                  description: language === 'pt'
                    ? 'Clique no botão "Start Shop". Para que a loja continue vendendo enquanto você está deslogado, ative a opção "Idle Shop". Seu personagem permanecerá visível como um vendedor atendendo aos jogadores!'
                    : 'Click "Start Shop". Activate "Idle Shop" to keep the store vending while your client is logged off.',
                },
              ]}
            />

            {/* Screenshots do Sistema */}
            <div className="space-y-3 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-medieval-gold">
                {language === 'pt' ? 'Interface e Telas do Sistema (In-Game)' : 'In-Game System Screenshots'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/60 p-2.5 rounded-lg border border-white/10 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">1. Store: Utilities</span>
                  <img src="/images/miracle/features/store_private_shop.jpg" alt="Store Utilities" className="w-full rounded border border-white/5 object-cover" />
                </div>
                <div className="bg-black/60 p-2.5 rounded-lg border border-white/10 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">2. Menu: Open Shop</span>
                  <img src="/images/miracle/features/open_shop_menu.png" alt="Open Shop Menu" className="w-full rounded border border-white/5 object-cover" />
                </div>
                <div className="bg-black/60 p-2.5 rounded-lg border border-white/10 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">3. Janela de Vendas</span>
                  <img src="/images/miracle/features/player_shop_window.jpg" alt="Player Shop Window" className="w-full rounded border border-white/5 object-cover" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <NoticeCard type="warning" title={language === 'pt' ? 'Regras de Conta & Multi-Clienting' : 'Account & Multi-Client Rules'}>
                {language === 'pt'
                  ? 'Enquanto seu personagem estiver em Idle Shop, você NÃO poderá logar outro personagem da MESMA conta. No entanto, é totalmente autorizado jogar normalmente com outra conta secundária (não será considerado MC ilegal).'
                  : 'While a character is in Idle Shop, you cannot login another character from the same account. However, playing on another separate account is 100% allowed.'}
              </NoticeCard>

              <NoticeCard type="info" title={language === 'pt' ? 'Server Save & Reinício Diário' : 'Daily Server Save Reset'}>
                {language === 'pt'
                  ? 'No Server Save diário o servidor reseta completamente todas as lojas ativas por questões de manutenção. Portanto, após o Server Save, basta logar e clicar novamente em Open Shop para restabelecer suas vendas.'
                  : 'At daily Server Save, all active shops are automatically closed. Simply log back in after SS and reopen your shop.'}
              </NoticeCard>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 5. HOUSES & BED REGENERATION (SISTEMA DE BIDS & MOVE OUT)
  // -------------------------------------------------------------
  const renderHousesLands = () => (
    <motion.div
      key="houses-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 flex items-center gap-3">
              <Home className="w-7 h-7 text-amber-400" />
              {language === 'pt' ? 'Casas, Terrenos & Camas' : 'Houses, Lands & Bed Regeneration'}
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Como arrematar casas em leilão no site, transferir com segurança pelo Move Out e magias de gerenciamento in-game.'
                : 'How to bid on houses on the website, transfer securely via Move Out, and in-game house management spells.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <PrerequisitesCard
              language={language}
              title={language === 'pt' ? 'Valores e Tarifas Oficiais' : 'Official Rates & Pricing'}
              items={[
                {
                  label: language === 'pt' ? 'Preço Base' : 'Base Price',
                  value: '200 gp / sqm + 1.000 gp / cama (bed)',
                },
                {
                  label: language === 'pt' ? 'Aluguel (Rent)' : 'Rent Fee',
                  value: language === 'pt' ? '30% do valor da casa debitado da conta bancária a cada 15 dias' : '30% of house price deducted from bank every 15 days',
                },
                {
                  label: language === 'pt' ? 'Duração do Leilão' : 'Auction Duration',
                  value: language === 'pt' ? '2 dias a partir do 1º lance (encerra no Server Save do 2º dia)' : '2 days from 1st bid (ends at 2nd day Server Save)',
                },
                {
                  label: language === 'pt' ? 'Limite por Conta' : 'Account Limit',
                  value: language === 'pt' ? 'Máximo de 2 personagens dormindo em camas por conta' : 'Maximum of 2 sleepers per account',
                },
              ]}
            />

            {/* COMO COMPRAR POR LEILÃO */}
            <StepList
              language={language}
              title={language === 'pt' ? 'Como Comprar uma Casa (Sistema de Bids no Site)' : 'How to Buy a House (Website Bids)'}
              steps={[
                {
                  step: 1,
                  title: language === 'pt' ? 'Acessar a Página de Casas no Site' : 'Navigate to Houses on Site',
                  description: language === 'pt'
                    ? 'Faça login na sua conta no site oficial do Miracle (miracle74.com/?subtopic=houses), filtre pela cidade desejada e localize as casas livres ou que estão em leilão.'
                    : 'Log in to your account on the official Miracle website, filter by city, and browse free or auctioned houses.',
                },
                {
                  step: 2,
                  title: language === 'pt' ? 'Realizar o Lance (Bid)' : 'Submit Your Bid',
                  description: language === 'pt'
                    ? 'Insira o seu lance em Gold Coins. A partir do primeiro lance dado, o leilão tem duração estrita de 2 dias e encerra exatamente no Server Save do 2º dia. Quem tiver o maior lance fica com a casa.'
                    : 'Enter your bid in gold coins. The auction lasts 2 days from the first bid, ending strictly at the 2nd day Server Save. Highest bidder wins.',
                },
                {
                  step: 3,
                  title: language === 'pt' ? 'Obrigatório: Dinheiro no Banco' : 'Mandatory: Funds in Bank',
                  description: language === 'pt'
                    ? 'ATENÇÃO: Você DEVE manter o valor total do seu lance mais o valor do primeiro aluguel depositados no BANCO do jogo (não na mochila!). No momento do Server Save, o sistema debita automaticamente do banco. Sem saldo, a compra é cancelada.'
                    : 'IMPORTANT: You must keep the full bid amount plus the first rent fee in your in-game BANK (not backpack). Debited at Server Save automatically.',
                },
              ]}
            />

            {/* COMO TRANSFERIR POR MOVE OUT */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
                {language === 'pt' ? 'Como Vender / Transferir Casas com Segurança (Move Out)' : 'How to Safely Transfer Houses (Move Out)'}
              </h3>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="space-y-3 flex-1 text-xs sm:text-sm">
                  <p>
                    {language === 'pt'
                      ? 'No Miracle, transferências de casas entre jogadores são feitas com 100% de segurança diretamente pelo site, evitando qualquer golpe ou roubo in-game:'
                      : 'House transfers between players are handled safely directly on the website, preventing any in-game scams:'}
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>O dono da casa faz login no site do Miracle e navega até a página da sua casa.</li>
                    <li>Clica no botão <strong>"Move Out"</strong>.</li>
                    <li>Define o <strong>Nick exato do jogador comprador</strong>, o <strong>valor acordado em gold</strong> e confirma com a senha da conta.</li>
                    <li>O comprador deve ter o dinheiro acordado depositado no <strong>Banco do jogo</strong>. <em>Nunca pague nada em mãos in-game!</em></li>
                    <li>No próximo Server Save, o sistema transfere a propriedade e credita o gold direto no banco do vendedor.</li>
                  </ol>
                </div>
                <div className="w-full md:w-80 bg-black/60 p-2 rounded-lg border border-medieval-gold/30 shrink-0">
                  <img src="/images/miracle/features/house_move_out.png" alt="Move Out House Transfer" className="w-full rounded" />
                  <p className="text-[10px] text-center text-gray-400 mt-1 font-mono">Página da casa com botão Move Out no site</p>
                </div>
              </div>
            </div>

            {/* MAGIAS DE CASA (SEM COMANDO !) */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
                {language === 'pt' ? 'Magias e Comandos de Gerenciamento In-Game' : 'In-Game House Spells'}
              </h3>

              <NoticeCard type="warning" title={language === 'pt' ? 'Comandos com ! Não Existem Mais' : '! Commands No Longer Exist'}>
                {language === 'pt'
                  ? 'Comandos legados de chat como !buyhouse, !sellhouse ou !leave não existem mais no Miracle. Toda a gestão de compra e venda é no site, e as permissões de portas e convidados são feitas exclusivamente através das palavras mágicas abaixo:'
                  : 'Legacy chat commands such as !buyhouse or !leave are obsolete. All purchase/trade is done on site, and door/guest permissions use the magic spells below:'}
              </NoticeCard>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                  <span className="font-mono text-medieval-gold font-bold text-sm block mb-1">aleta grav</span>
                  <p className="text-xs text-stone-300">
                    {language === 'pt'
                      ? 'Fique de frente para uma porta e diga a magia para editar a lista de quem pode abrir e fechar aquela porta específica.'
                      : 'Face a door to edit permissions of who can open and close that specific door.'}
                  </p>
                </div>

                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                  <span className="font-mono text-medieval-gold font-bold text-sm block mb-1">aleta sio</span>
                  <p className="text-xs text-stone-300">
                    {language === 'pt'
                      ? 'Diga dentro da casa para editar a lista de convidados gerais (Guests) autorizados a entrar na sua residência.'
                      : 'Say inside house to edit the guest list allowed to enter your residence.'}
                  </p>
                </div>

                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                  <span className="font-mono text-medieval-gold font-bold text-sm block mb-1">aleta som</span>
                  <p className="text-xs text-stone-300">
                    {language === 'pt'
                      ? 'Edita a lista de Sub-Donos (Sub-owners), que possuem autorização para invitar outros amigos e modificar portas.'
                      : 'Edits the Sub-owners list, who can invite others and modify door permissions.'}
                  </p>
                </div>

                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                  <span className="font-mono text-red-400 font-bold text-sm block mb-1">alana grav</span>
                  <p className="text-xs text-stone-300">
                    {language === 'pt'
                      ? 'Expulsa qualquer jogador que estiver pisando exatamente sobre a soleira da porta trancada para o lado de fora.'
                      : 'Kicks any player standing on the door tile to the outside.'}
                  </p>
                </div>

                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10 sm:col-span-2">
                  <span className="font-mono text-red-400 font-bold text-sm block mb-1">alana sio "NomeDoJogador"</span>
                  <p className="text-xs text-stone-300">
                    {language === 'pt'
                      ? 'Kicka imediatamente um jogador invasor para fora da casa (use o nome entre aspas caso tenha espaços).'
                      : 'Immediately kicks an unwanted player out of the house (use quotes for names with spaces).'}
                  </p>
                </div>
              </div>
            </div>

            {/* CAMAS */}
            <div className="space-y-3 pt-4">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
                {language === 'pt' ? 'Como Funciona a Cama (Bed Regeneration)' : 'How Bed Regeneration Works'}
              </h3>

              <p className="text-xs sm:text-sm">
                {language === 'pt'
                  ? 'Dormir em uma cama na sua casa permite que seu personagem regenere Vida e Mana enquanto você está deslogado. Isso é essencial para magos e druidas que fazem runas (Bed Making Runes).'
                  : 'Sleeping in a bed inside your house regenerates Health and Mana while offline. Crucial for mages crafting runes overnight (Bed Making Runes).'}
              </p>

              <NoticeCard type="tip" title={language === 'pt' ? 'Fórmula de Regeneração da Cama' : 'Bed Regeneration Formula'}>
                <div className="space-y-2 text-xs">
                  <p>
                    <strong>{language === 'pt' ? 'Taxa:' : 'Rate:'}</strong> {language === 'pt' ? '1 HP e 1 Mana por minuto.' : '1 HP and 1 Mana per minute.'}
                  </p>
                  <p>
                    <strong>{language === 'pt' ? 'Limite Máximo:' : 'Maximum Limit:'}</strong> {language === 'pt' ? 'Até 5x o tempo da comida consumida antes de dormir. Certifique-se de alimentar bem seu personagem antes de dar "Use" na cama!' : 'Up to 5x the duration of the food eaten before sleeping. Feed your character well before using the bed!'}
                  </p>
                  <p>
                    <strong>{language === 'pt' ? 'Limite por Conta:' : 'Account Limit:'}</strong> {language === 'pt' ? 'Máximo de 2 personagens dormindo simultaneamente por conta.' : 'Maximum 2 sleepers per account.'}
                  </p>
                </div>
              </NoticeCard>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 6. TRAINING WEAPONS
  // -------------------------------------------------------------
  const renderTrainingWeapons = () => (
    <motion.div
      key="training-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2 flex items-center gap-3">
                <Sword className="w-7 h-7 text-sky-400" />
                {language === 'pt' ? 'Armas de Treino (Training Weapons)' : 'Training Weapons Guide'}
              </h2>
              <p className="text-sm text-medieval-muted/80 font-mono italic">
                {language === 'pt' 
                  ? 'Como treinar Skills e Magic Level com bonecos de treino (Dummies) e armas especiais.'
                  : 'How to train Skills and Magic Level using exercise dummies and special training weapons.'}
              </p>
            </div>
            <img 
              src="/images/miracle/items/training_sword_7481.gif" 
              alt="Training Sword" 
              className="w-12 h-12 object-contain rounded bg-black/60 border border-sky-500/30 p-1 shadow-lg self-center sm:self-auto" 
            />
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <PrerequisitesCard
              language={language}
              title={language === 'pt' ? 'Onde Comprar e Requisitos' : 'Purchasing & Requirements'}
              items={[
                {
                  label: language === 'pt' ? 'Vendedor Principal' : 'Primary Vendor',
                  value: (
                    <span>
                      {language === 'pt' ? 'NPC ' : 'NPC '}
                      <MapLink poiId="sam" showCoords>
                        Sam em Thais
                      </MapLink>
                    </span>
                  ),
                },
                {
                  label: language === 'pt' ? 'Tipos de Armas' : 'Weapon Types',
                  value: 'Training Sword, Training Axe, Training Club, Training Spear, Training Rod/Wand',
                },
                {
                  label: language === 'pt' ? 'Alvo de Treino' : 'Training Target',
                  value: language === 'pt' ? 'Dummies de treino nas áreas de treino ou em casas' : 'Training dummies in training zones or houses',
                },
              ]}
            />

            <StepList
              language={language}
              title={language === 'pt' ? 'Como Utilizar' : 'How to Use'}
              steps={[
                {
                  step: 1,
                  title: language === 'pt' ? 'Adquira a Arma Correspondente' : 'Buy the Matching Weapon',
                  description: language === 'pt'
                    ? 'Compre a arma de treino voltada para o seu atributo desejado (espada, machado, clava, distância, escudo ou magia) no NPC Sam em Thais ou através da Store.'
                    : 'Purchase the training weapon tailored to your skill (sword, axe, club, distance, shield, or magic) from NPC Sam in Thais or via Store.',
                },
                {
                  step: 2,
                  title: language === 'pt' ? 'Posicione-se em frente ao Dummy' : 'Stand before an Exercise Dummy',
                  description: language === 'pt'
                    ? 'Fique adjacente ao boneco de treino na área de treinamento público das cidades ou no dummy privado da sua casa.'
                    : 'Stand adjacent to an exercise dummy in the training area or inside your private house.',
                },
                {
                  step: 3,
                  title: language === 'pt' ? 'Ativar o Treino Contínuo' : 'Activate Continuous Training',
                  description: language === 'pt'
                    ? 'Dê Use na arma de treino e clique sobre o dummy. Seu personagem começará a desferir golpes automaticamente consumindo as cargas da arma e avançando o skill.'
                    : 'Use the training weapon on the dummy. Your character strikes continuously, consuming charges to advance skills.',
                },
              ]}
            />

            {/* Categorias e Tiers de Armas de Treino */}
            <div className="space-y-3 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-medieval-gold">
                {language === 'pt' ? 'Os 5 Tiers de Armas de Treino em Miracle' : 'The 5 Training Weapon Tiers'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { name: 'Regular', color: 'text-stone-300', border: 'border-white/10', desc: 'Armas convencionais com taxa base de cargas.' },
                  { name: 'Spark', color: 'text-amber-400', border: 'border-amber-500/30', desc: 'Versão aprimorada com carga elétrica.' },
                  { name: 'Lightning', color: 'text-sky-400', border: 'border-sky-500/30', desc: 'Maior velocidade e intensidade de treino.' },
                  { name: 'Inferno', color: 'text-red-400', border: 'border-red-500/30', desc: 'Armas de fogo de alta eficiência para treinos avançados.' },
                  { name: 'Shadow', color: 'text-purple-400', border: 'border-purple-500/30', desc: 'Tier supremo de treino para máximo rendimento.' },
                ].map((tier) => (
                  <div key={tier.name} className={`bg-black/60 p-3 rounded-lg border ${tier.border} flex flex-col justify-between`}>
                    <span className={`font-bold text-xs uppercase ${tier.color}`}>{tier.name}</span>
                    <p className="text-[11px] text-stone-400 mt-1">{tier.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <NoticeCard type="tip" title={language === 'pt' ? 'Integração com a Profissão de Alquimia' : 'Alchemy Integration'}>
              {language === 'pt'
                ? 'A profissão de Alquimia (Alchemy) produz poções e catalisadores especiais que podem acelerar o ganho de experiência de skills durante o treino, além de preparar essências e óleos utilizados no refino de equipamentos e armas especiais.'
                : 'Alchemy produces special potions and catalysts boosting skill progression rates during training, as well as refining oils and essences.'}
            </NoticeCard>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // RENDER SPAWN & DEMONIC ESSENCES
  // -------------------------------------------------------------
  const renderSpawnDemonic = () => (
    <motion.div
      key="spawn-demonic-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              Spawn & Demonic Essences
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Entenda a dinâmica do respawn no Miracle e aprenda a otimizar suas hunts com Spawn e Demonic Essences.'
                : 'Understand the respawn dynamics in Miracle and learn to optimize your hunts with Spawn and Demonic Essences.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? 'O Funcionamento do Respawn (Base)' : 'How Respawn Works (Base)'}
            </h3>
            
            <p>
              {language === 'pt'
                ? 'No Miracle, o tempo de respawn dos monstros não é aleatório a cada abate, mas sim um valor fixo por "spot" (ponto de nascimento), variando geralmente entre 195 e 390 segundos. Apenas um monstro nasce por spot de cada vez, e spots próximos são completamente independentes.'
                : 'In Miracle, the monster respawn time is not random after each kill, but rather a fixed value per "spot", usually ranging from 195 to 390 seconds. Only one monster spawns per spot at a time, and nearby spots are completely independent.'}
            </p>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? 'Boost Natural do Servidor' : 'Natural Server Boost'}
            </h3>
            
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300/90 text-sm">
              <li><strong>{language === 'pt' ? '0 a 500 Players:' : '0 to 500 Players:'}</strong> {language === 'pt' ? '-0.05 segundos de redução por player online.' : '-0.05s reduction per online player.'}</li>
              <li><strong>{language === 'pt' ? '501 a 750 Players:' : '501 to 750 Players:'}</strong> {language === 'pt' ? '-0.1 segundos de redução por player extra (Máximo de -50s total).' : '-0.1s reduction per extra player (Max -50s total).'}</li>
              <li><strong>{language === 'pt' ? 'Acima de 750 Players:' : 'Above 750 Players:'}</strong> {language === 'pt' ? 'Não há redução adicional.' : 'No additional reduction.'}</li>
            </ul>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
              Spawn Essences
            </h3>
            
            <p>
              {language === 'pt' ? (
                <>
                  A Spawn Essence é um field roxo que acelera o respawn de uma área. Ela custa 1k gold coins e pode ser comprada no NPC{' '}
                  <MapLink poiId="defeated-whispers" showCoords>
                    Defeated Whispers em Shadowport
                  </MapLink>{' '}
                  (próximo à Bless em Thais).
                </>
              ) : (
                <>
                  The Spawn Essence is a purple field that accelerates the respawn of an area. It costs 1k gold coins and can be bought at NPC{' '}
                  <MapLink poiId="defeated-whispers" showCoords>
                    Defeated Whispers in Shadowport
                  </MapLink>{' '}
                  (near the Bless in Thais).
                </>
              )}
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300/90 text-sm">
              <li><strong>{language === 'pt' ? 'Área de Efeito:' : 'Area of Effect:'}</strong> {language === 'pt' ? 'Raio de 20 SQMs (funciona em todos os andares verticalmente, ex: do +7 ao -7).' : '20 SQMs radius (works across all vertical floors, e.g., from +7 to -7).'}</li>
              <li><strong>{language === 'pt' ? 'Duração:' : 'Duration:'}</strong> {language === 'pt' ? '1 hora no total, dividida em três estágios de força (-10s, -5s, -2.5s).' : '1 hour total, divided into three stages (-10s, -5s, -2.5s).'}</li>
              <li><strong>{language === 'pt' ? 'Limite Máximo:' : 'Maximum Limit:'}</strong> {language === 'pt' ? 'Redução máxima acumulada de 50 segundos por essências.' : 'Maximum stacked respawn reduction of 50 seconds.'}</li>
            </ul>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              Demonic Essences
            </h3>
            
            <p>
              {language === 'pt'
                ? 'A Demonic Essence (field avermelhado) não mexe no tempo de respawn. Ela aumenta em +2% por essência a Força, Defesa, Experiência e Loot Rate dos monstros afetados (máximo de 5 essências = +10% de bônus).'
                : 'The Demonic Essence (reddish field) does not alter respawn times. Instead, it boosts Strength, Defense, Experience, and Loot Rate of affected monsters by +2% per essence (up to 5 essences = +10% max).'}
            </p>

            <NoticeCard type="warning" title={language === 'pt' ? 'Regra Crucial de Spawn' : 'Crucial Spawn Rule'}>
              {language === 'pt'
                ? 'A Demonic Essence só afeta monstros que nascerem (respawnarem) DEPOIS que o field for jogado, e estritamente no spot onde nascem. Lurrar o monstro pra dentro do field não faz efeito.'
                : 'Demonic Essences only affect monsters that spawn AFTER the field is thrown, strictly on their spawn spot. Luring a monster into the field has zero effect.'}
            </NoticeCard>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // SYSTEMS CATALOG LIST
  // -------------------------------------------------------------
  const systems = [
    { 
      id: 'relic_box', 
      name: 'Relic Box', 
      desc: language === 'pt' ? 'Container com 4 slots para relíquias que concedem atributos únicos' : '4-slot container for relics granting unique stats',
      icon: '/images/miracle/features/relicbox.png' 
    },
    { 
      id: 'atributos', 
      name: language === 'pt' ? 'Sistema de Atributos' : 'Attribution System', 
      desc: language === 'pt' ? 'Encantamento com Mystic Runes, 50 atributos e proteção de quebra' : 'Mystic Rune enchantments, 50 attributes, and protection',
      icon: '/images/miracle/features/attrFrames3.jpg' 
    },
    { 
      id: 'exaltation_forge', 
      name: 'Exaltation Forge', 
      desc: language === 'pt' ? 'Fusão de Tiers (1 ao 5), Dust, Slivers e bônus de Transcendência' : 'Tier Fusion (1-5), Dust, Slivers, and Transcendence',
      icon: '/images/miracle/features/8354.gif' 
    },
    { 
      id: 'spawn_demonic', 
      name: 'Spawn & Demonic Essences', 
      desc: language === 'pt' ? 'Fields roxos e vermelhos para acelerar respawns e turbinar XP e loot' : 'Fields to accelerate respawn and boost hunt XP/loot',
      icon: '/images/miracle/features/9476.gif' 
    },
    { 
      id: 'shop_idle', 
      name: language === 'pt' ? 'Player Shop (Mercado Offline)' : 'Player Shop (Offline Vendor)', 
      desc: language === 'pt' ? 'Transforme seu personagem em NPC de comércio nas cidades' : 'Turn your character into an offline trade vendor',
      icon: '/images/miracle/features/playershop.png' 
    },
    { 
      id: 'houses_lands', 
      name: language === 'pt' ? 'Casas, Terrenos & Camas' : 'Houses & Bed Regeneration', 
      desc: language === 'pt' ? 'Custos de compra, aluguel e regeneração de HP/Mana offline em camas' : 'House prices, rent, and passive offline bed regeneration',
      icon: '/images/miracle/features/1385.png' 
    },
    { 
      id: 'armas_treino', 
      name: language === 'pt' ? 'Armas de Treino' : 'Training Weapons', 
      desc: language === 'pt' ? 'Treinamento de Skills e Magic Level com dummies e armas do Sam' : 'Skill and ML training with dummies and weapons from Sam',
      icon: '/images/miracle/items/training_sword_7481.gif' 
    },
  ];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {selectedSystem === 'relic_box' && renderRelicBox()}
        {selectedSystem === 'atributos' && renderAtributos()}
        {selectedSystem === 'exaltation_forge' && renderExaltationForge()}
        {selectedSystem === 'spawn_demonic' && renderSpawnDemonic()}
        {selectedSystem === 'shop_idle' && renderPlayerShop()}
        {selectedSystem === 'houses_lands' && renderHousesLands()}
        {selectedSystem === 'armas_treino' && renderTrainingWeapons()}

        {!selectedSystem && (
          <motion.div
            key="systems-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <header className="text-center relative py-6">
              <div className="absolute inset-0 bg-gradient-to-b from-medieval-gold/5 via-transparent to-transparent blur-3xl rounded-full"></div>
              <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-3 relative drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex items-center justify-center gap-3">
                {language === 'pt' ? 'Sistemas Custom' : 'Custom Systems'}
              </h1>
              <p className="text-medieval-gold/70 font-mono text-xs max-w-2xl mx-auto italic tracking-wide">
                {language === 'pt' 
                  ? 'Guia completo e documentação oficial de todas as mecânicas exclusivas do servidor Miracle 7.4.' 
                  : 'Complete guide and official documentation of all exclusive mechanics in Miracle 7.4.'}
              </p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-medieval-gold/40 to-transparent mx-auto mt-6"></div>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {systems.map((sys) => (
                <button 
                  key={sys.id}
                  onClick={() => setSelectedSystem(sys.id)}
                  className="p-6 text-left group border relative overflow-hidden flex flex-col justify-between min-h-[170px] rounded-xl transition-all duration-300 bg-gradient-to-br from-black/80 to-black/90 border-medieval-gold/20 hover:border-medieval-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:-translate-y-1 cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-black/60 border border-medieval-gold/30 p-1 flex items-center justify-center shadow-md">
                        <img src={sys.icon} alt={sys.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                        {language === 'pt' ? 'Disponível' : 'Available'}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-medieval-gold uppercase group-hover:text-yellow-300 transition-colors">
                      {sys.name}
                    </h3>
                    <p className="text-xs text-stone-300/80 leading-relaxed line-clamp-2">
                      {sys.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-medieval-gold/60 group-hover:text-medieval-gold font-bold uppercase tracking-wider">
                    <span>{language === 'pt' ? 'Acessar Guia' : 'Open Guide'}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CustomSystemsView;
