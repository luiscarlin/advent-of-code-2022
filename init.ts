import yargs from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";
import { brightGreen, brightRed, copySync, difference, keys } from "./deps.ts";

interface Arguments {
  day: string;
}

const inputArgs: Arguments = yargs(Deno.args).alias("d", "day").argv;

const errorMessages: { [k: string]: string } = {
  day: "Provide the day number using --day [-d] parameter",
};

const errors: string[] = difference(keys(errorMessages), keys(inputArgs));

if (errors.length > 0) {
  errors.forEach((error) => console.log(errorMessages[error]));
  console.log(
    "Proper program usage is: deno run -A init.ts --day 01",
  );
  Deno.exit(1);
}

try {
  copySync("./00", inputArgs.day);
} catch (e) {
  console.log(e.message);
  console.log(brightRed("Exiting"));
  Deno.exit(1);
}

console.log(brightGreen("All Done"));
