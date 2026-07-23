const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("import { MapModal } from './components/MapModal';")) {
  code = code.replace(
    "import { RuneMakingCalculator } from './components/RuneMakingCalculator';",
    "import { RuneMakingCalculator } from './components/RuneMakingCalculator';\nimport { MapModal } from './components/MapModal';"
  );
}

const mapCode = `
const BLESS_LOCATIONS = [
  { id: 'spiritual', name: 'The Spiritual Shielding', city: 'Thais (Norf)', x: 32273, y: 32274, z: 7 },
  { id: 'embrace', name: 'The Embrace of Tibia', city: 'Carlin (Humphrey)', x: 32326, y: 31782, z: 7 },
  { id: 'fire', name: 'The Fire of the Suns', city: "Ab'Dendriel (Edala)", x: 32732, y: 31637, z: 7 },
  { id: 'spark', name: 'The Spark of the Phoenix', city: 'Kazordoon (Kawill/Pydar)', x: 32623, y: 31922, z: 10 },
  { id: 'wisdom', name: 'The Wisdom of Solitude', city: 'Edron (Eremo)', x: 33323, y: 31882, z: 7 },
];

function BlessCalculator({ t }: { t: any }) {
  const [level, setLevel] = useState<number>(100);
  const [activeMap, setActiveMap] = useState<typeof BLESS_LOCATIONS[0] | null>(null);
  const costs = useMemo(() => calculateBlessCosts(level), [level]);
`;

code = code.replace(
  /function BlessCalculator\(\{\s*t\s*\}\:\s*\{\s*t\:\s*any\s*\}\)\s*\{\s*const\s*\[level,\s*setLevel\]\s*=\s*useState\<number\>\(100\);\s*const\s*costs\s*=\s*useMemo\(\(\)\s*=>\s*calculateBlessCosts\(level\),\s*\[level\]\);/g,
  mapCode
);

const uiCode = `
        <div className="medieval-card p-6 sm:p-8">
          <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-6">
            <Info className="w-5 h-5" /> {t('blessDetails')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm text-medieval-text/70 leading-relaxed font-mono">
            <p>• <span className="text-medieval-gold">{t('standardBless')}:</span> 10k fixo até o lvl 100. Após isso, +100gp por level cada.</p>
            <p>• <span className="text-medieval-gold">{t('tomeBless')}:</span> Custo fixo de 25k no NPC Eremo.</p>
            <p>• <span className="text-medieval-gold">{t('arcaneBless')}:</span> Protege seus atributos. Custo: 200gp x Level.</p>
            <p>• <span className="text-medieval-gold">Amulet of Loss:</span> Protege seus itens. Custo fixo de 50k.</p>
            <p>• <span className="text-medieval-gold">Redução de XP:</span> Cada uma das 5 blesses padrão reduz a perda em 0.8%.</p>
          </div>
        </div>

        {/* Seção de Localizações */}
        <div className="medieval-card p-6 sm:p-8">
          <h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-6">
            <Map className="w-5 h-5" /> Localização das Blessings
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <Map className="w-3.5 h-3.5" /> Ver no Mapa
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MapModal 
        isOpen={!!activeMap}
        onClose={() => setActiveMap(null)}
        targetCoords={activeMap ? { x: activeMap.x, y: activeMap.y, z: activeMap.z } : null}
        title={activeMap ? \`\${activeMap.name} - \${activeMap.city}\` : ''}
        mapImageUrl="" // <-- Usuário colocará a URL do minimapa aqui
        mapBounds={[[-33000, 31000], [-31000, 34000]]} // Valores ilustrativos
      />
    </div>
  );
}`;

code = code.replace(
  /<div className="medieval-card p-6 sm:p-8">\s*<h3 className="text-medieval-gold font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-6">\s*<Info className="w-5 h-5" \/> \{t\('blessDetails'\)\}\s*<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}/,
  uiCode
);

fs.writeFileSync('src/App.tsx', code);
