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
    class OperationCanceledError extends Error {
        constructor() {
            super("The operation was canceled");
            Object.setPrototypeOf(this, OperationCanceledError.prototype);
        }
    }
    exports.OperationCanceledError = OperationCanceledError;
    class Trampoline {
        static get maxTrampolineCallCount() {
            return 2000;
        }
        constructor() {
            this.callCount = 0;
        }
        incrementAndCheck() {
            return this.callCount++ > Trampoline.maxTrampolineCallCount;
        }
        hijack(f) {
            this.callCount = 0;
            setTimeout(f, 0);
        }
    }
    exports.Trampoline = Trampoline;
    function protectedCont(f) {
        return (ctx) => {
            if (ctx.cancelToken.isCancelled) {
                ctx.onCancel(new OperationCanceledError());
            }
            else if (ctx.trampoline.incrementAndCheck()) {
                ctx.trampoline.hijack(() => {
                    try {
                        f(ctx);
                    }
                    catch (err) {
                        ctx.onError(err);
                    }
                });
            }
            else {
                try {
                    f(ctx);
                }
                catch (err) {
                    ctx.onError(err);
                }
            }
        };
    }
    exports.protectedCont = protectedCont;
    function protectedBind(computation, binder) {
        return protectedCont((ctx) => {
            computation({
                onSuccess: (x) => {
                    try {
                        binder(x)(ctx);
                    }
                    catch (ex) {
                        ctx.onError(ex);
                    }
                },
                onError: ctx.onError,
                onCancel: ctx.onCancel,
                cancelToken: ctx.cancelToken,
                trampoline: ctx.trampoline,
            });
        });
    }
    exports.protectedBind = protectedBind;
    function protectedReturn(value) {
        return protectedCont((ctx) => ctx.onSuccess(value));
    }
    exports.protectedReturn = protectedReturn;
    class AsyncBuilder {
        Bind(computation, binder) {
            return protectedBind(computation, binder);
        }
        Combine(computation1, computation2) {
            return this.Bind(computation1, () => computation2);
        }
        Delay(generator) {
            return protectedCont((ctx) => generator()(ctx));
        }
        For(sequence, body) {
            const iter = sequence[Symbol.iterator]();
            let cur = iter.next();
            return this.While(() => !cur.done, this.Delay(() => {
                const res = body(cur.value);
                cur = iter.next();
                return res;
            }));
        }
        Return(value) {
            return protectedReturn(value);
        }
        ReturnFrom(computation) {
            return computation;
        }
        TryFinally(computation, compensation) {
            return protectedCont((ctx) => {
                computation({
                    onSuccess: (x) => {
                        compensation();
                        ctx.onSuccess(x);
                    },
                    onError: (x) => {
                        compensation();
                        ctx.onError(x);
                    },
                    onCancel: (x) => {
                        compensation();
                        ctx.onCancel(x);
                    },
                    cancelToken: ctx.cancelToken,
                    trampoline: ctx.trampoline,
                });
            });
        }
        TryWith(computation, catchHandler) {
            return protectedCont((ctx) => {
                computation({
                    onSuccess: ctx.onSuccess,
                    onCancel: ctx.onCancel,
                    cancelToken: ctx.cancelToken,
                    trampoline: ctx.trampoline,
                    onError: (ex) => {
                        try {
                            catchHandler(ex)(ctx);
                        }
                        catch (ex2) {
                            ctx.onError(ex2);
                        }
                    },
                });
            });
        }
        Using(resource, binder) {
            return this.TryFinally(binder(resource), () => resource.Dispose());
        }
        While(guard, computation) {
            if (guard()) {
                return this.Bind(computation, () => this.While(guard, computation));
            }
            else {
                return this.Return(void 0);
            }
        }
        Zero() {
            return protectedCont((ctx) => ctx.onSuccess(void 0));
        }
    }
    exports.AsyncBuilder = AsyncBuilder;
    exports.singleton = new AsyncBuilder();
});
