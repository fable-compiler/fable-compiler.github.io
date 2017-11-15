define(["require", "exports", "./Date"], function (require, exports, Date_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function DateTimeOffset(value, offset) {
        const d = new Date(value);
        d.offset = offset != null ? offset : new Date().getTimezoneOffset() * -60000;
        return d;
    }
    exports.default = DateTimeOffset;
    function fromDate(date, offset) {
        const isUtc = date.kind === 1 /* UTC */;
        const offset2 = isUtc ? 0 : date.getTimezoneOffset() * -60000;
        if (offset != null && offset !== offset2) {
            throw new Error(isUtc
                ? "The UTC Offset for Utc DateTime instances must be 0."
                : "The UTC Offset of the local dateTime parameter does not match the offset argument.");
        }
        return DateTimeOffset(date.getTime(), offset2);
    }
    exports.fromDate = fromDate;
    function minValue() {
        // This is "0001-01-01T00:00:00.000Z", actual JS min value is -8640000000000000
        return DateTimeOffset(-62135596800000, 0);
    }
    exports.minValue = minValue;
    function maxValue() {
        // This is "9999-12-31T23:59:59.999Z", actual JS max value is 8640000000000000
        return DateTimeOffset(253402300799999, 0);
    }
    exports.maxValue = maxValue;
    function parse(str) {
        const date = Date_1.parseRaw(str);
        const offsetMatch = Date_1.offsetRegex.exec(str);
        const offset = offsetMatch == null
            ? date.getTimezoneOffset() * -60000
            : (offsetMatch[0] === "Z"
                ? 0
                : parseInt(offsetMatch[1], 10) * 3600000
                    + parseInt(offsetMatch[2], 10) * 60000);
        return DateTimeOffset(date.getTime(), offset);
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
    function create(year, month, day, h, m, s, ms, offset) {
        if (offset == null) {
            offset = ms;
            ms = 0;
        }
        if (offset !== 0) {
            if (offset % 60000 !== 0) {
                throw new Error("Offset must be specified in whole minutes");
            }
            if (~~(offset / 3600000) > 14) {
                throw new Error("Offset must be within plus or minus 14 hour");
            }
        }
        let date;
        if (offset === 0) {
            date = new Date(Date.UTC(year, month - 1, day, h, m, s, ms));
            if (year <= 99) {
                date.setFullYear(year, month - 1, day);
            }
        }
        else {
            const str = Date_1.padWithZeros(year, 4) + "-" +
                Date_1.padWithZeros(month, 2) + "-" +
                Date_1.padWithZeros(day, 2) + "T" +
                Date_1.padWithZeros(h, 2) + ":" +
                Date_1.padWithZeros(m, 2) + ":" +
                Date_1.padWithZeros(s, 2) + "." +
                Date_1.padWithZeros(ms, 3) +
                Date_1.offsetToString(offset);
            date = new Date(str);
        }
        const dateValue = date.getTime();
        if (isNaN(dateValue)) {
            throw new Error("The parameters describe an unrepresentable Date");
        }
        return DateTimeOffset(dateValue, offset);
    }
    exports.create = create;
    function now() {
        const date = new Date();
        return DateTimeOffset(date.getTime(), date.getTimezoneOffset() * -60000);
    }
    exports.now = now;
    function utcNow() {
        return DateTimeOffset(Date.now(), 0);
    }
    exports.utcNow = utcNow;
    function toUniversalTime(date) {
        return DateTimeOffset(date.getTime(), 0);
    }
    exports.toUniversalTime = toUniversalTime;
    function toLocalTime(date) {
        return DateTimeOffset(date.getTime(), date.getTimezoneOffset() * -60000);
    }
    exports.toLocalTime = toLocalTime;
    function timeOfDay(d) {
        const d2 = new Date(d.getTime() + d.offset);
        return d2.getUTCHours() * 3600000
            + d2.getUTCMinutes() * 60000
            + d2.getUTCSeconds() * 1000
            + d2.getUTCMilliseconds();
    }
    exports.timeOfDay = timeOfDay;
    function date(d) {
        const d2 = new Date(d.getTime() + d.offset);
        return Date_1.create(d2.getUTCFullYear(), d2.getUTCMonth() + 1, d2.getUTCDate(), 0, 0, 0, 0);
    }
    exports.date = date;
    function day(d) {
        return new Date(d.getTime() + d.offset).getUTCDate();
    }
    exports.day = day;
    function hour(d) {
        return new Date(d.getTime() + d.offset).getUTCHours();
    }
    exports.hour = hour;
    function millisecond(d) {
        return new Date(d.getTime() + d.offset).getUTCMilliseconds();
    }
    exports.millisecond = millisecond;
    function minute(d) {
        return new Date(d.getTime() + d.offset).getUTCMinutes();
    }
    exports.minute = minute;
    function month(d) {
        return new Date(d.getTime() + d.offset).getUTCMonth() + 1;
    }
    exports.month = month;
    function second(d) {
        return new Date(d.getTime() + d.offset).getUTCSeconds();
    }
    exports.second = second;
    function year(d) {
        return new Date(d.getTime() + d.offset).getUTCFullYear();
    }
    exports.year = year;
    function dayOfWeek(d) {
        return new Date(d.getTime() + d.offset).getUTCDay();
    }
    exports.dayOfWeek = dayOfWeek;
    function dayOfYear(d) {
        const d2 = new Date(d.getTime() + d.offset);
        const _year = d2.getUTCFullYear();
        const _month = d2.getUTCMonth() + 1;
        let _day = d2.getUTCDate();
        for (let i = 1; i < _month; i++) {
            _day += Date_1.daysInMonth(_year, i);
        }
        return _day;
    }
    exports.dayOfYear = dayOfYear;
    function add(d, ts) {
        return DateTimeOffset(d.getTime() + ts, d.offset);
    }
    exports.add = add;
    function addDays(d, v) {
        return DateTimeOffset(d.getTime() + v * 86400000, d.offset);
    }
    exports.addDays = addDays;
    function addHours(d, v) {
        return DateTimeOffset(d.getTime() + v * 3600000, d.offset);
    }
    exports.addHours = addHours;
    function addMinutes(d, v) {
        return DateTimeOffset(d.getTime() + v * 60000, d.offset);
    }
    exports.addMinutes = addMinutes;
    function addSeconds(d, v) {
        return DateTimeOffset(d.getTime() + v * 1000, d.offset);
    }
    exports.addSeconds = addSeconds;
    function addMilliseconds(d, v) {
        return DateTimeOffset(d.getTime() + v, d.offset);
    }
    exports.addMilliseconds = addMilliseconds;
    function addYears(d, v) {
        const newMonth = d.getUTCMonth() + 1;
        const newYear = d.getUTCFullYear() + v;
        const _daysInMonth = Date_1.daysInMonth(newYear, newMonth);
        const newDay = Math.min(_daysInMonth, d.getUTCDate());
        return create(newYear, newMonth, newDay, d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds(), d.offset);
    }
    exports.addYears = addYears;
    function addMonths(d, v) {
        const d2 = new Date(d.getTime() + d.offset);
        let newMonth = d2.getUTCMonth() + 1 + v;
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
        const newYear = d2.getUTCFullYear() + yearOffset;
        const _daysInMonth = Date_1.daysInMonth(newYear, newMonth);
        const newDay = Math.min(_daysInMonth, d2.getUTCDate());
        return create(newYear, newMonth, newDay, d2.getUTCHours(), d2.getUTCMinutes(), d2.getUTCSeconds(), d2.getUTCMilliseconds(), d.offset);
    }
    exports.addMonths = addMonths;
    function subtract(d, that) {
        return typeof that === "number"
            ? DateTimeOffset(d.getTime() - that, d.offset)
            : d.getTime() - that.getTime();
    }
    exports.subtract = subtract;
    function equals(d1, d2) {
        return d1.getTime() === d2.getTime();
    }
    exports.equals = equals;
    function equalsExact(d1, d2) {
        return d1.getTime() === d2.getTime() && d1.offset === d2.offset;
    }
    exports.equalsExact = equalsExact;
    function compare(d1, d2) {
        return Date_1.compare(d1, d2);
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
});
