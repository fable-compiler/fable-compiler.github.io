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

## Numeric types


In Fable, we use F# numeric types, which are all translated to JS Number (64-bit floating type) at the exception of `int64`, `uint64`, `bigint` and `decimal`.

Fable numbers are very nearly compatible with .NET semantics, but translating into Javascript types has consequences:

* (non-standard) All floating point numbers are implemented as 64 bit (`double`). This makes `float32` numbers more accurate than expected.
* (non-standard) Arithmetic integers of 32 bits or less are implemented with different truncation from that expected, as whole numbers embedded within `double`.
* (OK) Conversions between types are correctly truncated.
* (OK) Bitwise operations for 64 bit and 32 bit integers are correct and truncated to the appropriate number of bits.
* (non-standard) Bitwise operations for 16 bit and 8 bit integers use the underlying JavaScript 32 bit bitwise semantics. Results are not truncated as expected, and shift operands are not masked to fit the data type.
* (OK) Longs have a custom implementation which is identical in semantics to .NET and truncates in 64 bits, although it is slower.

32 bit integers thus differ from .NET in two ways:

* Underlying 52 bit precision, without expected truncation to 32 bits on overflow. Truncation can be forced if needed by `>>> 0`.
* On exceeding 52 bits absolute value floating point loses precision. So overflow will result in unexpected lower order 0 bits.

The loss of precision can be seen in a single multiplication:

```fsharp
((1 <<< 28) + 1) * ((1 <<< 28) + 1) >>> 0
```

The multiply product will have internal double representation rounded to `0x0100_0000_2000_0000`. When it is truncated to 32 bits by `>>> 0` the result will be  `0x2000_0000` not the .NET exact lower order bits value of `0x2000_0001`.

The same problem can be seen where repeated arithmetic operations make the internal (non-truncated) value large. For example a linear congruence random number generator:

```fsharp
let rng (s:int32) = 10001*s + 12345
```

The numbers generated by repeated application of this to its result will all be even after the 4th pseudo-random number, when `s` value exceeds 2^53:

```fsharp
let rec randLst n s =
    match n with
    | 0 -> [s]
    | n -> s :: randLst (n-1) (rng s)

List.iter (printfn "%x") (randLst 7 1)
```

The resulting printed list of pseudo-random numbers does not work in Fable:

| Fable | .NET |
|-------:|------:|
|1|1|
|574a|574a
|d524223|d524223|
|6a89e98c|6a89e98c|
|15bd0684|15bd0685|
|3d8b8000|3d8be20e|
|50000000|65ba5527|
|0|2458c8d0|

### Workarounds

* When accurate low-order bit arithmetic is needed and overflow can result in numbers larger than 2^53 use `int64`, `uint64`, which use exact 64 bits, instead of `int32`, `uint32`.
* Alternately, truncate all arithmetic with `>>> 0` or `>>> 0u` as appropriate before numbers can get larger than 2^53: `let rng (s:int32) = 10001*s + 12345 >>> 0`

## Unsupported Attributes and Types

If your F# code contains attributes (or other types) that are not supported by Fable you will get a Compiler error similar to:
` error FSHARP: The type 'DataContract' is not defined. (code 39)`
for 
```fsharp
open System.Runtime.Serialization
[<DataContract>]
type Person = {
  [<DataMember(IsRequired = true)>] FullName: string
  [<DataMember(IsRequired = true)>] TimeOfBirth: DateTimeOffset
}
```

If you just want the attribute (or types) to be ignored in Fable you can redefine it as an empty type:

```fsharp
#if FABLE_COMPILER
namespace System.Runtime.Serialization
open System
type DataContract() = inherit Attribute()
type DataMember(IsRequired: bool) = inherit Attribute()
#endif
```



