const standardLayouts = require("nacara-layout-standard");
const React = require("react");
const e = React.createElement;
const fs = require("fs").promises;
const path = require("path");
const frontMatter = require("front-matter")
const md = require('markdown-it')({
    html: true
});

/**
 *
 * @param {String} imageLink
 * @returns
 */
const renderAuthorImage = (blogPage) => {
    return e("figure",
        {
            className: "image is-96x96 author-image"
        },
        e("img",
            {
                className: "author-image is-rounded",
                src: blogPage.attributes.author_image
            }
        )
    )
}

/**
 *
 * @param {String} title
 * @returns
 */
const renderTile = (blogPage) => {

    // Add leading / + change file extension
    let internalLink =
        "/" + blogPage.path.substring(0, blogPage.path.lastIndexOf('.') + 1) + "html"

    // Use / for the URL and not \ needed when generating the blog from Windows
    internalLink = internalLink.replace(/\\/g, "/")

    const link =
        (blogPage.attributes.external_link != null) ?
            blogPage.attributes.external_link : internalLink;

    return e("h2",
        {
            className: "title is-size-3 has-text-weight-normal blog-title"
        },
        e("a",
            {
                href: link
            },
            blogPage.attributes.title,
        )
    )
}

const renderAuthorAndDate = (blogPage) => {
    const dateFormat =
        new Intl.DateTimeFormat(
            "en",
            {
                dateStyle: "long"
            }
        );

    return e("div",
        {
            className: "tags has-addons is-justify-content-center",
        },
        e("a",
            {
                className: "tag is-rounded is-medium is-primary",
                href: blogPage.attributes.author_link
            },
            blogPage.attributes.author
        ),
        e("span",
            {
                className: "tag is-rounded is-medium"
            },
            dateFormat.format(blogPage.attributes.date)
        )
    )
}

const renderTitleAndAuthorDateTag = (blogPage) => {
    return e("div",
        {
            className: "media-content mt-6 has-text-centered",
        },
        renderTile(blogPage),
        renderAuthorAndDate(blogPage)
    )
}

const renderPageHeader = () => {
    const fableLogo = e("figure",
        {
            className: "imagie mx-auto",
            style: {
                maxWidth: "200px"
            }
        },
        e("img",
            {
                src: "/static/img/fable_logo.png"
            }
        )
    )

    const prelude = e("div",
        {
            className: "content is-size-5 has-text-weight-light mt-4"
        },
        "Check our blog to be up-to-date with recent developments in Fable community and if you have cool stuff to share (and we're sure you do) ",
        e("a",
            {
                href: "https://github.com/fable-compiler/fable-compiler.github.io/tree/dev/blog"
            },
            "send us a PR "
        ),
        "with your post or a link to your personal web."
    )

    return e("div",
        {
            className: "columns",
        },
        e("div",
            {
                className: "column is-8 is-offset-2",
            },
            e("section",
                {
                    className: "section"
                },
                fableLogo,
                prelude
            )
        )
    )
}

const getFiles = async (model, rootDirectory) => {
    let filesAcc = [];

    const directoryForRelativePath = path.join(rootDirectory, "..")

    const iterateDirectory = async (directory) => {
        const files = await fs.readdir(directory);

        for (const file of files) {
            const absoluteFilepath = path.join(directory, file)
            const stats = await fs.stat(absoluteFilepath);
            if (stats.isDirectory()) {
                await iterateDirectory(absoluteFilepath);
            } else {
                const pageContent = await fs.readFile(absoluteFilepath);
                const fm = frontMatter(pageContent.toString())

                filesAcc.push({
                    absoluteFilepath: absoluteFilepath,
                    path: path.relative(directoryForRelativePath, absoluteFilepath),
                    attributes: fm.attributes
                });
            }
        }
    }

    await iterateDirectory(rootDirectory);

    return filesAcc;
}

const renderAbstract = (blogPage) => {
    const content = md.render(blogPage.attributes.abstract)

    return e("div",
        {
            className: "content m-6 is-size-5 has-text-weight-light",
            dangerouslySetInnerHTML: { __html: content }
        }
    )
}

const renderBlogAbstract = async (blogPage) => {
    return e("div",
        {
            className: "card article",
        },
        e("div",
                {
                    className: "card-content"
                },
                e("div",
                    {
                        className: "media"
                    },
                    renderAuthorImage(blogPage),
                    renderTitleAndAuthorDateTag(blogPage)
                ),
                renderAbstract(blogPage)
        )
    )
}

export const render = async (model, initialPageContext) => {
    const pageContext =
        await standardLayouts.processMarkdown(model, initialPageContext)

    const blogDirectory =
        path.dirname(pageContext.Path);

    const blogDirectoryAbsolute =
        path.join(model.WorkingDirectory, blogDirectory)

    let blogPages = await getFiles(model, blogDirectoryAbsolute);
    blogPages = blogPages.filter((file) => {
        return file.absoluteFilepath != path.join(blogDirectoryAbsolute, "index.md")
    })

    // Sort from newest to oldest blog post
    blogPages.sort((page1, page2) => {
        return page2.attributes.date - page1.attributes.date;
    })

    // const sortedBlogPages = await sortBlogPart(files);

    // console.log(sortedBlogPages);

    let blogAbstractElements = [];

    for (const blogPage of blogPages) {
        const blogAbstractElement = await renderBlogAbstract(blogPage)
        blogAbstractElements.push(blogAbstractElement)
    }

    const content =
        e("div",
            {
                className: "container blog-page",
            },
            renderPageHeader(),
            e("div",
                {
                    className: "columns",
                },
                e("div",
                    {
                        className: "column is-8 is-offset-2"
                    },
                    React.Children.toArray(blogAbstractElements)
                )
            )
    );

    return standardLayouts.basePage(model, null, content);
}
