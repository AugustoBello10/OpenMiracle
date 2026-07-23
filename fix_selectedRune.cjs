const fs = require('fs');

let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

// Change `const [selectedRune, setSelectedRune] = useState<number>(VOC_SPELLS["Sorcerer"][2].mana);`
// to `const [selectedRune, setSelectedRune] = useState<string>(VOC_SPELLS["Sorcerer"][0].name);`
content = content.replace(/const \[selectedRune, setSelectedRune\] = useState<number>\([^)]+\);/, 'const [selectedRune, setSelectedRune] = useState<string>(VOC_SPELLS["Sorcerer"][0].name);');

// Change the useEffect for vocation
content = content.replace(/useEffect\(\(\) => \{\s*const defaultMana = VOC_SPELLS\[vocation\]\?\.\[0\]\?\.mana \|\| 100;\s*setSelectedRune\(defaultMana\);\s*\}, \[vocation\]\);/, `
  useEffect(() => {
    const defaultRune = VOC_SPELLS[vocation]?.[0]?.name || "";
    setSelectedRune(defaultRune);
  }, [vocation]);
`);

// Find select:
content = content.replace(/value=\{selectedRune\}\s*onChange=\{\(e\) => setSelectedRune\(Number\(e\.target\.value\)\)\}/, `
                  value={selectedRune}
                  onChange={(e) => setSelectedRune(e.target.value)}
`);

// Find options:
content = content.replace(/<option key=\{s\.name\} value=\{s\.mana\}>/, '<option key={s.name} value={s.name}>');

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
