import { PackageManager, PackageManagers } from "../types/package-manager";
import { detectFlag } from "./detections";
import { getSingleElementArray } from "./single-element-array";

export const replaceFlags = (
  command: any[],
  sourcePackageManager: PackageManagers,
  targetPackageManager: PackageManager
) => {
  command.forEach((str, index) => {
    // If the string doesn't start with "-", then it's not a flag.
    if (!str.startsWith("-")) return;
    const flagName = detectFlag(sourcePackageManager, str);
    // If the detect flag returned nothing, it means that the flag doesn't exist and should not be replaced.
    if (flagName === null) return;
    // And since flags can be arrays (for example ["--save-dev", "-D"])
    // With the help of getSingleElementArray it will always retrieve the first element.
    // Which in the case of ["--save-dev", "-D"] for example, is "--save-dev"
    command[index] = flagName
      ? getSingleElementArray(targetPackageManager["flags"][flagName])
      : null;
  });
};
