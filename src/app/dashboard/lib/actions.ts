"use server";

import { withActionAuth } from "@/lib/withAuth";
import { getAnalysisData } from "@/src/services/analyze.service";
import { formatBrandStats } from "@/src/services/brand.service";
import { reportService } from "@/src/services/report.service";

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

    const userAnalysis = await getAnalysisData(email);

    const formattedBrands = formatBrandStats(userAnalysis);

    return { formattedBrands, userAnalysis };
  } catch (error) {
    console.error("Gagal mengambil data review:", error);
    return [];
  }
});
