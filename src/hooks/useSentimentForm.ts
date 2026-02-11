"use client";

import { useState } from "react";
import { MODEL_OPTIONS } from "../utils/datas";

export const useSentimentForm = () => {
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[2]);
  const [searchQuery, setSearchQuery] = useState("");
  const [laptopName, setLaptopName] = useState("");
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    sentiment: string;
    confidence: number;
    keywords: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredItems = MODEL_OPTIONS.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const isFormValid = selectedModel && laptopName.trim() && text.trim();

  const analyzeText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          laptop_name: laptopName,
          review_text: text,
          model_type: selectedModel.code,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      setResult({
        sentiment: data.sentiment,
        confidence: data.confidenceScore,
        keywords: data.keywords || [],
      });
    } catch (err: unknown) {
      console.error("Failed to analyze:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Gagal menghubungi server. Pastikan API berjalan.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    selectedModel,
    searchQuery,
    laptopName,
    text,
    isAnalyzing,
    result,
    filteredItems,
    isFormValid,
    error,
    analyzeText,
    setSelectedModel,
    setSearchQuery,
    setLaptopName,
    setText,
  };
};
