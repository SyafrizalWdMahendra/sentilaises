"use client";

import { useWordCloud } from "@/src/hooks/useWordCloud";
import WordCloudItem from "./WordCloudItem";

export function WordCloud() {
  const { mounted, maxValue, minValue, shuffledWords } = useWordCloud();

  if (!mounted) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 p-4 min-h-37.5" />
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4">
      {shuffledWords.map((word, index) => (
        <WordCloudItem
          key={`${word.text}-${index}`}
          word={word}
          index={index}
          maxValue={maxValue}
          minValue={minValue}
        />
      ))}
    </div>
  );
}
