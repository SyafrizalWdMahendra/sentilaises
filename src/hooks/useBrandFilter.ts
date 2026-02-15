import { useEffect, useState } from "react";
import { getTotalBrandAnalysis } from "../app/dashboard/lib/actions";

export const useBrandFilter = () => {
  const [brands, setBrands] = useState<{ name: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getTotalBrandAnalysis();
        if (data) {
          setBrands(data);
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

  return { brands, isLoading, totalCount };
};
