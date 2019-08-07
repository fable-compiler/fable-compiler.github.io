module Components.Header

open Fable.React
open Fable.React.Props
open Fulma
open Util.Literals

type Helpers =
    static member LinkButton(text, href, ?margin, ?color, ?openNewTab) =
        let color = defaultArg color IsSuccess
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
            ] [ str text ]
        ]

let render title subtitle =
    Columns.columns [
        Columns.Props [Style [ Margin "20px 0" ]]
    ] [
        Column.column [
            Column.Width (Screen.All, Column.IsOneQuarter)
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
            Column.Width (Screen.All, Column.IsOneQuarter)
            Column.Props [
                Style [
                    Display DisplayOptions.Flex    
                    FlexDirection "column"
                    AlignItems AlignItemsOptions.Center
                    JustifyContent "center"
                ]
            ]
        ] [
            Helpers.LinkButton("TRY ONLINE", "https://fable.io/repl/", openNewTab=true, margin="10px")
            Helpers.LinkButton("GET STARTED", "https://fable.io/fable-doc/3-steps/setup.html", color=IsInfo, margin="10px")
            Helpers.LinkButton("COME TO FABLECONF!", "https://fable.io/fableconf", color=IsDanger, margin="10px")
        ]
    ]
