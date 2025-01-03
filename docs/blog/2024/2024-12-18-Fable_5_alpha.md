---
layout: fable-blog-page
title: Fable 5 alpha
author: Mangel Maxime
date: 2024-12-18
author_link: https://twitter.com/MangelMaxime
author_image: https://github.com/MangelMaxime.png
# external_link:
abstract: |
    Help up test the new Fable 5 alpha release!
---

Since the end of November, we have been working on Fable 5.

We need your help to test it and report any issues you may find.

You can install the latest alpha version of Fable by running the following command:

```bash
# This is only necessary if you haven't installed any dotnet tool yet in the directory
dotnet new tool-manifest

dotnet tool install fable --prerelease
```

## Compatibility with Fable 4

Fable 5 is compatible with Fable 4 projects, except that it is now a `net8.0` tool.

## A new project cracker

Being a `net8.0` tool gives us access to MSBuild for cracking your projects. Most of the work has been done by [Florian Verdonck](https://bsky.app/profile/nojaf.com). During the last year, the new cracker has been successfully tested against several projects, and for this reason, it is now the default.

If you encounter any issues, you can fall back to the old cracker by passing `--legacyCracker` to the `fable` command. But please, report the issue to us.

## F# 9 support

Below is the status of F# 9 features supported by Fable 5:

:::info
Only the features that makes sense in the context of Fable are listed here.
:::

<table class="table is-striped is-bordered">
    <thead>
        <tr>
            <th>Feature</th>
            <th align="center">Status</th>
            <th align="center">Tracking issue</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#nullable-reference-types">Nullable reference types</a></td>
            <td align="center">🚧</td>
            <td>Discussion happening at <a href="https://github.com/fable-compiler/Fable/issues/3887">#3887</a></td>
        </tr>
        <tr>
            <td><a href="https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#discriminated-union-is-properties">Discriminated union <code>.Is*</code> properties</a></td>
            <td align="center">✅</td>
            <td></td>
        </tr>
        <tr>
            <td><a href="https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#partial-active-patterns-can-return-bool-instead-of-unit-option">Partial active patterns can return <code>bool</code> instead of <code>unit option</code></a></td>
            <td align="center">✅</td>
            <td align="center"></td>
        </tr>
        <tr>
            <td><a href="https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#empty-bodied-computation-expressions">Empty-bodied computation expressions</a></td>
            <td align="center">✅</td>
            <td align="center"></td>
        </tr>
        <tr>
            <td><a href="https://learn.microsoft.com/en-us/dotnet/fsharp/whats-new/fsharp-9#updates-to-the-standard-library-fsharpcore">Updates to the standard library (FSharp.Core)</a></td>
            <td align="center">🚧</td>
            <td align="center"></td>
        </tr>
   </tbody>
</table>

Legend:

- 🚧 - Not yet supported
- ⚠️ - Limited support
- ✅ - Supported

## Future development

Because we are a small team, we have decided to focus our efforts on Fable 5.

This means that all new bug fixes and features will be added to Fable 5 and not Fable 4. In fact, Fable 5 is likely stable enough to be released, but we prefer to wait a little longer, because we don’t want to break your project for Christmas 🎄.
