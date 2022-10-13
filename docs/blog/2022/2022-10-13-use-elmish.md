---
layout: fable-blog-page
title: Elmish Components with Elmish 4 and UseElmish
author: Alfonso García-Caro
date: 2022-10-13
author_link: https://twitter.com/alfonsogcnunez
author_image: https://github.com/alfonsogarciacaro.png
# external_link:
abstract: |
    Elmish has proven to be a simple yet powerful way of managing state in UI apps. However, it's been often criticized because it was designed for monolithic applications that couldn't take advantage of the component architecture of modern UI frameworks like React. Now, thanks to Elmish 4, you can enjoy the benefits of both the Elm Architecture and React components!
---

[Elmish](https://elmish.github.io/elmish/), the F# implementation of the Elm Architecture, has proven to be a simple yet powerful way of managing state in UI apps. However, it's been often criticized because it was designed for monolithic applications that couldn't take advantage of the component architecture of modern UI frameworks like React. Although it made your app more robust, users didn't like the boilerplate necessary to glue the full component hierarchy into a single global Elmish program. The criticism was fair, why does your model need to know about UI details like a modal? Is it really necessary to wrap the message of all children components even when they didn't have anything to "tell" their parents?

[Feliz.UseElmish](https://zaid-ajaj.github.io/Feliz/#/Hooks/UseElmish) appeared as a custom React hook to solve this situation, allowing you to use Elmish at the component-level. This was a great advancement but its full potential was still blocked by two problems:

1. React hooks were not designed with external stores in mind.
2. Elmish didn't check for termination of Elmish programs and didn't clean up subscriptions.

Because of the first issue, the internal code of `UseElmish` was quite complicated and didn't play well with React features like [Fast Refresh](https://github.com/facebook/react/issues/16604#issuecomment-528663101). And the second problem meant users had to implement their own custom code to dispose subscriptions (and be careful they didn't forget to do it). All in all, the development experience was still not ideal.

Thankfully, these problems have been solved now thanks to React 18 (with the new [useSyncExternalStore](https://beta.reactjs.org/learn/you-might-not-need-an-effect#subscribing-to-an-external-store) hook) and Elmish 4 (published as beta at the time of writing). The new Elmish version includes termination capabilities and subscription cleanup, so instead of assuming there is one single global Elmish program, now you have full control of its lifecycle, which makes integration with React components a breeze.

## Elmish 4 Subscriptions

Subscriptions are becoming much more powerful with Elmish 4:

- Subscriptions must include now an `IDisposable` that will be invoked by Elmish when cleaning up.
- The `Program.withSubscription` function is now evaluated after every update. This makes it really easy to activate or deactivate subscriptions on demand.

Let's say your app can start a web socket connection with the server to check your friends' status, but this is a feature users can turn on and off with a switch. Before, you had to manage all of this in your `update` function, likely having to keep a reference to the connection ID in your model. Now you can delegate this responsibility to subscription in a much more convenient way:

```fsharp
open Elmish

/// Feliz has already a similar helper: React.createDisposable
let private mkDisposable f =
    { new System.IDisposable with member _.Dispose() = f() }

let private mkProgram () =
    Program.mkProgram init update view
    |> Program.withSubscription (fun model ->
        [
            if model.CheckFriendsStatus then
                ["friends-status"], (fun model ->
                    let id = startWebSocket()
                    mkDisposable (fun () -> closeWebSocket(id)))
        ])
```

Thanks to the ID, after each update Elmish can check what subscriptions are new, remain active, or must be cleaned up. Your code doesn't need to care about all of this anymore!

> Note the subscription ID is `string list` instead of just `string`. This is because of the composable nature of Elmish. If your program were to be wrapped, the extension can just prefix your subscriptions, so it's easier to identify the "route" through which subscriptions are activated.

## Fable.React.UseElmish

Fable.React.UseElmish is the spiritual successor of Feliz.UseElmish and takes advantage of React 18 and Elmish 4 to bring you the best of both worlds. You can use it in any React app (either using Fable.React, Feliz or Fable.Core.JSX). It shares the same API as Feliz.UseElmish, so the only thing you need to do for upgrading is to replace the package and remove the `open Feliz.UseElmish` statement (if necessary, replace it with `open Fable.React`).

As before, you can pass the hook a function to initialize your Elmish program or direct references to `init` and `update`. You can also pass an argument to initialize the program and/or a dependency array. When either the argument or any of the dependencies change, UseElmish will reset the program.

```fsharp
open Fable.React
open Feliz
open Elmish

let private mkProgram () =
    // We pass a dummy function as `view` because we don't need it
    Program.mkProgram init update (fun _ _ -> ())
    // Add subscriptions
    |> Program.withSubscription ...
    // Add custom Elmish extensions
    |> Program.withXXX

[<ReactComponent>]
let App () =
    let model, dispatch = React.useElmish (mkProgram, arg = 2)

    // If you don't have subscriptions or custom extensions you can pass the init an update functions directly
    // let model, dispatch = React.useElmish (init, update, arg = 2)

    // View code
```

You can check [this example](https://github.com/alfonsogarciacaro/fable-react-sample/blob/3fc0f5ca2411432d3a34e12344fcca2a4ba6a4ce/src/TodoMVC.fs#L198) to quickly test Fable.React.UseElmish. Just clone the repository and run `npm install && npm start` to launch a development server, and try editing the code in TodoMVC.fs to see the web contents updated on the fly. Please give it a try and let us know what you think!

> In order for React Fast Refresh to work, files must include **only one JS export**. This means you should only expose one functional component (decorated with `Feliz.ReactComponent` or `JSX.Component`) and the rest of the code in the file must be private.