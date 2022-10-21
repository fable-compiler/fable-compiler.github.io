import React from "react";
import * as pageMinimal from "nacara-layout-standard/dist/Page.Minimal.js";
import { rehypePlugins, remarkPlugins } from "nacara-layout-standard/dist/Page.Standard.js";

const AuthorImage = ({ imageLink }) => {
    return <figure className="image is-96x96 author-image">
        <img className="is-rounded" src={imageLink} />
    </figure>
}

const BlogTitle = ({ title }) => {
    return <h2 className="title is-size-3 has-text-primary has-text-weight-normal has-text-centered blog-title">
        {title}
    </h2>
}

const AuthorAndDate = ({ authorName, authorLink, date }) => {
    const dateFormat =
        new Intl.DateTimeFormat(
            "en",
            {
                dateStyle: "long"
            }
        );

    return <div className="tags has-addons is-justify-content-center">
        <a className="tag is-rounded is-medium is-primary" href={authorLink}>
            {authorName}
        </a>
        <span className="tag is-rounded is-medium">
            {dateFormat.format(date)}
        </span>
    </div>
}

const PageContainer = ({pageContext, pageContent}) => {
    const title = pageContext.Attributes.title;
    const author = pageContext.Attributes.author;
    const date = pageContext.Attributes.date;
    const author_link = pageContext.Attributes.author_link;
    const author_image = pageContext.Attributes.author_image;

    return <div className="container">
        <div className="columns">
            <div className="column is-8-desktop is-offset-2-desktop">
                <div className="section blog-post">
                    <AuthorImage imageLink={author_image} />
                    <BlogTitle title={title} />
                    <AuthorAndDate authorName={author} authorLink={author_link} date={date} />
                    <div className="content" dangerouslySetInnerHTML={{__html: pageContent}} />
                </div>
            </div>
        </div>
    </div>
}

const render = async (rendererContext, pageContext) => {
    const title = pageContext.Attributes.title;
    const author = pageContext.Attributes.author;
    const date = pageContext.Attributes.date;
    const author_link = pageContext.Attributes.author_link;
    const author_image = pageContext.Attributes.author_image;

    const pageContent =
        await rendererContext.MarkdownToHtml(
            pageContext.Content,
            pageContext.RelativePath,
            remarkPlugins,
            rehypePlugins
        );

    return pageMinimal.render(
        rendererContext,
        pageContext,
        <PageContainer pageContext={pageContext} pageContent={pageContent} />
    );

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
