define(["require", "exports", "./Symbol", "./Util", "./Util", "./Util"], function (require, exports, Symbol_1, Util_1, Util_2, Util_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            return "[" + Array.from(this).map(x => Util_1.toString(x)).join("; ") + "]";
        }
        Equals(x) {
            if (this === x) {
                return true;
            }
            else {
                const iter1 = this[Symbol.iterator](), iter2 = x[Symbol.iterator]();
                for (;;) {
                    let cur1 = iter1.next(), cur2 = iter2.next();
                    if (cur1.done)
                        return cur2.done ? true : false;
                    else if (cur2.done)
                        return false;
                    else if (!Util_2.equals(cur1.value, cur2.value))
                        return false;
                }
            }
        }
        CompareTo(x) {
            if (this === x) {
                return 0;
            }
            else {
                let acc = 0;
                const iter1 = this[Symbol.iterator](), iter2 = x[Symbol.iterator]();
                for (;;) {
                    let cur1 = iter1.next(), cur2 = iter2.next();
                    if (cur1.done)
                        return cur2.done ? acc : -1;
                    else if (cur2.done)
                        return 1;
                    else {
                        acc = Util_3.compare(cur1.value, cur2.value);
                        if (acc != 0)
                            return acc;
                    }
                }
            }
        }
        get length() {
            let cur = this, acc = 0;
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
                }
            };
        }
        [Symbol_1.default.reflection]() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpList",
                interfaces: ["System.IEquatable", "System.IComparable"]
            };
        }
    }
    exports.default = List;
});
