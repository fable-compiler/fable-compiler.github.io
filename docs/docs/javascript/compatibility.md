---
title: .NET and F# compatibility
layout: standard
---

Fable provides support for some classes of .NET BCL (Base Class Library) and most of FSharp.Core library. When possible, Fable translates .NET types and methods to native JavaScript APIs for minimum overhead.

## Common types and objects

Some F#/.NET types have [counterparts in JS](/../dotnet/compatibility.html). Fable takes advantage of this to compile to native types that are more performant and reduce bundle size. You can also use this to improve interop when exchanging data between F# and JS. The most important common types are:

- **Strings and booleans** behave the same in F# and JS.
- **Chars** are compiled as JS strings of length 1. This is mainly because string indexing in JS gives you another string. But you can use a char as a number with an explicit conversion like `int16 '家'`.
- **Numeric types** compile to JS numbers, except for `long`, `decimal` and `bigint`.
- Sine Fable 4.0.5, `int64`, `uint64` are represented using native JS BigInt
- **Arrays** (and `ResizeArray`) compile to JS arrays. _Numeric arrays_ compile to [Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) in most situations, though this shouldn't make a difference for most common operations like indexing, iterating or mapping. You can disable this behavior with [the `typedArrays` option](https://www.npmjs.com/package/fable-loader#options).
- Any **IEnumerable** (or `seq`) can be traversed in JS as if it were an [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables).
- Mutable **dictionaries** (not F# maps) compile to [ES2015 Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).
- Mutable **hashsets** (not F# sets) compile to [ES2015 Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

> If the dictionary or hashset requires custom or structural equality, Fable will generate a custom type, but it will share the same properties as JS maps and sets.

- **Objects**: As seen above, only record fields and interface members will be attached to objects without name mangling. Take this into account when sending to or receiving an object from JS.

```fsharp
type MyRecord =
    { Value: int
      Add: int -> int -> int }
    member this.FiveTimes() =
        this.Value * 5

type IMyInterface =
    abstract Square: unit -> float

type MyClass(value: float) =
    member __.Value = value
    interface IMyInterface with
        member __.Square() = value * value

let createRecord(value: int) =
    { Value = value
      Add = fun x y -> x + y }

let createClass(value: float) =
    MyClass(value)
```

```js
import { createRecord, createClass } from "./Tests.fs"

var record = createRecord(2);

// Ok, we're calling a record field
record.Add(record.Value, 2); // 4

// Fails, this member is not actually attached to the object
record.FiveTimes();

var myClass = createClass(5);

// Fails
myClass.Value;

// Ok, this is an interface member
myClass.Square(); // 25
```

## .NET Base Class Library

The following classes are translated to JS and most of their methods (static and instance) should be available in Fable.
 
.NET                                  | JavaScript
--------------------------------------|----------------------------
Numeric Types                         | number
Arrays                                | Array / Typed Arrays
Events                                | fable-core/Event
System.Boolean                        | boolean
System.Char                           | string
System.String                         | string
System.Guid                           | string
System.TimeSpan                       | number
System.DateTime                       | Date
System.DateTimeOffset                 | Date
System.DateOnly                       | Date
System.TimeOnly                       | number
System.Timers.Timer                   | fable-core/Timer
System.Collections.Generic.List       | Array
System.Collections.Generic.HashSet    | Set
System.Collections.Generic.Dictionary | Map
System.Text.RegularExpressions.Regex  | RegExp
System.Lazy                           | fable-core/Lazy
System.Random                         | {}
System.Math                           | (native JS functions)

The following static methods are also available:

- `System.Console.WriteLine` (also with formatting)
- `System.Diagnostics.Debug.WriteLine` (also with formatting)
- `System.Diagnostics.Debug.Assert(condition: bool)`
- `System.Diagnostics.Debugger.Break()`
- `System.Activator.CreateInstance<'T>()`

There is also support to convert between numeric types and to parse strings, check [the conversion tests](https://github.com/fable-compiler/Fable/blob/main/tests/Js/Main/ConvertTests.fs).

:::info
Interfaces coming from .NET BCL (like System.Collections.IEnumerator) are mangled by default.

See [Name mangling](/docs/javascript/features.html#name-mangling) for more information.
:::

### Caveats

- All numeric types become JS `number` (64-bit floating type), except for `int64`, `uint64`, `bigint` and `decimal`. Check the [Numeric Types](numbers.html) section to learn more about the differences between .NET and JS.
- Numeric arrays are compiled to [Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) when possible.
- No bound checks for numeric types (unless you do explicit conversions like `byte 500`) nor for array indices.
- `Regex` will always behave as if passed `RegexOptions.ECMAScript` flag (e.g., no negative look-behind or named groups).

## FSharp.Core

Most of FSharp.Core operators are supported, as well as formatting with `sprintf`, `printfn` or `failwithf` (`String.Format` is also available).
The following types and/or corresponding modules from FSharp.Core lib will likewise translate to JS:

.NET              | JavaScript
------------------|----------------------------------------------------------
Tuples            | Array
Option            | (erased)
Choice            | fable-core/Choice
Result            | fable-core/Result
String            | fable-core/String (module)
Seq               | [Iterable](http://babeljs.io/docs/learn-es2015/#iterators-for-of)
List              | fable-core/List
Map               | fable-core/Map
Set               | fable-core/Set
Async             | fable-core/Async
Event             | fable-core/Event (module)
Observable        | fable-core/Observable (module)
Arrays            | Array / Typed Arrays
Events            | fable-core/Event
MailboxProcessor  | fable-core/MailboxProcessor (limited support)

### Caveats II

- Options are **erased** in JS (`Some 5` becomes just `5` in JS and `None` translates to `null`). This is needed for example, to represent TypeScript [optional properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties). However in a few cases (like nested options) there is an actual representation of the option in the runtime.
- `Async.RunSynchronously` is not supported.
- `MailboxProcessor` is single-threaded in JS and currently only `Start`, `Receive`, `Post` and `PostAndAsyncReply` are implemented (`cancellationToken` or `timeout` optional arguments are not supported).

## Object Oriented Programming

Most of F# OOP features are compatible with Fable: interfaces and abstract classes, structs, inheritance, overloading, etc. However, please note that due to some limitations of [ES2015 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) the generated code uses the [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) instead. Also note that instance members are not attached to the prototype, which means they won't be accessible from native JS code. The exception to this rule are the implementations of **interface and abstract members**.

### Caveats III

- It's not possible to type test against interfaces or generic types.

## Reflection and Generics

There is some reflection support in Fable, you can check the [reflection tests](https://github.com/fable-compiler/Fable/blob/main/tests/Js/Main/ReflectionTests.fs) to see what is currently possible.

Generics are erased by default in the generated JS code. However, it is still possible to access generic information (like `typeof<'T>`) at runtime by marking functions with `inline`:

```fsharp
let doesNotCompileInFable(x: 'T) =
    typeof<'T>.FullName |> printfn "%s"

let inline doesWork(x: 'T) =
    typeof<'T>.FullName |> printfn "%s"

doesWork 5
```
