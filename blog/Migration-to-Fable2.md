- title: Migration to Fable 2
- subtitle: Everything you need to know to migrate

## TL;DR

With this document we are going to convert a Fable 1 project into a Fable 2 project.

<div class="message is-info">
<div class="message-body">
This guide has been writed by converting Fulma.Minimal template from Fable 1 to Fable 2.

You can see all the changes made by looking at [this commits](https://github.com/MangelMaxime/Fulma/commit/24c9269fc08eac9c66e774aec4a5fe4132968805).
</div>
</div>

## Upgrade to Babel 7

During Fable 2, development [Babel 7](https://babeljs.io/blog/2018/08/27/7.0.0) has been released so we need to upgrade to it. Hopefully for us, they created a tool to help us.

1. Install [npx](https://github.com/zkat/npx#readme), this a CLI program allowing us to run npm packages.

    - For npm: `npm install -g npx`
    - For yarn: `yarn global add npx`

2. Run `npx babel-upgrade --write`, this will modify the nearest `package.json` and convert all you old `babel-` reference to their scoped reference if their exist.

    For example, `babel-polyfill` is converted to `@babel/polyfill`

## Upgrade fable's npm package

1. You need to upgrade `fable-loader` to latest version `2.x.x`

    - For npm: `npm update fable-loader@latest`
    - For yarn: `yarn upgrade fable-loader@latest`

2. We don't need anymore `fable-utils`, so remove it

    - For npm: `npm uninstal fable-utils`
    - For yarn: `yarn remove fable-utils`


## Update your webpack.config.js

<div class="message is-info">
<div class="message-body">

In order to best benefit, of new Fable 2 tree-shaking and module size reduction we encourage you to upgrade all your webpack related package to their latest version.

</div>
</div>

Here are the key points to consider for updating your `webpack.config.js`:
- Custom `resolve.modules` isn't needed anymore. Now, fable will create a `.fable` folder located near your `package.json` so JS tools works natively
    You can remove this lines from your `webpack.config.js`
    ```js
    resolve: {
        modules: [
            "node_modules/",
            resolve("./node_modules/")
        ]
    },
    ```
- Remove any reference to `fable-utils` like:
    - `const fableUtils = require("fable-utils");`
    - `fableUtils.resolveBabelOptions`
- Convert your `babelOptions` and any thing related to `babel-` to use `@babel` scope if available

    **babel options**
    ```js
    var babelOptions = fableUtils.resolveBabelOptions({
        presets: [
            ["env", {
                "targets": {
                    "browsers": ["last 2 versions"]
                },
                "modules": false
            }]
        ]
    });
    ```
    becomes
    ```js
    var babelOptions = {
        presets: [
            ["@babel/preset-env", {
                "targets": {
                    "browsers": ["last 2 versions"]
                },
                "modules": false
            }]
        ]
    };
    ```

    **babel polyfill**

    "babel-polyfill", becomes "@babel/polyfill"

- Because Fable 2, now create a `.fable` folder you are not forced anymore to use **absolute** filepath. All the filepath are now relative to the nearest `package.json` found by Fable. When running Fable, it will tell you what it's *current working directory* is.
    For example:

        Fable (2.0.1) daemon started on port 56569
        CWD: /Users/maximemangel/Workspaces/Github/MangelMaxime/Fulma/templates/Content

You can find [here a webpack.config.js](https://github.com/fable-compiler/webpack-config-template/blob/master/webpack.config.js) file to serve as a template for yours.

If needed you can also take a look at the Fulma.Minimal diff [here](https://github.com/MangelMaxime/Fulma/commit/24c9269fc08eac9c66e774aec4a5fe4132968805#diff-b81ec06774f7dfd70d0cac66cf146951).

## Update fable nuget package

Run `.paket/paket.exe update` to install the latest version of your dependencies. You check that you are using the correct version of the package by comparing with this list:

*At the time of writing is are the version retrieved*

**Common to any Fable porject**

<div style="max-width: 300px">

| Package | Version |
|---|---|
| Fable.Core | 2.0.0 |
| dotnet-fable | 2.0.1 |

</div>
<br/>

**For projects using Elmish**

<div style="max-width: 300px">

| Package | Version |
|---|---|
| Fable.React | 4.0.1 |
| Fable.Elmish | 2.0.0 |
| Fable.Elmish.React | 2.0.0 |
| Fable.Elmish.Browser | 2.0.0 |
| Fable.Elmish.Debugger | 2.0.0 |
| Fable.Elmish.HMR | 2.0.0 |

</div>
<br/>

**General libraries** *you can send a PR if you think some commonly used library are missing*

<div style="max-width: 300px">

| Package | Version |
|---|---|
| Fable.PowerPack | 2.0.1 |
| Fulma | 1.0.0 |
| Fulma.Extensions | 1.0.0 |
| Thoth.Json | 2.0.0 |

</div>

## Breaking changes

Fable 2 introduce severals breaking changes, it will inform you by displaying an *obsolete* warning or by generating a warning in the ouput.

Special mention for the **JSON serialization**, you now need to choose between [Thoth.Json](https://mangelmaxime.github.io/Thoth/json/v2/decode.html) and [Fable.SimpleJson](https://github.com/Zaid-Ajaj/Fable.SimpleJson/). If you need to support serialization both on Fable and .Net side you need to use [Thoth.Json](https://mangelmaxime.github.io/Thoth/json/v2/net.html) as Fable.SimpleJson is based on a JavaScript library.
