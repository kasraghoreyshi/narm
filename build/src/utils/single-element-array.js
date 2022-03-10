"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleElementArray = void 0;
//TODO: This needs a better name.
//? It just converts an any | any[] to any
//? Which is useful for returning a single flag alias for example.
const getSingleElementArray = (input) => {
    if (Array.isArray(input)) {
        return input[0];
    }
    return input;
};
exports.getSingleElementArray = getSingleElementArray;
