import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://miohitokiri5474.github.io/",
  integrations: [sitemap(), react(), image(), tailwind(), partytown()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    extendDefaultPlugins: true,
    format: "gfm",
    remarkOptions: {
      breaks: true
    }
  }
});