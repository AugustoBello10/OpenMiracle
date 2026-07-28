const fs = require('fs');

let viewer = fs.readFileSync('src/components/MapViewer.tsx', 'utf-8');

// Replace localStorage logic with DB logic
viewer = viewer.replace(
  /const \[localRespawns, setLocalRespawns\] = useState<Respawn\[\]>\(\(\) => \{[\s\S]*?\}\);/m,
  `const [localRespawns, setLocalRespawns] = useState<Respawn[]>(RESPAWNS);`
);

viewer = viewer.replace(
  /useEffect\(\(\) => \{\s*localStorage\.setItem\('miracle-wiki-respawns-v[0-9]+', JSON\.stringify\(localRespawns\)\);\s*\}, \[localRespawns\]\);/m,
  `useEffect(() => {
    const unsub = onSnapshot(doc(db, 'map_config', 'respawns'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data().data;
        if (Array.isArray(data) && data.length > 0) {
          const mergedMap = new Map<string, Respawn>();
          RESPAWNS.forEach(r => mergedMap.set(r.id, r));
          
          data.forEach((item: any) => {
            mergedMap.set(item.id, {
              ...item,
              categories: fixCategories(item.categories, item.name || '')
            });
          });
          setLocalRespawns(Array.from(mergedMap.values()));
        }
      }
    });
    return () => unsub();
  }, []);`
);

fs.writeFileSync('src/components/MapViewer.tsx', viewer);

let editor = fs.readFileSync('src/components/MapEditorPanel.tsx', 'utf-8');

editor = editor.replace(
  /const \[isUpdatingVersion, setIsUpdatingVersion\] = useState\(false\);/,
  `const [isUpdatingVersion, setIsUpdatingVersion] = useState(false);
  const [isSavingDB, setIsSavingDB] = useState(false);
  
  const handleSaveToDB = async () => {
    setIsSavingDB(true);
    try {
      await setDoc(doc(db, 'map_config', 'respawns'), { data: localRespawns });
      alert("Respawns salvos no Banco de Dados com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar no BD.");
    } finally {
      setIsSavingDB(false);
    }
  };`
);

editor = editor.replace(
  /<p className="text-\[10px\] text-gray-500 mt-2 text-center leading-tight">\s*Os dados são salvos automaticamente no seu navegador. Use Baixar JSON para não perdê-los!\s*<\/p>/,
  `<button 
    onClick={handleSaveToDB}
    disabled={isSavingDB}
    className="w-full flex items-center justify-center gap-2 py-2 rounded text-sm font-bold transition-colors bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 mt-2"
  >
    <Save className="w-4 h-4" />
    {isSavingDB ? 'Salvando...' : 'Salvar no Banco de Dados'}
  </button>
  <p className="text-[10px] text-gray-500 mt-2 text-center leading-tight">
    O banco de dados é a fonte oficial para todos os usuários.
  </p>`
);

fs.writeFileSync('src/components/MapEditorPanel.tsx', editor);

