const fs = require('fs');
let content = fs.readFileSync('src/components/ItemImage.tsx', 'utf8');

const replacement = `
  const getUrl = () => {
    let url = item.img!;
    if (errorCount === 1) url = url.replace('.gif', '.png');
    else if (errorCount === 2) url = url.toLowerCase();
    else if (errorCount === 3) url = url.toLowerCase().replace('.gif', '.png');
    else if (errorCount === 4) url = url.replace(/_/g, '%20');
    else if (errorCount === 5) url = url.replace(/_/g, '%20').replace('.gif', '.png');
    return url;
  };

  const handleError = () => {
    if (errorCount < 6) {
      setErrorCount(prev => prev + 1);
    }
  };

  if (errorCount >= 6) {
    return getFallbackIcon();
  }
`;

content = content.replace(/const getUrl = \(\) => \{[\s\S]*?if \(errorCount >= 4\) \{\s*return getFallbackIcon\(\);\s*\}/, replacement.trim());

fs.writeFileSync('src/components/ItemImage.tsx', content);
console.log('Updated ItemImage with more fallbacks');
