import { assert } from "/deps.ts";
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
