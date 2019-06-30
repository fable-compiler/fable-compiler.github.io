- title: Introducing Femto
- subtitle: Automatic npm package resolution used by Fable bindings

## Introducing Femto

In this blog post, we will introduce a new tool called Femto that will hopefully make the lives of Fable users a lot easier when it comes to the npm packages they depend upon. First things first: let's go through the problem context to understand what Femto is trying to solve.

### Fable Packages
As you all know, Fable packages are normal dotnet packages that are distributed to the nuget package registry. A special type of these nuget packages are Fable bindings which provide idiomatic and type-safe wrappers around native Javascript APIs. These native Javascript APIs can be either available directly in the environment where your compiled F# code is running (Web APIs in browsers, system modules in node.js), or these APIs can be those of third-party Javascript libraries distributed to the npm registry and this is where things get complicated.

In order to use a Fable binding for a third-party Javascript library you as a user have to install *both* libraries in your project:
 - The Fable binding from nuget
 - The actual Javascript third-party library from npm

For example when you install `Fable.React` in your Fable project you also have to install `react` and `react-dom` into your npm dependencies. Users usually have to look up the the exact versions of the npm package they need from the documentation page of the Fable binding itself, in case of `Fable.React` you need to install `react@16.8.0` and `react-dom@16.8.0`.

This is of course doable if you only have a couple of packages with direct npm dependencies such as `Fable.React` but the problem gets even more complicated when you install a nuget package that itself *depends* on a Fable binding such as `Fable.Elmish.React` which depends both on `Fable.Elmish` and `Fable.React`:
```
Fable.Elmish.React (nuget)
  |
  | -- Fable.Elmish (nuget)
  | -- Fable.React (nuget)
        |
        | -- react@16.8.0 (npm)
        | -- react-dom@16.8.0 (npm)
```
Here, when you install `Fable.Elmish.React`, you also install `Fable.React` because it is a *transitive* dependency. This means now you have to install `react` and `react-dom` yourself because you installed `Fable.React`.

This is something you just have to know and applies to every Fable binding you use. Wouldn't it be nice if you didn't have to do this manually, having a tool that does this for you correctly and automatically? Here comes Femto into play.

### What is Femto

Femto is a dotnet CLI tool that primarily does two things:

 - **Project dependency analysis**: going through all your project's dependencies, the direct and the transitive, extracting information about which npm dependencies are needed, which versions they should have and how they should be installed (dependency vs development dependency). Next this information is compared against what you already have installed to decide whether a package is missing or if a version of an installed npm package has an invalid version (falls outside the required version constraint specified by the Fable binding). Femto will log the commands that are required for full package resolution.

 - **Automatic package resolution**: Logging the actions required for package resolution is nice, you can manually execute them one by one and have all the packages you need in the right place. However why do it manually when Femto can do it for you? Run Femto with the `--resolve` flag and let it do the magic.

Today, Femto is released as beta and we would love to hear from you what you think about it, ready to take it for a spin?

### Installing and using Femto

