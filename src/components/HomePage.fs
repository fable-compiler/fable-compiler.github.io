module WebGenerator.Components.HomePage

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

type ImgOrFa = Img of string | FaIcon of Fa.FontAwesomeIcons

let introText =
  "Fable is an F# to JavaScript compiler powered by [Babel](https://babeljs.io/), designed to produce readable and standard code. [Try it right now in your browser!](repl)"

let cardTexts =
  ["Functional-first programming", "Fable brings [all the power of F#](http://fsharp.org/) to the JavaScript ecosystem. Enjoy advanced language features like [static typing with type inference](https://twitter.com/mjgpy3/status/903835141818208260), [exhaustive pattern matching](https://fsharpforfunandprofit.com/posts/correctness-exhaustive-pattern-matching/), immutability by default, structural equality or [units of measure](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/units-of-measure), and let the compiler catch the bugs for you before they ever get into runtime."
   "Batteries charged", "Fable supports most of the F# core library and some of most commonly used .NET APIs: collections, dates, regular expressions, string formatting, observables, async and even reflection! All of this without adding extra runtime overhead and with [tree shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80) compatibility so you only pay for what you get."
   "Cutting-edge tools", "F# has first-class support across a wide range of editors for all tastes: including [Visual Studio](https://www.visualstudio.com/) (for macOS and Windows), VS Code and Atom with [Ionide](http://ionide.io/), [Emacs](https://github.com/fsharp/emacs-fsharp-mode) or [Rider by JetBrains](https://www.jetbrains.com/rider/). All of them providing autocompletion, documentation tooltips, error checking on-the-fly, navigation and refactoring tools as well as interactive scripting."
   "Easy integration", "Fable produces standard JavaScript code that plays very well with native libraries like [React](https://facebook.github.io/react/) or tools like [Webpack](https://webpack.js.org/), so you don't need to give up the benefits of the ecosystem because of your language choice."]

let renderCard icon title text =
  let icon =
    match icon with
    | Img src -> Image.image [Image.is64x64] [img [Src src]]
    | FaIcon fa -> Icon.faIcon [ Icon.isLarge ] fa
  Card.card [CustomClass "fable-home-card"] [
    Card.header [] [Card.Header.title [CustomClass "title is-4"] [str title]]
    Card.content [] [
      Media.media [] [
        Media.left [] [icon]
        Media.content [] [p [setMarkdown text] []]
      ]
    ]
  ]

let renderBody (info: PageInfo) =
  div [] [
    Header.render "F# |> BABEL" "Emit JavaScript you can be proud of!"
    renderIntro [introText]
    div [Style [Margin "20px 10px 0 10px"]] [
      div [Class "columns"] [
        div [Class "column"] [
          cardTexts.[0] ||> renderCard (Img "./img/fsharp.png")
        ]
        div [Class "column"] [
          cardTexts.[1] ||> renderCard (FaIcon Fa.BatteryFull)
        ]
      ]
      div [Class "columns"] [
        div [Class "column"] [
          cardTexts.[2] ||> renderCard (FaIcon Fa.Wrench)
        ]
        div [Class "column"] [
          cardTexts.[3] ||> renderCard (FaIcon Fa.PuzzlePiece)
        ]
      ]
    ]
  ]
