---
title: Author a Fable library
layout: standard
---

## Requirements

To write a library that can be used in Fable you need to fulfill a few conditions:

- Don't use FSharp.Core/BCL APIs that are not [compatible with Fable](../dotnet/compatibility.html).
- Keep a simple `.fsproj` file: don't use MSBuild conditions or similar.
- Include the source files in the Nuget package in a folder named `fable`.

    :::info
    If your library is a pure binding, you can skip this step.

    This will improve Fable compilation time as the compiler will not need to parse the source files of the binding.
    :::

    Add the following to your `.fsproj` file:

    ```xml
    <!-- Add source files to "fable" folder in Nuget package -->
    <ItemGroup>
        <!-- Include all files that are compiled with this project -->
        <Content Include="@(Compile)" Pack="true" PackagePath="fable/%(RelativeDir)%(Filename)%(Extension)" />
        <!-- Include the project file itself as well -->
        <Content Include="$(MSBuildThisFileFullPath)" Pack="true" PackagePath="fable/" />
    </ItemGroup>
    ```

    If you needs native files like `.js` or `.py`, you need to include them in the `fable` folder as well.

    Example:

    ```xml
    <ItemGroup>
        <!-- You your F# code is included because of the previous code, so you only need to ensure the .js files are included as well -->
        <Content Include="**/*.js" Exclude="**\*.fs.js" PackagePath="fable/%(RelativeDir)%(Filename)%(Extension)" />
    </ItemGroup>
    ```

    :::info
    Note that you don't want to include Fable generated files and so we exclude them with `Exclude="**\*.fs.js"`
    :::

In order to publish the package to Nuget check [the Microsoft documentation](https://docs.microsoft.com/en-us/nuget/quickstart/create-and-publish-a-package-using-the-dotnet-cli) or alternatively you can also [use Fake](https://fake.build/dotnet-nuget.html#Creating-NuGet-packages).

## Make your package usable by others

In addition to the source files, there are a few things you should to to make your package easier to consume by others. Adding these items will improve the development experience for your users inside their editors,
specifically enabling Go To Definition (F12 in most editors) to work on your library's code.

```xml
<PropertyGroup>
   <!-- Ensure debugging information is easily found, so that editors can locate the source code locations for your library.
        This slightly increases the size of your package, but the usability benefits are worth it. -->
   <DebugType>embedded</DebugType>
   <!-- Ensure that files that are generated during the build by the .NET SDK are also included in your compiled library. -->
   <EmbedUntrackedSources>true</EmbedUntrackedSources>
</PropertyGroup>
```

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

## Native dependencies

When authoring a binding you often need your user to install a native dependency.

For example, if you create a binding for React, your user need to install `react` npm package.

[Femto](https://github.com/Zaid-Ajaj/Femto) is a tool that can help with that,
but it needs some metadata in your `.fsproj` file.

Example:

For JavaScript/TypeScript packages via NPM:

```xml
<PropertyGroup>
  <NpmDependencies>
      <NpmPackage Name="date-fns" Version="gt 1.30.0 lt 2.0.0" ResolutionStrategy="Max" />
  </NpmDependencies>
</PropertyGroup>
```

For Python packages via poetry:

```xml
<PropertyGroup>
  <PythonDependencies>
    <Package Name="requests" Version="&gt;= 2.28.1 &lt; 3.0.0" ResolutionStrategy="Max" />
  </PythonDependencies>
</PropertyGroup>
```

Please refer to [Femto documentation](https://github.com/Zaid-Ajaj/Femto) for more information.

## Testing

It's a good idea to write unit tests for your library to make sure everything works as expected before publishing. The simplest way for that is to use a JS test runner like [Mocha](https://mochajs.org/), as in [this sample](https://github.com/fable-compiler/fable2-samples/tree/master/mocha). Or you can also use a library like [Fable.Mocha](https://github.com/Zaid-Ajaj/Fable.Mocha) containing more tools for Fable projects.
