import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "ASIS CTF Quals 2025",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2612/",
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
      "[pure-leak](challenges/202509_ASIS_CTF_Quals_2025/web/pure-leak)",
      "web",
      "2",
      "★★★★",
      "[link](https://blog.arkark.dev/2025/09/08/asisctf-quals)",
      "quirks mode, CSS injection",
    ],
  ],
};

export default ctf;
