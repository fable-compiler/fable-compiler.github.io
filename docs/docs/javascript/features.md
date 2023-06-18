---
title: Features
layout: standard
toc:
  to: 4
---

In this section, we will cover specific features of Fable that are used when interacting with JavaScript.

## Utilities

### `jsNative`

`jsNative` provide a dummy implementation that we use when writing bindings.

Here is its definition:

```fs
    /// Alias of nativeOnly
    let inline jsNative<'T> : 'T = 
        failwith "You've hit dummy code used for Fable bindings. This probably means you're compiling Fable code to .NET by mistake, please check."
```

The thrown exception should never be seen as `jsNative` calls should be replaced by actual JavaScript code calls.

Examples:

If you have this `hello.js` file:

```js
export function hello() {
    console.log("Hello from JS");
}
```

And this F# code:

```fs
[<Import("hello", "./hello.js")>]
let hello : unit -> unit = jsNative

hello()
```

Then the generated code will be:

```js
import { hello } from "./hello.js";

hello();
```

## Imports

In JavaScript, the static `import` declaration is used to import codes that are exported by another module.

Fable provides different ways to import JavaScript code, to cover different scenarios.

There are 2 families of imports:

- Attribute-based imports
- Function-based imports

They archieve the same goal, but with a slightly generated code.

```fs
[<Import("hello", "./hello.js")>]
let hello : unit -> unit = jsNative

// ----

let hello : unit -> unit = import "hello" "./hello.js"
```

generates:

```js
import { hello } from "./hello.js";

// ----

import { hello as hello_1 } from "./hello.js";

export const hello = hello_1;
```

Some JavaScript optimizations tools can remove the intermediate variable, but not all of them. So if you want to favor the smallest and cleanest output, using the attribute-based imports is recommanded.

### Attributes

#### `[<Global>]`

When trying to bind a global variable, you can use the `[<Global>]` attribute.

```fs
[<Global>]
let console: JS.Console = jsNative
```

If you want to use a different in you F# code, you can use the `name` parameter:

```fs
[<Global("console")>]
let logger: JS.Console = jsNative
```

#### `[<Import(...)>]`

This attributes takes two parameters:

- `selector`: the import selector, can be `*`, `default` or a name
- `from`: the path to the JavaScript file / module

```fs
[<Import("hello", "./hello.js")>]
let hello : unit -> unit = jsNative
// Generates: import { hello } from "./hello.js";

[<Import("*", "./hello.js")>]
let hello : unit -> unit = jsNative
// Generates: import * as hello from "./hello.js";

[<Import("default", "./hello.js")>]
let hello : unit -> unit = jsNative
// Generates: import hello from "./hello.js";
```

#### `[<ImportAll(...)>]`

`ImportAll` is used to import all members from a JavaScript module and use the F# value name as the name of the imported module.

```fs
[<ImportAll("./hello.js")>]
let hello : unit -> unit = jsNative
// Generates: import * as hello from "./hello.js";
```

#### `[<ImportMember(...)>]`

`ImportMember` is used to import a specific member from a JavaScript module, the name is based on the name of the F# value.

```fs
[<ImportMember("hello", "./hello.js")>]
let hello : unit -> unit = jsNative
// Generates: import { hello } from "./hello.js";
```

#### `[<ImportDefault(...)>]`

`ImportDefault` is used to import the default member from a JavaScript module, the name is based on the name of imported module.

```fs
[<ImportDefault("./hello.js")>]
let hello : unit -> unit = jsNative
// Generates: import hello from "./hello.js";

[<ImportDefault("./utils/hello.js")>]
let hello : unit -> unit = jsNative
// Generates: import hello from "./utils/hello.js";

[<ImportDefault("chalk")>]
let hello : unit -> unit = jsNative
// Generates: import chalk from "chalk";

[<ImportDefault("@util/chalk")>]
let hello : unit -> unit = jsNative
// Generates: import chalk from "@util/chalk";
```

### Functions

#### `import`

This function takes two parameters:

- `selector`: the import selector, can be `*`, `default` or a name
- `from`: the path to the JavaScript file / module

```fs
let hi : unit -> unit = import "hello" "./hello.js"
// Generates: 
// import { hello } from "./hello.js";
// export const hi = hello;

let hi : unit -> unit = import "*" "./hello.js"
// Generates:
// import * as hello from "./hello.js";
// export const hi = hello;

let hi : unit -> unit = import "default" "./hello.js"
// Generates:
// import hello from "./hello.js";
// export const hi = hello;
```

