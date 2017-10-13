const Stream = require("stream");
const Events = require("events");
const SandboxSpawner = require("../main.js");
const ChildSandbox = require("./child-sandbox.js");
const div = document.createElement("div");
document.body.appendChild(div);
function kill (signal) { this.emit("exit", null, signal) }
const autopipe = () => new Stream.Duplex({
  read: function () {},
  decodeStrings: false,
  write: function (chunk, encoding, callback) {
    this.push(chunk, encoding);
    callback();
  }
});
SandboxSpawner(div, ChildSandbox)((path, script, argv) => {
  const child = new Events();
  child.kill = kill;
  child.on("exit", () => { child.stdin.end() });
  const process = {
    argv: ["node", path].concat(argv),
    exit: (code) => { child.emit("exit", code, null) },
  };
  child.stdin = process.stdin = autopipe();
  child.stdout = process.stdout = autopipe();
  child.stderr = process.stderr = autopipe();
  setTimeout(() => {
    try {
      Function("process", script)(process);
    } catch (error) {
      process.stderr.write(error.stack+"\n", "utf8");
      child.kill("SIGTERM");
    }
  }, 0);
  return child;
});