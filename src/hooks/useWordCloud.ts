import { useEffect, useState } from "react";
import { WordItem } from "@/src/types";
import { WORD_LIMIT } from "../utils/const";
import { Sentiment } from "@prisma/client";

export const useWordCloud = () => {
  const [words, setWords] = useState<WordItem[]>([]);
  const [shuffledWords, setShuffledWords] = useState<WordItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await fetch("/api/word-cloud");
        const json = await res.json();

        if (!json?.success || !Array.isArray(json.data)) {
          console.error("Invalid response from /api/word-cloud");
          return;
        }

        const keywords: string[] = json.data;

        const keywordMap: Record<string, number> = {};

        keywords.forEach((keyword) => {
          const key = keyword.toLowerCase();
          keywordMap[key] = (keywordMap[key] || 0) + 1;
        });

        const wordItems: WordItem[] = Object.entries(keywordMap)
          .map(([text, count]) => ({
            text,
            value: count,
            sentiment: "NEUTRAL" as Sentiment,
          }))
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
