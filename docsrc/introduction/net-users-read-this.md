---
title: Are you a .NET developer?
---

## Welcome to JavaScript!

Hi!

We're happy you decided to try Fable which is basically F# transpiled to JavaScript.

Since it's F# you probably wonder how Fable interacts with your .NET environment. Let's see:

1. Fable projects use standard `.fsproj` project files (which can also be part of `.sln` solutions) or `.fsx` scripts
2. You can use well-known .NET/F# tools like NuGet, Paket or Fake
3. You can use any F# editor like Visual Studio, Ionide or Rider.
4. Many classes from the **System** namespace have been mapped to Fable: DateTime, Math, String, Collections, etc...
5. Most of **FSharp.Core** is also supported, check the ".NET and F# Compatibility" section.

The main limitation is Fable is only compatible with libraries that are prepared to target Fable. Please check the "Author a Fable library" section.
