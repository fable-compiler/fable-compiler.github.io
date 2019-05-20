- title: May Announcements
- subtitle: Get your ticket for FableConf!

Hi there! Just a very quick post to share with you some of the things that have been happening for the last few weeks in Fable World. Here we go!

## New version of fable-compiler: 2.3.10

Thanks to [Julien Roncaglia](https://twitter.com/virtualblackfox) and [Matthias Dittrich](https://twitter.com/matthi__d) we've managed to spot, and most importantly fix, some corner cases involving inlining or partial application where Fable would run side effects multiple times. To prevent this, just run `npm update fable-compiler` in your app. Thanks again for the contributions and keep posting whatever issue you may find!

## REPL has been updated

[Fable REPL](https://fable.io/repl) has finally been updated to use [Fable.Core 3 and friends](https://fable.io/blog/Announcing-2-2.html#fable-core-3). In some browser, the service worker seem to refuse to download the new files. So if you don't see the changes, please try deleting the cache for fable.io and doing a hard reload.

## fable-compiler-quotations

[Georg Haaser](https://github.com/krauthaufen) has made a fantastic contribution to Fable by [enabling quotations](https://github.com/fable-compiler/Fable/pull/1839). This has been a long request by some of you and opens up many interesting scenarios like [generating WebGL shaders in real-time](https://www.youtube.com/watch?v=s5rO0RUXXmo). The PR will also extend Fable reflection capabilities to make them much closer to .NET (e.g. making it possible to instantiate and invoke methods from a class).

Because the changes are so big, we're currently evaluating the impact on the compiler. Things are looking good and most likely the PR will be merged soon. (The only drawback is the bundle size may go up a bit due to the additional reflection info.)

But it's already possible for you to check out this shinny feature! You only need to install the `fable-compiler-quotations` package from npm and tell fable-loader to use this version instead by adding "compiler" to your Fable options like:

```js
    {
        test: /\.fs(x|proj)?$/,
        use: {
            loader: "fable-loader",
            options: {
                babel: CONFIG.babel,
                define: ["FABLE_QUOTATIONS"],
                compiler: "fable-compiler-quotations",
            }
        },
    },
```

> You also need to define the FABLE_QUOTATIONS constant to activate quotation support.

## WIP: New Fable documentation

One of the common complaints about Fable is that the documentation is not up to the quality of the compiler and the tools. I know and acknowledge this, with so many and fast changes, documentation always seems like the last thing in the priority list. Luckily, [François Nicaise](https://twitter.com/thewhitetigle) and [Maxime Mangel](https://twitter.com/MangelMaxime) have been making a great job to improve things. This is still a work in progress and we hope to update the website with the new material soon, but you can already have a [first glimpse of the new docs](https://fable.io/fable-doc/).

## Tickets for FableConf are already available!

As you can see, there're many things happening in Fable World. The next FableConf in Antwerp, Belgium, will be an unmissable opportunity to learn about all the new cool stuff and, as always, share some precious time with the community. [Get your ticket now before they fly!](https://fable.io/fableconf) We're looking forward to seeing you there!