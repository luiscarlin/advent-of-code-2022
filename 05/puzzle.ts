import { asserts } from "../deps.ts";

export const part1 = (input: string) => {
  const [crates, moves] = input.split("\n\n").map((x) => x.split("\n"));

  const stacks: { [key: number]: string[] } = {};

  crates.slice(0, -1).forEach((line) => {
    const replaced = line.replaceAll("    ", "[ ]");

    const row = replaced.match(/\[( |[A-Z])\]/g)?.map((match) => match[1]);

    row?.forEach((letter, i) => {
      if (letter !== " ") {
        stacks[i + 1]
          ? stacks[i + 1].unshift(letter)
          : stacks[i + 1] = [letter];
      }
    });
  });

  const instructions = moves.map((line) => line.match(/\d+/g));

  instructions.forEach(([quantity, from, to]) => {
    for (let i = 0; i < quantity; i++) {
      const removed = stacks[from].pop();

      asserts.assertExists(removed);
      stacks[to].push(removed);
    }
  });

  return Object.values(stacks).map((s) => s.at(-1)).join("");
};

export const part2 = (input: string) => {
  const [crates, moves] = input.split("\n\n").map((x) => x.split("\n"));

  const stacks: { [key: number]: string[] } = {};

  crates.slice(0, -1).forEach((line) => {
    const replaced = line.replaceAll("    ", "[ ]");

    const row = replaced.match(/\[( |[A-Z])\]/g)?.map((match) => match[1]);

    row?.forEach((letter, i) => {
      if (letter !== " ") {
        stacks[i + 1]
          ? stacks[i + 1].unshift(letter)
          : stacks[i + 1] = [letter];
      }
    });
  });

  const instructions = moves.map((line) => line.match(/\d+/g));

  instructions.forEach(([quantity, from, to]) => {
    const [start, end] = [
      stacks[from].slice(0, -quantity),
      stacks[from].slice(-quantity),
    ];

    stacks[from] = start;
    stacks[to].push(...end);
  });

  return Object.values(stacks).map((s) => s.at(-1)).join("");
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
