import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://miohitokiri5474.github.io/",
  integrations: [
    sitemap({
      // Exclude non-content utility pages from the sitemap
      filter: (page) =>
        !page.includes("/search/") &&
        !page.includes("/bubbles/"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Give the homepage and post listing higher priority
        if (
          item.url === "https://miohitokiri5474.github.io/" ||
          item.url === "https://miohitokiri5474.github.io/post/"
        ) {
          item.priority = 1.0;
          item.changefreq = "daily";
        }
        return item;
      },
    }),
    react(),
    image(),
    tailwind(),
    partytown(),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkBreaks],
    rehypePlugins: [rehypeKatex],
  }
});