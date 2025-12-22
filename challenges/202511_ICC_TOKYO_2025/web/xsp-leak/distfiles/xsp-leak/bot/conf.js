import puppeteer from "puppeteer";
import crypto from "node:crypto";

export const challenge = {
  name: "XSP-Leak",
  appUrl: new URL("http://web:3000"),
  rateLimit: 2, // max requests per 1 minute
};

export const flag = {
  value: process.env.FLAG,
  validate: (flag) => flag && /^ICC{\w+}$/.test(flag),
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const visit = async (url) => {
  console.log(`start: ${url}`);

  const secrets = crypto.randomBytes(8).toString("hex").split("");
  // console.log(`secrets: ${secrets}`);

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

  // Set cookies
  for (let i = 0; i < secrets.length; i++) {
    const path = "/" + secrets.slice(0, i + 1).join("/");
    await context.setCookie({
      name: String(i),
      value: "true",
      domain: challenge.appUrl.hostname,
      path,
      httpOnly: true, // !!
    });
  }

  // The goal is to steal the following `path` :)
  const path = "/" + secrets.join("/");
  await context.setCookie({
    name: "FLAG",
    value: flag.value,
    domain: challenge.appUrl.hostname,
    path,
    httpOnly: false,
  });

  try {
    const page = await context.newPage();
    await page.goto(url, { timeout: 3_000 });
    await sleep(30_000);
    await page.close();
  } catch (e) {
    console.error(e);
  }

  await context.close();
  await browser.close();

  console.log(`end: ${url}`);
};
