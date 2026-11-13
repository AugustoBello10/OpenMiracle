import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Language } from '../../lib/translations';

interface BuildMakerTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenImporter?: () => void;
  language: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const BuildMakerTutorialModal: React.FC<BuildMakerTutorialModalProps> = ({
  isOpen,
  onClose,
  onOpenImporter,
  language,
  onLanguageChange
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
      title={isPt ? 'Como Usar o Build Maker' : 'How to Use Build Maker'}
      width="max-w-2xl"
    >
      <div className="space-y-4 text-xs sm:text-sm font-sans text-stone-300">
        
        {/* Language switch bar inside tutorial */}
        {onLanguageChange && (
          <div className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-[11px] text-stone-400">
              {isPt ? 'Idioma / Language:' : 'Language / Idioma:'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onLanguageChange('pt')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-all ${
                  language === 'pt' ? 'bg-medieval-gold text-black shadow' : 'text-medieval-gold/50 hover:text-medieval-gold'
                }`}
              >
                Português
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-all ${
                  language === 'en' ? 'bg-medieval-gold text-black shadow' : 'text-medieval-gold/50 hover:text-medieval-gold'
                }`}
              >
                English
              </button>
            </div>
          </div>
        )}

        {/* Intro */}
        <p className="text-stone-300 leading-relaxed text-xs sm:text-sm">
          {isPt
            ? 'Guia prático para montar seu set, testar atributos forjados e simular seu poder de combate em 3 passos simples:'
            : 'Quick guide to assemble your gear set, test forged attributes, and simulate your combat output in 3 simple steps:'}
        </p>

        {/* 3 Practical Steps Guide (Game theory suppressed) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* PASSO 1 */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-medieval-gold/20 space-y-1.5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold block mb-1">
                {isPt ? '1. Personagem' : '1. Character'}
              </span>
              <p className="text-stone-400 text-xs leading-relaxed">
                {isPt 
                  ? 'Defina a Vocação, Level, Postura de Combate (Full Attack, Balanced, Full Defense) e seus valores de Skills.'
                  : 'Set your Vocation, Level, Combat Stance (Full Attack, Balanced, Full Defense), and base Skill points.'}
              </p>
            </div>
          </div>

          {/* PASSO 2 */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-medieval-gold/20 space-y-1.5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold block mb-1">
                {isPt ? '2. Equipamentos' : '2. Equipment'}
              </span>
              <p className="text-stone-400 text-xs leading-relaxed">
                {isPt
                  ? 'Clique nos slots para escolher itens manualmente, ou use o botão IMPORTAR BUILD no topo para colar o texto do Look (Shift + Look) e preencher tudo em 1 segundo.'
                  : 'Click slots to pick gear manually, or use the IMPORT BUILD button at the top to paste Look text (Shift + Look) and auto-fill in 1 second.'}
              </p>
            </div>
          </div>

          {/* PASSO 3 */}
          <div className="bg-black/60 p-3.5 rounded-xl border border-medieval-gold/20 space-y-1.5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold block mb-1">
                {isPt ? '3. Comparar Builds' : '3. Compare Builds'}
              </span>
              <p className="text-stone-400 text-xs leading-relaxed">
                {isPt
                  ? 'Use os botões Build 1, Build 2 e Comparar no topo para testar upgrades de itens e ver os ganhos e perdas destacados em verde e vermelho.'
                  : 'Use Build 1, Build 2, and Compare at the top to test gear upgrades and view real-time gains and losses highlighted in green and red.'}
              </p>
            </div>
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
