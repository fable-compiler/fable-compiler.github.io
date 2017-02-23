define(["require", "exports", "./Symbol", "./Symbol", "./List", "./List", "./Set", "./Map", "./Map", "./Set", "./Util", "./Seq", "./Reflection", "./Date", "./String"], function (require, exports, Symbol_1, Symbol_2, List_1, List_2, Set_1, Map_1, Map_2, Set_2, Util_1, Seq_1, Reflection_1, Date_1, String_1) {
    "use strict";
    function deflate(v) {
        if (ArrayBuffer.isView(v)) {
            return Array.from(v);
        }
        else if (v != null && typeof v === "object") {
            if (v instanceof List_1.default || v instanceof Set_1.default || v instanceof Set) {
                return Array.from(v);
            }
            else if (v instanceof Map_1.default || v instanceof Map) {
                var stringKeys_1 = null;
                return Seq_1.fold(function (o, kv) {
                    if (stringKeys_1 === null) {
                        stringKeys_1 = typeof kv[0] === "string";
                    }
                    o[stringKeys_1 ? kv[0] : toJson(kv[0])] = kv[1];
                    return o;
                }, {}, v);
            }
            var reflectionInfo = typeof v[Symbol_1.default.reflection] === "function" ? v[Symbol_1.default.reflection]() : {};
            if (reflectionInfo.properties) {
                return Seq_1.fold(function (o, prop) {
                    return o[prop] = v[prop], o;
                }, {}, Object.getOwnPropertyNames(reflectionInfo.properties));
            }
            else if (reflectionInfo.cases) {
                var caseInfo = reflectionInfo.cases[v.tag], caseName = caseInfo[0], fieldsLength = caseInfo.length - 1;
                if (fieldsLength === 0) {
                    return caseName;
                }
                else if (fieldsLength === 1) {
                    var fieldValue = typeof v.a === 'undefined' ? null : v.a;
                    return _a = {}, _a[caseName] = fieldValue, _a;
                }
                else {
                    return _b = {}, _b[caseName] = Util_1.getUnionFields(v), _b;
                }
            }
        }
        return v;
        var _a, _b;
    }
    function toJson(o) {
        return JSON.stringify(o, function (k, v) { return deflate(v); });
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
            var info = typeof typ.prototype[Symbol_1.default.reflection] === "function"
                ? typ.prototype[Symbol_1.default.reflection]() : null;
            return info ? info.nullable : true;
        }
    }
    function invalidate(val, typ, path) {
        throw new Error(String_1.fsFormat("%A", val) + " " + (path ? "(" + path + ")" : "") + " is not of type " + Reflection_1.getTypeFullName(typ));
    }
    function needsInflate(enclosing) {
        var typ = enclosing.head;
        if (typeof typ === "string") {
            return false;
        }
        if (typ instanceof Util_1.NonDeclaredType) {
            switch (typ.kind) {
                case "Option":
                case "Array":
                    return typ.definition != null || needsInflate(new List_1.default(typ.generics, enclosing));
                case "Tuple":
                    return typ.generics.some(function (x) {
                        return needsInflate(new List_1.default(x, enclosing));
                    });
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
            ? arr.map(function (x, i) { return inflate(x, enclosing, combine(path, i)); })
            : arr;
    }
    function inflateMap(obj, keyEnclosing, valEnclosing, path) {
        var inflateKey = keyEnclosing.head !== "string";
        var inflateVal = needsInflate(valEnclosing);
        return Object
            .getOwnPropertyNames(obj)
            .map(function (k) {
            var key = inflateKey ? inflate(JSON.parse(k), keyEnclosing, combine(path, k)) : k;
            var val = inflateVal ? inflate(obj[k], valEnclosing, combine(path, k)) : obj[k];
            return [key, val];
        });
    }
    function inflateList(val, enclosing, path) {
        var ar = [], li = new List_1.default(), cur = val, inf = needsInflate(enclosing);
        while (cur.tail != null) {
            ar.push(inf ? inflate(cur.head, enclosing, path) : cur.head);
            cur = cur.tail;
        }
        ar.reverse();
        for (var i = 0; i < ar.length; i++) {
            li = new List_1.default(ar[i], li);
        }
        return li;
    }
    function inflateUnion(val, typ, info, path, inflateField) {
        var newVal, caseName;
        if (typeof val.tag === "number") {
            newVal = new typ();
            return Object.assign(newVal, val);
        }
        else if (typeof val === "string") {
            caseName = val;
        }
        else {
            caseName = Object.getOwnPropertyNames(val)[0];
        }
        var tag = -1, i = -1;
        while (info.cases[++i] != null) {
            if (info.cases[i][0] === caseName) {
                tag = i;
                break;
            }
        }
        if (tag === -1) {
            invalidate(val, typ, path);
        }
        newVal = new typ(tag);
        var caseInfo = info.cases[tag];
        if (caseInfo.length > 1) {
            var fields = caseInfo.length > 2 ? val[caseName] : [val[caseName]];
            path = combine(path, caseName);
            newVal.size = fields.length;
            for (var i_1 = 0; i_1 < fields.length; i_1++) {
                newVal[String.fromCharCode(97 + i_1)] =
                    inflateField ? inflateField(fields[i_1], caseInfo[i_1 + 1], combine(path, i_1)) : fields[i_1];
            }
        }
        return newVal;
    }
    function inflate(val, typ, path) {
        var enclosing = null;
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
                    return inflate(val, new List_1.default(typ.generics, enclosing), path);
                case "Array":
                    if (typ.definition != null) {
                        return new typ.definition(val);
                    }
                    else {
                        return inflateArray(val, new List_1.default(typ.generics, enclosing), path);
                    }
                case "Tuple":
                    return typ.generics.map(function (x, i) {
                        return inflate(val[i], new List_1.default(x, enclosing), combine(path, i));
                    });
                case "GenericParam":
                    return inflate(val, Reflection_1.resolveGeneric(typ.definition, enclosing.tail), path);
                case "GenericType":
                    var def = typ.definition;
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
            var info = typeof typ.prototype[Symbol_1.default.reflection] === "function" ? typ.prototype[Symbol_1.default.reflection]() : {};
            if (info.cases) {
                return inflateUnion(val, typ, info, path, function (fi, t, p) { return inflate(fi, new List_1.default(t, enclosing), path); });
            }
            if (info.properties) {
                var newObj = new typ();
                var properties = info.properties;
                var ks = Object.getOwnPropertyNames(properties);
                for (var i = 0; i < ks.length; i++) {
                    var k = ks[i];
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
        return JSON.stringify(o, function (k, v) {
            if (ArrayBuffer.isView(v)) {
                return Array.from(v);
            }
            else if (v != null && typeof v === "object") {
                var info = typeof v[Symbol_1.default.reflection] === "function" ? v[Symbol_1.default.reflection]() : {};
                if (v instanceof List_1.default || v instanceof Set_1.default || v instanceof Set) {
                    return {
                        $type: info.type || "System.Collections.Generic.HashSet",
                        $values: Array.from(v)
                    };
                }
                else if (v instanceof Map_1.default || v instanceof Map) {
                    return Seq_1.fold(function (o, kv) { o[kv[0]] = kv[1]; return o; }, { $type: info.type || "System.Collections.Generic.Dictionary" }, v);
                }
                else if (info.properties) {
                    return Seq_1.fold(function (o, prop) {
                        return o[prop] = v[prop], o;
                    }, { $type: info.type }, Object.getOwnPropertyNames(info.properties));
                }
                else if (info.cases) {
                    var uci = info.cases[v.tag], fields = Util_1.getUnionFields(v);
                    return _a = {},
                        _a[uci[0]] = uci.length <= 2 ? fields[0] : fields,
                        _a.$type = info.type,
                        _a;
                }
            }
            return v;
            var _a;
        });
    }
    exports.toJsonWithTypeInfo = toJsonWithTypeInfo;
    function ofJsonWithTypeInfo(json, genArgs) {
        var parsed = JSON.parse(json, function (k, v) {
            if (v == null)
                return v;
            else if (typeof v === "object" && typeof v.$type === "string") {
                var type = v.$type.replace('+', '.'), i = type.indexOf('`');
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
                        .map(function (k) { return [k, v[k]]; }));
                }
                else if (type == "System.Collections.Generic.Dictionary") {
                    return new Map(Object.getOwnPropertyNames(v)
                        .map(function (k) { return [k, v[k]]; }));
                }
                else {
                    var typ = Symbol_2.getType(type);
                    if (typ) {
                        var info = typeof typ.prototype[Symbol_1.default.reflection] === "function" ? typ.prototype[Symbol_1.default.reflection]() : {};
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
        var expected = genArgs ? genArgs.T : null;
        if (parsed != null && typeof expected === "function"
            && !(parsed instanceof Util_1.getDefinition(expected))) {
            throw new Error("JSON is not of type " + expected.name + ": " + json);
        }
        return parsed;
    }
    exports.ofJsonWithTypeInfo = ofJsonWithTypeInfo;
});
