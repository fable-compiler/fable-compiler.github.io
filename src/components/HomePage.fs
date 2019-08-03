module Components.HomePage

open Fable.React
open Fable.React.Props
open Fulma
open Fable.FontAwesome.Free
open Util.Helpers
open Util.Literals
open Util.Types
open GlobalHelpers
open Fable.Core.JsInterop

//let prism: obj = importAll "prismjs"
//prism?highlightAll();

let introText =
  "Fable is an F# to JavaScript compiler powered by [Babel](https://babeljs.io/), designed to produce readable and standard code."

let cardTexts =
  [
    "Functional programming", None, "Fable brings [all the power of F#](http://fsharp.org/), an easy yet [powerful](https://fable.io/fable-doc/3-steps/discover.html#what-is-fsharp) functional language, to the JavaScript ecosystem!"
    "If it compiles it works", None, "Your code is compiled to Javascript: let the compiler catch the bugs for you before they ever get into runtime!"
    ".NET friendly", None, "You're a .NET user? Fable supports [most of the F# core library and some of most commonly used .NET APIs.](https://fable.io/fable-doc/dotnet/compatibility.html)"
    "Editors: first class support", None, "F# has first-class support across a wide range of modern editors: check [the list here](https://fable.io/fable-doc/3-steps/setup.html#development-tools)."
    "ES2015 Ready", None, "Fable produces readable JavaScript code compatible with ES2015 standards. Don't give up the benefits of the ecosystem just because of your language choice."
    "Easy JavaScript interop", None, "Call [JS from Fable](https://fable.io/fable-doc/communicate/js-from-fable.html) or [Fable from JS](https://fable.io/fable-doc/communicate/fable-from-js.html)! Use NPM packages! Bundle your app with Webpack! Everything's ready for you!"
  ]

let whereToText: string =
  sprintf "[Try Fable online](%s), [check the docs](%s) or visit [fable-awesome](https://github.com/kunjee17/awesome-fable) for a curated list of Fable resources, join the community at [FableConf](%s) or watch the [Channel9 interview with Seth Juarez](https://channel9.msdn.com/events/NDC/NDC-Oslo-2017/C9L13?term=fable)."
    Navbar.Repl Navbar.Docs Navbar.FableConf

let linkImage src href =
  a [Href href] [img [Src ("img/" + src)]]

let paragraph text =
  parseMarkdownAsReactEl "fable-introduction" text

let prepareCode snippet = 
  pre [
      Style [
        BackgroundColor "whitesmoke"
      ]
    ] [
      code [
        Class "lang-fsharp"
        Style [
          BackgroundColor "whitesmoke"
          FontFamily "Fira Code"
          FontSize "1rem"
        ]
      ] [
        str snippet
      ]
    ]

let actionButtons = 
  Columns.columns [ ]
    [
      Column.column [] [] 
      Column.column [
      ] [
        Level.level [] [
          Level.left [] [
            Button.button [
              Button.Color IsSuccess
              Button.Size IsMedium 
            ] [ str "TRY ONLINE" ]
          ]
          Level.right [] [
            Button.button [
              Button.Color IsSuccess
              Button.Size IsMedium
              Button.IsOutlined 
            ] [ str  "QUICK START" ]
          ]
        ]
      ] 
      Column.column [] [] 
    ]

let renderBody (info: PageInfo) =

  // This fixes the problem with the double scrollbar on Windows
  div [Style [Overflow "hidden"]] [
    
    // Title
    Header.render "F#|>BABEL" "The compiler that emits JavaScript you can be proud of!"

    // FABLECONF
    (*
    Container.container[
      Container.Props [
        Style [
        ]
      ]
    ] [
      Heading.h4 [
        Heading.Props [
          Style [
            TextAlign TextAlignOptions.Center
          ]
        ]
      ] [
        span [
          Style [
            Padding "1rem"
          ]
        ] [ str "Hey! FableConf 2019 is happening in Antwerp on September 6th."]      
      ]
      Heading.h5 [
        Heading.Props [
          Style [
            TextAlign TextAlignOptions.Center
          ]
        ]
      ] [
        a [ 
          Href "https://fable.io/fableconf"
          Target "_blank"
          Style [
            Color "dodgerblue"
            TextDecoration "underline"
            FontWeight "400"
          ]
        ] [
          str "Grab your tickets soon!"
        ]
      ]
    ]

*)
    renderIntro [introText]

    // First sammple
    Section.section [] [
      Columns.columns [] [
        Column.column [] []
        Column.column [] [
          Container.container [
          ] [
            (prepareCode """
type AppKind = React | Elm | Node 

let write = 
  function 
  | Elm -> "Elm architecture"
  | React -> "Ready for React"
  | Node -> "Ready for Node.js"

React 
  |> write 
  |> JS.console.log 
              """)
          ]
        ]
        Column.column [] [
          Container.container [
            Container.Modifiers [
            ]
          ] [
            prepareCode """
//  Fable lets you write functional code 
//  to create any JavaScript app
            """
          ]
        ]
        Column.column [] []
      ]
    ]

    actionButtons 

    Container.container [] [
      Columns.columns []
        [ Column.column [] [cardTexts.[0] |||> renderCard (Img "./img/fsharp.png")]
          Column.column [] [cardTexts.[1] |||> renderCard (FaIcon Fa.Solid.BatteryFull)]
      ]
      Columns.columns []
        [ Column.column [] [cardTexts.[2] |||> renderCard (FaIcon Fa.Solid.Wrench)]
          Column.column []  [cardTexts.[3] |||> renderCard (FaIcon Fa.Solid.PuzzlePiece)]
      ]
      Columns.columns []
        [ Column.column [] [cardTexts.[4] |||> renderCard (FaIcon Fa.Solid.KiwiBird)]
          Column.column []  [cardTexts.[5] |||> renderCard (FaIcon Fa.Solid.BoxOpen)]
      ]
      br []

      actionButtons

      Heading.h4 [
        Heading.Props [
          Style [
            TextAlign TextAlignOptions.Center
          ]
        ]        
      ] [str "You are in good company"]

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
        linkImage "umc.png" "https://www.who-umc.org/"
      ]
    ]
  ]