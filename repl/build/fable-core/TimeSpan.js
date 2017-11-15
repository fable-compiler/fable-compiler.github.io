define(["require", "exports", "./Long", "./Util"], function (require, exports, Long_1, Util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // TimeSpan in runtime just becomes a number representing milliseconds
    function create(d = 0, h = 0, m = 0, s = 0, ms = 0) {
        switch (arguments.length) {
            case 1:
                // ticks
                return fromTicks(arguments[0]);
            case 3:
                // h,m,s
                d = 0, h = arguments[0], m = arguments[1], s = arguments[2], ms = 0;
                break;
            default:
                // d,h,m,s,ms
                break;
        }
        return d * 86400000 + h * 3600000 + m * 60000 + s * 1000 + ms;
    }
    exports.create = create;
    function fromTicks(ticks) {
        return ticks.div(10000).toNumber();
    }
    exports.fromTicks = fromTicks;
    function fromDays(d) {
        return create(d, 0, 0, 0);
    }
    exports.fromDays = fromDays;
    function fromHours(h) {
        return create(h, 0, 0);
    }
    exports.fromHours = fromHours;
    function fromMinutes(m) {
        return create(0, m, 0);
    }
    exports.fromMinutes = fromMinutes;
    function fromSeconds(s) {
        return create(0, 0, s);
    }
    exports.fromSeconds = fromSeconds;
    function days(ts) {
        return Math.floor(ts / 86400000);
    }
    exports.days = days;
    function hours(ts) {
        return Math.floor(ts % 86400000 / 3600000);
    }
    exports.hours = hours;
    function minutes(ts) {
        return Math.floor(ts % 3600000 / 60000);
    }
    exports.minutes = minutes;
    function seconds(ts) {
        return Math.floor(ts % 60000 / 1000);
    }
    exports.seconds = seconds;
    function milliseconds(ts) {
        return Math.floor(ts % 1000);
    }
    exports.milliseconds = milliseconds;
    function ticks(ts) {
        return Long_1.fromNumber(ts).mul(10000);
    }
    exports.ticks = ticks;
    function totalDays(ts) {
        return ts / 86400000;
    }
    exports.totalDays = totalDays;
    function totalHours(ts) {
        return ts / 3600000;
    }
    exports.totalHours = totalHours;
    function totalMinutes(ts) {
        return ts / 60000;
    }
    exports.totalMinutes = totalMinutes;
    function totalSeconds(ts) {
        return ts / 1000;
    }
    exports.totalSeconds = totalSeconds;
    function negate(ts) {
        return ts * -1;
    }
    exports.negate = negate;
    function add(ts1, ts2) {
        return ts1 + ts2;
    }
    exports.add = add;
    function subtract(ts1, ts2) {
        return ts1 - ts2;
    }
    exports.subtract = subtract;
    function compare(x, y) {
        return Util_1.compare(x, y);
    }
    exports.compare = compare;
    function compareTo(x, y) {
        return Util_1.compare(x, y);
    }
    exports.compareTo = compareTo;
    function duration(x) {
        return Math.abs(x);
    }
    exports.duration = duration;
});
