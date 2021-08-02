---
layout: fable-blog-page
title: Announcing Nagareyama (Fable 3) (and IV)
author: Alfonso García-Caro
date: 2020-12-04
author_link: https://twitter.com/alfonsogcnunez
author_image: https://github.com/alfonsogarciacaro.png
# external_link:
abstract: |
  Today is the day, Fable 3 Nagareyama is officially released!
---

Today is the day, Fable 3 Nagareyama is officially released! Does this mean the latest version is bug-free? Probably not, but at least the install command is shorter. We have also tested the release candidates in many projects and managed to fix all the outstanding issues so if you find a problem when upgrading your Fable 2 project you may even consider yourself lucky (also, please report).

First things first, I have to acknowledge all the people that have contributed to this release: from Don Syme himself to ncave, our mysterious contributor, and all the early-users that have helped polish this release. Very importantly, the teachers too that take care of my children in difficult times so I can focus on programming. The fact that so many people can collaborate together to put a project like Fable forward still feels like magic to me and I can only say a big THANK YOU to you all. I'm also very happy this is coincidental with the release of F# 5, as incredibly smart people are putting a lot of effort to make the development experience with the language really pleasant. Quoting Krzysztof Cieślak, what a great time to be an F# developer!

How can you try Fable 3, you say? This is it:

```
dotnet tool install fable
dotnet fable src
```

(Change "src" with the path to your project.) It's that easy, type `dotnet fable --help` to see more options. Of course you still need extra tooling to bundle the JS code, spin off a development server, etc. If you're upgrading an app using Webpack, please [check this PR for reference](https://github.com/MangelMaxime/fulma-demo/pull/43).

Let's quickly go through the highlights of Nagareyama:

- It's Fable v3. Three is bigger than two, that's already a win.
- There are no breaking changes, your Fable 2 project should compile as is with Nagareyama (you may need to update some libraries).
- It's a dotnet tool, following suit with most F# project. Remember when Fable, Paket and Fake had each their own way to be downloaded and version-managed? Those days are happily gone!
- It removes the inter-process communication with JS, greatly simplifying Fable usage and development.
- The previous point together with other fixes have improved the compilation speed by a big deal. Expect it to be at least cut in half in most cases!
- Fable is not tightly coupled with a specific bundler anymore like Webpack so you can use any tool you like! (Webpack is still a great choice.)
- A lot of effort has been also put to prettify the generated code, making it more readable and easier to debug if needed.
- Nagareyama can accept plugins by library authors. Zaid is already using this feature to make it much simpler to [write React components compatible with JS tooling](https://youtu.be/a6Ct3CM_lj4?t=860).

You can check the [previous posts](https://fable.io/blog/Announcing-Nagareyama-3.html) for more details.

<br />

So what are you waiting for? Give Nagareyama a try and let the world know if it goes well... and let us know (privately) if it doesn't 😅 Have fun!
