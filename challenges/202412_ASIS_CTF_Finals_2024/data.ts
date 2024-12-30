import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "ASIS CTF Finals 2024",
  description: "Sat, 28 Dec. 2024, 14:00 UTC — Sun, 29 Dec. 2024, 14:00 UTC",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2403/",
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
      "[fetch-box](challenges/202412_ASIS_CTF_Finals_2024/web/fetch-box)",
      "web, misc",
      "19",
      "★★",
      "[link](https://blog.arkark.dev/2024/12/29/asisctf-finals/#web-misc-fetch-box)",
      "fetch, sandbox",
    ],
    [
      "[fire-leak](challenges/202412_ASIS_CTF_Finals_2024/web/fire-leak)",
      "web",
      "1",
      "★★★★",
      "[link](https://blog.arkark.dev/2024/12/29/asisctf-finals/#web-fire-leak)",
      "XSLeak, ReDoS",
    ],
  ],
};

export default ctf;
