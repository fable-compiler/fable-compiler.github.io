/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/out";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Array__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ListClass__ = __webpack_require__(3);
/* unused harmony export Enumerator */
/* unused harmony export getEnumerator */
/* unused harmony export toIterator */
/* harmony export (immutable) */ __webpack_exports__["i"] = toList;
/* unused harmony export ofList */
/* unused harmony export ofArray */
/* unused harmony export append */
/* unused harmony export average */
/* unused harmony export averageBy */
/* unused harmony export concat */
/* unused harmony export collect */
/* harmony export (immutable) */ __webpack_exports__["a"] = choose;
/* harmony export (immutable) */ __webpack_exports__["k"] = compareWith;
/* unused harmony export delay */
/* unused harmony export empty */
/* unused harmony export enumerateWhile */
/* unused harmony export enumerateThenFinally */
/* unused harmony export enumerateUsing */
/* unused harmony export exactlyOne */
/* unused harmony export except */
/* harmony export (immutable) */ __webpack_exports__["g"] = exists;
/* unused harmony export exists2 */
/* unused harmony export filter */
/* unused harmony export where */
/* harmony export (immutable) */ __webpack_exports__["d"] = fold;
/* harmony export (immutable) */ __webpack_exports__["h"] = foldBack;
/* unused harmony export fold2 */
/* unused harmony export foldBack2 */
/* harmony export (immutable) */ __webpack_exports__["f"] = forAll;
/* unused harmony export forAll2 */
/* unused harmony export tryHead */
/* unused harmony export head */
/* unused harmony export initialize */
/* unused harmony export initializeInfinite */
/* unused harmony export tryItem */
/* unused harmony export item */
/* harmony export (immutable) */ __webpack_exports__["c"] = iterate;
/* unused harmony export iterate2 */
/* unused harmony export iterateIndexed */
/* unused harmony export iterateIndexed2 */
/* unused harmony export isEmpty */
/* unused harmony export tryLast */
/* unused harmony export last */
/* unused harmony export count */
/* harmony export (immutable) */ __webpack_exports__["j"] = map;
/* unused harmony export mapIndexed */
/* unused harmony export map2 */
/* unused harmony export mapIndexed2 */
/* unused harmony export map3 */
/* unused harmony export chunkBySize */
/* unused harmony export mapFold */
/* unused harmony export mapFoldBack */
/* unused harmony export max */
/* unused harmony export maxBy */
/* unused harmony export min */
/* unused harmony export minBy */
/* unused harmony export pairwise */
/* unused harmony export permute */
/* unused harmony export rangeStep */
/* unused harmony export rangeChar */
/* unused harmony export range */
/* unused harmony export readOnly */
/* harmony export (immutable) */ __webpack_exports__["e"] = reduce;
/* unused harmony export reduceBack */
/* unused harmony export replicate */
/* unused harmony export reverse */
/* harmony export (immutable) */ __webpack_exports__["b"] = scan;
/* unused harmony export scanBack */
/* unused harmony export singleton */
/* unused harmony export skip */
/* unused harmony export skipWhile */
/* unused harmony export sortWith */
/* unused harmony export sum */
/* unused harmony export sumBy */
/* unused harmony export tail */
/* unused harmony export take */
/* unused harmony export truncate */
/* unused harmony export takeWhile */
/* unused harmony export tryFind */
/* unused harmony export find */
/* unused harmony export tryFindBack */
/* unused harmony export findBack */
/* unused harmony export tryFindIndex */
/* unused harmony export findIndex */
/* unused harmony export tryFindIndexBack */
/* unused harmony export findIndexBack */
/* harmony export (immutable) */ __webpack_exports__["m"] = tryPick;
/* harmony export (immutable) */ __webpack_exports__["l"] = pick;
/* unused harmony export unfold */
/* unused harmony export zip */
/* unused harmony export zip3 */
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var Enumerator = function () {
    function Enumerator(iter) {
        _classCallCheck(this, Enumerator);

        this.iter = iter;
    }

    _createClass(Enumerator, [{
        key: "MoveNext",
        value: function MoveNext() {
            var cur = this.iter.next();
            this.current = cur.value;
            return !cur.done;
        }
    }, {
        key: "Reset",
        value: function Reset() {
            throw new Error("JS iterators cannot be reset");
        }
    }, {
        key: "Dispose",
        value: function Dispose() {}
    }, {
        key: "Current",
        get: function get() {
            return this.current;
        }
    }]);

    return Enumerator;
}();
function getEnumerator(o) {
    return typeof o.GetEnumerator === "function" ? o.GetEnumerator() : new Enumerator(o[Symbol.iterator]());
}
function toIterator(en) {
    return {
        next: function next() {
            return en.MoveNext() ? { done: false, value: en.Current } : { done: true, value: null };
        }
    };
}
function __failIfNone(res) {
    if (res == null) throw new Error("Seq did not contain any matching element");
    return res;
}
function toList(xs) {
    return foldBack(function (x, acc) {
        return new __WEBPACK_IMPORTED_MODULE_2__ListClass__["a" /* default */](x, acc);
    }, xs, new __WEBPACK_IMPORTED_MODULE_2__ListClass__["a" /* default */]());
}
function ofList(xs) {
    return delay(function () {
        return unfold(function (x) {
            return x.tail != null ? [x.head, x.tail] : null;
        }, xs);
    });
}
function ofArray(xs) {
    return delay(function () {
        return unfold(function (i) {
            return i < xs.length ? [xs[i], i + 1] : null;
        }, 0);
    });
}
function append(xs, ys) {
    return delay(function () {
        var firstDone = false;
        var i = xs[Symbol.iterator]();
        var iters = [i, null];
        return unfold(function () {
            var cur = void 0;
            if (!firstDone) {
                cur = iters[0].next();
                if (!cur.done) {
                    return [cur.value, iters];
                } else {
                    firstDone = true;
                    iters = [null, ys[Symbol.iterator]()];
                }
            }
            cur = iters[1].next();
            return !cur.done ? [cur.value, iters] : null;
        }, iters);
    });
}
function average(xs) {
    var count = 1;
    var sum = reduce(function (acc, x) {
        count++;
        return acc + x;
    }, xs);
    return sum / count;
}
function averageBy(f, xs) {
    var count = 1;
    var sum = reduce(function (acc, x) {
        count++;
        return (count === 2 ? f(acc) : acc) + f(x);
    }, xs);
    return sum / count;
}
function concat(xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        var output = { value: null };
        return unfold(function (innerIter) {
            var hasFinished = false;
            while (!hasFinished) {
                if (innerIter == null) {
                    var cur = iter.next();
                    if (!cur.done) {
                        innerIter = cur.value[Symbol.iterator]();
                    } else {
                        hasFinished = true;
                    }
                } else {
                    var _cur = innerIter.next();
                    if (!_cur.done) {
                        output = { value: _cur.value };
                        hasFinished = true;
                    } else {
                        innerIter = null;
                    }
                }
            }
            return innerIter != null && output != null ? [output.value, innerIter] : null;
        }, null);
    });
}
function collect(f, xs) {
    return concat(map(f, xs));
}
function choose(f, xs) {
    var trySkipToNext = function trySkipToNext(iter) {
        var cur = iter.next();
        if (!cur.done) {
            var y = f(cur.value);
            return y != null ? [y, iter] : trySkipToNext(iter);
        }
        return void 0;
    };
    return delay(function () {
        return unfold(function (iter) {
            return trySkipToNext(iter);
        }, xs[Symbol.iterator]());
    });
}
function compareWith(f, xs, ys) {
    var nonZero = tryFind(function (i) {
        return i != 0;
    }, map2(function (x, y) {
        return f(x, y);
    }, xs, ys));
    return nonZero != null ? nonZero : count(xs) - count(ys);
}
function delay(f) {
    return _defineProperty({}, Symbol.iterator, function () {
        return f()[Symbol.iterator]();
    });
}
function empty() {
    return unfold(function () {
        return void 0;
    });
}
function enumerateWhile(cond, xs) {
    return concat(unfold(function () {
        return cond() ? [xs, true] : null;
    }));
}
function enumerateThenFinally(xs, finalFn) {
    return delay(function () {
        var iter = void 0;
        try {
            iter = xs[Symbol.iterator]();
        } catch (err) {
            return void 0;
        } finally {
            finalFn();
        }
        return unfold(function (iter) {
            try {
                var cur = iter.next();
                return !cur.done ? [cur.value, iter] : null;
            } catch (err) {
                return void 0;
            } finally {
                finalFn();
            }
        }, iter);
    });
}
function enumerateUsing(disp, work) {
    var isDisposed = false;
    var disposeOnce = function disposeOnce() {
        if (!isDisposed) {
            isDisposed = true;
            disp.Dispose();
        }
    };
    try {
        return enumerateThenFinally(work(disp), disposeOnce);
    } catch (err) {
        return void 0;
    } finally {
        disposeOnce();
    }
}
function exactlyOne(xs) {
    var iter = xs[Symbol.iterator]();
    var fst = iter.next();
    if (fst.done) throw new Error("Seq was empty");
    var snd = iter.next();
    if (!snd.done) throw new Error("Seq had multiple items");
    return fst.value;
}
function except(itemsToExclude, source) {
    var exclusionItems = Array.from(itemsToExclude);
    var testIsNotInExclusionItems = function testIsNotInExclusionItems(element) {
        return !exclusionItems.some(function (excludedItem) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["c" /* equals */])(excludedItem, element);
        });
    };
    return filter(testIsNotInExclusionItems, source);
}
function exists(f, xs) {
    function aux(iter) {
        var cur = iter.next();
        return !cur.done && (f(cur.value) || aux(iter));
    }
    return aux(xs[Symbol.iterator]());
}
function exists2(f, xs, ys) {
    function aux(iter1, iter2) {
        var cur1 = iter1.next(),
            cur2 = iter2.next();
        return !cur1.done && !cur2.done && (f(cur1.value, cur2.value) || aux(iter1, iter2));
    }
    return aux(xs[Symbol.iterator](), ys[Symbol.iterator]());
}
function filter(f, xs) {
    function trySkipToNext(iter) {
        var cur = iter.next();
        while (!cur.done) {
            if (f(cur.value)) {
                return [cur.value, iter];
            }
            cur = iter.next();
        }
        return void 0;
    }
    return delay(function () {
        return unfold(trySkipToNext, xs[Symbol.iterator]());
    });
}
function where(f, xs) {
    return filter(f, xs);
}
function fold(f, acc, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f, acc);
    } else {
        var cur = void 0;
        for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
            cur = iter.next();
            if (cur.done) break;
            acc = f(acc, cur.value, i);
        }
        return acc;
    }
}
function foldBack(f, xs, acc) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    for (var i = arr.length - 1; i >= 0; i--) {
        acc = f(arr[i], acc, i);
    }
    return acc;
}
function fold2(f, acc, xs, ys) {
    var iter1 = xs[Symbol.iterator](),
        iter2 = ys[Symbol.iterator]();
    var cur1 = void 0,
        cur2 = void 0;
    for (var i = 0;; i++) {
        cur1 = iter1.next();
        cur2 = iter2.next();
        if (cur1.done || cur2.done) {
            break;
        }
        acc = f(acc, cur1.value, cur2.value, i);
    }
    return acc;
}
function foldBack2(f, xs, ys, acc) {
    var ar1 = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    var ar2 = Array.isArray(ys) || ArrayBuffer.isView(ys) ? ys : Array.from(ys);
    for (var i = ar1.length - 1; i >= 0; i--) {
        acc = f(ar1[i], ar2[i], acc, i);
    }
    return acc;
}
function forAll(f, xs) {
    return fold(function (acc, x) {
        return acc && f(x);
    }, true, xs);
}
function forAll2(f, xs, ys) {
    return fold2(function (acc, x, y) {
        return acc && f(x, y);
    }, true, xs, ys);
}
function tryHead(xs) {
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    return cur.done ? null : cur.value;
}
function head(xs) {
    return __failIfNone(tryHead(xs));
}
function initialize(n, f) {
    return delay(function () {
        return unfold(function (i) {
            return i < n ? [f(i), i + 1] : null;
        }, 0);
    });
}
function initializeInfinite(f) {
    return delay(function () {
        return unfold(function (i) {
            return [f(i), i + 1];
        }, 0);
    });
}
function tryItem(i, xs) {
    if (i < 0) return null;
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) return i < xs.length ? xs[i] : null;
    for (var j = 0, iter = xs[Symbol.iterator]();; j++) {
        var cur = iter.next();
        if (cur.done) return null;
        if (j === i) return cur.value;
    }
}
function item(i, xs) {
    return __failIfNone(tryItem(i, xs));
}
function iterate(f, xs) {
    fold(function (_, x) {
        return f(x);
    }, null, xs);
}
function iterate2(f, xs, ys) {
    fold2(function (_, x, y) {
        return f(x, y);
    }, null, xs, ys);
}
function iterateIndexed(f, xs) {
    fold(function (_, x, i) {
        return f(i, x);
    }, null, xs);
}
function iterateIndexed2(f, xs, ys) {
    fold2(function (_, x, y, i) {
        return f(i, x, y);
    }, null, xs, ys);
}
function isEmpty(xs) {
    var i = xs[Symbol.iterator]();
    return i.next().done;
}
function tryLast(xs) {
    try {
        return reduce(function (_, x) {
            return x;
        }, xs);
    } catch (err) {
        return null;
    }
}
function last(xs) {
    return __failIfNone(tryLast(xs));
}
function count(xs) {
    return Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.length : fold(function (acc, x) {
        return acc + 1;
    }, 0, xs);
}
function map(f, xs) {
    return delay(function () {
        return unfold(function (iter) {
            var cur = iter.next();
            return !cur.done ? [f(cur.value), iter] : null;
        }, xs[Symbol.iterator]());
    });
}
function mapIndexed(f, xs) {
    return delay(function () {
        var i = 0;
        return unfold(function (iter) {
            var cur = iter.next();
            return !cur.done ? [f(i++, cur.value), iter] : null;
        }, xs[Symbol.iterator]());
    });
}
function map2(f, xs, ys) {
    return delay(function () {
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next(),
                cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
        });
    });
}
function mapIndexed2(f, xs, ys) {
    return delay(function () {
        var i = 0;
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next(),
                cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(i++, cur1.value, cur2.value), null] : null;
        });
    });
}
function map3(f, xs, ys, zs) {
    return delay(function () {
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        var iter3 = zs[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next(),
                cur2 = iter2.next(),
                cur3 = iter3.next();
            return !cur1.done && !cur2.done && !cur3.done ? [f(cur1.value, cur2.value, cur3.value), null] : null;
        });
    });
}
function chunkBySize(size, xs) {
    var result = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Array__["a" /* chunkBySize */])(size, Array.from(xs));
    return ofArray(result.map(ofArray));
}
function mapFold(f, acc, xs, transform) {
    var result = [];
    var r = void 0;
    var cur = void 0;
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        cur = iter.next();
        if (cur.done) break;

        var _f = f(acc, cur.value);

        var _f2 = _slicedToArray(_f, 2);

        r = _f2[0];
        acc = _f2[1];

        result.push(r);
    }
    return transform !== void 0 ? [transform(result), acc] : [result, acc];
}
function mapFoldBack(f, xs, acc, transform) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    var result = [];
    var r = void 0;
    for (var i = arr.length - 1; i >= 0; i--) {
        var _f3 = f(arr[i], acc);

        var _f4 = _slicedToArray(_f3, 2);

        r = _f4[0];
        acc = _f4[1];

        result.push(r);
    }
    return transform !== void 0 ? [transform(result), acc] : [result, acc];
}
function max(xs) {
    return reduce(function (acc, x) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["g" /* compare */])(acc, x) === 1 ? acc : x;
    }, xs);
}
function maxBy(f, xs) {
    return reduce(function (acc, x) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["g" /* compare */])(f(acc), f(x)) === 1 ? acc : x;
    }, xs);
}
function min(xs) {
    return reduce(function (acc, x) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["g" /* compare */])(acc, x) === -1 ? acc : x;
    }, xs);
}
function minBy(f, xs) {
    return reduce(function (acc, x) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Util__["g" /* compare */])(f(acc), f(x)) === -1 ? acc : x;
    }, xs);
}
function pairwise(xs) {
    return skip(2, scan(function (last, next) {
        return [last[1], next];
    }, [0, 0], xs));
}
function permute(f, xs) {
    return ofArray(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Array__["b" /* permute */])(f, Array.from(xs)));
}
function rangeStep(first, step, last) {
    if (step === 0) throw new Error("Step cannot be 0");
    return delay(function () {
        return unfold(function (x) {
            return step > 0 && x <= last || step < 0 && x >= last ? [x, x + step] : null;
        }, first);
    });
}
function rangeChar(first, last) {
    return delay(function () {
        return unfold(function (x) {
            return x <= last ? [x, String.fromCharCode(x.charCodeAt(0) + 1)] : null;
        }, first);
    });
}
function range(first, last) {
    return rangeStep(first, 1, last);
}
function readOnly(xs) {
    return map(function (x) {
        return x;
    }, xs);
}
function reduce(f, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) return xs.reduce(f);
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    if (cur.done) throw new Error("Seq was empty");
    var acc = cur.value;
    for (;;) {
        cur = iter.next();
        if (cur.done) break;
        acc = f(acc, cur.value);
    }
    return acc;
}
function reduceBack(f, xs) {
    var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    if (ar.length === 0) throw new Error("Seq was empty");
    var acc = ar[ar.length - 1];
    for (var i = ar.length - 2; i >= 0; i--) {
        acc = f(ar[i], acc, i);
    }return acc;
}
function replicate(n, x) {
    return initialize(n, function () {
        return x;
    });
}
function reverse(xs) {
    var ar = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.slice(0) : Array.from(xs);
    return ofArray(ar.reverse());
}
function scan(f, seed, xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        return unfold(function (acc) {
            if (acc == null) return [seed, seed];
            var cur = iter.next();
            if (!cur.done) {
                acc = f(acc, cur.value);
                return [acc, acc];
            }
            return void 0;
        }, null);
    });
}
function scanBack(f, xs, seed) {
    return reverse(scan(function (acc, x) {
        return f(x, acc);
    }, seed, reverse(xs)));
}
function singleton(x) {
    return unfold(function (x) {
        return x != null ? [x, null] : null;
    }, x);
}
function skip(n, xs) {
    return _defineProperty({}, Symbol.iterator, function () {
        var iter = xs[Symbol.iterator]();
        for (var i = 1; i <= n; i++) {
            if (iter.next().done) throw new Error("Seq has not enough elements");
        }return iter;
    });
}
function skipWhile(f, xs) {
    return delay(function () {
        var hasPassed = false;
        return filter(function (x) {
            return hasPassed || (hasPassed = !f(x));
        }, xs);
    });
}
function sortWith(f, xs) {
    var ys = Array.from(xs);
    return ofArray(ys.sort(f));
}
function sum(xs) {
    return fold(function (acc, x) {
        return acc + x;
    }, 0, xs);
}
function sumBy(f, xs) {
    return fold(function (acc, x) {
        return acc + f(x);
    }, 0, xs);
}
function tail(xs) {
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    if (cur.done) throw new Error("Seq was empty");
    return _defineProperty({}, Symbol.iterator, function () {
        return iter;
    });
}
function take(n, xs) {
    var truncate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    return delay(function () {
        var iter = xs[Symbol.iterator]();
        return unfold(function (i) {
            if (i < n) {
                var cur = iter.next();
                if (!cur.done) return [cur.value, i + 1];
                if (!truncate) throw new Error("Seq has not enough elements");
            }
            return void 0;
        }, 0);
    });
}
function truncate(n, xs) {
    return take(n, xs, true);
}
function takeWhile(f, xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        return unfold(function (i) {
            var cur = iter.next();
            if (!cur.done && f(cur.value)) return [cur.value, null];
            return void 0;
        }, 0);
    });
}
function tryFind(f, xs, defaultValue) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done) return defaultValue === void 0 ? null : defaultValue;
        if (f(cur.value, i)) return cur.value;
    }
}
function find(f, xs) {
    return __failIfNone(tryFind(f, xs));
}
function tryFindBack(f, xs, defaultValue) {
    var match = null;
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done) return match === null ? defaultValue === void 0 ? null : defaultValue : match;
        if (f(cur.value, i)) match = cur.value;
    }
}
function findBack(f, xs) {
    return __failIfNone(tryFindBack(f, xs));
}
function tryFindIndex(f, xs) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done) return null;
        if (f(cur.value, i)) return i;
    }
}
function findIndex(f, xs) {
    return __failIfNone(tryFindIndex(f, xs));
}
function tryFindIndexBack(f, xs) {
    var match = -1;
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done) return match === -1 ? null : match;
        if (f(cur.value, i)) match = i;
    }
}
function findIndexBack(f, xs) {
    return __failIfNone(tryFindIndexBack(f, xs));
}
function tryPick(f, xs) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done) break;
        var y = f(cur.value, i);
        if (y != null) return y;
    }
    return void 0;
}
function pick(f, xs) {
    return __failIfNone(tryPick(f, xs));
}
function unfold(f, acc) {
    return _defineProperty({}, Symbol.iterator, function () {
        return {
            next: function next() {
                var res = f(acc);
                if (res != null) {
                    acc = res[1];
                    return { done: false, value: res[0] };
                }
                return { done: true };
            }
        };
    });
}
function zip(xs, ys) {
    return map2(function (x, y) {
        return [x, y];
    }, xs, ys);
}
function zip3(xs, ys, zs) {
    return map3(function (x, y, z) {
        return [x, y, z];
    }, xs, ys, zs);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(2);
/* unused harmony export NonDeclaredType */
/* unused harmony export Any */
/* unused harmony export Unit */
/* unused harmony export Option */
/* unused harmony export Array */
/* unused harmony export Tuple */
/* unused harmony export Function */
/* unused harmony export GenericParam */
/* unused harmony export Interface */
/* unused harmony export makeGeneric */
/* unused harmony export isGeneric */
/* unused harmony export getDefinition */
/* unused harmony export extendInfo */
/* unused harmony export hasInterface */
/* unused harmony export getPropertyNames */
/* unused harmony export isArray */
/* harmony export (immutable) */ __webpack_exports__["f"] = toString;
/* unused harmony export hash */
/* harmony export (immutable) */ __webpack_exports__["c"] = equals;
/* harmony export (immutable) */ __webpack_exports__["e"] = comparePrimitives;
/* harmony export (immutable) */ __webpack_exports__["g"] = compare;
/* harmony export (immutable) */ __webpack_exports__["a"] = equalsRecords;
/* harmony export (immutable) */ __webpack_exports__["b"] = compareRecords;
/* unused harmony export equalsUnions */
/* harmony export (immutable) */ __webpack_exports__["d"] = compareUnions;
/* unused harmony export createDisposable */
/* unused harmony export createObj */
/* unused harmony export toPlainJsObj */
/* unused harmony export round */
/* unused harmony export randomNext */
/* unused harmony export defaultArg */
/* unused harmony export applyOperator */
/* unused harmony export parseNumber */
/* unused harmony export tryParse */
/* unused harmony export parse */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var NonDeclaredType = function () {
    function NonDeclaredType(kind, definition, generics) {
        _classCallCheck(this, NonDeclaredType);

        this.kind = kind;
        this.definition = definition;
        this.generics = generics;
    }

    _createClass(NonDeclaredType, [{
        key: "Equals",
        value: function Equals(other) {
            if (this.kind === other.kind && this.definition === other.definition) {
                return _typeof(this.generics) === "object" ? equalsRecords(this.generics, other.generics) : this.generics === other.generics;
            }
            return false;
        }
    }]);

    return NonDeclaredType;
}();
var Any = new NonDeclaredType("Any");
var Unit = new NonDeclaredType("Unit");
function Option(t) {
    return new NonDeclaredType("Option", null, [t]);
}
function FableArray(t) {
    var isTypedArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var def = null,
        genArg = null;
    if (isTypedArray) {
        def = t;
    } else {
        genArg = t;
    }
    return new NonDeclaredType("Array", def, [genArg]);
}

function Tuple(types) {
    return new NonDeclaredType("Tuple", null, types);
}
function FableFunction(types) {
    return new NonDeclaredType("Function", null, types);
}

function GenericParam(definition) {
    return new NonDeclaredType("GenericParam", definition);
}
function Interface(definition) {
    return new NonDeclaredType("Interface", definition);
}
function makeGeneric(typeDef, genArgs) {
    return new NonDeclaredType("GenericType", typeDef, genArgs);
}
function isGeneric(typ) {
    return typ instanceof NonDeclaredType && typ.kind === "GenericType";
}
function getDefinition(typ) {
    return isGeneric(typ) ? typ.definition : typ;
}
function extendInfo(cons, info) {
    var parent = Object.getPrototypeOf(cons.prototype);
    if (typeof parent[__WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection] === "function") {
        var newInfo = {},
            parentInfo = parent[__WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection]();
        Object.getOwnPropertyNames(info).forEach(function (k) {
            var i = info[k];
            if ((typeof i === "undefined" ? "undefined" : _typeof(i)) === "object") {
                newInfo[k] = Array.isArray(i) ? (parentInfo[k] || []).concat(i) : Object.assign(parentInfo[k] || {}, i);
            } else {
                newInfo[k] = i;
            }
        });
        return newInfo;
    }
    return info;
}
function hasInterface(obj, interfaceName) {
    if (interfaceName === "System.Collections.Generic.IEnumerable") {
        return typeof obj[Symbol.iterator] === "function";
    } else if (typeof obj[__WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection] === "function") {
        var interfaces = obj[__WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection]().interfaces;
        return Array.isArray(interfaces) && interfaces.indexOf(interfaceName) > -1;
    }
    return false;
}
function getPropertyNames(obj) {
    if (obj == null) {
        return [];
    }
    var propertyMap = typeof obj[__WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection] === "function" ? obj[__WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection]().properties || [] : obj;
    return Object.getOwnPropertyNames(propertyMap);
}
function isArray(obj) {
    return Array.isArray(obj) || ArrayBuffer.isView(obj);
}
function toString(obj) {
    var quoteStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    function isObject(x) {
        return x !== null && (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && !(x instanceof Number) && !(x instanceof String) && !(x instanceof Boolean);
    }
    if (obj == null || typeof obj === "number") {
        return String(obj);
    }
    if (typeof obj === "string") {
        return quoteStrings ? JSON.stringify(obj) : obj;
    }
    if (typeof obj.ToString == "function") {
        return obj.ToString();
    }
    if (hasInterface(obj, "FSharpUnion")) {
        var info = obj[__WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection]();
        var uci = info.cases[obj.tag];
        switch (uci.length) {
            case 1:
                return uci[0];
            case 2:
                return uci[0] + " (" + toString(obj.data, true) + ")";
            default:
                return uci[0] + " (" + obj.data.map(function (x) {
                    return toString(x, true);
                }).join(",") + ")";
        }
    }
    try {
        return JSON.stringify(obj, function (k, v) {
            return v && v[Symbol.iterator] && !Array.isArray(v) && isObject(v) ? Array.from(v) : v && typeof v.ToString === "function" ? toString(v) : v;
        });
    } catch (err) {
        return "{" + Object.getOwnPropertyNames(obj).map(function (k) {
            return k + ": " + String(obj[k]);
        }).join(", ") + "}";
    }
}
function hash(x) {
    if (x != null && typeof x.GetHashCode == "function") {
        return x.GetHashCode();
    } else {
        var s = JSON.stringify(x);
        var h = 5381,
            i = 0,
            len = s.length;
        while (i < len) {
            h = h * 33 ^ s.charCodeAt(i++);
        }
        return h;
    }
}
function equals(x, y) {
    if (x === y) return true;else if (x == null) return y == null;else if (y == null) return false;else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) return false;else if (typeof x.Equals === "function") return x.Equals(y);else if (Array.isArray(x)) {
        if (x.length != y.length) return false;
        for (var i = 0; i < x.length; i++) {
            if (!equals(x[i], y[i])) return false;
        }return true;
    } else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength) return false;
        var dv1 = new DataView(x.buffer),
            dv2 = new DataView(y.buffer);
        for (var _i = 0; _i < x.byteLength; _i++) {
            if (dv1.getUint8(_i) !== dv2.getUint8(_i)) return false;
        }return true;
    } else if (x instanceof Date) return x.getTime() === y.getTime();else return false;
}
function comparePrimitives(x, y) {
    return x === y ? 0 : x < y ? -1 : 1;
}
function compare(x, y) {
    if (x === y) return 0;
    if (x == null) return y == null ? 0 : -1;else if (y == null) return 1;else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) return -1;else if (typeof x.CompareTo === "function") return x.CompareTo(y);else if (Array.isArray(x)) {
        if (x.length != y.length) return x.length < y.length ? -1 : 1;
        for (var i = 0, j = 0; i < x.length; i++) {
            if ((j = compare(x[i], y[i])) !== 0) return j;
        }return 0;
    } else if (ArrayBuffer.isView(x)) {
        if (x.byteLength != y.byteLength) return x.byteLength < y.byteLength ? -1 : 1;
        var dv1 = new DataView(x.buffer),
            dv2 = new DataView(y.buffer);
        for (var _i2 = 0, b1 = 0, b2 = 0; _i2 < x.byteLength; _i2++) {
            b1 = dv1.getUint8(_i2), b2 = dv2.getUint8(_i2);
            if (b1 < b2) return -1;
            if (b1 > b2) return 1;
        }
        return 0;
    } else if (x instanceof Date) {
        var xtime = x.getTime(),
            ytime = y.getTime();
        return xtime === ytime ? 0 : xtime < ytime ? -1 : 1;
    } else if ((typeof x === "undefined" ? "undefined" : _typeof(x)) === "object") {
        var xhash = hash(x),
            yhash = hash(y);
        if (xhash === yhash) {
            return equals(x, y) ? 0 : -1;
        } else {
            return xhash < yhash ? -1 : 1;
        }
    } else return x < y ? -1 : 1;
}
function equalsRecords(x, y) {
    if (x === y) {
        return true;
    } else {
        var keys = getPropertyNames(x);
        for (var i = 0; i < keys.length; i++) {
            if (!equals(x[keys[i]], y[keys[i]])) return false;
        }
        return true;
    }
}
function compareRecords(x, y) {
    if (x === y) {
        return 0;
    } else {
        var keys = getPropertyNames(x);
        for (var i = 0; i < keys.length; i++) {
            var res = compare(x[keys[i]], y[keys[i]]);
            if (res !== 0) return res;
        }
        return 0;
    }
}
function equalsUnions(x, y) {
    return x === y || x.tag === y.tag && equals(x.data, y.data);
}
function compareUnions(x, y) {
    if (x === y) {
        return 0;
    } else {
        var res = x.tag < y.tag ? -1 : x.tag > y.tag ? 1 : 0;
        return res !== 0 ? res : compare(x.data, y.data);
    }
}
function createDisposable(f) {
    return _defineProperty({
        Dispose: f
    }, __WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection, function () {
        return { interfaces: ["System.IDisposable"] };
    });
}
var CaseRules = {
    None: 0,
    LowerFirst: 1
};
function createObj(fields) {
    var caseRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CaseRules.None;

    var iter = fields[Symbol.iterator]();
    var cur = iter.next(),
        o = {},
        casesCache = null;
    while (!cur.done) {
        var value = cur.value;
        if (Array.isArray(value)) {
            o[value[0]] = value[1];
        } else {
            casesCache = casesCache || new Map();
            var proto = Object.getPrototypeOf(value);
            var cases = casesCache.get(proto),
                caseInfo = null;
            if (cases == null) {
                if (typeof proto[__WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection] === "function") {
                    cases = proto[__WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection]().cases;
                    casesCache.set(proto, cases);
                }
            }
            if (cases != null && Array.isArray(caseInfo = cases[value.tag])) {
                var key = caseInfo[0];
                if (caseRule === CaseRules.LowerFirst) {
                    key = key[0].toLowerCase() + key.substr(1);
                }
                o[key] = caseInfo.length === 1 ? true : value.data;
            } else {
                throw new Error("Cannot infer key and value of " + value);
            }
        }
        cur = iter.next();
    }
    return o;
}
function toPlainJsObj(source) {
    if (source != null && source.constructor != Object) {
        var target = {};
        var props = Object.getOwnPropertyNames(source);
        for (var i = 0; i < props.length; i++) {
            target[props[i]] = source[props[i]];
        }
        var proto = Object.getPrototypeOf(source);
        if (proto != null) {
            props = Object.getOwnPropertyNames(proto);
            for (var _i3 = 0; _i3 < props.length; _i3++) {
                var prop = Object.getOwnPropertyDescriptor(proto, props[_i3]);
                if (prop.value) {
                    target[props[_i3]] = prop.value;
                } else if (prop.get) {
                    target[props[_i3]] = prop.get.apply(source);
                }
            }
        }
        return target;
    } else {
        return source;
    }
}
function round(value) {
    var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var m = Math.pow(10, digits);
    var n = +(digits ? value * m : value).toFixed(8);
    var i = Math.floor(n),
        f = n - i;
    var e = 1e-8;
    var r = f > 0.5 - e && f < 0.5 + e ? i % 2 == 0 ? i : i + 1 : Math.round(n);
    return digits ? r / m : r;
}
function randomNext(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function defaultArg(arg, defaultValue, f) {
    return arg == null ? defaultValue : f != null ? f(arg) : arg;
}
function applyOperator(x, y, operator) {
    function getMethod(obj) {
        if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
            var cons = Object.getPrototypeOf(obj).constructor;
            if (typeof cons[operator] === "function") {
                return cons[operator];
            }
        }
        return null;
    }
    var meth = getMethod(x);
    if (meth != null) {
        return meth(x, y);
    }
    meth = getMethod(y);
    if (meth != null) {
        return meth(x, y);
    }
    switch (operator) {
        case "op_Addition":
            return x + y;
        case "op_Subtraction":
            return x - y;
        case "op_Multiply":
            return x * y;
        case "op_Division":
            return x / y;
        case "op_Modulus":
            return x % y;
        case "op_LeftShift":
            return x << y;
        case "op_RightShift":
            return x >> y;
        case "op_BitwiseAnd":
            return x & y;
        case "op_BitwiseOr":
            return x | y;
        case "op_ExclusiveOr":
            return x ^ y;
        case "op_LogicalNot":
            return x + y;
        case "op_UnaryNegation":
            return !x;
        case "op_BooleanAnd":
            return x && y;
        case "op_BooleanOr":
            return x || y;
        default:
            return null;
    }
}
function parseNumber(v) {
    return +v;
}
function tryParse(v, initial, parser, fn) {
    if (v != null) {
        var a = parser.exec(v);
        if (a !== null) {
            return [true, fn(a[1])];
        }
    }
    return [false, initial];
}
function parse(v, initial, parser, fn) {
    var a = tryParse(v, initial, parser, fn);
    if (a[0]) {
        return a[1];
    } else {
        throw new Error("Input string was not in a correct format.");
    }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setType;
/* unused harmony export getType */
var types = new Map();
function setType(fullName, cons) {
    types.set(fullName, cons);
}
function getType(fullName) {
    return types.get(fullName);
}
/* harmony default export */ __webpack_exports__["a"] = ({
    reflection: Symbol("reflection")
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["b"] = ofArray;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





function ofArray(args, base) {
    var acc = base || new List();
    for (var i = args.length - 1; i >= 0; i--) {
        acc = new List(args[i], acc);
    }
    return acc;
}

var List = function () {
    function List(head, tail) {
        _classCallCheck(this, List);

        this.head = head;
        this.tail = tail;
    }

    _createClass(List, [{
        key: "ToString",
        value: function ToString() {
            return "[" + Array.from(this).map(function (x) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["f" /* toString */])(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(x) {
            if (this === x) {
                return true;
            } else {
                var iter1 = this[Symbol.iterator](),
                    iter2 = x[Symbol.iterator]();
                for (;;) {
                    var cur1 = iter1.next(),
                        cur2 = iter2.next();
                    if (cur1.done) return cur2.done ? true : false;else if (cur2.done) return false;else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["c" /* equals */])(cur1.value, cur2.value)) return false;
                }
            }
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(x) {
            if (this === x) {
                return 0;
            } else {
                var acc = 0;
                var iter1 = this[Symbol.iterator](),
                    iter2 = x[Symbol.iterator]();
                for (;;) {
                    var cur1 = iter1.next(),
                        cur2 = iter2.next();
                    if (cur1.done) return cur2.done ? acc : -1;else if (cur2.done) return 1;else {
                        acc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["g" /* compare */])(cur1.value, cur2.value);
                        if (acc != 0) return acc;
                    }
                }
            }
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            var cur = this;
            return {
                next: function next() {
                    var tmp = cur;
                    cur = cur.tail;
                    return { done: tmp.tail == null, value: tmp.head };
                }
            };
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_0__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpList",
                interfaces: ["System.IEquatable", "System.IComparable"]
            };
        }
    }, {
        key: "length",
        get: function get() {
            var cur = this,
                acc = 0;
            while (cur.tail != null) {
                cur = cur.tail;
                acc++;
            }
            return acc;
        }
    }]);

    return List;
}();

/* harmony default export */ __webpack_exports__["a"] = (List);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Symbol__ = __webpack_require__(2);
/* unused harmony export fromEqualityComparer */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Comparer = function () {
    function Comparer(f) {
        _classCallCheck(this, Comparer);

        this.Compare = f || __WEBPACK_IMPORTED_MODULE_0__Util__["g" /* compare */];
    }

    _createClass(Comparer, [{
        key: __WEBPACK_IMPORTED_MODULE_1__Symbol__["a" /* default */].reflection,
        value: function value() {
            return { interfaces: ["System.IComparer"] };
        }
    }]);

    return Comparer;
}();

/* harmony default export */ __webpack_exports__["a"] = (Comparer);

function fromEqualityComparer(comparer) {
    if (typeof comparer.Compare === "function") {
        return new Comparer(comparer.Compare);
    } else {
        return new Comparer(function (x, y) {
            var xhash = comparer.GetHashCode(x),
                yhash = comparer.GetHashCode(y);
            if (xhash === yhash) {
                return comparer.Equals(x, y) ? 0 : -1;
            } else {
                return xhash < yhash ? -1 : 1;
            }
        });
    }
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export addRangeInPlace */
/* unused harmony export copyTo */
/* unused harmony export partition */
/* harmony export (immutable) */ __webpack_exports__["b"] = permute;
/* unused harmony export removeInPlace */
/* unused harmony export setSlice */
/* unused harmony export sortInPlaceBy */
/* unused harmony export unzip */
/* unused harmony export unzip3 */
/* harmony export (immutable) */ __webpack_exports__["a"] = chunkBySize;
/* unused harmony export getSubArray */
/* unused harmony export fill */
function addRangeInPlace(range, xs) {
    var iter = range[Symbol.iterator]();
    var cur = iter.next();
    while (!cur.done) {
        xs.push(cur.value);
        cur = iter.next();
    }
}
function copyTo(source, sourceIndex, target, targetIndex, count) {
    while (count--) {
        target[targetIndex++] = source[sourceIndex++];
    }
}
function partition(f, xs) {
    var ys = [],
        zs = [],
        j = 0,
        k = 0;
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i])) ys[j++] = xs[i];else zs[k++] = xs[i];
    }return [ys, zs];
}
function permute(f, xs) {
    var ys = xs.map(function () {
        return null;
    });
    var checkFlags = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        var j = f(i);
        if (j < 0 || j >= xs.length) throw new Error("Not a valid permutation");
        ys[j] = xs[i];
        checkFlags[j] = 1;
    }
    for (var _i = 0; _i < xs.length; _i++) {
        if (checkFlags[_i] != 1) throw new Error("Not a valid permutation");
    }return ys;
}
function removeInPlace(item, xs) {
    var i = xs.indexOf(item);
    if (i > -1) {
        xs.splice(i, 1);
        return true;
    }
    return false;
}
function setSlice(target, lower, upper, source) {
    var length = (upper || target.length - 1) - lower;
    if (ArrayBuffer.isView(target) && source.length <= length) target.set(source, lower);else for (var i = lower | 0, j = 0; j <= length; i++, j++) {
        target[i] = source[j];
    }
}
function sortInPlaceBy(f, xs) {
    var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    return xs.sort(function (x, y) {
        x = f(x);
        y = f(y);
        return (x < y ? -1 : x == y ? 0 : 1) * dir;
    });
}
function unzip(xs) {
    var bs = new Array(xs.length),
        cs = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        bs[i] = xs[i][0];
        cs[i] = xs[i][1];
    }
    return [bs, cs];
}
function unzip3(xs) {
    var bs = new Array(xs.length),
        cs = new Array(xs.length),
        ds = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) {
        bs[i] = xs[i][0];
        cs[i] = xs[i][1];
        ds[i] = xs[i][2];
    }
    return [bs, cs, ds];
}
function chunkBySize(size, xs) {
    if (size < 1) {
        throw new Error("The input must be positive. parameter name: chunkSize");
    }
    if (xs.length === 0) {
        return [[]];
    }
    var result = [];
    for (var x = 0; x < Math.ceil(xs.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(xs.slice(start, end));
    }
    return result;
}
function getSubArray(xs, startIndex, count) {
    return xs.slice(startIndex, startIndex + count);
}
function fill(target, targetIndex, count, value) {
    target.fill(value, targetIndex, targetIndex + count);
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Seq__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Map__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ListClass__["b"]; });
/* unused harmony export append */
/* unused harmony export choose */
/* unused harmony export collect */
/* unused harmony export concat */
/* unused harmony export filter */
/* unused harmony export where */
/* unused harmony export initialize */
/* unused harmony export map */
/* unused harmony export mapIndexed */
/* unused harmony export partition */
/* unused harmony export replicate */
/* unused harmony export reverse */
/* unused harmony export singleton */
/* unused harmony export slice */
/* unused harmony export unzip */
/* unused harmony export unzip3 */
/* unused harmony export groupBy */






