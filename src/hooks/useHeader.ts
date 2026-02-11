import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useHeader = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const session = useSession();
  const [mounted, setMounted] = useState(false);
  const [productCount, setProductCount] = useState<number | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  useEffect(() => {
    setMounted(true);
    const getProductCount = async () => {
      try {
        const res = await fetch("/api/product");
        if (!res.ok) throw new Error("Failed to fetch product count");

        const data = await res.json();
        setProductCount(data.count);
      } catch (error) {
        console.error("Failed get product count:", error);
      }
    };

    getProductCount();
  }, []);

  return {
    open,
    setOpen,
    session,
    isRefreshing,
    handleRefresh,
    mounted,
    productCount,
  };
};
