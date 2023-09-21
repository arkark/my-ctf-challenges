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
      url: "https://blog.arkark.dev/2023/09/21/seccon-quals/",
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
      "[link](https://blog.arkark.dev/2023/09/21/seccon-quals/#web-blink)",
      "DOM clobbering",
    ],
    [
      "[eeeeejs](challenges/202309_SECCON_CTF_2023_Quals/web/eeeeejs)",
      "web",
      "12",
      "★★★",
      "[link](https://blog.arkark.dev/2023/09/21/seccon-quals/#web-eeeeejs)",
      "ejs, XSS puzzle",
    ],
    [
      "[hidden-note](challenges/202309_SECCON_CTF_2023_Quals/web/hidden-note)",
      "web",
      "1",
      "★★★★★",
      "[link](https://blog.arkark.dev/2023/09/21/seccon-quals/#web-hidden-note)",
      "XS-Leak, unstable sort",
    ],
    [
      "[crabox](challenges/202309_SECCON_CTF_2023_Quals/sandbox/crabox)",
      "sandbox",
      "53",
      "★",
      "[link](https://blog.arkark.dev/2023/09/21/seccon-quals/#sandbox-crabox)",
      "Rust sandbox",
    ],
    [
      "[node-ppjail](challenges/202309_SECCON_CTF_2023_Quals/sandbox/node-ppjail)",
      "sandbox",
      "5",
      "★★★",
      "[link](https://blog.arkark.dev/2023/09/21/seccon-quals/#sandbox-node-ppjail)",
      "prototype pollution",
    ],
    [
      "[deno-ppjail](challenges/202309_SECCON_CTF_2023_Quals/sandbox/deno-ppjail)",
      "sandbox",
      "2",
      "★★★★",
      "[link](https://blog.arkark.dev/2023/09/21/seccon-quals/#sandbox-deno-ppjail)",
      "prototype pollution",
    ],
  ],
};

export default ctf;
