#!/usr/local/bin/node

const readline = require("node:readline/promises");
const { promisify } = require("node:util");
const { execFile } = require("node:child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const code = (await rl.question("Your code: ")).trim();

  const proc = await promisify(execFile)(
    "/usr/local/bin/node",
    ["jail.js", code],
    {
      timeout: 2000,
    }
  ).catch((e) => e);

  console.log(proc.killed ? "timeout" : proc.stdout);
})().finally(() => rl.close());
