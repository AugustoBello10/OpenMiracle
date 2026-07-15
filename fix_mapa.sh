#!/bin/bash
FILE="src/App.tsx"

sed -i '/} else if (path.startsWith('\''\/mapa'\'')) {/,/setActiveTab('\''mapa'\'');/d' $FILE
sed -i '/} else if (path.startsWith('\''\/eventos'\'')) {/d' $FILE
sed -i '/setActiveTab('\''eventos'\'');/d' $FILE

sed -i '/} else if (path.startsWith('\''\/wiki'\'')) {/i\
    } else if (path.startsWith('\''/mapa'\'')) {\
      setActiveTab('\''mapa'\'');\
    } else if (path.startsWith('\''/eventos'\'')) {\
      setActiveTab('\''eventos'\'');\
' $FILE
