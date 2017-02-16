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
});
