module WebGenerator.Components.DocsPage

open Fable.Import
open Fable.Import.Node.Exports
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma.Common
open Fulma.Elements
open Fulma.Components
open Fulma.Extra.FontAwesome
open WebGenerator.Helpers
open WebGenerator.Literals
open WebGenerator.Types

let introText =
  "Here you will learn how to quickly get started with Fable, what is supported from FSharp.Core and .NET, as well as how to seamlessly interact with native JavaScript APIs or libraries. If you want to learn about the F# language, check the [fsharp.org](http://fsharp.org/) site for more resources."

let cardTexts =
  ["Getting started", Some "getting-started.html", "Come here to start developing a web app with F# in a few minutes. You will learn to setup your environment, to download Fable templates using the dotnet SDK and to bootstrap a simple web app. After that, we will see a quick overview of how Fable works underneath."

   "F# language and library compatibility", Some "compatibility.html", "This page lists the F# and .NET classes available in Fable and how they are translated into JS, highlighting the small semantic differences you need to be aware of. You may be surprised to know how many F# features are supported in Fable (even reflection!) with almost no overhead."

   "Interacting with JavaScript", Some "interacting.html", "How to call JavaScript libraries? With Fable, you can use either foreign interfaces or dynamic typing when invoking external code. Fable also complies with ES2015 module semantics when importing JS code, playing really well with development tools like Webpack. There are a couple of special attributes too, like `Emit` to embed JS directly in your F# code. Learn more here!"

   "Community", Some "https://github.com/kunjee17/awesome-fable#learn", "Learning about Fable doesn't end here, there are many great tutorials and videos created by Fable community members. The list grows every day so make sure to check [fable-awesome](https://github.com/kunjee17/awesome-fable) regularly and follow [our Twitter account](https://twitter.com/FableCompiler) for the latest news."]

let renderBody title subtitle (info: PageInfo) =
  div [Style [Overflow "hidden"]] [
    Header.render title subtitle
    renderIntro [introText]
    div [Style [Margin "20px 10px 0 10px"]] [
      div [Class "columns"] [
        div [Class "column"] [cardTexts.[0] |||> renderCard (FaIcon Fa.Rocket)]
        div [Class "column"] [cardTexts.[1] |||> renderCard (FaIcon Fa.Refresh)]
      ]
      div [Class "columns"] [
        div [Class "column"] [cardTexts.[2] |||> renderCard (FaIcon Fa.Globe)]
        div [Class "column"] [cardTexts.[3] |||> renderCard (FaIcon Fa.Group)]
      ]
    ]
  ]