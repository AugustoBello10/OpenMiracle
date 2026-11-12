import React, { ReactNode } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export interface PrerequisiteItem {
  label: string;
  value: ReactNode;
  met?: boolean;
}

interface PrerequisitesCardProps {
  title?: string;
  items: PrerequisiteItem[];
  language?: 'pt' | 'en';
}

export const PrerequisitesCard: React.FC<PrerequisitesCardProps> = ({
  title,
  items,
  language = 'pt',
}) => {
  const defaultTitle = language === 'pt' ? 'Pré-requisitos Obrigatórios' : 'Mandatory Prerequisites';

  return (
    <div className="bg-[#141210] border-l-4 border-amber-500 border-y border-r border-amber-500/20 rounded-r-xl p-5 my-6 shadow-lg">
      <div className="flex items-center gap-2.5 mb-3 text-amber-400">
        <ShieldAlert className="w-5 h-5 shrink-0" />
        <h4 className="font-bold uppercase tracking-wider text-sm font-sans">
          {title || defaultTitle}
        </h4>
      </div>

      <p className="text-xs text-stone-400 mb-4 font-mono">
        {language === 'pt'
          ? 'Certifique-se de cumprir todas as exigências abaixo antes de iniciar:'
          : 'Ensure all requirements below are met before proceeding:'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 bg-black/40 border border-white/5 p-3 rounded-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-500/80 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                {item.label}
              </span>
              <span className="text-stone-200 font-semibold">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrerequisitesCard;
