module WebGenerator.Main

open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Node.Exports
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fable.PowerPack
open Fulma.Elements
open Fulma.Components
open WebGenerator.Components
open WebGenerator.Literals
open Helpers
open Types

let parseMarkdownDocFile(path: string): string = importMember "./helpers/Util.js"

// TODO: Let user decide paths of Fable and samples-browser repos through arguments
let samplesRepoPath = Paths.SamplesRepo

let render (info: PageInfo) =
    [ "title" ==> info.Title
      // "root" ==> Path.dirname(Path.relative(Paths.PublicDir, info.TargetPath))
      "navbar" ==> (Navbar.root info.NavbarActivePage |> parseReactStatic)
      "body" ==> (info.RenderBody(info) |> parseReactStatic) ]
    |> parseTemplate Paths.Template
    |> writeFile info.TargetPath

let renderDocs() =
  let docFiles = Fs.readdirSync(!^Path.join(Paths.FableRepo, "docs"))
  for doc in docFiles |> Seq.filter (fun x -> x.EndsWith(".md")) do
    let fullPath = Path.join(Paths.FableRepo, "docs", doc)
    let targetPath = Path.join(Paths.PublicDir, "docs", doc.Replace(".md", ".html"))
    let content = parseMarkdownDocFile fullPath
    let body =
      div [Style [OverflowY "hidden"]] [
        Header.render "Docs" "Straight to the point!"
        div [Class "columns"] [
          div [Class "column"] []
          div [Class "column is-two-thirds samples-browser"] [
            div [
              Class "content"
              Style [Margin "5px"]
              DangerouslySetInnerHTML { __html = content }] []
          ]
          div [Class "column"] []
        ]
      ]
    [ "title" ==> "Fable Docs"
      "extraCss" ==> [| "/css/highlight.css" |]
      // "extraCss" ==> [| createObj [ "href" ==> "/css/highlight.css"] |]
      "navbar" ==> (Navbar.root Literals.Navbar.Docs |> parseReactStatic)
      "body" ==> parseReactStatic body ]
    |> parseTemplate Paths.Template
    |> writeFile targetPath

let renderMainPages() =
  [
    { Title = "Fable: JavaScript you can be proud of!"
      TargetPath = Path.join(Paths.PublicDir, "index.html")
      NavbarActivePage = Literals.Navbar.Home
      RenderBody = HomePage.renderBody }
    { Title = "Fable Docs"
      TargetPath = Path.join(Paths.PublicDir, "docs", "index.html")
      NavbarActivePage = Literals.Navbar.Docs
      RenderBody = DocsPage.renderBody }
    // { Title = "Fable Browser Samples"
    //   TargetPath = Path.join(Paths.PublicDir, "index.html") // TODO
    //   NavbarActivePage = Literals.Navbar.Samples
    //   RenderBody = SamplesPage.renderBody samplesRepoPath }
  ]
  |> List.iter render

renderMainPages()
renderDocs()