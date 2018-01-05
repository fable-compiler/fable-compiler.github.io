(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ListClass", "./ListClass", "./Map", "./Option", "./Seq", "./Seq", "./Seq", "./Seq"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ListClass_1 = require("./ListClass");
    const ListClass_2 = require("./ListClass");
    exports.ofArray = ListClass_2.ofArray;
    const Map_1 = require("./Map");
    const Option_1 = require("./Option");
    const Seq_1 = require("./Seq");
    const Seq_2 = require("./Seq");
    const Seq_3 = require("./Seq");
    const Seq_4 = require("./Seq");
    exports.default = ListClass_1.default;
    function append(xs, ys) {
        return Seq_2.fold((acc, x) => new ListClass_1.default(x, acc), ys, reverse(xs));
    }
    exports.append = append;
    function choose(f, xs) {
        const r = Seq_2.fold((acc, x) => {
            const y = f(x);
            return y != null ? new ListClass_1.default(Option_1.getValue(y), acc) : acc;
        }, new ListClass_1.default(), xs);
        return reverse(r);
    }
    exports.choose = choose;
    function collect(f, xs) {
        return Seq_2.fold((acc, x) => append(acc, f(x)), new ListClass_1.default(), xs);
    }
    exports.collect = collect;
    // TODO: should be xs: Iterable<List<T>>
    function concat(xs) {
        return collect((x) => x, xs);
    }
    exports.concat = concat;
    function filter(f, xs) {
        return reverse(Seq_2.fold((acc, x) => f(x) ? new ListClass_1.default(x, acc) : acc, new ListClass_1.default(), xs));
    }
    exports.filter = filter;
    function where(f, xs) {
        return filter(f, xs);
    }
    exports.where = where;
    function initialize(n, f) {
        if (n < 0) {
            throw new Error("List length must be non-negative");
        }
        let xs = new ListClass_1.default();
        for (let i = 1; i <= n; i++) {
            xs = new ListClass_1.default(f(n - i), xs);
        }
        return xs;
    }
    exports.initialize = initialize;
    function map(f, xs) {
        return reverse(Seq_2.fold((acc, x) => new ListClass_1.default(f(x), acc), new ListClass_1.default(), xs));
    }
    exports.map = map;
    function mapIndexed(f, xs) {
        return reverse(Seq_2.fold((acc, x, i) => new ListClass_1.default(f(i, x), acc), new ListClass_1.default(), xs));
    }
    exports.mapIndexed = mapIndexed;
    function indexed(xs) {
        return mapIndexed((i, x) => [i, x], xs);
    }
    exports.indexed = indexed;
    function partition(f, xs) {
        return Seq_2.fold((acc, x) => {
            const lacc = acc[0];
            const racc = acc[1];
            return f(x) ? [new ListClass_1.default(x, lacc), racc] : [lacc, new ListClass_1.default(x, racc)];
        }, [new ListClass_1.default(), new ListClass_1.default()], reverse(xs));
    }
    exports.partition = partition;
    function replicate(n, x) {
        return initialize(n, () => x);
    }
    exports.replicate = replicate;
    function reverse(xs) {
        return Seq_2.fold((acc, x) => new ListClass_1.default(x, acc), new ListClass_1.default(), xs);
    }
    exports.reverse = reverse;
    function singleton(x) {
        return new ListClass_1.default(x, new ListClass_1.default());
    }
    exports.singleton = singleton;
    function slice(lower, upper, xs) {
        const noLower = (lower == null);
        const noUpper = (upper == null);
        return reverse(Seq_2.fold((acc, x, i) => (noLower || lower <= i) && (noUpper || i <= upper) ? new ListClass_1.default(x, acc) : acc, new ListClass_1.default(), xs));
    }
    exports.slice = slice;
    /* ToDo: instance unzip() */
    function unzip(xs) {
        return Seq_3.foldBack((xy, acc) => [new ListClass_1.default(xy[0], acc[0]), new ListClass_1.default(xy[1], acc[1])], xs, [new ListClass_1.default(), new ListClass_1.default()]);
    }
    exports.unzip = unzip;
    /* ToDo: instance unzip3() */
    function unzip3(xs) {
        return Seq_3.foldBack((xyz, acc) => [new ListClass_1.default(xyz[0], acc[0]), new ListClass_1.default(xyz[1], acc[1]), new ListClass_1.default(xyz[2], acc[2]),
        ], xs, [new ListClass_1.default(), new ListClass_1.default(), new ListClass_1.default(),
        ]);
    }
    exports.unzip3 = unzip3;
    function groupBy(f, xs) {
        return Seq_4.toList(Seq_1.map((k) => [k[0], Seq_4.toList(k[1])], Map_1.groupBy(f, xs)));
    }
    exports.groupBy = groupBy;
    function splitAt(index, xs) {
        if (index < 0) {
            throw new Error("The input must be non-negative.");
        }
        let i = 0;
        let last = xs;
        const first = new Array(index);
        while (i < index) {
            if (last.tail == null) {
                throw new Error("The input sequence has an insufficient number of elements.");
            }
            first[i] = last.head;
            last = last.tail;
            i++;
        }
        return [ListClass_2.ofArray(first), last];
    }
    exports.splitAt = splitAt;
});
