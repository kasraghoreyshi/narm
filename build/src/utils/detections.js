"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectFlag = void 0;
const package_manager_1 = require("../types/package-manager");
const detectFlag = (sourcePackageManagerName, flag) => {
    const sourcePackageManagerFlags = package_manager_1.packageManagers[sourcePackageManagerName].flags;
    let flagKeyName = null;
    for (const key in sourcePackageManagerFlags) {
        if (Object.prototype.hasOwnProperty.call(sourcePackageManagerFlags, key)) {
            // A variable to satisfy typescript. Couldn't think of a better implementation for now.
            const typedKey = key;
            // Get's the current itteration's flag
            const sourcePackageManagerFlag = sourcePackageManagerFlags[typedKey];
            // If it includes the flag that we want, we will return the key name.
            // As the key name is the same accross all package managers
            if (sourcePackageManagerFlag === null || sourcePackageManagerFlag === void 0 ? void 0 : sourcePackageManagerFlag.includes(flag))
                flagKeyName = typedKey;
        }
    }
    if (!flagKeyName)
        return null;
    return flagKeyName;
};
exports.detectFlag = detectFlag;
