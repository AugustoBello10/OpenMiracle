import React, { ReactNode } from 'react';
import { Compass } from 'lucide-react';
import { useMap } from '../context/MapContext';

interface MapLinkProps {
  x: number;
  y: number;
  z: number;
  title: string;
  children?: ReactNode;
  className?: string;
  showCoords?: boolean;
}

export const MapLink: React.FC<MapLinkProps> = ({
  x,
  y,
  z,
  title,
  children,
  className = '',
  showCoords = false,
}) => {
  const { openMap } = useMap();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openMap({ x, y, z }, title);
      }}
      className={`inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-4 decoration-sky-400/40 hover:decoration-sky-300 transition-colors cursor-pointer group ${className}`}
      title={`Abrir ${title} no mapa (${x}, ${y}, ${z})`}
    >
      <span>{children || title}</span>
      {showCoords && (
        <span className="text-[10px] font-mono text-sky-400/60 no-underline font-normal">
          ({x}, {y}, {z})
        </span>
      )}
      <Compass className="w-3.5 h-3.5 text-sky-400/80 group-hover:text-sky-300 transition-transform group-hover:rotate-45 shrink-0" />
    </button>
  );
};

export default MapLink;
