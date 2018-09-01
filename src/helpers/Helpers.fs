module WebGenerator.Helpers

open System
open System.Collections.Generic
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.PowerPack
module NodeGlobals = Fable.Import.Node.Globals
module Node = Fable.Import.Node.Exports

let private templateCache = Dictionary<string, obj->string>()
let private handleBarsCompile (templateString: string): obj->string = import "compile" "handlebars"
let private marked (markdown: string): string = importDefault "marked"
let private fsExtra: obj = importAll "fs-extra"

/// Resolves a path using the location of the target JS file
/// Note the function is inline so `__dirname` will belong to the calling file
let inline resolve (path: string) =
    Node.path.resolve(NodeGlobals.__dirname, path)

/// Parses a Handlebars template
let parseTemplate (path: string) (context: (string*obj) list) =
    let template =
        match templateCache.TryGetValue(path) with
        | true, template -> template
        | false, _ ->
            let template = Node.fs.readFileSync(path).toString() |> handleBarsCompile
            templateCache.Add(path, template)
            template
    createObj context |> template

/// Parses a markdown file
let parseMarkdownFile (path: string) =
    Node.fs.readFileSync(path).toString() |> marked

/// Parses a markdown string
let parseMarkdown (str: string) =
    marked str

/// Parses a React element invoking ReactDOMServer.renderToString
let parseReact (el: React.ReactElement) =
    ReactDomServer.renderToString el

/// Parses a React element invoking ReactDOMServer.renderToStaticMarkup
let parseReactStatic (el: React.ReactElement) =
    ReactDomServer.renderToStaticMarkup el

let rec private ensureDirExists (dir: string) (cont: (unit->unit) option) =
    if Node.fs.existsSync(!^dir) then
        match cont with Some c -> c() | None -> ()
    else
        ensureDirExists (Node.path.dirname dir) (Some (fun () ->
            if not(Node.fs.existsSync !^dir) then
                Node.fs.mkdirSync dir |> ignore
            match cont with Some c -> c() | None -> ()
        ))

let writeFile (path: string) (content: string) =
    ensureDirExists (Node.path.dirname path) None
    Node.fs.writeFileSync(path, content)

/// Copy a file or directory. The directory can have contents. Like cp -r.
/// Overwrites target files
let copy (source: string) (target: string): unit =
    !!fsExtra?copySync(source, target, createObj["overwrite" ==> true])

let readFile (path: string) =
    Node.fs.readFileSync(path).toString()

// React helpers
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma.Common
open Fulma.FontAwesome

let inline Class x = Class x

type InnerHtml =
  { __html: string }

let setInnerHtml (html: string) =
  DangerouslySetInnerHTML { __html = html }

let renderIntro (markdownParagraphs: string list): React.ReactElement =
  let paragraphs =
    Seq.map parseMarkdown markdownParagraphs |> String.concat ""
  div [Class "columns"; Style [MarginTop "10px"]] [
    div [Class "column"; Style [Padding 0]] []
    div [Class "column is-two-thirds"] [
      div [Class "fable-introduction"; setInnerHtml paragraphs] []
    ]
    div [Class "column"; Style [Padding 0]] []
  ]

open Fulma

type ImgOrFa = Img of string | FaIcon of Fa.I.FontAwesomeIcons

let renderCard icon title link text =
  let icon =
    match icon with
    | Img src -> Image.image [Image.Is64x64] [img [Src src]]
    | FaIcon fa -> Icon.faIcon [ Icon.Size IsLarge ] [Fa.icon fa]
  let header =
    match link with
     | None -> span [Class "title is-4"] [str title]
     | Some link -> a [Href link] [span [Class "title is-4"] [str title]]
  Card.card [CustomClass "fable-home-card"] [
    Card.header [] [Card.Header.title [] [header]]
    Card.content [] [
      Media.media [] [
        Media.left [] [icon]
        Media.content [] [p [setInnerHtml (parseMarkdown text)] []]
      ]
    ]
  ]
