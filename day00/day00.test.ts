import { assert } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { part1 } from "./day00.ts";

Deno.test({
  name: "part 1",
  fn() {
    const answer = part1();

    assert(answer == "part1");
  },
});