#### `importAll`

`importAll` is used to import all members from a JavaScript module and use the F# value name as the name of the imported module.

```fs
let hi : unit -> unit = importAll "./hello.js"
// Generates:
// import * as hello from "./hello.js";
// export const hi = hello;
```

#### `importDefault`

`importDefault` is used to import the default member from a JavaScript module, the name is based on the name of imported module.

```fs
let hi : unit -> unit = importDefault "./hello.js"
// Generates:
// import hello from "./hello.js";
// export const hi = hello;
```

#### `importMember`

`importMember` is used to import a specific member from a JavaScript module, the name is based on the name of the F# value.

```fs
let hi : unit -> unit = importMember "./hello.js"
// Generates:
// import { hi as hi_1 } from "./hello.js";
// export const hi = hi_1;
```

## Emit, when F# is not enough

Emit is a features offered by Fable, that allows you to write JavaScript code directly in F#.

:::danger
Content of emit snippet, is not validated by F# compiler, so you should use this feature sparingly.
:::

Main use cases:

- You want to test something quickly
- You just need a few lines of JavaScript code and don't want to create a `.js` file
- You don't want to create a binding API to use a JavaScript library

When using `emit`, you can use placeholders like `$0`, `$1`, `$2`, ... to reference the arguments.

### `[<Emit("...")>]`

You can use the `Emit` attribute to decorate function, methods, 

```fs
[<Emit("$0 + $1")>]
let add (x: int) (y: string): string = jsNative

let result = add 1 "2"
```

generates:

```js
export const result = 1 + "2";
```

When using classes, `$0` can be used to reference the current instance on methods.

```fs
open Fable.Core
open System

type Test() =
    [<Emit("$0.Function($1...)")>]
    member __.Invoke([<ParamArray>] args: int[]): obj = jsNative

let testInstance = Test()

testInstance.Invoke(1, 2, 3)
```

generates:

```js
export class Test {
    constructor() {
    }
}

export function Test_$ctor() {
    return new Test();
}

export const testInstance = Test_$ctor();

testInstance.Function(1, 2, 3);
// Note how $0 is replaced by testInstance
```

It's also possible to pass syntax conditioned to optional parameters:

```fs
open Fable.Core
open System.Text.RegularExpressions

[<Erase>]
type API =
    // This syntax means: if second arg evals to true in JS print 'i' and nothing otherwise
    [<Emit("new RegExp($0,'g{{$1?i:}}')")>]
    static member ParseRegex(pattern: string, ?ignoreCase: bool): Regex = jsNative

let regex1 = API.ParseRegex("abc")


let regex2 = API.ParseRegex("abc", false)

let regex3 = API.ParseRegex("abc", true)
```

generates:

```js
export const regex1 = new RegExp("abc",'g');

export const regex2 = new RegExp("abc",'g');

export const regex3 = new RegExp("abc",'gi');
```

### `emitJsExpr`

<p class="tag is-info is-medium">
    Added in v3.2.0
</p>

Deconstruct a tuple of arguments and generate a JavaScript expression.

> Expressions are values or execute to values, they can be assigned or used as operands

```fs
open Fable.Core

let two : int =
    emitJsExpr (1, 1) "$0 + $1"

let now : JS.Date =
    emitJsExpr () "new Date()"
```

generates:

```js
export const two = 1 + 1;

export const now = new Date();
```

### `emitJsStatement`

<p class="tag is-info is-medium">
    Added in v3.2.0
</p>

Deconstruct a tuple of arguments and generate a JavaScript statement.

> Statements are the whole structure, while expressions are the building blocks. For example, a line or a block of code is a statement.

```fs
open Fable.Core

let add (a : int) (b : int) = 
    emitJsStatement (a, b) "return $0 + $1;"

let repeatHello (count : int) =
    emitJsStatement 
        count
        """
let cond = $0;
while(cond) {
    console.log("Hello from Fable!");
    cond = cond - 1;
}"""
```

generates

```js
export function add(a, b) {
    return a + b;;
}

export function repeatHello(count) {
    let cond = count;
    while(cond) {
        console.log("Hello from Fable!");
        cond = cond - 1;
    };
}
```

### `emitJsExpr` vs `emitJsStatement`

