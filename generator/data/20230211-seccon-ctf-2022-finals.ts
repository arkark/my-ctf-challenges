import type Ctf from "../Ctf.ts";

const ctf: Ctf = {
  name: "SECCON CTF 2022 Finals",
  links: [
    {
      label: "My writeups",
      url: "https://blog.arkark.dev/2023/02/17/seccon-finals/",
    },
    {
      label: "Repository",
      url: "TODO (It will be published by SECCON)",
    },
    {
      label: "ctftime (International)",
      url: "https://ctftime.org/event/1864",
    },
    {
      label: "ctftime (Domestic)",
      url: "https://ctftime.org/event/1863",
    },
  ],
  columns: [
    "Challenge",
    "Category",
    "Solved / 10<br>(International)",
    "Solved / 12<br>(Domestic)",
    "Difficulty",
    "Repository",
    "Writeup",
    "Keywords",
  ],
  challenges: [
    [
      "babybox",
      "web",
      "6",
      "4",
      "★",
      new URL(
        "https://github.com/arkark/seccon-ctf-2022-finals-web/tree/main/web/babybox"
      ),
      new URL(
        "https://blog.arkark.dev/2023/02/17/seccon-finals/#web-100-babybox"
      ),
      "prototype pollution",
    ],
    [
      "easylfi2",
      "web",
      "10",
      "8",
      "★",
      new URL(
        "https://github.com/arkark/seccon-ctf-2022-finals-web/tree/main/web/easylfi2"
      ),
      new URL(
        "https://blog.arkark.dev/2023/02/17/seccon-finals/#web-200-easylfi2"
      ),
      "LFI, curl",
    ],
    [
      "MaaS",
      "web",
      "3",
      "1",
      "★★★",
      new URL(
        "https://github.com/arkark/seccon-ctf-2022-finals-web/tree/main/web/maas"
      ),
      new URL("https://blog.arkark.dev/2023/02/17/seccon-finals/#web-300-MaaS"),
      "newline normalization, CSP bypass",
    ],
    [
      "light-note",
      "web",
      "0",
      "0",
      "★★★",
      new URL(
        "https://github.com/arkark/seccon-ctf-2022-finals-web/tree/main/web/light-note"
      ),
      new URL(
        "https://blog.arkark.dev/2023/02/17/seccon-finals/#web-300-light-note"
      ),
      "DOM clobbering, Sanitizer API",
    ],
    [
      "dark-note",
      "web",
      "0",
      "0",
      "★★★★",
      new URL(
        "https://github.com/arkark/seccon-ctf-2022-finals-web/tree/main/web/dark-note"
      ),
      new URL(
        "https://blog.arkark.dev/2023/02/17/seccon-finals/#web-500-dark-note"
      ),
      "time-based oracle",
    ],
  ],
};

export default ctf;
