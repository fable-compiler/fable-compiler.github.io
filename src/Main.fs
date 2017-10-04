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
      div [Style [Overflow "hidden"]] [
        Header.render title subtitle
        div [Style [MarginTop "1.6rem"]] [
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

module Globals = Node.Globals

let runWithFake file =
  let fakePath = Path.join(Globals.__dirname, "../packages/build/FAKE/tools/FAKE.exe")
  let isWin = Globals.``process``.platform = Node.Base.NodeJS.Platform.Win32
  let p =
    if isWin then
      ChildProcess.spawnSync(
        fakePath,
        ResizeArray([file]),
        createObj ["encoding" ==> "utf-8"])
    else
      ChildProcess.spawnSync(
        "mono",
        ResizeArray([fakePath; file]),
        createObj ["encoding" ==> "utf-8"])
  if (!!p?status) <> 0 then
    failwithf "runWithFake failed: %s" (JS.String.Invoke (!!p?stderr))

let renderAPI() =
  let targetPath = Path.join(Globals.__dirname, "..", "tools", "templates", "template.cshtml")
  let title = "API Reference"
  let subtitle = "Exploring API reference of built-in libraries."

  render
    { Title = title
      TargetPath = Path.join(Paths.PublicDir, "api", "index.html")
      NavbarActivePage = Literals.Navbar.API
      RenderBody = APIPage.renderBody title subtitle }

  let renderRazorTpl () =
    let body =
      div [Style [OverflowY "hidden"]] [
        Header.render title subtitle
        div [Style [MarginTop "1.6rem"]] [
          div [Class "columns"] [
            div [Class "column"] []
            div [Class "column is-two-thirds"] [
              div [
                Class "content"
                Style [Margin "5px"]
                DangerouslySetInnerHTML { __html = " @RenderBody() " }] []
            ]
            div [Class "column"] []
          ]
        ]
      ]
    [ "title" ==> title
      "navbar" ==> (Navbar.root Literals.Navbar.API |> parseReactStatic)
      "body" ==> parseReactStatic body
      "extraJs" ==> [| "/js/tips.js" |] ]
    |> parseTemplate Paths.Template
    |> writeFile targetPath

  let renderReference() =
    printfn "Start generating API reference, this might take some minutes, please waiting...\n\nIf this takes too long, you can comment `renderReference()`  in Main.fs and generate API via manually executing `fsharpi ./tools/generate.fsx`"
    Path.join (Globals.__dirname, "../tools/generate.fsx")
    |> runWithFake
    |> ignore
    printfn "Generating API reference finished with success!"

  renderRazorTpl()
  renderReference()


let redirects() =
  let redirect oldUrl newUrl =
    [ "url" ==> newUrl ]
    |> parseTemplate Paths.TemplateRedirect
    |> writeFile (Path.join(Paths.PublicDir, oldUrl))
  redirect "samples.html" "/samples-browser"
  redirect "docs.html" "/docs"
  redirect "repl.html" "/repl"

// Run
renderHomePage()
renderDocs()
renderSamples()
renderAPI()
// Redirections are not working correctly, needs a fix
// See https://github.com/fable-compiler/fable-compiler.github.io/issues/8#issuecomment-328045038
// redirects()
