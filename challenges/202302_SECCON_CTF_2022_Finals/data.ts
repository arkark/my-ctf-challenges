import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2022 Finals",
  links: [
    {
      label: "CTFtime (International)",
      url: "https://ctftime.org/event/1864",
    },
    {
      label: "CTFtime (Domestic)",
      url: "https://ctftime.org/event/1863",
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
      "[babybox](challenges/202302_SECCON_CTF_2022_Finals/web/babybox)",
      "web",
      "6",
      "4",
      "★",
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-100-babybox)",
      "prototype pollution",
    ],
    [
      "[easylfi2](challenges/202302_SECCON_CTF_2022_Finals/web/easylfi2)",
      "web",
      "10",
      "8",
      "★",
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-200-easylfi2)",
      "LFI, curl",
    ],
    [
      "[MaaS](challenges/202302_SECCON_CTF_2022_Finals/web/maas)",
      "web",
      "3",
      "1",
      "★★★",
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-300-maas)",
      "newline normalization, CSP bypass",
    ],
    [
      "[light-note](challenges/202302_SECCON_CTF_2022_Finals/web/light-note)",
      "web",
      "0",
      "0",
      "★★★",
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-300-light-note)",
      "DOM clobbering, Sanitizer API",
    ],
    [
      "[dark-note](challenges/202302_SECCON_CTF_2022_Finals/web/dark-note)",
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
