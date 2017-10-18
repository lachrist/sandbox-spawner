```sh
node ../node_modules/sandbox-editor/bin.js --type browserify --path child.js > child-sandbox.js
browserify main.js > bundle.js
rm child-sandbox.js
```