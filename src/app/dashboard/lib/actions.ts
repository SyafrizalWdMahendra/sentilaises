"use server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

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
        isActive: true,
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

export const getTotalBrandAnalysis = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      console.log("User belum login");
      return null;
    }

    const userAnalyses = await prisma.analysis.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      include: {
        product: {
          select: {
            id: true,
            brand: true,
            _count: {
              select: {
                reviews: true,
              },
            },
          },
        },
      },
    });

    const countedProductIds = new Set<number>();

    const brandCounts = userAnalyses.reduce(
      (acc: Record<string, number>, analysis) => {
        const productId = analysis.product?.id;
        const rawBrand = analysis.product?.brand || "Unknown";
        const reviewCount = analysis.product?._count?.reviews || 0;

        if (productId && countedProductIds.has(productId)) {
          return acc;
        }
        if (productId) {
          countedProductIds.add(productId);
        }

        const formattedBrand = rawBrand
          .trim()
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase());

        if (!acc[formattedBrand]) {
          acc[formattedBrand] = 0;
        }

        acc[formattedBrand] += reviewCount;

        return acc;
      },
      {},
    );

    const formattedBrands = Object.entries(brandCounts).map(
      ([name, count]) => ({
        name,
        count,
      }),
    );

    formattedBrands.sort((a, b) => b.count - a.count);

    return formattedBrands;
  } catch (error) {
    console.error("Gagal mengambil data review:", error);
    return [];
  }
};
