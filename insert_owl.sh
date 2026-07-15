#!/bin/bash
FILE="src/App.tsx"

# First let's check what's exactly at line 2627
sed -n '2625,2635p' $FILE
