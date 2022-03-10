#!/usr/bin/env node

import { spawn } from "child_process";
import colors from "colors";
import readline from "readline";
import { convertCommandToTargetPackageManager } from "..";
const userInput = process.argv.slice(2).join(" ").trim();

const output = convertCommandToTargetPackageManager(userInput);

if (output) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    colors.cyan(`Do you want to execute "${output}"? (Y/n) `),
    function (answer) {
      if (answer.toLowerCase().startsWith("y")) {
        const spawnedCommand = spawn(output, [], {
          stdio: "inherit",
          shell: true,
        });
        spawnedCommand.on("exit", () => {
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    }
  );

  rl.on("close", function () {
    process.exit(0);
  });
}
