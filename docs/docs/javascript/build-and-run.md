---
title: Build and Run
layout: standard
---

When targetting JavaScript, there are a lot of ways to build and run your code.

This section will only cover the basics of using [Vite](https://vitejs.dev/)
for more complex scenarios or if you want to use another bundler, please refer to
their respective documentation.

## Setup

<ul class="textual-steps">

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

This file is used to configure Vite.

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
    <!-- Adapt the path to your entry file -->
    <script type="module" src="/Program.fs.js"></script>
  </body>
</html>
```

This file is the entry point of your application. It will load the generated JavaScript file.

</li>

</ul>

## Watch

Run Fable in watch mode and Vite in parallel.

```bash
dotnet fable watch --run npx vite
```

When changes are made to your F# code, Fable will recompile it and Vite will reload the page.

In watch mode Fable will also compile code behind `#if DEBUG` compiler directives.

## Build for production

The following command will build your application for production using Fable and then ask Vite to bundle it.

During the bundling process, Vite will minify your code and remove dead code.

```bash
dotnet fable --run npx vite build
```

## Alternative

When using Vite, you could also consider working with [vite-plugin-fable](https://nojaf.com/vite-plugin-fable/) instead.
