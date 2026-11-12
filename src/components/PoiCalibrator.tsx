import React, { useState, useEffect, useMemo } from 'react';
import { Target, Check, Save, Copy, Crosshair, ChevronDown, Plus, ExternalLink, MapPin } from 'lucide-react';
import { useMapEvents } from 'react-leaflet';
import { getAllPoiCoords, savePoiCoord, PoiCoord } from '../data/poiCoords';

export function PoiClickHandler({
  isActive,
  onSelectCoords,
}: {
  isActive: boolean;
  onSelectCoords: (x: number, y: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (isActive) {
        const x = Math.round(e.latlng.lng);
        const y = Math.round(-e.latlng.lat);
        onSelectCoords(x, y);
      }
    },
  });
  return null;
}

interface PoiCalibratorProps {
  floor: number;
  onFlyTo?: (x: number, y: number, z: number) => void;
  onSelectCoords?: (x: number, y: number, z: number) => void;
  isCalibrating: boolean;
  setIsCalibrating: (val: boolean) => void;
  currentCoord: { x: number; y: number; z: number } | null;
  setCurrentCoord: React.Dispatch<React.SetStateAction<{ x: number; y: number; z: number } | null>>;
}

export function PoiCalibrator({
  floor,
  onFlyTo,
  isCalibrating,
  setIsCalibrating,
  currentCoord,
  setCurrentCoord,
}: PoiCalibratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [poiList, setPoiList] = useState<Record<string, PoiCoord>>({});
  const [selectedId, setSelectedId] = useState<string>('sweaty-cyclops');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    setPoiList(getAllPoiCoords());
  }, []);

  const selectedPoi = poiList[selectedId];

  // Whenever a POI is selected, update current preview coordinate
  useEffect(() => {
    if (selectedPoi) {
      setCurrentCoord({ x: selectedPoi.x, y: selectedPoi.y, z: selectedPoi.z });
    }
  }, [selectedId]);

  // Group POIs by category
  const groupedPois = useMemo(() => {
    const groups: Record<string, PoiCoord[]> = {};
    Object.values(poiList).forEach((poi) => {
      if (!groups[poi.category]) groups[poi.category] = [];
      groups[poi.category].push(poi);
    });
    return groups;
  }, [poiList]);

  const handleSave = async () => {
    if (!selectedPoi || !currentCoord) return;
    const updated: PoiCoord = {
      ...selectedPoi,
      x: currentCoord.x,
      y: currentCoord.y,
      z: currentCoord.z,
    };

    setSaveStatus('Salvando...');
    const success = await savePoiCoord(updated);

    if (success) {
      setPoiList((prev) => ({ ...prev, [updated.id]: updated }));
      setSaveStatus('✓ Salvo com sucesso no projeto!');
      setIsCalibrating(false);
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus('Erro ao salvar no arquivo.');
    }
  };

  const handleCopy = () => {
    if (!currentCoord || !selectedPoi) return;
    const text = `${selectedPoi.name}: { x: ${currentCoord.x}, y: ${currentCoord.y}, z: ${currentCoord.z} }`;
    navigator.clipboard.writeText(text);
    setSaveStatus('✓ Coordenadas copiadas!');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  if (!import.meta.env.DEV) {
    return null;
  }

  if (!isOpen) {
    return (
      <div className="absolute top-20 left-4 z-[450]">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-black/90 px-3 py-2 rounded-lg border border-sky-400/60 flex items-center gap-2 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:border-sky-300 text-sky-400 hover:text-white transition-all cursor-pointer group"
          title="Abrir Calibrador de NPCs e Quests"
        >
          <Crosshair className="w-4 h-4 text-sky-400 group-hover:rotate-90 transition-transform" />
          <span className="font-bold text-xs uppercase tracking-wider">Calibrar Posições</span>
          <span className="text-[9px] px-1.5 py-0.2 bg-sky-500/20 text-sky-300 rounded font-mono">DEV</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-20 left-4 z-[450] flex flex-col gap-2 w-80 max-h-[calc(100%-6rem)]">
      <div className="bg-[#121212]/95 p-4 rounded-xl border border-sky-500/50 flex flex-col gap-3 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.85)] text-stone-200 text-xs font-sans">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sky-500/30 pb-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold uppercase tracking-wider text-xs">
            <Crosshair className="w-4 h-4" />
            <span>Calibrador de NPCs</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsCalibrating(false);
            }}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* POI Selector */}
        <div>
          <label className="text-[10px] uppercase font-bold text-sky-400/80 mb-1 block">
            Selecione o Ponto para Calibrar:
          </label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full bg-black/80 border border-white/10 rounded px-2.5 py-2 text-xs text-stone-200 focus:outline-none focus:border-sky-400 font-sans"
          >
            {Object.entries(groupedPois).map(([category, items]) => (
              <optgroup key={category} label={category} className="bg-[#181818] text-medieval-gold font-bold">
                {items.map((poi) => (
                  <option key={poi.id} value={poi.id} className="text-stone-200 font-normal">
                    {poi.name} {poi.city ? `(${poi.city})` : ''}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Current Info */}
        {selectedPoi && (
          <div className="bg-black/50 p-2.5 rounded border border-white/5 space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between items-center text-stone-400">
              <span>Posição Salva:</span>
              <span className="text-white font-bold">
                ({selectedPoi.x}, {selectedPoi.y}, Z:{selectedPoi.z})
              </span>
            </div>
            {currentCoord && (
              <div className="flex justify-between items-center text-sky-400 font-bold border-t border-white/5 pt-1">
                <span>Nova Marcação:</span>
                <span className="text-emerald-400">
                  ({currentCoord.x}, {currentCoord.y}, Z:{currentCoord.z})
                </span>
              </div>
            )}
          </div>
        )}

        {/* Click Mode Toggle */}
        <button
          type="button"
          onClick={() => setIsCalibrating(!isCalibrating)}
          className={`w-full py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isCalibrating
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-pulse'
              : 'bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30'
          }`}
        >
          <Target className="w-4 h-4" />
          {isCalibrating ? '🎯 MIRA ATIVA: Clique no mapa!' : 'Ativar Mira no Mapa'}
        </button>

        {isCalibrating && (
          <p className="text-[10px] text-stone-400 text-center italic">
            Navegue até o andar correto (Andar {floor}) e clique com o botão esquerdo do mouse sobre o piso exato.
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1 border-t border-white/10">
          <button
            type="button"
            onClick={handleSave}
            disabled={!currentCoord}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-2 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Salvar direto no arquivo do projeto"
          >
            <Save className="w-3.5 h-3.5" />
            Salvar
          </button>

          {onFlyTo && selectedPoi && (
            <button
              type="button"
              onClick={() => onFlyTo(selectedPoi.x, selectedPoi.y, selectedPoi.z)}
              className="px-2.5 py-1.5 bg-black/60 border border-white/10 hover:border-sky-400 text-stone-300 rounded transition-colors cursor-pointer"
              title="Voar até a posição atual no mapa"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="px-2.5 py-1.5 bg-black/60 border border-white/10 hover:border-sky-400 text-stone-300 rounded transition-colors cursor-pointer"
            title="Copiar coordenadas"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status Message */}
        {saveStatus && (
          <div className="text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 p-1.5 rounded text-center font-bold">
            {saveStatus}
          </div>
        )}
      </div>
    </div>
  );
}

export default PoiCalibrator;
