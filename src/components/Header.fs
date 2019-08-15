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
                Margin "0.5rem 0"
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

let render () =
    Columns.columns [
        Columns.CustomClass "fable-header"
        Columns.Props [Style [ Margin "20px 0" ]]
    ] [
        Column.column [
            Column.Offset (Screen.All, Column.IsOneQuarter)            
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
        ]
        Column.column [
            Column.CustomClass "fable-header-buttons"
            Column.Props [
                Style [
                    Display DisplayOptions.Flex    
                    FlexDirection "column"
                    JustifyContent "center"
                ]
            ]
        ] [
            Helpers.LinkButton("TRY ONLINE", "/repl/", openNewTab=true, margin="10px")
            Helpers.LinkButton("GET STARTED", "/docs/2-steps/setup.html", color=IsInfo, margin="10px")
            Helpers.LinkButton("JOIN FABLECONF!", "/fableconf", color=IsDanger, margin="10px")
        ]
    ]
