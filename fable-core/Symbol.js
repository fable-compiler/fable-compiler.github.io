define(["require", "exports"], function (require, exports) {
    "use strict";
    var types = new Map();
    function setType(fullName, cons) {
        types.set(fullName, cons);
    }
    exports.setType = setType;
    function getType(fullName) {
        return types.get(fullName);
    }
    exports.getType = getType;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        reflection: Symbol("reflection")
    };
});
