# [Fable website](http://fable.io) generator

This project generates the static web pages for the [Fable website](http://fable.io).

> If you've trouble building some native dependencies (like oniguruma) on your system, check the [requirements for node-gyp installation](https://github.com/nodejs/node-gyp#installation).

## How to contribute?

All the content of the website is located under the `docs` folder, so if you are looking.

## Architecture

```
docs
├── blog                Contains the blog posts
├── community.md        Page listing the different places where people can regroup, ask for help
├── docs                Contains the documentation section
├── index.md            Index of the website
├── resources.md        Community driven list of useful Fable tutorials, libraries and software.
├── static              Static resource like images, etc.
├── scss                Components use by style.scss
└── style.scss          Main entry for styling the website
```

## Code highlighting

Is done using [gatsby-remark-vscode](https://github.com/andrewbranch/gatsby-remark-vscode/) plugins.

Note: NPM complains about security warnings, unfortunaly the gatbsy teams is not really interested in upgrading their dependencies.

Because the package are only used for static website execution, we consider it "ok" for now. But a standalone plugin is in the progress in order to remove this dependency.

## How to add a blog post?

Blog posts are located under the `docs/blog` folder.

1. Add your file following this convention `docs/blog/YYYY/YYYY-MM-DD-your blog post.md`

    - `YYYY` represents the year
    - `YYYY-MM-DD` is the date of creation of your blog post

    This helps organize the contents and quickly find a blog post if needed for editing it.

2. Adding the following front-matter at the top of your file

    ```yaml
    ---
    layout: fable-blog-page
    title:
    author:
    date:
    author_link:
    author_image:
    # external_link:
    abstract: |
        Announcing the official release of Feliz and what it means for the Fable community.
    ---
    ```

    Properties descriptions:

    | Property | Required | Description |
    |---|:---:|---|
    | layout | X | Should always be `fable-blog-page` |
    | title | X | The title of your blog post |
    | author | X | The author name |
    | date | X | Date of the blog post |
    | author_link | X | A link to your Twitter or Github profile |
    | author_image | X | A link to a picture of you |
    | external_link | | Optional: If your blog post is not hosted on Fable.io website, put the link to it here |
    | abstract | X | The abstract of your blog post, it will be used on the blog index page to introduce your blog post. **You can use markdown** here if you need |

    *Example:*

    ```yaml
    ---
    title: Migration to Fable 2
    layout: fable-blog-page
    author: Mangel Maxime
    date: 2018-10-01
    author_link: https://twitter.com/MangelMaxime
    author_image: https://github.com/MangelMaxime.png
    # external_link:
    abstract: |
        With this document we are going to convert a Fable 1 project into a Fable 2 project. This guide has been written by converting Fulma.Minimal template from Fable 1 to Fable 2.
    ---
    ```

3. Write your blog post under the front-matter section. The index page will automatically updates itself based on the information your provided

## Note for the maintainers

The custom layout for the blog index and blog pages are at:

- `./scripts/blog-index.jsx`
- `./scripts/blog-page.jsx`

If you need to customize the layout or fix something, that's the place to go.

If there is a bug on another page, then the issue should be reported on [Nacara](https://github.com/MangelMaxime/Nacara) repository as it is the one hosted the "standard" layout.

### How to test locally ?

1. `npm install`
2. `npm run watch`
3. Go to `http://localhost:8080/`

### How to deploy ?

Deployment should be done automatically when pushing to `dev` branch.

If the CI is broken, you can manually deploy it by running `npm run deploy`.
