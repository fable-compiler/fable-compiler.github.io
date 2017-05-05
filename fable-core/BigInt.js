define(["require", "exports", "./Symbol", "./Symbol", "./Util", "./BigInt/BigNat", "./BigInt/BigNat", "./Seq", "./Long", "./String"], function (require, exports, Symbol_1, Symbol_2, Util_1, BigNat_1, BigNat_2, Seq_1, Long_1, String_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BigInteger {
        [Symbol_2.default.reflection]() {
            return {
                type: "System.Numerics.BigInteger",
                interfaces: ["FSharpRecord", "System.IComparable"],
                properties: {
                    signInt: "number",
                    v: BigNat_2.default
                }
            };
        }
        constructor(signInt, v) {
            this.signInt = signInt;
            this.v = v;
        }
        get Sign() {
            if (this.IsZero) {
                return 0;
            }
            else {
                return this.signInt;
            }
        }
        get SignInt() {
            return this.signInt;
        }
        get V() {
            return this.v;
        }
        get IsZero() {
            if (this.SignInt === 0) {
                return true;
            }
            else {
                return BigNat_1.isZero(this.V);
            }
        }
        get IsOne() {
            if (this.SignInt === 1) {
                return BigNat_1.isOne(this.V);
            }
            else {
                return false;
            }
        }
        get StructuredDisplayString() {
            return Util_1.toString(this);
        }
        get IsSmall() {
            if (this.IsZero) {
                return true;
            }
            else {
                return BigNat_1.isSmall(this.V);
            }
        }
        get IsNegative() {
            if (this.SignInt === -1) {
                return !this.IsZero;
            }
            else {
                return false;
            }
        }
        get IsPositive() {
            if (this.SignInt === 1) {
                return !this.IsZero;
            }
            else {
                return false;
            }
        }
        CompareTo(obj) {
            if (obj instanceof BigInteger) {
                const that = obj;
                return compare(this, that);
            }
            else {
                throw new Error("the objects are not comparable" + '\nParameter name: ' + "obj");
            }
        }
        ToString() {
            const matchValue = this.SignInt;
            let $var19 = null;
            switch (matchValue) {
                case 1:
                    $var19 = BigNat_1.toString(this.V);
                    break;
                case -1:
                    if (BigNat_1.isZero(this.V)) {
                        $var19 = "0";
                    }
                    else {
                        $var19 = "-" + BigNat_1.toString(this.V);
                    }
                    break;
                case 0:
                    $var19 = "0";
                    break;
                default:
                    throw new Error("signs should be +/- 1 or 0");
            }
            return $var19;
        }
        Equals(obj) {
            if (obj instanceof BigInteger) {
                const that = obj;
                return op_Equality(this, that);
            }
            else {
                return false;
            }
        }
        GetHashCode() {
            return hash(this);
        }
    }
    exports.default = BigInteger;
    Symbol_1.setType("System.Numerics.BigInteger", BigInteger);
    const smallLim = 4096;
    const smallPosTab = Array.from(Seq_1.initialize(smallLim, n => BigNat_1.ofInt32(n)));
    exports.one = fromInt32(1);
    exports.two = fromInt32(2);
    exports.zero = fromInt32(0);
    function fromInt32(n) {
        if (n >= 0) {
            return new BigInteger(1, nat(BigNat_1.ofInt32(n)));
        }
        else if (n === -2147483648) {
            return new BigInteger(-1, nat(BigNat_1.ofInt64(Long_1.fromNumber(n, false).neg())));
        }
        else {
            return new BigInteger(-1, nat(BigNat_1.ofInt32(-n)));
        }
    }
    exports.fromInt32 = fromInt32;
    function fromInt64(n) {
        if (n.CompareTo(Long_1.fromBits(0, 0, false)) >= 0) {
            return new BigInteger(1, nat(BigNat_1.ofInt64(n)));
        }
        else if (n.Equals(Long_1.fromBits(0, 2147483648, false))) {
            return new BigInteger(-1, nat(BigNat_1.add(BigNat_1.ofInt64(Long_1.fromBits(4294967295, 2147483647, false)), BigNat_1.one)));
        }
        else {
            return new BigInteger(-1, nat(BigNat_1.ofInt64(n.neg())));
        }
    }
    exports.fromInt64 = fromInt64;
    function nat(n) {
        if (BigNat_1.isSmall(n) ? BigNat_1.getSmall(n) < smallLim : false) {
            return smallPosTab[BigNat_1.getSmall(n)];
        }
        else {
            return n;
        }
    }
    exports.nat = nat;
    function create(s, n) {
        return new BigInteger(s, nat(n));
    }
    exports.create = create;
    function posn(n) {
        return new BigInteger(1, nat(n));
    }
    exports.posn = posn;
    function negn(n) {
        return new BigInteger(-1, nat(n));
    }
    exports.negn = negn;
    function op_Equality(x, y) {
        const matchValue = [x.SignInt, y.SignInt];
        if (matchValue[0] === -1) {
            if (matchValue[1] === -1) {
                return BigNat_1.equal(x.V, y.V);
            }
            else if (matchValue[1] === 0) {
                return BigNat_1.isZero(x.V);
            }
            else if (matchValue[1] === 1) {
                if (BigNat_1.isZero(x.V)) {
                    return BigNat_1.isZero(y.V);
                }
                else {
                    return false;
                }
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 0) {
            if (matchValue[1] === -1) {
                return BigNat_1.isZero(y.V);
            }
            else if (matchValue[1] === 0) {
                return true;
            }
            else if (matchValue[1] === 1) {
                return BigNat_1.isZero(y.V);
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 1) {
            if (matchValue[1] === -1) {
                if (BigNat_1.isZero(x.V)) {
                    return BigNat_1.isZero(y.V);
                }
                else {
                    return false;
                }
            }
            else if (matchValue[1] === 0) {
                return BigNat_1.isZero(x.V);
            }
            else if (matchValue[1] === 1) {
                return BigNat_1.equal(x.V, y.V);
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else {
            throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
        }
    }
    exports.op_Equality = op_Equality;
    function op_Inequality(x, y) {
        return !op_Equality(x, y);
    }
    exports.op_Inequality = op_Inequality;
    function op_LessThan(x, y) {
        const matchValue = [x.SignInt, y.SignInt];
        if (matchValue[0] === -1) {
            if (matchValue[1] === -1) {
                return BigNat_1.lt(y.V, x.V);
            }
            else if (matchValue[1] === 0) {
                return !BigNat_1.isZero(x.V);
            }
            else if (matchValue[1] === 1) {
                if (!BigNat_1.isZero(x.V)) {
                    return true;
                }
                else {
                    return !BigNat_1.isZero(y.V);
                }
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 0) {
            if (matchValue[1] === -1) {
                return false;
            }
            else if (matchValue[1] === 0) {
                return false;
            }
            else if (matchValue[1] === 1) {
                return !BigNat_1.isZero(y.V);
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 1) {
            if (matchValue[1] === -1) {
                return false;
            }
            else if (matchValue[1] === 0) {
                return false;
            }
            else if (matchValue[1] === 1) {
                return BigNat_1.lt(x.V, y.V);
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else {
            throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
        }
    }
    exports.op_LessThan = op_LessThan;
    function op_GreaterThan(x, y) {
        const matchValue = [x.SignInt, y.SignInt];
        if (matchValue[0] === -1) {
            if (matchValue[1] === -1) {
                return BigNat_1.gt(y.V, x.V);
            }
            else if (matchValue[1] === 0) {
                return false;
            }
            else if (matchValue[1] === 1) {
                return false;
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 0) {
            if (matchValue[1] === -1) {
                return !BigNat_1.isZero(y.V);
            }
            else if (matchValue[1] === 0) {
                return false;
            }
            else if (matchValue[1] === 1) {
                return false;
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 1) {
            if (matchValue[1] === -1) {
                if (!BigNat_1.isZero(x.V)) {
                    return true;
                }
                else {
                    return !BigNat_1.isZero(y.V);
                }
            }
            else if (matchValue[1] === 0) {
                return !BigNat_1.isZero(x.V);
            }
            else if (matchValue[1] === 1) {
                return BigNat_1.gt(x.V, y.V);
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else {
            throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
        }
    }
    exports.op_GreaterThan = op_GreaterThan;
    function compare(n, nn) {
        if (op_LessThan(n, nn)) {
            return -1;
        }
        else if (op_Equality(n, nn)) {
            return 0;
        }
        else {
            return 1;
        }
    }
    exports.compare = compare;
    function hash(z) {
        if (z.SignInt === 0) {
            return 1;
        }
        else {
            return z.SignInt + hash(z.V);
        }
    }
    exports.hash = hash;
    function op_UnaryNegation(z) {
        const matchValue = z.SignInt;
        if (matchValue === 0) {
            return exports.zero;
        }
        else {
            return create(-matchValue, z.V);
        }
    }
    exports.op_UnaryNegation = op_UnaryNegation;
    function scale(k, z) {
        if (z.SignInt === 0) {
            return exports.zero;
        }
        else if (k < 0) {
            return create(-z.SignInt, BigNat_1.scale(-k, z.V));
        }
        else {
            return create(z.SignInt, BigNat_1.scale(k, z.V));
        }
    }
    exports.scale = scale;
    function subnn(nx, ny) {
        if (BigNat_1.gte(nx, ny)) {
            return posn(BigNat_1.sub(nx, ny));
        }
        else {
            return negn(BigNat_1.sub(ny, nx));
        }
    }
    exports.subnn = subnn;
    function addnn(nx, ny) {
        return posn(BigNat_1.add(nx, ny));
    }
    exports.addnn = addnn;
    function op_Addition(x, y) {
        if (y.IsZero) {
            return x;
        }
        else if (x.IsZero) {
            return y;
        }
        else {
            const matchValue = [x.SignInt, y.SignInt];
            if (matchValue[0] === -1) {
                if (matchValue[1] === -1) {
                    return op_UnaryNegation(addnn(x.V, y.V));
                }
                else if (matchValue[1] === 1) {
                    return subnn(y.V, x.V);
                }
                else {
                    throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
                }
            }
            else if (matchValue[0] === 1) {
                if (matchValue[1] === -1) {
                    return subnn(x.V, y.V);
                }
                else if (matchValue[1] === 1) {
                    return addnn(x.V, y.V);
                }
                else {
                    throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
                }
            }
            else {
                throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
            }
        }
    }
    exports.op_Addition = op_Addition;
    function op_Subtraction(x, y) {
        if (y.IsZero) {
            return x;
        }
        else if (x.IsZero) {
            return op_UnaryNegation(y);
        }
        else {
            const matchValue = [x.SignInt, y.SignInt];
            if (matchValue[0] === -1) {
                if (matchValue[1] === -1) {
                    return subnn(y.V, x.V);
                }
                else if (matchValue[1] === 1) {
                    return op_UnaryNegation(addnn(x.V, y.V));
                }
                else {
                    throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
                }
            }
            else if (matchValue[0] === 1) {
                if (matchValue[1] === -1) {
                    return addnn(x.V, y.V);
                }
                else if (matchValue[1] === 1) {
                    return subnn(x.V, y.V);
                }
                else {
                    throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
                }
            }
            else {
                throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
            }
        }
    }
    exports.op_Subtraction = op_Subtraction;
    function op_Multiply(x, y) {
        if (x.IsZero) {
            return x;
        }
        else if (y.IsZero) {
            return y;
        }
        else if (x.IsOne) {
            return y;
        }
        else if (y.IsOne) {
            return x;
        }
        else {
            const m = BigNat_1.mul(x.V, y.V);
            return create(x.SignInt * y.SignInt, m);
        }
    }
    exports.op_Multiply = op_Multiply;
    function divRem(x, y) {
        if (y.IsZero) {
            throw new Error();
        }
        if (x.IsZero) {
            return [exports.zero, exports.zero];
        }
        else {
            const patternInput = BigNat_1.divmod(x.V, y.V);
            const matchValue = [x.SignInt, y.SignInt];
            if (matchValue[0] === -1) {
                if (matchValue[1] === -1) {
                    return [posn(patternInput[0]), negn(patternInput[1])];
                }
                else if (matchValue[1] === 1) {
                    return [negn(patternInput[0]), negn(patternInput[1])];
                }
                else {
                    throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
                }
            }
            else if (matchValue[0] === 1) {
                if (matchValue[1] === -1) {
                    return [negn(patternInput[0]), posn(patternInput[1])];
                }
                else if (matchValue[1] === 1) {
                    return [posn(patternInput[0]), posn(patternInput[1])];
                }
                else {
                    throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
                }
            }
            else {
                throw new Error("signs should be +/- 1" + '\nParameter name: ' + "x");
            }
        }
    }
    exports.divRem = divRem;
    function op_Division(x, y) {
        return divRem(x, y)[0];
    }
    exports.op_Division = op_Division;
    function op_Modulus(x, y) {
        return divRem(x, y)[1];
    }
    exports.op_Modulus = op_Modulus;
    function op_RightShift(x, y) {
        return op_Division(x, pow(exports.two, y));
    }
    exports.op_RightShift = op_RightShift;
    function op_LeftShift(x, y) {
        return op_Multiply(x, pow(exports.two, y));
    }
    exports.op_LeftShift = op_LeftShift;
    function op_BitwiseAnd(x, y) {
        return posn(BigNat_1.bitAnd(x.V, y.V));
    }
    exports.op_BitwiseAnd = op_BitwiseAnd;
    function op_BitwiseOr(x, y) {
        return posn(BigNat_1.bitOr(x.V, y.V));
    }
    exports.op_BitwiseOr = op_BitwiseOr;
    function greatestCommonDivisor(x, y) {
        const matchValue = [x.SignInt, y.SignInt];
        if (matchValue[0] === 0) {
            if (matchValue[1] === 0) {
                return exports.zero;
            }
            else {
                return posn(y.V);
            }
        }
        else if (matchValue[1] === 0) {
            return posn(x.V);
        }
        else {
            return posn(BigNat_1.hcf(x.V, y.V));
        }
    }
    exports.greatestCommonDivisor = greatestCommonDivisor;
    function abs(x) {
        if (x.SignInt === -1) {
            return op_UnaryNegation(x);
        }
        else {
            return x;
        }
    }
    exports.abs = abs;
    function op_LessThanOrEqual(x, y) {
        const matchValue = [x.SignInt, y.SignInt];
        if (matchValue[0] === -1) {
            if (matchValue[1] === -1) {
                return BigNat_1.lte(y.V, x.V);
            }
            else if (matchValue[1] === 0) {
                return true;
            }
            else if (matchValue[1] === 1) {
                return true;
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 0) {
            if (matchValue[1] === -1) {
                return BigNat_1.isZero(y.V);
            }
            else if (matchValue[1] === 0) {
                return true;
            }
            else if (matchValue[1] === 1) {
                return true;
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 1) {
            if (matchValue[1] === -1) {
                if (BigNat_1.isZero(x.V)) {
                    return BigNat_1.isZero(y.V);
                }
                else {
                    return false;
                }
            }
            else if (matchValue[1] === 0) {
                return BigNat_1.isZero(x.V);
            }
            else if (matchValue[1] === 1) {
                return BigNat_1.lte(x.V, y.V);
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else {
            throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
        }
    }
    exports.op_LessThanOrEqual = op_LessThanOrEqual;
    function op_GreaterThanOrEqual(x, y) {
        const matchValue = [x.SignInt, y.SignInt];
        if (matchValue[0] === -1) {
            if (matchValue[1] === -1) {
                return BigNat_1.gte(y.V, x.V);
            }
            else if (matchValue[1] === 0) {
                return BigNat_1.isZero(x.V);
            }
            else if (matchValue[1] === 1) {
                if (BigNat_1.isZero(x.V)) {
                    return BigNat_1.isZero(y.V);
                }
                else {
                    return false;
                }
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 0) {
            if (matchValue[1] === -1) {
                return true;
            }
            else if (matchValue[1] === 0) {
                return true;
            }
            else if (matchValue[1] === 1) {
                return BigNat_1.isZero(y.V);
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else if (matchValue[0] === 1) {
            if (matchValue[1] === -1) {
                return true;
            }
            else if (matchValue[1] === 0) {
                return true;
            }
            else if (matchValue[1] === 1) {
                return BigNat_1.gte(x.V, y.V);
            }
            else {
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
            }
        }
        else {
            throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
        }
    }
    exports.op_GreaterThanOrEqual = op_GreaterThanOrEqual;
    function toSByte(x) {
        return (toInt32(x) + 0x80 & 0xFF) - 0x80;
    }
    exports.toSByte = toSByte;
    function toByte(x) {
        return toUInt32(x) & 0xFF;
    }
    exports.toByte = toByte;
    function toInt16(x) {
        return (toInt32(x) + 0x8000 & 0xFFFF) - 0x8000;
    }
    exports.toInt16 = toInt16;
    function toUInt16(x) {
        return toUInt32(x) & 0xFFFF;
    }
    exports.toUInt16 = toUInt16;
    function toInt32(x) {
        if (x.IsZero) {
            return 0;
        }
        else {
            const u = BigNat_1.toUInt32(x.V);
            if (u <= 2147483647 >>> 0) {
                return x.SignInt * ~~u;
            }
            else if (x.SignInt === -1 ? u === 2147483647 + 1 >>> 0 : false) {
                return -2147483648;
            }
            else {
                throw new Error();
            }
        }
    }
    exports.toInt32 = toInt32;
    function toUInt32(x) {
        if (x.IsZero) {
            return 0;
        }
        else {
            return BigNat_1.toUInt32(x.V);
        }
    }
    exports.toUInt32 = toUInt32;
    function toInt64(x) {
        if (x.IsZero) {
            return Long_1.fromBits(0, 0, false);
        }
        else {
            const u = BigNat_1.toUInt64(x.V);
            if (u.CompareTo(Long_1.fromBits(4294967295, 2147483647, false)) <= 0) {
                return Long_1.fromNumber(x.SignInt, false).mul(u);
            }
            else if (x.SignInt === -1 ? u.Equals(Long_1.fromBits(4294967295, 2147483647, false).add(Long_1.fromBits(1, 0, false))) : false) {
                return Long_1.fromBits(0, 2147483648, false);
            }
            else {
                throw new Error();
            }
        }
    }
    exports.toInt64 = toInt64;
    function toUInt64(x) {
        if (x.IsZero) {
            return Long_1.fromBits(0, 0, true);
        }
        else {
            return BigNat_1.toUInt64(x.V);
        }
    }
    exports.toUInt64 = toUInt64;
    function toDouble(x) {
        const matchValue = x.SignInt;
        let $var20 = null;
        switch (matchValue) {
            case 1:
                $var20 = BigNat_1.toFloat(x.V);
                break;
            case -1:
                $var20 = -BigNat_1.toFloat(x.V);
                break;
            case 0:
                $var20 = 0;
                break;
            default:
                throw new Error("signs should be +/- 1 or 0" + '\nParameter name: ' + "x");
        }
        return $var20;
    }
    exports.toDouble = toDouble;
    function toSingle(x) {
        return Math.fround(toDouble(x));
    }
    exports.toSingle = toSingle;
    function toDecimal(x) {
        return toDouble(x);
    }
    exports.toDecimal = toDecimal;
    function parse(text) {
        if (text == null) {
            throw new Error("text");
        }
        const text_1 = String_1.trim(text, "both");
        const len = text_1.length;
        if (len === 0) {
            throw new Error();
        }
        const matchValue = [text_1[0], len];
        if (matchValue[0] === "+") {
            if (matchValue[1] === 1) {
                throw new Error();
            }
            else {
                return posn(BigNat_1.ofString(text_1.slice(1, len - 1 + 1)));
            }
        }
        else if (matchValue[0] === "-") {
            if (matchValue[1] === 1) {
                throw new Error();
            }
            else {
                return negn(BigNat_1.ofString(text_1.slice(1, len - 1 + 1)));
            }
        }
        else {
            return posn(BigNat_1.ofString(text_1));
        }
    }
    exports.parse = parse;
    function factorial(x) {
        if (x.IsNegative) {
            throw new Error("mustBeNonNegative" + '\nParameter name: ' + "x");
        }
        if (x.IsPositive) {
            return posn(BigNat_1.factorial(x.V));
        }
        else {
            return exports.one;
        }
    }
    exports.factorial = factorial;
    function op_UnaryPlus(n1) {
        return n1;
    }
    exports.op_UnaryPlus = op_UnaryPlus;
    function pow(x, y) {
        if (y < 0) {
            throw new Error("y");
        }
        const matchValue = [x.IsZero, y];
        if (matchValue[0]) {
            if (matchValue[1] === 0) {
                return exports.one;
            }
            else {
                return exports.zero;
            }
        }
        else {
            const yval = fromInt32(y);
            return create(BigNat_1.isZero(BigNat_1.rem(yval.V, BigNat_1.two)) ? 1 : x.SignInt, BigNat_1.pow(x.V, yval.V));
        }
    }
    exports.pow = pow;
});
