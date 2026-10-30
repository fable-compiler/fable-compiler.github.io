---
title: Features
layout: standard
---

:::info
Because TypeScript is a superset of JavaScript, everything you can do in JavaScript, you can do it in TypeScript. 

This section of the documentation will focus on the TypeScript specific features. Please, refer to the [JavaScript section](/docs/javascript/js-from-fable.html) for more information about the JavaScript features.
:::
 

## Erased unions

In TypeScript, it is common to have a function or argument accept a value of different types.

For example, you can have a function `padLeft` which accepts a string or a number as the first argument:

```ts
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
    // ...
}
```

Using Fable, you can represent this in F# using `U2`, `U3`, ..., `U9`:

```fs
let padLeft (value: string) (padding: U2<string, int>) =
    // ...
```

You can use pattern matching against these unions type but be aware this is translated to standard JS runtime testing (`typeof`, `instanceof`, `Array.isArray`, ...) so only use erased unions with distinct JS primitives (e.g. no `U2<int, float>`).

```fs
open Fable.Core

type CellValue = U3<string, bool, float>

let toText (v:CellValue) =
    match v with
    | U3.Case1 s -> s
    | U3.Case2 b -> b.ToString()
    | U3.Case3 f -> f.ToString()
```

translated to:

```ts
export function toText(v: string | boolean | float64): string {
    if (typeof v === "boolean") {
        const b: boolean = v;
        return toString(b);
    }
    else if (typeof v === "number") {
        const f: float64 = v;
        return f.toString();
    }
    else {
        const s: string = v;
        return s;
    }
}
```

If you were to use a type like `U2<int, float>` you would end up with 2 `typeof v === "number"` tests making it impossible to distinguish between `int` and `float` the two cases. This is because JavaScript only has one numeric type: `number`.

