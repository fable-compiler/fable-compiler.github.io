---
title: Rust
layout: standard
---

:::warning
Rust target is in alpha meaning that not everything is supported and breaking changes can happen.
:::

:::info
Please make sure you followed the [Fable setup guide](/docs/2-steps/your-first-fable-project) before continuing.
:::


<ul class="textual-steps">

<li>

Create a `Cargo.toml` file with the following content:

```toml
[package]
name = "fable-rust-sample"
version = "0.1.0"
edition = "2021" 

[[bin]]
name = "program"
path = "Program.fs.rs"

[dependencies]
fable_library_rust = { path = "./fable_modules/fable-library-rust" }
```

</li>

<li>

Change `Program.fs` to the following:

```fs
[<EntryPoint>]
let main args = 
    printfn "Hello from F#"
    0
```

</li>

<li>

Compile your code using Fable and run it using Rust.

```bash
dotnet fable --lang rust
cargo run
```

You should see `Hello from F#` in your terminal.

</li>

</ul>
