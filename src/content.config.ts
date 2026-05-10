import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const publicContent = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/public" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string(),
    status: z.literal("public"),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    language: z.enum(["en", "zh", "ja", "bilingual"]).default("en"),
    translationOf: z.string().optional()
  })
});

export const collections = {
  public: publicContent
};
