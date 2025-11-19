---
title: Build and Run
layout: standard
---

## Python Version

Fable targets Python 3.12 or higher.

Python 3.10 and 3.11 are deprecated.

## Running Python Code

When targeting python, you can use the output of Fable directly by running it with the python interpreter.

For example:

```bash
python3 Program.py
```

## Publishing to PyPI

If you want to publish a library to PyPI that uses Fable Python, you need to use `--fableLib` option to reference the pre-build Fable library:

:::info
This is because the Fable library is partially written in Rust and needs to be built for all architectures
:::

```bash
dotnet fable --lang python --fableLib fable-library
```

This will make any reference to the Fable library point to a package in the Python search path (e.g., site-packages) instead of the normally bundled library. Your package will then need to declare `fable-library` as a dependency so users can install it from PyPI.
