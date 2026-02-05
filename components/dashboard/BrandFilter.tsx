import { cn } from "@/lib/utils";

interface Brand {
  name: string;
  count: number;
  logo?: string;
}

interface BrandFilterProps {
  brands: Brand[];
  selectedBrand: string | null;
  onSelect: (brand: string | null) => void;
}

export function BrandFilter({ brands, selectedBrand, onSelect }: BrandFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
          selectedBrand === null
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
        )}
      >
        Semua ({brands.reduce((sum, b) => sum + b.count, 0).toLocaleString()})
      </button>
      {brands.map((brand) => (
        <button
          key={brand.name}
          onClick={() => onSelect(brand.name)}
          className={cn(
            "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
            selectedBrand === brand.name
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
          )}
        >
          {brand.name} ({brand.count.toLocaleString()})
        </button>
      ))}
    </div>
  );
}
