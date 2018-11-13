module Util.Helpers

open Fable.Import
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma
open Fulma.FontAwesome
open StaticWebGenerator

let renderIntro (markdownParagraphs: string list): React.ReactElement =
  let paragraphs =
    List.map (parseMarkdownAsReactEl "") markdownParagraphs
  div [Class "columns"; Style [MarginTop "10px"]] [
    div [Class "column"; Style [Padding 0]] []
    div [Class "column is-two-thirds"] [
      div [Class "fable-introduction"] paragraphs
    ]
    div [Class "column"; Style [Padding 0]] []
  ]

open Fulma

type ImgOrFa = Img of string | FaIcon of Fa.I.FontAwesomeIcons

let renderCard icon title link text =
  let icon =
    match icon with
    | Img src -> Image.image [Image.Is64x64] [img [Src src]]
    | FaIcon fa -> Icon.faIcon [ Icon.Size IsLarge ] [Fa.icon fa; Fa.fa2x]
  let header =
    match link with
     | None -> span [Class "title is-4"] [str title]
     | Some link -> a [Href link] [span [Class "title is-4"] [str title]]
  Card.card [CustomClass "fable-home-card"] [
    Card.header [] [Card.Header.title [] [header]]
    Card.content [] [
      Media.media [] [
        Media.left [] [icon]
        Media.content [] [parseMarkdownAsReactEl "" text]
      ]
    ]
  ]
