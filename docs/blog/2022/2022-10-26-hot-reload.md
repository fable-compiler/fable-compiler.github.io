---
layout: fable-blog-page
title: "When Fable and F# bring you better tooling than JS"
author: Alfonso García-Caro
date: 2022-10-26
author_link: https://twitter.com/alfonsogcnunez
author_image: https://github.com/alfonsogarciacaro.png
# external_link:
abstract: |
    Using a "non-native" language for web applications usually means there will be some friction and the development experience may not be on par regarding the tooling, but in a few cases Fable developers actually enjoy better tooling. Let's analyze a couple of interesting examples.
---

The JS ecosystem pioneered hot reloading, which has become one of the cornerstones of application development nowadays. One of its best incarnations is React's Fast Refresh which allows components to keep state between hot reloads. Fable developers have also been enjoying this almost since the beginning thanks to Maxime Mangel's work with [Elmish.HMR](https://elmish.github.io/hmr/).

However, if you try JS UI libraries less popular than React, like [Lit](https://lit.dev/) or [Solid](https://www.solidjs.com/), you may notice that not all of them offer the same level for hot reloading, particularly (as far as I know and at the time of writing) components won't keep state between reloads. This is because plugins (e.g. for [Webpack](https://webpack.js.org/plugins/) or [Vite](https://vitejs.dev/plugins/)) are needed to support this and it's not easy for a small team to maintain plugins for multiple bundlers.

However, if you check the Fable bindings for [Lit](https://fable.io/Fable.Lit/docs/hmr.html) or [Solid](2022-10-18-fable-solid.html) (through `createElmishStore`) you'll notice they **do** support hot reloading with state preservation. Moreover, the Fable libraries don't need any additional plugin for this. How is it even possible? Although it's not necessary for Fable users to learn how this works behind the curtains, I think it is interesting to learn how some of the advanced F# features can be used for better interaction with JS tooling:

- **Conditional Compilation**: In F# it's possible to use `#if` and `#else` pragmas to conditionally compile code blocks. This makes it easy for Fable library authors to include code only for development that can be easily ignored when the app is actually deployed.

> In JS, `process.env.NODE_ENV !== 'production'` has become a convention to exclude debug code in production. Although this is not a native feature of the language and depends on the use of specific tooling.

> Note it's only possible for F# libraries to use conditional compilation because Fable always compiles source files. In .NET libraries are distributed in .dll form, so usually they cannot take advantage of pragmas.

- **Inlining**: F# lets you specify when a function should be inlined with the `inline` keyword. This is important because bundlers usually require the code to handle hot reloading to be present in the file being updated. A similar effect in JS can only be achieved by using a plugin to inject the code. In F#, the library itself can inject the extra code without any additional plugin.

> Avoiding plugins makes it easier both for users and maintainers to enjoy the benefits of hot reloading without much hassle. Take into account that, when going down the plugin road, you need to write a plugin for each different bundler out there. Elmish.HMR and Fable.Lit support hot reloading with both Webpack and Vite directly from the library code (at the time of writing, `createElmishStore` from Elmish.Solid only supports vite).

- **Caller Information**: F# lets you obtain information about the caller by using specific parameter attributes, like `CallerFilePath`. This is very useful for hot reloading, because the bundlers API usually provides you with a "bag" to pass the state between reloads. By knowing the caller file, line or member name, we can distinguish the state for different components in the same bag.

<br />

In this short post, we have seen how several advanced F# features can be used in the unexpected (for the F# designers) scenario of interaction with JS tooling, and how F# and Fable can do this from a library without the need of extra plugins. This is very important to keep up with the ever evolving JS ecosystem. Just while writing these lines the [next "revolutionary" bundler has been announced](https://vercel.com/blog/turbopack)! Thankfully, when the time comes to support it, the only thing Fable library authors will need to do is to push a new version of their packages.