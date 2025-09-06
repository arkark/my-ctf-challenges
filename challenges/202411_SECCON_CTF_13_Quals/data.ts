import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 13 Quals",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2478/",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved",
    "Difficulty",
    "Keywords",
    "Co-Author",
  ],
  challenges: [
    [
      "[Trillion Bank](challenges/202411_SECCON_CTF_13_Quals/web/trillion-bank)",
      "web",
      "84",
      "★",
      "MySQL",
      "",
    ],
    [
      "[self-ssrf](challenges/202411_SECCON_CTF_13_Quals/web/self-ssrf)",
      "web",
      "23",
      "★★",
      "URL parser, Bun",
      "",
    ],
    [
      "[double-parser](challenges/202411_SECCON_CTF_13_Quals/web/double-parser)",
      "web",
      "17",
      "★★",
      "HTML parser, XSS",
      "",
    ],
    [
      "[pp4](challenges/202411_SECCON_CTF_13_Quals/jail/pp4)",
      "jail",
      "41",
      "★",
      "jsf**k, prototype pollution",
      "",
    ],
    [
      "[1linepyjail](challenges/202411_SECCON_CTF_13_Quals/jail/1linepyjail)",
      "jail",
      "15",
      "★★",
      "pyjail",
      "",
    ],
    [
      "[Go to Jail](challenges/202411_SECCON_CTF_13_Quals/jail/go-to-jail)",
      "jail",
      "6",
      "★★★",
      "Go, polyglot, code golf",
      "",
    ],
    [
      "[voidbox](challenges/202411_SECCON_CTF_13_Quals/jail/voidbox)",
      "jail",
      "3",
      "★★★★",
      "JavaScript, sandbox escape",
      "[Satoooon](https://x.com/Satoooon1024)",
    ],
  ],
};

export default ctf;
