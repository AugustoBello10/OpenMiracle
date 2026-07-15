#!/bin/bash
FILE="src/App.tsx"
sed -i '2604s/.*/        {activeTab !== "home" \&\& (\n&/' $FILE
sed -i '2607s/.*/&\n        )}/' $FILE
