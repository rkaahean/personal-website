import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://ranjan.dev",
  integrations: [react(), tailwind(), mdx()],
  markdown: { shikiConfig: { theme: "dracula" } },
});
