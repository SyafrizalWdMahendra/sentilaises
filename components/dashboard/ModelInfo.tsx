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
import { cn } from "@/lib/utils";

export function ModelInfo() {
  const [selectedModel, setSelectedModel] =
    useState<keyof typeof modelData>("optimized");

  const currentModel = modelData[selectedModel];

  return (
    <div className="rounded-xl border bg-card p-6 ">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Select
          value={selectedModel}
          onValueChange={(value) =>
            setSelectedModel(value as keyof typeof modelData)
          }
        >
          <SelectTrigger className="w-fit justify-start gap-3 text-md font-semibold border-border bg-card shadow-sm transition-all focus:ring-primary/20">
            <SelectValue placeholder="Pilih Model" />
          </SelectTrigger>

          <SelectContent
            position="popper"
            sideOffset={5}
            className="min-w-65 bg-card border-border shadow-lg animate-in fade-in zoom-in-95 duration-200"
          >
            <SelectItem
              value="baseline"
              className="cursor-pointer px-4 py-2.5 transition-colors focus:bg-secondary focus:text-primary data-[state=checked]:text-primary data-[state=checked]:font-md"
            >
              Model XGBoost (Baseline)
            </SelectItem>

            <SelectItem
              value="tuned"
              className="cursor-pointer px-4 py-2.5 transition-colors focus:bg-secondary focus:text-primary data-[state=checked]:text-primary data-[state=checked]:font-md"
            >
              Model XGBoost (Tuned)
            </SelectItem>

            <SelectItem
              value="optimized"
              className="cursor-pointer px-4 py-2.5 transition-colors focus:bg-secondary focus:text-primary data-[state=checked]:text-primary data-[state=checked]:font-md"
            >
              Model XGBoost (Optimized)
            </SelectItem>
          </SelectContent>
        </Select>

        <Badge
          variant="secondary"
          className="bg-sentiment-positive-light text-sentiment-positive"
        >
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
            className={cn(
              "flex items-center gap-3 rounded-lg p-3 transition-colors",
              "bg-secondary/50 border border-border/40",
            )}
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
