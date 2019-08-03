module Components.Header

open Fable.React
open Fable.React.Props
open Fulma
open Util.Literals

let render title subtitle =
  Hero.hero [  ]
    [ Hero.body [ ]
        [ 
          Columns.columns [] [
            Column.column [] []
            Column.column [] [
              Image.image [ 
                Image.Props [
                  Style [
                    Width "90%"
                    MarginLeft "auto"
                    MarginRight "auto"
                  ]
                ]
              ] 
                [ 
                  img [ Class "fable-logo"; Src WebAssets.FableLogo ] 
                ]
            ]
            Column.column [] []
          ]
          (*
          Heading.h3 [
            Heading.Props [
              Style [
                MarginTop "1rem"
                TextAlign TextAlignOptions.Center
                FontWeight "200"
              ]
            ]
          ] [ str subtitle]
          *)

    ] ]