define(["require", "exports", "./Option", "./Symbol", "./Util"], function (require, exports, Option_1, Symbol_1, Util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Observer {
        constructor(onNext, onError, onCompleted) {
            this.OnNext = onNext;
            this.OnError = onError || ((e) => { return; });
            this.OnCompleted = onCompleted || (() => { return; });
        }
        [Symbol_1.default.reflection]() {
            return { interfaces: ["System.IObserver"] };
        }
    }
    exports.Observer = Observer;
    class Observable {
        constructor(subscribe) {
            this.Subscribe = subscribe;
        }
        [Symbol_1.default.reflection]() {
            return { interfaces: ["System.IObservable"] };
        }
    }
    function protect(f, succeed, fail) {
        try {
            return succeed(f());
        }
        catch (e) {
            fail(e);
        }
    }
    exports.protect = protect;
    function add(callback, source) {
        source.Subscribe(new Observer(callback));
    }
    exports.add = add;
    function choose(chooser, source) {
        return new Observable((observer) => source.Subscribe(new Observer((t) => protect(() => chooser(t), (u) => { if (u != null) {
            observer.OnNext(Option_1.getValue(u));
        } }, observer.OnError), observer.OnError, observer.OnCompleted)));
    }
    exports.choose = choose;
    function filter(predicate, source) {
        return choose((x) => predicate(x) ? x : null, source);
    }
    exports.filter = filter;
    function map(mapping, source) {
        return new Observable((observer) => source.Subscribe(new Observer((t) => {
            protect(() => mapping(t), observer.OnNext, observer.OnError);
        }, observer.OnError, observer.OnCompleted)));
    }
    exports.map = map;
    function merge(source1, source2) {
        return new Observable((observer) => {
            let stopped = false;
            let completed1 = false;
            let completed2 = false;
            const h1 = source1.Subscribe(new Observer((v) => { if (!stopped) {
                observer.OnNext(v);
            } }, (e) => {
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
            const h2 = source2.Subscribe(new Observer((v) => { if (!stopped) {
                observer.OnNext(v);
            } }, (e) => {
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
        });
    }
    exports.merge = merge;
    function pairwise(source) {
        return new Observable((observer) => {
            let last = null;
            return source.Subscribe(new Observer((next) => {
                if (last != null) {
                    observer.OnNext([last, next]);
                }
                last = next;
            }, observer.OnError, observer.OnCompleted));
        });
    }
    exports.pairwise = pairwise;
    function partition(predicate, source) {
        return [filter(predicate, source), filter((x) => !predicate(x), source)];
    }
    exports.partition = partition;
    function scan(collector, state, source) {
        return new Observable((observer) => {
            return source.Subscribe(new Observer((t) => {
                protect(() => collector(state, t), (u) => { state = u; observer.OnNext(u); }, observer.OnError);
            }, observer.OnError, observer.OnCompleted));
        });
    }
    exports.scan = scan;
    function split(splitter, source) {
        return [choose((v) => splitter(v).valueIfChoice1, source), choose((v) => splitter(v).valueIfChoice2, source)];
    }
    exports.split = split;
    function subscribe(callback, source) {
        return source.Subscribe(new Observer(callback));
    }
    exports.subscribe = subscribe;
});
