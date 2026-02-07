"use client";

import { cn } from "@/lib/utils";
import { WordCloudItemProps, WordItem } from "@/src/types";

const WordCloudItem: React.FC<WordCloudItemProps> = ({
  word,
  index,
  maxValue,
  minValue,
}) => {
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

  return (
    <span
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
  );
};

export default WordCloudItem;
