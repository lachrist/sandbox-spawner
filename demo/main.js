const Stream = require("stream");
const Events = require("events");
const SandboxSpawner = require("../main.js");
const ChildSandbox = require("./child-sandbox.js");
const div = document.createElement("div");
document.body.appendChild(div);
function kill (signal) { this.emit("exit", null, signal) }
function noop () {}
function autopush (chunk, encoding, callback) {
  this.push(chunk, encoding);
  callback();
}
const autopipe = () => new Stream.Duplex({
  read: noop,
  decodeStrings: false,
  write: autopush
});
SandboxSpawner(div, ChildSandbox)((path, script, argv) => {
  const child = new Events();
  child.kill = kill;
  child.on("exit", () => { child.stdin.end() });
  child.stdin = autopipe();
  child.stdout = autopipe();
  child.stderr = autopipe();
  const main = Function("process", script);
  setTimeout(main, 0, {
    argv: ["node", path].concat(argv),
    exit: (code) => { child.emit("exit", code, null) },
    stdin: child.stdin,
    stdout: child.stdout,
    stderr: child.stderr
  });
  return child;
});