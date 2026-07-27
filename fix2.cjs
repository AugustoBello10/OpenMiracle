const fs = require('fs');

let customCode = fs.readFileSync('src/components/CustomSystemsView.tsx', 'utf8');
customCode = customCode.replace(
  "import { ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react';",
  "import { ChevronRight, ArrowLeft, ExternalLink, ChevronLeft } from 'lucide-react';"
);
fs.writeFileSync('src/components/CustomSystemsView.tsx', customCode);

