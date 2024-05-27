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

Some JavaScript optimizations tools can remove the intermediate variable, but not all of them. So if you want to favor the smallest and cleanest output, using the attribute-based imports is recommended.

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

#### `importSideEffects`

`importSideEffects` is used when you wants to import a JavaScript module that has side effects, like a CSS file or a polyfill.

```fs
importSideEffects "./style.css"
// Generates:
// import "./style.css";

importSideEffects "whatwg-fetch"
// Generates:
// import 'whatwg-fetch'
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
open Fable.Core.JsInterop

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
open Fable.Core.JsInterop

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

#### `U2`, `U3`, ..., `U9`

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

Decoring a type with `[<Erase>]` allows you to instruct Fable to not generate any code for that type. This is useful when you want to use a type from a JS library that you don't want to generate bindings for.

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

As you can see, there are some reflection information generated for the type `User`. However, if you decorate the type with `[<Erase>]`:

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

## `[<StringEnum>]`

It is common in JavaScript, to have String Literal Types.

```js
/**
 * @typedef {"click" | "mouseover" } EventType
 */

/**
 * @param event {EventType}
 * @callback callback
 */
function on(event, callback) {
    // ...
}
```

Fable supports this feature by using union types and `StringEnum` attributes.

:::info 
These union types must not have any data fields as they will be compiled to a string matching the name of the union case.
:::

```fs
open Fable.Core

[<StringEnum>]
type EventType =
    | Click
    | MouseOver

[<ImportDefault("./event.js")>]
let on (event : EventType) (callback : unit -> unit) =
    jsNative

on Click ignore
```

generates

```js
import event from "./event.js";

event("click", () => {
});
```

### `CaseRules`

`StringEnum` accept a parameters allowing you to control the casing used to conver the union case name to a string.

- `CaseRules.None`: `MouseOver` becomes `MouseOver`
- `CaseRules.LowerFirst`: `MouseOver` becomes `mouseOver`
- `CaseRules.SnakeCase`: `MouseOver` becomes `mouse_over`
- `CaseRules.SnakeCaseAllCaps`: `MouseOver` becomes `MOUSE_OVER`
- `CaseRules.KebabCase`: `MouseOver` becomes `mouse-over`

The default is `CaseRules.LowerFirst`.

### `[<CompiledName>]`

You can also use `[<CompiledName>]` to specify the name of the union case in the generated JS code.

```fs
open Fable.Core

[<StringEnum>]
type EventType =
    | [<CompiledName("Abracadabra")>] MouveOver

let eventType = EventType.MouveOver
```

generates

```js
export const eventType = "Abracadabra";
```

## Plain Old JavaScript Objects

POJO (Plain Old JavaScript Objects) are one of the most common types in JavaScript.

```js
export const user = {
    Name: "Kaladin",
    Age: 20
};
```

Fable offers several ways to work with POJOs.

The recommended way to work with POJOs is to use `[<ParamObject>]` as they are the closest to normal F# classes. But we are going to explore all the options from the simpler to put in practice to the more verbose.

### Anonymous records

Fable translates anonymous records to POJOs, making them perfect one of the simplest ways to work with POJOs.

```fs
let user =
    {|
        Name = "Kaladin"
        Age = 20
    |}
```

### `createObj`

`createObj` is a function that takes a list of tuples and returns a POJO.

```fs
open Fable.Core
open Fable.Core.JsInterop

let user =
    createObj [
        "Name", "Kaladin"
        "Age", 20
    ]
```

generates

```js
export const user = {
    Name: "Kaladin",
    Age: 20
};
```

You can also use the special `==>` operator to create the tuples.

```fs
open Fable.Core
open Fable.Core.JsInterop

let user =
    createObj [
        "Name" ==> "Kaladin"
        "Age" ==> 20
    ]
```

### `createEmpty`

`createEmpty` is a function that takes a type and returns an empty POJO.

You then need to set each field manually.

```fs
open Fable.Core
open Fable.Core.JsInterop

type IUser = 
    abstract Name : string with get, set
    abstract Age : int with get, set

