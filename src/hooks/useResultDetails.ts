import { useState } from "react";
import { ResultProps } from "../types";

export const useResultDetails = ({ result }: ResultProps) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  if (!result || !result.details || result.details.length === 0) return null;

  const totalProducts = result.details.length;

  const nextProduct = () => {
    if (activeProductIndex < totalProducts - 1) {
      setActiveProductIndex((prev) => prev + 1);
    }
  };

  const prevProduct = () => {
    if (activeProductIndex > 0) {
      setActiveProductIndex((prev) => prev - 1);
    }
  };

  return { activeProductIndex, totalProducts, nextProduct, prevProduct };
};
