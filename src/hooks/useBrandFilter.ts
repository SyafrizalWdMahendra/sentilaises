import { useEffect, useState } from "react";
import { getTotalBrandAnalysis } from "../app/dashboard/lib/actions";
import { useSelectSearch } from "./useSelectSearch";

export const useBrandFilter = () => {
  const [brands, setBrands] = useState<{ name: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedBrand, handleSelect } = useSelectSearch();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getTotalBrandAnalysis();
        if (data && "formattedBrands" in data) {
          setBrands(data.formattedBrands);
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error("Gagal memuat filter brand", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const totalCount = brands.reduce((sum, b) => sum + (b?.count || 0), 0);

  const validBrands = brands.filter((brand) => brand.count > 0);

  const visibleBrands = isExpanded ? validBrands : validBrands.slice(0, 3);

  return {
    brands,
    isLoading,
    totalCount,
    selectedBrand,
    visibleBrands,
    validBrands,
    isExpanded,
    handleSelect,
    setIsExpanded,
  };
};
