"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageManagers = void 0;
const npm_1 = require("../package-managers/npm");
const yarn_1 = require("../package-managers/yarn");
exports.packageManagers = {
    npm: npm_1.npm,
    yarn: yarn_1.yarn,
};
