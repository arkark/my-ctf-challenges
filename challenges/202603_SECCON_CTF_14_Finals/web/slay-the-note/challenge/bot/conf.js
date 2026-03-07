import puppeteer from "puppeteer";

export const challenge = {
  name: "Slay the Note",
  appUrl: new URL("http://web:3000"),
  rateLimit: 4, // max requests per 1 minute
};

export const flag = {
  value: process.env.FLAG,
  validate: (flag) => typeof flag === "string" && /^SECCON\{\w+\}$/.test(flag),
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const visit = async (url, token) => {
  console.log(`start: ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--js-flags=--noexpose_wasm,--jitless",
      "--disable-features=HttpsFirstBalancedModeAutoEnable",
    ],
  });

  const context = await browser.createBrowserContext();

  try {
    // Create a token note
    const page1 = await context.newPage();
    await page1.goto(challenge.appUrl, { timeout: 3_000 });
    await page1.waitForSelector("#create");
    await page1.type("#create input[name=note]", token);
    await page1.click("#create input[type=submit]");
    await sleep(1_000);
    await page1.close();
    await sleep(1_000);

    // Visit the given URL
    const page2 = await context.newPage();
    await page2.goto(url, { timeout: 5_000 });
    await sleep(15_000);
    await page2.close();
  } catch (e) {
    console.error(e);
  }

  await context.close();
  await browser.close();

  console.log(`end: ${url}`);
};
