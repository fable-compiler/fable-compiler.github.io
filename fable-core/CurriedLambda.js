define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function CurriedLambda(f, _this, expectedArgsLength) {
        return function () {
            _this = _this || this;
            let args = [];
            expectedArgsLength = expectedArgsLength || f.length;
            for (let i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            if (args.length >= expectedArgsLength) {
                let restArgs = args.splice(expectedArgsLength);
                let res = f.apply(_this, args);
                if (typeof res === "function") {
                    let newLambda = CurriedLambda(res, _this);
                    return restArgs.length === 0 ? newLambda : newLambda.apply(_this, restArgs);
                }
                else {
                    return res;
                }
            }
            else {
                return CurriedLambda(function () {
                    for (let i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    return f.apply(_this, args);
                }, _this, expectedArgsLength - args.length);
            }
        };
    }
    exports.default = CurriedLambda;
});
