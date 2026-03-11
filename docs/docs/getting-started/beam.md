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

You need [Erlang/OTP](https://www.erlang.org/downloads) 25 or higher and [rebar3](https://rebar3.org/) installed. Verify with:

```bash
erl -eval 'erlang:display(erlang:system_info(otp_release)), halt().' -noshell
rebar3 version
```

<ul class="textual-steps">

<li>

Compile your project to Erlang:

```bash
dotnet fable --lang beam
```

Fable generates `.erl` files in `src/` subdirectories and automatically creates a [rebar3](https://rebar3.org/) project scaffold (`rebar.config`, `.app.src` files).

</li>

<li>

Compile the generated Erlang files with rebar3:

```bash
rebar3 compile
```

</li>

<li>

Run your code:

```bash
erl -noshell -pa _build/default/lib/*/ebin -eval 'program:main(), halt().'
```

</li>

<li>

Run Fable in watch mode for development:

```bash
dotnet fable watch --lang beam
```

</li>

</ul>

For more details, see [Build and Run](/docs/beam/build-and-run).
