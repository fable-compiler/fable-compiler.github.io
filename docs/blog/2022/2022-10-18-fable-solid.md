---
layout: fable-blog-page
title: "Fable + Solid: React, the good parts with a performance boost"
author: Alfonso García-Caro
date: 2022-10-18
author_link: https://twitter.com/alfonsogcnunez
author_image: https://github.com/alfonsogarciacaro.png
# external_link:
abstract: |
    SolidJS is a tool/library that allows you to write declarative UIs as with React but avoiding most of its pitfalls, and with better performance.
---

When [announcing Fable 4](2022-06-06-Snake_Island_alpha.html) we explained how the new JSX compilation target made Fable compatible with SolidJS. But what is SolidJS? The best way to answer this question is to [check their website](https://www.solidjs.com/) but in short, it's a tool/library that allows you to write React-like apps, while taking advantage of the JSX compilation step to analyze the dependencies in your code and transform your declarative UI into imperative statements that make localized DOM updates, instead of using a Virtual DOM and calculate the diffing at runtime as React does.

This approach was popularized by [Svelte](https://svelte.dev/) in the JS world, but it was also pioneered in F# by [FSharp.Adaptive](https://fsprojects.github.io/FSharp.Data.Adaptive/) and [Sutil](https://sutil.dev/). Some of the advantages are:

- Better performance as the diffing is already done at compile time
- Smaller bundle sizes because the framework doesn't need a big runtime
- Components are "just functions" instead of instances in disguise

The third point has some implications for performance, but the most important consequence is the code within the component will behave as you expect from a regular function. I think this is important for F# developers, as the community has sometimes struggled to understand (and explain) well the difference between functional components and "just" functions. With Solid, the code is only executed when the function is called during the program flow. Consider the following example:

```fsharp
open Fable.Core

[<JSX.Component>]
let Counter() =
    printfn "Evaluating function..."
    let count, setCount = Solid.createSignal (0)

    JSX.html $"""
    <>
        <p>Count is {let _ = printfn "Evaluating expression..." in count()}</p>
        <button class="button" onclick={fun _ -> count () + 1 |> setCount}>
            Click me!
        </button>
    </>
    """
```

The message appearing on the function root, "Evaluating function", is only printed once, while the local message, "Evaluating expression", is printed every time `count` gets updated. This means Solid has detected that, when `count` changes, it only needs to update the re-evaluate the expression in that particular JSX "hole", and it can leave the rest of the component untouched. And Solid is capable of doing this not only with the signal primitives, but also with props coming from a parent component or even an Elmish model!

> To be fair, there is still some magic involved, as you need to understand the expressions containing a reactive value will be re-evaluated every time the value changes.

The UI in Solid apps looks very much like React ones, but you can choose between camelCase or "proper" attribute names, like `class` or `autofocus`. Another important difference is when declaring a **dynamic list or conditional elements:** in these cases Solid requires you to be explicit with [For](https://www.solidjs.com/tutorial/flow_for) and [Show](https://www.solidjs.com/tutorial/flow_show)/[Switch](https://www.solidjs.com/tutorial/flow_switch) respectively. For helpers to create reactive values, effects and such, please check [Solid documentation](https://www.solidjs.com/docs/latest/api) and [Fable.Solid](https://github.com/fable-compiler/Fable.Solid/blob/master/src/Fable.Solid/Solid.fs) bindings.

```fsharp
// Note how `Solid.For` is used to display the list of Todos
let model, dispatch = Solid.createElmishStore (init, update)

JSX.jsx $"""
<>
    <p class="title">To-Do List</p>
    {InputField dispatch}
    <ul>{Solid.For(model.Todos, (fun todo _ -> TodoView todo dispatch))}</ul>
</>
"""
```

<br />

Solid is also compatible with [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). So if you want to use a library like [Shoelace](https://shoelace.style/), you only need to register the components you need, and then invoke them as if they were native HTML elements. The only thing you need to remember is to prefix custom events with `on:`

```fsharp
open Fable.Core
open Fable.Core.JsInterop

[<JSX.Component>]
let ImageComparer() =
    // Cherry-pick Shoelace image comparer element, see https://shoelace.style/components/image-comparer
    importSideEffects "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.73/dist/components/image-comparer/image-comparer.js"

    JSX.html $"""
    <sl-image-comparer
        position={position()}
        on:sl-change={fun (ev: Event) -> printfn "New position: %i" ev.target?position}>
        <img slot="before"
            src="https://images.unsplash.com/photo-1520903074185-8eca362b3dce"
            alt="A person sitting on bricks wearing untied boots."></img>
        <img slot="after"
            src="https://images.unsplash.com/photo-1520640023173-50a135e35804"
            alt="A person sitting on a yellow curb tying shoelaces on a boot."></img>
    </sl-image-comparer>
    """
```

> Latest Fable.Core provides `JSX.html` helper. This is an alias of `JSX.jsx` but it's useful if you're using the [F# Template Highlighting](https://marketplace.visualstudio.com/items?itemName=alfonsogarciacaro.vscode-template-fsharp-highlight) VS Code extension and you prefer to identify the embededded language as HTML rather than JSX.

If you want to try Solid but still prefer F# for UIs, [Feliz.JSX.Solid](https://github.com/fable-compiler/Feliz.JSX) provides a Feliz-like API for that. And you can freely combine both approaches:

```fsharp
[<JSX.Component>]
let QrCode() =
    importSideEffects "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.73/dist/components/qr-code/qr-code.js"
    let value, setValue = Solid.createSignal("https://shoelace.style/")

    Html.fragment [
        Html.input [
            Attr.className "input mb-5"
            Attr.typeText
            Attr.autoFocus true
            Attr.value (value())
            Ev.onTextChange setValue
        ]
        Html.div [
            JSX.html $"""<sl-qr-code value={value()} radius="0.5"></sl-qr-code>"""
        ]
    ]
```

<br />

Likewise, if you want to try Solid but prefer to use Elmish to manage state, Elmish.Solid has you covered. Similarly to [useElmish](2022-10-13-use-elmish.html), `createElmishStore` allows you to use Elmish at the component level, but it takes advantage of [Solid stores](https://www.solidjs.com/tutorial/stores_nested_reactivity) to compare the model snapshots and update only the updated parts. Check how the classic Elmish TodoMVC is rendered with Solid, in [this example](https://github.com/fable-compiler/Fable.Solid/blob/master/src/App/TodoElmish.fs).

> For Solid store diffing to work best, you should use **arrays** (instead of, say, lists or sets) for collections that correspond with on-screen elements.

<hr />

One particular feature of `createElmishStore` is that it can keep state with [Vite hot reload](). I say "particular" because, at the time of writing, there's no equivalent of React's Fast Refresh and Solid primitive signals won't keep state while hot reloading. How is it possible to get better tooling with Fable/F# than with native JS? We will talk about this in the next post.
