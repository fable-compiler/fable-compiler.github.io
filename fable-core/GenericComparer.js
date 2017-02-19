define(["require", "exports", "./Util", "./Symbol"], function (require, exports, Util_1, Symbol_1) {
    "use strict";
    var GenericComparer = (function () {
        function GenericComparer(f) {
            this.Compare = f || Util_1.compare;
        }
        GenericComparer.prototype[Symbol_1.default.reflection] = function () {
            return { interfaces: ["System.IComparer"] };
        };
        return GenericComparer;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = GenericComparer;
    function fromEqualityComparer(eqComparer) {
        var f = typeof eqComparer.Compare === "function"
            ? eqComparer.Compare : function (x, y) { return eqComparer.Equals(x, y) ? 0 : 1; };
        return new GenericComparer(f);
    }
    exports.fromEqualityComparer = fromEqualityComparer;
});
