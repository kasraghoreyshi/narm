import { PackageManager } from "../types/package-manager";

export const npm: PackageManager = {
  name: "npm",
  flags: {
    saveDev: ["--save-dev", "-D"],
    save: "--save",
    saveOptional: "--save-optional",
    noPackageLock: "--no-package-lock",
    saveExact: "--save-exact",
    flat: null,
    har: null,
    peer: null,
    pureLockfile: null,
    tilde: null,
  },
};
