import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export const getAnotherUserData = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    const userData = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        bio: true,
        preference: {
          select: {
            id: true,
            profession: true,
            preferedBrand: true,
            preferredOS: true,
            budgetMin: true,
            budgetMax: true,
          },
        },
      },
    });

    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
