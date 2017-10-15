# sandbox-spawner

Spawn node-like processes in the browser
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/sandbox-spawner/97802bb2/demo/index.html).

## `spawner = require("sandbox-spawner")(container, sandbox)`

* `container :: dom.Element`
* `sandbox :: sandbox-editor.Sandbox`
* `spawner(spawn)`
  * `child = spawn(path, script, argv)`
    * `path :: string`
    * `script :: string`
    * `argv :: [string]`
    * `child :: child_process.ChildProcess`
