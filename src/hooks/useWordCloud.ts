import { useEffect, useMemo, useState } from "react";
import {
  KeywordStats,
  Review,
  ReviewResponse,
  Sentiment,
  WordItem,
} from "@/src/types";
import { WORD_LIMIT } from "../utils/datas";

export const useWordCloud = () => {
  const [mounted, setMounted] = useState(false);
  const [words, setWords] = useState<WordItem[]>([]);

  useEffect(() => {
    setMounted(true);

    const fetchWords = async () => {
      try {
        const res = await fetch("/api/review");
        const result: unknown = await res.json();

        if (
          typeof result !== "object" ||
          result === null ||
          !("data" in result)
        ) {
          console.error("Invalid response from /api/review");
          return;
        }

        const reviewsData = (result as ReviewResponse).data || [];
        const reviews: Review[] = reviewsData;

        const keywordMap: Record<string, KeywordStats> = reviews.reduce(
          (acc, review) => {
            const sentiment: Sentiment = [
              "positive",
              "negative",
              "neutral",
            ].includes(review.sentiment)
              ? review.sentiment
              : "neutral";

            (review.keywords || []).forEach((keyword) => {
              const key = keyword.toLowerCase();

              if (!acc[key]) {
                acc[key] = { count: 0, positive: 0, negative: 0, neutral: 0 };
              }

              acc[key].count += 1;
              acc[key][sentiment] += 1;
            });

            return acc;
          },
          {} as Record<string, KeywordStats>,
        );

        const wordItems: WordItem[] = Object.entries(keywordMap)
          .map(([text, data]) => {
            let sentiment: Sentiment = "neutral";
            if (
              data.positive >= data.negative &&
              data.positive >= data.neutral
            ) {
              sentiment = "positive";
            } else if (
              data.negative >= data.positive &&
              data.negative >= data.neutral
            ) {
              sentiment = "negative";
            }

            return { text, value: data.count, sentiment };
          })
          .sort((a, b) => b.value - a.value)
          .slice(0, WORD_LIMIT);

        setWords(wordItems);
      } catch (error) {
        console.error("Failed to fetch wordcloud data", error);
      }
    };

    fetchWords();
  }, []);

  const maxValue = Math.max(...words.map((w) => w.value), 1);
  const minValue = Math.min(...words.map((w) => w.value), 0);

  const shuffledWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, [words]);

  return {
    mounted,
    maxValue,
    minValue,
    shuffledWords,
  };
};
