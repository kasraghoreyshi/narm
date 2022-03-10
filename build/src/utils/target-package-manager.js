"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetPackageManager = void 0;
const package_manager_1 = require("../types/package-manager");
const getTargetPackageManager = (sourcePackageManagerName) => {
    //? A simple switch case to find the target package manager.
    //? Makes it easy to add other package managers support in the future.
    switch (sourcePackageManagerName) {
        case "npm":
            return package_manager_1.packageManagers.yarn;
        case "yarn":
        default:
            return package_manager_1.packageManagers.npm;
    }
};
exports.getTargetPackageManager = getTargetPackageManager;
