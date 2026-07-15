#!/bin/bash
FILE="src/App.tsx"
sed -i '2599a\      <div className="flex-grow flex flex-row overflow-hidden max-w-[1920px] w-full mx-auto relative">' $FILE
