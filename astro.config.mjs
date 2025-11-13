import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkReadingTime } from "./src/remark-reading-time.mjs";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://ranjan.dev",
  integrations: [
    astroExpressiveCode({
      themes: ["solarized-light"],
    }),
    tailwind(),
    react(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: { theme: "dracula" },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: { className: "heading-link" },
          content: {
            type: "text",
            value: "# ",
          },
          test: ["h2"],
        },
      ],
    ],
  },
});
