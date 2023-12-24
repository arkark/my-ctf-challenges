import { firefox } from "playwright-firefox";

const FLAG = process.env.FLAG ?? console.log("No flag") ?? process.exit(1);

const APP_HOST = "web";
const APP_PORT = "3000";
export const APP_URL = `http://${APP_HOST}:${APP_PORT}`;

if (!/^SECCON{[a-z_]+}$/.test(FLAG) || FLAG.length > 18) {
  console.log("Bad flag");
  process.exit(1);
}

const sleep = async (msec) =>
  new Promise((resolve) => setTimeout(resolve, msec));

export const visit = async (url) => {
  console.log(`start: ${url}`);

  const browser = await firefox.launch({
    headless: true,
    firefoxUserPrefs: {
      "javascript.options.wasm": false,
      "javascript.options.baselinejit": false,
    },
  });

  const context = await browser.newContext();
  await context.addCookies([
    {
      name: "FLAG",
      value: FLAG,
      url: APP_URL,
      httpOnly: true,
    },
  ]);

  try {
    const page = await context.newPage();
    await page.goto(url, { timeout: 3 * 1000 });
    await sleep(60 * 1000);
    await page.close();
  } catch (e) {
    console.error(e);
  }

  await browser.close();

  console.log(`end: ${url}`);
};
