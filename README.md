# [Fable website](http://fable.io) generator

This project generates the static web pages for [Fable website](http://fable.io). Requirements are the same as for other Fable projects (plus [yarn](https://yarnpkg.com/)).

The F# project in `src` is compiled to a node app using Fable and then executed to generate the static pages. To run the app in development mode (with live reload of the server whenever F# sources change) run the following commands.

```shell
yarn
yarn start
```

For deployment run:

```shell
yarn deploy
```

## Other repositories

The tool expects the [Fable](https://github.com/fable-compiler/Fable) repository to be cloned on the same directory level as this one.
