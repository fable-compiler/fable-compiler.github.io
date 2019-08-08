module Components.Navbar

open Fable.React
open Fable.React.Props
open Fulma
open Util.Helpers
open Util.Literals

let navButton classy href faClass txt =
  Control.div [] 
    [ a 
        [ Class (sprintf "button %s" classy); Href href ] 
        [ span [Class "icon"] [ i [Class (sprintf "fa %s" faClass)] [] ]
          span [] [str txt ]
        ] ]

let navButtons =
  Navbar.Item.div []
    [ Field.div [ Field.IsGrouped ]
        [ navButton "twitter" "https://twitter.com/FableCompiler" "fa-twitter" "Share the love!"
          navButton "github" "https://gitter.im/fable-compiler/Fable" "fa-comments" "Chat"
          navButton "github" "https://github.com/fable-compiler/Fable" "fa-github" "Github" ] ]

let menuItem label page currentPage =

  a 
    [
      classList [
        "navbar-item", true
        "is-active", System.String.Compare(page, currentPage, true) = 0
      ]
      Href page
    ] [ str label]

let root currentPage =
  Navbar.navbar [] 
    [ Navbar.Brand.div [] 
        [ Navbar.Item.div 
            [ Navbar.Item.Modifiers [ Modifier.TextSize (Screen.All, TextSize.Is4) ] 
              Navbar.Item.Props [ Style [ BackgroundColor "rgba(0,0,0,0.5)"; FontWeight 600.]] ]
            [ a [Href "/"; Style [Color "dodgerblue"]] [str "Fable"] ]
            
          Navbar.burger
            [ Props [ Data("target", Navbar.MenuId) ]]
            [ span [] []
              span [] []
              span [] [] ] ]

      div [Id Navbar.MenuId; classList ["navbar-menu", true] ] [
        Navbar.Start.div [] [
            menuItem "Docs" Navbar.Docs currentPage
            menuItem "Try" Navbar.Repl currentPage
            menuItem "Blog" Navbar.Blog currentPage
    //        menuItem "FAQ" Navbar.FAQ currentPage
            menuItem "FableConf" Navbar.FableConf currentPage
            menuItem "GitHub" Navbar.GitHub currentPage
        ]
        //div [Class "navbar-end"] [navButtons]
    ]
  ]
