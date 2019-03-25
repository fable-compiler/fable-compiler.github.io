- title: Announcing fable-compiler 2.2, Fable.Core 3 and more
- subtitle: Making maintainer's life a bit easier

## fable-compiler 2.2

Hi everybody! We've many announcements to do today. Together with a minor (but big) release of fable-compiler, we're launching new beta versions of the packages most used by the community, like Fable.Core, Elmish, Fulma or Fable.SimpleHttp. The main goal of these releases is to restructure the packages to make maintenance easier and lower the bar for contributions.

First things first, the summary of changes in fable-compiler 2.2 is as follows (full change list [here](https://github.com/fable-compiler/Fable/blob/635c0379d12ca7348b394310256105e56240408c/src/fable-compiler/RELEASE_NOTES.md)):

- Anonymous records @dsyme
- Compile .fsx scripts @nojaf
- Improve watch compilations @ncave
- Improve sourcemaps
- Fix (erased) type providers
- Many other bug fixes thanks to @chadunit, @SirUppyPancakes, @vbfox, @Zaid-Ajaj and @xdaDaveShaw!

Fable internals have gone through many changes for this release. But the good news is this time you have **absolutely nothing to do** for the update. Just run `npm install fable-compiler@latest` and be done :)

The not-so-good news is you'll have to make some changes to update the other packages, please see below.

## fable-compiler-js 1.0

But before talking about Fable libraries, let's introduce the [fable-compiler-js](https://www.npmjs.com/package/fable-compiler-js) npm package. Thanks to [ncave](https://github.com/ncave)'s magic, this is a version of fable-compiler which **runs entirely on node.js**, so it can run on a machine without dotnet installed. It's basically the engine powering the [Fable REPL](https://fable.io/repl/) adapted to node.js with a few additional capabilities, and it's also a great case of dogfooding to show what Fable is capable of.

Although we just released the stable 1.0 version, for now please consider this as an experiment. Because we don't rely on the dotnet SDK, at the moment the tool cannot download Nuget packages or resolve references on its own. For now it just does a manual parsing of .fsproj and .fsx files that only covers simple cases. One possible usage is build scripts (as Fable repo [does now](https://github.com/fable-compiler/Fable/blob/9bc3c2187c0c0a9a08ad1adb5dd144e74edf62e6/build.fsx)) if you want to have direct access to the hundreds of tools available in the node ecosystem.

## Fable.Core 3

Here's where the fun starts ;) The new Fable.Core major release doesn't contain many new additions, but the main change is renaming `Fable.Import.JS` to `Fable.Core.JS`. Changing a namespace seems like a gratuitous breaking change. However, it gives consistency to the package (it was the only module without the Fable.Core prefix) and there's a reasoning to abandon the Fable.Import prefix we will see in the next section.

Some APIs that nobody was using (or at least seemed so) have also been removed. This has been done to clean the code and also because a lighter Fable.Core increases the startup time in Fable compilations. If there's something you find missing please [open an issue](https://github.com/fable-compiler/Fable/issues/new) and we'll add it back.

> The `nameof` operator has been moved to the Fable.Core.Experimental module, so it's not opened automatically. This should prevent conflicts when the operator with the same name is added to FSharp.Core.

Please note that the new Fable.Core and the rest of the packages below are still in alpha/beta release (we don't expect more breaking changes and we'll release stable versions soon), so you need to specify the version when downloading them or use `prerelease` with Paket.

## Fable.Browser

It's possible you haven't noticed but many Fable libraries have a dependency to the monstrous `Fable.Import.Browser` package, a [single file of more than 12000 lines](https://github.com/fable-compiler/fable-import/blob/0f780da448be900287f1a0bd1af9a59fdc7680d4/Browser/Fable.Import.Browser.fs) that most IDEs struggled to open. This file was automatically generated in its origin using [ts2fable](http://fable.io/ts2fable/) from Typescript definitions. It also contained manual tweaks however, and this together with its size made it very difficult to update.

The [fable-compiler/fable-import](https://github.com/fable-compiler/fable-import/) repository also contains other bindings generated with ts2fable that suffered similar problems, even if the size wasn't so big. Because of this and after discussing with the main contributors to Fable ecosystem, we've decided to abandon the idea of having a single repository with multiple Fable bindings automatically generated, and instead encourage the community to create (and maintain) bindings that may start with ts2fable but also include another layer with more idiomatic F# code, and that don't need to start with the `Fable.Import.` prefix.

This means we're phasing out the fable-import repository and given that the browser bindings are the most used in Fable projects, we've already ported them to [another repository](https://github.com/fable-compiler/fable-browser). This contains not only one but multiple packages, roughly corresponding to [the Web APIs](https://developer.mozilla.org/es/docs/Web/API). The guidelines to make the namespaces consistent across these packages are:

- Interfaces are contained in the `Browser.Types` namespace in all packages.
- Values, [like `window` or constructors like `FileReader`](https://github.com/fable-compiler/fable-browser/blob/439b42070c9ed6afc6ec18499f22f3c238c221ae/src/Dom/Browser.Dom.Api.fs#L14-L22), are put in a module with the same name as the package (e.g. Fable.Browser.Dom -> Browser.Dom). This module is decorated with `AutoOpen` so in general you only need to `open Browser` to access any of the values in the Fable.Browser packages. Only to prevent conflicts you should need to qualify the module name (e.g. `Browser.Dom.document`).

The `fable-browser` repository doesn't contain all Web APIs yet. Please contribute them or, if you prefer, it's also ok to publish packages for the missing APIs from your own profile.

## Fable.PowerPack

Similar problems affected Fable.PowerPack. It was originally intended as an extended Fable.Core but it had become a mix of unrelated modules and many times it was difficult for maintainers to remember who had authored what.

Following the reasoning above, we've decided to deprecate Fable.PowerPack and replace it with single-purpose packages. For now, [Fable.Promise](https://github.com/fable-compiler/fable-promise) and [Fable.Fetch](https://github.com/fable-compiler/fable-fetch) have been released (only v2 beta is compatible with Fable.Core 3). The API is identical to the modules in Fable.PowerPack except for these changes:

- Similar to Fable.Browser, the `Fable.` prefix is removed from the actual module names. In most cases (e.g. to use `Promise.map`) you won't need to open anything.
- `Fetch.Fetch_types` is renamed to `Fetch.Types`.
- The fetch methods in auto-serialization (like `fetchAs`) have been removed, please combine fetching with [Thoth.Json](https://github.com/thoth-org/Thoth.Json) or [Fable.SimpleJson](https://github.com/Zaid-Ajaj/Fable.SimpleJson).

## Fable.React

Latest Fable.React (v5, currently in beta) has a dependency on the new Fable.Browser.Dom package, besides these changes:

- In line with the previous changes, the `Fable.Import.` and `Fable.Helpers.` prefixes have been dropped, so now you only need to `open Fable.React` (and/or Fable.React.Props).
- The react-dom and react-dom/server bindings are in `Fable.ReactDom` and `Fable.ReactDomServer` static types.
- If you need to fully qualify one of the standard HTML tags, use `Fable.React.Standard`.
- [React.memo support](https://github.com/fable-compiler/fable-react/pull/119) thanks to @vbfox
- [React hooks support](https://github.com/fable-compiler/fable-react/issues/140): if you've a suggestion to improve the API do it quickly before the stable release
- [Type-safe CSS props](https://github.com/fable-compiler/fable-react/pull/147/files) thanks to @Zaid-Ajaj

## Fable.Elmish

// TODO: Eugene's explanation

## Other packages: Fulma, Thoth.Json, Fable.SimpleHttp...

Several other packages have published new beta versions without actual changes (fortunately! I hear you) but with dependencies on Fable.Core 3 and Fable.Browser to avoid compilation errors. If you spot a package that hasn't been updated please contact the author and if needed reference it by source (most are only one or two files) until a new release is pushed.

-----------------------------------------------------------

We know these are a lot of changes and we apologize for the trouble when updating, but we're convinced this is much better for the future and will increase the health of Fable ecosystem. You can give us feedback through a [quick issue](https://github.com/fable-compiler/Fable/issues/new) if necessary, and we'll help you the best we can.

Thanks for your attention and happy coding!