module WebGenerator.Components.SamplesPage

open Fable.Import
open Fable.Import.Node.Exports
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma.Elements
open Fulma.Components
open WebGenerator.Helpers
open WebGenerator.Literals
open WebGenerator.Types

let parseJson5<'T>(json: string): 'T = import "parse" "json5"

let samplesIntroParagraphs =
  ["Who said learning cannot be fun? These samples will help you get started with different kind of Fable web apps, like games, visualizations or productivity apps. You can also find [ samples to create Github Electron apps](https://github.com/fable-compiler/samples-electron) and [Node](https://nodejs.org/) samples are coming too. Don't forget to check the [fable-awesome list](https://github.com/kunjee17/awesome-fable) for more info about awesome Fable projects and tutorials!"
   "Check the [Github repository](https://github.com/fable-compiler/samples-browser) to see the source code of the samples and clone it to edit them at will. If you find something missing or have a great idea for a sample, don't hesitate to [send us a pull request](https://github.com/fable-compiler/samples-browser#adding-a-new-sample)."]

let productivityParagraph =
  "These samples are here just to show how easy is to interact with JS libraries from Fable, including advanced UI frameworks like React or Vue. However, the recommended way to create Single Page Applications is to use [Fable.Elmish](https://fable-elmish.github.io/). Check their extensive documentation to learn how thanks to the `model-view-update` architecture you'll never mess up with the UI state any more."

let keyValuePairs (o: JsObj<'T>) =
  JS.Object.keys(o)
  |> Seq.map (fun k -> k, o.[k])

let renderSamples (samplesRepoPath: string) =
  let samplesToList (cat: JsObj<SampleInfo>) =
    keyValuePairs cat |> Seq.map (fun (k,v) ->
      Card.card [] [
        Card.content [] [
          Media.media [] [
            Media.left [] [
              Image.image [Image.is128x128] [
                a [Href k] [img [Src ("img/" + v.img)]]
              ]
            ]
            Media.content [] [
              h1 [Class "title is-4"] [a [Href k] [str v.title]]
              p [setMarkdown v.desc] []
            ]
          ]
        ]
      ]
    ) |> Seq.toList
  let markdownP str =
    p [setMarkdown str] []
  let samples =
    Path.join(samplesRepoPath, "public/samples.json5")
    |> readFile |> parseJson5<JsObj<JsObj<SampleInfo>>>
  div [Class "columns"] [
    div [Class "column"] []
    div [Class "column is-two-thirds samples-browser"] [
      div [Class "content fable-introduction"]
        (List.map markdownP samplesIntroParagraphs)
      div [Class "fable-samples"] [
        h1 [Class "title is-2"] [str "Fun and Games"]
        ul [] (samplesToList samples.["games"])
        h1 [Class "title is-2"] [str "Productivity"]
        div [Class "content fable-introduction"] [
          markdownP productivityParagraph
        ]
        ul [] (samplesToList samples.["productivity"])
        h1 [Class "title is-2"] [str "Visualizations"]
        ul [] (samplesToList samples.["visual"])
      ]
    ]
    div [Class "column"] []
  ]

let renderHeader() =
  section [Class "fable-header"] [
    img [
      Class "fable-logo"
      Src WebAssets.FableLogo
    ]
    div [Class "flex-1 has-text-right"] [
      h1 [Class "title is-1"] [str "Samples"]
      h1 [Class "subtitle is-4"] [str "Learn by playing!"]
    ]
  ]

let renderBody (samplesRepoPath: string) =
  div [] [
    renderHeader()
    renderSamples samplesRepoPath
  ]
