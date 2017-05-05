define(["require", "exports", "./Util", "./Seq", "./Observable", "./Observable"], function (require, exports, Util_1, Seq_1, Observable_1, Observable_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Event {
        constructor(_subscriber, delegates) {
            this._subscriber = _subscriber;
            this.delegates = delegates || new Array();
        }
        Add(f) {
            this._addHandler(f);
        }
        get Publish() {
            return this;
        }
        Trigger(value) {
            Seq_1.iterate(f => f(value), this.delegates);
        }
        _addHandler(f) {
            this.delegates.push(f);
        }
        _removeHandler(f) {
            const index = this.delegates.indexOf(f);
            if (index > -1)
                this.delegates.splice(index, 1);
        }
        AddHandler(handler) {
            if (this._dotnetDelegates == null) {
                this._dotnetDelegates = new Map();
            }
            const f = function (x) { handler(null, x); };
            this._dotnetDelegates.set(handler, f);
            this._addHandler(f);
        }
        RemoveHandler(handler) {
            if (this._dotnetDelegates != null) {
                const f = this._dotnetDelegates.get(handler);
                if (f != null) {
                    this._dotnetDelegates.delete(handler);
                    this._removeHandler(f);
                }
            }
        }
        _subscribeFromObserver(observer) {
            if (this._subscriber)
                return this._subscriber(observer);
            const callback = observer.OnNext;
            this._addHandler(callback);
            return Util_1.createDisposable(() => this._removeHandler(callback));
        }
        _subscribeFromCallback(callback) {
            this._addHandler(callback);
            return Util_1.createDisposable(() => this._removeHandler(callback));
        }
        Subscribe(arg) {
            return typeof arg == "function"
                ? this._subscribeFromCallback(arg)
                : this._subscribeFromObserver(arg);
        }
    }
    exports.default = Event;
    function add(callback, sourceEvent) {
        sourceEvent.Subscribe(new Observable_1.Observer(callback));
    }
    exports.add = add;
    function choose(chooser, sourceEvent) {
        const source = sourceEvent;
        return new Event(observer => source.Subscribe(new Observable_1.Observer(t => Observable_2.protect(() => chooser(t), u => { if (u != null)
            observer.OnNext(u); }, observer.OnError), observer.OnError, observer.OnCompleted)), source.delegates);
    }
    exports.choose = choose;
    function filter(predicate, sourceEvent) {
        return choose(x => predicate(x) ? x : null, sourceEvent);
    }
    exports.filter = filter;
    function map(mapping, sourceEvent) {
        const source = sourceEvent;
        return new Event(observer => source.Subscribe(new Observable_1.Observer(t => Observable_2.protect(() => mapping(t), observer.OnNext, observer.OnError), observer.OnError, observer.OnCompleted)), source.delegates);
    }
    exports.map = map;
    function merge(event1, event2) {
        const source1 = event1;
        const source2 = event2;
        return new Event(observer => {
            let stopped = false, completed1 = false, completed2 = false;
            const h1 = source1.Subscribe(new Observable_1.Observer(v => { if (!stopped)
                observer.OnNext(v); }, e => {
                if (!stopped) {
                    stopped = true;
                    observer.OnError(e);
                }
            }, () => {
                if (!stopped) {
                    completed1 = true;
                    if (completed2) {
                        stopped = true;
                        observer.OnCompleted();
                    }
                }
            }));
            const h2 = source2.Subscribe(new Observable_1.Observer(v => { if (!stopped)
                observer.OnNext(v); }, e => {
                if (!stopped) {
                    stopped = true;
                    observer.OnError(e);
                }
            }, () => {
                if (!stopped) {
                    completed2 = true;
                    if (completed1) {
                        stopped = true;
                        observer.OnCompleted();
                    }
                }
            }));
            return Util_1.createDisposable(() => {
                h1.Dispose();
                h2.Dispose();
            });
        }, source1.delegates.concat(source2.delegates));
    }
    exports.merge = merge;
    function pairwise(sourceEvent) {
        const source = sourceEvent;
        return new Event(observer => {
            let last = null;
            return source.Subscribe(new Observable_1.Observer(next => {
                if (last != null)
                    observer.OnNext([last, next]);
                last = next;
            }, observer.OnError, observer.OnCompleted));
        }, source.delegates);
    }
    exports.pairwise = pairwise;
    function partition(predicate, sourceEvent) {
        return [filter(predicate, sourceEvent), filter(x => !predicate(x), sourceEvent)];
    }
    exports.partition = partition;
    function scan(collector, state, sourceEvent) {
        const source = sourceEvent;
        return new Event(observer => {
            return source.Subscribe(new Observable_1.Observer(t => {
                Observable_2.protect(() => collector(state, t), u => { state = u; observer.OnNext(u); }, observer.OnError);
            }, observer.OnError, observer.OnCompleted));
        }, source.delegates);
    }
    exports.scan = scan;
    function split(splitter, sourceEvent) {
        return [choose(v => splitter(v).valueIfChoice1, sourceEvent), choose(v => splitter(v).valueIfChoice2, sourceEvent)];
    }
    exports.split = split;
});
