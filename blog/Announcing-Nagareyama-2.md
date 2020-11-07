I hope you already tried out the new Fable and are enjoying it! If you haven't yet, please note the release candidate has just been published. This means we are focusing now on fixing bugs and there won't be any major change before the stable release. This is the perfect opportunity to try upgrading your app and check everything is working correctly (if it doesn't, [let us know](https://github.com/fable-compiler/Fable/issues/new)). Be confident Nagareyama has already been tested in different production apps and we have already ironed out most (if not all) issues. To install Fable 3 just run the following command (use `update` instead of `install` if you already installed the tool previously):

```
dotnet tool install fable --version "3.0.0-nagareyama-*"
```

To upgrade an existing app using Webpack, check [this guide as reference](https://github.com/MangelMaxime/fulma-demo/pull/43).

In this post we will also dive into the differences when generating JS code compared to Fable 2.

## The good news

The good news is Nagareyama aims to bring **no code breaking changes**. Besides the tooling updates described in the [previous post](https://fable.io/blog/Announcing-Nagareyama-1.html), your app should work as is when upgrading Fable!

However, it may happen your code relied on a specific and not documented implementation detail of Fable 2. In that case, please report to us to check if that is an actual regression or whether we can advise you how to adapt your code.

## And the not-so-good news

As we saw in the previous post, the main change in Nagareyama is the removal of the Babel dependency. Unfortunately, one thing Babel did for us and we couldn't implement yet is the [source-maps](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) (which let you debug the F# code in the browser or in VS Code instead of the generated JS). If you relied on source-maps when programming with Fable, please help us [bring them back](https://github.com/fable-compiler/Fable/issues/2166).

## Better name-mangling

To compensate the lack of source-maps, when implementing our own JS printers we've also tried to make the generated JS code "prettier" so it's more readable and easier to debug directly. A very important point was the mangling of value names, necessary as in JS we cannot _shadow_ values as we do in F#. Fable 2 was not very subtle here: firstly, it generated unique names _per file_, so functions arguments where mangled even if they didn't conflict in the local scope; and secondly, it used the `$` character (legal in JS but not in F# unless you use quotes) quite aggressively making the code more difficult to read. Nagareyama fixes this by using member scope instead and reducing the use of the dollar sign.

A simple example can be seen here. This is how Fable 2 compiled the following function:

```fsharp
let map3 f xs ys zs =
    fold3 (fun acc x y z -> f x y z::acc) [] xs ys zs
    |> reverse
```

```js
export function mapIndexed3(f$$21, xs$$42, ys$$14, zs$$4) {
  const xs$$43 = foldIndexed3(function (i$$6, acc$$16, x$$22, y$$7, z$$3) {
    return new List(f$$21(i$$6, x$$22, y$$7, z$$3), acc$$16);
  }, new List(), xs$$42, ys$$14, zs$$4);
  return reverse(xs$$43);
}
```

The same function compiled with Nagareyama results in much cleaner code:

```js
export function mapIndexed3(f, xs, ys, zs) {
    const xs_1 = foldIndexed3((i, acc, x, y, z) => (new List(f(i, x, y, z), acc)), new List(), xs, ys, zs);
    return reverse(xs_1);
}
```

## JS classes

By default, Fable 2 used JS function constructors and prototype inheritance, though there was a compiler flag (rarely used) to generate ES2015 classes instead. In Fable 3 this is the default now (the only one option indeed), which makes the code more recognizable both to programmers (the C#-like class syntax is very extended) and to JS tooling.

Please note however, class members are still implemented as static functions (with a hash suffix to disambiguate overloads). This is the way F# actually compiles the code, and it also plays better with tree shaking and results in more perfomant code because JIT JS compilers can link the calls statically.

## Improvements in fable-library

We've made several improvements to the fable-library (containing the code Fable uses to replace calls to BCL/FSharp.Core). The biggest one being the inclusion of the new implementation of [F# Map and Set in FSharp.Core](https://github.com/dotnet/fsharp/pull/10188) by Victor Baybekov. This brings a huge performance improvement to these immutable collections (they will be noticeably only if your app makes heavy use of Map and/or Set though). Fable's mysterious contributor, [ncave](https://github.com/ncave), is also working on a new implementation for immutable lists that hopefully can make it into Fable 3.0 or 3.1.

## Prevent V8 deoptimizations

If you are somewhat familiar with how JS engines work and in particular V8, the most ubiquitous one, you probably know the JS performance-killers are deoptimizations: that is, when the engine makes an assumption about a function and generates optimized code for that, to later realize the function is being called in a different way than expected (we all know how many weird ways there are to run JS code).

There was already a big leap in the performance of the generated JS code when moving from Fable 1 to Fable 2, so this time there were not many obvious opportunities for optimization. However, ncave and [Chris van der Pennen](https://github.com/chrisvanderpennen) have been working hard to identify the remaining ones, like stack traces in custom exceptions or getters in object literals, in order to fix them and make sure the JS code generated by Nagareyam doesn't include any performance pitfall.

<br />

That was all, folks. We are very close to the stable Fable 3 version so please help us identify the remaining issues by giving the release candidate a go. In the next posts we will review the actual new features in Nagareyama (not so many) and go into more detail about the speed improvements in the compiler itself.
