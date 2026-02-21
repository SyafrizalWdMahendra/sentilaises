"use client";

import { useWordCloud } from "@/src/hooks/useWordCloud";
import WordCloudItem from "./WordCloudItem";
import { Inbox } from "lucide-react";

export function WordCloud() {
  const { maxValue, minValue, shuffledWords, isEmpty } = useWordCloud();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-4">
      {isEmpty ? (
        <div className="flex flex-col gap-2 items-center py-22 text-muted-foreground">
          <div className="rounded-full bg-muted">
            <Inbox className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium text-foreground">Belum ada data</p>
          <p className="text-sm text-center">
            Belum ada kata kunci yang dianalisis oleh sistem.
          </p>
        </div>
      ) : (
        <>
          {shuffledWords.map((word, index) => (
            <WordCloudItem
              key={`${word.text}-${index}`}
              word={word}
              index={index}
              maxValue={maxValue}
              minValue={minValue}
            />
          ))}
        </>
      )}
    </div>
  );
}
