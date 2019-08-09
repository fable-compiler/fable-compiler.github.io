---
title: Numbers
---

# Numbers

In Fable, we use F# numeric types, which are all translated to JS Number (64-bit floating type) at the exception of `int64`, `uint64` and `bigint`.

### Integers

| |8 bit (Signed)|8 bit(Unsigned)|16 bit (Signed)|16 bit(Unsigned)|32 bit (Signed)| 32 bit (Unsigned)|64 bit (Signed)|64 bit (Unsigned)|Unlimited precision|
|-------:|------:|------:|------:|------:|------:|------:|------:|------:|------:|
|F#|sbyte|byte|int16|uint16|int|uint32|int64|uint64|bigint|
|Suffix|y|uy|s|us|u|L|UL|I
|Example|99y|99uy|99s|99us|99|99u|99L|99UL|99I

### Float

You can either use `float`, `double`. 

### TypedArray

| JS | Fable |
|-------:|------:|
|Int8Array|sbyte[]|
|UInt8Array|byte[]|
|Int16Array|short[]|
|UInt16Array|ushort[]|
|Int32Array|int[]|
|UInt32Array|uint[]|
|Float32Array|float32[]|
|Float64Array|float64[]|


### More information
Check these links: 
- [Official doc](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/basic-types)
- [Built-in .NET types](https://fsharpforfunandprofit.com/posts/cli-types/)
- [ArithmeticTests](https://github.com/fable-compiler/Fable/blob/master/tests/Main/ArithmeticTests.fs)
- [ConvertTests](https://github.com/fable-compiler/Fable/blob/master/tests/Main/ConvertTests.fs)
