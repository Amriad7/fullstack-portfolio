import { z } from "zod";

export const settingsSchema = z.object({
  // Website Informations
  title: z
    .string()
    .min(1, "Site title is required")
    .max(120, "Site title must be less than 120 characters"),

  description: z
    .string()
    .min(10, "Site description must be at least 10 characters")
    .max(1200, "Site description must be less than 1200 characters"),

  keywords: z.string().max(1200, "Keywords must be less than 1200 characters"),
  // Personal Profile
  name: z
    .string()
    .min(1, "Name is required")
    .max(120, "Name must be less than 120 characters"),

  role: z
    .string()
    .min(1, "Professional title is required")
    .max(120, "Title must be less than 120 characters"),

  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(1200, "Bio must be less than 1200 characters"),

  // Social Media
  githubUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
  emailUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
});
