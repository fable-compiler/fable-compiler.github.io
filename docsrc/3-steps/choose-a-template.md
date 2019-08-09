---
title: Start a new project using samples
---

[[toc]]

**Start a new project**

Now we're ready, let's start a new project using Fable!

<ul class="textual-steps">
<li>

## Download a Fable sample

The most common way is to download the *Fable suite of samples* using `git clone https://github.com/fable-compiler/fable2-samples.git`. There are several samples ready to use. Each located in its own folder. 

* **Browser project**

    * Simple HTML5 canvas and Browser DOM (*[browser](https://github.com/fable-compiler/fable2-samples/tree/master/browser)*)

    * More complex browser app with fetch & promises & json parsing (*[promises](https://github.com/fable-compiler/fable2-samples/tree/master/promises)*)

* **React project**

    * [Elm](https://elm-lang.org/) like [single page application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) with React (*[minimal](https://github.com/fable-compiler/fable2-samples/tree/master/minimal)*)

    * Start a frontend app SPA using Bulma & React (`git clone https://github.com/MangelMaxime/fulma-demo`)

* **Node.js project**

    * Node.js app with fetch & promises (*[nodejs](https://github.com/fable-compiler/fable2-samples/tree/master/nodejs)*)

    * Bundled Node.js app with fetch & promises (*[nodejsbundle](https://github.com/fable-compiler/fable2-samples/tree/master/nodejsbundle)*)

* **Advanced samples**

    * Browser app with fetch & promises & json parsing using .paket manager to resolve .NET dependencies (*[withpaket](https://github.com/fable-compiler/fable2-samples/tree/master/withpaket)*)

    * Browser app which features interoperability: calling our javascript code from Fable (*[interop](https://github.com/fable-compiler/fable2-samples/tree/master/interop)*)

    * Browser app which features interoperability: calling our Fable code from javascript (*[interopFableFromJs](https://github.com/fable-compiler/fable2-samples/tree/master/interopFableFromJs)*)

</li>

<li>

## Install JS dependencies

The JS dependencies are located in the package.json file. Since we're using JS libraries, we'll need to install them

- using npm: `npm install`

It will create a `node_modules` folder and a `package-lock.json` file. 

**A note about lock files**

Lock files like `package-lock.json`, if you're using npm should be committed to ensure reproducible builds whenever anybody clones the repo.

</li>

<li>

## Build & Run & Update the app

Now we're done the dependencies, let's start our app in watch mode. Depending on the kind of template the instructions my differ.

:::info
Always read the `README.md` file shipped in a template so that you always get things to work properly.
:::

**Web app**

For a web app, unless advised, it will always be `npm start`

Then you'll be able to access your project from [http://localhost:8080/](http://localhost:8080/). So it's time to open this address in your favorite browser.

If you now open the project with your favourite code editor, you can make some changes in the `App.fs` file located in the `src` folder. Save the changes and if compilation succeeds you should be able to see your changes directly in your browser.

**Node.js app**

For a Node.js app, unless advised, it will always be `npm build`

Then you'll be able see the generated JS files in the `build` folder.

:::info
In general, check the `README.md` and `package.json` to get more information about the project and other build targets.
:::

</li>
</ul>
