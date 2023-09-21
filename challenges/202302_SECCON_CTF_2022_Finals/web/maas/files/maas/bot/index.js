const net = require("node:net");
const dns = require("node:dns").promises;
const puppeteer = require("puppeteer");

const FLAG = process.env.FLAG ?? console.log("No flag") ?? process.exit(1);
const PORT = process.env.PORT ?? "8000";
const APP_HOST = process.env.APP_HOST ?? "web";
const APP_PORT = process.env.APP_PORT ?? "3000";

if (!/^SECCON{[a-zA-Z0-9_]+}$/.test(FLAG)) {
  console.log("Bad flag");
  process.exit(1);
}

const sleep = async (msec) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const visit = async (code) => {
  console.log(`start: ${JSON.stringify(code)}`);
  const url = `http://${APP_HOST}:${APP_PORT}`;

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome-stable",
    args: ["--no-sandbox"],
  });
  const context = await browser.createIncognitoBrowserContext();

  const page = await context.newPage();
  await page.setCookie({
    name: "FLAG",
    value: FLAG,
    domain: APP_HOST,
    path: "/",
  });

  try {
    await page.goto(url, { timeout: 1000 });
    await sleep(1 * 1000);
    await page.waitForSelector("#originalCode");
    await page.type("#originalCode", code);
    await page.waitForSelector("#minify");
    await page.click("#minify");
    await sleep(10 * 1000);
  } catch (e) {
    console.log(e);
  }
  await page.close();

  await context.close();
  await browser.close();

  console.log(`end: ${JSON.stringify(code)}`);
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

        const code = data.toString().trim();
        socket.write("Received :)");
        await visit(code);

        socket.end();
        socket.destroy();
      } catch (e) {
        console.log(e);
      }
    });
  });
  server.listen(PORT, "0.0.0.0", () => {
    console.log("Started");
  });
};

main();
