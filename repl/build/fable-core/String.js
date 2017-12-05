define(["require", "exports", "./Date", "./Date", "./Date", "./Date", "./Date", "./Date", "./RegExp", "./Util"], function (require, exports, Date_1, Date_2, Date_3, Date_4, Date_5, Date_6, RegExp_1, Util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const fsFormatRegExp = /(^|[^%])%([0+ ]*)(-?\d+)?(?:\.(\d+))?(\w)/;
    const formatRegExp = /\{(\d+)(,-?\d+)?(?:\:(.+?))?\}/g;
    // From https://stackoverflow.com/a/13653180/3922220
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const StringComparison = {
        CurrentCulture: 0,
        CurrentCultureIgnoreCase: 1,
        InvariantCulture: 2,
        InvariantCultureIgnoreCase: 3,
        Ordinal: 4,
        OrdinalIgnoreCase: 5,
    };
    function cmp(x, y, ic) {
        function isIgnoreCase(i) {
            return i === true ||
                i === StringComparison.CurrentCultureIgnoreCase ||
                i === StringComparison.InvariantCultureIgnoreCase ||
                i === StringComparison.OrdinalIgnoreCase;
        }
        function isOrdinal(i) {
            return i === StringComparison.Ordinal ||
                i === StringComparison.OrdinalIgnoreCase;
        }
        if (x == null) {
            return y == null ? 0 : -1;
        }
        if (y == null) {
            return 1;
        } // everything is bigger than null
        if (isOrdinal(ic)) {
            if (isIgnoreCase(ic)) {
                x = x.toLowerCase();
                y = y.toLowerCase();
            }
            return (x === y) ? 0 : (x < y ? -1 : 1);
        }
        else {
            if (isIgnoreCase(ic)) {
                x = x.toLocaleLowerCase();
                y = y.toLocaleLowerCase();
            }
            return x.localeCompare(y);
        }
    }
    function compare(...args) {
        switch (args.length) {
            case 2: return cmp(args[0], args[1], false);
            case 3: return cmp(args[0], args[1], args[2]);
            case 4: return cmp(args[0], args[1], args[2] === true);
            case 5: return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), false);
            case 6: return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5]);
            case 7: return cmp(args[0].substr(args[1], args[4]), args[2].substr(args[3], args[4]), args[5] === true);
            default: throw new Error("String.compare: Unsupported number of parameters");
        }
    }
    exports.compare = compare;
    function compareTo(x, y) {
        return cmp(x, y, false);
    }
    exports.compareTo = compareTo;
    function startsWith(str, pattern, ic) {
        if (str.length >= pattern.length) {
            return cmp(str.substr(0, pattern.length), pattern, ic) === 0;
        }
        return false;
    }
    exports.startsWith = startsWith;
    function indexOfAny(str, anyOf, ...args) {
        if (str == null || str === "") {
            return -1;
        }
        const startIndex = (args.length > 0) ? args[0] : 0;
        if (startIndex < 0) {
            throw new Error("String.indexOfAny: Start index cannot be negative");
        }
        const length = (args.length > 1) ? args[1] : str.length - startIndex;
        if (length < 0) {
            throw new Error("String.indexOfAny: Length cannot be negative");
        }
        if (length > str.length - startIndex) {
            throw new Error("String.indexOfAny: Invalid startIndex and length");
        }
        str = str.substr(startIndex, length);
        for (const c of anyOf) {
            const index = str.indexOf(c);
            if (index > -1) {
                return index + startIndex;
            }
        }
        return -1;
    }
    exports.indexOfAny = indexOfAny;
    function toHex(value) {
        return value < 0
            ? "ff" + (16777215 - (Math.abs(value) - 1)).toString(16)
            : value.toString(16);
    }
    function printf(input, ...args) {
        return {
            input,
            cont: fsFormat(input, ...args),
        };
    }
    exports.printf = printf;
    function toConsole(arg) {
        return arg.cont((x) => { console.log(x); });
    }
    exports.toConsole = toConsole;
    function toText(arg) {
        return arg.cont((x) => x);
    }
    exports.toText = toText;
    function toFail(arg) {
        return arg.cont((x) => { throw new Error(x); });
    }
    exports.toFail = toFail;
    function fsFormat(str, ...args) {
        function formatOnce(str2, rep) {
            return str2.replace(fsFormatRegExp, (_, prefix, flags, pad, precision, format) => {
                switch (format) {
                    case "f":
                    case "F":
                        rep = rep.toFixed(precision || 6);
                        break;
                    case "g":
                    case "G":
                        rep = rep.toPrecision(precision);
                        break;
                    case "e":
                    case "E":
                        rep = rep.toExponential(precision);
                        break;
                    case "O":
                        rep = Util_1.toString(rep);
                        break;
                    case "A":
                        rep = Util_1.toString(rep, true);
                        break;
                    case "x":
                        rep = toHex(Number(rep));
                        break;
                    case "X":
                        rep = toHex(Number(rep)).toUpperCase();
                        break;
                }
                const plusPrefix = flags.indexOf("+") >= 0 && parseInt(rep, 10) >= 0;
                pad = parseInt(pad, 10);
                if (!isNaN(pad)) {
                    const ch = pad >= 0 && flags.indexOf("0") >= 0 ? "0" : " ";
                    rep = padLeft(rep, Math.abs(pad) - (plusPrefix ? 1 : 0), ch, pad < 0);
                }
                const once = prefix + (plusPrefix ? "+" + rep : rep);
                return once.replace(/%/g, "%%");
            });
        }
        if (args.length === 0) {
            return (cont) => {
                if (fsFormatRegExp.test(str)) {
                    return (...args2) => {
                        let strCopy = str;
                        for (const arg of args2) {
                            strCopy = formatOnce(strCopy, arg);
                        }
                        return cont(strCopy.replace(/%%/g, "%"));
                    };
                }
                else {
                    return cont(str);
                }
            };
        }
        else {
            for (const arg of args) {
                str = formatOnce(str, arg);
            }
            return str.replace(/%%/g, "%");
        }
    }
    exports.fsFormat = fsFormat;
    function format(str, ...args) {
        return str.replace(formatRegExp, (match, idx, pad, pattern) => {
            let rep = args[idx];
            let padSymbol = " ";
            if (typeof rep === "number") {
                switch ((pattern || "").substring(0, 1)) {
                    case "f":
                    case "F":
                        rep = pattern.length > 1 ? rep.toFixed(pattern.substring(1)) : rep.toFixed(2);
                        break;
                    case "g":
                    case "G":
                        rep = pattern.length > 1 ? rep.toPrecision(pattern.substring(1)) : rep.toPrecision();
                        break;
                    case "e":
                    case "E":
                        rep = pattern.length > 1 ? rep.toExponential(pattern.substring(1)) : rep.toExponential();
                        break;
                    case "p":
                    case "P":
                        rep = (pattern.length > 1 ? (rep * 100).toFixed(pattern.substring(1)) : (rep * 100).toFixed(2)) + " %";
                        break;
                    case "x":
                        rep = toHex(Number(rep));
                        break;
                    case "X":
                        rep = toHex(Number(rep)).toUpperCase();
                        break;
                    default:
                        const m = /^(0+)(\.0+)?$/.exec(pattern);
                        if (m != null) {
                            let decs = 0;
                            if (m[2] != null) {
                                rep = rep.toFixed(decs = m[2].length - 1);
                            }
                            pad = "," + (m[1].length + (decs ? decs + 1 : 0)).toString();
                            padSymbol = "0";
                        }
                        else if (pattern) {
                            rep = pattern;
                        }
                }
            }
            else if (rep instanceof Date) {
                if (pattern.length === 1) {
                    switch (pattern) {
                        case "D":
                            rep = rep.toDateString();
                            break;
                        case "T":
                            rep = rep.toLocaleTimeString();
                            break;
                        case "d":
                            rep = rep.toLocaleDateString();
                            break;
                        case "t":
                            rep = rep.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
                            break;
                        case "o":
                        case "O":
                            if (rep.kind === 2 /* Local */) {
                                const offset = rep.getTimezoneOffset() * -1;
                                rep = format("{0:yyyy-MM-dd}T{0:HH:mm}:{1:00.000}{2}{3:00}:{4:00}", rep, Date_1.second(rep), offset >= 0 ? "+" : "-", ~~(offset / 60), offset % 60);
                            }
                            else {
                                rep = rep.toISOString();
                            }
                    }
                }
                else {
                    rep = pattern.replace(/(\w)\1*/g, (match2) => {
                        let rep2 = match2;
                        switch (match2.substring(0, 1)) {
                            case "y":
                                rep2 = match2.length < 4 ? Date_6.year(rep) % 100 : Date_6.year(rep);
                                break;
                            case "h":
                                rep2 = rep.getHours() > 12 ? Date_3.hour(rep) % 12 : Date_3.hour(rep);
                                break;
                            case "M":
                                rep2 = Date_5.month(rep);
                                break;
                            case "d":
                                rep2 = Date_4.day(rep);
                                break;
                            case "H":
                                rep2 = Date_3.hour(rep);
                                break;
                            case "m":
                                rep2 = Date_2.minute(rep);
                                break;
                            case "s":
                                rep2 = Date_1.second(rep);
                                break;
                        }
                        if (rep2 !== match2 && rep2 < 10 && match2.length > 1) {
                            rep2 = "0" + rep2;
                        }
                        return rep2;
                    });
                }
            }
            pad = parseInt((pad || "").substring(1), 10);
            if (!isNaN(pad)) {
                rep = padLeft(rep, Math.abs(pad), padSymbol, pad < 0);
            }
            return rep;
        });
    }
    exports.format = format;
    function endsWith(str, search) {
        const idx = str.lastIndexOf(search);
        return idx >= 0 && idx === str.length - search.length;
    }
    exports.endsWith = endsWith;
    function initialize(n, f) {
        if (n < 0) {
            throw new Error("String length must be non-negative");
        }
        const xs = new Array(n);
        for (let i = 0; i < n; i++) {
            xs[i] = f(i);
        }
        return xs.join("");
    }
    exports.initialize = initialize;
    function insert(str, startIndex, value) {
        if (startIndex < 0 || startIndex > str.length) {
            throw new Error("startIndex is negative or greater than the length of this instance.");
        }
        return str.substring(0, startIndex) + value + str.substring(startIndex);
    }
    exports.insert = insert;
    function isNullOrEmpty(str) {
        return typeof str !== "string" || str.length === 0;
    }
    exports.isNullOrEmpty = isNullOrEmpty;
    function isNullOrWhiteSpace(str) {
        return typeof str !== "string" || /^\s*$/.test(str);
    }
    exports.isNullOrWhiteSpace = isNullOrWhiteSpace;
    function join(delimiter, xs) {
        let xs2 = xs;
        const len = arguments.length;
        if (len > 2) {
            xs2 = Array(len - 1);
            for (let key = 1; key < len; key++) {
                xs2[key - 1] = arguments[key];
            }
        }
        else if (!Array.isArray(xs)) {
            xs2 = Array.from(xs);
        }
        return xs2.map((x) => Util_1.toString(x)).join(delimiter);
    }
    exports.join = join;
    /** Validates UUID as specified in RFC4122 (versions 1-5). Trims braces. */
    function validateGuid(str, doNotThrow) {
        const trimmed = trim(str, "both", "{", "}");
        if (guidRegex.test(trimmed)) {
            return doNotThrow ? [true, trimmed] : trimmed;
        }
        else if (doNotThrow) {
            return [false, "00000000-0000-0000-0000-000000000000"];
        }
        throw new Error("Guid should contain 32 digits with 4 dashes: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    }
    exports.validateGuid = validateGuid;
    /* tslint:disable */
    // From https://gist.github.com/LeverOne/1308368
    function newGuid() {
        let b = '';
        for (let a = 0; a++ < 36; b += a * 51 & 52
            ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16)
            : '-')
            ;
        return b;
    }
    exports.newGuid = newGuid;
    // Maps for number <-> hex string conversion
    let _convertMapsInitialized = false;
    let _byteToHex;
    let _hexToByte;
    function initConvertMaps() {
        _byteToHex = new Array(256);
        _hexToByte = {};
        for (var i = 0; i < 256; i++) {
            _byteToHex[i] = (i + 0x100).toString(16).substr(1);
            _hexToByte[_byteToHex[i]] = i;
        }
        _convertMapsInitialized = true;
    }
    /** Parse a UUID into it's component bytes */
    // Adapted from https://github.com/zefferus/uuid-parse
    function guidToArray(s) {
        if (!_convertMapsInitialized) {
            initConvertMaps();
        }
        let i = 0;
        const buf = new Uint8Array(16);
        s.toLowerCase().replace(/[0-9a-f]{2}/g, (function (oct) {
            switch (i) {
                // .NET saves first three byte groups with differten endianness
                // See https://stackoverflow.com/a/16722909/3922220
                case 0:
                case 1:
                case 2:
                case 3:
                    buf[3 - i++] = _hexToByte[oct];
                    break;
                case 4:
                case 5:
                    buf[9 - i++] = _hexToByte[oct];
                    break;
                case 6:
                case 7:
                    buf[13 - i++] = _hexToByte[oct];
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                    buf[i++] = _hexToByte[oct];
                    break;
            }
        }));
        // Zero out remaining bytes if string was short
        while (i < 16) {
            buf[i++] = 0;
        }
        return buf;
    }
    exports.guidToArray = guidToArray;
    /** Convert UUID byte array into a string */
    function arrayToGuid(buf) {
        if (buf.length !== 16) {
            throw new Error("Byte array for GUID must be exactly 16 bytes long");
        }
        if (!_convertMapsInitialized) {
            initConvertMaps();
        }
        return _byteToHex[buf[3]] + _byteToHex[buf[2]] +
            _byteToHex[buf[1]] + _byteToHex[buf[0]] + '-' +
            _byteToHex[buf[5]] + _byteToHex[buf[4]] + '-' +
            _byteToHex[buf[7]] + _byteToHex[buf[6]] + '-' +
            _byteToHex[buf[8]] + _byteToHex[buf[9]] + '-' +
            _byteToHex[buf[10]] + _byteToHex[buf[11]] +
            _byteToHex[buf[12]] + _byteToHex[buf[13]] +
            _byteToHex[buf[14]] + _byteToHex[buf[15]];
    }
    exports.arrayToGuid = arrayToGuid;
    /* tslint:enable */
    function toBase64String(inArray) {
        let str = "";
        for (let i = 0; i < inArray.length; i++) {
            str += String.fromCharCode(inArray[i]);
        }
        return typeof btoa === "function"
            ? btoa(str) : new Buffer(str).toString("base64");
    }
    exports.toBase64String = toBase64String;
    function fromBase64String(b64Encoded) {
        const binary = typeof atob === "function"
            ? atob(b64Encoded) : new Buffer(b64Encoded, "base64").toString();
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }
    exports.fromBase64String = fromBase64String;
    function padLeft(str, len, ch, isRight) {
        ch = ch || " ";
        str = String(str);
        len = len - str.length;
        for (let i = 0; i < len; i++) {
            str = isRight ? str + ch : ch + str;
        }
        return str;
    }
    exports.padLeft = padLeft;
    function padRight(str, len, ch) {
        return padLeft(str, len, ch, true);
    }
    exports.padRight = padRight;
    function remove(str, startIndex, count) {
        if (startIndex >= str.length) {
            throw new Error("startIndex must be less than length of string");
        }
        if (typeof count === "number" && (startIndex + count) > str.length) {
            throw new Error("Index and count must refer to a location within the string.");
        }
        return str.slice(0, startIndex) + (typeof count === "number" ? str.substr(startIndex + count) : "");
    }
    exports.remove = remove;
    function replace(str, search, replace) {
        return str.replace(new RegExp(RegExp_1.escape(search), "g"), replace);
    }
    exports.replace = replace;
    function replicate(n, x) {
        return initialize(n, () => x);
    }
    exports.replicate = replicate;
    function getCharAtIndex(input, index) {
        if (index < 0 || index > input.length) {
            throw new Error("System.IndexOutOfRangeException: Index was outside the bounds of the array.");
        }
        return input[index];
    }
    exports.getCharAtIndex = getCharAtIndex;
    function split(str, splitters, count, removeEmpty) {
        count = typeof count === "number" ? count : null;
        removeEmpty = typeof removeEmpty === "number" ? removeEmpty : null;
        if (count < 0) {
            throw new Error("Count cannot be less than zero");
        }
        if (count === 0) {
            return [];
        }
        let splitters2 = splitters;
        if (!Array.isArray(splitters)) {
            const len = arguments.length;
            splitters2 = Array(len - 1);
            for (let key = 1; key < len; key++) {
                splitters2[key - 1] = arguments[key];
            }
        }
        splitters2 = splitters2.map((x) => RegExp_1.escape(x));
        splitters2 = splitters2.length > 0 ? splitters2 : [" "];
        let i = 0;
        const splits = [];
        const reg = new RegExp(splitters2.join("|"), "g");
        while (count == null || count > 1) {
            const m = reg.exec(str);
            if (m === null) {
                break;
            }
            if (!removeEmpty || (m.index - i) > 0) {
                count = count != null ? count - 1 : count;
                splits.push(str.substring(i, m.index));
            }
            i = reg.lastIndex;
        }
        if (!removeEmpty || (str.length - i) > 0) {
            splits.push(str.substring(i));
        }
        return splits;
    }
    exports.split = split;
    function trim(str, side, ...chars) {
        if (side === "both" && chars.length === 0) {
            return str.trim();
        }
        if (side === "start" || side === "both") {
            const reg = chars.length === 0 ? /^\s+/ : new RegExp("^[" + RegExp_1.escape(chars.join("")) + "]+");
            str = str.replace(reg, "");
        }
        if (side === "end" || side === "both") {
            const reg = chars.length === 0 ? /\s+$/ : new RegExp("[" + RegExp_1.escape(chars.join("")) + "]+$");
            str = str.replace(reg, "");
        }
        return str;
    }
    exports.trim = trim;
    function filter(pred, x) {
        return x.split("").filter(pred).join("");
    }
    exports.filter = filter;
});
