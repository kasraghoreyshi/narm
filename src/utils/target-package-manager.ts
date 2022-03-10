import { packageManagers, PackageManagers } from "../types/package-manager";

export const getTargetPackageManager = (
  sourcePackageManagerName: PackageManagers
) => {
  //? A simple switch case to find the target package manager.
  //? Makes it easy to add other package managers support in the future.
  switch (sourcePackageManagerName) {
    case "npm":
      return packageManagers.yarn;
    case "yarn":
    default:
      return packageManagers.npm;
  }
};
