define(["require", "exports", "./Util"], function (require, exports, Util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
