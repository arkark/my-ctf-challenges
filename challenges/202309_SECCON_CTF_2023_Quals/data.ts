import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2023 Quals",
  description: "Sat, 16 Sept. 2023, 05:00 UTC — Sun, 17 Sept. 2023, 05:00 UTC",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2003/",
    },
    {
      label: "Repository",
    },
    {
      label: "My writeups",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved",
    "Difficulty",
    "Writeup",
    "Keywords",
  ],
  challenges: [
    [
      "[blink](challenges/202309_SECCON_CTF_2023_Quals/web/blink)",
      "web",
      "14",
      "★★",
      "TBD",
      "DOM clobbering",
    ],
    [
      "[eeeeejs](challenges/202309_SECCON_CTF_2023_Quals/web/eeeeejs)",
      "web",
      "12",
      "★★★",
      "TBD",
      "ejs, XSS puzzle",
    ],
    [
      "[hidden-note](challenges/202309_SECCON_CTF_2023_Quals/web/hidden-note)",
      "web",
      "1",
      "★★★★★",
      "TBD",
      "XS-Leak, unstable sort",
    ],
    [
      "[crabox](challenges/202309_SECCON_CTF_2023_Quals/sandbox/crabox)",
      "sandbox",
      "53",
      "★",
      "TBD",
      "Rust sandbox",
    ],
    [
      "[node-ppjail](challenges/202309_SECCON_CTF_2023_Quals/sandbox/node-ppjail)",
      "sandbox",
      "5",
      "★★★",
      "TBD",
      "prototype pollution",
    ],
    [
      "[deno-ppjail](challenges/202309_SECCON_CTF_2023_Quals/sandbox/deno-ppjail)",
      "sandbox",
      "2",
      "★★★★",
      "TBD",
      "prototype pollution",
    ],
  ],
};

export default ctf;
