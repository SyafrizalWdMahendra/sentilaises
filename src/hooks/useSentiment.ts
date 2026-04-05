import { useMemo, useState } from "react";
import { AnalysisResult } from "../types";
import { configDisplay } from "../utils/datas";
import { models, negativeWords, positiveWords } from "../utils/const";

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
      sentiment = "POSITIVE";
      confidence = 0.75 + Math.random() * 0.2;
    } else if (negativeScore > positiveScore) {
      sentiment = "NEGATIVE";
      confidence = 0.75 + Math.random() * 0.2;
    } else {
      sentiment = "NEUTRAL";
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
    const config = configDisplay(sentiment);
    return config;
  };

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
    text,
    laptopName,
    isAnalyzing,
    result,
    searchQuery,
    filteredItems,
    isFormValid,
    setSelectedModel,
    setText,
    setLaptopName,
    analyzeText,
    getSentimentDisplay,
    setSearchQuery,
  };
};
