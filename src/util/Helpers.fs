module Util.Helpers

open Fable.React
open Fable.React.Props
open Fulma
open Fable.FontAwesome
open GlobalHelpers

let renderIntro (markdownParagraphs: string list): ReactElement =
  let paragraphs =
    List.map (parseMarkdownAsReactEl "") markdownParagraphs
  div [Class "columns"; Style [MarginTop "10px"]] [
    div [Class "column"; Style [Padding 0]] []
    div [Class "column is-two-thirds"] [
      div [Class "fable-introduction"] paragraphs
    ]
    div [Class "column"; Style [Padding 0]] []
  ]

type ImgOrFa = Img of string | FaIcon of Fa.IconOption

let renderCard icon title link text =
  let icon =
    match icon with
    | Img src -> Image.image [Image.Is64x64] [img [Src src]]
    | FaIcon fa -> 
      div 
        [ Style [Width "64px"; Height "64px"; Color "#2d2d2d"]] 
        [ Fa.i [ fa; Fa.Size Fa.Fa2x ] [] ]
  
  let header =
    match link with
    | None -> span [Class "title is-5"] [str title]
    | Some link -> a [Href link] [span [Class "title is-5"] [str title]]
  
  Box.box' []
    [ Media.media [] 
        [ Media.left [] [icon]
          Media.content [] [ header; parseMarkdownAsReactEl "" text] ] ]
  