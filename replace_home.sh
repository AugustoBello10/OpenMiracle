#!/bin/bash
FILE="src/App.tsx"

# Delete lines 2603 to 3117 (keep {activeTab === 'home' && ()
sed -i '2603,3117d' $FILE

# Insert the new content after line 2602
sed -i '2602r new_home.tsx' $FILE

