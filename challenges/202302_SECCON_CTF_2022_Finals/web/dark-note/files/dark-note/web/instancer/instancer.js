/*
  To CTF players:

  This script has no bugs or vulnerabilities (at least in my intended solution).
  You don't need to read this file to solve the challenge.
 */

const crypto = require("node:crypto");
const childProcess = require("node:child_process");
const util = require("node:util");
const readline = require("node:readline").promises;

const TIMEOUT = 8 * 60; // [sec]

const LENGTH = 10;
const STRENGTH = 26;

const LOWER_PORT = Number(process.env.LOWER_PORT ?? process.exit(1));
const UPPER_PORT = Number(process.env.UPPER_PORT ?? process.exit(1));

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
const execFileAsync = util.promisify(childProcess.execFile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const pow = async () => {
  const challenge = crypto
    .randomBytes(8)
    .toString("base64")
    .replaceAll("+", "_")
    .replaceAll("/", ".")
    .slice(0, LENGTH);

  const hashcashCommand = `hashcash -mb${STRENGTH} ${challenge}`;
  console.log(hashcashCommand);

  const token = (await rl.question("hashcash token: ")).trim();
  if (!token.match(/^[a-zA-Z0-9\+\_\.\:\/]{52}$/)) {
    console.log("Invalid token :(");
    return false;
  }

  try {
    await execFileAsync(
      "hashcash",
      [`-cdb${STRENGTH}`, "-f", "/tmp/hashcash.sdb", "-r", challenge, token],
      { timeout: 2000 }
    );
    return true;
  } catch (e) {
    console.log(e.killed ? "Timeout" : "Wrong token :(");
    return false;
  }
};

const startService = async () => {
  let port;
  while (true) {
    port = (Math.random() * (UPPER_PORT - LOWER_PORT) + LOWER_PORT) | 0;
    const ports = (await execFileAsync("ss", [`-lpn`])).stdout;
    if (!ports.includes(`:${port}`)) break;

    await sleep(200);
  }

  const username = "seccon";
  const password = crypto.randomBytes(8).toString("base64");

  console.log(
    `
URL (global): http://{{CHALLENGE_HOST}}:${port}
URL (from bot): http://web:${port}

Basic auth:
- Username: ${username}
- Password: ${password}

Timeout: ${TIMEOUT} sec
    `.trim()
  );

  return new Promise((resolve, _reject) => {
    const child = childProcess.execFile(
      "node",
      ["index.js"],
      {
        timeout: TIMEOUT * 1000,
        env: {
          ...process.env,
          APP_PORT: port,
          BASIC_USERNAME: username,
          BASIC_PASSWORD: password,
        },
      },
      (err) => {
        if (err) {
          console.log(err.killed ? "Service: timeout" : "Something wrong...");
        }
        resolve();
      }
    );
    process.on("SIGTERM", () => child.kill());
  });
};

const main = async () => {
  if (await pow()) {
    console.log();
    await startService();
  }
};

main().then(() => rl.close());
