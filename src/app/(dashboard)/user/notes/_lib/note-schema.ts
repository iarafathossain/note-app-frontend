import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(100),
  content: z.string().trim().min(1, "Content is required.").max(1000),
});

export type NoteFormValues = z.infer<typeof noteSchema>;
