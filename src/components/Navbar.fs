module Components.Navbar

open Fable.React
open Fable.React.Props
open Fulma
open Util.Helpers
open Util.Literals
open Fable.FontAwesome

type Link =
    { Href : string
      Label : string option
      Icon : string option
      Color : string option
      IsExternal : bool }

let private renderLink (link : Link) =
    let color = Option.defaultValue null link.Color
    let target = if link.IsExternal then "_blank" else "_self"

    let iconItem =
        match link.Icon with
        | Some iconClass ->
            Icon.icon [ ] [ Fa.i [ Fa.Icon iconClass ] [ ] ]
        | None -> nothing

    let labelItem =
        match link.Label with
        | Some labelText ->
            span [ ] [ str labelText ]
        | None -> nothing

    Navbar.Item.a [ Navbar.Item.Props [ Href link.Href
                                        Target target
                                        Style [ Color color ] ] ]
        [ iconItem
          labelItem ]


let navbarEndLinks = [
    { Href = "https://gitter.im/fable-compiler/Fable"
      Label = None
      Icon = Some "fab fa-gitter"
    //   Color = Some "#24292e"
      Color = Some "white"
      IsExternal = true }
    { Href = "https://github.com/fable-compiler/fable"
      Label = None
      Icon = Some "fab fa-github"
    //   Color = Some "#24292e"
      Color = Some "white"
      IsExternal = true }
    { Href = "https://twitter.com/FableCompiler"
      Label = None
      Icon = Some "fab fa-twitter"
    //   Color = Some "#55acee"
      Color = Some "white"
      IsExternal = true }
    { Href = "https://www.youtube.com/channel/UC6m70Jyr65ogDySbK7aMmzg/videos"
      Label = None
      Icon = Some "fab fa-youtube"
      Color = Some "white"
      IsExternal = true }      
]


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
        [ Navbar.Item.a [
            Navbar.Item.Modifiers [ Modifier.TextSize (Screen.All, TextSize.Is4) ] 
            Navbar.Item.Props [
                Href "/"
                Style [
                    BackgroundColor "rgba(0,0,0,0.5)"
                    Color "dodgerblue"
                    FontWeight 600.
                ]
            ]
          ] [ str "Fable" ]
            
          Navbar.burger
            [ Navbar.Burger.Props [ Data("target", Navbar.MenuId) ]]
            [ span [] []
              span [] []
              span [] [] ] ]

      div [Id Navbar.MenuId; classList ["navbar-menu", true] ] [
        Navbar.Start.div [] [
            menuItem "Docs" Navbar.Docs currentPage
            menuItem "Blog" Navbar.Blog currentPage
            menuItem "REPL" Navbar.Repl currentPage
            menuItem "Community" Navbar.Community currentPage
            menuItem "FableConf" Navbar.FableConf currentPage
        ]
        Navbar.End.div [] [
            Field.div [Field.IsGrouped] (List.map renderLink navbarEndLinks)
        ]
    ]
  ]
