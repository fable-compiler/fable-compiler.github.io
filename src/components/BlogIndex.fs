module Components.BlogIndex

open Fable.React
open Fable.React.Props
open Fulma
open Fable.FontAwesome.Free
open Util.Helpers
open Util.Literals
open Util.Types
open GlobalHelpers
open Fable.Core
open Fable.Core.JsInterop
open System

module Authors =
    type Author =
        { Name : string 
          AvatarSrc : string
          Link : string }
    
    let alfonso =
        { Name = "Alfonso García-Caro" 
          AvatarSrc = "https://github.com/alfonsogarciacaro.png"
          Link = "https://twitter.com/alfonsogcnunez" }

    let maxime =
        { Name = "Maxime Mangel"
          AvatarSrc = "https://github.com/mangelMaxime.png"
          Link = "https://twitter.com/MangelMaxime" }

    let zaid =
        { Name = "Zaid-Ajaj"
          AvatarSrc = "https://github.com/Zaid-Ajaj.png"
          Link = "https://twitter.com/zaid_ajaj" }

    let françois =
        { Name = "François Nicaise"
          AvatarSrc = "https://github.com/whitetigle.png"
          Link = "https://twitter.com/thewhitetigle" }

type Post =
    { Title: string
      Abstract: string
      Author: Authors.Author
      Date: DateTime
      FileName: string }
      
let posts = [
    { Title = "Introducting Femto"
      Abstract = "In this blog post, we will introduce a new tool called Femto that will hopefully make the lives of Fable users a lot easier when it comes to the npm packages they depend upon."
      Author = Authors.zaid
      Date = DateTime(2019, 6, 29)
      FileName = "Introducing-Femto.md"
    }
    { Title = "May Announcements"
      Abstract = "Just a very quick post to share with you some of the things that have been happening for the last few weeks in Fable World."
      Author = Authors.alfonso
      Date = DateTime(2019, 5, 20)
      FileName = "2019-May-Announcements.md"
    }
    { Title = "Announcing Fable.React 5"
      Abstract = "Fable.React 5 has just been released with new additions to help write your Fable/Elmish apps with React. Thanks to Julien Roncaglia who has contributed most of the ideas for this release since his talk at latest FableConf, and a big thank you as well to the React team for their great work in the latest releases."
      Author = Authors.alfonso
      Date = DateTime(2019, 4, 16)
      FileName = "Announcing-Fable-React-5.md"
    }
]      

let introText = "Check our blog to be up-to-date with recent developments in Fable community and if you have cool stuff to share (and we're sure you do) [send us a PR](https://github.com/fable-compiler/fable-compiler.github.io/tree/dev/blog) with your post or a link to your personal web."

let renderPost (post: Post) =
    div [ Class "card article" ]
        [ div [ Class "card-content" ]
            [ div [ Class "media" ]
                [ div [ Class "media-center" ]
                    [ img [ Src post.Author.AvatarSrc
                            Class "author-image"
                            Alt "Author avatar" ] ]
                  div [ Class "media-content has-text-centered" ]
                    [ p [ Class "title article-title" ]
                        [ a [ Href (Text.RegularExpressions.Regex.Replace(post.FileName, @"\.md$", ".html")) ]
                            [ str post.Title ] ]
                      p [ Class "subtitle is-6 article-subtitle" ]
                        [ a [ Href post.Author.Link ]
                            [ str post.Author.Name ]
                          str (String.Format(" on {0:dd/MM, yyyy}", post.Date)) ] ] ]
              parseMarkdownAsReactEl "content article-body" post.Abstract
            ]
        ]

// Using template from https://bulmatemplates.github.io/bulma-templates/templates/blog.html
let renderBody (info: PageInfo) =
  // This fixes the problem with the double scrollbar on Windows
  div [ Style [ Overflow "hidden" ] ]
    [ Header.render()
      div [ Class "container blog-index" ]
        [ section [ Class "articles" ]
            [ div [ Class "column is-8 is-offset-2" ]
                  [ yield parseMarkdownAsReactEl "" introText
                    yield! List.map renderPost posts ]
            ]
        ]
    ]
