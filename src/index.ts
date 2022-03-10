import colors from "colors";
import { conversions } from "./lib/conversions";
import {
  PackageManager,
  packageManagers,
  PackageManagers,
} from "./types/package-manager";
import { replaceFlags } from "./utils/replace-flags";
import { getReservedWords } from "./utils/reserved-words";
import { getSingleElementArray } from "./utils/single-element-array";
import { getTargetPackageManager } from "./utils/target-package-manager";

export const convertCommandToTargetPackageManager = (
  inputCommand: string,
  inputTargetPackageManager?: PackageManager | undefined
) => {
  const splittedCommand: any[] = inputCommand.split(" ");

  // First part of the command is always the package manager name so we could get
  // Our package manager from it.
  const packageManager: PackageManagers = splittedCommand[0] as PackageManagers;

  // Invalid if package managers object doesn't include the package manager
  // Extracted from the first part of the command.
  if (!Object.keys(packageManagers).includes(packageManager))
    return console.log(
      colors.red(`Package manager "${packageManager}" not found.`)
    );

  // Package manager that narm will convert to.
  const targetPackageManager: PackageManager =
    inputTargetPackageManager || getTargetPackageManager(packageManager);

  // Replaces all the flags to the target package manager flag equivalent.
  // If the flag has no equivalent, it will be replaced with null.
  replaceFlags(splittedCommand, packageManager, targetPackageManager);

  // To distinguish between package names in the command and actual parts of the command,
  // This function helps us retrieve words like "npm" and "install" so we could later distinguish
  // Package names.
  const reservedWords = getReservedWords(packageManager);

  // Gets package names from the command. For example in ["npm", "install", "react"]
  // Both "npm" and "install" are reserved so
  // "react" is the name of the package.
  //? Needs to be an array because "npm install react tailwind express" is also a valid command.
  const packageNames = splittedCommand.filter(
    (str) => !reservedWords.includes(str)
  );

  // In this step we remove all the non-reserved words from the command
  // And store it into a new variable. We convert it into a set
  // Because as mentioned in the last step, "npm install react tailwind" is a valid
  // Command so we don't want to end up with "npm install $package $package"
  // And since set de-duplicates array elements, it will get converted into "npm install $package"
  const commandWithoutPackageNames = [
    ...new Set(
      splittedCommand.map((str) =>
        reservedWords.includes(str) ? str : "$package"
      )
    ),
  ];

  let output =
    conversions[
      conversions.findIndex((conversion: any) =>
        conversion[packageManager].includes(
          commandWithoutPackageNames.join(" ")
        )
      )
    ];
  if (!output)
    return console.log(
      colors.red(
        "The entered command is invalid and cannot be converted by Narm. If you believe this is an issue/bug, please make sure to open a new issue at https://github.com/kasraghoreyshi/narm/issues"
      )
    );
  return getSingleElementArray(output[targetPackageManager.name]).replace(
    "$package",
    packageNames.join(" ")
  );
};

//console.log(convertCommandToTargetPackageManager(testCommand));
