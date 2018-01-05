(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Util_1 = require("./Util");
    class Some {
        constructor(value) {
            this.value = value;
        }
        // We don't prefix it with "Some" for consistency with erased options
        ToString() {
            return Util_1.toString(this.value);
        }
        Equals(other) {
            if (other == null) {
                return false;
            }
            else {
                return Util_1.equals(this.value, other instanceof Some
                    ? other.value : other);
            }
        }
        CompareTo(other) {
            if (other == null) {
                return 1;
            }
            else {
                return Util_1.compare(this.value, other instanceof Some
                    ? other.value : other);
            }
        }
    }
    exports.Some = Some;
    function makeSome(x) {
        return x == null || x instanceof Some ? new Some(x) : x;
    }
    exports.makeSome = makeSome;
    function getValue(x, acceptNull) {
        if (x == null) {
            if (!acceptNull) {
                throw new Error("Option has no value");
            }
            return null;
        }
        else {
            return x instanceof Some ? x.value : x;
        }
    }
    exports.getValue = getValue;
    function defaultArg(arg, defaultValue, f) {
        return arg == null ? defaultValue : (f != null ? f(getValue(arg)) : getValue(arg));
    }
    exports.defaultArg = defaultArg;
    function defaultArgWith(arg, defThunk) {
        return arg == null ? defThunk() : getValue(arg);
    }
    exports.defaultArgWith = defaultArgWith;
    function filter(predicate, arg) {
        return arg != null ? (!predicate(getValue(arg)) ? null : arg) : arg;
    }
    exports.filter = filter;
});