let user = createEmpty<IUser>
user.Name <- "Kaladin"
user.Age <- 20
```

generates

```js
export const user = {};
user.Name = "Kaladin";
user.Age = 20;
```

### `jsOptions`

`jsOptions` is a function that gives you access to an objet of the provided type and allows you to set the fields.

```fs
open Fable.Core
open Fable.Core.JsInterop

type IUser = 
    abstract Name : string with get, set
    abstract Age : int with get, set

let user = jsOptions<IUser>(fun o ->
    o.Name <- "Kaladin"
    o.Age <- 20
)
```

generates

```js
export const user = {
    Name: "Kaladin",
    Age: 20
};
```

### `[<ParamObject>]`

<p class="tag is-info is-medium">
    Added in v3.4.0
</p>

`ParamObject` allows the most native F# experience when working with POJOs.

It also has the benefit of supporting other ways of creating POJOs, allowing consumer of your code to use the method they prefer.

When using `ParamObject`, you need to use a combination of others attributes to control the generated code.

- `[<AllowNullLiteral>]` tells F# that `null` is a valid value for the class. This is to mimic the behavior of JS where `null` is a valid value for any object.
- `[<Global>]` tells Fable to not generate actual code for the class
- `[<ParamObject; Emit("$0")>]` tells Fable that the method needs to be compiled to a POJO

```fs
[<AllowNullLiteral>]
[<Global>]
type Options
    [<ParamObject; Emit("$0")>]
    (
        searchTerm: string, 
        ?isCaseSensitive: bool
    ) =
    member val searchTerm: string = jsNative with get, set
    member val isCaseSensitive: bool option = jsNative with get, set

let options1 = new Options("foo")

let options2 = new Options("foo", isCaseSensitive = true)
```

generates

```js

export const options1 = {
    searchTerm: "foo",
};

export const options2 = {
    searchTerm: "foo",
    isCaseSensitive: true,
};
```

For each arguments in the constructor, we need to create the getter and setter so you can access the properties from F#.

```fs
let options2 = new Options("foo", isCaseSensitive = true)

options2.isCaseSensitive 
// Returns: true
```

#### Optional properties

When a property is option, the argument in the method is of the form `?<arg name>: <type>` and the getter/setter is of the form `<arg name>: <type> option`.

```fs
[<AllowNullLiteral>]
[<Global>]
type Options
    [<ParamObject; Emit("$0")>]
    (
        ?isCaseSensitive: bool
    ) =
    member val isCaseSensitive: bool option = jsNative with get, set
```

#### Constructor overloads

In JavaScript, it is common to have a property accept multiple types.

The naive way to do this in F# would be to use Erased Types, but the consuming code is not very nice.

```fs
open Fable.Core
open System.Text.RegularExpressions

[<AllowNullLiteral>]
[<Global>]
type Options
    [<ParamObject; Emit("$0")>]
    (query: U2<string, Regex>) =
    
    member val query: U2<string, Regex> = jsNative with get, set

let options1 = new Options(U2.Case1 "foo")

let options2 = new Options(U2.Case2 (Regex("foo")))
```

By using, constructor overloads, we can have a nicer consuming code.

```fs
open Fable.Core
open System.Text.RegularExpressions

[<AllowNullLiteral>]
[<Global>]
type Options [<ParamObject; Emit("$0")>] private (query: U2<string, Regex>) =

    [<ParamObject; Emit("$0")>]
    new(query: string) = Options(U2.Case1 query)

    [<ParamObject; Emit("$0")>]
    new(query: Regex) = Options(U2.Case2 query)

    member val query: U2<string, Regex> = jsNative with get, set

let options1 = new Options("foo")

let options2 = new Options(Regex("foo"))
```

The getter and setter will still use the union type, but the constructor will be nicer.

If you want you can use `[<Emit>]` to provide custom getter and setter, but we don't think it's worth it.

```fs
[<Emit("$0.query")>]
member val ``query as string``: string = jsNative with get, set

