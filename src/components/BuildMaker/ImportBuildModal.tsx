import React, { useState } from 'react';
import { Modal } from '../Modal';
import { parseBuildFromText, ParsedBuildResult } from '../../utils/buildImporter';
import { BuildState, SlotId } from '../../types/build';
import { Language, translations } from '../../lib/translations';

interface ImportBuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBuild: (parsed: ParsedBuildResult) => void;
  language: Language;
}

export const ImportBuildModal: React.FC<ImportBuildModalProps> = ({
  isOpen,
  onClose,
  onApplyBuild,
  language
}) => {
  const isPt = language === 'pt';
  const [inputText, setInputText] = useState('');
  const [parsedResult, setParsedResult] = useState<ParsedBuildResult | null>(null);

  const handleTextChange = (text: string) => {
    setInputText(text);
    if (text.trim().length > 10) {
      const res = parseBuildFromText(text);
      setParsedResult(res);
    } else {
      setParsedResult(null);
    }
  };

  const handleApply = () => {
    if (parsedResult) {
      onApplyBuild(parsedResult);
      onClose();
      setInputText('');
      setParsedResult(null);
    }
  };

  const handleLoadExample = () => {
    const example = `18:46 You see a royal helmet (Arm:9).
Attributes: (sword fighting: +3, speed: +20).
18:46 You see a magic plate armor (Arm:17).
Attributes: (health regen: +2/6s, protection physical: +3%).
18:46 You see a magic sword (Atk:48, Def:35).
Attributes: (sword fighting: +4, mana leech chance: +7%, mana leech amount: +3%).
18:46 You see knight legs (Arm:8).
Attributes: (Arm: +2, sword fighting: +2, protection physical: +1%).
18:46 You see a tower shield (Def:32).
Attributes: (protection physical: +2%, mitigation chance: +7%, mitigation amount: +30%, arrow guard: +3%).
18:46 You see boots of haste (speed +40).
Attributes: (dodge: +2%, vibrancy: +10%).
18:46 You see a nightmare horn (lootseeker +15%).
18:46 You see a giant sapphire (Arm:1, faster regeneration).
18:46 You see a demon's heart (faster regeneration, healing +3%).
18:46 You see a eye of aurum (destruction +3%).

Level: 153
Magic Level: 8
Sword Fighting: 109
Shielding: 96`;
    handleTextChange(example);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isPt ? 'Importar Build Automaticamente' : 'Automatic Build Importer'}
      width="max-w-2xl"
    >
      <div className="space-y-4 text-xs sm:text-sm font-sans text-stone-300">
        
        {/* Instructions */}
        <div className="bg-black/60 p-3.5 rounded-xl border border-medieval-gold/30 space-y-1.5">
          <p className="text-stone-200 font-bold uppercase tracking-wide text-xs">
            {isPt ? 'Como Importar em 1 Segundo:' : 'How to Import in 1 Second:'}
          </p>
          <p className="text-stone-400 text-xs leading-relaxed">
            {isPt 
              ? 'No jogo, dê Look (Shift + Botão Direito) nos seus equipamentos. Copie o texto do Server Log (ou suas skills) e cole (Ctrl+V) na caixa abaixo. O sistema equipará tudo sozinho com os atributos e valores oficiais!'
              : 'In-game, Look (Shift + Right Click) at your equipment. Copy the Server Log text and paste (Ctrl+V) below. The system will auto-equip everything with official attributes!'}
          </p>
          <button
            onClick={handleLoadExample}
            className="text-[11px] text-medieval-gold hover:underline cursor-pointer font-mono font-bold mt-1"
          >
            {isPt ? 'Carregar exemplo demonstrativo' : 'Load demonstration example'}
          </button>
        </div>

        {/* Text Input Area */}
        <div className="space-y-1.5">
          <textarea
            rows={7}
            value={inputText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={isPt 
              ? 'Cole aqui o texto do Server Log (Ex: You see a royal helmet... Level: 153...)'
              : 'Paste Server Log text here (e.g. You see a royal helmet... Level: 153...)'}
            className="w-full bg-black/80 border border-medieval-gold/30 rounded-xl p-3 text-xs font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-medieval-gold custom-scrollbar"
          />
        </div>

        {/* Parsed Preview Card */}
        {parsedResult && parsedResult.summary.itemsFound > 0 && (
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/40 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                {isPt ? 'Reconhecimento Bem-Sucedido' : 'Successful Recognition'}
              </span>
              <span className="text-[11px] font-mono text-emerald-300">
                {parsedResult.summary.itemsFound} {isPt ? 'itens' : 'items'} | {parsedResult.summary.attributesFound} {isPt ? 'atributos' : 'attributes'}
                {parsedResult.level ? ` | Level ${parsedResult.level}` : ''}
              </span>
            </div>

            {/* Grid of identified items */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              {Object.entries(parsedResult.equipment).map(([slot, item]) => {
                if (!item) return null;
                const attrs = parsedResult.attributes[slot] || [];
                return (
                  <div key={slot} className="bg-black/70 p-2 rounded border border-white/5 space-y-1">
                    <span className="text-[9px] uppercase text-stone-400 block">{slot}</span>
                    <span className="text-xs font-bold text-medieval-gold truncate block">{item.name}</span>
                    {attrs.length > 0 && (
                      <span className="text-[10px] text-emerald-400 block">
                        +{attrs.length} {isPt ? 'atributos' : 'attributes'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleApply}
              className="w-full py-2.5 rounded-lg bg-medieval-gold text-black font-bold uppercase tracking-wider text-xs hover:bg-yellow-400 transition-all cursor-pointer shadow-lg mt-2"
            >
              {isPt ? 'Confirmar e Aplicar à Build' : 'Confirm and Apply to Build'}
            </button>
          </div>
        )}

      </div>
    </Modal>
  );
};
