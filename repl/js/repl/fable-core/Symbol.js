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
    const types = new Map();
    function setType(fullName, cons) {
        types.set(fullName, cons);
    }
    exports.setType = setType;
    function getType(fullName) {
        return types.get(fullName);
    }
    exports.getType = getType;
    exports.default = {
        reflection: Symbol("reflection"),
    };
});
