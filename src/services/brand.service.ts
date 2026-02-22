import { AnalysisData } from "../types";

export const formatBrandStats = (userAnalysis: AnalysisData[]) => {
  const countedProductIds = new Set<number>();

  const brandCounts = userAnalysis.reduce(
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

  const formattedBrands = Object.entries(brandCounts).map(([name, count]) => ({
    name,
    count,
  }));

  formattedBrands.sort((a, b) => b.count - a.count);

  return formattedBrands;
};
