module Components.Frame

open Fable.React
open Fable.React.Props
open Fulma

let cssLink path =
    link [ Rel "stylesheet"
           Type "text/css"
           Href path ]

let jsLink path =
    script [Src path] []

let burgerJsCode = """
document.addEventListener('DOMContentLoaded', function () {
  // burger
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});"""

let render titleText navbar contents =
    html [] [
        head [] [
            title [] [str titleText]
            meta [ HTMLAttr.Custom ("httpEquiv", "Content-Type")
                   HTMLAttr.Content "text/html; charset=utf-8" ]
            meta [ Name "viewport"
                   HTMLAttr.Content "width=device-width, initial-scale=1" ]
            cssLink "https://fonts.googleapis.com/css?family=Josefin+Sans:400,300,600,700|Roboto+Mono|Fira+Code|Open+Sans:400,300,600,700"
            jsLink "https://kit.fontawesome.com/f1c8a90b9d.js"
            cssLink "/css/styles.css"
            cssLink "/css/prism.css" // Code highlighting
            link [ Rel "shortcut icon"
                   Href "/img/fable.ico" ]
        ]
        body [] [
            navbar
            contents
            footer [
              Style [
                BackgroundColor "dodgerblue"
              ]
            ] [ 
              Content.content [] [
                p [] [
                  str "Fable "
                  a [ Href "https://github.com/fable-compiler/Fable" ]
                    [ str "source code" ]
                  str " is licensed "
                  a [ Href "http://opensource.org/licenses/mit-license.php" ]
                    [ str "MIT" ]
                  str "."
            ] ] ]
            // Activate navbar burget button
            script [DangerouslySetInnerHTML { __html = burgerJsCode }] []
        ]
    ]
