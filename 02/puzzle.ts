import { _format } from "https://deno.land/std@0.166.0/path/_util.ts";
import { sum } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const calculatePoints = (other: string, me: string) => {
  let points = 0;
  if (other === "A") {
    if (me === "X") {
      points = 3;
    }
    if (me === "Y") {
      points = 6;
    }
    if (me === "Z") {
      points = 0;
    }
  }
  if (other === "B") {
    if (me === "X") {
      points = 0;
    }
    if (me === "Y") {
      points = 3;
    }
    if (me === "Z") {
      points = 6;
    }
  }

  if (other === "C") {
    if (me === "X") {
      points = 6;
    }
    if (me === "Y") {
      points = 0;
    }
    if (me === "Z") {
      points = 3;
    }
  }

  points += me === "X" ? 1 : me === "Y" ? 2 : 3;

  return points;
};

export const part1 = (input: string) => {
  const lines = input.split("\n");

  // A rock
  // B paper
  // C scissors

  // X rock
  // Y paper
  // Z scissors

  const allPoints = [];
  for (const round of lines) {
    const [other, me] = round.split(" ");

    allPoints.push(calculatePoints(other, me));
  }

  return sum(allPoints);
};

export const part2 = (input: string) => {
  const lines = input.split("\n");

  // A rock
  // B paper
  // C scissors

  // X I lose
  // Y draw
  // Z I win

  // X rock
  // Y paper
  // Z scissors

  const allPoints = [];
  for (const round of lines) {
    const [other, result] = round.split(" ");

    let me = "";
    if (other === "A") {
      if (result === "X") {
        me = "Z";
      }

      if (result === "Y") {
        me = "X";
      }

      if (result === "Z") {
        me = "Y";
      }
    }

    if (other === "B") {
      if (result === "X") {
        me = "X";
      }

      if (result === "Y") {
        me = "Y";
      }

      if (result === "Z") {
        me = "Z";
      }
    }

    if (other === "C") {
      if (result === "X") {
        me = "Y";
      }

      if (result === "Y") {
        me = "Z";
      }

      if (result === "Z") {
        me = "X";
      }
    }

    allPoints.push(calculatePoints(other, me));
  }
  return sum(allPoints);
};

export const main = () => {
  const [file] = Deno.args;

  const input = Deno.readTextFileSync(file);

  console.log("part1", part1(input));
  console.log("part2", part2(input));
};

import.meta.main && main();
