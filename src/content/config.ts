import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    isDraft: z.boolean().optional().default(false),
    isHidden: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog,
};
