#!/bin/bash
FILE="src/App.tsx"

# Delete lines 2600 and 2601
sed -i '2600,2601d' $FILE

# Reinsert them in the correct order
sed -i '2599a\      )}\n      <div className="flex-grow flex flex-row overflow-hidden max-w-[1920px] w-full mx-auto relative">' $FILE

