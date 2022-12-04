export const part1 = (input: string) => {
  const lines = input.split("\n");

  // start coding here
  console.log("hello");

  return lines.length;
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  // start coding here

  return lines.length;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
