"use client";

import { cn } from "@/lib/utils";
import { BrandFilterProps } from "@/src/types";
import { useBrandFilter } from "@/src/hooks/useBrandFilter";

export function BrandFilter({
  selectedBrand,
  onSelect,
}: Omit<BrandFilterProps, "brands">) {
  const { brands, isLoading, totalCount } = useBrandFilter();

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
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
          selectedBrand === null
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
        )}
      >
        Semua ({totalCount.toLocaleString()})
      </button>

      {brands.map((brand) => (
        <button
          key={brand.name}
          onClick={() => onSelect(brand.name)}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
            selectedBrand === brand.name
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
          )}
        >
          {brand.name} ({brand.count.toLocaleString()})
        </button>
      ))}
    </div>
  );
}
