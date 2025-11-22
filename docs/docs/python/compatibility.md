---
title: .NET and F# compatibility
layout: standard
---

:::warning
Python target is in beta meaning that breaking changes can happen between minor versions.
:::

Fable provides support for some classes of .NET BCL (Base Class Library) and most of FSharp.Core library. When possible, Fable translates .NET types and methods to native Python types for minimum overhead.

## Common types and objects

Some F#/.NET types have counterparts in Python. Fable takes advantage of this to compile to native types that are more performant and reduce code size. You can also use this to improve interop when exchanging data between F# and Python. The most important common types are:

- **Strings and booleans** behave the same in F# and Python.
- **Chars** are compiled as Python strings of length 1.
- **Numeric types** - Most numeric types are implemented using custom pyo3 wrapper types that maintain F#-style semantics while integrating with Python. Only `bigint` is translated to Python's native `int` type. See the [Numeric Types](#numeric-types) section for details.
- **Arrays** compile to custom `FSharpArray` wrappers to maintain F# semantics.
- **ResizeArray** compiles to Python `list`.
- Any **IEnumerable** (or `seq`) can be traversed in Python using the iterator protocol (`__iter__`).
- Mutable **dictionaries** (not F# maps) compile to Python `dict`. If a custom comparer is used, a custom implementation is generated.
- **Tuples** compile to Python `tuple`.

## .NET Base Class Library

The following classes are translated to Python and most of their methods (static and instance) should be available in Fable.

.NET                                   | Python
---------------------------------------|----------------------------
Numeric Types                          | Custom wrappers (see Numeric Types section)
Arrays                                 | FSharpArray (custom wrapper)
System.Boolean                         | bool
System.Char                            | str
System.String                          | str
System.Decimal                         | decimal
System.DateTime                        | datetime
System.Collections.Generic.List        | list
System.Collections.Generic.Dictionary  | dict
Anonymous Records                      | dict
Tuples                                 | tuple

## FSharp.Core

Most of FSharp.Core operators are supported, as well as formatting with `sprintf`, `printfn` or `failwithf`.
The following types and/or corresponding modules from FSharp.Core lib will translate to Python:

.NET              | Python
------------------|----------------------------------------------------------
Tuples            | tuple
Option            | (erased)
String            | str
List              | List.fs (F# immutable list)
Map               | Map.fs (F# immutable map)
Set               | Set.fs (F# immutable set)
ResizeArray       | list
Record            | dataclass (from dataclasses module)
Anonymous Record  | dict

### Caveats

- Options are **erased** in Python (`Some 5` becomes just `5` in Python and `None` translates to `None`). However in a few cases (like nested options) there is an actual representation of the option in the runtime.
- **Records** are compiled to Python dataclasses with the `@dataclass` decorator.
- **Anonymous Records** compile to Python `dict`.

## Interfaces and Protocols

.NET interfaces are mapped to Python protocols and special methods:

.NET          | Python                   | Comment
--------------|--------------------------|--------------------------
`IEquatable`  | `__eq__`                 | for determining equality of instances with method `Equals`
`IEnumerator` | `__next__`.              | for types that can be enumerated using `next()`.
`IEnumerable` | `__iter__`               | for types that can be enumerated in a `for` loop.
`IComparable` | `__lt__` + `__eq__`      | Method `CompareTo` returns 0, 1 or -1 and is implemented for types that can be ordered or sorted.
`IDisposable` | `__enter__` + `__exit__` | Every IDisposable will (and should) also implement a context manager.
`ToString`    | `__str__`                | Calls to `x.ToString()` will be translated to `str(x)`.

## Object Oriented Programming

F# OOP features like interfaces, abstract classes, inheritance, and overloading are supported. Object expressions are currently translated to classes since they can be used to implement an interface and have methods.

## Numeric types

Most numeric types are implemented using custom pyo3 wrapper types that maintain F#-style semantics while integrating with Python. Only `bigint` is translated to Python's native `int` type. The wrapper types provide proper overflow behavior, type safety, and performance optimization while remaining compatible with Python code.

F#               | .NET       | Python  | Implementation
:----------------|:-----------|---------|--------------------------------
bool             | Boolean    | bool    | Native Python type
int              | Int32      | Int32   | Custom pyo3 wrapper (ints.rs)
byte             | Byte       | UInt8   | Custom pyo3 wrapper (ints.rs)
sbyte            | SByte      | Int8    | Custom pyo3 wrapper (ints.rs)
int16            | Int16      | Int16   | Custom pyo3 wrapper (ints.rs)
int64            | Int64      | Int64   | Custom pyo3 wrapper (ints.rs)
uint16           | UInt16     | UInt16  | Custom pyo3 wrapper (ints.rs)
uint32           | UInt32     | UInt32  | Custom pyo3 wrapper (ints.rs)
uint64           | UInt64     | UInt64  | Custom pyo3 wrapper (ints.rs)
float / double   | Double     | Float64 | Custom pyo3 wrapper (floats.rs)
float32 / single | Single     | Float32 | Custom pyo3 wrapper (floats.rs)
bigint           | BigInteger | int     | Native Python type

## Type Annotations

The generated Python code includes type annotations. Fable uses Python 3.12+ syntax for type annotations and
type parameters. For example, generic types are annotated using square brackets:

```python
def length[TSOURCE](xs: FSharpList[TSOURCE]) -> int32:
    return int32(42)
```

## Arrow Functions

Python does not support multi-line lambdas. Fable transforms any arrow function into a separate function that is lifted up into the nearest statement block.

## Sequence Expressions

Sequence expressions are translated to nested functions. Python has some support for named expressions (`:=`) but only for naming new expressions. You cannot assign to an object property, for example.

## Program vs Library

Fable projects compiling to Python should set `OutputType` to `Exe` for projects having the main `EntryPoint`:

```xml
<OutputType>Exe</OutputType>
```

Such projects will be compiled with absolute imports. Python programs are not allowed to do relative imports. If the project is compiled as a `Library` (default), it will use relative imports. This is important since library modules do not know the path where they are mounted by the application using them.
