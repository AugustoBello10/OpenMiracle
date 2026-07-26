import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CustomSystemsViewProps {
  language: 'pt' | 'en';
}

export function CustomSystemsView({ language }: CustomSystemsViewProps) {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const navigate = useNavigate();

  // Content for Relic Box
  const renderRelicBox = () => (
    <motion.div
      key="relic-box-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <button 
        onClick={() => setSelectedSystem(null)}
        className="flex items-center gap-2 text-medieval-gold/60 hover:text-medieval-gold transition-colors font-bold uppercase text-xs tracking-wider mb-8 bg-black/40 px-4 py-2 rounded-lg border border-medieval-gold/10 hover:border-medieval-gold/30 w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> {language === 'pt' ? 'Voltar para Sistemas' : 'Back to Systems'}
      </button>

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10 space-y-8">
          <header className="border-b border-medieval-gold/20 pb-6 mb-6">
            <h2 className="text-3xl font-black text-medieval-gold uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-2">Sistema de Relic Box</h2>
            <p className="text-sm text-medieval-muted/80 font-mono italic">
              {language === 'pt' 
                ? 'Encontre relíquias poderosas pelo mapa mundial e equipe-as na Relic Box para obter bônus únicos.'
                : 'Find powerful relics on the world map that provide unique stats to your character equipping them in the relic box.'}
            </p>
          </header>

          <div className="space-y-6 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
            <p>
              {language === 'pt'
                ? 'No Miracle, todo personagem possui uma Relic Box no inventário, contendo 4 slots. Cada slot funciona de maneira similar a um slot de equipamento convencional, mas são exclusivos para relíquias. Além disso, somente uma relíquia do mesmo tipo pode ser equipada por vez.'
                : 'In Miracle, every character has a Relic Box in their inventory with 4 slots. Each slot is similar to an equipment slot, but they are exclusively for relics. Only one relic of the same type can be equipped at a time.'}
            </p>
            
            <div className="flex justify-center my-6">
              <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1785080928/relicbox.png" alt="Relic Box" className="rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.2)] border border-medieval-gold/30 max-w-full h-auto object-contain" />
            </div>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? 'Desbloqueando os Slots' : 'Unlocking the Slots'}
            </h3>
            
            <p>
              {language === 'pt'
                ? 'Inicialmente, todos os slots estão travados (indicados pela cor vermelha), impedindo que qualquer relíquia seja equipada. Para destravá-los, é necessária uma combinação de pagamento e conclusão de missões (quests).'
                : 'Initially, all slots are locked (indicated by a red color), preventing any relics from being equipped. To unlock them, a combination of payment and completing quests is required.'}
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300/90">
              <li><strong>Slot 1:</strong> 1k gold coins</li>
              <li><strong>Slot 2:</strong> 2k gold coins</li>
              <li><strong>Slot 3:</strong> 5k gold coins</li>
              <li><strong>Slot 4:</strong> 15k gold coins</li>
            </ul>

            <div className="bg-black/40 border border-medieval-gold/10 p-5 rounded-lg my-6">
              <h4 className="text-medieval-gold font-bold mb-3">{language === 'pt' ? 'Requisitos de Quest' : 'Quest Requirements'}</h4>
              <p className="mb-2">
                {language === 'pt' 
                  ? 'Para ganhar o direito de liberar o primeiro e o segundo slot, é preciso concluir a '
                  : 'To earn the right to unlock the first and second slots, you must complete '}
                <a href="https://www.youtube.com/watch?v=FzNUDLaD8go&t=69s" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-500/30 underline-offset-2">
                  Quest das Notas perdidas de Melchior
                </a>.
              </p>
              <p>
                {language === 'pt'
                  ? 'O terceiro e quarto slots ficam disponíveis para compra após a conclusão da Djin Quest.'
                  : 'The third and fourth slots become available for purchase after completing the Djin Quest.'}
              </p>
            </div>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? 'Magia dos Djinns e Timer' : 'Djinn Magic and Timer'}
            </h3>

            <p>
              {language === 'pt'
                ? 'Os slots da Relic Box são destravados temporariamente usando a Magia dos Djinns. Essa magia funciona com um cronômetro que dura 48 horas. É importante notar que esse tempo só é consumido enquanto o personagem está online e em situação de batalha (com o sinal de espadas ativado).'
                : 'Relic Box slots are temporarily unlocked using Djinn Magic. This magic works with a timer that lasts 48 hours. Note that this time is only consumed while the character is online and in a battle situation (with the battle sign active).'}
            </p>

            <div className="bg-yellow-900/20 border-l-4 border-medieval-gold p-4 my-4">
              <p className="text-yellow-200/90 text-sm italic">
                {language === 'pt'
                  ? 'Para cada novo slot que você destrava, o tempo total é resetado. Por exemplo: você pode jogar com 1 slot aberto por 47 horas. Ao solicitar a magia para abrir o segundo slot (já que o primeiro já está aberto), o tempo de ambos os slots será resetado para 48 horas.'
                  : 'For each new slot you unlock, the total time is reset. For example: you can play with 1 slot open for 47 hours. When requesting the magic to open the second slot, the time for both slots will be reset to 48 hours.'}
              </p>
            </div>

            <p>
              {language === 'pt'
                ? 'Quando o tempo se esgotar, as relíquias equipadas serão automaticamente removidas e enviadas para a sua mochila (Backpack). Caso não haja espaço suficiente ou capacidade, elas serão enviadas diretamente para o Depot (DP) da sua cidade natal.'
                : 'When the time runs out, the equipped relics will be automatically removed and sent to your Backpack. If there is not enough space or capacity, they will be sent directly to the Depot (DP) of your hometown.'}
            </p>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2">
              {language === 'pt' ? 'Verificando o Tempo Restante' : 'Checking Remaining Time'}
            </h3>

            <p>
              {language === 'pt'
                ? 'Para verificar o tempo restante dos seus slots na Relic Box, basta segurar a tecla Shift no teclado e clicar com o botão esquerdo do mouse sobre a caixa.'
                : 'To check the remaining time of your Relic Box slots, simply hold the Shift key on the keyboard and left-click on the box.'}
            </p>

            <div className="bg-black/60 p-4 rounded text-center border border-white/5 my-4 flex justify-center">
              <code className="text-emerald-400 font-mono text-sm max-w-full text-left break-words">
                You see a relic box. It contains 4 opened slots. It's holding additional djinn magic for X day and X hours.
              </code>
            </div>
            
            <div className="mt-12 flex justify-center border-t border-medieval-gold/20 pt-8">
              <button
                onClick={() => navigate('/wiki/server/itens/reliquias')}
                className="flex items-center gap-3 bg-gradient-to-r from-black/80 to-medieval-gold/10 hover:from-black hover:to-medieval-gold/20 border border-medieval-gold/40 hover:border-medieval-gold/80 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all px-8 py-4 rounded-xl group"
              >
                <div className="text-left">
                  <h4 className="text-medieval-gold font-black uppercase tracking-wider group-hover:text-yellow-400 transition-colors">
                    {language === 'pt' ? 'Lista de Relíquias' : 'Relics List'}
                  </h4>
                  <p className="text-xs text-medieval-muted/80 font-mono">
                    {language === 'pt' ? 'Ver todas as relíquias disponíveis' : 'See all available relics'}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-medieval-gold/70 group-hover:text-medieval-gold transition-colors ml-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSpawnDemonic = () => (
    <motion.div
      key="spawn-demonic-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <button 
        onClick={() => setSelectedSystem(null)}
        className="flex items-center gap-2 text-medieval-gold/60 hover:text-medieval-gold transition-colors font-bold uppercase text-xs tracking-wider mb-8 bg-black/40 px-4 py-2 rounded-lg border border-medieval-gold/10 hover:border-medieval-gold/30 w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> {language === 'pt' ? 'Voltar para Sistemas' : 'Back to Systems'}
      </button>

      <div className="bg-gradient-to-br from-black/80 to-black/90 border border-medieval-gold/20 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay"></div>
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
            
            <p>
              {language === 'pt'
                ? 'O servidor possui um sistema de redução automática do tempo de respawn baseado no número de jogadores online:'
                : 'The server features an automatic respawn time reduction system based on the number of online players:'}
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300/90">
              <li><strong>{language === 'pt' ? '0 a 500 Players:' : '0 to 500 Players:'}</strong> {language === 'pt' ? '-0.05 segundos de redução por player.' : '-0.05 seconds of reduction per player.'}</li>
              <li><strong>{language === 'pt' ? '501 a 750 Players:' : '501 to 750 Players:'}</strong> {language === 'pt' ? '-0.1 segundos de redução para cada player extra (Máximo de -50 segundos no total).' : '-0.1 seconds of reduction for each extra player (Maximum of -50 seconds total).'}</li>
              <li><strong>{language === 'pt' ? 'Acima de 750 Players:' : 'Above 750 Players:'}</strong> {language === 'pt' ? 'Não há redução adicional.' : 'No additional reduction.'}</li>
            </ul>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2 flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
              Spawn Essences
            </h3>
            
            <p>
              {language === 'pt'
                ? 'A Spawn Essence é um field roxo que você joga no chão para acelerar ainda mais o respawn de uma área. Ela custa 1k gold coins e pode ser comprada no NPC Defeated Whispers em Shadowport (próximo à Bless em Thais).'
                : 'The Spawn Essence is a purple field you throw on the ground to further accelerate the respawn of an area. It costs 1k gold coins and can be bought at NPC Defeated Whispers in Shadowport (near the Bless in Thais).'}
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300/90">
              <li><strong>{language === 'pt' ? 'Área de Efeito:' : 'Area of Effect:'}</strong> {language === 'pt' ? 'Raio de 20 SQMs (funciona em todos os andares verticalmente, ex: do +7 ao -7).' : '20 SQMs radius (works across all vertical floors, e.g., from +7 to -7).'}</li>
              <li><strong>{language === 'pt' ? 'Duração:' : 'Duration:'}</strong> {language === 'pt' ? '1 hora no total, dividida em três estágios de força.' : '1 hour total, divided into three strength stages.'}</li>
              <li><strong>{language === 'pt' ? 'Limite Máximo:' : 'Maximum Limit:'}</strong> {language === 'pt' ? 'O máximo de redução de respawn por essências é de 50 segundos. Você pode stakar várias essências para atingir o limite.' : 'The maximum respawn reduction via essences is 50 seconds. You can stack multiple essences to reach the limit.'}</li>
            </ul>

            <div className="bg-black/40 border border-medieval-gold/20 rounded-lg p-4 my-4 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-medieval-gold uppercase border-b border-medieval-gold/20">
                  <tr>
                    <th className="px-4 py-2">{language === 'pt' ? 'Estágio' : 'Stage'}</th>
                    <th className="px-4 py-2">{language === 'pt' ? 'Tempo (Minutos)' : 'Time (Minutes)'}</th>
                    <th className="px-4 py-2">{language === 'pt' ? 'Redução de Respawn' : 'Respawn Reduction'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">00:00 - 29:59</td>
                    <td className="px-4 py-2 text-emerald-400 font-bold">-10s</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">30:00 - 49:59</td>
                    <td className="px-4 py-2 text-yellow-400 font-bold">-5s</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">50:00 - 59:59</td>
                    <td className="px-4 py-2 text-red-400 font-bold">-2.5s</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-yellow-900/20 border-l-4 border-medieval-gold p-4 my-4">
              <p className="text-yellow-200/90 text-sm italic">
                {language === 'pt'
                  ? 'Dica de Otimização: As essências funcionam perfeitamente em hunts com vários andares concentrados em uma área pequena (ex: Minotauros de Darashia, Ice Tower). Hunts muito extensas horizontamente podem precisar de muitas essências.'
                  : 'Optimization Tip: Essences work perfectly in hunts with multiple floors concentrated in a small area (e.g., Darashia Minotaurs, Ice Tower). Hunts that are too horizontally extensive might need many essences.'}
              </p>
            </div>

            <h3 className="text-xl font-bold text-medieval-gold uppercase tracking-wider mt-8 border-b border-medieval-gold/10 pb-2 flex items-center gap-2">
              <div className="flex items-center gap-4">
                 <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1785082000/demonicessence.gif" alt="Demonic Essence" className="w-8 h-8 object-contain rounded-lg shadow-[0_0_15px_rgba(150,0,0,0.4)] border border-red-500/30 bg-black/50 p-1" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              Demonic Essences
            </h3>
            
            <p>
              {language === 'pt'
                ? 'Diferente da Spawn Essence, a Demonic Essence (field rosa/avermelhado) não mexe no tempo de respawn. Em vez disso, ela aumenta a Força, a Defesa, a Experiência e o Loot Rate dos monstros afetados!'
                : 'Unlike the Spawn Essence, the Demonic Essence (pink/reddish field) does not change the respawn time. Instead, it increases the Strength, Defense, Experience, and Loot Rate of the affected monsters!'}
            </p>

            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-300/90">
              <li><strong>{language === 'pt' ? 'Bônus:' : 'Bonus:'}</strong> {language === 'pt' ? '+2% de bônus por essência ativa no momento (Experiência, Força, Defesa, Loot).' : '+2% bonus per active essence (Experience, Strength, Defense, Loot).'}</li>
              <li><strong>{language === 'pt' ? 'Limite Máximo:' : 'Maximum Limit:'}</strong> {language === 'pt' ? 'Até 5 essências podem ser stakadas juntas, fornecendo um bônus máximo de +10% em um raio de 20 SQMs por 1 hora.' : 'Up to 5 essences can be stacked together, providing a maximum bonus of +10% in a 20 SQM radius for 1 hour.'}</li>
              <li><strong>{language === 'pt' ? 'Mecânica do Loot:' : 'Loot Mechanic:'}</strong> {language === 'pt' ? 'O bônus de loot é multiplicativo, não somativo (ex: uma chance de 1% sobe para 1.1% com os 10% de bônus, não 11%).' : 'The loot bonus is multiplicative, not additive (e.g., a 1% chance goes up to 1.1% with the 10% bonus, not 11%).'}</li>
              <li><strong>{language === 'pt' ? 'Como Obter:' : 'How to Obtain:'}</strong> {language === 'pt' ? 'Podem ser dropadas por monstros Elite ou de "3 Estrelas" de força (ex: Dragon para cima). A lista completa deve ser descoberta pela comunidade!' : 'Can be dropped by Elite monsters or "3-Star" strength monsters (e.g., Dragon and above). The full list must be discovered by the community!'}</li>
            </ul>

            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 my-4">
              <p className="text-red-300/90 text-sm font-bold">
                {language === 'pt'
                  ? '⚠️ Regra de Ouro da Demonic Essence:'
                  : '⚠️ Golden Rule of Demonic Essence:'}
              </p>
              <p className="text-red-200/90 text-sm mt-2">
                {language === 'pt'
                  ? 'A essência SÓ AFETA monstros que nascerem (respawnarem) DEPOIS que o field for jogado, e ESTRITAMENTE na casa (spot) original onde o monstro nasce. Lurrar o monstro pra dentro do field, ou jogar o field em um monstro já vivo não faz nenhum efeito.'
                  : 'The essence ONLY AFFECTS monsters that spawn AFTER the field is placed, and STRICTLY on their original spawn spot. Luring a monster into the field, or throwing the field on an already alive monster will have no effect.'}
              </p>
            </div>
            
            <p>
              {language === 'pt'
                ? 'Lembre-se: como ambas as essências funcionam como um field comum, elas podem ser destruídas por qualquer jogador usando a runa Destroy Field. Fique atento!'
                : 'Remember: since both essences function as common fields, they can be destroyed by any player using a Destroy Field rune. Be aware!'}
            </p>

            <div className="mt-12 flex justify-center border-t border-medieval-gold/20 pt-8">
              <button
                onClick={() => setSelectedSystem(null)}
                className="group flex items-center gap-3 px-6 py-3 bg-black/40 hover:bg-black/60 border border-medieval-gold/30 hover:border-medieval-gold/60 rounded-lg transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 text-medieval-gold/70 group-hover:text-medieval-gold transition-colors" />
                <span className="text-medieval-gold font-bold uppercase tracking-wider text-sm">
                  {language === 'pt' ? 'Voltar para Sistemas' : 'Back to Systems'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const systems = [
    { id: 'relic_box', name: 'Relic Box' },
    { id: 'atributos', name: 'Atributos' },
    { id: 'armas_treino', name: 'Armas de Treino' },
    { id: 'bed_making', name: 'Bed Making Runes' },
    { id: 'houses_lands', name: 'Houses & Lands' },
    { id: 'spawn_demonic', name: 'Spawn & Demonic Essences' },
    { id: 'shop_idle', name: 'Shop Idle' },
    { id: 'cam_system', name: 'Cam System' },
  ];

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {selectedSystem === 'relic_box' ? (
          renderRelicBox()
        ) : selectedSystem === 'spawn_demonic' ? (
          renderSpawnDemonic()
        ) : (
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
                {language === 'pt' ? 'Guia completo de todas as mecânicas exclusivas do servidor Miracle 7.4.' : 'Complete guide of all exclusive mechanics in Miracle 7.4 server.'}
              </p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-medieval-gold/40 to-transparent mx-auto mt-6"></div>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {systems.map((sys) => (
                <button 
                  key={sys.id}
                  onClick={() => {
                    if (sys.id === 'relic_box' || sys.id === 'spawn_demonic') {
                      setSelectedSystem(sys.id);
                    }
                  }}
                  disabled={sys.id !== 'relic_box' && sys.id !== 'spawn_demonic'}
                  className={`p-6 text-center group border relative overflow-hidden flex flex-col justify-center min-h-[140px] rounded-xl transition-all duration-300
                    ${(sys.id === 'relic_box' || sys.id === 'spawn_demonic')
                      ? 'bg-gradient-to-br from-black/80 to-black/90 border-medieval-gold/30 hover:border-medieval-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:-translate-y-1 cursor-pointer'
                      : 'bg-black/40 border-white/5 opacity-60 grayscale cursor-not-allowed'}`}
                >
                  <h3 className="text-lg font-black text-medieval-gold uppercase mb-2 flex items-center justify-center gap-2">
                    {sys.id === 'relic_box' && (
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1785080965/relicbox1.gif" alt="Relic Box Icon" className="w-8 h-8 object-contain" />
                    )}
                    {sys.id === 'spawn_demonic' && (
                      <img src="https://res.cloudinary.com/dc4nkbnkg/image/upload/v1785082000/demonicessence.gif" alt="Demonic Essence Icon" className="w-8 h-8 object-contain" />
                    )}
                    {sys.name}
                  </h3>
                  <p className="text-xs text-medieval-text/50 uppercase tracking-widest">
                    {(sys.id === 'relic_box' || sys.id === 'spawn_demonic')
                      ? (language === 'pt' ? 'Ver Guia' : 'Read Guide')
                      : (language === 'pt' ? 'Em construção' : 'Under construction')}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
