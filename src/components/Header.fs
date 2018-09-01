module WebGenerator.Components.Header

open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma
open WebGenerator.Literals

let render title subtitle =
  Hero.hero [ Hero.CustomClass "fable-header" ]
    [ Hero.body [ ]
        [ div [ Class "container" ]
            [ Columns.columns [ Columns.IsVCentered ]
                [ Column.column [ ]
                    [ img [ Class "fable-logo"
                            Src WebAssets.FableLogo ] ]
                  Column.column [ Column.Option.Modifiers [ Modifier.TextAlignment (Screen.All, TextAlignment.Right) ] ]
                    [ Heading.h1 [ Heading.Is1 ] [ str title ]
                      Heading.h1 [ Heading.IsSubtitle
                                   Heading.Is4 ] [ str subtitle ] ] ] ] ] ]