/* harmony default export */ __webpack_exports__["b"] = (__WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]);

function append(xs, ys) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["d" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc);
    }, ys, reverse(xs));
}
function choose(f, xs) {
    var r = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["d" /* fold */])(function (acc, x) {
        var y = f(x);
        return y != null ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](y, acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs);
    return reverse(r);
}
function collect(f, xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["d" /* fold */])(function (acc, x) {
        return append(acc, f(x));
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs);
}
function concat(xs) {
    return collect(function (x) {
        return x;
    }, xs);
}
function filter(f, xs) {
    return reverse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["d" /* fold */])(function (acc, x) {
        return f(x) ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function where(f, xs) {
    return filter(f, xs);
}
function initialize(n, f) {
    if (n < 0) {
        throw new Error("List length must be non-negative");
    }
    var xs = new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]();
    for (var i = 1; i <= n; i++) {
        xs = new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](f(n - i), xs);
    }
    return xs;
}
function map(f, xs) {
    return reverse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["d" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](f(x), acc);
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function mapIndexed(f, xs) {
    return reverse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["d" /* fold */])(function (acc, x, i) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](f(i, x), acc);
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function partition(f, xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["d" /* fold */])(function (acc, x) {
        var lacc = acc[0],
            racc = acc[1];
        return f(x) ? [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, lacc), racc] : [lacc, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, racc)];
    }, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]()], reverse(xs));
}
function replicate(n, x) {
    return initialize(n, function () {
        return x;
    });
}
function reverse(xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["d" /* fold */])(function (acc, x) {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc);
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs);
}
function singleton(x) {
    return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]());
}
function slice(lower, upper, xs) {
    var noLower = lower == null;
    var noUpper = upper == null;
    return reverse(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["d" /* fold */])(function (acc, x, i) {
        return (noLower || lower <= i) && (noUpper || i <= upper) ? new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](x, acc) : acc;
    }, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), xs));
}
function unzip(xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["h" /* foldBack */])(function (xy, acc) {
        return [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xy[0], acc[0]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xy[1], acc[1])];
    }, xs, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]()]);
}
function unzip3(xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["h" /* foldBack */])(function (xyz, acc) {
        return [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xyz[0], acc[0]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xyz[1], acc[1]), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](xyz[2], acc[2])];
    }, xs, [new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](), new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]()]);
}
function groupBy(f, xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["i" /* toList */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["j" /* map */])(function (k) {
        return [k[0], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Seq__["i" /* toList */])(k[1])];
    }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Map__["a" /* groupBy */])(f, xs)));
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Win_fs__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__build_fable_core_Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Keyboard_fs__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PongElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return BallElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return GameStatus; });
/* harmony export (immutable) */ __webpack_exports__["f"] = canMove;
/* harmony export (immutable) */ __webpack_exports__["g"] = move;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return Collision; });
/* harmony export (immutable) */ __webpack_exports__["i"] = checkCollision;
/* harmony export (immutable) */ __webpack_exports__["j"] = calculateAngle;
/* harmony export (immutable) */ __webpack_exports__["k"] = collision;
/* harmony export (immutable) */ __webpack_exports__["l"] = moveBall;
/* harmony export (immutable) */ __webpack_exports__["m"] = checkGameStatus;
/* harmony export (immutable) */ __webpack_exports__["n"] = render;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return initialLeftPaddle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return initialRightPaddle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return initialBall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return initialGameStatus; });
/* harmony export (immutable) */ __webpack_exports__["s"] = update;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var patternInput_18 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Win_fs__["a" /* dimensions */])();
var w = patternInput_18[0];
var h = patternInput_18[1];
var PongElement = function () {
    function PongElement(x, y, width, height) {
        _classCallCheck(this, PongElement);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    _createClass(PongElement, [{
        key: __WEBPACK_IMPORTED_MODULE_1__build_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Pong.PongElement",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    x: "number",
                    y: "number",
                    width: "number",
                    height: "number"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__["a" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__["b" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return PongElement;
}();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__build_fable_core_Symbol__["b" /* setType */])("Pong.PongElement", PongElement);
var BallElement = function () {
    function BallElement(element, speed, angle) {
        _classCallCheck(this, BallElement);

        this.element = element;
        this.speed = speed;
        this.angle = angle;
    }

    _createClass(BallElement, [{
        key: __WEBPACK_IMPORTED_MODULE_1__build_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Pong.BallElement",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    element: PongElement,
                    speed: "number",
                    angle: "number"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__["a" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__["b" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return BallElement;
}();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__build_fable_core_Symbol__["b" /* setType */])("Pong.BallElement", BallElement);
var GameStatus = function () {
    function GameStatus(scoreLeft, scoreRight, active) {
        _classCallCheck(this, GameStatus);

        this.scoreLeft = scoreLeft | 0;
        this.scoreRight = scoreRight | 0;
        this.active = active;
    }

    _createClass(GameStatus, [{
        key: __WEBPACK_IMPORTED_MODULE_1__build_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Pong.GameStatus",
                interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
                properties: {
                    scoreLeft: "number",
                    scoreRight: "number",
                    active: "boolean"
                }
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__["a" /* equalsRecords */])(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__["b" /* compareRecords */])(this, other) | 0;
        }
    }]);

    return GameStatus;
}();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__build_fable_core_Symbol__["b" /* setType */])("Pong.GameStatus", GameStatus);
function canMove(direction_0, direction_1, paddle) {
    var direction = [direction_0, direction_1];

    if (direction[0] === 1) {
        return paddle.y > 0;
    } else if (direction[1] === 1) {
        return paddle.y + paddle.height < h;
    } else {
        return false;
    }
}
function move(direction_0, direction_1, paddle) {
    var direction = [direction_0, direction_1];

    if (canMove(direction[0], direction[1], paddle)) {
        if (direction[0] === 1) {
            var y = paddle.y - 5;
            return new PongElement(paddle.x, y, paddle.width, paddle.height);
        } else if (direction[1] === 1) {
            var y_1 = paddle.y + 5;
            return new PongElement(paddle.x, y_1, paddle.width, paddle.height);
        } else {
            return paddle;
        }
    } else {
        return paddle;
    }
}
var Collision = function () {
    function Collision(tag, data) {
        _classCallCheck(this, Collision);

        this.tag = tag;
        this.data = data;
    }

    _createClass(Collision, [{
        key: __WEBPACK_IMPORTED_MODULE_1__build_fable_core_Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Pong.Collision",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["None"], ["Top"], ["Bottom"], ["Left"], ["Right"], ["LeftPaddle"], ["RightPaddle"]]
            };
        }
    }, {
        key: "Equals",
        value: function Equals(other) {
            return this === other || this.tag === other.tag && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__["c" /* equals */])(this.data, other.data);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__["d" /* compareUnions */])(this, other) | 0;
        }
    }]);

    return Collision;
}();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__build_fable_core_Symbol__["b" /* setType */])("Pong.Collision", Collision);
function checkCollision(leftPaddle, rightPaddle, ball) {
    var hitTop = ball.element.y <= 0;
    var hitBottom = ball.element.y + ball.element.height >= h;
    var hitLeft = ball.element.x <= leftPaddle.x ? !(ball.element.y >= leftPaddle.y ? ball.element.y <= leftPaddle.y + leftPaddle.height : false) : false;
    var hitRight = ball.element.x + ball.element.width >= rightPaddle.x + rightPaddle.width ? !(ball.element.y >= rightPaddle.y ? ball.element.y <= rightPaddle.y + rightPaddle.height : false) : false;
    var hitLeftPaddle = (ball.element.x <= leftPaddle.x + leftPaddle.width ? ball.element.y >= leftPaddle.y : false) ? ball.element.y <= leftPaddle.y + leftPaddle.height : false;
    var hitRightPaddle = (ball.element.x + ball.element.width >= rightPaddle.x ? ball.element.y >= rightPaddle.y : false) ? ball.element.y <= rightPaddle.y + rightPaddle.height : false;
    var matchValue = [hitTop, hitBottom, hitLeft, hitRight, hitLeftPaddle, hitRightPaddle];

    if (matchValue[0]) {
        return new Collision(1);
    } else if (matchValue[1]) {
        return new Collision(2);
    } else if (matchValue[2]) {
        return new Collision(3);
    } else if (matchValue[3]) {
        return new Collision(4);
    } else if (matchValue[4]) {
        return new Collision(5);
    } else if (matchValue[5]) {
        return new Collision(6);
    } else {
        return new Collision(0);
    }
}
function calculateAngle(paddle, hitRightPaddle, determineAngle, ball) {
    var relativeIntersectY = paddle.y + paddle.height / 2 - ball.element.y;
    var normalizedRelativeIntersectionY = relativeIntersectY / (paddle.height / 2);

    if (normalizedRelativeIntersectionY === 0 ? hitRightPaddle : false) {
        return 3.141592653589793;
    } else {
        return determineAngle(normalizedRelativeIntersectionY);
    }
}
function collision(leftPaddle, rightPaddle, ball) {
    var matchValue = function (ball_1) {
        return checkCollision(leftPaddle, rightPaddle, ball_1);
    }(ball);

    var $var1 = matchValue.tag === 1 ? [1] : matchValue.tag === 2 ? [1] : matchValue.tag === 3 ? [2] : matchValue.tag === 4 ? [2] : matchValue.tag === 5 ? [3] : matchValue.tag === 6 ? [4] : [0];

    switch ($var1[0]) {
        case 0:
            return ball.angle;

        case 1:
            return -ball.angle;

        case 2:
            return ball.angle;

        case 3:
            return function () {
                var determineAngle = function determineAngle(intersection) {
                    return intersection * (5 * 3.141592653589793 / 12);
                };

                return function (ball_2) {
                    return calculateAngle(leftPaddle, false, determineAngle, ball_2);
                };
            }()(ball);

        case 4:
            return function () {
                var determineAngle_1 = function determineAngle_1(intersection_1) {
                    return 3.141592653589793 - intersection_1 * (5 * 3.141592653589793 / 12);
                };

                return function (ball_3) {
                    return calculateAngle(rightPaddle, true, determineAngle_1, ball_3);
                };
            }()(ball);
    }
}
function moveBall(angle, ball) {
    return new BallElement(new PongElement(ball.element.x + ball.speed * Math.cos(angle), ball.element.y + ball.speed * -Math.sin(angle), ball.element.width, ball.element.height), ball.speed + 0.005, angle);
}
function checkGameStatus(leftPaddle, rightPaddle, ball, gameStatus) {
    var matchValue = function (ball_1) {
        return checkCollision(leftPaddle, rightPaddle, ball_1);
    }(ball);

    if (matchValue.tag === 3) {
        var scoreRight = gameStatus.scoreRight + 1 | 0;
        return new GameStatus(gameStatus.scoreLeft, scoreRight, false);
    } else if (matchValue.tag === 4) {
        var scoreLeft = gameStatus.scoreLeft + 1 | 0;
        return new GameStatus(scoreLeft, gameStatus.scoreRight, false);
    } else {
        return gameStatus;
    }
}
function render(w_1, h_1, leftPaddle, rightPaddle, ball, gameStatus) {
    (function (tupledArg) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Win_fs__["b" /* drawRect */])("black", tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3]);
    })([0, 0, w_1, h_1]);

    (function (tupledArg_1) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Win_fs__["b" /* drawRect */])("white", tupledArg_1[0], tupledArg_1[1], tupledArg_1[2], tupledArg_1[3]);
    })([leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height]);

    (function (tupledArg_2) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Win_fs__["b" /* drawRect */])("white", tupledArg_2[0], tupledArg_2[1], tupledArg_2[2], tupledArg_2[3]);
    })([rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height]);

    (function () {
        var text = gameStatus.scoreLeft.toString();
        return function (tupledArg_3) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Win_fs__["c" /* drawText */])(text, "white", "30px Arial", tupledArg_3[0], tupledArg_3[1]);
        };
    })()([w_1 / 4, 40]);
    (function () {
        var text_1 = gameStatus.scoreRight.toString();
        return function (tupledArg_4) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Win_fs__["c" /* drawText */])(text_1, "white", "30px Arial", tupledArg_4[0], tupledArg_4[1]);
        };
    })()([w_1 / 1.25 - 30, 40]);

    (function (tupledArg_5) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Win_fs__["d" /* drawCircle */])("yellow", tupledArg_5[0], tupledArg_5[1], tupledArg_5[2], tupledArg_5[3], tupledArg_5[4]);
    })([ball.element.x, ball.element.y, ball.element.width, 0, 2 * 3.141592653589793]);

    if (!gameStatus.active) {
        (function (tupledArg_6) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Win_fs__["c" /* drawText */])("Press 'r' to start", "green", "40px Lucida Console", tupledArg_6[0], tupledArg_6[1]);
        })([w_1 / 2 - 230, h_1 / 2 + 40]);
    }
}
var initialLeftPaddle = new PongElement(10, h / 2 - 70 / 2, 15, 70);
var initialRightPaddle = new PongElement(w - 15 - 10, h / 2 - 70 / 2, 15, 70);
var initialBall = new BallElement(new PongElement(w / 2, h / 2, 5, 5), 3, 0);
var initialGameStatus = new GameStatus(0, 0, false);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Keyboard_fs__["a" /* init */])();
function update(leftPaddle, rightPaddle, ball, gameStatus, unitVar4) {
    var leftPaddle_1 = gameStatus.active ? function () {
        var tupledArg = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Keyboard_fs__["b" /* leftControlsPressed */])();
        return function (paddle) {
            return move(tupledArg[0], tupledArg[1], paddle);
        };
    }()(leftPaddle) : initialLeftPaddle;
    var rightPaddle_1 = gameStatus.active ? function () {
        var tupledArg_1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Keyboard_fs__["c" /* rightControlsPressed */])();
        return function (paddle_1) {
            return move(tupledArg_1[0], tupledArg_1[1], paddle_1);
        };
    }()(rightPaddle) : initialRightPaddle;
    var angle = gameStatus.active ? collision(leftPaddle_1, rightPaddle_1, ball) : ball.angle;
    var ball_2 = void 0;

    if (gameStatus.active) {
        ball_2 = function (ball_1) {
            return moveBall(angle, ball_1);
        }(ball);
    } else {
        var angle_1 = angle === 0 ? 3.141592653589793 : 0;
        ball_2 = new BallElement(initialBall.element, initialBall.speed, angle_1);
    }

    var gameStatus_2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Keyboard_fs__["d" /* rKeyPressed */])() === 1 ? new GameStatus(gameStatus.scoreLeft, gameStatus.scoreRight, true) : function (gameStatus_1) {
        return checkGameStatus(leftPaddle_1, rightPaddle_1, ball_2, gameStatus_1);
    }(gameStatus);
    render(w, h, leftPaddle_1, rightPaddle_1, ball_2, gameStatus_2);
    window.setTimeout(function () {
        update(leftPaddle_1, rightPaddle_1, ball_2, gameStatus_2, null);
    }, 1000 / 60);
}
update(initialLeftPaddle, initialRightPaddle, initialBall, initialGameStatus, null);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListClass__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Comparer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Seq__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = groupBy;
/* unused harmony export countBy */
/* unused harmony export MapTree */
/* unused harmony export create */
/* unused harmony export add */
/* unused harmony export remove */
/* unused harmony export containsValue */
/* unused harmony export tryGetValue */
/* unused harmony export exists */
/* unused harmony export find */
/* unused harmony export tryFind */
/* unused harmony export filter */
/* unused harmony export fold */
/* unused harmony export foldBack */
/* unused harmony export forAll */
/* unused harmony export isEmpty */
/* unused harmony export iterate */
/* unused harmony export map */
/* unused harmony export partition */
/* unused harmony export findKey */
/* unused harmony export tryFindKey */
/* unused harmony export pick */
/* unused harmony export tryPick */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }













