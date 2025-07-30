import z from "zod";

export const messagesSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(120, "Name must be less than 120 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  content: z.string().min(1, "Content is required"),
  userId: z.string().optional(),
});
