define(["require", "exports", "./List", "./Symbol", "./Util"], function (require, exports, List_1, Symbol_1, Util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MemberInfo {
        constructor(name, index, declaringType, propertyType, unionFields) {
            this.name = name;
            this.index = index;
            this.declaringType = declaringType;
            this.propertyType = propertyType;
            this.unionFields = unionFields;
        }
        getUnionFields() {
            return this.unionFields.map((fi, i) => new MemberInfo("unknown", i, this.declaringType, fi));
        }
    }
    exports.MemberInfo = MemberInfo;
    function resolveGeneric(idx, enclosing) {
        try {
            const t = enclosing.head;
            if (t.generics == null) {
                return resolveGeneric(idx, enclosing.tail);
            }
            else {
                const name = typeof idx === "string"
                    ? idx : Object.getOwnPropertyNames(t.generics)[idx];
                const resolved = t.generics[name];
                if (resolved == null) {
                    return resolveGeneric(idx, enclosing.tail);
                }
                else if (resolved instanceof Util_1.NonDeclaredType && resolved.kind === "GenericParam") {
                    return resolveGeneric(resolved.definition, enclosing.tail);
                }
                else {
                    return new List_1.default(resolved, enclosing);
                }
            }
        }
        catch (err) {
            throw new Error(`Cannot resolve generic argument ${idx}: ${err}`);
        }
    }
    exports.resolveGeneric = resolveGeneric;
    function getType(obj) {
        const t = typeof obj;
        switch (t) {
            case "boolean":
            case "number":
            case "string":
            case "function":
                return t;
            default:
                return Object.getPrototypeOf(obj).constructor;
        }
    }
    exports.getType = getType;
    // TODO: This needs improvement, check namespace for non-custom types?
    function getTypeFullName(typ, option) {
        function trim(fullName, opt) {
            if (typeof fullName !== "string") {
                return "unknown";
            }
            if (opt === "name") {
                const i = fullName.lastIndexOf(".");
                return fullName.substr(i + 1);
            }
            if (opt === "namespace") {
                const i = fullName.lastIndexOf(".");
                return i > -1 ? fullName.substr(0, i) : "";
            }
            return fullName;
        }
        if (typeof typ === "string") {
            return typ;
        }
        else if (typ instanceof Util_1.NonDeclaredType) {
            switch (typ.kind) {
                case "Unit":
                    return "unit";
                case "Option":
                    return getTypeFullName(typ.generics[0], option) + " option";
                case "Array":
                    return getTypeFullName(typ.generics[0], option) + "[]";
                case "Tuple":
                    return typ.generics.map((x) => getTypeFullName(x, option)).join(" * ");
                case "Function":
                    return "Func<" + typ.generics.map((x) => getTypeFullName(x, option)).join(", ") + ">";
                case "GenericParam":
                case "Interface":
                    return typ.definition;
                case "GenericType":
                    return getTypeFullName(typ.definition, option);
                case "Any":
                default:
                    return "unknown";
            }
        }
        else {
            // Attention: this doesn't work with Object.getPrototypeOf
            const proto = typ.prototype;
            return trim(typeof proto[Symbol_1.default.reflection] === "function"
                ? proto[Symbol_1.default.reflection]().type : null, option);
        }
    }
    exports.getTypeFullName = getTypeFullName;
    function getName(x) {
        if (x instanceof MemberInfo) {
            return x.name;
        }
        return getTypeFullName(x, "name");
    }
    exports.getName = getName;
    function getPrototypeOfType(typ) {
        if (typeof typ === "string") {
            return null;
        }
        else if (typ instanceof Util_1.NonDeclaredType) {
            return typ.kind === "GenericType" ? typ.definition.prototype : null;
        }
        else {
            return typ.prototype;
        }
    }
    exports.getPrototypeOfType = getPrototypeOfType;
    function getProperties(typ) {
        const proto = getPrototypeOfType(typ);
        if (proto != null && typeof proto[Symbol_1.default.reflection] === "function") {
            const info = proto[Symbol_1.default.reflection]();
            if (info.properties) {
                return Object.getOwnPropertyNames(info.properties)
                    .map((k, i) => new MemberInfo(k, i, typ, info.properties[k]));
            }
        }
        throw new Error("Type " + getTypeFullName(typ) + " doesn't contain property info.");
    }
    exports.getProperties = getProperties;
    function getUnionCases(typ) {
        const proto = getPrototypeOfType(typ);
        if (proto != null && typeof proto[Symbol_1.default.reflection] === "function") {
            const info = proto[Symbol_1.default.reflection]();
            if (info.cases) {
                return info.cases.map((uci, i) => new MemberInfo(uci[0], i, typ, null, uci.slice(1)));
            }
        }
        throw new Error("Type " + getTypeFullName(typ) + " doesn't contain union case info.");
    }
    exports.getUnionCases = getUnionCases;
    function getPropertyValues(obj) {
        return Util_1.getPropertyNames(obj).map((k) => obj[k]);
    }
    exports.getPropertyValues = getPropertyValues;
    function getUnionFields(obj, typ) {
        if (obj != null && typeof obj[Symbol_1.default.reflection] === "function") {
            const info = obj[Symbol_1.default.reflection]();
            if (info.cases) {
                const uci = info.cases[obj.tag];
                if (uci != null) {
                    const fields = uci.length > 2 ? obj.data : (uci.length > 1 ? [obj.data] : []);
                    return [new MemberInfo(uci[0], obj.tag, typ, null, uci.slice(1)), fields];
                }
            }
        }
        throw new Error("Not an F# union type.");
    }
    exports.getUnionFields = getUnionFields;
    function makeUnion(caseInfo, args) {
        const Cons = Util_1.getDefinition(caseInfo.declaringType);
        switch (args.length) {
            case 0:
                return new Cons(caseInfo.index);
            case 1:
                return new Cons(caseInfo.index, args[0]);
            default:
                return new Cons(caseInfo.index, args);
        }
    }
    exports.makeUnion = makeUnion;
    function getTupleElements(typ) {
        if (typ instanceof Util_1.NonDeclaredType && typ.kind === "Tuple") {
            return typ.generics;
        }
        throw new Error("Type " + getTypeFullName(typ) + " is not a tuple type.");
    }
    exports.getTupleElements = getTupleElements;
    function isTupleType(typ) {
        if (typ instanceof Util_1.NonDeclaredType) {
            return typ.kind === "Tuple";
        }
        return false;
    }
    exports.isTupleType = isTupleType;
    function getFunctionElements(typ) {
        if (typ === "function") {
            throw new Error("The type of the function must be known at compile time to get the elements.");
        }
        if (typ instanceof Util_1.NonDeclaredType && typ.kind === "Function") {
            return typ.generics;
        }
        throw new Error("Type " + getTypeFullName(typ) + " is not a function type.");
    }
    exports.getFunctionElements = getFunctionElements;
    function isFunctionType(typ) {
        return typ === "function" || (typ instanceof Util_1.NonDeclaredType && typ.kind === "Function");
    }
    exports.isFunctionType = isFunctionType;
    function getGenericArguments(typ) {
        if (typ instanceof Util_1.NonDeclaredType) {
            if (Array.isArray(typ.generics)) {
                return typ.generics;
            }
            else {
                const dic = typ.generics;
                return Object.keys(dic).map((k) => dic[k]);
            }
        }
        return [];
    }
    exports.getGenericArguments = getGenericArguments;
});
