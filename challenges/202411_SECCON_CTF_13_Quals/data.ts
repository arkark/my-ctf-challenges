import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 13 Quals",
  description: "Sat, 23 Nov. 2024, 05:00 UTC — Sun, 24 Nov. 2024, 05:00 UTC",
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
      "N/A",
    ],
    [
      "[self-ssrf](challenges/202411_SECCON_CTF_13_Quals/web/self-ssrf)",
      "web",
      "23",
      "★★",
      "URL parser, Bun",
      "N/A",
    ],
    [
      "[double-parser](challenges/202411_SECCON_CTF_13_Quals/web/double-parser)",
      "web",
      "17",
      "★★",
      "HTML parser, XSS",
      "N/A",
    ],
    [
      "[pp4](challenges/202411_SECCON_CTF_13_Quals/jail/pp4)",
      "jail",
      "41",
      "★",
      "JavaScript, prototype pollution",
      "N/A",
    ],
    [
      "[1linepyjail](challenges/202411_SECCON_CTF_13_Quals/jail/1linepyjail)",
      "jail",
      "15",
      "★★",
      "pyjail",
      "N/A",
    ],
    [
      "[Go to Jail](challenges/202411_SECCON_CTF_13_Quals/jail/go-to-jail)",
      "jail",
      "6",
      "★★★",
      "Go, polyglot, code golf",
      "N/A",
    ],
    [
      "[voidbox](challenges/202411_SECCON_CTF_13_Quals/jail/voidbox)",
      "jail",
      "3",
      "★★★★★",
      "JavaScript, sandbox escape",
      "[Satoooon](https://x.com/Satoooon1024)",
    ],
  ],
};

export default ctf;
