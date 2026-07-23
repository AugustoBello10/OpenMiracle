const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace BLESS_LOCATIONS
const oldLocations = `const BLESS_LOCATIONS = [
  { id: 'spiritual', name: 'The Spiritual Shielding', city: 'Thais (Norf)', x: 32346, y: 32361, z: 6 },
  { id: 'embrace', name: 'The Embrace of Tibia', city: 'Carlin (Humphrey)', x: 32359, y: 31683, z: 6 },
  { id: 'fire', name: 'The Fire of the Suns', city: "Ab'Dendriel (Edala)", x: 32697, y: 31718, z: 2 },
  { id: 'spark_kawill', name: 'The Spark of the Phoenix', city: 'Kazordoon (Kawill)', x: 32644, y: 31967, z: 12 },
  { id: 'spark_pydar', name: 'The Spark of the Phoenix', city: 'Kazordoon (Pydar)', x: 32651, y: 31892, z: 11 },
  { id: 'wisdom', name: 'The Wisdom of Solitude', city: 'Edron (Eremo)', x: 33322, y: 31883, z: 7 },
  { id: 'tome', name: 'Bless Tome', city: 'Edron (Eremo)', x: 33322, y: 31883, z: 7 },
];`;

const newLocations = `const BLESS_LOCATIONS = [
  { 
    id: 'spiritual', 
    name: 'The Spiritual Shielding', 
    locations: [{ label: 'Thais (Norf)', x: 32346, y: 32361, z: 6 }] 
  },
  { 
    id: 'embrace', 
    name: 'The Embrace of Tibia', 
    locations: [{ label: 'Carlin (Humphrey)', x: 32359, y: 31683, z: 6 }] 
  },
  { 
    id: 'fire', 
    name: 'The Fire of the Suns', 
    locations: [{ label: "Ab'Dendriel (Edala)", x: 32697, y: 31718, z: 2 }] 
  },
  { 
    id: 'spark', 
    name: 'The Spark of the Phoenix', 
    locations: [
      { label: 'Kazordoon (Kawill)', x: 32644, y: 31967, z: 12 },
      { label: 'Kazordoon (Pydar)', x: 32651, y: 31892, z: 11 }
    ] 
  },
  { 
    id: 'wisdom', 
    name: 'The Wisdom of Solitude', 
    locations: [{ label: 'Edron (Eremo)', x: 33322, y: 31883, z: 7 }] 
  },
  {
    id: 'arcane',
    name: 'The Arcane Guardian',
    locations: [
      { label: 'Carlin (Humphrey)', x: 32359, y: 31683, z: 6 },
      { label: 'Edron (Eremo)', x: 33322, y: 31883, z: 7 }
    ]
  },
  { 
    id: 'tome', 
    name: 'Bless Tome', 
    locations: [{ label: 'Edron (Eremo)', x: 33322, y: 31883, z: 7 }] 
  },
];`;

code = code.replace(oldLocations, newLocations);

// Update activeMap state
code = code.replace(
  "const [activeMap, setActiveMap] = useState<typeof BLESS_LOCATIONS[0] | null>(null);",
  "const [activeMap, setActiveMap] = useState<{name: string; city: string; x: number; y: number; z: number} | null>(null);"
);

// Update map render logic
const oldGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLESS_LOCATIONS.map((bless) => (
              <div key={bless.id} className="bg-black/30 border border-medieval-gold/10 p-4 rounded-xl flex flex-col gap-3">
                <div>
                  <h4 className="text-medieval-gold font-bold text-sm">{bless.name}</h4>
                  <p className="text-medieval-text/50 text-xs mt-0.5">{bless.city}</p>
                </div>
                <button
                  onClick={() => setActiveMap(bless)}
                  className="flex items-center justify-center gap-2 bg-medieval-gold/10 hover:bg-medieval-gold/20 text-medieval-gold text-xs font-bold py-2 px-3 rounded-lg border border-medieval-gold/20 transition-all w-full"
                >
                  Ver no Mapa
                </button>
              </div>
            ))}
          </div>`;

const newGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLESS_LOCATIONS.map((bless) => (
              <div key={bless.id} className="bg-black/30 border border-medieval-gold/10 p-4 rounded-xl flex flex-col gap-3">
                <div>
                  <h4 className="text-medieval-gold font-bold text-sm">{bless.name}</h4>
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  {bless.locations.map((loc, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMap({ name: bless.name, city: loc.label, x: loc.x, y: loc.y, z: loc.z })}
                      className="flex items-center justify-between gap-2 bg-medieval-gold/10 hover:bg-medieval-gold/20 text-medieval-gold text-xs font-bold py-2 px-3 rounded-lg border border-medieval-gold/20 transition-all w-full"
                    >
                      <span className="text-medieval-text/70">{loc.label}</span>
                      <span>Ver no Mapa</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>`;

code = code.replace(oldGrid, newGrid);

fs.writeFileSync('src/App.tsx', code);
