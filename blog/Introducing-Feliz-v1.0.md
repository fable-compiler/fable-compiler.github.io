- title: Introducing Feliz v1.0
- subtitle: Announcing the official stable release of Feliz

## Introducing Feliz v1.0

Today, we are happy to announce the official stable release of [Feliz](https://github.com/Zaid-Ajaj/Feliz). This comes after 10 months of development since the initial version and more than 100 releases in between where we kept adding support for more and more React APIs as well as increasing the API coverage for Html, SVG and CSS elements.

Since its inception, Feliz has strived to become both a high-quality and developer-friendly library for building React applications in Fable. The stable release summarizes our efforts for reaching that goal and the work we have done in documenting, testing and expanding Feliz along with its ecosystem of libraries. Let us break down that work into the following sections.

### React API coverage

As of v1.0, Feliz supports function components and memo components in React as well as *all* the available hooks within the core React library. This makes Feliz suitable for building standalone React applications following modern React patterns. Since Feliz maps the React API as close as possible to the original API, it is fairly simple to learn from the React documentation and the available tutorials made for Javascript and apply them to F# and Fable.

### Documentation

As of v1.0, Feliz offers extensive [documentation](https://zaid-ajaj.github.io/Feliz/) with guides and interactive code samples to demonstrate concepts in React, Feliz as well a plethora of live examples from the ecosystem libraries of Feliz.

### Automated Testing

One of the basic premises of a high-quality library is that it is robust and doesn't silently break. As of v1.0, Feliz includes unit tests for the implementation of various React APIs as well as many of internal APIs to ensure the stability of the code. These tests run in a headless chrome browser on every commit and for every PR. The actual library used for testing is the [Fable.ReactTestingLibrary](https://zaid-ajaj.github.io/Feliz/#/Testing/Utilities/RTL) by [@Shmew](https://github.com/Shmew) whose contributions to Feliz has been amazing and continues to build really cool libraries for Fable.

### Ecosystem

Feliz has inspired amazing libraries that make up the current ecosystem of the library. These libraries follow the philosophy of Feliz of making well documented, tested and developer-friendly libraries. We promote those libraries in the documentation of Feliz, if you build something cool, send us a PR and we will add it to the list. Notable libraries of the ecosystem are:
 -  [Feliz.MaterialUI](https://github.com/cmeeren/Feliz.MaterialUI) by [@cmeeren](https://github.com/cmeeren) which has its own [ecosystem](https://cmeeren.github.io/Feliz.MaterialUI/#ecosystem) of libraries by [@Shmew](https://github.com/Shmew)
 -  [Feliz.Bulma](https://github.com/Dzoukr/Feliz.Bulma) by [@Dzoukr](https://github.com/Dzoukr)
 -  [Feliz.Plotly](https://github.com/Shmew/Feliz.Plotly) by [@Shmew](https://github.com/Shmew)
 -  [Fable.Jester](https://github.com/Shmew/Fable.Jester) by [@Shmew](https://github.com/Shmew)
 -  [Feliz.ViewEngine](https://github.com/dbrattli/Feliz.ViewEngine) by [@dbrattli](https://github.com/dbrattli)
 -  [Feliz.Router](https://github.com/Zaid-Ajaj/Feliz.Router) by yours truly
 -  [Feliz.Recharts](https://zaid-ajaj.github.io/Feliz/#/Recharts/Overview) and [Feliz.PigeonMaps](https://zaid-ajaj.github.io/Feliz/#/Recharts/Overview) are included within the repository of Feliz.

> All of these libraries are [Femto](https://github.com/Zaid-Ajaj/Femto)-compatible which makes them really simple and easy to install without worrying about their corresponding npm dependencies.

I hope many more will come in the near future as we expand the Fable space and build even more great bindings around amazing Javascript projects.

### What is next?

Building awesome applications using Fable and Feliz! If you want to show off your side project, we are looking to create a page "Made with Feliz", so let us know about it and we will put a link up there :) Also if you are using Feliz professionally and can't share the code, you can tell us about your experience and what we could do to make it better in the next iteration.