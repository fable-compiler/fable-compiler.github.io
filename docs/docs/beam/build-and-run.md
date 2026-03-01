---
title: Build and Run
layout: standard
---

## Erlang/OTP Version

Fable targets Erlang/OTP 24 or higher. OTP 25+ is recommended for the full keyword set support.

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

The generated `.erl` files are standard Erlang that can be compiled with `erlc` and run on the BEAM VM.

## Compiling to Erlang

```bash
dotnet fable --lang beam
```

By default, output goes to the project directory (where the `.fsproj` is). You can change this with `--outDir`:

```bash
dotnet fable --lang beam --outDir /path/to/output
```

## Output Structure

The output directory will contain:

```text
output/
  program.erl                              # Your compiled F# modules
  fable_modules/
    fable-library-beam/
      fable_list.erl                       # F# List runtime
      fable_map.erl                        # F# Map runtime
      fable_string.erl                     # String utilities
      fable_seq.erl                        # Seq/IEnumerable support
      ...                                  # Other runtime modules
```

## Compiling Erlang

After Fable generates `.erl` files, compile them with `erlc`:

```bash
# Compile the runtime library
erlc -o output/fable_modules/fable-library-beam output/fable_modules/fable-library-beam/*.erl

# Compile your project files
erlc -pa output/fable_modules/fable-library-beam -o output output/*.erl
```

## Running Erlang Code

Run your compiled module using the Erlang shell:

```bash
erl -pa output -pa output/fable_modules/fable-library-beam \
    -noshell -eval 'program:main(), halt().'
```

The `-pa` flag adds directories to the code path so Erlang can find both your modules and the Fable runtime library.

## Module Naming

Fable converts F# filenames to snake_case to match Erlang conventions:

- `Program.fs` becomes `program.erl` with `-module(program).`
- `MyModule.fs` becomes `my_module.erl` with `-module(my_module).`

Erlang requires the module name to match the filename, so this conversion is automatic.

## Program vs Library

Fable projects compiling to Erlang should set `OutputType` to `Exe` for projects with a `[<EntryPoint>]`:

```xml
<OutputType>Exe</OutputType>
```

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
