---
title: Use a Fable library
layout: standard
---

## Introduction

We often use libraries using [NuGet](https://www.nuget.org/), which is the defacto .NET package manager.

So we do need libraries. And Fable proposes a great variety of libraries ready for you to use like:

- [Fable.Core](https://www.nuget.org/packages/Fable.Core/), which is required for every Fable project
- [Fable.Browser.Dom](https://www.nuget.org/packages/Fable.Browser.Dom), for all your DOM needs (window, document)
- [Fable.Elmish.React](https://www.nuget.org/packages/Fable.Elmish.React), to write web apps using the Elm architecture and React as the render engine
- [Thoth.Json](https://www.nuget.org/packages/Thoth.Json), for JSON serialization

> Please note that not all Nuget libraries will work with Fable. Refer to the library documentation to check if it's Fable-compatible.

There are 2 ways to call Fable libraries:

1. Reference them directly in your project file
2. Use [Paket](https://fsprojects.github.io/Paket/)

## Install a Fable library

Fable libraries are usually published on [Nuget](https://www.nuget.org/), which is the defacto .NET package manager.

You can use you favorite Nuget package manager to install them, like Nuget CLI, Paket, Visual Studio, Rider, etc.

Nuget CLI:

```bash
dotnet add package <package name>
```

Paket:

```bash
dotnet paket add <package name>
```

Please, refer to your Nuget package manager documentation to learn more about how to use it.

Depending on the type of library, it can happen that you also need to install a native dependency.

For example, if you are using a project that use React, you will need to install the `react` and `react-dom` from NPM packages.

You need to refer to your library documentation to know if you need to install a native dependency.

### Femto

[Femto](https://github.com/Zaid-Ajaj/Femto) is a tool that can help you install 
native dependencies if the library contains Femto metadata.

Use `dotnet femto yourProject.fsproj` to check if your Fable dependencies
requirements are met.

Use `dotnet femto --resolve yourProject.fsproj` to let Femto try to install
the native dependencies for you.

At the time of writing, Femto supports:

- JavaScript/TypeScript
    - `npm` (default)
    - `yarn` when `yarn.lock` is found
    - `pnpm` when `pnpm-lock.yaml` is detected
- Python
    - `poetry` when `pyproject.toml` is detected