"use server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const getClassificationReport = async () => {
  try {
    const response = await prisma.model.findMany({
      select: {
        modelName: true,
        description: true,
        accuracy: true,
        macroF1: true,
        f1Negative: true,
        f1Neutral: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!response || response.length === 0) {
      return notFound();
    }

    return response;
  } catch (error) {
    console.error("Error fetching classification report:", error);
    throw error;
  }
};
