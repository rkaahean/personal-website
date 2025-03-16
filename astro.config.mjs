import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import Link from "./src/components/Link.astro";

export default defineConfig({
  site: "https://ranjan.dev",
  integrations: [react(), tailwind(), mdx()],
  markdown: { shikiConfig: { theme: "dracula" } },
  integrations: [
    mdx({
      components: {
        a: Link,
      },
    }),
  ],
});