```fs
let add1 (a : int) (b : int) = 
    emitJsExpr (a, b) "$0 + $1"

let add2 (a : int) (b : int) = 
    emitJsStatement (a, b) "$0 + $1"
```

generates:

```js
export function add1(a, b) {
    return a + b;
}

export function add2(a, b) {
    a + b
}
```

Note how `return` has been added to `add1` and not to `add2`. In this situation if you use `emitJsStatement`, you need to write `return $0 + $1"`


## `[<Erase>]`

### Erased unions

In JavaScript, it is common for a function to accept different type of arguments. In F#, only methods supports overload, for this reason Fable allows you to decorate union types with `[<Erase>]`.

```fs
[<Erase>]
type ValueType =
    | Number of int
    | String of string
    | Object of obj

[<Global>]
let prettyPrint (value : ValueType) = jsNative

prettyPrint (Number 1)
prettyPrint (String "Hello")
prettyPrint (Object {| Name = "Fable" |})
```

generates:

```js
prettyPrint(1);
prettyPrint("Hello");
prettyPrint({
    Name: "Fable",
});
```

Note how Fable replaced the union union type with the underlying type.

### `U2`, `U3`, ..., `U9`

Fable provides already erased union types, from `U2` to `U9` than you can use without having to define custom erased union each time.

```fs
open Fable.Core

[<ImportDefault("./myFunction.js")>]
let myFunction(arg: U2<string, int>): unit = jsNative

myFunction(U2.Case1 "testValue")
```

When passing arguments to a method accepting U2, U3... you can use the !^ as syntax sugar so you don't need to type the exact case (the argument will still be type checked):

```fs
open Fable.Core.JsInterop
myFunction !^5 // Equivalent to: myFunction(U2.Case2 5)

// This doesn't compile, myFunction doesn't accept floats
myFunction !^2.3
```

:::info
Please note erased unions are mainly intended for typing the signature of imported JS functions and not as a cheap replacement of `Choice`. It's possible to do pattern matching against an erased union type but this will be compiled as type testing, and since **type testing is very weak in Fable**, this is only recommended if the generic arguments of the erased union are types that can be easily told apart in the JS runtime (like a string, a number and an array).
:::

```fs
let test(arg: U3<string, int, float[]>) =
    match arg with
    | U3.Case1 x -> printfn "A string %s" x
    | U3.Case2 x -> printfn "An int %i" x
    | U3.Case3 xs -> Array.sum xs |> printfn "An array with sum %f"

// In JS roughly translated as:
// function test(arg) {
//   if (typeof arg === "number") {
//     toConsole(printf("An int %i"))(arg);
//   } else if (isArray(arg)) {
//     toConsole(printf("An array with sum %f"))(sum(arg));
//   } else {
//     toConsole(printf("A string %s"))(arg);
//   }
// }
```

### Erased types

Decoring a type with `[<Erased>]` allows you to instruct Fable to not generate any code for that type. This is useful when you want to use a type from a JS library that you don't want to generate bindings for.

```fs
open Fable.Core

type Component =
    interface end

type User() =
    [<Import("Avatar", "./user.jsx")>]
    static member inline Avatar (userId : string) : Component =
        jsNative

let x = User.Avatar "123"
````

generates:

```js
import { class_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { Avatar } from "./user.jsx";

export class User {
    constructor() {
    }
}

export function User_$reflection() {
    return class_type("Program.User", void 0, User);
}

export function User_$ctor() {
    return new User();
}

export const x = Avatar("123");
```

As you can see, there are some reflection information generated for the type `User`. However, if you decorate the type with `[<Erased>]`:

```fs
open Fable.Core

type Component =
    interface end

[<Erase>]
type User() =
    [<Import("Avatar", "./user.jsx")>]
    static member inline Avatar (userId : string) : Component =
        jsNative

let x = User.Avatar "123"
````

generates:

```js
import { Avatar } from "./user.jsx";

export const x = Avatar("123");
```

The generated code is much smaller and doesn't include any reflection information. This trick is useful when you want to minimize the size of your bundle, this is the trick used by [Feliz ecosystem](https://github.com/Zaid-Ajaj/Feliz/) to generate React code that is almost as small as if you were writing it by hand in JavaScript.

## Union types

## `[<StringEnum>]`

## Plain Old JavaScript Objects

### `createObj`

### `createEmpty`

### `[<ParamObject>]`

## Dynamic typing, proceed with caution

## Dynamic casting

## Name mangling