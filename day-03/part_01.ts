import * as fs from "fs/promises";

const alpha = Array.from(Array(26)).map((e, i) => i + 97);
const lowerAlphabet = alpha.map((x) => String.fromCharCode(x));
const upperAlphabet = lowerAlphabet.map((char) => char.toUpperCase());

const getCommonCharacter = (first: string, second: string): string => {
  const a = new Set(first.split(""));
  const b = new Set(second.split(""));

  for (let char of a.values()) {
    if (b.has(char)) return char;
  }

  throw new Error("Unexpected: There is no common character.");
};

const data = await fs.readFile("input.txt", "utf8");

const result = data
  .trimEnd()
  .split("\n")
  .map((rucksack) => ({
    first: rucksack.slice(0, rucksack.length / 2),
    second: rucksack.slice(rucksack.length / 2),
  }))
  .map(({ first, second }) => getCommonCharacter(first, second))
  .reduce((total, commonCharacter) => {
    const lowerAlphabetIndex = lowerAlphabet.findIndex((lowerCharacter) => lowerCharacter === commonCharacter);
    const upperAlphabetIndex = upperAlphabet.findIndex((upperCharacter) => upperCharacter === commonCharacter);

    return total + (lowerAlphabetIndex > -1 ? lowerAlphabetIndex + 1 : upperAlphabetIndex + 27);
  }, 0);

console.log(result);
