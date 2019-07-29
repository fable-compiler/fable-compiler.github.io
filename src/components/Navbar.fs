module Components.Navbar

open Fable.React
open Fable.React.Props
open Fulma
open Util.Helpers
open Util.Literals

let navButton classy href faClass txt =
  Control.div [] [
    a [Class (sprintf "button %s" classy); Href href] [
      span [Class "icon"] [
        i [Class (sprintf "fa %s" faClass)] []
      ]
      span [] [str txt ]
    ]
  ]

let navButtons =
  div [Class "navbar-item"]
    [ Field.div [ Field.IsGrouped ]
        [ navButton "twitter" "https://twitter.com/FableCompiler" "fa-twitter" "Share the love!"
          navButton "github" "https://gitter.im/fable-compiler/Fable" "fa-comments" "Chat"
          navButton "github" "https://github.com/fable-compiler/Fable" "fa-github" "Contribute" ] ]

let menuItem label page currentPage =
  a [
    classList [
      "navbar-item", true
      "is-active", System.String.Compare(page, currentPage, true) = 0
    ]
    Href page
  ] [str label]

let root currentPage =
  nav [Class "navbar"] [
    div [Class "navbar-brand"] [
      div [Class "navbar-item title is-4"] [str "Fable"]
      div [Class "navbar-burger"; Data("target", Navbar.MenuId)] [
        span [] []
        span [] []
        span [] []
      ]
    ]
    div [Id Navbar.MenuId; classList ["navbar-menu", true]] [
      div [Class "navbar-start"] [
        menuItem "Home" Navbar.Home currentPage
        menuItem "REPL" Navbar.Repl currentPage
        menuItem "Blog" Navbar.Blog currentPage
        menuItem "Docs" Navbar.Docs currentPage
        menuItem "FAQ" Navbar.FAQ currentPage
        menuItem "FableConf" Navbar.FableConf currentPage
      ]
      div [Class "navbar-end"] [navButtons]
    ]
  ]
