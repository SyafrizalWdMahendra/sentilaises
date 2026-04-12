"use client";

import { useState, useEffect, useMemo } from "react";
import { ModelDB, Review, StatCounts } from "@/src/types";
import { getClassificationReport } from "../app/dashboard/lib/actions";
import { sentimentStatsPath } from "../utils/const";

export const useDashboards = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modelData, setModelData] = useState<ModelDB[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<StatCounts>({
    totalReviews: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);

      const res = await fetch(sentimentStatsPath);
      const json = await res.json();

      const statsData = json.data;

      const total =
        (statsData?.positive ?? 0) +
        (statsData?.negative ?? 0) +
        (statsData?.neutral ?? 0);

      setStats({
        totalReviews: total,
        positive: statsData?.positive ?? 0,
        negative: statsData?.negative ?? 0,
        neutral: statsData?.neutral ?? 0,
      });

      setLoading(false);
    }

    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchModelData() {
      try {
        const data = await getClassificationReport();
        setModelData(data);
      } catch (error) {
        console.error("Failed to fetch model data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchModelData();
  }, []);

  const filteredReviews = useMemo(() => {
    return selectedBrand
      ? reviews.filter((r) => r.brand === selectedBrand)
      : reviews;
  }, [reviews, selectedBrand]);

  const percentage = (value: number, total: number) =>
    total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";

  const scrollToResult = () => {
    const element = document.getElementById("analysis-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    totalReviews: stats.totalReviews,
    positiveCount: stats.positive,
    negativeCount: stats.negative,
    neutralCount: stats.neutral,
    filteredReviews,
    selectedBrand,
    loading,
    modelData,
    darkMode,
    setDarkMode,
    setSelectedBrand,
    percentage,
    scrollToResult,
  };
};
