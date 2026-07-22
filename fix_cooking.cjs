const fs = require('fs');
let content = fs.readFileSync('src/components/ProfessionsGuideView.tsx', 'utf8');

// Add the state for cooking carousel if not exists
if (!content.includes('const [cookingRecipeIndex')) {
  content = content.replace(
    'const [expandedRecipeCat, setExpandedRecipeCat] = useState<string | null>(null);',
    'const [expandedRecipeCat, setExpandedRecipeCat] = useState<string | null>(null);\n  const [cookingRecipeIndex, setCookingRecipeIndex] = useState(0);'
  );
}

// Ensure ChevronLeft is imported
if (!content.includes('ChevronLeft')) {
  content = content.replace('ChevronRight, Info', 'ChevronLeft, ChevronRight, Info');
}

fs.writeFileSync('src/components/ProfessionsGuideView.tsx', content, 'utf8');
console.log('Setup done.');
