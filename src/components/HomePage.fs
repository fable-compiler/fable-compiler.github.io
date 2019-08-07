module Components.HomePage

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

let introText =
  "Fable is an [F#](http://fsharp.org/) to JavaScript compiler powered by [Babel](https://babeljs.io/), designed to produce readable and standard code."

let cardTexts =
  [
    "Clean functional programming", None, "Immutable by default. Powerful pattern matching. Rich types. Units of Measure. No semicolons. No brackets. Lightweight syntax. Enjoy!"
    "Types safety: if it compiles it works", None, "Your code is compiled to Javascript: let the compiler catch the bugs for you before they ever get into runtime!"
    "Modern Javascript output", None, "Fable produces readable JavaScript code compatible with ES2015 standards!"
    "Great JavaScript interop", None, "Call [JavaScript from Fable](https://fable.io/fable-doc/communicate/js-from-fable.html) or [Fable from JS](https://fable.io/fable-doc/communicate/fable-from-js.html)! Use NPM packages! Bundle your app with Webpack! Everything's ready for you!"
    "Editors: first class support", None, "Choose your weapon: from [Visual Studio Code](http://ionide.io/) to [Jetbrains Rider](https://www.jetbrains.com/rider/). Check [the whole list here](https://fable.io/fable-doc/3-steps/setup.html#development-tools)."
    ".NET friendly", None, ".NET user? Fable supports [most of the F# core library and some of most commonly used .NET APIs.](https://fable.io/fable-doc/dotnet/compatibility.html)"
  ]

let whereToText: string =
  sprintf "[Try Fable online](%s), [check the docs](%s) or visit [fable-awesome](https://github.com/kunjee17/awesome-fable) for a curated list of Fable resources, join the community at [FableConf](%s) or watch the [Channel9 interview with Seth Juarez](https://channel9.msdn.com/events/NDC/NDC-Oslo-2017/C9L13?term=fable)."
    Navbar.Repl Navbar.Docs Navbar.FableConf

let linkImage src href =
  div [
    Style [
      MarginRight "1rem"
      MarginBottom "1rem"
      BackgroundColor "white"
      Padding "0.5rem"
      Display DisplayOptions.Flex
      FlexDirection "column"
      JustifyContent "center"
      AlignItems AlignItemsOptions.Center
    ]
  ] [
    a [
        Href href
      ] [
      img [Src ("img/" + src)]
    ]
  ]

let paragraph text =
  parseMarkdownAsReactEl "fable-introduction" text

let prepareCode snippet = 
  pre  
    [ Style [ BackgroundColor "whitesmoke" ] ] 
    [ code 
        [
          Class "lang-fsharp"
          Style [
            BackgroundColor "whitesmoke"
            FontFamily "Fira Code"
            FontSize "1rem"
          ] ] 
        [ str snippet ] ]

let actionButtons = 
  Columns.columns 
    []
    [ Column.column [] [] 
      Column.column [] 
        [ Level.level 
            [ Level.Level.IsMobile ] 
            [ Level.item 
                [ Level.Item.Props [ Style [ Padding "0.5rem "]]] 
                [ a 
                    [ Href "https://fable.io/repl/";Target "_black"] 
                    [ Button.button 
                        [
                        Button.Color IsSuccess
                        Button.Size IsMedium 
                        Button.IsOutlined
                        ]
                        [ str "TRY ONLINE" ] ] ]
              Level.item 
                [] 
                [ a 
                    [ Href "https://fable.io/fable-doc/3-steps/setup.html";Target "_black"] 
                    [ Button.button 
                        [
                        Button.Color IsInfo
                        Button.Size IsMedium 
                        Button.IsOutlined
                        ]
                        [ str "GET STARTED" ] ] ]
          ] ] 
      Column.column [] [] 
    ]

let renderSample () =
    Section.section [] [
      actionButtons 
      Columns.columns [ Columns.IsVCentered ] [
        Column.column [Column.Modifiers [ Modifier.IsHidden (Screen.Tablet, true)]] []
        Column.column [] [
          Container.container [
          ] [
            (prepareCode """
type AppKind = Browser | React | Node | App of string

let myApp = 
  function 
  | Browser -> "DOM idea of fun!"
  | React -> "React frontend"
  | Node -> "Node.js project"
  | App "Three.js" -> "3D!"
  | App x -> "My super Fable app: " + x

              """)
          ]
        ]
        Column.column [] 
          [ Container.container [] 
              [ Content.content 
                  [ Content.Modifiers 
                      [ Modifier.TextSize (Screen.All, TextSize.Is5) 
                        Modifier.TextAlignment (Screen.All, TextAlignment.Centered)
                      ]] 
                  [ p [] 
                      [ str "Fable lets you write JS apps using F# easy yet powerful syntax."] ] ] ]
        Column.column [Column.Modifiers [ Modifier.IsHidden (Screen.Tablet, true)]] []
      ]
    ]

let renderBody (info: PageInfo) =

  // This fixes the problem with the double scrollbar on Windows
  div [Style [Overflow "hidden"]] [
    
    // Title
    Header.render "F# |> BABEL" "The compiler that emits JavaScript you can be proud of!"

    renderIntro [introText]

    // renderSample ()

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
      Columns.columns []
        [ //Column.column [] [cardTexts.[6] |||> renderCard (FaIcon Fa.Solid.Language)]
          //Column.column []  [cardTexts.[5] |||> renderCard (FaIcon Fa.Solid.BoxOpen)]
      ]

      Section.section
        []
        [  
          Heading.h4 [] [ str "Quick start"]
          Content.content 
            [] 
            [ p [] [ str "Get started with our set of samples!"]
              ol 
                []
                [ li [] [ a [ Href "https://dotnet.microsoft.com/download"; Target "_blank"] [ str "Download and install .NET Core SDK"] ] 
                  li [] [ a [ Href "https://nodejs.org/en/"; Target "_blank"] [ str "Download and install Node.js"] ] 
                  li [] [ str "Then type in a terminal:"]
                ]

            ]

          pre []
            [ str """git clone https://github.com/fable-compiler/fable2-samples.git
cd browser  
npm install
npm start"""
            ] ]

      Section.section 
          [] 
          [ Heading.h4 
              [ Heading.Props [ Style [ TextAlign TextAlignOptions.Center ] ] ] 
              [ str "Users of Fable"]

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
    ]