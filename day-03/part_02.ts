import * as fs from "fs/promises";

const alpha = Array.from(Array(26)).map((e, i) => i + 97);
const lowerAlphabet = alpha.map((x) => String.fromCharCode(x));
const upperAlphabet = lowerAlphabet.map((char) => char.toUpperCase());

const getCommonCharacter = (first: string, second: string, third: string): string => {
  const a = new Set(first.split(""));
  const b = new Set(second.split(""));
  const c = new Set(third.split(""));

  for (let char of a.values()) {
    if (b.has(char) && c.has(char)) return char;
  }

  throw new Error("Unexpected: There is no common character.");
};

function arrayToChunks(array: string[], chunkSize = 3) {
  const result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

const data = await fs.readFile("input.txt", "utf8");

const result = arrayToChunks(data.trimEnd().split("\n"))
  .map((group) => getCommonCharacter(group[0], group[1], group[2]))
  .reduce((total, commonCharacter) => {
    const lowerAlphabetIndex = lowerAlphabet.findIndex((lowerCharacter) => lowerCharacter === commonCharacter);
    const upperAlphabetIndex = upperAlphabet.findIndex((upperCharacter) => upperCharacter === commonCharacter);

    return total + (lowerAlphabetIndex > -1 ? lowerAlphabetIndex + 1 : upperAlphabetIndex + 27);
  }, 0);

console.log(result);
