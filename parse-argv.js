
module.exports = (command) => {
  const args = [];
  let quote = null;
  let current = null;
  for (var i=0; i<command.length; i++) {
    if (command[i] === quote) {
      quote = null;
    } else if (quote) {
      current += command[i];
    } else if (command[i] === "'" || command[i] === "\"") {
      quote = command[i];
      current = current || "";
    } else if (command[i] === " " || command[i] === "\t") {
      if (current !== null) {
        args.push(current);
        current = null;
      }
    } else {
      current = (current||"")+command[i]
    }
  }
  if (current !== null)
    args.push(current);
  return args;
};
