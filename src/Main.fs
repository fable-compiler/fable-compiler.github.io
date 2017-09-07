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

let render (info: PageInfo) =
    [ "title" ==> info.Title
      // "root" ==> Path.dirname(Path.relative(Paths.PublicDir, info.TargetPath))
      "navbar" ==> (Navbar.root info.NavbarActivePage |> parseReactStatic)
      "body" ==> (info.RenderBody(info) |> parseReactStatic) ]
    |> parseTemplate Paths.Template
    |> writeFile info.TargetPath

let renderDocs() =
  let title, subtitle = "Documentation", "Learn how Fable works & how to use it"
  // Main docs page
  render
    { Title = "Fable Docs"
      TargetPath = Path.join(Paths.PublicDir, "docs", "index.html")
      NavbarActivePage = Literals.Navbar.Docs
      RenderBody = DocsPage.renderBody title subtitle }
  // Docs translated from markdown files in Fable repo
  let docFiles = Fs.readdirSync(!^Path.join(Paths.FableRepo, "docs"))
  for doc in docFiles |> Seq.filter (fun x -> x.EndsWith(".md")) do
    let fullPath = Path.join(Paths.FableRepo, "docs", doc)
    let targetPath = Path.join(Paths.PublicDir, "docs", doc.Replace(".md", ".html"))
    let content = parseMarkdownDocFile fullPath
    let body =
      div [Style [OverflowY "hidden"]] [
        Header.render title subtitle
        div [Class "columns"] [
          div [Class "column"] []
          div [Class "column is-two-thirds"] [
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

let renderHomePage() =
  render
    { Title = "Fable: JavaScript you can be proud of!"
      TargetPath = Path.join(Paths.PublicDir, "index.html")
      NavbarActivePage = Literals.Navbar.Home
      RenderBody = HomePage.renderBody }

let renderSamples() =
  // Copy styles (css) and shared images (img/shared)
  copy (Path.join(Paths.PublicDir, "css")) (Path.join(Paths.SamplesRepo, "public/css"))
  copy (Path.join(Paths.PublicDir, "img/shared")) (Path.join(Paths.SamplesRepo, "public/img/shared"))

  render
    { Title = "Fable Browser Samples"
      TargetPath = Path.join(Paths.SamplesRepo, "public", "index.html")
      NavbarActivePage = Literals.Navbar.Samples
      RenderBody = SamplesPage.renderBody Paths.SamplesRepo }

renderHomePage()
renderDocs()
renderSamples()