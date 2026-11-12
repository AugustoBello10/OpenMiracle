import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ExternalLink, ChevronLeft, 
  Search, Info, CheckCircle2, AlertTriangle, ShieldCheck
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
                ? 'No Miracle 7.4, todo personagem possui uma caixa mágica chamada Relic Box dentro do seu inventário. Ela funciona como uma extensão do seu equipamento, contendo 4 slots exclusivos para relíquias que você encontra em baús secretos, missões ou caçando criaturas pelo mapa.'
                : 'In Miracle 7.4, every character carries a magical Relic Box inside their inventory. It acts as an equipment extension with 4 exclusive slots for relics discovered in secret chests, quests, or hunting.'}
            </p>

            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 flex flex-col sm:flex-row items-center gap-6">
              <img 
                src="/images/miracle/features/relicbox.png" 
                alt="Relic Box Inventory" 
                className="max-h-24 object-contain rounded border border-medieval-gold/30 p-1 bg-black/80 shadow-md" 
              />
              <div className="space-y-2 text-xs sm:text-sm text-stone-300">
                <p className="font-bold text-medieval-gold uppercase tracking-wider">
                  {language === 'pt' ? 'Como Equipar e Regra Única' : 'Equipping Rules'}
                </p>
                <p>
                  {language === 'pt'
                    ? 'Para equipar uma relíquia, basta arrastá-la da sua mochila para um dos 4 slots da Relic Box. Importante: você só pode equipar uma relíquia de cada tipo por vez (não é permitido equipar duas relíquias idênticas para duplicar o bônus).'
                    : 'To equip a relic, drag it from your backpack into one of the 4 Relic Box slots. You can only equip one relic of each type at any given time.'}
                </p>
              </div>
            </div>

            <PrerequisitesCard
              language={language}
              title={language === 'pt' ? 'Como Desbloquear os Slots da Relic Box' : 'Unlocking Relic Box Slots'}
              items={[
                {
                  label: language === 'pt' ? 'Slots Iniciais' : 'Initial Slots',
                  value: language === 'pt' ? '2 slots desbloqueados por padrão no início do jogo' : '2 slots unlocked by default at character creation',
                },
                {
                  label: language === 'pt' ? 'Desbloqueio do 3º Slot' : '3rd Slot Unlock',
                  value: language === 'pt' ? 'Completar com sucesso a Missão 1 (Mission 1) da Relic Quest' : 'Complete Mission 1 of the Relic Quest',
                },
                {
                  label: language === 'pt' ? 'Desbloqueio do 4º Slot' : '4th Slot Unlock',
                  value: language === 'pt' ? 'Completar com sucesso a Missão 2 (Mission 2) da Relic Quest' : 'Complete Mission 2 of the Relic Quest',
                },
                {
                  label: language === 'pt' ? 'Recarga de Poder (Djinn Magic)' : 'Djinn Magic Recharge',
                  value: language === 'pt' ? 'Tempo de recarga de 48 horas entre usos de poderes especiais' : '48-hour cooldown between relic special powers',
                },
              ]}
            />
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
  // 3. EXALTATION FORGE (CHANGELOG DISCORD 03/08)
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
                ? 'Guia completo e detalhado de Tiers, Fusão, Cristais de Proteção, Convergência e Transcendência.'
                : 'Complete comprehensive guide to Tiers, Fusion, Protection Crystals, Convergence, and Transcendence.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              A <strong>Exaltation Forge</strong> é o sistema de forja avançada do Miracle 7.4. Ela permite que você pegue itens classificados (armas, armaduras, elmos, pernas e escudos de Classe 1 a 4+) e eleve o seu <strong>Tier</strong> através de rituais mágicos, destravando aumentos de atributos astronômicos e o poder da <strong>Transcendência</strong>.
            </p>

            <p>
              Para utilizar a forja, todo o procedimento ocorre dentro de um baú especial chamado <strong>Exaltation Chest</strong>. Esse baú pode ser encontrado no mapa dentro de <strong>Dwacatra</strong> (a prisão secreta de Kazordoon) ou adquirido diretamente através da Store in-game para colocar na sua casa.
            </p>

            {/* SEÇÃO 1: FUSÃO */}
            <div className="space-y-4 pt-4 border-t border-medieval-gold/20">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider">
                1. Fusão (Fusion) - Como Subir o Tier do seu Item
              </h3>
              
              <p>
                A Fusão é o processo utilizado para aumentar o Tier de um equipamento. Todo item elegível começa no <strong>Tier 0</strong>. Quando você realiza uma fusão bem-sucedida, você consome dois itens idênticos para forjar um item novo do próximo nível (Tier 1, Tier 2, etc.).
              </p>

              <div className="bg-black/60 p-5 rounded-xl border border-medieval-gold/20 space-y-4">
                <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                  O que você precisa colocar no baú e ter em mãos:
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-white/5">
                    <div className="w-10 h-10 rounded bg-black flex items-center justify-center p-1 shrink-0 border border-medieval-gold/30">
                      <img src="/images/miracle/items/magic_sword_2400.gif" alt="Item Idêntico" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-200 block">2 Itens Estritamente Idênticos</span>
                      <p className="text-[11px] text-stone-400">Exatamente o mesmo equipamento e no mesmo Tier (ex: 2 Knight Axes Tier 0).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-white/5">
                    <div className="w-10 h-10 rounded bg-black flex items-center justify-center p-1 shrink-0 border border-medieval-gold/30">
                      <img src="/images/miracle/items/reagent_crystal_8354.gif" alt="Reagent Crystal" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-200 block">Reagent Crystal</span>
                      <p className="text-[11px] text-stone-400">Obtido com a profissão de Mineração ao quebrar Shrine Stones com pick. É usado diretamente no baú para iniciar o ritual.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-white/5">
                    <div className="w-10 h-10 rounded bg-black flex items-center justify-center p-1 shrink-0 border border-medieval-gold/30">
                      <img src="/images/miracle/items/crystal_coin_2160.gif" alt="Gold Coins" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-200 block">Taxa em Gold Coins & Crests</span>
                      <p className="text-[11px] text-stone-400">Valores em ouro e brasões debitados conforme a classe e o nível de tier que você está tentando criar.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-white/5">
                    <div className="w-10 h-10 rounded bg-black flex items-center justify-center p-1 shrink-0 border border-medieval-gold/30">
                      <img src="/images/miracle/items/rare_crystal_8179.gif" alt="Rare Crystal" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-stone-200 block">Cristais de Taxa de Sucesso (Opcionais)</span>
                      <p className="text-[11px] text-stone-400">Coloque dentro do baú um Rare Crystal (+30% de chance) ou Prismatic Crystal (+50% de chance) para não arriscar perder a forja.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PASSO A PASSO DA FUSÃO */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-medieval-gold uppercase tracking-wider">
                  Passo a Passo Prático da Fusão:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm pl-2">
                  <li>Abra o <strong>Exaltation Chest</strong> dando clique com botão direito nele.</li>
                  <li>Arraste os <strong>2 itens idênticos</strong> para dentro do baú.</li>
                  <li>Se você tiver um <strong>Rare Crystal (+30%)</strong> ou <strong>Prismatic Crystal (+50%)</strong>, coloque dentro do baú para aumentar a probabilidade de acerto.</li>
                  <li>Certifique-se de que o ouro (Gold) e os Crests necessários estejam na sua backpack.</li>
                  <li>Clique com o <strong>botão direito no Reagent Crystal</strong> na sua mochila e com a mira ("crosshair") clique com o <strong>botão esquerdo diretamente sobre o Exaltation Chest</strong>.</li>
                  <li>O ritual é executado imediatamente. Se for bem-sucedido, o item do próximo Tier aparecerá dentro do baú!</li>
                </ol>
              </div>

              {/* PEDRAS DE PROTEÇÃO */}
              <div className="bg-black/60 p-4 rounded-xl border border-sky-500/20 space-y-3">
                <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider">
                  Como Proteger seus Itens e Atributos de Quebrar:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-sky-500/30">
                    <img src="/images/miracle/items/earth_stone_7601.gif" alt="Earth Stone" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <strong className="text-sky-300 block mb-0.5">Earth Stone (Proteção de Atributos)</strong>
                      <p>Dê Use na pedra e clique no seu item antes da fusão. Ela encanta o equipamento com o efeito <em>Earth Guard</em> por 15 minutos. Isso garante que todos os atributos místicos já encantados sejam transferidos intactos para o item do novo Tier.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/80 p-3 rounded-lg border border-sky-500/30">
                    <img src="/images/miracle/items/frozen_stone_7602.gif" alt="Frozen Stone" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <strong className="text-sky-300 block mb-0.5">Frozen Stone (Proteção contra Destruição)</strong>
                      <p>Encanta o item com <em>Frozen Guard</em> por 15 minutos. Se a fusão falhar, o equipamento <strong>não será quebrado/destruído</strong> (se for Tier 0) e a chance de rebaixar de tier (downgrade) é reduzida pela metade (-50%).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEÇÃO 2: CONVERGÊNCIA */}
            <div className="space-y-4 pt-6 border-t border-medieval-gold/20">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider">
                2. Convergência (Convergence) - Como Transferir Tiers entre Itens
              </h3>
              
              <p>
                A Convergência é o processo que permite transferir o nível de Tier de um item avançado para outro equipamento da mesma ou menor classificação, com <strong>100% de taxa de sucesso garantida</strong>! Esse sistema é perfeito quando você troca de arma ou armadura e não quer recomeçar a forja do zero.
              </p>

              <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
                <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                  Requisitos Obrigatórios para a Convergência:
                </h4>
                <ul className="list-disc list-inside space-y-2 text-xs text-stone-300">
                  <li><strong>Itens Elegíveis:</strong> O equipamento de origem deve ser de <strong>Classe 4 ou superior</strong>.</li>
                  <li><strong>O que colocar no baú:</strong> Exatamente 2 equipamentos — um deles deve ser <strong>Tier 0</strong> (o item que vai receber o tier) e o outro deve ter <strong>Tier 2 ou maior</strong> (o item que vai doar o tier).</li>
                  <li><strong>Itens necessários dentro do baú:</strong> Um <strong className="text-sky-300">Convergence Crystal</strong>, a quantidade exigida de <strong className="text-amber-300">Exalted Cores</strong> e o Gold acordado.</li>
                </ul>

                <div className="flex items-center gap-4 bg-black/80 p-3 rounded-lg border border-white/5 mt-2">
                  <img src="/images/miracle/items/convergence_crystal_8181.gif" alt="Convergence Crystal" className="w-8 h-8 object-contain" />
                  <img src="/images/miracle/items/exalted_core_7509.gif" alt="Exalted Core" className="w-8 h-8 object-contain" />
                  <p className="text-xs text-stone-300">
                    <strong>Como iniciar:</strong> Coloque os itens no baú, dê clique com botão direito no <strong>Reagent Crystal</strong> e use-o no Exaltation Chest. O item doador transfere seu nível de tier menos um (ex: um Tier 3 vira Tier 2 no novo item) com 100% de certeza!
                  </p>
                </div>
              </div>
            </div>

            {/* SEÇÃO 3: TRANSCENDÊNCIA */}
            <div className="space-y-4 pt-6 border-t border-medieval-gold/20">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider">
                3. Transcendência (Transcendence) - Quebrando os Limites do Item
              </h3>
              
              <p>
                A Transcendência é um estado supremo ativado em equipamentos de Tier elevado. Ela não cria atributos do nada; ela pega os atributos já encantados no item e <strong>multiplica temporariamente o seu poder</strong> para patamares muito acima do limite normal do jogo.
              </p>

              <p className="text-xs text-stone-400">
                Cada item pode ter no máximo <strong>3 tipos de transcendência simultâneos</strong> ativos. Abaixo estão os 6 tipos oficiais e os materiais exatos necessários para ativar cada um:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    name: 'Dominion',
                    gemImg: '/images/miracle/items/red_gem_2156.gif',
                    subImg: '/images/miracle/items/small_ruby_2147.gif',
                    mats: 'Red Gem + Small Rubies + Exalted Cores',
                    desc: 'Aumenta Attack, Life Leech, Burning, Fire Damage, Armor, Health Regen, Absorb Health, Protect Fire, Reflect Fire, Protect Life Drain.'
                  },
                  {
                    name: 'Bastion',
                    gemImg: '/images/miracle/items/blue_gem_2158.gif',
                    subImg: '/images/miracle/items/small_sapphire_2146.gif',
                    mats: 'Blue Gem + Small Sapphires + Exalted Cores',
                    desc: 'Aumenta Defense, Mana Leech, Freeze, Ice Damage, Mana Regen, Absorb Mana, Protect Ice, Reflect Ice.'
                  },
                  {
                    name: 'Sorcery',
                    gemImg: '/images/miracle/items/violet_gem_2153.gif',
                    subImg: '/images/miracle/items/small_amethyst_2150.gif',
                    mats: 'Violet Gem + Small Amethyst + Exalted Cores',
                    desc: 'Aumenta Magic Level, Electrify, Energy Damage, Max Mana, Mana Healing, Protect Energy, Reflect Energy, Protect Mana Drain.'
                  },
                  {
                    name: 'Mastery',
                    gemImg: '/images/miracle/items/green_gem_2155.gif',
                    subImg: '/images/miracle/items/small_emerald_2149.gif',
                    mats: 'Green Gem + Small Emeralds + Exalted Cores',
                    desc: 'Aumenta Skills (Axe, Club, Sword, Distance, Shielding), Poison, Poison Damage, Max Health, Healing, Protect Poison, Reflect Poison.'
                  },
                  {
                    name: 'Focus',
                    gemImg: '/images/miracle/items/yellow_gem_2154.gif',
                    subImg: '/images/miracle/items/small_topaz_9476.gif',
                    mats: 'Yellow Gem + Small Topaz + Exalted Cores',
                    desc: 'Aumenta Critical Hit/Spell, Perfuration, Crushing Blow, Attack Interval, Hit Chance, Physical Damage, Mitigation, Momentum.'
                  },
                  {
                    name: 'Supremacy',
                    gemImg: '/images/miracle/items/small_diamond_2145.gif',
                    subImg: '/images/miracle/items/exalted_core_7509.gif',
                    mats: 'Rainbow Gem + Small Diamond + Exalted Cores',
                    desc: 'Aumenta Speed, Dodge, Vibrancy, Double Bash, Bleeding, Berserk, Destruction, Death Damage, Protect Death, Protect Elements.'
                  }
                ].map((t) => (
                  <div key={t.name} className="bg-black/60 p-3.5 rounded-lg border border-white/10 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 pb-1 border-b border-white/5">
                        <img src={t.gemImg} alt={t.name} className="w-6 h-6 object-contain" />
                        <img src={t.subImg} alt={t.name} className="w-4 h-4 object-contain" />
                        <span className="font-bold text-xs uppercase text-medieval-gold">{t.name}</span>
                      </div>
                      <p className="text-[11px] text-stone-300 leading-snug">{t.desc}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-stone-400 font-mono">
                      <strong>Requisitos:</strong> {t.mats}
                    </div>
                  </div>
                ))}
              </div>

              {/* REMOÇÃO DE TRANSCENDÊNCIA */}
              <div className="bg-black/80 p-4 rounded-xl border border-red-500/30 space-y-2 text-xs text-stone-300 mt-4">
                <span className="font-bold text-red-400 uppercase tracking-wider block">
                  Como Remover ou Limpar as Transcendências de um Item:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  <div className="flex items-start gap-3 bg-black/60 p-2.5 rounded border border-white/5">
                    <div className="w-8 h-8 rounded bg-black/80 flex items-center justify-center p-1 shrink-0 border border-white/10">
                      <span className="text-[10px] font-mono font-bold text-stone-300">GEM</span>
                    </div>
                    <div>
                      <strong className="text-stone-200 block text-xs">Black Gem</strong>
                      <p className="text-[11px] text-stone-400">Remove todas as transcendências do item, mantendo os atributos encantados normais 100% intactos.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-black/60 p-2.5 rounded border border-white/5">
                    <img src="/images/miracle/items/fiery_stone_7511.gif" alt="Fiery Stone" className="w-8 h-8 object-contain shrink-0" />
                    <div>
                      <strong className="text-red-400 block text-xs">Fiery Stone</strong>
                      <p className="text-[11px] text-stone-400">Destrói tanto as transcendências quanto todos os atributos encantados, resetando o item completamente.</p>
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
              Player Shop (Mercado Offline)
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Como comprar a licença, abrir a banca in-game e vender itens enquanto estiver deslogado.'
                : 'How to purchase license, configure shop in-game, and sell goods while logged off.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              O <strong>Player Shop</strong> é uma funcionalidade que permite que você transforme o seu próprio personagem em um vendedor comercial fixo no mapa. Qualquer outro jogador que passar perto do seu boneco pode clicar nele, ver a sua lista de itens, ler a sua descrição e comprar os produtos na hora. O mais importante: a sua loja continua funcionando mesmo depois que você fecha o jogo e desliga o computador (modo <strong>Idle Shop</strong>)!
            </p>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
              Passo a Passo: Como Montar a sua Loja do Zero
            </h3>

            {/* PASSO 1 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                Passo 1: Comprar o Private Store Document
              </h4>
              <p className="text-xs sm:text-sm">
                No cliente do jogo, olhe no canto inferior direito da tela (abaixo da sua mochila e dos equipamentos). Você verá um botão azul escrito <strong>"Store"</strong>.
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-stone-300 pl-2">
                <li>Clique no botão <strong>Store</strong> para abrir a loja do servidor.</li>
                <li>No menu da esquerda da janela, clique na categoria <strong>"Utilities"</strong>.</li>
                <li>Clique no item chamado <strong>"Private Store Document"</strong> (ele custa 10 Miracle Points).</li>
                <li>Clique no botão azul <strong>"Buy Now!"</strong> para concluir a compra. O documento irá direto para a sua mochila principal.</li>
              </ul>
              <div className="mt-2">
                <img src="/images/miracle/features/store_private_shop.jpg" alt="Aba Utilities na Store" className="w-full max-w-lg rounded border border-white/10" />
                <span className="text-[10px] text-gray-400 font-mono block mt-1">Tela da Store mostrando a categoria Utilities e o Private Store Document de 10 Points.</span>
              </div>
            </div>

            {/* PASSO 2 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                Passo 2: Ativar o Documento no Personagem
              </h4>
              <p className="text-xs sm:text-sm">
                Com o <em>Private Store Document</em> dentro da sua mochila, clique nele com o <strong>botão direito do mouse</strong> e em seguida clique com o <strong>botão esquerdo sobre o seu próprio personagem</strong>.
              </p>
              <p className="text-xs text-stone-300">
                Uma mensagem de confirmação aparecerá no seu Server Log. A partir desse instante, seu personagem tem a autorização oficial para abrir lojas durante as próximas <strong>48 horas seguidas</strong>.
              </p>
            </div>

            {/* PASSO 3 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                Passo 3: Escolher o Local Correto na Cidade
              </h4>
              <p className="text-xs sm:text-sm">
                Caminhe até uma área de <strong>Protection Zone (PZ)</strong> permitida para comércio (por exemplo, as praças e depósitos das cidades de Thais, Carlin, Edron, Venore, Ankrahmun).
              </p>
              <div className="bg-black/80 p-3 rounded-lg border border-amber-500/30 text-xs text-amber-200">
                <strong>Regra Crucial dos 8 Quadrados (SQMs):</strong> Não pode existir absolutamente NENHUM item, móvel, parcela ou criatura nos 8 quadrados que cercam o seu personagem. Fique em um ponto totalmente livre para não bloquear o fluxo de jogadores.
              </div>
            </div>

            {/* PASSO 4 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                Passo 4: Abrir a Janela da Loja
              </h4>
              <p className="text-xs sm:text-sm">
                Posicionado no local correto, clique com o <strong>botão direito do mouse em cima do seu próprio personagem</strong>. No menu suspenso de contexto que se abrirá, clique na opção <strong>"Open Shop"</strong>.
              </p>
              <div className="mt-2">
                <img src="/images/miracle/features/open_shop_menu.png" alt="Menu de Contexto com Open Shop" className="max-w-xs rounded border border-white/10" />
                <span className="text-[10px] text-gray-400 font-mono block mt-1">Menu de contexto ao clicar no personagem com o botão direito.</span>
              </div>
            </div>

            {/* PASSO 5 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                Passo 5: Colocar os Itens à Venda e Definir Preços
              </h4>
              <p className="text-xs sm:text-sm">
                A janela cinza da sua loja será aberta na tela:
              </p>
              <ul className="list-decimal list-inside space-y-1.5 text-xs text-stone-300 pl-2">
                <li>Abra a sua mochila (Backpack). <em>Atenção: os itens que você quer vender DEVEM estar dentro da sua mochila, nunca equipados no seu corpo!</em></li>
                <li>Clique no item dentro da mochila, segure e <strong>arraste para dentro da grande área cinza da janela da loja</strong>.</li>
                <li>Clique sobre o item dentro da lista da loja. No campo <strong>"Price (un)"</strong>, digite quanto você quer cobrar por cada unidade em Gold Coins.</li>
                <li>No campo <strong>"Amount"</strong>, ajuste a quantidade total que você deseja disponibilizar para venda.</li>
                <li>Clique no botão <strong>"Edit Description"</strong> no canto superior direito para dar um nome chamativo para sua loja (ex: "Runas Baratas", "Equipamentos Knight").</li>
                <li>No canto superior esquerdo, observe a taxa <strong>"Fee: 5%"</strong>: o servidor desconta uma taxa automática de 5% sobre cada venda efetuada.</li>
              </ul>
              <div className="mt-2">
                <img src="/images/miracle/features/player_shop_window.jpg" alt="Janela de Configuração da Loja" className="w-full max-w-md rounded border border-white/10" />
                <span className="text-[10px] text-gray-400 font-mono block mt-1">Janela da loja com campos de preço, quantidade, taxa de 5% e botões Start Shop / Idle Shop.</span>
              </div>
            </div>

            {/* PASSO 6 */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h4 className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                Passo 6: Iniciar as Vendas e Modo Idle Shop (Offline)
              </h4>
              <p className="text-xs sm:text-sm">
                Depois de organizar todos os seus itens e preços:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-300 pl-2">
                <li>Clique no botão <strong>"Start Shop"</strong> na parte inferior da janela. O seu personagem assumirá a postura fixa de comerciante.</li>
                <li>Para que a loja continue vendendo depois que você fechar o jogo, certifique-se de que a opção <strong>"Idle Shop"</strong> esteja ativa.</li>
                <li>Pronto! Você pode fechar o cliente do jogo. Seu personagem permanecerá visível no mapa vendendo os itens, e todo o ouro recebido será transferido com total segurança direto para a sua conta no banco do jogo.</li>
              </ul>
            </div>

            {/* AVISOS IMPORTANTES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-black/80 p-4 rounded-xl border border-amber-500/30 space-y-2 text-xs text-stone-300">
                <strong className="text-amber-400 uppercase tracking-wider block">Regra de Conta e Multi-Clienting:</strong>
                <p>Enquanto o seu personagem estiver ativo em <em>Idle Shop</em>, você <strong>não conseguirá logar outro personagem da MESMA conta</strong>. No entanto, você tem permissão total para criar e jogar com uma conta secundária normalmente enquanto o seu vendedor trabalha.</p>
              </div>

              <div className="bg-black/80 p-4 rounded-xl border border-sky-500/30 space-y-2 text-xs text-stone-300">
                <strong className="text-sky-400 uppercase tracking-wider block">Server Save Diário (Reset):</strong>
                <p>Todos os dias, durante o Server Save matinal, o servidor é reinicializado para manutenção e todas as lojas de jogadores são fechadas. Portanto, após o Server Save, basta logar no personagem e clicar em <em>Open Shop</em> novamente.</p>
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
              Casas, Terrenos & Camas
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Como arrematar casas em leilão no site, transferir com segurança pelo Move Out e magias in-game.'
                : 'How to bid on houses on the site, transfer safely via Move Out, and house spells.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              Ter uma casa no Miracle 7.4 permite guardar itens com segurança, decorar sua residência, colocar dummies privados para treinar skills e utilizar camas para regenerar Vida e Mana enquanto você estiver deslogado.
            </p>

            {/* SEÇÃO 1: COMO COMPRAR */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
                1. Como Comprar uma Casa (Sistema de Leilão no Site)
              </h3>
              <p>
                No Miracle, as casas <strong>não são compradas com comandos dentro do jogo</strong>. A compra é realizada através de um leilão público (Bids) pelo site oficial do servidor:
              </p>
              
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm pl-2">
                <li>Abra o navegador e acesse a página de casas do Miracle (<strong>miracle74.com/?subtopic=houses</strong>).</li>
                <li>Faça login com a sua conta e selecione a cidade desejada no filtro.</li>
                <li>Procure pelas casas que estejam com o status livre ou em leilão.</li>
                <li>Clique na casa para abrir os detalhes e insira o seu lance (Bid) em Gold Coins.</li>
                <li><strong>Duração do Leilão:</strong> A partir do momento em que o primeiro jogador dá um lance, o leilão dura exatamente <strong>2 dias</strong> e se encerra rigorosamente durante o <strong>Server Save do segundo dia</strong>. Quem tiver dado a maior oferta arremata a casa.</li>
                <li><strong>Regra do Dinheiro no Banco (Crucial):</strong> O valor total do seu lance somado ao valor do primeiro aluguel DEVE estar depositado no <strong>Banco do jogo</strong> (não na sua mochila!). No momento do Server Save, o sistema faz o débito automático. Se você não tiver saldo suficiente no banco, o lance é cancelado e você perde a casa.</li>
              </ol>
            </div>

            {/* SEÇÃO 2: COMO TRANSFERIR */}
            <div className="space-y-4 pt-6 border-t border-medieval-gold/20">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
                2. Como Vender / Transferir Casas entre Jogadores (Move Out)
              </h3>
              
              <p>
                Para evitar roubos, golpes ou calotes entre jogadores, as transferências de casas no Miracle são feitas de forma 100% automatizada e segura pelo próprio site através da função <strong>Move Out</strong>:
              </p>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="space-y-2 flex-1 text-xs sm:text-sm">
                  <ol className="list-decimal list-inside space-y-1.5">
                    <li>O jogador que é o dono atual da casa faz login na sua conta no site do Miracle.</li>
                    <li>Navega até o personagem proprietário, clica no link da sua casa e clica no botão <strong>"Move Out"</strong>.</li>
                    <li>Preenche o campo com o <strong>Nick exato do jogador comprador</strong>, digita o <strong>valor combinado em gold</strong> e confirma digitando a sua senha.</li>
                    <li>O comprador deve deixar o valor combinado depositado no <strong>Banco do jogo</strong>. <em>Nunca entregue dinheiro em mãos in-game!</em></li>
                    <li>Durante o próximo Server Save, o sistema transfere a propriedade da casa para o comprador e credita o ouro diretamente na conta bancária do vendedor.</li>
                  </ol>
                </div>
                <div className="w-full md:w-80 bg-black/60 p-2 rounded-lg border border-medieval-gold/30 shrink-0">
                  <img src="/images/miracle/features/house_move_out.png" alt="Move Out no Site" className="w-full rounded" />
                  <span className="text-[10px] text-gray-400 font-mono block text-center mt-1">Interface do Move Out no site oficial.</span>
                </div>
              </div>
            </div>

            {/* SEÇÃO 3: MAGIAS IN-GAME */}
            <div className="space-y-4 pt-6 border-t border-medieval-gold/20">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
                3. Magias de Casa (Gerenciamento de Portas e Convidados)
              </h3>

              <div className="bg-black/80 p-3 rounded-lg border border-amber-500/30 text-xs text-amber-200">
                <strong>Atenção:</strong> Comandos com ponto de exclamação como <code>!buyhouse</code> ou <code>!leave</code> foram completamente removidos do jogo. Toda a gestão interna da casa é feita exclusivamente pelas magias clássicas do Tibia descritas abaixo:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                  <span className="font-mono text-medieval-gold font-bold text-sm block mb-1">aleta grav</span>
                  <p>Fique de frente para a porta da casa e fale essa magia. Uma janela de texto abrirá para você escrever o nome de quem pode abrir e fechar aquela porta específica.</p>
                </div>

                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                  <span className="font-mono text-medieval-gold font-bold text-sm block mb-1">aleta sio</span>
                  <p>Fale essa magia dentro da casa para abrir a lista de convidados gerais (Guests). Todos os nomes escritos nessa lista poderão entrar livremente na casa.</p>
                </div>

                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                  <span className="font-mono text-medieval-gold font-bold text-sm block mb-1">aleta som</span>
                  <p>Abre a lista de sub-donos (Sub-owners). Jogadores cadastrados aqui têm poder de invitar outros convidados e editar as portas.</p>
                </div>

                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10">
                  <span className="font-mono text-red-400 font-bold text-sm block mb-1">alana grav</span>
                  <p>Expulsa qualquer pessoa que estiver parada exatamente em cima do quadrado da porta trancada para o lado de fora.</p>
                </div>

                <div className="bg-black/60 p-3.5 rounded-lg border border-white/10 sm:col-span-2">
                  <span className="font-mono text-red-400 font-bold text-sm block mb-1">alana sio "NomeDoJogador"</span>
                  <p>Kicka instantaneamente um jogador invasor para fora da casa (se o nome tiver espaços, use aspas).</p>
                </div>
              </div>
            </div>

            {/* SEÇÃO 4: CAMAS */}
            <div className="space-y-3 pt-6 border-t border-medieval-gold/20">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
                4. Como Funciona a Cama (Bed Regeneration)
              </h3>
              <p className="text-xs sm:text-sm">
                Dormir na cama da sua casa permite que seu personagem regenere Vida e Mana passivamente enquanto você estiver deslogado:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-300 pl-2">
                <li><strong>Taxa de Regeneração:</strong> 1 Ponto de Vida (HP) e 1 Ponto de Mana (MP) a cada minuto dormindo.</li>
                <li><strong>A Regra da Comida:</strong> A cama só regenera enquanto o seu personagem tiver tempo de comida no estômago! A cama multiplica a duração da comida consumida em <strong>5 vezes (5x)</strong>. Portanto, antes de dar Use na cama para dormir, coma bastante peixes, carnes ou ham até seu char ficar completamente cheio.</li>
                <li><strong>Limite por Conta:</strong> No máximo <strong>2 personagens da mesma conta</strong> podem estar dormindo ao mesmo tempo em camas.</li>
              </ul>
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
      className="space-y-6 text-left"
    >
      {renderBackBtn()}

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">
              Armas de Treino (Training Weapons)
            </h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Como treinar Skills e Magic Level com bonecos de treino (Dummies) e armas especiais.'
                : 'How to advance Skills and Magic Level using exercise dummies and training weapons.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              O sistema de <strong>Armas de Treino</strong> do Miracle 7.4 foi criado para que você possa avançar suas habilidades de combate (Sword, Axe, Club, Distance, Shielding e Magic Level) de forma contínua e automatizada, sem precisar caçar criaturas fracas ou ficar gastando mana manualmente com runas.
            </p>

            {/* ONDE COMPRAR */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/20 space-y-3">
              <h3 className="text-base font-bold text-medieval-gold uppercase tracking-wider">
                Onde Conseguir as Armas de Treino
              </h3>
              <p className="text-xs sm:text-sm">
                As armas de treino regulares podem ser compradas diretamente com o ferreiro oficial do reino:
              </p>
              <div className="flex items-center gap-3 bg-black/80 p-3 rounded-lg border border-medieval-gold/30">
                <img src="/images/miracle/items/training_sword_7481.gif" alt="Training Sword" className="w-8 h-8 object-contain" />
                <div className="text-xs">
                  <span className="font-bold text-stone-200 block">
                    NPC Sam em Thais ({language === 'pt' ? 'Coordenadas: ' : 'Coords: '} 32361, 32197, 7)
                  </span>
                  <p className="text-stone-400">Ele vende Training Sword, Training Axe, Training Club, Training Spear, Training Rod, Training Wand e Training Shield.</p>
                </div>
              </div>
              <p className="text-xs text-stone-300">
                Além do NPC Sam, versões com mais cargas e tiers aprimorados podem ser adquiridas na Store in-game ou através de fórmulas da profissão de <strong>Alquimia</strong>.
              </p>
            </div>

            {/* COMO USAR PASSO A PASSO */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider border-b border-medieval-gold/10 pb-2">
                Passo a Passo: Como Treinar no Boneco (Dummy)
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm pl-2">
                <li>Compre a arma de treino voltada para a sua classe (Espada para Knight de Sword, Machado para Axe, Clava para Club, Lança para Paladin, Rod/Wand para Magos e Druidas, ou Escudo para treinar Shielding).</li>
                <li>Vá até uma área de treino pública (localizada nas salas de treino das cidades) ou fique de frente para o Dummy privado instalado dentro da sua casa.</li>
                <li><strong>Posicione-se grudado no boneco:</strong> Fique no quadrado (SQM) imediatamente adjacente ao Training Dummy.</li>
                <li>Abra a sua mochila principal onde a arma de treino está guardada.</li>
                <li>Clique com o <strong>botão direito na arma de treino</strong>. O cursor do seu mouse se transformará em uma mira ("crosshair").</li>
                <li>Com a mira ativa, clique com o <strong>botão esquerdo diretamente sobre o Training Dummy</strong>.</li>
                <li>Seu personagem começará a bater automaticamente no boneco de treino. A cada golpe, uma carga da arma é gasta e sua experiência na habilidade sobe instantaneamente.</li>
                <li><strong>Você não precisa ficar clicando:</strong> O ataque é 100% contínuo e automático até que as cargas da arma cheguem a zero ou você mova seu personagem para outro quadrado.</li>
              </ol>
            </div>

            {/* AS 7 ARMAS DE TREINO PRINCIPAIS COM IMAGENS REAIS */}
            <div className="space-y-3 pt-4">
              <h3 className="text-base font-bold text-medieval-gold uppercase tracking-wider">
                Catálogo de Armas de Treino Regulares
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

            {/* OS 5 TIERS DE TREINO COM IMAGENS REAIS */}
            <div className="space-y-3 pt-6 border-t border-medieval-gold/20">
              <h3 className="text-base font-bold text-medieval-gold uppercase tracking-wider">
                Os 5 Tiers de Armas de Treino de Miracle
              </h3>
              <p className="text-xs text-stone-400">
                No Miracle 7.4 existem 5 patamares de armas de treino para cada tipo. Conforme o tier sobe, a velocidade de golpes por segundo e o rendimento por carga aumentam significativamente:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { name: 'Regular', img: '/images/miracle/items/training_sword_7481.gif', desc: 'Armas de treino base vendidas pelo NPC Sam.' },
                  { name: 'Spark', img: '/images/miracle/items/spark_training_sword_7487.gif', desc: 'Armas energizadas com maior taxa de acerto.' },
                  { name: 'Lightning', img: '/images/miracle/items/lightning_training_sword_7493.gif', desc: 'Versão elétrica com velocidade acelerada.' },
                  { name: 'Inferno', img: '/images/miracle/items/inferno_training_sword_7499.gif', desc: 'Armas flamejantes de alta eficiência.' },
                  { name: 'Shadow', img: '/images/miracle/items/shadow_training_sword_9599.gif', desc: 'Tier lendário para o avanço mais veloz do jogo.' },
                ].map((t) => (
                  <div key={t.name} className="bg-black/60 p-3.5 rounded-lg border border-white/10 flex flex-col items-center text-center gap-2">
                    <img src={t.img} alt={t.name} className="w-8 h-8 object-contain pixelated" />
                    <span className="font-bold text-xs uppercase text-medieval-gold">{t.name}</span>
                    <p className="text-[11px] text-stone-400 leading-snug">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RELAÇÃO COM ALQUIMIA */}
            <div className="bg-black/80 p-4 rounded-xl border border-medieval-gold/30 space-y-2 text-xs text-stone-300 mt-4">
              <strong className="text-medieval-gold uppercase tracking-wider block">
                Integração com a Profissão de Alquimia (Alchemy):
              </strong>
              <p>
                Alquimistas experientes produzem elixires e catalisadores que potencializam o treino. Ao ingerir certas poções de foco antes de começar a bater no dummy com sua arma de treino, você recebe um multiplicador temporário que acelera os pontos de avanço concedidos a cada carga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // -------------------------------------------------------------
  // 7. SPAWN & DEMONIC ESSENCES
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
              Ao redor do mapa de Miracle 7.4 você encontrará áreas de caça com campos mágicos coloridos no chão que afetam o comportamento e os atributos dos monstros gerados:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/60 p-4 rounded-xl border border-purple-500/30 space-y-2">
                <span className="font-bold text-purple-400 uppercase text-xs block">Campos Roxos (Respawn Acelerado)</span>
                <p className="text-xs text-stone-300">
                  Reduzem o intervalo de tempo para que as criaturas renasçam no respawn (-10s a -2.5s), permitindo caçadas contínuas de alta densidade sem pausas.
                </p>
              </div>

              <div className="bg-black/60 p-4 rounded-xl border border-red-500/30 space-y-2">
                <span className="font-bold text-red-400 uppercase text-xs block">Campos Vermelhos (Monstros Fortificados)</span>
                <p className="text-xs text-stone-300">
                  Concedem um bônus de +2% a +10% de atributos, pontos de experiência e chance de loot às criaturas que nascem sobre eles, tornando o combate mais desafiador e lucrativo.
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
      desc: language === 'pt' ? 'Tiers, Fusão, Cristais de proteção, Convergência e Transcendência.' : 'Tiers, Fusion, Protection crystals, Convergence, and Transcendence.',
      icon: '/images/miracle/features/8354.gif'
    },
    {
      id: 'shop_idle',
      name: language === 'pt' ? 'Player Shop' : 'Player Shop',
      desc: language === 'pt' ? 'Como comprar licença, montar banca e vender itens deslogado (Idle Shop).' : 'How to buy license, setup store, and sell offline (Idle Shop).',
      icon: '/images/miracle/features/playershop.png'
    },
    {
      id: 'houses_lands',
      name: language === 'pt' ? 'Casas, Terrenos & Camas' : 'Houses & Beds',
      desc: language === 'pt' ? 'Compra por leilão no site, transferência Move Out, magias e camas.' : 'Website bids, Move Out transfers, spells and bed regeneration.',
      icon: '/images/miracle/features/house_move_out.png'
    },
    {
      id: 'armas_treino',
      name: language === 'pt' ? 'Armas de Treino' : 'Training Weapons',
      desc: language === 'pt' ? 'Os 5 Tiers de armas, NPC Sam, treino nos Dummies e Alquimia.' : '5 weapon tiers, NPC Sam, Dummy training and Alchemy boosts.',
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
