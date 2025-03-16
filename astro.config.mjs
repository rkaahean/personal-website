import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import astroExpressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

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
  ],
  markdown: { shikiConfig: { theme: "dracula" } },
});
