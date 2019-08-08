module GlobalHelpers

open System.Text.RegularExpressions
open Fable.Core
open Fable.Core.JsInterop
open Fable.React
open Fable.React.Props
module Node = Node.Api

module private Util =
  let isAbsoluteUrl (url: string) =
    Regex.IsMatch(url, @"^(?:[a-z]+:)?//", RegexOptions.IgnoreCase)

  let prism: obj = importAll "prismjs"
  let marked: obj = importDefault "marked"
  let loadLanguages(langs: string array) = importDefault "prismjs/components/"

  loadLanguages [|"fsharp"; "json"; "css"; "bash"|]
  
  marked?setOptions(createObj [
    "highlight" ==> fun code (lang:string) ->     
      match lang.ToLowerInvariant().Trim() with
      | "" -> code
      | lang ->
          let l = 
            match lang.ToLowerInvariant().Trim() with 
            | "js" -> prism?languages?javascript
            | "fsharp" -> prism?languages?fsharp
            | "xml" -> prism?languages?xml
            | "json" -> prism?languages?json
            | "bash" | "shell" | _ -> prism?languages?bash
          if isNull l then
            JS.console.error("Cannot find prism language for " + lang)
            code
          else
            prism?highlight(code, l, lang)
  ]) 

  let renderer = createNew marked?Renderer ()

  renderer?heading <- fun (text: string) level ->
    let escapedText = Regex.Replace(text.ToLower(), @"[^\w]+", "-")
    sprintf """<h%s><a name="%s" class="anchor" href="#%s">%s</a></h%s>"""
      level escapedText escapedText text level

  renderer?link <- fun href title text ->
    let href =
        if isAbsoluteUrl href then href
        else Regex.Replace(href, @"\.md$", ".html")
    sprintf """<a href="%s">%s</a>""" href text

  let parseMarkdown(content: string): string =
    marked $ (content, createObj ["renderer" ==> renderer])

/// Parses a markdown file
let parseMarkdownFile (path: string) =
    Node.fs.readFileSync(path, "utf8").ToString() |> Util.parseMarkdown

/// Parses a markdown string
let parseMarkdown (str: string) =
    Util.parseMarkdown str

let parseMarkdownAsReactEl className (content: string) =
    div [
      if System.String.IsNullOrWhiteSpace(className) |> not then
        yield Class className
      yield DangerouslySetInnerHTML { __html = parseMarkdown content }
    ] []

/// Parses a React element invoking ReactDOMServer.renderToString
let parseReact (el: ReactElement) =
    ReactDomServer.renderToString el

/// Parses a React element invoking ReactDOMServer.renderToStaticMarkup
let parseReactStatic (el: ReactElement) =
    ReactDomServer.renderToStaticMarkup el

module IO =
  let private fsExtra: obj = importAll "fs-extra"

  let rec private ensureDirExists (dir: string) (cont: (unit->unit) option) =
      if Node.fs.existsSync(!^dir) then
          match cont with Some c -> c() | None -> ()
      else
          ensureDirExists (Node.path.dirname dir) (Some (fun () ->
              if not(Node.fs.existsSync !^dir) then
                  Node.fs.mkdirSync dir |> ignore
              match cont with Some c -> c() | None -> ()
          ))

  /// Resolves a path using the location of the target JS file
  /// Note the function is inline so `__dirname` will belong to the calling file
  let inline resolve (path: string) =
      Node.path.resolve(Node.__dirname, path)

  let writeFile (path: string) (content: string) =
      ensureDirExists (Node.path.dirname path) None
      Node.fs.writeFileSync(path, content)

  let readFile (path: string) =
      Node.fs.readFileSync(path, "utf8")

  /// Copy a file or directory. The directory can have contents. Like cp -r.
  /// Overwrites target files
  let copy (source: string) (target: string): unit =
      fsExtra?copySync(source, target, createObj["overwrite" ==> true])
