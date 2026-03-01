---
title: Features
layout: standard
toc:
  to: 4
---

In this section, we will cover specific features of Fable when targeting the BEAM (Erlang).

:::warning
Beam target is in alpha meaning that breaking changes can happen between minor versions.
:::

## Utilities

### Automatic case conversion

When targeting Erlang, Fable automatically converts F# camelCase names to Erlang snake_case names.

```fs
let addTwoNumbers x y =
    x + y
```

generates:

```erlang
add_two_numbers(X, Y) ->
    X + Y.
```

Record fields are also converted to snake_case atoms:

```fs
type User = { FirstName: string; Age: int }
```

generates:

```erlang
#{first_name => <<"Alice">>, age => 30}
```

### Erlang keyword escaping

F# identifiers that conflict with Erlang reserved words are automatically escaped with a `_` suffix:

```fs
let maybe x = x + 1
let receive x = x * 2
```

generates:

```erlang
maybe_(X) -> X + 1.
receive_(X) -> X * 2.
```

### `nativeOnly`

`nativeOnly` provides a dummy implementation used when writing bindings to Erlang libraries.

```fs
[<Import("lists", "reverse")>]
let reverse : 'a list -> 'a list = nativeOnly
```

The thrown exception should never be seen as `nativeOnly` calls are replaced by actual Erlang module calls.

## Imports

Fable provides attributes to import Erlang modules and functions.

### `[<Import(...)>]`

Import a function from an Erlang module:

```fs
[<Import("reverse", "lists")>]
let reverse (xs: 'a list) : 'a list = nativeOnly
```

generates:

```erlang
lists:reverse(Xs)
```

### `[<Emit(...)>]`

Use the `Emit` attribute to inline Erlang code directly:

```fs
[<Emit("lists:reverse($0)")>]
let reverse (xs: 'a list) : 'a list = nativeOnly
```

## Emit, when F# is not enough

Emit allows you to write Erlang code directly in F#.

:::danger
Content of emit snippets is not validated by the F# compiler, so you should use this feature sparingly.
:::

### `[<Emit("...")>]`

Decorate functions with `Emit` to inline Erlang expressions. Use `$0`, `$1`, etc. to reference arguments:

```fs
[<Emit("$0 + $1")>]
let add (x: int) (y: int) : int = nativeOnly

let result = add 1 2
```

generates:

```erlang
Result = 1 + 2.
```

### `emitExpr`

Destructure a tuple of arguments and apply to literal Erlang code:

```fs
open Fable.Core.ErlInterop

let two : int =
    emitExpr (1, 1) "$0 + $1"
```

generates:

```erlang
Two = 1 + 1.
```

## Discriminated Unions

F# discriminated unions compile to atom-tagged tuples in Erlang, which is the idiomatic Erlang convention:

```fs
type Shape =
    | Circle of radius: float
    | Rectangle of width: float * height: float
    | Point
```

generates:

```erlang
%% Circle(5.0) becomes:
{circle, 5.0}

%% Rectangle(3.0, 4.0) becomes:
{rectangle, 3.0, 4.0}

%% Point becomes:
point
```

Fieldless cases compile to bare atoms for efficiency.

### Pattern Matching

Pattern matching on DUs uses Erlang's native pattern matching:

```fs
let area shape =
    match shape with
    | Circle r -> 3.14159 * r * r
    | Rectangle(w, h) -> w * h
    | Point -> 0.0
```

generates:

```erlang
area(Shape) ->
    case Shape of
        {circle, R} -> 3.14159 * R * R;
        {rectangle, W, H} -> W * H;
        point -> 0.0
    end.
```

## Records

F# records compile to Erlang maps:

```fs
type User = { Name: string; Age: int }

let user = { Name = "Alice"; Age = 30 }
let name = user.Name
```

generates:

```erlang
User = #{name => <<"Alice">>, age => 30}.
Name = maps:get(name, User).
```

Record update syntax works naturally:

```fs
let older = { user with Age = user.Age + 1 }
```

## Option Type

Options use an erased representation for efficiency:

- `None` compiles to the `undefined` atom
- `Some(x)` is erased to just `x` for simple cases
- Nested options (`Option<Option<T>>`) use wrapped representation: `{some, x}`

```fs
let greet name =
    match name with
    | Some n -> printfn "Hello, %s!" n
    | None -> printfn "Hello, stranger!"
```

generates:

```erlang
greet(Name) ->
    case Name of
        undefined -> io:format("Hello, stranger!~n");
        N -> io:format("Hello, ~s!~n", [N])
    end.
```

## Result Type

F# `Result<T,E>` maps to Erlang's idiomatic `{ok, Value}` / `{error, Error}` convention:

