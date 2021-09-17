---
layout: fable-blog-page
title: JS Decorators in Fable 3.3
author: Alfonso García-Caro
date: 2021-09-17
author_link: https://twitter.com/alfonsogcnunez
author_image: https://github.com/alfonsogarciacaro.png
# external_link:
abstract: |
  Fable 3.3 is out with several fixes and improvements but above all, with a new feature that I hope will be put in good use by Fable library authors: JS decorators.
---

Fable 3.3 is out with several fixes and improvements (like F# interpolated strings compiled as JS templates) but above all, with a new feature that I hope will be put in good use by Fable library authors: JS decorators! Decorators are currently [a proposal](https://github.com/tc39/proposal-decorators) to add metaprogramming capabilities to JavaScript. Fable developers have been [enjoying](https://zaid-ajaj.github.io/Fable.Remoting/) [this](https://thoth-org.github.io/Thoth.Json/#Auto-coders) for a while thanks to the use of Reflection, and decorators will bring even more options to the table.

But just to curb your enthusiasm, a couple of caveats for starters:

- Fable JS decorators don't actually compile to JS decorators. Mainly because, as we've just seen, decorators are still a proposal. Code output by Fable is executable now by all modern browsers without any further transformation, and will continue as is.

- Fable JS decorators are inspired by the JS decorator proposal, but it doesn't work exactly the same because of the differences with F# attributes. See details below.

What are decorators used for then? Focusing on functions for now, decorators can transform a function on initialization to _enhance_ it in different ways. This is a pattern that is becoming increasingly common in JS frameworks. E.g. to [declare web components](https://lit.dev/docs/components/defining/).

"But we can already transform a function in F#. This is what functional programming is about!". I hear you, but there are some limitations to this that became obvious when we were [trying to implement React functional components](https://zaid-ajaj.github.io/Feliz/#/Feliz/React/CommonPitfalls). Among other issues, the F# compiler won't let you create a generic function this way, which made it impossible to create generic React components.

Fable 3 [brought plugins back](https://fable.io/blog/2020/2020-11-20-Announcing-Nagareyama-3.html#Plugins!) to overcome this. But plugins require advanced knowledge, documentation (ehem) and rely on some compiler internals so the may break in future Fable releases. Decorators solve a similar problem and are much simpler to implement (albeit less powerful that plugins). We'll go through a practical example to learn what can be achieved with them.

## Measuring the performance of a function

Let's say we want to measure the total time spent in calls to a particular function. Yeah, you can use a profiler or better tooling for that but... well, it's just an example.

We start by declaring an attribute that inherits `Fable.Core.JS.DecoratorAttribute`.

```fsharp
open Fable.Core

type MeasurePerformanceAttribute() =
    inherit JS.DecoratorAttribute()
    override _.Decorate(fn: JS.Function) = fn
```

This is not doing anything terribly useful, just takes the function and returns it as is so basically no change. Let's modify the `Decorate` function to measure the time spent when calling the function.

```fsharp
type MeasurePerformanceAttribute() =
    inherit JS.DecoratorAttribute()

    [<Emit("performance.now()")>]
    member _.now(): float = jsNative

    static let mutable totalTime = 0.

    override this.Decorate(fn) =
        JS.spreadFunc(fun args ->
            let t1 = this.now()
            let res = fn.apply(null, args)
            let t2 = this.now()
            totalTime <- totalTime + (t2 - t1)
            res
        )
```

We've also added a couple of helpers: a binding to call the [Browser performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) (also available in the Fable.Browser.Performance package for the fully typed bindings), and a value to hold the total time of the function calls. Note this value is static because the decorator attribute will be instantiated once per function decorated and here we're interested in the total time of all the functions... this is JS so we don't have to worry about multiple threads mutating the value!

Now let's check the `Decorate` member. This time we're wrapping the decorated function to get the times before and after the call. Note that we're using `JS.spreadFunct` to tell Fable this should be a JS function with spread arguments `function (...args) {}` that we will apply to `fn`.

What's left is to decorate the function we want to modify:

```fsharp
[<MeasurePerformance>]
let myExpensiveCalculation x y = x + y
```

You can also add arguments to the attribute constructor. The values will be accessible from the `Decorate` function (just remember .NET restricts attributes arguments to literals and types).

```fsharp
[<MeasurePerformance("a message")>]
let myExpensiveCalculation x y = x + y
```

You're probably thinking that since Heisenberg we know measuring performance _affects_ performance. It's a good idea to disable this decorator in production. We can do that by using compilation directives.

```fsharp
type MeasurePerformanceAttribute() =
#if !DEBUG
    inherit System.Attribute()
#else
    inherit JS.DecoratorAttribute()
    override this.Decorate(fn) = ...
#endif
```

By default, Fable erases attributes so this won't affect the runtime when compiling in Release mode.

If you need more information about the function, inherit `JS.ReflectedDecoratorAttribute` instead. With this the `Decorate` method will also receive the reflected `MethodInfo` about the function. Just remember Fable supports .NET reflection _partially_. Fable 3.3 supports the following API:

- MethodInfo.Name
- MethodInfo.ReturnType
- MethodInfo.GetParameters()
- ParameterInfo.Name
- ParameterInfo.ParameterType

```fsharp
type LogAttribute() =
    inherit JS.ReflectedDecoratorAttribute()
    override _.Decorate(fn, info) =
        printfn $"Decorating function {info.Name}: {info.ReturnType}"
        for p in info.GetParameters() do
            printfn $"> {p.Name}: {p.ParameterType}"
        fn
```

That's all folks! I'm looking forward to seeing the great things Fable contributors will build with this new tool in their hands. Please do share with the community by mentioning @FableCompiler in Twitter. Have f#un!
