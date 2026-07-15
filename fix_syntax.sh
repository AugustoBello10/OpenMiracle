#!/bin/bash
FILE="src/App.tsx"

# Let's insert the missing AnimatePresence and activeTab conditional right after line 2598
sed -i '2598a\            <AnimatePresence mode="wait">\n            {activeTab === '"'"'home'"'"' && (' $FILE

