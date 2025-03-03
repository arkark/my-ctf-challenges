import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2021",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/1458",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved / 506",
    "Difficulty",
    "Writeup",
    "Keywords",
  ],
  challenges: [
    [
      "[Sequence as a Service 1](challenges/202112_SECCON_CTF_2021/web/sequence-as-a-service-1)",
      "web",
      "20",
      "★★",
      "[link](https://blog.arkark.dev/2021/12/22/seccon/#Sequence-as-a-Service-1)",
      "JavaScript sandbox",
    ],
    [
      "[Sequence as a Service 2](challenges/202112_SECCON_CTF_2021/web/sequence-as-a-service-2)",
      "web",
      "19",
      "★",
      "[link](https://blog.arkark.dev/2021/12/22/seccon/#Sequence-as-a-Service-2)",
      "JavaScript sandbox",
    ],
    [
      "[Cookie Spinner](challenges/202112_SECCON_CTF_2021/web/cookie-spinner)",
      "web",
      "7",
      "★★★",
      "[link](https://blog.arkark.dev/2021/12/22/seccon/#Cookie-Spinner)",
      "DOM clobbering",
    ],
    [
      "[x-note](challenges/202112_SECCON_CTF_2021/web/x-note)",
      "web",
      "3",
      "★★★★",
      "[link](https://blog.arkark.dev/2021/12/22/seccon/#x-note)",
      "XS-Search",
    ],
  ],
};

export default ctf;
