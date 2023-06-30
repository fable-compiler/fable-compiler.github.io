---
title: Start a new project
layout: standard
---

This guide you will show you how to create a Fable project from an F# project.

<ul class="textual-steps">

<li>

Create a new directory for your project and navigate to it.

```bash
mkdir my-fable-project
cd my-fable-project
```

</li>

<li>

Create a new F# project.

```bash
dotnet new console -lang F#
```

You should now have 2 files:

- `Program.fs`: the entry point of your app
- `my-fable-project.fsproj`: the project file which lists your F# code files and libraries

</li>

<li>

Install Fable tool so we can invoke it from the command line.

```bash
dotnet new tool-manifest
dotnet tool install fable
```

</li>

<li>

Add [Fable.Core](https://fable.io/packages/#/package/Fable.Core) to your project.

```bash
dotnet add package Fable.Core
```

</li>


<li>

We can now call Fable to transpile our F# code to the desired target.

```bash
# If you want to transpile to JavaScript
dotnet fable

# If you want to transpile to TypeScript
dotnet fable --lang typescript

# If you want to transpile to Python
dotnet fable --lang python
```
:::info
If you are switching between languages make sure to delete the `fable_modules` folder before invoking Fable again.
:::

You should now see a file `Program.fs.<ext>` where `<ext>` is the target language extension. For example, if you transpiled to JavaScript, you should see a `Program.fs.js` file.

You can now use this file as you would use any other native file in your project.

To go further look into the respective target documentation to have an example of how to use the generated file:

- [JavaScript](/docs/getting-started/javascript.html)
- [TypeScript](/docs/getting-started/typescript.html)
- [Python](/docs/getting-started/python.html)
- [Rust](/docs/getting-started/rust.html)
<!-- - [Dart](/docs/getting-started/dart.html)
- [PHP](/docs/getting-started/php.html) -->

</li>

</ul>
