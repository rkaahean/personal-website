import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    isDraft: z.boolean().optional().default(false),
    isHidden: z.boolean().optional().default(false),
  }),
});

const noteCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  note: noteCollection,
};
