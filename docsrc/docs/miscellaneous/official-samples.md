---
title: Check official samples
layout: standard
---

<ul class="textual-steps">

<li>

## Download a Fable sample

Fable can target different JavaScript runtimes like Node.js, Browser, etc. To make it easier for people to explore Fable usage we created fable2-samples [Github repo](https://github.com/fable-compiler/fable2-samples).

This repository contains several samples ready to use, each located in its own folder.

:::info
If you are interested in a full-stack F# solution that covers both the backend (using .NET) and the frontend (using Fable), check out the [SAFE-Stack](https://safe-stack.github.io/).
:::

* **Browser samples**

  * Simple HTML5 canvas and Browser DOM: *[/browser](https://github.com/fable-compiler/fable2-samples/tree/master/browser)*

  * More complex browser app with fetch & promises & json parsing: *[/promises](https://github.com/fable-compiler/fable2-samples/tree/master/promises)*

* **React samples**

  * [Elm](https://elm-lang.org/)-like [single page application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) with React: *[/minimal](https://github.com/fable-compiler/fable2-samples/tree/master/minimal)*

  * Start a frontend app SPA using Bulma & React (`git clone https://github.com/MangelMaxime/fulma-demo`)

* **Node.js samples**

  * Node.js app with fetch & promises: *[/nodejs](https://github.com/fable-compiler/fable2-samples/tree/master/nodejs)*

  * Bundled Node.js app with fetch & promises: (*/[nodejsbundle](https://github.com/fable-compiler/fable2-samples/tree/master/nodejsbundle)*

* **Advanced samples**

  * Using Paket to resolve .NET dependencies: *[/withpaket](https://github.com/fable-compiler/fable2-samples/tree/master/withpaket)*

  * Interoperability: calling JS code from Fable: *[/interop](https://github.com/fable-compiler/fable2-samples/tree/master/interop)*

  * Interoperability: calling Fable code from JS: *[/interopFableFromJs](https://github.com/fable-compiler/fable2-samples/tree/master/interopFableFromJs)*

</li>

<li>

## Install dependencies

**JS dependencies** are listed in the `package.json` file. If you are using npm, you can run `npm install`, which will download the packages to the `node_modules` folder and create a lock file.

Depending on whether you're using Nuget or Paket, **.NET dependencies** will be listed in the `.fsproj` or `paket.references` files. You can install them by running `dotnet restore`, but this is already automatically done by Fable.

:::info
Lock files (like `package-lock.json` if you're using npm) should be committed to ensure reproducible builds whenever anybody clones the repo.
:::

</li>

<li>

## Build & run the app

Now that we're done with the dependencies, let's start our app in watch mode. Depending on the kind of template the instructions my differ.

**Web samples**

For web samples, unless advised, it will always be `npm start`

Then you'll be able to access your project from [http://localhost:8080/](http://localhost:8080/) with your favorite browser.

If you now open the project with your code editor, you can make some changes in the `App.fs` file located in the `src` folder. Save it and if the compilation succeeds you should be able to see your changes directly in your browser.

**Node.js samples**

For Node.js samples, unless advised, it will always be `npm build`

Then you'll be able see the generated JS files in the `build` folder.

:::info
Always check the `README.md` file shipped with the template to get up-to-date instructions.
:::

</li>
</ul>
