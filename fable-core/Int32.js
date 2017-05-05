define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseRadix10 = /^ *([0-9]+) *$/;
    exports.parseRadix16 = /^ *([0-9a-fA-F]+) *$/;
    function parseInt16(v) {
        return parseInt(v, 16);
    }
    exports.parseInt16 = parseInt16;
});
