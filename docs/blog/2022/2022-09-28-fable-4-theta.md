---
layout: fable-blog-page
title: Announcing Fable 4 Theta Release
author: Alfonso García-Caro
date: 2022-09-28
author_link: https://twitter.com/alfonsogcnunez
author_image: https://github.com/alfonsogarciacaro.png
# external_link:
abstract: |
    Help us get closer to Fable 4 release!
---

We are announcing today that Fable 4 has already entered the last stage before its final release. This is an important moment because we need the support from the community to make sure there are no regressions and Fable 4 can release without breaking changes. If you have a Fable 3 project, we ask you to upgrade Fable and report any issue you may find. The best news is you don't need to change anything in your code to upgrade to Fable 4! ...except maybe updating a few packages (see below) 😊

Remember you can install Fable 4 by typing:

```
# This is only necessary if you haven't installed any dotnet tool yet in the directory
dotnet new tool-manifest

dotnet tool install fable --prerelease
```

If you already have Fable installed in the directory, use `update` instead:

```
dotnet tool update fable --prerelease
```

> If you want to know more about what to expect of the new major release, check the [previous post](https://fable.io/blog/2022/2022-06-06-Snake_Island_alpha.html).

Unless there is a critical bug, we won't publish new releases for Fable 3 anymore, so we encourage you to upgrade as soon as possible to make sure your projects will keep enjoying new features and improvements.

## Language Status

Managing versions with multiple language targets is... complicated. Should we hold Fable 4 release until all languages are considered stable? Should we split each language target into a different tool?

After some discussion within the team, we have decided to keep a single codebase and tool to maximize the synergies that have been working so well. But on the other hand, we also want to release Fable 4 as soon as possible so then community can move on and we don't need to maintain both codebases for Fable 3 and 4. To solve the conundrum, we have decided to keep a different status for each language even after releasing Fable 4 "stable". You will see one of the following status when starting the tool depending on the selected language.

- **stable**: The target is ready for production projects. Please report any bug you find.

- **beta**: The target may lack some F#/FSharp.Core features but the output is not expected to change drastically, particularly in interop scenarios. Community feedback is crucial at this stage to iron out last issues and know where to focus our efforts.

- **alpha**: We're committed to making the language a working target but there's still work to do and the representation of F# types and the way to interop with native code is still subject to change.

- **experimental**: The target has been added by a contributor but it's not currently maintained and may be removed in the future. If you are interested please consider joining the team to maintain the target.

With this in mind, at the time of writing this is the status for each of the language targets.

- **JavaScript: beta** - We are aiming at no breaking changes for JS, but please note you may need to update some packages (see below). Please try upgrading your projects and let us know if you have any problem so we can fix it before the stable release.

- **Python: beta** - Python compilation has been progressing for more than a year now. We believe it will be ready for v4 release but we encourage you to try it out already so we know what are the most interesting areas to explore for F# to Python compilation.

- **Rust: alpha** - Rust compilation is already quite good, but there is still discussion going on for some compilation fundamentals, so there is still room for change.

- **TypeScript: alpha** - We're moving TypeScript from its original experimental status to alpha, this means we want to make it a working target for Fable 4 in the future, but there's still work ahead to make sure compilation is on par with JS.

- **PHP: experimental** - PHP compilation is not currently maintained.

## Packages Updated for Fable 4

A few dependencies needed updates to be compatible with Fable 4. If your project includes some of them, please be sure to use the versions listed below (or higher) before upgrading to Fable 4.

- Thoth.Json v6.0
- Fable.SimpleJson v3.24
- Feliz v2.0.0-prerelease-003

> **Attention**: We're also taking the chance to make some restructuring of Fable.React. If your project includes packages that depend on Fable.React v8 or lower (like Fable.Elmish.React v3), they may break. You can keep using Feliz v1 instead and add the package **Feliz.CompilerPlugins v2.0.0-prerelease-003** (or higher). Note this is only necessary if you use the `ReactComponent` attribute.

## Testing other Languages

Please check the [previous post](https://fable.io/blog/2022/2022-06-06-Snake_Island_alpha.html). The samples for Python ([this](https://github.com/fable-compiler/Fable.Python/tree/main/examples#readme) or [this](https://github.com/alfonsogarciacaro/fable-py-sample)), Rust([this](https://github.com/ncave/fable-raytracer) or [this](https://github.com/alfonsogarciacaro/fable-rust-sample)) and [Dart](https://github.com/alfonsogarciacaro/fable-flutterapp) are still useful to quickly try out each target.

## Why Theta?

We wanted to make the version shorter to make it easier to install, however Nuget sorts prerelease versions alphabetically and `beta` was considered as older than `snake-island-alpha`. We didn't have many options left in the Greek alphabet so we picked Theta: θ