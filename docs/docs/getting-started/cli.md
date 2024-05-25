---
title: Fable CLI
layout: standard
---

## Commands

### `fable`

Run Fable in release mode, `RELEASE` compiler directive will be set.


### `fable watch`

Run Fable in watch mode, `DEBUG` compiler directive will be set.

```fs
let host =
    #if DEBUG
    "http://localhost:8080"
    #else
    "https://myapp.com"
    #endif
```

### `fable clean`

Remove `fable_modules` folders and files with specified extensions (default `.fs.js`).

## Options


<table class="table is-hoverable is-striped" style="min-width: 300px">
<thead>
<tr>
<th> Options </th>
<th> Description </th>
</tr>
</thead>

<tbody>

<tr>
<td>

`--cwd`
</td>
<td>

Working directory
</td>
</tr>

<tr>
<td>

`-o|--outDir`
</td>
<td>

Redirect compilation output to a directory
</td>
</tr>

<tr>
<td>

`-e|--extension`
</td>
<td>

Extension for generated JS files (default .fs.js)
</td>
</tr>

<tr>
<td>

`-s|--sourceMaps`
</td>
<td>

Enable source maps
</td>
</tr>

<tr>
<td>

`--sourceMapsRoot`
</td>
<td>

Set the value of the `sourceRoot` property in generated source maps
</td>
</tr>

<tr>
<td>

`--define`
</td>
<td>

Defines a symbol for use in conditional compilation
</td>
</tr>

<tr>
<td>

`-c|--configuration`
</td>
<td>

The configuration to use when parsing .fsproj with MSBuild, default is 'Debug' in watch mode, or 'Release' otherwise
</td>
</tr>

<tr>
<td>

`--verbose`
</td>
<td>

Print more info during compilation
</td>
</tr>

<tr>
<td>

`--silent`
</td>
<td>

Don't print any log during compilation
</td>
</tr>

<tr>
<td>

`--typedArrays`
</td>
<td>

Compile numeric arrays as JS typed arrays (default is true for JS, false for TS)
</td>
</tr>

<tr>
<td>

`--watch`
</td>
<td>

Alias of watch command
</td>
</tr>

<tr>
<td>

`--watchDelay`
</td>
<td>

Delay in ms before recompiling after a file changes (default 200)
</td>
</tr>

<tr>
<td>

`--run`
</td>
<td>

The command after the argument will be executed after compilation
</td>
</tr>

<tr>
<td>

`--runFast`
</td>
<td>

The command after the argument will be executed BEFORE compilation
</td>
</tr>

<tr>
<td>

`--runWatch`
</td>
<td>

Like run, but will execute after each watch compilation
</td>
</tr>

<tr>
<td>

`--runScript`
</td>
<td>

Runs the generated script for last file with node

(Requires `"type": "module"` in package.json and at minimum Node.js 12.20, 14.14, or 16.0.0)
</td>
</tr>

<tr>
<td>

`--yes`
</td>
<td>

Automatically reply 'yes' (e.g. with `clean` command)
</td>
</tr>

<tr>
<td>

`--noRestore`
</td>
<td>

Skip `dotnet restore`
</td>
</tr>

<tr>
<td>

`--noCache`
</td>
<td>

Recompile all files, including sources from packages
</td>
</tr>

<tr>
<td>

`--exclude`
</td>
<td>

Don't merge sources of referenced projects with specified pattern (Intended for plugin development)
</td>
</tr>

<tr>
<td>

`--optimize`
</td>
<td>

Compile with optimized F# AST (experimental)
</td>
</tr>

<tr>
<td>

`--lang|--language`
</td>
<td>

Choose wich languages to compile to

Available options:
- javascript (alias js) - **stable**
- typescript (alias ts) - **stable**
- python (alias py) - **beta**
- rust (alias rs) - **beta**
- dart - **beta**
- php - **experimental**

Default is javascript

</td>
</tr>

</tbody>
</table>

## Environment variables

### `DOTNET_USE_POLLING_FILE_WATCHER`

When set to '1' or 'true', Fable watch will poll the file system for changes.
This is required for some file systems, such as network shares,
Docker mounted volumes, and other virtual file systems.
