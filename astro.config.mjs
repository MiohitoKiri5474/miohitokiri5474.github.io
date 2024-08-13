import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import remarkGfm from "remark-gfm";

// https://astro.build/config
export default defineConfig({
  site: "https://miohitokiri5474.github.io/",
  integrations: [sitemap(), react(), image(), tailwind()],
  markdown: {
    // remarkPlugins: [remarkGfm],
    // extendDefaultPlugins: true,
    remarkPlugins: [],
    extendDefaultPlugins: true,
    // Enable soft line breaks globally
    format: "gfm", // GitHub Flavored Markdown
    remarkOptions: {
      breaks: true,
    },
  },
});
