---
title: Are you a JS developer?
layout: standard
---

## Welcome to Fable!

Hi!

We're happy you decided to try Fable. Since F# is a language originally created for the .NET environment, Fable uses some tools that come from there.

Don't panic! There is enough documentation to explain how the .NET tools integrate in your environment. And there are basically only two things you need to know:

1. Fable uses F# project files (`.fsproj`) to list your F# code files and libraries.
2. Fable uses NuGet to load F# libraries, which is the equivalent of NPM for the .NET environment

Voilà. Nothing else. We'll come to explanations later in the docs. But we promise, there's nothing you won't understand right away. Apart from these facts, it's all JavaScript!

### Welcome home!

- Fable transpiles F# to ES2015 JavaScript
- Fable integrates with your favorites bundler ([Vite](https://vitejs.dev/), [Parcel](https://parceljs.org/), [Webpack](https://webpack.js.org/), ...)
- JS Dependencies are listed in your common `package.json` file.
- Unit testing is available through [Fable.Mocha](https://github.com/Zaid-Ajaj/Fable.Mocha) (but you can use another test runner if you wish).

So since we're mainly using JavaScript tools, you won't be lost with Fable!

### Fable workflow

The main differences when using Fable is instead of writing JavaScript file, you will write F# and then use the generated JavaScript files.

So if we consider the following JavaScript workflow:

1. Write `*.js` files
1. Use JavaScript dependencies manager
1. Use JavaScript build tools
1. Run the app

Then when using Fable, the workflow become is:

1. Write F# files
1. *Optional:* Consume the generated files `*.fs.js` from your `*.js` files
1. Use JavaScript dependencies manager
1. Use JavaScript build tools
1. Run the app
