(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Async", "./Async", "./Async"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Async_1 = require("./Async");
    const Async_2 = require("./Async");
    const Async_3 = require("./Async");
    class QueueCell {
        constructor(message) {
            this.value = message;
        }
    }
    class MailboxQueue {
        add(message) {
            const itCell = new QueueCell(message);
            if (this.firstAndLast) {
                this.firstAndLast[1].next = itCell;
                this.firstAndLast = [this.firstAndLast[0], itCell];
            }
            else {
                this.firstAndLast = [itCell, itCell];
            }
        }
        tryGet() {
            if (this.firstAndLast) {
                const value = this.firstAndLast[0].value;
                if (this.firstAndLast[0].next) {
                    this.firstAndLast = [this.firstAndLast[0].next, this.firstAndLast[1]];
                }
                else {
                    delete this.firstAndLast;
                }
                return value;
            }
            return void 0;
        }
    }
    class MailboxProcessor {
        constructor(body, cancellationToken) {
            this.body = body;
            this.cancellationToken = cancellationToken || Async_1.defaultCancellationToken;
            this.messages = new MailboxQueue();
        }
        __processEvents() {
            if (this.continuation) {
                const value = this.messages.tryGet();
                if (value) {
                    const cont = this.continuation;
                    delete this.continuation;
                    cont(value);
                }
            }
        }
        start() {
            Async_3.startImmediate(this.body(this), this.cancellationToken);
        }
        receive() {
            return Async_2.fromContinuations((conts) => {
                if (this.continuation) {
                    throw new Error("Receive can only be called once!");
                }
                this.continuation = conts[0];
                this.__processEvents();
            });
        }
        post(message) {
            this.messages.add(message);
            this.__processEvents();
        }
        postAndAsyncReply(buildMessage) {
            let result;
            let continuation;
            function checkCompletion() {
                if (result && continuation) {
                    continuation(result);
                }
            }
            const reply = {
                reply: (res) => {
                    result = res;
                    checkCompletion();
                },
            };
            this.messages.add(buildMessage(reply));
            this.__processEvents();
            return Async_2.fromContinuations((conts) => {
                continuation = conts[0];
                checkCompletion();
            });
        }
    }
    exports.default = MailboxProcessor;
    function start(body, cancellationToken) {
        const mbox = new MailboxProcessor(body, cancellationToken);
        mbox.start();
        return mbox;
    }
    exports.start = start;
});
