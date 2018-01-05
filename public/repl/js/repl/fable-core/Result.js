(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Symbol", "./Util", "./Util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Symbol_1 = require("./Symbol");
    const Util_1 = require("./Util");
    const Util_2 = require("./Util");
    class Result {
        constructor(tag, data) {
            this.tag = tag | 0;
            this.data = data;
        }
        Equals(other) {
            return Util_2.equalsUnions(this, other);
        }
        CompareTo(other) {
            return Util_2.compareUnions(this, other);
        }
        [Symbol_1.default.reflection]() {
            return {
                type: "Microsoft.FSharp.Core.FSharpResult",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Ok", Util_1.GenericParam("T")], ["Error", Util_1.GenericParam("TError")]],
            };
        }
    }
    exports.default = Result;
    function map(f, result) {
        return result.tag === 0 ? new Result(0, f(result.data)) : result;
    }
    exports.map = map;
    function mapError(f, result) {
        return result.tag === 1 ? new Result(1, f(result.data)) : result;
    }
    exports.mapError = mapError;
    function bind(f, result) {
        return result.tag === 0 ? f(result.data) : result;
    }
    exports.bind = bind;
});
