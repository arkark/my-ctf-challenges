import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "AlpacaHack Round 2 (Web)",

  description: "An individual competition in 6 hours.",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/2465",
    },
    {
      label: "Website",
      url: "https://alpacahack.com/ctfs/round-2",
    },
  ],
  columns: ["Challenge", "Category", "Solved", "Writeup", "Keywords"],
  challenges: [
    [
      "[Simple Login](challenges/202409_AlpacaHack_Round_2/web/simple-login)",
      "web",
      "84",
      "[link (ja)](https://blog.arkark.dev/2024/09/04/alpacahack-round-2/#simple-login)",
      "SQL injection",
    ],
    [
      "[Pico Note 1](challenges/202409_AlpacaHack_Round_2/web/pico-note-1)",
      "web",
      "10",
      "[link (ja)](https://blog.arkark.dev/2024/09/04/alpacahack-round-2/#pico-note-1)",
      "CSP bypass, JavaScript",
    ],
    [
      "[CaaS](challenges/202409_AlpacaHack_Round_2/web/caas)",
      "web",
      "13",
      "[link (ja)](https://blog.arkark.dev/2024/09/04/alpacahack-round-2/#caas)",
      "RCE, Perl",
    ],
    [
      "[Pico Note 2](challenges/202409_AlpacaHack_Round_2/web/pico-note-2)",
      "web",
      "3",
      "[link (ja)](https://blog.arkark.dev/2024/09/04/alpacahack-round-2/#pico-note-2)",
      "Import Maps",
    ],
  ],
};

export default ctf;
