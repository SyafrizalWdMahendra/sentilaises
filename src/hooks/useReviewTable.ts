import { useEffect, useState } from "react";
import { ApiResponse, ReviewItem } from "../types";

export const useReviewTable = () => {
  const [data, setData] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const req = await fetch("/api/review");
        const res: ApiResponse = await req.json();

        if (res.data && Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getReviewData();
  }, []);

  return { data, isLoading };
};
