(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // TODO does this perfectly match the .NET behavior ?
    function tryParse(s, radix, initial) {
        if (s != null && /\S/.test(s)) {
            if (radix === 10) {
                const v = +s;
                if (!Number.isNaN(v)) {
                    return [true, v];
                }
            }
        }
        return [false, initial != null ? initial : 0];
    }
    exports.tryParse = tryParse;
    function parse(s, radix = 10) {
        const a = tryParse(s, radix, 0);
        if (a[0]) {
            return a[1];
        }
        else {
            // TODO FormatException ?
            throw new Error("Input string was not in a correct format.");
        }
    }
    exports.parse = parse;
});
