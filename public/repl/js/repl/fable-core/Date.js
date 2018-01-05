(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.offsetRegex = /(?:Z|[+-](\d{2}):?(\d{2})?)$/;
    function padWithZeros(i, length) {
        let str = i.toString(10);
        while (str.length < length) {
            str = "0" + str;
        }
        return str;
    }
    exports.padWithZeros = padWithZeros;
    function offsetToString(offset) {
        const isMinus = offset < 0;
        offset = Math.abs(offset);
        const hours = ~~(offset / 3600000);
        const minutes = (offset % 3600000) / 60000;
        return (isMinus ? "-" : "+") +
            padWithZeros(hours, 2) + ":" +
            padWithZeros(minutes, 2);
    }
    exports.offsetToString = offsetToString;
    function toHalfUTCString(date, half) {
        const str = date.toISOString();
        return half === "first"
            ? str.substring(0, str.indexOf("T"))
            : str.substring(str.indexOf("T") + 1, str.length - 1);
    }
    exports.toHalfUTCString = toHalfUTCString;
    function toISOString(d, utc) {
        if (utc) {
            return d.toISOString();
        }
        else {
            // JS Date is always local
            const printOffset = d.kind == null ? true : d.kind === 2 /* Local */;
            return padWithZeros(d.getFullYear(), 4) + "-" +
                padWithZeros(d.getMonth() + 1, 2) + "-" +
                padWithZeros(d.getDate(), 2) + "T" +
                padWithZeros(d.getHours(), 2) + ":" +
                padWithZeros(d.getMinutes(), 2) + ":" +
                padWithZeros(d.getSeconds(), 2) + "." +
                padWithZeros(d.getMilliseconds(), 3) +
                (printOffset ? offsetToString(d.getTimezoneOffset() * -60000) : "");
        }
    }
    function toISOStringWithOffset(dateWithOffset, offset) {
        const str = dateWithOffset.toISOString();
        return str.substring(0, str.length - 1) + offsetToString(offset);
    }
    function toStringWithCustomFormat(date, format, utc) {
        return format.replace(/(\w)\1*/g, (match) => {
            let rep = match;
            switch (match.substring(0, 1)) {
                case "y":
                    const y = utc ? date.getUTCFullYear() : date.getFullYear();
                    rep = match.length < 4 ? y % 100 : y;
                    break;
                case "M":
                    rep = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
                    break;
                case "d":
                    rep = utc ? date.getUTCDate() : date.getDate();
                    break;
                case "H":
                    rep = utc ? date.getUTCHours() : date.getHours();
                    break;
                case "h":
                    const h = utc ? date.getUTCHours() : date.getHours();
                    rep = h > 12 ? h % 12 : h;
                    break;
                case "m":
                    rep = utc ? date.getUTCMinutes() : date.getMinutes();
                    break;
                case "s":
                    rep = utc ? date.getUTCSeconds() : date.getSeconds();
                    break;
            }
            if (rep !== match && rep < 10 && match.length > 1) {
                rep = "0" + rep;
            }
            return rep;
        });
    }
    function toStringWithOffset(date, format) {
        const d = new Date(date.getTime() + date.offset);
        if (!format) {
            return d.toISOString().replace(/\.\d+/, "").replace(/[A-Z]|\.\d+/g, " ") + offsetToString(date.offset);
        }
        else if (format.length === 1) {
            switch (format) {
                case "D":
                case "d": return toHalfUTCString(d, "first");
                case "T":
                case "t": return toHalfUTCString(d, "second");
                case "O":
                case "o": return toISOStringWithOffset(d, date.offset);
                default: throw new Error("Unrecognized Date print format");
            }
        }
        else {
            return toStringWithCustomFormat(d, format, true);
        }
    }
    exports.toStringWithOffset = toStringWithOffset;
    function toStringWithKind(date, format) {
        const utc = date.kind === 1 /* UTC */;
        if (!format) {
            return utc ? date.toUTCString() : date.toLocaleString();
        }
        else if (format.length === 1) {
            switch (format) {
                case "D":
                case "d":
                    return utc ? toHalfUTCString(date, "first") : date.toLocaleDateString();
                case "T":
                case "t":
                    return utc ? toHalfUTCString(date, "second") : date.toLocaleTimeString();
                case "O":
                case "o":
                    return toISOString(date, utc);
                default:
                    throw new Error("Unrecognized Date print format");
            }
        }
        else {
            return toStringWithCustomFormat(date, format, utc);
        }
    }
    exports.toStringWithKind = toStringWithKind;
    function toString(date, format) {
        return date.offset != null
            ? toStringWithOffset(date, format)
            : toStringWithKind(date, format);
    }
    exports.toString = toString;
    function DateTime(value, kind) {
        kind = kind == null ? 0 /* Unspecified */ : kind;
        const d = new Date(value);
        d.kind = kind | 0;
        return d;
    }
    exports.default = DateTime;
    function minValue() {
        // This is "0001-01-01T00:00:00.000Z", actual JS min value is -8640000000000000
        return DateTime(-62135596800000, 0 /* Unspecified */);
    }
    exports.minValue = minValue;
    function maxValue() {
        // This is "9999-12-31T23:59:59.999Z", actual JS max value is 8640000000000000
        return DateTime(253402300799999, 0 /* Unspecified */);
    }
    exports.maxValue = maxValue;
    function parseRaw(str) {
        let date = new Date(str);
        if (isNaN(date.getTime())) {
            // Check if this is a time-only string, which JS Date parsing cannot handle (see #1045)
            if (/^(?:[01]?\d|2[0-3]):(?:[0-5]?\d)(?::[0-5]?\d(?:\.\d+)?)?(?:\s*[AaPp][Mm])?$/.test(str)) {
                const d = new Date();
                date = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + str);
            }
            else {
                throw new Error("The string is not a valid Date.");
            }
        }
        return date;
    }
    exports.parseRaw = parseRaw;
    function parse(str, detectUTC = false) {
        const date = parseRaw(str);
        const offset = exports.offsetRegex.exec(str);
        // .NET always parses DateTime as Local if there's offset info (even "Z")
        // Newtonsoft.Json uses UTC if the offset is "Z"
        const kind = offset != null
            ? (detectUTC && offset[0] === "Z" ? 1 /* UTC */ : 2 /* Local */)
            : 0 /* Unspecified */;
        return DateTime(date.getTime(), kind);
    }
    exports.parse = parse;
    function tryParse(v) {
        try {
            return [true, parse(v)];
        }
        catch (_err) {
            return [false, minValue()];
        }
    }
    exports.tryParse = tryParse;
    function offset(date) {
        const date1 = date;
        return typeof date1.offset === "number"
            ? date1.offset
            : (date.kind === 1 /* UTC */
                ? 0 : date.getTimezoneOffset() * -60000);
    }
    exports.offset = offset;
    function create(year, month, day, h = 0, m = 0, s = 0, ms = 0, kind) {
        const dateValue = kind === 1 /* UTC */
            ? Date.UTC(year, month - 1, day, h, m, s, ms)
            : new Date(year, month - 1, day, h, m, s, ms).getTime();
        if (isNaN(dateValue)) {
            throw new Error("The parameters describe an unrepresentable Date.");
        }
        const date = DateTime(dateValue, kind);
        if (year <= 99) {
            date.setFullYear(year, month - 1, day);
        }
        return date;
    }
    exports.create = create;
    function now() {
        return DateTime(Date.now(), 2 /* Local */);
    }
    exports.now = now;
    function utcNow() {
        return DateTime(Date.now(), 1 /* UTC */);
    }
    exports.utcNow = utcNow;
    function today() {
        return date(now());
    }
    exports.today = today;
    function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    exports.isLeapYear = isLeapYear;
    function daysInMonth(year, month) {
        return month === 2
            ? (isLeapYear(year) ? 29 : 28)
            : (month >= 8 ? (month % 2 === 0 ? 31 : 30) : (month % 2 === 0 ? 30 : 31));
    }
    exports.daysInMonth = daysInMonth;
    function toUniversalTime(date) {
        return date.kind === 1 /* UTC */ ? date : DateTime(date.getTime(), 1 /* UTC */);
    }
    exports.toUniversalTime = toUniversalTime;
    function toLocalTime(date) {
        return date.kind === 2 /* Local */ ? date : DateTime(date.getTime(), 2 /* Local */);
    }
    exports.toLocalTime = toLocalTime;
    function timeOfDay(d) {
        return hour(d) * 3600000
            + minute(d) * 60000
            + second(d) * 1000
            + millisecond(d);
    }
    exports.timeOfDay = timeOfDay;
    function date(d) {
        return create(year(d), month(d), day(d), 0, 0, 0, 0, d.kind);
    }
    exports.date = date;
    function day(d) {
        return d.kind === 1 /* UTC */ ? d.getUTCDate() : d.getDate();
    }
    exports.day = day;
    function hour(d) {
        return d.kind === 1 /* UTC */ ? d.getUTCHours() : d.getHours();
    }
    exports.hour = hour;
    function millisecond(d) {
        return d.kind === 1 /* UTC */ ? d.getUTCMilliseconds() : d.getMilliseconds();
    }
    exports.millisecond = millisecond;
    function minute(d) {
        return d.kind === 1 /* UTC */ ? d.getUTCMinutes() : d.getMinutes();
    }
    exports.minute = minute;
    function month(d) {
        return (d.kind === 1 /* UTC */ ? d.getUTCMonth() : d.getMonth()) + 1;
    }
    exports.month = month;
    function second(d) {
        return d.kind === 1 /* UTC */ ? d.getUTCSeconds() : d.getSeconds();
    }
    exports.second = second;
    function year(d) {
        return d.kind === 1 /* UTC */ ? d.getUTCFullYear() : d.getFullYear();
    }
    exports.year = year;
    function dayOfWeek(d) {
        return d.kind === 1 /* UTC */ ? d.getUTCDay() : d.getDay();
    }
    exports.dayOfWeek = dayOfWeek;
    function dayOfYear(d) {
        const _year = year(d);
        const _month = month(d);
        let _day = day(d);
        for (let i = 1; i < _month; i++) {
            _day += daysInMonth(_year, i);
        }
        return _day;
    }
    exports.dayOfYear = dayOfYear;
    function add(d, ts) {
        return DateTime(d.getTime() + ts, d.kind);
    }
    exports.add = add;
    function addDays(d, v) {
        return DateTime(d.getTime() + v * 86400000, d.kind);
    }
    exports.addDays = addDays;
    function addHours(d, v) {
        return DateTime(d.getTime() + v * 3600000, d.kind);
    }
    exports.addHours = addHours;
    function addMinutes(d, v) {
        return DateTime(d.getTime() + v * 60000, d.kind);
    }
    exports.addMinutes = addMinutes;
    function addSeconds(d, v) {
        return DateTime(d.getTime() + v * 1000, d.kind);
    }
    exports.addSeconds = addSeconds;
    function addMilliseconds(d, v) {
        return DateTime(d.getTime() + v, d.kind);
    }
    exports.addMilliseconds = addMilliseconds;
    function addYears(d, v) {
        const newMonth = month(d);
        const newYear = year(d) + v;
        const _daysInMonth = daysInMonth(newYear, newMonth);
        const newDay = Math.min(_daysInMonth, day(d));
        return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
    }
    exports.addYears = addYears;
    function addMonths(d, v) {
        let newMonth = month(d) + v;
        let newMonth_ = 0;
        let yearOffset = 0;
        if (newMonth > 12) {
            newMonth_ = newMonth % 12;
            yearOffset = Math.floor(newMonth / 12);
            newMonth = newMonth_;
        }
        else if (newMonth < 1) {
            newMonth_ = 12 + newMonth % 12;
            yearOffset = Math.floor(newMonth / 12) + (newMonth_ === 12 ? -1 : 0);
            newMonth = newMonth_;
        }
        const newYear = year(d) + yearOffset;
        const _daysInMonth = daysInMonth(newYear, newMonth);
        const newDay = Math.min(_daysInMonth, day(d));
        return create(newYear, newMonth, newDay, hour(d), minute(d), second(d), millisecond(d), d.kind);
    }
    exports.addMonths = addMonths;
    function subtract(d, that) {
        return typeof that === "number"
            ? DateTime(d.getTime() - that, d.kind)
            : d.getTime() - that.getTime();
    }
    exports.subtract = subtract;
    function toLongDateString(d) {
        return d.toDateString();
    }
    exports.toLongDateString = toLongDateString;
    function toShortDateString(d) {
        return d.toLocaleDateString();
    }
    exports.toShortDateString = toShortDateString;
    function toLongTimeString(d) {
        return d.toLocaleTimeString();
    }
    exports.toLongTimeString = toLongTimeString;
    function toShortTimeString(d) {
        return d.toLocaleTimeString().replace(/:\d\d(?!:)/, "");
    }
    exports.toShortTimeString = toShortTimeString;
    function equals(d1, d2) {
        return d1.getTime() === d2.getTime();
    }
    exports.equals = equals;
    function compare(x, y) {
        const xtime = x.getTime();
        const ytime = y.getTime();
        return xtime === ytime ? 0 : (xtime < ytime ? -1 : 1);
    }
    exports.compare = compare;
    exports.compareTo = compare;
    function op_Addition(x, y) {
        return add(x, y);
    }
    exports.op_Addition = op_Addition;
    function op_Subtraction(x, y) {
        return subtract(x, y);
    }
    exports.op_Subtraction = op_Subtraction;
    function isDaylightSavingTime(x) {
        const jan = new Date(x.getFullYear(), 0, 1);
        const jul = new Date(x.getFullYear(), 6, 1);
        return isDST(jan.getTimezoneOffset(), jul.getTimezoneOffset(), x.getTimezoneOffset());
    }
    exports.isDaylightSavingTime = isDaylightSavingTime;
    function isDST(janOffset, julOffset, tOffset) {
        return Math.min(janOffset, julOffset) === tOffset;
    }
});