function groupBy(f, xs) {
    var keys = [],
        iter = xs[Symbol.iterator]();
    var acc = create(),
        cur = iter.next();
    while (!cur.done) {
        var k = f(cur.value),
            vs = tryFind(k, acc);
        if (vs == null) {
            keys.push(k);
            acc = add(k, [cur.value], acc);
        } else {
            vs.push(cur.value);
        }
        cur = iter.next();
    }
    return keys.map(function (k) {
        return [k, acc.get(k)];
    });
}
function countBy(f, xs) {
    return groupBy(f, xs).map(function (kv) {
        return [kv[0], kv[1].length];
    });
}
var MapTree = function MapTree(tag, data) {
    _classCallCheck(this, MapTree);

    this.tag = tag | 0;
    this.data = data;
};
function tree_sizeAux(acc, m) {
    sizeAux: while (true) {
        if (m.tag === 1) {
            return acc + 1 | 0;
        } else if (m.tag === 2) {
            acc = tree_sizeAux(acc + 1, m.data[2]);
            m = m.data[3];
            continue sizeAux;
        } else {
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
    var matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
    switch (matchValue) {
        case 0:
            return new MapTree(1, [k, v]);
        case 1:
            var hl = tree_height(l) | 0;
            var hr = tree_height(r) | 0;
            var m = (hl < hr ? hr : hl) | 0;
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
                } else {
                    throw new Error("rebalance");
                }
            } else {
                return tree_mk(tree_mk(t1, k, v, t2.data[2]), t2.data[0], t2.data[1], t2.data[3]);
            }
        } else {
            throw new Error("rebalance");
        }
    } else {
        if (t1h > t2h + 2) {
            if (t1.tag === 2) {
                if (tree_height(t1.data[3]) > t2h + 1) {
                    if (t1.data[3].tag === 2) {
                        return tree_mk(tree_mk(t1.data[2], t1.data[0], t1.data[1], t1.data[3].data[2]), t1.data[3].data[0], t1.data[3].data[1], tree_mk(t1.data[3].data[3], k, v, t2));
                    } else {
                        throw new Error("rebalance");
                    }
                } else {
                    return tree_mk(t1.data[2], t1.data[0], t1.data[1], tree_mk(t1.data[3], k, v, t2));
                }
            } else {
                throw new Error("rebalance");
            }
        } else {
            return tree_mk(t1, k, v, t2);
        }
    }
}
function tree_add(comparer, k, v, m) {
    if (m.tag === 1) {
        var c = comparer.Compare(k, m.data[0]);
        if (c < 0) {
            return new MapTree(2, [k, v, new MapTree(0), m, 2]);
        } else if (c === 0) {
            return new MapTree(1, [k, v]);
        }
        return new MapTree(2, [k, v, m, new MapTree(0), 2]);
    } else if (m.tag === 2) {
        var _c = comparer.Compare(k, m.data[0]);
        if (_c < 0) {
            return tree_rebalance(tree_add(comparer, k, v, m.data[2]), m.data[0], m.data[1], m.data[3]);
        } else if (_c === 0) {
            return new MapTree(2, [k, v, m.data[2], m.data[3], m.data[4]]);
        }
        return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_add(comparer, k, v, m.data[3]));
    }
    return new MapTree(1, [k, v]);
}
function tree_find(comparer, k, m) {
    var res = tree_tryFind(comparer, k, m);
    if (res != null) return res;
    throw new Error("key not found");
}
function tree_tryFind(comparer, k, m) {
    tryFind: while (true) {
        if (m.tag === 1) {
            var c = comparer.Compare(k, m.data[0]) | 0;
            if (c === 0) {
                return m.data[1];
            } else {
                return null;
            }
        } else if (m.tag === 2) {
            var c_1 = comparer.Compare(k, m.data[0]) | 0;
            if (c_1 < 0) {
                comparer = comparer;
                k = k;
                m = m.data[2];
                continue tryFind;
            } else if (c_1 === 0) {
                return m.data[1];
            } else {
                comparer = comparer;
                k = k;
                m = m.data[3];
                continue tryFind;
            }
        } else {
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
        return tree_partition1(comparer, f, s.data[0], s.data[1], acc[0], acc[1]);
    } else if (s.tag === 2) {
        var acc_2 = tree_partitionAux(comparer, f, s.data[3], acc[0], acc[1]);
        var acc_3 = tree_partition1(comparer, f, s.data[0], s.data[1], acc_2[0], acc_2[1]);
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
    } else if (m.tag === 2) {
        if (m.data[2].tag === 0) {
            return [m.data[0], m.data[1], m.data[3]];
        } else {
            var kvl = tree_spliceOutSuccessor(m.data[2]);
            return [kvl[0], kvl[1], tree_mk(kvl[2], m.data[0], m.data[1], m.data[3])];
        }
    }
    throw new Error("internal error: Map.spliceOutSuccessor");
}
function tree_remove(comparer, k, m) {
    if (m.tag === 1) {
        var c = comparer.Compare(k, m.data[0]);
        if (c === 0) {
            return new MapTree(0);
        } else {
            return m;
        }
    } else if (m.tag === 2) {
        var _c2 = comparer.Compare(k, m.data[0]);
        if (_c2 < 0) {
            return tree_rebalance(tree_remove(comparer, k, m.data[2]), m.data[0], m.data[1], m.data[3]);
        } else if (_c2 === 0) {
            if (m.data[2].tag === 0) {
                return m.data[3];
            } else {
                if (m.data[3].tag === 0) {
                    return m.data[2];
                } else {
                    var input = tree_spliceOutSuccessor(m.data[3]);
                    return tree_mk(m.data[2], input[0], input[1], input[2]);
                }
            }
        } else {
            return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_remove(comparer, k, m.data[3]));
        }
    } else {
        return tree_empty();
    }
}
function tree_mem(comparer, k, m) {
    mem: while (true) {
        if (m.tag === 1) {
            return comparer.Compare(k, m.data[0]) === 0;
        } else if (m.tag === 2) {
            var c = comparer.Compare(k, m.data[0]) | 0;
            if (c < 0) {
                comparer = comparer;
                k = k;
                m = m.data[2];
                continue mem;
            } else if (c === 0) {
                return true;
            } else {
                comparer = comparer;
                k = k;
                m = m.data[3];
                continue mem;
            }
        } else {
            return false;
        }
    }
}
function tree_iter(f, m) {
    if (m.tag === 1) {
        f(m.data[0], m.data[1]);
    } else if (m.tag === 2) {
        tree_iter(f, m.data[2]);
        f(m.data[0], m.data[1]);
        tree_iter(f, m.data[3]);
    }
}
function tree_tryPick(f, m) {
    if (m.tag === 1) {
        return f(m.data[0], m.data[1]);
    } else if (m.tag === 2) {
        var matchValue = tree_tryPick(f, m.data[2]);
        if (matchValue == null) {
            var matchValue_1 = f(m.data[0], m.data[1]);
            if (matchValue_1 == null) {
                return tree_tryPick(f, m.data[3]);
            } else {
                var res = matchValue_1;
                return res;
            }
        } else {
            return matchValue;
        }
    } else {
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
        } else if (stack.head.tag === 2) {
            return tree_collapseLHS(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ListClass__["b" /* ofArray */])([stack.head.data[2], new MapTree(1, [stack.head.data[0], stack.head.data[1]]), stack.head.data[3]], stack.tail));
        } else {
            return tree_collapseLHS(stack.tail);
        }
    } else {
        return new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]();
    }
}
function tree_mkIterator(s) {
    return { stack: tree_collapseLHS(new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */](s, new __WEBPACK_IMPORTED_MODULE_0__ListClass__["a" /* default */]())), started: false };
}
function tree_moveNext(i) {
    function current(i) {
        if (i.stack.tail == null) {
            return null;
        } else if (i.stack.head.tag === 1) {
            return [i.stack.head.data[0], i.stack.head.data[1]];
        }
        throw new Error("Please report error: Map iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        } else {
            if (i.stack.head.tag === 1) {
                i.stack = tree_collapseLHS(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            } else {
                throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
            }
        }
    } else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
    ;
}

var FableMap = function () {
    function FableMap() {
        _classCallCheck(this, FableMap);
    }

    _createClass(FableMap, [{
        key: "ToString",
        value: function ToString() {
            return "map [" + Array.from(this).map(function (x) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["f" /* toString */])(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(m2) {
            return this.CompareTo(m2) === 0;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(m2) {
            var _this = this;

            return this === m2 ? 0 : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["k" /* compareWith */])(function (kvp1, kvp2) {
                var c = _this.comparer.Compare(kvp1[0], kvp2[0]);
                return c !== 0 ? c : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["g" /* compare */])(kvp1[1], kvp2[1]);
            }, this, m2);
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            var i = tree_mkIterator(this.tree);
            return {
                next: function next() {
                    return tree_moveNext(i);
                }
            };
        }
    }, {
        key: "entries",
        value: function entries() {
            return this[Symbol.iterator]();
        }
    }, {
        key: "keys",
        value: function keys() {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["j" /* map */])(function (kv) {
                return kv[0];
            }, this);
        }
    }, {
        key: "values",
        value: function values() {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["j" /* map */])(function (kv) {
                return kv[1];
            }, this);
        }
    }, {
        key: "get",
        value: function get(k) {
            return tree_find(this.comparer, k, this.tree);
        }
    }, {
        key: "has",
        value: function has(k) {
            return tree_mem(this.comparer, k, this.tree);
        }
    }, {
        key: "set",
        value: function set(k, v) {
            this.tree = tree_add(this.comparer, k, v, this.tree);
        }
    }, {
        key: "delete",
        value: function _delete(k) {
            var oldSize = tree_size(this.tree);
            this.tree = tree_remove(this.comparer, k, this.tree);
            return oldSize > tree_size(this.tree);
        }
    }, {
        key: "clear",
        value: function clear() {
            this.tree = tree_empty();
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_3__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpMap",
                interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
            };
        }
    }, {
        key: "size",
        get: function get() {
            return tree_size(this.tree);
        }
    }]);

    return FableMap;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (FableMap);

