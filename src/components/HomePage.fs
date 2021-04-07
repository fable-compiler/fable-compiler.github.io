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
  "Fable is a compiler that brings [F#](http://fsharp.org/) into the JavaScript ecosystem"

let fableConfPromo =
  "FableConf 2019 is happening in Antwerp on September 6/7th. **[Get your ticket soon!](/fableconf)**"

let cardTexts =
  [
    "Functional programming and more", None, "Immutable by default. Powerful pattern matching. Lightweight syntax. Units of measure. Type providers. Enjoy."
    "Type safety without the hassle", None, "Type inference provides robustness and correctness, but without the cost of additional code. Let the compiler catch bugs for you."
    "Modern Javascript output", None, "Fable produces readable JavaScript code compatible with ES2015 standards and popular tooling like [Webpack](https://webpack.js.org/)."
    "Easy JavaScript interop", None, "Call [JavaScript from Fable](/docs/communicate/js-from-fable.html) or [Fable from JS](/docs/communicate/fable-from-js.html). Use NPM packages. The entire JavaScript ecosystem is at your fingertips."
    "First-class editor tools", None, "Choose your favorite tool: from [Visual Studio Code](http://ionide.io/) to [JetBrains Rider](https://www.jetbrains.com/rider/). Check [the whole list here](/docs/2-steps/setup.html#development-tools)."
    "Batteries included", None, "Fable supports [the F# core library and some common .NET libraries](/docs/dotnet/compatibility.html) to supplement the JavaScript ecosystem."
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
      Padding "0.3rem"
      Display DisplayOptions.Flex
      FlexDirection "column"
      JustifyContent "center"
      AlignItems AlignItemsOptions.Center
    ]
  ] [
    a [Href href; Target "_blank"]
      [img [Src ("img/users/" + src)]]
  ]

let paragraph text =
  parseMarkdownAsReactEl "fable-introduction" text

let prepareCode snippet = 
  parseMarkdownAsReactEl "" ("```fsharp\n" + snippet + "\n```")
//   pre  
//     [ Style [ BackgroundColor "whitesmoke" ] ] 
//     [ code 
//         [
//           Class "lang-fsharp"
//           Style [
//             BackgroundColor "whitesmoke"
//             FontFamily "Fira Code"
//             FontSize "0.8rem"
//           ] ] 
//         [ str snippet ] ]

module Features = 

  let prepare title text snippet = 
        Columns.columns [ 
          Columns.IsVCentered
          Columns.Props [
            Style [
              MarginTop "1.5rem"
            ]
          ]
        ] [
          Column.column [ Column.Width (Screen.All, Column.Is1) ] []
          Column.column [ Column.Width (Screen.All, Column.Is3)] [
            Heading.h4 [ Heading.Props [Style [ Color "dodgerblue" ] ] ] [ str title]
            Content.content [] [
              p [] [
                parseMarkdownAsReactEl "" text
              ]
            ]
          ]
          Column.column [ Column.Width (Screen.All, Column.Is7)] [
            (prepareCode snippet)
          ]
          Column.column [] []
        ]

