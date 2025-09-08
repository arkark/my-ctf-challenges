import puppeteer from "puppeteer";

export const challenge = {
  name: "pure-leak",
  appUrl: new URL("http://web:3000"),
  rateLimit: 4, // max requests per 1 minute
};

export const flag = {
  value: process.env.FLAG,
  validate: (flag) => flag && /^ASIS{.+}$/.test(flag),
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
    await context.setCookie({
      name: "TOKEN",
      value: token,
      domain: challenge.appUrl.hostname,
      path: "/",
    });

    const page = await context.newPage();
    await page.goto(url, { timeout: 3_000 });
    await sleep(20_000);
    await page.close();
  } catch (e) {
    console.error(e);
  }

  await context.close();
  await browser.close();

  console.log(`end: ${url}`);
};
