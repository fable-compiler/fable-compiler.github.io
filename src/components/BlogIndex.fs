module Components.BlogIndex

open Fable.React
open Fable.React.Props
open Fulma
open Fable.FontAwesome.Free
open Util.Helpers
open Util.Literals
open Util.Types
open GlobalHelpers
open Fable.Core
open Fable.Core.JsInterop
open System

module Authors =
    type Author =
        { Name : string
          AvatarSrc : string
          Link : string }

    let alfonso =
        { Name = "Alfonso García-Caro"
          AvatarSrc = "https://github.com/alfonsogarciacaro.png"
          Link = "https://twitter.com/alfonsogcnunez" }

    let maxime =
        { Name = "Maxime Mangel"
          AvatarSrc = "https://github.com/mangelMaxime.png"
          Link = "https://twitter.com/MangelMaxime" }

    let zaid =
        { Name = "Zaid-Ajaj"
          AvatarSrc = "https://github.com/Zaid-Ajaj.png"
          Link = "https://twitter.com/zaid_ajaj" }

    let françois =
        { Name = "François Nicaise"
          AvatarSrc = "https://github.com/whitetigle.png"
          Link = "https://twitter.com/thewhitetigle" }

    let marcel =
        { Name = "Marcel Schwark"
          AvatarSrc = "https://github.com/oopbase.png"
          Link = "https://twitter.com/oopbase" }

type Post =
    { Title: string
      Abstract: string
      Author: Authors.Author
      Date: DateTime
      Link: string }

