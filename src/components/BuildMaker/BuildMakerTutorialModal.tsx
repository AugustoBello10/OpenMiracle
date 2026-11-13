import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Language } from '../../lib/translations';

interface BuildMakerTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenImporter?: () => void;
  language: Language;
}

export const BuildMakerTutorialModal: React.FC<BuildMakerTutorialModalProps> = ({
  isOpen,
  onClose,
  onOpenImporter,
  language
}) => {
  const isPt = language === 'pt';
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleDismiss = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('miracle_bm_tutorial_dismissed', 'true');
      } catch (e) {
        // ignore
      }
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleDismiss}
      title={isPt ? 'Como Usar o Build Maker (Guia Rápido)' : 'How to Use Build Maker (Quick Guide)'}
      width="max-w-2xl"
    >
      <div className="space-y-5 text-xs sm:text-sm font-sans text-stone-300">
        
        {/* Intro */}
        <p className="text-stone-300 leading-relaxed">
          {isPt
            ? 'Bem-vindo ao simulador oficial de equipamentos e combate de Miracle 7.4. Aqui você monta sets completos, customiza atributos forjados e prevê com exatidão o dano e a defesa do seu personagem.'
            : 'Welcome to the official equipment and combat simulator for Miracle 7.4. Assemble full gear sets, customize forged attributes, and accurately forecast your damage and survivability.'}
        </p>

        {/* 4 Steps Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* PASSO 1 */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-medieval-gold/20 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold block">
              {isPt ? '1. Ficha do Personagem' : '1. Character Setup'}
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              {isPt 
                ? 'No painel esquerdo, defina a Vocação, Level, Postura de Combate (Full Attack, Balanced ou Full Defense) e os valores de Skills.'
                : 'On the left panel, set Vocation, Level, Combat Stance (Full Attack, Balanced, or Full Defense), and base Skill points.'}
            </p>
          </div>

          {/* PASSO 2 */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-medieval-gold/20 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold block">
              {isPt ? '2. Equipando os Itens' : '2. Equipping Items'}
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              {isPt
                ? 'Você pode clicar em cada slot para escolher o item manualmente, ou usar o botão "IMPORTAR BUILD" no topo para colar o texto do Server Log (Shift + Look no jogo) e preencher tudo em 1 segundo!'
                : 'Click individual slots to choose gear manually, or use the "IMPORT BUILD" button at the top to paste Server Log text and auto-fill in 1 second!'}
            </p>
          </div>

          {/* PASSO 3 */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-medieval-gold/20 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold block">
              {isPt ? '3. Defesa em 3 Etapas' : '3. 3-Step Defense'}
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              {isPt
                ? 'O dano físico recebido é reduzido em ordem oficial: 1º Bloqueio do Escudo/Arma, 2º Redução da Armadura Total, 3º Mitigação e Proteções % residuais. Teste os valores no Simulador Interativo!'
                : 'Physical damage is resolved in official sequence: 1st Shield/Weapon Block, 2nd Total Armor Reduction, 3rd Residual % Protections. Test hits with the Interactive Simulator!'}
            </p>
          </div>

          {/* PASSO 4 */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-medieval-gold/20 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold block">
              {isPt ? '4. Comparador de Builds' : '4. Build Comparison'}
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              {isPt
                ? 'Use os botões "Build 1", "Build 2" e "Comparar" no topo para testar trocas de equipamentos e ver exatamente onde sua build ganha ou perde atributos em verde e vermelho.'
                : 'Use "Build 1", "Build 2", and "Compare" at the top to test gear swaps and see exact attribute gains and losses in green and red badges.'}
            </p>
          </div>

        </div>

        {/* Footer controls with Checkbox and Action Button */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-stone-400 hover:text-stone-200">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-medieval-gold/40 bg-black/60 text-medieval-gold focus:ring-0 cursor-pointer"
            />
            <span>
              {isPt ? 'Não mostrar este tutorial novamente' : "Don't show this tutorial again"}
            </span>
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenImporter && (
              <button
                onClick={() => {
                  handleDismiss();
                  onOpenImporter();
                }}
                className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-black/60 border border-medieval-gold/30 hover:border-medieval-gold text-medieval-gold font-bold uppercase tracking-wider text-xs transition-all cursor-pointer"
              >
                {isPt ? 'Importar Build Agora' : 'Import Build Now'}
              </button>
            )}

            <button
              onClick={handleDismiss}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-medieval-gold text-black font-bold uppercase tracking-wider text-xs hover:bg-yellow-400 transition-all cursor-pointer shadow-lg"
            >
              {isPt ? 'Entendi, Começar' : 'Got it, Start'}
            </button>
          </div>

        </div>

      </div>
    </Modal>
  );
};
