define(["require", "exports", "./Event", "./Symbol"], function (require, exports, Event_1, Symbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Timer {
        constructor(interval) {
            this.Interval = interval > 0 ? interval : 100;
            this.AutoReset = true;
            this._elapsed = new Event_1.default();
        }
        get Elapsed() {
            return this._elapsed;
        }
        get Enabled() {
            return this._enabled;
        }
        set Enabled(x) {
            if (!this._isDisposed && this._enabled != x) {
                if (this._enabled = x) {
                    if (this.AutoReset) {
                        this._intervalId = setInterval(() => {
                            if (!this.AutoReset)
                                this.Enabled = false;
                            this._elapsed.Trigger(new Date());
                        }, this.Interval);
                    }
                    else {
                        this._timeoutId = setTimeout(() => {
                            this.Enabled = false;
                            this._timeoutId = 0;
                            if (this.AutoReset)
                                this.Enabled = true;
                            this._elapsed.Trigger(new Date());
                        }, this.Interval);
                    }
                }
                else {
                    if (this._timeoutId) {
                        clearTimeout(this._timeoutId);
                        this._timeoutId = 0;
                    }
                    if (this._intervalId) {
                        clearInterval(this._intervalId);
                        this._intervalId = 0;
                    }
                }
            }
        }
        Dispose() {
            this.Enabled = false;
            this._isDisposed = true;
        }
        Close() {
            this.Dispose();
        }
        Start() {
            this.Enabled = true;
        }
        Stop() {
            this.Enabled = false;
        }
        [Symbol_1.default.reflection]() {
            return {
                type: "System.Timers.Timer",
                interfaces: ["System.IDisposable"]
            };
        }
    }
    exports.default = Timer;
});
