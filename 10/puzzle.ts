export const part1 = (input: string) => {
  const programStack = input.split("\n").reverse();

  let registerX = 1;
  let cycleCounter = 1;
  let pendingInstruction: string[] | undefined = [];
  let signalSum = 0;
  let isProgramDone = false;

  while (!isProgramDone) {
    // debug
    // console.log(
    //   `=== cycle: ${cycleCounter}, regX: ${registerX}, signal: ${
    //     registerX * cycleCounter
    //   } ==`,
    // );

    if (cycleCounter === 20 || (cycleCounter - 20) % 40 === 0) {
      signalSum += cycleCounter * registerX;
    }

    // if pending instruction
    if (pendingInstruction && pendingInstruction.length > 0) {
      // pull instruction with args
      const [inst, args] = [...pendingInstruction];
      pendingInstruction = [];

      if (inst === "addx") {
        registerX += Number(args);
      }
    } else {
      // there's no pending instruction

      // get next thing from the program
      pendingInstruction = programStack.pop()?.split(" ");

      if (!pendingInstruction) {
        isProgramDone = true;
      } else if (pendingInstruction[0] === "noop") {
        pendingInstruction = [];
      }
    }

    // tick
    cycleCounter += 1;
  }

  return signalSum;
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  // start coding here

  return lines.length;
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(
    file || `${new URL(".", import.meta.url).pathname}puzzle.in`,
  );

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
