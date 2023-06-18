---
title: Setup
layout: standard
---

## Prerequisites

In order to use Fable you will need the following tools:

:::warning
Fable 3 only support up to .NET 6.

If you have .NET 7 installed on your system, you will need to add a `global.json` file to your project to ensure .NET 6 is used.

*Example:* 

`{
    "sdk": {
      "version": "6.0.0",
      "rollForward": "latestMinor"
    }
}
`
:::

- [.NET Core SDK](https://dotnet.microsoft.com/) to work with F# files and dependencies
- [Node.js](https://nodejs.org/) to execute JS code
- A JS package manager, like [npm](https://www.npmjs.com/) (which comes with Node) or [yarn](https://yarnpkg.com/)

Having the above tools, you may consider using [Femto](https://fable.io/blog/2019/2019-06-29-Introducing-Femto.html) to ease package management.

## Development tools

Basically you will need an editor that lets you code in F# with features like hints on hover, autocomplete, syntax highlighting and so on... and there are many of them to suit your code styling!

- [Visual Studio Code](https://code.visualstudio.com/) with [Ionide](http://ionide.io/)
- [JetBrains Rider](https://www.jetbrains.com/rider/)
- [Visual Studio For Windows](https://visualstudio.microsoft.com/)
- [Visual Studio For Mac](https://visualstudio.microsoft.com/vs/mac/)
- [Vim](https://www.vim.org/) with [F# bindings](https://github.com/fsharp/vim-fsharp)
- [Emacs](https://www.gnu.org/software/emacs/)/[spacemacs](http://spacemacs.org/) with [fsharp-mode](https://github.com/fsharp/emacs-fsharp-mode)
