import { assert } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { part1 } from "./puzzle.ts";

Deno.test({
  name: "part 1",
  fn() {
    const answer = part1(`199
    200
    208
    210
    200
    207
    240
    269
    260
    263`);

    assert(answer == 10);
  },
});
