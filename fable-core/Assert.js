var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Util"], function (require, exports, Util_1) {
    "use strict";
    var AssertionError = (function (_super) {
        __extends(AssertionError, _super);
        function AssertionError(msg, actual, expected) {
            var _this = _super.call(this, msg) || this;
            _this.actual = actual;
            _this.expected = expected;
            return _this;
        }
        return AssertionError;
    }(Error));
    exports.AssertionError = AssertionError;
    function equal(actual, expected, msg) {
        if (!Util_1.equals(actual, expected)) {
            throw new AssertionError(msg || "Expected: " + expected + " - Actual: " + actual, actual, expected);
        }
    }
    exports.equal = equal;
});
