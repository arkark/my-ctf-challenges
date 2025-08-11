import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "IERAE CTF 2024",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2441/",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved",
    "Difficulty",
    "writeup",
    "Keywords",
  ],
  challenges: [
    [
      "[5](challenges/202409_IERAE_CTF_2024/misc/five)",
      "misc",
      "8",
      "★",
      "-",
      "Bun",
    ],
    [
      "[Leak! Leak! Leak!](challenges/202409_IERAE_CTF_2024/web/leakleakleak)",
      "web",
      "3",
      "★★★★",
      "[link (ja)](https://gmo-cybersecurity.com/blog/ierae-ctf-2024-writeup-web/#leakleakleak)",
      "XS-Leak, CSP",
    ],
  ],
};

export default ctf;
