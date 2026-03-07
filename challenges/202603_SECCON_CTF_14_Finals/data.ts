import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 14 Finals",
  links: [
    {
      label: "CTFtime (International)",
      url: "https://ctftime.org/event/3106",
    },
    {
      label: "CTFtime (Domestic)",
      url: "https://ctftime.org/event/3107",
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
      "[Warpup](challenges/202603_SECCON_CTF_14_Finals/web/warpup)",
      "web",
      "9",
      "9",
      "★",
      "stream",
    ],
    [
      "[DOMDOMDOMPurify](challenges/202603_SECCON_CTF_14_Finals/web/domdomdom)",
      "web",
      "9",
      "9",
      "★",
      "DOMPurify, mXSS",
    ],
    [
      "[Shadow CSS](challenges/202603_SECCON_CTF_14_Finals/web/shadow-css)",
      "web",
      "1",
      "0",
      "★★★",
      "Firefox, Link",
    ],
    [
      "[Slay the Note](challenges/202603_SECCON_CTF_14_Finals/web/slay-the-note)",
      "web",
      "0",
      "0",
      "★★★",
      "cookie parser",
    ],
    [
      "[increasing](challenges/202603_SECCON_CTF_14_Finals/jail/increasing)",
      "jail",
      "4",
      "4",
      "★★",
      "pyjail",
    ],
  ],
};

export default ctf;
