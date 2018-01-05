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
    function choice1Of2(v) {
        return new Choice(0, v);
    }
    exports.choice1Of2 = choice1Of2;
    function choice2Of2(v) {
        return new Choice(1, v);
    }
    exports.choice2Of2 = choice2Of2;
    class Choice {
        constructor(tag, data) {
            this.tag = tag | 0;
            this.data = data;
        }
        get valueIfChoice1() {
            return this.tag === 0 ? this.data : null;
        }
        get valueIfChoice2() {
            return this.tag === 1 ? this.data : null;
        }
        Equals(other) {
            return Util_2.equalsUnions(this, other);
        }
        CompareTo(other) {
            return Util_2.compareUnions(this, other);
        }
        [Symbol_1.default.reflection]() {
            return {
                type: "Microsoft.FSharp.Core.FSharpChoice",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Choice1Of2", Util_1.Any], ["Choice2Of2", Util_1.Any]],
            };
        }
    }
    exports.default = Choice;
});
