---
layout: fable-blog-page
title: Announcing Nagareyama (Fable 3) (I)
author: Alfonso García-Caro
date: 2020-10-23
author_link: https://twitter.com/alfonsogcnunez
author_image: https://github.com/alfonsogarciacaro.png
# external_link:
abstract: |
  Next-gen Fable is here! This is the first of a series of posts to introduce the improvements this new major release brings.
---

Next-gen Fable is here! This is the first of a series of posts to introduce the improvements this new major release brings. We will start with the biggest change: Fable will now be distribute as a [dotnet tool](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools). Keep reading to learn the reasoning behind this and what improvements are happening with the change.

## Fable as a dotnet tool

It looks like ages now, but Fable 2 was originally distributed as a dotnet tool. We had many troubles though, because at the time it was not possible to pin the version per repository. Also, as the main way to use Fable was through `fable-loader` (a Webpack plugin) we decided to distribute the compiler itself through npm too: the [fable-compiler](https://www.npmjs.com/package/fable-compiler) package.

I really love npm for package distribution. You can put anything you want in there, it's very fast to list new versions and testing local development packages is quite easy. But now the dotnet team has finally fixed the problem with version-pinning and given that most of F# tools (Fake, Paket, Femto, Fantomas...) are integrating with the dotnet sdk, it makes sense for us to follow the same path. This reduces the cognitive load for the user as you can remain within the dotnet ecosystem while working in F# and move to JS with the files that have been already generated.

These are the guidelines we've followed while porting Fable as a dotnet tool:

* **Similar experience to dotnet SDK**: So you write `dotnet fable src` to compile a project in the `src` folder, and `dotnet fable watch src` to run Fable in watch mode.
* **No focus on a specific JS tool**: As we just output JS files, you can process them with any tool you want.
* **No config files**: I'm sure you already have to deal with a bunch of them in your daily work!


## Fable as a "pure" dotnet app

The problem with version pinning was not the only reason to distribute Fable through npm. Fable itself was (in part) a JS application with JS dependencies, specifically [Babel](https://babeljs.io/).

Babel made Fable possible, and the name will always be a tribute to the Babel team. It was not only a source of inspiration (I was using Babel at work for several months before starting writing Fable), but when the very first version of Fable appeared "modern" JS was still not widely supported and there were several competing standards for the "module" system. Thanks to Babel we didn't have to worry about this, users were free to choose the kind of JS they wanted to generate and we could focus on the F# transformation. Nowadays, luckily the "import/export" module and modern syntax is supported by most browsers, so we can be sure the code we generate is compatible with most environments and tooling.

BTW, if you do need Babel in your workflow to transform the generated code to a version of JS that is supported in older browsers, it's absolutely fine. If you're using Webpack just keep the `babel-loader` in place and you're done!

## Speed improvements

Removing the JS process means we don't need the inter-process communication any more, which makes Fable faster. What I didn't expect is it would make it so much faster! We will see the improvements in more detail in a later post, but just as an appetizer behold this benchmark that shows how the compilation time for Fable tests has been cut almost in half!

![Benchmark](/static/img/blog/benchmark1.jpg)

## Try it out!

"Talk is cheap, show me the code." I hear you. We've uploaded a minimal sample so you can start playing with Nagareyama, that you can find [here](https://github.com/fable-compiler/fable3-samples/tree/main/minimal). Just to show you how easy is to use the new Fable with other tools, this example uses [Parcel](https://parceljs.org/), an alternative to Webpack that promotes itself as being config-less and faster.

If you want to try upgrading your Webpack app (we're aiming at not having code breaking changes, so hopefully everything just works), please check [this PR](https://github.com/MangelMaxime/fulma-demo/pull/43) to learn the few steps you need to make your build Nagaremaya-ready.

<br />

I hope you enjoyed the post. Just remember we're still in beta phase: we will try not to make big changes but a few one may still be on the road, particularly for new features like plugins... but this belongs to the next posts :)

Have fun!
