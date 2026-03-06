"use server";

import { withActionAuth } from "@/lib/withAuth";
import { getAnalysisData } from "@/src/services/analyze.service";
import { formatBrandStats } from "@/src/services/brand.service";
import { reportService } from "@/src/services/report.service";
import { AnalysisData } from "@/src/types";

export const getClassificationReport = async () => {
  try {
    const response = await reportService();

    return response;
  } catch (error) {
    console.error("Error fetching classification report:", error);
    throw error;
  }
};

export const getTotalBrandAnalysis = withActionAuth(async (session) => {
  try {
    const email = session.user?.email as string;

    const rawAnalysis = await getAnalysisData(email);

    const userAnalysis: AnalysisData[] = rawAnalysis.map((item: any) => ({
      analysisId: item.analysisId,
      userId: item.userId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      product:
        item.metric && item.metric[0]?.product
          ? {
              productId: item.metric[0].product.productId, // Gunakan productId, bukan id
              brandName: item.metric[0].product.brand?.name || "Generic", // Gunakan brandName, bukan brand
              name: item.metric[0].product.name,
              reviewCount: item.metric[0].product._count?.reviews || 0, // Gunakan reviewCount, bukan _count.reviews
            }
          : null,
    }));

    const formattedBrands = formatBrandStats(userAnalysis);

    return { formattedBrands, userAnalysis };
  } catch (error) {
    console.error("Gagal mengambil data review:", error);
    return { formattedBrands: [], userAnalysis: [] };
  }
});
