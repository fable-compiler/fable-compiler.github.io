module Components.Frame

open Fable.Helpers.React
open Fable.Helpers.React.Props

let cssLink path =
    link [ Rel "stylesheet"
           Type "text/css"
           Href path ]

let burgerJsCode = """
document.addEventListener('DOMContentLoaded', function () {
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

let render titleText extraCss navbar contents =
    html [] [
        head [] [
            yield title [] [str titleText]
            yield meta [ HTMLAttr.Custom ("httpEquiv", "Content-Type")
                         HTMLAttr.Content "text/html; charset=utf-8" ]
            yield meta [ Name "viewport"
                         HTMLAttr.Content "width=device-width, initial-scale=1" ]
            yield cssLink "https://fonts.googleapis.com/css?family=Josefin+Sans:400,300,600,700|Roboto+Mono"
            yield cssLink "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            yield cssLink "/css/styles.css"
            for css in extraCss do
                yield cssLink css
            yield link [ Rel "shortcut icon"
                         Href "/img/fable.ico" ]
        ]
        body [] [
            navbar
            contents
            footer [] [ p [] [
                str "Fable "
                a [ Href "https://github.com/fable-compiler/Fable" ]
                  [ str "source code" ]
                str " is licensed "
                a [ Href "http://opensource.org/licenses/mit-license.php" ]
                  [ str "MIT" ]
                str "."
            ] ]
            // Activate navbar burget button
            script [DangerouslySetInnerHTML { __html = burgerJsCode }] []
        ]
    ]
