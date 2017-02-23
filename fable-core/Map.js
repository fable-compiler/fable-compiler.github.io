define(["require", "exports", "./ListClass", "./ListClass", "./Util", "./Util", "./Util", "./Comparer", "./Symbol", "./Seq", "./Seq", "./Seq", "./Seq", "./Seq"], function (require, exports, ListClass_1, ListClass_2, Util_1, Util_2, Util_3, Comparer_1, Symbol_1, Seq_1, Seq_2, Seq_3, Seq_4, Seq_5) {
    "use strict";
    function groupBy(f, xs) {
        var keys = [], iter = xs[Symbol.iterator]();
        var acc = create(), cur = iter.next();
        while (!cur.done) {
            var k = f(cur.value), vs = tryFind(k, acc);
            if (vs == null) {
                keys.push(k);
                acc = add(k, [cur.value], acc);
            }
            else {
                vs.push(cur.value);
            }
            cur = iter.next();
        }
        return keys.map(function (k) { return [k, acc.get(k)]; });
    }
    exports.groupBy = groupBy;
    function countBy(f, xs) {
        return groupBy(f, xs).map(function (kv) { return [kv[0], kv[1].length]; });
    }
    exports.countBy = countBy;
    var MapTree = (function () {
        function MapTree(tag, a, b, c, d, e) {
            this.size = arguments.length - 1 | 0;
            this.tag = tag | 0;
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.e = e;
        }
        return MapTree;
    }());
    exports.MapTree = MapTree;
    function tree_sizeAux(acc, m) {
        sizeAux: while (true) {
            if (m.tag === 1) {
                return acc + 1 | 0;
            }
            else if (m.tag === 2) {
                acc = tree_sizeAux(acc + 1, m.c);
                m = m.d;
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
        return _arg1.tag === 1 ? 1 : _arg1.tag === 2 ? _arg1.e : 0;
    }
    function tree_isEmpty(m) {
        return m.tag === 0 ? true : false;
    }
    function tree_mk(l, k, v, r) {
        var matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
        switch (matchValue) {
            case 0:
                return new MapTree(1, k, v);
            case 1:
                var hl = tree_height(l) | 0;
                var hr = tree_height(r) | 0;
                var m = (hl < hr ? hr : hl) | 0;
                return new MapTree(2, k, v, l, r, m + 1);
        }
        throw new Error("internal error: Map.tree_mk");
    }
    ;
    function tree_rebalance(t1, k, v, t2) {
        var t1h = tree_height(t1);
        var t2h = tree_height(t2);
        if (t2h > t1h + 2) {
            if (t2.tag === 2) {
                if (tree_height(t2.c) > t1h + 1) {
                    if (t2.c.tag === 2) {
                        return tree_mk(tree_mk(t1, k, v, t2.c.c), t2.c.a, t2.c.b, tree_mk(t2.c.d, t2.a, t2.b, t2.d));
                    }
                    else {
                        throw new Error("rebalance");
                    }
                }
                else {
                    return tree_mk(tree_mk(t1, k, v, t2.c), t2.a, t2.b, t2.d);
                }
            }
            else {
                throw new Error("rebalance");
            }
        }
        else {
            if (t1h > t2h + 2) {
                if (t1.tag === 2) {
                    if (tree_height(t1.d) > t2h + 1) {
                        if (t1.d.tag === 2) {
                            return tree_mk(tree_mk(t1.c, t1.a, t1.b, t1.d.c), t1.d.a, t1.d.b, tree_mk(t1.d.d, k, v, t2));
                        }
                        else {
                            throw new Error("rebalance");
                        }
                    }
                    else {
                        return tree_mk(t1.c, t1.a, t1.b, tree_mk(t1.d, k, v, t2));
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
            var c = comparer.Compare(k, m.a);
            if (c < 0) {
                return new MapTree(2, k, v, new MapTree(0), m, 2);
            }
            else if (c === 0) {
                return new MapTree(1, k, v);
            }
            return new MapTree(2, k, v, m, new MapTree(0), 2);
        }
        else if (m.tag === 2) {
            var c = comparer.Compare(k, m.a);
            if (c < 0) {
                return tree_rebalance(tree_add(comparer, k, v, m.c), m.a, m.b, m.d);
            }
            else if (c === 0) {
                return new MapTree(2, k, v, m.c, m.d, m.e);
            }
            return tree_rebalance(m.c, m.a, m.b, tree_add(comparer, k, v, m.d));
        }
        return new MapTree(1, k, v);
    }
    function tree_find(comparer, k, m) {
        var res = tree_tryFind(comparer, k, m);
        if (res != null)
            return res;
        throw new Error("key not found");
    }
    function tree_tryFind(comparer, k, m) {
        tryFind: while (true) {
            if (m.tag === 1) {
                var c = comparer.Compare(k, m.a) | 0;
                if (c === 0) {
                    return m.b;
                }
                else {
                    return null;
                }
            }
            else if (m.tag === 2) {
                var c_1 = comparer.Compare(k, m.a) | 0;
                if (c_1 < 0) {
                    comparer = comparer;
                    k = k;
                    m = m.c;
                    continue tryFind;
                }
                else if (c_1 === 0) {
                    return m.b;
                }
                else {
                    comparer = comparer;
                    k = k;
                    m = m.d;
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
        var acc = [acc_0, acc_1];
        if (s.tag === 1) {
            return tree_partition1(comparer, f, s.a, s.b, acc[0], acc[1]);
        }
        else if (s.tag === 2) {
            var acc_2 = tree_partitionAux(comparer, f, s.d, acc[0], acc[1]);
            var acc_3 = tree_partition1(comparer, f, s.a, s.b, acc_2[0], acc_2[1]);
            return tree_partitionAux(comparer, f, s.c, acc_3[0], acc_3[1]);
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
        return s.tag === 1 ? tree_filter1(comparer, f, s.a, s.b, acc) : s.tag === 2 ? tree_filterAux(comparer, f, s.d, tree_filter1(comparer, f, s.a, s.b, tree_filterAux(comparer, f, s.c, acc))) : acc;
    }
    function tree_filter(comparer, f, s) {
        return tree_filterAux(comparer, f, s, tree_empty());
    }
    function tree_spliceOutSuccessor(m) {
        if (m.tag === 1) {
            return [m.a, m.b, new MapTree(0)];
        }
        else if (m.tag === 2) {
            if (m.c.tag === 0) {
                return [m.a, m.b, m.d];
            }
            else {
                var kvl = tree_spliceOutSuccessor(m.c);
                return [kvl[0], kvl[1], tree_mk(kvl[2], m.a, m.b, m.d)];
            }
        }
        throw new Error("internal error: Map.spliceOutSuccessor");
    }
    function tree_remove(comparer, k, m) {
        if (m.tag === 1) {
            var c = comparer.Compare(k, m.a);
            if (c === 0) {
                return new MapTree(0);
            }
            else {
                return m;
            }
        }
        else if (m.tag === 2) {
            var c = comparer.Compare(k, m.a);
            if (c < 0) {
                return tree_rebalance(tree_remove(comparer, k, m.c), m.a, m.b, m.d);
            }
            else if (c === 0) {
                if (m.c.tag === 0) {
                    return m.d;
                }
                else {
                    if (m.d.tag === 0) {
                        return m.c;
                    }
                    else {
                        var input = tree_spliceOutSuccessor(m.d);
                        return tree_mk(m.c, input[0], input[1], input[2]);
                    }
                }
            }
            else {
                return tree_rebalance(m.c, m.a, m.b, tree_remove(comparer, k, m.d));
            }
        }
        else {
            return tree_empty();
        }
    }
    function tree_mem(comparer, k, m) {
        mem: while (true) {
            if (m.tag === 1) {
                return comparer.Compare(k, m.a) === 0;
            }
            else if (m.tag === 2) {
                var c = comparer.Compare(k, m.a) | 0;
                if (c < 0) {
                    comparer = comparer;
                    k = k;
                    m = m.c;
                    continue mem;
                }
                else if (c === 0) {
                    return true;
                }
                else {
                    comparer = comparer;
                    k = k;
                    m = m.d;
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
            f(m.a, m.b);
        }
        else if (m.tag === 2) {
            tree_iter(f, m.c);
            f(m.a, m.b);
            tree_iter(f, m.d);
        }
    }
    function tree_tryPick(f, m) {
        if (m.tag === 1) {
            return f(m.a, m.b);
        }
        else if (m.tag === 2) {
            var matchValue = tree_tryPick(f, m.c);
            if (matchValue == null) {
                var matchValue_1 = f(m.a, m.b);
                if (matchValue_1 == null) {
                    return tree_tryPick(f, m.d);
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
        return m.tag === 1 ? f(m.a, m.b) : m.tag === 2 ? (tree_exists(f, m.c) ? true : f(m.a, m.b)) ? true : tree_exists(f, m.d) : false;
    }
    function tree_forall(f, m) {
        return m.tag === 1 ? f(m.a, m.b) : m.tag === 2 ? (tree_forall(f, m.c) ? f(m.a, m.b) : false) ? tree_forall(f, m.d) : false : true;
    }
    function tree_mapi(f, m) {
        return m.tag === 1 ? new MapTree(1, m.a, f(m.a, m.b)) : m.tag === 2 ? new MapTree(2, m.a, f(m.a, m.b), tree_mapi(f, m.c), tree_mapi(f, m.d), m.e) : tree_empty();
    }
    function tree_foldBack(f, m, x) {
        return m.tag === 1 ? f(m.a, m.b, x) : m.tag === 2 ? tree_foldBack(f, m.c, f(m.a, m.b, tree_foldBack(f, m.d, x))) : x;
    }
    function tree_fold(f, x, m) {
        return m.tag === 1 ? f(x, m.a, m.b) : m.tag === 2 ? tree_fold(f, f(tree_fold(f, x, m.c), m.a, m.b), m.d) : x;
    }
    function tree_mkFromEnumerator(comparer, acc, e) {
        var cur = e.next();
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
                    stack.head.c,
                    new MapTree(1, stack.head.a, stack.head.b),
                    stack.head.d
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
                return [i.stack.head.a, i.stack.head.b];
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
    var FableMap = (function () {
        function FableMap() {
        }
        FableMap.prototype.ToString = function () {
            return "map [" + Array.from(this).map(Util_1.toString).join("; ") + "]";
        };
        FableMap.prototype.Equals = function (m2) {
            return this.CompareTo(m2) === 0;
        };
        FableMap.prototype.CompareTo = function (m2) {
            var _this = this;
            return this === m2 ? 0 : Seq_5.compareWith(function (kvp1, kvp2) {
                var c = _this.comparer.Compare(kvp1[0], kvp2[0]);
                return c !== 0 ? c : Util_3.compare(kvp1[1], kvp2[1]);
            }, this, m2);
        };
        FableMap.prototype[Symbol.iterator] = function () {
            var i = tree_mkIterator(this.tree);
            return {
                next: function () { return tree_moveNext(i); }
            };
        };
        FableMap.prototype.entries = function () {
            return this[Symbol.iterator]();
        };
        FableMap.prototype.keys = function () {
            return Seq_1.map(function (kv) { return kv[0]; }, this);
        };
        FableMap.prototype.values = function () {
            return Seq_1.map(function (kv) { return kv[1]; }, this);
        };
        FableMap.prototype.get = function (k) {
            return tree_find(this.comparer, k, this.tree);
        };
        FableMap.prototype.has = function (k) {
            return tree_mem(this.comparer, k, this.tree);
        };
        FableMap.prototype.set = function (k, v) {
            this.tree = tree_add(this.comparer, k, v, this.tree);
        };
        FableMap.prototype.delete = function (k) {
            var oldSize = tree_size(this.tree);
            this.tree = tree_remove(this.comparer, k, this.tree);
            return oldSize > tree_size(this.tree);
        };
        FableMap.prototype.clear = function () {
            this.tree = tree_empty();
        };
        Object.defineProperty(FableMap.prototype, "size", {
            get: function () {
                return tree_size(this.tree);
            },
            enumerable: true,
            configurable: true
        });
        FableMap.prototype[Symbol_1.default.reflection] = function () {
            return {
                type: "Microsoft.FSharp.Collections.FSharpMap",
                interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
            };
        };
        return FableMap;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FableMap;
    function from(comparer, tree) {
        var map = new FableMap();
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
        return Seq_2.fold(function (acc, k) { return acc || Util_2.equals(map.get(k), v); }, false, map.keys());
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
        var rs = tree_partition(map.comparer, f, map.tree);
        return [from(map.comparer, rs[0]), from(map.comparer, rs[1])];
    }
    exports.partition = partition;
    function findKey(f, map) {
        return Seq_3.pick(function (kv) { return f(kv[0], kv[1]) ? kv[0] : null; }, map);
    }
    exports.findKey = findKey;
    function tryFindKey(f, map) {
        return Seq_4.tryPick(function (kv) { return f(kv[0], kv[1]) ? kv[0] : null; }, map);
    }
    exports.tryFindKey = tryFindKey;
    function pick(f, map) {
        var res = tryPick(f, map);
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
