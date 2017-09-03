module WebGenerator.Components.Header

open Fable.Import
open Fable.Import.Node.Exports
open Fable.Core.JsInterop
open Fable.Helpers.React
open Fable.Helpers.React.Props
open Fulma.Elements
open Fulma.Components
open WebGenerator.Helpers
open WebGenerator.Literals
open WebGenerator.Types

let render title subtitle =
  section [Class "fable-header"] [
    img [
      Class "fable-logo"
      Src WebAssets.FableLogo
    ]
    div [Class "flex-1 has-text-right"] [
      h1 [Class "title is-1"] [str title]
      h1 [Class "subtitle is-4"] [str subtitle]
    ]
  ]
