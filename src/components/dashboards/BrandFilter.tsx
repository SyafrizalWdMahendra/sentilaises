"use client";

import { cn } from "@/lib/utils";
import { useBrandFilter } from "@/src/hooks/useBrandFilter";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function BrandFilter() {
  const {
    isLoading,
    totalCount,
    selectedBrand,
    visibleBrands,
    isExpanded,
    validBrands,
    setIsExpanded,
    handleSelect,
  } = useBrandFilter();

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground animate-pulse">
        Memuat brand...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "circOut" }}
      className="flex items-center justify-center"
    >
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleSelect(null)}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-medium transition-all cursor-pointer",
            selectedBrand === null
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
          )}
        >
          Semua ({totalCount.toLocaleString()})
        </button>

        <div className="flex flex-wrap gap-2">
          {visibleBrands.map((brand) => {
            const isActive =
              selectedBrand?.toLowerCase() === brand.name.toLowerCase();

            return (
              <button
                key={brand.name}
                onClick={() => handleSelect(brand.name)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {brand.name} ({brand.count.toLocaleString()})
              </button>
            );
          })}

          {!isExpanded && validBrands.length > 3 && (
            <button
              onClick={() => setIsExpanded(true)}
              className={cn(
                "rounded-lg pl-2 text-sm font-medium transition-all cursor-pointer",
                "flex-1 sm:flex-none animate-in fade-in slide-in-from-left-2",
              )}
            >
              <div className="flex items-center justify-center gap-1 hover:text-primary">
                {validBrands.length - 3}
                <span>Lainnya</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          )}

          {isExpanded && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsExpanded(false);
              }}
              className="text-sentiment-negative hover:text-sentiment-negative hover:bg-sentiment-negative-light shrink-0"
            >
              ✕
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
