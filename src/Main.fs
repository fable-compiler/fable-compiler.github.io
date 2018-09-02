module WebGenerator.Main

open System.Text.RegularExpressions
open Fable.Core.JsInterop
open Fable.Import
open Fable.Helpers.React
open Fable.Helpers.React.Props
open WebGenerator.Components
open WebGenerator.Literals
open Helpers
open Types

module Node = Fable.Import.Node.Exports
module NodeGlobals = Fable.Import.Node.Globals

let parseMarkdown(content: string): string = importMember "./helpers/Util.js"

let render (info: PageInfo) =
    [ "title" ==> info.Title
      // "root" ==> Node.path.dirname(Node.path.relative(Paths.PublicDir, info.TargetPath))
      "navbar" ==> (Navbar.root info.NavbarActivePage |> parseReactStatic)
      "body" ==> (info.RenderBody(info) |> parseReactStatic) ]
    |> parseTemplate Paths.Template
    |> writeFile info.TargetPath

let renderMarkdown pageTitle navbar header subheader targetFullPath content =
    let body =
      div [Class "markdown"; Style [Overflow "hidden"]] [
        Header.render header subheader
        div [Style [MarginTop "1.6rem"]] [
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

let renderMarkdownFrom pageTitle navbar header subheader fileFullPath targetFullPath =
  let content = Node.fs.readFileSync(fileFullPath).toString()
  renderMarkdown pageTitle navbar header subheader targetFullPath content

let renderDocs() =
  let pageTitle, header, subheader = "Fable Docs", "Documentation", "Learn how Fable works & how to use it"
  // Main docs page
  render
    { Title = pageTitle
      TargetPath = Node.path.join(Paths.PublicDir, "docs", "index.html")
      NavbarActivePage = Literals.Navbar.Docs
      RenderBody = DocsPage.renderBody header subheader }
  // Docs translated from markdown files in Fable repo
  let docFiles = Node.fs.readdirSync(!^Node.path.join(Paths.FableRepo, "docs"))
  for doc in docFiles |> Seq.filter (fun x -> x.EndsWith(".md")) do
    let fullPath = Node.path.join(Paths.FableRepo, "docs", doc)
    let targetPath = Node.path.join(Paths.PublicDir, "docs", doc.Replace(".md", ".html"))
    renderMarkdownFrom pageTitle Literals.Navbar.Docs header subheader fullPath targetPath
  printfn "Documentation generated"

let renderBlog() =
  let reg = Regex(@"^\s*-\s*title\s*:(.+)\n\s*-\s*subtitle\s*:(.+)\n")
  let pageTitle, header, subheader = "Fable Blog", "Blog", "Read about latest Fable news"
  renderMarkdownFrom pageTitle Literals.Navbar.Blog header subheader
    (Node.path.join(Paths.BlogDir, "index.md")) (Node.path.join(Paths.PublicDir, "blog", "index.html"))
  let blogFiles = Node.fs.readdirSync(!^Paths.BlogDir)
  for blog in blogFiles |> Seq.filter (fun x -> x.EndsWith(".md")) do
    let text = Node.fs.readFileSync(Node.path.join(Paths.BlogDir, blog)).toString()
    let m = reg.Match(text)
    let header, subheader, text =
      if m.Success
      then m.Groups.[1].Value.Trim(), m.Groups.[2].Value.Trim(), text.Substring(m.Index + m.Length)
      else header, subheader, text
    let targetPath = Node.path.join(Paths.PublicDir, "blog", blog.Replace(".md", ".html"))
    renderMarkdown pageTitle Literals.Navbar.Blog header subheader targetPath text
  printfn "Blog generated"
let renderHomePage() =
  render
    { Title = "Fable: JavaScript you can be proud of!"
      TargetPath = Node.path.join(Paths.PublicDir, "index.html")
      NavbarActivePage = Literals.Navbar.Home
      RenderBody = HomePage.renderBody }
  printfn "Home page generated"

// Run
renderHomePage()
renderBlog()
renderDocs()
