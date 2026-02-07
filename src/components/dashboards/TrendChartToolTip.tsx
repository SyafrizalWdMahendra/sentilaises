import { TrendChartTooltipProps } from "@/src/types";
import React from "react";

const TrendChartTooltip: React.FC<TrendChartTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-card px-4 py-3 shadow-lg">
        <p className="mb-2 font-semibold text-foreground">{label}</p>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name}:</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default TrendChartTooltip;
