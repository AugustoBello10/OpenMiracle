
import React from 'react';
import { SlotId, GameItem } from '../../types/build';
import { cn } from '../../lib/utils';
import { getRarityStyles } from '../../utils/formulas';
import { LucideIcon } from 'lucide-react';

interface InventorySlotProps {
  id: SlotId;
  label: string;
  icon: LucideIcon;
  item?: GameItem;
  activeAttributesCount?: number;
  onClick: (id: SlotId) => void;
  onRightClick: (e: React.MouseEvent, id: SlotId) => void;
}

export const InventorySlot: React.FC<InventorySlotProps> = ({ 
  id, label, icon: Icon, item, activeAttributesCount = 0, onClick, onRightClick 
}) => {
  const rarity = getRarityStyles(activeAttributesCount);
  
  return (
    <div 
      className={cn(
        "aspect-square rounded-md group transition-all duration-300 border",
        item 
          ? `${rarity.borderClassName} ${rarity.bgClassName} cursor-pointer hover:scale-[1.03]` 
          : "slot-bg border-medieval-gold/10"
      )}
      onClick={() => onClick(id)}
      onContextMenu={(e) => onRightClick(e, id)}
    >
      {item ? (
        <div className="flex flex-col items-center justify-center p-1 w-full h-full relative">
          {item.img ? (
            <img src={item.img} alt={item.name} className="w-10 h-10 object-contain select-none scale-105" referrerPolicy="no-referrer" />
          ) : (
            <div className="text-medieval-gold text-[10px] text-center font-bold tracking-tight px-1 leading-tight uppercase font-mono max-w-full truncate overflow-hidden">
              {item.name.substring(0, 8)}
            </div>
          )}
          {item.attributeClass > 0 && (
            <div className="absolute top-1 right-1 flex gap-0.5">
              {Array.from({ length: item.attributeClass }).map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-1 h-1 rounded-full",
                    i < activeAttributesCount 
                      ? "bg-medieval-gold shadow-[0_0_4px_#c5a059]" 
                      : "bg-black/40 border border-medieval-gold/20"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-40 transition-opacity justify-center w-full h-full">
          <Icon size={20} className="text-medieval-gold" />
          <span className="text-[9px] uppercase tracking-tighter">{label}</span>
        </div>
      )}
    </div>
  );
};
