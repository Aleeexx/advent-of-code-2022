import * as fs from "fs/promises";

const data = await fs.readFile("input.txt", "utf8");
const processed = data.trimEnd().split("");

const neededAmountOfCharacters = 14;
const lastCharacters: string[] = [];
let markerIndex = -1;

for (let index = 0; index < processed.length; index++) {
  const currentCharacter = processed[index];
  markerIndex = index + 1;

  // We only want to check the last 4 characters. If we already temporarily saved 4 characters, remove the oldest character
  if (lastCharacters.length === neededAmountOfCharacters) {
    lastCharacters.shift();
  }

  // Add the current character to check, if we reached the marker in the next step
  lastCharacters.push(currentCharacter);

  // If the lastCharacters array contains 4 unique characters, we found the marker
  if (markerIndex >= 4 && new Set(lastCharacters).size === neededAmountOfCharacters) {
    break;
  }
}

console.log(markerIndex);
