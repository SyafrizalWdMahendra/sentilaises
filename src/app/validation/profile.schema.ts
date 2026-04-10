import { z } from "zod";

const brandEnum = z.enum([
  "APPLE",
  "ASUS",
  "ACER",
  "LENOVO",
  "HP",
  "DELL",
  "MSI",
  "AXIOO",
  "ADVAN",
  "ZYREX",
  "OTHER",
]);

const professionEnum = z.enum([
  "PROGRAMMER",
  "STUDENT",
  "GAMER",
  "DESIGNER",
  "OTHER",
]);

const osEnum = z.enum(["WINDOWS", "MACOS", "LINUX", "CHROME_OS", "OTHER"]);

export const profileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  bio: z.string().min(10, "Bio minimal 10 karakter"),
  profession: professionEnum,
  preferredBrand: z.string().min(2, "Merek laptop minimal 2 karakter"),
  preferredOS: osEnum,
  budgetMin: z.coerce
    .number()
    .min(0, "Anggaran minimal harus lebih besar dari 0"),
  budgetMax: z.coerce
    .number()
    .min(0, "Anggaran maksimal harus lebih besar dari anggaran minimal"),
});
