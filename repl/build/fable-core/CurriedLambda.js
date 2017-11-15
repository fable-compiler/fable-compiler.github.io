define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function CurriedLambda(f, expectedArgsLength) {
        if (f.curried === true) {
            return f;
        }
        const curriedFn = (...args) => {
            // _this = _this || this;
            const actualArgsLength = Math.max(args.length, 1);
            expectedArgsLength = Math.max(expectedArgsLength || f.length, 1);
            if (actualArgsLength >= expectedArgsLength) {
                const restArgs = args.splice(expectedArgsLength);
                const res = f(...args);
                if (typeof res === "function") {
                    const newLambda = CurriedLambda(res);
                    return restArgs.length === 0 ? newLambda : newLambda(...restArgs);
                }
                else {
                    return res;
                }
            }
            else {
                return CurriedLambda((...args2) => {
                    return f(...args.concat(args2));
                }, expectedArgsLength - actualArgsLength);
            }
        };
        curriedFn.curried = true;
        return curriedFn;
    }
    exports.default = CurriedLambda;
    function partialApply(f, args) {
        const args2 = args.map((x) => typeof x === "function" && !x.curried ? CurriedLambda(x) : x);
        const lambda = f.curried === true ? f : CurriedLambda(f);
        return lambda(...args2);
    }
    exports.partialApply = partialApply;
});
