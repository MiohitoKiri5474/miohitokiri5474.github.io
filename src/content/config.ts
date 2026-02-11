import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const usesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heroImage: z.string(),
    draft: z.boolean().optional(),
  }),
});

const recipes = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    notice: z.array(z.string()).optional(),
    blocks: z.array(
      z.object({
        id: z.string(),
        step: z.string().optional(),
        time: z.union([z.number(), z.string()]),
        water: z.union([z.number(), z.string()]),
        notice: z.string().optional(),
      }),
    ),
  }),
});

export const collections = {
  game: blog,
  code: blog,
  uses: usesCollection,
  blog,
  recipes,
};
