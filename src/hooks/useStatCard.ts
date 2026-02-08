import { useEffect, useState } from "react";
import { UseStatCardProps } from "../types";

export function useStatCard({ value, delay = 0 }: UseStatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);

      let start = 0;
      const duration = 800;
      const stepTime = 16;
      const increment = value / (duration / stepTime);

      const counter = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, stepTime);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return { isVisible, displayValue };
}
