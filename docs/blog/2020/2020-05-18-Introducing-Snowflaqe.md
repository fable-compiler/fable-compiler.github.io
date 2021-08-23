---
title: Introducing Snowflaqe
layout: fable-blog-page
author: Zaid-Ajaj
date: 2020-05-18
author_link: https://twitter.com/zaid_ajaj
author_image: https://github.com/Zaid-Ajaj.png
# external_link:
abstract: |
  In this blog post, we will introduce a new tool for Fable called Snowflaqe which will allow generating type-safe GraphQL clients for Fable applications.
---

## Introducing Snowflaqe

In this blog post, we will introduce a new tool for Fable called [Snowflaqe](https://github.com/Zaid-Ajaj/Snowflaqe) which will allow generating type-safe GraphQL clients for Fable applications. Though at first, let us talk about what the problem is that Snowflaqe solves and why it is needed.

### GraphQL Backends

While most web applications implement data exchange protocols between backend and frontend as a traditional REST API or some (g)RPC library, many modern applications have been implementing their backend API with [GraphQL](https://graphql.org/) instead. Exposing a GraphQL API enables a rich and easy to use query language for different frontends and different clients. GraphQL has been very popular especially in the node.js community and it is now gaining momentum in .NET via the excellent [graphql-dotnet](https://github.com/graphql-dotnet/graphql-dotnet) library and other platforms as well.

### Type-Safe GrapQL Clients

When a client communicates with a GraphQL backend, it sends a query. The query must be compatible with the exposed GraphQL schema from the backend in order to return the requested data (much like SQL queries).

The shape and structure of the data is very much dependent on the written query. This means that data returned from a query has a unique shape and type. For example, the following query:

```
query {
    posts {
        id
        title
        author {
            firstName
            lastName
        }
    }
}
```
Might map to F# types as follows:
```fsharp
type Author = {
    firstName: string option
    lastName: string option
}

type Post = {
    id: string
    title: string
    author: Author
}

type Query = {
    posts: Post list
}
```
> The types are of course imaginary here and are for demo purposes.

Adding or removing properties from the query changes the type of the shape of data that is returned.
Modelling the shape of the queries via F# types by hand can be a cumbersome task and is very error-prone: you as a developer have to lookup the individual types and making sure these align with the schema every time the schema changes.

### Type-Providers to the rescue...?

The first idea that F# developers get when looking at such problem is: "There must be a type provider for this!" and they would be right. In F# land, the awesome [FSharp.Data.GraphQL](https://github.com/fsprojects/FSharp.Data.GraphQL) library gives the ability to write GraphQL backends and includes a type provider for type-safe clients in F#. Unfortunately, ever since Fable 2.0 came out around late 2018, that type provider [was no longer compatible](https://github.com/fsprojects/FSharp.Data.GraphQL/issues/204) with Fable applications. I thought I could give it a try and fix the problem in the repository, even the maintainer [John Berzy](https://github.com/johnberzy-bazinga) generously offered to help out but I couldn't get my head around the code base: type providers are really hard to write and to understand what exactly they are doing. Not to mention, I didn't enough experience in GraphQL itself to understand how the mapping worked by that time.

### Snowflaqe: code-gen back to business

Instead of a type-provider, I thought I would start fresh from a new perspective and instead try to implement what many tools in the node.js ecosystem do: code-generate the client application! This is essentially what [Snowflaqe](https://github.com/Zaid-Ajaj/Snowflaqe) does: it generates a fully functional F# *project* that can be referenced from Fable applications. The generation process uses a URL to the GraphQL backend to retrieve the schema from and an input directory containing the individual queries. The tool will first *validate* and *type-check* the queries against the schema and when everything is good, it starts to generate the actual project.

Snowflaqe is currently at v1.0 and it is distributed as a dotnet CLI tool, you can give it a try by installing it on your machine:
```
dotnet tool install snowflaqe -g
```
If you wanted to build a GraphQL front-end using latest Fable, now you can. The tool is still very much in early days and I have only been developing it for the last 3 weeks. I used it at work for one of our Fable projects that talks to a GraphQL backend using complex queries and it works like a charm, I was really happy with the results. In case you have a project to try it out too, I am curious to hear your feedback.

> Currently Snowflaqe only supports Fable projects but in the future I plan to allow for other specialized generation targets such as F# on dotnet or on WebAssembly via [Bolero](https://fsbolero.io/). As always, PRs are welcome!

You can learn more about Snowflaqe by reading the [docs on Github](https://github.com/Zaid-Ajaj/Snowflaqe)

I hope you enjoy using Snowflaqe.

Happy coding!
