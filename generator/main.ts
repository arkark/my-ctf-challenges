import type Ctf from "./Ctf.ts";

const ctfs: Ctf[] = await Promise.all(
  [
    "./data/20230211-seccon-ctf-2022-finals.ts",
    "./data/20221112-seccon-ctf-2022-quals.ts",
    "./data/20211211-seccon-ctf-2021.ts",
  ].map((path) => import(path).then(({ default: ctf }) => ctf))
);

const genToc = function* () {
  yield "### ToC";
  yield "";
  for (const ctf of ctfs) {
    yield `- [${ctf.name}](#${ctf.name.toLowerCase().replaceAll(" ", "-")})`;
  }
};

const genCtfSection = function* (ctf: Ctf) {
  yield `## ${ctf.name}`;
  yield "";

  if (typeof ctf.description === "string") {
    yield ctf.description;
    yield "";
  }

  yield "### Links";
  yield "";
  for (const link of ctf.links) {
    yield `- [${link.label}](${link.url})`;
  }
  yield "";

  yield "### Challenges";
  yield "";
  yield `|${ctf.columns.join("|")}|`;
  yield `|${":-:|".repeat(ctf.columns.length)}`;
  for (const challenge of ctf.challenges) {
    yield `|${challenge
      .map((value) => (value instanceof URL ? `[link](${value.href})` : value))
      .join("|")}|`;
  }
  yield "";
};

const genAll = function* () {
  yield "# My CTF Challenges";
  yield "";
  yield "A repository for CTF challenges I created. It contains the source code, the solvers, and the author writeups for all the challenges. Have fun playing CTFs :sunglasses:";
  yield "";
  yield* genToc();
  yield "";
  for (const ctf of ctfs) {
    yield* genCtfSection(ctf);
  }
};

const FILENAME = "README.md";

await Deno.writeTextFile(FILENAME, "");
for (const line of genAll()) {
  await Deno.writeTextFile(FILENAME, line + "\n", { append: true });
}
