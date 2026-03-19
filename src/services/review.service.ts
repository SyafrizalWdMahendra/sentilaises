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
      reviewId: true,
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

export const PaginationService = {
  getNextPage: (currentPage: number, totalPages: number): number => {
    return currentPage < totalPages ? currentPage + 1 : currentPage;
  },

  getPrevPage: (currentPage: number): number => {
    return currentPage > 1 ? currentPage - 1 : currentPage;
  },

  getValidPage: (pageNumber: number, totalPages: number): number => {
    if (pageNumber < 1) return 1;
    if (pageNumber > totalPages) return totalPages;
    return pageNumber;
  },
};
