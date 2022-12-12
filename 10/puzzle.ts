const enc = (s: string) => new TextEncoder().encode(s);

const write = async (s: string) => await Deno.stdout.write(enc(s));

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

export const part2 = async (input: string) => {
  const programStack = input.split("\n").reverse();

  let registerX = 1;
  let cycleCounter = 1;
  let pendingInstruction: string[] | undefined = [];
  let signalSum = 0;
  let isProgramDone = false;

  const printCRT = async () => {
    const pixelPosition = (cycleCounter - 1) % 40;
    let char = ".";

    if ([registerX - 1, registerX, registerX + 1].includes(pixelPosition)) {
      char = "#";
    }

    if (pixelPosition === 39) {
      char += "\n";
    }

    await write(char);
  };

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
    await printCRT();

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

export const main = async () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(
    file || `${new URL(".", import.meta.url).pathname}puzzle.in`,
  );

  console.log("part1", part1(input));
  console.log("part2", await part2(input));
};

import.meta.main && await main();
