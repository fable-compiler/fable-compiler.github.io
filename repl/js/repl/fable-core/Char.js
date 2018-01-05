(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isChar(input) {
        return typeof input === "string" && input.length === 1;
    }
    function isLetter(input) {
        return isChar(input) && input.toLowerCase() !== input.toUpperCase();
    }
    exports.isLetter = isLetter;
    function isUpper(input) {
        return isLetter(input) && input.toUpperCase() === input;
    }
    exports.isUpper = isUpper;
    function isLower(input) {
        return isLetter(input) && input.toLowerCase() === input;
    }
    exports.isLower = isLower;
    function isDigit(input) {
        return isChar(input) && /\d/.test(input);
    }
    exports.isDigit = isDigit;
    function isLetterOrDigit(input) {
        return isChar(input) &&
            (input.toLowerCase() !== input.toUpperCase() || /\d/.test(input));
    }
    exports.isLetterOrDigit = isLetterOrDigit;
    function isWhiteSpace(input) {
        return isChar(input) && /\s/.test(input);
    }
    exports.isWhiteSpace = isWhiteSpace;
    function parse(input) {
        if (isChar(input)) {
            return input[0];
        }
        else {
            throw Error("String must be exactly one character long.");
        }
    }
    exports.parse = parse;
});
