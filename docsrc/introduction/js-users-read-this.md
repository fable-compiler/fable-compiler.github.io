---
title: Are you a JS developer?
---

## Welcome to Fable!

Hi!

We're happy you decided to try Fable which is basically F# transpiled to JavaScript.  Since it's F# and F# is a language first created for the .NET environment, Fable uses some tools that come from there.

Don't panic! There is enough documentation to explain how the .NET tools integrate in your environment. But we've decided to share a list of common thing you need to know about .NET. In fact there are only two things:

1. Fable uses F# project files (`.fsproj`) to list your F# code files and libraries.
2. Fable uses NuGet to load F# libraries, which is the equivalent of NPM for the .NET environment

Voilà. Nothing else. We'll come to explanations later in the doc. But we promise, there's nothing you won't understand right away. Apart these facts, it's all JavaScript!

**Welcome home!**

- Fable transpiles F# to ES6 JavaScript, Fable uses the great [Babel](https://babeljs.io/) tool to do that
- Fable allows the use of your favorite bundle tools like [Rollup](https://rollupjs.org/guide/en) or [webpack](https://webpack.js.org/). And it's not hard to use any other one.
- JS Dependencies are listed in you common `package.json` file
- [webpack](https://webpack.js.org/) configuration is often ready to use
- Unit testing is available through the use of Mocha (but you can use another tool if you wish)
- In most cases, preparing a Fable project only needs to call `npm install`
- In most cases, building a Fable project only needs to call `npm start` (but you can change this in the `package.json file`)

So since we're mainly using JavaScript tools, you won't be lost with Fable!
