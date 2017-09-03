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
      "body" ==> (SamplesPage.renderBody samplesRepoPath |> parseReactStatic) ]
    |> parseTemplate Paths.Template
    |> writeFile info.TargetPath

{ Title = "Fable Browser Samples"
  TargetPath = Path.join(Paths.PublicDir, "index.html") // TODO
  NavbarActivePage = Literals.Navbar.Samples }
|> render
