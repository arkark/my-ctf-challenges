const net = require("node:net");
const dns = require("node:dns").promises;
const puppeteer = require("puppeteer");

const FLAG = process.env.FLAG ?? console.log("No flag") ?? process.exit(1);
const BOT_PORT = "8000";
const APP_HOST = "localhost";
const APP_PORT = "3000";

if (!/^SECCON{[a-z0-9_]+}$/.test(FLAG)) {
  console.log("Bad flag");
  process.exit(1);
}

const sleep = async (msec) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const visit = async (url) => {
  console.log(`start: ${JSON.stringify(url)}`);

  const baseUrl = `http://${APP_HOST}:${APP_PORT}`;
  /*
    To CTF players:
    Don't forget the hostname is not `web` but `localhost`.
   */

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox"],
  });
  const context = await browser.createIncognitoBrowserContext();

  try {
    const page1 = await context.newPage();

    await page1.goto(baseUrl, { timeout: 3000 });
    await sleep(0.5 * 1000);

    await page1.waitForSelector("#note");
    await page1.type("#note", FLAG);
    await page1.waitForSelector("#createNote");
    await page1.click("#createNote");
    await sleep(0.5 * 1000);

    await page1.close();
    await sleep(1 * 1000);

    const page2 = await context.newPage();
    await page2.goto(url, { timeout: 3000 });
    await sleep(60 * 1000);
    await page2.close();
  } catch (e) {
    console.log(e);
  }

  await context.close();
  await browser.close();

  console.log(`end: ${JSON.stringify(url)}`);
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

        const url = data.toString().trim();
        if (url.startsWith("http://") || url.startsWith("https://")) {
          socket.write("Received :)");
          await visit(url);
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
