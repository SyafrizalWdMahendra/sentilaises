import { useEffect, useState } from "react";

export const useTrendChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return { isMounted, setIsMounted };
};
