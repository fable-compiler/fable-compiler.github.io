(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./AsyncBuilder", "./AsyncBuilder", "./AsyncBuilder", "./AsyncBuilder", "./Choice", "./Choice", "./Seq"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const AsyncBuilder_1 = require("./AsyncBuilder");
    const AsyncBuilder_2 = require("./AsyncBuilder");
    const AsyncBuilder_3 = require("./AsyncBuilder");
    const AsyncBuilder_4 = require("./AsyncBuilder");
    const Choice_1 = require("./Choice");
    const Choice_2 = require("./Choice");
    const Seq_1 = require("./Seq");
    // Implemented just for type references
    class Async {
    }
    exports.default = Async;
    function emptyContinuation(x) {
        // NOP
    }
    function createCancellationToken(arg) {
        const token = { isCancelled: false };
        if (typeof arg === "number") {
            setTimeout(() => { token.isCancelled = true; }, arg);
        }
        else if (typeof arg === "boolean") {
            token.isCancelled = arg;
        }
        return token;
    }
    exports.createCancellationToken = createCancellationToken;
    function cancel(token) {
        token.isCancelled = true;
    }
    exports.cancel = cancel;
    function cancelAfter(token, ms) {
        setTimeout(() => { token.isCancelled = true; }, ms);
    }
    exports.cancelAfter = cancelAfter;
    function isCancellationRequested(token) {
        return token != null && token.isCancelled;
    }
    exports.isCancellationRequested = isCancellationRequested;
    function startChild(computation) {
        const promise = startAsPromise(computation);
        // JS Promises are hot, computation has already started
        // but we delay returning the result
        return AsyncBuilder_2.protectedCont((ctx) => AsyncBuilder_4.protectedReturn(awaitPromise(promise))(ctx));
    }
    exports.startChild = startChild;
    function awaitPromise(p) {
        return fromContinuations((conts) => p.then(conts[0]).catch((err) => (err instanceof AsyncBuilder_1.OperationCanceledError
            ? conts[2] : conts[1])(err)));
    }
    exports.awaitPromise = awaitPromise;
    function cancellationToken() {
        return AsyncBuilder_2.protectedCont((ctx) => ctx.onSuccess(ctx.cancelToken));
    }
    exports.cancellationToken = cancellationToken;
    exports.defaultCancellationToken = { isCancelled: false };
    function catchAsync(work) {
        return AsyncBuilder_2.protectedCont((ctx) => {
            work({
                onSuccess: (x) => ctx.onSuccess(Choice_1.choice1Of2(x)),
                onError: (ex) => ctx.onSuccess(Choice_2.choice2Of2(ex)),
                onCancel: ctx.onCancel,
                cancelToken: ctx.cancelToken,
                trampoline: ctx.trampoline,
            });
        });
    }
    exports.catchAsync = catchAsync;
    function fromContinuations(f) {
        return AsyncBuilder_2.protectedCont((ctx) => f([ctx.onSuccess, ctx.onError, ctx.onCancel]));
    }
    exports.fromContinuations = fromContinuations;
    function ignore(computation) {
        return AsyncBuilder_3.protectedBind(computation, (x) => AsyncBuilder_4.protectedReturn(void 0));
    }
    exports.ignore = ignore;
    function parallel(computations) {
        return awaitPromise(Promise.all(Seq_1.map((w) => startAsPromise(w), computations)));
    }
    exports.parallel = parallel;
    function sleep(millisecondsDueTime) {
        return AsyncBuilder_2.protectedCont((ctx) => {
            setTimeout(() => ctx.cancelToken.isCancelled
                ? ctx.onCancel(new AsyncBuilder_1.OperationCanceledError())
                : ctx.onSuccess(void 0), millisecondsDueTime);
        });
    }
    exports.sleep = sleep;
    function start(computation, cancellationToken) {
        return startWithContinuations(computation, cancellationToken);
    }
    exports.start = start;
    function startImmediate(computation, cancellationToken) {
        return start(computation, cancellationToken);
    }
    exports.startImmediate = startImmediate;
    function startWithContinuations(computation, continuation, exceptionContinuation, cancellationContinuation, cancelToken) {
        if (typeof continuation !== "function") {
            cancelToken = continuation;
            continuation = null;
        }
        const trampoline = new AsyncBuilder_1.Trampoline();
        computation({
            onSuccess: continuation ? continuation : emptyContinuation,
            onError: exceptionContinuation ? exceptionContinuation : emptyContinuation,
            onCancel: cancellationContinuation ? cancellationContinuation : emptyContinuation,
            cancelToken: cancelToken ? cancelToken : exports.defaultCancellationToken,
            trampoline,
        });
    }
    exports.startWithContinuations = startWithContinuations;
    function startAsPromise(computation, cancellationToken) {
        return new Promise((resolve, reject) => startWithContinuations(computation, resolve, reject, reject, cancellationToken ? cancellationToken : exports.defaultCancellationToken));
    }
    exports.startAsPromise = startAsPromise;
});