```fs
let divide x y =
    if y = 0 then Error "Division by zero"
    else Ok (x / y)
```

generates:

```erlang
divide(X, Y) ->
    case Y =:= 0 of
        true -> {error, <<"Division by zero">>};
        false -> {ok, X div Y}
    end.
```

## Structural Equality and Comparison

Erlang's native `=:=` operator performs deep structural comparison on all types (tuples, maps, lists, atoms, numbers, binaries), which matches F#'s structural equality semantics perfectly. No runtime library is needed:

```fs
let a = { Name = "Alice"; Age = 30 }
let b = { Name = "Alice"; Age = 30 }
a = b  // true
```

generates:

```erlang
A =:= B.  %% Deep comparison, returns true
```

Structural comparison uses Erlang's native ordering operators (`<`, `>`, `=<`, `>=`), which work on all Erlang terms.

## Async and Task

F# `async` and `task` computation expressions are supported using CPS (Continuation-Passing Style):

```fs
let fetchData () = async {
    do! Async.Sleep 1000
    return "Hello from BEAM!"
}

Async.RunSynchronously (fetchData ())
```

- `Async.Parallel` spawns one Erlang process per computation and collects results via message passing
- `Async.Sleep` uses `timer:sleep`
- `task { }` is an alias for `async { }` on the Beam target

## MailboxProcessor

F#'s `MailboxProcessor` is supported using an in-process CPS continuation model:

```fs
let agent = MailboxProcessor.Start(fun inbox ->
    let rec loop count = async {
        let! msg = inbox.Receive()
        printfn "Received: %s (count: %d)" msg count
        return! loop (count + 1)
    }
    loop 0
)

agent.Post "Hello"
agent.Post "World"
```

## `[<Erase>]`

### Erased unions

Decorate a union type with `[<Erase>]` to tell Fable not to emit code for that type. The union cases are replaced with their underlying values:

```fs
[<Erase>]
type ValueType =
    | Number of int
    | Text of string

[<Import("process", "lists")>]
let processList (value: ValueType) : unit = nativeOnly

processList (Number 42)
processList (Text "hello")
```

generates:

```erlang
lists:process(42).
lists:process(<<"hello">>).
```

### `U2`, `U3`, ..., `U9`

Fable provides built-in erased union types that you can use without defining custom erased unions:

```fs
open Fable.Core

[<Import("handle", "mymodule")>]
let handle (arg: U2<string, int>) : unit = nativeOnly

handle (U2.Case1 "hello")
handle (U2.Case2 42)
```

## `[<StringEnum>]`

:::info
These union types must not have any data fields as they will be compiled to a string matching the name of the union case.
:::

```fs
open Fable.Core

[<StringEnum>]
type LogLevel =
    | Debug
    | Info
    | Warning

[<Import("log", "logger")>]
let log (level: LogLevel) (msg: string) : unit = nativeOnly

log Info "Application started"
```

generates:

```erlang
logger:log(<<"info">>, <<"Application started">>).
```

## Name Mangling

Because Erlang doesn't support function overloading, Fable mangles names when necessary:

```fs
module A.Long.Namespace.RootModule

// Root module functions keep their names
let add (x: int) (y: int) = x + y

module Nested =
    // Nested functions get prefixed
    let add (x: int) (y: int) = x * y
```

generates:

```erlang
add(X, Y) -> X + Y.

nested_add(X, Y) -> X * Y.
```

Fable will never change the names of:

- Record fields
- Interface and abstract members
- Functions and values in the **root module**

### `[<AttachMembers>]`

Use `AttachMembers` to keep all members as standard, non-mangled Erlang functions. Be aware that overloads won't work in this case.

## Automatic Uncurrying

Fable automatically uncurries functions when passed to and from Erlang, so in most cases you can use them as if they were uncurried:

```fs
let execute (f: int -> int -> int) x y =
    f x y
```

## Exceptions

Exceptions use Erlang's `throw`/`catch` mechanism:

```fs
try
    failwith "Something went wrong"
with
| ex -> printfn "Error: %s" ex.Message
```

Custom F# exceptions compile to maps with type tags for discrimination:

```fs
exception MyError of message: string
exception MyError2 of code: int * message: string

try
    raise (MyError "oops")
with
| :? MyError as e -> printfn "MyError: %s" e.Message
| :? MyError2 as e -> printfn "MyError2: code=%d" e.code
```

## Type Testing

Runtime type checks use Erlang guard functions:

```fs
let describe (x: obj) =
    match x with
    | :? int as i -> sprintf "Integer: %d" i
    | :? string as s -> sprintf "String: %s" s
    | :? float as f -> sprintf "Float: %f" f
    | _ -> "Unknown"
```

generates guards like `is_integer(X)`, `is_binary(X)`, `is_float(X)`, etc.
