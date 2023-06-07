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
Indepently of the option you choose, the compiler will warn you if you handle an invalid case.
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


Even if F# unions can be used in a typed-safe manner from TypeScript, when you build a public API you may want your unions to feel more "native".

Fable can compile F# unions to TypeScript tagged unions thanks to the `TypeScriptTaggedUnion` attribute. You define the name of the tag property in the attribute, and the name of each case will become the value of the tag. It is also important that you use named fields for each case.

```fs
[<TypeScriptTaggedUnion("type")>]
type Command =
    | Take of fromIndex: int * toIndex: int
    | Edit of text: string
    | Save
````

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
