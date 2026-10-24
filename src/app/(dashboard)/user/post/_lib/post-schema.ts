import { z } from "zod";

export const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(200),
  content: z.string().trim().min(1, "Content is required.").max(50_000),
});

export type PostFormValues = z.infer<typeof postSchema>;
