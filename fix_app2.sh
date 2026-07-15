#!/bin/bash
FILE="src/App.tsx"
sed -i '2603,2610d' $FILE
sed -i '2602a\        {/* Left Sidebar Menu */}\n        {activeTab !== "home" && (\n        <aside className="w-64 lg:w-72 hidden md:block shrink-0 border-r border-medieval-gold/15 bg-black/55 py-6 px-4 overflow-y-auto custom-scrollbar select-none self-stretch">\n          {renderSidebarContent(false)}\n        </aside>\n        )}' $FILE
