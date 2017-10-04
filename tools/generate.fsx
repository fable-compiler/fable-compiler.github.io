#load "../packages/build/FSharp.Formatting/FSharp.Formatting.fsx"
#I "../packages/build/FAKE/tools/"
#r "FakeLib.dll"
open Fake
open System.IO
open Fake.FileHelper
open FSharp.Literate
open FSharp.MetadataFormat

type BinaryInfo = {
  file: string
  folder: string
}

let root = __SOURCE_DIRECTORY__ @@ "../"
let fablePath = root @@ "../Fable"
let baseFolder = fablePath @@ "src/dotnet/"

let formatting = root @@ "packages/build/FSharp.Formatting/"

let binaries = [
    "Fable.Core/bin/Release/netstandard1.6/Fable.Core.dll"
    // "Fable.Compiler/bin/Release/netstandard1.6/Fable.Compiler.dll"
    // "../../build/json-converter/Fable.JsonConverter.dll"
]

let output = root @@ "/public/api"
let templates = __SOURCE_DIRECTORY__ @@ "templates"
let githubLink = "https://github.com/fable-compiler/Fable"


let info =
  [ "project-name", "Fable"
    "project-author", "Alfonso Garcia-Caro"
    "project-summary", ""
    "project-github", githubLink
    "project-nuget", "http://nuget.org/packages/Fable.Core" ]

let docVersionFile = __SOURCE_DIRECTORY__ @@ ".version"
let docVersion =
  try
    ReadFileAsString docVersionFile
  with
  | _ -> ""
let gitVersion =
  ExecProcessAndReturnMessages (
    fun p ->
      p.Arguments <- "log -n 1"
      p.FileName <- "git"
      p.UseShellExecute <- false
      p.WorkingDirectory <- fablePath)
    System.TimeSpan.MaxValue
  |> (fun r ->
        if r.ExitCode <> 0 then
          failwithf "Error occurred when get git version of fable: %A" r.Errors

        r.Messages.Find (
          fun s ->
            s.Trim().StartsWith("commit "))
        |> replace "commit " "")

let buildFable() =
  ExecProcessAndReturnMessages (
    fun p ->
      p.UseShellExecute <- false
      p.FileName <- fablePath @@ (
        if isMono then "build.sh" else "build.cmd")
      p.WorkingDirectory <- fablePath)
    System.TimeSpan.MaxValue
  |> (fun ret ->
      if ret.ExitCode <> 0
      then failwithf "Build Fable Failed: %A" ret.Errors)

let buildAPI () =
  // NOTICE: Building fable takes too long, its better to run manually with better log support.
  // if List.forall
  //     (fun bin -> baseFolder @@ bin |> File.Exists) binaries
  //   |> not || docVersion <> gitVersion then
  //   buildFable()
  binaries
  |> List.map (
    fun bin ->
      async {
        let dllFile = baseFolder @@ bin
        let outputFolder = output @@ (filename bin |> replace ".dll" "")
        ensureDirectory outputFolder
        let libDirs = [
          dllFile |> directory
        ]
        let () = MetadataFormat.Generate (
                    dllFile,
                    outputFolder,
                    [templates
                     formatting @@ "templates"
                     formatting @@ "templates/reference" ],
                    parameters = ("root", "./../")::info,
                    sourceRepo = githubLink @@ "tree/master",
                    moduleTemplate = __SOURCE_DIRECTORY__ @@ "templates/module.cshtml",
                    sourceFolder = fablePath,
                    publicOnly = true, libDirs = libDirs)
        ()
      }
  )
  |> Async.Parallel
  |> Async.RunSynchronously
  |> ignore

printfn "Docs version: %s  Fable version: %s" docVersion gitVersion
if gitVersion <> docVersion then
  buildAPI()
  WriteStringToFile false docVersionFile gitVersion
else
  printfn "Skipping generate API docs since it is already up-to-date."
