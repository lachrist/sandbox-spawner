const Stream = require("stream");
const Events = require("events");
const SandboxSpawner = require("../main.js");
const ChildSandbox = require("./child-sandbox.js");
const div = document.createElement("div");
div.style.height = "200px";
document.body.appendChild(div);
SandboxSpawner(div, ChildSandbox)((path, script, argv) => {
  return new Worker(URL.createObjectURL(new Blob([
    "const PATH = "+JSON.stringify(path)+";\n",
    "const ARGV = "+JSON.stringify(argv)+";\n",
    script
  ])));
});