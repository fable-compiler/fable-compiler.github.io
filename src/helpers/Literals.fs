namespace WebGenerator.Literals

open WebGenerator.Helpers

module Fable =
  let [<Literal>] Root = "/" //"http://fable.io/"

module Navbar =
  let [<Literal>] Home = Fable.Root
  let [<Literal>] Repl = Fable.Root + "repl"
  let [<Literal>] Samples = Fable.Root + "samples-browser"
  let [<Literal>] Docs = Fable.Root + "docs"

  let [<Literal>] API = Fable.Root + "api"
  let [<Literal>] FableConf = Fable.Root + "fableconf"
  let [<Literal>] MenuId = "navMenu"

module Paths =
  // Make sure to always resolve paths to avoid conflicts in generated JS files
  // Check fable-splitter README for info about ${entryDir} macro

  let Template = resolve "${entryDir}/../files/template.hbs"
  let TemplateRedirect = resolve "${entryDir}/../files/redirect.hbs"
  let PublicDir = resolve "${entryDir}/../public"
  let FableRepo = resolve "${entryDir}/../../Fable"
  let SamplesRepo = resolve "${entryDir}/../../samples-browser"

module WebAssets =
  let FableLogo = "/img/shared/fable_logo.png"
