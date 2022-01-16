import React from "react";
import * as pageMinimal from "nacara-layout-standard/dist/Page.Minimal.js";

const AuthorImage = ({blogPage}) => {
    return <figure className="image is-96x96 author-image">
        <img className="author-image is-rounded" src={blogPage.Attributes.author_image} />
    </figure>
}

const PageTile = ({blogPage}) => {

    // Add leading / + change file extension
    let internalLink =
        "/" + blogPage.RelativePath.substring(0, blogPage.RelativePath.lastIndexOf('.') + 1) + "html"

    // Use / for the URL and not \ needed when generating the blog from Windows
    internalLink = internalLink.replace(/\\/g, "/")

    const link =
        (blogPage.Attributes.external_link != null) ?
            blogPage.Attributes.external_link : internalLink;

    return <h2 className="title is-size-3 has-text-weight-normal blog-title">
        <a href={link}>
            {blogPage.Attributes.title}
        </a>
    </h2>
}

const AuthorAndDate = ({blogPage}) => {
    const dateFormat =
        new Intl.DateTimeFormat(
            "en",
            {
                dateStyle: "long"
            }
        );

    return <div className="tags has-addons is-justify-content-center">
        <a className="tag is-rounded is-medium is-primary" href={blogPage.Attributes.author_link}>
            {blogPage.Attributes.author}
        </a>
        <span className="tag is-rounded is-medium">
            {dateFormat.format(blogPage.Attributes.date)}
        </span>
    </div>
}

const TitleAndAuthorDateTag = ({blogPage}) => {
    return <div className="media-content mt-6 has-text-centered">
        <PageTile blogPage={blogPage} />
        <AuthorAndDate blogPage={blogPage} />
    </div>
}

const PageHeader = () => {
    return <div className="columns">
        <div className="column is-8 is-offset-2">
            <section className="section">
                <figure className="image mx-auto" style={{maxWidth: "200px"}}>
                    <img src="/static/img/fable_logo.png" />
                </figure>
                <div className="content is-size-5 has-text-weight-light mt-4">
                    Check our blog to be up-to-date with recent developments in Fable community and if you have cool stuff to share (and we're sure you do)
                    <a href="https://github.com/fable-compiler/fable-compiler.github.io/tree/dev/blog">
                        send us a PR
                    </a>
                    with your post or a link to your personal web.
                </div>
            </section>
        </div>
    </div>
}

const BlogAbstract = ({blogPage}) => (
    <div className="card article">
        <div className="card-content">
            <div className="media">
                <AuthorImage blogPage={blogPage} />
                <TitleAndAuthorDateTag blogPage={blogPage} />
            </div>
            <div className="content m-6 is-size-5 has-text-weight-light"
                dangerouslySetInnerHTML={{ __html: blogPage.Attributes.abstractText }} />
        </div>
    </div>
)

const PageContainer = ({blogPages}) => (
    <div className="container blog-page">
        <PageHeader />
        <div className="columns">
            <div className="column is-8 is-offset-2">
                {blogPages.map((blogPage, index) => {
                    return <BlogAbstract key={index} blogPage={blogPage} />
                })}
            </div>
        </div>
    </div>
)

const render = async (rendererContext, pageContext) => {
    // Note the blog-index page doesn't have any markdown renderer because all of it's content
    // is generated from the frontmatter information coming from the blog-page files

    let blogPages =
        rendererContext.Pages
            // Filter out the blog-page files
            .filter((pageContext) => {
                return pageContext.Layout === "fable-blog-page"
            })
            // Sort the blog-page files by date (newest first)
            .sort((pageContext1, pageContext2 ) => {
                return pageContext2.Attributes.date - pageContext1.Attributes.date
            });

    // Pre-process the blog-page files here, so we can use standard JSX afterwards
    for (const blogPage of blogPages) {
        const abstractText =
            await rendererContext.MarkdownToHtml(
                blogPage.Attributes.abstract,
                blogPage.RelativePath
            );
        blogPage.Attributes.abstractText = abstractText;
    }

    return pageMinimal.render(
        rendererContext,
        pageContext,
        <PageContainer blogPages={blogPages} />
    );
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
