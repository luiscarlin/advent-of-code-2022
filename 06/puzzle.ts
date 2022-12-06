const getStartOfPacket = (input: string, messageLength: number) => {
  const text = input.split("");

  let startOfPacket = 0;

  for (const i of [...Array(text.length).keys()]) {
    const subList = text.slice(i, messageLength + i);

    if (subList.length !== messageLength) {
      break;
    }

    if (new Set(subList).size === messageLength) {
      startOfPacket = i + messageLength;
      break;
    }
  }

  return startOfPacket;
};
export const part1 = (input: string) => getStartOfPacket(input, 4);

export const part2 = (input: string) => getStartOfPacket(input, 14);

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(
    file || `${new URL(".", import.meta.url).pathname}puzzle.in`,
  );

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
