# [Fable website](http://fable.io) generator

This project generates the static web pages for [Fable website](http://fable.io) using several resources, among them:

- [Markdown docs in Fable repo](https://github.com/fable-compiler/Fable/tree/master/docs)
- React components built with [Fable.React](https://github.com/fable-compiler/fable-react)
- [Handlebars templates](http://handlebarsjs.com/)

The F# project in `src` is compiled to a node app using Fable and then executed to generate the static pages. To run app the app in development mode (with live reload of the server whenever F# sources change) run the following commands.

> Requirements are the same as for other Fable projects. [yarn](https://yarnpkg.com/) is used as the JS package manager.

Install JS and F# dependencies (only first time or whenever dependencies change):

```shell
yarn install
```

To execute Fable in watch mode, run:

```shell
cd src
dotnet fable fable-splitter -- -w
```

> If you only want to build the node app and run it once, type `dotnet fable fable-splitter` instead.

The web pages will be output to `public` directory. To start a local server with live reloading capabilities to visualize them, in a **new terminal**, type:

```shell
yarn server
```

The web uses a customized version of the [Bulma CSS framework](http://bulma.io/documentation/overview/customize/). The [SASS file](http://sass-lang.com/) for the customization can be found in `files/styles.sass`. To compile it to CSS use:

```shell
yarn sass -w
```

> The `-w` argument activates the watch mode of the SASS compiler. You can omit it if you only want to compile the file once.

Alternatively, you can run the following to run the three processes (Fable, server and SASS compiler) at once concurrently:

```shell
yarn start-all
```

## Other repositories

The tool expects the [Fable](https://github.com/fable-compiler/Fable) repository to be cloned on the same directory level as this one.