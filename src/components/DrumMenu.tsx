import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface DrumMenuProps {
  items: { id: string; label: string; icon?: ReactNode }[];
  onSelect: (id: string) => void;
  activeId: string | null;
  label: string;
}

export const DrumMenu: React.FC<DrumMenuProps> = ({
  items,
  onSelect,
  activeId,
  label,
}) => {
  const activeIndex = items.findIndex((item) => item.id === activeId);

  const handleWheel = (e: any) => {
    if (e.deltaY > 0 || e.deltaX > 0) {
      if (activeIndex < items.length - 1) {
        onSelect(items[activeIndex + 1].id);
      }
    } else {
      if (activeIndex > 0) {
        onSelect(items[activeIndex - 1].id);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-medieval-gold font-black uppercase text-[9px] tracking-[0.4em] opacity-40">{label}</h3>

      <div className="flex items-center gap-2">
        <button
          onClick={() => activeIndex > 0 && onSelect(items[activeIndex - 1].id)}
          disabled={activeIndex <= 0}
          className="p-1 text-medieval-gold/40 hover:text-medieval-gold disabled:opacity-5 transition-colors"
        >
          <ChevronUp className="w-4 h-4 -rotate-90" />
        </button>

        <div
          onWheel={handleWheel}
          className="relative h-16 w-[200px] sm:w-[280px] flex items-center justify-center cursor-ew-resize select-none overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => {
              const offset = index - (activeIndex === -1 ? 0 : activeIndex);
              if (Math.abs(offset) > 1) return null;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  initial={{ opacity: 0, rotateY: offset * -45, translateZ: -100, x: offset * 100 }}
                  animate={{
                    opacity: offset === 0 ? 1 : 0.3,
                    rotateY: offset * 45,
                    translateZ: offset === 0 ? 50 : -100,
                    x: offset * 120,
                    scale: offset === 0 ? 1 : 0.8,
                    filter: offset === 0 ? 'brightness(1.2)' : 'brightness(0.4) blur(1px)',
                  }}
                  exit={{ opacity: 0, scale: 0.5, translateZ: -150 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className={`absolute w-full h-10 flex items-center justify-center gap-2 px-4 rounded border transition-colors ${
                    offset === 0
                      ? 'bg-medieval-gold/10 border-medieval-gold text-medieval-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                      : 'bg-black/40 border-medieval-gold/10 text-medieval-gold/40 hover:border-medieval-gold/30'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div style={{ transform: 'translateZ(20px)' }} className="shrink-0 scale-75">
                    {item.icon}
                  </div>
                  <span
                    className="uppercase tracking-[0.15em] text-[10px] font-black truncate max-w-[120px]"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          onClick={() => activeIndex < items.length - 1 && onSelect(items[activeIndex + 1].id)}
          disabled={activeIndex >= items.length - 1 || activeIndex === -1}
          className="p-1 text-medieval-gold/40 hover:text-medieval-gold disabled:opacity-5 transition-colors"
        >
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </button>
      </div>

      <div className="text-[8px] font-mono text-medieval-gold/30 uppercase tracking-widest">
        {activeIndex + 1} / {items.length}
      </div>
    </div>
  );
};
export default DrumMenu;
