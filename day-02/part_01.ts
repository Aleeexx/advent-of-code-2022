import * as fs from "fs/promises";

type ElfChoice = "A" | "B" | "C";
type MyChoice = "X" | "Y" | "Z";
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
    const shape = shapeBonusMap[round.me];

    const win =
      elfChoiceMyChoiceMap[round.elf] === round.me
        ? roundBonusMap.draw
        : winningMap[round.elf] === round.me
        ? roundBonusMap.win
        : roundBonusMap.loss;

    return total + shape + win;
  }, 0);

console.log(result);
