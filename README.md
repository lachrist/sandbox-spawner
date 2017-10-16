# sandbox-spawner

Spawn node-like processes in the browser
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/sandbox-spawner/a17294b8/demo/index.html).

## `spawner = require("sandbox-spawner")(container, sandbox, options)`

* `container :: dom.Element`
* `sandbox :: sandbox-editor.Sandbox`
* `options :: ace.c9.EditorOptions`
* `spawner(spawn)`
  * `child = spawn(path, script, argv)`
    * `path :: string`
    * `script :: string`
    * `argv :: [string]`
    * `child :: child_process.ChildProcess`
