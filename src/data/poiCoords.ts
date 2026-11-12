import initialPoiData from './poiCoords.json';

export interface PoiCoord {
  id: string;
  name: string;
  category: 'Profissões' | 'Quests' | 'NPCs' | 'Sistemas' | 'Blessings' | 'Outros';
  city?: string;
  x: number;
  y: number;
  z: number;
  description?: string;
}

export type PoiDictionary = Record<string, PoiCoord>;

const STORAGE_KEY = 'openmiracle_poi_coords_override';

// Retrieve all POIs, combining local overrides with default JSON
export function getAllPoiCoords(): PoiDictionary {
  let overrides: PoiDictionary = {};
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        overrides = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Erro ao carregar poi coords overrides do localStorage', e);
    }
  }

  return {
    ...(initialPoiData as PoiDictionary),
    ...overrides,
  };
}

// Get single POI by id
export function getPoiCoord(id: string): PoiCoord | undefined {
  const all = getAllPoiCoords();
  return all[id];
}

// Save POI override locally and attempt to save to server in dev mode
export async function savePoiCoord(poi: PoiCoord): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const current = getAllPoiCoords();
  current[poi.id] = poi;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Erro ao salvar no localStorage', e);
  }

  // If in DEV mode, call server API to write directly to poiCoords.json on disk
  if (import.meta.env.DEV) {
    try {
      const res = await fetch('/api/save-poi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(current),
      });
      return res.ok;
    } catch (err) {
      console.error('Falha ao sincronizar com arquivo de disco via /api/save-poi', err);
    }
  }

  return true;
}
