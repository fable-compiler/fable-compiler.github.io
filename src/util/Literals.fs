namespace Util.Literals

open StaticWebGenerator

module Fable =
  let [<Literal>] Root = "/" //"http://fable.io/"

module Navbar =
  let [<Literal>] Home = Fable.Root
  let [<Literal>] Repl = Fable.Root + "repl"
  let [<Literal>] Blog = Fable.Root + "blog"
  let [<Literal>] Docs = Fable.Root + "docs"
  let [<Literal>] FAQ = Fable.Root + "faq"

  let [<Literal>] FableConf = Fable.Root + "fableconf"
  let [<Literal>] MenuId = "navMenu"

module Paths =
  // Make sure to always resolve paths to avoid conflicts in generated JS files
  // Check fable-splitter README for info about ${entryDir} macro

  let PublicDir = IO.resolve "${entryDir}/../public"
  let DeployDir = IO.resolve "${entryDir}/../deploy"
  let BlogDir = IO.resolve "${entryDir}/../blog"
  let FableRepo = IO.resolve "${entryDir}/../../Fable"
  let SamplesRepo = IO.resolve "${entryDir}/../../samples-browser"

module WebAssets =
  let FableLogo = "/img/fable_logo.png"
