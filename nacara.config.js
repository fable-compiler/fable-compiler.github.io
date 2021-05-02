const standard = require('nacara/dist/layouts/standard/Export').default;
const mdMessage = require('nacara/dist/js/utils').mdMessage;
const path = require('path');

module.exports = {
    url: "https://fable.io",
    baseUrl: "/docs/",
    editUrl: 'https://github.com/fable-compiler/fable-compiler.github.io/edit/dev/docsrc',
    source: "docsrc",
    output: "./deploy/docs",
    title: "Fable",
    version: "2.0.0",
    navbar: {
        showVersion: false,
        links: [
            {
                href: "https://fable.io/repl/",
                label: "Try online"
            },
            {
                href: "https://gitter.im/fable-compiler/Fable",
                label: "Chat",
                icon: "fab fa-gitter",
                isExternal: true,
                color: "#24292e"
            },
            {
                href: "https://github.com/fable-compiler/fable",
                icon: "fab fa-github",
                isExternal: true,
                color: "#24292e"
            },
            {
                href: "https://twitter.com/FableCompiler",
                icon: "fab fa-twitter",
                isExternal: true,
                color: "#55acee"
            }
        ]
    },
    menu: {
        Introduction: [
            "index",
            "introduction/net-users-read-this",
            "introduction/js-users-read-this"
        ],
        "New to F#?": [
            "new-to-fsharp/learning-the-language",
            "new-to-fsharp/let-keyword"
        ],
        "Fable in 2 steps": [
            "2-steps/setup",
            "2-steps/your-first-fable-project"
        ],
        "Your Fable project": [
            "your-fable-project/project-file",
            "your-fable-project/use-a-fable-library",
            "your-fable-project/author-a-fable-library",
            "your-fable-project/build-and-run",
            "your-fable-project/testing"
        ],
        "Communicate with Javascript": [
            "communicate/js-from-fable",
            "communicate/fable-from-js"
        ],
        "From .NET to Fable": [
            "dotnet/compatibility",
            "dotnet/numbers"
        ],
        "Miscellaneous": [
            "miscellaneous/official-samples",
            "miscellaneous/awesome-list",
            "miscellaneous/fable-in-videos"
        ]
    },
    lightner: {
        backgroundColor: "#FAFAFA",
        textColor: "",
        themeFile: "./lightner/themes/OneLight.json",
        grammars: [
            "./lightner/grammars/fsharp.json",
            "./lightner/grammars/JSON.tmLanguage.json",
            "./lightner/grammars/xml.tmLanguage.json",
            "./lightner/grammars/JavaScript.tmLanguage.json",
            "./lightner/grammars/TypeScript.tmLanguage.json",
            "./lightner/grammars/html.tmLanguage.json",
            "./lightner/grammars/shell-unix-bash.tmLanguage.json"
        ]
    },
    layouts: {
        default: standard.Default,
        changelog: standard.Changelog
    },
    plugins: {
        markdown: [
            {
                path: 'markdown-it-container',
                args: [
                    'warning',
                    mdMessage("warning")
                ]
            },
            {
                path: 'markdown-it-container',
                args: [
                    'info',
                    mdMessage("info")
                ]
            },
            {
                path: 'markdown-it-container',
                args: [
                    'success',
                    mdMessage("success")
                ]
            },
            {
                path: 'markdown-it-container',
                args: [
                    'danger',
                    mdMessage("danger")
                ]
            },
            {
                path: 'nacara/dist/js/markdown-it-anchored.js'
            },
            {
                path: 'nacara/dist/js/markdown-it-toc.js'
            }
        ]
    }
};
