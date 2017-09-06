define(["require", "exports", "./Symbol", "./Util", "./Util", "./Util"], function (require, exports, Symbol_1, Util_1, Util_2, Util_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This module is split from List.ts to prevent cyclic dependencies
    function ofArray(args, base) {
        let acc = base || new List();
        for (let i = args.length - 1; i >= 0; i--) {
            acc = new List(args[i], acc);
        }
        return acc;
    }
    exports.ofArray = ofArray;
    class List {
        constructor(head, tail) {
            this.head = head;
            this.tail = tail;
        }
        ToString() {
            return "[" + Array.from(this).map((x) => Util_1.toString(x)).join("; ") + "]";
        }
        Equals(x) {
            // Optimization if they are referencially equal
            if (this === x) {
                return true;
            }
            else {
                const iter1 = this[Symbol.iterator]();
                const iter2 = x[Symbol.iterator]();
                while (true) {
                    const cur1 = iter1.next();
                    const cur2 = iter2.next();
                    if (cur1.done) {
                        return cur2.done ? true : false;
                    }
                    else if (cur2.done) {
                        return false;
                    }
                    else if (!Util_2.equals(cur1.value, cur2.value)) {
                        return false;
                    }
                }
            }
        }
        CompareTo(x) {
            // Optimization if they are referencially equal
            if (this === x) {
                return 0;
            }
            else {
                let acc = 0;
                const iter1 = this[Symbol.iterator]();
                const iter2 = x[Symbol.iterator]();
                while (true) {
                    const cur1 = iter1.next();
                    const cur2 = iter2.next();
                    if (cur1.done) {
                        return cur2.done ? acc : -1;
                    }
                    else if (cur2.done) {
                        return 1;
                    }
                    else {
                        acc = Util_3.compare(cur1.value, cur2.value);
                        if (acc !== 0) {
                            return acc;
                        }
                    }
                }
            }
        }
        get length() {
            let cur = this;
            let acc = 0;
            while (cur.tail != null) {
                cur = cur.tail;
                acc++;
            }
            return acc;
        }
        [Symbol.iterator]() {
            let cur = this;
            return {
                next: () => {
                    const tmp = cur;
                    cur = cur.tail;
                    return { done: tmp.tail == null, value: tmp.head };
                },
            };
        }
        //   append(ys: List<T>): List<T> {
        //     return append(this, ys);
        //   }
        //   choose<U>(f: (x: T) => U, xs: List<T>): List<U> {
        //     return choose(f, this);
        //   }
        //   collect<U>(f: (x: T) => List<U>): List<U> {
        //     return collect(f, this);
        //   }
        //   filter(f: (x: T) => boolean): List<T> {
        //     return filter(f, this);
        //   }
        //   where(f: (x: T) => boolean): List<T> {
        //     return filter(f, this);
        //   }
        //   map<U>(f: (x: T) => U): List<U> {
        //     return map(f, this);
        //   }
        //   mapIndexed<U>(f: (i: number, x: T) => U): List<U> {
        //     return mapIndexed(f, this);
        //   }
        //   partition(f: (x: T) => boolean): [List<T>, List<T>] {
        //     return partition(f, this) as [List<T>, List<T>];
        //   }
        //   reverse(): List<T> {
        //     return reverse(this);
        //   }
        //   slice(lower: number, upper: number): List<T> {
        //     return slice(lower, upper, this);
        //   }
        [Symbol_1.default.reflection]() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpList",
                interfaces: ["System.IEquatable", "System.IComparable"],
            };
        }
    }
    exports.default = List;
});
