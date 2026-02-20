import prisma from "@/lib/prisma";
import { ProfileFormData } from "../types";

export const updateProfileService = async (formData: ProfileFormData) => {
  const response = await fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify(formData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result;
};

export const userService = {
  async getProfileByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        preference: {
          select: {
            preferredBrand: true,
            preferredOS: true,
            profession: true,
            budgetMax: true,
            budgetMin: true,
          },
        },
      },
    });

    return user;
  },

  async updateProfileByEmail(email: string, data: ProfileFormData) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) return null;

    const budgetMin = data.budgetMin ? Number(data.budgetMin) : null;
    const budgetMax = data.budgetMax ? Number(data.budgetMax) : null;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        bio: data.bio,
        preference: {
          upsert: {
            update: {
              profession: data.profession,
              preferredBrand: data.preferredBrand,
              preferredOS: data.preferredOS,
              budgetMin,
              budgetMax,
            },
            create: {
              profession: data.profession,
              preferredBrand: data.preferredBrand,
              preferredOS: data.preferredOS,
              budgetMin,
              budgetMax,
            },
          },
        },
      },
      include: {
        preference: true,
      },
    });

    return updatedUser;
  },
};
