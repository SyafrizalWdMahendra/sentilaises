"use client";

import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ModelDB } from "@/src/types";
import { useModelInfo } from "@/src/hooks/useModelInfo";

export function ModelInfo({
  data,
  isDark,
}: {
  data: ModelDB[];
  isDark: boolean;
}) {
  const { selectedIndex, metrics, setSelectedIndex, currentModel } =
    useModelInfo({ data });

  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6 flex items-center justify-center h-87.5">
        <p className="text-muted-foreground text-sm">
          Data model tidak tersedia.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border ${isDark ? "border-transparent" : "border-gray-200"} bg-card p-6 ${isDark ? "bg-gray-800" : "bg-white"} transition-all duration-500`}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <Select
          value={selectedIndex.toString()}
          onValueChange={(val) => setSelectedIndex(parseInt(val))}
        >
          <SelectTrigger
            className={`w-fit justify-start gap-3 text-md font-semibold border border-gray-200 bg-card ${isDark ? "bg-gray-900" : "bg-white"} transition-all duration-500`}
          >
            <SelectValue placeholder="Pilih Model" />
          </SelectTrigger>

          <SelectContent
            className={`bg-card shadow-lg ${isDark ? "bg-gray-900 text-white" : "bg-white"}`}
            position="popper"
          >
            {data.map((model, index) => (
              <SelectItem
                key={model.modelName + index}
                value={index.toString()}
                className={`cursor-pointer hover:bg-primary hover:text-card focus:bg-primary focus:text-card ${isDark ? "text-white focus:bg-gray-800" : "text-black focus:bg-primary"} transition-all duration-500`}
              >
                {model.modelName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Badge
          variant="secondary"
          className={`${currentModel.isActive ? `${isDark ? "bg-sentiment-positive/10 text-sentiment-positive" : "bg-sentiment-positive-light text-sentiment-positive"}` : `${isDark ? "bg-gray-900 text-white" : "bg-primary/10 text-primary"}`} transition-all duration-500`}
        >
          {currentModel.isActive === true ? "Active" : "Inactive"}
        </Badge>
      </div>

      <p className="mb-6 text-sm text-muted-foreground min-h-10">
        {currentModel.description}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center gap-3 rounded-lg p-3 bg-secondary/50 border border-border/40"
          >
            <div
              className={`rounded-lg p-2 ${isDark ? "bg-gray-600" : "bg-primary/10 "} transition-all duration-500`}
            >
              <metric.icon
                className={`h-4 w-4 text-primary ${isDark ? "text-white" : "text-black"} transition-all duration-500`}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="font-semibold">
                {typeof metric.value === "number"
                  ? `${(metric.value * 100).toFixed(1)}%`
                  : metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-6 space-y-2 text-sm text-muted-foreground border-t border-gray-200 pt-4`}
      >
        <div className="flex justify-between">
          <span>Preprocessing</span>
          <span className="text-foreground">
            Case Folding, Stopwords, Stemming
          </span>
        </div>
        <div className="flex justify-between">
          <span>Feature Extraction</span>
          <span className="text-foreground">TF-IDF Vectorization</span>
        </div>
        <div className="flex justify-between">
          <span>Training Data</span>
          <span className="text-foreground">3.445 Ulasan</span>
        </div>
      </div>
    </div>
  );
}
