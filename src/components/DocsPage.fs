module Components.DocsPage

open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma
open Fulma.FontAwesome
open Util.Helpers
open Util.Types

let introText =
  "Here you will learn how to quickly get started with Fable, what is supported from FSharp.Core and .NET, as well as how to seamlessly interact with native JavaScript APIs or libraries. If you want to learn about the F# language, check the [fsharp.org](http://fsharp.org/) site for more resources."

let cardTexts =
  ["Getting started", None, "To get started with Fable 1, check the [simple app template](https://github.com/fable-compiler/fable-templates/blob/d1759f7058fc519485ce8bcd62521890573539c6/simple/Content/README.md). For the new version of the, try the [Fable 2 minimal sample](https://github.com/fable-compiler/fable2-samples/tree/0b4c6c011c1d8836cd3a650c08ab5a6ccc473ba7/minimal) and the [blog post announcing Fable 2](http://fable.io/blog/Introducing-2-0-beta.html)."

   "F# language and library compatibility", Some "compatibility.html", "This page lists the F# and .NET classes available in Fable and how they are translated into JS, highlighting the small semantic differences you need to be aware of. You may be surprised to know how many F# features are supported in Fable (even reflection!) with almost no overhead."

   "Interacting with JavaScript", Some "interacting.html", "How to call JavaScript libraries? With Fable, you can use either foreign interfaces or dynamic typing when invoking external code. Fable also complies with ES2015 module semantics when importing JS code, playing really well with development tools like Webpack. There are a couple of special attributes too, like `Emit` to embed JS directly in your F# code. Learn more here!"

   "Community", Some "https://github.com/kunjee17/awesome-fable#learn", "Learning about Fable doesn't end here, there are many great tutorials and videos created by Fable community members. The list grows every day so make sure to check [fable-awesome](https://github.com/kunjee17/awesome-fable) regularly and follow [our Twitter account](https://twitter.com/FableCompiler) for the latest news."]

let renderBody title subtitle (info: PageInfo) =
  div [Style [Overflow "hidden"]] [
    Header.render title subtitle
    renderIntro [introText]
    Container.container [] [
      div [Class "columns"] [
        div [Class "column"] [cardTexts.[0] |||> renderCard (FaIcon Fa.I.Rocket)]
        div [Class "column"] [cardTexts.[1] |||> renderCard (FaIcon Fa.I.Refresh)]
      ]
      div [Class "columns"] [
        div [Class "column"] [cardTexts.[2] |||> renderCard (FaIcon Fa.I.Globe)]
        div [Class "column"] [cardTexts.[3] |||> renderCard (FaIcon Fa.I.Group)]
      ]
    ]
  ]
