---
title: Are you a .NET developer?
---

Hi!

We're happy you decided to try Fable, which is F# fully transpiled to JavaScript.

## Fable brings some .NET familiarity

Since it's F# you probably wonder how Fable interacts with your .NET environment.

For starters, using F# for fable apps is very similar to using F# for .NET apps:

1. Fable projects use standard `.fsproj` project files (which can also be part of `.sln` solutions) or `.fsx` scripts
2. You can use well-known .NET/F# tools like NuGet, Paket or Fake to manage dependencies or your build
3. You can use any F# editor like Visual Studio, Ionide or Rider
4. Many common classes and routines from the **System** namespace have been mapped to Fable to provide a familiar interface for very common things, such as `DateTime`, `Math`, `String`, etc.
5. Most of **FSharp.Core** is also supported. Check the ".NET and F# Compatibility" section.

## Fable is JavaScript

Although Fable brings a lot of familiarity for F# and .NET developers, the target runtime is JavaScript. This difference impacts several important areas:

* Your web UI depenendcies will be NPM dependencies, not .NET dependencies
* Your build tools will include web app development tools (e.g., webpack)
* Runtime behavior will be based on JavaScript semantics, not .NET semantics

There are some NuGet packages you can add into an F# project, but these packages have to also target Fable. Otherwise, your dependencies will directly by NPM dependencies. Please check the "Author a Fable library" section to learn more, especially if you are a library author and would like to make your package compatible with Fable.

These differences may seem like a lot to take in at once, but they're important for building robust applications. There have been efforts in the past to try and "magically" turn .NET code into JS, and these all tend to fail. The reality is that your target runtime environment will affect how your app runs and how you build it. However, once you internalize this, you'll find that using F# for web apps with Fable is incredibly productive, making web programming a lot more joyful than just using JavaScript or TypeScript!
