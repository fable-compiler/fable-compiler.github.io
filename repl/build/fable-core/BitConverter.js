define(["require", "exports", "./Long"], function (require, exports, Long_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const littleEndian = true;
    function isLittleEndian() {
        return littleEndian;
    }
    exports.isLittleEndian = isLittleEndian;
    function getBytesBoolean(value) {
        const bytes = new Uint8Array(1);
        new DataView(bytes.buffer).setUint8(0, value ? 1 : 0);
        return bytes;
    }
    exports.getBytesBoolean = getBytesBoolean;
    function getBytesChar(value) {
        const bytes = new Uint8Array(2);
        new DataView(bytes.buffer).setUint16(0, value.charCodeAt(0), littleEndian);
        return bytes;
    }
    exports.getBytesChar = getBytesChar;
    function getBytesInt16(value) {
        const bytes = new Uint8Array(2);
        new DataView(bytes.buffer).setInt16(0, value, littleEndian);
        return bytes;
    }
    exports.getBytesInt16 = getBytesInt16;
    function getBytesInt32(value) {
        const bytes = new Uint8Array(4);
        new DataView(bytes.buffer).setInt32(0, value, littleEndian);
        return bytes;
    }
    exports.getBytesInt32 = getBytesInt32;
    function getBytesInt64(value) {
        const bytes = new Uint8Array(8);
        new DataView(bytes.buffer).setInt32(littleEndian ? 0 : 4, value.getLowBits(), littleEndian);
        new DataView(bytes.buffer).setInt32(littleEndian ? 4 : 0, value.getHighBits(), littleEndian);
        return bytes;
    }
    exports.getBytesInt64 = getBytesInt64;
    function getBytesUInt16(value) {
        const bytes = new Uint8Array(2);
        new DataView(bytes.buffer).setUint16(0, value, littleEndian);
        return bytes;
    }
    exports.getBytesUInt16 = getBytesUInt16;
    function getBytesUInt32(value) {
        const bytes = new Uint8Array(4);
        new DataView(bytes.buffer).setUint32(0, value, littleEndian);
        return bytes;
    }
    exports.getBytesUInt32 = getBytesUInt32;
    function getBytesUInt64(value) {
        const bytes = new Uint8Array(8);
        new DataView(bytes.buffer).setUint32(littleEndian ? 0 : 4, value.getLowBitsUnsigned(), littleEndian);
        new DataView(bytes.buffer).setUint32(littleEndian ? 4 : 0, value.getHighBitsUnsigned(), littleEndian);
        return bytes;
    }
    exports.getBytesUInt64 = getBytesUInt64;
    function getBytesSingle(value) {
        const bytes = new Uint8Array(4);
        new DataView(bytes.buffer).setFloat32(0, value, littleEndian);
        return bytes;
    }
    exports.getBytesSingle = getBytesSingle;
    function getBytesDouble(value) {
        const bytes = new Uint8Array(8);
        new DataView(bytes.buffer).setFloat64(0, value, littleEndian);
        return bytes;
    }
    exports.getBytesDouble = getBytesDouble;
    function int64BitsToDouble(value) {
        const buffer = new ArrayBuffer(8);
        new DataView(buffer).setInt32(littleEndian ? 0 : 4, value.getLowBits(), littleEndian);
        new DataView(buffer).setInt32(littleEndian ? 4 : 0, value.getHighBits(), littleEndian);
        return new DataView(buffer).getFloat64(0, littleEndian);
    }
    exports.int64BitsToDouble = int64BitsToDouble;
    function doubleToInt64Bits(value) {
        const buffer = new ArrayBuffer(8);
        new DataView(buffer).setFloat64(0, value, littleEndian);
        const lowBits = new DataView(buffer).getInt32(littleEndian ? 0 : 4, littleEndian);
        const highBits = new DataView(buffer).getInt32(littleEndian ? 4 : 0, littleEndian);
        return Long_1.fromBits(lowBits, highBits, false);
    }
    exports.doubleToInt64Bits = doubleToInt64Bits;
    function toBoolean(bytes, offset) {
        return new DataView(bytes.buffer).getUint8(offset) === 1 ? true : false;
    }
    exports.toBoolean = toBoolean;
    function toChar(bytes, offset) {
        const code = new DataView(bytes.buffer).getUint16(offset, littleEndian);
        return String.fromCharCode(code);
    }
    exports.toChar = toChar;
    function toInt16(bytes, offset) {
        return new DataView(bytes.buffer).getInt16(offset, littleEndian);
    }
    exports.toInt16 = toInt16;
    function toInt32(bytes, offset) {
        return new DataView(bytes.buffer).getInt32(offset, littleEndian);
    }
    exports.toInt32 = toInt32;
    function toInt64(bytes, offset) {
        const lowBits = new DataView(bytes.buffer).getInt32(offset + (littleEndian ? 0 : 4), littleEndian);
        const highBits = new DataView(bytes.buffer).getInt32(offset + (littleEndian ? 4 : 0), littleEndian);
        return Long_1.fromBits(lowBits, highBits, false);
    }
    exports.toInt64 = toInt64;
    function toUInt16(bytes, offset) {
        return new DataView(bytes.buffer).getUint16(offset, littleEndian);
    }
    exports.toUInt16 = toUInt16;
    function toUInt32(bytes, offset) {
        return new DataView(bytes.buffer).getUint32(offset, littleEndian);
    }
    exports.toUInt32 = toUInt32;
    function toUInt64(bytes, offset) {
        const lowBits = new DataView(bytes.buffer).getUint32(offset + (littleEndian ? 0 : 4), littleEndian);
        const highBits = new DataView(bytes.buffer).getUint32(offset + (littleEndian ? 4 : 0), littleEndian);
        return Long_1.fromBits(lowBits, highBits, true);
    }
    exports.toUInt64 = toUInt64;
    function toSingle(bytes, offset) {
        return new DataView(bytes.buffer).getFloat32(offset, littleEndian);
    }
    exports.toSingle = toSingle;
    function toDouble(bytes, offset) {
        return new DataView(bytes.buffer).getFloat64(offset, littleEndian);
    }
    exports.toDouble = toDouble;
    function toString(bytes, offset, count) {
        let ar = bytes;
        if (typeof offset !== "undefined" && typeof count !== "undefined") {
            ar = bytes.subarray(offset, offset + count);
        }
        else if (typeof offset !== "undefined") {
            ar = bytes.subarray(offset);
        }
        return Array.from(ar).map((b) => ("0" + b.toString(16)).slice(-2)).join("-");
    }
    exports.toString = toString;
});
