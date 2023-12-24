import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2023 Finals",

  description: "Sat, 23 Dec. 2023, 01:00 UTC — Sun, 24 Dec. 2023, 09:00 UTC",
  links: [
    {
      label: "CTFtime (International)",
      url: "https://ctftime.org/event/2159",
    },
    {
      label: "CTFtime (Domestic)",
      url: "https://ctftime.org/event/2160",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved / 12<br>(International)",
    "Solved / 12<br>(Domestic)",
    "Difficulty",
    "Writeup",
    "Keywords",
  ],
  challenges: [
    [
      "[babywaf](challenges/202312_SECCON_CTF_2023_Finals/web/babywaf)",
      "web",
      "8",
      "4",
      "?",
      "TBA",
      "???",
    ],
    [
      "[cgi-2023](challenges/202312_SECCON_CTF_2023_Finals/web/cgi-2023)",
      "web",
      "5",
      "2",
      "?",
      "TBA",
      "???",
    ],
    [
      "[LemonMD](challenges/202312_SECCON_CTF_2023_Finals/web/lemonmd)",
      "web",
      "2",
      "1",
      "?",
      "TBA",
      "???",
    ],
    [
      "[DOMLeakify](challenges/202312_SECCON_CTF_2023_Finals/web/domleakify)",
      "web",
      "1",
      "0",
      "?",
      "TBA",
      "???",
    ],
    [
      "[whitespace.js](challenges/202312_SECCON_CTF_2023_Finals/misc/whitespace-js)",
      "misc",
      "2",
      "2",
      "?",
      "TBA",
      "???",
    ],
  ],
};

export default ctf;
