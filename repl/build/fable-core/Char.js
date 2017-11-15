define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isLetter(input) {
        if (typeof input !== "string") {
            return false;
        }
        if (input.length !== 1) {
            return false;
        }
        if (input.toLowerCase() !== input.toUpperCase()) {
            return true;
        }
        return false;
    }
    exports.isLetter = isLetter;
});
