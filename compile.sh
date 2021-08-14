#!/bin/sh
rm dist.zip
mkdir -p dist/lib
cd src
cp index.html i.css ../dist/
cp lib/t.js ../dist/lib
cp c.js ../dist/
rollup i.js --format cjs --file ../dist/bundle.js
cd ../dist
terser bundle.js -o i.js --compress --mangle --mangle-props reserved=["g","img","flush","bkg","cls","col"] --timings --toplevel --module
rm bundle.js
cd ..
cd dist
zip -r ../dist.zip *
cd ..
echo "ect:"
./ect -9 -zip ./dist.zip
