#!/bin/bash
FILE="src/App.tsx"

sed -i '2608d' $FILE
sed -i '2608a\        )}' $FILE

