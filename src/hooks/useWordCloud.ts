import { useEffect, useState } from "react";
import { KeywordStats, WordCloudReview, WordItem } from "@/src/types";
import { WORD_LIMIT } from "../utils/const";

export const useWordCloud = () => {
  const [words, setWords] = useState<WordItem[]>([]);
  const [shuffledWords, setShuffledWords] = useState<WordItem[]>([]);
  const [ready, setReady] = useState(false);
  const isEmpty = shuffledWords.length === 0;

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch("/api/word-cloud");
        const json = await res.json();

        if (!json?.success || !Array.isArray(json.data)) {
          console.error("Invalid response from /api/word-cloud");
          return;
        }

        const reviews: WordCloudReview[] = json.data;

        const keywordMap: Record<string, KeywordStats> = reviews.reduce(
          (acc, review) => {
            const sentiment = ["POSITIVE", "NEGATIVE", "NEUTRAL"].includes(
              review.sentiment,
            )
              ? review.sentiment
              : "NEUTRAL";

            if (Array.isArray(review.keywords)) {
              review.keywords.forEach((keyword) => {
                const key = keyword.toLowerCase();

                if (!acc[key]) {
                  acc[key] = { count: 0, POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 };
                }

                acc[key].count += 1;
                acc[key][sentiment] += 1;
              });
            }

            return acc;
          },
          {} as Record<string, KeywordStats>,
        );

        const wordItems = Object.entries(keywordMap)
          .map(([text, data]) => {
            let dominantSentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL" =
              "NEUTRAL";

            if (
              data.POSITIVE >= data.NEGATIVE &&
              data.POSITIVE >= data.NEUTRAL
            ) {
              dominantSentiment = "POSITIVE";
            } else if (
              data.NEGATIVE >= data.POSITIVE &&
              data.NEGATIVE >= data.NEUTRAL
            ) {
              dominantSentiment = "NEGATIVE";
            }

            return {
              text,
              value: data.count,
              sentiment: dominantSentiment,
            };
          })
          .sort((a, b) => b.value - a.value)
          .slice(0, WORD_LIMIT);

        setWords(wordItems);
      } catch (error) {
        console.error("Gagal mengambil data word cloud:", error);
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
    isEmpty,
  };
};
