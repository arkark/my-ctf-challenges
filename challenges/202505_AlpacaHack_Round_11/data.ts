import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "AlpacaHack Round 11 (Web)",
  description: "An individual competition in 6 hours.",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2710",
    },
    {
      label: "Website",
      url: "https://alpacahack.com/ctfs/round-11",
    },
  ],
  columns: ["Challenge", "Category", "Solved", "Writeup", "Keywords"],
  challenges: [
    [
      "[Jackpot](challenges/202505_AlpacaHack_Round_11/web/jackpot)",
      "web",
      "63",
      "TODO",
      "Python, Unicode",
    ],
    [
      "[Redirector](challenges/202505_AlpacaHack_Round_11/web/redirector)",
      "web",
      "6",
      "TODO",
      "XSS, JavaScript",
    ],
    [
      "[Tiny Note](challenges/202505_AlpacaHack_Round_11/web/tiny-note)",
      "web",
      "4",
      "TODO",
      "pickle",
    ],
    [
      "[AlpacaMark](challenges/202505_AlpacaHack_Round_11/web/alpaca-mark)",
      "web",
      "3",
      "TODO",
      "DOM Clobbering, PP, iframe",
    ],
    [
      "[AlpacaMark Revenge](challenges/202505_AlpacaHack_Round_11/web/alpaca-mark-revenge)",
      "web",
      "(Published after the CTF)",
      "TODO",
      "DOM Clobbering, PP, iframe",
    ],
  ],
};

export default ctf;
