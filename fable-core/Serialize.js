define(["require", "exports", "./Symbol", "./Symbol", "./List", "./List", "./Set", "./Map", "./Map", "./Set", "./Util", "./Seq", "./Reflection", "./Date", "./String"], function (require, exports, Symbol_1, Symbol_2, List_1, List_2, Set_1, Map_1, Map_2, Set_2, Util_1, Seq_1, Reflection_1, Date_1, String_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function deflate(v) {
        if (ArrayBuffer.isView(v)) {
            return Array.from(v);
        }
        else if (v != null && typeof v === "object") {
            if (v instanceof List_1.default || v instanceof Set_1.default || v instanceof Set) {
                return Array.from(v);
            }
            else if (v instanceof Map_1.default || v instanceof Map) {
                let stringKeys = null;
                return Seq_1.fold((o, kv) => {
                    if (stringKeys === null) {
                        stringKeys = typeof kv[0] === "string";
                    }
                    o[stringKeys ? kv[0] : toJson(kv[0])] = kv[1];
                    return o;
                }, {}, v);
            }
            const reflectionInfo = typeof v[Symbol_1.default.reflection] === "function" ? v[Symbol_1.default.reflection]() : {};
            if (reflectionInfo.properties) {
                return Seq_1.fold((o, prop) => {
                    return o[prop] = v[prop], o;
                }, {}, Object.getOwnPropertyNames(reflectionInfo.properties));
            }
            else if (reflectionInfo.cases) {
                const caseInfo = reflectionInfo.cases[v.tag], caseName = caseInfo[0], fieldsLength = caseInfo.length - 1;
                if (fieldsLength === 0) {
                    return caseName;
                }
                else {
                    return { [caseName]: (v.data !== void 0 ? v.data : null) };
                }
            }
        }
        return v;
    }
    exports.deflate = deflate;
    function toJson(o) {
        return JSON.stringify(o, (k, v) => deflate(v));
    }
    exports.toJson = toJson;
    function combine(path1, path2) {
        return typeof path2 === "number"
            ? path1 + "[" + path2 + "]"
            : (path1 ? path1 + "." : "") + path2;
    }
    function isNullable(typ) {
        if (typeof typ === "string") {
            return typ !== "boolean" && typ !== "number";
        }
        else if (typ instanceof Util_1.NonDeclaredType) {
            return typ.kind !== "Array" && typ.kind !== "Tuple";
        }
        else {
            const info = typeof typ.prototype[Symbol_1.default.reflection] === "function"
                ? typ.prototype[Symbol_1.default.reflection]() : null;
            return info ? info.nullable : true;
        }
    }
    function invalidate(val, typ, path) {
        throw new Error(`${String_1.fsFormat("%A", val)} ${path ? "(" + path + ")" : ""} is not of type ${Reflection_1.getTypeFullName(typ)}`);
    }
    function needsInflate(enclosing) {
        const typ = enclosing.head;
        if (typeof typ === "string") {
            return false;
        }
        if (typ instanceof Util_1.NonDeclaredType) {
            switch (typ.kind) {
                case "Option":
                case "Array":
                    return typ.definition != null || needsInflate(new List_1.default(typ.generics[0], enclosing));
                case "Tuple":
                    return typ.generics.some(x => needsInflate(new List_1.default(x, enclosing)));
                case "Function":
                    return false;
                case "GenericParam":
                    return needsInflate(Reflection_1.resolveGeneric(typ.definition, enclosing.tail));
                case "GenericType":
                    return true;
                default:
                    return false;
            }
        }
        return true;
    }
    function inflateArray(arr, enclosing, path) {
        if (!Array.isArray) {
            invalidate(arr, "array", path);
        }
        return needsInflate(enclosing)
            ? arr.map((x, i) => inflate(x, enclosing, combine(path, i)))
            : arr;
    }
    function inflateMap(obj, keyEnclosing, valEnclosing, path) {
        const inflateKey = keyEnclosing.head !== "string";
        const inflateVal = needsInflate(valEnclosing);
        return Object
            .getOwnPropertyNames(obj)
            .map(k => {
            const key = inflateKey ? inflate(JSON.parse(k), keyEnclosing, combine(path, k)) : k;
            const val = inflateVal ? inflate(obj[k], valEnclosing, combine(path, k)) : obj[k];
            return [key, val];
        });
    }
    function inflateList(val, enclosing, path) {
        let ar = [], li = new List_1.default(), cur = val, inf = needsInflate(enclosing);
        while (cur.tail != null) {
            ar.push(inf ? inflate(cur.head, enclosing, path) : cur.head);
            cur = cur.tail;
        }
        ar.reverse();
        for (let i = 0; i < ar.length; i++) {
            li = new List_1.default(ar[i], li);
        }
        return li;
    }
    function inflateUnion(val, typ, info, path, inflateField) {
        let caseName;
        if (typeof val.tag === "number") {
            return Object.assign(new typ(), val);
        }
        else if (typeof val === "string") {
            caseName = val;
        }
        else {
            caseName = Object.getOwnPropertyNames(val)[0];
        }
        let tag = -1, i = -1;
        while (info.cases[++i] != null) {
            if (info.cases[i][0] === caseName) {
                tag = i;
                break;
            }
        }
        if (tag === -1) {
            invalidate(val, typ, path);
        }
        let caseInfo = info.cases[tag], inflatedData = void 0;
        if (caseInfo.length > 2) {
            inflatedData = [];
            const data = val[caseName];
            path = combine(path, caseName);
            for (let i = 0; i < data.length; i++) {
                inflatedData.push(inflateField
                    ? inflateField(data[i], caseInfo[i + 1], combine(path, i))
                    : data[i]);
            }
        }
        else if (caseInfo.length > 1) {
            inflatedData = inflateField
                ? inflateField(val[caseName], caseInfo[1], combine(path, caseName))
                : val[caseName];
        }
        return new typ(tag, inflatedData);
    }
    function inflate(val, typ, path) {
        let enclosing = null;
        if (typ instanceof List_1.default) {
            enclosing = typ;
            typ = typ.head;
        }
        else {
            enclosing = new List_1.default(typ, new List_1.default());
        }
        if (val == null) {
            if (!isNullable(typ)) {
                invalidate(val, typ, path);
            }
            return val;
        }
        else if (typeof typ === "string") {
            if ((typ === "boolean" || typ === "number" || typ === "string") && (typeof val !== typ)) {
                invalidate(val, typ, path);
            }
            return val;
        }
        else if (typ instanceof Util_1.NonDeclaredType) {
            switch (typ.kind) {
                case "Unit":
                    return null;
                case "Option":
                    return inflate(val, new List_1.default(typ.generics[0], enclosing), path);
                case "Array":
                    if (typ.definition != null) {
                        return new typ.definition(val);
                    }
                    else {
                        return inflateArray(val, new List_1.default(typ.generics[0], enclosing), path);
                    }
                case "Tuple":
                    return typ.generics.map((x, i) => inflate(val[i], new List_1.default(x, enclosing), combine(path, i)));
                case "Function":
                    return val;
                case "GenericParam":
                    return inflate(val, Reflection_1.resolveGeneric(typ.definition, enclosing.tail), path);
                case "GenericType":
                    const def = typ.definition;
                    if (def === List_1.default) {
                        return Array.isArray(val)
                            ? List_2.ofArray(inflateArray(val, Reflection_1.resolveGeneric(0, enclosing), path))
                            : inflateList(val, Reflection_1.resolveGeneric(0, enclosing), path);
                    }
                    if (def === Set_1.default) {
                        return Set_2.create(inflateArray(val, Reflection_1.resolveGeneric(0, enclosing), path));
                    }
                    if (def === Set) {
                        return new Set(inflateArray(val, Reflection_1.resolveGeneric(0, enclosing), path));
                    }
                    if (def === Map_1.default) {
                        return Map_2.create(inflateMap(val, Reflection_1.resolveGeneric(0, enclosing), Reflection_1.resolveGeneric(1, enclosing), path));
                    }
                    if (def === Map) {
                        return new Map(inflateMap(val, Reflection_1.resolveGeneric(0, enclosing), Reflection_1.resolveGeneric(1, enclosing), path));
                    }
                    return inflate(val, new List_1.default(typ.definition, enclosing), path);
                default:
                    return val;
            }
        }
        else if (typeof typ === "function") {
            if (typ === Date) {
                return Date_1.parse(val);
            }
            const info = typeof typ.prototype[Symbol_1.default.reflection] === "function" ? typ.prototype[Symbol_1.default.reflection]() : {};
            if (info.cases) {
                return inflateUnion(val, typ, info, path, (fi, t, p) => inflate(fi, new List_1.default(t, enclosing), path));
            }
            if (info.properties) {
                let newObj = new typ();
                const properties = info.properties;
                const ks = Object.getOwnPropertyNames(properties);
                for (let i = 0; i < ks.length; i++) {
                    let k = ks[i];
                    newObj[k] = inflate(val[k], new List_1.default(properties[k], enclosing), combine(path, k));
                }
                return newObj;
            }
            return val;
        }
        throw new Error("Unexpected type when deserializing JSON: " + typ);
    }
    function inflatePublic(val, genArgs) {
        return inflate(val, genArgs ? genArgs.T : null, "");
    }
    exports.inflate = inflatePublic;
    function ofJson(json, genArgs) {
        return inflate(JSON.parse(json), genArgs ? genArgs.T : null, "");
    }
    exports.ofJson = ofJson;
    function toJsonWithTypeInfo(o) {
        return JSON.stringify(o, (k, v) => {
            if (ArrayBuffer.isView(v)) {
                return Array.from(v);
            }
            else if (v != null && typeof v === "object") {
                const info = typeof v[Symbol_1.default.reflection] === "function" ? v[Symbol_1.default.reflection]() : {};
                if (v instanceof List_1.default || v instanceof Set_1.default || v instanceof Set) {
                    return {
                        $type: info.type || "System.Collections.Generic.HashSet",
                        $values: Array.from(v)
                    };
                }
                else if (v instanceof Map_1.default || v instanceof Map) {
                    return Seq_1.fold((o, kv) => { o[kv[0]] = kv[1]; return o; }, { $type: info.type || "System.Collections.Generic.Dictionary" }, v);
                }
                else if (info.properties) {
                    return Seq_1.fold((o, prop) => {
                        return o[prop] = v[prop], o;
                    }, { $type: info.type }, Object.getOwnPropertyNames(info.properties));
                }
                else if (info.cases) {
                    const uci = info.cases[v.tag];
                    return {
                        [uci[0]]: (v.data !== void 0 ? v.data : null),
                        $type: info.type
                    };
                }
            }
            return v;
        });
    }
    exports.toJsonWithTypeInfo = toJsonWithTypeInfo;
    function ofJsonWithTypeInfo(json, genArgs) {
        const parsed = JSON.parse(json, (k, v) => {
            if (v == null)
                return v;
            else if (typeof v === "object" && typeof v.$type === "string") {
                let type = v.$type.replace('+', '.'), i = type.indexOf('`');
                delete v.$type;
                if (i > -1) {
                    type = type.substr(0, i);
                }
                else {
                    i = type.indexOf(',');
                    type = i > -1 ? type.substr(0, i) : type;
                }
                if (type === "System.Collections.Generic.List" || (type.indexOf("[]") === type.length - 2)) {
                    return v.$values;
                }
                if (type === "Microsoft.FSharp.Collections.FSharpList") {
                    return List_2.ofArray(v.$values);
                }
                else if (type == "Microsoft.FSharp.Collections.FSharpSet") {
                    return Set_2.create(v.$values);
                }
                else if (type == "System.Collections.Generic.HashSet") {
                    return new Set(v.$values);
                }
                else if (type == "Microsoft.FSharp.Collections.FSharpMap") {
                    return Map_2.create(Object.getOwnPropertyNames(v)
                        .map(k => [k, v[k]]));
                }
                else if (type == "System.Collections.Generic.Dictionary") {
                    return new Map(Object.getOwnPropertyNames(v)
                        .map(k => [k, v[k]]));
                }
                else {
                    const typ = Symbol_2.getType(type);
                    if (typ) {
                        const info = typeof typ.prototype[Symbol_1.default.reflection] === "function" ? typ.prototype[Symbol_1.default.reflection]() : {};
                        if (info.cases) {
                            return inflateUnion(v, typ, info, k);
                        }
                        return Object.assign(new typ(), v);
                    }
                }
            }
            else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:[+-]\d{2}:\d{2}|Z)$/.test(v))
                return Date_1.parse(v);
            else
                return v;
        });
        const expected = genArgs ? genArgs.T : null;
        if (parsed != null && typeof expected === "function"
            && !(parsed instanceof Util_1.getDefinition(expected))) {
            throw new Error("JSON is not of type " + expected.name + ": " + json);
        }
        return parsed;
    }
    exports.ofJsonWithTypeInfo = ofJsonWithTypeInfo;
});
