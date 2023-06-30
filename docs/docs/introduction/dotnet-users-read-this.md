---
title: Are you a .NET developer?
layout: standard
---

Hi!

We're happy you decided to try Fable.

## Fable brings some .NET familiarity

Since it's F# you probably wonder how Fable interacts with your .NET environment.

For starters, using F# for fable apps is very similar to using F# for .NET apps:

1. Fable projects use standard `.fsproj` project files (which can also be part of `.sln` solutions) or `.fsx` scripts
2. You can use well-known .NET/F# tools like [NuGet](https://www.nuget.org/), [Paket](http://fsprojects.github.io/Paket/), [Fake](https://fake.build/) or [Fun.Build](https://github.com/slaveOftime/Fun.Build) to manage dependencies or your build
3. You can use any F# editor like [Visual Studio](https://visualstudio.microsoft.com/fr/), [Ionide](https://ionide.io/) or [Rider](https://www.jetbrains.com/rider/)
4. Many common classes and routines from the **System** namespace have been mapped to Fable to provide a familiar interface for very common things, such as `DateTime`, `Math`, `String`, etc.
5. Most of **FSharp.Core** is also supported. Check the [.NET and F# Compatibility](/docs/dotnet/compatibility.html) section.

## Fable is JavaScript/TypeScript/Rust/...

Although Fable brings a lot of familiarity for F# and .NET developers, the target runtime still is important. Indeed, Fable doesn't try to reinvent the wheel but instead embrace the target ecosystem.

### Fable workflow

*The following example use JavaScript but the same is true for the other targets*

For example, if the workflow when using a standard JavaScript project is:

1. Write `*.js` files
1. Use JavaScript dependencies manager
1. Use JavaScript build tools
1. Run the app

Then when using Fable, the workflow become is:

1. Write F# files
1. *Optional:* Consume the generated files `*.fs.js` from your `*.js` files
1. Use JavaScript dependencies manager
1. Use JavaScript build tools
1. Run the app

As you can see when using Fable, you still need to understand the target ecosystem. This has the benefit of not having to learn a completely new set of tools and libraries and benefit from the innovation of the target ecosystem.

It also allows us, to focus on improving the things that brings values to Fable like support more F# features, improve the generated code, improve the build time, etc.

If you don't already know the target ecosystem it may seems like a lot to take in at once, but the community is always happy to help and produced a lot of great resources (blog, templates, documentation, ...) to help you get started.

### NuGet packages

It is possible to use NuGet packages in Fable projects. However, these packages needs to be compatible with Fable. The easiest way to find a package is go to [Fable packages](https://fable.io/packages/). You can then filter by target or package type.
