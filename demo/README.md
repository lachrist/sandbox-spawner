```sh
node ../node_modules/sandbox-editor/bin.js --path child.js --type browserify --nobuffer --noprocess --min-lines 8 --max-lines 16 > child-sandbox.js
browserify main.js > bundle.js
rm child-sandbox.js
```