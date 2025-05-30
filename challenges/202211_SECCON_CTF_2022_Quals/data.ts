import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2022 Quals",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/1764",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved / 726",
    "Difficulty",
    "Writeup",
    "Keywords",
  ],
  challenges: [
    [
      "[skipinx](challenges/202211_SECCON_CTF_2022_Quals/web/skipinx)",
      "web",
      "102",
      "★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-skipinx)",
      "query parser",
    ],
    [
      "[easylfi](challenges/202211_SECCON_CTF_2022_Quals/web/easylfi)",
      "web",
      "62",
      "★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-easylfi)",
      "LFI, curl",
    ],
    [
      "[bffcalc](challenges/202211_SECCON_CTF_2022_Quals/web/bffcalc)",
      "web",
      "41",
      "★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-bffcalc)",
      "HTTP request splitting",
    ],
    [
      "[piyosay](challenges/202211_SECCON_CTF_2022_Quals/web/piyosay)",
      "web",
      "19",
      "★★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-piyosay)",
      "Trusted Types, DOMPurify, RegExp",
    ],
    [
      "[denobox](challenges/202211_SECCON_CTF_2022_Quals/web/denobox)",
      "web",
      "1",
      "★★★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-denobox)",
      "prototype pollution, import maps	",
    ],
    [
      "[spanote](challenges/202211_SECCON_CTF_2022_Quals/web/spanote)",
      "web",
      "1",
      "★★★★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-spanote)",
      "Chrome, disk cache, bfcache",
    ],
    [
      "[latexipy](challenges/202211_SECCON_CTF_2022_Quals/misc/latexipy)",
      "misc",
      "8",
      "★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#misc-latexipy)",
      "pyjail, magic comment",
    ],
    [
      "[txtchecker](challenges/202211_SECCON_CTF_2022_Quals/misc/txtchecker)",
      "misc",
      "23",
      "★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#misc-txtchecker)",
      "magic file, ReDoS",
    ],
    [
      "[noiseccon](challenges/202211_SECCON_CTF_2022_Quals/misc/noiseccon)",
      "misc",
      "22",
      "★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#misc-noiseccon)",
      "Perlin noise",
    ],
  ],
};

export default ctf;
