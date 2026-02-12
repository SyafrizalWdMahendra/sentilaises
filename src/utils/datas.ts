import { Frown, Meh, Smile } from "lucide-react";
import { ScrapeResult, WordCloudConfig, WordItem } from "../types";

export const MODEL_OPTIONS = [
  {
    label: "Model XGBoost (Baseline)",
    code: "baseline",
    desc: "Raw Data (Imbalanced)",
  },
  {
    label: "Model XGBoost (Tuned)",
    code: "tuned",
    desc: "Hyperparameter Tuned",
  },
  {
    label: "Model XGBoost (Optimized)",
    code: "optimized",
    desc: "Pipeline (SMOTE + Chi2)",
  },
];

export const getSentimentDisplay = (sentiment: string) => {
  switch (sentiment?.toLowerCase()) {
    case "positive":
      return {
        label: "Positif",
        icon: Smile,
        bgClass:
          "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
        textClass: "text-green-600 dark:text-green-400",
        borderClass: "border-green-200",
      };
    case "negative":
      return {
        label: "Negatif",
        icon: Frown,
        bgClass:
          "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
        textClass: "text-red-600 dark:text-red-400",
        borderClass: "border-red-200",
      };
    default:
      return {
        label: "Netral",
        icon: Meh,
        bgClass:
          "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700",
        textClass: "text-gray-600 dark:text-gray-400",
        borderClass: "border-gray-200",
      };
  }
};

export const WORD_LIMIT = 15;

export const setWordCloud = ({ maxValue, minValue }: WordCloudConfig) => {
  const getSize = (value: number) => {
    if (maxValue === minValue) return 1.5;
    const normalized = (value - minValue) / (maxValue - minValue);
    return 0.75 + normalized * 1.5;
  };

  const getColor = (sentiment: WordItem["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return "text-sentiment-positive hover:bg-sentiment-positive-light";
      case "negative":
        return "text-sentiment-negative hover:bg-sentiment-negative-light";
      default:
        return "text-sentiment-neutral hover:bg-sentiment-neutral-light";
    }
  };

  return { getSize, getColor };
};

export function getFallbackData(url: string): ScrapeResult {
  return {
    name: "Produk (Data Sampel)",
    url: url,
    reviews: [
      "Laptop ini performanya sangat kencang untuk coding backend dan docker.",
      "Layar OLED-nya juara banget, warnanya tajam cocok buat desain di Illustrator.",
      "Keyboard travel distance-nya pas, enak buat ngetik skripsi berjam-jam.",
      "Sayang port-nya agak sedikit, butuh dongle tambahan.",
      "Baterai lumayan awet bisa tahan 6-7 jam pemakaian normal office.",
      "Buat main game ringan seperti Valorant masih oke, fps stabil.",
      "Build quality kokoh, terasa premium walau body plastik.",
      "Pengiriman cepat dan packing kayu sangat aman.",
    ],
  };
}
