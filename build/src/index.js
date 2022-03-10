"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCommandToTargetPackageManager = void 0;
const colors_1 = __importDefault(require("colors"));
const conversions_1 = require("./lib/conversions");
const package_manager_1 = require("./types/package-manager");
const replace_flags_1 = require("./utils/replace-flags");
const reserved_words_1 = require("./utils/reserved-words");
const single_element_array_1 = require("./utils/single-element-array");
const target_package_manager_1 = require("./utils/target-package-manager");
const convertCommandToTargetPackageManager = (inputCommand, inputTargetPackageManager) => {
    const splittedCommand = inputCommand.split(" ");
    // First part of the command is always the package manager name so we could get
    // Our package manager from it.
    const packageManager = splittedCommand[0];
    // Invalid if package managers object doesn't include the package manager
    // Extracted from the first part of the command.
    if (!Object.keys(package_manager_1.packageManagers).includes(packageManager))
        return console.log(colors_1.default.red(`Package manager "${packageManager}" not found.`));
    // Package manager that narm will convert to.
    const targetPackageManager = inputTargetPackageManager || (0, target_package_manager_1.getTargetPackageManager)(packageManager);
    // Replaces all the flags to the target package manager flag equivalent.
    // If the flag has no equivalent, it will be replaced with null.
    (0, replace_flags_1.replaceFlags)(splittedCommand, packageManager, targetPackageManager);
    // To distinguish between package names in the command and actual parts of the command,
    // This function helps us retrieve words like "npm" and "install" so we could later distinguish
    // Package names.
    const reservedWords = (0, reserved_words_1.getReservedWords)(packageManager);
    // Gets package names from the command. For example in ["npm", "install", "react"]
    // Both "npm" and "install" are reserved so
    // "react" is the name of the package.
    //? Needs to be an array because "npm install react tailwind express" is also a valid command.
    const packageNames = splittedCommand.filter((str) => !reservedWords.includes(str));
    // In this step we remove all the non-reserved words from the command
    // And store it into a new variable. We convert it into a set
    // Because as mentioned in the last step, "npm install react tailwind" is a valid
    // Command so we don't want to end up with "npm install $package $package"
    // And since set de-duplicates array elements, it will get converted into "npm install $package"
    const commandWithoutPackageNames = [
        ...new Set(splittedCommand.map((str) => reservedWords.includes(str) ? str : "$package")),
    ];
    let output = conversions_1.conversions[conversions_1.conversions.findIndex((conversion) => conversion[packageManager].includes(commandWithoutPackageNames.join(" ")))];
    if (!output)
        return console.log(colors_1.default.red("The entered command is invalid and cannot be converted by Narm. If you believe this is an issue/bug, please make sure to open a new issue at https://github.com/kasraghoreyshi/narm/issues"));
    return (0, single_element_array_1.getSingleElementArray)(output[targetPackageManager.name]).replace("$package", packageNames.join(" "));
};
exports.convertCommandToTargetPackageManager = convertCommandToTargetPackageManager;
//console.log(convertCommandToTargetPackageManager(testCommand));
