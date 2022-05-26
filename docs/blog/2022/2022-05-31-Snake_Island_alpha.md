---
layout: fable-blog-page
title: Announcing Snake Island (Fable 4) Alpha Release
author: ncave, Dag Brattli, Alfonso García-Caro
date: 2022-05-31
author_link: https://twitter.com/fablecompiler
author_image: https://github.com/fable-compiler.png
# external_link:
abstract: |
---

Hey there everybody! It's been some time without Fable news but we're bringing you something today that we hope will get you excited :) Today we're announcing the first **alpha** release of Snake Island, codename for Fable 4. If you've been following us on Twitter you'll probably know this the most ambitious Fable release to date, extending the compilation targets for F# beyond JS, and include languages like Python, Rust or Dart. The ultimate goal is to convert F# into a super-powerful DSL you can use to design your programs and algorithms and still have the freedom to choose the platform you want to run your code on. (TODO: Also mention the benefits of interacting with other ecosystem and communities)

Please see below for specific details about each of the new language targets and how you can try this one.

:::warning
Don't update your current Fable JS projects just yet. In principle, everything should work the same as we're aiming for no breaking changes. But there won't be many JS new features (except for JSX compilation, see below) and compiler plugins do need to be updated. So if you're using `ReactComponent` attribute in your project, it won't work yet with Snake Island.
:::

## Python

...

## Rust

...

You can track the current progress for Rust compilation [here](https://github.com/fable-compiler/Fable/issues/2703).

## Dart

...

You can track the current progress for Dart compilation [here](https://github.com/fable-compiler/Fable/issues/2877).

## JSX

...


<br />

Hopefully you're now as excited as we are! You can give Snake Island a go right now by following the instructions for each language above or installing it locally specifying the `snake-island` version range:

```
dotnet tool install fable --local --version 4.0.0-snake-island-*
```

Now you can test the different targets by calling the tool as with Fable 3 and passing the `--lang` option. For example if you want to compile a script to Python, run:

```
dotnet fable MyScript.fsx --lang python
```

:::info
Just remember that supporting the whole .NET Base Class Library is not one of Fable's goal, so calls to `System.IO` and friends won't work. Please check the current [BCL Compatibility Guide](https://fable.io/docs/dotnet/compatibility.html) for JS as reference, though the new language targets still lag behind.
:::

As mentioned above this a very ambitious project, and Fable is still an Open Source project maintained by contributors in their free time. We don't have strict roadmaps or deadlines, Snake Island has emerged because each of the contributors had a personal interest in using Fable to bring F# to an ecosystem they love (if you want Fable to target a new language, contribute!). We're still in the alpha release cycle and there are many challenges left until having a stable version. We can only overcome these challenges with the help of the community, you don't need to dive into the compiler code to fix bugs and add features, but it's very important for contributors to know their work is helping others, get feedback and receive words of encouragement (in Github or Twitter). Community contributions have been crucial for previous Fable releases, let's also bring this one to life together!

Best and Slava Ukraini!