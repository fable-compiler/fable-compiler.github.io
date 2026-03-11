---
title: Build and Run
layout: standard
---

<p class="tag is-info is-medium">
    Added in v5.0.0-rc.1
</p>

## Prerequisites

- [Erlang/OTP](https://www.erlang.org/downloads) 25 or higher
- [rebar3](https://rebar3.org/) (the standard Erlang build tool)

## Architecture

Fable compiles F# to Erlang source files (`.erl`), following the same pipeline as all Fable targets:

```text
F# Source
    |  FSharp2Fable
Fable AST
    |  FableTransforms
Fable AST (optimized)
    |  Fable2Beam
Erlang AST
    |  ErlangPrinter
.erl source files
```

The generated `.erl` files are standard Erlang that can be compiled with rebar3 and run on the BEAM VM.

## Compiling to Erlang

```bash
dotnet fable --lang beam
```

By default, output goes to the project directory (where the `.fsproj` is). You can change this with `--outDir`:

```bash
dotnet fable --lang beam --outDir /path/to/output
```

## Output Structure

Fable automatically generates a complete [rebar3](https://rebar3.org/) project scaffold alongside the compiled `.erl` files. The output directory will contain:

```text
output/
  rebar.config                             # rebar3 project config (auto-generated)
  src/
    program.erl                            # Your compiled F# modules
    my_project.app.src                     # OTP application resource file
  fable_modules/
    fable-library-beam/
      rebar.config                         # Per-dependency rebar3 config
      src/
        fable_library_beam.app.src         # OTP app resource for the library
        fable_list.erl                     # F# List runtime
        fable_map.erl                      # F# Map runtime
        fable_string.erl                   # String utilities
        fable_seq.erl                      # Seq/IEnumerable support
        ...                                # Other runtime modules
```

### Rebar3 Scaffold Details

— if you create your own `rebar.config` (without the Fable marker), it will be left untouched (a warning is emitted)
— project and dependency names are normalized to valid OTP application names (e.g., `Fable.Logging.0.10.0` → `fable_logging`, `fable-library-beam` → `fable_library_beam`)
— the generated `rebar.config` uses `{project_app_dirs, [".", "fable_modules/*"]}` so rebar3 treats each NuGet dependency as a sub-application

## Compiling with rebar3

After Fable generates the scaffold, compile everything with rebar3:

```bash
rebar3 compile
```

This compiles all `.erl` files (your project and all dependencies) and places `.beam` files in `_build/default/lib/*/ebin/`.

## Running Erlang Code

Run your compiled module using the Erlang shell:

```bash
erl -noshell -pa _build/default/lib/*/ebin \
    -eval 'program:main(), halt().'
```

The `-pa` flag adds the rebar3 output directories to the code path so Erlang can find both your modules and the Fable runtime library.

## Module Naming

Fable converts F# filenames to snake_case to match Erlang conventions:

- `Program.fs` becomes `program.erl` with `-module(program).`
- `MyModule.fs` becomes `my_module.erl` with `-module(my_module).`

Erlang requires the module name to match the filename, so this conversion is automatic.

## Program vs Library

The Beam backend currently does not differentiate between `Exe` and `Library` output types. All top-level code is compiled into a `main/0` Erlang function regardless of the `OutputType` setting. The `[<EntryPoint>]` attribute is not used.

## Watch Mode

For development, use watch mode to recompile on changes:

```bash
dotnet fable watch --lang beam
```

## Custom fable-library Path

If you need a custom version of the runtime library (e.g., for development), use the `--fableLib` option:

```bash
dotnet fable --lang beam --fableLib /path/to/custom/fable-library-beam
```
