module.exports = {
  "type": "browserify",
  "path": "/child.js",
  "modules": [
    "process",
    "buffer",
    "/error.js"
  ],
  "content": "process.stdout.write(JSON.stringify(process.argv)+\"\\n\");\nrequire(\"/error.js\");\nprocess.stdin.setEncoding(\"utf8\");\nprocess.stdin.on(\"data\", function (data) {\n  process.stdout.write(JSON.stringify(data)+\"\\n\");\n});",
  "require": "require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error(\"Cannot find module '\"+o+\"'\");throw f.code=\"MODULE_NOT_FOUND\",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({\"/error.js\":[function(require,module,exports){\n(((__filename, __dirname) => {\nprocess.stderr.write(\"error\\n\");\n}) (\"/error.js\",\"/\"));\n},{}],\"buffer\":[function(require,module,exports){\n(((__filename, __dirname) => {\nmodule.exports = Buffer;\n}) (\"/_stream_1.js\",\"/\"));\n},{}],\"process\":[function(require,module,exports){\n(((__filename, __dirname) => {\nmodule.exports = process;\n}) (\"/_stream_0.js\",\"/\"));\n},{}]},{},[]);\n"
};
