define(["require", "exports", "./Symbol"], function (require, exports, Symbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NonDeclaredType {
        constructor(kind, definition, generics) {
            this.kind = kind;
            this.definition = definition;
            this.generics = generics;
        }
        Equals(other) {
            if (this.kind === other.kind && this.definition === other.definition) {
                return typeof this.generics === "object"
                    ? equalsRecords(this.generics, other.generics)
                    : this.generics === other.generics;
            }
            return false;
        }
    }
    exports.NonDeclaredType = NonDeclaredType;
    exports.Any = new NonDeclaredType("Any");
    exports.Unit = new NonDeclaredType("Unit");
    function Option(t) {
        return new NonDeclaredType("Option", null, [t]);
    }
    exports.Option = Option;
    function FableArray(t, isTypedArray = false) {
        let def = null, genArg = null;
        if (isTypedArray) {
            def = t;
        }
        else {
            genArg = t;
        }
        return new NonDeclaredType("Array", def, [genArg]);
    }
    exports.Array = FableArray;
    function Tuple(types) {
        return new NonDeclaredType("Tuple", null, types);
    }
    exports.Tuple = Tuple;
    function FableFunction(types) {
        return new NonDeclaredType("Function", null, types);
    }
    exports.Function = FableFunction;
    function GenericParam(definition) {
        return new NonDeclaredType("GenericParam", definition);
    }
    exports.GenericParam = GenericParam;
    function Interface(definition) {
        return new NonDeclaredType("Interface", definition);
    }
    exports.Interface = Interface;
    function makeGeneric(typeDef, genArgs) {
        return new NonDeclaredType("GenericType", typeDef, genArgs);
    }
    exports.makeGeneric = makeGeneric;
    function isGeneric(typ) {
        return typ instanceof NonDeclaredType && typ.kind === "GenericType";
    }
    exports.isGeneric = isGeneric;
    function getDefinition(typ) {
        return isGeneric(typ) ? typ.definition : typ;
    }
    exports.getDefinition = getDefinition;
    function extendInfo(cons, info) {
        const parent = Object.getPrototypeOf(cons.prototype);
        if (typeof parent[Symbol_1.default.reflection] === "function") {
            const newInfo = {}, parentInfo = parent[Symbol_1.default.reflection]();
            Object.getOwnPropertyNames(info).forEach(k => {
                const i = info[k];
                if (typeof i === "object") {
                    newInfo[k] = Array.isArray(i)
                        ? (parentInfo[k] || []).concat(i)
                        : Object.assign(parentInfo[k] || {}, i);
                }
                else {
                    newInfo[k] = i;
                }
            });
            return newInfo;
        }
        return info;
    }
    exports.extendInfo = extendInfo;
    function hasInterface(obj, interfaceName) {
        if (interfaceName === "System.Collections.Generic.IEnumerable") {
            return typeof obj[Symbol.iterator] === "function";
        }
        else if (typeof obj[Symbol_1.default.reflection] === "function") {
            const interfaces = obj[Symbol_1.default.reflection]().interfaces;
            return Array.isArray(interfaces) && interfaces.indexOf(interfaceName) > -1;
        }
        return false;
    }
    exports.hasInterface = hasInterface;
    function getPropertyNames(obj) {
        if (obj == null) {
            return [];
        }
        const propertyMap = typeof obj[Symbol_1.default.reflection] === "function" ? obj[Symbol_1.default.reflection]().properties || [] : obj;
        return Object.getOwnPropertyNames(propertyMap);
    }
    exports.getPropertyNames = getPropertyNames;
    function isArray(obj) {
        return Array.isArray(obj) || ArrayBuffer.isView(obj);
    }
    exports.isArray = isArray;
    function toString(obj, quoteStrings = false) {
        function isObject(x) {
            return x !== null && typeof x === "object" && !(x instanceof Number) && !(x instanceof String) && !(x instanceof Boolean);
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
            const info = obj[Symbol_1.default.reflection]();
            const uci = info.cases[obj.tag];
            switch (uci.length) {
                case 1:
                    return uci[0];
                case 2:
                    return uci[0] + " (" + toString(obj.data, true) + ")";
                default:
                    return uci[0] + " (" + obj.data.map((x) => toString(x, true)).join(",") + ")";
            }
        }
        try {
            return JSON.stringify(obj, function (k, v) {
                return v && v[Symbol.iterator] && !Array.isArray(v) && isObject(v) ? Array.from(v)
                    : v && typeof v.ToString === "function" ? toString(v) : v;
            });
        }
        catch (err) {
            return "{" + Object.getOwnPropertyNames(obj).map(k => k + ": " + String(obj[k])).join(", ") + "}";
        }
    }
    exports.toString = toString;
    function hash(x) {
        if (x != null && typeof x.GetHashCode == "function") {
            return x.GetHashCode();
        }
        else {
            let s = JSON.stringify(x);
            let h = 5381, i = 0, len = s.length;
            while (i < len) {
                h = (h * 33) ^ s.charCodeAt(i++);
            }
            return h;
        }
    }
    exports.hash = hash;
    function equals(x, y) {
        if (x === y)
            return true;
        else if (x == null)
            return y == null;
        else if (y == null)
            return false;
        else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y))
            return false;
        else if (typeof x.Equals === "function")
            return x.Equals(y);
        else if (Array.isArray(x)) {
            if (x.length != y.length)
                return false;
            for (let i = 0; i < x.length; i++)
                if (!equals(x[i], y[i]))
                    return false;
            return true;
        }
        else if (ArrayBuffer.isView(x)) {
            if (x.byteLength !== y.byteLength)
                return false;
            const dv1 = new DataView(x.buffer), dv2 = new DataView(y.buffer);
            for (let i = 0; i < x.byteLength; i++)
                if (dv1.getUint8(i) !== dv2.getUint8(i))
                    return false;
            return true;
        }
        else if (x instanceof Date)
            return x.getTime() === y.getTime();
        else
            return false;
    }
    exports.equals = equals;
    function comparePrimitives(x, y) {
        return x === y ? 0 : (x < y ? -1 : 1);
    }
    exports.comparePrimitives = comparePrimitives;
    function compare(x, y) {
        if (x === y)
            return 0;
        if (x == null)
            return y == null ? 0 : -1;
        else if (y == null)
            return 1;
        else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y))
            return -1;
        else if (typeof x.CompareTo === "function")
            return x.CompareTo(y);
        else if (Array.isArray(x)) {
            if (x.length != y.length)
                return x.length < y.length ? -1 : 1;
            for (let i = 0, j = 0; i < x.length; i++)
                if ((j = compare(x[i], y[i])) !== 0)
                    return j;
            return 0;
        }
        else if (ArrayBuffer.isView(x)) {
            if (x.byteLength != y.byteLength)
                return x.byteLength < y.byteLength ? -1 : 1;
            const dv1 = new DataView(x.buffer), dv2 = new DataView(y.buffer);
            for (let i = 0, b1 = 0, b2 = 0; i < x.byteLength; i++) {
                b1 = dv1.getUint8(i), b2 = dv2.getUint8(i);
                if (b1 < b2)
                    return -1;
                if (b1 > b2)
                    return 1;
            }
            return 0;
        }
        else if (x instanceof Date) {
            let xtime = x.getTime(), ytime = y.getTime();
            return xtime === ytime ? 0 : (xtime < ytime ? -1 : 1);
        }
        else if (typeof x === "object") {
            let xhash = hash(x), yhash = hash(y);
            if (xhash === yhash) {
                return equals(x, y) ? 0 : -1;
            }
            else {
                return xhash < yhash ? -1 : 1;
            }
        }
        else
            return x < y ? -1 : 1;
    }
    exports.compare = compare;
    function equalsRecords(x, y) {
        if (x === y) {
            return true;
        }
        else {
            const keys = getPropertyNames(x);
            for (let i = 0; i < keys.length; i++) {
                if (!equals(x[keys[i]], y[keys[i]]))
                    return false;
            }
            return true;
        }
    }
    exports.equalsRecords = equalsRecords;
    function compareRecords(x, y) {
        if (x === y) {
            return 0;
        }
        else {
            const keys = getPropertyNames(x);
            for (let i = 0; i < keys.length; i++) {
                let res = compare(x[keys[i]], y[keys[i]]);
                if (res !== 0)
                    return res;
            }
            return 0;
        }
    }
    exports.compareRecords = compareRecords;
    function equalsUnions(x, y) {
        return x === y || (x.tag === y.tag && equals(x.data, y.data));
    }
    exports.equalsUnions = equalsUnions;
    function compareUnions(x, y) {
        if (x === y) {
            return 0;
        }
        else {
            let res = x.tag < y.tag ? -1 : (x.tag > y.tag ? 1 : 0);
            return res !== 0 ? res : compare(x.data, y.data);
        }
    }
    exports.compareUnions = compareUnions;
    function createDisposable(f) {
        return {
            Dispose: f,
            [Symbol_1.default.reflection]() { return { interfaces: ["System.IDisposable"] }; }
        };
    }
    exports.createDisposable = createDisposable;
    const CaseRules = {
        None: 0,
        LowerFirst: 1,
    };
    function createObj(fields, caseRule = CaseRules.None) {
        const iter = fields[Symbol.iterator]();
        let cur = iter.next(), o = {}, casesCache = null;
        while (!cur.done) {
            let value = cur.value;
            if (Array.isArray(value)) {
                o[value[0]] = value[1];
            }
            else {
                casesCache = casesCache || new Map();
                let proto = Object.getPrototypeOf(value);
                let cases = casesCache.get(proto), caseInfo = null;
                if (cases == null) {
                    if (typeof proto[Symbol_1.default.reflection] === "function") {
                        cases = proto[Symbol_1.default.reflection]().cases;
                        casesCache.set(proto, cases);
                    }
                }
                if (cases != null && Array.isArray(caseInfo = cases[value.tag])) {
                    let key = caseInfo[0];
                    if (caseRule === CaseRules.LowerFirst) {
                        key = key[0].toLowerCase() + key.substr(1);
                    }
                    o[key] = caseInfo.length === 1 ? true : value.data;
                }
                else {
                    throw new Error("Cannot infer key and value of " + value);
                }
            }
            cur = iter.next();
        }
        return o;
    }
    exports.createObj = createObj;
    function toPlainJsObj(source) {
        if (source != null && source.constructor != Object) {
            let target = {};
            let props = Object.getOwnPropertyNames(source);
            for (let i = 0; i < props.length; i++) {
                target[props[i]] = source[props[i]];
            }
            const proto = Object.getPrototypeOf(source);
            if (proto != null) {
                props = Object.getOwnPropertyNames(proto);
                for (let i = 0; i < props.length; i++) {
                    const prop = Object.getOwnPropertyDescriptor(proto, props[i]);
                    if (prop.value) {
                        target[props[i]] = prop.value;
                    }
                    else if (prop.get) {
                        target[props[i]] = prop.get.apply(source);
                    }
                }
            }
            return target;
        }
        else {
            return source;
        }
    }
    exports.toPlainJsObj = toPlainJsObj;
    function round(value, digits = 0) {
        const m = Math.pow(10, digits);
        const n = +(digits ? value * m : value).toFixed(8);
        const i = Math.floor(n), f = n - i;
        const e = 1e-8;
        const r = (f > 0.5 - e && f < 0.5 + e) ? ((i % 2 == 0) ? i : i + 1) : Math.round(n);
        return digits ? r / m : r;
    }
    exports.round = round;
    function randomNext(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    exports.randomNext = randomNext;
    function defaultArg(arg, defaultValue, f) {
        return arg == null ? defaultValue : (f != null ? f(arg) : arg);
    }
    exports.defaultArg = defaultArg;
    function applyOperator(x, y, operator) {
        function getMethod(obj) {
            if (typeof obj === "object") {
                const cons = Object.getPrototypeOf(obj).constructor;
                if (typeof cons[operator] === "function") {
                    return cons[operator];
                }
            }
            return null;
        }
        let meth = getMethod(x);
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
    exports.applyOperator = applyOperator;
    function parseNumber(v) {
        return +v;
    }
    exports.parseNumber = parseNumber;
    function tryParse(v, initial, parser, fn) {
        if (v != null) {
            const a = parser.exec(v);
            if (a !== null) {
                return [true, fn(a[1])];
            }
        }
        return [false, initial];
    }
    exports.tryParse = tryParse;
    function parse(v, initial, parser, fn) {
        const a = tryParse(v, initial, parser, fn);
        if (a[0]) {
            return a[1];
        }
        else {
            throw new Error("Input string was not in a correct format.");
        }
    }
    exports.parse = parse;
});
