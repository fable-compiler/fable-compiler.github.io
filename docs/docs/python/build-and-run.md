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

When building a library that uses Fable Python and you want to publish it to PyPI, you cannot bundle the Fable library the normal way. This is because the Fable library is partially written in Rust and needs to be built for all architectures.

Instead, use the `--fableLib` option to reference a pre-built Fable library:

```bash
dotnet fable --lang python --fableLib fable-library
```

This will make any reference to the Fable library point to a package in the Python search path (e.g., site-packages) instead of the normally bundled library. Your package will then need to declare `fable-library` as a dependency so users can install it from PyPI.
