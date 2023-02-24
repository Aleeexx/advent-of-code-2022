import * as fs from "fs/promises";

type ElfChoice = "A" | "B" | "C";
const myPossibleChoices = ["X", "Y", "Z"] as const;
type MyChoice = typeof myPossibleChoices[number];
type GameResults = "win" | "draw" | "loss";

const winningMap: { [elf in ElfChoice]: MyChoice } = {
  // Elf is playing rock (A), I would win with paper (Y)
  A: "Y",
  // Elf is playing paper (B), I would win with scissors (Z)
  B: "Z",
  // Elf is playing scissors (C), I would win with rock (X)
  C: "X",
};

const elfChoiceMyChoiceMap: { [elf in ElfChoice]: MyChoice } = {
  // Rock
  A: "X",
  // Paper
  B: "Y",
  // Scissors
  C: "Z",
};

const shapeBonusMap: { [elf in MyChoice]: number } = {
  // Rock
  X: 1,
  // Paper
  Y: 2,
  // Scissors
  Z: 3,
};

const roundBonusMap: { [elf in GameResults]: number } = {
  win: 6,
  draw: 3,
  loss: 0,
};

const data = await fs.readFile("input.txt", "utf8");

const result = data
  .trimEnd()
  .split("\n")
  .map((round) => {
    const [elf, me] = round.split(" ");
    return { elf: elf as ElfChoice, me: me as MyChoice };
  })
  .reduce((total, round) => {
    const currentPossibleChoices: { [gameResult in Exclude<GameResults, "loss">]: MyChoice } = {
      win: winningMap[round.elf],
      draw: elfChoiceMyChoiceMap[round.elf],
    };

    const myChoiceBonus =
      round.me === "Z"
        ? // I should win
          roundBonusMap.win + shapeBonusMap[currentPossibleChoices.win]
        : round.me === "Y"
        ? // Should be a draw
          roundBonusMap.draw + shapeBonusMap[currentPossibleChoices.draw]
        : // Elf should win
          roundBonusMap.loss +
          shapeBonusMap[
            myPossibleChoices.find(
              (possibleChoice) => !Object.values(currentPossibleChoices).includes(possibleChoice)
            ) as MyChoice
          ];

    return total + myChoiceBonus;
  }, 0);

console.log(result);
