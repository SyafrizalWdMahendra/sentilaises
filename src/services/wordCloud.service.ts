import prisma from "@/lib/prisma";

export const wordCloudService = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) return null;

  const analyses = await prisma.review.findMany({
    where: { userId: user.id },
    select: { keywords: true, sentiment: true },
  });

  return analyses;
};