[<Emit("$0.query")>]
member val ``query as Regex``: Regex = jsNative with get, set
```

#### Backwards compatibility

One of the benefit of using `ParamObject` is that the consumer of your library can use the old way of creating POJOs.

```fs
open Fable.Core
open Fable.Core.JsInterop

[<AllowNullLiteral>]
[<Global>]
type Options
    [<ParamObject; Emit("$0")>]
    (searchTerm: string, ?isCaseSensitive: bool) =
    member val searchTerm: string = jsNative with get, set
    member val isCaseSensitive: bool option = jsNative with get, set

let jsOptions =
    jsOptions<Options>(fun o ->
        o.searchTerm <- "test"
        o.isCaseSensitive <- Some true
    )

let createEmpty = createEmpty<Options>
createEmpty.searchTerm <- "test"
createEmpty.isCaseSensitive <- Some true
```

generates

```js
export const jsOptions = {
    searchTerm: "test",
    isCaseSensitive: true,
};

export const createEmpty = {};
createEmpty.searchTerm = "test";
createEmpty.isCaseSensitive = true;
```

#### Methods with positional arguments and POJO

Often in JavaScript, there are methods which accepts positional arguments and an object with more options.

`ParamObject` accept an index argument to say where the options object start

```fs
[<Global>]
type MyLib =
    [<Import("search", "my-lib")>]
    [<ParamObject(1)>]
    static member search(term : string, isCaseSensitive : bool) = jsNative

MyLib.search("foo", true)
```

generates

```js
import { search } from "my-lib";

search("foo", {
    isCaseSensitive: true,
});
```

## Name mangling

Because JavaScript doesn't support overloading or multiple modules in a single file, Fable needs to mangle the name of some members, functions to avoid clashes.

However, Fable will never changes the names of:

- Record fields
- Interface and abstract members
- Functions and values in the **root module**

    Fable consider the root module to be the first one containing actual code and not nested by any other module.

```fs
module A.Long.Namespace.RootModule

// The name of this function will be the same in JS
let add (x: int) (y: int) = x + y

module Nested =
    // This will be prefixed with the name of the module in JS
    let add (x: int) (y: int) = x * y
```

generates:

```js
export function add(x, y) {
    return x + y;
}

export function Nested_add(x, y) {
    return x * y;
}
```

Example of name mangling for methods overloading:

```fs
type Html() =
    static member Div (className : string, content : obj) =
        failwith "Not implemented"

    static member Div (className : string) =
        failwith "Not implemented"
````

generates:

```js
export class Html {
    constructor() {
    }
}

// Reflection code has been truncated

export function Html_Div_433E080(className, content) {
    throw new Error("Not implemented");
}

export function Html_Div_Z721C83C5(className) {
    throw new Error("Not implemented");
}
```

Note how each method has a different name in JavaScript.

### `[<AttachMembers>]`

If you want to have all members attached to a class (as in standard JS classes) and not-mangled use the `AttachMembers` attribute. But be aware overloads won't work in this case.

<p class="tag is-info is-medium">
    Added in v3.2.2
</p>

```fs
[<AttachMembers>]
type MinStack() =
    member _.push(a) = failwith "Not implemented"
    member _.pop() = failwith "Not implemented"
```

generates

```js
export class MinStack {
    constructor() {
    }
    push(a) {
        throw new Error("Not implemented");
    }
    pop() {
        throw new Error("Not implemented");
    }
}
```

### `[<Mangle>]`

<p class="tag is-info is-medium">
    Added in v3.2.0
</p>

If you are not planning to use an interface to interact with JS and want to have overloaded members, you can decorate the interface declaration with the `Mangle` attribute. 

> Interfaces coming from .NET BCL (like System.Collections.IEnumerator) are mangled by default.

For example, the following F# code

```fs
type IRenderer =
    abstract Render : unit -> string
    abstract Render : indentation : int -> string

type Renderer() =
    interface IRenderer with
        member this.Render() = 
            failwith "Not implemented"

        member this.Render(indentation) = 
            failwith "Not implemented"
```

generates an invalid JavaScript code

