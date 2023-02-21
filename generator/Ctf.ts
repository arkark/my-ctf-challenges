export default interface Ctf {
  name: string;
  description?: string;
  links: {
    label: string;
    url: string;
  }[];
  columns: string[];
  challenges: (string | URL)[][];
}
