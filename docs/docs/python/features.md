---
title: Features
layout: standard
toc:
  to: 4
---

In this section, we will cover specific features of Fable that are used when interacting with Python.

:::warning
Python target is in beta meaning that breaking changes can happen between minor versions.
:::

## Utilities

### Automatic case conversion

When targetting Python, Fable will automatically convert F# camelCase names to Python snake_case names.

```fs
let addTwoNumber x y = 
    x + y
```

generates:

```py
def add_two_number(x: int, y: int) -> int:
    return x + y
```

### `nativeOnly`

`nativeOnly` provide a dummy implementation that we use when writing bindings.

Here is its definition:

```fs
    /// Alias of nativeOnly
    let inline nativeOnly<'T> : 'T = 
        failwith "You've hit dummy code used for Fable bindings. This probably means you're compiling Fable code to .NET by mistake, please check."
```

The thrown exception should never be seen as `nativeOnly` calls should be replaced by actual Python code calls.

Examples:

If you have this `hello.py` file:

```py
def say_hello():
    print("Hello world")
```

And this F# code:

```fs
[<Import("say_hello", "hello")>]
let sayHello : unit -> unit = nativeOnly

sayHello()
```

Then the generated code will be:

```py
from hello import say_hello

say_hello()
```

## Imports

In Python, the `import` declaration is used to import codes that are exported by another module.

Fable provides different ways to import Python code, to cover different scenarios.

There are 2 families of imports:

- Attribute-based imports
- Function-based imports

They archieve the same goal, but with a slightly generated code.

```fs
[<Import("sayHello", "hello")>]
let sayHello : unit -> unit = nativeOnly

// ----

let sayHello : unit -> unit = import "say_hello" "hello"
```

generates:

```py
from hello import say_hello

say_hello()

// ----
from hello import say_hello as say_hello_1
from typing import Callable

say_hello: Callable[[], None] = say_hello_1

say_hello()
```

Using the attribute-based imports is recommanded as it generates a smaller output.

### Attributes

#### `[<Global>]`

When trying to bind a global variable, you can use the `[<Global>]` attribute.

```fs
[<Global>]
let print (s : obj) = nativeOnly
```

If you want to use a different in you F# code, you can use the `name` parameter:

```fs
[<Global("print")>]
let log (s : obj) = nativeOnly
```

#### `[<Import(...)>]`

This attributes takes two parameters:

- `selector`: the import selector, can be `*`, or a name
- `from`: the path to the Python file / module

```fs
[<Import("say_hello", "./hello.py")>]
let hello : unit -> unit = nativeOnly
// Generates: from hello import say_hello

[<Import("*", "hello")>]
let hello : unit -> unit = nativeOnly
// Generates: import hello
```

#### `[<ImportAll(...)>]`

`ImportAll` is used to import all members from a Python module and use the F# value name as the name of the imported module.

```fs
[<ImportAll("hello")>]
let hello : unit -> unit = nativeOnly
// Generates: import hello
```

:::info
We are currently checking if this is the correct behavior.