function from(comparer, tree) {
    var map = new FableMap();
    map.tree = tree;
    map.comparer = comparer || new __WEBPACK_IMPORTED_MODULE_2__Comparer__["a" /* default */]();
    return map;
}
function create(ie, comparer) {
    comparer = comparer || new __WEBPACK_IMPORTED_MODULE_2__Comparer__["a" /* default */]();
    return from(comparer, ie ? tree_ofSeq(comparer, ie) : tree_empty());
}
function add(k, v, map) {
    return from(map.comparer, tree_add(map.comparer, k, v, map.tree));
}
function remove(item, map) {
    return from(map.comparer, tree_remove(map.comparer, item, map.tree));
}
function containsValue(v, map) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["d" /* fold */])(function (acc, k) {
        return acc || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["c" /* equals */])(map.get(k), v);
    }, false, map.keys());
}
function tryGetValue(map, key, defaultValue) {
    return map.has(key) ? [true, map.get(key)] : [false, defaultValue];
}
function exists(f, map) {
    return tree_exists(f, map.tree);
}
function find(k, map) {
    return tree_find(map.comparer, k, map.tree);
}
function tryFind(k, map) {
    return tree_tryFind(map.comparer, k, map.tree);
}
function filter(f, map) {
    return from(map.comparer, tree_filter(map.comparer, f, map.tree));
}
function fold(f, seed, map) {
    return tree_fold(f, seed, map.tree);
}
function foldBack(f, map, seed) {
    return tree_foldBack(f, map.tree, seed);
}
function forAll(f, map) {
    return tree_forall(f, map.tree);
}
function isEmpty(map) {
    return tree_isEmpty(map.tree);
}
function iterate(f, map) {
    tree_iter(f, map.tree);
}
function map(f, map) {
    return from(map.comparer, tree_mapi(f, map.tree));
}
function partition(f, map) {
    var rs = tree_partition(map.comparer, f, map.tree);
    return [from(map.comparer, rs[0]), from(map.comparer, rs[1])];
}
function findKey(f, map) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["l" /* pick */])(function (kv) {
        return f(kv[0], kv[1]) ? kv[0] : null;
    }, map);
}
function tryFindKey(f, map) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["m" /* tryPick */])(function (kv) {
        return f(kv[0], kv[1]) ? kv[0] : null;
    }, map);
}
function pick(f, map) {
    var res = tryPick(f, map);
    if (res != null) return res;
    throw new Error("key not found");
}
function tryPick(f, map) {
    return tree_tryPick(f, map.tree);
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__List__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Comparer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Symbol__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Seq__ = __webpack_require__(0);
/* unused harmony export distinctBy */
/* unused harmony export distinct */
/* unused harmony export SetTree */
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
/* unused harmony export isEmpty */
/* harmony export (immutable) */ __webpack_exports__["b"] = add;
/* unused harmony export addInPlace */
/* harmony export (immutable) */ __webpack_exports__["c"] = remove;
/* unused harmony export union */
/* unused harmony export op_Addition */
/* unused harmony export unionInPlace */
/* unused harmony export unionMany */
/* unused harmony export difference */
/* unused harmony export op_Subtraction */
/* unused harmony export differenceInPlace */
/* unused harmony export intersect */
/* unused harmony export intersectInPlace */
/* unused harmony export intersectMany */
/* unused harmony export isProperSubsetOf */
/* unused harmony export isProperSubset */
/* unused harmony export isSubsetOf */
/* unused harmony export isSubset */
/* unused harmony export isProperSupersetOf */
/* unused harmony export isProperSuperset */
/* unused harmony export isSupersetOf */
/* unused harmony export isSuperset */
/* unused harmony export copyTo */
/* unused harmony export partition */
/* unused harmony export filter */
/* unused harmony export map */
/* unused harmony export exists */
/* unused harmony export forAll */
/* unused harmony export fold */
/* unused harmony export foldBack */
/* unused harmony export iterate */
/* unused harmony export minimumElement */
/* unused harmony export minElement */
/* unused harmony export maximumElement */
/* unused harmony export maxElement */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }













