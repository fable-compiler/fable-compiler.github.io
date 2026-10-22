---
title: Warnings
layout: standard
---

Fable reports a warning when it compiles code whose behaviour differs from .NET. 

Each Fable warning has a code made of `FABLE` followed by four digits. The code is printed in the compiler output:

```
src/App.fs(3,0): (3,57) warning FABLE FABLE0100: CultureInfo argument is ignored
```

## Treat warnings as errors

Set `TreatWarningsAsErrors` in your project file to fail the compilation on any warning, from F# or from Fable.

```xml
<PropertyGroup>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
</PropertyGroup>
```

## Suppress a warning

Write a directive in a comment to suppress a Fable warning. A suppressed warning is not reported and does not fail the build when `TreatWarningsAsErrors` is enabled.

Directives apply to Fable warnings only. Use `#nowarn` for F# compiler warnings. Errors are never suppressed.

### `fable-disable-line`

Suppresses the listed warnings reported on the same line.

```fsharp
"abc".StartsWith("a", true, CultureInfo.InvariantCulture) // fable-disable-line FABLE0100
```

When the expression spans several lines, the directive can sit on any of them.

```fsharp
"abc".StartsWith(
    "a", true, CultureInfo.InvariantCulture) // fable-disable-line FABLE0100
```

### `fable-disable-next-line`

Suppresses the listed warnings reported on the following line.

```fsharp
// fable-disable-next-line FABLE0100
"abc".StartsWith("a", true, CultureInfo.InvariantCulture)
```

### `fable-disable` and `fable-enable`

`fable-disable` suppresses the listed warnings from its line to the matching `fable-enable`, or to the end of the file.

```fsharp
// fable-disable FABLE0100
"abc".StartsWith("a", true, CultureInfo.InvariantCulture)
"abc".EndsWith("c", true, CultureInfo.InvariantCulture)
// fable-enable FABLE0100
```

`fable-disable` must list the codes it suppresses. A `fable-disable` without codes suppresses every Fable warning until the end of the file and is reported as `FABLE0003`.

### Syntax

- Codes are separated by spaces or commas and are case-insensitive: `FABLE0100, fable0101`.
- A colon after the directive name is accepted: `// fable-disable-line: FABLE0100`.
- Text after `--` is a justification and is ignored: `// fable-disable-line FABLE0100 -- culture is irrelevant here`.
- Line comments and block comments are both accepted: `(* fable-disable-line FABLE0100 *)`.
- `fable-disable-line` and `fable-disable-next-line` without codes suppress every Fable warning on their target line.
- Directives inside `#if` blocks are read with the same compiler directives as the code, so a directive inside `#if FABLE_COMPILER` is honoured.

### Warnings from inline functions

A warning raised by an `inline` function is reported at the definition of the function, not at the call site. Put the directive next to the definition.

```fsharp
let inline startsWithCulture (s: string) =
    s.StartsWith("a", true, CultureInfo.InvariantCulture) // fable-disable-line FABLE0100

startsWithCulture "abc"
```

## Directive warnings

Fable reports a problem with a directive itself under codes `FABLE0001` to `FABLE0099`. These warnings cannot be suppressed.

| Code | Message |
| --- | --- |
| `FABLE0001` | Unknown warning code in a fable-disable directive |
| `FABLE0002` | This fable-disable directive doesn't suppress anything |
| `FABLE0003` | A `fable-disable` block must list the warning codes it suppresses |

## Warning codes

Codes `FABLE0100` and up describe the compiled code and can be suppressed. 

The complete list is in [WarningCodes.fs](https://github.com/fable-compiler/Fable/blob/main/src/Fable.Transforms/Global/WarningCodes.fs) in the Fable repository.

| Code | Message |
| --- | --- |
| `FABLE0100` | CultureInfo argument is ignored |
| `FABLE0101` | String comparison argument is ignored |
| `FABLE0102` | Format provider argument is ignored |
| `FABLE0103` | NumberStyles argument is ignored |
| `FABLE0104` | DateTimeStyles argument is ignored |
| `FABLE0105` | TimeSpan precision is limited to milliseconds, microsecond arguments are ignored |
| `FABLE0106` | Private representation flag is ignored |
| `FABLE0107` | Base64 offset, length and formatting arguments are ignored |
| `FABLE0108` | Write will behave as WriteLine |
| `FABLE0109` | Async.Start will behave as StartImmediate |
| `FABLE0110` | Task.Result and GetAwaiter().GetResult() return the task itself in JS/TS |
| `FABLE0111` | Types can only be resolved at compile time. At runtime this will be same as `typeof<obj>` |
| `FABLE0112` | Cannot type test (evals to false) |
| `FABLE0113` | Ignoring base call |
| `FABLE0114` | Only inheriting from primary constructors is supported |
| `FABLE0115` | Inlined argument is being captured but is also used somewhere else. There's a risk of double evaluation |
| `FABLE0116` | CaseTest attribute is ignored: it is only supported on TypeScriptTaggedUnion cases |
| `FABLE0117` | String.Compare and String.CompareTo will be compiled as String.CompareOrdinal (Rust) |
| `FABLE0118` | Rust chars are Unicode scalar values, so surrogate tests will be false |
| `FABLE0119` | Support for F# static and module do bindings is disabled by default (Rust) |
| `FABLE0120` | Regex flag is not supported in Php |
