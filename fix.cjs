const fs = require('fs');

// Fix MapViewer
let mapCode = fs.readFileSync('src/components/MapViewer.tsx', 'utf8');
mapCode = mapCode.replace(
  "  const [isSearchOpen, setIsSearchOpen] = useState(false);",
  "  const [isSearchOpen, setIsSearchOpen] = useState(false);\n  const [showSuggestions, setShowSuggestions] = useState(false);"
);
fs.writeFileSync('src/components/MapViewer.tsx', mapCode);

// Fix CustomSystemsView
let customCode = fs.readFileSync('src/components/CustomSystemsView.tsx', 'utf8');
customCode = customCode.replace(
  "import { ArrowLeft, Plus, Lock } from 'lucide-react';",
  "import { ArrowLeft, Plus, Lock, ChevronLeft } from 'lucide-react';"
);
fs.writeFileSync('src/components/CustomSystemsView.tsx', customCode);

