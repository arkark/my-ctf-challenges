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
      "[link](https://blog.arkark.dev/2023/02/17/seccon-finals/#web-300-MaaS)",
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
