import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "IERAE CTF 2025",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2655/",
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
      "[Warmdown](challenges/202506_IERAE_CTF_2025/web/warmdown)",
      "web",
      "135",
      "★",
      "[link (ja)](https://gmo-cybersecurity.com/blog/ierae-ctf-2025-writeup-web/#warmdown)",
      "XSS",
    ],
    [
      "[canvasbox](challenges/202506_IERAE_CTF_2025/web/canvasbox)",
      "web",
      "16",
      "★★★",
      "[link (ja)](https://gmo-cybersecurity.com/blog/ierae-ctf-2025-writeup-web/#canvasbox)",
      "DOM, sandbox",
    ],
  ],
};

export default ctf;
