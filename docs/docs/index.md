---
title: What is Fable?
layout: standard
---

Fable is a compiler that lets you use [F#](https://fsharp.org/) to build applications.

Historically, Fable has been used to target JavaScript but since Fable 4, you can also target other languages such as TypeScript, Rust, Python, and more.

```fsharp
type Shape =
    | Square of side: double
    | Rectangle of width: double * length: double

let getArea shape =
    match shape with
    | Square side -> side * side
    | Rectangle (width, length) -> width * length

let square = Square 2.0
printfn $"The area of the square is {getArea square}"
```

## What is F#?

F# (pronounced f-sharp) is a strongly typed Functional programming language which offers many great features to build robust and maintable code such as:

- Lightweight syntax
- Immutability baked into the language by default
- Rich types which let you represent easily your data or your domain
- Powerful pattern matching to define complex behaviors
- And so much more...

F# is already used on the server for web and cloud apps, and it's also used quite a lot for data science and machine learning. It's a great general-purpose language, and also a great fit for building beautiful UIs that run in the browser.

## Available targets

<table style="
    max-width: 500px;
">
  <thead>
    <tr>
      <th>Target</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>JavaScript</td>
      <td>Stable</td>
    </tr>
    <tr>
      <td>TypeScript</td>
      <td>Stable</td>
    </tr>
    <tr>
      <td>Dart</td>
      <td>Beta</td>
    </tr>
    <tr>
      <td>Python</td>
      <td>Beta</td>
    </tr>
    <tr>
      <td>Rust</td>
      <td>Alpha</td>
    </tr>
    <tr>
      <td>PHP</td>
      <td>Experimental</td>
    </tr>
  </tbody>
</table>

- **Stable** production ready, breaking changes are introduced only in major versions
- **Beta**: Users are encourage to try it out to help with development and give feedback
- **Alpha**: Target is in active development but not all the features, APIs are implemented yet. Breaking changes can happen between minor versions.
- **Experimental**: Target exists but actively maintained. If you are interested in helping with development, please reach out to us.

## Why use F# for your next project?

F# is a great choice to build applications that are robust and maintable code such as.

This is because F# has:

* Succinct lightweight syntax
* Great type system and pattern matching
* Immutability is the default, but you can still opt-in to mutability when needed
* Supported by large companies (such as Microsoft and Jetbrains) and comes with commercial tooling support

Depending on the target you choose, those benefits will tenfold.

### F# for JavaScript

JavaScript is a dynamic so you don't have a lot of safety when writing code. This can lead to bugs that are hard to find and fix.

With F#, your application will be safer, more robust and more pleasant to read and write. You can refactor your code with confidence as the compiler will tell you if you missed something.

### F# for TypeScript

TypeScript is safer then JavaScript but it still lacks some features.

For example, it doesn't really have a way to represent discriminated unions, and so it is easy to miss a case when you are using them. In F#, the compiler will tell you if you missed a case.
