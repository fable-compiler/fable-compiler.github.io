---
title: Start a new project
---

[[toc]]

Now we're ready, let's start a new project using Fable!

## Use the official templates

<ul class="textual-steps">

<li>

### Use a Fable template

The easiest way to get started with Fable is to use one of the Fable official templates. First list them, then pick a template with a name that starts with "fable" to create a new project.

1. `dotnet new -i 'Fable.Template::*'`
2. `mkdir MyFirstFableProject ; cd MyFirstFableProject`
3. `dotnet new fable`

or, for example,

3. `dotnet new fable-react-elmish`
</li>

<li>

### Install dependencies

**JS dependencies** are listed in the `package.json` file. You can run `npm install`, which will download the needed packages to the `node_modules` folder and create a lock file.

**.NET dependencies** are listed in the `src/App.fsproj` file. You can install them by running `dotnet restore`, but this is already automatically done by Fable.

:::info
Lock files (like `package-lock.json` if you're using npm) should be committed to ensure reproducible builds whenever anybody clones your repo.
:::

</li>

<li>

### Build & run the app

Here we go.

1. `cd src`
2. `dotnet build`
3. `cd ..`
4. `npm start`

Your web server app is now running in foreground until you kill it.

While the server is running
- You can access your project at [http://localhost:8080/](http://localhost:8080/) with your favorite browser.
- The server is in “watch” mode, so you will see server console output in the terminal window.
- You can edit the `App.fs` file located in the `src` folder. Each time you save the file, Fable rebuilds the project automatically. If the build succeeds, you will see your changes in the browser without refreshing the page; if not, nothing changes in the browser, and you can see the build errors in the server’s console output.

:::info
Always check the `README.md` file shipped with the template to get up-to-date instructions.
:::

</li>
</ul>
