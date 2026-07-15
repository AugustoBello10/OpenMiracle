#!/bin/bash
FILE="src/App.tsx"

sed -i '/if (path.startsWith('\''\/mapa'\'')) return '\''mapa'\'';/a\
    if (path.startsWith('\''/eventos'\'')) return '\''eventos'\'';\
' $FILE

sed -i '/} else if (path.startsWith('\''\/mapa'\'')) {/a\
    } else if (path.startsWith('\''/eventos'\'')) {\
      setActiveTab('\''eventos'\'');\
' $FILE

sed -i '/else if (activeTab === '\''mapa'\'') newPath = '\''\/mapa'\'';/a\
    else if (activeTab === '\''eventos'\'') newPath = '\''/eventos'\'';\
' $FILE