```js
export class Renderer {
    constructor() {
    }
    Render() {
        throw new Error("Not implemented");
    }
    Render(indentation) {
        throw new Error("Not implemented");
    }
}
```

Indeed, there are 2 methods named `Render` in the same class. To fix this, you can decorate the interface with the `Mangle` attribute:

```fs
[<Mangle>]
type IRenderer =
    abstract Render : unit -> string
    abstract Render : indentation : int -> string
```

generates

```js
export class Renderer {
    constructor() {
    }
    "Program.IRenderer.Render"() {
        throw new Error("Not implemented");
    }
    "Program.IRenderer.RenderZ524259A4"(indentation) {
        throw new Error("Not implemented");
    }
}
```

## Automatic uncurrying

Fable will automatically uncurry functions in many situations: when they're passed as functions, when set as a record field... So in most cases you can pass them to and from JS as if they were functions without curried arguments.

```fs
let execute (f: int->int->int) x y =
    f x y
```

```js
import { execute } from "./TestFunctions.fs.js"

export function execute(f, x, y) {
    return f(x, y);
}

const add = function (x, y) {
    return x + y;
};

execute(add, 3, 5) // 8
```

### Using delegates for disambiguation

There are some situations where Fable uncurrying mechanism can get confused, particularly with functions that return other functions. Let's consider the following example:

```fsharp
open Fable.Core.JsInterop

let myEffect() =
    printfn "Effect!"
    fun () -> printfn "Cleaning up"

// Method from a JS module, expects a function
// that returns another function for disposing
let useEffect (effect: unit -> (unit -> unit)): unit =
    importMember "my-js-module"

// Fails, Fable thinks this is a 2-arity function
useEffect myEffect
```

The problem here is the compiler cannot tell `unit -> unit -> unit` apart from `unit -> (unit -> unit)`, it can only see a 2-arity lambda (a function accepting two arguments). This won't be an issue if all your code is in F#, but if you're sending the function to JS as in this case, Fable will incorrectly try to uncurry it causing unexpected results.

To disambiguate these cases, you can use [delegates](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/delegates), like `System.Func` which are not curried:

```fsharp
open System

// Remove the ambiguity by using a delegate
let useEffect (effect: Func<unit, (unit -> unit)>): unit =
    importMember "my-js-module"

// Works
useEffect(Func<_,_> myEffect)
```

## Dynamic typing, proceed with caution

Dynamic typing allows you to access an object property by name 

:::danger
This feature is not type-safe and should be used with caution. 

Adocate use case for this feature is when you are prototyping or don't have the time to write a proper type-safe interop.
:::

### Property access

```fs
open Fable.Core
open Fable.Core.JsInterop

// Direct access
jsObject?myProperty
// Generates: jsObject.myProperty

let pname = "myProperty"

jsObject?(pname) // Access with a reference
// Generates: jsObject[pname]

jsObject?myProperty <- 5 // Assignment is also possible
// Generates: jsObject.myProperty = 5;
```

### Function application

When combining `?` with application, Fable will destructure tuple arguments as with normal method calls.

```fs
open Fable.Core
open Fable.Core.JsInterop

jsObject?myMethod(1, 2)
```

generates

```js
jsObject.myMethod(1, 2)
```

### Method chaining

You can also use `?` to chain method calls.

```fs
chart
    ?width(768.)
    ?height(480.)
    ?on("renderlet", fun chart ->
        chart?selectAll("rect")?on("click", fun sender args ->
            JS.console.log("click!", args)))
```

generates

```js
chart
    .width(768.)
    .height(480.)
    .on("renderlet", function (chart_1) {
        chart_1
            .selectAll("rect")
            .on("click", function (sender, args) {
                console.log("click!", args);
            });
    });
```

## Dynamic casting

In some situations, when receiving an untyped object from JS you may want to cast it to a specific type. For this you can use the F# `unbox` function or the !! operator in Fable.Core.JsInterop. This will bypass the F# type checker but please note **Fable will not add any runtime check to verify the cast is correct**.
