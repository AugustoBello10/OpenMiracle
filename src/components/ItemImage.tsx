import React, { useState } from 'react';
import { Shield, Sword, Axe, Target, Sparkles, Circle, Heart, Hammer, Zap, Crosshair } from 'lucide-react';
import { LOCAL_ITEM_IMAGES } from '../data/localItemImages';

interface ItemImageProps {
  item: { img?: string; name: string; category?: string; subCategory?: string };
  className?: string;
}

export const ItemImage: React.FC<ItemImageProps> = ({ item, className = "w-8 h-8 object-contain" }) => {
  const [errorCount, setErrorCount] = useState(0);

  const getFallbackIcon = () => {
    const cat = (item.subCategory || item.category || '').toLowerCase();
    if (cat.includes('shield')) return <Shield className="w-5 h-5 text-medieval-gold/40" />;
    if (cat.includes('sword')) return <Sword className="w-5 h-5 text-medieval-gold/40" />;
    if (cat.includes('axe')) return <Axe className="w-5 h-5 text-medieval-gold/40" />;
    if (cat.includes('club') || cat.includes('mace') || cat.includes('hammer')) return <Hammer className="w-5 h-5 text-medieval-gold/40" />;
    if (cat.includes('distance') || cat.includes('bow') || cat.includes('crossbow')) return <Crosshair className="w-5 h-5 text-medieval-gold/40" />;
    if (cat.includes('ammo')) return <Zap className="w-5 h-5 text-medieval-gold/40" />;
    if (cat.includes('ring')) return <Circle className="w-5 h-5 text-medieval-gold/40" />;
    if (cat.includes('amulet') || cat.includes('necklace') || cat.includes('relic')) return <Sparkles className="w-5 h-5 text-medieval-gold/40" />;
    return <Sparkles className="w-5 h-5 text-medieval-gold/40" />;
  };

  const localFallback = LOCAL_ITEM_IMAGES[item.name.toLowerCase()];

  if (!item.img && !localFallback) {
    return getFallbackIcon();
  }

  // Fallbacks:
  // 0: original URL (or localFallback)
  // 1: localFallback if not used yet
  // 2: replace .gif with .png
  // 3: lowercased URL .gif
  // 4: lowercased URL .png
  
  const getUrl = () => {
    if (!item.img) return localFallback!;
    if (errorCount === 1 && localFallback) return localFallback;
    let url = item.img;
    if (errorCount === 2) url = url.replace('.gif', '.png');
    else if (errorCount === 3) url = url.toLowerCase();
    else if (errorCount === 4) url = url.toLowerCase().replace('.gif', '.png');
    else if (errorCount === 5) url = url.replace(/_/g, '%20');
    else if (errorCount === 6) url = url.replace(/_/g, '%20').replace('.gif', '.png');
    return url;
  };

  const handleError = () => {
    if (errorCount < 6) {
      setErrorCount(prev => prev + 1);
    }
  };

  if (errorCount >= 6) {
    return getFallbackIcon();
  }

  return (
    <img 
      src={getUrl()} 
      alt={item.name} 
      className={className} 
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
    />
  );
};
