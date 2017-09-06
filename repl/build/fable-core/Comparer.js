define(["require", "exports", "./Symbol", "./Util"], function (require, exports, Symbol_1, Util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Comparer {
        constructor(f) {
            this.Compare = f || Util_1.compare;
        }
        [Symbol_1.default.reflection]() {
            return { interfaces: ["System.IComparer"] };
        }
    }
    exports.default = Comparer;
    function fromEqualityComparer(comparer) {
        // Sometimes IEqualityComparer also implements IComparer
        if (typeof comparer.Compare === "function") {
            return new Comparer(comparer.Compare);
        }
        else {
            return new Comparer((x, y) => {
                const xhash = comparer.GetHashCode(x);
                const yhash = comparer.GetHashCode(y);
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
