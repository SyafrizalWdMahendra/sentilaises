import prisma from "@/lib/prisma";

export const getAnotherUserDataService = async (email: string) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      name: true,
      bio: true,
      preference: {
        select: {
          id: true,
          profession: true,
          preferredBrand: true,
          preferredOS: true,
          budgetMin: true,
          budgetMax: true,
        },
      },
    },
  });
  
  return userData;
};
