import React, { ReactNode } from 'react';
import { Compass } from 'lucide-react';
import { useMap } from '../context/MapContext';
import { getPoiCoord } from '../data/poiCoords';

interface MapLinkProps {
  poiId?: string;
  x?: number;
  y?: number;
  z?: number;
  title?: string;
  children?: ReactNode;
  className?: string;
  showCoords?: boolean;
}

export const MapLink: React.FC<MapLinkProps> = ({
  poiId,
  x = 0,
  y = 0,
  z = 7,
  title,
  children,
  className = '',
  showCoords = false,
}) => {
  const { openMap } = useMap();

  const poi = poiId ? getPoiCoord(poiId) : undefined;
  const targetX = poi ? poi.x : x;
  const targetY = poi ? poi.y : y;
  const targetZ = poi ? poi.z : z;
  const targetTitle = title || (poi ? `${poi.name}${poi.city ? ` (${poi.city})` : ''}` : 'Localização');

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openMap({ x: targetX, y: targetY, z: targetZ }, targetTitle);
      }}
      className={`inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-4 decoration-sky-400/40 hover:decoration-sky-300 transition-colors cursor-pointer group ${className}`}
      title={`Abrir ${targetTitle} no mapa (${targetX}, ${targetY}, ${targetZ})`}
    >
      <span>{children || targetTitle}</span>
      {showCoords && (
        <span className="text-[10px] font-mono text-sky-400/60 no-underline font-normal">
          ({targetX}, {targetY}, {targetZ})
        </span>
      )}
      <Compass className="w-3.5 h-3.5 text-sky-400/80 group-hover:text-sky-300 transition-transform group-hover:rotate-45 shrink-0" />
    </button>
  );
};

export default MapLink;
