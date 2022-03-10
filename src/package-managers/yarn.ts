import { PackageManager } from "../types/package-manager";

export const yarn: PackageManager = {
  name: "yarn",
  flags: {
    saveDev: "--dev",
    save: null,
    saveOptional: "--optional",
    noPackageLock: "--no-lockfile",
    saveExact: "--exact",
    flat: "--flat",
    har: "--har",
    peer: "--peer",
    pureLockfile: "--pure-lockfile",
    tilde: "--tilde",
  },
};
