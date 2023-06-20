---
title: TypeScript
layout: standard
---

This section is specific to TypeScript targetting, it will guide you through the process of setting up your project and using Fable with TypeScript.

We will cover the basics of using Node.js and [Vite](https://vitejs.dev/) for the browser, but you can use any tools you want.

## Node.js

:::info
Please make sure you followed the [Fable setup guide](/docs/2-steps/your-first-fable-project) before continuing.
:::

In this section, we are going to see how to run Fable code using Node.js.

When using JavaScript, you will need a `package.json` to manage your dependencies. 
This file also allows you to confiture the type of `module` that Node.js use to interpret your code.

<ul class="textual-steps">

<li>

Generate a `package.json` file.

```bash
npm init -y
```

</li>

<li>

Add the following line to the generated `package.json` file:

```json
"type": "module",
```

It should looks something like that now:

```json
{
  "name": "my-fable-project",
  "version": "1.0.0",
  "type": "module",
  "description": "",
  "main": "Program.fs.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

</li>

<li>

Install TypeScript compiler and Node.js type definitions.

```bash
npm i -D typescript @types/node
```

</li>

<li>

Use TypeScript to compile your F# code.

```bash
npx tsc Program.fs --target es2022
```

</li>

<li>

Run your code.

```bash
node Program.fs.js
```

You should see `Hello from F#` in your terminal.

</li>

<li>

When targeting the Node.JS, you will probably want to have access to the Node.JS API.

To do so, you can use the [Fable.Node](https://github.com/fable-compiler/fable-node).

```bash
dotnet add package Fable.Node
```

</li>

<li>

Change the content of `Program.fs` to the following:

```fs
open Node.Api

fs.writeFileSync("test.txt",  "Hello World")
```

</li>

<li>

Run Fable and TypeScript in watch mode.

The follwing command start Fable in watch mode, and after the first Fable compilation, it will start TypeScript in watch mode.

In the [TypeSript]() section, we will learn how to use [Fun.Build]()
to organize and simplify our build process.

```bash
dotnet fable watch --lang typescript --run npx tsc Program.fs.ts --target es2022 --watch --preserveWatchOutput
```

If you run your node script again, you should see a new file `test.txt` with the content `Hello World`.

Try changing the content of `Hello World` to something else and re-run your script.

You should see that Fable and TypeScript re-compile your code and the file content changed.
</li>

</ul>

## Browser

:::info
Please make sure you followed the [Fable setup guide](/docs/2-steps/your-first-fable-project) before continuing.
:::

In this section, we are going to use [Vite](https://vitejs.dev/) as a development server to run our code in the browser.

If you want to use another bundler, please refer to their respective documentation.

<ul class="textual-steps">

<li>

Generate a `package.json` file.

```bash
npm init -y
```

</li>

<li>

Install Vite.

```bash
npm i -D vite
```

</li>

<li>

Create `vite.config.ts` file, and add the following content:

```ts
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    clearScreen: false,
    server: {
        watch: {
            ignored: [
                "**/*.fs" // Don't watch F# files
            ]
        }
    }
})
```

</li>

<li>

Create `index.html` file, and add the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fable</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/Program.fs.ts"></script>
  </body>
</html>
```

This file is the entry point of your application. It will load the generated JavaScript file.

</li>

<li>

Run Vite and go to the indicated URL.

```bash
npx vite
```

If you open the browser console, you should see `Hello from F#`.

</li>

<li>

When targeting the Browser, you will probably want to have access to the Browser API.

To do so, you can use the [Fable.Browser.Dom](https://github.com/fable-compiler/fable-browser).

```bash
dotnet add package Fable.Browser.Dom
```

</li>

<li>

Change the content of `Program.fs` to the following:

```fs
open Browser

let div = document.createElement "div"
div.innerHTML <- "Hello world!"
document.body.appendChild div |> ignore
```

</li>

<li>

Run Fable in watch mode and Vite in parallel.

```bash
dotnet fable watch --lang typescript --run npx vite
```

If you open the browser, you should see `Hello world!`.

Try changing the content of `Program.fs` and see the result in the browser.

</li>

</ul>