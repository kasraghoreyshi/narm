"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const src_1 = require("./src");
(0, ava_1.default)("convert to npm", (t) => {
    const command = (0, src_1.convertCommandToTargetPackageManager)("yarn add react");
    t.is(command, "npm install react");
});
(0, ava_1.default)("convert to npm with flags", (t) => {
    const command = (0, src_1.convertCommandToTargetPackageManager)("yarn global add react --dev --optional");
    t.is(command, "npm install react --save-dev --save-optional --global");
});
(0, ava_1.default)("npm aliases", (t) => {
    const command = (0, src_1.convertCommandToTargetPackageManager)("npm i react -D");
    t.is(command, "yarn add react --dev");
});
(0, ava_1.default)("dont change unknown flags", (t) => {
    const command = (0, src_1.convertCommandToTargetPackageManager)("yarn add react --haha");
    t.is(command, "npm install react --haha");
});
(0, ava_1.default)("error on invalid package manager", (t) => {
    t.throws(() => {
        return (0, src_1.convertCommandToTargetPackageManager)("corn add react");
    }, {
        instanceOf: Error,
    });
});
(0, ava_1.default)("error on invalid command", (t) => {
    t.throws(() => {
        return (0, src_1.convertCommandToTargetPackageManager)("npm add react");
    }, {
        instanceOf: Error,
    });
});
