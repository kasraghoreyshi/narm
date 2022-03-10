"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceFlags = void 0;
const detections_1 = require("./detections");
const single_element_array_1 = require("./single-element-array");
const replaceFlags = (command, sourcePackageManager, targetPackageManager) => {
    command.forEach((str, index) => {
        // If the string doesn't start with "-", then it's not a flag.
        if (!str.startsWith("-"))
            return;
        const flagName = (0, detections_1.detectFlag)(sourcePackageManager, str);
        // If the detect flag returned nothing, it means that the flag doesn't exist and should not be replaced.
        if (flagName === null)
            return;
        // And since flags can be arrays (for example ["--save-dev", "-D"])
        // With the help of getSingleElementArray it will always retrieve the first element.
        // Which in the case of ["--save-dev", "-D"] for example, is "--save-dev"
        command[index] = flagName
            ? (0, single_element_array_1.getSingleElementArray)(targetPackageManager["flags"][flagName])
            : null;
    });
};
exports.replaceFlags = replaceFlags;
