define(["require", "exports", "./Symbol", "./Util", "./Util"], function (require, exports, Symbol_1, Util_1, Util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                cases: [["Ok", Util_1.Any], ["Error", Util_1.Any]],
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
