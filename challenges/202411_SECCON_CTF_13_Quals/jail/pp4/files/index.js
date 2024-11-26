#!/usr/local/bin/node
const readline = require("node:readline/promises");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clone = (target, result = {}) => {
  for (const [key, value] of Object.entries(target)) {
    if (value && typeof value == "object") {
      if (!(key in result)) result[key] = {};
      clone(value, result[key]);
    } else {
      result[key] = value;
    }
  }
  return result;
};

(async () => {
  // Step 1: Prototype Pollution
  const json = (await rl.question("Input JSON: ")).trim();
  console.log(clone(JSON.parse(json)));

  // Step 2: JSF**k with 4 characters
  const code = (await rl.question("Input code: ")).trim();
  if (new Set(code).size > 4) {
    console.log("Too many :(");
    return;
  }
  console.log(eval(code));
})().finally(() => rl.close());
