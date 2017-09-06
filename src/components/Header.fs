module WebGenerator.Components.Header

open Fable.Import
open Fable.Import.Node.Exports
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma.Elements
open Fulma.Components
open Fulma.BulmaClasses
open Fulma.Layout
open Fulma.Grids
open WebGenerator.Helpers
open WebGenerator.Literals
open WebGenerator.Types

let render title subtitle =
  Hero.hero [ Hero.customClass "fable-header" ]
    [ Hero.body [ ]
        [ div [ ClassName "container" ]
            [ Columns.columns [ Columns.isVCentered ]
                [ Column.column [ ]
                    [ img [ ClassName "fable-logo"
                            Src WebAssets.FableLogo ] ]
                  Column.column [ Column.customClass Bulma.Properties.Alignment.HasTextRight ]
                    [ Heading.h1 [ Heading.is1 ] [ str title ]
                      Heading.h1 [ Heading.isSubtitle
                                   Heading.is4 ] [ str subtitle ] ] ] ] ] ]