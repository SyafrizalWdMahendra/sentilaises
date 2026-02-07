"use client";

import { WordCloudProps } from "@/src/types";
import WordCloudItem from "./WordCloudItem";
import { useWordCloud } from "@/src/hooks/useWordCloud";

export function WordCloud({ words }: WordCloudProps) {
  const { mounted, maxValue, minValue, shuffledWords } = useWordCloud({
    words,
  });

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
