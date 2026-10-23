// The docs and the developers' pages: Markdown in src/content, each with a
// title, a one-sentence description and its place in its section's list.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const page = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
});

export const collections = {
  docs: defineCollection({ loader: glob({ pattern: "*.md", base: "src/content/docs" }), schema: page }),
  developers: defineCollection({ loader: glob({ pattern: "*.md", base: "src/content/developers" }), schema: page }),
};
