import { Flags } from "../types/flags";
import { packageManagers, PackageManagers } from "../types/package-manager";

export const detectFlag = (
  sourcePackageManagerName: PackageManagers,
  flag: string
): Flags | null => {
  const sourcePackageManagerFlags =
    packageManagers[sourcePackageManagerName].flags;
  let flagKeyName: Flags | null = null;
  for (const key in sourcePackageManagerFlags) {
    if (Object.prototype.hasOwnProperty.call(sourcePackageManagerFlags, key)) {
      // A variable to satisfy typescript. Couldn't think of a better implementation for now.
      const typedKey: Flags = key as Flags;
      // Get's the current itteration's flag
      const sourcePackageManagerFlag = sourcePackageManagerFlags[typedKey];
      // If it includes the flag that we want, we will return the key name.
      // As the key name is the same accross all package managers
      if (sourcePackageManagerFlag?.includes(flag)) flagKeyName = typedKey;
    }
  }
  if (!flagKeyName) return null;
  return flagKeyName;
};
