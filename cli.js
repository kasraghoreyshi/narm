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

const commandProcess = exec(command);

commandProcess.stdout.on("data", function (data) {
  console.log(data);
});

// TODO refactor everything
