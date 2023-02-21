import type Ctf from "../Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2022 Quals",
  links: [
    {
      label: "My writeups",
      url: "https://blog.arkark.dev/2022/11/18/seccon-en/",
    },
    {
      label: "Repository",
      url: "https://github.com/SECCON/SECCON2022_online_CTF",
    },
    {
      label: "ctftime",
      url: "https://ctftime.org/event/1764",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved",
    "Difficulty",
    "Repository",
    "Writeup",
    "Keywords",
  ],
  challenges: [
    [
      "skipinx",
      "web",
      "102",
      "★",
      new URL(
        "https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/skipinx"
      ),
      new URL("https://blog.arkark.dev/2022/11/18/seccon-ja/#web-skipinx"),
      "query parser",
    ],
    [
      "easylfi",
      "web",
      "62",
      "★",
      new URL(
        "https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/easylfi"
      ),
      new URL("https://blog.arkark.dev/2022/11/18/seccon-ja/#web-easylfi"),
      "LFI, curl",
    ],
    [
      "bffcalc",
      "web",
      "41",
      "★★",
      new URL(
        "https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/bffcalc"
      ),
      new URL("https://blog.arkark.dev/2022/11/18/seccon-ja/#web-bffcalc"),
      "HTTP request splitting",
    ],
    [
      "piyosay",
      "web",
      "19",
      "★★★",
      new URL(
        "https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/piyosay"
      ),
      new URL("https://blog.arkark.dev/2022/11/18/seccon-ja/#web-piyosay"),
      "Trusted Types, DOMPurify, RegExp",
    ],
    [
      "denobox",
      "web",
      "1",
      "★★★★",
      new URL(
        "https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/denobox"
      ),
      new URL("https://blog.arkark.dev/2022/11/18/seccon-ja/#web-denobox"),
      "prototype pollution, import maps	",
    ],
    [
      "spanote",
      "web",
      "1",
      "★★★★★",
      new URL(
        "https://github.com/SECCON/SECCON2022_online_CTF/tree/main/web/spanote"
      ),
      new URL("https://blog.arkark.dev/2022/11/18/seccon-ja/#web-spanote"),
      "Chrome, disk cache, bfcache",
    ],
    [
      "latexipy",
      "misc",
      "8",
      "★",
      new URL(
        "https://github.com/SECCON/SECCON2022_online_CTF/tree/main/misc/latexipy"
      ),
      new URL("https://blog.arkark.dev/2022/11/18/seccon-ja/#misc-latexipy"),
      "pyjail, magic comment",
    ],
    [
      "txtchecker",
      "misc",
      "23",
      "★★",
      new URL(
        "https://github.com/SECCON/SECCON2022_online_CTF/tree/main/misc/txtchecker"
      ),
      new URL("https://blog.arkark.dev/2022/11/18/seccon-ja/#misc-txtchecker"),
      "magic file, ReDoS",
    ],
    [
      "noiseccon",
      "misc",
      "22",
      "★★",
      new URL(
        "https://github.com/SECCON/SECCON2022_online_CTF/tree/main/misc/noiseccon"
      ),
      new URL("https://blog.arkark.dev/2022/11/18/seccon-ja/#misc-noiseccon"),
      "Perlin noise",
    ],
  ],
};

export default ctf;