function distinctBy(f, xs) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["a" /* choose */])(function (tup) {
        return tup[0];
    }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["b" /* scan */])(function (tup, x) {
        var acc = tup[1];
        var k = f(x);
        return acc.has(k) ? [null, acc] : [x, add(k, acc)];
    }, [null, create()], xs));
}
function distinct(xs) {
    return distinctBy(function (x) {
        return x;
    }, xs);
}
var SetTree = function SetTree(tag, data) {
    _classCallCheck(this, SetTree);

    this.tag = tag | 0;
    this.data = data;
};
var tree_tolerance = 2;
function tree_countAux(s, acc) {
    countAux: while (true) {
        if (s.tag === 1) {
            return acc + 1 | 0;
        } else if (s.tag === 0) {
            return acc | 0;
        } else {
            var _var5 = s.data[1];
            acc = tree_countAux(s.data[2], acc + 1);
            s = _var5;
            continue countAux;
        }
    }
}
function tree_count(s) {
    return tree_countAux(s, 0);
}
function tree_SetOne(n) {
    return new SetTree(1, [n]);
}
function tree_SetNode(x, l, r, h) {
    return new SetTree(2, [x, l, r, h]);
}
function tree_height(t) {
    return t.tag === 1 ? 1 : t.tag === 2 ? t.data[3] : 0;
}
function tree_mk(l, k, r) {
    var matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
    switch (matchValue) {
        case 0:
            return tree_SetOne(k);
        case 1:
            var hl = tree_height(l) | 0;
            var hr = tree_height(r) | 0;
            var m = (hl < hr ? hr : hl) | 0;
            return tree_SetNode(k, l, r, m + 1);
    }
    throw new Error("internal error: Set.tree_mk");
}
function tree_rebalance(t1, k, t2) {
    var t1h = tree_height(t1);
    var t2h = tree_height(t2);
    if (t2h > t1h + tree_tolerance) {
        if (t2.tag === 2) {
            if (tree_height(t2.data[1]) > t1h + 1) {
                if (t2.data[1].tag === 2) {
                    return tree_mk(tree_mk(t1, k, t2.data[1].data[1]), t2.data[1].data[0], tree_mk(t2.data[1].data[2], t2.data[0], t2.data[2]));
                } else {
                    throw new Error("rebalance");
                }
            } else {
                return tree_mk(tree_mk(t1, k, t2.data[1]), t2.data[0], t2.data[2]);
            }
        } else {
            throw new Error("rebalance");
        }
    } else {
        if (t1h > t2h + tree_tolerance) {
            if (t1.tag === 2) {
                if (tree_height(t1.data[2]) > t2h + 1) {
                    if (t1.data[2].tag === 2) {
                        return tree_mk(tree_mk(t1.data[1], t1.data[0], t1.data[2].data[1]), t1.data[2].data[0], tree_mk(t1.data[2].data[2], k, t2));
                    } else {
                        throw new Error("rebalance");
                    }
                } else {
                    return tree_mk(t1.data[1], t1.data[0], tree_mk(t1.data[2], k, t2));
                }
            } else {
                throw new Error("rebalance");
            }
        } else {
            return tree_mk(t1, k, t2);
        }
    }
}
function tree_add(comparer, k, t) {
    if (t.tag === 1) {
        var c = comparer.Compare(k, t.data[0]);
        if (c < 0) {
            return tree_SetNode(k, new SetTree(0), t, 2);
        } else if (c === 0) {
            return t;
        } else {
            return tree_SetNode(k, t, new SetTree(0), 2);
        }
    } else if (t.tag === 0) {
        return tree_SetOne(k);
    } else {
        var _c = comparer.Compare(k, t.data[0]);
        if (_c < 0) {
            return tree_rebalance(tree_add(comparer, k, t.data[1]), t.data[0], t.data[2]);
        } else if (_c === 0) {
            return t;
        } else {
            return tree_rebalance(t.data[1], t.data[0], tree_add(comparer, k, t.data[2]));
        }
    }
}
function tree_balance(comparer, t1, k, t2) {
    var matchValue = t1.tag === 2 ? t2.tag === 0 ? [1, t1] : t2.tag === 2 ? [2, t1.data[0], t2] : [2, t1.data[0], t2] : t1.tag === 1 ? t2.tag === 2 ? [3, t2.data[0], t1] : t2.tag === 1 ? [4, t1.data[3], t2.data[3], t1.data[0], t2.data[0], t1.data[1], t1.data[2], t2.data[1], t2.data[2]] : [1, t1] : [0, t2];
    switch (matchValue[0]) {
        case 0:
            return tree_add(comparer, k, matchValue[1]);
        case 1:
            return tree_add(comparer, k, matchValue[1]);
        case 2:
            return tree_add(comparer, k, tree_add(comparer, matchValue[1], matchValue[2]));
        case 3:
            return tree_add(comparer, k, tree_add(comparer, matchValue[1], matchValue[2]));
        case 4:
            if (matchValue[1] + tree_tolerance < matchValue[2]) {
                return tree_rebalance(tree_balance(comparer, t1, k, matchValue[7]), matchValue[4], matchValue[8]);
            } else if (matchValue[2] + tree_tolerance < matchValue[1]) {
                return tree_rebalance(matchValue[5], matchValue[3], tree_balance(comparer, matchValue[6], k, t2));
            } else {
                return tree_mk(t1, k, t2);
            }
    }
    throw new Error("internal error: Set.tree_balance");
}
function tree_split(comparer, pivot, t) {
    if (t.tag === 1) {
        var c = comparer.Compare(t.data[0], pivot);
        if (c < 0) {
            return [t, false, new SetTree(0)];
        } else if (c === 0) {
            return [new SetTree(0), true, new SetTree(0)];
        } else {
            return [new SetTree(0), false, t];
        }
    } else if (t.tag === 0) {
        return [new SetTree(0), false, new SetTree(0)];
    } else {
        var _c2 = comparer.Compare(pivot, t.data[0]);
        if (_c2 < 0) {
            var patternInput = tree_split(comparer, pivot, t.data[1]);
            return [patternInput[0], patternInput[1], tree_balance(comparer, patternInput[2], t.data[0], t.data[2])];
        } else if (_c2 === 0) {
            return [t.data[1], true, t.data[2]];
        } else {
            var _patternInput = tree_split(comparer, pivot, t.data[2]);
            return [tree_balance(comparer, t.data[1], t.data[0], _patternInput[0]), _patternInput[1], _patternInput[2]];
        }
    }
}
function tree_spliceOutSuccessor(t) {
    if (t.tag === 1) {
        return [t.data[0], new SetTree(0)];
    } else if (t.tag === 2) {
        if (t.data[1].tag === 0) {
            return [t.data[0], t.data[2]];
        } else {
            var patternInput = tree_spliceOutSuccessor(t.data[1]);
            return [patternInput[0], tree_mk(patternInput[1], t.data[0], t.data[2])];
        }
    } else {
        throw new Error("internal error: Map.spliceOutSuccessor");
    }
}
function tree_remove(comparer, k, t) {
    if (t.tag === 1) {
        var c = comparer.Compare(k, t.data[0]);
        if (c === 0) {
            return new SetTree(0);
        } else {
            return t;
        }
    } else if (t.tag === 2) {
        var _c3 = comparer.Compare(k, t.data[0]);
        if (_c3 < 0) {
            return tree_rebalance(tree_remove(comparer, k, t.data[1]), t.data[0], t.data[2]);
        } else if (_c3 === 0) {
            var matchValue = [t.data[1], t.data[2]];
            if (matchValue[0].tag === 0) {
                return t.data[2];
            } else if (matchValue[1].tag === 0) {
                return t.data[1];
            } else {
                var patternInput = tree_spliceOutSuccessor(t.data[2]);
                return tree_mk(t.data[1], patternInput[0], patternInput[1]);
            }
        } else {
            return tree_rebalance(t.data[1], t.data[0], tree_remove(comparer, k, t.data[2]));
        }
    } else {
        return t;
    }
}
function tree_mem(comparer, k, t) {
    mem: while (true) {
        if (t.tag === 1) {
            return comparer.Compare(k, t.data[0]) === 0;
        } else if (t.tag === 0) {
            return false;
        } else {
            var c = comparer.Compare(k, t.data[0]) | 0;
            if (c < 0) {
                comparer = comparer;
                k = k;
                t = t.data[1];
                continue mem;
            } else if (c === 0) {
                return true;
            } else {
                comparer = comparer;
                k = k;
                t = t.data[2];
                continue mem;
            }
        }
    }
}
function tree_iter(f, t) {
    if (t.tag === 1) {
        f(t.data[0]);
    } else {
        if (t.tag === 0) {} else {
            tree_iter(f, t.data[1]);
            f(t.data[0]);
            tree_iter(f, t.data[2]);
        }
    }
}
function tree_foldBack(f, m, x) {
    return m.tag === 1 ? f(m.data[0], x) : m.tag === 0 ? x : tree_foldBack(f, m.data[1], f(m.data[0], tree_foldBack(f, m.data[2], x)));
}
function tree_fold(f, x, m) {
    if (m.tag === 1) {
        return f(x, m.data[0]);
    } else if (m.tag === 0) {
        return x;
    } else {
        var x_1 = tree_fold(f, x, m.data[1]);
        var x_2 = f(x_1, m.data[0]);
        return tree_fold(f, x_2, m.data[2]);
    }
}
function tree_forall(f, m) {
    return m.tag === 1 ? f(m.data[0]) : m.tag === 0 ? true : (f(m.data[0]) ? tree_forall(f, m.data[1]) : false) ? tree_forall(f, m.data[2]) : false;
}
function tree_exists(f, m) {
    return m.tag === 1 ? f(m.data[0]) : m.tag === 0 ? false : (f(m.data[0]) ? true : tree_exists(f, m.data[1])) ? true : tree_exists(f, m.data[2]);
}
function tree_isEmpty(m) {
    return m.tag === 0 ? true : false;
}
function tree_subset(comparer, a, b) {
    return tree_forall(function (x) {
        return tree_mem(comparer, x, b);
    }, a);
}
function tree_psubset(comparer, a, b) {
    return tree_forall(function (x) {
        return tree_mem(comparer, x, b);
    }, a) ? tree_exists(function (x) {
        return !tree_mem(comparer, x, a);
    }, b) : false;
}
function tree_filterAux(comparer, f, s, acc) {
    if (s.tag === 1) {
        if (f(s.data[0])) {
            return tree_add(comparer, s.data[0], acc);
        } else {
            return acc;
        }
    } else if (s.tag === 0) {
        return acc;
    } else {
        var acc_1 = f(s.data[0]) ? tree_add(comparer, s.data[0], acc) : acc;
        return tree_filterAux(comparer, f, s.data[1], tree_filterAux(comparer, f, s.data[2], acc_1));
    }
}
function tree_filter(comparer, f, s) {
    return tree_filterAux(comparer, f, s, new SetTree(0));
}
function tree_diffAux(comparer, m, acc) {
    diffAux: while (true) {
        if (m.tag === 1) {
            return tree_remove(comparer, m.data[0], acc);
        } else if (m.tag === 0) {
            return acc;
        } else {
            var _var6 = comparer;
            var _var7 = m.data[1];
            acc = tree_diffAux(comparer, m.data[2], tree_remove(comparer, m.data[0], acc));
            comparer = _var6;
            m = _var7;
            continue diffAux;
        }
    }
}
function tree_diff(comparer, a, b) {
    return tree_diffAux(comparer, b, a);
}
function tree_union(comparer, t1, t2) {
    var matchValue = t1.tag === 0 ? [1, t2] : t1.tag === 1 ? t2.tag === 0 ? [2, t1] : t2.tag === 1 ? [3, t1.data[0], t2] : [3, t1.data[0], t2] : t2.tag === 0 ? [2, t1] : t2.tag === 1 ? [4, t2.data[0], t1] : [0, t1.data[3], t2.data[3], t1.data[0], t2.data[0], t1.data[1], t1.data[2], t2.data[1], t2.data[2]];
    switch (matchValue[0]) {
        case 0:
            if (matchValue[1] > matchValue[2]) {
                var patternInput = tree_split(comparer, matchValue[3], t2);
                return tree_balance(comparer, tree_union(comparer, matchValue[5], patternInput[0]), matchValue[3], tree_union(comparer, matchValue[6], patternInput[2]));
            } else {
                var patternInput_1 = tree_split(comparer, matchValue[4], t1);
                return tree_balance(comparer, tree_union(comparer, matchValue[7], patternInput_1[0]), matchValue[4], tree_union(comparer, matchValue[8], patternInput_1[2]));
            }
        case 1:
            return matchValue[1];
        case 2:
            return matchValue[1];
        case 3:
            return tree_add(comparer, matchValue[1], matchValue[2]);
        case 4:
            return tree_add(comparer, matchValue[1], matchValue[2]);
    }
    throw new Error("internal error: Set.tree_union");
}
function tree_intersectionAux(comparer, b, m, acc) {
    intersectionAux: while (true) {
        if (m.tag === 1) {
            if (tree_mem(comparer, m.data[0], b)) {
                return tree_add(comparer, m.data[0], acc);
            } else {
                return acc;
            }
        } else if (m.tag === 0) {
            return acc;
        } else {
            var acc_1 = tree_intersectionAux(comparer, b, m.data[2], acc);
            var acc_2 = tree_mem(comparer, m.data[0], b) ? tree_add(comparer, m.data[0], acc_1) : acc_1;
            comparer = comparer;
            b = b;
            m = m.data[1];
            acc = acc_2;
            continue intersectionAux;
        }
    }
}
function tree_intersection(comparer, a, b) {
    return tree_intersectionAux(comparer, b, a, new SetTree(0));
}
function tree_partition1(comparer, f, k, acc1, acc2) {
    return f(k) ? [tree_add(comparer, k, acc1), acc2] : [acc1, tree_add(comparer, k, acc2)];
}
function tree_partitionAux(comparer, f, s, acc_0, acc_1) {
    var acc = [acc_0, acc_1];
    if (s.tag === 1) {
        return tree_partition1(comparer, f, s.data[0], acc[0], acc[1]);
    } else if (s.tag === 0) {
        return acc;
    } else {
        var acc_2 = tree_partitionAux(comparer, f, s.data[2], acc[0], acc[1]);
        var acc_3 = tree_partition1(comparer, f, s.data[0], acc_2[0], acc_2[1]);
        return tree_partitionAux(comparer, f, s.data[1], acc_3[0], acc_3[1]);
    }
}
function tree_partition(comparer, f, s) {
    return tree_partitionAux(comparer, f, s, new SetTree(0), new SetTree(0));
}
function tree_minimumElementAux(s, n) {
    return s.tag === 1 ? s.data[0] : s.tag === 0 ? n : tree_minimumElementAux(s.data[1], s.data[0]);
}
function tree_minimumElementOpt(s) {
    return s.tag === 1 ? s.data[0] : s.tag === 0 ? null : tree_minimumElementAux(s.data[1], s.data[0]);
}
function tree_maximumElementAux(s, n) {
    return s.tag === 1 ? s.data[0] : s.tag === 0 ? n : tree_maximumElementAux(s.data[2], s.data[0]);
}
function tree_maximumElementOpt(s) {
    return s.tag === 1 ? s.data[0] : s.tag === 0 ? null : tree_maximumElementAux(s.data[2], s.data[0]);
}
function tree_minimumElement(s) {
    var matchValue = tree_minimumElementOpt(s);
    if (matchValue == null) {
        throw new Error("Set contains no elements");
    } else {
        return matchValue;
    }
}
function tree_maximumElement(s) {
    var matchValue = tree_maximumElementOpt(s);
    if (matchValue == null) {
        throw new Error("Set contains no elements");
    } else {
        return matchValue;
    }
}
function tree_collapseLHS(stack) {
    collapseLHS: while (true) {
        if (stack.tail != null) {
            if (stack.head.tag === 1) {
                return stack;
            } else if (stack.head.tag === 2) {
                stack = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["a" /* ofArray */])([stack.head.data[1], tree_SetOne(stack.head.data[0]), stack.head.data[2]], stack.tail);
                continue collapseLHS;
            } else {
                stack = stack.tail;
                continue collapseLHS;
            }
        } else {
            return new __WEBPACK_IMPORTED_MODULE_0__List__["b" /* default */]();
        }
    }
}
function tree_mkIterator(s) {
    return { stack: tree_collapseLHS(new __WEBPACK_IMPORTED_MODULE_0__List__["b" /* default */](s, new __WEBPACK_IMPORTED_MODULE_0__List__["b" /* default */]())), started: false };
}
;
function tree_moveNext(i) {
    function current(i) {
        if (i.stack.tail == null) {
            return null;
        } else if (i.stack.head.tag === 1) {
            return i.stack.head.data[0];
        }
        throw new Error("Please report error: Set iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        } else {
            if (i.stack.head.tag === 1) {
                i.stack = tree_collapseLHS(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            } else {
                throw new Error("Please report error: Set iterator, unexpected stack for moveNext");
            }
        }
    } else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
    ;
}
function tree_compareStacks(comparer, l1, l2) {
    compareStacks: while (true) {
        var matchValue = l1.tail != null ? l2.tail != null ? l2.head.tag === 1 ? l1.head.tag === 1 ? [4, l1.head.data[0], l2.head.data[0], l1.tail, l2.tail] : l1.head.tag === 2 ? l1.head.data[1].tag === 0 ? [6, l1.head.data[1], l1.head.data[0], l1.head.data[2], l2.head.data[0], l1.tail, l2.tail] : [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [10, l2.head.data[0], l2.tail] : l2.head.tag === 2 ? l2.head.data[1].tag === 0 ? l1.head.tag === 1 ? [5, l1.head.data[0], l2.head.data[0], l2.head.data[2], l1.tail, l2.tail] : l1.head.tag === 2 ? l1.head.data[1].tag === 0 ? [7, l1.head.data[0], l1.head.data[2], l2.head.data[0], l2.head.data[2], l1.tail, l2.tail] : [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [11, l2.head.data[0], l2.head.data[1], l2.head.data[2], l2.tail] : l1.head.tag === 1 ? [8, l1.head.data[0], l1.tail] : l1.head.tag === 2 ? [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [11, l2.head.data[0], l2.head.data[1], l2.head.data[2], l2.tail] : l1.head.tag === 1 ? [8, l1.head.data[0], l1.tail] : l1.head.tag === 2 ? [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [3, l1.tail, l2.tail] : [2] : l2.tail != null ? [1] : [0];
        switch (matchValue[0]) {
            case 0:
                return 0;
            case 1:
                return -1;
            case 2:
                return 1;
            case 3:
                comparer = comparer;
                l1 = matchValue[1];
                l2 = matchValue[2];
                continue compareStacks;
            case 4:
                var c = comparer.Compare(matchValue[1], matchValue[2]) | 0;
                if (c !== 0) {
                    return c | 0;
                } else {
                    comparer = comparer;
                    l1 = matchValue[3];
                    l2 = matchValue[4];
                    continue compareStacks;
                }
            case 5:
                var c_1 = comparer.Compare(matchValue[1], matchValue[2]) | 0;
                if (c_1 !== 0) {
                    return c_1 | 0;
                } else {
                    comparer = comparer;
                    l1 = new __WEBPACK_IMPORTED_MODULE_0__List__["b" /* default */](new SetTree(0), matchValue[4]);
                    l2 = new __WEBPACK_IMPORTED_MODULE_0__List__["b" /* default */](matchValue[3], matchValue[5]);
                    continue compareStacks;
                }
            case 6:
                var c_2 = comparer.Compare(matchValue[2], matchValue[4]) | 0;
                if (c_2 !== 0) {
                    return c_2 | 0;
                } else {
                    comparer = comparer;
                    l1 = new __WEBPACK_IMPORTED_MODULE_0__List__["b" /* default */](matchValue[3], matchValue[5]);
                    l2 = new __WEBPACK_IMPORTED_MODULE_0__List__["b" /* default */](matchValue[1], matchValue[6]);
                    continue compareStacks;
                }
            case 7:
                var c_3 = comparer.Compare(matchValue[1], matchValue[3]) | 0;
                if (c_3 !== 0) {
                    return c_3 | 0;
                } else {
                    comparer = comparer;
                    l1 = new __WEBPACK_IMPORTED_MODULE_0__List__["b" /* default */](matchValue[2], matchValue[5]);
                    l2 = new __WEBPACK_IMPORTED_MODULE_0__List__["b" /* default */](matchValue[4], matchValue[6]);
                    continue compareStacks;
                }
            case 8:
                comparer = comparer;
                l1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["a" /* ofArray */])([new SetTree(0), tree_SetOne(matchValue[1])], matchValue[2]);
                l2 = l2;
                continue compareStacks;
            case 9:
                comparer = comparer;
                l1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["a" /* ofArray */])([matchValue[2], tree_SetNode(matchValue[1], new SetTree(0), matchValue[3], 0)], matchValue[4]);
                l2 = l2;
                continue compareStacks;
            case 10:
                comparer = comparer;
                l1 = l1;
                l2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["a" /* ofArray */])([new SetTree(0), tree_SetOne(matchValue[1])], matchValue[2]);
                continue compareStacks;
            case 11:
                comparer = comparer;
                l1 = l1;
                l2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["a" /* ofArray */])([matchValue[2], tree_SetNode(matchValue[1], new SetTree(0), matchValue[3], 0)], matchValue[4]);
                continue compareStacks;
        }
    }
}
function tree_compare(comparer, s1, s2) {
    if (s1.tag === 0) {
        return s2.tag === 0 ? 0 : -1;
    } else {
        return s2.tag === 0 ? 1 : tree_compareStacks(comparer, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["a" /* ofArray */])([s1]), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__List__["a" /* ofArray */])([s2]));
    }
}
function tree_mkFromEnumerator(comparer, acc, e) {
    var cur = e.next();
    while (!cur.done) {
        acc = tree_add(comparer, cur.value, acc);
        cur = e.next();
    }
    return acc;
}
function tree_ofSeq(comparer, c) {
    var ie = c[Symbol.iterator]();
    return tree_mkFromEnumerator(comparer, new SetTree(0), ie);
}

