import type Ctf from "@/generator/Ctf.ts";

const ctfs: Ctf[] = await Promise.all(
  [
    "@/challenges/202509_ASIS_CTF_Quals_2025/data.ts",
    "@/challenges/202506_IERAE_CTF_2025/data.ts",
    "@/challenges/202505_AlpacaHack_Round_11/data.ts",
    "@/challenges/202503_SECCON_CTF_13_Finals/data.ts",
    "@/challenges/202412_ASIS_CTF_Finals_2024/data.ts",
    "@/challenges/202411_AlpacaHack_Round_7/data.ts",
    "@/challenges/202411_SECCON_CTF_13_Quals/data.ts",
    "@/challenges/202409_IERAE_CTF_2024/data.ts",
    "@/challenges/202409_AlpacaHack_Round_2/data.ts",
    "@/challenges/202312_SECCON_CTF_2023_Finals/data.ts",
    "@/challenges/202312_IERAE_DAYS_CTF_2023/data.ts",
    "@/challenges/202309_SECCON_CTF_2023_Quals/data.ts",
    "@/challenges/202302_SECCON_CTF_2022_Finals/data.ts",
    "@/challenges/202211_SECCON_CTF_2022_Quals/data.ts",
    "@/challenges/202112_SECCON_CTF_2021/data.ts",
  ].map((path) => import(path).then(({ default: ctf }) => ctf))
);

const genToc = function* () {
  yield "### ToC";
  yield "";
  for (const ctf of ctfs) {
    yield `- [${ctf.name}](#${ctf.name
      .toLowerCase()
      .replaceAll(" ", "-")
      .replace(/[()]/g, "")})`;
  }
};

const genCtfSection = function* (ctf: Ctf) {
  yield `## ${ctf.name}`;
  yield "";

  if (typeof ctf.description === "string") {
    yield ctf.description;
    yield "";
  }

  const links = [];
  for (const link of ctf.links) {
    links.push(
      link.url ? `[${link.label}](${link.url})` : `${link.label} (TBD)`
    );
  }
  if (links.length > 0) {
    yield `Links: ${links.join(" / ")}`;
    yield "";
  }

  yield `|${ctf.columns.join("|")}|`;
  yield `|${":-:|".repeat(ctf.columns.length)}`;
  for (const row of ctf.challenges) {
    yield `|${row.join("|")}|`;
  }
  yield "";
};

const genAll = function* () {
  yield "# My CTF Challenges";
  yield "";
  yield "A repository for CTF challenges I created. Have fun playing CTFs :sunglasses:";
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
