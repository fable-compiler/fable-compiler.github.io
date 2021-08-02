---
layout: fable-blog-page
title: Announcing Elmish.Snabbdom
author: Alfonso García-Caro
date: 2021-03-02
author_link: https://twitter.com/alfonsogcnunez
author_image: https://github.com/alfonsogarciacaro.png
# external_link:
abstract: |
  I've been recently playing with Feliz.Engine and wanted to check how easy was to adapt it to an alternative Virtual-DOM implementation, like Snabbdom. This started just as an experiment but I've been pleasantly surprised by how simple yet powerful Snabbdom is, and more importantly how well it fits with the Elmish architecture
---

I've been recently playing with [Feliz.Engine](https://github.com/alfonsogarciacaro/Feliz.Engine/tree/main/samples/Feliz.Snabbdom), an attempt to take advantage of the great work done by Zaid Ajaj and contributors with [Feliz](https://zaid-ajaj.github.io/Feliz/) when writing non-React applications. As part of this I wanted to check how easy was to adapt Feliz.Engine to an alternative Virtual-DOM implementation, and I read good things about [Snabbdom](https://github.com/snabbdom/snabbdom) so I gave it a go. This started just as an experiment but I've been pleasantly surprised by how simple yet powerful Snabbdom is, and more importantly, how well it fits with the [Elmish architecture](https://elmish.github.io/), so I want to share with you my findings hoping that you find them useful.

There was recently a discussion in Twitter about the [problems with Fable Elmish](https://twitter.com/7sharp9_/status/1365270255170428928). So far, Elmish in Fable apps has always used React as the view engine, including React native for mobile (there are also Elmish implementations for non-Fable platforms like [WPF](https://github.com/elmish/Elmish.WPF), [Xamarin](https://fsprojects.github.io/Fabulous/) or [Blazor](https://fsbolero.io/docs/Elmish)), and there's been always friction between the concept of "component" in Elmish and React. This is a bit of technical discussion and I won't go into detail here, among other reasons because I've never managed to explain the difference in an understandable manner. Probably the easiest is to consider Elm/Elmish don't really have a notion of "component" as Dave Thomas explains. It's true the Fable Elmish community tends to "componentize" apps maybe under the influence of React, which sometimes leads to an excess of boilerplate to wire everything.

It's possible to write an Elmish/React app with just a single view function, and some apps work well that way. But to take advantage of most of React features, like devtools, memoization or life-cycle events, you do need components, as React understands them. This is why some, myself guilty as charged, have been trying to drive towards more use of React components with Elmish. An important move for this has been the [`useElmish` React hook](https://zaid-ajaj.github.io/Feliz/#/Hooks/UseElmish) which many Fable devs have successfully adopted. But at this point Elmish gets reduced to manage the internal state of your components and your app gets eventually architected the React-way. This is not a bad thing if you already know React, but this post is about "rediscovering" the power of Elmish as I've been experiencing recently.

What if we try the other way around, that is, not worrying about "componentizing" our application? This is actually the original proposal of Elm/Elmish and what you get by using a low-level Virtual-DOM library like Snabbdom, instead of a full-fledged one like React. When I started trying to run Feliz.Engine with Snabbdom it was just about API ergonomics but being able to enjoy "pure" Elmish without giving up DOM control has been really freeing. Why I'm excited about Snabbdom? These are some of the reasons for it:

#### It's just functions!

There's no concept of component that clashes with Elmish, just composable functions from beginning to end. Again, you ca do the same with React but as soon as you need to deal with the DOM or some other features you need the components. This is not the case of Snabbdom, keep reading.

#### CSS transitions built in

Easy CSS transitions was one of biggest [Svelte](https://svelte.dev/) appeals for me, and I was very surprised to see Snabbdom has a similar mechanism. Together with the wonderful Feliz API (check [the differences](https://github.com/alfonsogarciacaro/Feliz.Engine/blob/main/README.md) in Feliz.Engine), we can get a nice zoom-in/zoom-out effect just by attaching some styles to a node.

```fsharp
Html.li [
    Attr.className "box"

    Css.opacity 0.
    Css.transformScale 1.5
    // Snabbdom doesn't support `all`, we need to list all the transitioning properties
    Css.transitionProperty(transitionProperty.opacity, transitionProperty.transform)
    Css.transitionDurationSeconds 0.5
    Css.delayed [
        Css.opacity 1.
        Css.transformScale 1.
    ]
    Css.remove [
        Css.opacity 0.
        Css.transformScale 0.1
    ]
```

![Snabbdom CSS transitions](/static/img/blog/snabbdom-css-transitions.gif)

Learn more about Snabbdom CSS transitions [here](https://github.com/snabbdom/snabbdom#delayed-properties).

#### Memoization

In theory, given that a pure Elmish app fully recreates the whole virtual DOM for every tiny change it's important to be able to skip the parts of your app that don't need to change (in reality, this usually is not a performance issue thankfully). But memoization has been one of the biggest pain-points when writing Fable/React bindings (still is). Because of nuances of how JS/F# languages work and the way React expects you to declare a memoized component. a [common pitfall](https://zaid-ajaj.github.io/Feliz/#/Feliz/React/CommonPitfalls) is to recreate the component for every function call rendering memoization useless. With Feliz.Snabbdom we just need to wrap a call with the `memoize` helper. For example, if we are displaying a list of Todos:

```fsharp
let renderTodo dispatch (todo: Todo, editing: string option) = ...

let renderTodoList (state: State) (dispatch: Msg -> unit) =
    Html.ul (
        state.TodoList |> List.map (fun todo ->
            todo,
            state.Editing |> Option.bind (fun (i, e) -> if i = todo.Id then Some e else None))
        |> List.map (renderTodo dispatch)
    )
```

We just need to wrap the `renderTodo` call (here also provide a way to get a unique id from the arguments). Note that we don't need to check `dispatch` for the memoization, so we can just partially apply it before the wrapping:

```fsharp
let renderTodoList (state: State) (dispatch: Msg -> unit) =
    Html.ul (
        state.TodoList |> List.map (fun todo ->
            todo,
            state.Editing |> Option.bind (fun (i, e) -> if i = todo.Id then Some e else None))
        |> List.map (memoizeWithId (renderTodo dispatch) (fun (t, _) -> t.Id))
    )
```

#### Lifecycle hooks

Unlike React ones, [hooks in Snabbdom](https://github.com/snabbdom/snabbdom#hooks) are very easy to understand. They are just events fired at different points of the lifecycle of a virtual node, as when they get inserted into or removed from the actual DOM. Very conveniently, the virtual node holding a reference to the actual DOM element is passed as argument to the event handler so it's easy for example to get the actual height of an element.

React hooks allow you to do similar things, but they're designed in a way that forces you to translate your thinking into the React way of doing things. Let's say you want to turn some text into an input on double click, then select all the text and attach an event to the document so if you click outside the containing box you cancel the edit. For this, in React you need to (forgive me if there's a more clever way of doing this that I'm missing):

1. Make sure the function you are in is a component because this is required to use hooks.
2. Declare a reference to hold the actual input element with `useRef` hook (beware! you don't have the actual element yet).
3. Pass the value returned by `useRef` to a `ref` prop on the input element so React fills it.
4. Declare an effect with `useEffect` hook. Because you want the effect to happen when the input appears, you need to pass an array with a flag like `isEditable`.
5. The effect will happen when `isEditable` changes from false to true or from true to false, so make sure `isEditable` is true before running the effect.
6. Now get the input element from the value you declared in 2. Select the text and attach the event to the document body, return a disposable function to detach the event when `isEditable` changes to false.

On the other hand, in Snabbdom if you want to, when an input element appears, select all the text, attach an event to the html body and detach it when the input disappears you need to:

1. Add an `insert` hook to the input, so when it appears, you can select all the text, attach an event to the html body and return a disposable to detach it when the input disappears.

Well, I'm cheating a bit here, in "raw" Snabbdom keeping a reference to the disposable and disposing it when the element is destroyed is slightly more contrived, but luckily Feliz.Snabbdom provides an overload to `Hook.insert` so this is automatically done for you if the callback returns a disposable:

```fsharp
Html.input [
    Attr.classes [ "input"; "is-medium" ]
    Attr.value editing
    Ev.onTextChange (SetEditedDescription >> dispatch)
    onEnterOrEscape dispatch ApplyEdit CancelEdit

    Hook.insert(fun vnode ->
        let el = vnode.elm.AsInputEl
        el.select() // Select all text

        let parentBox = findParentWithClass "box" el
        // This function attachs the event to the body
        // and returns a disposable to detach it
        BodyEv.onMouseDown(fun ev ->
            if not (parentBox.contains(ev.target :?> _)) then
                CancelEdit |> dispatch)
    )
]
```

> Did you notice `BodyEv.onMouseDown`? This is another nice use-case of [Feliz.Engine abstract classes](https://github.com/alfonsogarciacaro/Feliz.Engine/blob/cbf4b90de929d7202f941ef091436a8845634b80/src/Feliz.Snabbdom/Feliz.Snabbdom.fs#L163-L168), it implements `EventEngine` by making it return a disposable.

<br />

So Snabbdom is great, now what? Does this mean you need to ditch React for Fable apps? Of course not! React is still a great choice, with many useful tools and a gigantic ecosystem. It's true there are frictions with Elmish but thanks to the work of Zaid, Maxime Mangel and many others, together with the `ReactComponent` plugin in Fable 3 they've become more bearable. So if you already know React quirks and/or rely on some of its tools and libraries you can be sure will still be well supported by Fable. Just if you're mainly interested in Elmish and don't really care for the underlying renderer you may want to give Elmish.Snabbdom a try if you're looking for less complexity. Clone the repo and try out [this sample](https://github.com/alfonsogarciacaro/Feliz.Engine/tree/main/samples/Feliz.Snabbdom) to see how Elmish.Snabbdom can work for you.

And! If you are really into a purer Fable/F# experience and want more control of the DOM, take also a look at the awesome work of David Dawkins with [Sutil](https://davedawkins.github.io/Sutil)!
