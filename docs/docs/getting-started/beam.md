---
title: Beam (Erlang)
layout: standard
---

:::warning
Beam target is in alpha meaning that breaking changes can happen between minor versions.
:::

This section is specific to Beam (Erlang) targeting. It will guide you through the process of setting up your project and using Fable to compile F# to Erlang.

:::info
Please make sure you followed the [Fable setup guide](/docs/2-steps/your-first-fable-project) before continuing.
:::

## Prerequisites

You need [Erlang/OTP](https://www.erlang.org/downloads) 24 or higher installed. Verify with:

```bash
erl -eval 'erlang:display(erlang:system_info(otp_release)), halt().' -noshell
```

<ul class="textual-steps">

<li>

Compile your project to Erlang:

```bash
dotnet fable --lang beam
```

This generates `.erl` files in the output directory (default `./output`).

</li>

<li>

Compile the generated Erlang files:

```bash
erlc -o output output/*.erl
erlc -o output/fable_modules/fable-library-beam output/fable_modules/fable-library-beam/*.erl
```

</li>

<li>

Run your code:

```bash
erl -pa output -pa output/fable_modules/fable-library-beam -noshell -eval 'program:main(), halt().'
```

</li>

<li>

Run Fable in watch mode for development:

```bash
dotnet fable watch --lang beam
```

</li>

</ul>
