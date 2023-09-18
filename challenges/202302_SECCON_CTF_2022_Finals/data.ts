import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2022 Finals",
  description: "Sat, 11 Feb. 2023, 01:00 UTC — Sun, 12 Feb. 2023, 09:00 UTC",
  links: [
    {
      label: "CTFtime (International)",
      url: "https://ctftime.org/event/1864",
    },
    {
      label: "CTFtime (Domestic)",
      url: "https://ctftime.org/event/1863",
    },
    {
      label: "Repository",
      url: "https://github.com/SECCON/SECCON2022_final_CTF",
    },
    {
      label: "My writeups",
      url: "https://blog.arkark.dev/2023/02/17/seccon-finals/",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved / 10<br>(International)",
    "Solved / 12<br>(Domestic)",
    "Difficulty",
    "Writeup",
    "Keywords",
  ],
  challenges: [
    [
      "[babybox](https://github.com/SECCON/SECCON2022_final_CTF/tree/main/jeopardy/web/babybox)",
      "web",
      "6",
      "4",
      "★",
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-100-babybox)",
      "prototype pollution",
    ],
    [
      "[easylfi2](https://github.com/SECCON/SECCON2022_final_CTF/tree/main/jeopardy/web/easylfi2)",
      "web",
      "10",
      "8",
      "★",
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-200-easylfi2)",
      "LFI, curl",
    ],
    [
      "[MaaS](https://github.com/SECCON/SECCON2022_final_CTF/tree/main/jeopardy/web/maas)",
      "web",
      "3",
      "1",
      "★★★",
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-300-MaaS)",
      "newline normalization, CSP bypass",
    ],
    [
      "[light-note](https://github.com/SECCON/SECCON2022_final_CTF/tree/main/jeopardy/web/light-note)",
      "web",
      "0",
      "0",
      "★★★",
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-300-light-note)",
      "DOM clobbering, Sanitizer API",
    ],
    [
      "[dark-note](https://github.com/SECCON/SECCON2022_final_CTF/tree/main/jeopardy/web/dark-note)",
      "web",
      "0",
      "0",
      "★★★★",
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-500-dark-note)",
      "time-based oracle",
    ],
  ],
};

export default ctf;
