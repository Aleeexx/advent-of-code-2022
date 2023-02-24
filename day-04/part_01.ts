import * as fs from "fs/promises";

const data = await fs.readFile("input.txt", "utf8");

const processed = data
  .trimEnd()
  .split("\n")
  .map((pair) => pair.split(","))
  .map((pair) =>
    pair.map((range) => {
      const [start, end] = range.split("-");
      return { start: parseInt(start), end: parseInt(end) };
    })
  )
  .filter(
    ([first, second]) =>
      // First contains second
      (first.start <= second.start && first.end >= second.end) ||
      // Second contains first
      (second.start <= first.start && second.end >= first.end)
  );

console.log(processed.length);