let renderBody (info: PageInfo) =
  // This fixes the problem with the double scrollbar on Windows
  div [Style [ CSSProp.Overflow OverflowOptions.Hidden ]] [

    Header.render()

    parseMarkdownAsReactEl "fable-catchphrase" introText
    // parseMarkdownAsReactEl "fableconf-promo" fableConfPromo

    Container.container [] [
      Columns.columns []
        [ Column.column [] [cardTexts.[0] |||> renderCard (Img "./img/fsharp.png")]
          Column.column [] [cardTexts.[1] |||> renderCard (FaIcon Fa.Solid.Lock)]
      ]
      Columns.columns []
        [ Column.column [] [cardTexts.[2] |||> renderCard (FaIcon Fa.Solid.Wrench)]
          Column.column []  [cardTexts.[3] |||> renderCard (FaIcon Fa.Solid.PuzzlePiece)]
      ]
      Columns.columns []
        [ Column.column [] [cardTexts.[4] |||> renderCard (FaIcon Fa.Solid.Edit)]
          Column.column []  [cardTexts.[5] |||> renderCard (FaIcon Fa.Solid.BatteryFull)]
      ]
      Columns.columns []
        [ //Column.column [] [cardTexts.[6] |||> renderCard (FaIcon Fa.Solid.Language)]
          //Column.column []  [cardTexts.[5] |||> renderCard (FaIcon Fa.Solid.BoxOpen)]
      ]

      Section.section [Section.CustomClass "quickstart"]
        [  
          Heading.h4 [] [ str "Quick start"]
          Content.content 
            [] 
            [ parseMarkdownAsReactEl "" "[Try Fable online](/repl) or get started in your local machine with our set of samples ([more info](/docs/2-steps/setup.html)):"
              ol 
                []
                [ li [] [ a [ Href "https://dotnet.microsoft.com"; Target "_blank"] [ str "Install .NET Core SDK"] ] 
                  li [] [ a [ Href "https://nodejs.org/en/"; Target "_blank"] [ str "Install Node.js"] ] 
                  li [] [ str "Then type the following in a terminal and open http://localhost:8080 in your browser after compilation finishes:"]
                ]

            ]

          pre []
            [ str """git clone https://github.com/fable-compiler/fable3-samples
cd fable3-samples/browser  
npm install
npm start"""
            ] ]

      Section.section [
        Section.CustomClass "features"
        Section.Modifiers [
          Modifier.BackgroundColor IsWhite
        ]
      ] [
        Heading.h2 [ 
          Heading.Props [Style [ Color "dodgerblue" ] ]
          Heading.Modifiers [Modifier.TextAlignment (Screen.All, TextAlignment.Centered)]
          ] 
          [ str "Features"]
        Content.content [
          Content.Modifiers [Modifier.TextAlignment (Screen.All, TextAlignment.Centered)]          
        ] [
          p [] [ str "These are some of the main F# features that you can use in your web apps with Fable."]
        ]
        hr []

        (Features.prepare 
          "Powerful pattern matching"
          "Model your domain with union types and match complex patterns with ease. The compiler will warn you if you're forgetting some cases!"
"""
type Face = Ace | King | Queen | Jack | Number of int
type Color = Spades | Hearts | Diamonds | Clubs 
type Card = Face * Color

let aceOfHearts = Ace,Hearts
let tenOfSpades = (Number 10), Spades

match card with 
| Ace, Hearts -> printfn "Ace Of Hearts!"
| _, Hearts -> printfn "A lovely heart"
| (Number 10), Spades -> printfn "10 of Spades"
| _, (Diamonds|Clubs) -> printfn "Diamonds or clubs"
// warning: Incomplete pattern matches on this expression.
// For example, the value '(_,Spades)' may indicate
// a case not covered by the pattern(s).
"""     )

        (Features.prepare 
          "Computation expressions"
          "There's a lot of code involving continuations out there, like asynchronous or undeterministic operations. Other languages bake specific solutions into the syntax, with F# you can use built-in computation expressions and also extend them yourself."
"""
// JS promises made easy
promise {
    let! res = Fetch.fetch url []
    let! txt = res.text()
    return txt.Length
}

// Declare your own computation expression
type OptionBuilder() =
  member __.Bind(opt, binder) =
    match opt with Some value -> binder value | None -> None
  member __.Return(value) = Some value
    
let option = OptionBuilder()

option {
  let! x = trySomething()
  let! y = trySomethingElse()
  let! z = andYetTrySomethingElse()
  // Code will only hit this point if the three
  // operations above return Some
  return x + y + z
}
"""     )

        (Features.prepare 
          "Units of measure"
          "Let the compiler verify arithmetic relationships for you to help prevent programming errors."
"""
[<Measure>] type m
[<Measure>] type s

let distance = 12.0<m>
let time = 6.0<s>

let thisWillFail = distance + time 
// ERROR: The unit of measure 'm' does 
// not match the unit of measure 's'

let thisWorks = distance / time
// 2.0<m/s>
"""     )

        (Features.prepare 
          "Type providers"
          "Build your types using real-world conditions and make the compiler warn you if those conditions change."
"""
let [<Literal>] JSON_URL = "https://jsonplaceholder.typicode.com/todos"

// Type is created automatically from the url
type Todos = Fable.JsonProvider.Generator<JSON_URL>

async {
    let! (_, res) = Fable.SimpleHttp.Http.get url
    let todos = Todos.ParseArray res
    for todo in todos do
        // If the JSON schema changes, this will fail compilation
        printfn "ID %i, USER: %i, TITLE %s, COMPLETED %b"
            todo.id
            todo.userId
            todo.title
            todo.completed
}
"""     )

//         (Features.prepare 
//           "Conditional compilation"
//           "Use compiler directives to change the behavior of your program."
// """
// #if VERSION1
// let addition x y = 
//   x + y + 100

// #else
// let addition x y = 
//   x + y

// #endif

// let result = addition 1 1
// """     )

      ]

      Section.section 
          [] 
          [ Heading.h4 
              [ Heading.Props [ Style [ TextAlign TextAlignOptions.Center ] ] ] 
              [ str "Users of Fable"]

            paragraph "These are some of the projects and companies using Fable. Send us [a message](https://twitter.com/FableCompiler) to include yours!"
            br []
            div [Class "flex-wrap fable-friends"] [
              linkImage "resoptima.png" "https://resoptima.com/"
              linkImage "demetrix.png" "https://demetrixbio.com"
              linkImage "compraga.jpeg" "https://www.compraga.de/"
              linkImage "aimtec.jpg" "https://www.aimtecglobal.com/en/"
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
