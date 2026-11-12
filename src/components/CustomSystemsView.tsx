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
  // 3. EXALTATION FORGE
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
                  ? 'Sistema de evolução de equipamentos por Tiers, Fusão, Poeira (Dust), Slivers e bônus de Transcendência.'
                  : 'Equipment tier evolution, Fusion, Dust, Slivers, and Transcendence enhancements system.'}
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
              title={language === 'pt' ? 'Requisitos da Forja' : 'Forge Requirements'}
              items={[
                {
                  label: language === 'pt' ? 'Equipamento Elegível' : 'Eligible Item',
                  value: language === 'pt' ? 'Armas, Armaduras, Elmos e Pernas das Classes 1 a 5' : 'Weapons, Armors, Helmets, Legs in Classes 1-5',
                },
                {
                  label: 'Dust & Slivers',
                  value: language === 'pt' ? 'Obtidos caçando monstros influenciados (Influenced) ou triturando itens' : 'Gained hunting Influenced/Fiendish monsters or melting items',
                },
                {
                  label: language === 'pt' ? 'Taxa em Gold' : 'Gold Fee',
                  value: language === 'pt' ? 'Variável conforme a Classe e o Tier desejado' : 'Varies according to Class and target Tier',
                },
                {
                  label: language === 'pt' ? 'Localização' : 'Location',
                  value: language === 'pt' ? 'Santuário da Exaltation Forge (Kazordoon)' : 'Exaltation Forge Sanctuary (Kazordoon)',
                },
              ]}
            />

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? 'Pilares do Sistema de Forja' : 'Pillars of the Forge System'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/60 p-4 rounded-lg border border-white/10 space-y-2">
                <h4 className="text-amber-400 font-bold uppercase text-xs flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Fusion (Fusão)
                </h4>
                <p className="text-xs text-stone-300">
                  {language === 'pt'
                    ? 'Combine 2 itens idênticos do mesmo Tier pagando Dust, Slivers e Gold para avançar para o próximo Tier (Tier 1 ao 5).'
                    : 'Combine 2 identical items of the same Tier paying Dust, Slivers, and Gold to upgrade to the next Tier.'}
                </p>
              </div>

              <div className="bg-black/60 p-4 rounded-lg border border-white/10 space-y-2">
                <h4 className="text-sky-400 font-bold uppercase text-xs flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Convergence (Convergência)
                </h4>
                <p className="text-xs text-stone-300">
                  {language === 'pt'
                    ? 'Disponível para itens de Classe 4 e 5. Permite converter ou transferir tiers entre itens da mesma classe pagando taxas de essência.'
                    : 'Available for Class 4 & 5 items. Allows tier transfer or conversion within the same class category.'}
                </p>
              </div>

              <div className="bg-black/60 p-4 rounded-lg border border-white/10 space-y-2">
                <h4 className="text-purple-400 font-bold uppercase text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Transcendence (Transcendência)
                </h4>
                <p className="text-xs text-stone-300">
                  {language === 'pt'
                    ? 'Desbloqueia os Enhancements supremos (Dominion, Bastion, Sorcery, Mastery, Focus e Supremacy).'
                    : 'Unlocks supreme enhancements (Dominion, Bastion, Sorcery, Mastery, Focus, and Supremacy).'}
                </p>
              </div>
            </div>

            <NoticeCard type="tip" title={language === 'pt' ? 'Os 6 Enhancements de Tier' : 'The 6 Tier Enhancements'}>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-300">
                <li><strong>Dominion:</strong> {language === 'pt' ? 'Aumenta poder de ataque em armas corpo-a-corpo e paladinos.' : 'Boosts attack power on melee and paladin weapons.'}</li>
                <li><strong>Bastion:</strong> {language === 'pt' ? 'Ativa mitigação de dano massiva em escudos e armaduras pesadas.' : 'Activates massive damage mitigation on shields and heavy armors.'}</li>
                <li><strong>Sorcery:</strong> {language === 'pt' ? 'Aumenta poder mágico e dano de feitiços de Magos e Druidas.' : 'Boosts spell damage and magic power for Sorcerers and Druids.'}</li>
                <li><strong>Mastery, Focus & Supremacy:</strong> {language === 'pt' ? 'Bônus passivos de redução de recarga e chance de ataques duplos.' : 'Passive cooldown reductions and double-trigger chances.'}</li>
              </ul>
            </NoticeCard>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 4. PLAYER SHOP (SHOP IDLE)
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
                  ? 'Transforme seu personagem em um NPC de comércio fixo no mapa enquanto você estiver deslogado.'
                  : 'Transform your character into an offline trading vendor on the map while you are away.'}
              </p>
            </div>
            <img 
              src="/images/miracle/features/playershop.png" 
              alt="Player Shop" 
              className="max-h-20 object-contain rounded border border-emerald-500/30 p-1 bg-black/60 shadow-lg self-center sm:self-auto" 
            />
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              {language === 'pt'
                ? 'O Player Shop é uma mecânica do Miracle que permite criar sua própria loja em áreas comerciais designadas nas cidades. O seu personagem permanece visível no local como um vendedor, atendendo a qualquer jogador que passar e clicar na loja, mesmo com você offline!'
                : 'The Player Shop allows you to establish your own trade store in designated market zones. Your character remains in the game as a merchant NPC, allowing any passing adventurer to browse and purchase your goods while you are offline!'}
            </p>

            <StepList
              language={language}
              title={language === 'pt' ? 'Como Montar a sua Loja' : 'Setting Up Your Store'}
              steps={[
                {
                  step: 1,
                  title: language === 'pt' ? 'Posicione-se em uma Área Comercial' : 'Stand in a Trade Zone',
                  description: language === 'pt'
                    ? 'Vá até um dos depósitos ou praças de comércio autorizadas (ex: praça de Thais, Carlin, Edron).'
                    : 'Navigate to an authorized trading square or depot zone (e.g., Thais, Carlin, Edron market squares).',
                },
                {
                  step: 2,
                  title: language === 'pt' ? 'Abrir a Janela de Loja' : 'Open the Shop Window',
                  description: language === 'pt'
                    ? 'Arraste os itens que deseja vender para a interface da loja e defina a quantidade e o preço unitário em gold coins.'
                    : 'Drag the items you wish to sell into the shop window and set the price and amount in gold coins.',
                },
                {
                  step: 3,
                  title: language === 'pt' ? 'Ativar e Deslogar' : 'Activate & Logout',
                  description: language === 'pt'
                    ? 'Confirme a abertura da loja. O seu personagem assumirá a posição de comerciante. Todo o gold arrecadado é transferido com total segurança diretamente para a sua conta no banco do jogo.'
                    : 'Confirm and activate. Your character assumes vendor mode. All collected gold coins are deposited safely into your bank account.',
                },
              ]}
            />

            <NoticeCard type="info" title={language === 'pt' ? 'Segurança das Vendas' : 'Trade Safety'}>
              {language === 'pt'
                ? 'Os itens colocados na loja ficam protegidos contra roubos ou movimentações externas. Você pode encerrar a loja a qualquer momento simplesmente logando no personagem novamente.'
                : 'Items placed in the shop are completely protected against theft or unauthorized movement. You can close your store anytime simply by logging back in.'}
            </NoticeCard>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 5. HOUSES & BED REGENERATION
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
                ? 'Regras oficiais de compra de casas, aluguel quinzenal e regeneração passiva em camas.'
                : 'Official house purchase rates, biweekly rent, and passive bed regeneration mechanics.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <PrerequisitesCard
              language={language}
              title={language === 'pt' ? 'Valores e Tarifas Oficiais' : 'Official Rates & Pricing'}
              items={[
                {
                  label: language === 'pt' ? 'Preço de Compra' : 'Purchase Price',
                  value: '200 gp / sqm + 1.000 gp / cama (bed)',
                },
                {
                  label: language === 'pt' ? 'Aluguel (Rent)' : 'Rent Fee',
                  value: language === 'pt' ? '30% do valor da casa cobrado a cada 15 dias' : '30% of house price every 15 days',
                },
                {
                  label: language === 'pt' ? 'Limite por Conta' : 'Account Limit',
                  value: language === 'pt' ? 'Máximo de 2 personagens dormindo por conta' : 'Maximum of 2 sleepers per account',
                },
              ]}
            />

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? 'Como Funciona a Cama (Bed Regeneration)' : 'How Bed Regeneration Works'}
            </h3>

            <p>
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
              </div>
            </NoticeCard>
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
                    ? 'Compre a arma de treino voltada para o seu atributo desejado (espada, machado, clava, distância ou magia).'
                    : 'Purchase the training weapon tailored to your skill (sword, axe, club, distance, or magic).',
                },
                {
                  step: 2,
                  title: language === 'pt' ? 'Posicione-se em frente ao Dummy' : 'Stand before an Exercise Dummy',
                  description: language === 'pt'
                    ? 'Fique adjacente ao boneco de treino na escola de treinamento ou no dummy da sua casa.'
                    : 'Stand adjacent to an exercise dummy in the training school or inside your house.',
                },
                {
                  step: 3,
                  title: language === 'pt' ? 'Ativar o Treino' : 'Activate Training',
                  description: language === 'pt'
                    ? 'Dê Use na arma de treino e clique sobre o dummy. Seu personagem começará a desferir golpes automaticamente consumindo as cargas da arma.'
                    : 'Use the training weapon on the dummy. Your character automatically strikes, consuming charges to advance skills.',
                },
              ]}
            />
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
