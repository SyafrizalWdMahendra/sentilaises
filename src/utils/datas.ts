import { Frown, Meh, Smile } from "lucide-react";

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
