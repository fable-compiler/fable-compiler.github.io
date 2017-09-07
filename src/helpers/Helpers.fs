module WebGenerator.Helpers

open System
open System.Collections.Generic
open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
open Fable.Import.Node.Globals
open Fable.Import.Node.Exports

let private templateCache = Dictionary<string, obj->string>()
let private handleBarsCompile (templateString: string): obj->string = import "compile" "handlebars"
let private marked (markdown: string): string = importDefault "marked"

/// Resolves a path using the location of the target JS file
/// Note the function is inline so `__dirname` will belong to the calling file
let inline resolve (path: string) =
    Path.resolve(__dirname, path)

/// Parses a Handlebars template
let parseTemplate (path: string) (context: (string*obj) list) =
    let template =
        match templateCache.TryGetValue(path) with
        | true, template -> template
        | false, _ ->
            let template = Fs.readFileSync(path).toString() |> handleBarsCompile
            templateCache.Add(path, template)
            template
    createObj context |> template

/// Parses a markdown file
let parseMarkdownFile (path: string) =
    Fs.readFileSync(path).toString() |> marked

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
    if Fs.existsSync(!^dir) then
        match cont with Some c -> c() | None -> ()
    else
        ensureDirExists (Path.dirname dir) (Some (fun () ->
            if not(Fs.existsSync !^dir) then
                Fs.mkdirSync !^dir |> ignore
            match cont with Some c -> c() | None -> ()
        ))

let writeFile (path: string) (content: string) =
    ensureDirExists (Path.dirname path) None
    Fs.writeFileSync(path, content)

let readFile (path: string) =
    Fs.readFileSync(path).toString()

// React helpers
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma.Common
open Fulma.Elements
open Fulma.Components
open Fulma.Extra.FontAwesome

let inline Class x = ClassName x

type [<Pojo>] InnerHtml =
  { __html: string }

let setInnerHtml (html: string) =
  DangerouslySetInnerHTML { __html = html }

let renderIntro (markdownParagraphs: string list): React.ReactElement =
  let paragraphs =
    Seq.map parseMarkdown markdownParagraphs |> String.concat ""
  printfn "%s" paragraphs
  div [Class "columns"; Style [MarginTop "10px"]] [
    div [Class "column"; Style [Padding 0]] []
    div [Class "column is-two-thirds"] [
      div [Class "fable-introduction"; setInnerHtml paragraphs] []
    ]
    div [Class "column"; Style [Padding 0]] []
  ]

type ImgOrFa = Img of string | FaIcon of Fa.FontAwesomeIcons

let renderCard icon title link text =
  let icon =
    match icon with
    | Img src -> Image.image [Image.is64x64] [img [Src src]]
    | FaIcon fa -> Icon.faIcon [ Icon.isLarge ] fa
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
