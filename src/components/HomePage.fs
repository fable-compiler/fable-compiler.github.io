module Components.HomePage

open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma
open Fulma.FontAwesome
open Util.Helpers
open Util.Literals
open Util.Types
open StaticWebGenerator

let introText =
  "Fable is an F# to JavaScript compiler powered by [Babel](https://babeljs.io/), designed to produce readable and standard code. [Try it right now in your browser!](repl)"

let cardTexts =
  ["Functional-first programming", None, "Fable brings [all the power of F#](http://fsharp.org/) to the JavaScript ecosystem. Enjoy advanced language features like [static typing with type inference](https://twitter.com/mjgpy3/status/903835141818208260), [exhaustive pattern matching](https://fsharpforfunandprofit.com/posts/correctness-exhaustive-pattern-matching/), immutability by default, structural equality or [units of measure](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/units-of-measure), and let the compiler catch the bugs for you before they ever get into runtime."
   "Batteries charged", None, "Fable supports most of the F# core library and some of most commonly used .NET APIs: collections, dates, regular expressions, string formatting, observables, async and even reflection! All of this without adding extra runtime overhead and with [tree shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80) compatibility so you only pay for what you get."
   "Cutting-edge tools", None, "F# has first-class support across a wide range of editors for all tastes: including [Visual Studio](https://www.visualstudio.com/) (for macOS and Windows), VS Code with [Ionide](http://ionide.io/), [Emacs](https://github.com/fsharp/emacs-fsharp-mode) or [Rider by JetBrains](https://www.jetbrains.com/rider/). All of them providing autocompletion, documentation tooltips, error checking on-the-fly, navigation and refactoring tools as well as interactive scripting."
   "Easy integration", None, "Fable produces readable JavaScript code compatible with ES2015 standards, like modules, classes or iterables, so it plays very well with either native libraries like [React](https://facebook.github.io/react/) or development tools like [Webpack](https://webpack.js.org/). Don't give up the benefits of the ecosystem just because of your language choice."]

let whereToText: string =
  sprintf "[Try Fable online](%s), [check the docs](%s) or visit [fable-awesome](https://github.com/kunjee17/awesome-fable) for a curated list of Fable resources, join the community at [FableConf](%s) or watch the [Channel9 interview with Seth Juarez](https://channel9.msdn.com/events/NDC/NDC-Oslo-2017/C9L13?term=fable)."
    Navbar.Repl Navbar.Docs Navbar.FableConf

let linkImage src href =
  a [Href href] [img [Src ("img/" + src)]]

let paragraph text =
  parseMarkdownAsReactEl "fable-introduction" text

let renderBody (info: PageInfo) =
  // This fixes the problem with the double scrollbar on Windows
  div [Style [Overflow "hidden"]] [
    Header.render "F# |> BABEL" "The compiler that emits JavaScript you can be proud of!"
    renderIntro [introText]
    Container.container [] [
      Columns.columns []
        [ Column.column [] [cardTexts.[0] |||> renderCard (Img "./img/fsharp.png")]
          Column.column [] [cardTexts.[1] |||> renderCard (FaIcon Fa.I.BatteryFull)]
      ]
      Columns.columns []
        [ Column.column [] [cardTexts.[2] |||> renderCard (FaIcon Fa.I.Wrench)]
          Column.column []  [cardTexts.[3] |||> renderCard (FaIcon Fa.I.PuzzlePiece)]
      ]
      br []
      h1 [Class "title is-2 has-text-centered"] [str "Where to go from here"]
      paragraph whereToText
      Columns.columns [ ]
        [ Column.column [ Column.Width (Screen.All, Column.Is8)
                          Column.Offset (Screen.All, Column.Is2) ]
                        [ a [ Href "https://channel9.msdn.com/events/NDC/NDC-Oslo-2017/C9L13?term=fable"]
                            [ img [ Src "img/channel9.png"
                                    Style [Margin "20px auto"; MaxHeight "600px"] ] ] ]
      ]
      h1 [Class "title is-2 has-text-centered"] [str "You are in good company"]
      paragraph "These are some of the projects and companies using Fable. Send us a message to include yours!"
      br []
      div [Class "flex-wrap fable-friends"] [
        linkImage "nsynk.png" "http://nsynk.de/"
        linkImage "thegamma.png" "https://thegamma.net/"
        linkImage "msu.jpg" "https://www.msu-solutions.de/"
        linkImage "ionide.png" "http://ionide.io/"
        linkImage "prolucid.jpg" "http://prolucid.ca/"
        linkImage "casquenoir.jpg" "http://casquenoir.com/"
        linkImage "danpower.png" "https://www.danpower-gruppe.de/"
        linkImage "tachyus.png" "http://www.tachyus.com/"
        linkImage "axxes.png" "https://axxes.com/en"
        linkImage "visualmips.png" "https://visualmips.github.io/"
        linkImage "lambdafactory.png" "http://lambdafactory.io/"
        linkImage "BTS.svg" "https://www.bluetradingsystems.com/"
      ]
    ]
  ]