import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .regex(/^\+?[\d\s\-().]{7,20}$/, "Invalid phone format (e.g. +1 555-000-0000)"),
  company: z.string().min(2, "Company name is required"),
  status: z.enum(["Active", "Inactive", "Lead"]),
  industry: z.enum([
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Education",
    "Manufacturing",
  ]),
  priority: z.number().min(1).max(5),
  notes: z.string().optional(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
