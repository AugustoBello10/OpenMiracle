import React, { ReactNode } from 'react';
import { AlertOctagon, AlertTriangle, Info, Lightbulb } from 'lucide-react';

export type NoticeType = 'danger' | 'warning' | 'info' | 'tip';

interface NoticeCardProps {
  type?: NoticeType;
  title?: string;
  children: ReactNode;
  className?: string;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({
  type = 'info',
  title,
  children,
  className = '',
}) => {
  const configs = {
    danger: {
      border: 'border-red-500/80',
      bg: 'bg-red-950/25',
      text: 'text-red-200',
      titleColor: 'text-red-400',
      icon: <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Atenção',
    },
    warning: {
      border: 'border-amber-500/80',
      bg: 'bg-amber-950/25',
      text: 'text-amber-200',
      titleColor: 'text-amber-400',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Importante',
    },
    info: {
      border: 'border-sky-500/80',
      bg: 'bg-sky-950/25',
      text: 'text-sky-200',
      titleColor: 'text-sky-400',
      icon: <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Observação',
    },
    tip: {
      border: 'border-emerald-500/80',
      bg: 'bg-emerald-950/25',
      text: 'text-emerald-200',
      titleColor: 'text-emerald-400',
      icon: <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
      defaultTitle: 'Dica',
    },
  };

  const current = configs[type];

  return (
    <div
      className={`border-l-4 ${current.border} ${current.bg} border-y border-r border-white/5 rounded-r-xl p-4 my-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        {current.icon}
        <div className="flex-1 text-sm font-sans leading-relaxed">
          <h5 className={`font-bold uppercase tracking-wider text-xs mb-1 ${current.titleColor}`}>
            {title || current.defaultTitle}
          </h5>
          <div className={`${current.text} text-stone-300`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
