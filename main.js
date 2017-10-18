
const StdioWidget = require("stdio-widget");
const ToggleWidget = require("toggle-widget");
const SandboxEditor = require("sandbox-editor");
const ChildWorker = require("./child-worker.js");
const ParseArgv = require("./parse-argv.js");

module.exports = (container, sandbox) => {

  sandbox.editor = sandbox.editor || {};
  sandbox.editor.minLines = sandbox.editor.minLines || 7;
  sandbox.editor.maxLines = sandbox.editor.maxLines || 20;

  let child = null;
  let spawn = null;
  const input = document.createElement("input");
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  // div3.style.height = "200px";
  const stdio = StdioWidget(div2);
  const toggle = ToggleWidget(div1, {colors:["green", "red"]});
  const editor = SandboxEditor(div3, sandbox);

  const update = () => {
    child = null;
    editor.setReadOnly(false);
    toggle();
  };

  const ontoggle = () => {
    if (child) {
      child.removeListener("exit", update);
      child.kill();
      child = null;
    } else {
      child = spawn(editor.getSandbox().path, editor.getScript(), ParseArgv(input.value));
      if (child instanceof Worker)
        child = ChildWorker(child);
      child.addListener("exit", update);
      stdio(child.stdin, child.stdout, child.stderr);
    }
    editor.setReadOnly(Boolean(child));
  };

  div2.addEventListener("ctrl", (event) => { event.key === "c" && child && child.kill() });

  div1.addEventListener("toggle", ontoggle);
  div1.disabled = true;
  input.placeholder = "argv...";
  container.className += " sandbox-spawner";

  ((() => {
    div1.style.marginRight = "10px";
    div2.style.minWidth = "200px";
    div2.style.height = "0px"; // avoid growth inside flex container
    div2.style.width = "0px";  // avoid growth inside flex container
    div2.style.resize = "both";
    div2.style.flexGrow = "1";
    div3.style.flexGrow = "1";
    input.style.flexGrow = "1";
    input.style.fontFamily = "monospace";

    const div4 = document.createElement("div");
    div4.style.flexShrink = 0;
    div4.style.display = "flex";
    div4.style.flexDirection = "row";
    div4.style.marginBottom = "10px";
    div4.appendChild(div1);
    div4.appendChild(input);

    const div5 = document.createElement("div");
    div5.style.marginRight = "10px";
    div5.style.display = "flex";
    div5.style.flexDirection = "column";
    div5.appendChild(div4);
    div5.appendChild(div2);

    container.style.width = "initial";
    container.style.display = "flex";
    container.style.flexDirection = "row";
    container.appendChild(div5);
    container.appendChild(div3);
  }) ());

  return (sp) => {
    child && child.kill();
    div1.disabled = !sp;
    spawn = sp;
  };

};
