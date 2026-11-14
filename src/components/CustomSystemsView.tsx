import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ExternalLink, ChevronLeft, 
  Search, Info, CheckCircle2, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapLink } from './MapLink';
import { PrerequisitesCard, NoticeCard, StepList, ZoomableImage } from './Guide';

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
      className="flex items-center gap-2 text-medieval-gold/70 hover:text-medieval-gold transition-colors font-bold uppercase text-xs tracking-wider mb-8 bg-black/40 px-4 py-2 rounded-lg border border-medieval-gold/20 hover:border-medieval-gold/40 w-fit cursor-pointer"
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
      className="space-y-6 text-left"
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
                ? 'No Miracle 7.4, todo personagem possui uma caixa mágica chamada Relic Box dentro do seu inventário. Ela funciona como uma extensão do seu equipamento, contendo até 6 slots exclusivos para relíquias que você encontra em baús secretos, missões ou caçando criaturas pelo mapa.'
                : 'In Miracle 7.4, every character carries a magical Relic Box inside their inventory. It acts as an equipment extension with up to 6 exclusive slots for relics discovered in secret chests, quests, or hunting.'}
            </p>

            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 flex flex-col sm:flex-row items-center gap-6">
              <ZoomableImage 
                src="/images/miracle/features/relicbox.png" 
                alt="Relic Box Inventory" 
                caption={language === 'pt' ? 'Interface da Relic Box dentro do inventário do personagem' : 'Relic Box container interface inside character inventory'}
                language={language}
                className="max-h-24 object-contain rounded border border-medieval-gold/30 p-1 bg-black/80 shadow-md" 
              />
              <div className="space-y-2 text-xs sm:text-sm text-stone-300">
                <p className="font-bold text-medieval-gold uppercase tracking-wider">
                  {language === 'pt' ? 'Como Equipar e Regra Única' : 'Equipping Rules'}
                </p>
                <p>
                  {language === 'pt'
                    ? 'Para equipar uma relíquia, basta arrastá-la da sua mochila para um dos slots desbloqueados da Relic Box. Importante: você só pode equipar uma relíquia de cada tipo por vez (não é permitido equipar duas relíquias idênticas para duplicar o mesmo bônus).'
                    : 'To equip a relic, drag it from your backpack into one of the unlocked Relic Box slots. You can only equip one relic of each type at any given time (duplicate relics of the exact same type are prohibited).'}
                </p>
              </div>
            </div>

            <PrerequisitesCard
              language={language}
              title={language === 'pt' ? 'Estrutura e Desbloqueio dos 6 Slots da Relic Box' : 'Relic Box 6-Slot Unlock Structure'}
              items={[
                {
                  label: language === 'pt' ? '1º e 2º Slots (Iniciais)' : '1st & 2nd Slots (Initial)',
                  value: language === 'pt' 
                    ? 'Desbloqueados com o NPC Melchior em Ankrahmun. Fale sobre "notes" para receber as instruções e iniciar a quest.' 
                    : 'Unlocked with NPC Melchior in Ankrahmun. Talk to him about "notes" to get guided about the quest.',
                },
                {
                  label: language === 'pt' ? 'Desbloqueio do 3º Slot' : '3rd Slot Unlock',
                  value: language === 'pt' ? 'Requer completar a Missão 1 da Relic Quest' : 'Requires completing Mission 1 of Relic Quest',
                },
                {
                  label: language === 'pt' ? 'Desbloqueio do 4º Slot' : '4th Slot Unlock',
                  value: language === 'pt' ? 'Requer completar a Missão 2 da Relic Quest' : 'Requires completing Mission 2 of Relic Quest',
                },
                {
                  label: language === 'pt' ? 'Desbloqueio do 5º Slot (Novo)' : '5th Slot Unlock (New)',
                  value: language === 'pt' ? 'Preço de desbloqueio: 30.000 gold (30k)' : 'Unlock price: 30,000 gold (30k)',
                },
                {
                  label: language === 'pt' ? 'Desbloqueio do 6º Slot (Novo)' : '6th Slot Unlock (New)',
                  value: language === 'pt' ? 'Preço de desbloqueio: 60.000 gold (60k)' : 'Unlock price: 60,000 gold (60k)',
                },
              ]}
            />

            <NoticeCard type="info" title={language === 'pt' ? 'Guia Rápido: NPC Melchior em Ankrahmun' : 'Quick Guide: NPC Melchior in Ankrahmun'}>
              {language === 'pt'
                ? 'Para liberar seus primeiros slots de relíquia, viaje até Ankrahmun e encontre o sábio cego Melchior. Inicie a conversa dizendo "hi", em seguida fale "notes". Ele entregará as pistas necessárias para a missão de abertura do 1º e do 2º slots.'
                : 'To unlock your initial relic slots, travel to Ankrahmun and locate the blind sage Melchior. Greet him with "hi", then say "notes". He will provide guidance and quest clues to unlock the 1st and 2nd slots.'}
            </NoticeCard>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 2. ATTRIBUTION SYSTEM
  // -------------------------------------------------------------
  const renderAttributionSystem = () => (
    <motion.div
      key="attribution-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 text-left"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              {language === 'pt' ? 'Sistema de Atributos & Mystic Runes' : 'Attribution & Mystic Runes System'}
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Como encantar equipamentos com atributos especiais, itens necessários e proteção contra perdas.'
                : 'How to enchant equipment with special attributes, required items, and loss protection.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              {language === 'pt'
                ? 'No Miracle 7.4, monstros podem dropar itens com atributos místicos únicos ou você mesmo pode adicionar atributos aos seus equipamentos utilizando runas e orbes especiais.'
                : 'In Miracle 7.4, monsters can drop gear with unique mystic attributes, or you can enchant them yourself using special runes and orbs.'}
            </p>

            <StepList
              language={language}
              title={language === 'pt' ? 'Passo a Passo: Como Encantar um Equipamento' : 'Step-by-Step: Enchanting Equipment'}
              steps={[
                {
                  step: 1,
                  title: language === 'pt' ? 'Obter uma Mystic Rune' : 'Acquire a Mystic Rune',
                  description: language === 'pt'
                    ? 'Consiga uma Mystic Rune através do drop de criaturas, baús ou negociando com outros jogadores no Player Shop.'
                    : 'Obtain a Mystic Rune from monster drops, chests, or purchasing from other players.',
                },
                {
                  step: 2,
                  title: language === 'pt' ? 'Adicionar Arcane Orbs' : 'Add Arcane Orbs',
                  description: language === 'pt'
                    ? 'Compre Arcane Orbs no NPC Alexander em Edron para aumentar suas chances. O Grand Arcane Orb aumenta a chance de sucesso em +50%.'
                    : 'Buy Arcane Orbs from NPC Alexander in Edron. The Grand Arcane Orb boosts success rate by +50%.',
                },
                {
                  step: 3,
                  title: language === 'pt' ? 'Aplicar o Encantamento' : 'Apply the Enchantment',
                  description: language === 'pt'
                    ? 'Dê Use na runa ou orbe e clique sobre a arma ou armadura elegível. Se tiver sucesso, o atributo será gravado no item.'
                    : 'Use the rune or orb onto the eligible equipment. On success, the attribute is permanently etched onto the gear.',
                },
              ]}
            />

            <NoticeCard type="warning" title={language === 'pt' ? 'Regra de Morte: Perda de Atributos (20%)' : 'Death Rule: 20% Attribute Loss'}>
              {language === 'pt'
                ? 'Ao morrer no jogo, existe 20% de chance de que um atributo encantado se quebre e seja perdido. Para se proteger totalmente contra essa perda, você deve comprar a 6ª bênção chamada "The Arcane Guardian" com o NPC Humphrey em Carlin ou com Eremo.'
                : 'Upon death, there is a 20% chance an enchanted attribute will break. Protect your items by acquiring the 6th blessing "The Arcane Guardian" from NPC Humphrey in Carlin or Eremo.'}
            </NoticeCard>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 3. EXALTATION FORGE
  // -------------------------------------------------------------
  const renderExaltationForge = () => (
    <motion.div
      key="forge-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 text-left"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              Exaltation Forge
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Guia completo de Tiers, Fusão, Cristais de Proteção, Convergência e Transcendência (Classes 1 a 5).'
                : 'Comprehensive guide to Tiers, Fusion, Protection Crystals, Convergence, and Transcendence (Classes 1 to 5).'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              {language === 'pt'
                ? 'A Exaltation Forge é o sistema de aprimoramento de equipamentos de Classe 1 até Classe 5 (Classe 5 é a classe máxima no servidor). Ela permite elevar o Tier do seu equipamento a partir do Tier 0, desbloqueando aumentos massivos de poder e os efeitos de Transcendência.'
                : 'The Exaltation Forge is the equipment enhancement system for items in Class 1 through Class 5 (Class 5 is the maximum class in the server). It allows elevating your equipment tier starting from Tier 0, unlocking massive power increases and Transcendence effects.'}
            </p>

            <p>
              {language === 'pt'
                ? 'Todo o procedimento da forja ocorre dentro de um baú especial chamado Exaltation Chest, que pode ser encontrado no mapa dentro de Dwacatra (Kazordoon) ou adquirido na Store do jogo para colocar na sua casa.'
                : 'All forge procedures take place inside an Exaltation Chest, which can be found in Dwacatra (Kazordoon) or purchased in the in-game Store for your house.'}
            </p>

            {/* FUSÃO */}
            <div className="space-y-4 pt-4 border-t border-medieval-gold/20">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider">
                {language === 'pt' ? '1. Fusão (Fusion) - Como Subir o Tier do seu Equipamento' : '1. Fusion - Elevating Equipment Tiers'}
              </h3>
              
              <p>
                {language === 'pt'
                  ? 'A Fusão é o método para aumentar o Tier de um equipamento através do Exaltation Chest. Quando bem-sucedida, dois itens idênticos são combinados para criar um novo item com o próximo nível de Tier (Tier 1, Tier 2, etc.).'
                  : 'Fusion is the method used to elevate equipment tiers inside the Exaltation Chest. When successful, two identical items are combined to forge a new item of the next Tier level.'}
              </p>

              <div className="bg-black/60 p-5 rounded-xl border border-medieval-gold/20 space-y-4">
                <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                  {language === 'pt' ? 'Recursos Necessários para a Fusão:' : 'Required Resources for Fusion:'}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-white/5">
                    <div className="w-10 h-10 rounded bg-black flex items-center justify-center p-1 shrink-0 border border-medieval-gold/30">
                      <img src="/images/miracle/items/magic_sword_2400.gif" alt="Item" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-200 block">
                        {language === 'pt' ? '2 Itens Estritamente Idênticos' : '2 Identical Items'}
                      </span>
                      <p className="text-[11px] text-stone-400">
                        {language === 'pt' ? 'Exatamente o mesmo equipamento e no mesmo Tier (ex: 2 Knight Axes Tier 0).' : 'Exact same equipment and Tier (e.g., two Tier 0 Knight Axes).'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-white/5">
                    <div className="w-10 h-10 rounded bg-black flex items-center justify-center p-1 shrink-0 border border-medieval-gold/30">
                      <img src="/images/miracle/items/reagent_crystal_8354.gif" alt="Reagent Crystal" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-200 block">Reagent Crystal</span>
                      <p className="text-[11px] text-stone-400">
                        {language === 'pt' ? 'Minerado em Shrine Stones com pick. É usado diretamente no baú para iniciar o ritual.' : 'Mined from Shrine Stones with a pick. Used directly on the chest to start the ritual.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-white/5">
                    <div className="w-10 h-10 rounded bg-black flex items-center justify-center p-1 shrink-0 border border-medieval-gold/30">
                      <img src="/images/miracle/items/crystal_coin_2160.gif" alt="Gold Coins" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-200 block">
                        {language === 'pt' ? 'Taxa em Gold Coins & Crests' : 'Gold Coins & Crests Fee'}
                      </span>
                      <p className="text-[11px] text-stone-400">
                        {language === 'pt' ? 'Valores em ouro e brasões exigidos conforme a classe do equipamento.' : 'Gold and crest fees required according to item class.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-white/5">
                    <div className="w-10 h-10 rounded bg-black flex items-center justify-center p-1 shrink-0 border border-medieval-gold/30">
                      <img src="/images/miracle/items/rare_crystal_8179.gif" alt="Rare Crystal" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-200 block">
                        {language === 'pt' ? 'Rare Crystal (+30%) & Prismatic Crystal (+50%)' : 'Rare Crystal (+30%) & Prismatic (+50%)'}
                      </span>
                      <p className="text-[11px] text-stone-400">
                        {language === 'pt' ? 'Cristais opcionais colocados dentro do baú para aumentar a chance de sucesso.' : 'Optional crystals placed inside chest to increase fusion success chance.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PEDRAS DE PROTEÇÃO */}
              <div className="bg-black/60 p-4 rounded-xl border border-sky-500/20 space-y-3">
                <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Pedras de Proteção de Atributos e Quebra:' : 'Protection Stones:'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-sky-500/30">
                    <img src="/images/miracle/items/earth_stone_7601.gif" alt="Earth Stone" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <strong className="text-sky-300 block mb-0.5">
                        {language === 'pt' ? 'Earth Stone (Preservar Atributos)' : 'Earth Stone (Preserve Attributes)'}
                      </strong>
                      <p>
                        {language === 'pt'
                          ? 'Encanta o item com Earth Guard por 15 minutos. Garante que os atributos já encantados no item sejam transferidos para o novo item do próximo Tier.'
                          : 'Enchants item with Earth Guard for 15 minutes. Preserves already enchanted attributes onto the new tiered item.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-sky-500/30">
                    <img src="/images/miracle/items/frozen_stone_7602.gif" alt="Frozen Stone" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <strong className="text-sky-300 block mb-0.5">
                        {language === 'pt' ? 'Frozen Stone (Proteção contra Destruição)' : 'Frozen Stone (Destruction Protection)'}
                      </strong>
                      <p>
                        {language === 'pt'
                          ? 'Encanta com Frozen Guard por 15 minutos. Se a fusão falhar, o equipamento não é destruído (se Tier 0) e a chance de rebaixar de tier é reduzida em -50%.'
                          : 'Enchants with Frozen Guard for 15 minutes. Prevents item breakage on failure (if Tier 0) and reduces tier downgrade chance by -50%.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CONVERGÊNCIA */}
            <div className="space-y-4 pt-6 border-t border-medieval-gold/20">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider">
                {language === 'pt' ? '2. Convergência (Convergence) - Transferência Segura de Tier' : '2. Convergence - Safe Tier Transfer'}
              </h3>
              
              <p>
                {language === 'pt'
                  ? 'A Convergência permite transferir o nível de Tier de um item avançado de Classe 4 ou Classe 5 para outro equipamento da mesma classe ou classe inferior, com 100% de taxa de sucesso garantida!'
                  : 'Convergence transfers the Tier level from a Class 4 or Class 5 item to another equipment of equal or lower class, with 100% guaranteed success rate!'}
              </p>

              <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3 text-xs text-stone-300">
                <p className="font-bold text-yellow-300 text-sm">
                  {language === 'pt' ? 'Exemplo Prático de Convergência:' : 'Practical Convergence Example:'}
                </p>
                <p>
                  {language === 'pt'
                    ? 'Imagine que você tem uma Magic Sword (Classe 4) no Tier 2, mas quer trocar para uma Bright Sword (Classe 3). Você coloca a Magic Sword Tier 2 e a Bright Sword Tier 0 dentro do Exaltation Chest, adiciona um Convergence Crystal, Exalted Cores e o gold necessário. Ao usar o Reagent Crystal no baú, a Bright Sword recebe Tier 1 (o tier doador menos um: 2 - 1 = 1) com 100% de acerto!'
                    : 'Suppose you have a Magic Sword (Class 4) at Tier 2 and want to transfer it to a Bright Sword (Class 3). Place the Tier 2 Magic Sword and Tier 0 Bright Sword in the Exaltation Chest with a Convergence Crystal, Exalted Cores, and gold. When triggered, the Bright Sword receives Tier 1 (donor tier minus one: 2 - 1 = 1) with 100% success!'}
                </p>

                <div className="flex items-center gap-4 bg-black/80 p-3 rounded-lg border border-white/5 mt-2">
                  <img src="/images/miracle/items/convergence_crystal_8181.gif" alt="Convergence Crystal" className="w-8 h-8 object-contain" />
                  <img src="/images/miracle/items/exalted_core_7509.gif" alt="Exalted Core" className="w-8 h-8 object-contain" />
                  <p>
                    {language === 'pt'
                      ? 'Requisitos no baú: exatamente 2 equipamentos (um Tier 0 e outro Tier 2 ou maior), 1 Convergence Crystal, Exalted Cores e Gold.'
                      : 'Chest requirements: exactly 2 equipments (one Tier 0 and one Tier 2+), 1 Convergence Crystal, Exalted Cores, and Gold.'}
                  </p>
                </div>
              </div>
            </div>

            {/* TRANSCENDÊNCIA */}
            <div className="space-y-4 pt-6 border-t border-medieval-gold/20">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider">
                {language === 'pt' ? '3. Transcendência (Transcendence) - Quebra de Limites' : '3. Transcendence - Breaking Limits'}
              </h3>
              
              <p>
                {language === 'pt'
                  ? 'A Transcendência potencializa os atributos já encantados no item temporariamente. Cada equipamento pode ativar no máximo 3 tipos simultâneos de transcendência entre os 6 disponíveis:'
                  : 'Transcendence temporarily empowers already enchanted attributes on the item. Each equipment can activate at most 3 simultaneous types among the 6 available:'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    name: 'Dominion',
                    gemImg: '/images/miracle/items/red_gem_2156.gif',
                    subImg: '/images/miracle/items/small_ruby_2147.gif',
                    matsPt: 'Red Gem + Small Rubies + Exalted Cores',
                    matsEn: 'Red Gem + Small Rubies + Exalted Cores',
                    descPt: 'Aumenta Attack, Life Leech, Burning, Fire Damage, Armor, Health Regen, Absorb Health, Protect Fire, Reflect Fire, Protect Life Drain.',
                    descEn: 'Boosts Attack, Life Leech, Burning, Fire Damage, Armor, Health Regen, Absorb Health, Protect Fire, Reflect Fire, Protect Life Drain.'
                  },
                  {
                    name: 'Bastion',
                    gemImg: '/images/miracle/items/blue_gem_2158.gif',
                    subImg: '/images/miracle/items/small_sapphire_2146.gif',
                    matsPt: 'Blue Gem + Small Sapphires + Exalted Cores',
                    matsEn: 'Blue Gem + Small Sapphires + Exalted Cores',
                    descPt: 'Aumenta Defense, Mana Leech, Freeze, Ice Damage, Mana Regen, Absorb Mana, Protect Ice, Reflect Ice.',
                    descEn: 'Boosts Defense, Mana Leech, Freeze, Ice Damage, Mana Regen, Absorb Mana, Protect Ice, Reflect Ice.'
                  },
                  {
                    name: 'Sorcery',
                    gemImg: '/images/miracle/items/violet_gem_2153.gif',
                    subImg: '/images/miracle/items/small_amethyst_2150.gif',
                    matsPt: 'Violet Gem + Small Amethyst + Exalted Cores',
                    matsEn: 'Violet Gem + Small Amethyst + Exalted Cores',
                    descPt: 'Aumenta Magic Level, Electrify, Energy Damage, Max Mana, Mana Healing, Protect Energy, Reflect Energy, Protect Mana Drain.',
                    descEn: 'Boosts Magic Level, Electrify, Energy Damage, Max Mana, Mana Healing, Protect Energy, Reflect Energy, Protect Mana Drain.'
                  },
                  {
                    name: 'Mastery',
                    gemImg: '/images/miracle/items/green_gem_2155.gif',
                    subImg: '/images/miracle/items/small_emerald_2149.gif',
                    matsPt: 'Green Gem + Small Emeralds + Exalted Cores',
                    matsEn: 'Green Gem + Small Emeralds + Exalted Cores',
                    descPt: 'Aumenta Skills (Axe, Club, Sword, Distance, Shielding), Poison, Poison Damage, Max Health, Healing, Protect Poison, Reflect Poison.',
                    descEn: 'Boosts Skills (Axe, Club, Sword, Distance, Shielding), Poison, Poison Damage, Max Health, Healing, Protect Poison, Reflect Poison.'
                  },
                  {
                    name: 'Focus',
                    gemImg: '/images/miracle/items/yellow_gem_2154.gif',
                    subImg: '/images/miracle/items/small_topaz_9476.gif',
                    matsPt: 'Yellow Gem + Small Topaz + Exalted Cores',
                    matsEn: 'Yellow Gem + Small Topaz + Exalted Cores',
                    descPt: 'Aumenta Critical Hit/Spell, Perfuration, Crushing Blow, Attack Interval, Hit Chance, Physical Damage, Mitigation, Momentum.',
                    descEn: 'Boosts Critical Hit/Spell, Perfuration, Crushing Blow, Attack Interval, Hit Chance, Physical Damage, Mitigation, Momentum.'
                  },
                  {
                    name: 'Supremacy',
                    gemImg: '/images/miracle/items/small_diamond_2145.gif',
                    subImg: '/images/miracle/items/exalted_core_7509.gif',
                    matsPt: 'Rainbow Gem + Small Diamond + Exalted Cores',
                    matsEn: 'Rainbow Gem + Small Diamond + Exalted Cores',
                    descPt: 'Aumenta Speed, Dodge, Vibrancy, Double Bash, Bleeding, Berserk, Destruction, Death Damage, Protect Death, Protect Elements.',
                    descEn: 'Boosts Speed, Dodge, Vibrancy, Double Bash, Bleeding, Berserk, Destruction, Death Damage, Protect Death, Protect Elements.'
                  }
                ].map((t) => (
                  <div key={t.name} className="bg-black/60 p-3.5 rounded-lg border border-white/10 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 pb-1 border-b border-white/5">
                        <img src={t.gemImg} alt={t.name} className="w-6 h-6 object-contain" />
                        <img src={t.subImg} alt={t.name} className="w-4 h-4 object-contain" />
                        <span className="font-bold text-xs uppercase text-medieval-gold">{t.name}</span>
                      </div>
                      <p className="text-[11px] text-stone-300 leading-snug">
                        {language === 'pt' ? t.descPt : t.descEn}
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-stone-400 font-mono">
                      <strong>{language === 'pt' ? 'Requisitos:' : 'Requirements:'}</strong> {language === 'pt' ? t.matsPt : t.matsEn}
                    </div>
                  </div>
                ))}
              </div>

              {/* REMOÇÃO */}
              <div className="bg-black/80 p-4 rounded-xl border border-red-500/30 space-y-2 text-xs text-stone-300 mt-4">
                <span className="font-bold text-red-400 uppercase tracking-wider block">
                  {language === 'pt' ? 'Como Remover Transcendências:' : 'Removing Transcendence:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  <div className="flex items-start gap-3 bg-black/60 p-2.5 rounded border border-white/5">
                    <div className="w-8 h-8 rounded bg-black/80 flex items-center justify-center p-1 shrink-0 border border-white/10">
                      <span className="text-[10px] font-mono font-bold text-stone-300">GEM</span>
                    </div>
                    <div>
                      <strong className="text-stone-200 block text-xs">Black Gem</strong>
                      <p className="text-[11px] text-stone-400">
                        {language === 'pt' ? 'Remove todas as transcendências, mantendo os atributos normais 100% intactos.' : 'Removes only transcendences, keeping enchanted attributes 100% intact.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/60 p-2.5 rounded border border-white/5">
                    <img src="/images/miracle/items/fiery_stone_7511.gif" alt="Fiery Stone" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <strong className="text-red-400 block text-xs">Fiery Stone</strong>
                      <p className="text-[11px] text-stone-400">
                        {language === 'pt' ? 'Destrói tanto as transcendências quanto todos os atributos encantados (reseta o item).' : 'Destroys both transcendences and enchanted attributes, resetting the item.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 4. PLAYER SHOP (MERCADO OFFLINE)
  // -------------------------------------------------------------
  const renderPlayerShop = () => (
    <motion.div
      key="shop-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 text-left"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              {language === 'pt' ? 'Player Shop (Mercado Offline)' : 'Player Shop (Offline Market)'}
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Como comprar a licença, abrir a banca in-game e vender itens enquanto estiver deslogado.'
                : 'How to purchase license, configure shop in-game, and sell goods while logged off.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              {language === 'pt'
                ? 'O Player Shop permite transformar seu próprio personagem em um vendedor comercial fixo no mapa. Qualquer outro jogador que passar perto do seu boneco pode clicar nele, ver a lista de itens, ler a sua descrição e comprar os produtos. A sua loja continua aberta mesmo depois que você fecha o jogo (modo Idle Shop)!'
                : 'Player Shop transforms your character into a stationary merchant NPC on the map. Other players can click on you, browse your goods, read your store description, and buy items. Your store remains active even after you exit the game (Idle Shop mode)!'}
            </p>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? 'Passo a Passo: Como Montar a sua Loja do Zero' : 'Step-by-Step: Setting Up Your Shop'}
            </h3>

            {/* PASSO 1 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                {language === 'pt' ? 'Passo 1: Comprar o Private Store Document' : 'Step 1: Purchase Private Store Document'}
              </h4>
              <p className="text-xs sm:text-sm">
                {language === 'pt'
                  ? 'No cliente do jogo, olhe no canto inferior direito da tela (abaixo da sua mochila e dos equipamentos). Você verá um botão azul escrito "Store".'
                  : 'In the game client, look at the bottom right corner (below your backpack and equipment). Click the blue "Store" button.'}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-black/80 p-3 rounded-lg border border-white/10">
                <ZoomableImage 
                  src="/images/miracle/features/store_button_ingame.png" 
                  alt={language === 'pt' ? 'Botão Store in-game' : 'In-game Store button'} 
                  caption={language === 'pt' ? 'Botão azul "Store" localizado no painel direito inferior do cliente' : 'Blue "Store" button located at the bottom-right panel'}
                  language={language}
                  className="h-10 object-contain rounded border border-blue-500/50" 
                />
                <span className="text-xs text-stone-300">
                  {language === 'pt' ? 'Botão azul "Store" localizado no painel direito do cliente.' : 'Blue "Store" button located on the client right panel.'}
                </span>
              </div>

              <ul className="list-disc list-inside space-y-1 text-xs text-stone-300 pl-2">
                <li>{language === 'pt' ? 'Clique no botão Store para abrir a loja do servidor.' : 'Click the Store button to open the in-game shop.'}</li>
                <li>{language === 'pt' ? 'No menu da esquerda, selecione a categoria "Utilities".' : 'On the left menu, select the "Utilities" tab.'}</li>
                <li>{language === 'pt' ? 'Selecione o item "Private Store Document" (10 Miracle Points) e clique em "Buy Now!".' : 'Select "Private Store Document" (10 Miracle Points) and click "Buy Now!".'}</li>
              </ul>
              <div className="mt-2">
                <ZoomableImage 
                  src="/images/miracle/features/store_private_shop.jpg" 
                  alt={language === 'pt' ? 'Store Utilities' : 'Store Utilities'} 
                  caption={language === 'pt' ? 'Janela da Loja: aba Utilities com o Private Store Document (10 Miracle Points)' : 'In-game Store: Utilities tab with Private Store Document (10 Miracle Points)'}
                  language={language}
                  className="w-full max-w-lg rounded border border-white/10" 
                />
              </div>
            </div>

            {/* PASSO 2 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                {language === 'pt' ? 'Passo 2: Ativar o Documento no Personagem' : 'Step 2: Activate the Document'}
              </h4>
              <p className="text-xs sm:text-sm">
                {language === 'pt'
                  ? 'Com o Private Store Document na sua mochila, clique nele com o botão direito e dê clique com o botão esquerdo sobre o seu próprio personagem. Isso concede o direito oficial de abrir lojas durante 48 horas seguidas.'
                  : 'With the Private Store Document in your backpack, right-click it and left-click onto your own character. This grants you the right to open stores for 48 consecutive hours.'}
              </p>
            </div>

            {/* PASSO 3 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                {language === 'pt' ? 'Passo 3: Ficar dentro de Protection Zone (PZ)' : 'Step 3: Stand inside Protection Zone (PZ)'}
              </h4>
              <p className="text-xs sm:text-sm">
                {language === 'pt'
                  ? 'Caminhe até um local seguro dentro de uma Protection Zone (PZ).'
                  : 'Walk to a safe location inside a Protection Zone (PZ).'}
              </p>
              <div className="bg-black/80 p-3 rounded-lg border border-amber-500/30 text-xs text-amber-200">
                <strong>{language === 'pt' ? 'Regra Obrigatória dos 8 SQMs:' : 'Mandatory 8 SQMs Rule:'}</strong>{' '}
                {language === 'pt'
                  ? 'Não pode existir absolutamente NENHUM item, móvel, parcela ou criatura nos 8 quadrados adjacentes que cercam o seu personagem.'
                  : 'There must be NO items, furniture, parcels, or creatures on the 8 adjacent tiles surrounding your character.'}
              </div>
            </div>

            {/* PASSO 4 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                {language === 'pt' ? 'Passo 4: Abrir a Janela da Loja' : 'Step 4: Open Shop Menu'}
              </h4>
              <p className="text-xs sm:text-sm">
                {language === 'pt'
                  ? 'Posicionado no local correto, clique com o botão direito sobre o seu próprio personagem e selecione "Open Shop".'
                  : 'Positioned properly, right-click your own character sprite and select "Open Shop".'}
              </p>
              <div className="mt-2">
                <ZoomableImage 
                  src="/images/miracle/features/open_shop_menu.png" 
                  alt={language === 'pt' ? 'Menu de Contexto: Open Shop' : 'Context Menu: Open Shop'} 
                  caption={language === 'pt' ? 'Menu de contexto no personagem: selecione "Open Shop" para configurar sua banca' : 'Character context menu: select "Open Shop" to configure stall'}
                  language={language}
                  className="max-w-xs rounded border border-white/10" 
                />
              </div>
            </div>

            {/* PASSO 5 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                {language === 'pt' ? 'Passo 5: Definir Itens e Preços' : 'Step 5: Setup Items & Prices'}
              </h4>
              <ul className="list-decimal list-inside space-y-1.5 text-xs text-stone-300 pl-2">
                <li>{language === 'pt' ? 'Os itens que você deseja vender DEVEM estar dentro da sua mochila (Backpack), nunca equipados no seu corpo.' : 'Items to sell MUST be inside your backpack, never equipped.'}</li>
                <li>{language === 'pt' ? 'Arraste os itens da mochila para dentro da janela cinza da loja.' : 'Drag items from backpack into the shop window.'}</li>
                <li>{language === 'pt' ? 'Selecione o item e defina o valor no campo "Price (un)" em Gold Coins e a quantidade em "Amount".' : 'Set the unit price in "Price (un)" in gold coins and quantity in "Amount".'}</li>
                <li>{language === 'pt' ? 'Altere o nome da sua loja em "Edit Description" e note a taxa de 5% ("Fee: 5%") debitada sobre cada venda.' : 'Edit store title in "Edit Description" and note the 5% transaction fee.'}</li>
              </ul>
              <div className="mt-2">
                <ZoomableImage 
                  src="/images/miracle/features/player_shop_window.jpg" 
                  alt={language === 'pt' ? 'Janela de Configuração da Loja' : 'Shop Configuration Window'} 
                  caption={language === 'pt' ? 'Interface da Loja: configure os preços unitários, a quantidade e o título da sua loja' : 'Store interface: set unit price, item amount, and shop description'}
                  language={language}
                  className="w-full max-w-md rounded border border-white/10" 
                />
              </div>
            </div>

            {/* PASSO 6 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                {language === 'pt' ? 'Passo 6: Iniciar Vendas e Ativar Idle Shop' : 'Step 6: Start Shop & Idle Mode'}
              </h4>
              <p className="text-xs sm:text-sm">
                {language === 'pt'
                  ? 'Clique em "Start Shop" para fixar o vendedor. Certifique-se de que o botão "Idle Shop" esteja ativo para que o personagem permaneça vendendo mesmo quando você fechar o jogo. Todo o dinheiro arrecadado cai direto na sua conta do banco in-game com segurança!'
                  : 'Click "Start Shop" to fix vendor position. Ensure "Idle Shop" is enabled so character continues vending offline. All gold collected is safely deposited directly into your in-game bank!'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-black/80 p-4 rounded-xl border border-amber-500/30 space-y-2 text-xs text-stone-300">
                <strong className="text-amber-400 uppercase tracking-wider block">
                  {language === 'pt' ? 'Regra de Conta e Multi-Clienting:' : 'Account & MC Rules:'}
                </strong>
                <p>
                  {language === 'pt'
                    ? 'Enquanto seu char estiver em Idle Shop, você NÃO poderá logar outro personagem da MESMA conta. Porém, é 100% autorizado jogar normalmente com outra conta separada.'
                    : 'While your character is in Idle Shop, you cannot login another character from the same account. Playing on another separate account is 100% permitted.'}
                </p>
              </div>

              <div className="bg-black/80 p-4 rounded-xl border border-sky-500/30 space-y-2 text-xs text-stone-300">
                <strong className="text-sky-400 uppercase tracking-wider block">
                  {language === 'pt' ? 'Server Save Diário:' : 'Daily Server Save:'}
                </strong>
                <p>
                  {language === 'pt'
                    ? 'No Server Save diário o servidor reseta todas as lojas ativas por manutenção. Após o Server Save, basta logar e clicar novamente em Open Shop.'
                    : 'At daily Server Save all shops close automatically. Simply log in and click Open Shop again after reset.'}
                </p>
              </div>
            </div>
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
      className="space-y-6 text-left"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              {language === 'pt' ? 'Casas & Terrenos' : 'Houses & Lands'}
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Como arrematar casas em leilão no site, transferir com segurança pelo Move Out e magias in-game.'
                : 'How to bid on houses on the site, transfer safely via Move Out, and house spells.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? '1. Como Comprar uma Casa (Sistema de Leilão no Site)' : '1. Buying a House (Website Bids)'}
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm pl-2">
              <li>{language === 'pt' ? 'Acesse o site oficial (miracle74.com/?subtopic=houses), faça login e filtre pela cidade desejada.' : 'Go to the official site, log in, and filter by city.'}</li>
              <li>{language === 'pt' ? 'Clique na casa livre e insira seu lance (Bid) em Gold Coins.' : 'Click an open house and submit your bid in gold coins.'}</li>
              <li>{language === 'pt' ? 'O leilão dura 2 dias a partir do 1º lance e encerra estritamente no Server Save do 2º dia. Maior lance vence.' : 'Auction lasts 2 days from first bid, closing strictly at 2nd day Server Save. Highest bid wins.'}</li>
              <li><strong>{language === 'pt' ? 'DINHEIRO OBRIGATÓRIO NO BANCO:' : 'MANDATORY BANK FUNDS:'}</strong> {language === 'pt' ? 'O valor do lance + 1º aluguel DEVE estar depositado no BANCO in-game (não na mochila). Sem saldo no Server Save, a compra é cancelada.' : 'Bid amount plus first rent must be in in-game BANK (not backpack). Without funds at Server Save, bid is cancelled.'}</li>
            </ol>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2 pt-4">
              {language === 'pt' ? '2. Como Transferir Casas com Segurança (Move Out)' : '2. Transferring Houses Safely (Move Out)'}
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="space-y-2 flex-1 text-xs sm:text-sm">
                <p>
                  {language === 'pt'
                    ? 'Transferências são feitas 100% pelo site para evitar roubos: o dono clica em "Move Out" na página da casa no site, digita o Nick do comprador, o valor acordado e confirma com sua senha. O comprador deve ter o valor no Banco do jogo (nunca pague em mãos in-game!). No próximo Server Save, a titularidade é transferida e o dinheiro cai direto no banco do vendedor.'
                    : 'Transfers are 100% automated on the website: owner clicks "Move Out" on house page, enters buyer nick, agreed gold price, and confirms password. Buyer must have funds in in-game bank. Transfer finishes automatically at next Server Save.'}
                </p>
              </div>
              <div className="w-full md:w-80 bg-black/60 p-2 rounded-lg border border-medieval-gold/30 shrink-0">
                <ZoomableImage 
                  src="/images/miracle/features/house_move_out.png" 
                  alt={language === 'pt' ? 'Interface Move Out de Transferência de Casa' : 'House Move Out Transfer Interface'} 
                  caption={language === 'pt' ? 'Formulário oficial do site: transfira a titularidade e defina o valor em gold com segurança' : 'Official website form: safely transfer ownership and set price in gold coins'}
                  language={language}
                  className="w-full rounded" 
                />
              </div>
            </div>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2 pt-4">
              {language === 'pt' ? '3. Magias de Casa In-Game (Sem Comandos !)' : '3. In-Game House Spells'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
              <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                <span className="font-mono text-medieval-gold font-bold text-sm block mb-1">aleta grav</span>
                <p>{language === 'pt' ? 'De frente para uma porta, abre a lista de permissão para abrir/fechar aquela porta.' : 'Facing a door, edits permissions for opening/closing that door.'}</p>
              </div>
              <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                <span className="font-mono text-medieval-gold font-bold text-sm block mb-1">aleta sio</span>
                <p>{language === 'pt' ? 'Dentro da casa, abre a lista de convidados gerais (Guests) autorizados a entrar.' : 'Inside house, edits guest list authorized to enter.'}</p>
              </div>
              <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                <span className="font-mono text-medieval-gold font-bold text-sm block mb-1">aleta som</span>
                <p>{language === 'pt' ? 'Edita a lista de sub-donos (Sub-owners) que podem invitar outros e editar portas.' : 'Edits sub-owners list who can invite others and modify doors.'}</p>
              </div>
              <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                <span className="font-mono text-red-400 font-bold text-sm block mb-1">alana grav</span>
                <p>{language === 'pt' ? 'Expulsa para fora quem estiver pisando na soleira da porta trancada.' : 'Kicks players standing on the door threshold tile.'}</p>
              </div>
              <div className="bg-black/60 p-3.5 rounded-lg border border-white/10 sm:col-span-2">
                <span className="font-mono text-red-400 font-bold text-sm block mb-1">alana sio "NomeDoJogador"</span>
                <p>{language === 'pt' ? 'Kicka imediatamente um jogador invasor para fora da casa.' : 'Immediately kicks an unwanted player out of the house.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 6. BED MAKER (GUIA ESTRATÉGICO DE RUNAGEM EM CAMAS)
  // -------------------------------------------------------------
  const renderBedMaker = () => (
    <motion.div
      key="bedmaker-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 text-left"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              {language === 'pt' ? 'Guia do Bed Maker (Runando em Camas)' : 'Bed Maker Guide (Rune Crafting in Beds)'}
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'A matemática exata do ciclo de regeneração de camas, comida e timing para magos e druidas.'
                : 'Exact math of bed regeneration cycle, food duration, and optimal timing for mages and druids.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              {language === 'pt'
                ? 'O sistema de Bed Maker permite que magos e druidas regenerem mana continuamente enquanto estão deslogados, utilizando as camas instaladas dentro de casas para produzir runas (UH, SD, GFB, HMM) de forma passiva.'
                : 'The Bed Maker system allows Sorcerers and Druids to regenerate mana continuously while offline using house beds, crafting valuable runes (UH, SD, GFB, HMM) passively.'}
            </p>

            <PrerequisitesCard
              language={language}
              title={language === 'pt' ? 'Regras Obrigatórias do Bed Maker' : 'Bed Maker Mandatory Rules'}
              items={[
                {
                  label: language === 'pt' ? 'Conta Premium' : 'Account Status',
                  value: language === 'pt' ? 'Obrigatório ser Premium Account para usar camas' : 'Premium Account is strictly required to sleep in beds',
                },
                {
                  label: language === 'pt' ? 'Limite por Conta' : 'Account Limit',
                  value: language === 'pt' ? 'Máximo de 2 personagens dormindo por conta' : 'Maximum of 2 sleepers per account simultaneously',
                },
                {
                  label: language === 'pt' ? 'Taxa de Regeneração' : 'Regen Rate',
                  value: language === 'pt' ? '1 Ponto de Vida (HP) e 1 Ponto de Mana (MP) por minuto' : '1 HP and 1 Mana per minute',
                },
                {
                  label: language === 'pt' ? 'Mana Máxima por Ciclo' : 'Max Mana per Cycle',
                  value: language === 'pt' ? '200 Mana regenerados por ciclo de sono' : '200 Mana regenerated per sleep cycle',
                },
              ]}
            />

            <div className="bg-black/60 p-5 rounded-xl border border-medieval-gold/20 space-y-3">
              <h3 className="text-base font-bold text-yellow-300 uppercase tracking-wider">
                {language === 'pt' ? 'A Matemática do Ciclo: 3 Horas e 20 Minutos (3h20m)' : 'Cycle Math: 3 Hours and 20 Minutes (3h20m)'}
              </h3>
              <p className="text-xs sm:text-sm">
                {language === 'pt'
                  ? 'A regeneração na cama depende 100% do tempo de comida no estômago do personagem. A cama multiplica a duração da comida em 5 vezes (5x).'
                  : 'Bed regeneration strictly depends on food duration. Beds multiply food duration by 5 times (5x).'}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-300 pl-2">
                <li>{language === 'pt' ? 'Tempo máximo de alimentação: Coma até o char ficar cheio em 39 minutos e 59 segundos (39m59s).' : 'Full food cap: Eat until character is full at 39 minutes and 59 seconds (39m59s).'}</li>
                <li>{language === 'pt' ? 'Multiplicador de 5x: 40 minutos x 5 = 200 minutos de regeneração total.' : '5x multiplier: 40 minutes x 5 = 200 total minutes of regeneration.'}</li>
                <li>{language === 'pt' ? 'Como a taxa é de 1 Mana por minuto, em 200 minutos seu personagem regenerará exatamente 200 de Mana (3 horas e 20 minutos de sono).' : 'At 1 Mana/min, in 200 minutes your character regenerates exactly 200 Mana (3 hours and 20 minutes of sleep).'}</li>
              </ul>
            </div>

            <StepList
              language={language}
              title={language === 'pt' ? 'O Ciclo Perfeito do Runic Maker' : 'The Optimal Rune Maker Cycle'}
              steps={[
                {
                  step: 1,
                  title: language === 'pt' ? 'Alimentação Total (39m59s)' : 'Full Food (39m59s)',
                  description: language === 'pt'
                    ? 'Coma fish, meat ou dragon ham até a mensagem "You are full" aparecer e o contador marcar ~40 minutos.'
                    : 'Eat fish, meat, or dragon ham until "You are full" appears (~40 min counter).',
                },
                {
                  step: 2,
                  title: language === 'pt' ? 'Deitar na Cama' : 'Use the Bed',
                  description: language === 'pt'
                    ? 'Dê Use na cama da casa. Seu personagem deitará e deslogará automaticamente.'
                    : 'Use the house bed. Your character lies down and logs off automatically.',
                },
                {
                  step: 3,
                  title: language === 'pt' ? 'Logar a cada 3h20m' : 'Log in every 3h20m',
                  description: language === 'pt'
                    ? 'A cada 3 horas e 20 minutos, logue no personagem. Você terá 200 de mana extra. Convoque sua runa (ex: adori vita vis para SD), coma novamente até ficar cheio e volte para a cama!'
                    : 'Every 3h20m, log in, use your 200 mana to craft your chosen rune (e.g., SD, UH, GFB), eat full food, and sleep again!',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 7. ARMAS DE TREINO (INTERVALO DE ATAQUE REDUZIDO)
  // -------------------------------------------------------------
  const renderTrainingWeapons = () => (
    <motion.div
      key="training-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 text-left"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              {language === 'pt' ? 'Armas de Treino (Intervalo Reduzido)' : 'Training Weapons (Reduced Attack Interval)'}
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Como funcionam as armas de treino, redução real de intervalo de ataque e cargas por tier.'
                : 'How training weapons function, reduced attack intervals, and charges per tier.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              {language === 'pt'
                ? 'No Miracle 7.4, as Armas de Treino são equipamentos reais que você empunha na mão para treinar combate corpo-a-corpo, distância, shielding e magic level contra criaturas. O grande diferencial dessas armas é que elas possuem Intervalo de Ataque Reduzido (Reduced Attack Interval), permitindo que você desfira golpes muito mais rápidos do que com uma arma comum, avançando suas habilidades em uma velocidade drasticamente superior!'
                : 'In Miracle 7.4, Training Weapons are real combat weapons equipped in hand to train melee, distance, shielding, and magic level against creatures. Their signature trait is Reduced Attack Interval, striking substantially faster than ordinary weapons to advance skills much quicker!'}
            </p>

            <NoticeCard type="warning" title={language === 'pt' ? 'Importante: Não existem Dummies nem Store' : 'Important: No Dummies & Not in Store'}>
              {language === 'pt'
                ? 'No Miracle 7.4 NÃO existem bonecos de treino (Dummies) e armas de treino NÃO são vendidas na Store. O treino é feito da forma clássica de Tibia contra criaturas (como Monks sumonados ou monstros de treino), equipando a arma de treino para usufruir da velocidade acelerada de ataque!'
                : 'In Miracle 7.4 there are NO exercise dummies and training weapons are NOT sold in Store. Training is conducted in classic Tibia style against creatures (such as summoned monks or training monsters) wielding the weapon for accelerated attack speed!'}
            </NoticeCard>

            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-2">
              <h3 className="text-base font-bold text-medieval-gold uppercase tracking-wider">
                {language === 'pt' ? 'Onde Adquirir Armas de Treino' : 'Where to Acquire Training Weapons'}
              </h3>
              <p className="text-xs sm:text-sm">
                {language === 'pt'
                  ? 'As armas de treino regulares são vendidas pelo NPC Sam em Thais (coordenadas: 32361, 32197, 7). Tiers aprimorados são forjados ou obtidos através de fórmulas especiais da profissão de Alquimia / Forja.'
                  : 'Regular training weapons are sold by NPC Sam in Thais (coordinates: 32361, 32197, 7). Higher tiers are crafted or obtained via Alchemy / Forge recipes.'}
              </p>
            </div>

            {/* TABELA DOS 5 TIERS COM VALORES OFICIAIS */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
                {language === 'pt' ? 'Tabela Oficial dos 5 Tiers: Redução de Intervalo e Cargas' : 'Official 5 Tiers: Interval Reduction & Charges'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  {
                    name: 'Normal',
                    img: '/images/miracle/items/training_sword_7481.gif',
                    reduction: '0%',
                    meleeCharges: 'Infinita / Base',
                    magicCharges: 'Infinita / Base',
                    shieldCharges: 'Infinita / Base',
                    descPt: 'Arma base vendida pelo NPC Sam.',
                    descEn: 'Base weapon sold by NPC Sam.'
                  },
                  {
                    name: 'Spark',
                    img: '/images/miracle/items/spark_training_sword_7487.gif',
                    reduction: '-10% de Intervalo',
                    meleeCharges: '3.600 charges',
                    magicCharges: '3.600 charges',
                    shieldCharges: '7.200 charges',
                    descPt: 'Versão aprimorada com 10% de velocidade extra.',
                    descEn: 'Enhanced version with 10% faster attack.'
                  },
                  {
                    name: 'Lightning',
                    img: '/images/miracle/items/lightning_training_sword_7493.gif',
                    reduction: '-15% de Intervalo',
                    meleeCharges: '7.200 charges',
                    magicCharges: '5.400 charges',
                    shieldCharges: '14.400 charges',
                    descPt: 'Velocidade elétrica para treinos intensivos.',
                    descEn: 'Lightning speed for intensive training.'
                  },
                  {
                    name: 'Inferno',
                    img: '/images/miracle/items/inferno_training_sword_7499.gif',
                    reduction: '-20% de Intervalo',
                    meleeCharges: '10.800 charges',
                    magicCharges: '7.200 charges',
                    shieldCharges: '21.600 charges',
                    descPt: '20% mais rápida que armas normais.',
                    descEn: '20% faster than standard weapons.'
                  },
                  {
                    name: 'Shadow',
                    img: '/images/miracle/items/shadow_training_sword_9599.gif',
                    reduction: '-20% de Intervalo',
                    meleeCharges: '21.600 charges',
                    magicCharges: '14.400 charges',
                    shieldCharges: '43.200 charges',
                    descPt: 'Tier lendário com a maior quantidade de cargas.',
                    descEn: 'Legendary tier with maximum charges.'
                  }
                ].map((t) => (
                  <div key={t.name} className="bg-black/60 p-3.5 rounded-lg border border-white/10 flex flex-col justify-between">
                    <div className="space-y-2 text-center">
                      <img src={t.img} alt={t.name} className="w-8 h-8 object-contain pixelated mx-auto" />
                      <span className="font-bold text-xs uppercase text-medieval-gold block">{t.name}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-bold block">
                        {t.reduction}
                      </span>
                      <p className="text-[11px] text-stone-400 leading-snug">
                        {language === 'pt' ? t.descPt : t.descEn}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-stone-300 font-mono space-y-1">
                      <div><strong>Melee/Dist:</strong> {t.meleeCharges}</div>
                      <div><strong>Magic:</strong> {t.magicCharges}</div>
                      <div><strong>Shield:</strong> {t.shieldCharges}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AS 7 ARMAS BÁSICAS */}
            <div className="space-y-3 pt-4 border-t border-medieval-gold/20">
              <h3 className="text-base font-bold text-medieval-gold uppercase tracking-wider">
                {language === 'pt' ? 'Catálogo das 7 Armas de Treino Base' : 'The 7 Base Training Weapons'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { name: 'Training Sword', img: '/images/miracle/items/training_sword_7481.gif', skill: 'Sword' },
                  { name: 'Training Axe', img: '/images/miracle/items/training_axe_7482.gif', skill: 'Axe' },
                  { name: 'Training Club', img: '/images/miracle/items/training_club_7483.gif', skill: 'Club' },
                  { name: 'Training Spear', img: '/images/miracle/items/training_spear_7613.gif', skill: 'Distance' },
                  { name: 'Training Wand', img: '/images/miracle/items/training_wand_7486.gif', skill: 'Magic Level' },
                  { name: 'Training Rod', img: '/images/miracle/items/training_rod_7485.gif', skill: 'Magic Level' },
                  { name: 'Training Shield', img: '/images/miracle/items/training_shield_7505.gif', skill: 'Shielding' },
                ].map((w) => (
                  <div key={w.name} className="bg-black/60 p-3 rounded-lg border border-medieval-gold/20 flex flex-col items-center gap-1.5 text-center">
                    <img src={w.img} alt={w.name} className="w-8 h-8 object-contain pixelated" />
                    <span className="font-bold text-xs text-stone-200 line-clamp-1">{w.name}</span>
                    <span className="text-[10px] font-mono text-medieval-gold/70">{w.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 8. SPAWN & DEMONIC ESSENCES
  // -------------------------------------------------------------
  const renderSpawnDemonic = () => (
    <motion.div
      key="spawn-demonic-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 text-left"
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
                ? 'Dinâmica dos campos de spawn roxos e vermelhos e evolução com Demonic Essences.'
                : 'Dynamics of purple and red spawn fields and demonic essence upgrades.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              {language === 'pt'
                ? 'Ao redor do mapa de Miracle 7.4 você encontrará áreas de caça com campos mágicos coloridos no chão que afetam o comportamento e os atributos dos monstros gerados:'
                : 'Around Miracle 7.4 world map you will encounter hunting grounds featuring magical colored ground fields that modify monster behavior and attributes:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/60 p-4 rounded-xl border border-purple-500/30 space-y-2">
                <span className="font-bold text-purple-400 uppercase text-xs block">
                  {language === 'pt' ? 'Campos Roxos (Respawn Acelerado)' : 'Purple Fields (Fast Respawn)'}
                </span>
                <p className="text-xs text-stone-300">
                  {language === 'pt'
                    ? 'Reduzem o intervalo de tempo para que as criaturas renasçam no respawn (-10s a -2.5s), permitindo caçadas contínuas de alta densidade sem pausas.'
                    : 'Reduces monster respawn interval (-10s to -2.5s), allowing uninterrupted high-density hunting.'}
                </p>
              </div>

              <div className="bg-black/60 p-4 rounded-xl border border-red-500/30 space-y-2">
                <span className="font-bold text-red-400 uppercase text-xs block">
                  {language === 'pt' ? 'Campos Vermelhos (Monstros Fortificados)' : 'Red Fields (Empowered Monsters)'}
                </span>
                <p className="text-xs text-stone-300">
                  {language === 'pt'
                    ? 'Concedem um bônus de +2% a +10% de atributos, pontos de experiência e chance de loot às criaturas que nascem sobre eles.'
                    : 'Grants +2% to +10% bonus attributes, experience points, and loot drop chance to monsters spawned upon them.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const systems = [
    {
      id: 'relic_box',
      name: language === 'pt' ? 'Relic Box' : 'Relic Box',
      desc: language === 'pt' ? 'Container exclusivo de 4 slots para relíquias mágicas e Djinn Magic.' : 'Exclusive 4-slot container for magical relics and Djinn Magic.',
      icon: '/images/miracle/features/relicbox.png'
    },
    {
      id: 'attribution',
      name: language === 'pt' ? 'Attribution System' : 'Attribution System',
      desc: language === 'pt' ? 'Encantamento com Mystic Runes, 50 atributos, Arcane Bless e tabela de chances.' : 'Mystic Rune enchantments, 50 attributes, Arcane Bless and chance table.',
      icon: '/images/miracle/features/grand_arcane_orb.png'
    },
    {
      id: 'exaltation_forge',
      name: language === 'pt' ? 'Exaltation Forge' : 'Exaltation Forge',
      desc: language === 'pt' ? 'Tiers (Classes 1 a 5), Fusão, Cristais de proteção, Convergência e Transcendência.' : 'Tiers (Classes 1-5), Fusion, Protection crystals, Convergence, and Transcendence.',
      icon: '/images/miracle/features/8354.gif'
    },
    {
      id: 'shop_idle',
      name: language === 'pt' ? 'Player Shop' : 'Player Shop',
      desc: language === 'pt' ? 'Como comprar licença na Store, abrir banca em PZ e vender itens deslogado (Idle Shop).' : 'How to buy license, open PZ store, and sell items offline (Idle Shop).',
      icon: '/images/miracle/features/playershop.png'
    },
    {
      id: 'houses_lands',
      name: language === 'pt' ? 'Casas & Terrenos' : 'Houses & Lands',
      desc: language === 'pt' ? 'Compra por leilão no site, transferência segura Move Out e magias in-game.' : 'Website bids, Move Out secure transfers, and in-game house spells.',
      icon: '/images/miracle/features/house_move_out.png'
    },
    {
      id: 'bed_maker',
      name: language === 'pt' ? 'Bed Maker' : 'Bed Maker Guide',
      desc: language === 'pt' ? 'O ciclo de 3h20m, 39m59s de comida e 200 mana para magos e druidas runarem.' : 'The 3h20m cycle, 39m59s food, and 200 mana runic strategy.',
      icon: '/images/miracle/items/meat_2666.gif'
    },
    {
      id: 'armas_treino',
      name: language === 'pt' ? 'Armas de Treino' : 'Training Weapons',
      desc: language === 'pt' ? 'Intervalo de ataque reduzido (-10% a -20%), cargas por tier e treino contra monstros.' : 'Reduced attack interval (-10% to -20%), charges per tier, and creature training.',
      icon: '/images/miracle/items/training_sword_7481.gif'
    },
    {
      id: 'spawn_demonic',
      name: language === 'pt' ? 'Spawn & Demonic Essences' : 'Spawn & Essences',
      desc: language === 'pt' ? 'Campos roxos de respawn acelerado e vermelhos de monstros fortificados.' : 'Purple fast respawns and red empowered monster fields.',
      icon: '/images/miracle/features/demonicessence.gif'
    }
  ];

  return (
    <div className="space-y-8 text-left">
      <AnimatePresence mode="wait">
        {selectedSystem === 'relic_box' && renderRelicBox()}
        {selectedSystem === 'attribution' && renderAttributionSystem()}
        {selectedSystem === 'exaltation_forge' && renderExaltationForge()}
        {selectedSystem === 'spawn_demonic' && renderSpawnDemonic()}
        {selectedSystem === 'shop_idle' && renderPlayerShop()}
        {selectedSystem === 'houses_lands' && renderHousesLands()}
        {selectedSystem === 'bed_maker' && renderBedMaker()}
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
              <h1 className="text-3xl sm:text-4xl font-black text-medieval-gold uppercase tracking-tighter mb-3 relative drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {language === 'pt' ? 'Sistemas Custom' : 'Custom Systems'}
              </h1>
              <p className="text-medieval-gold/70 font-mono text-xs max-w-2xl mx-auto italic tracking-wide">
                {language === 'pt' 
                  ? 'Guias oficiais detalhados passo a passo de todas as mecânicas exclusivas do servidor Miracle 7.4.' 
                  : 'Detailed step-by-step official guides of all exclusive mechanics in Miracle 7.4.'}
              </p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-medieval-gold/40 to-transparent mx-auto mt-6"></div>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {systems.map((sys) => (
                <button 
                  key={sys.id}
                  onClick={() => setSelectedSystem(sys.id)}
                  className="p-5 text-left group border relative overflow-hidden flex flex-col justify-between min-h-[160px] rounded-xl transition-all duration-300 bg-gradient-to-br from-black/80 to-black/90 border-medieval-gold/20 hover:border-medieval-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:-translate-y-1 cursor-pointer"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-black/60 border border-medieval-gold/30 p-1 flex items-center justify-center shadow-md">
                        <img src={sys.icon} alt={sys.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                        {language === 'pt' ? 'Disponível' : 'Available'}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-medieval-gold uppercase group-hover:text-yellow-300 transition-colors">
                      {sys.name}
                    </h3>
                    <p className="text-xs text-stone-300/80 leading-relaxed line-clamp-2">
                      {sys.desc}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-medieval-gold/60 group-hover:text-medieval-gold font-bold uppercase tracking-wider">
                    <span>{language === 'pt' ? 'Acessar Guia' : 'Open Guide'}</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
