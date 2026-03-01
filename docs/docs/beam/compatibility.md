---
title: .NET and F# compatibility
layout: standard
toc:
  to: 4
---

:::warning
Beam target is in alpha meaning that breaking changes can happen between minor versions.
:::

Fable provides support for some classes of .NET BCL (Base Class Library) and most of FSharp.Core library. When possible, Fable translates .NET types and methods to native Erlang types for minimum overhead.

## Common Types and Objects

Many F#/.NET types have natural counterparts in Erlang. Fable takes advantage of this to compile to native types that are more performant and idiomatic:

- **Strings** compile to Erlang binaries (`<<"hello">>`).
- **Booleans** compile to Erlang atoms (`true` / `false`).
- **Chars** are compiled as strings of length 1.
- **Integers** use Erlang's native arbitrary-precision integers. Unlike Python and JavaScript, no wrapper types are needed for `int`, `int64`, or `bigint`.
- **Floats** use Erlang's native `float()` type.
- **Tuples** compile directly to Erlang tuples (`{A, B, C}`).
- **Lists** (`list<T>`) compile to Erlang linked lists — both languages use cons cells, making this a perfect fit.
- **Arrays** compile to process dictionary references wrapping Erlang lists (for mutability). Byte arrays use `atomics` for O(1) read/write.
- **ResizeArray** compiles to process dictionary references with list mutation helpers.
- Any **IEnumerable** (or `seq`) can be traversed using Erlang's iterator patterns.
- **Maps** (`Map<K,V>`) compile to Erlang native maps (`#{}`).
- **Sets** (`Set<T>`) compile to Erlang `ordsets` (sorted lists).
- Mutable **dictionaries** compile to process dictionary references wrapping Erlang maps.
- **Unit** compiles to the `ok` atom.

## .NET Base Class Library

The following classes are translated to Erlang and most of their methods (static and instance) should be available in Fable.

