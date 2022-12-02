import { sum } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

// A rock
// B paper
// C scissors

// X rock
// Y paper
// Z scissors

// X I lose
// Y draw
// Z I win

const points: { [key: string]: number } = {
  "A X": 3 + 1,
  "A Y": 6 + 2,
  "A Z": 0 + 3,
  "B X": 0 + 1,
  "B Y": 3 + 2,
  "B Z": 6 + 3,
  "C X": 6 + 1,
  "C Y": 0 + 2,
  "C Z": 3 + 3,
};

const conversion: { [key: string]: string } = {
  "A X": "A Z",
  "A Y": "A X",
  "A Z": "A Y",
  "B X": "B X",
  "B Y": "B Y",
  "B Z": "B Z",
  "C X": "C Y",
  "C Y": "C Z",
  "C Z": "C X",
};

export const part1 = (input: string) => {
  const lines = input.split("\n");

  return sum(lines.map((round) => points[round]));
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  return sum(lines.map((round) => points[conversion[round]]));
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
