#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const colors_1 = __importDefault(require("colors"));
const readline_1 = __importDefault(require("readline"));
const __1 = require("..");
const userInput = process.argv.slice(2).join(" ").trim();
const output = (0, __1.convertCommandToTargetPackageManager)(userInput);
if (output) {
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question(colors_1.default.cyan(`Do you want to execute "${output}"? (Y/n) `), function (answer) {
        if (answer.toLowerCase().startsWith("y")) {
            const spawnedCommand = (0, child_process_1.spawn)(output, [], {
                stdio: "inherit",
                shell: true,
            });
            spawnedCommand.on("exit", () => {
                process.exit(0);
            });
        }
        else {
            process.exit(0);
        }
    });
    rl.on("close", function () {
        process.exit(0);
    });
}
