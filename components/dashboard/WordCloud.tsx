"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";

interface WordItem {
  text: string;
  value: number;
  sentiment: "positive" | "negative" | "neutral";
}

interface WordCloudProps {
  words: WordItem[];
}

export function WordCloud({ words }: WordCloudProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxValue = Math.max(...words.map((w) => w.value), 1);
  const minValue = Math.min(...words.map((w) => w.value), 0);

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

  const shuffledWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, [words]);

  if (!mounted) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 p-4 min-h-[150px]" />
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4">
      {shuffledWords.map((word, index) => (
        <span
          key={`${word.text}-${index}`}
          className={cn(
            "cursor-default rounded-lg px-2 py-1 font-medium transition-all duration-200 animate-in fade-in zoom-in",
            getColor(word.sentiment),
          )}
          style={{
            fontSize: `${getSize(word.value)}rem`,
            animationDelay: `${index * 50}ms`,
            animationFillMode: "both",
          }}
          title={`${word.text}: ${word.value} kemunculan`}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
}
