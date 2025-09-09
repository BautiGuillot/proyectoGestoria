import { defineCollection, z } from "astro:content";
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  // type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    slug: z.string(),
    image: z.string().optional(),
    caption: z.string().optional(),
  }),
});

export const collections = {
  blog,
};
