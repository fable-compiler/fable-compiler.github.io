module WebGenerator.Main

open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Node.Exports
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma.Elements
open Fulma.Components
open WebGenerator.Components
open WebGenerator.Literals
open Helpers
open Types

// TODO: Let user decide paths of Fable and samples-browser repos through arguments
let samplesRepoPath = Paths.SamplesRepo

let render (info: PageInfo) =
    [ "title" ==> info.Title
      // "root" ==> Path.dirname(Path.relative(Paths.PublicDir, info.TargetPath))
      "navbar" ==> (Navbar.root info.NavbarActivePage |> parseReactStatic)
      "body" ==> (info.RenderBody(info) |> parseReactStatic) ]
    |> parseTemplate Paths.Template
    |> writeFile info.TargetPath

let renderHomeBody (info: PageInfo) =
  div [Class "content"] [
    Header.render "F# |> Babel" "The compiler that emits JavaScript you can be proud of!"
    h1 [] [str "Hello Fable!"]
  ]

[
  { Title = "Fable: The compiler that emits JavaScript you can be proud of!"
    TargetPath = Path.join(Paths.PublicDir, "index.html")
    NavbarActivePage = Literals.Navbar.Home
    RenderBody = renderHomeBody }
  // { Title = "Fable Browser Samples"
  //   TargetPath = Path.join(Paths.PublicDir, "index.html") // TODO
  //   NavbarActivePage = Literals.Navbar.Samples
  //   RenderBody = SamplesPage.renderBody samplesRepoPath }
]
|> List.iter render
