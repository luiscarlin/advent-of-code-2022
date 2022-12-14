const getStartOfPacket = (input: string, messageLength: number) => {
  const text = input.split("");

  let startOfPacket = 0;

  for (let i = 0; i < text.length; i++) {
    const slidingWindow = text.slice(i, messageLength + i);

    if (slidingWindow.length !== messageLength) {
      break;
    }

    if (new Set(slidingWindow).size === messageLength) {
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
