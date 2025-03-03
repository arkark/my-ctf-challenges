import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 13 Finals",
  description: "Sat, 01 Mar. 2025, 10:00 JST — Sun, 02 Mar. 2025, 20:00 JST",
  links: [
    {
      label: "CTFtime (International)",
      url: "https://ctftime.org/event/2649",
    },
    {
      label: "CTFtime (Domestic)",
      url: "https://ctftime.org/event/2650",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved / 9<br>(International)",
    "Solved / 9<br>(Domestic)",
    "Difficulty",
    "Keywords",
  ],
  challenges: [
    [
      "[purexss](challenges/202503_SECCON_CTF_13_Finals/web/purexss)",
      "web",
      "4",
      "1",
      "★★",
      "XSS, ISO-2022-JP",
    ],
    [
      "[twisty-xss](challenges/202503_SECCON_CTF_13_Finals/web/twisty-xss)",
      "web",
      "3",
      "0",
      "★★★",
      "XSS, puzzle",
    ],
    [
      "[witchnote](challenges/202503_SECCON_CTF_13_Finals/web/witchnote)",
      "web",
      "1",
      "0",
      "★★★",
      "XSS, disk cache",
    ],
    [
      "[pp3](challenges/202503_SECCON_CTF_13_Finals/jail/pp3)",
      "jail",
      "0",
      "0",
      "★★★",
      "jsf**k, prototype pollution",
    ],
  ],
};

export default ctf;
