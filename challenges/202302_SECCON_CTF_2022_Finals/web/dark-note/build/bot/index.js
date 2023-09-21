const net = require("node:net");
const crypto = require("node:crypto");
const dns = require("node:dns").promises;
const puppeteer = require("puppeteer");

const FLAG = process.env.FLAG ?? console.log("No flag") ?? process.exit(1);
const BOT_PORT = "8000";
const APP_HOST = "web";

if (!/^SECCON{[a-z0-9_]+}$/.test(FLAG)) {
  console.log("Bad flag 1");
  process.exit(1);
}

const MAX_LENGTH = 16;
if (FLAG.length > MAX_LENGTH) {
  console.log("Bad flag 2");
  process.exit(1);
}
const PADDED_FLAG = FLAG.padEnd(MAX_LENGTH, " ");

const sleep = async (msec) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const visit = async (attackUrl, { appPort, basicUsername, basicPassword }) => {
  console.log(`start: ${JSON.stringify(attackUrl)}`);
  const baseUrl = `http://${APP_HOST}:${appPort}`;

  const name = crypto.randomBytes(12).toString("base64");
  const password = crypto.randomBytes(12).toString("base64");

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox"],
  });
  const context = await browser.createIncognitoBrowserContext();

  try {
    const page1 = await context.newPage();
    if (basicUsername) {
      await page1.authenticate({
        username: basicUsername,
        password: basicPassword,
      });
    }

    await page1.goto(`${baseUrl}/signup`, { timeout: 3000 });
    await sleep(0.5 * 1000);

    // Create an account
    await page1.waitForSelector("#name");
    await page1.type("#name", name);
    await page1.waitForSelector("#password");
    await page1.type("#password", password);
    await page1.waitForSelector("#submit");
    await page1.click("#submit");
    await sleep(0.5 * 1000);

    // Create a note for each of the characters of `PADDED_FLAG`
    for (const chr of PADDED_FLAG) {
      await page1.waitForSelector("#note");
      await page1.type("#note", chr);
      await page1.waitForSelector("#createNote");
      await page1.click("#createNote");
      await sleep(0.5 * 1000);
    }

    await page1.close();
    await sleep(1 * 1000);

    //

    const page2 = await context.newPage();
    if (basicUsername) {
      await page2.authenticate({
        username: basicUsername,
        password: basicPassword,
      });
    }

    // Access to the given URL
    await page2.goto(attackUrl, { timeout: 3000 });
    await sleep(60 * 1000);

    await page2.close();
  } catch (e) {
    console.log(e);
  }

  await context.close();
  await browser.close();

  console.log(`end: ${JSON.stringify(attackUrl)}`);
};

const main = async () => {
  const reportIp = (await dns.lookup(APP_HOST)).address;

  const server = net.createServer((socket) => {
    if (socket.remoteAddress !== reportIp) {
      socket.destroy();
      return;
    }

    socket.first = true;
    socket.on("data", async (data) => {
      try {
        if (!socket.first) return;
        socket.first = false;

        const [appPort, basicUsername, basicPassword, ...tail] = data
          .toString()
          .trim()
          .split(":");
        const url = tail.join(":");

        if (url.startsWith("http://") || url.startsWith("https://")) {
          socket.write("Received :)");
          await visit(url, { appPort, basicUsername, basicPassword });
        } else {
          socket.write("Bad url :(");
        }

        socket.end();
        socket.destroy();
      } catch (e) {
        console.log(e);
      }
    });
  });
  server.listen(BOT_PORT, "0.0.0.0", () => {
    console.log("Started");
  });
};

main();