See [this issue](https://github.com/fable-compiler/Fable/issues/3481) for more info.
:::

#### `[<ImportMember(...)>]`

`ImportMember` is used to import a specific member from a Python module, the name is based on the name of the F# value.

```fs
[<ImportMember("hello")>]
let sayHello : unit -> unit = nativeOnly
// Generates: from hello import say_hello

[<ImportMember("hello")>]
let say_hello : unit -> unit = nativeOnly
// Generates: from hello import say_hello
```

For the first example, remember that Fable will convert the F# name to snake_case.

<!-- #### `[<ImportDefault(...)>]`

`ImportDefault` is used to import the default member from a JavaScript module, the name is based on the name of imported module.

```fs
[<ImportDefault("./hello.js")>]
let hello : unit -> unit = nativeOnly
// Generates: import hello from "./hello.js";

[<ImportDefault("./utils/hello.js")>]
let hello : unit -> unit = nativeOnly
// Generates: import hello from "./utils/hello.js";

[<ImportDefault("chalk")>]
let hello : unit -> unit = nativeOnly
// Generates: import chalk from "chalk";

[<ImportDefault("@util/chalk")>]
let hello : unit -> unit = nativeOnly
// Generates: import chalk from "@util/chalk";
``` -->

### Functions

#### `import`

This function takes two parameters:

- `selector`: the import selector, can be `*`, `default` or a name
- `from`: the path to the JavaScript file / module

```fs
let hi : unit -> unit = import "say_hello" "hello"

hi()
// Generates: 
// from typing import Callable
// from hello import say_hello as say_hello_1
// say_hello: Callable[[], None] = say_hello_1
// say_hello()
```

<!-- #### `importAll`

`importAll` is used to import all members from a JavaScript module and use the F# value name as the name of the imported module.

```fs
let hi : unit -> unit = importAll "./hello.js"
// Generates:
// import * as hello from "./hello.js";
// export const hi = hello;
``` -->

#### `importMember`

`importMember` is used to import a specific member from a JavaScript module, the name is based on the name of the F# value.

```fs
let say_hello : unit -> unit = importMember "hello"
// Generates:
// from typing import Callable
// from hello import say_hello as say_hello_1
// say_hello: Callable[[], None] = say_hello_1

let sayHello : unit -> unit = importMember "hello"
// Generates:
// from typing import Callable
// from hello import say_hello as say_hello_1
// say_hello: Callable[[], None] = say_hello_1
```

## Emit, when F# is not enough

Emit is a features offered by Fable, that allows you to write Python code directly in F#.

:::danger
Content of emit snippet, is not validated by F# compiler, so you should use this feature sparingly.
:::

Main use cases:

- You want to test something quickly
- You just need a few lines of Python code and don't want to create a `.py` file
- You don't want to create a binding API to use a Python library

When using `emit`, you can use placeholders like `$0`, `$1`, `$2`, ... to reference the arguments.

### `[<Emit("...")>]`

You can use the `Emit` attribute to decorate function, methods, 

```fs
[<Emit("$0 + $1")>]
let add (x: int) (y: int): int = nativeOnly

let result = add 1 2
```

generates:

```py
result: int = 1 + 2
```

When using classes, `$0` can be used to reference the current instance on methods.

```fs
open Fable.Core
open System

type Test() =
    [<Emit("$0.Function($1...)")>]
    member __.Invoke([<ParamArray>] args: int[]): obj = nativeOnly

let testInstance = Test()

testInstance.Invoke(1, 2, 3)
```

generates:

```py
class Test:
    def __init__(self, __unit: None=None) -> None:
        pass

def Test__ctor(__unit: None=None) -> Test:
    return Test(__unit)

test_instance: Test = Test__ctor()

test_instance.Function(1, 2, 3)
# Note how $0 is replaced by testInstance
```

### `emitExpr`

Destructure a tuple of arguments and applies to literal Python code as with `EmitAttribute`.

> Expressions are values or execute to values, they can be assigned or used as operands

```fs
open Fable.Core.PyInterop

let two : int =
    emitExpr (1, 1) "$0 + $1"

emitExpr () """print("Hello World")"""
```

generates:

```py
two: int = 1 + 1

print("Hello World")
```

### `emitStatement`

Deconstruct a tuple of arguments and generate a Python statement.

> Statements are the whole structure, while expressions are the building blocks. For example, a line or a block of code is a statement.

```fs
open Fable.Core.PyInterop

let add (a : int) (b : int) : int = 
    emitStatement (a, b) "return $0 + $1;"

let repeatHello (count : int) : unit =
    emitStatement 
        count
        """cond = count;
    while cond > 0:
        print("Hello from Fable!")
        cond = cond - 1
    """
```

generates

```py
def add(a: int, b: int) -> int:
    return a + b;


def repeat_hello(count: int) -> None:
    cond = count;
    while cond > 0:
        print("Hello from Fable!")
        cond = cond - 1
```

### `emitExpr` vs `emitStatement`

```fs
let add1 (a : int) (b : int) = 
    emitExpr (a, b) "$0 + $1"

let add2 (a : int) (b : int) = 
    emitStatement (a, b) "$0 + $1"
```

generates:

```py
from typing import Any

def add1(a: int, b: int) -> Any:
    return a + b


def add2(a: int, b: int) -> Any:
    a + b
```

Note how `return` has been added to `add1` and not to `add2`. In this situation if you use `emitStatement`, you need to write `return $0 + $1"`


## `[<Erase>]`

### Erased unions

You can decode a type with `[<Erase>]` to tells fable to not emit code for that type.

This is useful for creating DSL for examples or when trying to represent a virtual type 
for which you don't want to impact the size of the generated code.

```fs
[<Erase>]
type ValueType =
    | Number of int
    | String of string
    | Object of obj

[<Global>]
let prettyPrint (value : ValueType) = nativeOnly

prettyPrint (Number 1)
prettyPrint (String "Hello")
prettyPrint (Object {| Name = "Fable" |})
```

generates:

```py
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

[<ImportMember("util")>]
let myFunction(arg: U2<string, int>): unit = nativeOnly

myFunction(U2.Case1 "testValue")
```

When passing arguments to a method accepting U2, U3... you can use the !^ as syntax sugar so you don't need to type the exact case (the argument will still be type checked):

```fs
open Fable.Core.PyInterop
myFunction !^5 // Equivalent to: my_function(U2.Case2 5)

// This doesn't compile, my_function doesn't accept floats
myFunction !^2.3
```

:::info
Please note erased unions are mainly intended for typing the signature of imported Python functions and not as a cheap replacement of `Choice`. It's possible to do pattern matching against an erased union type but this will be compiled as type testing, and since **type testing is very weak in Fable**, this is only recommended if the generic arguments of the erased union are types that can be easily told apart in the Python runtime (like a string, a number and an array).
:::

```fs
let test(arg: U3<string, int, float[]>) =
    match arg with
    | U3.Case1 x -> printfn "A string %s" x
    | U3.Case2 x -> printfn "An int %i" x
    | U3.Case3 xs -> Array.sum xs |> printfn "An array with sum %f"

// In Python roughly translated as:
// def test(arg: Any) -> None:
//     if str(type(arg)) == "<class \'int\'>":
//         to_console(printf("An int %i"))(arg)
//     elif is_array_like(arg):
//         to_console(printf("An array with sum %f"))(arg)
//     else: 
//         to_console(printf("A string %s"))(arg)
```

### Erased types

Decoring a type with `[<Erase>]` allows you to instruct Fable to not generate any code for that type. This is useful when you want to use a type from a Python library that you don't want to generate bindings for.

```fs
open Fable.Core

type Component =
    interface end

type User() =
    [<Import("Avatar", "user")>]
    static member inline Avatar (userId : string) : Component =
        nativeOnly

let x = User.Avatar "123"
````

generates:

```py
from user import Avatar
from fable_modules.fable_library.reflection import (TypeInfo, class_type)

class Component(Protocol):
    pass

def _expr25() -> TypeInfo:
    return class_type("Program.User", None, User)


class User:
    def __init__(self, __unit: None=None) -> None:
        pass


User_reflection = _expr25

def User__ctor(__unit: None=None) -> User:
    return User(__unit)


x: Component = Avatar("123")
```

As you can see, there are some reflection information generated for the type `User`. However, if you decorate the type with `[<Erase>]`:

```fs
open Fable.Core

type Component =
    interface end

[<Erase>]
type User() =
    [<Import("Avatar", "user")>]
    static member inline Avatar (userId : string) : Component =
        nativeOnly

let x = User.Avatar "123"
````

generates:

```py
from __future__ import annotations
from typing import Protocol
from user import Avatar

class Component(Protocol):
    pass

x: Component = Avatar("123")
```

The generated code is much smaller and doesn't include any reflection information. This trick is useful when you want to minimize the size of your bundle.

## `[<StringEnum>]`

:::info 
These union types must not have any data fields as they will be compiled to a string matching the name of the union case.
:::

```fs
open Fable.Core

[<StringEnum>]
type EventType =
    | Click
    | MouseOver

[<ImportMember("event")>]
let onEvent (event : EventType) (callback : unit -> unit) =
    nativeOnly

onEvent Click ignore
```

generates

```py
from event import on_event
from fable_modules.fable_library.util import ignore

on_event("click", ignore)
```

### `CaseRules`

`StringEnum` accept a parameters allowing you to control the casing used to conver the union case name to a string.

- `CaseRules.None`: `MouseOver` becomes `MouseOver`
- `CaseRules.LowerFirst`: `MouseOver` becomes `mouseOver`
- `CaseRules.SnakeCase`: `MouseOver` becomes `mouse_over`
- `CaseRules.SnakeCaseAllCaps`: `MouseOver` becomes `MOUSE-OVER`
- `CaseRules.KebabCase`: `MouseOver` becomes `mouse-over`

The default is `CaseRules.LowerFirst`.

### `[<CompiledName>]`

You can also use `[<CompiledName>]` to specify the name of the union case in the generated python code.

```fs
open Fable.Core

[<StringEnum>]
type EventType =
    | [<CompiledName("Abracadabra")>] MouveOver

let eventType = EventType.MouveOver
```

generates

```py
event_type: str = "Abracadabra"
```

## Literal Python object

### Anonymous records

Fable translates anonymous records to dict, making them perfect one of the simplest ways to work with.

```fs
let user =
    {|
        Name = "Kaladin"
        Age = 20
    |}
```

### `createObj`

Create a literal Python object from a collection of key-value tuples.

```fs
open Fable.Core
open Fable.Core.PyInterop

let user =
    createObj [
        "Name", "Kaladin"
        "Age", 20
    ]
```

generates

```py
from typing import Any
from fable_modules.fable_library.list import of_array
from fable_modules.fable_library.util import create_obj

user: Any = create_obj(of_array([("Name", "Kaladin"), ("Age", 20)]))
```

Printing `user` returns:

`{'Name': 'Kaladin', 'Age': 20}`

You can also use the special `==>` operator to create the tuples.

```fs
open Fable.Core
open Fable.Core.PyInterop

let user =
    createObj [
        "Name" ==> "Kaladin"
        "Age" ==> 20
    ]
```

<!-- ### `createEmpty`

`createEmpty` is a function that takes a type and returns an empty POJO.

You then need to set each field manually.

```fs
open Fable.Core
open Fable.Core.PyInterop

type IUser = 
    abstract Name : string with get, set
    abstract Age : int with get, set

let user = createEmpty<IUser>
user.Name <- "Kaladin"
user.Age <- 20
```

generates

```py
export const user = {};
user.Name = "Kaladin";
user.Age = 20;
``` -->

## Name mangling

Because Python doesn't support overloading or multiple modules in a single file, Fable needs to mangle the name of some members, functions to avoid clashes.

However, Fable will never changes the names of:

- Record fields
- Interface and abstract members
- Functions and values in the **root module**

    Fable consider the root module to be the first one containing actual code and not nested by any other module.

```fs
module A.Long.Namespace.RootModule

// The name of this function will be the same in Python
let add (x: int) (y: int) = x + y

module Nested =
    // This will be prefixed with the name of the module in Python
    let add (x: int) (y: int) = x * y
```

generates:

```py
def add(x: int, y: int) -> int:
    return x + y


def Nested_add(x: int, y: int) -> int:
    return x * y
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

```py
class Html:
    def __init__(self, __unit: None=None) -> None:
        pass

// Reflection code has been truncated

def Html__ctor(__unit: None=None) -> Html:
    return Html(__unit)

def Html_Div_433E080(class_name: str, content: Any=None) -> Any:
    raise Exception("Not implemented")


def Html_Div_Z721C83C5(class_name: str) -> Any:
    raise Exception("Not implemented")

```

Note how each method has a different name in Python.

### `[<AttachMembers>]`

If you want to have all members attached to a class (as in standard Python classes) and not-mangled use the `AttachMembers` attribute. But be aware overloads won't work in this case.

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

```py
class MinStack:
    def __init__(self, __unit: None=None) -> None:
        pass

    def push(self, a: Optional[Any]=None) -> Any:
        raise Exception("Not implemented")

    def pop(self, __unit: None=None) -> Any:
        raise Exception("Not implemented")
```

### `[<Mangle>]`

<p class="tag is-info is-medium">
    Added in v3.2.0
</p>

If you are not planning to use an interface to interact with Python and want to have overloaded members, you can decorate the interface declaration with the `Mangle` attribute. 

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

```py
class Renderer:
    def __init__(self, __unit: None=None) -> None:
        pass

    def Render(self, __unit: None=None) -> str:
        raise Exception("Not implemented")

    def Render(self, indentation: int) -> str:
        raise Exception("Not implemented")
```

Indeed, there are 2 methods named `Render` in the same class. To fix this, you can decorate the interface with the `Mangle` attribute:

```fs
[<Mangle>]
type IRenderer =
    abstract Render : unit -> string
    abstract Render : indentation : int -> string
```

generates

```py
class Renderer:
    def __init__(self, __unit: None=None) -> None:
        pass

    def Program_IRenderer_Render(self, __unit: None=None) -> str:
        raise Exception("Not implemented")

    def Program_IRenderer_RenderZ524259A4(self, indentation: int) -> str:
        raise Exception("Not implemented")
```

## Automatic uncurrying

Fable will automatically uncurry functions in many situations: when they're passed as functions, when set as a record field... So in most cases you can pass them to and from python as if they were functions without curried arguments.

```fs
let execute (f: int->int->int) x y =
    f x y
```

```py
import program

def add(x, y):
    return x + y

test = program.execute(add, 1, 2) // 3
```

### Using delegates for disambiguation

There are some situations where Fable uncurrying mechanism can get confused, particularly with functions that return other functions. Let's consider the following example:

```fsharp
open Fable.Core.PyInterop

let myEffect() =
    printfn "Effect!"
    fun () -> printfn "Cleaning up"

// Method from a Python module, expects a function
// that returns another function for disposing
let useEffect (effect: unit -> (unit -> unit)): unit =
    importMember "my-py-module"

// Fails, Fable thinks this is a 2-arity function
useEffect myEffect
```

The problem here is the compiler cannot tell `unit -> unit -> unit` apart from `unit -> (unit -> unit)`, it can only see a 2-arity lambda (a function accepting two arguments). This won't be an issue if all your code is in F#, but if you're sending the function to Python as in this case, Fable will incorrectly try to uncurry it causing unexpected results.

To disambiguate these cases, you can use [delegates](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/delegates), like `System.Func` which are not curried:

```fsharp
open System

// Remove the ambiguity by using a delegate
let useEffect (effect: Func<unit, (unit -> unit)>): unit =
    importMember "my-py-module"

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
open Fable.Core.PyInterop

// Direct access
pyObject?myProperty
// Generates: pyObject?myProperty

let pname = "myProperty"

pyObject?(pname) // Access with a reference
// Generates: pyObject[pname]

pyObject?myProperty <- 5 // Assignment is also possible
// Generates: pyObject.myProperty = 5;
```

### Function application

When combining `?` with application, Fable will destructure tuple arguments as with normal method calls.

```fs
open Fable.Core
open Fable.Core.PyInterop

pyObject?myMethod(1, 2)
```

generates

```py
pyObject.myMethod(1, 2)
```

### Method chaining

You can also use `?` to chain method calls.

```fs
chart
    ?width(768.)
    ?height(480.)
    ?on("renderlet", fun chart ->
        chart?selectAll("rect")?on("click", fun sender args ->
            printfn "click: %A", args))
```

generates

```py
def _arrow55(chart_1: Any=None) -> Any:
    def _arrow54(sender: Any=None, args: Any=None) -> Tuple[Callable[[Any], None], Any]:
        def _arrow53(__unit: None=None) -> Callable[[Any], None]:
            clo: Callable[[Any], None] = to_console(printf("click: %A"))
            def _arrow52(arg: Any=None) -> None:
                clo(arg)

            return _arrow52

        return (_arrow53(), args)

    return chart_1.selectAll("rect").on("click", _arrow54)


chart.width(768.0).height(480.0).on("renderlet", _arrow55)
```

## Dynamic casting

In some situations, when receiving an untyped object from Python you may want to cast it to a specific type. For this you can use the F# `unbox` function or the !! operator in Fable.Core.PyInterop. This will bypass the F# type checker but please note **Fable will not add any runtime check to verify the cast is correct**.
