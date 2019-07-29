module Components.Header

open Fable.React
open Fable.React.Props
open Fulma
open Util.Literals

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