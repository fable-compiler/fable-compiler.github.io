module WebGenerator.Components.APIPage

open Fable.Import
open Fable.Import.Node.Exports
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma.Common
open Fulma.Elements
open Fulma.Components
open Fulma.Extra.FontAwesome
open WebGenerator.Helpers
open WebGenerator.Literals
open WebGenerator.Types

let (@@) f a = f a

let internal baseBody title subtitle content =
  div [Style [Overflow "hidden"; PaddingBottom "3rem"]] [
    Header.render title subtitle
    div [Class "columns"] [
      div [Class "column"] []
      div [Class "column is-two-thirds"] [
        div [ Class "content" ] content
      ]
      div [Class "column"] []
    ]
  ]
let paragraph (markdownParagraphs: string list): React.ReactElement =
  let paragraphs =
    Seq.map parseMarkdown markdownParagraphs |> String.concat ""
  div [Style [FontSize "1.3rem"; MarginTop "1.5rem"]; setInnerHtml paragraphs] []

let list (links: (string * string * string) list) : React.ReactElement =
  ul
    [ Style [FontSize "1.1rem"] ] (
      links
      |> List.map (
        fun (link, text, intro) ->
          li [] [
            a [Href link; setInnerHtml text; Style [MarginRight ".3rem"]] []
            span [setInnerHtml intro] []
          ]
        )
    )

let renderBody title subtitle (info: PageInfo) =
  let ulStyle styles = Style @@ [FontSize "1.2rem"] @ styles
  baseBody title subtitle [
    paragraph [
      "If you are new to Fable, you can find some useful API in the [tutorials](/docs)."
      "Here is the generated API reference of Fable core library, <code>Fable.Core</code>. You can find Fable's FFI utilities or plugin API here."
    ]

    list [
      "/api/Fable.Core", "Fable.Core", "The core library provided by Fable."
    ]

    paragraph [
      "If you are new to F#, you might also need these links:"]
    list [
      "http://fsharp.org/", "fsharp.org", "Official site of F# maintained by F# Software Foundation and the F# community, contains many great learning resources of F#."

      "https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/index", "F# Language Reference", "Provides reference information about the F# language, including keywords, symbols, syntax and operators."

      "https://msdn.microsoft.com/visualfsharpdocs/conceptual/fsharp-core-library-reference", "F# Core Library Reference", "Provides reference information about the F# core library, <code>FSharp.Core.dll</code>."

      "https://docs.microsoft.com/en-us/dotnet/api/?view=netstandard-2.0", ".NET API Browser", ".NET API Browser tool from Microsoft."
    ]
  ]

