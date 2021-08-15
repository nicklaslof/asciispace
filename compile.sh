#!/bin/sh
rm dist.zip
mkdir -p dist
cd src
rollup i.js --format cjs --file ../dist/bundle.js
cd ../dist
terser bundle.js -o i.js --compress --mangle --mangle-props reserved=["g","img","flush","bkg","cls","col"] --timings --toplevel --module
rm bundle.js
echo "<style>" > index-template.html
cat ../src/i.css >> index-template.html
echo "</style>" >> index-template.html
echo "<canvas id=\"g\"></canvas><canvas id=\"t\"></canvas>" >> index-template.html
echo "<script>" >> index-template.html
cat ../src/lib/t.js >> index-template.html
echo "</script>" >> index-template.html
echo "<script>" >> index-template.html
cat ../src/c.js >> index-template.html
echo "</script>" >> index-template.html
echo "<script type=\"module\" charset=\"utf8\">" >> index-template.html
cat i.js >> index-template.html
echo "</script>" >> index-template.html

cat index-template.html | tr -d '\n' > index.html

rm i.js index-template.html
zip -r ../dist.zip *
cd ..
echo "ect:"
./ect -9 -zip ./dist.zip