let posts = [
    { Title = "Announcing Nagareyama (Fable 3) (III)"
      Abstract = "This is the third post in the \"Announcing Nagareyama (Fable 3)\" series. This time we will be focusing on the actual new features of Nagareyama."
      Author = Authors.alfonso
      Date = DateTime(2020, 11, 20)
      Link = "Announcing-Nagareyama-3.html"
    }
    { Title = "Announcing Nagareyama (Fable 3) (II)"
      Abstract = "I hope you already tried out the new Fable and are enjoying it! The release candidate has just been published and in this post we will also dive into the differences when generating JS code compared to Fable 2."
      Author = Authors.alfonso
      Date = DateTime(2020, 11, 7)
      Link = "Announcing-Nagareyama-2.html"
    }
    { Title = "Announcing Nagareyama (Fable 3) (I)"
      Abstract = "Next-gen Fable is here! This is the first of a series of posts to introduce the improvements this new major release brings."
      Author = Authors.alfonso
      Date = DateTime(2020, 10, 23)
      Link = "Announcing-Nagareyama-1.html"
    }
    { Title = "Introducing Snowflaqe"
      Abstract = "In this blog post, we will introduce a new tool for Fable called Snowflaqe which will allow generating type-safe GraphQL clients for Fable applications."
      Author = Authors.zaid
      Date = DateTime(2020, 6, 2)
      Link = "Introducing-Snowflaqe.html"
    }
    { Title = "Introducing Feliz v1.0"
      Abstract = "Announcing the official release of Feliz and what it means for the Fable community."
      Author = Authors.zaid
      Date = DateTime(2020, 5, 18)
      Link = "Introducing-Feliz-v1.0.html"
    }
    { Title = "Introducing Femto"
      Abstract = "In this blog post, we will introduce a new tool called Femto that will hopefully make the lives of Fable users a lot easier when it comes to the npm packages they depend upon."
      Author = Authors.zaid
      Date = DateTime(2019, 6, 29)
      Link = "Introducing-Femto.html"
    }
    { Title = "May Announcements"
      Abstract = "Just a very quick post to share with you some of the things that have been happening for the last few weeks in Fable World."
      Author = Authors.alfonso
      Date = DateTime(2019, 5, 20)
      Link = "2019-May-Announcements.html"
    }
    { Title = "Announcing Fable.React 5"
      Abstract = "Fable.React 5 has just been released with new additions to help write your Fable/Elmish apps with React. Thanks to Julien Roncaglia who has contributed most of the ideas for this release since his talk at latest FableConf, and a big thank you as well to the React team for their great work in the latest releases."
      Author = Authors.alfonso
      Date = DateTime(2019, 4, 16)
      Link = "Announcing-Fable-React-5.html"
    }
    { Title = "Announcing fable-compiler 2.2, Fable.Core 3 and more"
      Abstract = "Together with a minor (but big) release of fable-compiler, we're launching new beta versions of the packages most used by the community, like Fable.Core, Elmish, Fulma or Fable.SimpleHttp. The main goal of these releases is to restructure the packages to make maintenance easier and lower the bar for contributions."
      Author = Authors.alfonso
      Date = DateTime(2019, 4, 2)
      Link = "Announcing-2-2.html"
    }
    { Title = "Migration to Fable 2"
      Abstract = "With this document we are going to convert a Fable 1 project into a Fable 2 project. This guide has been writed by converting Fulma.Minimal template from Fable 1 to Fable 2."
      Author = Authors.maxime
      Date = DateTime(2018, 10, 1)
      Link = "Migration-to-Fable2.html"
    }
    { Title = "Introducing Fable 2.0 beta"
      Abstract = "Fable 2? Really? I want to try it out! NOW!"
      Author = Authors.alfonso
      Date = DateTime(2018, 8, 3)
      Link = "Introducing-2-0-beta.html"
    }
    { Title = "FableConf or where the magic happened"
      Abstract = "Hi everybody! This is going to be my small and not too stunning contribution to the [F# Advent Calendar in English 2017](https://sergeytihon.com/2017/10/22/f-advent-calendar-in-english-2017/) (remember the original and still running version is [in Japanese](https://qiita.com/advent-calendar/2017/fsharp)) and I'm planning to talk about [FableConf](http://fable.io/fableconf)."
      Author = Authors.alfonso
      Date = DateTime(2017, 12, 6)
      Link = "FableConf.html"
    }
    { Title = "Casque Noir: Raising awareness on Haïti social and environmental issues"
      Abstract = "For several years, Casque Noir, a Canadian non-profit organization, has been researching about urban mutations of Haïti Island's capital, Port-au-Prince's most famous deprived urban neighbourhood: Jalousie"
      Author = Authors.françois
      Date = DateTime(2017, 6, 20)
      Link = "Development-For-Haiti.html"
    }
    { Title = "How Fable helped kids win a contest"
      Abstract = "Yesterday, when I fell asleep, it was with the clear memory of smiles shining on the faces of our kids. After several months of hard work, they did it. They **won the Junior Achievement Young Entreprise** regional contest organized in Bordeaux and were qualified for the National contest!"
      Author = Authors.françois
      Date = DateTime(2017, 5, 19)
      Link = "How-Fable-Helped-Kids.html"
    }
    { Title = "Paket Integration"
      Abstract = "Fable 1.0 beta has been out in the wild for several weeks now and the community has already provided very valuable feedback. Some people are concerned about the mix of .NET and JS tools and it's true there were some friction points we had to fix. The main one concerned Fable libraries: by nature they belong to the .NET ecosystem, but their destiny is to be converted to JS."
      Author = Authors.alfonso
      Date = DateTime(2017, 5, 18)
      Link = "Paket-integration.html"
    }
    { Title = "Introducing Fable 1.0 beta (codename narumi)"
      Abstract = "Fable has recently added support for a subset of the FSharp.Reflection namespace. Which is really great, allowing us to inspect type information at run-time in the browser. Today, we will be exploring an application of meta-programming using FSharp.Reflection to abstract a very common task in web development: client-server communication."
      Author = Authors.alfonso
      Date = DateTime(2017, 3, 20)
      Link = "Introducing-1-0-beta.html"
    }
    { Title = "Statically Typed Client-Server Communication with F#: Proof of Concept"
      Abstract = "Fable has recently added support for a subset of the FSharp.Reflection namespace. Which is really great, allowing us to inspect type information at run-time in the browser. Today, we will be exploring an application of meta-programming using FSharp.Reflection to abstract a very common task in web development: client-server communication."
      Author = Authors.zaid
      Date = DateTime(2017, 3, 19)
      Link = "https://medium.com/@zaid.naom/statically-typed-client-server-communication-with-f-proof-of-concept-7e52cff4a625#.upg5r1mah"
    }
    { Title = "Implementing Pong in a functional manner with Fable"
      Abstract = "For the last few weeks I’ve been playing around with Fable. As a F# enthusiast who had to deal with a lot of JavaScript code during his studies, I was quite curious what Fable was all about. [...]
Being motivated by Super Fable Mario, I thought creating a simple game myself might be a good way to start with Fable. As you can read by the title, I chose Pong as my starting project. So without further ado, let’s start with the actual game."
      Author = Authors.marcel
      Date = DateTime(2016, 12, 26)
      Link = "http://oopbase.de/posts/implementing-pong-in-a-functional-manner-with-fable/"
    }
    { Title = "Fable(F#からJSへコンパイラー)の紹介"
      Abstract = "皆さま、スペインからこんにちは！これは日本語の「[F# Advent Calendar 2016](http://qiita.com/advent-calendar/2016/fsharp)」
の2５日目の記事です、一日遅れましたがご了承ください(;^_^A ｱｾｱｾ･･･"
      Author = Authors.alfonso
      Date = DateTime(2016, 12, 25)
      Link = "Fable-shoukai.html"
    }
    { Title = "Tree Shaking with Fable"
      Abstract = "Hi everybody! This is my first contribution to the [F# advent calendar](https://sergeytihon.wordpress.com/2016/10/23/f-advent-calendar-in-english-2016/) and you'll probably be very surprised to know it will be about... Fable! Yes, the lightweight F# compiler that emits JavaScript you can be proud of (or at least I'll be). This time I want to talk you about one of the exciting new features introduced in [Fable 0.7](Introducing-0-7.html): tree shaking."
      Author = Authors.alfonso
      Date = DateTime(2016, 11, 30)
      Link = "Tree-shaking.html"
    }
    { Title = "Introducing 0.7"
      Abstract = "So finally here it is! It took a bit longer than expected but I'm very happy to announce Fable 0.7 has been released to npm. This version includes lots of improvements thanks to feedback from the community, it's almost a full rewrite and could be considered 1.0 (in fact, 1.0 will probably be this with minor upgrades)."
      Author = Authors.alfonso
      Date = DateTime(2016, 11, 22)
      Link = "Introducing-0-7.html"
    }
]

let introText = "Check our blog to be up-to-date with recent developments in Fable community and if you have cool stuff to share (and we're sure you do) [send us a PR](https://github.com/fable-compiler/fable-compiler.github.io/tree/dev/blog) with your post or a link to your personal web."

let renderPost (post: Post) =
    div [ Class "card article" ]
        [ div [ Class "card-content" ]
            [ div [ Class "media" ]
                [ div [ Class "media-center" ]
                    [ img [ Src post.Author.AvatarSrc
                            Class "author-image"
                            Alt "Author avatar" ] ]
                  div [ Class "media-content has-text-centered" ]
                    [ p [ Class "title article-title" ]
                        [ a [ Href (Text.RegularExpressions.Regex.Replace(post.Link, @"\.md$", ".html")) ]
                            [ str post.Title ] ]
                      p [ Class "subtitle is-6 article-subtitle" ]
                        [ a [ Href post.Author.Link ]
                            [ str post.Author.Name ]
                          str (String.Format(" on {0:dd/MM, yyyy}", post.Date)) ] ] ]
              parseMarkdownAsReactEl "content article-body" post.Abstract
            ]
        ]

// Using template from https://bulmatemplates.github.io/bulma-templates/templates/blog.html
let renderBody (info: PageInfo) =
  // This fixes the problem with the double scrollbar on Windows
  div [ Style [ CSSProp.Overflow OverflowOptions.Hidden ] ]
    [ Header.renderMinimal()
      div [ Class "container blog-index" ]
        [ section [ Class "articles" ]
            [ div [ Class "column is-8 is-offset-2" ]
                  [ yield parseMarkdownAsReactEl "" introText
                    yield! List.map renderPost posts ]
            ]
        ]
    ]
