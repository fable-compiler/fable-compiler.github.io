const standardLayouts = require("nacara-layout-standard");
const React = require("react");
const e = React.createElement;

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

export const render = (model, pageContext) => {
    return new Promise((resolve, reject) => {
        console.log(pageContext.FrontMatter);
        const title = pageContext.FrontMatter.title;
        const author = pageContext.FrontMatter.author;
        const date = pageContext.FrontMatter.date;
        const author_link = pageContext.FrontMatter.author_link;
        const author_image = pageContext.FrontMatter.author_image;

        standardLayouts
            .processMarkdown(model, pageContext)
            .then((pageContext) => {

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
                                            dangerouslySetInnerHTML: { __html: pageContext.Content }
                                        }
                                    )
                            )
                        )
                    )
                );

                resolve(standardLayouts.basePage(model, pageContext.Attributes.Title, content));
            })
            .catch((error) => {
                console.error(error);
            });
    });
}
