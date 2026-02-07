import { useEffect, useMemo, useState } from "react";
import { WordCloudProps } from "../types";

export const useWordCloud = ({ words }: WordCloudProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxValue = Math.max(...words.map((w) => w.value), 1);
  const minValue = Math.min(...words.map((w) => w.value), 0);

  const shuffledWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, [words]);

  return { mounted, maxValue, minValue, shuffledWords };
};
