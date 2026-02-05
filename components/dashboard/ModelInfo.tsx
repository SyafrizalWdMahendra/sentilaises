import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modelData } from "@/src/app/dashboard/lib/data";

export function ModelInfo() {
  const [selectedModel, setSelectedModel] =
    useState<keyof typeof modelData>("optimized");

  const currentModel = modelData[selectedModel];

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Select
          value={selectedModel}
          onValueChange={(value) =>
            setSelectedModel(value as keyof typeof modelData)
          }
        >
          <SelectTrigger className="w-fit min-w-[240px] justify-start gap-3 border bg-transparent text-lg font-semibold shadow-none">
            <SelectValue placeholder="Pilih Model" />
          </SelectTrigger>

          <SelectContent className="min-w-[260px]">
            <SelectItem
              value="baseline"
              className="cursor-pointer justify-start px-4 py-2"
            >
              Model XGBoost (Baseline)
            </SelectItem>
            <SelectItem
              value="tuned"
              className="cursor-pointer justify-start px-4 py-2"
            >
              Model XGBoost (Tuned)
            </SelectItem>
            <SelectItem
              value="optimized"
              className="cursor-pointer justify-start px-4 py-2"
            >
              Model XGBoost (Optimized)
            </SelectItem>
          </SelectContent>
        </Select>

        <Badge variant="secondary" className="bg-accent/10 text-accent">
          Active
        </Badge>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        {currentModel.description}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {currentModel.metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
          >
            <div className="rounded-lg bg-primary/10 p-2">
              <metric.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="font-semibold">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 text-sm text-muted-foreground">
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
          <span className="text-foreground">3.445 ulasan</span>
        </div>
      </div>
    </div>
  );
}
