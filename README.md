# sandbox-spawner

[NPM module](https://www.npmjs.com/package/sandbox-spawner) to spawn node-like processes in the browser
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/sandbox-spawner/3972dafe/demo/index.html).

## `spawner = require("sandbox-spawner")(container, sandbox)`

* `container :: dom.Element`
* `sandbox :: sandbox-editor.Sandbox`
* `spawner(spawn)`
  * `child = spawn(path, script, argv)`
    * `path :: string`
    * `script :: string`
    * `argv :: [string]`
    * `child :: sandbox-spawner.Child | Worker`

## `Child :: events.EventEmitter`

* `stdin :: stream.Writable`
* `stdout :: stream.Readable`
* `stderr :: stream.Redable`
* `child.kill(signal)`
  * `signal :: string`
* Event `exit`
  * `code :: number`
  * `signal :: string`
