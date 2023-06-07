---
title: Call TypeScript from Fable
layout: standard
---

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