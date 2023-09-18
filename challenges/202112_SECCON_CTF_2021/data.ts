import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2021",
  description: "Sat, 11 Dec. 2021, 05:00 UTC — Sun, 12 Dec. 2021, 05:00 UTC",
  links: [
    {
      label: "CTFtime",
      url: "https://ctftime.org/event/1458",
    },
    {
      label: "Repository",
      url: "https://github.com/SECCON/SECCON2021_online_CTF",
    },
    {
      label: "My writeups",
      url: "https://blog.arkark.dev/2021/12/22/seccon/",
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
      "[Sequence as a Service 1](https://github.com/SECCON/SECCON2021_online_CTF/tree/main/web/sequence-as-a-service-1)",
      "web",
      "20",
      "★★",
      "[link](https://blog.arkark.dev/2021/12/22/seccon/#Sequence-as-a-Service-1)",
      "JavaScript sandbox",
    ],
    [
      "[Sequence as a Service 2](https://github.com/SECCON/SECCON2021_online_CTF/tree/main/web/sequence-as-a-service-2)",
      "web",
      "19",
      "★",
      "[link](https://blog.arkark.dev/2021/12/22/seccon/#Sequence-as-a-Service-2)",
      "JavaScript sandbox",
    ],
    [
      "[Cookie Spinner](https://github.com/SECCON/SECCON2021_online_CTF/tree/main/web/cookie-spinner)",
      "web",
      "7",
      "★★★",
      "[link](https://blog.arkark.dev/2021/12/22/seccon/#Cookie-Spinner)",
      "DOM clobbering",
    ],
    [
      "[x-note](https://github.com/SECCON/SECCON2021_online_CTF/tree/main/web/x-note)",
      "web",
      "3",
      "★★★★",
      "[link](https://blog.arkark.dev/2021/12/22/seccon/#x-note)",
      "XS-Search",
    ],
  ],
};

export default ctf;
