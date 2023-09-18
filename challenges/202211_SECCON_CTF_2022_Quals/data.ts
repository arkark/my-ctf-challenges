import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2022 Quals",
  description: "Sat, 12 Nov. 2022, 05:00 UTC — Sun, 13 Nov. 2022, 05:00 UTC",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/1764",
    },
    {
      label: "Repository",
      url: "https://github.com/SECCON/SECCON2022_online_CTF",
    },
    {
      label: "My writeups",
      url: "https://blog.arkark.dev/2022/11/18/seccon-en/",
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
      "[skipinx](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/skipinx)",
      "web",
      "102",
      "★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-skipinx)",
      "query parser",
    ],
    [
      "[easylfi](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/easylfi)",
      "web",
      "62",
      "★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-easylfi)",
      "LFI, curl",
    ],
    [
      "[bffcalc](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/bffcalc)",
      "web",
      "41",
      "★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-bffcalc)",
      "HTTP request splitting",
    ],
    [
      "[piyosay](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/piyosay)",
      "web",
      "19",
      "★★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-piyosay)",
      "Trusted Types, DOMPurify, RegExp",
    ],
    [
      "[denobox](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/denobox)",
      "web",
      "1",
      "★★★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-denobox)",
      "prototype pollution, import maps	",
    ],
    [
      "[spanote](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/spanote)",
      "web",
      "1",
      "★★★★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#web-spanote)",
      "Chrome, disk cache, bfcache",
    ],
    [
      "[latexipy](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/misc/latexipy)",
      "misc",
      "8",
      "★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#misc-latexipy)",
      "pyjail, magic comment",
    ],
    [
      "[txtchecker](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/misc/txtchecker)",
      "misc",
      "23",
      "★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#misc-txtchecker)",
      "magic file, ReDoS",
    ],
    [
      "[noiseccon](https://github.com/SECCON/SECCON2022_online_CTF/tree/main/misc/noiseccon)",
      "misc",
      "22",
      "★★",
      "[link](https://blog.arkark.dev/2022/11/18/seccon-en/#misc-noiseccon)",
      "Perlin noise",
    ],
  ],
};

export default ctf;
