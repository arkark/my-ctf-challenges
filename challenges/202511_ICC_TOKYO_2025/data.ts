import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "ICC TOKYO 2025",
  links: [
    {
      label: "Website",
      url: "https://icctokyo2025.nisc.go.jp/",
    },
    {
      label: "Official Repository",
      url: "https://github.com/ctfplatform/icc-2025-jeopardy-problems",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved / 8",
    "Difficulty",
    "Writeup",
    "Keywords",
  ],
  challenges: [
    [
      "[XSP-Leak](challenges/202511_ICC_TOKYO_2025/web/xsp-leak)",
      "web",
      "4",
      "★★★",
      "[link](challenges/202511_ICC_TOKYO_2025/web/xsp-leak/solution/README.md)",
      "XSLeak",
    ],
  ],
};

export default ctf;
