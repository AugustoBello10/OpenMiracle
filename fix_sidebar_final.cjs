const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The outer div is <div className="flex flex-col gap-4 text-left select-none pb-12 font-['DotGothic16']">
// Let's find it.
const start = content.indexOf('<div className="flex flex-col gap-4 text-left select-none pb-12 font-[\'DotGothic16\']">');
if (start === -1) { console.log('not found'); process.exit(1); }

// Find the end of this div
let pos = start;
let open = 0;
let end = -1;
while(pos < content.length) {
    if (content.substr(pos, 4) === '<div') open++;
    if (content.substr(pos, 5) === '</div') {
        open--;
        if (open === 0) {
            end = pos + 6;
            break;
        }
    }
    pos++;
}

let sidebar = content.slice(start, end);

// Let's remove any `{isWiki && (` or `{isFerramentas && (` and `)}` that might be lingering.
// It's safer to just fetch the sidebar from before the mess? No git.
// Instead, I'll clean up all `isHunts`, `isFerramentas`, `isWiki`, `activeTab === "feedback"` wrapping in the sidebar.

sidebar = sidebar.replace(/\{isHunts && \(\n/g, '');
sidebar = sidebar.replace(/\{isFerramentas && \(\n/g, '');
sidebar = sidebar.replace(/\{isWiki && \(\n/g, '');
sidebar = sidebar.replace(/\{activeTab === "feedback" && \(\n/g, '');
// remove trailing `)}` for those!
sidebar = sidebar.replace(/\n\s*\)\}\s*/g, '\n');

// Now we have a clean sidebar hopefully.
// We have several `<div className="space-y-1.5">` blocks.
const blocks = sidebar.split('<div className="space-y-1.5">');

// blocks[0] is the top of the flex container.
// Each subsequent block is a group.
// Let's identify the group by its content.

let newSidebar = blocks[0];

for (let i = 1; i < blocks.length; i++) {
    let b = '<div className="space-y-1.5">' + blocks[i];
    let condition = 'true';
    if (b.includes("toggleGroup('inicio')") || b.includes("toggleGroup('cyclopedia')") || b.includes("toggleGroup('biblioteca')") || b.includes("toggleGroup('guias')")) {
        condition = 'isWiki';
    } else if (b.includes("toggleGroup('calculadores')") || b.includes("toggleGroup('profissoes')")) {
        condition = 'isFerramentas';
    } else if (b.includes("toggleGroup('comunidade'")) {
        condition = "activeTab === 'feedback'";
    } else if (b.includes("Hunts")) {
        condition = "isHunts";
    }

    // Wrap the block
    newSidebar += `\n{${condition} && (\n${b}\n)}\n`;
}

content = content.slice(0, start) + newSidebar + content.slice(end);

fs.writeFileSync('src/App.tsx', content);

