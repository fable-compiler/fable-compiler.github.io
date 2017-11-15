define(["require", "exports", "./Array", "./Array", "./ListClass", "./Option", "./Util"], function (require, exports, Array_1, Array_2, ListClass_1, Option_1, Util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Enumerator {
        constructor(iter) {
            this.iter = iter;
        }
        MoveNext() {
            const cur = this.iter.next();
            this.current = cur.value;
            return !cur.done;
        }
        get Current() { return this.current; }
        get get_Current() { return this.current; }
        Reset() {
            throw new Error("JS iterators cannot be reset");
        }
        Dispose() { return; }
    }
    exports.Enumerator = Enumerator;
    function getEnumerator(o) {
        return typeof o.GetEnumerator === "function"
            ? o.GetEnumerator() : new Enumerator(o[Symbol.iterator]());
    }
    exports.getEnumerator = getEnumerator;
    function toIterator(en) {
        return {
            next() {
                return en.MoveNext()
                    ? { done: false, value: en.Current }
                    : { done: true, value: null };
            },
        };
    }
    exports.toIterator = toIterator;
    function __failIfNone(res) {
        if (res == null) {
            throw new Error("Seq did not contain any matching element");
        }
        return Option_1.getValue(res);
    }
    function toList(xs) {
        return foldBack((x, acc) => new ListClass_1.default(x, acc), xs, new ListClass_1.default());
    }
    exports.toList = toList;
    function ofList(xs) {
        return delay(() => unfold((x) => x.tail != null ? [x.head, x.tail] : null, xs));
    }
    exports.ofList = ofList;
    function ofArray(xs) {
        return delay(() => unfold((i) => i < xs.length ? [xs[i], i + 1] : null, 0));
    }
    exports.ofArray = ofArray;
    function append(xs, ys) {
        return delay(() => {
            let firstDone = false;
            const i = xs[Symbol.iterator]();
            let iters = [i, null];
            return unfold(() => {
                let cur;
                if (!firstDone) {
                    cur = iters[0].next();
                    if (!cur.done) {
                        return [cur.value, iters];
                    }
                    else {
                        firstDone = true;
                        iters = [null, ys[Symbol.iterator]()];
                    }
                }
                cur = iters[1].next();
                return !cur.done ? [cur.value, iters] : null;
            }, iters);
        });
    }
    exports.append = append;
    function average(xs) {
        let count = 1;
        const sum = reduce((acc, x) => {
            count++;
            return acc + x;
        }, xs);
        return sum / count;
    }
    exports.average = average;
    function averageBy(f, xs) {
        let count = 1;
        const sum = reduce((acc, x) => {
            count++;
            return (count === 2 ? f(acc) : acc) + f(x);
        }, xs);
        return sum / count;
    }
    exports.averageBy = averageBy;
    function concat(xs) {
        return delay(() => {
            const iter = xs[Symbol.iterator]();
            let output = { value: null };
            return unfold((innerIter) => {
                let hasFinished = false;
                while (!hasFinished) {
                    if (innerIter == null) {
                        const cur = iter.next();
                        if (!cur.done) {
                            innerIter = cur.value[Symbol.iterator]();
                        }
                        else {
                            hasFinished = true;
                        }
                    }
                    else {
                        const cur = innerIter.next();
                        if (!cur.done) {
                            output = { value: cur.value };
                            hasFinished = true;
                        }
                        else {
                            innerIter = null;
                        }
                    }
                }
                return innerIter != null && output != null ? [output.value, innerIter] : null;
            }, null);
        });
    }
    exports.concat = concat;
    function collect(f, xs) {
        return concat(map(f, xs));
    }
    exports.collect = collect;
    function choose(f, xs) {
        return delay(() => unfold((iter) => {
            let cur = iter.next();
            while (!cur.done) {
                const y = f(cur.value);
                if (y != null) {
                    return [Option_1.getValue(y), iter];
                }
                cur = iter.next();
            }
            return null;
        }, xs[Symbol.iterator]()));
    }
    exports.choose = choose;
    function compareWith(f, xs, ys) {
        const nonZero = tryFind((i) => i !== 0, map2((x, y) => f(x, y), xs, ys));
        return nonZero != null ? Option_1.getValue(nonZero) : count(xs) - count(ys);
    }
    exports.compareWith = compareWith;
    function delay(f) {
        return {
            [Symbol.iterator]: () => f()[Symbol.iterator](),
        };
    }
    exports.delay = delay;
    function empty() {
        return unfold(() => void 0);
    }
    exports.empty = empty;
    function enumerateWhile(cond, xs) {
        return concat(unfold(() => cond() ? [xs, true] : null));
    }
    exports.enumerateWhile = enumerateWhile;
    function enumerateThenFinally(xs, finalFn) {
        return delay(() => {
            let iter;
            try {
                iter = xs[Symbol.iterator]();
            }
            catch (err) {
                return void 0;
            }
            finally {
                finalFn();
            }
            return unfold((it) => {
                try {
                    const cur = it.next();
                    return !cur.done ? [cur.value, it] : null;
                }
                catch (err) {
                    return void 0;
                }
                finally {
                    finalFn();
                }
            }, iter);
        });
    }
    exports.enumerateThenFinally = enumerateThenFinally;
    function enumerateUsing(disp, work) {
        let isDisposed = false;
        const disposeOnce = () => {
            if (!isDisposed) {
                isDisposed = true;
                disp.Dispose();
            }
        };
        try {
            return enumerateThenFinally(work(disp), disposeOnce);
        }
        catch (err) {
            return void 0;
        }
        finally {
            disposeOnce();
        }
    }
    exports.enumerateUsing = enumerateUsing;
    function exactlyOne(xs) {
        const iter = xs[Symbol.iterator]();
        const fst = iter.next();
        if (fst.done) {
            throw new Error("Seq was empty");
        }
        const snd = iter.next();
        if (!snd.done) {
            throw new Error("Seq had multiple items");
        }
        return fst.value;
    }
    exports.exactlyOne = exactlyOne;
    function except(itemsToExclude, source) {
        const exclusionItems = Array.from(itemsToExclude);
        const testIsNotInExclusionItems = (element) => !exclusionItems.some((excludedItem) => Util_1.equals(excludedItem, element));
        return filter(testIsNotInExclusionItems, source);
    }
    exports.except = except;
    function exists(f, xs) {
        let cur;
        for (const iter = xs[Symbol.iterator]();;) {
            cur = iter.next();
            if (cur.done) {
                break;
            }
            if (f(cur.value)) {
                return true;
            }
        }
        return false;
    }
    exports.exists = exists;
    function exists2(f, xs, ys) {
        let cur1;
        let cur2;
        for (const iter1 = xs[Symbol.iterator](), iter2 = ys[Symbol.iterator]();;) {
            cur1 = iter1.next();
            cur2 = iter2.next();
            if (cur1.done || cur2.done) {
                break;
            }
            if (f(cur1.value, cur2.value)) {
                return true;
            }
        }
        return false;
    }
    exports.exists2 = exists2;
    function filter(f, xs) {
        return delay(() => unfold((iter) => {
            let cur = iter.next();
            while (!cur.done) {
                if (f(cur.value)) {
                    return [cur.value, iter];
                }
                cur = iter.next();
            }
            return null;
        }, xs[Symbol.iterator]()));
    }
    exports.filter = filter;
    function where(f, xs) {
        return filter(f, xs);
    }
    exports.where = where;
    function fold(f, acc, xs) {
        if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
            return xs.reduce(f, acc);
        }
        else {
            let cur;
            for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
                cur = iter.next();
                if (cur.done) {
                    break;
                }
                acc = f(acc, cur.value, i);
            }
            return acc;
        }
    }
    exports.fold = fold;
    function foldBack(f, xs, acc) {
        const arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
        for (let i = arr.length - 1; i >= 0; i--) {
            acc = f(arr[i], acc, i);
        }
        return acc;
    }
    exports.foldBack = foldBack;
    function fold2(f, acc, xs, ys) {
        const iter1 = xs[Symbol.iterator]();
        const iter2 = ys[Symbol.iterator]();
        let cur1;
        let cur2;
        for (let i = 0;; i++) {
            cur1 = iter1.next();
            cur2 = iter2.next();
            if (cur1.done || cur2.done) {
                break;
            }
            acc = f(acc, cur1.value, cur2.value, i);
        }
        return acc;
    }
    exports.fold2 = fold2;
    function foldBack2(f, xs, ys, acc) {
        const ar1 = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
        const ar2 = Array.isArray(ys) || ArrayBuffer.isView(ys) ? ys : Array.from(ys);
        for (let i = ar1.length - 1; i >= 0; i--) {
            acc = f(ar1[i], ar2[i], acc, i);
        }
        return acc;
    }
    exports.foldBack2 = foldBack2;
    function forAll(f, xs) {
        return fold((acc, x) => acc && f(x), true, xs);
    }
    exports.forAll = forAll;
    function forAll2(f, xs, ys) {
        return fold2((acc, x, y) => acc && f(x, y), true, xs, ys);
    }
    exports.forAll2 = forAll2;
    function tryHead(xs) {
        const iter = xs[Symbol.iterator]();
        const cur = iter.next();
        return cur.done ? null : new Option_1.Some(cur.value);
    }
    exports.tryHead = tryHead;
    function head(xs) {
        return __failIfNone(tryHead(xs));
    }
    exports.head = head;
    function initialize(n, f) {
        return delay(() => unfold((i) => i < n ? [f(i), i + 1] : null, 0));
    }
    exports.initialize = initialize;
    function initializeInfinite(f) {
        return delay(() => unfold((i) => [f(i), i + 1], 0));
    }
    exports.initializeInfinite = initializeInfinite;
    function tryItem(i, xs) {
        if (i < 0) {
            return null;
        }
        if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
            return i < xs.length ? new Option_1.Some(xs[i]) : null;
        }
        for (let j = 0, iter = xs[Symbol.iterator]();; j++) {
            const cur = iter.next();
            if (cur.done) {
                break;
            }
            if (j === i) {
                return new Option_1.Some(cur.value);
            }
        }
        return null;
    }
    exports.tryItem = tryItem;
    function item(i, xs) {
        return __failIfNone(tryItem(i, xs));
    }
    exports.item = item;
    function iterate(f, xs) {
        fold((_, x) => f(x), null, xs);
    }
    exports.iterate = iterate;
    function iterate2(f, xs, ys) {
        fold2((_, x, y) => f(x, y), null, xs, ys);
    }
    exports.iterate2 = iterate2;
    function iterateIndexed(f, xs) {
        fold((_, x, i) => f(i, x), null, xs);
    }
    exports.iterateIndexed = iterateIndexed;
    function iterateIndexed2(f, xs, ys) {
        fold2((_, x, y, i) => f(i, x, y), null, xs, ys);
    }
    exports.iterateIndexed2 = iterateIndexed2;
    function isEmpty(xs) {
        const i = xs[Symbol.iterator]();
        return i.next().done;
    }
    exports.isEmpty = isEmpty;
    function tryLast(xs) {
        try {
            return new Option_1.Some(reduce((_, x) => x, xs));
        }
        catch (err) {
            return null;
        }
    }
    exports.tryLast = tryLast;
    function last(xs) {
        return __failIfNone(tryLast(xs));
    }
    exports.last = last;
    // A export function 'length' method causes problems in JavaScript -- https://github.com/Microsoft/TypeScript/issues/442
    function count(xs) {
        return Array.isArray(xs) || ArrayBuffer.isView(xs)
            ? xs.length
            : fold((acc, x) => acc + 1, 0, xs);
    }
    exports.count = count;
    function map(f, xs) {
        return delay(() => unfold((iter) => {
            const cur = iter.next();
            return !cur.done ? [f(cur.value), iter] : null;
        }, xs[Symbol.iterator]()));
    }
    exports.map = map;
    function mapIndexed(f, xs) {
        return delay(() => {
            let i = 0;
            return unfold((iter) => {
                const cur = iter.next();
                return !cur.done ? [f(i++, cur.value), iter] : null;
            }, xs[Symbol.iterator]());
        });
    }
    exports.mapIndexed = mapIndexed;
    function indexed(xs) {
        return mapIndexed((i, x) => [i, x], xs);
    }
    exports.indexed = indexed;
    function map2(f, xs, ys) {
        return delay(() => {
            const iter1 = xs[Symbol.iterator]();
            const iter2 = ys[Symbol.iterator]();
            return unfold(() => {
                const cur1 = iter1.next();
                const cur2 = iter2.next();
                return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
            });
        });
    }
    exports.map2 = map2;
    function mapIndexed2(f, xs, ys) {
        return delay(() => {
            let i = 0;
            const iter1 = xs[Symbol.iterator]();
            const iter2 = ys[Symbol.iterator]();
            return unfold(() => {
                const cur1 = iter1.next();
                const cur2 = iter2.next();
                return !cur1.done && !cur2.done ? [f(i++, cur1.value, cur2.value), null] : null;
            });
        });
    }
    exports.mapIndexed2 = mapIndexed2;
    function map3(f, xs, ys, zs) {
        return delay(() => {
            const iter1 = xs[Symbol.iterator]();
            const iter2 = ys[Symbol.iterator]();
            const iter3 = zs[Symbol.iterator]();
            return unfold(() => {
                const cur1 = iter1.next();
                const cur2 = iter2.next();
                const cur3 = iter3.next();
                return !cur1.done && !cur2.done && !cur3.done ? [f(cur1.value, cur2.value, cur3.value), null] : null;
            });
        });
    }
    exports.map3 = map3;
    function chunkBySize(size, xs) {
        const result = Array_2.chunkBySize(size, Array.from(xs));
        return ofArray(result.map(ofArray));
    }
    exports.chunkBySize = chunkBySize;
    function mapFold(f, acc, xs, transform) {
        const result = [];
        let r;
        let cur;
        for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
            cur = iter.next();
            if (cur.done) {
                break;
            }
            [r, acc] = f(acc, cur.value);
            result.push(r);
        }
        return transform !== void 0 ? [transform(result), acc] : [result, acc];
    }
    exports.mapFold = mapFold;
    function mapFoldBack(f, xs, acc, transform) {
        const arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
        const result = [];
        let r;
        for (let i = arr.length - 1; i >= 0; i--) {
            [r, acc] = f(arr[i], acc);
            result.push(r);
        }
        return transform !== void 0 ? [transform(result), acc] : [result, acc];
    }
    exports.mapFoldBack = mapFoldBack;
    function max(xs) {
        return reduce((acc, x) => Util_1.compare(acc, x) === 1 ? acc : x, xs);
    }
    exports.max = max;
    function maxBy(f, xs) {
        return reduce((acc, x) => Util_1.compare(f(acc), f(x)) === 1 ? acc : x, xs);
    }
    exports.maxBy = maxBy;
    function min(xs) {
        return reduce((acc, x) => Util_1.compare(acc, x) === -1 ? acc : x, xs);
    }
    exports.min = min;
    function minBy(f, xs) {
        return reduce((acc, x) => Util_1.compare(f(acc), f(x)) === -1 ? acc : x, xs);
    }
    exports.minBy = minBy;
    function pairwise(xs) {
        return skip(2, scan((last, next) => [last[1], next], [0, 0], xs));
    }
    exports.pairwise = pairwise;
    function permute(f, xs) {
        return ofArray(Array_1.permute(f, Array.from(xs)));
    }
    exports.permute = permute;
    function rangeStep(first, step, last) {
        if (step === 0) {
            throw new Error("Step cannot be 0");
        }
        return delay(() => unfold((x) => step > 0 && x <= last || step < 0 && x >= last ? [x, x + step] : null, first));
    }
    exports.rangeStep = rangeStep;
    function rangeChar(first, last) {
        return delay(() => unfold((x) => x <= last ? [x, String.fromCharCode(x.charCodeAt(0) + 1)] : null, first));
    }
    exports.rangeChar = rangeChar;
    function range(first, last) {
        return rangeStep(first, 1, last);
    }
    exports.range = range;
    function readOnly(xs) {
        return map((x) => x, xs);
    }
    exports.readOnly = readOnly;
    function reduce(f, xs) {
        if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
            return xs.reduce(f);
        }
        const iter = xs[Symbol.iterator]();
        let cur = iter.next();
        if (cur.done) {
            throw new Error("Seq was empty");
        }
        let acc = cur.value;
        while (true) {
            cur = iter.next();
            if (cur.done) {
                break;
            }
            acc = f(acc, cur.value);
        }
        return acc;
    }
    exports.reduce = reduce;
    function reduceBack(f, xs) {
        const ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
        if (ar.length === 0) {
            throw new Error("Seq was empty");
        }
        let acc = ar[ar.length - 1];
        for (let i = ar.length - 2; i >= 0; i--) {
            acc = f(ar[i], acc, i);
        }
        return acc;
    }
    exports.reduceBack = reduceBack;
    function replicate(n, x) {
        return initialize(n, () => x);
    }
    exports.replicate = replicate;
    function reverse(xs) {
        const ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
        return ofArray(ar.reverse());
    }
    exports.reverse = reverse;
    function scan(f, seed, xs) {
        return delay(() => {
            const iter = xs[Symbol.iterator]();
            return unfold((acc) => {
                if (acc == null) {
                    return [seed, seed];
                }
                const cur = iter.next();
                if (!cur.done) {
                    acc = f(acc, cur.value);
                    return [acc, acc];
                }
                return void 0;
            }, null);
        });
    }
    exports.scan = scan;
    function scanBack(f, xs, seed) {
        return reverse(scan((acc, x) => f(x, acc), seed, reverse(xs)));
    }
    exports.scanBack = scanBack;
    function singleton(y) {
        return unfold((x) => x != null ? [x, null] : null, y);
    }
    exports.singleton = singleton;
    function skip(n, xs) {
        return {
            [Symbol.iterator]: () => {
                const iter = xs[Symbol.iterator]();
                for (let i = 1; i <= n; i++) {
                    if (iter.next().done) {
                        throw new Error("Seq has not enough elements");
                    }
                }
                return iter;
            },
        };
    }
    exports.skip = skip;
    function skipWhile(f, xs) {
        return delay(() => {
            let hasPassed = false;
            return filter((x) => hasPassed || (hasPassed = !f(x)), xs);
        });
    }
    exports.skipWhile = skipWhile;
    function sortWith(f, xs) {
        const ys = Array.from(xs);
        return ofArray(ys.sort(f));
    }
    exports.sortWith = sortWith;
    function sum(xs) {
        return fold((acc, x) => acc + x, 0, xs);
    }
    exports.sum = sum;
    function sumBy(f, xs) {
        return fold((acc, x) => acc + f(x), 0, xs);
    }
    exports.sumBy = sumBy;
    function tail(xs) {
        const iter = xs[Symbol.iterator]();
        const cur = iter.next();
        if (cur.done) {
            throw new Error("Seq was empty");
        }
        return {
            [Symbol.iterator]: () => iter,
        };
    }
    exports.tail = tail;
    function take(n, xs, truncate = false) {
        return delay(() => {
            const iter = xs[Symbol.iterator]();
            return unfold((i) => {
                if (i < n) {
                    const cur = iter.next();
                    if (!cur.done) {
                        return [cur.value, i + 1];
                    }
                    if (!truncate) {
                        throw new Error("Seq has not enough elements");
                    }
                }
                return void 0;
            }, 0);
        });
    }
    exports.take = take;
    function truncate(n, xs) {
        return take(n, xs, true);
    }
    exports.truncate = truncate;
    function takeWhile(f, xs) {
        return delay(() => {
            const iter = xs[Symbol.iterator]();
            return unfold((i) => {
                const cur = iter.next();
                if (!cur.done && f(cur.value)) {
                    return [cur.value, null];
                }
                return void 0;
            }, 0);
        });
    }
    exports.takeWhile = takeWhile;
    function tryFind(f, xs, defaultValue) {
        for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
            const cur = iter.next();
            if (cur.done) {
                break;
            }
            if (f(cur.value, i)) {
                return new Option_1.Some(cur.value);
            }
        }
        return defaultValue === void 0 ? null : new Option_1.Some(defaultValue);
    }
    exports.tryFind = tryFind;
    function find(f, xs) {
        return __failIfNone(tryFind(f, xs));
    }
    exports.find = find;
    function tryFindBack(f, xs, defaultValue) {
        const arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
        return tryFind(f, arr.reverse(), defaultValue);
    }
    exports.tryFindBack = tryFindBack;
    function findBack(f, xs) {
        return __failIfNone(tryFindBack(f, xs));
    }
    exports.findBack = findBack;
    function tryFindIndex(f, xs) {
        for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
            const cur = iter.next();
            if (cur.done) {
                break;
            }
            if (f(cur.value, i)) {
                return i;
            }
        }
        return null;
    }
    exports.tryFindIndex = tryFindIndex;
    function findIndex(f, xs) {
        return __failIfNone(tryFindIndex(f, xs));
    }
    exports.findIndex = findIndex;
    function tryFindIndexBack(f, xs) {
        const arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
        for (let i = arr.length - 1; i >= 0; i--) {
            if (f(arr[i], i)) {
                return i;
            }
        }
        return null;
    }
    exports.tryFindIndexBack = tryFindIndexBack;
    function findIndexBack(f, xs) {
        return __failIfNone(tryFindIndexBack(f, xs));
    }
    exports.findIndexBack = findIndexBack;
    function tryPick(f, xs) {
        for (let i = 0, iter = xs[Symbol.iterator]();; i++) {
            const cur = iter.next();
            if (cur.done) {
                break;
            }
            const y = f(cur.value, i);
            if (y != null) {
                return y;
            }
        }
        return null;
    }
    exports.tryPick = tryPick;
    function pick(f, xs) {
        return __failIfNone(tryPick(f, xs));
    }
    exports.pick = pick;
    function unfold(f, fst) {
        return {
            [Symbol.iterator]: () => {
                // Capture a copy of the first value in the closure
                // so the sequence is restarted every time, see #1230
                let acc = fst;
                return {
                    next: () => {
                        const res = f(acc);
                        if (res != null) {
                            acc = res[1];
                            return { done: false, value: res[0] };
                        }
                        return { done: true };
                    },
                };
            },
        };
    }
    exports.unfold = unfold;
    function zip(xs, ys) {
        return map2((x, y) => [x, y], xs, ys);
    }
    exports.zip = zip;
    function zip3(xs, ys, zs) {
        return map3((x, y, z) => [x, y, z], xs, ys, zs);
    }
    exports.zip3 = zip3;
});
