define(["require", "exports", "./ListClass", "./ListClass", "./Util", "./Util", "./Util", "./Comparer", "./Symbol", "./Seq", "./Seq", "./Seq", "./Seq", "./Seq"], function (require, exports, ListClass_1, ListClass_2, Util_1, Util_2, Util_3, Comparer_1, Symbol_1, Seq_1, Seq_2, Seq_3, Seq_4, Seq_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function groupBy(f, xs) {
        const keys = [], iter = xs[Symbol.iterator]();
        let acc = create(), cur = iter.next();
        while (!cur.done) {
            const k = f(cur.value), vs = tryFind(k, acc);
            if (vs == null) {
                keys.push(k);
                acc = add(k, [cur.value], acc);
            }
            else {
                vs.push(cur.value);
            }
            cur = iter.next();
        }
        return keys.map(k => [k, acc.get(k)]);
    }
    exports.groupBy = groupBy;
    function countBy(f, xs) {
        return groupBy(f, xs).map(kv => [kv[0], kv[1].length]);
    }
    exports.countBy = countBy;
    class MapTree {
        constructor(tag, data) {
            this.tag = tag | 0;
            this.data = data;
        }
    }
    exports.MapTree = MapTree;
    function tree_sizeAux(acc, m) {
        sizeAux: while (true) {
            if (m.tag === 1) {
                return acc + 1 | 0;
            }
            else if (m.tag === 2) {
                acc = tree_sizeAux(acc + 1, m.data[2]);
                m = m.data[3];
                continue sizeAux;
            }
            else {
                return acc | 0;
            }
        }
    }
    function tree_size(x) {
        return tree_sizeAux(0, x);
    }
    function tree_empty() {
        return new MapTree(0);
    }
    function tree_height(_arg1) {
        return _arg1.tag === 1 ? 1 : _arg1.tag === 2 ? _arg1.data[4] : 0;
    }
    function tree_isEmpty(m) {
        return m.tag === 0 ? true : false;
    }
    function tree_mk(l, k, v, r) {
        const matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
        switch (matchValue) {
            case 0:
                return new MapTree(1, [k, v]);
            case 1:
                const hl = tree_height(l) | 0;
                const hr = tree_height(r) | 0;
                const m = (hl < hr ? hr : hl) | 0;
                return new MapTree(2, [k, v, l, r, m + 1]);
        }
        throw new Error("internal error: Map.tree_mk");
    }
    ;
    function tree_rebalance(t1, k, v, t2) {
        var t1h = tree_height(t1);
        var t2h = tree_height(t2);
        if (t2h > t1h + 2) {
            if (t2.tag === 2) {
                if (tree_height(t2.data[2]) > t1h + 1) {
                    if (t2.data[2].tag === 2) {
                        return tree_mk(tree_mk(t1, k, v, t2.data[2].data[2]), t2.data[2].data[0], t2.data[2].data[1], tree_mk(t2.data[2].data[3], t2.data[0], t2.data[1], t2.data[3]));
                    }
                    else {
                        throw new Error("rebalance");
                    }
                }
                else {
                    return tree_mk(tree_mk(t1, k, v, t2.data[2]), t2.data[0], t2.data[1], t2.data[3]);
                }
            }
            else {
                throw new Error("rebalance");
            }
        }
        else {
            if (t1h > t2h + 2) {
                if (t1.tag === 2) {
                    if (tree_height(t1.data[3]) > t2h + 1) {
                        if (t1.data[3].tag === 2) {
                            return tree_mk(tree_mk(t1.data[2], t1.data[0], t1.data[1], t1.data[3].data[2]), t1.data[3].data[0], t1.data[3].data[1], tree_mk(t1.data[3].data[3], k, v, t2));
                        }
                        else {
                            throw new Error("rebalance");
                        }
                    }
                    else {
                        return tree_mk(t1.data[2], t1.data[0], t1.data[1], tree_mk(t1.data[3], k, v, t2));
                    }
                }
                else {
                    throw new Error("rebalance");
                }
            }
            else {
                return tree_mk(t1, k, v, t2);
            }
        }
    }
    function tree_add(comparer, k, v, m) {
        if (m.tag === 1) {
            const c = comparer.Compare(k, m.data[0]);
            if (c < 0) {
                return new MapTree(2, [k, v, new MapTree(0), m, 2]);
            }
            else if (c === 0) {
                return new MapTree(1, [k, v]);
            }
            return new MapTree(2, [k, v, m, new MapTree(0), 2]);
        }
        else if (m.tag === 2) {
            const c = comparer.Compare(k, m.data[0]);
            if (c < 0) {
                return tree_rebalance(tree_add(comparer, k, v, m.data[2]), m.data[0], m.data[1], m.data[3]);
            }
            else if (c === 0) {
                return new MapTree(2, [k, v, m.data[2], m.data[3], m.data[4]]);
            }
            return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_add(comparer, k, v, m.data[3]));
        }
        return new MapTree(1, [k, v]);
    }
    function tree_find(comparer, k, m) {
        const res = tree_tryFind(comparer, k, m);
        if (res != null)
            return res;
        throw new Error("key not found");
    }
    function tree_tryFind(comparer, k, m) {
        tryFind: while (true) {
            if (m.tag === 1) {
                const c = comparer.Compare(k, m.data[0]) | 0;
                if (c === 0) {
                    return m.data[1];
                }
                else {
                    return null;
                }
            }
            else if (m.tag === 2) {
                const c_1 = comparer.Compare(k, m.data[0]) | 0;
                if (c_1 < 0) {
                    comparer = comparer;
                    k = k;
                    m = m.data[2];
                    continue tryFind;
                }
                else if (c_1 === 0) {
                    return m.data[1];
                }
                else {
                    comparer = comparer;
                    k = k;
                    m = m.data[3];
                    continue tryFind;
                }
            }
            else {
                return null;
            }
        }
    }
    function tree_partition1(comparer, f, k, v, acc1, acc2) {
        return f(k, v) ? [tree_add(comparer, k, v, acc1), acc2] : [acc1, tree_add(comparer, k, v, acc2)];
    }
    function tree_partitionAux(comparer, f, s, acc_0, acc_1) {
        const acc = [acc_0, acc_1];
        if (s.tag === 1) {
            return tree_partition1(comparer, f, s.data[0], s.data[1], acc[0], acc[1]);
        }
        else if (s.tag === 2) {
            const acc_2 = tree_partitionAux(comparer, f, s.data[3], acc[0], acc[1]);
            const acc_3 = tree_partition1(comparer, f, s.data[0], s.data[1], acc_2[0], acc_2[1]);
            return tree_partitionAux(comparer, f, s.data[2], acc_3[0], acc_3[1]);
        }
        return acc;
    }
    function tree_partition(comparer, f, s) {
        return tree_partitionAux(comparer, f, s, tree_empty(), tree_empty());
    }
    function tree_filter1(comparer, f, k, v, acc) {
        return f(k, v) ? tree_add(comparer, k, v, acc) : acc;
    }
    function tree_filterAux(comparer, f, s, acc) {
        return s.tag === 1 ? tree_filter1(comparer, f, s.data[0], s.data[1], acc) : s.tag === 2 ? tree_filterAux(comparer, f, s.data[3], tree_filter1(comparer, f, s.data[0], s.data[1], tree_filterAux(comparer, f, s.data[2], acc))) : acc;
    }
    function tree_filter(comparer, f, s) {
        return tree_filterAux(comparer, f, s, tree_empty());
    }
    function tree_spliceOutSuccessor(m) {
        if (m.tag === 1) {
            return [m.data[0], m.data[1], new MapTree(0)];
        }
        else if (m.tag === 2) {
            if (m.data[2].tag === 0) {
                return [m.data[0], m.data[1], m.data[3]];
            }
            else {
                const kvl = tree_spliceOutSuccessor(m.data[2]);
                return [kvl[0], kvl[1], tree_mk(kvl[2], m.data[0], m.data[1], m.data[3])];
            }
        }
        throw new Error("internal error: Map.spliceOutSuccessor");
    }
    function tree_remove(comparer, k, m) {
        if (m.tag === 1) {
            const c = comparer.Compare(k, m.data[0]);
            if (c === 0) {
                return new MapTree(0);
            }
            else {
                return m;
            }
        }
        else if (m.tag === 2) {
            const c = comparer.Compare(k, m.data[0]);
            if (c < 0) {
                return tree_rebalance(tree_remove(comparer, k, m.data[2]), m.data[0], m.data[1], m.data[3]);
            }
            else if (c === 0) {
                if (m.data[2].tag === 0) {
                    return m.data[3];
                }
                else {
                    if (m.data[3].tag === 0) {
                        return m.data[2];
                    }
                    else {
                        const input = tree_spliceOutSuccessor(m.data[3]);
                        return tree_mk(m.data[2], input[0], input[1], input[2]);
                    }
                }
            }
            else {
                return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_remove(comparer, k, m.data[3]));
            }
        }
        else {
            return tree_empty();
        }
    }
    function tree_mem(comparer, k, m) {
        mem: while (true) {
            if (m.tag === 1) {
                return comparer.Compare(k, m.data[0]) === 0;
            }
            else if (m.tag === 2) {
                const c = comparer.Compare(k, m.data[0]) | 0;
                if (c < 0) {
                    comparer = comparer;
                    k = k;
                    m = m.data[2];
                    continue mem;
                }
                else if (c === 0) {
                    return true;
                }
                else {
                    comparer = comparer;
                    k = k;
                    m = m.data[3];
                    continue mem;
                }
            }
            else {
                return false;
            }
        }
    }
    function tree_iter(f, m) {
        if (m.tag === 1) {
            f(m.data[0], m.data[1]);
        }
        else if (m.tag === 2) {
            tree_iter(f, m.data[2]);
            f(m.data[0], m.data[1]);
            tree_iter(f, m.data[3]);
        }
    }
    function tree_tryPick(f, m) {
        if (m.tag === 1) {
            return f(m.data[0], m.data[1]);
        }
        else if (m.tag === 2) {
            var matchValue = tree_tryPick(f, m.data[2]);
            if (matchValue == null) {
                var matchValue_1 = f(m.data[0], m.data[1]);
                if (matchValue_1 == null) {
                    return tree_tryPick(f, m.data[3]);
                }
                else {
                    var res = matchValue_1;
                    return res;
                }
            }
            else {
                return matchValue;
            }
        }
        else {
            return null;
        }
    }
    function tree_exists(f, m) {
        return m.tag === 1 ? f(m.data[0], m.data[1]) : m.tag === 2 ? (tree_exists(f, m.data[2]) ? true : f(m.data[0], m.data[1])) ? true : tree_exists(f, m.data[3]) : false;
    }
    function tree_forall(f, m) {
        return m.tag === 1 ? f(m.data[0], m.data[1]) : m.tag === 2 ? (tree_forall(f, m.data[2]) ? f(m.data[0], m.data[1]) : false) ? tree_forall(f, m.data[3]) : false : true;
    }
    function tree_mapi(f, m) {
        return m.tag === 1 ? new MapTree(1, [m.data[0], f(m.data[0], m.data[1])]) : m.tag === 2 ? new MapTree(2, [m.data[0], f(m.data[0], m.data[1]), tree_mapi(f, m.data[2]), tree_mapi(f, m.data[3]), m.data[4]]) : tree_empty();
    }
    function tree_foldBack(f, m, x) {
        return m.tag === 1 ? f(m.data[0], m.data[1], x) : m.tag === 2 ? tree_foldBack(f, m.data[2], f(m.data[0], m.data[1], tree_foldBack(f, m.data[3], x))) : x;
    }
    function tree_fold(f, x, m) {
        return m.tag === 1 ? f(x, m.data[0], m.data[1]) : m.tag === 2 ? tree_fold(f, f(tree_fold(f, x, m.data[2]), m.data[0], m.data[1]), m.data[3]) : x;
    }
    function tree_mkFromEnumerator(comparer, acc, e) {
        let cur = e.next();
        while (!cur.done) {
            acc = tree_add(comparer, cur.value[0], cur.value[1], acc);
            cur = e.next();
        }
        return acc;
    }
    function tree_ofSeq(comparer, c) {
        var ie = c[Symbol.iterator]();
        return tree_mkFromEnumerator(comparer, tree_empty(), ie);
    }
    function tree_collapseLHS(stack) {
        if (stack.tail != null) {
            if (stack.head.tag === 1) {
                return stack;
            }
            else if (stack.head.tag === 2) {
                return tree_collapseLHS(ListClass_2.ofArray([
                    stack.head.data[2],
                    new MapTree(1, [stack.head.data[0], stack.head.data[1]]),
                    stack.head.data[3]
                ], stack.tail));
            }
            else {
                return tree_collapseLHS(stack.tail);
            }
        }
        else {
            return new ListClass_1.default();
        }
    }
    function tree_mkIterator(s) {
        return { stack: tree_collapseLHS(new ListClass_1.default(s, new ListClass_1.default())), started: false };
    }
    function tree_moveNext(i) {
        function current(i) {
            if (i.stack.tail == null) {
                return null;
            }
            else if (i.stack.head.tag === 1) {
                return [i.stack.head.data[0], i.stack.head.data[1]];
            }
            throw new Error("Please report error: Map iterator, unexpected stack for current");
        }
        if (i.started) {
            if (i.stack.tail == null) {
                return { done: true, value: null };
            }
            else {
                if (i.stack.head.tag === 1) {
                    i.stack = tree_collapseLHS(i.stack.tail);
                    return {
                        done: i.stack.tail == null,
                        value: current(i)
                    };
                }
                else {
                    throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
                }
            }
        }
        else {
            i.started = true;
            return {
                done: i.stack.tail == null,
                value: current(i)
            };
        }
        ;
    }
    class FableMap {
        constructor() { }
        ToString() {
            return "map [" + Array.from(this).map(x => Util_1.toString(x)).join("; ") + "]";
        }
        Equals(m2) {
            return this.CompareTo(m2) === 0;
        }
        CompareTo(m2) {
            return this === m2 ? 0 : Seq_5.compareWith((kvp1, kvp2) => {
                var c = this.comparer.Compare(kvp1[0], kvp2[0]);
                return c !== 0 ? c : Util_3.compare(kvp1[1], kvp2[1]);
            }, this, m2);
        }
        [Symbol.iterator]() {
            let i = tree_mkIterator(this.tree);
            return {
                next: () => tree_moveNext(i)
            };
        }
        entries() {
            return this[Symbol.iterator]();
        }
        keys() {
            return Seq_1.map(kv => kv[0], this);
        }
        values() {
            return Seq_1.map(kv => kv[1], this);
        }
        get(k) {
            return tree_find(this.comparer, k, this.tree);
        }
        has(k) {
            return tree_mem(this.comparer, k, this.tree);
        }
        set(k, v) {
            this.tree = tree_add(this.comparer, k, v, this.tree);
        }
        delete(k) {
            const oldSize = tree_size(this.tree);
            this.tree = tree_remove(this.comparer, k, this.tree);
            return oldSize > tree_size(this.tree);
        }
        clear() {
            this.tree = tree_empty();
        }
        get size() {
            return tree_size(this.tree);
        }
        [Symbol_1.default.reflection]() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpMap",
                interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
            };
        }
    }
    exports.default = FableMap;
    function from(comparer, tree) {
        let map = new FableMap();
        map.tree = tree;
        map.comparer = comparer || new Comparer_1.default();
        return map;
    }
    function create(ie, comparer) {
        comparer = comparer || new Comparer_1.default();
        return from(comparer, ie ? tree_ofSeq(comparer, ie) : tree_empty());
    }
    exports.create = create;
    function add(k, v, map) {
        return from(map.comparer, tree_add(map.comparer, k, v, map.tree));
    }
    exports.add = add;
    function remove(item, map) {
        return from(map.comparer, tree_remove(map.comparer, item, map.tree));
    }
    exports.remove = remove;
    function containsValue(v, map) {
        return Seq_2.fold((acc, k) => acc || Util_2.equals(map.get(k), v), false, map.keys());
    }
    exports.containsValue = containsValue;
    function tryGetValue(map, key, defaultValue) {
        return map.has(key) ? [true, map.get(key)] : [false, defaultValue];
    }
    exports.tryGetValue = tryGetValue;
    function exists(f, map) {
        return tree_exists(f, map.tree);
    }
    exports.exists = exists;
    function find(k, map) {
        return tree_find(map.comparer, k, map.tree);
    }
    exports.find = find;
    function tryFind(k, map) {
        return tree_tryFind(map.comparer, k, map.tree);
    }
    exports.tryFind = tryFind;
    function filter(f, map) {
        return from(map.comparer, tree_filter(map.comparer, f, map.tree));
    }
    exports.filter = filter;
    function fold(f, seed, map) {
        return tree_fold(f, seed, map.tree);
    }
    exports.fold = fold;
    function foldBack(f, map, seed) {
        return tree_foldBack(f, map.tree, seed);
    }
    exports.foldBack = foldBack;
    function forAll(f, map) {
        return tree_forall(f, map.tree);
    }
    exports.forAll = forAll;
    function isEmpty(map) {
        return tree_isEmpty(map.tree);
    }
    exports.isEmpty = isEmpty;
    function iterate(f, map) {
        tree_iter(f, map.tree);
    }
    exports.iterate = iterate;
    function map(f, map) {
        return from(map.comparer, tree_mapi(f, map.tree));
    }
    exports.map = map;
    function partition(f, map) {
        const rs = tree_partition(map.comparer, f, map.tree);
        return [from(map.comparer, rs[0]), from(map.comparer, rs[1])];
    }
    exports.partition = partition;
    function findKey(f, map) {
        return Seq_3.pick(kv => f(kv[0], kv[1]) ? kv[0] : null, map);
    }
    exports.findKey = findKey;
    function tryFindKey(f, map) {
        return Seq_4.tryPick(kv => f(kv[0], kv[1]) ? kv[0] : null, map);
    }
    exports.tryFindKey = tryFindKey;
    function pick(f, map) {
        const res = tryPick(f, map);
        if (res != null)
            return res;
        throw new Error("key not found");
    }
    exports.pick = pick;
    function tryPick(f, map) {
        return tree_tryPick(f, map.tree);
    }
    exports.tryPick = tryPick;
});