Install [Femto](https://github.com/Zaid-Ajaj/Femto) as a global dotnet tool as follows:
```
dotnet tool install femto --global
```
Alternatively, you can install it locally into your projects directory:
```
dotnet tool install femto --tool-path ./femto
```
then you can `cd` your way to where you have your Fable project and run project analysis:
```bash
# navigate to your project directory
cd fable-minimal
cd src

# run femto for project analysis
femto
```
You can also specify the directory of your Fable project or specify the project path itself, the following will find the same project.
```bash
femto .

femto ./src

femto ./src/App.fsproj
```
The default command of `femto` will only run project analysis against the project in subject and logs the required actions for package resolution, for example if you install these packages in your project:
```
dotnet add package Fable.DateFunctions
dotnet add package Elmish.SweetAlert
dotnet add package Elmish.AnimatedTree
```
then run `femto` in the project directory, you get the following logs:
```
[20:13:28 INF] Analyzing project C:/projects/elmish-getting-started/src/App.fsproj
[20:13:34 INF] Found package.json in C:\projects\elmish-getting-started
[20:13:36 INF] Using npm for package management
[20:13:43 INF] Fable.DateFunctions requires npm package date-fns
[20:13:43 INF]   | -- Required range >= 1.30 < 2.0 found in project file
[20:13:43 INF]   | -- Missing date-fns in package.json
[20:13:43 INF]   | -- Resolve manually using 'npm install date-fns@1.30.1 --save'
[20:13:43 INF] Elmish.SweetAlert requires npm package sweetalert2
[20:13:43 INF]   | -- Required range >= 8.5 found in project file
[20:13:43 INF]   | -- Missing sweetalert2 in package.json
[20:13:43 INF]   | -- Resolve manually using 'npm install sweetalert2@8.5.0 --save'
[20:13:43 INF] Elmish.AnimatedTree requires npm package react-spring
[20:13:43 INF]   | -- Required range >= 8.0.0 found in project file
[20:13:43 INF]   | -- Missing react-spring in package.json
[20:13:43 INF]   | -- Resolve manually using 'npm install react-spring@8.0.1 --save'
```
Notice how Femto decided to use `npm` for package management. In case I had the `yarn.lock` file next to `package.json` then Femto will use `yarn` instead and the install commands would be yarn specific:
```bash
npm install sweetalert2@8.5.0 --save
# becomes
yarn add sweetalert2@8.5.0
```
Now you can either run the commands that Femto logged or let it do the work simply as follows:
```bash
femto --resolve
```
This logs the following:
```
[20:15:39 INF] Analyzing project C:\projects\elmish-getting-started\src\App.fsproj
[20:15:42 INF] Found package.json in C:\projects\elmish-getting-started
[20:15:42 INF] Using npm for package management
[20:15:47 INF] Executing required actions for package resolution
[20:15:47 INF] Installing dependencies [date-fns@1.30.1, sweetalert2@8.5.0, react-spring@8.0.1]
[20:15:55 INF] √ Package resolution complete
```
That's it!

You can try to confuse Femto by installing an old version of a package, for example install `date-fns@1.0.0` in the project and re-run the dependency analysis, you will get this:
```
[20:22:06 INF] Analyzing project C:/projects/elmish-getting-started/src/App.fsproj
[20:22:09 INF] Found package.json in C:\projects\elmish-getting-started
[20:22:09 INF] Using npm for package management
[20:22:11 INF] Elmish.SweetAlert requires npm package sweetalert2
[20:22:11 INF]   | -- Required range >= 8.5 found in project file
[20:22:11 INF]   | -- Used range ^8.5.0 in package.json
[20:22:11 INF]   | -- √ Installed version 8.5.0 satisfies required range >= 8.5
[20:22:11 INF] Elmish.AnimatedTree requires npm package react-spring
[20:22:11 INF]   | -- Required range >= 8.0.0 found in project file
[20:22:11 INF]   | -- Used range ^8.0.1 in package.json
[20:22:11 INF]   | -- √ Installed version 8.0.1 satisfies required range >= 8.0.0
[20:22:11 INF] Fable.DateFunctions requires npm package date-fns
[20:22:11 INF]   | -- Required range >= 1.30 < 2.0 found in project file
[20:22:11 INF]   | -- Used range ^1.0.0 in package.json
[20:22:11 INF]   | -- Found installed version 1.0.0
[20:22:11 INF]   | -- Installed version 1.0.0 does not satisfy [>= 1.30 < 2.0]
[20:22:11 INF]   | -- Resolve manually using 'npm uninstall date-fns' then 'npm install date-fns@1.30.1 --save'
```
Notice how it tells you need to uninstall the current version `1.0.0` and re-install a version that specifies the required version constraint `>= 1.30 < 2.0`. Automatic package resolution understands this as well and is able to solve it correctly.

Another fun attempt to experiment with is installing a required package with a proper version but installed into "devDependencies" instead of "dependencies" in package.json, this too can be detected by Femto and correctly resolved:
```
[20:28:01 INF] Analyzing project C:\projects\elmish-getting-started\src\App.fsproj
[20:28:04 INF] Found package.json in C:\projects\elmish-getting-started
[20:28:04 INF] Using npm for package management
[20:28:04 INF] Elmish.SweetAlert requires npm package sweetalert2
[20:28:04 INF]   | -- Required range >= 8.5 found in project file
[20:28:04 INF]   | -- Used range ^8.5.0 in package.json
[20:28:04 INF]   | -- √ Installed version 8.5.0 satisfies required range >= 8.5
[20:28:04 INF] Elmish.AnimatedTree requires npm package react-spring
[20:28:04 INF]   | -- Required range >= 8.0.0 found in project file
[20:28:04 INF]   | -- Used range ^8.0.1 in package.json
[20:28:04 INF]   | -- √ Installed version 8.0.1 satisfies required range >= 8.0.0
[20:28:04 INF] Fable.DateFunctions requires npm package date-fns
[20:28:04 INF]   | -- Required range >= 1.30 < 2.0 found in project file
[20:28:04 INF]   | -- Used range ^1.30.1 in package.json
[20:28:04 INF]   | -- Found installed version 1.30.1
[20:28:04 INF]   | -- date-fns was installed into "devDependencies" instead of "dependencies"
[20:28:04 INF]   | -- Re-install as a production dependency
[20:28:04 INF]   | -- Resolve manually using 'npm uninstall date-fns' then 'npm install date-fns@1.30.1 --save'
```
I hope you are just as excited about Femto as much I am now! However, there is a caveat: in order for Femto to be useful, it needs information about the required npm packages from Fable bindings. Fable library authors of these package will need to include this information about the npm dependencies they require in the project file of their binding. In case you are a Fable library author, please read on!

### Fable library authors

In order for Femto to pick up the information about the npm dependency that your library requires, you need to release a new version of your Fable binding with this information included in the *project* file. Simply add a section in your project file like this:
```xml
<PropertyGroup>
  <NpmDependencies>
      <NpmPackage Name="sweetalert2" Version=">= 8.5" />
  </NpmDependencies>
</PropertyGroup>
```
You have a `NpmDependencies` section and it can have a bunch of `NpmPackage` tags. Each `NpmPackage` tag can have the following attributes:
 - `Name`: the name of the npm package you depend upon
 - `Version`: specify the version constraint your library needs (not necessarily an exact version)
 - Optional `ResolutionStrategy`: with values `Min` or `Max`, specifies how we determine a valid version for the package. `Min` is the default value if you don't specify this attribute.
 - Optional `DevDependency`: with values `true` or `false`, specifies whether the npm package is a development dependency or a production dependency (`devDependency` vs `dependency`). `false` is the default value if you don't specify the attribute.

See project files of [Fable.DateFunctions](https://github.com/Zaid-Ajaj/Fable.DateFunctions/blob/master/src/Fable.DateFunctions.fsproj), [Elmish.SweetAlert](https://github.com/Zaid-Ajaj/Elmish.SweetAlert/blob/master/src/Elmish.SweetAlert.fsproj) or [Elmish.AnimatedTree](https://github.com/Zaid-Ajaj/Elmish.AnimatedTree/blob/master/src/Elmish.AnimatedTree.fsproj) for working examples.

After you have added your npm dependency information, you can let `Femto` validate them to check if they are well formatted and whether a valid version can be resolved based on your specification using the `--validate` flag
```
femto --validate

femto --validate ./src/MyLibrary.fsproj
```

### History and Credits

A while ago, sometime after FableConf 2018, I [proposed](https://github.com/fable-compiler/fable-compiler.github.io/issues/32#issuecomment-438665277) the concept and thought of adding the current functionality of Femto into Fable and have the compiler do the work internally but the idea wasn't welcomed because it was thought of as introducing a new package manager. This is of course not the case, `Femto` is only orchestrating what an existing package manager, npm or yarn, should do. At that time, I was working on the stuff that I couldn't prototype something concrete. The next time the problem was mentioned [here](https://github.com/fable-compiler/fable-import/issues/82#issue-456644358), I re-iterated my proposition but this time Alfonso had a more positive feeling about it so I started working on it and when the [first prototype](https://github.com/fable-compiler/fable-import/issues/82#issuecomment-504241982) came out, only including a primitive of way of dependency analysis, [Maxime](https://github.com/MangelMaxime) joined in on the party. In a single week of intense work, Maxime and I were able to put together what I have demonstrated above. Maxime would fix issues himself or would tell me that I did something stupid (which I definitely did) so I had lots of fun working together.

### Want to contribute?

At this point, we have the most crucial features added to Femto but there are a couple more good first issues for those who want to contribute to Femto. Please take a look at the [issues](https://github.com/Zaid-Ajaj/Femto/issues) pages and feel free to send pull requests, they are very much appreciated and are always welcome!