import { useState } from "react";
import { ModelDB } from "../types";
import { BarChart3, CircleDot, Target, TrendingDown } from "lucide-react";

export const useModelInfo = ({ data }: { data: ModelDB[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentModel = data[selectedIndex];

  const metrics = [
    {
      label: "Accuracy",
      value: currentModel?.accuracy ?? 0,
      icon: Target,
    },
    {
      label: "Macro F1",
      value: currentModel?.macroF1 ?? 0,
      icon: BarChart3,
    },
    {
      label: "F1 Negative",
      value: currentModel?.f1Negative ?? 0,
      icon: TrendingDown,
    },
    {
      label: "F1 Neutral",
      value: currentModel?.f1Neutral ?? 0,
      icon: CircleDot,
    },
  ];

  return { selectedIndex, metrics, setSelectedIndex, currentModel };
};
