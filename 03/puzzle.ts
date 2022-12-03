import { asserts, lodash } from "/deps.ts";

const isLowerCase = (letter: string) =>
  letter.toLowerCase() === letter &&
  letter !== letter.toUpperCase();

const convertToASCII = (char: string) => char.charCodeAt(0);

const getCharPriority = (char: string) =>
  convertToASCII(char) - (isLowerCase(char) ? 96 : 38);

export const part1 = (input: string) => {
  return input.split("\n").reduce((acc, rucksack) => {
    const [left, right] = [
      rucksack.slice(0, rucksack.length / 2),
      rucksack.slice(rucksack.length / 2),
    ];

    const repeatedChar = left.split("").find((char) => right.includes(char));
    asserts.assertExists(repeatedChar);

    return acc + getCharPriority(repeatedChar);
  }, 0);
};

export const part2 = (input: string) => {
  const rucksacks = input.split("\n");

  const groups: string[][] = lodash.chunk(rucksacks, 3, null);

  return groups.reduce((acc, group) => {
    const repeatedChar = group[0].split("").find((char) =>
      group[1].includes(char) && group[2].includes(char)
    );
    asserts.assertExists(repeatedChar);

    return acc + getCharPriority(repeatedChar);
  }, 0);
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
