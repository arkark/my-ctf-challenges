import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 14 Quals",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2862/",
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
      "[framed-xss](challenges/202512_SECCON_CTF_14_Quals/web/framed-xss)",
      "web",
      "7",
      "★★★★",
      "-",
      "Chrome, request initiator",
    ],
    [
      "[impossible-leak](challenges/202512_SECCON_CTF_14_Quals/web/impossible-leak)",
      "web",
      "1",
      "★★★★★",
      "[link](https://blog.arkark.dev/2025/12/26/etag-length-leak)",
      "XSLeak, ETag",
    ],
    [
      "[broken-json](challenges/202512_SECCON_CTF_14_Quals/jail/broken-json)",
      "jail",
      "166",
      "★",
      "-",
      "jsjail",
    ],
    [
      "[excepython](challenges/202512_SECCON_CTF_14_Quals/jail/excepython)",
      "jail",
      "69",
      "★★",
      "-",
      "pyjail",
    ],
    [
      "[proxy-chain](challenges/202512_SECCON_CTF_14_Quals/jail/proxy-chain)",
      "jail",
      "3",
      "★★★★",
      "-",
      "jsjail, Proxy",
    ],
  ],
};

export default ctf;
