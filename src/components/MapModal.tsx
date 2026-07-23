import React from 'react';
import { X } from 'lucide-react';
import MapViewer from './MapViewer';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCoords: { x: number; y: number; z: number } | null;
  mapImageUrl?: string;
  mapBounds?: [[number, number], [number, number]];
  title: string;
}

export function MapModal({ isOpen, onClose, targetCoords, title }: MapModalProps) {
  if (!isOpen || !targetCoords) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1a1a1a] border border-medieval-gold/30 rounded-xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden relative">
        <div className="flex items-center justify-between p-4 border-b border-medieval-gold/20 bg-black/40 relative z-10">
          <h3 className="text-medieval-gold font-black uppercase tracking-widest flex items-center gap-2">
            📍 {title} <span className="text-xs font-mono text-medieval-gold/60 normal-case ml-2">({targetCoords.x}, {targetCoords.y}, {targetCoords.z})</span>
          </h3>
          <button 
            onClick={onClose}
            className="text-medieval-gold/60 hover:text-medieval-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 w-full h-full relative bg-[#0a0a0a]">
          <MapViewer 
            isModal={true}
            initialX={targetCoords.x}
            initialY={targetCoords.y}
            initialZ={targetCoords.z}
            initialZoom={2}
            markers={[{ x: targetCoords.x, y: targetCoords.y, title: title }]}
          />
        </div>
      </div>
    </div>
  );
}