var FableSet = function () {
    function FableSet() {
        _classCallCheck(this, FableSet);
    }

    _createClass(FableSet, [{
        key: "ToString",
        value: function ToString() {
            return "set [" + Array.from(this).map(function (x) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Util__["f" /* toString */])(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(s2) {
            return this.CompareTo(s2) === 0;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(s2) {
            return this === s2 ? 0 : tree_compare(this.comparer, this.tree, s2.tree);
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            var i = tree_mkIterator(this.tree);
            return {
                next: function next() {
                    return tree_moveNext(i);
                }
            };
        }
    }, {
        key: "values",
        value: function values() {
            return this[Symbol.iterator]();
        }
    }, {
        key: "has",
        value: function has(v) {
            return tree_mem(this.comparer, v, this.tree);
        }
    }, {
        key: "add",
        value: function add(v) {
            this.tree = tree_add(this.comparer, v, this.tree);
            return this;
        }
    }, {
        key: "delete",
        value: function _delete(v) {
            var oldSize = tree_count(this.tree);
            this.tree = tree_remove(this.comparer, v, this.tree);
            return oldSize > tree_count(this.tree);
        }
    }, {
        key: "clear",
        value: function clear() {
            this.tree = new SetTree(0);
        }
    }, {
        key: __WEBPACK_IMPORTED_MODULE_3__Symbol__["a" /* default */].reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpSet",
                interfaces: ["System.IEquatable", "System.IComparable"]
            };
        }
    }, {
        key: "size",
        get: function get() {
            return tree_count(this.tree);
        }
    }]);

    return FableSet;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (FableSet);

function from(comparer, tree) {
    var s = new FableSet();
    s.tree = tree;
    s.comparer = comparer || new __WEBPACK_IMPORTED_MODULE_2__Comparer__["a" /* default */]();
    return s;
}
function create(ie, comparer) {
    comparer = comparer || new __WEBPACK_IMPORTED_MODULE_2__Comparer__["a" /* default */]();
    return from(comparer, ie ? tree_ofSeq(comparer, ie) : new SetTree(0));
}
function isEmpty(s) {
    return tree_isEmpty(s.tree);
}
function add(item, s) {
    return from(s.comparer, tree_add(s.comparer, item, s.tree));
}
function addInPlace(item, s) {
    return s.has(item) ? false : (s.add(item), true);
}
function remove(item, s) {
    return from(s.comparer, tree_remove(s.comparer, item, s.tree));
}
function union(set1, set2) {
    return set2.tree.tag === 0 ? set1 : set1.tree.tag === 0 ? set2 : from(set1.comparer, tree_union(set1.comparer, set1.tree, set2.tree));
}
function op_Addition(set1, set2) {
    return union(set1, set2);
}
function unionInPlace(set1, set2) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["c" /* iterate */])(function (x) {
        set1.add(x);
    }, set2);
}
function unionMany(sets) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["d" /* fold */])(function (acc, s) {
        return union(s, acc);
    }, create(), sets);
}
function difference(set1, set2) {
    return set1.tree.tag === 0 ? set1 : set2.tree.tag === 0 ? set1 : from(set1.comparer, tree_diff(set1.comparer, set1.tree, set2.tree));
}
function op_Subtraction(set1, set2) {
    return difference(set1, set2);
}
function differenceInPlace(set1, set2) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["c" /* iterate */])(function (x) {
        set1.delete(x);
    }, set2);
}
function intersect(set1, set2) {
    return set2.tree.tag === 0 ? set2 : set1.tree.tag === 0 ? set1 : from(set1.comparer, tree_intersection(set1.comparer, set1.tree, set2.tree));
}
function intersectInPlace(set1, set2) {
    var set2_ = set2 instanceof Set ? set2 : new Set(set2);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["c" /* iterate */])(function (x) {
        if (!set2_.has(x)) {
            set1.delete(x);
        }
    }, set1);
}
function intersectMany(sets) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["e" /* reduce */])(function (s1, s2) {
        return intersect(s1, s2);
    }, sets);
}
function isProperSubsetOf(set1, set2) {
    if (set1 instanceof FableSet && set2 instanceof FableSet) {
        return tree_psubset(set1.comparer, set1.tree, set2.tree);
    } else {
        set2 = set2 instanceof Set ? set2 : new Set(set2);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["f" /* forAll */])(function (x) {
            return set2.has(x);
        }, set1) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["g" /* exists */])(function (x) {
            return !set1.has(x);
        }, set2);
    }
}
function isProperSubset(set1, set2) {
    return isProperSubsetOf(set1, set2);
}
function isSubsetOf(set1, set2) {
    if (set1 instanceof FableSet && set2 instanceof FableSet) {
        return tree_subset(set1.comparer, set1.tree, set2.tree);
    } else {
        set2 = set2 instanceof Set ? set2 : new Set(set2);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__Seq__["f" /* forAll */])(function (x) {
            return set2.has(x);
        }, set1);
    }
}
function isSubset(set1, set2) {
    return isSubsetOf(set1, set2);
}
function isProperSupersetOf(set1, set2) {
    if (set1 instanceof FableSet && set2 instanceof FableSet) {
        return tree_psubset(set1.comparer, set2.tree, set1.tree);
    } else {
        return isProperSubset(set2 instanceof Set ? set2 : new Set(set2), set1);
    }
}
function isProperSuperset(set1, set2) {
    return isProperSupersetOf(set1, set2);
}
function isSupersetOf(set1, set2) {
    if (set1 instanceof FableSet && set2 instanceof FableSet) {
        return tree_subset(set1.comparer, set2.tree, set1.tree);
    } else {
        return isSubset(set2 instanceof Set ? set2 : new Set(set2), set1);
    }
}
function isSuperset(set1, set2) {
    return isSupersetOf(set1, set2);
}
function copyTo(xs, arr, arrayIndex, count) {
    if (!Array.isArray(arr) && !ArrayBuffer.isView(arr)) throw new Error("Array is invalid");
    count = count || arr.length;
    var i = arrayIndex || 0;
    var iter = xs[Symbol.iterator]();
    while (count--) {
        var el = iter.next();
        if (el.done) break;
        arr[i++] = el.value;
    }
}
function partition(f, s) {
    if (s.tree.tag === 0) {
        return [s, s];
    } else {
        var tuple = tree_partition(s.comparer, f, s.tree);
        return [from(s.comparer, tuple[0]), from(s.comparer, tuple[1])];
    }
}
function filter(f, s) {
    if (s.tree.tag === 0) {
        return s;
    } else {
        return from(s.comparer, tree_filter(s.comparer, f, s.tree));
    }
}
function map(f, s) {
    var comparer = new __WEBPACK_IMPORTED_MODULE_2__Comparer__["a" /* default */]();
    return from(comparer, tree_fold(function (acc, k) {
        return tree_add(comparer, f(k), acc);
    }, new SetTree(0), s.tree));
}
function exists(f, s) {
    return tree_exists(f, s.tree);
}
function forAll(f, s) {
    return tree_forall(f, s.tree);
}
function fold(f, seed, s) {
    return tree_fold(f, seed, s.tree);
}
function foldBack(f, s, seed) {
    return tree_foldBack(f, s.tree, seed);
}
function iterate(f, s) {
    tree_iter(f, s.tree);
}
function minimumElement(s) {
    return tree_minimumElement(s.tree);
}
function minElement(s) {
    return tree_minimumElement(s.tree);
}
function maximumElement(s) {
    return tree_maximumElement(s.tree);
}
function maxElement(s) {
    return tree_maximumElement(s.tree);
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__build_fable_core_Set__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__build_fable_core_Comparer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__ = __webpack_require__(1);
/* unused harmony export keysPressed */
/* unused harmony export code */
/* unused harmony export update */
/* harmony export (immutable) */ __webpack_exports__["b"] = leftControlsPressed;
/* harmony export (immutable) */ __webpack_exports__["c"] = rightControlsPressed;
/* harmony export (immutable) */ __webpack_exports__["d"] = rKeyPressed;
/* harmony export (immutable) */ __webpack_exports__["a"] = init;



var keysPressed = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__build_fable_core_Set__["a" /* create */])(null, new __WEBPACK_IMPORTED_MODULE_1__build_fable_core_Comparer__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__build_fable_core_Util__["e" /* comparePrimitives */]));
function code(x) {
    if (keysPressed.has(x)) {
        return 1;
    } else {
        return 0;
    }
}
function update(e, pressed) {
    var keyCode = ~~e.keyCode | 0;
    var op = pressed ? function (value, set) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__build_fable_core_Set__["b" /* add */])(value, set);
    } : function (value_1, set_1) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__build_fable_core_Set__["c" /* remove */])(value_1, set_1);
    };
    keysPressed = op(keyCode, keysPressed);
    return null;
}
function leftControlsPressed() {
    return [code(87), code(83)];
}
function rightControlsPressed() {
    return [code(79), code(76)];
}
function rKeyPressed() {
    return code(82) | 0;
}
function init() {
    document.addEventListener("keydown", function (e) {
        return update(e, true);
    });
    document.addEventListener("keyup", function (e_1) {
        return update(e_1, false);
    });
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pong_fs__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PongElement", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BallElement", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GameStatus", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "canMove", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "move", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Collision", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "checkCollision", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "calculateAngle", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "collision", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "moveBall", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "checkGameStatus", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "render", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "initialLeftPaddle", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "initialRightPaddle", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "initialBall", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "initialGameStatus", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "update", function() { return __WEBPACK_IMPORTED_MODULE_0__Pong_fs__["s"]; });


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export canvas */
/* unused harmony export context */
/* harmony export (immutable) */ __webpack_exports__["b"] = drawRect;
/* harmony export (immutable) */ __webpack_exports__["d"] = drawCircle;
/* harmony export (immutable) */ __webpack_exports__["c"] = drawText;
/* harmony export (immutable) */ __webpack_exports__["a"] = dimensions;
var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext("2d");
function drawRect(color, rect_0, rect_1, rect_2, rect_3) {
    var rect = [rect_0, rect_1, rect_2, rect_3];
    var ctx = context;
    ctx.fillStyle = color;

    (function (tupledArg) {
        ctx.fillRect(tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3]);
    })(rect);
}
function drawCircle(color, x, y, radius, startAngle, endAngle) {
    var ctx = context;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.fill();
}
function drawText(text, color, font, position_0, position_1) {
    var position = [position_0, position_1];
    var ctx = context;
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, position[0], position[1]);
}
function dimensions() {
    return [canvas.width, canvas.height];
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map