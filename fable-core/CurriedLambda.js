define(["require", "exports"], function (require, exports) {
    "use strict";
    function CurriedLambda(arities, f, _this) {
        return function () {
            _this = _this || this;
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            if (args.length >= arities[0]) {
                var restArgs = args.splice(arities[0]);
                var res = f.apply(_this, args);
                if (arities.length > 1) {
                    var newLambda = CurriedLambda(arities.slice(1), res, _this);
                    return restArgs.length === 0 ? newLambda : newLambda.apply(_this, restArgs);
                }
                else {
                    return res;
                }
            }
            else {
                arities[0] -= args.length;
                return CurriedLambda(arities, function () {
                    for (var i = 0; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    return f.apply(_this, args);
                }, _this);
            }
        };
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CurriedLambda;
});
