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

![1,600 coloured particles rippling outward from the centre, rotating and shrinking](/static/img/blog/xantham-particles.gif)

[Anime.js](https://animejs.com/) driven from F# through a binding Xantham generated.

[Xantham](https://shayanhabibi.github.io/Xantham/) turns an npm package's
TypeScript declarations into F# bindings using TypeScript 7's native compiler API.
It follows declarations across files, generates runtime imports and public
subpath modules, and can generate or reuse dependency bindings.

## Install → generate

> Prerequisites:
> * .NET10
> * Node.js 22.12+

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

That writes `bindings/Animejs.fs`, plus `manifest.json` and `symbols.jsonl` (graded
below). `tsc init` fetches the TypeScript 7 compiler.

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

`Xantham.Fable.Core.TS` supplies the DOM types and pulls in Fable.Core.

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

`bindings/Animejs.fs` is unedited generator output; the only adapter is the delegate
in `Program.fs`. That is the result for this package at these versions, not a promise
for every npm package.

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

Open the local URL.

The GIF at the top is a capture of this build running in headless Chrome, no page
errors.

## Beyond one package

Real projects need configuration: `xantham.json`, passed with `--config`.

**Names are yours.** `module` sets the generated F# module — it defaults to the npm
name, so `@scope/pkg-name` becomes `Scope.PkgName` — and `namespace` groups a family
of related packages under one roof. `runtime` overrides the JavaScript import path
when it differs from the package name.

**Four ways to handle a dependency.** When a declaration reaches into another
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
`obj` and files a finding.

**Declaration catalogues keep identities stable.** Two bindings that mention the same
TypeScript type should share one F# type. A producer sets `declarationCatalog: true`
and writes a
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

A catalogue whose package hashes or F# API no longer match is rejected with a
diagnostic.

**Every symbol is graded.** Alongside the binding, each run writes `manifest.json`
and `symbols.jsonl`, which sorts Anime.js's 351 symbols into four tiers:

| Tier | Count | Meaning |
|---|---|---|
| `exact` | 129 | the F# type says what the TypeScript type said |
| `ergonomic` | 129 | reshaped for F#, same meaning |
| `widened` | 14 | detail lost — the `StaggerParams.from` case below |
| `escape` | 79 | an escape hatch such as `obj` is in play |

Read the 93 `widened` and `escape` entries, not the 5,000-line `Animejs.fs`.

## What about Glutinum?

[Glutinum](https://github.com/glutinum-org/cli) is the established TypeScript-to-F#
generator for Fable. Same input:

```sh
npm install --save-dev --save-exact @glutinum/cli@0.14.1
npx glue animejs --out-file Glutinum.Animejs.fs
```

That command succeeds. The file it writes, however, [did not compile unmodified](https://github.com/glutinum-org/cli/issues/220) —
against `Fable.Core` 5.2.0 and `Glutinum.Web` 0.1.0, `dotnet build` stops at:

```text
Glutinum.Animejs.fs(1732,14): error FS0037: Duplicate definition of type, exception or module 'Animatable'
```

Inside one module the generator emits both the real declaration and a
`type Animatable = obj` placeholder; 18 types in that file collide this way.

That is this package, not the tool in general: Glutinum's `@types/node` binding
compiles clean.

### Imports have to resolve

Anime.js publishes an `exports` map, so only the subpaths it lists are importable.
Every one of Xantham's **181 import sites** points at a listed subpath — `animejs`,
`animejs/utils`, `animejs/svg`, `animejs/easings/spring`.
Of Glutinum's **578 import sites, 279 target 28 paths that the map does not
expose**, reaching into `dist/` instead:

```sh
$ node -e "import('animejs/dist/modules/core/helpers.js')"
ERR_PACKAGE_PATH_NOT_EXPORTED: Package subpath './dist/modules/core/helpers.js'
is not defined by "exports"
```

Xantham reads the `exports` map and mirrors the public subpaths as nested modules,
so `animejs/svg` becomes `Animejs.Svg`.

`@types/node` 22.20.2 splits the same way for a different reason. All 2,047 of
Xantham's import sites are `node:`-prefixed — `node:fs`, `node:crypto`,
`node:stream`. Glutinum emits 2,634, of which 165 point at `undici-types`: a
types-only package whose directory holds `.d.ts` files and nothing else, with no
`index.js` and no `undici-types/fetch.js` to import.

```sh
$ node -e "import('undici-types/fetch.js')"   # ERR_MODULE_NOT_FOUND
$ node -e "import('node:fs')"                 # resolves
```

Bare `fs` resolves too, so the prefix on its own is not a defect. It removes the
ambiguity with an npm package of the same name, and Deno and Bun prefer it.

Back on animejs, both tools read the same `animate(targets, params)`.

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
when the value *is* a union.

Measured against Fable.Core 5.2.0 on net10.0:

| Shape | Call style | Result |
|---|---|---|
| union only | `f(!^ x)` | compiles |
| union only | bare lambda into a delegate arm | **FS0002** |
| arms only, union member dropped | argument held at union type | **FS0041** |
| union + arms | plain arm value, `f("x")` | compiles |
| union + arms | `f(!^ x)` | **FS0041** |

Row three is Glutinum's shape: a value already held at `TargetsParam` has to be matched
out and re-entered at a concrete type. Row five is why adding the union member back
does not help — beside the arms, `!^` loses its unique target.

Row two is the case for overloads. A bare lambda has no target type to infer against
inside a union, so `!^ (fun a b -> "x")` is FS0002 unless you write
`System.Func<_,_,_>(fun a b -> "x")` by hand. An overload for the delegate arm lets
the lambda infer.

Neither rendering wins; it depends on the calling code. Arm expansion is opt-in:

```json
{ "unionArmOverloads": { "enabled": false, "maxArms": 4 } }
```

Members whose arms collapse to one F# signature — `U2<string, string>`, or two arms
that both map to `obj` — are skipped rather than emitted as an overload set that
would be FS0041 at every call site; the manifest lists which and why.

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
short name.

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

For `from?: number | "first" | "center" | "last" | "random" | Array<number>`,
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

This is not an animejs quirk. `@types/node` holds 18 of the same shape:

| TypeScript | Glutinum | Xantham |
|---|---|---|
| `family?: "IPv4" \| "IPv6" \| number` | `IPv4 \| IPv6 \| Case1 of float` | `U2<float, string>` |
| `BufferEncodingOption = "buffer" \| { encoding: "buffer" }` | `buffer \| Case1 of …` | `U2<string, BufferEncodingOption2>` |
| `StdioNull` | `ignore \| Case1 of …` | widened |

`fs.realpath(path, options)` takes exactly `"buffer"` there. Xantham's signature
accepts `!^ "utf8"` and compiles.

Xantham does not emit that DU automatically because its safety rests on Fable being
able to type-test each payload arm. For `from` it can: `float` and `ResizeArray<float>`
lower to `typeof x === "number"` and `Array.isArray(x)`. For a union of two interface
types, or of anything Fable erases, it cannot, and it fails two ways:

| Failure | Fable's response | Result |
|---|---|---|
| an arm Fable cannot type test | `warning FABLE: Cannot type test (evals to false): T` | that branch is silently absent |
| two arms sharing one type test | nothing at all | the second branch is silently dead |

Both compile. When the DU is safe to emit is a judgement about the arms, and Xantham
does not yet make it; it records `TR006` instead.

Two more, from the same `@types/node` pair. Glutinum overloads where the arity is
small — `fetch` gets three members taking `string`, `URL` and `Request` — against
Xantham's single `U3<string, Request, URL>` that needs `!^` at every call site. The
`TargetsParam` argument above is about six arms; at three, the overload is simply
nicer. And Glutinum reads TypeScript's `Array<T>` as `ResizeArray<T>`, 865 times,
where Xantham emits `T[]`, 2,378 times. F# arrays are fixed-size, so `push` and
`splice` on a JS array are out of reach without a cast.

Neither file is uniformly better. Glutinum leaves 97 types as `interface end` —
including the global `RequestInit` and `Response` — against Xantham's 3, and 43
`= obj` abbreviations against 8; Xantham emits 596 `StringEnum`s to Glutinum's 131.
It wins the pure literal unions and loses the mixed ones.

Two packages, one pair of versions each. Anime.js 4.5.0 spreads its API over 70
declaration files and is a hard case; this is not a verdict on Glutinum.

Next package? Change the input directory.
[Start with the docs](https://shayanhabibi.github.io/Xantham/xantham-cli/),
or explore [dependency generation and shared types](https://shayanhabibi.github.io/Xantham/xantham-cli/guide/dependencies/).
