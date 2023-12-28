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
      "★",
      "[link](https://blog.arkark.dev/2023/12/28/seccon-finals/#web-babywaf)",
      "WAF bypass",
    ],
    [
      "[cgi-2023](challenges/202312_SECCON_CTF_2023_Finals/web/cgi-2023)",
      "web",
      "5",
      "2",
      "★★★",
      "[link](https://blog.arkark.dev/2023/12/28/seccon-finals/#web-cgi-2023)",
      "XS-Leak, subresource integrity",
    ],
    [
      "[LemonMD](challenges/202312_SECCON_CTF_2023_Finals/web/lemonmd)",
      "web",
      "2",
      "1",
      "★★★",
      "[link](https://blog.arkark.dev/2023/12/28/seccon-finals/#web-LemonMD)",
      "Fresh, Islands Architecture",
    ],
    [
      "[DOMLeakify](challenges/202312_SECCON_CTF_2023_Finals/web/domleakify)",
      "web",
      "1",
      "0",
      "★★★★★",
      "[link](https://blog.arkark.dev/2023/12/28/seccon-finals/#web-DOMLeakify)",
      "CSS injection on style attributes",
    ],
    [
      "[whitespace.js](challenges/202312_SECCON_CTF_2023_Finals/misc/whitespace-js)",
      "misc",
      "2",
      "2",
      "★★",
      "[link](https://blog.arkark.dev/2023/12/28/seccon-finals/#web-whitespace-js)",
      "JavaScript sandbox",
    ],
  ],
};

export default ctf;
