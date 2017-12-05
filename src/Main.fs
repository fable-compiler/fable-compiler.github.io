module WebGenerator.Main

open System.Text.RegularExpressions
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Node.Exports
open Fable.Helpers.React
open Fable.Helpers.React.Props
open WebGenerator.Components
open WebGenerator.Literals
open Helpers
open Types

let parseMarkdown(content: string): string = importMember "./helpers/Util.js"

let render (info: PageInfo) =
    [ "title" ==> info.Title
      // "root" ==> Path.dirname(Path.relative(Paths.PublicDir, info.TargetPath))
      "navbar" ==> (Navbar.root info.NavbarActivePage |> parseReactStatic)
      "body" ==> (info.RenderBody(info) |> parseReactStatic) ]
    |> parseTemplate Paths.Template
    |> writeFile info.TargetPath

let renderMarkdown pageTitle navbar header targetFullPath content =
    let body =
      div [ClassName "markdown"; Style [Overflow "hidden"]] [
        match header with
        | Some(header, subheader) -> yield Header.render header subheader
        | None -> ()
        yield div [Style [MarginTop "1.6rem"]] [
          div [Class "columns"] [
            div [Class "column"] []
            div [Class "column is-two-thirds"] [
              div [
                Class "content"
                Style [Margin "5px"]
                DangerouslySetInnerHTML { __html = parseMarkdown content }] []
            ]
            div [Class "column"] []
          ]
        ]
      ]
    [ "title" ==> pageTitle
      "extraCss" ==> [| "/css/highlight.css" |]
      "navbar" ==> (Navbar.root navbar |> parseReactStatic)
      "body" ==> parseReactStatic body ]
    |> parseTemplate Paths.Template
    |> writeFile targetFullPath

let renderMarkdownFrom pageTitle navbar header fileFullPath targetFullPath =
  let content = Fs.readFileSync(fileFullPath).toString()
  renderMarkdown pageTitle navbar header targetFullPath content

let renderDocs() =
  let pageTitle, header, subheader = "Fable Docs", "Documentation", "Learn how Fable works & how to use it"
  // Main docs page
  render
    { Title = pageTitle
      TargetPath = Path.join(Paths.PublicDir, "docs", "index.html")
      NavbarActivePage = Literals.Navbar.Docs
      RenderBody = DocsPage.renderBody header subheader }
  // Docs translated from markdown files in Fable repo
  let docFiles = Fs.readdirSync(!^Path.join(Paths.FableRepo, "docs"))
  for doc in docFiles |> Seq.filter (fun x -> x.EndsWith(".md")) do
    let fullPath = Path.join(Paths.FableRepo, "docs", doc)
    let targetPath = Path.join(Paths.PublicDir, "docs", doc.Replace(".md", ".html"))
    renderMarkdownFrom pageTitle Literals.Navbar.Docs (Some(header, subheader)) fullPath targetPath

let renderBlog() =
  let reg = Regex(@"^\s*-\s*title\s*:(.+)\n\s*-\s*subtitle\s*:(.+)\n")
  let pageTitle, header, subheader = "Fable Blog", "Blog", "Read about latest Fable news"
  renderMarkdownFrom pageTitle Literals.Navbar.Blog (Some(header, subheader))
    (Path.join(Paths.BlogDir, "blog.md")) (Path.join(Paths.PublicDir, "blog", "index.html"))
  let blogFiles = Fs.readdirSync(!^Paths.BlogDir)
  for blog in blogFiles |> Seq.filter (fun x -> x.EndsWith(".md")) do
    let text = Fs.readFileSync(Path.join(Paths.BlogDir, blog)).toString()
    let m = reg.Match(text)
    let header, text =
      if m.Success
      then Some(m.Groups.[1].Value.Trim(), m.Groups.[2].Value.Trim()), text.Substring(m.Index + m.Length)
      else None, text
    let targetPath = Path.join(Paths.PublicDir, "blog", blog.Replace(".md", ".html"))
    renderMarkdown pageTitle Literals.Navbar.Blog header targetPath text

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

// Run
renderHomePage()
renderBlog()
renderDocs()
renderSamples()
// renderAPI()
