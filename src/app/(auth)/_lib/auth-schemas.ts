import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
    email: z.email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters.").max(128),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
