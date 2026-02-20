import prisma from "@/lib/prisma";
import { reviewDatas } from "../utils/const";

export const reviewService = async () => {
  const reviews = reviewDatas;
  const result = await prisma.review.createMany({
    data: reviews,
  });
  return result;
};

export const getReviewService = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) return null;

  const review = await prisma.review.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      createdAt: true,
      confidenceScore: true,
      sentiment: true,
      content: true,
      keywords: true,
      product: {
        select: {
          name: true,
          brand: true,
        },
      },
    },
  });
  
  return review;
};
