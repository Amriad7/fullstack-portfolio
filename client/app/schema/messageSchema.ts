import z from "zod";

export const messageSchema = z.object({
  name: z
    .string("Name is required")
    .min(1, "Name is required")
    .max(120, "Name must be less than 120 characters"),
  email: z
    .string("Email is required")
    .email("Please enter a valid email address"),
  content: z
    .string("Message is required")
    .min(10, "Message must be at least 10 characters"),
  userId: z.string().optional(),
});
