---
title: Start a new project
---

[[toc]]

Now we're ready, let's start a new project using Fable!

## Use the official templates

<ul class="textual-steps">

<li>

### Use Fable template

The easiest way to get starting with Fable is by using Fable official template.

1. `dotnet new -i "Fable.Template::*"`
2. `dotnet new fable -n MyFirstFableProject`
3. `cd MyFirstFableProject`

</li>

<li>

### Install dependencies

**JS dependencies** are listed in the `package.json` file. You can run `npm install`, which will download the packages to the `node_modules` folder and create a lock file.

**.NET dependencies** are listed in the `src/App.fsproj` file. You can install them by running `dotnet restore`, but this is already automatically done by Fable.

:::info
Lock files (like `package-lock.json` if you're using npm) should be committed to ensure reproducible builds whenever anybody clones the repo.
:::

</li>

<li>

### Build & run the app

Now that we're done with the dependencies, let's start our app in watch mode.

Execute `npm start` when the compilation is done, you'll be able to access your project from [http://localhost:8080/](http://localhost:8080/) with your favorite browser.

If you now open the project with your code editor, you can make some changes in the `App.fs` file located in the `src` folder. Save it and if the compilation succeeds you should be able to see your changes directly in your browser.

:::info
Always check the `README.md` file shipped with the template to get up-to-date instructions.
:::

</li>
</ul>
