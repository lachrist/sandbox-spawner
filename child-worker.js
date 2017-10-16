const Events = require("events");
const Stream = require("stream");

function kill (signal) {
  this._worker.terminate();
  this.emit("exit", null, signal);
  this.stdin.end();
  this.stdout.push(null);
  this.stderr.push(null);
}

function noop () {}

module.exports = (worker) => {
  const child = new Events();
  child._worker = worker;
  child.stdin = new Stream.Writable({
    decodeStrings: false,
    write: function (chunk, encoding, callback) {
      worker.postMessage(chunk);
      callback();
    }
  });
  child.stdout = new Stream.Readable({read:noop});
  worker.addEventListener("message", (event) => {
    child.stdout.push(event.data);
  });
  child.stderr = new Stream.Readable({read:noop});
  worker.addEventListener("error", (error) => {
    child.stderr.push(error.message+"\n");
  });
  child.kill = kill;
  return child;
};
