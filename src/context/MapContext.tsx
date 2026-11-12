import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MapModal } from '../components/MapModal';

interface MapCoords {
  x: number;
  y: number;
  z: number;
}

interface MapContextType {
  openMap: (coords: MapCoords, title: string) => void;
  closeMap: () => void;
  isOpen: boolean;
  activeCoords: MapCoords | null;
  activeTitle: string;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mapTarget, setMapTarget] = useState<{ coords: MapCoords; title: string } | null>(null);

  const openMap = (coords: MapCoords, title: string) => {
    setMapTarget({ coords, title });
  };

  const closeMap = () => {
    setMapTarget(null);
  };

  return (
    <MapContext.Provider
      value={{
        openMap,
        closeMap,
        isOpen: !!mapTarget,
        activeCoords: mapTarget?.coords || null,
        activeTitle: mapTarget?.title || '',
      }}
    >
      {children}
      <MapModal
        isOpen={!!mapTarget}
        onClose={closeMap}
        targetCoords={mapTarget?.coords || null}
        title={mapTarget?.title || ''}
      />
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextType => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap deve ser utilizado dentro de um MapProvider');
  }
  return context;
};
