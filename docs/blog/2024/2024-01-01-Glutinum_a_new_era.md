---
layout: fable-blog-page
title: Glutinum, a new era for Fable bindings
author: Mangel Maxime
date: 2024-01-01
author_link: https://twitter.com/MangelMaxime
author_image: https://github.com/MangelMaxime.png
# external_link:
abstract: |
    Let me introduce Glutinum, a new ecosystem for Fable bindings aiming to provide the best F# experience while staying close to the original JavaScript API.
---

2 years ago, I soft-launched **Glutinum** project with the goal to push Fable bindings to the next level.

Thanks to new innovations in Fable, and after working on 20+ bindings, I am now ready to say it is possible to provide near native F# experience while staying close to the original JavaScript API.

The former allows F# developers to consume bindings with minimal friction. While the later makes it easier to re-use knowledge and documentation coming from the original JavaScript community.

With this confirmation, I started prototyping a new tool to convert TypeScript definitions to F#.

## Why a new tool?

For a long time, I have been split between re-writing ts2fable or creating a new tool. In the end, I decided to create a new tool because my goal is not only to provide a new converter but also a completely new set of bindings for Fable.

Creating a new ecosystem makes it possible to progressively migrate to the new bindings without breaking existing libraries.

## How is it different from ts2fable?

I don't want to go into too much details about the design decision behind Glutinum CLI, but here are some highlights.

### Minimize erased union types

To me, the first source of friction when consuming Fable bindings is the usage of erased union types (`U2`, `U3`, etc.).

Glutinum CLI minimizes the usage of erased union types by 2 main ways:

#### 1. Inline values when possible

Example based on **enum inheritance**.

<div class="has-text-centered mb-3">

**TypeScript**

</div>

```ts
export type ColorA =
    | 'black'

export type ColorB =
    | 'bgBlack'

export type Color = ColorA | ColorB;
```

<div class="columns is-multiline is-mobile" data-disable-copy-button>
<div class="column is-6 has-text-centered">

**ts2fable**

</div>
<div class="column is-6 has-text-centered">

**Glutinum**

</div>
<div class="column is-6">

```fs
[<StringEnum>]
[<RequireQualifiedAccess>]
type ColorA =
    | Black

[<StringEnum>]
[<RequireQualifiedAccess>]
type ColorB =
    | BgBlack

type Color =
    U2<ColorA, ColorB>
```

</div>
<div class="column is-6">

```fs
[<RequireQualifiedAccess>]
[<StringEnum(CaseRules.None)>]
type ColorA =
    | black

[<RequireQualifiedAccess>]
[<StringEnum(CaseRules.None)>]
type ColorB =
    | bgBlack

[<RequireQualifiedAccess>]
[<StringEnum(CaseRules.None)>]
type Color =
    | black
    | bgBlack
```

</div>
</div>

#### 2. Generate multiple overloads

In JavaScript it is common for a function/method to accept different types for the same argument. In such case, we can avoid the union type by generating multiple overloads.

**TypeScript**

```ts
export class Dayjs {
    locale(preset: string | ILocale): Dayjs;
}
```

<div data-disable-copy-button>

**ts2fable**

```fs
type [<AllowNullLiteral>] Dayjs =
    abstract locale: preset: U2<string, ILocale> -> Dayjs
```

**Glutinum**

```fs
[<AllowNullLiteral>]
type Dayjs =
    abstract member locale: preset: ILocale -> Dayjs
    abstract member locale: preset: string -> Dayjs
```

</div>

### Increased understanding of TypeScript utilities

TypeScript **loves** to offer utility types to their users, so they can avoid code duplication / have a more interwoven type system.

Glutinum CLI tries to understand those utilities and generates the best possible F# representation.

For example, in the following example, `ts2fable` will generate an erased type `KeyOf` to mimic the behavior of `keyof` in TypeScript. Glutinum will instead generate a string enums with the literal values coming from the interface properties names.

<div class="has-text-centered mb-3">

**TypeScript**

</div>

```ts
export interface Point {
    x: number;
    y: number;
}

type P = keyof Point;
```

<div class="columns is-multiline is-mobile" data-disable-copy-button>
<div class="column is-6 has-text-centered">

**ts2fable**

</div>
<div class="column is-6 has-text-centered">

**Glutinum**

</div>
<div class="column is-6">

```fs
[<Erase>]
type KeyOf<'T> = Key of string

type [<AllowNullLiteral>] Point =
    abstract x: float with get, set
    abstract y: float with get, set

type P =
    KeyOf<Point>
```

</div>
<div class="column is-6">

```fs
[<AllowNullLiteral>]
type Point =
    abstract member x: float with get, set
    abstract member y: float with get, set

[<RequireQualifiedAccess>]
[<StringEnum(CaseRules.None)>]
type P =
    | x
    | y
```

</div>
</div>

Here is as list of others ideas I have in mind:

- Benefit from F# ability to open `static type`, so we can have access to more situations where we can avoid erased union types.
- Have a plugin interface to generate specific code
    - Generates Feliz DSL when a library returns a `ReactElement`
- Generate named erased union instead of `U2`, `U3`, etc. allowing for a more declarative code.
- and much more...

## Can I try it?

For sure! 🎉

The easiest way to get started is to use `npx` to run the CLI without installing it:

```sh
npx @glutinum/cli path/file.d.ts
```

You can also install it locally:

```sh
npm install @glutinum/cli
```
:::warning{title="Warning"}
Glutinum CLI is still in early development, not all of TypeScript syntax or planned optimizations are supported yet.

Currently, if the CLI encounters an unsupported syntax it will most likely crash. I am still working on making it more tolerant to unsupported syntax.
:::

You can report issues and suggest improvements on the [GitHub repository](https://github.com/glutinum-org/cli).

I wish you all a happy new year and I hope you will follow me in this new adventure. 🎉
