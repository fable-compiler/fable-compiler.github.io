define(["require", "exports", "./ListClass", "./Seq", "./Seq", "./Seq", "./Seq", "./Map", "./ListClass"], function (require, exports, ListClass_1, Seq_1, Seq_2, Seq_3, Seq_4, Map_1, ListClass_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ListClass_1.default;
    exports.ofArray = ListClass_2.ofArray;
    function append(xs, ys) {
        return Seq_2.fold((acc, x) => new ListClass_1.default(x, acc), ys, reverse(xs));
    }
    exports.append = append;
    function choose(f, xs) {
        const r = Seq_2.fold((acc, x) => {
            const y = f(x);
            return y != null ? new ListClass_1.default(y, acc) : acc;
        }, new ListClass_1.default(), xs);
        return reverse(r);
    }
    exports.choose = choose;
    function collect(f, xs) {
        return Seq_2.fold((acc, x) => append(acc, f(x)), new ListClass_1.default(), xs);
    }
    exports.collect = collect;
    function concat(xs) {
        return collect(x => x, xs);
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
    function partition(f, xs) {
        return Seq_2.fold((acc, x) => {
            const lacc = acc[0], racc = acc[1];
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
    function unzip(xs) {
        return Seq_3.foldBack((xy, acc) => [new ListClass_1.default(xy[0], acc[0]), new ListClass_1.default(xy[1], acc[1])], xs, [new ListClass_1.default(), new ListClass_1.default()]);
    }
    exports.unzip = unzip;
    function unzip3(xs) {
        return Seq_3.foldBack((xyz, acc) => [new ListClass_1.default(xyz[0], acc[0]), new ListClass_1.default(xyz[1], acc[1]), new ListClass_1.default(xyz[2], acc[2])], xs, [new ListClass_1.default(), new ListClass_1.default(), new ListClass_1.default()]);
    }
    exports.unzip3 = unzip3;
    function groupBy(f, xs) {
        return Seq_4.toList(Seq_1.map(k => [k[0], Seq_4.toList(k[1])], Map_1.groupBy(f, xs)));
    }
    exports.groupBy = groupBy;
});
