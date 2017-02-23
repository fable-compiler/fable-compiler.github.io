define(["require", "exports", "./Util", "./Symbol"], function (require, exports, Util_1, Symbol_1) {
    "use strict";
    var Comparer = (function () {
        function Comparer(f) {
            this.Compare = f || Util_1.compare;
        }
        Comparer.prototype[Symbol_1.default.reflection] = function () {
            return { interfaces: ["System.IComparer"] };
        };
        return Comparer;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Comparer;
    function fromEqualityComparer(comparer) {
        if (typeof comparer.Compare === "function") {
            return new Comparer(comparer.Compare);
        }
        else {
            return new Comparer(function (x, y) {
                var xhash = comparer.GetHashCode(x), yhash = comparer.GetHashCode(y);
                if (xhash === yhash) {
                    return comparer.Equals(x, y) ? 0 : -1;
                }
                else {
                    return xhash < yhash ? -1 : 1;
                }
            });
        }
    }
    exports.fromEqualityComparer = fromEqualityComparer;
});
