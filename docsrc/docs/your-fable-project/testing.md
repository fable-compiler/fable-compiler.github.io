---
title: Testing
---

You can use all tools of the JS ecosystem.

Several js libs already have a Fable binding :
- mocha: [https://github.com/Zaid-Ajaj/Fable.Mocha](https://github.com/Zaid-Ajaj/Fable.Mocha)
- jest: [https://github.com/Shmew/Fable.Jester](https://github.com/Shmew/Fable.Jester)

# Example with jest
## Setup
You should install js test runner :
```shell
  npm install jest --save-dev
```
And Fable binding :
```shell
  # nuget
  dotnet add package Fable.Jester
  # paket
  paket add Fable.Jester --project ./project/path
```

## Write tests
Now, you can write your first test :
```fsharp
open Fable.Jester

Jest.describe("can run basic tests", fun () ->
    Jest.test("running a test", fun () ->
        Jest.expect(1+1).toEqual(2)
    )
)
```
See Jester documentation to more informations : [https://shmew.github.io/Fable.Jester/](https://shmew.github.io/Fable.Jester/)

## Run
Like all transpiled languages to JS, you have to convert your project to JS.
For this, you can use Webpack, but it isn't the ideal solution, because test runners generally prefer to have small files rather than a single big file.
You can use the compiler directly via the `fable-splitter` tool.
```shell
  npm install fable-splitter --save-dev
```

You should create a config file `splitter.config.js`:
```js
const path = require("path");

module.exports = {
  allFiles: true, // convert all files and not only entrypoint
  entry: path.join(__dirname, "./project/path.fsproj"),
  outDir: path.join(__dirname, "./output"),
  babel: { sourceMaps: "inline" } // enable sourceMaps to see F# code and not generated js in test reports
};
```

You should config Jest with another config file `jest.config.js` :
```js
module.exports = {
  moduleFileExtensions: ['js'],
  roots: ['./output'],
  testMatch: ['<rootDir>/**/*.Test.js'],
  coveragePathIgnorePatterns: ['/\.fable/', '/[fF]able.*/', '/node_modules/'],
  testEnvironment: 'node',
  transform: {}
};
```
`roots` should be equals to `outDir` of compilator.
`testMatch` indicate file pattern name with test.
`coveragePathIgnorePatterns`, `testEnvironment`, `transform` improve performance of runner.
You can read Jest doc to see more : [https://jestjs.io/docs/en/configuration](https://jestjs.io/docs/en/configuration)

Now, you can build:
```shell
  npx fable-splitter -c splitter.config.js
```

And run test:
```shell
  npx jest --config=jest.config.js
```

Youhou! You can see the test result :)

You can specify this command on npm in `package.json` :
```json
{
  "scripts": {
    "test": "fable-splitter -c splitter.config.js && jest --config=jest.config.js",
  },
}
```
And now run with a single command:
```shell
  npm test
```

## Watch mode
Running each time is slow.
You can use the watch feature to take advantage of the compiler and runner cache, and run tests whenever a file changes.

Currently, Fable doesn't have official plugins for the different runners.
So you have to execute these two commands in parallel:
```shell
  npx fable-splitter -c splitter.config.js -w
  npx jest --config=jest.config.js --watchAll
```

You add a npm script in `package.json` :
```json
{
  "scripts": {
    "test": "fable-splitter -c splitter.config.js && jest --config=jest.config.js",
    "watch-test:build": "fable-splitter -c splitter.config.js -w",
    "watch-test:run": "jest --config=jest.config.js --watchAll",
    "watch-test": "npm-run-all --parallel watch-test:*"
  },
}
```
I use `npm-run-all` to run several commands in parallel. You should install with:
```shell
  npm install --save-dev npm-run-all
```

Now, run
```shell
  npm run-script watch-test
```

Enjoy :)
