const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

function replaceBlock(commentStart, commentEnd, wrapWith) {
  const startIdx = content.indexOf(commentStart);
  if (startIdx === -1) return;
  const endIdx = content.indexOf(commentEnd, startIdx);
  if (endIdx === -1) return;
  
  // Find the exact starting position of the outer div (the space-y-1.5 div)
  const blockStart = content.lastIndexOf('<div', startIdx);
  // Find the closing </div>
  let pos = blockStart;
  let openDivs = 0;
  let blockEnd = -1;
  while(pos < content.length) {
    if (content.substr(pos, 4) === '<div') {
      openDivs++;
    } else if (content.substr(pos, 5) === '</div') {
      openDivs--;
      if (openDivs === 0) {
        blockEnd = pos + 6;
        break;
      }
    }
    pos++;
  }
  
  if (blockEnd !== -1) {
    const block = content.slice(blockStart, blockEnd);
    const wrappedBlock = `{${wrapWith} && (\n${block}\n)}\n`;
    content = content.slice(0, blockStart) + wrappedBlock + content.slice(blockEnd);
  }
}

// Map of comments to wrapper variables
replaceBlock('{/* INÍCIO & NOTAS SECTION */}', 'sidebarOpenGroups.inicio', 'isWiki');
replaceBlock('{/* CYCLOPEDIA SECTION */}', 'sidebarOpenGroups.cyclopedia', 'isWiki');
replaceBlock('{/* BIBLIOTECA SECTION */}', 'sidebarOpenGroups.biblioteca', 'isWiki');
replaceBlock('{/* GUIAS SECTION */}', 'sidebarOpenGroups.guias', 'isWiki');

replaceBlock('{/* CALCULADORES SECTION */}', 'sidebarOpenGroups.calculadores', 'isFerramentas');
replaceBlock('{/* PROFISSÕES SECTION */}', 'sidebarOpenGroups.profissoes', 'isFerramentas');

replaceBlock('{/* FEEDBACK SECTION */}', 'sidebarOpenGroups.comunidade', 'activeTab === "feedback"');

fs.writeFileSync('src/App.tsx', content);

