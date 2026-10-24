import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100),
  email: z.email("Enter a valid email address."),
  password: z.string().max(128),
  role: z.enum(["USER", "ADMIN"]),
  interests: z.string(),
});

export type UserFormValues = z.infer<typeof userSchema>;
