"use client";

import { cn } from "@/lib/utils";
import { useBrandFilter } from "@/src/hooks/useBrandFilter";
import { Button } from "../ui/button";

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
              "rounded-lg border border-dashed px-4 py-2 text-sm font-medium hover:bg-accent transition-all cursor-pointer",
              "flex-1 min-w-25 sm:flex-none",
            )}
          >
            {validBrands.length - 3} Lainnya
          </button>
        )}

        {isExpanded && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsExpanded(false);
            }}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
          >
            ✕
          </Button>
        )}
      </div>
    </div>
  );
}
