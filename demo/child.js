require("./error.js");
self.postMessage(PATH+"\n");
self.postMessage(JSON.stringify(ARGV)+"\n");
self.addEventListener("message", (event) => {
  self.postMessage("echo "+JSON.stringify(event.data)+"\n");
});