"use client";

import { cn } from "@/lib/utils";
import { useBrandFilter } from "@/src/hooks/useBrandFilter";

export function BrandFilter() {
  const { brands, isLoading, totalCount, selectedBrand, handleSelect } =
    useBrandFilter();

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
          "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
          selectedBrand === null
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
        )}
      >
        Semua ({totalCount.toLocaleString()})
      </button>

      {brands.map((brand) => {
        const isActive =
          selectedBrand?.toLowerCase() === brand.name.toLowerCase();

        return (
          <button
            key={brand.name}
            onClick={() => handleSelect(brand.name)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {brand.name} ({brand.count.toLocaleString()})
          </button>
        );
      })}
    </div>
  );
}