.NET                                   | Erlang
---------------------------------------|----------------------------
Numeric Types                          | Native integers and floats
Arrays                                 | Process dict refs (lists / atomics for byte[])
System.Boolean                         | `true` / `false` atoms
System.Char                            | Binary (string of length 1)
System.String                          | Binary (`<<"...">>`")
System.Decimal                         | Custom fixed-scale integer
System.DateTime                        | `{Ticks, Kind}` tuple
System.DateTimeOffset                  | `{Ticks, OffsetTicks, Kind}` tuple
System.TimeSpan                        | Ticks-based integer
System.Guid                            | UUID v4 binary
System.Uri                             | URI binary with parsing
System.Text.RegularExpressions.Regex   | Erlang `re` module (PCRE)
System.Text.StringBuilder              | Mutable binary builder
System.Collections.Generic.List        | Process dict ref (list)
System.Collections.Generic.Dictionary  | Process dict ref (map)
System.Collections.Generic.HashSet     | Process dict ref (map-based set)
System.Collections.Generic.Queue       | Process dict ref (Erlang queue)
System.Collections.Generic.Stack       | Process dict ref (list)
System.Diagnostics.Stopwatch           | `erlang:monotonic_time`
Records                                | Erlang maps (`#{}`)
Anonymous Records                      | Erlang maps (`#{}`)
Tuples                                 | Erlang tuples (`{}`)

## FSharp.Core

Most of FSharp.Core operators are supported, as well as formatting with `sprintf`, `printfn`, or `failwithf`.
The following types and/or corresponding modules from FSharp.Core lib will translate to Erlang:

.NET              | Erlang
------------------|----------------------------------------------------------
Tuples            | Erlang tuples
Option            | (erased) — `Some(x)` = `x`, `None` = `undefined`
String            | Binary
List              | Erlang linked list (cons cells)
Map               | Erlang native map (`#{}`)
Set               | `ordsets` (sorted list)
ResizeArray       | Process dict ref (list)
Record            | Erlang map (`#{}`)
Anonymous Record  | Erlang map (`#{}`)
Result            | `{ok, Value}` / `{error, Error}`
Async             | CPS function `fun(Ctx) -> ... end`
Task              | Alias for Async on Beam

### Caveats

- Options are **erased** in Erlang (`Some 5` becomes just `5` and `None` becomes `undefined`). Nested options use wrapped representation (`{some, x}`) to avoid ambiguity.
- **Records** compile to Erlang maps with snake_case atom keys.
- **Anonymous Records** also compile to Erlang maps.
- **Result** maps to Erlang's idiomatic `{ok, V}` / `{error, E}` convention.
- **Unit** is represented as the `ok` atom, which is distinct from `undefined` (None) — unlike JS/Python where both map to similar concepts.

## Interfaces and Protocols

F# interfaces compile to Erlang maps of closures (dispatch maps):

.NET          | Erlang                       | Comment
--------------|------------------------------|------------------------------------
`IEquatable`  | Native `=:=`                 | Deep structural equality on all types
`IEnumerator` | Iterator pattern             | `next()` style iteration
`IEnumerable` | List iteration               | `for` loop / `lists:foreach`
`IComparable` | Native `<`, `>`, `=<`, `>=`  | Works on all Erlang terms
`IDisposable` | Manual cleanup               | No `with` statement equivalent
`ToString`    | `fable_string:to_string/1`   | String formatting

## Object Oriented Programming

F# OOP features like interfaces, abstract classes, inheritance, and overloading are supported. Object expressions compile to Erlang maps of closures.

## Numeric Types

Erlang has native arbitrary-precision integers, making integer support much simpler than on JavaScript or Python targets. No wrapper types or Rust NIFs are needed:

F#               | .NET       | Erlang       | Notes
:----------------|:-----------|:-------------|----------------------------------
bool             | Boolean    | `true`/`false` atoms | Native
int              | Int32      | `integer()`  | Native arbitrary-precision
byte             | Byte       | `integer()`  | Native
sbyte            | SByte      | `integer()`  | Native
int16            | Int16      | `integer()`  | Native
int64            | Int64      | `integer()`  | Native (no BigInt library needed)
uint16           | UInt16     | `integer()`  | Native
uint32           | UInt32     | `integer()`  | Native
uint64           | UInt64     | `integer()`  | Native
float / double   | Double     | `float()`    | Native IEEE 754
float32 / single | Single     | `float()`    | Native IEEE 754
decimal          | Decimal    | Custom       | Fixed-scale integer implementation
bigint           | BigInteger | `integer()`  | Native (Erlang integers ARE arbitrary-precision)

### Erlang Advantage: No Wrapper Types Needed

Unlike the Python target which requires custom PyO3/Rust wrapper types for sized integers (~1200 lines), Erlang handles all integer operations natively. Sized integer wrapping (when needed for overflow semantics) uses Erlang's bit syntax:

```erlang
%% Wrapping int32 arithmetic — pure Erlang, no NIF
wrap32(N) ->
    <<V:32/signed-integer>> = <<N:32/signed-integer>>,
    V.
```

## Reflection

Full `FSharp.Reflection` support is available via `fable_reflection.erl`:

- `FSharpType.IsTuple`, `IsRecord`, `IsUnion`, `IsFunction`
- `FSharpType.GetTupleElements`, `GetRecordFields`, `GetUnionCases`
- `FSharpValue.GetRecordFields`, `MakeRecord`
- `FSharpValue.GetTupleFields`, `MakeTuple`, `GetTupleField`
- `FSharpValue.GetUnionFields`, `MakeUnion`
- `PropertyInfo.GetValue`

## Async and Concurrency

F# async workflows use CPS (Continuation-Passing Style) where `Async<T>` = `fun(Ctx) -> ok end` with a context map containing `on_success`, `on_error`, `on_cancel`, and `cancel_token`.

F#                          | Erlang
----------------------------|---------------------------------------
`async { return x }`        | CPS function with `on_success` callback
`let! x = comp`             | `bind(Comp, fun(X) -> ... end)`
`Async.RunSynchronously`    | CPS invocation in same process
`Async.Parallel`            | `spawn` per computation, `receive` to collect
`Async.Sleep`               | `timer:sleep(Ms)`
`task { return x }`         | Same as async (alias on Beam)

### CancellationToken

Full cancellation support via `fable_cancellation.erl`:

- `CancellationTokenSource` — create, cancel, cancel after timeout
- `Register` / `Unregister` — listener management
- `IsCancellationRequested` — poll cancellation state
- Timer-based auto-cancel via `cancel_after`

## Observable

Full `Observable` module support:

- `subscribe`, `add`, `choose`, `filter`, `map`
- `merge`, `pairwise`, `partition`, `scan`, `split`

## Sequence Expressions

Sequence expressions are supported and compile to lazy evaluation:

```fs
let numbers = seq {
    yield 1
    yield 2
    yield! [3; 4; 5]
}
```

## String Formatting

Full F# format string support (`%d`, `%s`, `%.2f`, `%g`, `%x`, etc.) via `fable_string.erl` runtime:

- `sprintf` — format to string
- `printfn` — format to stdout
- `eprintfn` — format to stderr
- `failwithf` — format and throw
- `String.Format` — .NET-style positional format strings

String interpolation (`$"Hello, {name}!"`) compiles to `iolist_to_binary` with appropriate type conversions.

## Tail Call Optimization

Erlang has native tail call optimization, so recursive F# functions compile to efficient tail-recursive Erlang functions without needing a trampoline.
