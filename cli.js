#!/usr/bin/env node

const { exec } = require("child_process");
const { convert } = require("./conversions/helper");
const { npm } = require("./package-managers/npm");
const { yarn } = require("./package-managers/yarn");
const userInput = process.argv.slice(2).join(" ").trim();
let command;
if (userInput.startsWith("yarn")) command = convert(userInput, npm);
else if (userInput.startsWith("npm")) command = convert(userInput, yarn);
else
  throw new Error(
    "The given command doesn't belong to yarn/npm. Please try again."
  );
console.log(`Executing "${command}"...`);
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (stderr) {
    console.log(stderr);
    return;
  }
  console.log(stdout);
});

// TODO refactor everything
