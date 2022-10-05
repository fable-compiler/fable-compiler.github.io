---
title: Author a Fable library
layout: standard
---

## Requirements

To write a library that can be used in Fable you need to fulfill a few conditions:

- Don't use FSharp.Core/BCL APIs that are not [compatible with Fable](../dotnet/compatibility.html).
- Keep a simple `.fsproj` file: don't use MSBuild conditions or similar.
- Include the source files in the Nuget package in a folder named `fable`.

The last point may sound complicated but it's only a matter of adding a couple of lines to your project file and let the `dotnet pack` command do all the rest.

```xml
<!-- Add source files to "fable" folder in Nuget package -->
<ItemGroup>
    <Content Include="*.fsproj; **\*.fs; **\*.fsi" PackagePath="fable\" />
</ItemGroup>
```

In order to publish the package to Nuget check [the Microsoft documentation](https://docs.microsoft.com/en-us/nuget/quickstart/create-and-publish-a-package-using-the-dotnet-cli) or alternatively you can also [use Fake](https://fake.build/dotnet-nuget.html#Creating-NuGet-packages).

## Make your package discoverable

[Fable.Packages](https://fable.io/packages/) is a tool making it easy for users to search for Fable packages. 

To make your packages listed on Fable.Packages, you need to add some tags to your `.fsproj`.

<ul class="textual-steps">

<li>

**All Fable** packages must have the `fable` tag.

</li>

<li>

Specify what kind of package you are publishing.

A fable package can be one of the following:

- `fable-library`: A library that can be used in Fable

    Examples of libraries could be [Fable.Promise](https://github.com/fable-compiler/fable-promise/), [Elmish](https://elmish.github.io/), [Thoth.Json](https://thoth-org.github.io//Thoth.Json/), [Feliz](https://zaid-ajaj.github.io/Feliz/)

    <div></div> <!-- Force a space to improve visual -->

- `fable-binding`: The package consist of a set of API to make a native library available

    For example:
    
    - A package which makes an NPM package API available
    - A package which makes the Browser API available
    - A package which makes a cargo package API available

</li>

<li>

Specify which targets are supported by your package.

Choose one or more of the following tags:

- `fable-dart`: Dart is supported by the package 
- `fable-dotnet`: .NET is supported by the package 
- `fable-javascript`: JavaScript is supported by the package 
- `fable-python`: Python is supported by the package 
- `fable-rust`: Rust is supported by the package 
- `fable-all`: Package is compatible with all Fable targets.

    :::warning
    A package can be compatible with all targets if it depends only on packages that are also compatible with all targets.

    A package compatible with all targets cannot be a binding, as these are target-specific.
    :::

Example:

If your package supports only JavaScript you need to use `fable-javascript`

If your package supports both JavaScript and Python, you need to use `fable-javascript` and `fable-python`

</li>

</ul>

Examples:

If your package is a binding which target JavaScript you need to write:

```xml
<PropertyGroup>
    <PackageTags>fable;fable-binding;fable-javascript</PackageTags>
</PropertyGroup>
```

If your package is a library which targets JavaScript and Python you need to write:

```xml
<PropertyGroup>
    <PackageTags>fable;fable-library;fable-javascript;fable-python</PackageTags>
</PropertyGroup>
```

## Testing

It's a good idea to write unit tests for your library to make sure everything works as expected before publishing. The simplest way for that is to use a JS test runner like [Mocha](https://mochajs.org/), as in [this sample](https://github.com/fable-compiler/fable2-samples/tree/master/mocha). Or you can also use a library like [Fable.Mocha](https://github.com/Zaid-Ajaj/Fable.Mocha) containing more tools for Fable projects.
