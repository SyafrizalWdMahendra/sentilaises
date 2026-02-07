"use client";
import { useEffect, useState } from "react";
import { ModelDB } from "../types";
import { reviewData, sentimentDistribution } from "../app/dashboard/lib/data";
import { getClassificationReport } from "../app/dashboard/lib/actions";

export const useDashboard = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modelData, setModelData] = useState<ModelDB[]>([]);

  const totalReviews = sentimentDistribution.reduce(
    (sum, s) => sum + s.value,
    0,
  );

  const positiveCount =
    sentimentDistribution.find((s) => s.name === "Positif")?.value || 0;
  const negativeCount =
    sentimentDistribution.find((s) => s.name === "Negatif")?.value || 0;
  const neutralCount =
    sentimentDistribution.find((s) => s.name === "Netral")?.value || 0;

  const filteredReviews = selectedBrand
    ? reviewData.filter((r) => r.brand === selectedBrand)
    : reviewData;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getClassificationReport();
        setModelData(data);
      } catch (error) {
        console.error("Failed to fetch model data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return {
    totalReviews,
    positiveCount,
    negativeCount,
    neutralCount,
    filteredReviews,
    selectedBrand,
    loading,
    modelData,
    setSelectedBrand,
  };
};
