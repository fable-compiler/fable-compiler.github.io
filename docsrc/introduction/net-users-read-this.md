---
title: Are you a .NET developer?
---

## Welcome to JavaScript!

Hi!

We're happy you decided to try Fable which is basically F# transpiled to JavaScript.

Since it's F# you probably wonder how Fable interacts with your .NET environment. Let's see:

1. While this is not at all required, Fable project can use dotnet solutions
2. Fable apps can be coded using script `.fsx` files
3. Fable projects use `.fsproj` project files
4. You can use NuGet and of course, Paket
5. You can use fake scripts if you wish.
6. A great part of the **System** namespace has been mapped to Fable: DateTime, Math, String, Collections, etc...
7. **Full F# support**.

The only limitation, since we're talking to JavaScript code, is that while Fable can load F# libraries they either need to be coded in pure F# (no .NET bindings) or target Fable. **We don't support .NET libraries.**
