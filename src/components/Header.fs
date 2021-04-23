module Components.Header

open Fable.React
open Fable.React.Props
open Fulma
open Util.Literals

type Helpers =
    static member LinkButton(text, href, ?margin, ?color, ?openNewTab) =
        let color = defaultArg color IsSuccess
        div [
            Style [
                Width "250px"
                Margin "0 0.5rem"
            ]
        ] [
            a [
                yield Style [
                    Margin (defaultArg margin "0")
                ]
                yield Href href
                match openNewTab with
                | Some true -> yield Target "_black"
                | _ -> ()
            ] [
                Button.button  [
                    Button.Color color
                    Button.Size IsMedium
                    Button.IsOutlined
                    Button.IsFullWidth
                    Button.Props [ Style [ FontSize "1rem"]]
                ] [ str text ]
            ]
        ]

let introText =
  "Fable is a compiler that brings [F#](http://fsharp.org/) into the JavaScript ecosystem"

let fableConfPromo =
  "FableConf 2019 is happening in Antwerp on September 6/7th. **[Get your ticket soon!](/fableconf)**"

let render () =
    div [
        Class "fable-header"
        Style [ Margin "20px 0" ]
    ] [
        Image.image [
            Image.Props [
                Style [
                    MaxWidth "500px"
                    MarginLeft "auto"
                    MarginRight "auto"
                ]
            ]
        ] [
            img [
                Class "fable-logo"
                Src WebAssets.FableLogo
            ]
        ]

        div [
            Style [
                Display DisplayOptions.Flex
                JustifyContent "center"
            ]
        ] [
            Helpers.LinkButton("TRY ONLINE", "/repl/", openNewTab=true, margin="10px")
            Helpers.LinkButton("GET STARTED", "/docs/2-steps/setup.html", color=IsInfo, margin="10px")
            // Helpers.LinkButton("JOIN FABLECONF!", "/fableconf", color=IsDanger, margin="10px")
        ]

        GlobalHelpers.parseMarkdownAsReactEl "fable-catchphrase" introText
        // GlobalHelpers.parseMarkdownAsReactEl "fableconf-promo" fableConfPromo
    ]

let renderMinimal () =
    div [Class "fable-header-minimal"] [
        Image.image [
            Image.Props [
                Style [
                    MaxWidth "200px"
                    Margin "20px auto"
                ]
            ]
        ] [
            img [
                Class "fable-logo"
                Src WebAssets.FableLogo
            ]
        ]
    ]
