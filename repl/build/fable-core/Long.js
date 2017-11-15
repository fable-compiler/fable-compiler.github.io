// Source: https://github.com/dcodeIO/long.js/blob/master/LICENSE
define(["require", "exports", "./Int32", "./Symbol"], function (require, exports, Int32_1, Symbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.
    /**
     * @class A Long class for representing a 64 bit two's-complement integer value.
     */
    class Long {
        /**
         * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
         *  See the from* functions below for more convenient ways of constructing Longs.
         * @param {number} low The low (signed) 32 bits of the long
         * @param {number} high The high (signed) 32 bits of the long
         * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
         */
        constructor(low, high, unsigned) {
            /**
             * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
             * @param {!Long|number|string} other Other value
             * @returns {boolean}
             */
            this.eq = this.equals;
            /**
             * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
             * @param {!Long|number|string} other Other value
             * @returns {boolean}
             */
            this.neq = this.notEquals;
            /**
             * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
             * @param {!Long|number|string} other Other value
             * @returns {boolean}
             */
            this.lt = this.lessThan;
            /**
             * Tests if this Long's value is less than or equal the specified's.
             * This is an alias of {@link Long#lessThanOrEqual}.
             * @param {!Long|number|string} other Other value
             * @returns {boolean}
             */
            this.lte = this.lessThanOrEqual;
            /**
             * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
             * @param {!Long|number|string} other Other value
             * @returns {boolean}
             */
            this.gt = this.greaterThan;
            /**
             * Tests if this Long's value is greater than or equal the specified's.
             * This is an alias of {@link Long#greaterThanOrEqual}.
             * @param {!Long|number|string} other Other value
             * @returns {boolean}
             */
            this.gte = this.greaterThanOrEqual;
            /**
             * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
             * @param {!Long|number|string} other Other value
             * @returns {number} 0 if they are the same, 1 if the this is greater and -1
             *  if the given one is greater
             */
            this.comp = this.compare;
            /**
             * Negates this Long's value. This is an alias of {@link Long#negate}.
             * @returns {!Long} Negated Long
             */
            this.neg = this.negate;
            /**
             * Returns this Long's absolute value. This is an alias of {@link Long#absolute}.
             * @returns {!Long} Absolute Long
             */
            this.abs = this.absolute;
            /**
             * Returns the difference of this and the specified  This is an alias of {@link Long#subtract}.
             * @param {!Long|number|string} subtrahend Subtrahend
             * @returns {!Long} Difference
             */
            this.sub = this.subtract;
            /**
             * Returns the product of this and the specified  This is an alias of {@link Long#multiply}.
             * @param {!Long|number|string} multiplier Multiplier
             * @returns {!Long} Product
             */
            this.mul = this.multiply;
            /**
             * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
             * @param {!Long|number|string} divisor Divisor
             * @returns {!Long} Quotient
             */
            this.div = this.divide;
            /**
             * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
             * @param {!Long|number|string} divisor Divisor
             * @returns {!Long} Remainder
             */
            this.mod = this.modulo;
            /**
             * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
             * @param {number|!Long} numBits Number of bits
             * @returns {!Long} Shifted Long
             */
            this.shl = this.shiftLeft;
            /**
             * Returns this Long with bits arithmetically shifted to the right by the given amount.
             * This is an alias of {@link Long#shiftRight}.
             * @param {number|!Long} numBits Number of bits
             * @returns {!Long} Shifted Long
             */
            this.shr = this.shiftRight;
            /**
             * Returns this Long with bits logically shifted to the right by the given amount.
             * This is an alias of {@link Long#shiftRightUnsigned}.
             * @param {number|!Long} numBits Number of bits
             * @returns {!Long} Shifted Long
             */
            this.shru = this.shiftRightUnsigned;
            // Aliases for compatibility with Fable
            this.Equals = this.equals;
            this.CompareTo = this.compare;
            this.ToString = this.toString;
            this.low = low | 0;
            this.high = high | 0;
            this.unsigned = !!unsigned;
        }
        /**
         * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
         * @returns {number}
         */
        toInt() {
            return this.unsigned ? this.low >>> 0 : this.low;
        }
        /**
         * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
         * @returns {number}
         */
        toNumber() {
            if (this.unsigned)
                return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
            return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
        }
        /**
         * Converts the Long to a string written in the specified radix.
         * @param {number=} radix Radix (2-36), defaults to 10
         * @returns {string}
         * @override
         * @throws {RangeError} If `radix` is out of range
         */
        toString(radix = 10) {
            radix = radix || 10;
            if (radix < 2 || 36 < radix)
                throw RangeError("radix");
            if (this.isZero())
                return "0";
            if (this.isNegative()) {
                if (this.eq(exports.MIN_VALUE)) {
                    // We need to change the Long value before it can be negated, so we remove
                    // the bottom-most digit in this base and then recurse to do the rest.
                    const radixLong = fromNumber(radix);
                    const div = this.div(radixLong);
                    const rem1 = div.mul(radixLong).sub(this);
                    return div.toString(radix) + rem1.toInt().toString(radix);
                }
                else
                    return "-" + this.neg().toString(radix);
            }
            // Do several (6) digits each time through the loop, so as to
            // minimize the calls to the very expensive emulated div.
            const radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned);
            let rem = this;
            let result = "";
            while (true) {
                const remDiv = rem.div(radixToPower);
                const intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0;
                let digits = intval.toString(radix);
                rem = remDiv;
                if (rem.isZero())
                    return digits + result;
                else {
                    while (digits.length < 6)
                        digits = "0" + digits;
                    result = "" + digits + result;
                }
            }
        }
        /**
         * Gets the high 32 bits as a signed integer.
         * @returns {number} Signed high bits
         */
        getHighBits() {
            return this.high;
        }
        /**
         * Gets the high 32 bits as an unsigned integer.
         * @returns {number} Unsigned high bits
         */
        getHighBitsUnsigned() {
            return this.high >>> 0;
        }
        /**
         * Gets the low 32 bits as a signed integer.
         * @returns {number} Signed low bits
         */
        getLowBits() {
            return this.low;
        }
        /**
         * Gets the low 32 bits as an unsigned integer.
         * @returns {number} Unsigned low bits
         */
        getLowBitsUnsigned() {
            return this.low >>> 0;
        }
        /**
         * Gets the number of bits needed to represent the absolute value of this
         * @returns {number}
         */
        getNumBitsAbs() {
            if (this.isNegative())
                return this.eq(exports.MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
            const val = this.high !== 0 ? this.high : this.low;
            let bit;
            for (bit = 31; bit > 0; bit--)
                if ((val & (1 << bit)) !== 0)
                    break;
            return this.high !== 0 ? bit + 33 : bit + 1;
        }
        /**
         * Tests if this Long's value equals zero.
         * @returns {boolean}
         */
        isZero() {
            return this.high === 0 && this.low === 0;
        }
        /**
         * Tests if this Long's value is negative.
         * @returns {boolean}
         */
        isNegative() {
            return !this.unsigned && this.high < 0;
        }
        /**
         * Tests if this Long's value is positive.
         * @returns {boolean}
         */
        isPositive() {
            return this.unsigned || this.high >= 0;
        }
        /**
         * Tests if this Long's value is odd.
         * @returns {boolean}
         */
        isOdd() {
            return (this.low & 1) === 1;
        }
        /**
         * Tests if this Long's value is even.
         * @returns {boolean}
         */
        isEven() {
            return (this.low & 1) === 0;
        }
        /**
         * Tests if this Long's value equals the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        equals(other) {
            if (!isLong(other))
                other = fromValue(other);
            if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
                return false;
            return this.high === other.high && this.low === other.low;
        }
        /**
         * Tests if this Long's value differs from the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        notEquals(other) {
            return !this.eq(/* validates */ other);
        }
        /**
         * Tests if this Long's value is less than the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        lessThan(other) {
            return this.comp(/* validates */ other) < 0;
        }
        /**
         * Tests if this Long's value is less than or equal the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        lessThanOrEqual(other) {
            return this.comp(/* validates */ other) <= 0;
        }
        /**
         * Tests if this Long's value is greater than the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        greaterThan(other) {
            return this.comp(/* validates */ other) > 0;
        }
        /**
         * Tests if this Long's value is greater than or equal the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        greaterThanOrEqual(other) {
            return this.comp(/* validates */ other) >= 0;
        }
        /**
         * Compares this Long's value with the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {number} 0 if they are the same, 1 if the this is greater and -1
         *  if the given one is greater
         */
        compare(other) {
            if (!isLong(other))
                other = fromValue(other);
            if (this.eq(other))
                return 0;
            const thisNeg = this.isNegative();
            const otherNeg = other.isNegative();
            if (thisNeg && !otherNeg)
                return -1;
            if (!thisNeg && otherNeg)
                return 1;
            // At this point the sign bits are the same
            if (!this.unsigned)
                return this.sub(other).isNegative() ? -1 : 1;
            // Both are positive if at least one is unsigned
            return (other.high >>> 0) > (this.high >>> 0) ||
                (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
        }
        /**
         * Negates this Long's value.
         * @returns {!Long} Negated Long
         */
        negate() {
            if (!this.unsigned && this.eq(exports.MIN_VALUE))
                return exports.MIN_VALUE;
            return this.not().add(exports.ONE);
        }
        /**
         * Returns this Long's absolute value.
         * @returns {!Long} Absolute Long
         */
        absolute() {
            if (!this.unsigned && this.isNegative())
                return this.negate();
            else
                return this;
        }
        /**
         * Returns the sum of this and the specified
         * @param {!Long|number|string} addend Addend
         * @returns {!Long} Sum
         */
        add(addend) {
            if (!isLong(addend))
                addend = fromValue(addend);
            // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
            const a48 = this.high >>> 16;
            const a32 = this.high & 0xFFFF;
            const a16 = this.low >>> 16;
            const a00 = this.low & 0xFFFF;
            const b48 = addend.high >>> 16;
            const b32 = addend.high & 0xFFFF;
            const b16 = addend.low >>> 16;
            const b00 = addend.low & 0xFFFF;
            let c48 = 0;
            let c32 = 0;
            let c16 = 0;
            let c00 = 0;
            c00 += a00 + b00;
            c16 += c00 >>> 16;
            c00 &= 0xFFFF;
            c16 += a16 + b16;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c32 += a32 + b32;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c48 += a48 + b48;
            c48 &= 0xFFFF;
            return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
        }
        /**
         * Returns the difference of this and the specified
         * @param {!Long|number|string} subtrahend Subtrahend
         * @returns {!Long} Difference
         */
        subtract(subtrahend) {
            if (!isLong(subtrahend))
                subtrahend = fromValue(subtrahend);
            return this.add(subtrahend.neg());
        }
        /**
         * Returns the product of this and the specified
         * @param {!Long|number|string} multiplier Multiplier
         * @returns {!Long} Product
         */
        multiply(multiplier) {
            if (this.isZero())
                return exports.ZERO;
            if (!isLong(multiplier))
                multiplier = fromValue(multiplier);
            if (multiplier.isZero())
                return exports.ZERO;
            if (this.eq(exports.MIN_VALUE))
                return multiplier.isOdd() ? exports.MIN_VALUE : exports.ZERO;
            if (multiplier.eq(exports.MIN_VALUE))
                return this.isOdd() ? exports.MIN_VALUE : exports.ZERO;
            if (this.isNegative()) {
                if (multiplier.isNegative())
                    return this.neg().mul(multiplier.neg());
                else
                    return this.neg().mul(multiplier).neg();
            }
            else if (multiplier.isNegative())
                return this.mul(multiplier.neg()).neg();
            // If both longs are small, use float multiplication
            if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
                return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
            // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
            // We can skip products that would overflow.
            const a48 = this.high >>> 16;
            const a32 = this.high & 0xFFFF;
            const a16 = this.low >>> 16;
            const a00 = this.low & 0xFFFF;
            const b48 = multiplier.high >>> 16;
            const b32 = multiplier.high & 0xFFFF;
            const b16 = multiplier.low >>> 16;
            const b00 = multiplier.low & 0xFFFF;
            let c48 = 0;
            let c32 = 0;
            let c16 = 0;
            let c00 = 0;
            c00 += a00 * b00;
            c16 += c00 >>> 16;
            c00 &= 0xFFFF;
            c16 += a16 * b00;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c16 += a00 * b16;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c32 += a32 * b00;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c32 += a16 * b16;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c32 += a00 * b32;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
            c48 &= 0xFFFF;
            return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
        }
        /**
         * Returns this Long divided by the specified. The result is signed if this Long is signed or
         *  unsigned if this Long is unsigned.
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Quotient
         */
        divide(divisor) {
            if (!isLong(divisor))
                divisor = fromValue(divisor);
            if (divisor.isZero())
                throw Error("division by zero");
            if (this.isZero())
                return this.unsigned ? exports.UZERO : exports.ZERO;
            let rem = exports.ZERO;
            let res = exports.ZERO;
            if (!this.unsigned) {
                // This section is only relevant for signed longs and is derived from the
                // closure library as a whole.
                if (this.eq(exports.MIN_VALUE)) {
                    if (divisor.eq(exports.ONE) || divisor.eq(exports.NEG_ONE))
                        return exports.MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
                    else if (divisor.eq(exports.MIN_VALUE))
                        return exports.ONE;
                    else {
                        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                        const halfThis = this.shr(1);
                        const approx = halfThis.div(divisor).shl(1);
                        if (approx.eq(exports.ZERO)) {
                            return divisor.isNegative() ? exports.ONE : exports.NEG_ONE;
                        }
                        else {
                            rem = this.sub(divisor.mul(approx));
                            res = approx.add(rem.div(divisor));
                            return res;
                        }
                    }
                }
                else if (divisor.eq(exports.MIN_VALUE))
                    return this.unsigned ? exports.UZERO : exports.ZERO;
                if (this.isNegative()) {
                    if (divisor.isNegative())
                        return this.neg().div(divisor.neg());
                    return this.neg().div(divisor).neg();
                }
                else if (divisor.isNegative())
                    return this.div(divisor.neg()).neg();
                res = exports.ZERO;
            }
            else {
                // The algorithm below has not been made for unsigned longs. It's therefore
                // required to take special care of the MSB prior to running it.
                if (!divisor.unsigned)
                    divisor = divisor.toUnsigned();
                if (divisor.gt(this))
                    return exports.UZERO;
                if (divisor.gt(this.shru(1)))
                    return exports.UONE;
                res = exports.UZERO;
            }
            // Repeat the following until the remainder is less than other:  find a
            // floating-point that approximates remainder / other *from below*, add this
            // into the result, and subtract it from the remainder.  It is critical that
            // the approximate value is less than or equal to the real value so that the
            // remainder never becomes negative.
            rem = this;
            while (rem.gte(divisor)) {
                // Approximate the result of division. This may be a little greater or
                // smaller than the actual value.
                let approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
                // We will tweak the approximate result by changing it in the 48-th digit or
                // the smallest non-fractional digit, whichever is larger.
                // tslint:disable-next-line:prefer-const
                // tslint:disable-next-line:semicolon
                const log2 = Math.ceil(Math.log(approx) / Math.LN2);
                const delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48);
                // Decrease the approximation until it is smaller than the remainder.  Note
                // that if it is too large, the product overflows and is negative.
                let approxRes = fromNumber(approx);
                let approxRem = approxRes.mul(divisor);
                while (approxRem.isNegative() || approxRem.gt(rem)) {
                    approx -= delta;
                    approxRes = fromNumber(approx, this.unsigned);
                    approxRem = approxRes.mul(divisor);
                }
                // We know the answer can't be zero... and actually, zero would cause
                // infinite recursion since we would make no progress.
                if (approxRes.isZero())
                    approxRes = exports.ONE;
                res = res.add(approxRes);
                rem = rem.sub(approxRem);
            }
            return res;
        }
        /**
         * Returns this Long modulo the specified.
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Remainder
         */
        modulo(divisor) {
            if (!isLong(divisor))
                divisor = fromValue(divisor);
            return this.sub(this.div(divisor).mul(divisor));
        }
        /**
         * Returns the bitwise NOT of this
         * @returns {!Long}
         */
        not() {
            return fromBits(~this.low, ~this.high, this.unsigned);
        }
        /**
         * Returns the bitwise AND of this Long and the specified.
         * @param {!Long|number|string} other Other Long
         * @returns {!Long}
         */
        and(other) {
            if (!isLong(other))
                other = fromValue(other);
            return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
        }
        /**
         * Returns the bitwise OR of this Long and the specified.
         * @param {!Long|number|string} other Other Long
         * @returns {!Long}
         */
        or(other) {
            if (!isLong(other))
                other = fromValue(other);
            return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
        }
        /**
         * Returns the bitwise XOR of this Long and the given one.
         * @param {!Long|number|string} other Other Long
         * @returns {!Long}
         */
        xor(other) {
            if (!isLong(other))
                other = fromValue(other);
            return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
        }
        /**
         * Returns this Long with bits shifted to the left by the given amount.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        shiftLeft(numBits) {
            if (isLong(numBits))
                numBits = numBits.toInt();
            numBits = numBits & 63;
            if (numBits === 0)
                return this;
            else if (numBits < 32)
                return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
            else
                return fromBits(0, this.low << (numBits - 32), this.unsigned);
        }
        /**
         * Returns this Long with bits arithmetically shifted to the right by the given amount.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        shiftRight(numBits) {
            if (isLong(numBits))
                numBits = numBits.toInt();
            numBits = numBits & 63;
            if (numBits === 0)
                return this;
            else if (numBits < 32)
                return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
            else
                return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
        }
        /**
         * Returns this Long with bits logically shifted to the right by the given amount.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        shiftRightUnsigned(numBits) {
            if (isLong(numBits))
                numBits = numBits.toInt();
            numBits = numBits & 63;
            if (numBits === 0)
                return this;
            else {
                const high = this.high;
                if (numBits < 32) {
                    const low = this.low;
                    return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
                }
                else if (numBits === 32)
                    return fromBits(high, 0, this.unsigned);
                else
                    return fromBits(high >>> (numBits - 32), 0, this.unsigned);
            }
        }
        /**
         * Converts this Long to signed.
         * @returns {!Long} Signed long
         */
        toSigned() {
            if (!this.unsigned)
                return this;
            return fromBits(this.low, this.high, false);
        }
        /**
         * Converts this Long to unsigned.
         * @returns {!Long} Unsigned long
         */
        toUnsigned() {
            if (this.unsigned)
                return this;
            return fromBits(this.low, this.high, true);
        }
        /**
         * Converts this Long to its byte representation.
         * @param {boolean=} le Whether little or big endian, defaults to big endian
         * @returns {!Array.<number>} Byte representation
         */
        toBytes(le) {
            return le ? this.toBytesLE() : this.toBytesBE();
        }
        /**
         * Converts this Long to its little endian byte representation.
         * @returns {!Array.<number>} Little endian byte representation
         */
        toBytesLE() {
            const hi = this.high;
            const lo = this.low;
            return [
                lo & 0xff,
                (lo >>> 8) & 0xff,
                (lo >>> 16) & 0xff,
                (lo >>> 24) & 0xff,
                hi & 0xff,
                (hi >>> 8) & 0xff,
                (hi >>> 16) & 0xff,
                (hi >>> 24) & 0xff,
            ];
        }
        /**
         * Converts this Long to its big endian byte representation.
         * @returns {!Array.<number>} Big endian byte representation
         */
        toBytesBE() {
            const hi = this.high;
            const lo = this.low;
            return [
                (hi >>> 24) & 0xff,
                (hi >>> 16) & 0xff,
                (hi >>> 8) & 0xff,
                hi & 0xff,
                (lo >>> 24) & 0xff,
                (lo >>> 16) & 0xff,
                (lo >>> 8) & 0xff,
                lo & 0xff,
            ];
        }
        toJSON() {
            return (!this.unsigned && !this.lessThan(0) ? "+" : "") + this.toString();
        }
        static ofJSON(str) {
            return fromString(str, !/^[+-]/.test(str));
        }
        [Symbol_1.default.reflection]() {
            return {
                type: this.unsigned ? "System.UInt64" : "System.Int64",
                interfaces: ["FSharpRecord", "System.IComparable"],
                properties: {
                    low: "number",
                    high: "number",
                    unsigned: "boolean",
                },
            };
        }
    }
    exports.default = Long;
    // A cache of the Long representations of small integer values.
    const INT_CACHE = {};
    // A cache of the Long representations of small unsigned integer values.
    const UINT_CACHE = {};
    /**
     * Tests if the specified object is a
     * @param {*} obj Object
     * @returns {boolean}
     */
    function isLong(obj) {
        return (obj && obj instanceof Long);
    }
    exports.isLong = isLong;
    /**
     * Returns a Long representing the given 32 bit integer value.
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    function fromInt(value, unsigned = false) {
        let obj;
        let cachedObj;
        let cache = false;
        if (unsigned) {
            value >>>= 0;
            if (0 <= value && value < 256) {
                cache = true;
                cachedObj = UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
            if (cache)
                UINT_CACHE[value] = obj;
            return obj;
        }
        else {
            value |= 0;
            if (-128 <= value && value < 128) {
                cache = true;
                cachedObj = INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, value < 0 ? -1 : 0, false);
            if (cache)
                INT_CACHE[value] = obj;
            return obj;
        }
    }
    exports.fromInt = fromInt;
    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    function fromNumber(value, unsigned = false) {
        if (isNaN(value) || !isFinite(value)) {
            // TODO FormatException ?
            throw new Error("Input string was not in a correct format.");
        }
        if (unsigned) {
            if (value < 0)
                return exports.UZERO;
            if (value >= TWO_PWR_64_DBL)
                return exports.MAX_UNSIGNED_VALUE;
        }
        else {
            if (value <= -TWO_PWR_63_DBL)
                return exports.MIN_VALUE;
            if (value + 1 >= TWO_PWR_63_DBL)
                return exports.MAX_VALUE;
        }
        if (value < 0)
            return fromNumber(-value, unsigned).neg();
        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
    }
    exports.fromNumber = fromNumber;
    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     */
    function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
    }
    exports.fromBits = fromBits;
    /**
     * @param {number} base
     * @param {number} exponent
     * @returns {number}
     */
    const pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)
    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @param {string} str The textual representation of the Long
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Long} The corresponding Long value
     */
    function fromString(str, unsigned = false, radix = 10) {
        if (Int32_1.isValid(str, radix) === null) {
            // TODO FormatException ?
            throw new Error("Input string was not in a correct format.");
        }
        if (str.length === 0)
            throw Error("empty string");
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return exports.ZERO;
        if (typeof unsigned === "number") {
            // For goog.math.long compatibility
            radix = unsigned,
                unsigned = false;
        }
        else {
            unsigned = !!unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError("radix");
        const p = str.indexOf("-");
        if (p > 0)
            throw Error("interior hyphen");
        else if (p === 0) {
            return fromString(str.substring(1), unsigned, radix).neg();
        }
        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        const radixToPower = fromNumber(pow_dbl(radix, 8));
        let result = exports.ZERO;
        for (let i = 0; i < str.length; i += 8) {
            const size = Math.min(8, str.length - i);
            const value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                const power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
            }
            else {
                result = result.mul(radixToPower);
                result = result.add(fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    }
    exports.fromString = fromString;
    /**
     * Converts the specified value to a
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @returns {!Long}
     */
    function fromValue(val) {
        if (val /* is compatible */ instanceof Long)
            return val;
        if (typeof val === "number")
            return fromNumber(val);
        if (typeof val === "string")
            return fromString(val);
        // Throws for non-objects, converts non-instanceof Long:
        return fromBits(val.low, val.high, val.unsigned);
    }
    exports.fromValue = fromValue;
    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.
    const TWO_PWR_16_DBL = 1 << 16;
    const TWO_PWR_24_DBL = 1 << 24;
    const TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
    const TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
    const TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
    const TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
    /**
     * Signed zero.
     * @type {!Long}
     */
    exports.ZERO = fromInt(0);
    /**
     * Unsigned zero.
     * @type {!Long}
     */
    exports.UZERO = fromInt(0, true);
    /**
     * Signed one.
     * @type {!Long}
     */
    exports.ONE = fromInt(1);
    /**
     * Unsigned one.
     * @type {!Long}
     */
    exports.UONE = fromInt(1, true);
    /**
     * Signed negative one.
     * @type {!Long}
     */
    exports.NEG_ONE = fromInt(-1);
    /**
     * Maximum signed value.
     * @type {!Long}
     */
    exports.MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
    /**
     * Maximum unsigned value.
     * @type {!Long}
     */
    exports.MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
    /**
     * Minimum signed value.
     * @type {!Long}
     */
    exports.MIN_VALUE = fromBits(0, 0x80000000 | 0, false);
    function unixEpochMillisecondsToTicks(ms, offset) {
        return fromNumber(ms).add(62135596800000).add(offset).mul(10000);
    }
    exports.unixEpochMillisecondsToTicks = unixEpochMillisecondsToTicks;
    function ticksToUnixEpochMilliseconds(ticks) {
        return ticks.div(10000).sub(62135596800000).toNumber();
    }
    exports.ticksToUnixEpochMilliseconds = ticksToUnixEpochMilliseconds;
});
