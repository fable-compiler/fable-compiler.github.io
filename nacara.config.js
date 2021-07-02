const standardLayouts = require("nacara-layout-standard");
const pageBlog = require("./scripts/blog-page");

const mdMessage = (level) => {

    return {
        validate: function (params) {
            return params.trim() === level;
        },

        render: function (tokens, idx) {
            if (tokens[idx].nesting === 1) {
                // opening tag
                return `<article class="message is-${level}">
                <div class="message-body">`;


            } else {
                // closing tag
                return '</div>\n</article>\n';
            }
        }
    }
}

module.exports = {
    url: "https://fable.io",
    baseUrl: "/",
    editUrl: 'https://github.com/fable-compiler/fable-compiler.github.io/edit/dev/docsrc',
    source: "docsrc",
    output: "deploy",
    title: "Fable",
    version: "2.0.0",
    navbar: {
        showVersion: false,
        links: [
            {
                href: "/docs",
                label: "Documentation"
            },
            {
                href: "https://fable.io/repl/",
                label: "Try"
            },
            {
                href: "/blog/index.html",
                label: "Blog"
            },
            {
                href: "/community.html",
                label: "Community"
            },
            {
                href: "/ressources.html",
                label: "Ressources"
            },
            {
                href: "https://github.com/fable-compiler/fable",
                icon: "fab fa-github",
                isExternal: true,
            },
            {
                href: "https://twitter.com/FableCompiler",
                icon: "fab fa-twitter",
                isExternal: true
            }
        ]
    },
    menu: {
        Introduction: [
            "docs/index",
            "docs/introduction/dotnet-users-read-this",
            "docs/introduction/js-users-read-this"
        ],
        "New to F#?": [
            "docs/new-to-fsharp/learning-the-language",
            "docs/new-to-fsharp/let-keyword"
        ],
        "Fable in 2 steps": [
            "docs/2-steps/setup",
            "docs/2-steps/your-first-fable-project"
        ],
        "Your Fable project": [
            "docs/your-fable-project/project-file",
            "docs/your-fable-project/use-a-fable-library",
            "docs/your-fable-project/author-a-fable-library",
            "docs/your-fable-project/build-and-run",
            "docs/your-fable-project/testing"
        ],
        "Communicate with Javascript": [
            "docs/communicate/js-from-fable",
            "docs/communicate/fable-from-js"
        ],
        "From .NET to Fable": [
            "docs/dotnet/compatibility",
            "docs/dotnet/numbers"
        ],
        "Miscellaneous": [
            "docs/miscellaneous/official-samples",
            "docs/miscellaneous/fable-in-videos"
        ]
    },
    lightner: {
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
        themeFile: "./lightner/themes/customized_OneLight.json",
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
        default: standardLayouts.standard,
        changelog: standardLayouts.changelog,
        navbarOnly: standardLayouts.navbarOnly,
        blogPage: pageBlog.render
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
                path: 'nacara/js/markdown-it-anchored.js'
            }
        ]
    }
};
