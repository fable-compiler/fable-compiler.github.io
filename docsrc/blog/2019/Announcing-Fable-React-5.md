Fable.React 5 has just been released with new additions to help write your Fable/Elmish apps with React. Before going into detail, I want to thank Julien Roncaglia (@vbfox) who has contributed most of the ideas for this release since [his talk at latest FableConf](https://www.youtube.com/watch?v=9VJoaNoutm4), as well as the React team for their great work in the latest releases. And also to Don Syme and the other F# compiler contributors who have added features like anonymous records to make F# even more suitable to write UIs!

> Note this release depends on Fable.Core 3 and Fable.Browser.Dom, please [read the previous post](https://fable.io/blog/Announcing-2-2.html) to learn about the changes in the ecosystem.

So far, in Elmish applications the most common way to render the UI was to use simple functions, which is great and shows the power of Functional Programming for building UIs. However, in order to use React features like keeping internal state or getting a reference to the actual element in the browser's DOM, we had to declare a full class component. It worked, but required quite a bit of code to turn the view functions into classes and override the proper methods.

This is about to end since React 16.8 and the introduction of [hooks](https://reactjs.org/docs/hooks-overview.html) which gives function components the same possibilities as class components have. Fable.React 5 focus on this and, in fact, from now on it may be difficult to tell functions from function components apart, so let's learn more about what distinguishes them.

## Functions vs Function Components

Functions are **just functions** (I'm also in a position to confirm water is wet): each time you call them, their code is run, you get a value in return and forget about them.

```fsharp
open Fable.React

let myView (props: MyProps) =
    div [] [str props.message]

// We could just replace the call to myView with
// the body of the function and get the same result
let rootView msg =
    myView { message = msg }
```

On the other hand, function components are **actual entities** in the Virtual DOM, which means you can visualize them in the React dev tools or include triggers for different moments of the component's life cycle. In Fable.React 5 we use the `FunctionComponent` helper to declare them. The signature is the same as that of a function `'Props -> ReactElement` so, as a convention, we will use **upper case to name them** and highlight them over simple functions.

```fsharp
let MyView =
    FunctionComponent.Of(fun (props: Props) ->
        div [] [str props.message])

let rootView msg =
    MyView { message = msg }
```

> This distinction is not exactly the same in React, because React apps usually use JSX for the UI code so the difference radicates in _the way you call the function_. Because Fable apps just use F#, we need the `FunctionComponent` wrapper to get the desired behavior.

When to use a function component? Whenever you need:

- To **skip rendering** the component if the props haven't changed. This is specially important when using central state management like Elmish, because every time our UI model is updated a new render for the whole app will be triggered. Skip the parts of the UI tree that don't need to change with the `memoizeWith` parameter, which receives a function to check if the old and new props are equal. Fable.React 5 also provides the `equalsButFunctions` helper which doesn't take into account the functions in the props object (useful in Elmish apps where we usually pass the `dispatch` function down the UI tree).

```fsharp
let MyView  =
    FunctionComponent.Of((fun p -> ..), memoizeWith = equalsButFunctions)
```

- To keep some **internal state** for the component, which can be done using React's state hook. Hooks also give you more capabilities concerning the component's life cycle. Read more about them in the next section.

- To **visualize the component** in React dev tools, very helpful for debugging. Use the `displayName` parameter to set a custom name for the component in React dev tools.

## React Hooks

In Elmish apps we keep a central model for our whole app so most of the times we don't need stateful React components.

```fsharp
let view (props: {| count: int; dispatch: int -> unit |}) =
      button
        [ OnClick (fun _ -> props.count + 1 |> props.dispatch) ]
        [ str "Times clicked: "; ofInt props.count ]
```

In some occasions however we don't want to include some very specific internal state in the global model (e.g. whether a dropdown is open or closed), and in order to do that we need to deploy a full class. The example above would become:

```fsharp
type Props = { initCount: int }
type State = { count: int }

type MyView(props) =
    inherit Component<Props, State>(props)
    do base.setInitState({ count = props.initCount })

    override this.render() =
          button
            [ OnClick (fun _ ->
                this.setState(fun s _ -> { s with count = s.count + 1 })) ]
            [ str "Times clicked: "; ofInt this.state.count ]
```

The situation gets more complicated when we also want to trigger some code at specific points in the life cycle, keep a reference to value outside the component state, etc. Thankfully, since React 16.8 we can use hooks to empower functions with all these capabilities. Now adding state to a component is as simple as:

```fsharp
let view =
    FunctionComponent.Of(fun (props: {| initCount: int |}) ->
    let state = Hooks.useState(props.initCount) // This is where the magic happens
    button
        [ OnClick (fun _ -> state.update(fun s -> s + 1)) ]
        [ str "Times clicked: "; ofInt state.current ]
    )
```

I won't explain hooks in detail because [React documentation is already a fantastic source](https://reactjs.org/docs/hooks-overview.html) for that. Fable.React 5 provides bindings for the most commonly used hooks (`useState`, `useEffect`, `useRef`, `useMemo`...) matching React's API for the most part, except for a few cases where a different name is necessary to comply with F# overloading rules. I will only show another example combining `useEffect` and `useRef` to detect a click _outside_ our component, something that beforehand required quite a bit of code.

```fsharp
open Browser.Types

let attachEvent (f: Event->unit) (node: Node) (eventType: string) =
    node.addEventListener(eventType, f)
    { new System.IDisposable with
        member __.Dispose() = node.removeEventListener(eventType, f) }

let view =
    FunctionComponent.Of(fun props ->
        // Keep a value ref during component's life cycle, initialized to None
        let selfRef = Hooks.useRef None

        // Passing an empty array for dependencies tells React the effect should
        // only run when mounting (and the disposable when unmounting)
        Hooks.useEffectDisposable((fun () ->
            (Browser.Dom.document, "mousedown") ||> attachEvent (fun ev ->
                let menuEl: Element = selfRef.current.Value
                if not(menuEl.contains(ev.target :?> _)) then
                    printfn "Clicked outside!")
        ), [||])

        button
            // We can pass the ref object directly to the new RefHook prop
            // to get a reference to the actual button element in the browser's doom
            [ RefHook selfRef
              OnClick (fun _ -> printfn "Clicked inside!") ]
            [ str "Click me" ]
    )
```

## Type-safe CSS props

The following CSS props now accept a union type instead of a simple string for better type safety and discoverability. Thanks to Zaid-Ajaj for this contribution!

- Display
- Position
- TextAlign
- AlignContent
- AlignItems
- AlignSelf

```fsharp
div [ Display DisplayOptions.Flex ] [ ]
```

## Code Splitting

Fable.React 5 also includes initial support for "code splitting", that is, split your JS bundle in order to defer the download of parts that are not immediately accessible to the user (a very handy feature in Single Page Applications). So far, this has been quite tricky in Fable apps: we had to create a separate project and import it manually using a string. Fable.React 5 includes `FunctionComponent.Lazy` which can automatically defer the download of the code for a React component with minimum changes to your code.

> IMPORTANT: For this feature to work you need `fable-compiler` (npm) 2.3 or higher.

```fsharp
// About.fs
let view (props: {| model: Model; dispatch: Msg->unit |}) = ..

// Router.fs
let AboutPage =
    FunctionComponent.Lazy(
        About.view, // Pass a direct reference to the view function in the external file
        fallback = div [] [str "Loading..."])

let view page =
    match page with
    | Home -> HomePage {| .. |}
    // The code for About.fs will not be downloaded until
    // the user selects the "About" page
    | About -> AboutPage {| .. |}
```

You need also to make sure your webpack config includes the following:

```js
    optimization: {
        splitChunks: {
            chunks: "all"
        },
    },
```

As you've seen, you need to pass a **direct reference to the external function** as first argument to `FunctionComponent.Lazy` (avoid indirections like pipes, etc) so Fable can detect the path to the external file. Also, **avoid other static references to the external file** as this will pull the external code into the main bundle ruining the effect of code splitting. In Elmish apps, you'll usually have to add a reference to the `update` function of the external component. This makes it difficult to completely defer the download of code for the whole component (the state logic will get bundled in the main chunk), but if you separate the code for the component's state and view into different files, as it's common practice in Elmish apps, you can still defer the download of external resources needed for the view like CSS, JS libraries, etc. Have a look at [this PR for a real-world example](https://github.com/MangelMaxime/fulma-demo/pull/27).

Another trick to avoid static references is to use an **anonymous record for the props of the external view function**, so Fable doesn't need to refer to the constructor of a declared record when passing the props.

----------

Those are the most important new features in Fable.React 5 and I hope they help make your development experience with Fable and Elmish much more enjoyable. Looking forward to seeing the awesome projects you'll build with this!
