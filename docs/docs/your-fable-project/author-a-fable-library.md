---
title: Author a Fable package
layout: standard
toc:
    to: 3
---

## Use Glutinum.Template

[Glutinum.Template](https://github.com/glutinum-org/Glutinum.Template) is a template that can help you create a Fable package.

To use this template, you can run the following command:

```bash
dotnet new install "Glutinum.Template::*"
```

Then you can create a new project with:

```bash
dotnet new glutinum -n MyProject
```

Once installed, you can refer to the [`MANUAL.md`](https://github.com/glutinum-org/Glutinum.Template/blob/main/content/MANUAL.md) file in the generated project for more information.

## Use Fable.Package.SDK directly

If you prefer to not use a template, here are the steps to author a Fable package manually.

Install Fable.Package.SDK

[Fable.Package.SDK](https://github.com/fable-compiler/Fable.Package.SDK) is a set of MSBuild targets that can help you create a Fable package.

**.NET CLI**

```bash
dotnet add package Fable.Package.SDK
```

This will add the package to your project file.

```xml
<PackageReference Include="Fable.Package.SDK" Version="x.y.z" />
    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    <PrivateAssets>all</PrivateAssets>
</PackageReference>
```

These rules are necessary to ensure that the package is not included in the final package, you don't want you package to depend on `Fable.Package.SDK` at runtime.

**Paket**

```bash
# In your paket.dependencies
nuget Fable.Package.SDK copy_local: true

# In your paket.references
Fable.Package.SDK
```

You can then refer to the [Fable.Package.SDK documentation](https://github.com/fable-compiler/Fable.Package.SDK) for more information.

## Guidelines

### Include native files

If you needs native files like `.js` or `.py`, you need to include them in the `fable` folder as well.

Example:

```xml
<ItemGroup>
    <!-- Your F# code is already included because of the previous rules, so you only need to ensure the .js files are included as well -->
    <Content Include="**/*.js" Exclude="**\*.fs.js" PackagePath="fable/%(RelativeDir)%(Filename)%(Extension)" />
</ItemGroup>
```

:::info
Note that you don't want to include Fable generated files and so we exclude them with `Exclude="**\*.fs.js"`
:::

In order to publish the package to Nuget check [the Microsoft documentation](https://docs.microsoft.com/en-us/nuget/quickstart/create-and-publish-a-package-using-the-dotnet-cli) or alternatively you can also [use Fake](https://fake.build/dotnet-nuget.html#Creating-NuGet-packages).

### Native dependencies with Femto

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

### Testing

It's a good idea to write unit tests for your library to make sure everything works as expected before publishing.

Find below some libraries that can help you write tests for your Fable library:

- [Fable.Pyxpecto](https://github.com/Freymaurer/Fable.Pyxpecto): Inspired by the popular Expecto library for F#, Fable.Pyxpecto can be used to run tests in Python, JavaScript, TypeScript and .NET!
- [Fable.Mocha](https://github.com/Zaid-Ajaj/Fable.Mocha): Fable library for testing. Inspired by the popular Expecto library for F# and adopts the testList, testCase and testCaseAsync primitives for defining tests.
- Native runner like [Mocha](https://mochajs.org/), [example](https://github.com/fable-compiler/fable2-samples/tree/master/mocha).

### Listing

Once published to [NuGet](https://www.nuget.org/), your package will also be available on [Fable.Packages](https://fable.io/packages/) for easy discovery by the Fable community.

:::info
This can take a few minutes to a few hours to be available on the website, depending on Nuget's indexing.
:::
