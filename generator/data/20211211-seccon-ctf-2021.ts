import type Ctf from "../Ctf.ts";

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
    "Repository",
    "Writeup",
    "Keywords",
  ],
  challenges: [
    [
      "Sequence as a Service 1",
      "web",
      "20",
      "★★",
      new URL(
        "https://github.com/SECCON/SECCON2021_online_CTF/tree/main/web/sequence-as-a-service-1"
      ),
      new URL(
        "https://blog.arkark.dev/2021/12/22/seccon/#Sequence-as-a-Service-1"
      ),
      "JavaScript sandbox",
    ],
    [
      "Sequence as a Service 2",
      "web",
      "19",
      "★",
      new URL(
        "https://github.com/SECCON/SECCON2021_online_CTF/tree/main/web/sequence-as-a-service-2"
      ),
      new URL(
        "https://blog.arkark.dev/2021/12/22/seccon/#Sequence-as-a-Service-2"
      ),
      "JavaScript sandbox",
    ],
    [
      "Cookie Spinner",
      "web",
      "7",
      "★★★",
      new URL(
        "https://github.com/SECCON/SECCON2021_online_CTF/tree/main/web/cookie-spinner"
      ),
      new URL("https://blog.arkark.dev/2021/12/22/seccon/#Cookie-Spinner"),
      "DOM clobbering",
    ],
    [
      "x-note",
      "web",
      "3",
      "★★★★",
      new URL(
        "https://github.com/SECCON/SECCON2021_online_CTF/tree/main/web/x-note"
      ),
      new URL("https://blog.arkark.dev/2021/12/22/seccon/#x-note"),
      "XS-Search",
    ],
  ],
};

export default ctf;
