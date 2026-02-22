import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const reportService = async () => {
  const response = await prisma.model.findMany({
    select: {
      modelName: true,
      description: true,
      accuracy: true,
      macroF1: true,
      f1Negative: true,
      f1Neutral: true,
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!response || response.length === 0) {
    return notFound();
  }
  
  return response;
};
