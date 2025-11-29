---
title: Build and Run
layout: standard
---

## Python Version

Fable targets Python 3.12 or higher.

Python 3.10 and 3.11 are deprecated.

## Installing fable-library

Fable Python requires the `fable-library` package to be installed from PyPI. This package contains the core runtime library that Fable-generated Python code depends on.

:::info
The fable-library is partially written in Rust for correctness. Installing from PyPI ensures you get pre-built binaries that are compatible with your Python version and system architecture.
:::

### Version Pinning

It is important to pin fable-library to a version compatible with your Fable compiler version. If you install an incompatible version, your generated code may not work correctly.

**For stable releases (e.g., Fable 5.x):**

```bash
pip install "fable-library>=5.0.0,<6.0.0"
```

or with Poetry (in `pyproject.toml`):

```toml
fable-library = ">=5.0.0,<6.0.0"
```

or with uv:

```bash
uv add "fable-library>=5.0.0,<6.0.0"
```

**For alpha/beta releases:** Pin to the exact version matching your Fable compiler. Note that PyPI uses a different naming convention (e.g., `5.0.0-alpha.17` becomes `5.0.0a17`):

```bash
pip install "fable-library==5.0.0a17"
```

## Running Python Code

When targeting Python, you can use the output of Fable directly by running it with the Python interpreter.

For example:

```bash
python3 Program.py
```

## Custom fable-library Path

If you need to use a custom version of fable-library (e.g., for development or testing), you can use the `--fableLib` option:

```bash
dotnet fable --lang python --fableLib /path/to/custom/fable-library
```

## Publishing to PyPI

When publishing a library to PyPI that uses Fable Python, your package should declare `fable-library` as a dependency with appropriate version constraints so users get a compatible version automatically.
