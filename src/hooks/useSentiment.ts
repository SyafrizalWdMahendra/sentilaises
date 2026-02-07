import { useMemo, useState } from "react";
import { AnalysisResult } from "../types";
import { Minus, ThumbsDown, ThumbsUp } from "lucide-react";

export const useSentiment = () => {
  const [text, setText] = useState("");
  const [laptopName, setLaptopName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedModel, setSelectedModel] = useState<
    (typeof models)[number] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isFormValid =
    text.trim() !== "" && laptopName.trim() !== "" && selectedModel !== null;

  const analyzeText = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const positiveWords = [
      "bagus",
      "cepat",
      "aman",
      "baik",
      "mulus",
      "moga",
      "awet",
      "mantap",
      "sangat",
      "fungsi",
    ];

    const negativeWords = [
      "lebih",
      "jual",
      "baru",
      "lalu",
      "tahun",
      "masalah",
      "rusak",
      "garansi",
      "layar",
      "kecewa",
    ];

    const lowerText = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;
    const foundKeywords: string[] = [];

    positiveWords.forEach((word) => {
      if (lowerText.includes(word)) {
        positiveScore++;
        foundKeywords.push(word);
      }
    });

    negativeWords.forEach((word) => {
      if (lowerText.includes(word)) {
        negativeScore++;
        foundKeywords.push(word);
      }
    });

    let sentiment: AnalysisResult["sentiment"];
    let confidence: number;

    if (positiveScore > negativeScore) {
      sentiment = "positif";
      confidence = 0.75 + Math.random() * 0.2;
    } else if (negativeScore > positiveScore) {
      sentiment = "negatif";
      confidence = 0.75 + Math.random() * 0.2;
    } else {
      sentiment = "netral";
      confidence = 0.6 + Math.random() * 0.2;
    }

    setResult({
      sentiment,
      confidence,
      keywords: foundKeywords,
    });
    setIsAnalyzing(false);
  };

  const getSentimentDisplay = (sentiment: AnalysisResult["sentiment"]) => {
    const config = {
      positif: {
        icon: ThumbsUp,
        label: "Positif",
        bgClass: "bg-sentiment-positive-light",
        textClass: "text-sentiment-positive",
        borderClass: "border-sentiment-positive/30",
      },
      negatif: {
        icon: ThumbsDown,
        label: "Negatif",
        bgClass: "bg-sentiment-negative-light",
        textClass: "text-sentiment-negative",
        borderClass: "border-sentiment-negative/30",
      },
      netral: {
        icon: Minus,
        label: "Netral",
        bgClass: "bg-sentiment-neutral-light",
        textClass: "text-sentiment-neutral",
        borderClass: "border-sentiment-neutral/30",
      },
    };
    return config[sentiment];
  };

  const models = [
    {
      code: "none",
      value: "xgboost",
      label: "XGBoost (Baseline)",
      desc: "Model 1",
    },
    {
      code: "Grid Search",
      value: "xgboost",
      label: "XGBoost (Tuned)",
      desc: "Model 2",
    },
    {
      code: "recommended",
      value: "xgboost",
      label: "XGBoost (Fully Optimized)",
      desc: "Model 3",
    },
  ];

  const filteredItems = useMemo(() => {
    if (!searchQuery) return models;
    return models.filter(
      (model) =>
        model.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.code.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return {
    selectedModel,
    setSelectedModel,
    text,
    setText,
    laptopName,
    setLaptopName,
    isAnalyzing,
    analyzeText,
    result,
    getSentimentDisplay,
    searchQuery,
    setSearchQuery,
    filteredItems,
    isFormValid,
  };
};
