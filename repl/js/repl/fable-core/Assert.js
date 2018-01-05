(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Util_1 = require("./Util");
    class AssertionError extends Error {
        constructor(msg, actual, expected) {
            super(msg);
            this.actual = actual;
            this.expected = expected;
        }
    }
    exports.AssertionError = AssertionError;
    function equal(actual, expected, msg) {
        if (!Util_1.equals(actual, expected)) {
            throw new AssertionError(msg || `Expected: ${expected} - Actual: ${actual}`, actual, expected);
        }
    }
    exports.equal = equal;
});
