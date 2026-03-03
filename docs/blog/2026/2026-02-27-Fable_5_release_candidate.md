---
layout: fable-blog-page
title: Announcing Fable 5 Release Candidate
author: Mangel Maxime
date: 2026-02-27
author_link: https://twitter.com/MangelMaxime
author_image: https://github.com/MangelMaxime.png
# external_link:
abstract: |
    Fable 5 RC is Here: New Targets, Better Tooling, and Nullness Support
---

More than 1 year after the first alpha release, we are happy to announce that Fable 5 is now in release candidate stage!

You can install Fable 5 by running the following command:

```bash
# This is only necessary if you haven't installed any dotnet tool yet in the directory
dotnet new tool-manifest

dotnet tool install fable --prerelease
```

If you already have Fable installed, you can update it by running:

```bash
dotnet tool update fable --prerelease
```

:::info
When upgrading, make sure to upgrade your dependencies as well.
:::

## Compatibility with Fable 4

Fable 5 is compatible with Fable 4 projects, except that it is now a `net10.0` tool.

## Project cracking

We remove support for the old project cracker using Buildalyzer. It is now replaced by invoking MSBuild directly, which should be more robust for the future.

## `WarnAsError` support

It has been a long-standing request to support `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>` in Fable, and we are happy to announce that it is now supported in Fable 5.

You can enable it in your project file like this:

```xml
<PropertyGroup>
  <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
</PropertyGroup>
```

Fable will now treat all warnings from **your** code as errors, but it will still allow warnings from dependencies.

This behavior should mimic how standard F# compiler works.

## .NET 10 and F# 10 support

Fable 5 add support for the following F# features:

* [Nullable reference types](https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#nullable-reference-types)
* [Discriminated union <code>.Is*</code> properties](https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#discriminated-union-is-properties)
* [Partial active patterns can return <code>bool</code> instead <code>unit option</code>](https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#partial-active-patterns-can-return-bool-instead-of-unit-option)
* [Empty-bodied computation expressions](https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#empty-bodied-computation-expressions)
* [Updates to the standard library (FSharp.Core)](https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#updates-to-the-standard-library-fsharpcore)

## JavaScript / TypeScript

JavaScript target is still the most used and stable target, and we kept improving it during the last year.

### Supports direct nested types when using `jsOptions`

```fs
    let opts =
        jsOptions<Level1> (fun o ->
            o.level2.level3.valueA <- 10
            o.level2.level3.valueB <- 20
            o.topValueA <- 20
        )
```

generates

```js
export const opts = {
    level2: {
        level3: {
            valueA: 10,
            valueB: 20,
        },
    },
    topValueA: 20,
};
```

### Simplify `Pojo` bindings

Fable has a number of ways to create [Plain Old JavaScript Objects](https://fable.io/docs/javascript/features.html#plain-old-javascript-objects) (POJOs).

In Fable 4, people discovered a way of abusing a combination of attributes to write POJO bindins in a F# natural way.

```fs
open Fable.Core

[<AllowNullLiteral>]
[<Global>]
type Options
    [<ParamObject; Emit("$0")>]
    (
        searchTerm: string,
        ?isCaseSensitive: bool
    ) =
    member val searchTerm: string = jsNative with get, set
    member val isCaseSensitive: bool option = jsNative with get, set

let options1 = new Options("foo")

let options2 = new Options("foo", isCaseSensitive = true)
```

Improving on this, Fable 5 introduce a new attribute, `Pojo`, that can be used to write the same code with only one attribute:

```fs
open Fable.Core

[<AllowNullLiteral>]
[<JS.Pojo>]
type Options
    (
        searchTerm: string,
        ?isCaseSensitive: bool
    ) =
    member val searchTerm: string = jsNative with get, set
    member val isCaseSensitive: bool option = jsNative with get, set

let options1 = new Options("foo")

let options2 = new Options("foo", isCaseSensitive = true)
```

Both examples generate the same JavaScript code:

```js
export const options1 = {
    searchTerm: "foo",
};

export const options2 = {
    searchTerm: "foo",
    isCaseSensitive: true,
};
```

## Python

If you have been following the Fable 5 alpha releases, you know the Python target has received a staggering amount of love.

This is all thanks to Dag and early adopters who have been testing it.

* **Python 3.12-3.14 support** (3.10/3.11 are deprecated)
* **fable-library via PyPI** - No more bundled runtime files
* **Modern type parameter syntax** - Better type hinting in generated code
* **`Py.Decorate` attribute** - Add Python decorators from F#
* **`Py.ClassAttributes` attribute** - Fine-grained class generation control
* **Improved Pydantic interop** - First-class support for data validation

### Rust Core with PyO3

One of the biggest changes is that the core of fable-library is now written in Rust using PyO3.
The motivation is **correctness**, not performance:

**Why Rust?**

* **Correct .NET semantics** - Sized/signed integers (int8, int16, int32, int64, uint8, etc.)
* **Proper overflow behavior** - Matches .NET exactly
* **Fixed-size arrays** - No more Python list quirks for byte streams
* **Reliable numerics** - Fable 4's pure Python numerics were a constant source of bugs

### fable-library via PyPI

Before Fable v5, the runtime was bundled in the NuGet package and copied to your output directory.

Now it's a simple pip/uv dependency:

```bash
# Install with pip
pip install fable-library

# Or with uv (recommended)
uv add fable-library
```

:::info
You can learn more about Fable.Python in general on our [documentation](https://fable.io/docs/python/build-and-run.html) or this [blog post](https://cardamomcode.dev/fable-python#heading-introduction-to-fablepython)
:::

## Rust

Rust target kept improving as well, and is now using Rust 2024 language edition.

## Hello Erlang/BEAM !

Dag Brattli added a new target for Erlang/BEAM, which is still in early stages.

He has been testing is using [Fable.Giraffe](https://github.com/dbrattli/Fable.Giraffe) and the first results are promising:

> ## Benchmarks
>
> Simple `/ping` endpoint returning "pong", 10,000 requests with 100 concurrent
> connections (oha):
>
> | Metric | BEAM | .NET | Python |
> |---|---|---|---|
> | Requests/sec | 124,256 | 70,375 | 4,006 |
> | Avg latency | 0.79 ms | 1.40 ms | 24.9 ms |
> | P99 latency | 2.49 ms | 3.50 ms | 34.2 ms |

Indeed, it seems like Erlang/BEAM is a great target for Fable, and we are excited to see how it evolves in the future.

## Conclusion

Fable 5 would not have been possible without the help of many people who contributed to it in different ways, from testing, to reporting issues, to contributing code.

Thank you all for your help and support during the last year, and we hope you will continue to help us in the future to make Fable even better!
