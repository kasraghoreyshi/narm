import { npm } from "../package-managers/npm";
import { yarn } from "../package-managers/yarn";
import { Flags } from "./flags";

export type PackageManager = {
  name: PackageManagers;
  flags: { [key in Flags]: string | string[] | null };
};

export type PackageManagers = "npm" | "yarn";

export const packageManagers: { [key in PackageManagers]: PackageManager } = {
  npm,
  yarn,
};
