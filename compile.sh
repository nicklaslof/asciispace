#!/bin/sh
rm dist.zip
mkdir -p dist
cd src
rollup i.js --format cjs --file ../dist/bundle.js
cp m.txt l.txt ../dist/
cd ../dist
terser bundle.js -o i.js --compress --mangle --mangle-props reserved=["g","img","flush","bkg","cls","col","init","generate","createWave"] --timings --toplevel --module
rm bundle.js
echo "<meta charset="UTF-8"><style>" > index-template.html
cat ../src/i.css >> index-template.html
echo "</style>" >> index-template.html
echo "<canvas id=\"g\"></canvas><canvas id=\"t\"></canvas><canvas id=\"u\"></canvas>" >> index-template.html
echo "<script>" >> index-template.html
cat ../src/lib/t.js >> index-template.html
echo "</script>" >> index-template.html
echo "<script>" >> index-template.html
cat  ../src/lib/z.js >> index-template.html
echo "</script>" >> index-template.html
echo "<script>" >> index-template.html
cat ../src/c.js >> index-template.html
echo "</script>" >> index-template.html
echo "<script type=\"module\" charset=\"utf8\">" >> index-template.html
cat i.js >> index-template.html
echo "</script><button id=\"s\">Play</button>" >> index-template.html

cat index-template.html | tr -d '\n' > index.html

rm i.js index-template.html
zip -r ../dist.zip *
cd ..
echo "ect:"
./ect -9 -zip ./dist.zip
