import z from "zod";

// const brandEnum = z.enum([
//   "APPLE",
//   "ASUS",
//   "ACER",
//   "LENOVO",
//   "HP",
//   "DELL",
//   "MSI",
//   "AXIOO",
//   "ADVAN",
//   "ZYREX",
//   "OTHER",
// ]);

const professionEnum = z.enum([
  "PROGRAMMER",
  "STUDENT",
  "GAMER",
  "DESIGNER",
  "OTHER",
]);

export const analyzeSchema = z.object({
  profession: professionEnum,
//   brands: brandEnum,
  url1: z.string().min(10, "Tautan 1 minimal 10 karakter"),
  url2: z.string().min(10, "Tautan 2 minimal 10 karakter"),
  url3: z.string().optional().or(z.literal("")),
});
