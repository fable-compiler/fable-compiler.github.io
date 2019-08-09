---
title: Author a Fable library
---

[[toc]]

## Author a Fable library

To write a library that can be used in Fable you only need to fulfill a few conditions:

- Don't use FSharp.Core/BCL APIs that are not compatible with Fable.
- Include the source files in the Nuget package in a folder named `fable`.

The second point may sound complicated but it's only a matter of adding a couple of lines to your project file and let the `dotnet pack` command do all the rest.

```xml
<!-- Add source files to "fable" folder in Nuget package -->
<ItemGroup>
    <Content Include="*.fsproj; **\*.fs" PackagePath="fable\" />
</ItemGroup>
```

That's all it takes to make your library compatible with Fable! In order to publish the package to Nuget check [the Microsoft documentation](https://docs.microsoft.com/en-us/nuget/quickstart/create-and-publish-a-package-using-the-dotnet-cli) or alternatively you can also [use Fake](https://fake.build/dotnet-nuget.html#Creating-NuGet-packages).

### Testing

It's a good idea to write unit tests for your library to make sure everything works as expected before publishing. The simplest way for that is to use Node.js and a JS test runner like [Mocha](https://mochajs.org/), as in [this sample](https://github.com/fable-compiler/fable2-samples/tree/master/mocha).
