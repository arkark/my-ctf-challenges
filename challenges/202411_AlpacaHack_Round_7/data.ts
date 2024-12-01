import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "AlpacaHack Round 7 (Web)",

  description:
    "**An individual competition in 6 hours:**<br>Sun, 30 Nov. 2024, 03:00 UTC — Sun, 30 Nov. 2024, 09:00 UTC",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2544",
    },
    {
      label: "Website",
      url: "https://alpacahack.com/ctfs/round-7",
    },
  ],
  columns: ["Challenge", "Category", "Solved", "Writeup", "Keywords"],
  challenges: [
    [
      "[Treasure Hunt](challenges/202411_AlpacaHack_Round_7/web/treasure-hunt)",
      "web",
      "71",
      "[link (ja)](https://blog.arkark.dev/2024/12/01/alpacahack-round-7/#Treasure-Hunt)",
      "URL encoding",
    ],
    [
      "[minimal-waf](challenges/202411_AlpacaHack_Round_7/web/minimal-waf)",
      "web",
      "4",
      "[link (ja)](https://blog.arkark.dev/2024/12/01/alpacahack-round-7/#minimal-waf)",
      "XSS",
    ],
    [
      "[disconnection](challenges/202411_AlpacaHack_Round_7/web/disconnection)",
      "web",
      "5",
      "TODO",
      "browser behavior",
    ],
    [
      "[disconnection-revenge](challenges/202411_AlpacaHack_Round_7/web/disconnection-revenge)",
      "web",
      "1",
      "TODO",
      "browser behavior",
    ],
  ],
};

export default ctf;
