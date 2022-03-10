"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservedWords = void 0;
const conversions_1 = require("../lib/conversions");
const getReservedWords = (packageManager) => {
    const reservedWords = [];
    // This gets all conversions for a specific package manager
    // So that we could get the words that are "reserved" (used by the package manager)
    // .join(" ").split(" ") is just a trick to convert the 2d array to 1d
    const arr = conversions_1.conversions
        .map((conversion) => conversion[packageManager])
        .join(" ")
        .split(" ");
    // If the word starts with $, then it's a word that is used by narm
    // And is not a reserved word.
    arr.forEach((word) => {
        if (!reservedWords.includes(word) && !word.startsWith("$"))
            reservedWords.push(word);
    });
    //reservedWords.push(...Object.values(packageManagers[packageManager].flags));
    return reservedWords;
};
exports.getReservedWords = getReservedWords;
