const fs = require('fs');

let content = fs.readFileSync('src/components/RuneMakingCalculator.tsx', 'utf8');

// Add new states
const newStates = `
  // Rune / Profit settings
  const [blankRuneBpPrice, setBlankRuneBpPrice] = useState(420);
  const [runeBpPrice, setRuneBpPrice] = useState(1000);
`;
content = content.replace(/const \[timerTotalCalculatedSeconds, setTimerTotalCalculatedSeconds\] = useState\(0\);\n  const \[timerEndTime, setTimerEndTime\] = useState<number \| null>\(null\);/, 
  "const [timerTotalCalculatedSeconds, setTimerTotalCalculatedSeconds] = useState(0);\n  const [timerEndTime, setTimerEndTime] = useState<number | null>(null);\n" + newStates);

fs.writeFileSync('src/components/RuneMakingCalculator.tsx', content);
