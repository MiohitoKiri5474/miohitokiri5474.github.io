import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://miohitokiri5474.github.io/",
  base: "/action-blog",
  integrations: [mdx(), sitemap(), react(), image(), tailwind()],
});
