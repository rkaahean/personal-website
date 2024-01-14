---
title: "How I setup my website with Astro"
date: "07/29/2023"
description: "Ditching NextJS, using MDX & more... "
isDraft: false
---

### 1. Introduction

I had previously written my [website](https://github.com/rkaahean/rkaahean.github.io) using NextJS. However, the lack of proper MDX support (At the time of writing, NextJS 13.4.10 had experimental support for MDX) was not ideal.

```typescript
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      experimental: {
        mdxRs: true,
      },
    };

    const withMDX = require("@next/mdx")();
    module.exports = withMDX(nextConfig);
```

I had heard great things about Astro, and the docs were a lot more oriented towards hosting / managing content, so this was a great opportunity for me to learn a new framework.

### 2. Getting Started

The first step is setting up an Astro project - with `npm create astro@latest`. Reading about the project structure [was also helpful](https://docs.astro.build/en/core-concepts/project-structure/).
<br />
The basics

- content: Contains all the blogs or whatever docs to host on the website.
- pages: Contains all the routes. Similar to the pages folder in NextJS.
- layouts: The base structure for the blog / home page. For now I just have a `Layout.astro`, but having a custom `Blog.astro` file can give a unique and consistent look for the blog pages.

### 3. Customizing

The next step was figuring out the blog should look like. I went with a brief description + some of my projects + a blog section to start with. To keep things simple, I just have a `/` page for my website + pages for the blog entries.

### 4. Writing blogs

Astro is really good at handling MDX, so writing blogs is as simple a creating a (markdown) entry in the `content/blog` folder. Its is recommended to a `config.ts`. This is so that Astro can understand the content - i.e [content collections](https://docs.astro.build/en/guides/content-collections/).

<br />

This way, different content types like blogs, newsletters, projects etc., can have a  different structure. For example, this is my `blog` content structure

```typescript
  // zod!
  import { z, defineCollection } from "astro:content";

  // define what properties a blog should have
  const blog = defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.string(),
      description: z.string(),
      isDraft: z.boolean().optional().default(false),
    }),
  });

  // add more collections and export!
  export const collections = {
    blog,
  };
```

Defining the structure of a blog helps to do a some cool stuff: 

- if `isDraft` is set to `true`, the blogs can be hidden until they're done
- order blogs based on the `date`

This can be done by extracting the props in the `BlogRow.astro` page.

```typescript
  const {
    post: {
      data: { title, date, isDraft },
      slug,
    },
  } = Astro.props;
```

For example, when rendering the list of blogs

- Create a component that shows the blog title + date. This is `BlogRow.astro` in my case.
- Extract the props like above, and use them to filter or alter the way the blog is displayed.

In the main `index.astro`, each blog is rendered like it was any react component. The props are the ones defined in the Blog Schema (hence its importance).

```jsx
  const blogs = await getCollection("blog")

  <div>
    {blogs.map((post) => <BlogRow {post} />)}
  </div>
```


### 5. Deploying

[vercel.com](https://vercel.com/dashboard)

<br/>
Anything more is overkill for just starting off. I bought my domain off Google Domains (RIP), but will switch to [Cloudflare](https://www.cloudflare.com/products/registrar/) soon.


### Closing Thoughts

I really liked my first foray into the Astro ecosystem
- its stable, and there is a developed ecosystem around markdown support
- its API's are intuitive and easy to use

I will be using Astro from here on for static sites.