`U2` to `U9` are not checked by the compiler. For a union you declare with `[<Erase>]`, Fable derives the tests from the case types and reports the cases it cannot tell apart. See [Erased unions](/docs/javascript/features.html#erased-unions).


## F# Unions

```fs
type Command =
    | Take of fromIndex: int * toIndex: int
    | Edit of text: string
    | Save
```

In TypeScript it becomes:

```ts
import { Union } from "./fable_modules/fable-library-ts/Types.js";
import { int32 } from "./fable_modules/fable-library-ts/Int32.js";
import { union_type, string_type, int32_type, TypeInfo } from "./fable_modules/fable-library-ts/Reflection.js";

export type Command_$union = 
    | Command<0>
    | Command<1>
    | Command<2>

export type Command_$cases = {
    0: ["Take", [int32, int32]],
    1: ["Edit", [string]],
    2: ["Save", []]
}

export function Command_Take(fromIndex: int32, toIndex: int32) {
    return new Command<0>(0, [fromIndex, toIndex]);
}

export function Command_Edit(text: string) {
    return new Command<1>(1, [text]);
}

export function Command_Save() {
    return new Command<2>(2, []);
}

export class Command<Tag extends keyof Command_$cases> extends Union<Tag, Command_$cases[Tag][0]> {
    constructor(readonly tag: Tag, readonly fields: Command_$cases[Tag][1]) {
        super();
    }
    cases() {
        return ["Take", "Edit", "Save"];
    }
}

export function Command_$reflection(): TypeInfo {
    return union_type("Program.Command", [], Command, () => [[["fromIndex", int32_type], ["toIndex", int32_type]], [["text", string_type]], []]);
}
```

You might be surprised by the amount of code generated for a simple union.

Fable generates:

- A type alias for each case of the union, they only exist in TypeScript and will be erased during compilation. They will not affect the runtime performance.
- Helpers functions to create each case of the union, making it easier to use from TypeScript. If not used, depending on your bundler, they will be removed from the final bundle.
- Reflection information for the union, because Fable allows to use reflection at runtime against F# types.

When executing a `switch` against the generated union, you have 2 options:

- Use the `tag` property which is the `index` of the case in the union. This is the most efficient way.

```ts
function execute(command : Command_$union) {
    switch (command.tag) {
        case 0:
            const fromIndex = command.fields[0];
            const toIndex = command.fields[1];
            return console.log("Take", fromIndex, toIndex);
        case 1:
            const text = command.fields[0];
            return console.log("Edit", text);
        case 2:
            return console.log("Save");
    }
}
```

- Use the `name` property which is the name of the case. This is less efficient but more common in TypeScript.

```ts
function execute(command : Command_$union) {
    switch (command.name) {
        case "Take":
            const fromIndex = command.fields[0];
            const toIndex = command.fields[1];
            console.log("Take", fromIndex, toIndex);
            break;
        case "Edit":
            const text = command.fields[0];
            console.log("Edit", text);
            break;
        case "Save":
            console.log("Save");
            break;
    }
}
```

:::info
Independently of the option you choose, the compiler will warn you if you handle an invalid case.
:::

If you want the TypeScript compiler to warn you when you don't handle all cases, you can use the common hack of adding a `default` case that stores the value in a variable of type `never`.

```ts
function execute(command : Command_$union) {
    switch (command.tag) {
        case 0:
            // ...
        case 1:
            // ...
        default:
            // The next line reports error: Type 'Command<2>' is not assignable to type 'never'.
            // This tells us that we forgot to handle the tag with a value of `2`
            const _exhaustiveCheck: never = command;
            return _exhaustiveCheck;
    }
}
```

## Tagged Unions

<p class="tag is-info is-medium">
    Added in v4.1.3
</p>

### Discriminated Unions

Even if F# unions can be used in a typed-safe manner from TypeScript, when you build a public API you may want your unions to feel more "native".

Fable can compile F# unions to TypeScript tagged unions thanks to the `TypeScriptTaggedUnion` attribute. You define the name of the tag property in the attribute, and the name of each case will become the value of the tag. Name the fields of each case. A field without a name is emitted as `Item`, or `Item1`, `Item2` and so on when the case has several fields. A single unnamed field of an interface type is handled differently, see [Interfaces](#interfaces).

```fs
[<TypeScriptTaggedUnion("type")>]
type Command =
    | Take of fromIndex: int * toIndex: int
    | Edit of text: string
    | Save
```

In TypeScript it becomes:

```ts
export type Command = 
    | { type: "take", fromIndex: int32, toIndex: int32 }
    | { type: "edit", text: string }
    | { type: "save" }
```

TypeScript consumer code can now use the union in a natural way:

```ts
function execute(command: Command) {
    switch (command.type) {
        case "take":
            // command.fromIndex and command.toIndex are available
            break;
        case "edit":
            // command.text is available
            break;
        case "save":
            // No additional data
            break;
    }
}
```

### Interfaces

It is also possible to use interfaces instead for describing tagged unions.

This allows to use interfaces in the F# code to access the fields instead of tuple destructuring.

A case with a single unnamed field of an interface type compiles to the interface value itself. The interface must declare the tag property. A case with a named field compiles to an object holding the tag and the field.

```fs
type Take =
    abstract ``type``: string
    abstract fromIndex: int
    abstract toIndex: int

type Edit =
    abstract text: string

[<TypeScriptTaggedUnion("type")>]
type Command =
    | Take of Take
    | Edit of edit: Edit
    | Save
```

In TypeScript it becomes:

```ts
export interface Take {
    get fromIndex(): int32,
    get toIndex(): int32,
    get type(): string
}

export interface Edit {
    get text(): string
}

export type Command =
    | Take & { type: "take" }
    | { type: "edit", edit: Edit }
    | { type: "save" }
```

TypeScript consumer code can now use the union in a natural way:

```ts
function execute(command: Command) {
    switch (command.type) {
        case "take":
            // command.fromIndex and command.toIndex are available
            break;
        case "edit":
            // command.edit.text is available
            break;
        case "save":
            // No additional data
            break;
    }
}
```

When the interface of an unnamed field does not declare the tag property, compilation fails:

```
error FABLE: Case 'Take' of 'Command' compiles to its 'Take' value, so the interface must declare a 'type' member to carry the tag. Add the member, or name the field to compile the case as an object holding the tag and the field.
```

:::info
Fable 4.19.1 to 5.23.0 compile an unnamed interface field to a field named `Item`: `{ type: "take", Item: Take }`.
:::

### Cases sharing a tag

<p class="tag is-info is-medium">
    Added in v5.24.0
</p>

Several cases can share a tag value through `CompiledName`. When you match on such a case, Fable adds a runtime check after the tag test. The check is derived from the fields of the case. For each other case with the same tag, the first rule that applies is used:

1. A field only this case has: `"value" in t`
2. A field only the other case has: `!("error" in t)`
3. A field with the same name and a different runtime type: `typeof t.message === "string"` or `t.message instanceof Payload`
4. The other case has a `CaseTest` attribute: its negation, `!(t.kind === 'build')`

```fs
type Payload(id: int) =
    member _.Id = id

[<TypeScriptTaggedUnion("state")>]
type Task =
    | [<CompiledName("done")>] Done of value: float
    | [<CompiledName("done")>] DoneError of error: string
    | [<CompiledName("log")>] LogString of message: string
    | [<CompiledName("log")>] LogPayload of message: Payload
    | [<CompiledName("run"); CaseTest("$0.kind === 'build'")>] Build of kind: string
    | [<CompiledName("run")>] Other of kind: string
    | Pending
```

Matching on these cases compiles to:

```js
t.state === "done" && "value" in t                 // Done
t.state === "done" && "error" in t                 // DoneError
t.state === "log" && typeof t.message === "string" // LogString
t.state === "log" && t.message instanceof Payload  // LogPayload
t.state === "run" && t.kind === 'build'            // Build
t.state === "run" && !(t.kind === 'build')         // Other
```

Optional fields are ignored by rules 1 and 2. Rule 3 applies only when neither type passes the runtime test of the other. Fields typed `obj`, a generic parameter, an interface, a `Pojo` class, an erased type, or a base type and one of its subtypes do not qualify.

A match on a union with cases sharing a tag compiles to an `if`/`else` chain instead of a `switch`. In a complete match, the last case tested is the fallback and its test is not emitted.

When no rule applies, compilation fails with an error naming both cases:

```
error FABLE: Cases 'LogString' and 'LogObject' of 'Log' share the tag value "log" and cannot be told apart at runtime: field 'message' has type 'obj', which can hold any value. Add a CaseTest attribute to 'LogString' or 'LogObject'.
```

### `CaseTest`

<p class="tag is-info is-medium">
    Added in v5.23.0
</p>

`CaseTest` adds a runtime test to a case of a `TypeScriptTaggedUnion`. The test is a JavaScript expression in `Emit` syntax, where `$0` is the tested value. It is combined with the tag test using `&&`.

```fs
[<TypeScriptTaggedUnion("state")>]
type Task =
    | [<CompiledName("run"); CaseTest("$0.kind === 'build'")>] Build of kind: string
    | [<CompiledName("run")>] Other of kind: string

let isBuild (t: Task) =
    match t with
    | Build _ -> true
    | _ -> false
```

```js
export function isBuild(t) {
    if ((t.state === "run") && (t.kind === 'build')) {
        return true;
    }
    else {
        return false;
    }
}
```

The test must be true for every value of its case. Its negation is used to test the other cases sharing the tag, so in a group of cases that cannot be told apart by their fields, all but one need a `CaseTest`. A `CaseTest` takes precedence over the rules derived from the fields.

`CaseTest` only applies when targeting JavaScript or TypeScript. On a union without `TypeScriptTaggedUnion` or `Erase`, it is ignored and reported as warning `FABLE0116`. See [Warnings](/docs/your-fable-project/warnings.html).

`CaseTest` on erased union cases is documented in [Erased unions](/docs/javascript/features.html#casetest).
