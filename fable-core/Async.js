define(["require", "exports", "./AsyncBuilder", "./AsyncBuilder", "./AsyncBuilder", "./AsyncBuilder", "./Choice", "./Choice", "./Seq"], function (require, exports, AsyncBuilder_1, AsyncBuilder_2, AsyncBuilder_3, AsyncBuilder_4, Choice_1, Choice_2, Seq_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Async {
    }
    exports.default = Async;
    function emptyContinuation(x) {
    }
    function awaitPromise(p) {
        return fromContinuations((conts) => p.then(conts[0]).catch(err => (err == "cancelled" ? conts[2] : conts[1])(err)));
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
                onSuccess: x => ctx.onSuccess(Choice_1.choice1Of2(x)),
                onError: ex => ctx.onSuccess(Choice_2.choice2Of2(ex)),
                onCancel: ctx.onCancel,
                cancelToken: ctx.cancelToken,
                trampoline: ctx.trampoline
            });
        });
    }
    exports.catchAsync = catchAsync;
    function fromContinuations(f) {
        return AsyncBuilder_2.protectedCont((ctx) => f([ctx.onSuccess, ctx.onError, ctx.onCancel]));
    }
    exports.fromContinuations = fromContinuations;
    function ignore(computation) {
        return AsyncBuilder_3.protectedBind(computation, x => AsyncBuilder_4.protectedReturn(void 0));
    }
    exports.ignore = ignore;
    function parallel(computations) {
        return awaitPromise(Promise.all(Seq_1.map(w => startAsPromise(w), computations)));
    }
    exports.parallel = parallel;
    function sleep(millisecondsDueTime) {
        return AsyncBuilder_2.protectedCont((ctx) => {
            setTimeout(() => ctx.cancelToken.isCancelled ? ctx.onCancel("cancelled") : ctx.onSuccess(void 0), millisecondsDueTime);
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
        var trampoline = new AsyncBuilder_1.Trampoline();
        computation({
            onSuccess: continuation ? continuation : emptyContinuation,
            onError: exceptionContinuation ? exceptionContinuation : emptyContinuation,
            onCancel: cancellationContinuation ? cancellationContinuation : emptyContinuation,
            cancelToken: cancelToken ? cancelToken : exports.defaultCancellationToken,
            trampoline: trampoline
        });
    }
    exports.startWithContinuations = startWithContinuations;
    function startAsPromise(computation, cancellationToken) {
        return new Promise((resolve, reject) => startWithContinuations(computation, resolve, reject, reject, cancellationToken ? cancellationToken : exports.defaultCancellationToken));
    }
    exports.startAsPromise = startAsPromise;
});
