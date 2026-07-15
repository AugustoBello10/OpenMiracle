const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add Wheat to lucide-react imports
content = content.replace("Pickaxe, Wand2, Zap, Twitch,", "Pickaxe, Wand2, Zap, Twitch, Wheat,");

// Add WIKI_SECTIONS inside renderSidebarContent
const wikiSecs = `    const WIKI_SECTIONS = [
      { id: 'helmets', label: language === 'pt' ? 'Capacetes' : 'Helmets' },
      { id: 'armors', label: language === 'pt' ? 'Armaduras' : 'Armors' },
      { id: 'legs', label: language === 'pt' ? 'Pernas' : 'Legs' },
      { id: 'boots', label: language === 'pt' ? 'Botas' : 'Boots' },
      { id: 'shields', label: language === 'pt' ? 'Escudos' : 'Shields' },
      { id: 'swords', label: language === 'pt' ? 'Espadas' : 'Swords' },
      { id: 'clubs', label: language === 'pt' ? 'Clavas' : 'Clubs' },
      { id: 'axes', label: language === 'pt' ? 'Machados' : 'Axes' },
      { id: 'distance', label: language === 'pt' ? 'Distância' : 'Distance' },
      { id: 'ammo', label: language === 'pt' ? 'Munição' : 'Ammo' },
      { id: 'rings', label: language === 'pt' ? 'Anéis' : 'Rings' },
      { id: 'amulets', label: language === 'pt' ? 'Amuletos' : 'Amulets' },
      { id: 'relics', label: language === 'pt' ? 'Relíquias' : 'Relics' },
    ];
`;

content = content.replace("const isHunts = ['hunts'].includes(activeTab);", "const isHunts = ['hunts'].includes(activeTab);\n\n" + wikiSecs);

fs.writeFileSync('src/App.tsx', content);

