import z from "zod";

export const analyzeSchema = z.object({
  url1: z.string().min(10, "Tautan 1 minimal 10 karakter"),
  url2: z.string().min(10, "Tautan 2 minimal 10 karakter"),
  url3: z.string().optional().or(z.literal("")),
  url4: z.string().optional().or(z.literal("")),
});
