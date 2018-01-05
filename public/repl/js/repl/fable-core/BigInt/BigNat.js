(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Symbol", "../Symbol", "../Util", "../Long", "../Seq", "./FFT", "../List", "../String"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Symbol_1 = require("../Symbol");
    const Symbol_2 = require("../Symbol");
    const Util_1 = require("../Util");
    const Long_1 = require("../Long");
    const Seq_1 = require("../Seq");
    const FFT_1 = require("./FFT");
    const List_1 = require("../List");
    const String_1 = require("../String");
    class BigNat {
        constructor(bound, digits) {
            this.bound = bound;
            this.digits = digits;
        }
        [Symbol_2.default.reflection]() {
            return {
                type: "Microsoft.FSharp.Math.BigNat",
                interfaces: ["FSharpRecord"],
                properties: {
                    bound: "number",
                    digits: Util_1.Array(Int32Array, true),
                },
            };
        }
    }
    exports.default = BigNat;
    Symbol_1.setType("Microsoft.FSharp.Math.BigNat", BigNat);
    function bound(n) {
        return n.bound;
    }
    exports.bound = bound;
    function setBound(n, v) {
        n.bound = v;
    }
    exports.setBound = setBound;
    function coeff(n, i) {
        return n.digits[i];
    }
    exports.coeff = coeff;
    function coeff64(n, i) {
        return Long_1.fromNumber(coeff(n, i), false);
    }
    exports.coeff64 = coeff64;
    function setCoeff(n, i, v) {
        n.digits[i] = v;
    }
    exports.setCoeff = setCoeff;
    function pow64(x, n) {
        if (n === 0) {
            return Long_1.fromBits(1, 0, false);
        }
        else if (n % 2 === 0) {
            return pow64(x.mul(x), ~~(n / 2));
        }
        else {
            return x.mul(pow64(x.mul(x), ~~(n / 2)));
        }
    }
    exports.pow64 = pow64;
    function pow32(x, n) {
        if (n === 0) {
            return 1;
        }
        else if (n % 2 === 0) {
            return pow32(x * x, ~~(n / 2));
        }
        else {
            return x * pow32(x * x, ~~(n / 2));
        }
    }
    exports.pow32 = pow32;
    function hash(n) {
        let res = 0;
        for (let i = 0; i <= n.bound - 1; i++) {
            res = n.digits[i] + (res << 3);
        }
        return res;
    }
    exports.hash = hash;
    function maxInt(a, b) {
        if (a < b) {
            return b;
        }
        else {
            return a;
        }
    }
    exports.maxInt = maxInt;
    function minInt(a, b) {
        if (a < b) {
            return a;
        }
        else {
            return b;
        }
    }
    exports.minInt = minInt;
    exports.baseBits = 24;
    exports.baseN = 16777216;
    exports.baseMask = 16777215;
    exports.baseNi64 = Long_1.fromBits(16777216, 0, false);
    exports.baseMaski64 = Long_1.fromBits(16777215, 0, false);
    exports.baseMaskU = Long_1.fromBits(16777215, 0, true);
    exports.baseMask32A = 16777215;
    exports.baseMask32B = 255;
    exports.baseShift32B = 24;
    exports.baseMask64A = 16777215;
    exports.baseMask64B = 16777215;
    exports.baseMask64C = 65535;
    exports.baseShift64B = 24;
    exports.baseShift64C = 48;
    function divbase(x) {
        return ~~(x >>> 0 >> exports.baseBits);
    }
    exports.divbase = divbase;
    function modbase(x) {
        return x & exports.baseMask;
    }
    exports.modbase = modbase;
    function createN(b) {
        return new BigNat(b, new Int32Array(b));
    }
    exports.createN = createN;
    function copyN(x) {
        return new BigNat(x.bound, x.digits.slice());
    }
    exports.copyN = copyN;
    function normN(n) {
        const findLeastBound = na => i => {
            if (i === -1 ? true : na[i] !== 0) {
                return i + 1;
            }
            else {
                return findLeastBound(na)(i - 1);
            }
        };
        const bound_1 = findLeastBound(n.digits)(n.bound - 1);
        n.bound = bound_1;
        return n;
    }
    exports.normN = normN;
    exports.boundInt = 2;
    exports.boundInt64 = 3;
    exports.boundBase = 1;
    function embed(x) {
        const x_1 = x < 0 ? 0 : x;
        if (x_1 < exports.baseN) {
            const r = createN(1);
            r.digits[0] = x_1;
            return normN(r);
        }
        else {
            const r = createN(exports.boundInt);
            for (let i = 0; i <= exports.boundInt - 1; i++) {
                r.digits[i] = ~~(x_1 / pow32(exports.baseN, i)) % exports.baseN;
            }
            return normN(r);
        }
    }
    exports.embed = embed;
    function embed64(x) {
        const x_1 = x.CompareTo(Long_1.fromBits(0, 0, false)) < 0 ? Long_1.fromBits(0, 0, false) : x;
        const r = createN(exports.boundInt64);
        for (let i = 0; i <= exports.boundInt64 - 1; i++) {
            r.digits[i] = ~~x_1.div(pow64(exports.baseNi64, i)).mod(exports.baseNi64).toNumber();
        }
        return normN(r);
    }
    exports.embed64 = embed64;
    function eval32(n) {
        if (n.bound === 1) {
            return n.digits[0];
        }
        else {
            let acc = 0;
            for (let i = n.bound - 1; i >= 0; i--) {
                acc = n.digits[i] + exports.baseN * acc;
            }
            return acc;
        }
    }
    exports.eval32 = eval32;
    function eval64(n) {
        if (n.bound === 1) {
            return Long_1.fromNumber(n.digits[0], false);
        }
        else {
            let acc = Long_1.fromBits(0, 0, false);
            for (let i = n.bound - 1; i >= 0; i--) {
                acc = Long_1.fromNumber(n.digits[i], false).add(exports.baseNi64.mul(acc));
            }
            return acc;
        }
    }
    exports.eval64 = eval64;
    exports.one = embed(1);
    exports.zero = embed(0);
    function restrictTo(d, n) {
        return new BigNat(minInt(d, n.bound), n.digits);
    }
    exports.restrictTo = restrictTo;
    function shiftUp(d, n) {
        const m = createN(n.bound + d);
        for (let i = 0; i <= n.bound - 1; i++) {
            m.digits[i + d] = n.digits[i];
        }
        return m;
    }
    exports.shiftUp = shiftUp;
    function shiftDown(d, n) {
        if (n.bound - d <= 0) {
            return exports.zero;
        }
        else {
            const m = createN(n.bound - d);
            for (let i = 0; i <= m.bound - 1; i++) {
                m.digits[i] = n.digits[i + d];
            }
            return m;
        }
    }
    exports.shiftDown = shiftDown;
    function degree(n) {
        return n.bound - 1;
    }
    exports.degree = degree;
    function addP(i, n, c, p, q, r) {
        if (i < n) {
            const x = (i < p.bound ? p.digits[i] : 0) + (i < q.bound ? q.digits[i] : 0) + c;
            r.digits[i] = modbase(x);
            const c_1 = divbase(x);
            addP(i + 1, n, c_1, p, q, r);
        }
    }
    exports.addP = addP;
    function add(p, q) {
        const rbound = 1 + maxInt(p.bound, q.bound);
        const r = createN(rbound);
        const carry = 0;
        addP(0, rbound, carry, p, q, r);
        return normN(r);
    }
    exports.add = add;
    function subP(i, n, c, p, q, r) {
        if (i < n) {
            const x = (i < p.bound ? p.digits[i] : 0) - (i < q.bound ? q.digits[i] : 0) + c;
            if (x > 0) {
                r.digits[i] = modbase(x);
                const c_1 = divbase(x);
                return subP(i + 1, n, c_1, p, q, r);
            }
            else {
                const x_1 = x + exports.baseN;
                r.digits[i] = modbase(x_1);
                const c_1 = divbase(x_1) - 1;
                return subP(i + 1, n, c_1, p, q, r);
            }
        }
        else {
            const underflow = c !== 0;
            return underflow;
        }
    }
    exports.subP = subP;
    function sub(p, q) {
        const rbound = maxInt(p.bound, q.bound);
        const r = createN(rbound);
        const carry = 0;
        const underflow = subP(0, rbound, carry, p, q, r);
        if (underflow) {
            return embed(0);
        }
        else {
            return normN(r);
        }
    }
    exports.sub = sub;
    function isZero(p) {
        return p.bound === 0;
    }
    exports.isZero = isZero;
    function IsZero(p) {
        return isZero(p);
    }
    exports.IsZero = IsZero;
    function isOne(p) {
        if (p.bound === 1) {
            return p.digits[0] === 1;
        }
        else {
            return false;
        }
    }
    exports.isOne = isOne;
    function equal(p, q) {
        if (p.bound === q.bound) {
            const check = pa => qa => i => {
                if (i === -1) {
                    return true;
                }
                else if (pa[i] === qa[i]) {
                    return check(pa)(qa)(i - 1);
                }
                else {
                    return false;
                }
            };
            return check(p.digits)(q.digits)(p.bound - 1);
        }
        else {
            return false;
        }
    }
    exports.equal = equal;
    function shiftCompare(p, pn, q, qn) {
        if (p.bound + pn < q.bound + qn) {
            return -1;
        }
        else if (p.bound + pn > q.bound + pn) {
            return 1;
        }
        else {
            const check = pa => qa => i => {
                if (i === -1) {
                    return 0;
                }
                else {
                    const pai = i < pn ? 0 : pa[i - pn];
                    const qai = i < qn ? 0 : qa[i - qn];
                    if (pai === qai) {
                        return check(pa)(qa)(i - 1);
                    }
                    else if (pai < qai) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
            };
            return check(p.digits)(q.digits)(p.bound + pn - 1);
        }
    }
    exports.shiftCompare = shiftCompare;
    function compare(p, q) {
        if (p.bound < q.bound) {
            return -1;
        }
        else if (p.bound > q.bound) {
            return 1;
        }
        else {
            const check = pa => qa => i => {
                if (i === -1) {
                    return 0;
                }
                else if (pa[i] === qa[i]) {
                    return check(pa)(qa)(i - 1);
                }
                else if (pa[i] < qa[i]) {
                    return -1;
                }
                else {
                    return 1;
                }
            };
            return check(p.digits)(q.digits)(p.bound - 1);
        }
    }
    exports.compare = compare;
    function lt(p, q) {
        return compare(p, q) === -1;
    }
    exports.lt = lt;
    function gt(p, q) {
        return compare(p, q) === 1;
    }
    exports.gt = gt;
    function lte(p, q) {
        return compare(p, q) !== 1;
    }
    exports.lte = lte;
    function gte(p, q) {
        return compare(p, q) !== -1;
    }
    exports.gte = gte;
    function min(a, b) {
        if (lt(a, b)) {
            return a;
        }
        else {
            return b;
        }
    }
    exports.min = min;
    function max(a, b) {
        if (lt(a, b)) {
            return b;
        }
        else {
            return a;
        }
    }
    exports.max = max;
    function contributeArr(a, i, c) {
        const x = Long_1.fromNumber(a[i], false).add(c);
        const c_1 = x.div(exports.baseNi64);
        const x_1 = ~~x.and(exports.baseMaski64).toNumber();
        a[i] = x_1;
        if (c_1.CompareTo(Long_1.fromBits(0, 0, false)) > 0) {
            contributeArr(a, i + 1, c_1);
        }
    }
    exports.contributeArr = contributeArr;
    function scale(k, p) {
        const rbound = p.bound + exports.boundInt;
        const r = createN(rbound);
        const k_1 = Long_1.fromNumber(k, false);
        for (let i = 0; i <= p.bound - 1; i++) {
            const kpi = k_1.mul(Long_1.fromNumber(p.digits[i], false));
            contributeArr(r.digits, i, kpi);
        }
        return normN(r);
    }
    exports.scale = scale;
    function mulSchoolBookBothSmall(p, q) {
        const r = createN(2);
        const rak = Long_1.fromNumber(p, false).mul(Long_1.fromNumber(q, false));
        setCoeff(r, 0, ~~rak.and(exports.baseMaski64).toNumber());
        setCoeff(r, 1, ~~rak.div(exports.baseNi64).toNumber());
        return normN(r);
    }
    exports.mulSchoolBookBothSmall = mulSchoolBookBothSmall;
    function mulSchoolBookCarry(r, c, k) {
        if (c.CompareTo(Long_1.fromBits(0, 0, false)) > 0) {
            const rak = coeff64(r, k).add(c);
            setCoeff(r, k, ~~rak.and(exports.baseMaski64).toNumber());
            mulSchoolBookCarry(r, rak.div(exports.baseNi64), k + 1);
        }
    }
    exports.mulSchoolBookCarry = mulSchoolBookCarry;
    function mulSchoolBookOneSmall(p, q) {
        const bp = bound(p);
        const rbound = bp + 1;
        const r = createN(rbound);
        const q_1 = Long_1.fromNumber(q, false);
        let c = Long_1.fromBits(0, 0, false);
        for (let i = 0; i <= bp - 1; i++) {
            const rak = c.add(coeff64(r, i)).add(coeff64(p, i).mul(q_1));
            setCoeff(r, i, ~~rak.and(exports.baseMaski64).toNumber());
            c = rak.div(exports.baseNi64);
        }
        mulSchoolBookCarry(r, c, bp);
        return normN(r);
    }
    exports.mulSchoolBookOneSmall = mulSchoolBookOneSmall;
    function mulSchoolBookNeitherSmall(p, q) {
        const rbound = p.bound + q.bound;
        const r = createN(rbound);
        for (let i = 0; i <= p.bound - 1; i++) {
            const pai = Long_1.fromNumber(p.digits[i], false);
            let c = Long_1.fromBits(0, 0, false);
            let k = i;
            for (let j = 0; j <= q.bound - 1; j++) {
                const qaj = Long_1.fromNumber(q.digits[j], false);
                const rak = Long_1.fromNumber(r.digits[k], false).add(c).add(pai.mul(qaj));
                r.digits[k] = ~~rak.and(exports.baseMaski64).toNumber();
                c = rak.div(exports.baseNi64);
                k = k + 1;
            }
            mulSchoolBookCarry(r, c, k);
        }
        return normN(r);
    }
    exports.mulSchoolBookNeitherSmall = mulSchoolBookNeitherSmall;
    function mulSchoolBook(p, q) {
        const pSmall = bound(p) === 1;
        const qSmall = bound(q) === 1;
        if (pSmall ? qSmall : false) {
            return mulSchoolBookBothSmall(coeff(p, 0), coeff(q, 0));
        }
        else if (pSmall) {
            return mulSchoolBookOneSmall(q, coeff(p, 0));
        }
        else if (qSmall) {
            return mulSchoolBookOneSmall(p, coeff(q, 0));
        }
        else {
            return mulSchoolBookNeitherSmall(p, q);
        }
    }
    exports.mulSchoolBook = mulSchoolBook;
    class Encoding {
        constructor(bigL, twoToBigL, k, bigK, bigN, split, splits) {
            this.bigL = bigL;
            this.twoToBigL = twoToBigL;
            this.k = k;
            this.bigK = bigK;
            this.bigN = bigN;
            this.split = split;
            this.splits = splits;
        }
        [Symbol_2.default.reflection]() {
            return {
                type: "Microsoft.FSharp.Math.BigNatModule.Encoding",
                interfaces: ["FSharpRecord"],
                properties: {
                    bigL: "number",
                    twoToBigL: "number",
                    k: "number",
                    bigK: "number",
                    bigN: "number",
                    split: "number",
                    splits: Int32Array,
                },
            };
        }
    }
    exports.Encoding = Encoding;
    Symbol_1.setType("Microsoft.FSharp.Math.BigNatModule.Encoding", Encoding);
    function mkEncoding(bigL, k, bigK, bigN) {
        return new Encoding(bigL, pow32(2, bigL), k, bigK, bigN, ~~(exports.baseBits / bigL), Int32Array.from(Seq_1.initialize(~~(exports.baseBits / bigL), i => pow32(2, bigL * i))));
    }
    exports.mkEncoding = mkEncoding;
    exports.table = [mkEncoding(1, 28, 268435456, 268435456), mkEncoding(2, 26, 67108864, 134217728), mkEncoding(3, 24, 16777216, 50331648), mkEncoding(4, 22, 4194304, 16777216), mkEncoding(5, 20, 1048576, 5242880), mkEncoding(6, 18, 262144, 1572864), mkEncoding(7, 16, 65536, 458752), mkEncoding(8, 14, 16384, 131072), mkEncoding(9, 12, 4096, 36864), mkEncoding(10, 10, 1024, 10240), mkEncoding(11, 8, 256, 2816), mkEncoding(12, 6, 64, 768), mkEncoding(13, 4, 16, 208)];
    function calculateTableTow(bigL) {
        const k = FFT_1.maxBitsInsideFp - 2 * bigL;
        const bigK = pow64(Long_1.fromBits(2, 0, false), k);
        const N = bigK.mul(Long_1.fromNumber(bigL, false));
        return [bigL, k, bigK, N];
    }
    exports.calculateTableTow = calculateTableTow;
    function encodingGivenResultBits(bitsRes) {
        const selectFrom = i => {
            if (i + 1 < exports.table.length ? bitsRes < exports.table[i + 1].bigN : false) {
                return selectFrom(i + 1);
            }
            else {
                return exports.table[i];
            }
        };
        if (bitsRes >= exports.table[0].bigN) {
            throw new Error("Product is huge, around 268435456 bits, beyond quickmul");
        }
        else {
            return selectFrom(0);
        }
    }
    exports.encodingGivenResultBits = encodingGivenResultBits;
    exports.bitmask = Int32Array.from(Seq_1.initialize(exports.baseBits, i => pow32(2, i) - 1));
    exports.twopowers = Int32Array.from(Seq_1.initialize(exports.baseBits, i => pow32(2, i)));
    exports.twopowersI64 = Array.from(Seq_1.initialize(exports.baseBits, i => pow64(Long_1.fromBits(2, 0, false), i)));
    function wordBits(word) {
        const hi = k => {
            if (k === 0) {
                return 0;
            }
            else if ((word & exports.twopowers[k - 1]) !== 0) {
                return k;
            }
            else {
                return hi(k - 1);
            }
        };
        return hi(exports.baseBits);
    }
    exports.wordBits = wordBits;
    function bits(u) {
        if (u.bound === 0) {
            return 0;
        }
        else {
            return degree(u) * exports.baseBits + wordBits(u.digits[degree(u)]);
        }
    }
    exports.bits = bits;
    function extractBits(n, enc, bi) {
        const bj = bi + enc.bigL - 1;
        const biw = ~~(bi / exports.baseBits);
        const bjw = ~~(bj / exports.baseBits);
        if (biw !== bjw) {
            const x = biw < n.bound ? n.digits[biw] : 0;
            const y = bjw < n.bound ? n.digits[bjw] : 0;
            const xbit = bi % exports.baseBits;
            const nxbits = exports.baseBits - xbit;
            const x_1 = x >> xbit;
            const y_1 = y << nxbits;
            const x_2 = x_1 | y_1;
            const x_3 = x_2 & exports.bitmask[enc.bigL];
            return x_3;
        }
        else {
            const x = biw < n.bound ? n.digits[biw] : 0;
            const xbit = bi % exports.baseBits;
            const x_1 = x >> xbit;
            const x_2 = x_1 & exports.bitmask[enc.bigL];
            return x_2;
        }
    }
    exports.extractBits = extractBits;
    function encodePoly(enc, n) {
        const poly = Uint32Array.from(Seq_1.replicate(enc.bigK, FFT_1.ofInt32(0)));
        const biMax = n.bound * exports.baseBits;
        const encoder = i => bi => {
            if (i === enc.bigK ? true : bi > biMax) { }
            else {
                const pi = extractBits(n, enc, bi);
                poly[i] = FFT_1.ofInt32(pi);
                const i_1 = i + 1;
                const bi_1 = bi + enc.bigL;
                encoder(i_1)(bi_1);
            }
        };
        encoder(0)(0);
        return poly;
    }
    exports.encodePoly = encodePoly;
    function decodeResultBits(enc, poly) {
        let n = 0;
        for (let i = 0; i <= poly.length - 1; i++) {
            if (poly[i] !== FFT_1.mzero) {
                n = i;
            }
        }
        const rbits = FFT_1.maxBitsInsideFp + enc.bigL * n + 1;
        return rbits + 1;
    }
    exports.decodeResultBits = decodeResultBits;
    function decodePoly(enc, poly) {
        const rbound = ~~(decodeResultBits(enc, poly) / exports.baseBits) + 1;
        const r = createN(rbound);
        const evaluate = i => j => d => {
            if (i === enc.bigK) { }
            else {
                if (j >= rbound) { }
                else {
                    const x = Long_1.fromNumber(FFT_1.toInt(poly[i]), false).mul(exports.twopowersI64[d]);
                    contributeArr(r.digits, j, x);
                }
                const i_1 = i + 1;
                const d_1 = d + enc.bigL;
                const patternInput = d_1 >= exports.baseBits ? [j + 1, d_1 - exports.baseBits] : [j, d_1];
                evaluate(i_1)(patternInput[0])(patternInput[1]);
            }
        };
        evaluate(0)(0)(0);
        return normN(r);
    }
    exports.decodePoly = decodePoly;
    function quickMulUsingFft(u, v) {
        const bitsRes = bits(u) + bits(v);
        const enc = encodingGivenResultBits(bitsRes);
        const upoly = encodePoly(enc, u);
        const vpoly = encodePoly(enc, v);
        const rpoly = FFT_1.computeFftPaddedPolynomialProduct(enc.bigK, enc.k, upoly, vpoly);
        const r = decodePoly(enc, rpoly);
        return normN(r);
    }
    exports.quickMulUsingFft = quickMulUsingFft;
    exports.minDigitsKaratsuba = 16;
    function recMulKaratsuba(mul, p, q) {
        const bp = p.bound;
        const bq = q.bound;
        const bmax = maxInt(bp, bq);
        if (bmax > exports.minDigitsKaratsuba) {
            const k = ~~(bmax / 2);
            const a0 = restrictTo(k, p);
            const a1 = shiftDown(k, p);
            const b0 = restrictTo(k, q);
            const b1 = shiftDown(k, q);
            const q0 = mul(a0)(b0);
            const q1 = mul(add(a0, a1))(add(b0, b1));
            const q2 = mul(a1)(b1);
            const p1 = sub(q1, add(q0, q2));
            const r = add(q0, shiftUp(k, add(p1, shiftUp(k, q2))));
            return r;
        }
        else {
            return mulSchoolBook(p, q);
        }
    }
    exports.recMulKaratsuba = recMulKaratsuba;
    function mulKaratsuba(x, y) {
        return recMulKaratsuba(x_1 => y_1 => mulKaratsuba(x_1, y_1), x, y);
    }
    exports.mulKaratsuba = mulKaratsuba;
    exports.productDigitsUpperSchoolBook = ~~(64000 / exports.baseBits);
    exports.singleDigitForceSchoolBook = ~~(32000 / exports.baseBits);
    exports.productDigitsUpperFft = ~~(exports.table[0].bigN / exports.baseBits);
    function mul(p, q) {
        return mulSchoolBook(p, q);
    }
    exports.mul = mul;
    function scaleSubInPlace(x, f, a, n) {
        const invariant = tupledArg => { };
        const patternInput = [x.digits, degree(x)];
        const patternInput_1 = [a.digits, degree(a)];
        const f_1 = Long_1.fromNumber(f, false);
        let j = 0;
        let z = f_1.mul(Long_1.fromNumber(patternInput_1[0][0], false));
        while (z.CompareTo(Long_1.fromBits(0, 0, false)) > 0 ? true : j < patternInput_1[1]) {
            if (j > patternInput[1]) {
                throw new Error("scaleSubInPlace: pre-condition did not apply, result would be -ve");
            }
            invariant([z, j, n]);
            let zLo = ~~z.and(exports.baseMaski64).toNumber();
            let zHi = z.div(exports.baseNi64);
            if (zLo <= patternInput[0][j + n]) {
                patternInput[0][j + n] = patternInput[0][j + n] - zLo;
            }
            else {
                patternInput[0][j + n] = patternInput[0][j + n] + (exports.baseN - zLo);
                zHi = zHi.add(Long_1.fromBits(1, 0, false));
            }
            if (j < patternInput_1[1]) {
                z = zHi.add(f_1.mul(Long_1.fromNumber(patternInput_1[0][j + 1], false)));
            }
            else {
                z = zHi;
            }
            j = j + 1;
        }
        normN(x);
    }
    exports.scaleSubInPlace = scaleSubInPlace;
    function scaleSub(x, f, a, n) {
        const freshx = add(x, exports.zero);
        scaleSubInPlace(freshx, f, a, n);
        return normN(freshx);
    }
    exports.scaleSub = scaleSub;
    function scaleAddInPlace(x, f, a, n) {
        const invariant = tupledArg => { };
        const patternInput = [x.digits, degree(x)];
        const patternInput_1 = [a.digits, degree(a)];
        const f_1 = Long_1.fromNumber(f, false);
        let j = 0;
        let z = f_1.mul(Long_1.fromNumber(patternInput_1[0][0], false));
        while (z.CompareTo(Long_1.fromBits(0, 0, false)) > 0 ? true : j < patternInput_1[1]) {
            if (j > patternInput[1]) {
                throw new Error("scaleSubInPlace: pre-condition did not apply, result would be -ve");
            }
            invariant([z, j, n]);
            let zLo = ~~z.and(exports.baseMaski64).toNumber();
            let zHi = z.div(exports.baseNi64);
            if (zLo < exports.baseN - patternInput[0][j + n]) {
                patternInput[0][j + n] = patternInput[0][j + n] + zLo;
            }
            else {
                patternInput[0][j + n] = zLo - (exports.baseN - patternInput[0][j + n]);
                zHi = zHi.add(Long_1.fromBits(1, 0, false));
            }
            if (j < patternInput_1[1]) {
                z = zHi.add(f_1.mul(Long_1.fromNumber(patternInput_1[0][j + 1], false)));
            }
            else {
                z = zHi;
            }
            j = j + 1;
        }
        normN(x);
    }
    exports.scaleAddInPlace = scaleAddInPlace;
    function scaleAdd(x, f, a, n) {
        const freshx = add(x, exports.zero);
        scaleAddInPlace(freshx, f, a, n);
        return normN(freshx);
    }
    exports.scaleAdd = scaleAdd;
    function removeFactor(x, a, n) {
        const patternInput = [degree(a), degree(x)];
        if (patternInput[1] < patternInput[0] + n) {
            return 0;
        }
        else {
            const patternInput_1 = [a.digits, x.digits];
            const f = patternInput[0] === 0
                ? patternInput[1] === n
                    ? ~~(patternInput_1[1][n] / patternInput_1[0][0])
                    : Long_1.fromNumber(patternInput_1[1][patternInput[1]], false).mul(exports.baseNi64).add(Long_1.fromNumber(patternInput_1[1][patternInput[1] - 1], false)).div(Long_1.fromNumber(patternInput_1[0][0], false)).toNumber()
                : patternInput[1] === patternInput[0] + n
                    ? ~~(patternInput_1[1][patternInput[1]] / (patternInput_1[0][patternInput[0]] + 1))
                    : Long_1.fromNumber(patternInput_1[1][patternInput[1]], false).mul(exports.baseNi64).add(Long_1.fromNumber(patternInput_1[1][patternInput[1] - 1], false)).div(Long_1.fromNumber(patternInput_1[0][patternInput[0]], false).add(Long_1.fromBits(1, 0, false))).toNumber();
            if (f === 0) {
                const lte_1 = shiftCompare(a, n, x, 0) !== 1;
                if (lte_1) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            else {
                return f;
            }
        }
    }
    exports.removeFactor = removeFactor;
    function divmod(b, a) {
        if (isZero(a)) {
            throw new Error();
        }
        else if (degree(b) < degree(a)) {
            return [exports.zero, b];
        }
        else {
            const x = copyN(b);
            const d = createN(degree(b) - degree(a) + 1 + 1);
            let p = degree(b);
            const m = degree(a);
            let n = p - m;
            const Invariant = tupledArg => { };
            let finished = false;
            while (!finished) {
                Invariant([d, x, n, p]);
                const f = removeFactor(x, a, n);
                if (f > 0) {
                    scaleSubInPlace(x, f, a, n);
                    scaleAddInPlace(d, f, exports.one, n);
                    Invariant([d, x, n, p]);
                }
                else {
                    if (f === 0) {
                        finished = n === 0;
                    }
                    else {
                        finished = false;
                    }
                    if (!finished) {
                        if (p === m + n) {
                            Invariant([d, x, n - 1, p]);
                            n = n - 1;
                        }
                        else {
                            Invariant([d, x, n - 1, p - 1]);
                            n = n - 1;
                            p = p - 1;
                        }
                    }
                }
            }
            return [normN(d), normN(x)];
        }
    }
    exports.divmod = divmod;
    function div(b, a) {
        return divmod(b, a)[0];
    }
    exports.div = div;
    function rem(b, a) {
        return divmod(b, a)[1];
    }
    exports.rem = rem;
    function bitAnd(a, b) {
        const rbound = minInt(a.bound, b.bound);
        const r = createN(rbound);
        for (let i = 0; i <= r.bound - 1; i++) {
            r.digits[i] = a.digits[i] & b.digits[i];
        }
        return normN(r);
    }
    exports.bitAnd = bitAnd;
    function bitOr(a, b) {
        const rbound = maxInt(a.bound, b.bound);
        const r = createN(rbound);
        for (let i = 0; i <= a.bound - 1; i++) {
            r.digits[i] = r.digits[i] | a.digits[i];
        }
        for (let i = 0; i <= b.bound - 1; i++) {
            r.digits[i] = r.digits[i] | b.digits[i];
        }
        return normN(r);
    }
    exports.bitOr = bitOr;
    function hcf(a, b) {
        const hcfloop = a_1 => b_1 => {
            if (equal(exports.zero, a_1)) {
                return b_1;
            }
            else {
                const patternInput = divmod(b_1, a_1);
                return hcfloop(patternInput[1])(a_1);
            }
        };
        if (lt(a, b)) {
            return hcfloop(a)(b);
        }
        else {
            return hcfloop(b)(a);
        }
    }
    exports.hcf = hcf;
    exports.two = embed(2);
    function powi(x, n) {
        const power = acc => x_1 => n_1 => {
            if (n_1 === 0) {
                return acc;
            }
            else if (n_1 % 2 === 0) {
                return power(acc)(mul(x_1, x_1))(~~(n_1 / 2));
            }
            else {
                return power(mul(x_1, acc))(mul(x_1, x_1))(~~(n_1 / 2));
            }
        };
        return power(exports.one)(x)(n);
    }
    exports.powi = powi;
    function pow(x, n) {
        const power = acc => x_1 => n_1 => {
            if (isZero(n_1)) {
                return acc;
            }
            else {
                const patternInput = divmod(n_1, exports.two);
                if (isZero(patternInput[1])) {
                    return power(acc)(mul(x_1, x_1))(patternInput[0]);
                }
                else {
                    return power(mul(x_1, acc))(mul(x_1, x_1))(patternInput[0]);
                }
            }
        };
        return power(exports.one)(x)(n);
    }
    exports.pow = pow;
    function toFloat(n) {
        const basef = exports.baseN;
        const evalFloat = acc => k => i => {
            if (i === n.bound) {
                return acc;
            }
            else {
                return evalFloat(acc + k * n.digits[i])(k * basef)(i + 1);
            }
        };
        return evalFloat(0)(1)(0);
    }
    exports.toFloat = toFloat;
    function ofInt32(n) {
        return embed(n);
    }
    exports.ofInt32 = ofInt32;
    function ofInt64(n) {
        return embed64(n);
    }
    exports.ofInt64 = ofInt64;
    function toUInt32(n) {
        let $var15 = null;
        switch (n.bound) {
            case 0:
                $var15 = 0;
                break;
            case 1:
                $var15 = n.digits[0] >>> 0;
                break;
            case 2:
                if (n.digits[1] > exports.baseMask32B) {
                    throw new Error();
                }
                $var15 = ((n.digits[0] & exports.baseMask32A) >>> 0) + ((n.digits[1] & exports.baseMask32B) >>> 0 << exports.baseShift32B);
                break;
            default:
                throw new Error();
        }
        return $var15;
    }
    exports.toUInt32 = toUInt32;
    function toUInt64(n) {
        let $var16 = null;
        switch (n.bound) {
            case 0:
                $var16 = Long_1.fromBits(0, 0, true);
                break;
            case 1:
                $var16 = Long_1.fromNumber(n.digits[0], true);
                break;
            case 2:
                $var16 = Long_1.fromNumber(n.digits[0] & exports.baseMask64A, true).add(Long_1.fromNumber(n.digits[1] & exports.baseMask64B, true).shl(exports.baseShift64B));
                break;
            case 3:
                if (n.digits[2] > exports.baseMask64C) {
                    throw new Error();
                }
                $var16 = Long_1.fromNumber(n.digits[0] & exports.baseMask64A, true).add(Long_1.fromNumber(n.digits[1] & exports.baseMask64B, true).shl(exports.baseShift64B)).add(Long_1.fromNumber(n.digits[2] & exports.baseMask64C, true).shl(exports.baseShift64C));
                break;
            default:
                throw new Error();
        }
        return $var16;
    }
    exports.toUInt64 = toUInt64;
    function toString(n) {
        const degn = degree(n);
        const route = prior => k => ten2k => {
            if (degree(ten2k) > degn) {
                return new List_1.default([k, ten2k], prior);
            }
            else {
                return route(new List_1.default([k, ten2k], prior))(k + 1)(mul(ten2k, ten2k));
            }
        };
        const kten2ks = route(new List_1.default())(0)(embed(10));
        const collect = isLeading => digits => n_1 => _arg1 => {
            if (_arg1.tail != null) {
                const ten2k = _arg1.head[1];
                const patternInput = divmod(n_1, ten2k);
                if (isLeading ? isZero(patternInput[0]) : false) {
                    const digits_1 = collect(isLeading)(digits)(patternInput[1])(_arg1.tail);
                    return digits_1;
                }
                else {
                    const digits_1 = collect(false)(digits)(patternInput[1])(_arg1.tail);
                    const digits_2 = collect(isLeading)(digits_1)(patternInput[0])(_arg1.tail);
                    return digits_2;
                }
            }
            else {
                const n_2 = eval32(n_1);
                if (isLeading ? n_2 === 0 : false) {
                    return digits;
                }
                else {
                    return new List_1.default(String(n_2), digits);
                }
            }
        };
        const digits = collect(true)(new List_1.default())(n)(kten2ks);
        if (digits.tail == null) {
            return "0";
        }
        else {
            return String_1.join("", ...Array.from(digits));
        }
    }
    exports.toString = toString;
    function ofString(str) {
        const len = str.length;
        if (String_1.isNullOrEmpty(str)) {
            throw new Error("empty string" + "\nParameter name: " + "str");
        }
        const ten = embed(10);
        const build = acc => i => {
            if (i === len) {
                return acc;
            }
            else {
                const c = str[i];
                const d = c.charCodeAt(0) - "0".charCodeAt(0);
                if (0 <= d ? d <= 9 : false) {
                    return build(add(mul(ten, acc), embed(d)))(i + 1);
                }
                else {
                    throw new Error();
                }
            }
        };
        return build(embed(0))(0);
    }
    exports.ofString = ofString;
    function isSmall(n) {
        return n.bound <= 1;
    }
    exports.isSmall = isSmall;
    function getSmall(n) {
        if (0 < n.bound) {
            return n.digits[0];
        }
        else {
            return 0;
        }
    }
    exports.getSmall = getSmall;
    function factorial(n) {
        const productR = a => b => {
            if (equal(a, b)) {
                return a;
            }
            else {
                const m = div(add(a, b), ofInt32(2));
                return mul(productR(a)(m), productR(add(m, exports.one))(b));
            }
        };
        return productR(exports.one)(n);
    }
    exports.factorial = factorial;
});
