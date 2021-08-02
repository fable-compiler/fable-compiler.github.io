const React = require("react");
const e = React.createElement;
const pageMinimal = require("nacara-layout-standard/dist/Page.Minimal");

/**
 *
 * @param {String} imageLink
 * @returns
 */
const renderAuthorImage = (imageLink) => {
    return e("figure",
        {
            className: "image is-96x96 author-image"
        },
        e("img",
            {
                className: "is-rounded",
                src: imageLink
            }
        )
    )
}

/**
 *
 * @param {String} title
 * @returns
 */
const renderTile = (title) => {
    return e("h2",
        {
            className: "title is-size-3 has-text-primary has-text-weight-normal has-text-centered blog-title"
        },
        title
    )
}

/**
 *
 * @param {String} authorName
 * @param {String} authorLink
 * @param {Date} date
 * @returns
 */

const renderAuthorAndDate = (authorName, authorLink, date) => {
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
                href: authorLink
            },
            authorName
        ),
        e("span",
            {
                className: "tag is-rounded is-medium"
            },
            dateFormat.format(date)
        )
    )
}

/**
 * @param {RendererContext} rendererContext
 * @param {PageContext} pageContext
 */
const render = async (rendererContext, pageContext) => {
    const title = pageContext.Attributes.title;
    const author = pageContext.Attributes.author;
    const date = pageContext.Attributes.date;
    const author_link = pageContext.Attributes.author_link;
    const author_image = pageContext.Attributes.author_image;

    const pageContent = await rendererContext.MarkdownToHtml(pageContext.Content)

    const content =
        e("div",
            {
                className: "container",
            },
            e("div",
                {
                    className: "columns",
                },
                e("div",
                    {
                        className: "column is-8-desktop is-offset-2-desktop"
                    },
                    e("div",
                        { className: "section blog-post" },
                        renderAuthorImage(author_image),
                        renderTile(title),
                        renderAuthorAndDate(author, author_link, date),
                        e("div",
                            {
                                className: "content",
                                dangerouslySetInnerHTML: { __html: pageContent }
                            }
                        )
                    )
                ),
                e("script",
                    {
                        src: "/static/nacara_internals/menu.js"
                    }
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
            Name: "fable-blog-page",
            Func: render
        }
    ],
    Dependencies: []
}
