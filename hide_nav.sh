#!/bin/bash
FILE="src/App.tsx"
sed -i '2444s/.*/      {activeTab !== "home" \&\& (\n&/' $FILE
sed -i '2599s/.*/&\n      )}/' $FILE
