import type Ctf from "@/generator/Ctf.ts";

const ctf: Ctf = {
  name: "IERAE DAYS CTF v0.1",

  description: "**An onsite local event:**<br>Thu, 7 Dec. 2023",
  links: [
    {
      label: "Repository",
      url: "https://github.com/gmo-ierae/ierae-days-ctf-2023",
    },
  ],
  columns: ["Challenge", "Category", "Writeup", "Keywords"],
  challenges: [
    [
      "[simple-proxy](challenges/202312_IERAE_DAYS_CTF_2023/web/simple-proxy)",
      "web",
      "TODO",
      "request target",
    ],
  ],
};

export default ctf;
