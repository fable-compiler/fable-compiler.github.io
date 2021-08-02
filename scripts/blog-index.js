const React = require("react");
const e = React.createElement;
const pageMinimal = require("nacara-layout-standard/dist/Page.Minimal");

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
                src: blogPage.Attributes.author_image
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
        "/" + blogPage.RelativePath.substring(0, blogPage.RelativePath.lastIndexOf('.') + 1) + "html"

    // Use / for the URL and not \ needed when generating the blog from Windows
    internalLink = internalLink.replace(/\\/g, "/")

    const link =
        (blogPage.Attributes.external_link != null) ?
            blogPage.Attributes.external_link : internalLink;

    return e("h2",
        {
            className: "title is-size-3 has-text-weight-normal blog-title"
        },
        e("a",
            {
                href: link
            },
            blogPage.Attributes.title,
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
                href: blogPage.Attributes.author_link
            },
            blogPage.Attributes.author
        ),
        e("span",
            {
                className: "tag is-rounded is-medium"
            },
            dateFormat.format(blogPage.Attributes.date)
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

const renderAbstract = async (rendererContext, blogPage) => {
    const content = await rendererContext.MarkdownToHtml(blogPage.Attributes.abstract)

    return e("div",
        {
            className: "content m-6 is-size-5 has-text-weight-light",
            dangerouslySetInnerHTML: { __html: content }
        }
    )
}

const renderBlogAbstract = async (rendererContext, blogPage) => {
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
                await renderAbstract(rendererContext, blogPage)
        )
    )
}

const render = async (rendererContext, pageContext) => {
    // Note the blog-index page doesn't have any markdown renderer because all of it's content
    // is generated from the frontmatter information coming from the blog-page files

    const blogPages =
        rendererContext.Pages
            // Filter out the blog-page files
            .filter((pageContext) => {
                return pageContext.Layout === "fable-blog-page"
            })
            // Sort the blog-page files by date (newest first)
            .sort((pageContext1, pageContext2 ) => {
                return pageContext2.Attributes.date - pageContext1.Attributes.date
            });

    let blogAbstractElements = [];

    for (const blogPage of blogPages) {
        const blogAbstractElement = await renderBlogAbstract(rendererContext, blogPage)
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

    return pageMinimal.render(new pageMinimal.RenderArgs(
        rendererContext.Config,
        pageContext.Section,
        undefined,
        content
    ));
}

export default {
    Renderers: [
        {
            Name: "fable-blog-index",
            Func: render
        }
    ],
    Dependencies: []
}
