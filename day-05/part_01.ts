import * as fs from "fs/promises";

const extractInstruction = (instruction: string) => {
  const [amount, from, to] = instruction.match(/[\d\.]+/g)!.map((value) => parseInt(value));
  return { amount, from, to };
};

const data = await fs.readFile("input.txt", "utf8");
const processed = data.trimEnd().split("\n");

// Get stacks status without enumeration
const stacksString = processed.slice(0, 8);
// Get instruction strings
const instructionsString = processed.slice(10);

// Get amount of crates by parsing, as the stacks string is enumerated
const amountOfCrates = parseInt(
  processed
    .slice(8, 9)[0]
    .split(" ")
    .filter((x) => !!x)
    .sort((a, b) => parseInt(b) - parseInt(a))[0]
);

// Fill stacks with crates according to current stacks status
const stacks: any[][] = new Array(amountOfCrates);
stacksString.reverse().map((row) => {
  for (let index = 0; index < row.length; index += 4) {
    const crate = row.slice(index, index + 4).match(/(?<=\[).*(?=\])+/g)?.[0];

    if (crate) {
      const currentStack = index / 4;
      if (!stacks[currentStack]) stacks[currentStack] = [crate];
      else stacks[currentStack].push(crate);
    }
  }
});

// Move crates following the instructions (crate after crate)
const instructions = instructionsString.map((instruction) => extractInstruction(instruction));
for (const { amount, from, to } of instructions) {
  for (let index = 0; index < amount; index++) {
    const element = stacks[from - 1].pop();
    stacks[to - 1].push(element);
  }
}

console.log(stacks.map((crate) => crate.pop()).join(""));
