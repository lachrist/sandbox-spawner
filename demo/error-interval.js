var counter = 0
setInterval(() => {
  throw new Error("error#"+(++counter));
}, 3000);