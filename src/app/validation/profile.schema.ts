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
  preferredBrand: brandEnum,
  preferredOS: osEnum,
  budgetMin: z.coerce.number().min(0),
  budgetMax: z.coerce.number().min(0),
});
