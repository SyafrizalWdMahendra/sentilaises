import { useEffect, useState } from "react";
import {
  KeywordStats,
  Review,
  ReviewResponse,
  Sentiment,
  WordItem,
} from "@/src/types";
import { WORD_LIMIT } from "../utils/datas";

export const useWordCloud = () => {
  const [words, setWords] = useState<WordItem[]>([]);
  const [shuffledWords, setShuffledWords] = useState<WordItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    const id = setTimeout(() => {
      const result = [...words];

      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }

      setShuffledWords(result);
      setReady(true);
    }, 0);

    return () => clearTimeout(id);
  }, [words]);

  return {
    maxValue,
    minValue,
    shuffledWords,
    ready,
  };
};
