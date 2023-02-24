import * as fs from "fs/promises";

const data = await fs.readFile("input.txt", "utf8");

const processed = data
  .trimEnd()
  .split("\n\n")
  .map((elf) => elf.split("\n"))
  .map((elf) => elf.reduce((acc, curr) => acc + parseInt(curr), 0))
  .sort((a, b) => b - a);

console.log(processed[0] + processed[1] + processed[2]);
