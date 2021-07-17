---
title: Migration to Fable 2
layout: fable-blog-page
author: Mangel Maxime
date: 2018-10-01
author_link: https://twitter.com/MangelMaxime
author_image: https://github.com/MangelMaxime.png
# external_link:
abstract: |
  With this document we are going to convert a Fable 1 project into a Fable 2 project. This guide has been writed by converting Fulma.Minimal template from Fable 1 to Fable 2.
---

## TL;DR

With this document we are going to convert a Fable 1 project into a Fable 2 project.

<div class="message is-info">
<div class="message-body">
This guide has been writed by converting Fulma.Minimal template from Fable 1 to Fable 2.

You can see all the changes made by looking at [this commit](https://github.com/MangelMaxime/Fulma/commit/24c9269fc08eac9c66e774aec4a5fe4132968805).
</div>
</div>

### Upgrade to Babel 7

During Fable 2 development, [Babel 7](https://babeljs.io/blog/2018/08/27/7.0.0) has been released so we need to upgrade to it. Helpfully for us, they created a tool to help us.

1. Install [npx](https://github.com/zkat/npx#readme), this a CLI program allowing us to run npm packages.

    - Maybe it came with node/npm: `npx --help`
    - For npm: `npm install -g npx`
    - For yarn: `yarn global add npx`

2. Run `npx babel-upgrade --write`, this will modify the nearest `package.json`

### Upgrade fable's npm package

1. Upgrade `fable-loader` to latest version `2.x.x`

    - For npm: `npm update fable-loader@latest`
    - For yarn: `yarn upgrade fable-loader@latest`

2. Remove `fable-utils`, it is not needed anymore

    - For npm: `npm uninstall fable-utils`
    - For yarn: `yarn remove fable-utils`


### Update your webpack.config.js

<div class="message is-info">
<div class="message-body">

In order to best benefit of new Fable 2 tree-shaking and module size reduction we encourage you to upgrade all your webpack related packages to their latest version.

</div>
</div>

Here are the key points to consider for updating your `webpack.config.js`:

##### 1. Remove `resolve.modules`

Now, fable will create a `.fable` folder located near your `package.json` so JavaScript tools works natively.

Remove this lines from your `webpack.config.js`

<div class="columns">
<div class="column"></div>
<div class="column is-half">

```js
resolve: {
    modules: [
        "node_modules/",
        resolve("./node_modules/")
    ]
},
```

</div>
<div class="column"></div>
</div>

##### 2. Remove any reference to `fable-utils`

<div class="columns">

<div class="column">
<div class="has-text-centered has-text-weight-semibold">
With Fable 1
</div>

```js
const fableUtils = require("fable-utils");

// ...

var babelOptions = fableUtils.resolveBabelOptions({
    presets: [
        // ...
```

</div>

<div class="column">
<div class="has-text-centered has-text-weight-semibold">
With Fable 2
</div>

```js




var babelOptions = {
    presets: [
        // ...
```

</div>

</div>


##### 3. Update `babelOptions`

Because you are now using Babel 7, you need to use `@babel` scope if available.

<div class="columns">

<div class="column">
<div class="has-text-centered has-text-weight-semibold">
With Fable 1
</div>

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

```js
babel-polyfill
```

</div>

<div class="column">
<div class="has-text-centered has-text-weight-semibold">
With Fable 2
</div>

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

```js
@babel/polyfill
```

</div>

</div>

##### 4. Remove unnecessary absolute paths

Because Fable 2, now creates a `.fable` folder you are not forced anymore to use **absolute** filepaths. All the filepaths are now relative to the nearest `package.json` found by Fable.

<div class="message is-info">
<div class="message-body">

If you are not sure of your *current working directory*, you can run Fable.

```
Fable (2.0.1) daemon started on port 56569
CWD: /Users/maximemangel/Workspaces/Github/MangelMaxime/Fulma/templates/Content
```

Here the *current working directory* is `/Users/maximemangel/Workspaces/Github/MangelMaxime/Fulma/templates/Content`

</div>
</div>

<div class="message is-warning">
<div class="message-body">

If you are using latest version of Webpack you still need to provide an absolute path for the `output`


```js
module.exports = {
    // ...
    output: {
        path: path.join(__dirname, CONFIG.outputDir),
    }
    // ...
};
```
</div>
</div>


You can find [here](https://github.com/fable-compiler/webpack-config-template/blob/master/webpack.config.js) a `webpack.config.js` file to serve as a template for yours.

If needed you can also take a look at the Fulma.Minimal diff [here](https://github.com/MangelMaxime/Fulma/commit/24c9269fc08eac9c66e774aec4a5fe4132968805#diff-b81ec06774f7dfd70d0cac66cf146951).

### Update fable nuget package

Run `.paket/paket.exe update` to install the latest version of your dependencies. You can check that you are using the correct version of the package by comparing with this list:

<div class="has-text-centered has-text-italic">
At the time of writing here are the version retrieved
</div>

<div class="columns">
<div class="column"></div>
<div class="column">

<table class="table is-hoverable is-striped" style="min-width: 300px">
<thead>
<tr>
<th> Package </th>
<th> Version </th>
</tr>
</thead>
<tbody>

<tr class="has-background-grey-lighter">
    <td class="has-text-centered" colspan="2"> Common to any Fable project </td>
</tr>

<tr>
    <td>Fable.Core</td>
    <td> 2.0.0</td>
</tr>
<tr>
    <td>dotnet-fable</td>
    <td> 2.0.1</td>
</tr>

<tr class="has-background-grey-lighter">
<td class="has-text-centered" <td colspan="2"> For projects using Elmish </td>
</tr>

<tr>
    <td> Fable.React </td>
    <td> 4.0.1 </td>
</tr>
<tr>
    <td> Fable.Elmish </td>
    <td> 2.0.0 </td>
</tr>
<tr>
    <td> Fable.Elmish.React </td>
    <td> 2.0.0 </td>
</tr>
<tr>
    <td> Fable.Elmish.Browser </td>
    <td> 2.0.0 </td>
</tr>
<tr>
    <td> Fable.Elmish.Debugger </td>
    <td> 2.0.0 </td>
</tr>
<tr>
    <td> Fable.Elmish.HMR </td>
    <td> 2.0.0 </td>
</tr>

</tbody>
</thead>
</table>

</div>

<div class="column is-1-desktop"></div>

<div class="column">

<table class="table is-hoverable is-striped" style="min-width: 300px">
<thead>
<tr>
<th> Package </th>
<th> Version </th>
</tr>
</thead>

<tbody>

<tr class="has-background-grey-lighter">
    <td class="has-text-centered" colspan="2"> General libraries </td>
</tr>

<tr>
    <td> Fable.PowerPack </td>
    <td> 2.0.1 </td>
</tr>
<tr>
    <td> Fulma </td>
    <td> 1.0.0 </td>
</tr>
<tr>
    <td> Fulma.Extensions </td>
    <td> 1.0.0 </td>
</tr>
<tr>
    <td> Thoth.Json </td>
    <td> 2.1.0 </td>
</tr>

</tbody>
</thead>
</table>

</div>
<div class="column"></div>
</div>

### Breaking changes

Fable 2 introduce severals breaking changes, it will inform you by displaying an *obsolete* warning or by generating a warning in the ouput.


Most important changes are:

- `PojoAttribute` is not needed anymore
- `PassGenericsAttribute` is also deprecated. If you need to resolve a generic argument, please inline the function. If you only need the `Type` of a generic argument, you can use [the `Fable.Core.Inject` attribute with `ITypeResolver`](https://github.com/fable-compiler/Fable/blob/d0f09bb74524c03d200249ea12906e426e170b44/tests/Main/ReflectionTests.fs#L402-L405).
- **JSON serialization**, you now need to choose between [Thoth.Json](https://mangelmaxime.github.io/Thoth/json/v2/decode.html) and [Fable.SimpleJson](https://github.com/Zaid-Ajaj/Fable.SimpleJson/). If you need to support serialization both on Fable and .Net side you need to use [Thoth.Json](https://mangelmaxime.github.io/Thoth/json/v2/net.html) as Fable.SimpleJson is based on a JavaScript library.

If you want to quickly test Fable 2 and not convert all your `ofJson/toJson` reference yet. You can use the following polyfills:

<div class="columns">
<div class="column"></div>
<div class="column">

```fsharp
open Thoth.Json

let inline toJson x = Encode.Auto.toString(0, x)

let inline ofJson<'T> json = Decode.Auto.unsafeFromString<'T>(json)
```

</div>
<div class="column"></div>
</div>

See [Thoth.Json auto decoder](https://mangelmaxime.github.io/Thoth/json/v2/decode.html#auto-decoder) documentation for more information about them.
