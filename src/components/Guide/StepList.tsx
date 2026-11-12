import React, { ReactNode } from 'react';

interface StepItemProps {
  step: number;
  title: string;
  children: ReactNode;
  badge?: string;
}

export const StepItem: React.FC<StepItemProps> = ({
  step,
  title,
  children,
  badge,
}) => {
  return (
    <div className="relative pl-10 pb-8 last:pb-2 group">
      {/* Linha vertical conectando os passos */}
      <div className="absolute left-[15px] top-9 bottom-0 w-[2px] bg-medieval-gold/20 group-last:hidden" />

      {/* Círculo com o número do passo */}
      <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-gradient-to-br from-medieval-gold to-yellow-700 text-black font-black text-sm flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.3)]">
        {step}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
            {title}
          </h4>
          {badge && (
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-medieval-gold/15 border border-medieval-gold/30 text-medieval-gold font-bold">
              {badge}
            </span>
          )}
        </div>
        <div className="text-sm text-stone-300 font-sans leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export const StepList: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="my-6 space-y-1">{children}</div>;
};

export default StepList;
