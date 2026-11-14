import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../Modal';
import { parseBuildFromText, ParsedBuildResult } from '../../utils/buildImporter';
import { extractSkillsFromImage } from '../../utils/ocrHelper';
import { Language } from '../../lib/translations';
import { cn } from '../../lib/utils';

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
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');

  // Text tab state
  const [inputText, setInputText] = useState('');
  const [parsedResult, setParsedResult] = useState<ParsedBuildResult | null>(null);

  // Image tab state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [skillsForm, setSkillsForm] = useState({
    level: 100,
    magic: 8,
    melee: 90,
    distance: 80,
    shielding: 85
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (text: string) => {
    setInputText(text);
    if (text.trim().length > 10) {
      const res = parseBuildFromText(text);
      setParsedResult(res);
    } else {
      setParsedResult(null);
    }
  };

  const handleApplyText = () => {
    if (parsedResult) {
      onApplyBuild(parsedResult);
      onClose();
      setInputText('');
      setParsedResult(null);
    }
  };

  const handleApplySkills = () => {
    const buildResult: ParsedBuildResult = {
      level: skillsForm.level,
      skills: {
        magic: skillsForm.magic,
        melee: skillsForm.melee,
        distance: skillsForm.distance,
        shielding: skillsForm.shielding
      },
      equipment: {},
      attributes: {},
      summary: {
        itemsFound: 0,
        attributesFound: 0,
        skillsFound: 5,
        unrecognizedLines: []
      }
    };
    onApplyBuild(buildResult);
    onClose();
  };

  // Image processing
  const processImageFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const src = e.target?.result as string;
      setImagePreview(src);
      setIsProcessingImage(true);

      try {
        const extracted = await extractSkillsFromImage(src);
        setSkillsForm(prev => ({
          level: extracted.level ?? prev.level,
          magic: extracted.magic ?? prev.magic,
          melee: extracted.melee ?? prev.melee,
          distance: extracted.distance ?? prev.distance,
          shielding: extracted.shielding ?? prev.shielding
        }));
      } catch (err) {
        console.warn('Failed OCR extraction:', err);
      } finally {
        setIsProcessingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Paste listener for images (Ctrl+V)
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      if (activeTab !== 'image') return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processImageFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen, activeTab]);

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
18:46 You see an eye of aurum (destruction +3%).
18:46 You see an abyssal core.
18:46 You see a giant ruby (faster regeneration).

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
      title={isPt ? 'Importar Build & Equipamentos' : 'Import Build & Equipment'}
      width="max-w-2xl"
    >
      <div className="space-y-4 text-xs sm:text-sm font-sans text-stone-300">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-medieval-gold/20 pb-1 gap-2">
          <button
            onClick={() => setActiveTab('text')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
              activeTab === 'text'
                ? "bg-medieval-gold text-black shadow"
                : "text-stone-400 hover:text-white bg-black/40 border border-white/5"
            )}
          >
            {isPt ? 'Equipamentos (Look Log)' : 'Equipment (Look Log)'}
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
              activeTab === 'image'
                ? "bg-medieval-gold text-black shadow"
                : "text-stone-400 hover:text-white bg-black/40 border border-white/5"
            )}
          >
            {isPt ? 'Skills & Level (Print / Imagem)' : 'Skills & Level (Screenshot)'}
          </button>
        </div>

        {/* TAB 1: TEXT / SERVER LOG */}
        {activeTab === 'text' && (
          <div className="space-y-3">
            {/* Instructions */}
            <div className="bg-black/60 p-3.5 rounded-xl border border-medieval-gold/30 space-y-1.5">
              <p className="text-stone-200 font-bold uppercase tracking-wide text-xs">
                {isPt ? 'Como Importar Looks do Jogo:' : 'How to Import In-Game Looks:'}
              </p>
              <p className="text-stone-400 text-xs leading-relaxed">
                {isPt 
                  ? 'No jogo, dê Look (Shift + Botão Direito) nos seus equipamentos. Copie o texto do Server Log e cole (Ctrl+V) na caixa abaixo. O sistema equipará tudo sozinho com os atributos oficiais!'
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
                rows={6}
                value={inputText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={isPt 
                  ? 'Cole aqui o texto do Server Log (Ex: You see a royal helmet... You see a magic sword...)'
                  : 'Paste Server Log text here (e.g. You see a royal helmet... You see a magic sword...)'}
                className="w-full bg-black/80 border border-medieval-gold/30 rounded-xl p-3 text-xs font-mono text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-medieval-gold custom-scrollbar"
              />
            </div>

            {/* Parsed Preview Card */}
            {parsedResult && parsedResult.summary.itemsFound > 0 && (
              <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/40 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                    {isPt ? 'Reconhecimento Bem-Sucedido' : 'Successful Recognition'}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-300">
                    {parsedResult.summary.itemsFound} {isPt ? 'itens' : 'items'} | {parsedResult.summary.attributesFound} {isPt ? 'atributos' : 'attributes'}
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
                  onClick={handleApplyText}
                  className="w-full py-2.5 rounded-lg bg-medieval-gold text-black font-bold uppercase tracking-wider text-xs hover:bg-yellow-400 transition-all cursor-pointer shadow-lg mt-2"
                >
                  {isPt ? 'Confirmar e Equipar Personagem' : 'Confirm and Equip Character'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: IMAGE / SKILLS PRINT OCR */}
        {activeTab === 'image' && (
          <div className="space-y-4">
            
            {/* Drop / Paste Zone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-medieval-gold/40 hover:border-medieval-gold rounded-xl p-5 text-center cursor-pointer bg-black/50 transition-colors space-y-2 relative"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) processImageFile(file);
                }}
              />

              <p className="font-bold text-sm text-stone-200">
                {isPt ? 'Cole seu Print aqui (Ctrl+V) ou clique para carregar arquivo' : 'Paste screenshot here (Ctrl+V) or click to upload file'}
              </p>
              <p className="text-xs text-stone-400">
                {isPt 
                  ? 'Abra a janela de Skills no client do Miracle, tire um print e cole diretamente nesta área.'
                  : 'Open the Skills window in the Miracle client, take a screenshot, and paste directly here.'}
              </p>

              {isProcessingImage && (
                <div className="flex items-center justify-center gap-2 text-medieval-gold font-mono text-xs pt-2">
                  <span className="animate-spin inline-block">⏳</span>
                  <span>{isPt ? 'Processando imagem e lendo números...' : 'Processing image and reading values...'}</span>
                </div>
              )}
            </div>

            {/* Thumbnail preview if present */}
            {imagePreview && (
              <div className="flex items-center gap-3 bg-black/60 p-2.5 rounded-lg border border-white/10">
                <img src={imagePreview} alt="Skills Screenshot Preview" className="h-16 w-auto object-contain rounded border border-white/20" />
                <div className="text-xs space-y-0.5">
                  <span className="font-bold text-stone-200 block">{isPt ? 'Print Carregado' : 'Screenshot Loaded'}</span>
                  <span className="text-[11px] text-stone-400 block">
                    {isPt ? 'Valores preenchidos abaixo. Ajuste qualquer número se desejar e clique em aplicar.' : 'Values populated below. Tweak any number if desired and apply.'}
                  </span>
                </div>
              </div>
            )}

            {/* Numerical Inputs for Skills Confirmation */}
            <div className="bg-black/60 p-4 rounded-xl border border-medieval-gold/30 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold block">
                {isPt ? 'Confirmar Valores de Skills & Level:' : 'Confirm Skills & Level Values:'}
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 font-mono text-xs">
                <div className="bg-black/70 p-2 rounded border border-white/10 space-y-1">
                  <label className="text-[10px] uppercase text-stone-400 block">Level</label>
                  <input
                    type="number"
                    value={skillsForm.level}
                    onChange={(e) => setSkillsForm({ ...skillsForm, level: parseInt(e.target.value, 10) || 1 })}
                    className="w-full bg-black/90 border border-white/20 rounded p-1 text-center font-bold text-stone-100 focus:outline-none focus:border-medieval-gold"
                  />
                </div>

                <div className="bg-black/70 p-2 rounded border border-white/10 space-y-1">
                  <label className="text-[10px] uppercase text-stone-400 block">Magic Level</label>
                  <input
                    type="number"
                    value={skillsForm.magic}
                    onChange={(e) => setSkillsForm({ ...skillsForm, magic: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-black/90 border border-white/20 rounded p-1 text-center font-bold text-stone-100 focus:outline-none focus:border-medieval-gold"
                  />
                </div>

                <div className="bg-black/70 p-2 rounded border border-white/10 space-y-1">
                  <label className="text-[10px] uppercase text-stone-400 block">Melee (Sword/Axe)</label>
                  <input
                    type="number"
                    value={skillsForm.melee}
                    onChange={(e) => setSkillsForm({ ...skillsForm, melee: parseInt(e.target.value, 10) || 10 })}
                    className="w-full bg-black/90 border border-white/20 rounded p-1 text-center font-bold text-stone-100 focus:outline-none focus:border-medieval-gold"
                  />
                </div>

                <div className="bg-black/70 p-2 rounded border border-white/10 space-y-1">
                  <label className="text-[10px] uppercase text-stone-400 block">Distance</label>
                  <input
                    type="number"
                    value={skillsForm.distance}
                    onChange={(e) => setSkillsForm({ ...skillsForm, distance: parseInt(e.target.value, 10) || 10 })}
                    className="w-full bg-black/90 border border-white/20 rounded p-1 text-center font-bold text-stone-100 focus:outline-none focus:border-medieval-gold"
                  />
                </div>

                <div className="bg-black/70 p-2 rounded border border-white/10 space-y-1 col-span-2 sm:col-span-1">
                  <label className="text-[10px] uppercase text-stone-400 block">Shielding</label>
                  <input
                    type="number"
                    value={skillsForm.shielding}
                    onChange={(e) => setSkillsForm({ ...skillsForm, shielding: parseInt(e.target.value, 10) || 10 })}
                    className="w-full bg-black/90 border border-white/20 rounded p-1 text-center font-bold text-stone-100 focus:outline-none focus:border-medieval-gold"
                  />
                </div>
              </div>

              <button
                onClick={handleApplySkills}
                className="w-full py-2.5 rounded-lg bg-medieval-gold text-black font-bold uppercase tracking-wider text-xs hover:bg-yellow-400 transition-all cursor-pointer shadow-lg mt-2"
              >
                {isPt ? 'Aplicar Skills ao Personagem' : 'Apply Skills to Character'}
              </button>
            </div>

          </div>
        )}

      </div>
    </Modal>
  );
};
