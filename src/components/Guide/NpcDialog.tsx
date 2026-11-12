import React from 'react';
import { MessageSquare, Copy, Check } from 'lucide-react';

export interface DialogLine {
  speaker: 'player' | 'npc';
  text: string;
  keyword?: string; // Palavra exata para clicar e copiar
}

interface NpcDialogProps {
  npcName: string;
  npcLocation?: string;
  lines: DialogLine[];
}

export const NpcDialog: React.FC<NpcDialogProps> = ({
  npcName,
  npcLocation,
  lines,
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-[#101010] border border-medieval-gold/25 rounded-xl overflow-hidden my-5 shadow-xl">
      <div className="bg-black/60 px-4 py-2.5 border-b border-medieval-gold/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-medieval-gold" />
          <span className="text-xs font-bold uppercase tracking-wider text-medieval-gold">
            Diálogo com {npcName}
          </span>
          {npcLocation && (
            <span className="text-[11px] font-mono text-stone-400">
              ({npcLocation})
            </span>
          )}
        </div>
        <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest hidden sm:inline">
          Clique na palavra do jogador para copiar
        </span>
      </div>

      <div className="p-4 space-y-3 font-mono text-xs sm:text-sm">
        {lines.map((line, index) => {
          const isPlayer = line.speaker === 'player';
          return (
            <div
              key={index}
              className={`flex items-start gap-2.5 ${
                isPlayer ? 'text-emerald-400' : 'text-stone-300'
              }`}
            >
              <span
                className={`font-bold uppercase text-[11px] shrink-0 mt-0.5 ${
                  isPlayer ? 'text-emerald-500' : 'text-medieval-gold/70'
                }`}
              >
                {isPlayer ? 'Você:' : `${npcName}:`}
              </span>

              <div className="flex-1 flex items-center gap-2 flex-wrap">
                <span className={isPlayer ? 'font-bold' : ''}>
                  "{line.text}"
                </span>
                {isPlayer && (
                  <button
                    type="button"
                    onClick={() => handleCopy(line.keyword || line.text, index)}
                    className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                    title="Copiar texto para colar no jogo"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-emerald-400/80" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NpcDialog;
