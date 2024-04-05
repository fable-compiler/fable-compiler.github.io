---
title: Python
layout: standard
---

:::warning
Python target is in beta meaning that breaking changes can happen between minor versions.
:::

This section is specific to Python targetting, it will guide you through the process of setting up your project and using Fable with Python.

:::info
Please make sure you followed the [Fable setup guide](/docs/2-steps/your-first-fable-project) before continuing.
:::


<ul class="textual-steps">

<li>

Run your code.

```bash
python3 program.py
```

</li>

<li>

When targeting Python, you will want to install the `Fable.Python` package. It provides a set of bindings to the Python standard library, and so others common libraries.

```bash
dotnet add package Fable.Python
```

</li>


<li>

Change the content of `Program.fs` to the following:

```fs

open Fable.Python.Builtins

let file = builtins.``open``("test.txt", OpenTextMode.Write)
file.write("Hello World!") |> ignore
```

:::info
Python bindings are early stage, so some APIs are not yet available.

You can report missing APIs or send PR on the [Fable.Python repository](https://github.com/fable-compiler/Fable.Python)
:::

</li>

<li>

Run Fable in watch mode

```bash
dotnet fable watch --lang python
```

If you run your node script again, you should see a new file `test.txt` with the content `Hello World`.

Try changing the content of `Hello World` to something else and re-run your script.

You should see that Fable re-compile your code and the file content changed.

</li>

</ul>
