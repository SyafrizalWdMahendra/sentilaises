import prisma from "@/lib/prisma";
import { ProfileFormData } from "../types";
import { profilePath } from "../utils/const";

export const updateProfileService = async (formData: ProfileFormData) => {
  const response = await fetch(profilePath, {
    method: "PATCH",
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
            brand: {
              select: {
                name: true,
              },
            },
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
            where: { userId: user.id },
            update: {
              profession: data.profession,
              preferredOS: data.preferredOS,
              budgetMin,
              budgetMax,
              brand: {
                connectOrCreate: {
                  where: { name: data.preferredBrand },
                  create: { name: data.preferredBrand },
                },
              },
            },
            create: {
              profession: data.profession,
              preferredOS: data.preferredOS,
              budgetMin,
              budgetMax,
              brand: {
                connectOrCreate: {
                  where: { name: data.preferredBrand },
                  create: { name: data.preferredBrand },
                },
              },
            },
          },
        },
      },
      include: {
        preference: {
          include: { brand: true },
        },
      },
    });

    return updatedUser;
  },
};
