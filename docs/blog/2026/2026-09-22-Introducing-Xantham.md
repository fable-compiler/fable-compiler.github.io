---
layout: fable-blog-page
title: "Xantham: npm packages, meet F#"
author: Shayan Habibi
date: 2026-09-22
author_link: https://github.com/shayanhabibi
author_image: https://github.com/shayanhabibi.png
abstract: |
    1,600 particles. A ripple of rotation and colour. Zero handwritten Anime.js bindings.
    Generate the package's F# API with Xantham, compile with Fable, and run it in the browser.
---

![Xantham — TypeScript to F# bindings](/static/img/blog/xantham-workflow-banner.png)

**1,600 particles. Zero handwritten Anime.js bindings.**

![1,600 coloured particles rippling outward from the centre, rotating and shrinking](/static/img/blog/xantham-particles.gif)

This is [Anime.js](https://animejs.com/), called from F#. Xantham generates the
bindings; Fable compiles the application; Anime.js runs the animation.

[Xantham](https://shayanhabibi.github.io/Xantham/) turns an npm package's
TypeScript declarations into F# bindings using TypeScript 7's native compiler API.
It follows declarations across files, generates runtime imports and public
subpath modules, and can generate or reuse dependency bindings.

Let's build the picture.

## Install → generate

You'll need **.NET 10** and **Node.js 22.12+**. In a new directory:

```sh
mkdir xantham-demo
cd xantham-demo
dotnet new console -lang F# -n Demo --framework net10.0
npm init -y
npm pkg set type=module
npm install --save-exact animejs@4.5.0
npm install --save-dev --save-exact vite@8.3.0
dotnet new tool-manifest
dotnet tool install xantham --version 0.1.0
dotnet tool install fable --version 5.13.0
dotnet xantham tsc init
dotnet xantham generate node_modules/animejs -o bindings
```

That last command generates the package binding, including imports and option
types. Keep `manifest.json`: it reports where the mapping is exact, ergonomic,
widened, or requires an escape hatch.

Replace `Demo.fsproj` with:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <Compile Include="bindings/Animejs.fs" />
    <Compile Include="Program.fs" />
  </ItemGroup>
  <ItemGroup>
    <PackageReference Include="Xantham.Fable.Core.TS" Version="0.1.0" />
  </ItemGroup>
</Project>
```

The Xantham package provides the browser bindings and brings in its core helpers
and Fable.Core transitively.
Generated files go **before** the code that uses them.

## Animate

Replace `Program.fs`:

```fs
module Demo
open Fable.Core
open Fable.Core.JsInterop
open Fable.Core.TS
open Animejs

[<Global("document")>]
let document: Dom.Document = jsNative
let field = document.getElementById("field") |> Option.get

for i in 0 .. 1599 do
    let dot = document.createElement "i"
    dot.setAttribute("style", $"background:hsl({i % 40 * 9}, 85%%, 65%%)")
    field.appendChild dot |> ignore

let wave = Exports.stagger(35., StaggerParams.Create(
    grid = !^ [| 40.; 40. |], from = !^ "center"))

let options = jsOptions<AnimationParams>(fun p ->
    p.duration <- Some (!^ 1800.)
    p.delay <- Some (!^ (DurationKeyframes.Item.Duration(
        fun target index targets previous ->
            !^ (wave.Invoke(target, index, targets, previous, None)))))
    p.alternate <- Some true
    p.loop <- Some (!^ true)
    p.ease <- Some (!^ "inOutSine")
    p.["rotate"] <- !^ 360.
    p.["scale"] <- !^ 0.15)

let animation = Exports.animate(!^ "#field i", options)
```

`Exports.animate`, `Exports.stagger`, and the option types are generated.
`Dom.Document` comes from Xantham; `[<Global>]` connects it to the browser's `document`.
The small delegate adapts stagger's five arguments to the delay callback's four.
`!^` converts each value to the expected erased-union type without adding a
JavaScript wrapper.

`bindings/Animejs.fs` was never opened in an editor. Delete it, run `generate`
again, and you get the same bytes back — the demo above compiles and runs against
exactly what the tool wrote. The delegate described above is the adapter doing the
work, and it lives in `Program.fs`, on the application side of the boundary.
That is the result for this package at these versions, not a guarantee that every
npm package lands this cleanly.

Add `index.html`:

```html
<!doctype html>
<meta charset="utf-8">
<title>Xantham: 1,600 particles, one generated binding</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #100c24; }
  #field { display: grid; grid-template-columns: repeat(40, 1fr); gap: 3px; width: min(85vmin, 720px); }
  i { display: block; aspect-ratio: 1; border-radius: 25%; }
</style>
<div id="field"></div>
<script type="module" src="/dist/Program.js"></script>
```

## Compile → run

```sh
dotnet fable Demo.fsproj --outDir dist
npx vite
```

Open the local URL. The grid shrinks and spins outward from its centre, then
reverses and repeats.

**Verified:** Xantham 0.1.0, Fable 5.13.0, Anime.js 4.5.0, .NET 10, Vite 8.3.0 — a
clean Fable compilation followed by a headless Chrome run with all 1,600 elements
animating and no page errors. The animation at the top of this post is a frame
capture of that run, not a mock-up.

Bindings still need review: TypeScript and F# do not represent every type in the
same way. Check the generated signatures and findings for the APIs you use.

## Beyond one package

The demo needed no configuration. Real projects usually need some, and it lives in
a `xantham.json` passed with `--config`.

**Names are yours.** `module` sets the generated F# module — it defaults to the npm
name, so `@scope/pkg-name` becomes `Scope.PkgName` — and `namespace` groups a family
of related packages under one roof. `runtime` overrides the JavaScript import path
when it differs from the package name. Changing `dist_modules_types` into something
you want to type is a config key, not a find-and-replace.

**Dependencies have four dispositions.** When a declaration reaches into another
package, `groups` decides what happens, keyed by npm name:

```json
{
  "namespace": "MyBindings",
  "groups": {
    "shared-models": "ship",
    "another-package": "reference",
    "typescript/lib": { "map": { "RegExp": "System.Text.RegularExpressions.Regex" } }
  }
}
```

`ship` emits the dependency's declarations alongside yours, `reference` points at a
separately generated binding, `map` redirects named types to F# types that already
exist, and `widen` — the default for anything unlisted — renders the reference as
`obj` and files a finding. The choice is explicit instead of implied by whatever the
generator happened to reach.

**Declaration catalogues keep identities stable.** Two bindings that both mention
the same TypeScript type should produce the *same* F# type, not two structurally
identical strangers. A producer sets `declarationCatalog: true` and writes a
`declarations.json` next to its output; a consumer lists it in
`declarationReferences` and reuses those identities while keeping its own imports:

```json
{
  "module": "Example.Adapter",
  "entry": "adapter.d.ts",
  "runtime": "example/adapter",
  "declarationReferences": ["/bindings/root/declarations.json"]
}
```

Catalogues verify declaration identity, package and source hashes, and F# API
compatibility, and are rejected with a diagnostic rather than silently mismatching.
Compile producers first, in the catalogue's `owners` order.

**Every symbol is graded.** Alongside the binding, each run writes `manifest.json`
and `symbols.jsonl`, which sorts the 351 symbols it catalogues into four tiers:

| Tier | Count | Meaning |
|---|---|---|
| `exact` | 129 | the F# type says what the TypeScript type said |
| `ergonomic` | 129 | reshaped for F#, same meaning |
| `widened` | 14 | detail lost — the `StaggerParams.from` case below |
| `escape` | 79 | an escape hatch such as `obj` is in play |

That is the answer to "can I trust this file": you do not have to read 5,000 lines
to find the soft spots, because the generator already listed them with codes you can
look up.

## What about Glutinum?

[Glutinum](https://github.com/glutinum-org/cli) is the established TypeScript-to-F#
generator for Fable, so it is the fair thing to measure against. It reads the same
declarations:

```sh
npm install --save-dev --save-exact @glutinum/cli@0.14.1
npx glue animejs --out-file Glutinum.Animejs.fs
```

That command succeeds. The file it writes, however, did not compile unmodified —
against `Fable.Core` 5.2.0 and `Glutinum.Web` 0.1.0, `dotnet build` stops at:

```text
Glutinum.Animejs.fs(1732,14): error FS0037: Duplicate definition of type, exception or module 'Animatable'
```

Inside one module the generator emits both the real declaration and a
`type Animatable = obj` placeholder. The same collision is present for 18 types in
that file — `JSAnimation`, `Scope`, `Timeline`, `Timer`, `Draggable`, `WAAPIAnimation`
and the whole `Layout*` group — so the first error is not a one-line fix.

The more interesting differences are in the API each tool arrives at. Both read the
same `animate(targets, params)`.

### Unions stay unions

TypeScript types the first argument as `TargetsParam`, a union of six things.
Xantham keeps it as one member over a named erased union:

```fs
[<Import("animate", "animejs")>]
static member animate (targets: TargetsParam, parameters: AnimationParams) : JSAnimation = jsNative

type TargetsParam =
    U6<string, TargetSelector[], Fable.Core.TS.Dom.HTMLElement, JSTarget,
       Fable.Core.TS.Dom.NodeList, Fable.Core.TS.Dom.SVGElement>
```

Glutinum expands the union into one overload per case:

```fs
static member animate (targets: ResizeArray<Animejs.dist_modules_types.TargetSelector>, parameters: Animejs.dist_modules_types.AnimationParams) : Animejs.dist_modules_animation.JSAnimation = nativeOnly
static member animate (targets: Glutinum.Web.HTMLElement, parameters: Animejs.dist_modules_types.AnimationParams) : Animejs.dist_modules_animation.JSAnimation = nativeOnly
static member animate (targets: Glutinum.Web.SVGElement, parameters: Animejs.dist_modules_types.AnimationParams) : Animejs.dist_modules_animation.JSAnimation = nativeOnly
// … and three more
```

Overloads read well at a call site with a known argument type. They stop working
when the value *is* a union — you cannot pass "whatever `TargetsParam` holds"
without matching it out first. `!^ "#field i"` in the demo above is the union
version of the same call.

### Module names come from declarations, not directories

Glutinum names modules after the file each declaration came from, and references
types by that path:

```fs
namespace rec Glutinum

module Animejs =
    module dist_modules_types = …
    module dist_modules_adapters_three_adapter = …
    // and referenced as Animejs.dist_modules_types.AnimationParams
```

Xantham emits `module rec Animejs` and nests by declaration — `Animatable`,
`DurationKeyframes.Item`, `Utils.Stagger.Result` — so types are referenced by
short name. Rename the root with one config key rather than living with
`dist_modules_types`.

### Option objects get constructors

Anime.js option bags are all-optional interfaces. Xantham synthesises a `Create`
factory for each, which is why the demo can write
`StaggerParams.Create(grid = …, from = …)`:

```fs
static member Create (?start: TimelinePosition, ?from: U3<float, string, float[]>,
                      ?reversed: bool, ?grid: U2<bool, float[]>, …) : StaggerParams = jsNative
```

There are 66 such factories in the Xantham output and none in Glutinum's, which
leaves you to `jsOptions` or an object expression.

### Where Glutinum does it better

Credit where it is due. For `from?: number | "first" | "center" | "last" | "random" | Array<number>`,
Glutinum keeps the string literals as named cases:

```fs
[<RequireQualifiedAccess>]
[<Erase(CaseRules.None)>]
type from =
    | first
    | center
    | last
    | random
    | Case1 of float
    | Case2 of ResizeArray<float>
```

Xantham widens the literals to `string` — `U3<float, string, float[]>` — so
`from = !^ "center"` in the demo is an unchecked string where Glutinum would have
offered `from.center`. Xantham does record the loss rather than hide it;
`symbols.jsonl` marks `StaggerParams` as `widened` and cites `TR006`
(*string literal type widened to string*). Both tools agree on the simpler
`axis?: "x" | "y" | "z"`, which each emits as a `StringEnum`.

### Imports have to resolve

This one has teeth. Anime.js publishes an `exports` map, so only the subpaths it
lists are importable. Every one of Xantham's **181 import sites** points at a
listed subpath — `animejs`, `animejs/utils`, `animejs/svg`, `animejs/easings/spring`.
Of Glutinum's **569 import sites, 267 target 27 paths that the map does not
expose**, reaching into `dist/` instead:

```sh
$ node -e "import('animejs/dist/modules/core/helpers.js')"
ERR_PACKAGE_PATH_NOT_EXPORTED: Package subpath './dist/modules/core/helpers.js'
is not defined by "exports"
```

Xantham reads the `exports` map and mirrors the public subpaths as nested modules,
so `animejs/svg` becomes `Animejs.Svg`.

This is one package on one pair of versions — Anime.js 4.5.0 spreads its API over 70
declaration files — and not a verdict on Glutinum, which generates plenty that
Anime.js never exercises. Both commands above are cheap to re-run when the versions
move.

Next package? Change the input directory.
[Start with the docs](https://shayanhabibi.github.io/Xantham/xantham-cli/),
or explore [dependency generation and shared types](https://shayanhabibi.github.io/Xantham/xantham-cli/guide/dependencies/).
