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
    function createFromValue(v) {
        return new Lazy(() => v);
    }
    exports.createFromValue = createFromValue;
    class Lazy {
        constructor(factory) {
            this.factory = factory;
            this.isValueCreated = false;
        }
        get value() {
            if (!this.isValueCreated) {
                this.createdValue = this.factory();
                this.isValueCreated = true;
            }
            return this.createdValue;
        }
    }
    exports.default = Lazy;
});
